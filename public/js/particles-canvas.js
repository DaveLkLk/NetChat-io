import {ALERT_TYPE, MESSAGE_TYPE, createAlert} from './components/alert-modal.js'

const particles = document.querySelector('#particles-js')
const divAlert = document.querySelector('.alert')
let route = './db/particlesjs-config.json'
document.addEventListener('DOMContentLoaded', async()=>{
    particlesJS.load(particles.id, route)
})
// VALIDAR FOMULARIO DE INGRESO A NETCH@T
const formUser = document.getElementById('form-login')
const inputUser = document.getElementById('username-ini')
const btnUser = document.getElementById('btn-chat-ini')
formUser.addEventListener('submit', (e)=>{
    e.preventDefault()
    const inputValue = inputUser.value
    if(!inputValue){
        return createAlert(divAlert,'',MESSAGE_TYPE.INFO_VACIO, ALERT_TYPE.INFO,[inputUser, btnUser], 2500)
    }
    localStorage.setItem('chat-username', inputValue)
    window.location.assign('../chat.html')
})