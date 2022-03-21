(function () {
  "use strict";

  sap.ui.controller(
    "oup.otc.customercreditreport.ext.customer_information.Handler",
    {
      onInit: function () {
        const oController = this.getView().getController();
        const oGlobalFilter = oController.oMainComponent.oGlobalFilter;

        // load initial data
        this._loadData(oGlobalFilter);

        // attach search event
        oGlobalFilter.attachSearch((oEvent) =>
          this._loadData(oEvent.getSource())
        );
      },

      // internal method

      _loadData: function (oGlobalFilter) {
        // start busy indicator
        sap.ui.core.BusyIndicator.show(0);

        // // get filter object
        // const oFilter = oGlobalFilter.getFilterData();

        // // frame key value pair for filter parameters
        // let sKey = "(";
        // for (const property in oFilter) {
        //   sKey += `${property}='${oFilter[property]}',`;
        // }

        // // remove trailing ','
        // sKey = sKey.substr(0, sKey.length - 1);

        // // end with close bracket ')'
        // sKey += ")";

        const oController = this.getView().getController();
        const oGlobalModel = oController.oMainComponent
          .getView()
          .getModel("global");
        const oModel = oController.oMainComponent.getView().getModel();

        const success = (oDataResponse) => {
          let oData = {};
          if (oDataResponse.results.length !== 0) {
            oData = oDataResponse.results[0];

            // credit infromation
            const aCreditInfo = oData.to_C_CUSTCREDITINFO.results;

            if (aCreditInfo.length !== 0) {
                oData.creditInfo = aCreditInfo[0];
            }

            // overdue balance
            // const aOverdueBalance = oData.to_C_CUSTOVRDUEBALFINAL.results;
            // if (aOverdueBalance.length !== 0) {
            //     oData.overdueBalance = aOverdueBalance[0];
            // }
            
          }
          oGlobalModel.setData(oData);

          // stop busy indicator
          sap.ui.core.BusyIndicator.hide();
        };

        const error = (_oErrorResponse) => {
          // failed to load data
          // stop busy indicator
          sap.ui.core.BusyIndicator.hide();
        };

        // ${sKey}

        oModel.read(`/ZOTC_C_CUSTOVP`, {
          urlParameters: {
            $expand:
              "to_C_CUSTCREDITINFO,to_C_CUSTMONTHBAL,to_C_CUSTOVRDUEBALFINAL",
          },
          success,
          error,
        });
      },
    }
  );
})();
