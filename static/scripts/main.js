import * as funciones from "./funciones.js"
import $ from './query.js'
// Login

const formLogin = $('#formLogin')

formLogin.addEventListener("submit", (e)=>{funciones.login(e)})

// Admin

const logOutAdmin = $('#logOutAdmin')
const clientesAdmin = $('#clientesAdmin')
const actoresAdmin = $('#actoresAdmin')
const peliculasAdmin = $('#peliculasAdmin')

const usuariosAdminGraph = $('#usersAdminGraph')
const actoresAdminGraph = $('#actoresAdminGraph')
const peliculasAdminGraph = $('#peliculasAdminGraph')

logOutAdmin.addEventListener("click", ()=>{
    funciones.hideAdmin()
    funciones.showLogin()
})
clientesAdmin.addEventListener("click", ()=>{funciones.ingresarUsuarios()})
actoresAdmin.addEventListener("click", ()=>{funciones.ingresarActores()})
peliculasAdmin.addEventListener("click", ()=>{funciones.ingresarPeliculas()})

usuariosAdminGraph.addEventListener("click", ()=>{funciones.graficarUsuarios()})
actoresAdminGraph.addEventListener("click", ()=>{funciones.graficarActores()})
peliculasAdminGraph.addEventListener("click", ()=>{funciones.graficarPeliculas()})