console.log("accesorios.js está conectado correctamente");

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
             ARREGLO DE ACCESORIOS
    ========================================== */

    let accesorios = [];


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
          CREAR ACCESORIO DINÁMICAMENTE
    ========================================== */

    function crearTarjetaAccesorio(accesorio) {


        const mascotaTexto =

            accesorio.mascota === "gato"
                ? "Gato"
                : "Perro";


        const productoHTML = `

            <article
                class="producto-card"
                data-id="${accesorio.id}"
                data-mascota="${accesorio.mascota}"
                data-tipo="${accesorio.tipo}"
                data-nombre="${accesorio.nombre}"
            >

                <div class="producto-imagen-contenedor">

                    <img
                        src="${accesorio.imagen}"
                        alt="${accesorio.nombre}"
                        class="producto-imagen"
                    >

                </div>


                <div class="producto-informacion">


                    <span class="producto-etiqueta">

                        ${mascotaTexto}

                    </span>


                    <h2 class="producto-nombre">

                        ${accesorio.nombre}

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
                        ? " accesorio"
                        : " accesorios"
                );

        }


        if (productosVacios) {


            productosVacios.style.display =

                cantidad === 0
                    ? "block"
                    : "none";

        }

    }


    /* ==========================================
          MOSTRAR / FILTRAR ACCESORIOS
    ========================================== */

    function mostrarProductos() {


        const mascotasSeleccionadas =

            obtenerValoresMarcados(
                filtrosMascota
            );


        const tiposSeleccionados =

            obtenerValoresMarcados(
                filtrosTipo
            );


        /* ==================================
               FILTRAR ACCESORIOS
        ================================== */

        let accesoriosFiltrados =

            accesorios.filter(

                function (accesorio) {


                    const coincideMascota =

                        mascotasSeleccionadas.length === 0 ||

                        mascotasSeleccionadas.includes(
                            accesorio.mascota
                        );


                    const coincideTipo =

                        tiposSeleccionados.length === 0 ||

                        tiposSeleccionados.includes(
                            accesorio.tipo
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


        accesoriosFiltrados =
            [...accesoriosFiltrados];


        /* ==================================
                     A - Z
        ================================== */

        if (tipoOrden === "az") {


            accesoriosFiltrados.sort(

                function (accesorioA, accesorioB) {


                    return accesorioA.nombre.localeCompare(

                        accesorioB.nombre,

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


            accesoriosFiltrados.sort(

                function (accesorioA, accesorioB) {


                    return accesorioB.nombre.localeCompare(

                        accesorioA.nombre,

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


            accesoriosFiltrados.sort(

                function (accesorioA, accesorioB) {


                    return (

                        accesorioA.id -
                        accesorioB.id

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

        accesoriosFiltrados.forEach(

            function (accesorio) {


                const productoHTML =

                    crearTarjetaAccesorio(
                        accesorio
                    );


                productosVacios.insertAdjacentHTML(

                    "beforebegin",

                    productoHTML

                );

            }

        );


        actualizarCantidad(

            accesoriosFiltrados.length

        );

    }


    /* ==========================================
       CARGAR ACCESORIOS DESDE ARCHIVO JSON
    ========================================== */

    function cargarAccesorios() {


        fetch("json/accesorios.json")


            .then(

                function (respuesta) {


                    if (!respuesta.ok) {


                        throw new Error(

                            "No se pudo cargar accesorios.json"

                        );

                    }


                    return respuesta.json();

                }

            )


            .then(

                function (datos) {


                    accesorios = datos;


                    console.log(

                        "Accesorios cargados:",

                        accesorios

                    );


                    mostrarProductos();

                }

            )


            .catch(

                function (error) {


                    console.error(

                        "Error al cargar los accesorios:",

                        error

                    );


                    if (cantidadProductos) {


                        cantidadProductos.textContent =

                            "Error al cargar accesorios";

                    }


                    if (productosVacios) {


                        productosVacios.style.display =
                            "block";


                        productosVacios.innerHTML =

                            "<p>No fue posible cargar los accesorios.</p>";

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
            ORDENAR ACCESORIOS
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


                filtrosMascota.forEach(

                    function (filtro) {


                        filtro.checked =
                            false;

                    }

                );


                filtrosTipo.forEach(

                    function (filtro) {


                        filtro.checked =
                            false;

                    }

                );


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
          CONSULTAR PRODUCTO WHATSAPP
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

                "Hola, quisiera obtener información sobre el accesorio: "

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

    cargarAccesorios();


});