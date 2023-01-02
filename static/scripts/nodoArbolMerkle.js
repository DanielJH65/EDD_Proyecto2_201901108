import { ListaSimple } from "./listaSimple.js"

export class NodoArbolMerkle{
    constructor(_hash){
        this.hash = _hash
        this.left = null
        this.right = null
    }
}

export class NodoBloqueArbolMerkle{
    constructor(_dato){
        this.dato = _dato
    }
}