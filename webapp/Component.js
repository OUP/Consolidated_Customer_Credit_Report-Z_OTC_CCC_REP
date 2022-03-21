sap.ui.define(["sap/ovp/app/Component"], function(AppComponent) {
    return AppComponent.extend("oup.otc.customercreditreport.Component", {
        metadata: {
            manifest: "json"
        },

        init: function() {
            // call the init function of the parent
            AppComponent.prototype.init.apply(this, arguments);

            // create global model to hold the filter data
            this.setModel(new sap.ui.model.json.JSONModel({}), "global");
        }
    });
});
