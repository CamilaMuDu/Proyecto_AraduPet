console.log("snacks.js está conectado correctamente");


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
            "No se encontraron snacks."
        );

        return;

    }

    function normalizarTexto(texto) {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

    }



    /* ==========================================
          DETECTAR TIPO DE SNACK
    ========================================== */

    function detectarTipoProducto(nombre) {


        const texto =
            normalizarTexto(nombre);



        /* ==============================
                DENTALES
        ============================== */

        if (
            texto.includes("dental") ||
            texto.includes("dentastix")
        ) {

            return "dental";

        }



        /* ==============================
             DESHIDRATADOS
        ============================== */

        if (
            texto.includes("deshidratad")
        ) {

            return "deshidratado";

        }



        /* ==============================
                 HUESOS
        ============================== */

        if (
            texto.includes("hueso") ||
            texto.includes("bone")
        ) {

            return "hueso";

        }



        /* ==============================
                GALLETAS
        ============================== */

        if (
            texto.includes("galleta")
        ) {

            return "galleta";

        }



        /* ==============================
            TREATS Y PREMIOS
        ============================== */

        if (
            texto.includes("treat") ||
            texto.includes("bites") ||
            texto.includes("bully") ||
            texto.includes("chicken fingers")
        ) {

            return "premio";

        }



        /* ==============================
             SNACKS DE CARNE
        ============================== */

        if (
            texto.includes("carne") ||
            texto.includes("pollo") ||
            texto.includes("cordero") ||
            texto.includes("cerdo") ||
            texto.includes("salmon") ||
            texto.includes("steak")
        ) {

            return "carne";

        }



        /* ==============================
                OTROS
        ============================== */

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


        const mascotasSeleccionadas =
            obtenerValoresMarcados(
                filtrosMascota
            );


        const tiposSeleccionados =
            obtenerValoresMarcados(
                filtrosTipo
            );


        let cantidadVisible = 0;



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



                producto.classList.toggle(
                    "oculto",
                    !debeMostrarse
                );



                if (debeMostrarse) {

                    cantidadVisible++;

                }


            }
        );



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
                        ? " snack"
                        : " snacks"
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
         EVENTOS FILTROS DE MASCOTA
    ========================================== */

    filtrosMascota.forEach(
        function (filtro) {


            filtro.addEventListener(

                "change",

                aplicarFiltros

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

                aplicarFiltros

            );


        }
    );



    /* ==========================================
              ORDENAR SNACKS
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
                          A - Z
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
                          Z - A
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
                     COLOCAR NUEVO ORDEN
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


                /* ==============================
                    LIMPIAR MASCOTAS
                ============================== */

                filtrosMascota.forEach(

                    function (filtro) {

                        filtro.checked =
                            false;

                    }

                );



                /* ==============================
                      LIMPIAR TIPOS
                ============================== */

                filtrosTipo.forEach(

                    function (filtro) {

                        filtro.checked =
                            false;

                    }

                );



                /* ==============================
                     RESTAURAR ORDEN
                ============================== */

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
            BOTÓN ABRIR
    ========================================== */

    if (abrirFiltros) {


        abrirFiltros.addEventListener(

            "click",

            mostrarPanelFiltros

        );


    }



    /* ==========================================
            BOTÓN CERRAR
    ========================================== */

    if (cerrarFiltros) {


        cerrarFiltros.addEventListener(

            "click",

            ocultarPanelFiltros

        );


    }



    /* ==========================================
          CLICK EN FONDO OSCURO
    ========================================== */

    if (fondoFiltros) {


        fondoFiltros.addEventListener(

            "click",

            ocultarPanelFiltros

        );


    }



    /* ==========================================
                TECLA ESCAPE
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
                "Hola, quisiera obtener información sobre el snack: "
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