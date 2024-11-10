let compraTotal = 0;//almacena el costo total de la compra del usario.
let productosComprados = [];//Este array contiene los productos que el tipo compre.
let usuariosRegistrados = [];//almacena los users que se registren en la tienda.

// Array de objetos que contiene los productos disponibles en la tienda
// Declara una constante productos que contiene un array de objetos. 
//Cada objeto representa un producto disponible en la tienda con propiedades id, nombre, precio.
const productos = [
    { id: 1, nombre: "Guitarra Eléctrica", precio: 1200 },
    { id: 2, nombre: "Pickups DiMarzio", precio: 280 },
    { id: 3, nombre: "Pickups Seymour Duncan", precio: 250 },
    { id: 4, nombre: "Pickups EMG", precio: 300 },
    { id: 5, nombre: "Cuerdas de Guitarra", precio: 70 },
    { id: 6, nombre: "Correa de Guitarra", precio: 80 },
    { id: 7, nombre: "Amplificador", precio: 1500 },
    { id: 8, nombre: "Pedal de efectos", precio: 150 },
    { id: 9, nombre: "Afinador", precio: 25 },
    { id: 10, nombre: "Cejilla", precio: 15 }
];

//supongo que cualquier tienda necesita que te loguees...
function validarUsuario() {
    let usuario;
    let contrasena;

    do {
        usuario = prompt("Ingrese su nombre de usuario (al menos 4 caracteres):");
        if (usuario.length < 4) {
            alert("El nombre de usuario debe tener al menos 4 caracteres.");
        }
    } while (usuario.length < 4);

    contrasena = prompt("Ingrese su contraseña:");

    // Compara la contraseña ingresada con "123456". Si coinciden true, de lo contrario false.
    return contrasena === "123456";
}// tambien esta bueno registrarse, no le encontre la vuelta para el caso de no tener user y contraseña para que te lleve aa registrarUsuario
// debo estar medio quemado...
function registrarUsuario() {
    let dni;
    let nombre;
    let email;

    // Validación para DNI: no vacio y debe ser un nuumero
    do {
        dni = prompt("Ingrese su DNI:");
        // .trim() elimina los espacios en blanco al principio y al final de la cadena
        if (dni.trim() === "" || isNaN(dni)) {
            alert("El DNI no puede estar vacío y debe ser un número.");
        }
    } while (dni.trim() === "" || isNaN(dni));
    // Flashee con el trim, tilizar trim en validaciones hace que no se acepten entradas que son espacios en blanco.
    // Validación para nombre: no vacio y debe ser una cadena
    do {
        nombre = prompt("Ingrese su nombre:");
        if (nombre.trim() === "") {
            alert("El nombre no puede estar vacío.");
        }
    } while (nombre.trim() === "");

    // Validación para email: no vacio y debe contener un @
    do {
        email = prompt("Ingrese su email:");
        if (email.trim() === "" || !email.includes("@")) {
            alert("El email no puede estar vacío y debe contener un '@'.");
        }
    } while (email.trim() === "" || !email.includes("@"));

    let usuario = { dni, nombre, email }; // Crea un objeto usuario con esta informacin y lo mete en al array usuariosRegistrados.
    usuariosRegistrados.push(usuario);

    alert("Usuario registrado exitosamente.");
}


function seleccionarProducto() {
    let opcion = Number(prompt("Seleccione el producto que desea comprar:\n" + listarProductos()));

    while (isNaN(opcion) || opcion < 1 || opcion > productos.length) {//Valida que opcion sea un numero y este dentro del rango valido de productos
        alert("Opción no válida.");
        opcion = Number(prompt("Seleccione el producto que desea comprar:\n" + listarProductos())); //llama a lista... y le mustra la lista
    }

    return opcion;
}

function listarProductos() {
    let lista = "";
    for (let i = 0; i < productos.length; i++) { //Recorre el array productos y crea una cadena con la lista de productos, incluyendo su id, nombre y precio.
        lista += `${productos[i].id} - ${productos[i].nombre} ($${productos[i].precio})\n`;
        //o sea, le mete a lista una cadena con el id, nombre y precio del producto en la posición i, seguido de un salto de linea.
    }
    return lista;
}

