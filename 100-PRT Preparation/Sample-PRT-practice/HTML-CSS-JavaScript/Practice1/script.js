const display = document.getElementById('display') ;
const incBtn = document.getElementById('incBtn') ;
const decBtn = document.getElementById('decBtn') ;
const resetBtn = document.getElementById('resetBtn') ;

let count = 0 ;

function updateDisplay(){
    display.textContent = count ;
} ;

incBtn.addEventListener("click", function (){
    count = count + 1 ;
    updateDisplay() ;
}) ;

decBtn.addEventListener("click", function (){
    count = count - 1 ;
    updateDisplay() ;
}) ;

resetBtn.addEventListener("click", function (){
    count = 0 ;
    updateDisplay() ;
}) ;
