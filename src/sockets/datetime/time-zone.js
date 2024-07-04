function getTimeZoneClient(timeZone){
    const current = new Date()
    const clientDateTime = new Date(current.toLocaleString('en-US', {timeZone: timeZone}))
    const fechaOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour2: false
    }
    const fecha = clientDateTime.toLocaleDateString('es-PE', fechaOptions)
    const hora = clientDateTime.toLocaleTimeString('es-PE', timeOptions)

    return { fecha, hora }
}
module.exports = getTimeZoneClient