
console.log("logica.js está conectado correctamente");


document.addEventListener("DOMContentLoaded", function () {


    iniciarBuscador();
    iniciarFormularioRegistro();
    cargarContenidoIndex();

});



/* =========================================================
        BUSCADOR
========================================================= */

function iniciarBuscador() {

    const formularioBusqueda =
        document.getElementById(
            "formularioBusqueda"
        );


    const campoBusqueda =
        document.getElementById(
            "campoBusqueda"
        );


    const sugerenciasBusqueda =
        document.getElementById(
            "sugerenciasBusqueda"
        );


    /* =====================================================
            ELEMENTOS DEL HISTORIAL
    ===================================================== */

    const seccionResultados =
        document.getElementById(
            "resultadosBusqueda"
        );


    const listaResultados =
        document.getElementById(
            "listaResultados"
        );


    const informacionResultados =
        document.getElementById(
            "informacionResultados"
        );


    const botonLimpiar =
        document.getElementById(
            "limpiarBusqueda"
        );


    if (
        !formularioBusqueda ||
        !campoBusqueda ||
        !sugerenciasBusqueda
    ) {

        return;

    }


    let indiceSeleccionado = -1;

    let resultadosActuales = [];


    const CLAVE_HISTORIAL =
        "aradupet_busquedas_recientes";


    const LIMITE_HISTORIAL = 6;


    /* =====================================================
            SECCIONES DEL INDEX
    ===================================================== */

    const secciones = [

        {

            titulo:
                "Inicio",

            descripcion:
                "Página principal de Aradu Pet",

            palabras:
                "inicio principal portada carrusel comienzo home pagina página principal",

            destino:
                "carouselAraduPet",

            tipo:
                "Sección"

        },


        {

            titulo:
                "Historia",

            descripcion:
                "Conoce nuestro emprendimiento familiar",

            palabras:
                "historia emprendimiento familia veterinaria nosotros quienes somos origen negocio aradu pet",


            destino:
                "historia",

            tipo:
                "Sección"

        },


        {

            titulo:
                "Multimedia",

            descripcion:
                "Video y contenido de Aradu Pet",

            palabras:
                "multimedia video videos presentación presentacion promocion promoción publicidad contenido",

            destino:
                "multimedia",

            tipo:
                "Sección"

        },


        {

            titulo:
                "Ubicación",

            descripcion:
                "Dirección, mapa y horario de la tienda",

            palabras:
                "ubicacion ubicación direccion dirección mapa tienda horario alajuela villa bonita donde estamos local llegar ruta google maps",

            destino:
                "ubicacion",

            tipo:
                "Sección"

        },


        {

            titulo:
                "Acerca de",

            descripcion:
                "Información sobre Aradu Pet",

            palabras:
                "acerca nosotros informacion información valores servicios veterinaria quienes somos negocio aradu pet",

            destino:
                "acerca",

            tipo:
                "Sección"

        },

        {
            titulo:
                "Registro",

            descripcion:
                "Únete a la comunidad Aradu Pet",

            palabras:
                "registro registrarse registrar formulario comunidad unirse datos cliente clientes inscripcion inscripción suscripcion suscripción novedades correo información",

            destino:
                "registro",

            tipo:
                "Sección"
        },
        {

            titulo:
                "Contacto",

            descripcion:
                "Comunícate con Aradu Pet",

            palabras:
                "contacto contactanos contáctanos telefono teléfono correo instagram whatsapp redes sociales comunicar mensaje",

            destino:
                "footer",

            tipo:
                "Sección"

        }

    ];


    /* =====================================================
            CATEGORÍAS DE PRODUCTOS
    ===================================================== */

    const categorias = [

        {

            titulo:
                "Alimentos",

            descripcion:
                "Alimentos para perros y gatos",

            palabras:
                "alimentos alimento comida comidas concentrado concentrados nutricion nutrición perro perros gato gatos croquetas alimento seco alimento humedo alimento húmedo comida perro comida gato",

            url:
                "alimentos.html",

            tipo:
                "Categoría"

        },


        {

            titulo:
                "Accesorios",

            descripcion:
                "Accesorios para perros y gatos",

            palabras:
                "accesorios accesorio collar collares correa correas cama camas pechera pecheras plato platos comedero comederos bebedero bebederos perro perros gato gatos ropa transportadora",

            url:
                "accesorios.html",

            tipo:
                "Categoría"

        },


        {

            titulo:
                "Juguetes",

            descripcion:
                "Juguetes y entretenimiento para mascotas",

            palabras:
                "juguete juguetes jugar diversion diversión entretenimiento pelota pelotas mordedor mordedores cuerda cuerdas perro perros gato gatos diversión mascota",

            url:
                "juguetes.html",

            tipo:
                "Categoría"

        },


        {

            titulo:
                "Snacks",

            descripcion:
                "Premios y golosinas para mascotas",

            palabras:
                "snack snacks premio premios golosina golosinas bocadillo bocadillos galleta galletas hueso huesos recompensa recompensas perro perros gato gatos premios mascota",

            url:
                "snacks.html",

            tipo:
                "Categoría"

        },


        {

            titulo:
                "Higiene y Bienestar",

            descripcion:
                "Higiene, limpieza y bienestar",

            palabras:
                "higiene bienestar limpieza limpiar champu champú shampoo baño banar bañar cepillo cepillos cuidado cuidados dental dientes pelo pelaje perro perros gato gatos aseo mascota",

            url:
                "higiene.html",

            tipo:
                "Categoría"

        }

    ];


    function obtenerDatosBusqueda() {

        return [

            ...categorias,

            ...secciones

        ];

    }


    function normalizarTexto(texto) {

        return String(texto || "")

            .toLowerCase()

            .normalize("NFD")

            .replace(
                /[\u0300-\u036f]/g,
                ""
            )

            .trim();

    }


    /* =====================================================
            CALCULAR PUNTUACIÓN
    ===================================================== */

    function calcularPuntuacion(
        elemento,
        termino
    ) {

        const busqueda =
            normalizarTexto(
                termino
            );


        const titulo =
            normalizarTexto(
                elemento.titulo
            );


        const descripcion =
            normalizarTexto(
                elemento.descripcion
            );


        const palabras =
            normalizarTexto(
                elemento.palabras
            );


        let puntos = 0;


        if (
            titulo === busqueda
        ) {

            puntos += 1000;

        }



        if (
            titulo.startsWith(
                busqueda
            )
        ) {

            puntos += 300;

        }


        if (
            titulo.includes(
                busqueda
            )
        ) {

            puntos += 150;

        }


        /* =================================================
                PALABRAS CLAVE
        ================================================= */

        if (
            palabras.includes(
                busqueda
            )
        ) {

            puntos += 100;

        }


        if (
            descripcion.includes(
                busqueda
            )
        ) {

            puntos += 50;

        }


        /* =================================================
                REVISAR PALABRA POR PALABRA
        ================================================= */

        const palabrasBuscadas =
            busqueda.split(/\s+/);


        palabrasBuscadas.forEach(
            function (palabra) {

                if (
                    palabra.length < 2
                ) {

                    return;

                }


                if (
                    titulo === palabra
                ) {

                    puntos += 200;

                }


                if (
                    titulo.startsWith(
                        palabra
                    )
                ) {

                    puntos += 80;

                }


                if (
                    titulo.includes(
                        palabra
                    )
                ) {

                    puntos += 50;

                }


                if (
                    palabras.includes(
                        palabra
                    )
                ) {

                    puntos += 30;

                }


                if (
                    descripcion.includes(
                        palabra
                    )
                ) {

                    puntos += 15;

                }

            }
        );


        return puntos;

    }


    /* =====================================================
            FILTRAR Y ORDENAR RESULTADOS
    ===================================================== */

    function filtrarResultados(
        termino
    ) {

        const busqueda =
            normalizarTexto(
                termino
            );


        if (
            busqueda === ""
        ) {

            return [];

        }


        return obtenerDatosBusqueda()

            .map(
                function (elemento) {

                    return {

                        ...elemento,

                        puntuacion:
                            calcularPuntuacion(
                                elemento,
                                termino
                            )

                    };

                }
            )

            .filter(
                function (elemento) {

                    return (
                        elemento.puntuacion > 0
                    );

                }
            )

            .sort(
                function (a, b) {

                    return (
                        b.puntuacion -
                        a.puntuacion
                    );

                }
            );

    }


    /* =====================================================
            MOSTRAR SUGERENCIAS
    ===================================================== */

    function mostrarSugerencias() {

        const termino =
            campoBusqueda.value.trim();


        sugerenciasBusqueda.innerHTML =
            "";


        indiceSeleccionado =
            -1;


        if (
            termino === ""
        ) {

            resultadosActuales =
                [];


            ocultarSugerencias();


            return;

        }


        resultadosActuales =
            filtrarResultados(
                termino
            ).slice(
                0,
                6
            );


        sugerenciasBusqueda.style.display =
            "block";


        /* =================================================
                SIN RESULTADOS
        ================================================= */

        if (
            resultadosActuales.length === 0
        ) {

            sugerenciasBusqueda.innerHTML = `

                <p class="sugerencia-vacia">

                    No encontramos coincidencias.

                </p>

            `;


            return;

        }


        /* =================================================
                CREAR SUGERENCIAS
        ================================================= */

        resultadosActuales.forEach(
            function (
                resultado,
                indice
            ) {

                const boton =
                    document.createElement(
                        "button"
                    );


                boton.type =
                    "button";


                boton.className =
                    "sugerencia-item";


                boton.dataset.indice =
                    indice;


                /* =========================================
                        ICONO
                ========================================= */

                let icono =
                    "bi-search";


                if (
                    resultado.tipo ===
                    "Categoría"
                ) {

                    icono =
                        "bi-bag-heart";

                }


                if (
                    resultado.tipo ===
                    "Sección"
                ) {

                    icono =
                        "bi-arrow-down-circle";

                }


                boton.innerHTML = `

                    <span class="sugerencia-icono">

                        <i class="bi ${icono}"></i>

                    </span>


                    <span class="sugerencia-texto">

                        <span class="sugerencia-titulo">

                            ${resultado.titulo}

                        </span>


                        <span class="sugerencia-descripcion">

                            ${resultado.descripcion}

                        </span>

                    </span>


                    <i class="
                        bi
                        bi-chevron-right
                        sugerencia-flecha
                    "></i>

                `;


                /* =========================================
                        CLICK EN SUGERENCIA
                ========================================= */

                boton.addEventListener(
                    "click",
                    function () {

                        const terminoBuscado =
                            campoBusqueda.value.trim();


                        campoBusqueda.value =
                            resultado.titulo;


                        guardarBusquedaReciente(
                            terminoBuscado ||
                            resultado.titulo,
                            resultado
                        );


                        ocultarSugerencias();


                        abrirResultado(
                            resultado
                        );

                    }
                );


                /* =========================================
                        MOUSE ENCIMA
                ========================================= */

                boton.addEventListener(
                    "mouseenter",
                    function () {

                        indiceSeleccionado =
                            indice;


                        actualizarSeleccion();

                    }
                );


                sugerenciasBusqueda.appendChild(
                    boton
                );

            }
        );

    }


    /* =====================================================
            ACTUALIZAR SELECCIÓN
    ===================================================== */

    function actualizarSeleccion() {

        const sugerencias =
            sugerenciasBusqueda
                .querySelectorAll(
                    ".sugerencia-item"
                );


        sugerencias.forEach(
            function (
                sugerencia,
                indice
            ) {

                sugerencia.classList.toggle(

                    "activa",

                    indice ===
                    indiceSeleccionado

                );

            }
        );


        if (
            indiceSeleccionado >= 0 &&
            sugerencias[
            indiceSeleccionado
            ]
        ) {

            sugerencias[
                indiceSeleccionado
            ].scrollIntoView({

                block:
                    "nearest"

            });

        }

    }


    /* =====================================================
            OCULTAR SUGERENCIAS
    ===================================================== */

    function ocultarSugerencias() {

        sugerenciasBusqueda.style.display =
            "none";


        sugerenciasBusqueda.innerHTML =
            "";


        indiceSeleccionado =
            -1;

    }


    /* =====================================================
            OBTENER HISTORIAL
    ===================================================== */

    function obtenerHistorial() {

        const historialGuardado =
            localStorage.getItem(
                CLAVE_HISTORIAL
            );


        if (
            !historialGuardado
        ) {

            return [];

        }


        try {

            const historial =
                JSON.parse(
                    historialGuardado
                );


            return Array.isArray(
                historial
            )
                ? historial
                : [];


        } catch (error) {

            console.error(
                "No se pudo leer el historial:",
                error
            );


            return [];

        }

    }


    /* =====================================================
            GUARDAR HISTORIAL
    ===================================================== */

    function guardarHistorial(
        historial
    ) {

        try {

            localStorage.setItem(

                CLAVE_HISTORIAL,

                JSON.stringify(
                    historial
                )

            );


        } catch (error) {

            console.error(
                "No se pudo guardar el historial:",
                error
            );

        }

    }


    /* =====================================================
            GUARDAR UNA BÚSQUEDA
    ===================================================== */

    function guardarBusquedaReciente(
        termino,
        resultado
    ) {

        if (
            !resultado
        ) {

            return;

        }


        const terminoLimpio =
            String(
                termino ||
                resultado.titulo ||
                ""
            ).trim();


        if (
            terminoLimpio === ""
        ) {

            return;

        }


        let historial =
            obtenerHistorial();


        const claveNueva =
            resultado.url
                ? `url:${resultado.url}`
                : `destino:${resultado.destino}`;


        historial =
            historial.filter(
                function (busqueda) {

                    const claveAnterior =
                        busqueda.url
                            ? `url:${busqueda.url}`
                            : `destino:${busqueda.destino}`;


                    return (
                        claveAnterior !==
                        claveNueva
                    );

                }
            );


        historial.unshift({

            termino:
                terminoLimpio,

            titulo:
                resultado.titulo,

            tipo:
                resultado.tipo,

            url:
                resultado.url || "",

            destino:
                resultado.destino || ""

        });

        historial =
            historial.slice(
                0,
                LIMITE_HISTORIAL
            );


        guardarHistorial(
            historial
        );


        mostrarHistorial();

    }


    /* =====================================================
            MOSTRAR HISTORIAL
    ===================================================== */

    function mostrarHistorial() {

        if (
            !seccionResultados ||
            !listaResultados
        ) {

            return;

        }


        const historial =
            obtenerHistorial();


        listaResultados.innerHTML =
            "";


        /* =================================================
                SIN BÚSQUEDAS
        ================================================= */

        if (
            historial.length === 0
        ) {

            seccionResultados.classList.remove(
                "mostrar"
            );


            return;

        }

        seccionResultados.classList.add(
            "mostrar"
        );


        if (
            informacionResultados
        ) {

            if (
                historial.length === 1
            ) {

                informacionResultados.textContent =
                    "Tienes 1 búsqueda reciente.";

            } else {

                informacionResultados.textContent =
                    `Tienes ${historial.length} búsquedas recientes.`;

            }

        }


        /* =================================================
                CREAR BOTONES DEL HISTORIAL
        ================================================= */

        historial.forEach(
            function (busqueda) {

                const boton =
                    document.createElement(
                        "button"
                    );


                boton.type =
                    "button";


                boton.className =
                    "busqueda-reciente";


                let icono =
                    "bi-search";


                if (
                    busqueda.tipo ===
                    "Categoría"
                ) {

                    icono =
                        "bi-bag-heart";

                }


                if (
                    busqueda.tipo ===
                    "Sección"
                ) {

                    icono =
                        "bi-clock-history";

                }


                boton.innerHTML = `

                    <i class="bi ${icono}"></i>


                    <span class="busqueda-reciente-texto">

                        ${busqueda.termino}

                    </span>


                    <span class="busqueda-reciente-tipo">

                        ${busqueda.titulo}

                    </span>

                `;


                /* =========================================
                        VOLVER A LA BÚSQUEDA
                ========================================= */

                boton.addEventListener(
                    "click",
                    function () {

                        abrirResultado({

                            titulo:
                                busqueda.titulo,

                            tipo:
                                busqueda.tipo,

                            url:
                                busqueda.url,

                            destino:
                                busqueda.destino

                        });

                    }
                );


                listaResultados.appendChild(
                    boton
                );

            }
        );

    }


    /* =====================================================
            ABRIR RESULTADO
    ===================================================== */

    function abrirResultado(
        resultado
    ) {

        if (
            !resultado
        ) {

            return;

        }


        /* =================================================
                ABRIR PÁGINA DE CATEGORÍA
        ================================================= */

        if (
            resultado.tipo ===
            "Categoría" &&
            resultado.url
        ) {

            window.location.href =
                resultado.url;


            return;

        }


        if (
            resultado.destino
        ) {

            irASeccion(
                resultado.destino
            );

        }

    }


    function irASeccion(
        idSeccion
    ) {

        const seccion =
            document.getElementById(
                idSeccion
            );

        if (
            !seccion
        ) {

            window.location.href =
                `index.html#${idSeccion}`;


            return;

        }


        seccion.scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"

        });



        seccion.classList.add(
            "seccion-encontrada"
        );


        setTimeout(
            function () {

                seccion.classList.remove(
                    "seccion-encontrada"
                );

            },

            1800
        );

    }


    /* =====================================================
            BUSCAR Y ABRIR
    ===================================================== */

    function buscarYAbrir() {

        const termino =
            campoBusqueda.value.trim();


        if (
            termino === ""
        ) {

            campoBusqueda.focus();


            return;

        }


        const resultados =
            filtrarResultados(
                termino
            );


        /* =================================================
                SIN RESULTADOS
        ================================================= */

        if (
            resultados.length === 0
        ) {

            mostrarSugerencias();


            campoBusqueda.focus();


            return;

        }


        /* =================================================
                RESULTADO SELECCIONADO CON FLECHAS
        ================================================= */

        if (
            indiceSeleccionado >= 0 &&
            resultadosActuales[
            indiceSeleccionado
            ]
        ) {

            const resultadoSeleccionado =
                resultadosActuales[
                indiceSeleccionado
                ];


            guardarBusquedaReciente(
                termino,
                resultadoSeleccionado
            );


            abrirResultado(
                resultadoSeleccionado
            );


            return;

        }


        /* =================================================
                MEJOR RESULTADO AUTOMÁTICO
        ================================================= */

        const mejorResultado =
            resultados[0];


        guardarBusquedaReciente(
            termino,
            mejorResultado
        );


        abrirResultado(
            mejorResultado
        );

    }


    /* =====================================================
            EVENTO AL ESCRIBIR
    ===================================================== */

    campoBusqueda.addEventListener(
        "input",
        mostrarSugerencias
    );


    /* =====================================================
            ENTER O BOTÓN BUSCAR
    ===================================================== */

    formularioBusqueda.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            buscarYAbrir();

        }
    );


    /* =====================================================
            CONTROL CON TECLADO
    ===================================================== */

    campoBusqueda.addEventListener(
        "keydown",
        function (evento) {


            /* =================================================
                    FLECHA ABAJO
            ================================================= */

            if (
                evento.key ===
                "ArrowDown"
            ) {

                if (
                    resultadosActuales.length === 0
                ) {

                    return;

                }


                evento.preventDefault();


                indiceSeleccionado++;


                if (
                    indiceSeleccionado >=
                    resultadosActuales.length
                ) {

                    indiceSeleccionado =
                        0;

                }


                actualizarSeleccion();

            }


            /* =================================================
                    FLECHA ARRIBA
            ================================================= */

            if (
                evento.key ===
                "ArrowUp"
            ) {

                if (
                    resultadosActuales.length === 0
                ) {

                    return;

                }


                evento.preventDefault();


                indiceSeleccionado--;


                if (
                    indiceSeleccionado < 0
                ) {

                    indiceSeleccionado =
                        resultadosActuales.length - 1;

                }


                actualizarSeleccion();

            }


            /* =================================================
                    ESCAPE
            ================================================= */

            if (
                evento.key ===
                "Escape"
            ) {

                ocultarSugerencias();


                campoBusqueda.blur();

            }

        }
    );


    campoBusqueda.addEventListener(
        "focus",
        function () {

            if (
                campoBusqueda.value.trim() !==
                ""
            ) {

                mostrarSugerencias();

            }

        }
    );


    /* =====================================================
            OCULTAR AL HACER CLICK FUERA
    ===================================================== */

    document.addEventListener(
        "click",
        function (evento) {

            const clicDentro =

                formularioBusqueda.contains(
                    evento.target
                )

                ||

                sugerenciasBusqueda.contains(
                    evento.target
                );


            if (
                !clicDentro
            ) {

                ocultarSugerencias();

            }

        }
    );


    /* =====================================================
            LIMPIAR HISTORIAL
    ===================================================== */

    if (
        botonLimpiar
    ) {

        botonLimpiar.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    CLAVE_HISTORIAL
                );


                mostrarHistorial();


                campoBusqueda.focus();

            }
        );

    }

    mostrarHistorial();

}

