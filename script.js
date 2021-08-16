window.onload=init();

function init() {
    let calc={
        inputA:"",
        inputB:"",
        operator:"",
        result:"",
        };
    const numberBtn=document.querySelectorAll('.numbers');
    const dotBtn=document.querySelector('#dot');
    const operatorBtn=document.querySelectorAll('.operation');
    const equalsBtn=document.querySelector('#equal');
    const allClearBtn=document.querySelector('#allClear');
    const clearBtn=document.querySelector('#clear');


    numberBtn.forEach((button)=>{
        button.addEventListener('click',(event)=>{
            adder(calc,event.target.textContent);
            display(calc);
        });
    });

    dotBtn.addEventListener('click',(event)=>{
        if((calc.operator===""&&calc.inputA.includes('.'))||calc.inputB.includes('.'));//If true ignores input
        else{
            adder(calc,".");
            display(calc);
        }
    });

    operatorBtn.forEach((button)=>{
        button.addEventListener('click',(event)=>{
            if(calc.operator!==""&&calc.inputB!==""){
                operate(calc);
                display(calc,true);
                adder(calc,"",true);
                calc.operator=event.target.textContent;
            }
            else
                calc.operator=event.target.textContent;
        });
    });

    equalsBtn.addEventListener('click',(event)=>{
        if(calc.inputB!==""){
            operate(calc);
            display(calc,true);
            adder(calc,"",true);
        }
    });

    allClearBtn.addEventListener('click',()=>{
        calc.inputA="";
        calc.inputB="";
        calc.operator="";
        calc.result="0";
        display(calc,true);
    });

    clearBtn.addEventListener('click',()=>{
        if(calc.operator==="")  calc.inputA=calc.inputA.slice(0,calc.inputA.length-1);
        else calc.inputB=calc.inputB.slice(0,calc.inputB.length-1);
        display(calc);
    });
}

function adder(obj,input,result=false){
    if(result){
        obj.operator="";
        obj.inputA=obj.result;
        obj.inputB="";
    }
    else if(obj.operator==="")  obj.inputA+=input;
    else    obj.inputB+=input;
}

function display(obj,result=false) {
    const displayPanel=document.querySelector('.calcScreen');
    if(result)  displayPanel.textContent=obj.result;
    else if(obj.operator==="")  displayPanel.textContent=obj.inputA;
    else    displayPanel.textContent=obj.inputB;  
}

function operate(obj) {
    let a;
    let b;
    let result;
    if(obj.inputA==="") a=0;
    else    a=parseFloat(obj.inputA);

    if(obj.inputB==="") b=0;
    else    b=parseFloat(obj.inputB);

    switch (obj.operator) {
        case '+':result=add(a,b);
            break;
        case '-':result=subtract(a,b);
            break;
        case '*':result=multiply(a,b);
            break;
        case '/':result=divide(a,b);
            break;
        case '%':result=percent(a,b);
            break;   
    }
    obj.result=result.toString(10);
}
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
    if(!b){
        alert("Divide By Zero Error");
        return 0;
    }
    return a/b;
}
function percent(a,b){
    return (a/100)*b;
}