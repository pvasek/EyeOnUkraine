/** @jsx React.DOM */

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

    },

    render: function(){
        return (
            <div className="map"></div>
            );
    }
});
