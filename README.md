# Binary-to-Decimal Converter

A simple yet efficient command-line tool that transforms binary numbers into their decimal equivalents. Built with Node.js for maximum flexibility and ease of use.

## Features

- Converts binary strings to decimal numbers
- Input validation to ensure only 0s and 1s are accepted
- Supports binary strings with or without `0b` prefix
- Error handling for invalid inputs
- Interactive mode and command-line argument support
- Built-in help documentation
- **Beautiful terminal GUI mode** with menu-driven interface (new!)

## Requirements

- [Node.js](https://nodejs.org/) (v12 or higher recommended)

## Installation

1. Clone or download this repository
2. Ensure Node.js is installed on your system

## Usage

### Command-Line Mode

Convert a binary string directly from the command line:

```bash
node binary-converter.js 1011
```

Output:
```
1011 -> 11
```

Supports `0b` prefix:

```bash
node binary-converter.js 0b1011
```

Output:
```
1011 -> 11
```

### Interactive Mode

Run without arguments to enter interactive mode:

```bash
node binary-converter.js
```

You will be prompted to enter a binary string:
```
Enter a binary string to convert: 101
101 -> 5
```

### Help

Display usage information:

```bash
node binary-converter.js --help
```

or

```bash
node binary-converter.js -h
```

### GUI Mode (New!)

Launch a built-in terminal-based graphical interface:

```bash
node binary-converter.js --gui
```

The terminal GUI features:
- Beautiful box-drawing interface with menus
- Interactive menu-driven navigation
- Convert binary numbers with prompts
- View example conversions
- Built-in help documentation
- Easy exit option
- Press Ctrl+C anytime to quit

**How to use the GUI:**
1. Select option `[1]` to convert a binary number
2. Select option `[2]` to view examples
3. Select option `[3]` for help
4. Select option `[0]` to exit

## Examples

| Input | Output |
|-------|--------|
| `101` | `5` |
| `1011` | `11` |
| `11111111` | `255` |
| `0b1010` | `10` |

## Error Handling

The converter validates input and provides clear error messages:

- **No input provided**: Displays usage instructions
- **Invalid binary string**: Reports error if characters other than `0` or `1` are used

## How It Works

The converter uses the standard binary-to-decimal algorithm:
1. Validates that the input contains only `0` and `1` characters
2. Iterates through each digit from right to left
3. Multiplies each digit by 2 raised to the power of its position
4. Sums all values to produce the decimal result

## Author

Made by Gordon

## License

This project is open source and available for personal and educational use.