/* =========================================================
        FORMULARIO DE REGISTRO 
========================================================= */

function iniciarFormularioRegistro() {


    const formularioRegistro =
        document.getElementById(
            "formularioRegistro"
        );

    const fechaNacimiento =
        document.getElementById(
            "fechaNacimiento"
        );

    const campoEdad =
        document.getElementById(
            "edad"
        );

    const nivelInteres =
        document.getElementById(
            "nivelInteres"
        );

    const valorInteres =
        document.getElementById(
            "valorInteres"
        );

    const mensajeFormulario =
        document.getElementById(
            "mensajeFormulario"
        );


    /* ==========================================
            VALIDAR QUE EXISTA
    ========================================== */

    if (!formularioRegistro) {

        return;

    }


    /* ==========================================
        FECHA MÁXIMA = FECHA ACTUAL
    ========================================== */

    if (fechaNacimiento) {

        const hoy =
            new Date();

        const anio =
            hoy.getFullYear();

        const mes =
            String(
                hoy.getMonth() + 1
            ).padStart(
                2,
                "0"
            );

        const dia =
            String(
                hoy.getDate()
            ).padStart(
                2,
                "0"
            );


        fechaNacimiento.max =

            `${anio}-${mes}-${dia}`;

    }


    /* ==========================================
           ACTUALIZAR NIVEL DE INTERÉS
    ========================================== */

    if (
        nivelInteres &&
        valorInteres
    ) {


        valorInteres.textContent =

            nivelInteres.value +
            " / 10";


        nivelInteres.addEventListener(

            "input",

            function () {


                valorInteres.textContent =

                    nivelInteres.value +
                    " / 10";

            }

        );

    }


    /* ==========================================
             CALCULAR EDAD
    ========================================== */

    function calcularEdad(
        fecha
    ) {


        if (!fecha) {

            return "";

        }


        const nacimiento =
            new Date(
                fecha + "T00:00:00"
            );


        const hoy =
            new Date();


        let edad =

            hoy.getFullYear() -
            nacimiento.getFullYear();


        const diferenciaMes =

            hoy.getMonth() -
            nacimiento.getMonth();


        if (
            diferenciaMes < 0 ||

            (
                diferenciaMes === 0 &&

                hoy.getDate() <
                nacimiento.getDate()
            )
        ) {

            edad--;

        }


        return edad;

    }


    /* ==========================================
          CAMBIO DE FECHA NACIMIENTO
    ========================================== */

    if (fechaNacimiento) {


        fechaNacimiento.addEventListener(

            "change",

            function () {


                const edadCalculada =

                    calcularEdad(
                        fechaNacimiento.value
                    );


                if (campoEdad) {

                    campoEdad.value =
                        edadCalculada;

                }


                console.log(

                    "Edad calculada:",

                    edadCalculada

                );

            }

        );

    }


    /* ==========================================
         ENVÍO DEL FORMULARIO POR EMAIL
 ========================================== */

    formularioRegistro.addEventListener(

        "submit",

        async function (evento) {


            /* ==================================
                EVITAR ENVÍO NORMAL DEL HTML
            ================================== */

            evento.preventDefault();


            /* ==================================
                 LIMPIAR MENSAJE ANTERIOR
            ================================== */

            mensajeFormulario.className =
                "registro-mensaje";

            mensajeFormulario.textContent =
                "";


            /* ==================================
                 VALIDAR EL FORMULARIO
            ================================== */

            if (
                !formularioRegistro.checkValidity()
            ) {


                formularioRegistro.reportValidity();


                return;

            }


            /* ==================================
               CALCULAR EDAD ANTES DE ENVIAR
            ================================== */

            const edadCalculada =

                calcularEdad(
                    fechaNacimiento.value
                );


            /* ==================================
                 VALIDAR LA EDAD
            ================================== */

            if (
                edadCalculada === "" ||
                edadCalculada < 0
            ) {


                mensajeFormulario.className =

                    "registro-mensaje error";


                mensajeFormulario.textContent =

                    "Por favor, ingresa una fecha de nacimiento válida.";


                return;

            }


            if (campoEdad) {


                campoEdad.value =
                    edadCalculada;

            }


            const botonEnviar =

                document.getElementById(
                    "botonEnviarRegistro"
                );



            if (botonEnviar) {


                botonEnviar.disabled =
                    true;


                botonEnviar.innerHTML = `

                <span
                    class="spinner-border
                           spinner-border-sm
                           me-2"
                    aria-hidden="true">
                </span>

                Enviando...

            `;

            }


            /* ==================================
                  OBTENER LOS DATOS
            ================================== */

            const datosFormulario =

                new FormData(
                    formularioRegistro
                );


            /* ==================================
                 CORREO DE ARADU PET
            ================================== */

            const correoDestino =

                "aradupet123@gmail.com";


            /* ==================================
                    URL FORMSUBMIT
            ================================== */

            const urlEnvio =

                "https://formsubmit.co/ajax/" +
                correoDestino;


            try {


                /* ==================================
                        ENVIAR DATOS
                ================================== */

                const respuesta =

                    await fetch(

                        urlEnvio,

                        {

                            method:
                                "POST",

                            body:
                                datosFormulario,

                            headers: {

                                "Accept":
                                    "application/json"

                            }

                        }

                    );


                /* ==================================
                   CONVERTIR RESPUESTA A JSON
                ================================== */

                const resultado =

                    await respuesta.json();


                /* ==================================
                   COMPROBAR SI FUE CORRECTO
                ================================== */

                if (!respuesta.ok) {


                    throw new Error(

                        resultado.message ||

                        "No se pudo enviar el formulario."

                    );

                }


                mensajeFormulario.className =

                    "registro-mensaje exito";


                mensajeFormulario.innerHTML = `

                <i class="bi bi-check-circle-fill"></i>

                Registro enviado correctamente.

                Gracias por formar parte de
                la comunidad Aradu Pet.

            `;


                /* ==================================
                      LIMPIAR FORMULARIO
                ================================== */

                formularioRegistro.reset();


                /* ==================================
                  RESTAURAR NIVEL DE INTERÉS
                ================================== */

                if (
                    nivelInteres &&
                    valorInteres
                ) {


                    nivelInteres.value =
                        "5";


                    valorInteres.textContent =
                        "5 / 10";

                }


                /* ==================================
                      LIMPIAR EDAD OCULTA
                ================================== */

                if (campoEdad) {


                    campoEdad.value =
                        "";

                }


                console.log(

                    "Formulario enviado:",

                    resultado

                );


            }


            catch (error) {


                /* ==================================
                        ERROR
                ================================== */

                console.error(

                    "Error al enviar formulario:",

                    error

                );


                mensajeFormulario.className =

                    "registro-mensaje error";


                mensajeFormulario.innerHTML = `

                <i class="bi bi-exclamation-circle-fill"></i>

                No fue posible enviar el registro.

                Por favor, intenta nuevamente.

            `;


            }


            finally {


                /* ==================================
                     ACTIVAR BOTÓN NUEVAMENTE
                ================================== */

                if (botonEnviar) {


                    botonEnviar.disabled =
                        false;


                    botonEnviar.innerHTML = `

                    <i class="bi bi-send-fill"></i>

                    Enviar registro

                `;

                }


            }


        }

    );


}

