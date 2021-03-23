"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Tab2PageRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var tab2_page_1 = require("./tab2.page");
var routes = [
    {
        path: '',
        component: tab2_page_1.Tab2Page
    }
];
var Tab2PageRoutingModule = /** @class */ (function () {
    function Tab2PageRoutingModule() {
    }
    Tab2PageRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], Tab2PageRoutingModule);
    return Tab2PageRoutingModule;
}());
exports.Tab2PageRoutingModule = Tab2PageRoutingModule;
