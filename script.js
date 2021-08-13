function add(a,b){
    return a+b;
}
function Subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if(!a || !b)
        return "Invalid";
    return a/b;
}

function operate(){
    let a=parseFloat(prompt("Enter the First Numbers"),10);
    let b=parseFloat(prompt("Enter the First Numbers"),10);
    let operator =prompt("Enter the Operation(+,-,*,/)");
    let result;
    switch (operator) {
        case '+':
            result=add(a,b);
            break;
        case '-':
            result=Subtract(a,b);
            break;
        case '*':
            result=multiply(a,b);
            break;
        case '/':
            result=divide(a,b);
            break;
    }
    console.log(result);
}
//operate();