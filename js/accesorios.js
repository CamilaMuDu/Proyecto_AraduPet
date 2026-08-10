console.log("accesorios.js está conectado correctamente");


document.addEventListener("DOMContentLoaded", function () {


    /* ==========================================
            OBTENER ELEMENTOS DEL HTML
    ========================================== */

    const productos =
        Array.from(
            document.querySelectorAll(".producto-card")
        );


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


    const abrirFiltros =
        document.getElementById("abrirFiltros");


    const cerrarFiltros =
        document.getElementById("cerrarFiltros");


    const panelFiltros =
        document.getElementById("panelFiltros");


    const fondoFiltros =
        document.getElementById("fondoFiltros");



    /* ==========================================
              VALIDAR CATÁLOGO
    ========================================== */

    if (
        productos.length === 0 ||
        !productosGrid
    ) {

        console.warn(
            "No se encontraron productos en el catálogo."
        );

        return;

    }



    /* ==========================================
             NORMALIZAR TEXTO
    ========================================== */

    function normalizarTexto(texto) {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

    }



    /* ==========================================
          DETECTAR TIPO DE PRODUCTO
    ========================================== */

    function detectarTipoProducto(nombre) {

        const texto =
            normalizarTexto(nombre);


        /*
        IMPORTANTE:
        Pechera y arnés se revisan antes
        que correa.

        Así por ejemplo:
        "Correa con pechera"

        queda dentro de:
        Pecheras y arneses
        */


        if (
            texto.includes("pechera") ||
            texto.includes("arnes")
        ) {

            return "pechera";

        }


        if (
            texto.includes("collar")
        ) {

            return "collar";

        }


        if (
            texto.includes("correa")
        ) {

            return "correa";

        }


        if (
            texto.includes("panuelo")
        ) {

            return "panuelo";

        }


        if (
            texto.includes("bozal")
        ) {

            return "bozal";

        }


        if (
            texto.includes("ropa") ||
            texto.includes("media")
        ) {

            return "ropa";

        }


        /*
        Llaveros, stickers, conos,
        y cualquier producto que no
        coincida con los anteriores.
        */

        return "otros";

    }



    /* ==========================================
           PREPARAR LOS PRODUCTOS
    ========================================== */

    productos.forEach(
        function (producto, indice) {


            /* ==================================
                 GUARDAR ORDEN ORIGINAL
            ================================== */

            producto.dataset.ordenOriginal =
                indice;



            /* ==================================
                        NOMBRE
            ================================== */

            const elementoNombre =
                producto.querySelector(
                    ".producto-nombre"
                );


            let nombreProducto = "";


            if (elementoNombre) {

                nombreProducto =
                    elementoNombre
                        .textContent
                        .trim();

            }


            producto.dataset.nombre =
                nombreProducto;



            /* ==================================
                         TIPO
            ================================== */

            producto.dataset.tipo =
                detectarTipoProducto(
                    nombreProducto
                );



            /* ==================================
                        MASCOTA
            ================================== */

            const etiquetaMascota =
                producto.querySelector(
                    ".producto-etiqueta"
                );


            if (etiquetaMascota) {


                const mascota =
                    normalizarTexto(
                        etiquetaMascota.textContent
                    );


                if (
                    mascota === "perro" ||
                    mascota === "gato"
                ) {

                    producto.dataset.mascota =
                        mascota;

                }

            }


        }
    );



    /* ==========================================
          OBTENER CHECKBOX MARCADOS
    ========================================== */

    function obtenerValoresMarcados(
        elementos
    ) {


        return Array.from(elementos)

            .filter(
                function (elemento) {

                    return elemento.checked;

                }
            )

            .map(
                function (elemento) {

                    return elemento.value;

                }
            );

    }



    /* ==========================================
              APLICAR FILTROS
    ========================================== */

    function aplicarFiltros() {


        /* ==================================
                MASCOTAS MARCADAS
        ================================== */

        const mascotasSeleccionadas =
            obtenerValoresMarcados(
                filtrosMascota
            );



        /* ==================================
                 TIPOS MARCADOS
        ================================== */

        const tiposSeleccionados =
            obtenerValoresMarcados(
                filtrosTipo
            );



        let cantidadVisible = 0;



        /* ==================================
             RECORRER LOS PRODUCTOS
        ================================== */

        productos.forEach(
            function (producto) {


                /* ==============================
                     FILTRO DE MASCOTA
                ============================== */

                const coincideMascota =

                    mascotasSeleccionadas.length === 0 ||

                    mascotasSeleccionadas.includes(
                        producto.dataset.mascota
                    );



                /* ==============================
                       FILTRO DE TIPO
                ============================== */

                const coincideTipo =

                    tiposSeleccionados.length === 0 ||

                    tiposSeleccionados.includes(
                        producto.dataset.tipo
                    );



                /* ==============================
                       RESULTADO FINAL
                ============================== */

                const debeMostrarse =

                    coincideMascota &&
                    coincideTipo;



                /* ==================================
                    MOSTRAR / OCULTAR TARJETA
                ================================== */

                producto.classList.toggle(
                    "oculto",
                    !debeMostrarse
                );



                /* ==================================
                      CONTAR LOS VISIBLES
                ================================== */

                if (debeMostrarse) {

                    cantidadVisible++;

                }


            }
        );



        /* ==================================
               ACTUALIZAR CONTADOR
        ================================== */

        actualizarCantidad(
            cantidadVisible
        );


    }



    /* ==========================================
             ACTUALIZAR CONTADOR
    ========================================== */

    function actualizarCantidad(
        cantidad
    ) {


        if (cantidadProductos) {


            cantidadProductos.textContent =

                cantidad +

                (
                    cantidad === 1
                        ? " accesorio"
                        : " accesorios"
                );


        }



        /* ==================================
             MENSAJE SIN RESULTADOS
        ================================== */

        if (productosVacios) {


            productosVacios.style.display =

                cantidad === 0
                    ? "block"
                    : "none";


        }


    }



    /* ==========================================
        EVENTOS DE FILTRO DE MASCOTA
    ========================================== */

    filtrosMascota.forEach(
        function (filtro) {


            filtro.addEventListener(

                "change",

                function () {

                    aplicarFiltros();

                }

            );


        }
    );



    /* ==========================================
          EVENTOS DE FILTRO DE TIPO
    ========================================== */

    filtrosTipo.forEach(
        function (filtro) {


            filtro.addEventListener(

                "change",

                function () {

                    aplicarFiltros();

                }

            );


        }
    );



    /* ==========================================
             ORDENAR PRODUCTOS
    ========================================== */

    if (ordenarProductos) {


        ordenarProductos.addEventListener(

            "change",

            function () {


                const tipoOrden =
                    ordenarProductos.value;


                const productosOrdenados =
                    [...productos];



                /* ==================================
                         ORDEN A - Z
                ================================== */

                if (
                    tipoOrden === "az"
                ) {


                    productosOrdenados.sort(

                        function (
                            productoA,
                            productoB
                        ) {


                            return productoA
                                .dataset
                                .nombre
                                .localeCompare(

                                    productoB
                                        .dataset
                                        .nombre,

                                    "es",

                                    {
                                        sensitivity:
                                            "base"
                                    }

                                );


                        }

                    );


                }



                /* ==================================
                         ORDEN Z - A
                ================================== */

                else if (
                    tipoOrden === "za"
                ) {


                    productosOrdenados.sort(

                        function (
                            productoA,
                            productoB
                        ) {


                            return productoB
                                .dataset
                                .nombre
                                .localeCompare(

                                    productoA
                                        .dataset
                                        .nombre,

                                    "es",

                                    {
                                        sensitivity:
                                            "base"
                                    }

                                );


                        }

                    );


                }



                /* ==================================
                   ORDEN PREDETERMINADO
                ================================== */

                else {


                    productosOrdenados.sort(

                        function (
                            productoA,
                            productoB
                        ) {


                            return (

                                Number(
                                    productoA
                                        .dataset
                                        .ordenOriginal
                                )

                                -

                                Number(
                                    productoB
                                        .dataset
                                        .ordenOriginal
                                )

                            );


                        }

                    );


                }



                /* ==================================
                   INSERTAR EN NUEVO ORDEN
                ================================== */

                productosOrdenados.forEach(

                    function (producto) {


                        productosGrid.appendChild(
                            producto
                        );


                    }

                );


            }

        );


    }



    /* ==========================================
              LIMPIAR FILTROS
    ========================================== */

    if (limpiarFiltros) {


        limpiarFiltros.addEventListener(

            "click",

            function () {


                /* ==================================
                    DESMARCAR MASCOTAS
                ================================== */

                filtrosMascota.forEach(

                    function (filtro) {

                        filtro.checked =
                            false;

                    }

                );



                /* ==================================
                     DESMARCAR TIPOS
                ================================== */

                filtrosTipo.forEach(

                    function (filtro) {

                        filtro.checked =
                            false;

                    }

                );



                /* ==================================
                  RESTAURAR ORDEN ORIGINAL
                ================================== */

                if (ordenarProductos) {

                    ordenarProductos.value =
                        "original";

                }



                const productosOriginales =
                    [...productos].sort(

                        function (
                            productoA,
                            productoB
                        ) {


                            return (

                                Number(
                                    productoA
                                        .dataset
                                        .ordenOriginal
                                )

                                -

                                Number(
                                    productoB
                                        .dataset
                                        .ordenOriginal
                                )

                            );


                        }

                    );



                productosOriginales.forEach(

                    function (producto) {


                        productosGrid.appendChild(
                            producto
                        );


                    }

                );



                /* ==================================
                     MOSTRAR TODO OTRA VEZ
                ================================== */

                aplicarFiltros();


            }

        );


    }



    /* ==========================================
              ABRIR FILTROS
    ========================================== */

    function mostrarPanelFiltros() {


        if (panelFiltros) {


            panelFiltros.classList.add(
                "mostrar"
            );


        }



        if (fondoFiltros) {


            fondoFiltros.classList.add(
                "mostrar"
            );


        }



        /* Evita scroll del fondo */

        document.body.style.overflow =
            "hidden";


    }



    /* ==========================================
              CERRAR FILTROS
    ========================================== */

    function ocultarPanelFiltros() {


        if (panelFiltros) {


            panelFiltros.classList.remove(
                "mostrar"
            );


        }



        if (fondoFiltros) {


            fondoFiltros.classList.remove(
                "mostrar"
            );


        }



        document.body.style.overflow =
            "";


    }



    /* ==========================================
             BOTÓN ABRIR FILTROS
    ========================================== */

    if (abrirFiltros) {


        abrirFiltros.addEventListener(

            "click",

            mostrarPanelFiltros

        );


    }



    /* ==========================================
             BOTÓN CERRAR FILTROS
    ========================================== */

    if (cerrarFiltros) {


        cerrarFiltros.addEventListener(

            "click",

            ocultarPanelFiltros

        );


    }



    /* ==========================================
        CERRAR AL TOCAR FONDO OSCURO
    ========================================== */

    if (fondoFiltros) {


        fondoFiltros.addEventListener(

            "click",

            ocultarPanelFiltros

        );


    }



    /* ==========================================
          CERRAR CON TECLA ESCAPE
    ========================================== */

    document.addEventListener(

        "keydown",

        function (evento) {


            if (
                evento.key === "Escape"
            ) {


                ocultarPanelFiltros();


            }


        }

    );



    /* ==========================================
              CARGA INICIAL
    ========================================== */

    aplicarFiltros();



    /* =========================================
        CONSULTAR PRODUCTO POR WHATSAPP
========================================= */

    const botonesWhatsApp =
        document.querySelectorAll(".boton-whatsapp");

    botonesWhatsApp.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const tarjeta =
                boton.closest(".producto-card");

            const nombreProducto =
                tarjeta
                    .querySelector(".producto-nombre")
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
                + encodeURIComponent(mensaje);

            window.open(
                enlaceWhatsApp,
                "_blank"
            );

        });

    });

});