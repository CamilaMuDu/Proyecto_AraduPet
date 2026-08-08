console.log("juguetes.js está conectado correctamente");


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
            "No se encontraron juguetes."
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
           DETECTAR TIPO DE JUGUETE
    ========================================== */

    function detectarTipoProducto(nombre) {


        const texto =
            normalizarTexto(nombre);



        /* ==============================
               MORDEDORES
        ============================== */

        if (
            texto.includes("mordedor")
        ) {

            return "mordedor";

        }



        /* ==============================
              JUGUETES CON CUERDA
        ============================== */

        if (
            texto.includes("cuerda")
        ) {

            return "cuerda";

        }



        /* ==============================
                 PELUCHES
        ============================== */

        if (
            texto.includes("peluche")
        ) {

            return "peluche";

        }



        /* ==============================
                RASCADORES
        ============================== */

        if (
            texto.includes("rascador")
        ) {

            return "rascador";

        }



        /* ==============================
              OTROS JUGUETES
        ============================== */

        return "otros";

    }



    /* ==========================================
            PREPARAR PRODUCTOS
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
              RECORRER PRODUCTOS
        ================================== */

        productos.forEach(
            function (producto) {


                /* ==============================
                     FILTRO MASCOTA
                ============================== */

                const coincideMascota =

                    mascotasSeleccionadas.length === 0 ||

                    mascotasSeleccionadas.includes(
                        producto.dataset.mascota
                    );



                /* ==============================
                       FILTRO TIPO
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



                /* ==============================
                   MOSTRAR / OCULTAR
                ============================== */

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
              ORDENAR JUGUETES
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
                   COLOCAR EN NUEVO ORDEN
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
                   DESMARCAR MASCOTAS
                ============================== */

                filtrosMascota.forEach(

                    function (filtro) {

                        filtro.checked =
                            false;

                    }

                );



                /* ==============================
                     DESMARCAR TIPOS
                ============================== */

                filtrosTipo.forEach(

                    function (filtro) {

                        filtro.checked =
                            false;

                    }

                );



                /* ==============================
                    RESTABLECER ORDEN
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
        CERRAR TOCANDO FONDO OSCURO
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


});