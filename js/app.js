// definir las variables o selectores
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];



// -----------------------------------------------------------------------

// definir eventos o Listeners
 cargarEventListener(); // llamar la funcion que escucha los event listener
function cargarEventListener(){
    // click al boton agregar carrito
    listaCursos.addEventListener('click',agregarCurso);

    // elimina un curso del carrito
    carrito.addEventListener('click',eliminarCurso);

    // vacia el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}


// Definir las funciones que llamamos
function agregarCurso(e){    
    e.preventDefault();
    // console.log("ingrese a la funcion agregar curso");  prueba

    // console.log(e.target.classList.contains('agregar-carrito'));
     //para detectar la clase de del evento quieres ocupar
     if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement;
        leerDatosCurso(curso)
        
     }
     
    
}

function eliminarCurso(){

}

function vaciarCarrito(){

}

function leerDatosCurso(curso){
        const infoCurso = {
        image: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
        }
}

if(articulosCarrito.some(curso => curso.id === infoCurso.id)){
    const cursos = articulosCarrito.map(curso =>{
        if(curso.id === infoCurso.id){
            curso.cantidad++;
            return curso;
        }else{
            return curso;
        }
    })

    articulosCarrito = [...cursos]  //... para hacer dupicado de estructura
}else{
    articulosCarrito = [...articulosCarrito,infoCurso];
}

console.log(articulosCarrito);