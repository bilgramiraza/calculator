window.onload=init();       //Initializing Function call

// #1 Initializing Function//////////////////////////////////////
function init() {
    let calc={                  
        inputA:"",              //Input done in strings to avoid calculating values 
        inputB:"",              //of each multi-digit input since they will be entered 
        operator:"",            //backwards (Left To Right)
        result:"",
        };
    //Binding DOM elements to variables    
    const numberBtn=document.querySelectorAll('.numbers');      //binds a 'nodelist' of all numbers to the variable
    const dotBtn=document.querySelector('#dot');                //binds "." Button to variable
    const operatorBtn=document.querySelectorAll('.operation');  //binds a 'nodelist' of all operations to the variable
    const equalsBtn=document.querySelector('#equal');           //binds "=" Button to variable
    const allClearBtn=document.querySelector('#allClear');      //binds "AC" Button to variable
    const clearBtn=document.querySelector('#clear');            //binds "C" Button to variable
    const extraBtn=document.querySelector('.extra');
    //Binding DOM elements to variables 
    
    //////Event Handlers///////////////////////////////////////
    //Goes through each element in the node list and add an event listener to it
    numberBtn.forEach((button)=>{
        button.addEventListener('click',(event)=>{     //waits for when a 'number' is clicked
            adder(calc,event.target.textContent);      //Adds number(stored in text content) to the appropriate variable
            display(calc);                             //displays the recently modified number string
        });
    });

    dotBtn.addEventListener('click',(event)=>{         //waits for when the decimal point button is clicked
        //Checks if the current operator is blank AND that the first number has a decimal in it already.
        // if both are false checks if the second number has a decimal in it. 
        //if condition is true ignores the input since a single number cannot have multiple decimal points
        if((calc.operator===""&&calc.inputA.includes('.'))||calc.inputB.includes('.'));//<- note the semicolon
        //if both sides of the OR check above fail goes ahead and adds "." to the appropriate number and displays the new number
        else{
            adder(calc,".");
            display(calc);
        }
    });

    //goes through each element in the operation nodelist and adds an event listener to it
    operatorBtn.forEach((button)=>{
        button.addEventListener('click',(event)=>{          //waits for when an 'operation' is clicked
            if(calc.operator!==""&&calc.inputB!==""){       //Condition for multi-operator calculations
                                                            //(more than 2 numbers without any '=' in between)
                operate(calc);                              //calculates the value of the 2 numbers 
                display(calc,true);                         //displays it
                adder(calc,"",true);                        //then places the result to the first number and empties the second 
                                                            //number for further operations
                calc.operator=event.target.textContent;     //finally stores this new operation for the operation between the next 2 numbers
            }
            else{
                calc.operator=event.target.textContent;     //adds operation to the variable for calculations
                display(calc);
            }
        });
    });

///////////////////////////////////////////////////    
    equalsBtn.addEventListener('click',(event)=>{   //waits for when the 'Equals to'(=) button is clicked
        if(calc.inputB!==""){                       //checks to make sure the button hasn't been pressed prematurely 
            operate(calc);                          //calculates the value of the 2 numbers 
            display(calc,true);                     //displays it
            adder(calc,"",true);                    //then places the result to the first number and empties the second
        }                                           //number for further operations, if any.
    });
    ///////////////////////////////////////////////////    
    
    allClearBtn.addEventListener('click',()=>{      //waits for when the 'All Clear'(AC) button is clicked
        calc.inputA="";                             //Sets all values to Zero or empty
        calc.inputB="";
        calc.operator="";
        calc.result="0";
        display(calc,true);                         //updates the display
    });

    clearBtn.addEventListener('click',()=>{         //waits for when the 'Clear'(C) button is clicked
        if(calc.operator==="")  calc.inputA=calc.inputA.slice(0,calc.inputA.length-1);  //Checks which number has to be operated on
        else calc.inputB=calc.inputB.slice(0,calc.inputB.length-1); //Then removes the last added character from the string
        display(calc);  //displays modified number
    });

    extraBtn.addEventListener('click',()=>{advancedPanel(calc)});
//////Event Handlers///////////////////////////////////////
}
//End of Initializing Function

