class Cartesiana {
    #x;
    #y;
    constructor (x,y){
        this.#x=x;
        this.#y=y;
    }
    setx(x){
        this.#x=x;
    }
    sety(y){
        this.#y=y;
    }
    getx(){
        return this.#x
    }
}
const m= new Cartesiana(15,21)
console.log(m.getx())