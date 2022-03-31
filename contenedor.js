const fs = require('fs')

class Contenedor {
    constructor(name) {
        this.fileName = name
        this.countID = 0
        this.content = []
    }

    //MÉTODO: Escribe/sobreescribe
    async write() { 
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.content,null,2)) // null y 2 son parámetros para que en el archivo txt se vean bien ordenados según sandría, espacios, saltos de línea, etc.
    }

    //MÉTODO: Guardar cada elemento
    save(object) {
        this.countID++ //Va guardando cada elemento con un ID nuevo
        object["id"] = this.countID //Agrego la propiedad ID al objeto pasado como parámetro
        this.content.push(object) //Agrego el objeto al contenido(array)
        this.write() //Agrego el objeto al archivo
        return `El ID del objeto añadido es ${this.countID}` //Retorna el ID
    }

    //MÉTODO: Recibe un ID y devuelve el objeto, o null si no está
    getById(id) {
        let result
        if (this.content !== []) {
            result = this.content.find(x => x.id === id)
            if (result === undefined) {
                result = null
            }
        } else {
            result = 'El archivo está vacío'
        }
        return result
    }

    //MÉTODO: Devuelve un array con TODOS los objetos
    async getAll() { 
        return this.content
    }

    //MÉTODO: Elimina del archivo el objeto con el ID buscado
    deleteById(id) {
        let result
        if (this.content !== []) {
            let newContent = this.content.filter(x => x.id !== id)
            this.content = newContent
            this.write() //Sobreescribo el archivo
            result = 'OK'
        } else {
            result = `El archivo está vacío`
        }
        return result
    }

    //MÉTODO: Elimina todos los objetos presentes en el archivo.
    async deleteAll() { 
        this.content = this.content.splice(0, this.content.length)
        this.write()
    }
}

module.exports = Contenedor