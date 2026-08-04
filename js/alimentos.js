console.log("alimentos.js está conectado correctamente");

document.addEventListener("DOMContentLoaded", function () {

    const botonesMascota =
        document.querySelectorAll(".boton-mascota");

    const productos =
        Array.from(
            document.querySelectorAll(".producto-card")
        );

    const cantidadProductos =
        document.getElementById("cantidadProductos");

    const productosVacios =
        document.getElementById("productosVacios");

    const ordenarProductos =
        document.getElementById("ordenarProductos");

    const productosGrid =
        document.getElementById("productosGrid");

    const filtrosMarca =
        document.querySelectorAll(".filtro-marca");

    const filtrosEtapa =
        document.querySelectorAll(".filtro-etapa");

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


    if (
        productos.length === 0 ||
        !productosGrid
    ) {
        return;
    }


    /*
    Los productos para perro se muestran
    al abrir la página.
    */
    let mascotaSeleccionada = "perro";


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
            APLICAR FILTROS
    ========================================== */

    function aplicarFiltros() {

        const marcasSeleccionadas =
            obtenerValoresMarcados(filtrosMarca);

        const etapasSeleccionadas =
            obtenerValoresMarcados(filtrosEtapa);

        let cantidadVisible = 0;


        productos.forEach(function (producto) {

            const coincideMascota =
                producto.dataset.mascota ===
                mascotaSeleccionada;

            const coincideMarca =
                marcasSeleccionadas.length === 0 ||
                marcasSeleccionadas.includes(
                    producto.dataset.marca
                );

            const coincideEtapa =
                etapasSeleccionadas.length === 0 ||
                etapasSeleccionadas.includes(
                    producto.dataset.etapa
                );


            const debeMostrarse =
                coincideMascota &&
                coincideMarca &&
                coincideEtapa;


            producto.classList.toggle(
                "oculto",
                !debeMostrarse
            );


            if (debeMostrarse) {
                cantidadVisible++;
            }

        });


        actualizarCantidad(cantidadVisible);

    }


    /* ==========================================
       ACTUALIZAR CANTIDAD DE PRODUCTOS
    ========================================== */

    function actualizarCantidad(cantidad) {

        if (cantidadProductos) {

            cantidadProductos.textContent =
                `${cantidad} producto` +
                `${cantidad === 1 ? "" : "s"}`;

        }

        if (productosVacios) {

            productosVacios.style.display =
                cantidad === 0
                    ? "block"
                    : "none";

        }

    }


    /* ==========================================
            PERRO Y GATO
    ========================================== */

    botonesMascota.forEach(function (boton) {

        boton.addEventListener(
            "click",
            function () {

                mascotaSeleccionada =
                    boton.dataset.filtro;

                botonesMascota.forEach(
                    function (otroBoton) {

                        otroBoton.classList.remove(
                            "activo"
                        );

                    }
                );

                boton.classList.add("activo");

                aplicarFiltros();

            }
        );

    });


    /* ==========================================
          CHECKBOX DE FILTROS
    ========================================== */

    [
        ...filtrosMarca,
        ...filtrosEtapa,
    ].forEach(function (filtro) {

        filtro.addEventListener(
            "change",
            aplicarFiltros
        );

    });


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


                if (tipoOrden === "az") {

                    productosOrdenados.sort(
                        function (productoA, productoB) {

                            return productoA.dataset.nombre
                                .localeCompare(
                                    productoB.dataset.nombre,
                                    "es"
                                );

                        }
                    );

                }


                if (tipoOrden === "za") {

                    productosOrdenados.sort(
                        function (productoA, productoB) {

                            return productoB.dataset.nombre
                                .localeCompare(
                                    productoA.dataset.nombre,
                                    "es"
                                );

                        }
                    );

                }


                if (tipoOrden === "original") {

                    productosOrdenados.sort(
                        function (productoA, productoB) {

                            return (
                                productos.indexOf(productoA) -
                                productos.indexOf(productoB)
                            );

                        }
                    );

                }


                productosOrdenados.forEach(
                    function (producto) {

                        productosGrid.appendChild(producto);

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

                [
                    ...filtrosMarca,
                    ...filtrosEtapa,
                ].forEach(function (filtro) {

                    filtro.checked = false;

                });

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

        document.body.style.overflow = "";

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

            if (evento.key === "Escape") {

                ocultarPanelFiltros();

            }

        }
    );


    /*
    Aplicar el filtro inicial para mostrar
    solamente alimentos para perro.
    */
    aplicarFiltros();

});