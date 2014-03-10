(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./map.jsx":2}],2:[function(require,module,exports){
/** @jsx React.DOM */

var htmlEncode = function(html){
    if (!html) {
        return html;
    }
    return html.replace(/\</g, '&lt;').replace(/\>/g, '&gt;')
};

exports.Map = React.createClass({displayName: 'Map',

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
            React.DOM.div( {className:"map"})
            );
    }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcHZhc2VrL1Byb2plY3RzL0V5ZU9uVWtyYWluZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcHZhc2VrL1Byb2plY3RzL0V5ZU9uVWtyYWluZS9wdWJsaWMvamF2YXNjcmlwdHMvcHVibGljL2Zha2VfZDA0ZTUwNjEuanMiLCIvVXNlcnMvcHZhc2VrL1Byb2plY3RzL0V5ZU9uVWtyYWluZS9wdWJsaWMvamF2YXNjcmlwdHMvcHVibGljL21hcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBNYXAgPSByZXF1aXJlKCcuL21hcC5qc3gnKS5NYXA7XG5cbiQuYWpheCh7IFxuXHR1cmw6ICdhcGkvcHVibGljL2Nhc2UnLFxuXHRkYXRhVHlwZTogJ2pzb24nXG59KVxuLmRvbmUoZnVuY3Rpb24oZGF0YSl7XG5cdFJlYWN0LnJlbmRlckNvbXBvbmVudChcblx0ICAgIE1hcCh7IGNlbnRlckxhdDogNDguODg2MzkyLCBjZW50ZXJMbmc6IDMxLjk5MjE4OCwgem9vbTo2LCBwb2ludHM6IGRhdGF9KSxcblx0ICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtY2FudmFzJylcblx0KTtcdFx0XG59KTtcbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgaHRtbEVuY29kZSA9IGZ1bmN0aW9uKGh0bWwpe1xuICAgIGlmICghaHRtbCkge1xuICAgICAgICByZXR1cm4gaHRtbDtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZSgvXFw8L2csICcmbHQ7JykucmVwbGFjZSgvXFw+L2csICcmZ3Q7Jylcbn07XG5cbmV4cG9ydHMuTWFwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnTWFwJyxcblxuICAgIHByb3BUeXBlczoge1xuICAgICAgICB6b29tNDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgY2VudGVyTG5nOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBjZW50ZXJMYXQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXJcbiAgICB9LFxuXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5nZXRET01Ob2RlKCk7XG5cbiAgICAgICAgdmFyIG1hcE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcodGhpcy5wcm9wcy5jZW50ZXJMYXQsIHRoaXMucHJvcHMuY2VudGVyTG5nKSxcbiAgICAgICAgICAgIHpvb206IHBhcnNlSW50KHRoaXMucHJvcHMuem9vbSwgMTApXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZWxlbWVudCwgbWFwT3B0aW9ucyk7XG5cbiAgICAgICAgdmFyIHN0cmljdEJvdW5kcyA9IG51bGw7XG5cbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXJPbmNlKG1hcCwgJ2lkbGUnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYgKCFzdHJpY3RCb3VuZHMpIHtcbiAgICAgICAgICAgICAgICBzdHJpY3RCb3VuZHMgPSAgbWFwLmdldEJvdW5kcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXAsICdkcmFnZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoc3RyaWN0Qm91bmRzLmNvbnRhaW5zKG1hcC5nZXRDZW50ZXIoKSkpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gV2UncmUgb3V0IG9mIGJvdW5kcyAtIE1vdmUgdGhlIG1hcCBiYWNrIHdpdGhpbiB0aGUgYm91bmRzXG5cbiAgICAgICAgICAgIHZhciBjID0gbWFwLmdldENlbnRlcigpLFxuICAgICAgICAgICAgICAgIHggPSBjLmxuZygpLFxuICAgICAgICAgICAgICAgIHkgPSBjLmxhdCgpLFxuICAgICAgICAgICAgICAgIG1heFggPSBzdHJpY3RCb3VuZHMuZ2V0Tm9ydGhFYXN0KCkubG5nKCksXG4gICAgICAgICAgICAgICAgbWF4WSA9IHN0cmljdEJvdW5kcy5nZXROb3J0aEVhc3QoKS5sYXQoKSxcbiAgICAgICAgICAgICAgICBtaW5YID0gc3RyaWN0Qm91bmRzLmdldFNvdXRoV2VzdCgpLmxuZygpLFxuICAgICAgICAgICAgICAgIG1pblkgPSBzdHJpY3RCb3VuZHMuZ2V0U291dGhXZXN0KCkubGF0KCk7XG5cbiAgICAgICAgICAgIGlmICh4IDwgbWluWCkgeCA9IG1pblg7XG4gICAgICAgICAgICBpZiAoeCA+IG1heFgpIHggPSBtYXhYO1xuICAgICAgICAgICAgaWYgKHkgPCBtaW5ZKSB5ID0gbWluWTtcbiAgICAgICAgICAgIGlmICh5ID4gbWF4WSkgeSA9IG1heFk7XG5cbiAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIoY2VudGVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuXG4gICAgICAgIHRoaXMucHJvcHMucG9pbnRzLmZvckVhY2goZnVuY3Rpb24gYWRkUG9pbnQocG9pbnQpIHtcbiAgICAgICAgICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHBvaW50LmxhdCwgcG9pbnQubG5nKSxcbiAgICAgICAgICAgICAgICAgIG1hcDogbWFwLFxuICAgICAgICAgICAgICAgICAgdGl0bGU6IGh0bWxFbmNvZGUocG9pbnQudGl0bGUpXG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgb3BlbkluZm8gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpbmZvd2luZG93LnNldENvbnRlbnQobWFya2VyLnRpdGxlKTtcbiAgICAgICAgICAgICAgICBpbmZvd2luZG93Lm9wZW4obWFwLG1hcmtlcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBvcGVuSW5mbygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBvcGVuSW5mbygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtYXBcIn0pXG4gICAgICAgICAgICApO1xuICAgIH1cbn0pO1xuIl19
