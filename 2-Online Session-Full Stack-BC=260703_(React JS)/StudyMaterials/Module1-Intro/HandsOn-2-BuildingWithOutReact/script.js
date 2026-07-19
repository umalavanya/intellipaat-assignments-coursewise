function render(children){

   const main = document.getElementById('main') ;
   main.appendChild(children) ;
   
}

function h1(children){
    const element = document.createElement("h1") ;
    element.appendChild(children) ;
    return element ;
}

function text(content){
    return document.createTextNode(content) ;
}

render(h1(text("UI without React"))) ;