/**
 * Binary-to-Decimal Converter
 * Converts a binary string to its decimal equivalent
 */

const readline = require('readline');

function binaryToDecimal(binaryString) {
    // Validate input
    if (!/^[01]+$/.test(binaryString)) {
        throw new Error("Invalid binary string");
    }
    let decimalValue = 0;
    const length = binaryString.length;
    for (let i = 0; i < length; i++) {
        const digit = parseInt(binaryString[i], 10);
        const power = length - i - 1;
        decimalValue += digit * Math.pow(2, power);
    }
    return decimalValue;
}

function clearScreen() {
    process.stdout.write('\x1B[2J\x1B[0f');
}

function drawBox(title, content, width = 60) {
    const horizontalLine = '─'.repeat(width);
    const verticalLine = '│';
    const cornerTL = '╔';
    const cornerTR = '╔'.replace('╔', '╗');
    const cornerBL = '╚';
    const cornerBR = '╝';
    
    console.log(cornerTL + horizontalLine + cornerTR);
    console.log(verticalLine + title.center ? title : title.padStart((width + title.length) / 2).padEnd(width - (width - title.length) / 2) + verticalLine);
    console.log(verticalLine + ' '.repeat(width) + verticalLine);
    
    const lines = content.split('\n');
    for (const line of lines) {
        const paddedLine = line.padEnd(width);
        console.log(verticalLine + paddedLine + verticalLine);
    }
    
    console.log(cornerBL + horizontalLine + cornerBR);
}

function runGUI() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const showMenu = () => {
        clearScreen();
        console.log('\n  ╔══════════════════════════════════════════╗');
        console.log('  ║     BINARY TO DECIMAL CONVERTER          ║');
        console.log('  ╚══════════════════════════════════════════╝\n');
        console.log('  [1] Convert Binary');
        console.log('  [2] Examples');
        console.log('  [3] Help');
        console.log('  [0] Exit\n');
    };

    const showExamples = () => {
        clearScreen();
        console.log('\n  ╔══════════════════════════════════════════╗');
        console.log('  ║              EXAMPLES                    ║');
        console.log('  ╚══════════════════════════════════════════╝\n');
        
        const examples = [
            ['1011', '11'],
            ['11111111', '255'],
            ['1010', '10'],
            ['10000000', '128'],
            ['0b1011', '11']
        ];
        
        console.log('  Binary       Decimal');
        console.log('  ──────────────────────');
        for (const [bin, dec] of examples) {
            console.log(`  ${bin.padEnd(12)} ${dec}`);
        }
        console.log('\n  Press Enter to continue...');
        
        rl.question('', () => {
            showMenu();
            handleMenuInput();
        });
    };

    const showHelp = () => {
        clearScreen();
        console.log('\n  ╔══════════════════════════════════════════╗');
        console.log('  ║                HELP                      ║');
        console.log('  ╚══════════════════════════════════════════╝\n');
        console.log('  • Enter binary numbers (0s and 1s only)');
        console.log('  • Supports 0b prefix (e.g., 0b1011)');
        console.log('  • Press Ctrl+C anytime to exit\n');
        console.log('  Press Enter to continue...');
        
        rl.question('', () => {
            showMenu();
            handleMenuInput();
        });
    };

    const convertBinary = () => {
        clearScreen();
        console.log('\n  ╔══════════════════════════════════════════╗');
        console.log('  ║           CONVERT BINARY                 ║');
        console.log('  ╚══════════════════════════════════════════╝\n');
        
        rl.question('  Enter binary number: ', (input) => {
            try {
                let s = input.trim();
                if (s.startsWith('0b') || s.startsWith('0B')) s = s.slice(2);
                
                if (!/^[01]+$/.test(s)) {
                    throw new Error("Invalid binary string. Only 0s and 1s allowed.");
                }
                
                const result = binaryToDecimal(s);
                console.log(`\n  Result: ${input} = ${result}\n`);
            } catch (e) {
                console.log(`\n  Error: ${e.message}\n`);
            }
            
            console.log('  Press Enter to continue...');
            rl.question('', () => {
                showMenu();
                handleMenuInput();
            });
        });
    };

    const handleMenuInput = () => {
        rl.question('  Select option: ', (choice) => {
            switch(choice.trim()) {
                case '1':
                    convertBinary();
                    break;
                case '2':
                    showExamples();
                    break;
                case '3':
                    showHelp();
                    break;
                case '0':
                    console.log('\n  Goodbye!\n');
                    rl.close();
                    process.exit(0);
                default:
                    console.log('\n  Invalid option. Press Enter to try again...');
                    rl.question('', () => {
                        showMenu();
                        handleMenuInput();
                    });
            }
        });
    };

    showMenu();
    handleMenuInput();
    
    process.on('SIGINT', () => {
        console.log('\n\n  Goodbye!\n');
        rl.close();
        process.exit(0);
    });
}

function runConverter() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const usage = () => {
        console.log("Binary to Decimal Converter\n");
        console.log("Usage:");
        console.log("  node binary-converter.js <binary>    Convert a binary string to decimal");
        console.log("  node binary-converter.js             Run interactive prompt");
        console.log("  node binary-converter.js --gui       Launch terminal GUI mode");
        console.log("  node binary-converter.js -h|--help   Show this help\n");
        console.log("Examples:");
        console.log("  node binary-converter.js 1011    => 11");
        console.log("  node binary-converter.js 0b1011  => 11\n");
    };

    const processInput = (input) => {
        if (!input) {
            console.error("No input provided.");
            usage();
            process.exit(1);
        }
        let s = String(input).trim();
        if (s.startsWith('0b') || s.startsWith('0B')) s = s.slice(2);
        if (!/^[01]+$/.test(s)) {
            console.error("Invalid binary string. Only characters '0' and '1' are allowed.");
            process.exit(2);
        }
        console.log(`${s} -> ${binaryToDecimal(s)}`);
    };

    const args = process.argv.slice(2);
    if (args.length > 0) {
        if (args.includes('-h') || args.includes('--help')) {
            usage();
            process.exit(0);
        }
        if (args.includes('--gui')) {
            runGUI();
            return;
        }
        // Use first non-flag argument as the binary string
        const first = args.find(a => !a.startsWith('-'));
        if (first) {
            processInput(first);
            process.exit(0);
        }
    }

    // Interactive prompt when no args provided
    rl.question('Enter a binary string to convert: ', answer => {
        processInput(answer);
        rl.close();
    });
}

// If executed directly, run the converter
if (require.main === module) {
    runConverter();
}
