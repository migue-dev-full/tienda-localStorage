//definir las variables o selectores
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

//definir los eventos o listeners
cargarEventListener();
function cargarEventListener(){
    //click al boton agregar al carrito 
    listaCursos.addEventListener('click',agregarCurso);

    //elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito = [];
        vaciarCarrito();

    document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('articulosCarrito')) || []
        carritoHTML()
    })
    });
}

//definir las funciones a utilizar

function agregarCurso(e){
    e.preventDefault();
    //console.log("4")

    if(e.target.classList.contains('agregar-carrito')){
       //console.log(e.target.parentElement);
       
        const curso = e.target.parentElement;
        leerDatosCurso(curso);

    }
}

//elimina un curso del carrito
function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        const existe = articulosCarrito.some(cursos => cursos.id === cursoId);

        if(existe){
            //actualizar la cantidad
            const curso = articulosCarrito.map(curso =>{
                if(curso.id === cursoId){
                    //primero verifico el id para
                    //asegurar que haya encontrado el producto a eliminar 
                    if(curso.cantidad > 1){
                        curso.cantidad--;
                        return curso; //actualizamos objeto curso
                    }else{
                        //caso base: cantidad = 1
                        articulosCarrito = articulosCarrito.filter(cursos => cursos.id !== cursoId)
                        return curso;
                    }
                }
            })
        }

        carritoHTML();
    }
}

function vaciarCarrito(){
    //forma lenta
    //contenedorCarrito.innerHTML = '';
    sincronizarLS();
    //forma rapida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
}
}

function leerDatosCurso(curso){
    const infoCurso ={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:0
    }

    articulosCarrito.push(infoCurso);

    if(articulosCarrito.some(curso => curso.id === infoCurso.id)){
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }         
        })

        articulosCarrito = [...cursos]
        sincronizarLS()
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso]
        sincronizarLS()
    }

    //console.log(articulosCarrito);
    carritoHTML();
    
}


function carritoHTML(){
    sincronizarLS();
    vaciarCarrito();
    articulosCarrito.forEach(cursos => {
        const row = document.createElement('tr');
        row.innerHTML = `...
            <td>
            <img src="${cursos.imagen}" width=100>
            </td>
            <td>${cursos.titulo}</td>
            <td>${cursos.precio}</td>
            <td>${cursos.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${cursos.id}">X</a>
            </td>
        `

        contenedorCarrito.appendChild(row);


    })
}

function sincronizarLS() {
    try {
      localStorage.setItem('articulosCarrito', JSON.stringify(articulosCarrito));
      console.log('Carrito guardado en localStorage');
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }
  
  // Función para cargar el carrito desde el almacenamiento local
  function cargarCarritoDesdeLocalStorage() {
    try {
      const carritoGuardado = localStorage.getItem('articulosCarrito');
      if (carritoGuardado) {
        articulosCarrito = JSON.parse(carritoGuardado);
        carritoHTML();
        console.log('Carrito cargado desde localStorage');
      }
    } catch (error) {
      console.error('Error al cargar el carrito desde localStorage:', error);
    }
  }
  
  // Llamar a la función para cargar el carrito al cargar la página
  cargarCarritoDesdeLocalStorage();