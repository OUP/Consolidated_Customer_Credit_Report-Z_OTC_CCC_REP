(function () {
  "use strict";

  sap.ui.controller("oup.otc.customercreditreport.ext.quick_link.Handler", {
    onInit: function () {
      // credit information init hook handler
    },

    onLinkPress: function (oEvent) {
      const oController = this.getView().getController();
      const oView = oController.oMainComponent.getView();
      const oGlobalModel = oView.getModel("global");
      const oData = oGlobalModel.getData();
      const oCustomData = oEvent.getSource().data();
      let semanticObject = "";
      let action = "";
      let params = {};

      switch (oCustomData.ACTION) {
        /* Customer Details */
        case "CUST_DTL":
          semanticObject = "Customer";
          action = "display";
          params = {
            BusinessPartner: oData.Customer,
          };
          break;

        /* Credit Index */
        case "CRED_IND":
          semanticObject = "DaysSalesOutstandingKPI";
          action = "analyzeSBKPIDaysSalesOutstanding";
          break;

        /* Payment History */
        case "PAYM_HIS":
          semanticObject = "ZS_ALR_87012177";
          action = "display";
          break;

        /* Stop History */
        case "STOP_HIS":
          semanticObject = "ZCustCreditBlock";
          action = "display";
          params = {
            CreditSegment: oData.creditInfo.CreditSegment,
            Customer: oData.Customer
          };
          break;

        /* Display comments */
        case "DISP_COM":
          semanticObject = "ZProcessReceivables";
          action = "manage";
          break;

        /* Credit Management */
        case "CRED_MAN":
          semanticObject = "BusinessPartner";
          action = "displayCreditProfile";
          break;
      }

      // get a handle on the global XAppNav service
      const oCrossAppNavigator = sap.ushell.Container.getService(
        "CrossApplicationNavigation"
      );

      // generate the Hash
      const hash =
        (oCrossAppNavigator &&
          oCrossAppNavigator.hrefForExternal({
            target: {
              semanticObject,
              action,
            },
            params,
          })) ||
        "";

      // navigate to external application
      oCrossAppNavigator.toExternal({
        target: {
          shellHash: hash,
        },
      });
    },
  });
})();