/* =========================================================
        CARGAR CONTENIDO DEL INDEX DESDE JSON
========================================================= */

function cargarContenidoIndex() {

    fetch("json/index.json")

        .then(function (respuesta) {

            if (!respuesta.ok) {

                throw new Error(
                    "No se pudo cargar el archivo index.json"
                );

            }

            return respuesta.json();

        })

        .then(function (datos) {

            console.log(
                "index.json cargado correctamente:",
                datos
            );


            cargarLogo(datos.logo);

            cargarCarousel(datos.carousel);

            cargarImagenHistoria(datos.historia);

            cargarImagenAcerca(datos.acerca);

            cargarImagenesCreadores(datos.creadores);

        })

        .catch(function (error) {

            console.error(
                "Error al cargar index.json:",
                error
            );

        });

}

/* =========================================================
        LOGO NAVBAR
========================================================= */

function cargarLogo(logo) {

    const contenedor =
        document.getElementById(
            "logoNavbar"
        );


    if (
        !contenedor ||
        !logo
    ) {

        return;

    }


    contenedor.innerHTML = `

        <img
            src="${logo.imagen}"
            alt="${logo.alt}"
            class="logo"
        >

    `;

}

/* =========================================================
        CAROUSEL DESDE JSON
========================================================= */

function cargarCarousel(imagenes) {

    const contenedor =
        document.getElementById(
            "carouselContenido"
        );


    if (
        !contenedor ||
        !Array.isArray(imagenes)
    ) {

        return;

    }


    contenedor.innerHTML = "";


    imagenes.forEach(

        function (
            imagen,
            indice
        ) {


            const activo =

                indice === 0

                    ? "active"

                    : "";


            const carouselItem = `

                <div class="carousel-item ${activo}">

                    <img
                        src="${imagen.imagen}"
                        class="d-block w-100 carousel-imagen"
                        alt="${imagen.alt}"
                    >

                    <div
                        class="carousel-caption
                               d-none
                               d-md-block"
                    >

                        <h1 class="fw-bold">

                            ${imagen.titulo}

                        </h1>

                        <p>

                            ${imagen.descripcion}

                        </p>

                    </div>

                </div>

            `;


            contenedor.innerHTML +=
                carouselItem;

        }

    );

}

