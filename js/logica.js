/* ============================
     CARRUSEL DE CATEGORÍAS
============================ */
console.log("logica.js está conectado correctamente");
document.addEventListener("DOMContentLoaded", function () {

    const listaCategorias = document.getElementById("listaCategorias");
    const botonAnterior = document.getElementById("categoriaAnterior");
    const botonSiguiente = document.getElementById("categoriaSiguiente");

    if (!listaCategorias || !botonAnterior || !botonSiguiente) {
        console.error("No se encontraron los elementos del carrusel.");
        return;
    }

    /*
    Obtiene el ancho de una tarjeta más el espacio
    que existe entre las tarjetas.
    */
    function obtenerDesplazamiento() {

        const tarjeta = listaCategorias.querySelector(".categoria-card");

        if (!tarjeta) {
            return 0;
        }

        const estilosLista = window.getComputedStyle(listaCategorias);
        const espacio = parseFloat(estilosLista.columnGap) || 0;

        return tarjeta.getBoundingClientRect().width + espacio;
    }

    /*
    Activa o desactiva las flechas dependiendo
    de la posición actual del carrusel.
    */
    function actualizarFlechas() {

        const posicionActual = listaCategorias.scrollLeft;
        const desplazamientoMaximo =
            listaCategorias.scrollWidth - listaCategorias.clientWidth;

        botonAnterior.disabled = posicionActual <= 1;

        botonSiguiente.disabled =
            posicionActual >= desplazamientoMaximo - 1;
    }

    botonSiguiente.addEventListener("click", function () {

        const desplazamiento = obtenerDesplazamiento();

        listaCategorias.scrollBy({
            left: desplazamiento,
            behavior: "smooth"
        });
    });

    botonAnterior.addEventListener("click", function () {

        const desplazamiento = obtenerDesplazamiento();

        listaCategorias.scrollBy({
            left: -desplazamiento,
            behavior: "smooth"
        });
    });

    /*
    Actualiza los botones después de mover
    manualmente o mediante las flechas.
    */
    listaCategorias.addEventListener("scroll", function () {
        actualizarFlechas();
    });

    /*
    Recalcula las posiciones cuando cambia
    el tamaño de la pantalla.
    */
    window.addEventListener("resize", function () {
        actualizarFlechas();
    });

    actualizarFlechas();
});

console.log("logica.js está conectado correctamente");

document.addEventListener("DOMContentLoaded", function () {

    iniciarCarruselCategorias();
    iniciarBuscador();

});


/* ==========================================
          CARRUSEL DE CATEGORÍAS
========================================== */

function iniciarCarruselCategorias() {

    const listaCategorias =
        document.getElementById("listaCategorias");

    const botonAnterior =
        document.getElementById("categoriaAnterior");

    const botonSiguiente =
        document.getElementById("categoriaSiguiente");


    /*
    Si los elementos del carrusel no existen,
    termina únicamente esta función.
    El buscador puede seguir funcionando.
    */
    if (
        !listaCategorias ||
        !botonAnterior ||
        !botonSiguiente
    ) {
        return;
    }


    /*
    Obtiene el ancho de una tarjeta y el espacio
    entre las tarjetas.
    */
    function obtenerDesplazamiento() {

        const tarjeta =
            listaCategorias.querySelector(".categoria-card");

        if (!tarjeta) {
            return 0;
        }

        const estilosLista =
            window.getComputedStyle(listaCategorias);

        const espacio =
            parseFloat(estilosLista.columnGap) || 0;

        return (
            tarjeta.getBoundingClientRect().width +
            espacio
        );

    }


    /*
    Activa o desactiva las flechas dependiendo
    de la posición actual del carrusel.
    */
    function actualizarFlechas() {

        const posicionActual =
            listaCategorias.scrollLeft;

        const desplazamientoMaximo =
            listaCategorias.scrollWidth -
            listaCategorias.clientWidth;

        botonAnterior.disabled =
            posicionActual <= 1;

        botonSiguiente.disabled =
            posicionActual >= desplazamientoMaximo - 1;

    }


    botonSiguiente.addEventListener(
        "click",
        function () {

            const desplazamiento =
                obtenerDesplazamiento();

            listaCategorias.scrollBy({
                left: desplazamiento,
                behavior: "smooth"
            });

        }
    );


    botonAnterior.addEventListener(
        "click",
        function () {

            const desplazamiento =
                obtenerDesplazamiento();

            listaCategorias.scrollBy({
                left: -desplazamiento,
                behavior: "smooth"
            });

        }
    );


    listaCategorias.addEventListener(
        "scroll",
        actualizarFlechas
    );


    window.addEventListener(
        "resize",
        actualizarFlechas
    );


    actualizarFlechas();

}


