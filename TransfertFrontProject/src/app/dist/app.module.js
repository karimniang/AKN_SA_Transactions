"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var angular_1 = require("@ionic/angular");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var depot_component_1 = require("./transactions/depot/depot.component");
var retrait_component_1 = require("./transactions/retrait/retrait.component");
var header_transactions_component_1 = require("../app/transactions/header-transactions/header-transactions.component");
var calcul_frais_component_1 = require("./transactions/calcul-frais/calcul-frais.component");
var login_module_1 = require("./login/login.module");
var http_1 = require("@angular/common/http");
var depot_modal_component_1 = require("./modal/depot-modal/depot-modal.component");
var retrait_modal_component_1 = require("./modal/retrait-modal/retrait-modal.component");
var transaction_cours_component_1 = require("./transactions/transaction-cours/transaction-cours.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, depot_component_1.DepotComponent, retrait_component_1.RetraitComponent, header_transactions_component_1.HeaderTransactionsComponent, calcul_frais_component_1.CalculFraisComponent, depot_modal_component_1.DepotModalComponent, retrait_modal_component_1.RetraitModalComponent, transaction_cours_component_1.TransactionCoursComponent],
            entryComponents: [],
            imports: [platform_browser_1.BrowserModule, angular_1.IonicModule.forRoot(), app_routing_module_1.AppRoutingModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, login_module_1.LoginComponentModule, http_1.HttpClientModule],
            providers: [{ provide: router_1.RouteReuseStrategy, useClass: angular_1.IonicRouteStrategy }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
