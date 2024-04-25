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

    res.render('delete', {archivoJson})
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
    
    archivoJson = archivoJson.filter( item => item.id !== id)




    await writeFile('./data/deportes.json', JSON.stringify(archivoJson))


    res.render('delete', {archivoJson})
})


export default router;