import { ArbolBB } from './arbolBB.js'
import { ArbolAVL } from './arbolAVL.js'
import { ListaSimple } from './listaSimple.js'
import { Actor, Pelicula, Usuario } from './objetos.js'
import $ from './query.js'
import './js-sha256.js'

// Secciones para mostrar y ocultar

const loginSection = $('#login')
const signinSection = $('#signin')
const adminSection = $('#admin')
const userSection = $('#user')

export function hideLogin() {
    loginSection.setAttribute("class", "bg-[#003B22] min-h-screen hidden items-center justify-center")
}

export function showLogin() {
    loginSection.setAttribute("class", "bg-[#003B22] min-h-screen flex items-center justify-center")
}

export function showSignin() {
    signinSection.setAttribute("class", "bg-[#003B22] min-h-screen flex items-center justify-center")
}

export function hideSignin() {
    signinSection.setAttribute("class", "bg-[#003B22] min-h-screen hidden items-center justify-center")
}

export function showAdmin() {
    adminSection.setAttribute("class", "block")
}

export function hideAdmin() {
    adminSection.setAttribute("class", "hidden")
}

export function showUser() {
    userSection.setAttribute("class", "block")
}

export function hideUser() {
    userSection.setAttribute("class", "hidden")
}

// Estructuras

const usuarios = new ListaSimple()
const actores = new ArbolBB()
const peliculas = new ArbolAVL()
//const categorias = new ListaListas()

let usuarioActual

usuarios.insertarFinal(new Usuario(2354168452525, "Oscar Armin", "EDD", "", sha256("12345678"), "12345678", true))

//Login

export function login(e) {
    const username = $('#usernamelogin')
    const password = $('#passwordlogin')
    const admin = $('#adminlogin')

    usuarioActual = usuarios.buscarUser(username.value, sha256(password.value), admin.checked)

    if (usuarioActual != null) {
        hideLogin()
        if (usuarioActual.dato.admin) {
            showAdmin()
        } else {
            showUser()
        }
    } else {
        Swal.fire('Oops...', 'Usuario o contraseña incorrectos', 'warning')
    }

    e.preventDefault()

    username.value = ""
    password.value = ""
    admin.checked = false

}

// Admin

export function ingresarUsuarios() {
    Swal.fire({
        title: 'Carga masiva de clientes',
        html: `<input type="file" id="fileUser" class="swal2-input">`,
        confirmButtonText: 'Cargar',
        focusConfirm: false,
        preConfirm: () => {
            const fileuser = Swal.getPopup().querySelector('#fileUser').files[0]
            return fileuser
        }
    }).then((result) => {
        const reader = new FileReader()

        reader.addEventListener("load", () => {
            let datos = JSON.parse(reader.result)
            datos.forEach(user => {
                usuarios.insertarFinal(new Usuario(user.dpi, user.nombre_completo, user.nombre_usuario, user.correo, sha256(user.contrasenia), user.telefono, false))
            });
            Swal.fire("Registrados...", 'Carga masiva realizada', 'success')
        })

        reader.readAsText(result.value)
    })
}

export function ingresarPeliculas() {
    Swal.fire({
        title: 'Carga masiva de peliculas',
        html: `<input type="file" id="fileMovies" class="swal2-input">`,
        confirmButtonText: 'Cargar',
        focusConfirm: false,
        preConfirm: () => {
            const fileuser = Swal.getPopup().querySelector('#fileMovies').files[0]
            return fileuser
        }
    }).then((result) => {
        const reader = new FileReader()

        reader.addEventListener("load", () => {
            let datos = JSON.parse(reader.result)
            datos.forEach(user => {
                peliculas.insertar(new Pelicula(user.id_pelicula, user.nombre_pelicula, user.descripcion, user.puntuacion_star, user.precion_Q, user.paginas, user.categoria))
            });
            Swal.fire("Registrados...", 'Carga masiva realizada', 'success')
        })

        reader.readAsText(result.value)
    })
}

export function ingresarActores() {
    Swal.fire({
        title: 'Carga masiva de actores',
        html: `<input type="file" id="fileActores" class="swal2-input">`,
        confirmButtonText: 'Cargar',
        focusConfirm: false,
        preConfirm: () => {
            const fileuser = Swal.getPopup().querySelector('#fileActores').files[0]
            return fileuser
        }
    }).then((result) => {
        const reader = new FileReader()

        reader.addEventListener("load", () => {
            let datos = JSON.parse(reader.result)
            datos.forEach(user => {
                actores.insertar(new Actor(user.dni, user.nombre_actor, user.correo, user.descripcion))
            });
            Swal.fire("Registrados...", 'Carga masiva realizada', 'success')
        })

        reader.readAsText(result.value)
    })
}

//Graficas Admin

export function graficarUsuarios() {
    let dot = "digraph G {\n"
    dot += "node[shape=component, style=\"filled\", color=\"gray\"];\n"
    dot += usuarios.graficarUser()
    dot += usuarios.graficarConexionesUser()
    dot += "rankdir= LR;\n}\n"

    if (document.getElementById("imgAdmin")) {
        document.getElementById("imgAdmin").remove()
    }
    if (document.querySelector("svg")) {
        document.querySelector("svg").setAttribute("class", "hidden")
    }

    d3.select("#graficaAdmin").graphviz().width(750).height(750).renderDot(dot)
}

export function graficarActores() {
    let dot = "digraph G {\n"
    dot += "node[shape=record, style=\"filled\", fillcolor=\"gray\"];\n"
    dot += actores.graficar()
    dot += "}\n"

    if (document.getElementById("imgAdmin")) {
        document.getElementById("imgAdmin").remove()
    }
    if (document.querySelector("svg")) {
        document.querySelector("svg").setAttribute("class", "hidden")
    }

    d3.select("#graficaAdmin").graphviz().width(750).height(750).renderDot(dot)
}

export function graficarPeliculas() {
    let dot = "digraph G {\n"
    dot += "node[shape=record, style=\"filled\", fillcolor=\"gray\"];\n"
    dot += peliculas.graficar()
    dot += "}\n"

    if (document.getElementById("imgAdmin")) {
        document.getElementById("imgAdmin").remove()
    }
    if (document.querySelector("svg")) {
        document.querySelector("svg").setAttribute("class", "hidden")
    }

    d3.select("#graficaAdmin").graphviz().width(750).height(750).renderDot(dot)
}