/**
 * @class       CanvasInteract
 * @description A module for handling keyboard, mouse, and touch events on the
 *              canvas. CanvasInput normalizes mouse/touch events into `press`
 *              and can check pointer events against an entity pool
 * @author      Chris Peters
 */
export default class CanvasInput {
    /**
     * @param {Object}     options
     * @param {HTMLEntity} options.canvas        The canvas element to interact with
     * @param {Function}   options.hitTestMethod the method for checking pointer events
     *                                           against entities in the entityPool. Should
     *                                           be a static method as not called in scope
     * @param {Object[]}   options.entityPool    an array of entities
     * @param {Boolean}    options.canvasFit     Set to true if using css to fit the canvas in the viewport
     * @param {Boolean}    options.useKeyboard   whether or not to listen for keyboard events
     * @param {Boolean}    options.useMouse      whether or not to listen for mouse events
     * @param {Boolean}    options.useTouch      whether or not to listen for touch events
     */
    constructor(options) {
        this._canvas = options.canvas;
        this._hitTestMethod = options.hitTestMethod;
        this._canvasFit = options.canvasFit || false;
        this._entityPool = options.entityPool;

        this._pressCandidate = null;
        this._dragCandidate = null;
        this._dragCandidateOffsetX = null;
        this._dragCandidateOffsetY = null;
        this._canDrag = false;
        this._isDragging = false;

        if (options.useKeyboard) {
            this._addKeyboardListeners();
        }

        if (options.useMouse) {
            this._addMouseListeners();
        }

        if (options.useTouch) {
            this._addTouchListeners();
        }
    }

    _addKeyboardListeners() {

    }

    _addMouseListeners() {
        let events = ['click', 'dblclick', 'mousedown', 'mouseup', 'mousemove'];

        for (let event of events) {
            this._canvas.addEventListener(event, this._handleMouseAndTouch.bind(this), false);
        }
    }

    _addTouchListeners() {
        let events = ['tap', 'dbltap', 'touchstart', 'touchend', 'touchmove'];

        for (let event of events) {
            this._canvas.addEventListener(event, this._handleMouseAndTouch.bind(this), false);
        }
    }

    _handleKeyboard() {

    }

    _handleMouseAndTouch(inputEvent) {
        let scaleFactor = this._canvasFit ? 100 / this._getScaleFactor() / 100 : 1;
        let eventData = {
            domEvent: inputEvent
        };
        let eventTypes = [];

        if (inputEvent.hasOwnProperty('touches')) {
            eventData.absX = inputEvent.touches[0].pageX - this._canvas.offsetLeft;
            eventData.absY = inputEvent.touches[0].pageY - this._canvas.offsetTop;
        } else {
            eventData.absX = inputEvent.pageX - this._canvas.offsetLeft;
            eventData.absY = inputEvent.pageY - this._canvas.offsetTop;
        }

        // coordinate positions relative to canvas scaling
        eventData.x = eventData.absX * scaleFactor;
        eventData.y = eventData.absY * scaleFactor;

        eventData.target = this._hitTestMethod ? this._getEventTarget(eventData) : null;

        switch(inputEvent.type) {
            case 'click':
            case 'tap':
                if (!this._pressCandidate || !eventData.target || this._pressCandidate._uid !== eventData.target._uid) {
                    // remove potential target if it was not pressed AND released on
                    eventData.target = undefined;
                }
                this._pressCandidate = null;
                eventTypes.push('press');
            break;
            case 'dblclick':
            case 'dbltap':
                eventTypes.push('dblpress');
            break;
            case 'mousedown':
            case 'touchstart':
                this._pressCandidate = eventData.target;
                this._dragCandidate = eventData.target && eventData.target.getIsDraggable() ? eventData.target : undefined;

                if (this._dragCandidate) {
                    this._dragCandidateOffsetX = eventData.x - this._dragCandidate.getY();
                    this._dragCandidateOffsetY = eventData.y - this._dragCandidate.getY();
                }

                this._canDrag = true;
                eventTypes.push('pressdown');
            break;
            case 'mouseup':
            case 'touchend':
                this._canDrag = false;
                if (this._isDragging) {
                    this._isDragging = false;
                    this._dragCandidate = null;
                    eventTypes.push('dragend');
                }
                eventTypes.push('pressup');
            break;
            /*
            // TODO decide whether to include...
            case 'touchleave':
            case 'touchcancel':
                if (this._isDragging) {
                    this._isDragging = false;
                    this._dragCandidate = null;
                    eventTypes.push('dragleave');
                }
                eventTypes.push('pressleave');
            break;*/
            case 'mousemove':
            case 'touchmove':
                if (this._canDrag && this._dragCandidate && this._dragCandidate.getIsDraggable()) {

                    this._dragCandidate.setX(eventData.x - this._dragCandidateOffsetX);
                    this._dragCandidate.setY(eventData.y - this._dragCandidateOffsetY);

                    if (!this._isDragging) {
                        this._isDragging = true;
                        eventTypes.push('dragstart');
                    }

                    eventTypes.push('drag');
                }
            break;
        }

        for (let event of eventTypes) {
            this[event](eventData);
        }
    }
    /**
     * get the scale factor of the canvas element
     *
     * @private
     * @return {Float}
     */
    _getScaleFactor() {
        let factor = 1;
        let canvasWidth;

        if (this._canvas.style.width) {
            canvasWidth = parseInt(this._canvas.style.width, 10);
            factor = canvasWidth / this._canvas.width;
        }

        return factor;
    }

    _getEventTarget(event) {
        let topmostEntity;

        for (let entity of this._entityPool) {
            if (typeof entity.getBoundingBox === 'function' &&
                this._hitTestMethod(event.x, event.y, entity)) {
                // continually assign higher sorted entity
                topmostEntity = entity;
            }
        }

        return topmostEntity;
    }

    // normalized event callbacks
    dblpress() {}
    drag() {}
    dragend() {}
    dragstart() {}
    press() {}
    pressdown() {}
    pressup() {}

    /**
     * @param {Object[]} pool An array of all entities in the game pool
     * @return {CanvasInput}
     */
    setEntityPool(pool) {
        this._entityPool = pool;

        return this;
    }
}
