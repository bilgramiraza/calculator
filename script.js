const display=document.querySelector('.calcScreen');

const numberBtn=document.querySelectorAll('.numbers');
const operatorBtn=document.querySelectorAll('.operation');
const equalsBtn=document.querySelector('.equals');
let inputA="";
let inputB="";
let operator="";
let result=0;

numberBtn.forEach((button)=>{
    button.addEventListener('click',(event)=>{
        if(operator===""){
            inputA+=event.target.textContent;
            displayUpdate(inputA);
        }
        else{
            inputB+=event.target.textContent;
            displayUpdate(inputB);
        }
    });
});

operatorBtn.forEach((button)=>{
    button.addEventListener('click',(event)=>{
        operator=event.target.textContent;
    });
});

equalsBtn.addEventListener('click',(event)=>{
    result=operate(parseFloat(inputA),parseFloat(inputB),operator);
    displayUpdate(result);
    inputA="";
    inputB="";
    operator="";
});

function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}

function operate(a,b,operator){
    switch (operator) {
        case '+':
            sum=add(a,b);
            break;
        case '-':
            sum=subtract(a,b);
            break;
        case '*':
            sum=multiply(a,b);
            break;
        case '/':if(!b)
                return "Invalid";
            sum=divide(a,b);
            break;
    }
    return sum;
}

function displayUpdate(input){
    display.textContent=input;
}