const particles = document.querySelector('#particles-js')
let route = './db/particlesjs-config.json'
document.addEventListener('DOMContentLoaded', async()=>{
    particlesJS.load(particles.id, route, ()=>{
        console.log('is loaded');
    })
})
// VALIDAR FOMULARIO DE INGRESO A NETCH@T
const formUser = document.getElementById('form-login')
const inputUser = document.getElementById('username-ini')
formUser.addEventListener('submit', (e)=>{
    e.preventDefault()
    const inputValue = inputUser.value
    console.log(inputValue);
})