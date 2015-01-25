/**
 * @class Oskari.mapframework.bundle.navlist.request.SelectNavListItemRequestHandler
 * Handles Oskari.mapframework.bundle.navlist.request.SelectNavListItemRequest.
 */
Oskari.clazz.define('Oskari.mapframework.bundle.navlist.request.SelectNavListItemRequestHandler', function(sandbox, bundle) {

    this.sandbox = sandbox;
    this.bundle = bundle;
}, {
	/**
	 * @method handleRequest 
	 * @param {Oskari.mapframework.core.Core} core
	 * 		reference to the application core (reference sandbox core.getSandbox())
	 * @param {Oskari.harava.bundle.mapquestions.request.HideQuestionToolsRequest} request
	 * 		request to handle
	 */
    handleRequest : function(core, request) { 	
        this.sandbox.printDebug("[Oskari.mapframework.bundle.navlist.request.SelectNavListItemRequest]");
        var itemId = request.getItemId();
        
        this.bundle.selectNavListItem(itemId);
    }
}, {
	/**
     * @property {String[]} protocol array of superclasses as {String}
     * @static
     */
    protocol : ['Oskari.mapframework.core.RequestHandler']
});
