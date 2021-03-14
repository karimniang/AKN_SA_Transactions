"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Tab3Page = void 0;
var core_1 = require("@angular/core");
var Tab3Page = /** @class */ (function () {
    function Tab3Page(alertController) {
        this.alertController = alertController;
        this.isClicked = false;
    }
    Tab3Page.prototype.showFrais = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.isClicked = true;
                        if (!this.montant) {
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, this.caluclFrais(+this.montant)];
                    case 1:
                        _a.fraisToShow = _b.sent();
                        console.log(this.fraisToShow);
                        this.alertController.create({
                            header: "Calcul de frais",
                            message: "Pour un montant de " + this.montant + " les frais sont de " + this.fraisToShow + " !!",
                            buttons: ["Retour"]
                        }).then(function (res) {
                            res.present();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab3Page.prototype.caluclFrais = function (montant) {
        var frais;
        if (montant > 0 && montant <= 5000) {
            frais = 425;
        }
        if (montant > 5000 && montant <= 10000) {
            frais = 850;
        }
        if (montant > 10000 && montant <= 15000) {
            frais = 1270;
        }
        if (montant > 15000 && montant <= 20000) {
            frais = 1695;
        }
        if (montant > 20000 && montant <= 50000) {
            frais = 2500;
        }
        if (montant > 50000 && montant <= 60000) {
            frais = 3000;
        }
        if (montant > 60000 && montant <= 75000) {
            frais = 4000;
        }
        if (montant > 75000 && montant <= 120000) {
            frais = 5000;
        }
        if (montant > 120000 && montant <= 150000) {
            frais = 6000;
        }
        if (montant > 150000 && montant <= 200000) {
            frais = 7000;
        }
        if (montant > 200000 && montant <= 250000) {
            frais = 8000;
        }
        if (montant > 250000 && montant <= 300000) {
            frais = 9000;
        }
        if (montant > 300000 && montant <= 400000) {
            frais = 12000;
        }
        if (montant > 400000 && montant <= 750000) {
            frais = 15000;
        }
        if (montant > 750000 && montant <= 900000) {
            frais = 22000;
        }
        if (montant > 900000 && montant <= 1000000) {
            frais = 25000;
        }
        if (montant > 1000000 && montant <= 1125000) {
            frais = 27000;
        }
        if (montant > 1125000 && montant <= 2000000) {
            frais = 30000;
        }
        if (montant > 2000000) {
            frais = ((2 / 100) * montant);
        }
        return frais;
    };
    Tab3Page = __decorate([
        core_1.Component({
            selector: 'app-tab3',
            templateUrl: 'tab3.page.html',
            styleUrls: ['tab3.page.scss']
        })
    ], Tab3Page);
    return Tab3Page;
}());
exports.Tab3Page = Tab3Page;
