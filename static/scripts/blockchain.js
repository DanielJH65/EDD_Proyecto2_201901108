import { ArbolMerkle } from './arbolMerkle.js'
import { ListaSimple } from './listaSimple.js'
import { NodoBlockchain } from './nodoBlockchain.js'
import { Bloque } from './objetos.js'

export class Blockchain {
    constructor() {
        this.first = null
        this.last = null
        this.size = 0
        this.transaccionesTemp = new ArbolMerkle()
    }

    insertar(_dato) {
        let nuevo = new NodoBlockchain(_dato)
        this.size++
        if (this.first == null) {
            this.first = nuevo
            this.last = nuevo
        } else {
            nuevo.prev = this.last
            this.last.next = nuevo
            this.last = nuevo
        }
    }

    generarBloque(_merkle) {
        let date = this.obtenerDate()
        let hashprev = ""
        if (this.size == 0) {
            hashprev = "00"
        } else {
            hashprev = this.last.dato.hash
        }

        _merkle.autenticar()
        let datos = new ListaSimple()
        datos = _merkle.dataBlock.first
        let hashMerkle = _merkle.topHash.hash
        this.transaccionesTemp.topHash = _merkle.topHash
        this.transaccionesTemp.dataBlock.first = _merkle.dataBlock.first
        this.transaccionesTemp.size = _merkle.size
        this.transaccionesTemp.index = _merkle.index
        let nonce = 0
        let hash = ""

        while (!hash.startsWith("00")) {
            hash = sha256(this.size + date + hashprev + hashMerkle + nonce);
            nonce++
        }

        let nuevo = new Bloque(this.size, date, datos, nonce, hashprev, hashMerkle, hash)
        this.insertar(nuevo)
        _merkle.limpiar()
    }

    obtenerDate() {
        let date = new Date(Date.now())
        let day = date.getDate().toString()
        let month = (date.getMonth() + 1).toString()
        let year = (date.getYear() - 100).toString()
        let hours = date.getHours().toString()
        let minutes = date.getMinutes().toString()
        let seconds = date.getSeconds().toString()

        let date2 = this.convertirA2(day) + "-" + this.convertirA2(month) + "-" + this.convertirA2(year) + "-::" + this.convertirA2(hours) + ":" + this.convertirA2(minutes) + ":" + this.convertirA2(seconds)
        return date2
    }

    convertirA2(string) {
        if (string.length == 1) string = "0" + string
        return string
    }

    graficar() {
        let temp = this.first
        let dot = ""
        while (temp != null) {
            dot += `Nodo${temp.dato.index}[label="Bloque ${temp.dato.index}\\nNONCE: ${temp.dato.nonce}\\nHash: ${temp.dato.hash}\\nPrev: ${temp.dato.hashPrev}\\nRoot Merkle: ${temp.dato.merkle}\\nTransacciones: [\\n${this.listaTransacciones(temp.dato.transactions)}]\\nFecha: ${temp.dato.date}"];\n`
            if(temp.dato.index > 0){
                dot+=`Nodo${temp.dato.index-1} -> Nodo${temp.dato.index};`
            }
            temp = temp.next
        }
        return dot
    }

    listaTransacciones(transactions) {
        console.log(transactions)
        let text = ""
        let temp = transactions
        while (temp != null) {
            text += temp.dato.username + " <=> " + temp.dato.movie + "\\n"
            temp = temp.next
        }
        return text
    }

    graficar2() {
        return this.transaccionesTemp.graficar()
    }
}