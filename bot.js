const mineflayer = require('mineflayer')
const tpsPlugin = require('mineflayer-tps')(mineflayer) 
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const pvp = require('mineflayer-pvp').plugin
const readline = require('readline')
const fs = require('fs')

const c = { green: '\x1b[32m', red: '\x1b[31m', yellow: '\x1b[33m', cyan: '\x1b[36m', reset: '\x1b[0m', bold: '\x1b[1m' };
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: `${c.yellow}❯ ${c.reset}` });

const log = (msg) => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    console.log(msg);
    rl.prompt(true);
};

let DICTIONARY = [];
let bot; let botState = 0; let pendingBalance = 0; let currentMode = 'STANDBY';
let targetName = 'Gens Tycoon'; 
const startTime = Date.now();

// ==========================================
// 1. REALMS SELECTOR DATA
// ==========================================
const SERVERS = {
    '1': 'Earth', '2': 'Survival', '3': 'Vanilla', '4': 'OneBlock',
    '5': 'Survival War', '6': 'Gens Tycoon', '7': 'Prison', '8': 'An Mancing'
};

function showServerMenu() {
    log(`\n${c.cyan}=== 🌍 ZAIDAN OS: DEEP SCANNER ===${c.reset}`);
    Object.keys(SERVERS).forEach(k => log(`${c.yellow}[${k}] Realms » ${SERVERS[k]}${c.reset}`));
    log(`${c.cyan}==================================${c.reset}`);
}

async function askForServer() {
    showServerMenu();
    const choice = await new Promise(res => rl.question(`${c.yellow}Pilih Server (1-8): ${c.reset}`, res));
    if (SERVERS[choice]) {
        targetName = SERVERS[choice];
        log(`${c.green}[SYSTEM] Mengunci Target: ${targetName}${c.reset}`);
        if (bot && botState >= 1) {
            bot.setQuickBarSlot(4); bot.activateItem();
        }
    } else {
        log(`${c.red}[!] Ngaco lu Wir! Pilih 1-8.${c.reset}`);
        return askForServer();
    }
}

// ==========================================
// 2. THE "DEEP SCANNER" LOGIC (FIX JIER)
// ==========================================
function getFullItemText(item) {
    let allText = (item.displayName || "").toLowerCase();
    
    // Scan Custom Name (JSON Recursive)
    if (item.customName) {
        allText += " " + item.customName.toLowerCase();
    }
    
    // Scan Lore (Biasanya nama server ada di sini)
    if (item.nbt && item.nbt.value && item.nbt.value.display && item.nbt.value.display.value.Lore) {
        const lore = item.nbt.value.display.value.Lore.value;
        allText += " " + JSON.stringify(lore).toLowerCase();
    }

    // Bersihin simbol warna Minecraft (§) biar gak ganggu scan
    return allText.replace(/§[0-9a-fk-or]/ig, '');
}

// ==========================================
// 3. MAIN ENGINE
// ==========================================
const CONFIG = {
    host: 'Masukan Host Server Kalian', port: 25565,
    username: 'BEBAS BUAT bot', password: 'Hahahahihihi',
    mainAccount: 'Masukan Main Account',
    payAmount: 5000, minTransfer: 15000,
    version: '1.20', reconnectDelay: 8000
};

function initBot() {
    bot = mineflayer.createBot({ host: CONFIG.host, port: CONFIG.port, username: CONFIG.username, version: CONFIG.version });
    bot.loadPlugin(tpsPlugin); bot.loadPlugin(pathfinder); bot.loadPlugin(pvp);

    bot.on('spawn', () => {
        if (botState === 0) {
            botState = 1;
            setTimeout(() => {
                bot.chat(`/login ${CONFIG.password}`);
                setTimeout(() => { bot.setQuickBarSlot(4); bot.activateItem(); }, 3000);
            }, 2000);
        } else if (botState === 2) {
            botState = 3; 
            log(`${c.green}${c.bold}👑 LOGIN SUKSES! Bot masuk ke ${targetName}.${c.reset}`);
        }
    });

    // --- DEEP SCANNER (X-RAY MODE) ---
    bot.on('windowOpen', async (window) => {
        log(`${c.yellow}[SCAN] Deep Scanning menu for "${targetName}"...${c.reset}`);
        const items = window.slots.slice(0, window.inventoryStart);
        let found = false;

        // Normalisasi nama target (hapus spasi/strip biar makin akurat)
        const normalizedTarget = targetName.toLowerCase().replace(/[\s-]/g, '');

        for (const item of items) {
            if (!item) continue;
            
            const itemText = getFullItemText(item).replace(/[\s-]/g, '');

            if (itemText.includes(normalizedTarget)) {
                log(`${c.green}[MATCH] Menemukan "${targetName}" di slot ${item.slot}. Clicking!${c.reset}`);
                bot.clickWindow(item.slot, 0, 0);
                botState = 2; found = true; break;
            }
        }

        if (!found) {
            log(`${c.red}[ERR] Portal "${targetName}" gagal dideteksi sensor!${c.reset}`);
            bot.closeWindow(window);
            askForServer(); 
        }
    });

    bot.on('message', (jsonMsg, position) => {
        const rawText = jsonMsg.toString();
        if (rawText.includes('♥') || rawText.trim() === '' || position === 'game_info') return;
        
        let answer = null;
        const kuisMatch = rawText.match(/.*: \((.+)\)/i) || rawText.match(/word: (.+)/i);
        if (kuisMatch) {
            const content = kuisMatch[1].trim();
            if (rawText.toLowerCase().includes('write out')) answer = content;
        }

        if (answer) {
            const delay = Math.floor(Math.random() * 500) + 1050;
            setTimeout(() => { if(botState >= 2) bot.chat(answer); }, delay);
        }
        log(jsonMsg.toAnsi()); 
    });

    bot.on('end', () => { botState = 0; setTimeout(initBot, CONFIG.reconnectDelay); });
}

// Command Handler
rl.on('line', async (input) => {
    const cmd = input.trim();
    if (!cmd) return rl.prompt(true);
    if (cmd === '/menu') { askForServer(); }
    else if (cmd === '/idle') { bot.chat('/is home'); }
    else if (cmd === '/dc') { bot.quit(); process.exit(); }
    else if (cmd.startsWith('.')) { 
        if(cmd === '.hub') { bot.chat('/hub'); botState = 1; }
    }
    else { if(bot) bot.chat(cmd); }
    rl.prompt(true);
});

async function bootSystem() {
    console.clear();
    log(`${c.green}${c.bold}=== [ ZAIDAN OS v12.1 - DEEP SCANNER ] ===${c.reset}`);
    await askForServer();
    if (fs.existsSync('words.json')) DICTIONARY = JSON.parse(fs.readFileSync('words.json', 'utf8'));
    initBot();
}
bootSystem();