function comprarProducto(productoId, cantidad) {//Encuentra el producto por su id usando find.
    let producto = productos.find(p => p.id === productoId);//Busca el producto en el array productos cuyo id coincida con productoId
    //p.id accede a la propiedad id del objeto actual p. acá, p es un objeto del array productos.
    if (producto) {
        let precioTotal = producto.precio * cantidad;//Calcula el precio total basado en la cantidad.
        let confirmarCompra = confirm(`¿Está seguro de comprar ${cantidad} ${producto.nombre} a $${precioTotal}?`);

        if (confirmarCompra) {
            compraTotal += precioTotal;//le pone el precioTotal al compraTotal.
            productosComprados.push({ producto: producto.nombre, cantidad });// con el push pone un objeto con el nombre del producto y la cantidad al array productosComprados.
            alert("Producto agregado al carrito.");
        } else {
            alert("Compra cancelada.");
        }
    } else {
        alert("Producto no encontrado.");
    }
}

function procesarCompra() {
    let productoId = seleccionarProducto();
    let cantidad = Number(prompt("Ingrese la cantidad que desea comprar:"));

    while (isNaN(cantidad) || cantidad < 1) {// si cantidad no es numero o es menor a 1
        alert("Cantidad no válida.");
        cantidad = Number(prompt("Ingrese la cantidad que desea comprar:"));
    }

    comprarProducto(productoId, cantidad);//Llama a comprarProducto con el id y la cantidad.
}

function aplicarDescuento(monto, descuento) {//Aplica un descuento (o recargo) multiplicando el monto por el factor de descuento.
    return monto * descuento;
}

function seleccionarMedioDePago() {
    let opcion = Number(prompt("Seleccione el medio de pago:\n1 - Efectivo (10% de descuento)\n2 - Tarjeta de débito\n3 - Tarjeta de crédito (10% de recargo)\n4 - Con Sexo (50% de descuento - 2 pagos obligatorios)"));

    while (isNaN(opcion) || opcion < 1 || opcion > 4) {//no es numero o es menor a 1 o mayor a 4
        alert("Opción no válida.");
        opcion = Number(prompt("Seleccione el medio de pago:\n1 - Efectivo (10% de descuento)\n2 - Tarjeta de débito\n3 - Tarjeta de crédito (10% de recargo)\n4 - Con Sexo (50% de descuento - 2 pagos obligatorios)"));
    }

    return opcion;
}
// esto me lo afane textual de la clase 3
function calcularPagoFinal() {
    let opcionPago = seleccionarMedioDePago();
    let precioFinal;

    switch (opcionPago) {
        case 1:
            precioFinal = aplicarDescuento(compraTotal, 0.9);
            break;
        case 2:
            precioFinal = aplicarDescuento(compraTotal, 1);
            break;
        case 3:
            precioFinal = aplicarDescuento(compraTotal, 1.1);
            break;
        case 4:
            precioFinal = aplicarDescuento(compraTotal, 0.5);
            break;
        default:
            alert("No sea Chanta!, Medio de pago no válido.");
            return calcularPagoFinal();
    }

    alert(`El precio final de tu compra es de $${precioFinal.toFixed(2)}.`);//precio final con 2 decimales

}

function core() {
    if (validarUsuario()) { //si tira true ejecuta a registrarUsuario()
        registrarUsuario();

        let seguirComprando = true;// es como bandera

        while (seguirComprando) {
            procesarCompra();
            seguirComprando = confirm("¿Desea seguir comprando?");
        }

        alert(`Productos comprados:\n${productosComprados.map(p => `${p.cantidad} x ${p.producto}`).join("\n")}\nTotal a pagar: $${compraTotal}`);
        calcularPagoFinal();//map Recorre el array productosComprados.
        //Transforma cada objeto en una cadena de texto con el formato "cantidad x producto".
        //con el join Une las cadenas resultantes de map en una sola cadena, separando cada una con un salto de línea.
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

core();
