/** @jsx React.DOM */

var htmlEncode = function(html){
    if (!html) {
        return html;
    }
    return html.replace(/\</g, '&lt;').replace(/\>/g, '&gt;')
};

exports.Map = React.createClass({

    propTypes: {
        zoom4: React.PropTypes.number,
        centerLng: React.PropTypes.number,
        centerLat: React.PropTypes.number
    },


    componentDidMount: function() {
        var element = this.getDOMNode();

        var mapOptions = {
            center: new google.maps.LatLng(this.props.centerLat, this.props.centerLng),
            zoom: parseInt(this.props.zoom, 10)
        };

        var map = new google.maps.Map(element, mapOptions);

        var strictBounds = null;

        google.maps.event.addListenerOnce(map, 'idle', function(){
            if (!strictBounds) {
                strictBounds =  map.getBounds();
            }
        });

        google.maps.event.addListener(map, 'dragend', function() {
            if (strictBounds.contains(map.getCenter())) return;

            // We're out of bounds - Move the map back within the bounds

            var c = map.getCenter(),
                x = c.lng(),
                y = c.lat(),
                maxX = strictBounds.getNorthEast().lng(),
                maxY = strictBounds.getNorthEast().lat(),
                minX = strictBounds.getSouthWest().lng(),
                minY = strictBounds.getSouthWest().lat();

            if (x < minX) x = minX;
            if (x > maxX) x = maxX;
            if (y < minY) y = minY;
            if (y > maxY) y = maxY;

            map.setCenter(center);
        });

        var infowindow = new google.maps.InfoWindow();

        this.props.points.forEach(function addPoint(point) {
            var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(point.lat, point.lng),
                  map: map,
                  title: htmlEncode(point.title)
              });

            var openInfo = function() {
                infowindow.setContent(marker.title);
                infowindow.open(map,marker);
            };
            google.maps.event.addListener(marker, 'click', function() {
                openInfo();
            });
            google.maps.event.addListener(marker, 'mouseover', function() {
                openInfo();
            });
        });

    },

    render: function(){
        return (
            <div className="map"></div>
            );
    }
});