/* ==========================================
             BUSCADOR ARADU PET
========================================== */

function iniciarBuscador() {

    const formularioBusqueda =
        document.getElementById("formularioBusqueda");

    const campoBusqueda =
        document.getElementById("campoBusqueda");

    const sugerenciasBusqueda =
        document.getElementById("sugerenciasBusqueda");

    const seccionResultados =
        document.getElementById("resultadosBusqueda");

    const listaResultados =
        document.getElementById("listaResultados");

    const informacionResultados =
        document.getElementById("informacionResultados");

    const botonLimpiar =
        document.getElementById("limpiarBusqueda");


    /*
    Si el buscador todavía no está en el HTML,
    no genera errores.
    */
    if (
        !formularioBusqueda ||
        !campoBusqueda ||
        !sugerenciasBusqueda
    ) {
        return;
    }


    /* ==========================================
         INFORMACIÓN DE LAS SECCIONES
    ========================================== */

    const secciones = [

        {
            titulo: "Inicio",
            descripcion:
                "Página principal y presentación de Aradu Pet",

            palabras:
                "inicio principal portada carrusel comienzo",

            destino: "carouselAraduPet",
            tipo: "Sección"
        },

        {
            titulo: "Historia",
            descripcion:
                "Conoce la historia del emprendimiento Aradu Pet",

            palabras:
                "historia emprendimiento familia veterinaria nosotros",

            destino: "historia",
            tipo: "Sección"
        },

        {
            titulo: "Categorías",
            descripcion:
                "Consulta las categorías generales de productos",

            palabras:
                "categorías productos alimentos accesorios juguetes snacks higiene",

            destino: "categorias",
            tipo: "Sección"
        },

        {
            titulo: "Multimedia",
            descripcion:
                "Video y contenido multimedia de Aradu Pet",

            palabras:
                "multimedia video presentación contenido promoción",

            destino: "multimedia",
            tipo: "Sección"
        },

        {
            titulo: "Ubicación",
            descripcion:
                "Dirección, horario y ubicación de la tienda",

            palabras:
                "ubicación dirección mapa tienda horario alajuela villa bonita",

            destino: "ubicacion",
            tipo: "Sección"
        },

        {
            titulo: "Acerca de",
            descripcion:
                "Información sobre los valores y servicios de Aradu Pet",

            palabras:
                "acerca nosotros información valores servicios veterinaria",

            destino: "acerca",
            tipo: "Sección"
        },

        {
            titulo: "Contacto",
            descripcion:
                "Información para contactar a Aradu Pet",

            palabras:
                "contacto teléfono correo instagram dirección whatsapp",

            destino: "footer",
            tipo: "Sección"
        }

    ];


    /* ==========================================
       CATEGORÍAS PREDETERMINADAS
    ========================================== */

    /*
    Esta lista permite que el buscador funcione
    incluso en páginas donde las tarjetas no estén
    visibles en el HTML.
    */
    const categoriasPredeterminadas = [

        {
            titulo: "Alimentos",
            descripcion:
                "Productos alimenticios para perros y gatos",

            palabras:
                "alimentos comida concentrado nutrición perro gato alimento",

            url: "alimentos.html",
            imagen: "img/categoria-alimentos.jpg",
            tipo: "Categoría"
        },

        {
            titulo: "Accesorios",
            descripcion:
                "Collares, correas, camas y accesorios para mascotas",

            palabras:
                "accesorios collar collares correas cama camas perro gato",

            url: "accesorios.html",
            imagen: "img/categoria-accesorios.jpg",
            tipo: "Categoría"
        },

        {
            titulo: "Juguetes",
            descripcion:
                "Juguetes y entretenimiento para mascotas",

            palabras:
                "juguetes diversión entretenimiento pelotas perro gato jugar",

            url: "juguetes.html",
            imagen: "img/categoria-juguetes.jpg",
            tipo: "Categoría"
        },

        {
            titulo: "Snacks",
            descripcion:
                "Premios y golosinas para mascotas",

            palabras:
                "snacks premios golosinas bocadillos perro gato alimento",

            url: "snacks.html",
            imagen: "img/categoria-snacks.jpg",
            tipo: "Categoría"
        },

        {
            titulo: "Higiene y bienestar",
            descripcion:
                "Productos para la limpieza y cuidado de mascotas",

            palabras:
                "higiene limpieza champú shampoo bienestar cuidado mascota baño",

            url: "higiene.html",
            imagen: "img/categoria-higiene.jpg",
            tipo: "Categoría"
        }

    ];


    /* ==========================================
       OBTENER CATEGORÍAS DEL HTML
    ========================================== */

    function obtenerCategoriasDelHTML() {

        const elementos =
            document.querySelectorAll(".elemento-buscable");

        return Array.from(elementos).map(
            function (elemento) {

                return {

                    titulo:
                        elemento.dataset.titulo || "",

                    descripcion:
                        elemento.dataset.descripcion || "",

                    palabras:
                        elemento.dataset.palabras || "",

                    url:
                        elemento.dataset.url || "",

                    imagen:
                        elemento.dataset.imagen || "",

                    tipo: "Categoría"

                };

            }
        );

    }


    /* ==========================================
          OBTENER TODOS LOS DATOS
    ========================================== */

    function obtenerDatosBusqueda() {

        const categoriasHTML =
            obtenerCategoriasDelHTML();

        /*
        Si existen categorías en el HTML,
        utiliza esas.

        Si no existen, utiliza las predeterminadas.
        */
        const categorias =
            categoriasHTML.length > 0
                ? categoriasHTML
                : categoriasPredeterminadas;

        return [
            ...secciones,
            ...categorias
        ];

    }


    /* ==========================================
             NORMALIZAR TEXTO
    ========================================== */

    /*
    Convierte el texto a minúsculas y elimina
    las tildes para facilitar la búsqueda.
    */
    function normalizarTexto(texto) {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

    }


    /* ==========================================
            FILTRAR RESULTADOS
    ========================================== */

    function filtrarResultados(termino) {

        const textoBuscado =
            normalizarTexto(termino);

        if (textoBuscado === "") {
            return [];
        }

        const palabrasBuscadas =
            textoBuscado.split(/\s+/);

        return obtenerDatosBusqueda().filter(
            function (elemento) {

                const contenido =
                    normalizarTexto(
                        elemento.titulo + " " +
                        elemento.descripcion + " " +
                        elemento.palabras
                    );

                /*
                Todas las palabras escritas deben
                aparecer en el contenido.
                */
                return palabrasBuscadas.every(
                    function (palabra) {

                        return contenido.includes(palabra);

                    }
                );

            }
        );

    }


    /* ==========================================
          MOSTRAR SUGERENCIAS
    ========================================== */

    function mostrarSugerencias() {

        const termino =
            campoBusqueda.value.trim();

        sugerenciasBusqueda.innerHTML = "";

        if (termino.length === 0) {

            ocultarSugerencias();
            return;

        }

        const resultados =
            filtrarResultados(termino).slice(0, 6);

        sugerenciasBusqueda.style.display =
            "block";


        if (resultados.length === 0) {

            sugerenciasBusqueda.innerHTML = `
                <p class="sugerencia-vacia">
                    No se encontraron sugerencias.
                </p>
            `;

            return;

        }


        resultados.forEach(
            function (resultado) {

                const boton =
                    document.createElement("button");

                boton.type = "button";
                boton.className = "sugerencia-item";

                const inicial =
                    resultado.titulo
                        .charAt(0)
                        .toUpperCase();

                boton.innerHTML = `
                    <span class="sugerencia-icono">
                        ${inicial}
                    </span>

                    <span class="sugerencia-texto">

                        <span class="sugerencia-titulo">
                            ${resultado.titulo}
                        </span>

                        <span class="sugerencia-descripcion">
                            ${resultado.tipo}
                        </span>

                    </span>
                `;


                boton.addEventListener(
                    "click",
                    function () {

                        campoBusqueda.value =
                            resultado.titulo;

                        ocultarSugerencias();

                        /*
                        Al seleccionar una sugerencia,
                        se muestra dentro de la sección
                        de resultados.
                        */
                        mostrarResultados(
                            resultado.titulo,
                            [resultado]
                        );

                    }
                );


                sugerenciasBusqueda.appendChild(
                    boton
                );

            }
        );

    }


    /* ==========================================
          OCULTAR SUGERENCIAS
    ========================================== */

    function ocultarSugerencias() {

        sugerenciasBusqueda.style.display =
            "none";

        sugerenciasBusqueda.innerHTML = "";

    }


  /* ==========================================
       MOSTRAR HISTORIAL DE RESULTADOS
========================================== */

function mostrarResultados(termino, resultados) {

    /*
    Si la página actual no contiene la sección
    de resultados, abre directamente el primer
    resultado encontrado.
    */
    if (
        !seccionResultados ||
        !listaResultados ||
        !informacionResultados
    ) {

        if (resultados.length > 0) {
            abrirResultado(resultados[0]);
        }

        return;
    }


    /*
    IMPORTANTE:
    Ya no utilizamos:

    listaResultados.innerHTML = "";

    porque esa línea eliminaba las búsquedas
    realizadas anteriormente.
    */

    seccionResultados.classList.add("mostrar");


    /* Crear un grupo para la nueva búsqueda */
    const grupoBusqueda =
        document.createElement("section");

    grupoBusqueda.className = "grupo-busqueda";


    /* Crear el encabezado de la búsqueda */
    const encabezadoBusqueda =
        document.createElement("div");

    encabezadoBusqueda.className =
        "grupo-busqueda-encabezado";


    const tituloBusqueda =
        document.createElement("h3");

    tituloBusqueda.className =
        "grupo-busqueda-titulo";

    tituloBusqueda.textContent =
        `Búsqueda: "${termino}"`;


    const cantidadBusqueda =
        document.createElement("p");

    cantidadBusqueda.className =
        "grupo-busqueda-cantidad";


    if (resultados.length === 0) {

        cantidadBusqueda.textContent =
            "No se encontraron resultados";

    } else {

        cantidadBusqueda.textContent =
            `${resultados.length} resultado` +
            `${resultados.length === 1 ? "" : "s"}`;

    }


    encabezadoBusqueda.appendChild(
        tituloBusqueda
    );

    encabezadoBusqueda.appendChild(
        cantidadBusqueda
    );


    /* Contenedor de las tarjetas */
    const contenedorTarjetas =
        document.createElement("div");

    contenedorTarjetas.className =
        "grupo-busqueda-resultados";


    /* Cuando no se encontraron resultados */
    if (resultados.length === 0) {

        const mensajeSinResultados =
            document.createElement("div");

        mensajeSinResultados.className =
            "sin-resultados";

        mensajeSinResultados.innerHTML = `
            <h3>
                No se encontraron coincidencias
            </h3>

            <p>
                Prueba con palabras como alimentos,
                accesorios, juguetes, snacks, higiene,
                historia, ubicación o contacto.
            </p>
        `;

        contenedorTarjetas.appendChild(
            mensajeSinResultados
        );

    } else {

        /*
        Crear una tarjeta por cada resultado
        encontrado.
        */
        resultados.forEach(
            function (resultado) {

                const tarjeta =
                    document.createElement("article");

                tarjeta.className =
                    resultado.tipo === "Sección"
                        ? "resultado-card resultado-card-seccion"
                        : "resultado-card";


                let imagenHTML = "";

                if (resultado.imagen) {

                    imagenHTML = `
                        <img
                            src="${resultado.imagen}"
                            alt="${resultado.titulo}"
                            class="resultado-imagen">
                    `;

                }


                const textoBoton =
                    resultado.tipo === "Categoría"
                        ? "Abrir categoría"
                        : "Ir a la sección";


                tarjeta.innerHTML = `
                    ${imagenHTML}

                    <div class="resultado-contenido">

                        <span class="resultado-tipo">
                            ${resultado.tipo}
                        </span>

                        <h3 class="resultado-nombre">
                            ${resultado.titulo}
                        </h3>

                        <p class="resultado-descripcion">
                            ${resultado.descripcion}
                        </p>

                        <button
                            type="button"
                            class="resultado-boton">

                            ${textoBoton}

                        </button>

                    </div>
                `;


                const botonResultado =
                    tarjeta.querySelector(
                        ".resultado-boton"
                    );


                botonResultado.addEventListener(
                    "click",
                    function () {

                        abrirResultado(resultado);

                    }
                );


                contenedorTarjetas.appendChild(
                    tarjeta
                );

            }
        );

    }


    /* Construir el grupo completo */
    grupoBusqueda.appendChild(
        encabezadoBusqueda
    );

    grupoBusqueda.appendChild(
        contenedorTarjetas
    );


    /*
    Agrega la nueva búsqueda al principio
    del historial.

    Así la búsqueda más reciente aparece arriba.
    */
    listaResultados.prepend(
        grupoBusqueda
    );


    /*
    Mostrar la cantidad total de búsquedas
    almacenadas en el historial.
    */
    const cantidadBusquedas =
        listaResultados.querySelectorAll(
            ".grupo-busqueda"
        ).length;

    informacionResultados.textContent =
        `${cantidadBusquedas} búsqueda` +
        `${cantidadBusquedas === 1 ? "" : "s"} ` +
        `guardada${cantidadBusquedas === 1 ? "" : "s"} en el historial.`;


    desplazarAResultados();

}


    /* ==========================================
             ABRIR RESULTADO
    ========================================== */

    function abrirResultado(resultado) {

        /*
        Si el resultado es una categoría,
        abre su página HTML.
        */
        if (
            resultado.tipo === "Categoría" &&
            resultado.url
        ) {

            window.location.href =
                resultado.url;

            return;

        }


        /*
        Si es una sección, desplaza la página.
        */
        if (resultado.destino) {

            irASeccion(
                resultado.destino
            );

        }

    }


    /* ==========================================
          IR A UNA SECCIÓN
    ========================================== */

    function irASeccion(idSeccion) {

        const seccion =
            document.getElementById(idSeccion);


        /*
        Si la sección no existe en la página actual,
        regresa al index.
        */
        if (!seccion) {

            window.location.href =
                `index.html#${idSeccion}`;

            return;

        }


        seccion.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        /*
        Agrega una animación temporal
        a la sección encontrada.
        */
        seccion.classList.add(
            "seccion-encontrada"
        );


        setTimeout(
            function () {

                seccion.classList.remove(
                    "seccion-encontrada"
                );

            },
            1800
        );

    }


    /* ==========================================
        IR A RESULTADOS DE BÚSQUEDA
    ========================================== */

    function desplazarAResultados() {

        if (!seccionResultados) {
            return;
        }

        seccionResultados.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    /* ==========================================
                EVENTOS
    ========================================== */


    /*
    Muestra sugerencias mientras el usuario
    escribe.
    */
    campoBusqueda.addEventListener(
        "input",
        mostrarSugerencias
    );


    /*
    Ejecuta la búsqueda al presionar el botón
    o la tecla Enter.
    */
    formularioBusqueda.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();

            const termino =
                campoBusqueda.value.trim();

            ocultarSugerencias();


            if (termino === "") {

                campoBusqueda.focus();
                return;

            }


            const resultados =
                filtrarResultados(termino);

            mostrarResultados(
                termino,
                resultados
            );

        }
    );


    /*
    Limpia los resultados.
    */
    if (botonLimpiar) {

        botonLimpiar.addEventListener(
            "click",
            function () {

                campoBusqueda.value = "";

                if (listaResultados) {

                    listaResultados.innerHTML = "";

                }

                if (informacionResultados) {

                    informacionResultados.textContent =
                        "Busca productos o secciones de Aradu Pet.";

                }

                if (seccionResultados) {

                    seccionResultados.classList.remove(
                        "mostrar"
                    );

                }

                ocultarSugerencias();

                campoBusqueda.focus();

            }
        );

    }


    /*
    Cierra las sugerencias al hacer clic
    fuera del buscador.
    */
    document.addEventListener(
        "click",
        function (evento) {

            const clicDentroBuscador =
                formularioBusqueda.contains(
                    evento.target
                ) ||
                sugerenciasBusqueda.contains(
                    evento.target
                );

            if (!clicDentroBuscador) {

                ocultarSugerencias();

            }

        }
    );


    /*
    Cierra las sugerencias con Escape.
    */
    campoBusqueda.addEventListener(
        "keydown",
        function (evento) {

            if (evento.key === "Escape") {

                ocultarSugerencias();
                campoBusqueda.blur();

            }

        }
    );

}

/* ==========================================
             FIN BUSCADOR ARADU PET
========================================== */