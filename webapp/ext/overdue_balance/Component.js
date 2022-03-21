sap.ui.define(
  ["sap/ovp/cards/custom/Component", "jquery.sap.global"],
  function (CardComponent, jQuery) {
    "use strict";

    return CardComponent.extend(
      "oup.otc.customercreditreport.ext.overdue_balance.Component",
      {
        // use inline declaration instead of component.json to save 1 round trip
        metadata: {
          properties: {
            contentFragment: {
              type: "string",
              defaultValue:
                "oup.otc.customercreditreport.ext.overdue_balance.Content",
            },
            headerFragment: {
              type: "string",
              defaultValue: "oup.otc.customercreditreport.ext.overdue_balance.Header",
            },
            footerFragment: {
              type: "string",
              defaultValue: "",
            },
          },

          version: "${version}",

          library: "sap.ovp",

          includes: [],

          dependencies: {
            libs: ["sap.m"],
            components: [],
          },

          config: {},
          
          customizing: {
            "sap.ui.controllerExtensions": {
              "sap.ovp.cards.generic.Card": {
                controllerName:
                  "oup.otc.customercreditreport.ext.overdue_balance.Handler",
              },
            },
          },
        },
      }
    );
  }
);