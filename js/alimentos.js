console.log("alimentos.js está conectado correctamente");


document.addEventListener("DOMContentLoaded", function () {


    /* ==========================================
            OBTENER ELEMENTOS DEL HTML
    ========================================== */


    /* Botones superiores Perro / Gato */

    const botonesMascota =
        document.querySelectorAll(".boton-mascota");



    /* Todos los productos */

    const productos =
        Array.from(
            document.querySelectorAll(".producto-card")
        );



    /* Grid */

    const productosGrid =
        document.getElementById("productosGrid");



    /* Contador */

    const cantidadProductos =
        document.getElementById("cantidadProductos");



    /* Mensaje sin resultados */

    const productosVacios =
        document.getElementById("productosVacios");



    /* Ordenar */

    const ordenarProductos =
        document.getElementById("ordenarProductos");



    /* ==========================================
                  FILTROS
    ========================================== */


    /* Marca */

    const filtrosMarca =
        document.querySelectorAll(".filtro-marca");



    /* Tipo de alimento */

    const filtrosTipo =
        document.querySelectorAll(".filtro-tipo");



    /* Etapa */

    const filtrosEtapa =
        document.querySelectorAll(".filtro-etapa");



    /* Raza / tamaño */

    const filtrosRaza =
        document.querySelectorAll(".filtro-raza");



    /* Sabor */

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

    /*
    Al abrir la página se muestran
    solamente los alimentos para perro.
    */

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



            /*
            Guardamos automáticamente
            el nombre.

            Así no necesitas poner
            data-nombre manualmente.
            */

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


        /*
        Ejemplo:

        data-raza="pequena mediana grande"

        Se convierte en:

        [
            "pequena",
            "mediana",
            "grande"
        ]
        */


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


        /*
        Si no seleccionamos nada en
        este grupo, cualquier producto
        puede pasar.
        */

        if (
            valoresSeleccionados.length === 0
        ) {

            return true;

        }



        /*
        Si seleccionamos un filtro,
        pero el producto no tiene ese
        data correspondiente,
        el producto no coincide.
        */

        if (
            valoresProducto.length === 0
        ) {

            return false;

        }



        /*
        Si seleccionamos varias opciones
        del mismo grupo, basta con que
        coincida una.

        Ejemplo:

        Pollo O Cordero
        */

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



        /* Actualizar contador */

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


                    /* ==========================
                      CAMBIAR MASCOTA
                    ========================== */

                    mascotaSeleccionada =
                        normalizarTexto(
                            boton.dataset.filtro
                        );



                    /* ==========================
                      QUITAR ACTIVO
                    ========================== */

                    botonesMascota.forEach(

                        function (
                            otroBoton
                        ) {


                            otroBoton.classList.remove(
                                "activo"
                            );


                        }

                    );



                    /* ==========================
                       ACTIVAR SELECCIONADO
                    ========================== */

                    boton.classList.add(
                        "activo"
                    );



                    /* ==========================
                        VOLVER A FILTRAR
                    ========================== */

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



                /*
                IMPORTANTE:

                Limpiar filtros NO cambia
                Perro/Gato.

                Si estabas viendo Gato,
                seguirá mostrando Gato.

                Si estabas viendo Perro,
                seguirá mostrando Perro.
                */


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



        /* Evitar scroll del fondo */

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

    /*
    Como mascotaSeleccionada = "perro",
    al entrar solamente aparecen
    productos para perro.
    */

    aplicarFiltros();



    /* =========================================
        CONSULTAR PRODUCTO POR WHATSAPP
========================================= */

    const botonesWhatsApp =
        document.querySelectorAll(".boton-whatsapp");


    botonesWhatsApp.forEach(function (boton) {

        boton.addEventListener("click", function () {

            /* Buscar la tarjeta del producto */

            const tarjeta =
                boton.closest(".producto-card");


            /* Obtener el nombre del producto */

            const nombreProducto =
                tarjeta
                    .querySelector(".producto-nombre")
                    .textContent
                    .trim();


            /* Número de WhatsApp de Aradu Pet */

            const numeroWhatsApp =
                "50688043411";


            /* Crear el mensaje */

            const mensaje =
                "Hola, quisiera obtener información sobre el producto: "
                + nombreProducto;


            /* Crear dirección de WhatsApp */

            const enlaceWhatsApp =
                "https://wa.me/"
                + numeroWhatsApp
                + "?text="
                + encodeURIComponent(mensaje);


            /* Abrir WhatsApp */

            window.open(
                enlaceWhatsApp,
                "_blank"
            );

        });

    });


});