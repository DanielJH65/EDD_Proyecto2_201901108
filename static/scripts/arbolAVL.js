import { NodoArbolAVL } from './nodoArbolAVL.js'

export class ArbolAVL {
    constructor() {
        this.root = null
    }

    insertar(_dato){
        this.root = this.insertarRecursivo(this.root, _dato)
    }

    insertarRecursivo(_rama, _dato){
        if(_rama == null){
            return new NodoArbolAVL(_dato)
        }else if(_rama.dato.id == _dato.id){
            Swal.fire('Oops...', 'La pelicula ya existe', 'error')
            return _rama
        }else if(_rama.dato.id < _dato.id){
            _rama.right = this.insertarRecursivo(_rama.right, _dato)
            if(this.altura(_rama.right) - this.altura(_rama.left) == 2){
                if(_rama.right.dato.id < _dato.id){
                    _rama = this.rotacionSimpleDer(_rama)
                }else{
                    _rama = this.rotacionDobleDer(_rama)
                }
            }
        }else{
            _rama.left = this.insertarRecursivo(_rama.left, _dato)
            if((this.altura(_rama.left) - this.altura(_rama.right)) == 2){
                if(_rama.left.dato.id > _dato.id){
                    _rama = this.rotacionSimpleIzq(_rama)
                }else{
                    _rama = this.rotacionDobleIzq(_rama)
                }
            }
        }

        let alturaLeft = this.altura(_rama.left)
        let alturaRight = this.altura(_rama.right)
        let alturaFinal = this.mayor(alturaLeft, alturaRight)
        _rama.height = alturaFinal + 1
        return _rama
    }

    altura(_rama){
        if(_rama == null){
            return -1
        }
        return _rama.height
    }

    mayor(height1, height2){
        return height1 > height2 ? height1 : height2
    }

    rotacionSimpleIzq(temp1) {
		let temp2
		temp2 = temp1.left
		temp1.left = temp2.right
		temp2.right = temp1
		temp1.height = this.mayor(this.altura(temp1.left), this.altura(temp1.right)) + 1
		temp2.height = this.mayor(this.altura(temp2.left), temp1.height) + 1
		return temp2
	}
	
	rotacionDobleIzq(_temp) {
		_temp.left = this.rotacionSimpleDer(_temp.left)		
		return this.rotacionSimpleIzq(_temp)
	}

	rotacionSimpleDer(temp1) {
		let temp2
		temp2 = temp1.right
		temp1.right = temp2.left
		temp2.left = temp1		
		temp1.height = this.mayor(this.altura(temp1.left), this.altura(temp1.right)) + 1
		temp2.height = this.mayor(this.altura(temp2.right), temp1.height) + 1
		return temp2
	}
	
	rotacionDobleDer(_temp) {
		_temp.right = this.rotacionSimpleIzq(_temp.right)
		return this.rotacionSimpleDer(_temp)
	}

    graficar(){
        return this.graficarRecursivo(this.root)
    }

    graficarRecursivo(_root){
        let dot = ""
        if(_root != null){
            dot+=`Nodo${_root.dato.id}[label = "<C0>|${_root.dato.id}\\n${_root.dato.name}|<C1>"];\n`
            if(_root.left != null){
                dot += this.graficarRecursivo(_root.left)
                dot += `Nodo${_root.dato.id}:C0 -> Nodo${_root.left.dato.id}\n`
            }
            if(_root.right != null){
                dot += this.graficarRecursivo(_root.right)
                dot += `Nodo${_root.dato.id}:C1 -> Nodo${_root.right.dato.id}\n`
            }
        }
        return dot
    }

    mosrtrar(){
        this.mostrarRecursivo(this.root)
    }

    mostrarRecursivo(_root){
        
    }
}