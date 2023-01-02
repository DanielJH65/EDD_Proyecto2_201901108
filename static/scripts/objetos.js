import { ListaSimple } from "./listaSimple.js"

export class Actor{
    constructor(_dni, _nombre_actor, _correo, _descripcion){
        this.dni = _dni
        this.name = _nombre_actor
        this.mail = _correo
        this.description = _descripcion
    }
}

export class Bloque{
    constructor(_index, _fecha, _dato, _nonce, _hashPrev, _merkle, _hash){
        this.index = _index
        this.date = _fecha
        this.transactions = _dato
        this.nonce = _nonce
        this.hashPrev = _hashPrev
        this.merkle = _merkle
        this.hash = _hash
    }
}

export class Categoria{
    constructor(_id, _company){
        this.id = _id
        this.company = _company
    }
}

export class Comentario{
    constructor(_username, _comentario){
        this.username = _username
        this.comentario = _comentario
    }
}

export class Pelicula{
    constructor(_id, _nombre, _descripcion, _star, _precio, _paginas, _categoria){
        this.id = _id
        this.name = _nombre
        this.description = _descripcion
        this.stars = _star
        this.price = _precio
        this.pages = _paginas
        this.category = _categoria
        this.comentarios = new ListaSimple()
    }
}

export class PeliculaAlquilada{
    constructor(_movie, _user){
        this.movie = _movie
        this.username = _user 
    }
}

export class Usuario{
    constructor(_dpi, _nombre_completo, _nombre_usuario, _correo, _contra, _telefono, _admin){
        this.admin = _admin
        this.dpi = _dpi
        this.mail = _correo
        this.name = _nombre_completo
        this.password = _contra
        this.phone = _telefono
        this.username = _nombre_usuario
    }
}
