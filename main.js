import {promises as fs} from "fs"

class Contenedor{
    constructor(file){
        this.file = file
    }

    async save(obj){
        try{
            const objects = await this.getAllObjects()
            const lastId = objects.length > 0 ? objects[objects.length-1].id : 0
            const newId = lastId +1
            const newObj = {id: newId, ...obj}
            objects.push(newObj)
            await this.saveObjects(objects)
            return newId
        }catch(error){
            throw new Error('Error al guardar el objeto')
        }
    }

    async getById(id){
        try{
            const objects = await this.getAllObjects()
            const obj = objects.find((o)=>o.id ===id)
            return obj || null
        }catch(error){
            throw new Error('Error al obtener el ID')
        }
    }
    async getAll(){
        try{
            const objects = await this.getAllObjects()
            return objects
        }catch(error){
            throw new Error('Error al obtener los objetos')
        }
    }

    async deleteById(id){
        try{
            let objects = await this.getAllObjects()
            objects = objects.filter((o)=>o.id !==id)
            await this.saveObjects(objects)
        }catch(error){
            throw new Error("Error al eliminar el objeto")
        }
    }

    async deleteAll(){
        try{
            await this.saveObjects([])
        }catch(error){
            throw new Error("Error al eliminar los objetos")
        }
    }

    async getAllObjects(){
        try{
            const data = await fs.readFile(this.file, 'utf-8')
            return data ? JSON.parse(data) : []
        }catch(error){
            return []
        }
    }

    async saveObjects(objects){
        try{
            await fs.writeFile(this.file, JSON.stringify(objects, null, 2))
        }catch(error){
            throw new Error("Error al guardar objetos")
        }
    }
}

const main = async() => {
    const productos = new Contenedor("productos.txt")

    //Guardo los productos

    await productos.save( 
    { title: "Pantalón Sastrero",
    description: "Pantalón de vestir sastrero chupin",
    price: 15000,
    thumbnail: "/imagenPantalonSastrero.jpg",
    code: "P002",
    stock: 8 })

    await productos.save(
    {title: "Camisa",
    description: "Camisa estampada",
    price: 12000,
    thumbnail: "/imagenPantalonCamisa.jpg",
    code: "P003",
    stock: 4})

    await productos.save( 
    {title: "Remera",
    description: "Remera de algodón",
    price: 8000,
    thumbnail: "/imagenPantalonRemera.jpg",
    code: "P004",
    stock: 15})

    //Obtengo todos los productos

/*     const allObjects = await productos.getAll()
    console.log('Objetos guardados', allObjects) */

    //Obtengo producto por ID
    
/*     const obj = await productos.getById(2)
    console.log("Objeto Obtenido", obj)  */

    //Elimino producto

/*     await productos.deleteById(1)
    console.log("Objeto eliminado") */
}

//para ejecutar
main().catch((error) => console.error(error))