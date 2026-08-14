console.log("alimentos.js está conectado correctamente");

document.addEventListener("DOMContentLoaded", function () {


    /* ==========================================
            OBTENER ELEMENTOS DEL HTML
    ========================================== */

    const botonesMascota =
        document.querySelectorAll(".boton-mascota");

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

    const limpiarFiltros =
        document.getElementById("limpiarFiltros");


    /* ==========================================
             ARREGLO DE ALIMENTOS
    ========================================== */

    let alimentos = [];


    /* ==========================================
          MASCOTA SELECCIONADA INICIAL
    ========================================== */

    let mascotaSeleccionada = "perro";


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
         OBTENER CHECKBOX SELECCIONADOS
    ========================================== */

    function obtenerValoresMarcados(elementos) {

        return Array.from(elementos)

            .filter(function (elemento) {

                return elemento.checked;

            })

            .map(function (elemento) {

                return normalizarTexto(
                    elemento.value
                );

            });

    }


    /* ==========================================
       OBTENER VARIOS VALORES DEL PRODUCTO
    ========================================== */

    function obtenerValoresProducto(valor) {

        return normalizarTexto(valor)

            .split(/\s+/)

            .filter(function (valorIndividual) {

                return valorIndividual !== "";

            });

    }


    /* ==========================================
              COMPROBAR FILTRO
    ========================================== */

    function coincideFiltro(
        valoresSeleccionados,
        valoresProducto
    ) {

        if (valoresSeleccionados.length === 0) {

            return true;

        }


        if (valoresProducto.length === 0) {

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
          CREAR TARJETA DINÁMICAMENTE
    ========================================== */

    function crearTarjetaAlimento(alimento) {


        const mascotaTexto =

            alimento.mascota === "gato"
                ? "Gato"
                : "Perro";


        const productoHTML = `

            <article
                class="producto-card"

                data-id="${alimento.id}"

                data-mascota="${alimento.mascota}"

                data-marca="${alimento.marca}"

                data-tipo="${alimento.tipo}"

                data-etapa="${alimento.etapa}"

                data-raza="${alimento.raza}"

                data-sabor="${alimento.sabor}"
            >


                <div class="producto-imagen-contenedor">


                    <img
                        src="${alimento.imagen}"

                        alt="${alimento.nombre}"

                        class="producto-imagen"
                    >


                </div>


                <div class="producto-informacion">


                    <span class="producto-etiqueta">

                        ${mascotaTexto}

                    </span>


                    <h2 class="producto-nombre">

                        ${alimento.nombre}

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


        if (productosVacios) {


            productosVacios.style.display =

                cantidad === 0
                    ? "block"
                    : "none";

        }

    }


    /* ==========================================
         FILTRAR Y MOSTRAR LOS ALIMENTOS
    ========================================== */

    function mostrarProductos() {


        /* ==================================
                  MARCAS MARCADAS
        ================================== */

        const marcasSeleccionadas =

            obtenerValoresMarcados(
                filtrosMarca
            );


        /* ==================================
                   TIPOS MARCADOS
        ================================== */

        const tiposSeleccionados =

            obtenerValoresMarcados(
                filtrosTipo
            );


        /* ==================================
                  ETAPAS MARCADAS
        ================================== */

        const etapasSeleccionadas =

            obtenerValoresMarcados(
                filtrosEtapa
            );


        /* ==================================
                   RAZAS MARCADAS
        ================================== */

        const razasSeleccionadas =

            obtenerValoresMarcados(
                filtrosRaza
            );


        /* ==================================
                 SABORES MARCADOS
        ================================== */

        const saboresSeleccionados =

            obtenerValoresMarcados(
                filtrosSabor
            );


        /* ==================================
                FILTRAR ALIMENTOS
        ================================== */

        let alimentosFiltrados =

            alimentos.filter(

                function (alimento) {


                    /* MASCOTA */

                    const coincideMascota =

                        normalizarTexto(
                            alimento.mascota
                        )

                        === mascotaSeleccionada;


                    /* MARCA */

                    const coincideMarca =

                        coincideFiltro(

                            marcasSeleccionadas,

                            obtenerValoresProducto(
                                alimento.marca
                            )

                        );


                    /* TIPO */

                    const coincideTipo =

                        coincideFiltro(

                            tiposSeleccionados,

                            obtenerValoresProducto(
                                alimento.tipo
                            )

                        );


                    /* ETAPA */

                    const coincideEtapa =

                        coincideFiltro(

                            etapasSeleccionadas,

                            obtenerValoresProducto(
                                alimento.etapa
                            )

                        );


                    /* RAZA */

                    const coincideRaza =

                        coincideFiltro(

                            razasSeleccionadas,

                            obtenerValoresProducto(
                                alimento.raza
                            )

                        );


                    /* SABOR */

                    const coincideSabor =

                        coincideFiltro(

                            saboresSeleccionados,

                            obtenerValoresProducto(
                                alimento.sabor
                            )

                        );


                    return (

                        coincideMascota &&

                        coincideMarca &&

                        coincideTipo &&

                        coincideEtapa &&

                        coincideRaza &&

                        coincideSabor

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


        alimentosFiltrados =
            [...alimentosFiltrados];


        /* ==================================
                      A - Z
        ================================== */

        if (tipoOrden === "az") {


            alimentosFiltrados.sort(

                function (alimentoA, alimentoB) {


                    return alimentoA.nombre.localeCompare(

                        alimentoB.nombre,

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


            alimentosFiltrados.sort(

                function (alimentoA, alimentoB) {


                    return alimentoB.nombre.localeCompare(

                        alimentoA.nombre,

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


            alimentosFiltrados.sort(

                function (alimentoA, alimentoB) {


                    return (

                        alimentoA.id -
                        alimentoB.id

                    );

                }

            );

        }


        /* ==================================
          ELIMINAR PRODUCTOS ANTERIORES
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
          CREAR PRODUCTOS DESDE EL JSON
        ================================== */

        alimentosFiltrados.forEach(

            function (alimento) {


                const productoHTML =

                    crearTarjetaAlimento(
                        alimento
                    );


                productosVacios.insertAdjacentHTML(

                    "beforebegin",

                    productoHTML

                );

            }

        );


        actualizarCantidad(

            alimentosFiltrados.length

        );

    }


    /* ==========================================
        CARGAR ALIMENTOS DESDE EL JSON
    ========================================== */

    function cargarAlimentos() {


        fetch("json/alimentos.json")


            .then(

                function (respuesta) {


                    if (!respuesta.ok) {


                        throw new Error(

                            "No se pudo cargar alimentos.json"

                        );

                    }


                    return respuesta.json();

                }

            )


            .then(

                function (datos) {


                    alimentos = datos;


                    console.log(

                        "Alimentos cargados:",

                        alimentos

                    );


                    mostrarProductos();

                }

            )


            .catch(

                function (error) {


                    console.error(

                        "Error al cargar alimentos:",

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

                            "No fue posible cargar los alimentos.";

                    }

                }

            );

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

                        function (otroBoton) {


                            otroBoton.classList.remove(
                                "activo"
                            );

                        }

                    );


                    boton.classList.add(
                        "activo"
                    );


                    mostrarProductos();

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
          EVENTOS DE LOS CHECKBOX
    ========================================== */

    todosLosFiltros.forEach(

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


                todosLosFiltros.forEach(

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

    cargarAlimentos();

});