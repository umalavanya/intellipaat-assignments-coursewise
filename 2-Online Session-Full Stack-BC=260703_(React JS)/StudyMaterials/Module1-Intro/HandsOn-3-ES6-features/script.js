const greetPersonOld = function(name){
    return "Hello" + name ;
}

const greetPerson = name => 'Hello' + name ;

console.log(greetPersonOld('John')) ;
console.log(greetPerson('Jane')) ;