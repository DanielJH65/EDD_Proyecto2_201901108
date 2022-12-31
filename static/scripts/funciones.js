import { Actor, Categoria, Pelicula, Usuario } from './objetos.js'
import { ArbolBB } from './arbolBB.js'
import { ArbolAVL } from './arbolAVL.js'
import { ListaSimple } from './listaSimple.js'
import { TablaHash } from './tablaHash.js'
import $ from './query.js'
import './file-saver.js'
import './js-sha256.js'

// Secciones para mostrar y ocultar

const loginSection = $('#login')
const signinSection = $('#signin')
const adminSection = $('#admin')
const userSection = $('#user')
const userMoviesContent = $('#moviesContent')
const userActorSection = $('#actorContent')
const userCategoriasContent = $('#categoriasContent')

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

export function showUsersMovies(){
    userMoviesContent.setAttribute("class", "bg-[#8ABE5F] flex flex-col items-center justify-center px-12")
}

export function hideUsersMovies(){
    userMoviesContent.setAttribute("class", "bg-[#8ABE5F] hidden flex-col items-center justify-center px-12")
}

export function showUsersActor(){
    userActorSection.setAttribute("class", "bg-[#8ABE5F] flex flex-col items-center justify-center px-12 min-w-full")
}

export function hideUsersActor(){
    userActorSection.setAttribute("class", "bg-[#8ABE5F] hidden flex-col items-center justify-center px-12")
}

export function showUsersCatego(){
    userCategoriasContent.setAttribute("class", "bg-[#8ABE5F] flex flex-col items-center justify-center px-12")
}

export function hideUsersCatego(){
    userCategoriasContent.setAttribute("class", "bg-[#8ABE5F] hidden flex-col items-center justify-center px-12")
}

// Estructuras

const usuarios = new ListaSimple()
const actores = new ArbolBB()
const peliculas = new ArbolAVL()
const categorias = new TablaHash()
let peliculasLista = new ListaSimple()

categorias.tamanioTabla(20)

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
            mostrarPeliculas()
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
                let pelicula = new Pelicula(user.id_pelicula, user.nombre_pelicula, user.descripcion, user.puntuacion_star, user.precion_Q, user.paginas, user.categoria)
                peliculas.insertar(pelicula)
                peliculasLista.insertarInicio(pelicula)
            });
            Swal.fire("Registradas...", 'Carga masiva realizada', 'success')
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

