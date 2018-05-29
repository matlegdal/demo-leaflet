const fujitsu = [46.830545, -71.306222];
const map = L.map('map').setView(fujitsu, 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; Fujitsu'
}).addTo(map);

L.marker(fujitsu).addTo(map)
    .bindPopup('Nos bureaux à Québec!')
    .openPopup();

// Info sur les états
const info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' + (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>' :
        'Hover over a state');
};
info.addTo(map);

// Légende
const legend = L.control({
    position: 'bottomright'
});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};
legend.addTo(map);

// Custom control locator
const locator = L.control({
    position: 'bottomleft'
});
locator.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info locator');
    div.innerHTML = 'Locator';
    div.addEventListener('click', locate);
    return div;
}
locator.addTo(map);

// Add population density 
const geojson = L.geoJson(statesData, {
    style,
    onEachFeature
}).addTo(map);