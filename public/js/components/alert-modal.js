import { iconClose, iconErrorServer, iconSuccess, iconInfo, iconError, iconWaiting } from "./elements-html.js";
// CSS ALERT
const OBJ_ALERT_ICON = {
    INFO: {
        classname: 'alert--info',
        value: 'WARNING',
        icon: iconInfo
    },
    ERROR: {
        classname: 'alert--error',
        value: 'ERROR:',
        icon: iconError
    },
    SUCCESS: {
        classname: 'alert--success',
        value: 'SUCCESS',
        icon: iconSuccess
    },
    FATAL: {
        classname: 'alert--fatal',
        value: 'FATAL ERROR:',
        icon: iconErrorServer
    },
    TEMP_DEFAULT: {
        classname: 'alert--temp-default',
        value: 'LOADING:',
        icon: iconWaiting
    },
    TEMP_INFO: {
        classname: 'alert--temp-info',
        value: 'FATAL ERROR:',
        icon: iconInfo
    },
    TEMP_ERROR: {
        classname: 'alert--temp-error',
        value: 'FATAL ERROR:',
        icon: iconError
    },
    TEMP_SUCCESS: {
        classname: 'alert--temp-success',
        value: 'SUCCESS:',
        icon: iconSuccess
    }
}
function getIconTypeAlert(classname){
    const isClassAlert = Object.values(OBJ_ALERT_ICON).find(i => i.classname === classname)
    if(!isClassAlert) return console.log('No se reconoce la clase de alerta')
    return isClassAlert
}
export const ALERT_TYPE = {
    INFO: "alert--info",
    ERROR: "alert--error",
    WAIT: "alert--wait",
    SUCCESS: "alert--success",
    FATAL: "alert--fatal",
    ACTIVE: "alert--active",
    TEMP: {
      default: "alert--temp-default",
      info: "alert--temp-info",
      error: "alert--temp-error",
      success: "alert--temp-success",
    }
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
    ERROR: 'Ocurrió un error',
    ERROR_PASTE: 'Error al leer el portapapeles',
    NO_DISPONIBLE: 'Característica no agregada..',
    INVALIDO: 'El resgistro ingresado no es válido',
    DUPLICADO: 'Este registro ya existe!',
    SUCCESS: 'Datos guardados satisfactoriamente!',
    NO_SELECT: 'Seleccione una opción!',
    ESPERANDO: 'Procesando solicitud...',
    IN_PROCESS: 'Módulo en proceso...',
    LOADING: 'Cargando datos...',
    CLAVE_INVALID: 'Contraseña inválida',
    LOGIN: 'Inicio de sesion exitoso',
    CLAVE_VALID: 'Contraseña correcta',
    NO_EXISTE: 'No se encontró ningún registro',
    COPY: 'Texto copiado!',
    COPY_NULL: 'Nada que copiar..',
    CLEAR_NULL: 'Nada que limpiar..',
    FORM_CLEAR: 'Formulario limpiado!',
    PASTE_ACCESS: 'Permita el Acceso al portapapeles',
    LOCK_STYLES: 'Estilos bloqueado',
    UNLOCK_STYLES: 'Estilos desbloqueado',
    PIN_SUCCESS: 'Elemento fijado',
    PIN_ERROR: 'Error al intentar fijar el elemento',
    SEARCH_DINAMYC: 'Búsqueda dinámica activada',
    SEARCH_ANEXO: 'Búsqueda por anexo activado'
};
function setClassTemp(arrClass){
    const classTempArr = Array.from(arrClass).filter(clase => clase.startsWith('alert--temp'));
    if(classTempArr.length > 0){
      classTempArr.forEach(clase => arrClass.remove(clase))
    }
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
        item.tagName !== 'TEXTAREA' && item.tagName !== 'INPUT'
            ? item.style.cursor = 'pointer'
            : item.style.cursor = 'text'
    })
};
function templateAlert(container){
    const alertMsg = document.createElement('div')
    const alertClose = document.createElement('div')
    alertMsg.classList.add('alert-message')
    alertClose.classList.add('alert-close')
    const spanIcon = document.createElement('span')
    spanIcon.classList.add('alert-icon')
    const alertResponse = document.createElement('p')
    alertResponse.classList.add('alert-response')
    const alertTitle = document.createElement('span')
    const alertDescription = document.createElement('span')
    alertTitle.classList.add('alert-title')
    alertDescription.classList.add('alert-description')
    alertResponse.appendChild(alertTitle)
    alertResponse.appendChild(alertDescription)
    alertMsg.appendChild(spanIcon)
    alertMsg.appendChild(alertResponse)
    const button = document.createElement('button')
    button.classList.add('btn-close')
    button.type = 'button'
    button.title = 'Cerrar'
    button.innerHTML = iconClose();
    alertClose.appendChild(button)
    container.appendChild(alertMsg)
    container.appendChild(alertClose)
    const objTemplate = {
        container,
        span_icon: container.querySelector('.alert-message .alert-icon'),
        alert_title: container.querySelector('.alert-response .alert-title'),
        alert_description: container.querySelector('.alert-response .alert-description'),
        btn_close: container.querySelector('.alert-close .btn-close'),
    }
    return objTemplate
}

export function createAlert(container, title, description, classAlert, elementsForm, timeTemp=3000){
    inputDisabled(elementsForm)
    let postAlert = 350
    const alert = container
    // const alertMsgExist = document.querySelector('.alert-message')
    // const alertCloseExist = document.querySelector('.alert-close')
    // if(alertMsgExist && alertCloseExist) alert.innerHTML = '';
    alert.innerHTML = '';
    const template = templateAlert(alert)
    alert.classList.add(ALERT_TYPE.ACTIVE)
    setClassTemp(alert.classList)
    alert.classList.add(classAlert)

    const alertElement = getIconTypeAlert(classAlert)
    !title 
        ? template.alert_title.textContent = alertElement.value
        : template.alert_title.textContent = title
    !description
        ? template.alert_description.textContent = ''
        : template.alert_description.textContent = description
    template.span_icon.innerHTML = alertElement.icon()
    const btnClose = template.btn_close
    // CONTROLAR EL TIMEOUT DE LAS ALERTAS
    let timeOutID;
    let timeOutIDTwo;
    if(Object.values(ALERT_TYPE.TEMP).includes(classAlert)){
        inputEnabled(elementsForm)
        timeOutID = setTimeout(() => {
            alert.classList.remove(ALERT_TYPE.ACTIVE)
        }, timeTemp)
        timeOutIDTwo = setTimeout(()=>{
            alert.classList.remove(classAlert)
        }, timeTemp + postAlert)
    }
    function alertHandler(){
        inputEnabled(elementsForm)
        alert.classList.remove(ALERT_TYPE.ACTIVE)
        // LIMPIAR LOS SETTIMEOUT
        if(timeOutID) clearTimeout(timeOutID)
        if(timeOutIDTwo) clearTimeout(timeOutIDTwo)
        setTimeout(()=>{
            alert.classList.remove(classAlert)
        }, postAlert)
        console.log("mostrarAlerta -> success");
        return true
    }
    btnClose.addEventListener('click', alertHandler)
};