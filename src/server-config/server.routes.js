const { Router } = require('express')
const { writeFile } = require('fs/promises')
const path = require('path')
const router = Router();

router.get('/', (req, res)=>{
    const pathIni = path.join(__dirname, 'public', 'index.html')
    res.status(200).sendFile(pathIni)
})
router.get('/home', (req, res)=>{
    const pathHome = path.join(__dirname, 'public', 'pages', 'home.html')
    res.sendFile(pathHome)
})
router.put('/home', async(req, res)=>{
    try{
        const pathPut = path.join(__dirname, 'public', 'db', 'semana.json')
        const newData = req.body;
        const oldData = require(pathPut)
        const sendData = {...oldData, ...newData}
        
        await writeFile(pathPut, JSON.stringify(sendData, null, 2))
        res.json(sendData)
        // res.send(JSON.stringify("Horario Semanal actualizado"))
    }catch(error){
        console.log("Error actualizar el JSON", error);
        res.status(500).send('Error al actualizar los datos')
    }
});
module.exports = router;