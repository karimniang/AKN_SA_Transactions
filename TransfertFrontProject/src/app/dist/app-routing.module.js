"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("./login/login.component");
var transaction_cours_component_1 = require("./transactions/transaction-cours/transaction-cours.component");
var depot_component_1 = require("./transactions/depot/depot.component");
var retrait_component_1 = require("./transactions/retrait/retrait.component");
var routes = [
    {
        path: "login",
        component: login_component_1.LoginComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'tabs',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./tabs/tabs.module'); }).then(function (m) { return m.TabsPageModule; }); }
    },
    {
        path: 'transaction/depot',
        component: depot_component_1.DepotComponent
    },
    {
        path: 'transaction/retrait',
        component: retrait_component_1.RetraitComponent
    },
    {
        path: 'transaction/encours',
        component: transaction_cours_component_1.TransactionCoursComponent
    },
    {
        path: 'commission',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./commission/commission.module'); }).then(function (m) { return m.CommissionPageModule; }); }
    },
    {
        path: 'menu',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./menu/menu.module'); }).then(function (m) { return m.MenuPageModule; }); }
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules })
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
