console.log("higiene.js está conectado correctamente");

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

    let productosHigiene = [];


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

    function crearTarjetaProducto(producto) {


        const mascotaTexto =

            producto.mascota === "gato"
                ? "Gato"
                : "Perro";


        const productoHTML = `

            <article
                class="producto-card"
                data-id="${producto.id}"
                data-mascota="${producto.mascota}"
                data-tipo="${producto.tipo}"
                data-nombre="${producto.nombre}"
            >

                <div class="producto-imagen-contenedor">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                        class="producto-imagen"
                    >

                </div>


                <div class="producto-informacion">


                    <span class="producto-etiqueta">

                        ${mascotaTexto}

                    </span>


                    <h2 class="producto-nombre">

                        ${producto.nombre}

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
                        ? " producto"
                        : " productos"
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
          MOSTRAR / FILTRAR PRODUCTOS
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
              FILTRAR PRODUCTOS
        ================================== */

        let productosFiltrados =

            productosHigiene.filter(

                function (producto) {


                    /* FILTRO MASCOTA */

                    const coincideMascota =

                        mascotasSeleccionadas.length === 0 ||

                        mascotasSeleccionadas.includes(
                            producto.mascota
                        );


                    /* FILTRO TIPO */

                    const coincideTipo =

                        tiposSeleccionados.length === 0 ||

                        tiposSeleccionados.includes(
                            producto.tipo
                        );


                    return (

                        coincideMascota &&
                        coincideTipo

                    );

                }

            );


        /* ==================================
                    ORDENAMIENTO
        ================================== */

        const tipoOrden =

            ordenarProductos
                ? ordenarProductos.value
                : "original";


        productosFiltrados =
            [...productosFiltrados];


        /* ==================================
                     A - Z
        ================================== */

        if (tipoOrden === "az") {


            productosFiltrados.sort(

                function (productoA, productoB) {


                    return productoA.nombre.localeCompare(

                        productoB.nombre,

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


            productosFiltrados.sort(

                function (productoA, productoB) {


                    return productoB.nombre.localeCompare(

                        productoA.nombre,

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


            productosFiltrados.sort(

                function (productoA, productoB) {


                    return (

                        productoA.id -
                        productoB.id

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
            CREAR PRODUCTOS DESDE JSON
        ================================== */

        productosFiltrados.forEach(

            function (producto) {


                const productoHTML =

                    crearTarjetaProducto(
                        producto
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

            productosFiltrados.length

        );

    }


    /* ==========================================
       CARGAR PRODUCTOS DESDE HIGIENE.JSON
    ========================================== */

    function cargarProductosHigiene() {


        fetch("json/higiene.json")


            .then(

                function (respuesta) {


                    if (!respuesta.ok) {


                        throw new Error(

                            "No se pudo cargar higiene.json"

                        );

                    }


                    return respuesta.json();

                }

            )


            .then(

                function (datos) {


                    productosHigiene = datos;


                    console.log(

                        "Productos de higiene cargados:",

                        productosHigiene

                    );


                    mostrarProductos();

                }

            )


            .catch(

                function (error) {


                    console.error(

                        "Error al cargar los productos:",

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

                            "No fue posible cargar los productos de higiene.";

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

                "Hola, quisiera obtener información sobre el producto: "

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

    cargarProductosHigiene();

});