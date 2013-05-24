LongClick = Class.extend({
	
    length_ : null,
    element : null,
    down_ : null,
	
	init: function (element, length) {
		var self = this;
		self.element = element;
		self.length_ = length
	    google.maps.event.addListener(self.element, 'mousedown', function(e) { self.onMouseDown_(self,e) });
	    google.maps.event.addListener(self.element, 'mouseup', function(e) { self.onMouseUp_(self,e) });   
	    google.maps.event.addDomListener(window, 'touchstart', function(e) { self.onMouseDown_(self,e) });   
	    google.maps.event.addDomListener(window, 'touchend', function(e) { self.onMouseUp_(self,e) });   
	},
	onMouseUp_ : function(self, e) {
	    now = +new Date;
	    console.log("mouse up");
	    if (now - self.down_ > self.length_) {
	    	console.log("triggering longpress")
	        google.maps.event.trigger(self.element, 'longpress', e);
	    }
    },
	onMouseDown_ : function(self) {
	    this.down_ = +new Date;   
	    console.log("mouse down");
	}
});