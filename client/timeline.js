

function TimelineView() {
    this.defaultEventSize = 30
    this.$el = document.querySelector('.timeline')
}

TimelineView.prototype = {
    drawEvent(timeInSeconds=1, color="red") {
        var events = this.$el.querySelector('.events')
            , newEvent = document.createElement('div')
            , eventSize = (this.defaultEventSize * timeInSeconds)
            ;
            
        newEvent.classList.add('event', color);
        newEvent.style.width = `${eventSize}px`;
        events.appendChild(newEvent)
    }
};

var timelineView = new TimelineView()

timelineView.drawEvent()
