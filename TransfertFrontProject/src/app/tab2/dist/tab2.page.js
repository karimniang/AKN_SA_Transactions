"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Tab2Page = void 0;
var core_1 = require("@angular/core");
var Tab2Page = /** @class */ (function () {
    function Tab2Page(TransactionService) {
        this.TransactionService = TransactionService;
        this.sortKey = null;
        this.sortDirection = 0;
        this.allTransaction = [];
        this.i = 0;
    }
    Tab2Page.prototype.ngOnInit = function () {
        var _this = this;
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.tabTransactions = false;
        this.tabAllTransactions = true;
        this.TransactionService.getUserConnected().subscribe(function (res) {
            _this.userConnected = res;
            console.log(_this.userConnected);
        });
        this.TransactionService.getAllTransaction().subscribe(function (res) {
            //this.compte = res['hydra:member'];
            //console.log(res['hydra:member']);
            res['hydra:member'].forEach(function (element) {
                if (element.compteTransaction.id == _this.userConnected.agence.id) {
                    _this.allTransaction.push(element);
                }
                else if (element.compteRetrait && (element.compteRetrait.id == _this.userConnected.agence.id)) {
                    _this.allTransaction.push(element);
                }
            });
            console.log(_this.allTransaction);
            _this.sort();
        });
    };
    Tab2Page.prototype.clickTransactions = function () {
        this.tabTransactions = true;
        this.tabAllTransactions = false;
    };
    Tab2Page.prototype.clickAllTransactions = function () {
        this.tabTransactions = false;
        this.tabAllTransactions = true;
    };
    Tab2Page.prototype.sortBy = function (key) {
        this.sortKey = key;
        this.sortDirection++;
        this.sort();
    };
    Tab2Page.prototype.sort = function () {
        var _this = this;
        if (this.sortDirection == 1) {
            this.allTransaction = this.allTransaction.sort(function (a, b) {
                var valA = a[_this.sortKey];
                var valB = b[_this.sortKey];
                return valA.toString().localeCompare(valB);
            });
        }
        else if (this.sortDirection == 2) {
            this.allTransaction = this.allTransaction.sort(function (a, b) {
                var valA = a[_this.sortKey];
                var valB = b[_this.sortKey];
                return valB.toString().localeCompare(valA);
            });
        }
        else {
            this.sortDirection = 0;
            this.sortKey = null;
        }
    };
    Tab2Page = __decorate([
        core_1.Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss']
        })
    ], Tab2Page);
    return Tab2Page;
}());
exports.Tab2Page = Tab2Page;
