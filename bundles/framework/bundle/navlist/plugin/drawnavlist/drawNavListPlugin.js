/**
 * @class Oskari.mapframework.bundle.navlist.plugin.drawNavListPlugin
 */
Oskari.clazz.define('Oskari.mapframework.bundle.navlist.plugin.drawNavListPlugin',

    /**
     * @method create called automatically on construction
     * @static
     * @param {Object} config, configuration can be:
     * Config:
     * "navlist": {
     *  "conf": {
     *      "maxAnswersExceededMessage": "Max answers exceeded!", // Max answer exceeded message
     *      "modules":  // 0 to n question modules
     *      [{
     *          "appendTo": "#step-2>.kartta-tyokalut", // where question toolbar are appended
     *          "questionId": "step-2", // question identifier id
     *          "questionTitle": "Question 1", // question title
     *          "questions":    // 0 to n questions object,
     *          [
     *              <QUESTION MODULE JSON>
     *          ]
     *      }]
     *  }
     * }
     *
*/
		
    function (config) {
        this._conf = config;
        this.mapModule = null;
        this.pluginName = null;
        this._sandbox = null;
        this._map = null;
        this._currentElementId = null;
        this._elements = null;
        this.enabled = true;
    }, {
        _container: null, //jQuery object that contains the navlist
        /** @static @property __name plugin name */
        __name: 'HaravaQuestionsMapPlugin',

        /**
         * @method getName
         * @return {String} plugin name
         */
        getName: function () {
            return this.pluginName;
        },
        /**
         * @method getMapModule
         * @return {Oskari.mapframework.ui.module.common.MapModule}
         * reference to map
         * module
         */
        getMapModule: function () {
            return this.mapModule;
        },
        /**
         * @method setMapModule
         * @param {Oskari.mapframework.ui.module.common.MapModule}
         * reference to map
         * module
         */
        setMapModule: function (mapModule) {
            this.mapModule = mapModule;
            if (mapModule) {
                this.pluginName = mapModule.getName() + this.__name;
            }
        },
        /**
         * @method hasUI
         * @return {Boolean} true
         * This plugin has an UI so always returns true
         */
        hasUI: function () {
            return true;
        },
        /**
         * @method init
         *
         * Interface method for the module protocol
         *
         * @param {Oskari.mapframework.sandbox.Sandbox} sandbox
         *          reference to application sandbox
         */
        init: function (sandbox) {
            var me = this;
            this._sandbox = sandbox;
            this._sandbox.printDebug("[NavListPlugin] init");
        },
        /**
         * @method register
         * Interface method for the plugin protocol
         */
        register: function () {

        },
        /**
         * @method unregister
         * Interface method for the plugin protocol
         */
        unregister: function () {

        },
        /**
         * @method startPlugin
         *
         * Interface method for the plugin protocol
         *
         * @param {Oskari.mapframework.sandbox.Sandbox} sandbox
         *          reference to application sandbox
         */
        startPlugin: function (sandbox) {
            var me = this;
            if (sandbox && sandbox.register) {
                this._sandbox = sandbox;
            }
            this._sandbox.register(this);

            var conf = me._conf;

            if (!conf) return;
            //gets container from configuration. Navlist is created inside this container. Defaults to navlist.
            var navlist_div_id = conf.navlist_div_id ? conf.navlist_div_id : "navlist";
            me.setContainer(navlist_div_id);
            
            //add appropriate class to container
            me.setContainerClass();
            
            //gets first level of elements from configuration. 
            var elements = conf.elements ? conf.elements : [];
           	elements = me._elements = me.addIdentifiersToElements(elements, "elem");
            me.appendElements(elements);
        },
        /**
         * Loops through all elements and adds appropriate identifiers
         */
        addIdentifiersToElements: function(elements, affix) {
        	var me = this;
        	
        	for (var i = 0, l = elements.length; i < l; i++) {
        		var element = elements[i];
        		var elemId = affix + "_" + i;
        		element.id = elemId;
        		
        		if (element.elements && element.elements.length > 0) {
        			element.elements = me.addIdentifiersToElements(element.elements, elemId);
        		}
        	}

        	return elements;
        },
        /**
         * gets container and sets it to _container variable.
         */
        setContainer: function(navlist_div_id) {
        	var me = this;
        	var container = $('#' + navlist_div_id);
        	me._container = container;
        },
        /**
         * gets container and sets it to _container variable.
         */
        setContainerClass: function() {
        	var me = this;
        	me._container.addClass("navlist");
        },
        /**
         * removes all elements from container
         */
        removeAllElements: function() {
        	var me = this;
        	$('div.nav-item', me._container).remove();
        },
        /**
         * loops through elements and appends them to container.
         */
        appendElements: function(elemsConf) {
        	var me = this;
        	for (var i = 0, l = elemsConf.length; i < l; i++) {
            	me.appendElement(elemsConf[i]);
            }
        },
        /**
         * appends element to container
         */
        appendElement: function(elemConf) {
        	var me = this;
        	me._container.append(me.createElement(elemConf));
        },
        /**
         * Creates element from configuration
         */
        createElement: function(elemConf) {
        	var me = this;
        	var element = $('<div />');
        	element.text(elemConf.name);
        	element.addClass("nav-item");
        	element.click([me, elemConf], me.handleElementClick);
        	element.data('elem-id', elemConf.id);
        	return element;
        },
        /**
         * Handles clicking an element
         */
        handleElementClick: function(evt) {
        	var me = evt.data[0];
        	var elemConf = evt.data[1];
        	
        	me._currentElementId = elemConf.id;
        	if (elemConf.elements && elemConf.elements.length > 0) me.showElements(elemConf.elements);
        	
        	var zoom = (elemConf.zoom) ? elemConf.zoom : false;
        	var x = elemConf.east ? elemConf.east : null;
        	var y = elemConf.north ? elemConf.north : null;
        	
        	if ((x !== null && y != null) || zoom !== false) {
            	me._sandbox.postRequestByName('MapMoveRequest', [x,y,zoom, false]);
        	}
        },
        /**
         * Appends back button to container
         */
        appendBackButton: function() {
        	var me = this;
        	me._container.append(me.createBackButton());
        },
        /**
         * Creates back button
         */
        createBackButton: function() {
        	var me = this;
        	var element = $('<div />');
        	element.text('Takaisin');
        	element.addClass('nav-item');
        	element.click([me], me.handleBackButtonClick);
        	return element;
        },
        /**
         * Handles clicking back button
         */
        handleBackButtonClick: function(evt) {
        	var me = evt.data[0];
        	var parentElement = me.findParent(me._elements, me._currentElementId);
        	
        	me._currentElementId = parentElement !== null ? parentElement.id : null;
        	me.showElements(parentElement !== null ? parentElement.elements : me._elements);
        },
        /**
         * Finds and returns parent of current element
         */
        findParent: function(elements, currentElementId) {
        	var me = this;
        	
        	for (var i = 0, l = elements.length; i < l; i++) {
        		var element = elements[i];
        		if (element.elements && element.elements.length > 0) {
            		if (me.containsElement(element.elements, currentElementId)) {
            			return element;
            		}
            		else {
            			var parentElement = me.findParent(element.elements, currentElementId);
            			if (parentElement !== null) {
            				return parentElement;
            			}
            		}
        		}
        	}
        	return null;
        },
        /**
         * Checks if element array contains given element
         */
        containsElement: function(elements, elementIdToFind) {
        	for (var i = 0, l = elements.length; i < l; i++) {
        		var element = elements[i];
        		if (element.id == elementIdToFind) {
        			return true;
        		}
        	}
        	return false;
        },
        /**
         * Shows elements in the list
         */
        showElements: function(elements) {
        	var me = this;
        	me.removeAllElements();
        	if (me._currentElementId !== null) me.appendBackButton();
        	me.appendElements(elements);
        	
        },
        /**
         * @method stopPlugin
         *
         * Interface method for the plugin protocol
         *
         * @param {Oskari.mapframework.sandbox.Sandbox} sandbox
         *          reference to application sandbox
         */
        stopPlugin: function (sandbox) {
            var me = this,
                p;

            if (sandbox && sandbox.register) {
                this._sandbox = sandbox;
            }

            for (p in this.eventHandlers) {
                this._sandbox.unregisterFromEventByName(this, p);
            }
            this._sandbox.unregister(this);
            this._map = null;
            this._sandbox = null;
        },
        /**
         * @method start
         *
         * Interface method for the module protocol
         *
         * @param {Oskari.mapframework.sandbox.Sandbox} sandbox
         *          reference to application sandbox
         */
        start: function (sandbox) {

        },
        /**
         * @method stop
         *
         * Interface method for the module protocol
         *
         * @param {Oskari.mapframework.sandbox.Sandbox} sandbox
         *          reference to application sandbox
         */
        stop: function (sandbox) {},
        /**
         * @method setEnabled
         * Enables or disables gfi functionality
         * @param {Boolean} blnEnabled
         *          true to enable, false to disable
         */
        setEnabled: function (blnEnabled) {
            this.enabled = (blnEnabled === true);
        },
        /**
         * @property {Object} eventHandlers
         * @static
         */
        eventHandlers: {

        },
        /**
         * @method onEvent
         * @param {Oskari.mapframework.event.Event} event a Oskari event object
         * Event is handled forwarded to correct #eventHandlers if found or discarded
         * if not.
         */
        onEvent: function (event) {
            var me = this;
            return this.eventHandlers[event.getName()].apply(this, [event]);
        },
    }, {
        /**
         * @property {Object} protocol
         * @static
         */
        'protocol': ["Oskari.mapframework.module.Module", "Oskari.mapframework.ui.module.common.mapmodule.Plugin"]
    });