export function ingresarCategorias() {
    Swal.fire({
        title: 'Carga masiva de categorias',
        html: `<input type="file" id="fileCategorias" class="swal2-input">`,
        confirmButtonText: 'Cargar',
        focusConfirm: false,
        preConfirm: () => {
            const fileuser = Swal.getPopup().querySelector('#fileCategorias').files[0]
            return fileuser
        }
    }).then((result) => {
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            let datos = JSON.parse(reader.result)
            datos.forEach(user => {
                categorias.insertarValor(new Categoria(user.id_categoria, user.company))
            });
            console.log(categorias)
            Swal.fire("Registradas...", 'Carga masiva realizada', 'success')
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

    d3.select("#graficaAdmin").graphviz().width(750).height(750).renderDot(dot);
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

export function graficarCategorias() {
    let dot = "digraph G {\n"
    dot += "node[shape=record, style=\"filled\", fillcolor=\"gray\"];\n"
    dot += categorias.graficar()
    dot += "}\n"

    if (document.getElementById("imgAdmin")) {
        document.getElementById("imgAdmin").remove()
    }
    if (document.querySelector("svg")) {
        document.querySelector("svg").setAttribute("class", "hidden")
    }
    d3.select("#graficaAdmin").graphviz().width(750).height(750).renderDot(dot)
}

//Descargar Graficas

export function descargar() {
    const container = document.getElementById("graficaAdmin")
    html2canvas(container, { allowTaint: true }).then(function (canvas) {
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "descarga.png";
        link.href = canvas.toDataURL();
        link.target = '_blank';
        link.click();
    });
}

// Usuario

export function mostrarPeliculas(){
    showUsersMovies()
    hideUsersActor()
    hideUsersCatego()
    const moviesList = $('#moviesList')
    moviesList.innerHTML = ""
    mostrarPeliculasRecursivo(peliculas.root)

    const botonInfo = document.querySelectorAll('#infoMovies')
}

function mostrarPeliculasRecursivo(root){
    const moviesList = $('#moviesList')
    if(root != null){
        mostrarPeliculasRecursivo(root.left)
        moviesList.innerHTML += `
        <div class = "grid grid-cols-7 gap-4 items-center justify-center my-4 py-4 bg-[#0a283f] rounded-xl text-gray-200 opacity-90">
            <center><h2><b>${root.dato.name}</b></h2></center>
            <p class="col-span-3"><b>Descripción: </b>${root.dato.description}</p>
            <button id="infoMovies" name="${root.dato.id}" class="bg-[#496D89] rounded-xl py-4 hover:scale-110 duration-300s">Información</button>
            <button id="alquiMovies" name="${root.dato.id}" class="bg-[#005a24] rounded-xl py-4 hover:scale-110 duration-300s">Alquilar</button>
            <h1><strong>Q ${root.dato.price}</strong></h1>
        </div>
        `
        mostrarPeliculasRecursivo(root.right)
    }
}

export function mostrarPeliculasOrdenadas(asc){
    if(asc){
        peliculasLista = burbujaAsc(peliculasLista)
    }else{
        peliculasLista = burbujaDesc(peliculasLista)
    }

    mostrarPeliculas2()
}

function burbujaAsc(lista){
    let temp1 = lista.first
    let auxArt

    while (temp1.next != null) {
        let temp2 = temp1.next
        while (temp2 != null) {
            if (temp1.dato.name > temp2.dato.name) {
                auxArt = temp1.dato
                temp1.dato = temp2.dato
                temp2.dato = auxArt
            }
            temp2 = temp2.next
        }
        temp1 = temp1.next
    }
    return lista
}

function burbujaDesc(lista){
    let temp1 = lista.first
    let auxArt
    let auxLista

    while (temp1.next != null) {
        let temp2 = temp1.next
        while (temp2 != null) {
            if (temp1.dato.name < temp2.dato.name) {
                auxArt = temp1.dato
                auxLista = temp1.lista
                temp1.dato = temp2.dato
                temp1.lista = temp2.lista
                temp2.dato = auxArt
                temp2.lista = auxLista
            }
            temp2 = temp2.next
        }
        temp1 = temp1.next
    }
    return lista
}

function mostrarPeliculas2(){
    const moviesList = $('#moviesList')
    moviesList.innerHTML = ""
    let temp = peliculasLista.first
    while(temp != null){
        moviesList.innerHTML += `
        <div class = "grid grid-cols-7 gap-4 items-center justify-center my-4 py-4 bg-[#0a283f] rounded-xl text-gray-200 opacity-90">
            <center><h2><b>${temp.dato.name}</b></h2></center>
            <p class="col-span-3"><b>Descripción: </b>${temp.dato.description}</p>
            <button id="infoMovies" name="${temp.dato.id}" class="bg-[#496D89] rounded-xl py-4 hover:scale-110 duration-300s">Información</button>
            <button id="alquiMovies" name="${temp.dato.id}" class="bg-[#005a24] rounded-xl py-4 hover:scale-110 duration-300s">Alquilar</button>
            <h1><strong>Q ${temp.dato.price}</strong></h1>
        </div>
        `
        temp = temp.next
    }
}

export function mostrarActores(){
    showUsersActor()
    hideUsersMovies()
    hideUsersCatego()
}

export function actoresInOrden(){
    const actorsList = $('#actorsList')
    actorsList.innerHTML = ""
    actoresInOrden2(actores.root)

}

function actoresInOrden2(raiz){
    if(raiz != null){
        actoresInOrden2(raiz.left)
        mostrarCardActores(raiz.dato)
        actoresInOrden2(raiz.right)
    }
}

export function actoresPreOrden(){
    const actorsList = $('#actorsList')
    actorsList.innerHTML = ""
    actoresPreOrden2(actores.root)

}

function actoresPreOrden2(raiz){
    if(raiz != null){
        mostrarCardActores(raiz.dato)
        actoresPreOrden2(raiz.left)
        actoresPreOrden2(raiz.right)
    }
}

export function actoresPostOrden(){
    const actorsList = $('#actorsList')
    actorsList.innerHTML = ""
    actoresPostOrden2(actores.root)

}

function actoresPostOrden2(raiz){
    if(raiz != null){
        actoresPostOrden2(raiz.left)
        actoresPostOrden2(raiz.right)
        mostrarCardActores(raiz.dato)
    }
}

function mostrarCardActores(dato){
    const actorsList = $('#actorsList')
    actorsList.innerHTML += `
    <div class = "bg-[#0a283f] flex flex-col items-center justify-center text-justify text-gray-100 mx-5 px-3 my-5 py-5 rounded-3xl">
        <h1 class="py-4"><b>${dato.name}</b></h1>
        <h2 class="py-4"><b>DNI: ${dato.dni}</b></h2>
        <p class="py-4"><b>Descripción: </b>${dato.description}</p>
    </div>
    `
}

export function mostrarCategorias(){
    showUsersCatego()
    hideUsersActor()
    hideUsersMovies()
    categorias.mostrar()
}