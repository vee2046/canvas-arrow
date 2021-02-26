var TouchEventUtils = {
	setPointFromEvent(e) {
		let point = {}
		let isTouch = !!('ontouchstart' in window);
      if (isTouch) {
        point.x = e.changedTouches[0].pageX - this.getOffset(e.target).left;
        point.y = e.changedTouches[0].pageY - this.getOffset(e.target).top;
        point.x = parseInt(point.x,10);
        point.y = parseInt(point.y,10);
      } else {
        point.x = e.offsetX !== undefined ? e.offsetX : e.layerX;
        point.y = e.offsetY !== undefined ? e.offsetY : e.layerY;
        point.x = parseInt(point.x,10);
        point.y = parseInt(point.y,10);
      }
      return point;
    },
    getOffset(elem) {
      var bbox = elem.getBoundingClientRect();
      return {
        left: bbox.left,
        top: bbox.top
      };
    },
}
function TouchEventHandler(canvas,events={}){
	this.start = null;
	const _this = this;
	const moving = e => {
		let point = TouchEventUtils.setPointFromEvent(e);
		events.onMoving && events.onMoving(_this.start,point);
	}
	canvas.addEventListener('touchstart',e => {
		_this.start = TouchEventUtils.setPointFromEvent(e);
		canvas.addEventListener('touchmove',moving,false);
	},false);
	canvas.addEventListener('touchend',e => {
		canvas.removeEventListener('touchmove',moving,false);
	},false);
}
