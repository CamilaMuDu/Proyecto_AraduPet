/* ============================
     CARRUSEL DE CATEGORÍAS
============================ */
console.log("logica.js está conectado correctamente");
document.addEventListener("DOMContentLoaded", function () {

    const listaCategorias = document.getElementById("listaCategorias");
    const botonAnterior = document.getElementById("categoriaAnterior");
    const botonSiguiente = document.getElementById("categoriaSiguiente");

    if (!listaCategorias || !botonAnterior || !botonSiguiente) {
        console.error("No se encontraron los elementos del carrusel.");
        return;
    }

    /*
    Obtiene el ancho de una tarjeta más el espacio
    que existe entre las tarjetas.
    */
    function obtenerDesplazamiento() {

        const tarjeta = listaCategorias.querySelector(".categoria-card");

        if (!tarjeta) {
            return 0;
        }

        const estilosLista = window.getComputedStyle(listaCategorias);
        const espacio = parseFloat(estilosLista.columnGap) || 0;

        return tarjeta.getBoundingClientRect().width + espacio;
    }

    /*
    Activa o desactiva las flechas dependiendo
    de la posición actual del carrusel.
    */
    function actualizarFlechas() {

        const posicionActual = listaCategorias.scrollLeft;
        const desplazamientoMaximo =
            listaCategorias.scrollWidth - listaCategorias.clientWidth;

        botonAnterior.disabled = posicionActual <= 1;

        botonSiguiente.disabled =
            posicionActual >= desplazamientoMaximo - 1;
    }

    botonSiguiente.addEventListener("click", function () {

        const desplazamiento = obtenerDesplazamiento();

        listaCategorias.scrollBy({
            left: desplazamiento,
            behavior: "smooth"
        });
    });

    botonAnterior.addEventListener("click", function () {

        const desplazamiento = obtenerDesplazamiento();

        listaCategorias.scrollBy({
            left: -desplazamiento,
            behavior: "smooth"
        });
    });

    /*
    Actualiza los botones después de mover
    manualmente o mediante las flechas.
    */
    listaCategorias.addEventListener("scroll", function () {
        actualizarFlechas();
    });

    /*
    Recalcula las posiciones cuando cambia
    el tamaño de la pantalla.
    */
    window.addEventListener("resize", function () {
        actualizarFlechas();
    });

    actualizarFlechas();
});