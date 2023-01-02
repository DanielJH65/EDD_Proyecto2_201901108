import * as funciones from "./funciones.js"
import $ from './query.js'
// Login

const formLogin = $('#formLogin')

formLogin.addEventListener("submit", (e)=>{funciones.login(e)})

// Admin

const logOutAdmin = $('#logOutAdmin')
const inicioAdmin = $('#inicioAdmin')
const clientesAdmin = $('#clientesAdmin')
const actoresAdmin = $('#actoresAdmin')
const peliculasAdmin = $('#peliculasAdmin')
const categoriasAdmin = $('#categoriasAdmin')
const blockChainAdmin = $('#blockChainAdmin')
const modificarTiempo = $('#modificarTiempo')
const generarBloque = $('#generarBloque')

const usuariosAdminGraph = $('#usersAdminGraph')
const actoresAdminGraph = $('#actoresAdminGraph')
const peliculasAdminGraph = $('#peliculasAdminGraph')
const categoriasAdminGraph = $('#categoriasAdminGraph')
const descargarAdminGraph = $('#descargarAdminGraph')

logOutAdmin.addEventListener("click", ()=>{funciones.hideAdmin();funciones.showLogin()})

inicioAdmin.addEventListener("click", ()=>{funciones.showInicioAdmin();funciones.hideBlockchainAdmin()})
clientesAdmin.addEventListener("click", ()=>{funciones.ingresarUsuarios()})
actoresAdmin.addEventListener("click", ()=>{funciones.ingresarActores()})
peliculasAdmin.addEventListener("click", ()=>{funciones.ingresarPeliculas()})
categoriasAdmin.addEventListener("click", ()=>{funciones.ingresarCategorias()})
blockChainAdmin.addEventListener("click", ()=>{funciones.showBlockchainAdmin(); funciones.hideInicioAdmin()})
modificarTiempo.addEventListener("click", ()=>{funciones.modificarIntervalo()})

generarBloque.addEventListener("click", ()=>{funciones.nuevoBloqueBlockChain()})

usuariosAdminGraph.addEventListener("click", ()=>{funciones.graficarUsuarios()})
actoresAdminGraph.addEventListener("click", ()=>{funciones.graficarActores()})
peliculasAdminGraph.addEventListener("click", ()=>{funciones.graficarPeliculas()})
categoriasAdminGraph.addEventListener("click", ()=>{funciones.graficarCategorias()})
descargarAdminGraph.addEventListener("click", ()=>{funciones.descargar()})

// Clientes

const logOutUser = $('#logOutUser')
const peliculasUser = $('#peliculasUser')
const peliculasAsc = $('#peliculasAscendente')
const peliculasDesc = $('#peliculasDescendente')
const actoresUser = $('#actoresUser')
const actoresInOrden = $('#actoresInOrden')
const actoresPreOrden = $('#actoresPreOrden')
const actorePostOrden = $('#actorePostOrden')
const categoriasUser = $('#categoriasUser')

logOutUser.addEventListener("click", ()=>{funciones.hideUser();funciones.showLogin()})
peliculasUser.addEventListener("click", ()=>{funciones.mostrarPeliculas()})
peliculasAsc.addEventListener("click", ()=>{funciones.mostrarPeliculasOrdenadas(true)})
peliculasDesc.addEventListener("click", ()=>{funciones.mostrarPeliculasOrdenadas(false)})
actoresUser.addEventListener("click", ()=>{funciones.mostrarActores()})
actoresInOrden.addEventListener("click", ()=>{funciones.actoresInOrden()})
actoresPreOrden.addEventListener("click", ()=>{funciones.actoresPreOrden()})
actorePostOrden.addEventListener("click", ()=>{funciones.actoresPostOrden()})
categoriasUser.addEventListener("click", ()=>{funciones.mostrarCategorias()})