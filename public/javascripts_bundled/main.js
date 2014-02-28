(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Map = require('./map.jsx').Map;




React.renderComponent(
    Map({ centerLat: 48.886392, centerLng: 31.992188, zoom:6}),
    document.getElementById('map-canvas')
);
},{"./map.jsx":2}],2:[function(require,module,exports){
/** @jsx React.DOM */

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

    },

    render: function(){
        return (
            React.DOM.div( {className:"map"})
            );
    }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcHZhc2VrL1Byb2plY3RzL0V5ZU9uVWtyYWluZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcHZhc2VrL1Byb2plY3RzL0V5ZU9uVWtyYWluZS9wdWJsaWMvamF2YXNjcmlwdHMvcHVibGljL2Zha2VfNzU4OWRmZGMuanMiLCIvVXNlcnMvcHZhc2VrL1Byb2plY3RzL0V5ZU9uVWtyYWluZS9wdWJsaWMvamF2YXNjcmlwdHMvcHVibGljL21hcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBNYXAgPSByZXF1aXJlKCcuL21hcC5qc3gnKS5NYXA7XG5cblxuXG5cblJlYWN0LnJlbmRlckNvbXBvbmVudChcbiAgICBNYXAoeyBjZW50ZXJMYXQ6IDQ4Ljg4NjM5MiwgY2VudGVyTG5nOiAzMS45OTIxODgsIHpvb206Nn0pLFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtY2FudmFzJylcbik7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbmV4cG9ydHMuTWFwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnTWFwJyxcblxuICAgIHByb3BUeXBlczoge1xuICAgICAgICB6b29tNDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgY2VudGVyTG5nOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBjZW50ZXJMYXQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXJcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZ2V0RE9NTm9kZSgpO1xuXG4gICAgICAgIHZhciBtYXBPcHRpb25zID0ge1xuICAgICAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHRoaXMucHJvcHMuY2VudGVyTGF0LCB0aGlzLnByb3BzLmNlbnRlckxuZyksXG4gICAgICAgICAgICB6b29tOiBwYXJzZUludCh0aGlzLnByb3BzLnpvb20sIDEwKVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGVsZW1lbnQsIG1hcE9wdGlvbnMpO1xuXG4gICAgICAgIHZhciBzdHJpY3RCb3VuZHMgPSBudWxsO1xuXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyT25jZShtYXAsICdpZGxlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmICghc3RyaWN0Qm91bmRzKSB7XG4gICAgICAgICAgICAgICAgc3RyaWN0Qm91bmRzID0gIG1hcC5nZXRCb3VuZHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFwLCAnZHJhZ2VuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHN0cmljdEJvdW5kcy5jb250YWlucyhtYXAuZ2V0Q2VudGVyKCkpKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIFdlJ3JlIG91dCBvZiBib3VuZHMgLSBNb3ZlIHRoZSBtYXAgYmFjayB3aXRoaW4gdGhlIGJvdW5kc1xuXG4gICAgICAgICAgICB2YXIgYyA9IG1hcC5nZXRDZW50ZXIoKSxcbiAgICAgICAgICAgICAgICB4ID0gYy5sbmcoKSxcbiAgICAgICAgICAgICAgICB5ID0gYy5sYXQoKSxcbiAgICAgICAgICAgICAgICBtYXhYID0gc3RyaWN0Qm91bmRzLmdldE5vcnRoRWFzdCgpLmxuZygpLFxuICAgICAgICAgICAgICAgIG1heFkgPSBzdHJpY3RCb3VuZHMuZ2V0Tm9ydGhFYXN0KCkubGF0KCksXG4gICAgICAgICAgICAgICAgbWluWCA9IHN0cmljdEJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sbmcoKSxcbiAgICAgICAgICAgICAgICBtaW5ZID0gc3RyaWN0Qm91bmRzLmdldFNvdXRoV2VzdCgpLmxhdCgpO1xuXG4gICAgICAgICAgICBpZiAoeCA8IG1pblgpIHggPSBtaW5YO1xuICAgICAgICAgICAgaWYgKHggPiBtYXhYKSB4ID0gbWF4WDtcbiAgICAgICAgICAgIGlmICh5IDwgbWluWSkgeSA9IG1pblk7XG4gICAgICAgICAgICBpZiAoeSA+IG1heFkpIHkgPSBtYXhZO1xuXG4gICAgICAgICAgICBtYXAuc2V0Q2VudGVyKGNlbnRlcik7XG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtYXBcIn0pXG4gICAgICAgICAgICApO1xuICAgIH1cbn0pO1xuIl19
