const readline = require('readline');

// Create readline interface for input/output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to display the menu
function displayMenu() {
    console.log('\n=== Calculator Menu ===');
    console.log('1. Addition');
    console.log('2. Subtraction');
    console.log('3. Multiplication');
    console.log('4. Division');
    console.log('5. Exit');
    console.log('======================');
    rl.question('Choose an operation (1-5): ', handleMenuChoice);
}

// Function to get two numbers from user
function getTwoNumbers(callback) {
    rl.question('Enter first number: ', (num1) => {
        rl.question('Enter second number: ', (num2) => {
            const n1 = parseFloat(num1);
            const n2 = parseFloat(num2);
            
            if (isNaN(n1) || isNaN(n2)) {
                console.log('Please enter valid numbers!');
                getTwoNumbers(callback);
            } else {
                callback(n1, n2);
            }
        });
    });
}

// Function to perform addition
function add(a, b) {
    console.log(`Result: ${a} + ${b} = ${a + b}`);
}

// Function to perform subtraction
function subtract(a, b) {
    console.log(`Result: ${a} - ${b} = ${a - b}`);
}

// Function to perform multiplication
function multiply(a, b) {
    console.log(`Result: ${a} × ${b} = ${a * b}`);
}

// Function to perform division
function divide(a, b) {
    if (b === 0) {
        console.log('Error: Cannot divide by zero!');
        return;
    }
    console.log(`Result: ${a} ÷ ${b} = ${a / b}`);
}

// Function to handle menu choice
function handleMenuChoice(choice) {
    // Handle empty or undefined input
    if (!choice || choice.trim() === '') {
        console.log('Please enter a valid choice!');
        displayMenu();
        return;
    }
    
    const selectedOption = choice.trim();
    
    switch(selectedOption) {
        case '1':
            console.log('\n--- Addition ---');
            getTwoNumbers((num1, num2) => {
                add(num1, num2);
                displayMenu();
            });
            break;
            
        case '2':
            console.log('\n--- Subtraction ---');
            getTwoNumbers((num1, num2) => {
                subtract(num1, num2);
                displayMenu();
            });
            break;
            
        case '3':
            console.log('\n--- Multiplication ---');
            getTwoNumbers((num1, num2) => {
                multiply(num1, num2);
                displayMenu();
            });
            break;
            
        case '4':
            console.log('\n--- Division ---');
            getTwoNumbers((num1, num2) => {
                divide(num1, num2);
                displayMenu();
            });
            break;
            
        case '5':
            console.log('Goodbye!');
            rl.close();
            break;
            
        default:
            console.log('Invalid choice! Please enter a number between 1 and 5.');
            displayMenu();
    }
}

// Start the application
console.log('Welcome to the Calculator Application!');
displayMenu();

// Handle Ctrl+C (SIGINT) gracefully
rl.on('SIGINT', () => {
    console.log('\nGoodbye!');
    rl.close();
    process.exit(0);
});