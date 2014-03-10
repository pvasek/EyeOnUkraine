var Map = require('./map.jsx').Map;

$.ajax({ 
	url: 'api/public/case',
	dataType: 'json'
})
.done(function(data){
	React.renderComponent(
	    Map({ centerLat: 48.886392, centerLng: 31.992188, zoom:6, points: data}),
	    document.getElementById('map-canvas')
	);		
});
