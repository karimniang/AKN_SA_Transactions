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
exports.TransactionCoursComponent = void 0;
var core_1 = require("@angular/core");
var TransactionCoursComponent = /** @class */ (function () {
    function TransactionCoursComponent(transactionService, alertCtrl) {
        this.transactionService = transactionService;
        this.alertCtrl = alertCtrl;
        this.allTransaction = [];
    }
    TransactionCoursComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transactionService.getUserConnected().subscribe(function (res) {
                            _this.userConnected = res;
                            //console.log(this.userConnected);
                        })];
                    case 1:
                        _a.sent();
                        this.loadAll();
                        return [2 /*return*/];
                }
            });
        });
    };
    TransactionCoursComponent.prototype.loadAll = function () {
        var _this = this;
        this.allTransaction = [];
        this.transactionService.getAllTransaction().subscribe(function (res) {
            //this.compte = res['hydra:member'];
            //console.log(res['hydra:member']);
            res['hydra:member'].forEach(function (element) {
                var _a, _b;
                if ((element.statut == "loading" || element.statut == "cancel") && (((_a = element.userDepot) === null || _a === void 0 ? void 0 : _a.id) == _this.userConnected.id || ((_b = element.depotAdminAgence) === null || _b === void 0 ? void 0 : _b.id) == _this.userConnected.id)) {
                    _this.allTransaction.push(element);
                }
            });
            //console.log(this.allTransaction);
        });
    };
    TransactionCoursComponent.prototype.setStatut = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var alert, alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(transaction.statut == "loading")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.alertCtrl.create({
                                'header': 'Confirmation',
                                'message': 'Voulez vous annuler ce depot ??',
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        handler: function () {
                                            console.log('Cancel clicked');
                                        }
                                    },
                                    {
                                        text: 'Confirmer',
                                        handler: function () {
                                            //console.log('Buy clicked');
                                            _this.transactionService.changeStatut('cancel', transaction.id).subscribe(function (res) {
                                                console.log(res);
                                                _this.loadAll();
                                            }, function (error) {
                                                console.log(error);
                                            });
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        alert = _a.sent();
                        alert.present();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(transaction.statut == "cancel")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.alertCtrl.create({
                                'header': 'Confirmation',
                                'message': 'Voulez vous relancer ce depot ??',
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        handler: function () {
                                            console.log('Cancel clicked');
                                        }
                                    },
                                    {
                                        text: 'Confirmer',
                                        handler: function () {
                                            //console.log('Buy clicked');
                                            _this.transactionService.changeStatut('loading', transaction.id).subscribe(function (res) {
                                                console.log(res);
                                                _this.loadAll();
                                            }, function (error) {
                                                console.log(error);
                                            });
                                        }
                                    }
                                ]
                            })];
                    case 3:
                        alert = _a.sent();
                        alert.present();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TransactionCoursComponent = __decorate([
        core_1.Component({
            selector: 'app-transaction-cours',
            templateUrl: './transaction-cours.component.html',
            styleUrls: ['./transaction-cours.component.scss']
        })
    ], TransactionCoursComponent);
    return TransactionCoursComponent;
}());
exports.TransactionCoursComponent = TransactionCoursComponent;
