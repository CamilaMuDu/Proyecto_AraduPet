console.log("mapa.js está conectado correctamente");


/* ============================================
        UBICACIÓN DE ARADU PET
============================================ */

const ubicacionAraduPet = {
    lat: 10.00305377304655,
    lng: -84.21897909154666
};


/* ============================================
        API KEY DE GOOGLE ROUTES
============================================ */

const GOOGLE_API_KEY = "AIzaSyCUPaz07bD7qi4hLy84OIZBTbCrPqWnB28";


let mapa;
let marcadorAradu;
let directionsService;
let directionsRenderer;


/* ============================================
        INICIAR GOOGLE MAPS
============================================ */

function initMap() {

    mapa = new google.maps.Map(
        document.getElementById("mapa"),
        {
            center: ubicacionAraduPet,
            zoom: 16
        }
    );


    /* ============================================
            MARCADOR DE ARADU PET
    ============================================ */

    marcadorAradu = new google.maps.Marker({

        position: ubicacionAraduPet,

        map: mapa,

        title: "Aradu Pet"

    });


    /* ============================================
            INFORMACIÓN DEL LOCAL
    ============================================ */

    const informacionAradu =
        new google.maps.InfoWindow({

            content: `

                <div>

                    <h5>
                        Aradu Pet
                    </h5>

                    <p>
                        Villa Bonita,
                        Alajuela,
                        Costa Rica
                    </p>

                    <strong>
                        Tienda y atención veterinaria
                    </strong>

                </div>

            `

        });


    marcadorAradu.addListener(
        "click",
        function () {

            informacionAradu.open({

                anchor:
                    marcadorAradu,

                map:
                    mapa

            });

        }
    );


    /* ============================================
            SERVICIO VISUAL DE RUTAS
    ============================================ */

    directionsService =
        new google.maps.DirectionsService();


    directionsRenderer =
        new google.maps.DirectionsRenderer({

            map:
                mapa

        });


    /* ============================================
            BOTÓN DE RUTA
    ============================================ */

    const botonRuta =
        document.getElementById(
            "btnRuta"
        );


    if (botonRuta) {

        botonRuta.addEventListener(

            "click",

            obtenerUbicacionUsuario

        );

    }

}


/* ============================================
        OBTENER UBICACIÓN DEL USUARIO
============================================ */

function obtenerUbicacionUsuario() {

    const informacionRuta =
        document.getElementById(
            "informacionRuta"
        );


    informacionRuta.innerHTML =
        "Obteniendo tu ubicación...";


    /* ============================================
            VERIFICAR GEOLOCALIZACIÓN
    ============================================ */

    if (!navigator.geolocation) {

        informacionRuta.innerHTML = `

            <div class="alert alert-danger">

                Tu navegador no permite
                utilizar geolocalización.

            </div>

        `;

        return;

    }


    /* ============================================
            SOLICITAR UBICACIÓN
    ============================================ */

    navigator.geolocation.getCurrentPosition(

        function (posicion) {


            const ubicacionUsuario = {

                lat:
                    posicion.coords.latitude,

                lng:
                    posicion.coords.longitude

            };


            console.log(
                "Ubicación del usuario:",
                ubicacionUsuario
            );


            /* ====================================
                    DIBUJAR RUTA EN MAPA
            ==================================== */

            dibujarRutaGoogleMaps(
                ubicacionUsuario
            );


            /* ====================================
                    CONSUMO API REST
            ==================================== */

            consumirRoutesAPI(
                ubicacionUsuario
            );

        },


        function (error) {

            console.error(
                "Error de geolocalización:",
                error
            );


            informacionRuta.innerHTML = `

                <div class="alert alert-danger">

                    No fue posible obtener
                    tu ubicación.

                    <br>

                    Debes permitir el acceso
                    a la ubicación.

                </div>

            `;

        },


        {

            enableHighAccuracy:
                true,

            timeout:
                10000,

            maximumAge:
                0

        }

    );

}


