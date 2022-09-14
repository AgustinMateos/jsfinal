const titulo= document.getElementById(`tituloProductos`);
    
let htmlHeader=`<h2 class=tituloH>Ropa Hombres</h2>`;
titulo.innerHTML += htmlHeader;



function addToCart(id) {
        carrito.push(catalogo.find(r => r.id == id))
        console.log(carrito);
    localStorage.setItem('seleccion', JSON.stringify(carrito));
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'se selecciono correctamente',
        showConfirmButton: false,
        timer: 1500,
        with:100,
      })
    } 
    
const section = document.getElementById('container__productos');

async function fetchProductos(){
    const respuesta = await fetch("../data/productos.json") 
    return await respuesta.json();
}

function mostrar__catalogo(){ for (const producto of catalogo) {
        const {nombre,imagen,made,talle,precio,id} = producto
        let htmlSection = `
        <div class=card><h2>${nombre}</h2>
        <img src="../imagenes/${imagen}" width="180" height="140">
        <p> Talle ${talle} / ${made}</p>
        <p>$ ${precio}</p>
        <button class="btnAgregar"  onclick="addToCart(${id})"> Agregar </button>
        <hr></div> `;
    
    section.innerHTML += htmlSection;
    }}

let catalogo=[]

fetchProductos().then(productos =>{
    catalogo=productos
    mostrar__catalogo()
})


    const search = document.getElementById("search");


    function filtrarProductos(filtro){
        let filtrado = catalogo.filter((el) => {
            return el.nombre.includes(filtro);
        });
        return filtrado;
    };
    
    
    search.addEventListener("keyup" , (e) => {
        e.preventDefault();
        container__productos.innerHTML = "";
        let filtro = filtrarProductos(search.value.toUpperCase());
        let html = filtro.map ( (producto) => {
            return (
                `
                <div class=card><h2>${producto.nombre}</h2>
                <img src="../imagenes/${producto.imagen}" width="180" height="140">
                <p> Talle ${producto.talle} / ${producto.made}</p>
                <p>$ ${producto.precio}</p>
                <button class="btnAgregar" onclick="addToCart(${producto.id})"> Agregar </button>
                <hr> </div> `
                
            )
        })
        
        container__productos.innerHTML = html
        
    })


    const carrito=[];
