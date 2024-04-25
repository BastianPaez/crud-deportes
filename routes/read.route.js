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

    res.render('read', {archivoJson})
})


export default router;