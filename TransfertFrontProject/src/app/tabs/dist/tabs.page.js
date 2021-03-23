"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TabsPage = void 0;
var core_1 = require("@angular/core");
var TabsPage = /** @class */ (function () {
    function TabsPage(transactionService) {
        this.transactionService = transactionService;
        this.vuTabs = true;
    }
    TabsPage.prototype.ngOnInit = function () {
        var _this = this;
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        // if (window.location.href.includes('home/depot')) {
        //   this.vuTabs = false;
        // }
        this.transactionService.getUserConnected().subscribe(function (res) {
            _this.userConnected = res;
            //console.log(this.userConnected);
        });
    };
    TabsPage = __decorate([
        core_1.Component({
            selector: 'app-tabs',
            templateUrl: 'tabs.page.html',
            styleUrls: ['tabs.page.scss']
        })
    ], TabsPage);
    return TabsPage;
}());
exports.TabsPage = TabsPage;
