console.log("alimentos.js está conectado correctamente");


document.addEventListener("DOMContentLoaded", function () {


    /* ==========================================
            OBTENER ELEMENTOS DEL HTML
    ========================================== */


    const botonesMascota =
        document.querySelectorAll(".boton-mascota");


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



    /* ==========================================
                  FILTROS
    ========================================== */


    const filtrosMarca =
        document.querySelectorAll(".filtro-marca");



    const filtrosTipo =
        document.querySelectorAll(".filtro-tipo");



    const filtrosEtapa =
        document.querySelectorAll(".filtro-etapa");



    const filtrosRaza =
        document.querySelectorAll(".filtro-raza");



    const filtrosSabor =
        document.querySelectorAll(".filtro-sabor");



    /* ==========================================
              BOTONES DEL PANEL
    ========================================== */

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
            "No se encontraron alimentos."
        );

        return;

    }



    /* ==========================================
         MASCOTA SELECCIONADA INICIALMENTE
    ========================================== */


    let mascotaSeleccionada =
        "perro";



    /* ==========================================
              NORMALIZAR TEXTO
    ========================================== */

    function normalizarTexto(texto) {


        return (texto || "")

            .toLowerCase()

            .normalize("NFD")

            .replace(
                /[\u0300-\u036f]/g,
                ""
            )

            .trim();


    }



    /* ==========================================
          PREPARAR TODOS LOS PRODUCTOS
    ========================================== */

    productos.forEach(

        function (
            producto,
            indice
        ) {


            /* ==============================
                GUARDAR ORDEN ORIGINAL
            ============================== */

            producto.dataset.ordenOriginal =
                indice;



            /* ==============================
                    OBTENER NOMBRE
            ============================== */

            const elementoNombre =
                producto.querySelector(
                    ".producto-nombre"
                );


            const nombreProducto =
                elementoNombre
                    ? elementoNombre.textContent.trim()
                    : "";


            producto.dataset.nombre =
                nombreProducto;


        }

    );



    /* ==========================================
       OBTENER CHECKBOX SELECCIONADOS
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

                    return normalizarTexto(
                        elemento.value
                    );

                }

            );

    }



    /* ==========================================
         OBTENER VALORES DEL PRODUCTO
    ========================================== */

    function obtenerValoresProducto(
        producto,
        atributo
    ) {


        const valor =
            producto.dataset[atributo] || "";


        return normalizarTexto(valor)

            .split(/\s+/)

            .filter(

                function (valorIndividual) {

                    return (
                        valorIndividual !== ""
                    );

                }

            );


    }



    /* ==========================================
           COMPROBAR UN FILTRO
    ========================================== */

    function coincideFiltro(
        valoresSeleccionados,
        valoresProducto
    ) {



        if (
            valoresSeleccionados.length === 0
        ) {

            return true;

        }


        if (
            valoresProducto.length === 0
        ) {

            return false;

        }


        return valoresSeleccionados.some(

            function (valorSeleccionado) {


                return valoresProducto.includes(
                    valorSeleccionado
                );


            }

        );


    }



    /* ==========================================
             APLICAR FILTROS
    ========================================== */

    function aplicarFiltros() {


        /* ==============================
                MARCAS MARCADAS
        ============================== */

        const marcasSeleccionadas =
            obtenerValoresMarcados(
                filtrosMarca
            );



        /* ==============================
                 TIPOS MARCADOS
        ============================== */

        const tiposSeleccionados =
            obtenerValoresMarcados(
                filtrosTipo
            );



        /* ==============================
                ETAPAS MARCADAS
        ============================== */

        const etapasSeleccionadas =
            obtenerValoresMarcados(
                filtrosEtapa
            );



        /* ==============================
                 RAZAS MARCADAS
        ============================== */

        const razasSeleccionadas =
            obtenerValoresMarcados(
                filtrosRaza
            );



        /* ==============================
                SABORES MARCADOS
        ============================== */

        const saboresSeleccionados =
            obtenerValoresMarcados(
                filtrosSabor
            );



        let cantidadVisible =
            0;



        /* ==================================
             RECORRER LOS PRODUCTOS
        ================================== */

        productos.forEach(

            function (producto) {


                /* ==============================
                        MASCOTA
                ============================== */

                const mascotasProducto =
                    obtenerValoresProducto(
                        producto,
                        "mascota"
                    );


                const coincideMascota =
                    mascotasProducto.includes(
                        mascotaSeleccionada
                    );



                /* ==============================
                         MARCA
                ============================== */

                const marcasProducto =
                    obtenerValoresProducto(
                        producto,
                        "marca"
                    );


                const coincideMarca =
                    coincideFiltro(
                        marcasSeleccionadas,
                        marcasProducto
                    );



                /* ==============================
                    TIPO DE ALIMENTO
                ============================== */

                const tiposProducto =
                    obtenerValoresProducto(
                        producto,
                        "tipo"
                    );


                const coincideTipo =
                    coincideFiltro(
                        tiposSeleccionados,
                        tiposProducto
                    );



                /* ==============================
                          ETAPA
                ============================== */

                const etapasProducto =
                    obtenerValoresProducto(
                        producto,
                        "etapa"
                    );


                const coincideEtapa =
                    coincideFiltro(
                        etapasSeleccionadas,
                        etapasProducto
                    );



                /* ==============================
                     TAMAÑO / RAZA
                ============================== */

                const razasProducto =
                    obtenerValoresProducto(
                        producto,
                        "raza"
                    );


                const coincideRaza =
                    coincideFiltro(
                        razasSeleccionadas,
                        razasProducto
                    );



                /* ==============================
                          SABOR
                ============================== */

                const saboresProducto =
                    obtenerValoresProducto(
                        producto,
                        "sabor"
                    );


                const coincideSabor =
                    coincideFiltro(
                        saboresSeleccionados,
                        saboresProducto
                    );



                /* ==============================
                      RESULTADO FINAL
                ============================== */

                const debeMostrarse =

                    coincideMascota &&
                    coincideMarca &&
                    coincideTipo &&
                    coincideEtapa &&
                    coincideRaza &&
                    coincideSabor;



                /* ==============================
                    MOSTRAR / OCULTAR
                ============================== */

                producto.classList.toggle(
                    "oculto",
                    !debeMostrarse
                );



                /* ==============================
                    CONTAR PRODUCTOS
                ============================== */

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
         BOTONES SUPERIORES PERRO / GATO
    ========================================== */

    botonesMascota.forEach(

        function (boton) {


            boton.addEventListener(

                "click",

                function () {


                    mascotaSeleccionada =
                        normalizarTexto(
                            boton.dataset.filtro
                        );


                    botonesMascota.forEach(
                        function (
                            otroBoton
                        ) {
                            otroBoton.classList.remove(
                                "activo"
                            );
                        }
                    );

                    boton.classList.add(
                        "activo"
                    );

                    aplicarFiltros();

                }
            );
        }
    );



    /* ==========================================
             TODOS LOS CHECKBOX
    ========================================== */

    const todosLosFiltros = [

        ...filtrosMarca,
        ...filtrosTipo,
        ...filtrosEtapa,
        ...filtrosRaza,
        ...filtrosSabor

    ];



    /* ==========================================
        EVENTOS DE TODOS LOS CHECKBOX
    ========================================== */

    todosLosFiltros.forEach(

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



                /* ==============================
                         ORDEN A - Z
                ============================== */

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



                /* ==============================
                         ORDEN Z - A
                ============================== */

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



                /* ==============================
                    ORDEN PREDETERMINADO
                ============================== */

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



                /* ==============================
                     REORDENAR EL GRID
                ============================== */

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
                  DESMARCAR CHECKBOX
                ============================== */

                todosLosFiltros.forEach(

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



                /* ==============================
                  RECUPERAR ORDEN ORIGINAL
                ============================== */

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



    /* ==========================================
             BOTÓN FILTROS
    ========================================== */

    if (abrirFiltros) {


        abrirFiltros.addEventListener(

            "click",

            mostrarPanelFiltros

        );


    }



    /* ==========================================
                 BOTÓN X
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
                "Hola, quisiera obtener información sobre el producto: "
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