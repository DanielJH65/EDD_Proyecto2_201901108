import { Actor, Categoria, Comentario, Pelicula, PeliculaAlquilada, Usuario } from './objetos.js'
import { ArbolAVL } from './arbolAVL.js'
import { ArbolBB } from './arbolBB.js'
import { ArbolMerkle } from './arbolMerkle.js'
import { Blockchain } from './blockchain.js'
import { ListaSimple } from './listaSimple.js'
import { TablaHash } from './tablaHash.js'
import Canvas2Image from './canvas2image.js'
import $ from './query.js'
import './canvas2image.js'
import './js-sha256.js'

// Secciones para mostrar y ocultar

const loginSection = $('#login')
const signinSection = $('#signin')
const adminSection = $('#admin')
const adminGraphsContent = $('#adminGraphsContent')
const blockChainContent = $('#blockChainContent')
const userSection = $('#user')
const userMoviesContent = $('#moviesContent')
const userActorSection = $('#actorContent')
const userCategoriasContent = $('#categoriasContent')
const userInfoMovieContent = $('#infoMovie')

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

export function showInicioAdmin(){
    adminGraphsContent.setAttribute("class", "bg-[#8ABE5F] flex rounded-2xl shadow-lg w-3/4 p-15")
}

export function hideInicioAdmin(){
    adminGraphsContent.setAttribute("class", "bg-[#8ABE5F] hidden rounded-2xl shadow-lg w-3/4 p-15")
}

export function showBlockchainAdmin(){
    blockChainContent.setAttribute("class", "bg-[#8ABE5F] flex flex-col items-center justify-center px-12")
}

export function hideBlockchainAdmin(){
    blockChainContent.setAttribute("class", "bg-[#8ABE5F] hidden flex-col items-center justify-center px-12")
}

export function showUser() {
    userSection.setAttribute("class", "block")
}

export function hideUser() {
    userSection.setAttribute("class", "hidden")
}

export function showUsersMovies() {
    userMoviesContent.setAttribute("class", "bg-[#8ABE5F] flex flex-col items-center justify-center px-12")
}

export function hideUsersMovies() {
    userMoviesContent.setAttribute("class", "bg-[#8ABE5F] hidden flex-col items-center justify-center px-12")
}

export function showUsersInfoMovies() {
    userInfoMovieContent.setAttribute("class", "bg-[#8ABE5F] flex flex-col items-center justify-center px-12 min-w-full")
}

export function hideUsersInfoMovies() {
    userInfoMovieContent.setAttribute("class", "bg-[#8ABE5F] hidden flex-col items-center justify-center px-12 min-w-full")
}

export function showUsersActor() {
    userActorSection.setAttribute("class", "bg-[#8ABE5F] flex flex-col items-center justify-center px-12 min-w-full")
}

export function hideUsersActor() {
    userActorSection.setAttribute("class", "bg-[#8ABE5F] hidden flex-col items-center justify-center px-12")
}

export function showUsersCatego() {
    userCategoriasContent.setAttribute("class", "bg-[#8ABE5F] flex flex-col items-center justify-center px-12")
}

export function hideUsersCatego() {
    userCategoriasContent.setAttribute("class", "bg-[#8ABE5F] hidden flex-col items-center justify-center px-12")
}

// Estructuras

const usuarios = new ListaSimple()
const actores = new ArbolBB()
const peliculas = new ArbolAVL()
const categorias = new TablaHash()
const blockChain = new Blockchain()
const merkle = new ArbolMerkle()

let peliculasLista = new ListaSimple()

categorias.tamanioTabla(20)

let tiempoBloques = 300000
let intervaloBloques = setInterval(nuevoBloqueBlockChain, tiempoBloques)

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
    html2canvas(container).then(function (canvas){
        return Canvas2Image.saveAsPNG(canvas)
    })
}

//Blockchain

export function nuevoBloqueBlockChain(){
    blockChain.generarBloque(merkle)
    graficarBlockchain()
    graficarMerkle()
}

export function modificarIntervalo(){
    clearInterval(intervaloBloques)
    const nuevoTiempo = $('#segundosGenerarBloque')
    intervaloBloques = setInterval(nuevoBloqueBlockChain, nuevoTiempo.value*1000)
    Swal.fire("Modificado...", 'Tiempo de generación de bloques modificado correctamente', 'success')
}

function graficarBlockchain(){
    let dot = "digraph G {\n"
    dot += "node[shape=component, style=\"filled\", color=\"gray\"];\n"
    dot += blockChain.graficar()
    dot += "rankdir= LR;\n}\n"

    if (document.querySelector("svg")) {
        document.querySelector("svg").setAttribute("class", "hidden")
    }
    d3.select("#graphBlockchain").graphviz().width(1350).height(400).renderDot(dot);
}

