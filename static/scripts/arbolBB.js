import { NodoArbolBB } from "./nodoArbolBB.js"
export class ArbolBB{
    constructor(){
        this.root = null
    }

    insertar(_dato){
        this.root = this.insertarRecursivo(this.root, _dato)
    }

    insertarRecursivo(_root, _dato){
        if(_root == null){
            _root = new NodoArbolBB(_dato)
        }else if(_root.dato.dni == _dato.dni){
            _root.dato = _dato
        }else if(_root.dato.dni < _dato.dni){
            _root.right = this.insertarRecursivo(_root.right, _dato)
        }else{
            _root.left = this.insertarRecursivo(_root.left, _dato)
        }
        return _root
    }

    graficar(){
        return this.graficarRecursivo(this.root)
    }

    graficarRecursivo(_root){
        let dot = ""
        if(_root != null){
            dot+=`Nodo${_root.dato.dni}[label = "<C0>|${_root.dato.dni}\\n${_root.dato.name}|<C1>"];\n`
            if(_root.left != null){
                dot += this.graficarRecursivo(_root.left)
                dot += `Nodo${_root.dato.dni}:C0 -> Nodo${_root.left.dato.dni}\n`
            }
            if(_root.right != null){
                dot += this.graficarRecursivo(_root.right)
                dot += `Nodo${_root.dato.dni}:C1 -> Nodo${_root.right.dato.dni}\n`
            }
        }
        return dot
    }
}