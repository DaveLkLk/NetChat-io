// CSS ALERT
export const ALERT_TYPE = {
    INFO: "alert--info",
    ERROR: "alert--error",
    WAIT: "alert--wait",
    SUCCESS: "alert--success",
    FATAL: "alert--fatal",
    ACTIVE: "alert--active",
    TEMP: "alert--temp"
}
export const MESSAGE_TYPE = {
    // server message
    ERROR_SERVER: "Error en la respuesta del servidor",
    ERROR_DATA: "Error en el envio de los datos",
    INFO_LIMIT: "Se alcanzó el limite de caracteres",
    INFO_VACIO: "Complete los campos requeridos",
    SUCCESS_DATA: "Datos enviados satisfactoriamente",
    SUCCESS_SERVER: "Nuevo registro guardado",
    WAIT_POST: "Enviando datos al servidor..",
    WAIT_GET: "Esperando respuesta del servidor..",
    // client message
    ALERT: 'Complete todos los campos',
    MIN_SCREEN: 'Tamaño de pantalla no recomendable',
    MAX_SCREEN: 'Tamaño de pantalla fuera del limite',
    ERROR: 'Ocurrió un error',
    NO_DISPONIBLE: 'Feature coming soon..',
    ERROR_FILES: 'Error al cargar el archivo',
    ERROR_TYPE_FILE: 'Tipo de archivo no válido en esta opción',
    ERROR_FORMAT: 'Error al procesar el formato de archivo',
    ERROR_PREVIEW: 'Error, no se pudo cargar la vista previa',
    PROCESS_MAXMEDIA: 'Archivo pesado, esto podria tardar unos minutos..',
    INVALIDO: 'El resgistro ingresado no es válido',
    DUPLICADO: 'Este registro ya existe!',
    SUCCESS: 'Datos guardados satisfactoriamente!',
    NO_SELECT: 'Seleccione una opción!',
    ESPERANDO: 'Procesando solicitud...',
    LOADING: 'Cargando datos...',
    CLAVE_INVALID: 'Contraseña inválida',
    CLAVE_VALID: 'ContraseÑa correcta',
    NO_EXISTE: 'No se encontró ningún registro'
};
export function borrarContenido(arr){
    arr.forEach(item => {
        if(item instanceof HTMLInputElement){
            return item.value = ''
        }else{
            return item.textContent = ''
        }
    })
};
export function inputDisabled(items){
    items.forEach(item =>{
        item.disabled = true
        item.style.cursor = 'not-allowed'
    })
};
export function inputEnabled(items){
    items.forEach(item =>{
        item.disabled = false
        item.style.cursor = 'pointer'
    })
};
export function createAlert(container, message, classAlert, elementsForm){
    inputDisabled(elementsForm)
    const alert = container
    
    const buttonExiste = document.querySelector('.alert button')
    const messageExiste = document.querySelector('.alert p')
    if(buttonExiste && messageExiste){
        alert.innerHTML = ''
    }
    alert.classList.add(ALERT_TYPE.ACTIVE)
    alert.classList.add(classAlert)

    const buttonAlert = document.createElement('button')
    buttonAlert.textContent = 'X'
    buttonAlert.type = 'button'
    const messageAlert = document.createElement('p')
    messageAlert.textContent = message
    alert.appendChild(messageAlert)
    alert.appendChild(buttonAlert)

    function alertHandler(){
        inputEnabled(elementsForm)
        alert.classList.remove(ALERT_TYPE.ACTIVE)
        setTimeout(()=>{
            alert.classList.remove(classAlert)
        }, 310)
        console.log("mostrarAlerta -> success");
    }
    if(classAlert === ALERT_TYPE.TEMP){
        setTimeout(alertHandler, 3000)
    }
    
    buttonAlert.addEventListener('click', alertHandler)
};