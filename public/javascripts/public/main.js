var Map = require('./map.jsx').Map;




React.renderComponent(
    Map({ centerLat: 48.886392, centerLng: 31.992188, zoom:6}),
    document.getElementById('map-canvas')
);