// #2 Adder Function//////////////////////
//Responsible for adding integers to the end of the number string.
//Determines which number to operate on, on the basis of the state of the 'operator' variable
//(empty)=>Number1
//(Any other value)=>Number 2
//Also has an special 'result' flag in case we want to add the result from the last calculation to the first number(multi-step calculations)
//in which case it clears the operator and second input variable while placing the result into the first number variable
function adder(obj,input,result=false){
    if(result){
        obj.operator="";
        obj.inputA=obj.result;
        obj.inputB="";
    }
    else if(obj.operator==="")  obj.inputA+=input;  //if operator is empty string concatenate new number to the end of the string of number 1
    else    obj.inputB+=input;  //Else do it for number 2 variable
}
//End of Adder Function

// #3 Advanced operations Function///////////////////
function advancedPanel(obj) {
    const advanceBtn=document.querySelectorAll('.advanced');
    advanceBtn.forEach((button)=>{
        button.addEventListener('click',(event)=>{
            obj.operator=event.target.id;
            console.log(obj.operator);
            operate(obj);
            display(obj,true);
            adder(obj,"",true);
        });
    });
}
///////////////////////////////

// #4 Display Function/////////////////// 
//Responsible for displaying numbers on the webpage.
//Determines which number to display, on the basis of the state of the 'operator' variable
//(empty)=>Number1
//(Any other value)=>Number 2
//Also has an special 'result' flag in case we want to show the result from the last calculation(multi-step calculations)
function display(obj,result=false) {
    const operation=document.querySelector('.operationDisplay');
    const input=document.querySelector('.inputDisplay');
    const history=document.querySelector('.historyDisplay');

    if(result){
        operation.textContent=(obj.operator===""?" ":obj.operator);
        input.textContent=(obj.result===""?" ":obj.result);
        history.textContent=(obj.inputB===""?" ":obj.inputB);
    }
    else if(obj.operator===""){
        operation.textContent=(obj.operator===""?" ":obj.operator);
        input.textContent=(obj.inputA===""?" ":obj.inputA);
        history.textContent=(obj.result===""?" ":obj.result);
    }
    else{
        operation.textContent=(obj.operator===""?" ":obj.operator);
        input.textContent=(obj.inputB===""?" ":obj.inputB);
        history.textContent=(obj.inputA===""?" ":obj.inputA);
    }
}
//End of Display Function

// #5 Operate Function/////////////////// 
// Responsible for deciding which operation to perform on the numbers provided
function operate(obj) {
    let temp1,temp2;
    let result;
    let textresult;
    if(obj.inputA==="") temp1=0;    //Assumes the empty variable for zero and stores them in a temporary variable
    else    temp1=parseFloat(obj.inputA);   //if the variable isn't empty, converts it to a float number and stores them

    if(obj.inputB==="") temp2=0;
    else    temp2=parseFloat(obj.inputB);

    switch (obj.operator) {         //Applies the proper calculation to the numbers based on the operator and stores the result.
        case '+':result=add(temp1,temp2);
            break;
        case '-':result=subtract(temp1,temp2);
            break;
        case '*':result=multiply(temp1,temp2);
            break;
        case '/':result=divide(temp1,temp2);
            break;
        case '%':result=percent(temp1,temp2);
            break;   
        case 'square':result=exponent(temp1);
            break;
        case 'factorial':result=factorial(temp1);
            break;
        case 'sqroot':result=Math.sqrt(temp1);
            break;
        case 'sine':result=Math.sin(temp1);
            break;
        case 'cosine':result=Math.cos(temp1);
            break;
        case 'tangent':result=Math.tan(temp1);
            break;
        case 'euler':result=Math.E;
            break;
        case 'pi':result=Math.PI;
            break;
    }
    if(result===undefined){
        obj.result="0";
        return;
    }
    else if(Number.isNaN(result)){
        obj.result="0";
        alert("INVALID INPUT");
        return;
    }
    textresult=result.toString(10);//converts the result into a string and stores it into a temp variable  
    if(textresult.includes('.')){   //check for numbers with too many decimal numbers
        let precision=(textresult.length-1)-textresult.indexOf('.');    //subtracts the position of the . from the length of the string
        if(precision>15)                                                //if more than 15 numbers
            textresult=result.toPrecision(15);                          //rounds it down to 15
    }
    obj.result=textresult;//returns it to the Object(objects are 'passed by reference')
}
//End of operate Function

// #6 Calculation Functions ////////////
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
    if(!b)  return NaN;
    return a/b;
}
function percent(a,b){
    return (a/100)*b;
}
function exponent(a){
    return a**2;
}
function factorial(a) {
    let result=1;
    while(a){
        result*=a;
        --a;
    }
    return result;
}

//End of calculation Functions