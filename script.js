let operate = (a, b, op) => {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
    }
    return undefined;
} 

let precedence = (op) => {
    switch (op) {
        case '+': return 1;
        case '-': return 1;
        case '*': return 2;
        case '/': return 2;
    }
    return 0;
}

let infixToPostfix = (expression) => {
    let tokens = expression.split(' ');
    let stack = [];
    let postfix = '';
    for (let token of tokens) {
        if (!isNaN(token)) {
            postfix += token + ' ';
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                postfix += stack.pop() + ' ';
            }
            stack.pop();
        } else {
            while (stack.length > 0 && precedence(token) <= precedence(stack[stack.length - 1])) {
                postfix += stack.pop() + ' ';
            }
            stack.push(token);
        }
    }
    while (stack.length > 0) {
        postfix += stack.pop() + ' ';
    }
    return postfix;
}

let evaluate = (expression) => {
    let postfix = infixToPostfix(expression);
    let tokens = postfix.split(' ').filter(token => token !== '');
    let stack = [];
    for (let token of tokens) {
        if (!isNaN(token)) {
            stack.push(token);
        } else {
            let b = stack.pop();
            let a = stack.pop();
            stack.push(operate(+a, +b, token));
        }
    }
    return stack[0];
}


const MAX_CHARS = 30;
let expression = '';
let chars_count = 0;

let expression_div = document.querySelector('.expression');
let result_div = document.querySelector('.result');
let calculator_div = document.querySelector('.calculator');

calculator_div.addEventListener('click', (e) => {
    let id = e.target.id;
    switch (id) {
        case "DEL":
            while (expression.slice(-1) === ' ') {
                expression = expression.slice(0, -1);
            }
            expression = expression.slice(0, -1);
            chars_count--;
            break;
        case "AC":
            expression = '';
            result = '';
            chars_count = 0;
            break;
        case "=":
            let result = evaluate(expression);
            result_div.innerText = result;
            break;
        default:
            if (chars_count >= MAX_CHARS) {
                return;
            }
            const last_char = expression.slice(-1);
            expression += ' ';
            if (expression.length > 0 && !isNaN(last_char) && !isNaN(id)) {
                expression = expression.slice(0, -1);
                console.log(expression);
            }
            expression += id;
            chars_count++;
            break;
    }
    expression_div.innerText = expression;
    result_div.innerText = result;
});