/* ============================================
        DIBUJAR RUTA EN GOOGLE MAPS
============================================ */

function dibujarRutaGoogleMaps(
    ubicacionUsuario
) {


    directionsService.route(

        {

            origin:
                ubicacionUsuario,

            destination:
                ubicacionAraduPet,

            travelMode:
                google.maps.TravelMode.DRIVING

        },


        function (
            resultado,
            estado
        ) {


            if (
                estado === "OK"
            ) {

                directionsRenderer
                    .setDirections(
                        resultado
                    );


                console.log(
                    "Ruta dibujada correctamente."
                );

            }


            else {

                console.error(
                    "Error al dibujar ruta:",
                    estado
                );

            }

        }

    );

}


/* ============================================
        CONSUMO API REST EXTERNA
        GOOGLE ROUTES API
============================================ */

async function consumirRoutesAPI(
    ubicacionUsuario
) {


    const informacionRuta =
        document.getElementById(
            "informacionRuta"
        );

    const url =
        "https://routes.googleapis.com/directions/v2:computeRoutes";

    const datosRuta = {

        origin: {

            location: {

                latLng: {

                    latitude:
                        ubicacionUsuario.lat,

                    longitude:
                        ubicacionUsuario.lng

                }

            }

        },


        destination: {

            location: {

                latLng: {

                    latitude:
                        ubicacionAraduPet.lat,

                    longitude:
                        ubicacionAraduPet.lng

                }

            }

        },


        travelMode:
            "DRIVE",


        routingPreference:
            "TRAFFIC_AWARE",


        languageCode:
            "es-419",


        units:
            "METRIC"

    };


    try {


        /* ============================================
                CONSUMO REST
        ============================================ */

        const respuesta =
            await fetch(

                url,

                {

                    method:
                        "POST",


                    headers: {

                        "Content-Type":
                            "application/json",


                        "X-Goog-Api-Key":
                            GOOGLE_API_KEY,


                        "X-Goog-FieldMask":
                            "routes.duration,routes.distanceMeters"

                    },


                    body:
                        JSON.stringify(
                            datosRuta
                        )

                }

            );

        if (!respuesta.ok) {

            throw new Error(

                "Error HTTP: " +
                respuesta.status

            );

        }


        /* ============================================
                CONVERTIR A JSON
        ============================================ */

        const datos =
            await respuesta.json();


        console.log(
            "Respuesta REST de Google Routes:",
            datos
        );


        /* ============================================
                VALIDAR QUE EXISTA RUTA
        ============================================ */

        if (
            !datos.routes ||
            datos.routes.length === 0
        ) {

            throw new Error(
                "Google no devolvió ninguna ruta."
            );

        }


        const ruta =
            datos.routes[0];


        /* ============================================
                DISTANCIA
        ============================================ */

        const distanciaKm =
            (
                ruta.distanceMeters /
                1000
            ).toFixed(2);


        /* ============================================
                DURACIÓN
        ============================================ */

        const segundos =
            parseInt(
                ruta.duration
            );


        const minutos =
            Math.round(
                segundos / 60
            );


        /* ============================================
                MOSTRAR RESULTADO
        ============================================ */

        informacionRuta.innerHTML = `

            <div class="alert alert-success">

                <strong>
                    Ruta hacia Aradu Pet
                </strong>

                <br><br>

                <i class="bi bi-signpost-2-fill"></i>

                Distancia:

                <strong>
                    ${distanciaKm} km
                </strong>

                <br>


                <i class="bi bi-clock-fill"></i>

                Tiempo aproximado:

                <strong>
                    ${minutos} minutos
                </strong>

                <br><br>

                <small>

                    Información obtenida mediante
                    Google Routes.

                </small>

            </div>

        `;


    }


    catch (error) {


        console.error(
            "Error consumiendo Google Routes API:",
            error
        );


        informacionRuta.innerHTML = `

            <div class="alert alert-danger">

                No fue posible consultar
                la ruta

            </div>

        `;

    }

}