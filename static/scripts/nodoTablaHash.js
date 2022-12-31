import { ListaSimple } from "./listaSimple.js"

export class NodoTablaHash {
    constructor(_index) {
        this.index = _index
        this.lista = new ListaSimple()
        this.next = null
    }
}