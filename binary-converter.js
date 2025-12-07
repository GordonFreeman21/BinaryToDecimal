/**
 * Binary-to-Decimal Converter
 * Converts a binary string to its decimal equivalent
 */

function binaryToDecimal(binaryString) {
    // Validate input
    if (!/^[01]+$/.test(binaryString)) {
        throw new Error("Invalid binary string");
    }
    let decimalValue = 0;
    const length = binaryString.length;
    for (let i = 0; i < length; i++) {
        const digit = parseInt(binaryString[length - 1 - i], 10);
        const power = length - i - 1;

        decimalValue += digit * Math.pow(2, power);
    }
    return decimalValue;
}
function runConverter() {
    const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });
}
function runConverter() {
    const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const usage = () => {
        console.log("Binary to Decimal Converter\n");
        console.log("Usage:");
        console.log("  node binary-converter.js <binary>    Convert a binary string to decimal");
        console.log("  node binary-converter.js             Run interactive prompt");
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
        // Use first non-flag argument as the binary string
        const first = args.find(a => !a.startsWith('-'));
        if (first) {
            processInput(first);
            process.exit(0);
        }
    }

    // Interactive prompt when no args provided
    readline.question('Enter a binary string to convert: ', answer => {
        processInput(answer);
        readline.close();
    });
}

// If executed directly, run the converter
if (require.main === module) {
    runConverter();
}

// Small banner when required as a module
if (process.argv[1] && /binary-converter\.js$/.test(process.argv[1])) {
    // no-op: behavior handled above
}