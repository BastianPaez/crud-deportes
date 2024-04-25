import { Router } from "express";
import { nanoid } from "nanoid";
import { readFile, writeFile} from "node:fs/promises";


const router = Router();

router.get('/', async (req, res) => {
    let archivoJson = '';

    try {
        archivoJson = JSON.parse(await readFile('./data/deportes.json', 'utf-8'));
    } catch (err){
        console.log(err)
    }

    res.render('create', {archivoJson})
})


router.post('/', async (req, res) => {
    const {nombre, precio} = req.body
    const deporte = {nombre, precio, id : nanoid()}

    let archivoJson = '';

    try {
        archivoJson = JSON.parse(await readFile('./data/deportes.json', 'utf-8'));
    } catch (err){
        console.log(err)
    }

    archivoJson = [...archivoJson, deporte]
    
    console.log(archivoJson)
    await writeFile('./data/deportes.json', JSON.stringify(archivoJson))

    res.render('create', {archivoJson})
})




export default router;