console.log("juguetes.js está conectado correctamente");

document.addEventListener("DOMContentLoaded", function () {


    /* ==========================================
            OBTENER ELEMENTOS DEL HTML
    ========================================== */

    const productosGrid =
        document.getElementById("productosGrid");

    const cantidadProductos =
        document.getElementById("cantidadProductos");

    const productosVacios =
        document.getElementById("productosVacios");

    const ordenarProductos =
        document.getElementById("ordenarProductos");

    const filtrosMascota =
        document.querySelectorAll(".filtro-mascota");

    const filtrosTipo =
        document.querySelectorAll(".filtro-tipo");

    const limpiarFiltros =
        document.getElementById("limpiarFiltros");

    const botonVolver =
        document.querySelector(
            ".boton-volver-flotante"
        );


    /* ==========================================
             ARREGLO DE JUGUETES
    ========================================== */

    let juguetes = [];


    /* ==========================================
         OBTENER CHECKBOX SELECCIONADOS
    ========================================== */

    function obtenerValoresMarcados(elementos) {

        return Array.from(elementos)

            .filter(function (elemento) {

                return elemento.checked;

            })

            .map(function (elemento) {

                return elemento.value;

            });

    }


    /* ==========================================
          CREAR JUGUETE DINÁMICAMENTE
    ========================================== */

    function crearTarjetaJuguete(juguete) {


        const mascotaTexto =

            juguete.mascota === "gato"
                ? "Gato"
                : "Perro";

        const productoHTML = `

            <article
                class="producto-card"
                data-id="${juguete.id}"
                data-mascota="${juguete.mascota}"
                data-tipo="${juguete.tipo}"
                data-nombre="${juguete.nombre}"
            >

                <div class="producto-imagen-contenedor">

                    <img
                        src="${juguete.imagen}"
                        alt="${juguete.nombre}"
                        class="producto-imagen"
                    >

                </div>


                <div class="producto-informacion">


                    <span class="producto-etiqueta">

                        ${mascotaTexto}

                    </span>


                    <h2 class="producto-nombre">

                        ${juguete.nombre}

                    </h2>


                    <button
                        type="button"
                        class="producto-boton boton-whatsapp"
                    >

                        Consultar producto

                    </button>


                </div>


            </article>

        `;
        return productoHTML;

    }


    /* ==========================================
            ACTUALIZAR CONTADOR
    ========================================== */

    function actualizarCantidad(cantidad) {


        if (cantidadProductos) {


            cantidadProductos.textContent =

                cantidad +

                (
                    cantidad === 1
                        ? " juguete"
                        : " juguetes"
                );

        }


        /* ==================================
               SIN RESULTADOS
        ================================== */

        if (productosVacios) {


            productosVacios.style.display =

                cantidad === 0
                    ? "block"
                    : "none";

        }

    }


    /* ==========================================
          MOSTRAR / FILTRAR JUGUETES
    ========================================== */

    function mostrarProductos() {


        /* ==================================
              MASCOTAS SELECCIONADAS
        ================================== */

        const mascotasSeleccionadas =

            obtenerValoresMarcados(
                filtrosMascota
            );


        /* ==================================
                TIPOS SELECCIONADOS
        ================================== */

        const tiposSeleccionados =

            obtenerValoresMarcados(
                filtrosTipo
            );


        /* ==================================
               FILTRAR JUGUETES
        ================================== */

        let juguetesFiltrados =

            juguetes.filter(

                function (juguete) {


                    /* FILTRO MASCOTA */

                    const coincideMascota =

                        mascotasSeleccionadas.length === 0 ||

                        mascotasSeleccionadas.includes(
                            juguete.mascota
                        );


                    /* FILTRO TIPO */

                    const coincideTipo =

                        tiposSeleccionados.length === 0 ||

                        tiposSeleccionados.includes(
                            juguete.tipo
                        );


                    return (

                        coincideMascota &&
                        coincideTipo

                    );

                }

            );


        /* ==================================
                    ORDENAR
        ================================== */

        const tipoOrden =

            ordenarProductos
                ? ordenarProductos.value
                : "original";


        juguetesFiltrados =
            [...juguetesFiltrados];


        /* ==================================
                     A - Z
        ================================== */

        if (tipoOrden === "az") {


            juguetesFiltrados.sort(

                function (jugueteA, jugueteB) {


                    return jugueteA.nombre.localeCompare(

                        jugueteB.nombre,

                        "es",

                        {
                            sensitivity: "base"
                        }

                    );

                }

            );

        }


        /* ==================================
                     Z - A
        ================================== */

        else if (tipoOrden === "za") {


            juguetesFiltrados.sort(

                function (jugueteA, jugueteB) {


                    return jugueteB.nombre.localeCompare(

                        jugueteA.nombre,

                        "es",

                        {
                            sensitivity: "base"
                        }

                    );

                }

            );

        }


        /* ==================================
              ORDEN PREDETERMINADO
        ================================== */

        else {


            juguetesFiltrados.sort(

                function (jugueteA, jugueteB) {


                    return (

                        jugueteA.id -
                        jugueteB.id

                    );

                }

            );

        }


        /* ==================================
           ELIMINAR TARJETAS ANTERIORES
        ================================== */

        productosGrid

            .querySelectorAll(
                ".producto-card"
            )

            .forEach(

                function (producto) {

                    producto.remove();

                }

            );


        /* ==================================
           CREAR TARJETAS DINÁMICAMENTE
        ================================== */

        juguetesFiltrados.forEach(

            function (juguete) {


                const productoHTML =

                    crearTarjetaJuguete(
                        juguete
                    );


                productosVacios.insertAdjacentHTML(

                    "beforebegin",

                    productoHTML

                );

            }

        );


        /* ==================================
               ACTUALIZAR CONTADOR
        ================================== */

        actualizarCantidad(

            juguetesFiltrados.length

        );

    }


    /* ==========================================
        CARGAR JUGUETES DESDE ARCHIVO JSON
    ========================================== */

    function cargarJuguetes() {


        fetch("json/juguetes.json")


            .then(

                function (respuesta) {


                    if (!respuesta.ok) {


                        throw new Error(

                            "No se pudo cargar juguetes.json"

                        );

                    }


                    return respuesta.json();

                }

            )


            .then(

                function (datos) {


                    juguetes = datos;


                    console.log(

                        "Juguetes cargados:",

                        juguetes

                    );


                    mostrarProductos();

                }

            )


            .catch(

                function (error) {


                    console.error(

                        "Error al cargar los juguetes:",

                        error

                    );


                    if (cantidadProductos) {


                        cantidadProductos.textContent =

                            "Error al cargar productos";

                    }


                    if (productosVacios) {


                        productosVacios.style.display =
                            "block";


                        productosVacios.textContent =

                            "No fue posible cargar los juguetes.";

                    }

                }

            );

    }


    /* ==========================================
            FILTROS DE MASCOTA
    ========================================== */

    filtrosMascota.forEach(

        function (filtro) {


            filtro.addEventListener(

                "change",

                mostrarProductos

            );

        }

    );


    /* ==========================================
              FILTROS DE TIPO
    ========================================== */

    filtrosTipo.forEach(

        function (filtro) {


            filtro.addEventListener(

                "change",

                mostrarProductos

            );

        }

    );


    /* ==========================================
              ORDENAR JUGUETES
    ========================================== */

    if (ordenarProductos) {


        ordenarProductos.addEventListener(

            "change",

            mostrarProductos

        );

    }


    /* ==========================================
              LIMPIAR FILTROS
    ========================================== */

    if (limpiarFiltros) {


        limpiarFiltros.addEventListener(

            "click",

            function () {


                /* DESMARCAR MASCOTAS */

                filtrosMascota.forEach(

                    function (filtro) {


                        filtro.checked =
                            false;

                    }

                );


                /* DESMARCAR TIPOS */

                filtrosTipo.forEach(

                    function (filtro) {


                        filtro.checked =
                            false;

                    }

                );


                /* RESTAURAR ORDEN */

                if (ordenarProductos) {


                    ordenarProductos.value =
                        "original";

                }


                mostrarProductos();

            }

        );

    }


   /* ==========================================
      ABRIR FILTROS - JQUERY
========================================== */

$("#abrirFiltros").on(

    "click",

    function () {

        $("#panelFiltros")
            .addClass("mostrar");

        $("#fondoFiltros")
            .addClass("mostrar");

        $("body")
            .css(
                "overflow",
                "hidden"
            );


        /* OCULTAR BOTÓN REGRESAR */

        if (botonVolver) {

            botonVolver.classList.add(
                "oculto-filtros"
            );

        }

    }

);


   /* ==========================================
      CERRAR FILTROS - JQUERY
========================================== */

$("#cerrarFiltros, #fondoFiltros").on(

    "click",

    function () {

        $("#panelFiltros")
            .removeClass("mostrar");

        $("#fondoFiltros")
            .removeClass("mostrar");

        $("body")
            .css(
                "overflow",
                ""
            );


        /* MOSTRAR BOTÓN REGRESAR */

        if (botonVolver) {

            botonVolver.classList.remove(
                "oculto-filtros"
            );

        }

    }

);

   /* ==========================================
         ESCAPE - JQUERY
========================================== */

$(document).on(

    "keydown",

    function (evento) {

        if (evento.key === "Escape") {

            $("#panelFiltros")
                .removeClass("mostrar");

            $("#fondoFiltros")
                .removeClass("mostrar");

            $("body")
                .css(
                    "overflow",
                    ""
                );


            /* MOSTRAR BOTÓN REGRESAR */

            if (botonVolver) {

                botonVolver.classList.remove(
                    "oculto-filtros"
                );

            }

        }

    }

);

    /* ==========================================
           CONSULTAR POR WHATSAPP
    ========================================== */

    productosGrid.addEventListener(

        "click",

        function (evento) {


            const boton =

                evento.target.closest(
                    ".boton-whatsapp"
                );


            if (!boton) {

                return;

            }


            const tarjeta =

                boton.closest(
                    ".producto-card"
                );


            const nombreProducto =

                tarjeta

                    .querySelector(
                        ".producto-nombre"
                    )

                    .textContent

                    .trim();


            const numeroWhatsApp =

                "50688043411";


            const mensaje =

                "Hola, quisiera obtener información sobre el juguete: "

                + nombreProducto;


            const enlaceWhatsApp =

                "https://wa.me/"

                + numeroWhatsApp

                + "?text="

                + encodeURIComponent(
                    mensaje
                );


            window.open(

                enlaceWhatsApp,

                "_blank"

            );

        }

    );


    /* ==========================================
                 CARGA INICIAL
    ========================================== */

    cargarJuguetes();

});