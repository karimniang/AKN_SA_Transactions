"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TransactionService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var TransactionService = /** @class */ (function () {
    function TransactionService(httpClient, logService) {
        this.httpClient = httpClient;
        this.logService = logService;
        this.urlApi = "https://127.0.0.1:8000/api/transactions/";
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                Authorization: 'Bearer ' + this.logService.getToken()
            })
        };
    }
    TransactionService.prototype.makeDepot = function (data) {
        return this.httpClient.post(this.urlApi + "depot", data, this.httpOptions);
    };
    TransactionService.prototype.makeRetrait = function (data) {
        return this.httpClient.post(this.urlApi + "retrait", data, this.httpOptions);
    };
    TransactionService.prototype.getAllTransaction = function () {
        return this.httpClient.get(this.urlApi, this.httpOptions);
    };
    TransactionService.prototype.changeStatut = function (statut, id) {
        return this.httpClient.put(this.urlApi + id, { 'statut': statut }, this.httpOptions);
    };
    TransactionService.prototype.getTransactionByCode = function (code) {
        return this.httpClient.get(this.urlApi + "bycode/" + code, this.httpOptions);
    };
    TransactionService.prototype.getUserConnected = function () {
        return this.httpClient.get("https://127.0.0.1:8000/api/users/connected", this.httpOptions);
    };
    TransactionService.prototype.reloadCompte = function () {
        var _this = this;
        this.getUserConnected().subscribe(function (res) {
            _this.compte = res['agence']['compte'];
            console.log(_this.compte);
        });
    };
    TransactionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], TransactionService);
    return TransactionService;
}());
exports.TransactionService = TransactionService;
