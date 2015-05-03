'use strict';

function EventEmitter(validEvents) {
    this.eventListeners = new Map();

    console.assert(validEvents instanceof Array, 'validEvents should be an array');
    console.assert(validEvents.every(function(event){
        return typeof event === 'string' && event;
    }), 'A valid event is a non empty string');

    this.validEvents = validEvents
}

EventEmitter.prototype = {
    on(event, listener) {
        var listeners
            ;

        console.assert(this.isValidEvent(event), 'Provide a valid event');
        console.assert(listener instanceof Function, 'Listener should be a function');

        listeners = this.eventListeners.get(event) || new Set();
        listeners.add(listener);

        this.eventListeners.set(event, listeners);
    },

    isValidEvent : function(event) {
        return this.validEvents.some(function(e) { return e === event });
    },

    emit : function(event) {
        var data = [].slice.call(arguments, 1);
        console.assert(this.isValidEvent(event), 'Provide a valid event');
        for(var listener of (this.eventListeners.get(event) || new Set())) {
            listener.apply(undefined, data)
        }
    }
};

function TimeLine() {
    EventEmitter.call(this, ['runningTimes.updated'])
}

TimeLine.prototype = Object.create(EventEmitter.prototype);

TimeLine.prototype.trackRunningTime  = function(fn) {
    let self = this;

    fn = fn || function() {};
    return function() {
        window.performance.mark(`${fn.name}-started`);
        fn();
        window.performance.mark(`${fn.name}-finished`);
        window.performance.measure(`${fn.name}-measure`, `${fn.name}-started`, `${fn.name}-finished`);
        self.emit('runningTimes.updated', self.getRunningTimes())
    };
};

TimeLine.prototype.getRunningTimes = function() {
    return window.performance.getEntriesByType('measure').map(function(m) {
        return {
            name : m.name.replace('-measure', ''),
            duration : (Math.round(m.duration) || 1)
        }
    });
};

function TimeLineView() {
    this.defaultEventSize = 30;
    this.$el = document.querySelector('.timeline')
}

TimeLineView.prototype = {
    drawEvent(timeInSeconds, color) {
        timeInSeconds = timeInSeconds || 1;
        color = color || "red";

        var events = this.$el.querySelector('.events')
            , newEvent = document.createElement('div')
            , eventSize = (this.defaultEventSize * timeInSeconds)
            ;

        newEvent.classList.add('event', color);
        newEvent.style.width = `${eventSize}px`;
        events.appendChild(newEvent)
    },

    cleanEvents : function() {
        var events = [].slice.call(this.$el.querySelectorAll('.event'));
        events.forEach(function(e) {
            e.remove();
        });
    }
};

var timeLineView = new TimeLineView();
var timeLine = new TimeLine();

timeLine.on('runningTimes.updated', function(runningTimes) {
    timeLineView.cleanEvents();
    runningTimes.forEach(function(runningTime) {
        switch(runningTime.name) {
            case 'sayHello':
                timeLineView.drawEvent(runningTime.duration, 'red');
                break;
            default:
                console.log('not drawing event')
        }
    });
});

timeLineView.drawEvent();
