var data;


fetch('data').then(function (response) {
    return response.text();
}).then(function (text) {
    data = JSON.parse(text);

    console.log(data);
    require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/GraphicsLayer"

    ], function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {

        esriConfig.apiKey = "YOUR_API_KEY";

        const map = new Map({
            basemap: "streets"
        });

        const view = new MapView({
            map: map,
            center: [-118.2437, 34.0522], //Longitude, latitude
            zoom: 13,
            container: "viewDiv"
        });



        const simpleMarkerSymbol = {
            type: "simple-marker",
            color: [226, 119, 40],  // Orange
            outline: {
                color: [255, 255, 255], // White
                width: 1
            }
        };

        for (var i = 0; i < data.length; i++) {
            const graphicsLayer = new GraphicsLayer();
            var point = {
                type: "point",
                longitude: data[i].Longitude,
                latitude: data[i].Latitude
            };
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol
            });
            graphicsLayer.add(pointGraphic);
            graphicsLayer.title = "i";
            map.add(graphicsLayer);
        }

        view.on("immediate-click", function (event) {
            var screenPoint = {
                x: event.x,
                y: event.y
            };

            // Search for graphics at the clicked location
            view.hitTest(screenPoint).then(function (response) {
                if (response.results.length) {
                    console.log(response.results[0].graphic);
                    openNav();
                }
            });
        });
    });

});

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";

    // document.getElementById("date").innerHTML = data[2].'Date of incident';
    var num = getRandomInt(138);
    console.log(num);
    document.getElementById("summary").innerHTML = data[num].Summary;
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }





