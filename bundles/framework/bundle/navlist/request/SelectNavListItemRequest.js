/**
 * @class Oskari.mapframework.bundle.navlist.request.SelectNavListItemRequest
 * Requests selection for navlist-item
 * 
 * Requests are build and sent through Oskari.mapframework.sandbox.Sandbox.
 * Oskari.mapframework.request.Request superclass documents how to send one.
 */
Oskari.clazz.define('Oskari.mapframework.bundle.navlist.request.SelectNavListItemRequest', 

/**
 * @method create called automatically on construction
 * @static
 */
function(itemId) {
	this._itemId = itemId;
}, {
	/** @static @property __name request name */
    __name : "SelectNavListItemRequest",
    /**
     * @method getName
     * @return {String} request name
     */
    getName : function() {
        return this.__name;
    },
	/**
	 * @method getModuleId
	 * @return {String} module id
	 */
	 getItemId : function() {
	 	return this._itemId;
	}
}, {
	/**
     * @property {String[]} protocol array of superclasses as {String}
     * @static
     */
    'protocol' : ['Oskari.mapframework.request.Request']
});