function graficarMerkle(){
    let dot = "digraph G {\n"
    dot += "node[shape=record, style=\"filled\", fillcolor=\"gray\"];\n"
    dot += blockChain.graficar2()
    dot += "}\n"

    if (document.querySelector("svg")) {
        document.querySelector("svg").setAttribute("class", "hidden")
    }
    d3.select("#graphMerkle").graphviz().width(1350).height(750).renderDot(dot)
}

// Usuario

export function mostrarPeliculas() {
    showUsersMovies()
    hideUsersActor()
    hideUsersCatego()
    hideUsersInfoMovies()
    const moviesList = $('#moviesList')
    moviesList.innerHTML = ""
    mostrarPeliculasRecursivo(peliculas.root)

    const botonInfo = document.querySelectorAll('#infoMovies')
    botonInfo.forEach(element => {
        element.addEventListener("click", () => { infoPeliculas(element.getAttribute("name")) })
    });

    const botonAlqui = document.querySelectorAll('#alquiMovies')
    botonAlqui.forEach(element => {
        element.addEventListener("click", () => { alquilar(peliculas.obtener(element.getAttribute("name"), peliculas.root)) })
    });
}

function mostrarPeliculasRecursivo(root) {
    const moviesList = $('#moviesList')
    if (root != null) {
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

export function mostrarPeliculasOrdenadas(asc) {
    if (asc) {
        peliculasLista = burbujaAsc(peliculasLista)
    } else {
        peliculasLista = burbujaDesc(peliculasLista)
    }

    mostrarPeliculas2()
    const botonInfo = document.querySelectorAll('#infoMovies')
    botonInfo.forEach(element => {
        element.addEventListener("click", () => { infoPeliculas(element.getAttribute("name")) })
    });
    const botonAlqui = document.querySelectorAll('#alquiMovies')
    botonAlqui.forEach(element => {
        element.addEventListener("click", () => { alquilar(peliculas.obtener(element.getAttribute("name"), peliculas.root)) })
    });
}

function burbujaAsc(lista) {
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

function burbujaDesc(lista) {
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

function mostrarPeliculas2() {
    const moviesList = $('#moviesList')
    moviesList.innerHTML = ""
    let temp = peliculasLista.first
    while (temp != null) {
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

function infoPeliculas(_id) {
    hideUsersMovies()
    showUsersInfoMovies()
    let peliculaActual = peliculas.obtener(_id, peliculas.root)
    userInfoMovieContent.innerHTML = `
    <h1 class="text-5xl my-5 py-10"><b>${peliculaActual.dato.name}</b></h1>
    <p class="text-2xl my-5 py-10 mx-10"><b>Descripción: </b>${peliculaActual.dato.description}</p>`

    let botones = document.createElement("div")
    botones.setAttribute("class", "grid grid-cols-12 gap-4 min-w-full my-10 items-center")

    let inputEstrellas = document.createElement("input")
    inputEstrellas.setAttribute("type", "number")
    inputEstrellas.setAttribute("class", "col-span-3 p-5 rounded-xl border")
    inputEstrellas.setAttribute("min", "0")
    inputEstrellas.setAttribute("max", "5")
    inputEstrellas.setAttribute("id", "inputEstrellas")
    inputEstrellas.setAttribute("placeholder", "Puntuación")

    let espacio = document.createElement("div")
    espacio.setAttribute("class", "min-w-full")

    let botonModificar = document.createElement("button")
    botonModificar.setAttribute("class", "col-span-3 bg-[#042137] rounded-xl text-gray-200 py-5 hover:scale-110 duration-300")
    botonModificar.innerHTML = "Modificar Puntuación"

    botones.appendChild(inputEstrellas)
    botones.appendChild(botonModificar)
    botones.appendChild(espacio)

    for (let index = 0; index < peliculaActual.dato.stars; index++) {
        let estrella = document.createElement("span")
        estrella.setAttribute("class", "text-[#042137] text-3xl")
        estrella.innerHTML = "<ion-icon name=\"star\"></ion-icon>"
        botones.appendChild(estrella)
    }

    for (let index = 0; index < 5 - peliculaActual.dato.stars; index++) {
        let estrella = document.createElement("span")
        estrella.setAttribute("class", "text-[#042137] text-3xl")
        estrella.innerHTML = "<ion-icon name=\"star-outline\"></ion-icon>"
        botones.appendChild(estrella)
    }

    let alquipre = document.createElement("div")
    alquipre.setAttribute("class", "grid grid-cols-6 gap-4 my-10 items-center justify-center min-w-full")

    let botonAlquilar = document.createElement("button")
    botonAlquilar.setAttribute("class", "col-span-3 bg-[#005a24] rounded-xl text-gray-200 py-5 hover:scale-110 duration-300")
    botonAlquilar.innerHTML = "Alquilar"

    let espacio2 = document.createElement("div")
    espacio2.setAttribute("class", "min-w-full")

    let precio = document.createElement("h1")
    precio.setAttribute("class", "col-span-2")
    precio.innerHTML = `<strong>Q ${peliculaActual.dato.price}</strong>`

    alquipre.appendChild(botonAlquilar)
    alquipre.appendChild(espacio2)
    alquipre.appendChild(precio)

    let comentarios = document.createElement("div")
    comentarios.setAttribute("class", "flex flex-col mx-10 my-8 items-center min-w-full")

    let labelComents = document.createElement("span")
    labelComents.setAttribute("class", "text-3xl py-8")
    labelComents.innerHTML = "Comentarios"

    let temp = peliculaActual.dato.comentarios.first

    comentarios.appendChild(labelComents)

    while (temp != null) {
        let comentario = document.createElement("div")
        comentario.setAttribute("class", " flex flex-col mx-10 my-5 items-center min-w-full bg-[#0a283f] rounded-xl text-gray-200 px-10 py-10")

        let contenidoComentario = document.createElement("span")
        contenidoComentario.setAttribute("class", "text-2xl")
        contenidoComentario.innerHTML = `<b>${temp.dato.username}: </b> ${temp.dato.comentario}`

        comentario.appendChild(contenidoComentario)
        comentarios.appendChild(comentario)

        temp = temp.next
    }

    let nuevoComentario = document.createElement("div")
    nuevoComentario.setAttribute("class", "grid grid-cols-6 gap-4 min-w-full my-10 items-center")

    let inputComentario = document.createElement("input")
    inputComentario.setAttribute("class", "col-span-4 p-5 rounded-xl border")
    inputComentario.setAttribute("id", "inputComentario")
    inputComentario.setAttribute("placeholder", "Comentario")

    let espacio3 = document.createElement("div")
    espacio3.setAttribute("class", "min-w-full")

    let botonComentario = document.createElement("button")
    botonComentario.setAttribute("class", "bg-[#042137] rounded-xl text-gray-200 py-5 hover:scale-110 duration-300")
    botonComentario.innerHTML = "Publicar"

    nuevoComentario.appendChild(inputComentario)
    nuevoComentario.appendChild(espacio3)
    nuevoComentario.appendChild(botonComentario)

    comentarios.appendChild(nuevoComentario)

    userInfoMovieContent.appendChild(botones)
    userInfoMovieContent.appendChild(alquipre)
    userInfoMovieContent.appendChild(comentarios)

    botonAlquilar.addEventListener("click", () =>{alquilar(peliculaActual)})

    botonComentario.addEventListener("click", () => {
        peliculaActual.dato.comentarios.insertarInicio(new Comentario(usuarioActual.dato.username, inputComentario.value))
        infoPeliculas(_id)
        Swal.fire("Agregado...", 'Comentario agregado con exito', 'success')
    })

    botonModificar.addEventListener("click", () => {
        peliculas.modificarStars(_id, inputEstrellas.value)
        infoPeliculas(_id)
        Swal.fire("Modificado...", 'Puntuación modificada con exito', 'success')
    })
}

export function alquilar(peliculaActual){
    merkle.insertar(new PeliculaAlquilada(peliculaActual.dato.name, usuarioActual.dato.username))
    Swal.fire("Alquilada...", 'Pelicula alquilada con exito', 'success')
}

export function mostrarActores() {
    showUsersActor()
    hideUsersMovies()
    hideUsersCatego()
    hideUsersInfoMovies()
}

export function actoresInOrden() {
    const actorsList = $('#actorsList')
    actorsList.innerHTML = ""
    actoresInOrden2(actores.root)

}

function actoresInOrden2(raiz) {
    if (raiz != null) {
        actoresInOrden2(raiz.left)
        mostrarCardActores(raiz.dato)
        actoresInOrden2(raiz.right)
    }
}

export function actoresPreOrden() {
    const actorsList = $('#actorsList')
    actorsList.innerHTML = ""
    actoresPreOrden2(actores.root)

}

function actoresPreOrden2(raiz) {
    if (raiz != null) {
        mostrarCardActores(raiz.dato)
        actoresPreOrden2(raiz.left)
        actoresPreOrden2(raiz.right)
    }
}

export function actoresPostOrden() {
    const actorsList = $('#actorsList')
    actorsList.innerHTML = ""
    actoresPostOrden2(actores.root)

}

function actoresPostOrden2(raiz) {
    if (raiz != null) {
        actoresPostOrden2(raiz.left)
        actoresPostOrden2(raiz.right)
        mostrarCardActores(raiz.dato)
    }
}

function mostrarCardActores(dato) {
    const actorsList = $('#actorsList')
    actorsList.innerHTML += `
    <div class = "bg-[#0a283f] flex flex-col items-center justify-center text-justify text-gray-100 mx-5 px-3 my-5 py-5 rounded-3xl">
        <h1 class="py-4"><b>${dato.name}</b></h1>
        <h2 class="py-4"><b>DNI: ${dato.dni}</b></h2>
        <p class="py-4"><b>Descripción: </b>${dato.description}</p>
    </div>
    `
}

export function mostrarCategorias() {
    showUsersCatego()
    hideUsersActor()
    hideUsersMovies()
    hideUsersInfoMovies()
    categorias.mostrar()
}