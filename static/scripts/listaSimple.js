import { NodoSimple } from "./nodoSimple.js"

export class ListaSimple{

    constructor(){
        this.first = null
    }

    insertarInicio(_dato){
        let newNodo = new NodoSimple(_dato)
        newNodo.next = this.first
        this.first = newNodo
    }

    insertarFinal(_dato){
        let newNodo = new NodoSimple(_dato)
        let tmp = this.first
        
        if(this.first == null){
            this.first = newNodo
        }else{
            while(tmp.next != null){
                if(tmp.dato.dpi == _dato.dpi || tmp.dato.username == _dato.username){
                    return false
                }
                tmp = tmp.next
            }
            if(tmp.dato.dpi == _dato.dpi || tmp.dato.username == _dato.username){
                return false
            }
            tmp.next = newNodo
        }
        return true
    }

    imprimir(){
        let tmp = this.first
        while(tmp != null){
            console.log(tmp.dato)
            tmp = tmp.next
        }
    }

    buscarUser(_username, _password, _admin){
        let tmp = this.first
        while(tmp != null){
            if(tmp.dato.username == _username && tmp.dato.password == _password && tmp.dato.admin == _admin){
                return tmp
            }
            tmp = tmp.next
        }
        return null
    }

    buscarUser2(_username){
        let tmp = this.first
        while(tmp != null){
            if(tmp.dato.username == _username){
                return tmp
            }
            tmp = tmp.next
        }
        return null
    }

    graficarUser(){
        let tmp = this.first
        let dot = ""
        while(tmp != null){
            dot += `Nodo${tmp.dato.dpi} [label = "${tmp.dato.dpi}\\n${tmp.dato.username}\\n${tmp.dato.name}\\n${tmp.dato.password}\\n${tmp.dato.phone}\\n${tmp.dato.admin}"];\n`
            tmp = tmp.next
        }
        return dot
    }

    graficarConexionesUser(){
        let tmp = this.first
        let dot = ""
        while(tmp.next != null){
            dot += `Nodo${tmp.dato.dpi} -> Nodo${tmp.next.dato.dpi};\n`
            tmp = tmp.next
        }
        return dot
    }

    size(){
        let size = 0
        let tmp = this.first
        while(tmp != null){
            size++
            tmp = tmp.next
        }
        return size
    }

    obtenern(_n){
        let tmp = this.first
        if(tmp != null && _n <= this.size()){
            for (let index = 0; index < _n; index++) {
                tmp = tmp.next
            }
            return tmp.dato
        }
    }

}