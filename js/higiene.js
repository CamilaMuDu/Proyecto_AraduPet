console.log("higiene.js está conectado correctamente");


document.addEventListener("DOMContentLoaded", function () {


    /* ==========================================
            OBTENER ELEMENTOS
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
            "No se encontraron productos."
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


        /* SHAMPOO */

        if (
            texto.includes("shampoo")
        ) {

            return "shampoo";

        }


        /* HIGIENE ORAL */

        if (
            texto.includes("dental") ||
            texto.includes("pasta")
        ) {

            return "oral";

        }


        /* CEPILLOS */

        if (
            texto.includes("cepillo")
        ) {

            return "cepillo";

        }


        /* TOALLAS, PADS Y PAÑALES */

        if (
            texto.includes("toalla") ||
            texto.includes("pad") ||
            texto.includes("panal")
        ) {

            return "limpieza";

        }


        /* UÑAS */

        if (
            texto.includes("una") ||
            texto.includes("cortador")
        ) {

            return "unas";

        }


        /* ARENEROS */

        if (
            texto.includes("arenero")
        ) {

            return "arenero";

        }


        /* COMEDEROS Y FUENTES */

        if (
            texto.includes("comedero") ||
            texto.includes("fuente")
        ) {

            return "alimentacion";

        }


        /* COLONIAS */

        if (
            texto.includes("colonia")
        ) {

            return "colonia";

        }


        /* OTROS */

        return "otros";

    }



    /* ==========================================
           PREPARAR PRODUCTOS
    ========================================== */

    productos.forEach(
        function (producto, indice) {


            /* ORDEN ORIGINAL */

            producto.dataset.ordenOriginal =
                indice;



            /* NOMBRE */

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



            /* TIPO */

            producto.dataset.tipo =
                detectarTipoProducto(
                    nombreProducto
                );



            /* MASCOTA */

            const etiquetaMascota =
                producto.querySelector(
                    ".producto-etiqueta"
                );


            if (etiquetaMascota) {


                const textoMascota =
                    normalizarTexto(
                        etiquetaMascota.textContent
                    );


                /*
                Si dice "Perro"
                */

                if (
                    textoMascota === "perro" ||
                    textoMascota === "perros"
                ) {

                    producto.dataset.mascota =
                        "perro";

                }



                /*
                Si dice "Gato"
                */

                else if (
                    textoMascota === "gato" ||
                    textoMascota === "gatos"
                ) {

                    producto.dataset.mascota =
                        "gato";

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


                /* MASCOTA */

                const coincideMascota =

                    mascotasSeleccionadas.length === 0 ||

                    mascotasSeleccionadas.includes(
                        producto.dataset.mascota
                    );



                /* TIPO */

                const coincideTipo =

                    tiposSeleccionados.length === 0 ||

                    tiposSeleccionados.includes(
                        producto.dataset.tipo
                    );



                /* RESULTADO */

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
                        ? " producto"
                        : " productos"
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
          FILTROS DE MASCOTA
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
             FILTROS DE TIPO
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



                /* A - Z */

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



                /* Z - A */

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



                /* ORDEN ORIGINAL */

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
              ABRIR PANEL
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
              CERRAR PANEL
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



    if (abrirFiltros) {

        abrirFiltros.addEventListener(
            "click",
            mostrarPanelFiltros
        );

    }



    if (cerrarFiltros) {

        cerrarFiltros.addEventListener(
            "click",
            ocultarPanelFiltros
        );

    }



    if (fondoFiltros) {

        fondoFiltros.addEventListener(
            "click",
            ocultarPanelFiltros
        );

    }



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


});