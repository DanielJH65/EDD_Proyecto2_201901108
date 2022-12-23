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