import { NodoArbolMerkle, NodoBloqueArbolMerkle } from "./nodoArbolMerkle.js"
import { PeliculaAlquilada } from "./objetos.js"
import { ListaSimple } from './listaSimple.js'
import './js-sha256.js'

export class ArbolMerkle {
    constructor() {
        this.topHash = null
        this.dataBlock = new ListaSimple()
        this.size = 0
        this.index = 0
    }

    insertar(_dato) {
        this.dataBlock.insertarFinal2(_dato)
        this.size++
    }

    crearArbol(exp) {
        this.topHash = new NodoArbolMerkle(0)
        this.crearArbolRecursivo(this.topHash, exp)
    }

    crearArbolRecursivo(_rama, exp) {
        if (exp > 0) {
            _rama.left = new NodoArbolMerkle(0)
            _rama.right = new NodoArbolMerkle(0)
            this.crearArbolRecursivo(_rama.left, exp - 1)
            this.crearArbolRecursivo(_rama.right, exp - 1)
        }
    }

    generarHash(_rama, _n) {
        if (_rama != null) {
            this.generarHash(_rama.left, _n)
            this.generarHash(_rama.right, _n)

            if (_rama.left == null && _rama.right == null) {
                _rama.left = this.dataBlock.obtenern(_n - this.index)
                this.index--
                _rama.hash = sha256(_rama.left.username + " - " + _rama.left.movie)
            } else {
                _rama.hash = sha256(_rama.left.hash + _rama.right.hash)
            }
        }
    }

    autenticar() {
        let exp = 1

        while (Math.pow(2, exp) < this.dataBlock.size()) exp++

        for (let i = this.dataBlock.size(); i < Math.pow(2, exp); i++) this.dataBlock.insertarFinal2(new PeliculaAlquilada("0", "1"))

        this.index = Math.pow(2, exp)
        this.crearArbol(exp)
        this.generarHash(this.topHash, Math.pow(2, exp))
    }

    limpiar() {
        this.dataBlock.limpiar()
        this.topHash = null
        this.size = 0
    }

    graficar() {
        return this.graficarRecursivo(this.topHash, 0, "")
    }

    graficarRecursivo(_root, nivel, pos) {
        let dot = ""
        if (_root != null) {
            if (_root.left != null && _root.right == null) {
                dot += `Nodo${_root.hash+nivel+pos}[label = "${_root.hash}"];\n`
                dot += `Nodo${(_root.left.movie).replaceAll(' ','')+(nivel+1)+pos+"l"}[shape=component, label="Usuario: ${_root.left.username}\\nPelicula: ${_root.left.movie}"]`
                dot += `Nodo${_root.hash+nivel+pos} -> Nodo${(_root.left.movie).replaceAll(' ','')+(nivel+1)+pos+"l"}\n`
            } else {
                dot += `Nodo${_root.hash+nivel+pos}[label = "<C0>|${_root.hash}|<C1>"];\n`
                if (_root.left != null) {
                    dot += this.graficarRecursivo(_root.left, nivel+1, pos+"l")
                    dot += `Nodo${_root.hash+nivel+pos}:C0 -> Nodo${_root.left.hash+(nivel+1)+pos+"l"}\n`
                }
                if (_root.right != null) {
                    dot += this.graficarRecursivo(_root.right, nivel+1, pos+"r")
                    dot += `Nodo${_root.hash+nivel+pos}:C1 -> Nodo${_root.right.hash+(nivel+1)+pos+"r"}\n`
                }
            }
        }
        return dot
    }
}