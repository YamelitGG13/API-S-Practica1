let pagina = 1; // Inicializa la variable 'pagina' en 1, que se usará para la paginación

const btnAnterior = document.getElementById('btnAnterior'); // Obtiene el botón de "Anterior" del DOM por su ID
const btnSiguiente = document.getElementById('btnSiguiente'); // Obtiene el botón de "Siguiente" del DOM por su ID

// Agrega un evento 'click' al botón "Siguiente"
btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) { // Verifica si la página actual es menor a 1000
        pagina += 1; // Incrementa el número de página
        cargarPeliculas(); // Llama a la función 'cargarPeliculas' para cargar las películas de la nueva página
    }
});

// Agrega un evento 'click' al botón "Anterior"
btnAnterior.addEventListener('click', () => {
    if (pagina > 1) { // Verifica si la página actual es mayor a 1
        pagina -= 1; // Decrementa el número de página
        cargarPeliculas(); // Llama a la función 'cargarPeliculas' para cargar las películas de la nueva página
    }
});

// Crear función asincrónica para cargar las películas
const cargarPeliculas = async () => {
    try {
        // Hace una solicitud fetch a la API de The Movie Database para obtener las películas populares
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=6c139f9021828dc187c989bda94dd4c2&language=es-MX&page=${pagina}`);

        console.log(respuesta); // Imprime la respuesta de la API en la consola

        // Si la respuesta es correcta (status 200)
        if (respuesta.status === 200) {
            const datos = await respuesta.json(); // Convierte la respuesta a formato JSON
            
            let peliculas = ''; // Inicializa una cadena vacía para almacenar el HTML de las películas
            datos.results.forEach(pelicula => { // Itera sobre los resultados de las películas
                peliculas +=
                    `<div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                    `; // Agrega el HTML de cada película a la cadena
            });

            // Inserta el HTML de las películas en el contenedor del DOM
            document.getElementById('contenedor').innerHTML = peliculas;

        } else if (respuesta.status === 401) {
            console.log('Pusiste la llave mal'); // Imprime un mensaje si la clave de la API es incorrecta
        } else if (respuesta.status === 404) {
            console.log('La pelicula que buscas no existe'); // Imprime un mensaje si no se encuentra la película
        } else {
            console.log('Hubo un error y no sabemos que paso'); // Imprime un mensaje para otros errores
        }

    } catch (error) {
        console.log(error); // Imprime el error en la consola si ocurre una excepción
    }
}

cargarPeliculas(); // Llama a la función 'cargarPeliculas' cuando se carga la página por primera vez
