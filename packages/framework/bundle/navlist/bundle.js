/**
 * @class Oskari.mapframework.bundle.navlist.NavListBundle
 *
 * Generates list-items used for navigation
 */
Oskari.clazz.define("Oskari.mapframework.bundle.navlist.NavListBundle", function () {

}, {
    "create": function () {
        var me = this;
        var inst = Oskari.clazz.create("Oskari.mapframework.bundle.navlist.NavListBundleInstance");

        return inst;

    },
    "update": function (manager, bundle, bi, info) {

    }
}, {

    "protocol": ["Oskari.bundle.Bundle", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
    "source": {

        "scripts": [{
            "type": "text/javascript",
            "src": "../../../../bundles/framework/bundle/navlist/instance.js"
        },
		{
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/bundle/navlist/plugin/drawnavlist/drawNavListPlugin.js"
        }, 
        {
            "type": "text/css",
            "src": "../../../../resources/framework/bundle/navlist/css/style.css"
        }],

        "locales": [{
            "lang": "fi",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/bundle/navlist/locale/fi.js"
        }]
    },
    "bundle": {
        "manifest": {
            "Bundle-Identifier": "navlist",
            "Bundle-Name": "navlist",
            "Bundle-Author": [{
                "Name": "pm",
                "Organisation": "dimenteq.fi",
                "Temporal": {
                    "Start": "2014",
                    "End": "2016"
                },
                "Copyleft": {
                    "License": {
                        "License-Name": "EUPL",
                        "License-Online-Resource": "http://www.paikkatietoikkuna.fi/license"
                    }
                }
            }],
            "Bundle-Name-Locale": {
                "fi": {
                    "Name": " style-1",
                    "Title": " style-1"
                },
                "en": {}
            },
            "Bundle-Version": "1.0.0",
            "Import-Namespace": ["Oskari", "jquery"],
            "Import-Bundle": {}

            /**
             *
             */

        }
    },

    /**
     * @static
     * @property dependencies
     */
    "dependencies": ["jquery"]

});

Oskari.bundle_manager.installBundleClass("navlist", "Oskari.mapframework.bundle.navlist.NavListBundle");
