sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/m/MessageToast',
	"sap/m/BusyDialog",
    "sap/m/Dialog",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/Button",
    "sap/ui/layout/form/SimpleForm",
    "sap/ui/core/Title"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast, BusyDialog, Dialog, Label, Input, Button, SimpleForm, Title) {
        "use strict";

        return Controller.extend("projectdb.controller.myApp", {
            onInit: function () {

                this.onReadProp();

            },

            onReadProp: function()
            {
                let oModel = this.getOwnerComponent().getModel();
                let oJSONModel = new JSONModel();
                let oBusyDialog = new BusyDialog(
                    {
                        title: "Caricamento dati",
                        text: "Attendere..."
                    }
                )
                oBusyDialog.open();
                debugger;

                oModel.read("/Employees", 
                {
                    success: function(response)
                    {
                        oJSONModel.setData(response.results);
                        this.getView().setModel(oJSONModel, "EmpDataModel");
                    }.bind(this),
                    error: function(error)
                    {
                        console.log("HAI SBAGLIATO");
                        debugger;
                    }
                });
                oBusyDialog.close();
            },

            onOpenDialog: function()
            {
                debugger;
                if (!this.oDraggableDialog) {
                    this.oDraggableDialog = new Dialog({
                        title: "Draggable Available Products",
                        contentWidth: "550px",
                        contentHeight: "300px",
                        draggable: true,
                        content: new SimpleForm({
                            content: 
                            [
                                new Title({text:"Please use this form to modify the employer's info"}),
                                new Label({text:"Employer ID"}),
                                new Input
                                ({
                                    maxLength: 20,
                                    id: "theID"
                                }),
                                new Label({text:"Lastname"}),
                                new Input
                                ({
                                    maxLength: 20,
                                    id: "LastName"
                                }),
                                new Label({text:"Title"}),
                                new Input
                                ({
                                    maxLength: 20,
                                    id: "theTitle"
                                }),
                                new Label({text:"Hire Date"}),
                                new Input
                                ({
                                    maxLength: 20,
                                    id: "hireDate"
                                }),
                                new Label({text:"Country"}),
                                new Input
                                ({
                                    maxLength: 20,
                                    id: "EmpCountry"
                                })
                            ]
                        }),
                        // debugger
                        buttons:
                        [
                            new Button
                            ({
                                text:"Modify",
                                press:"onPressModify",
                                type: sap.m.ButtonType.Emphasized
                            }),
                            new Button({
                                text: "Close",
                                // Qua il debugger può essere messo
                                press: function () {
                                    this.oDraggableDialog.close();
                                }.bind(this)
                            })
                        ],
                        // debugger
                    });
                    debugger;
                    this.getView().addDependent(this.oDraggableDialog);
                }
    
                this.oDraggableDialog.open();
            }
        });
    });
