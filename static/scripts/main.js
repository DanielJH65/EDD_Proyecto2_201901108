import * as funciones from "./funciones.js"
import $ from './query.js'
// Login

const formLogin = $('#formLogin')

formLogin.addEventListener("submit", (e)=>{funciones.login(e)})

// Admin

const logOutAdmin = $('#logOutAdmin')
const clientesAdmin = $('#clientesAdmin')

const usuariosAdminGraph = $('#usersAdminGraph')

logOutAdmin.addEventListener("click", ()=>{
    funciones.hideAdmin()
    funciones.showLogin()
})
clientesAdmin.addEventListener("click", ()=>{})

usuariosAdminGraph.addEventListener("click", ()=>{funciones.graficarUsuarios()})