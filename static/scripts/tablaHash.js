import { NodoTablaHash } from './nodoTablaHash.js'

export class TablaHash{
    constructor(){
        this.first = null
        this.size = 0
        this.used = 0
    }

    tamanioTabla(_size){
        for (let index = 0; index < _size; index++) {
            this.insertarIndex(index)
        }
    }

    insertarIndex(_index){
        let nuevo = new NodoTablaHash(_index)
        this.size++
        let temp = this.first
        if(temp != null){
            while(temp.next != null){
                temp = temp.next
            }
            temp.next = nuevo
        }else{
            this.first = nuevo
        } 
            
    }

    obtenerIndex(_index){
        let temp = this.first
        while(temp != null){
            if(temp.index == _index) return temp
            temp = temp.next
        }
    }

    insertarValor(_dato){
        let indice = _dato.id % this.size
        let nodo = this.obtenerIndex(indice)
        if(nodo != null){
            if (nodo.lista.size() == 0) this.used++
            nodo.lista.insertarInicio(_dato)
            this.rehashing()
        }
    }

    rehashing(){
        let percetageUsed = this.used/this.size
        if(percetageUsed > 0.75){
            let tablaPrev = this.first
            this.first = null
            this.size = 0
            this.tamanioTabla(this.used*5)
            this.used = 0

            let temp = tablaPrev
            while(temp != null){
                let sizeLista = temp.lista.size()
                for (let index = 0; index < sizeLista; index++) {
                    this.insertarValor(temp.lista.obtenern(index))
                }
                temp = temp.next
            }
        }
    }

    graficar(){
        let dot = this.graficarCabecera()
        dot+= this.graficarValores()
        return dot
    }

    graficarCabecera(){
        let tmp = this.first
        let dot = ""
        while(tmp != null){
            dot += `Nodo${tmp.index} [label = "${tmp.index}", group = 1];\n`
            tmp = tmp.next
        }
        tmp = this.first
        while(tmp.next != null){
            dot += `Nodo${tmp.index} -> Nodo${tmp.next.index}\n`
            tmp = tmp.next
        }
        return dot
    }

    graficarValores(){
        let tmp = this.first
        let dot = ""
        while(tmp != null){
            let tmpValores = tmp.lista.first
            let group = 2
            while(tmpValores != null){
                dot += `Nodo${tmp.index.toString() + tmpValores.dato.id} [label = "${tmpValores.dato.id}\\n${tmpValores.dato.company}", group = ${group}];\n`
                tmpValores = tmpValores.next
                group++
            }
            /*tmpValores = tmp.lista.first
            dot += `{rank = same;Nodo${tmp.index};`
            group = 2
            while(tmpValores != null){
                dot += `Nodo${tmp.index.toString() + tmpValores.dato.id};`
                tmpValores = tmpValores.next
                group++
            }
            dot += "}\n"*/
            
            tmpValores = tmp.lista.first
            if(tmpValores != null){
                while(tmpValores.next != null){
                    dot += `Nodo${tmp.index.toString() + tmpValores.dato.id} -> Nodo${tmp.index.toString() + tmpValores.next.dato.id}\n`
                    tmpValores = tmpValores.next
                }
                dot += `Nodo${tmp.index} -> Nodo${tmp.index.toString() + tmp.lista.first.dato.id}\n`
            }
            tmp = tmp.next
        }
        return dot
    }

    mostrar(){
        const categoriasList = document.getElementById("categoriasList")
        let temp1 = this.first
        while(temp1 != null){
            let temp2 = temp1.lista.first
            while(temp2 != null){
                categoriasList.innerHTML += `
                <div class = "bg-[#0a283f] flex flex-col items-center justify-center text-justify text-gray-100 mx-5 px-3 my-8 py-8 rounded-3xl">
                    <h1 class="py-4"><b>${temp2.dato.id}</b></h1>
                    <h2 class="py-4"><b>Company: ${temp2.dato.company}</b></h2>
                </div>
                `
                temp2 = temp2.next
            }
            temp1 = temp1.next
        }
    }
}