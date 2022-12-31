export class Actor{
    constructor(_dni, _nombre_actor, _correo, _descripcion){
        this.dni = _dni
        this.name = _nombre_actor
        this.mail = _correo
        this.description = _descripcion
    }
}

export class Categoria{
    constructor(_id, _company){
        this.id = _id
        this.company = _company
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
