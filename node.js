const Contenedor = require('./contenedor.js')

const express = require ('express')

const app = express();

//CONSIGNA 1: Obtener todos los productos
app.get('/productos', (req, res) => {
    res.send(getAll()); //Ver como hacer
});

//CONSIGNA 2: Obtener un producto de manera aleatoria

//Función para la creación de un número aleatorio --> ID Aleatorio
//Se coloca -> min = 1 y max = maxId
function getRandom(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

//Función para sacar el máximo Id
function maxId(productos){
    let max = productos[0].id;
    for (const producto of productos) {
        if (producto.id > max) {
            max = producto.id;
        }
    }
    return max;
}

app.get('/productoRandom', (req, res) => {
    producto = getById(getRandom(1, maxId)); //Producto de Id aleatorio
    res.send (`Se obtuvo aleatoriamente el producto ${producto}`);
});

//Para que se escuche el puerto 8080
const server = app.listen (8080, () => {
    console.log(`El servidor en el puerto 8080`);
});

//Detector de errores
server.on('error', error => console.log(`Error en el servidor ${error} `));