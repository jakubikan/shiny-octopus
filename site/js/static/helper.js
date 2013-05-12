LongClick = Class.extend({
	init: function (map, length) {
	    this.length_ = length;
	    var me = this;
	    me.map_ = map;
	    google.maps.event.addListener(map, 'mousedown', function(e) { me.onMouseDown_(e) });
	    google.maps.event.addListener(map, 'mouseup', function(e) { me.onMouseUp_(e) });   
	    google.maps.event.addDomListener(window, 'touchstart', function(e) { me.onMouseDown_(e) });   
	    google.maps.event.addDomListener(window, 'touchend', function(e) { me.onMouseUp_(e) });   
	},
	onMouseUp_ : function(e) {
	    var now = +new Date;
	    if (now - this.down_ > this.length_) {
	        google.maps.event.trigger(this.map_, 'longpress', e);
	    }
    },
	onMouseDown_ : function() {
	    this.down_ = +new Date;   
	}
});