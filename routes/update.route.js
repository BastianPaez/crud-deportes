import { Router } from "express";
import { readFile, writeFile} from "node:fs/promises";


const router = Router();

router.get('/', async (req, res) => {
    let archivoJson = '';

    try {
        archivoJson = JSON.parse(await readFile('./data/deportes.json', 'utf-8'));
    } catch (err){
        console.log(err)
    }

    res.render('update', {archivoJson})
})

router.post('/', async (req, res) => {
    let archivoJson = '';
    const id = req.body.deporte;
    const precio = req.body.precio;

    try {
        archivoJson = JSON.parse(await readFile('./data/deportes.json'))
    } catch (err) {
        console.log(err)
    }
    
    let deporte = archivoJson.find( item => item.id === id);
    archivoJson = archivoJson.filter( item => item.id !== id)

    deporte.precio = precio;

    archivoJson.push(deporte);


    await writeFile('./data/deportes.json', JSON.stringify(archivoJson))



    res.render('update', {archivoJson})
})


export default router;