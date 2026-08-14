console.log("snacks.js está conectado correctamente");

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


    /* ==========================================
             ARREGLO DE PRODUCTOS
    ========================================== */

    let snacks = [];


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
           CREAR PRODUCTO DINÁMICAMENTE
    ========================================== */

    function crearTarjetaSnack(snack) {


        const mascotaTexto =

            snack.mascota === "gato"
                ? "Gato"
                : "Perro";


        const productoHTML = `

            <article
                class="producto-card"
                data-id="${snack.id}"
                data-mascota="${snack.mascota}"
                data-tipo="${snack.tipo}"
                data-nombre="${snack.nombre}"
            >

                <div class="producto-imagen-contenedor">

                    <img
                        src="${snack.imagen}"
                        alt="${snack.nombre}"
                        class="producto-imagen"
                    >

                </div>


                <div class="producto-informacion">


                    <span class="producto-etiqueta">

                        ${mascotaTexto}

                    </span>


                    <h2 class="producto-nombre">

                        ${snack.nombre}

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
                        ? " snack"
                        : " snacks"
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
           MOSTRAR PRODUCTOS
    ========================================== */

    function mostrarProductos() {


        /* ==================================
             FILTROS SELECCIONADOS
        ================================== */

        const mascotasSeleccionadas =

            obtenerValoresMarcados(
                filtrosMascota
            );


        const tiposSeleccionados =

            obtenerValoresMarcados(
                filtrosTipo
            );


        /* ==================================
                 FILTRAR SNACKS
        ================================== */

        let snacksFiltrados =

            snacks.filter(

                function (snack) {


                    const coincideMascota =

                        mascotasSeleccionadas.length === 0 ||

                        mascotasSeleccionadas.includes(
                            snack.mascota
                        );


                    const coincideTipo =

                        tiposSeleccionados.length === 0 ||

                        tiposSeleccionados.includes(
                            snack.tipo
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


        snacksFiltrados =
            [...snacksFiltrados];


        /* ==================================
                    A - Z
        ================================== */

        if (tipoOrden === "az") {


            snacksFiltrados.sort(

                function (snackA, snackB) {


                    return snackA.nombre.localeCompare(

                        snackB.nombre,

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


            snacksFiltrados.sort(

                function (snackA, snackB) {


                    return snackB.nombre.localeCompare(

                        snackA.nombre,

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


            snacksFiltrados.sort(

                function (snackA, snackB) {


                    return (

                        snackA.id -
                        snackB.id

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
            CREAR NUEVAS TARJETAS
        ================================== */

        snacksFiltrados.forEach(

            function (snack) {


                const productoHTML =

                    crearTarjetaSnack(
                        snack
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

            snacksFiltrados.length

        );

    }


    /* ==========================================
          CARGAR PRODUCTOS DESDE JSON
    ========================================== */

    function cargarSnacks() {


        fetch("json/snacks.json")


            .then(

                function (respuesta) {


                    if (!respuesta.ok) {


                        throw new Error(

                            "No se pudo cargar snacks.json"

                        );

                    }


                    return respuesta.json();

                }

            )


            .then(

                function (datos) {


                    snacks = datos;


                    console.log(

                        "Snacks cargados:",

                        snacks

                    );


                    mostrarProductos();

                }

            )


            .catch(

                function (error) {


                    console.error(

                        "Error al cargar los snacks:",

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

                            "No fue posible cargar los snacks.";

                    }

                }

            );

    }


    /* ==========================================
         EVENTOS FILTROS DE MASCOTA
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
           EVENTOS FILTROS DE TIPO
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
              ORDENAR PRODUCTOS
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


                /* LIMPIAR MASCOTAS */

                filtrosMascota.forEach(

                    function (filtro) {


                        filtro.checked =
                            false;

                    }

                );


                /* LIMPIAR TIPOS */

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

                "Hola, quisiera obtener información sobre el snack: "

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

    cargarSnacks();


});