/* =========================================================
        IMAGEN HISTORIA
========================================================= */

function cargarImagenHistoria(historia) {

    const contenedor =
        document.getElementById(
            "imagenHistoria"
        );


    if (
        !contenedor ||
        !historia
    ) {

        return;

    }


    contenedor.innerHTML = `

        <img
            src="${historia.imagen}"
            alt="${historia.alt}"
            class="historia-img"
        >

    `;

}

/* =========================================================
        IMAGEN ACERCA DE
========================================================= */

function cargarImagenAcerca(acerca) {

    const contenedor =
        document.getElementById(
            "imagenAcerca"
        );


    if (
        !contenedor ||
        !acerca
    ) {

        return;

    }


    contenedor.innerHTML = `

        <img
            src="${acerca.imagen}"
            alt="${acerca.alt}"
            class="img-fluid rounded shadow"
        >

    `;

}

/* =========================================================
        IMÁGENES DE CREADORES
========================================================= */

function cargarImagenesCreadores(creadores) {

    if (
        !Array.isArray(creadores)
    ) {

        return;

    }


    const sebastian =
        creadores.find(

            function (creador) {

                return creador.id === 1;

            }

        );


    const camila =
        creadores.find(

            function (creador) {

                return creador.id === 2;

            }

        );


    const contenedorSebastian =
        document.getElementById(
            "imagenSebastian"
        );


    const contenedorCamila =
        document.getElementById(
            "imagenCamila"
        );

    if (
        contenedorSebastian &&
        sebastian
    ) {

        contenedorSebastian.innerHTML = `

            <img
                src="${sebastian.imagen}"
                alt="${sebastian.alt}"
                class="creador-imagen"
            >

        `;

    }


    if (
        contenedorCamila &&
        camila
    ) {

        contenedorCamila.innerHTML = `

            <img
                src="${camila.imagen}"
                alt="${camila.alt}"
                class="creador-imagen"
            >

        `;

    }

}