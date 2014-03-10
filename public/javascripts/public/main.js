var Map = require('./map.jsx').Map;

var points = [
	{ id: 1, lat: 48.886392, lng: 31.962188, title: 'point1 <div>aa</div>'},
	{ id: 1, lat: 48.886392, lng: 32.973158, title: 'point2'},
	{ id: 1, lat: 48.886392, lng: 33.984138, title: 'point3'},
	{ id: 1, lat: 48.886392, lng: 34.995118, title: 'point4'},
];


React.renderComponent(
    Map({ centerLat: 48.886392, centerLng: 31.992188, zoom:6, points: points}),
    document.getElementById('map-canvas')
);