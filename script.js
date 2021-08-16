const numberBtn=document.querySelectorAll('.numbers');
const operatorBtn=document.querySelectorAll('.operation');
const equalsBtn=document.querySelector('.equals');
const allClearBtn=document.querySelector('#allClear');
const clearBtn=document.querySelector('#clear');

let inputA="";
let inputB="";
let operator="";
let result=0;

numberBtn.forEach((button)=>{
    button.addEventListener('click',(event)=>{
        if(operator===""){
            if(inputA.includes('.')&&event.target.textContent===".")
                inputA+="";
            else
                inputA+=event.target.textContent;
            displayUpdate(inputA);
        }
        else{
            if(inputB.includes('.')&&event.target.textContent===".")
                inputB+="";
            else
                inputB+=event.target.textContent;
            displayUpdate(inputB);
        }
    });
});

operatorBtn.forEach((button)=>{
    button.addEventListener('click',(event)=>{
        if(operator!==""&&inputB!==""){
            result=operate(inputA,inputB,operator);
            inputA=result.toString(10);
            inputB="";
            operator=event.target.textContent;
        }   
        else
            operator=event.target.textContent;
    });
});

equalsBtn.addEventListener('click',(event)=>{
    if(inputB!==""){
        result=operate(inputA,inputB,operator);
        displayUpdate(result);
        inputA=result.toString(10);
        inputB="";
    }
});

allClearBtn.addEventListener('click',()=>{
    inputA="";
    inputB="";
    operator="";
    result=0;
    displayUpdate(result);
});

clearBtn.addEventListener('click',()=>{
    if(operator===""){
        inputA=inputA.slice(0,inputA.length-1);
        displayUpdate(inputA);
    }
    else{
        inputB=inputB.slice(0,inputB.length-1);
        displayUpdate(inputB);
    }
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
function percent(a,b){
    return (a/100)*b;
}

function operate(a,b,operator){
    let result=0;
    if(a==="")
        a=0;
    else
        a=parseFloat(a);
    if(b==="")
        b=0;
    else
        b=parseFloat(b);
    switch (operator) {
        case '+':
            result=add(a,b);
            break;
        case '-':
            result=subtract(a,b);
            break;
        case '*':
            result=multiply(a,b).toFixed(16);
            break;
        case '/':if(!b){
                alert("INVALID");
                break;
            }
            result=divide(a,b).toFixed(16);
            break;
        case '%':if(!b){
                alert("INVALID");
                break;
            }
            result=percent(a,b).toFixed(16);
            break;
    }
    return result;
}

function displayUpdate(input){
    const display=document.querySelector('.calcScreen');
    display.textContent=input;
}