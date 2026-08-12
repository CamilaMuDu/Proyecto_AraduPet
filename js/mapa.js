console.log("mapa.js está conectado correctamente");


/* ============================================
        UBICACIÓN DE ARADU PET
============================================ */

const ubicacionAraduPet = {
    lat: 10.00305377304655,
    lng: -84.21897909154666
};


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


    /* Marcador de Aradu Pet */

    marcadorAradu = new google.maps.Marker({
        position: ubicacionAraduPet,
        map: mapa,
        title: "Aradu Pet"
    });


    /* Información del local */

    const informacionAradu = new google.maps.InfoWindow({
        content: `
            <div>
                <h5>Aradu Pet</h5>
                <p>Villa Bonita, Alajuela, Costa Rica</p>
                <strong>Tienda y atención veterinaria</strong>
            </div>
        `
    });


    marcadorAradu.addListener("click", function () {

        informacionAradu.open({
            anchor: marcadorAradu,
            map: mapa
        });

    });


    /* Servicio para calcular rutas */

    directionsService =
        new google.maps.DirectionsService();


    directionsRenderer =
        new google.maps.DirectionsRenderer({
            map: mapa
        });


    /* Botón para calcular ruta */

    const botonRuta =
        document.getElementById("btnRuta");


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
        document.getElementById("informacionRuta");


    informacionRuta.innerHTML =
        "Obteniendo tu ubicación...";


    if (!navigator.geolocation) {

        informacionRuta.innerHTML =
            "Tu navegador no permite utilizar geolocalización.";

        return;
    }


    navigator.geolocation.getCurrentPosition(

        function (posicion) {

            const ubicacionUsuario = {

                lat: posicion.coords.latitude,

                lng: posicion.coords.longitude

            };


            console.log(
                "Ubicación del usuario:",
                ubicacionUsuario
            );


            calcularRuta(
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
                    No fue posible obtener tu ubicación.
                    Debes permitir el acceso a la ubicación.
                </div>
            `;

        },


        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

}


/* ============================================
        CALCULAR RUTA
============================================ */

function calcularRuta(ubicacionUsuario) {

    const informacionRuta =
        document.getElementById("informacionRuta");


    directionsService.route(

        {

            origin: ubicacionUsuario,

            destination: ubicacionAraduPet,

            travelMode:
                google.maps.TravelMode.DRIVING

        },


        function (resultado, estado) {

            if (estado === "OK") {

                directionsRenderer
                    .setDirections(resultado);


                const ruta =
                    resultado.routes[0].legs[0];


                informacionRuta.innerHTML = `

                    <div class="alert alert-success">

                        <strong>
                            Ruta hacia Aradu Pet
                        </strong>

                        <br>

                        Distancia:
                        ${ruta.distance.text}

                        <br>

                        Tiempo aproximado:
                        ${ruta.duration.text}

                    </div>

                `;

            }

            else {

                console.error(
                    "Error al calcular ruta:",
                    estado
                );


                informacionRuta.innerHTML = `

                    <div class="alert alert-danger">

                        No fue posible calcular
                        la ruta hacia Aradu Pet.

                    </div>

                `;

            }

        }

    );

}