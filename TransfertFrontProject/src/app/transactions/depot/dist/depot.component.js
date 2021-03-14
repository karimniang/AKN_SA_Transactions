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
exports.DepotComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var depot_modal_component_1 = require("src/app/modal/depot-modal/depot-modal.component");
var DepotComponent = /** @class */ (function () {
    function DepotComponent(fb, router, logService, modalConroller, alertController) {
        this.fb = fb;
        this.router = router;
        this.logService = logService;
        this.modalConroller = modalConroller;
        this.alertController = alertController;
        this.regexNumber = /^7[05678][0-9]{3}([0-9]{2}){2}/gm;
        this.montantToSend = 0;
    }
    DepotComponent.prototype.ngOnInit = function () {
        //console.log(Array.from(Array(10000).keys()));
        // if (!this.logService.isTokenExpired()) {
        //   //console.log("expire");
        //   localStorage.clear();
        //   this.router.navigate(['/login']);
        // }
        this.seeEmetteur = true;
        this.seeBeneficiaire = false;
        this.formTransaction = this.fb.group({
            cni: ['', forms_1.Validators.required],
            nom: ['', forms_1.Validators.required],
            prenom: ['', forms_1.Validators.required],
            telephone: ['', [forms_1.Validators.required, forms_1.Validators.pattern(this.regexNumber)]],
            montant: ['', forms_1.Validators.required],
            nomBeneficiaire: ['', forms_1.Validators.required],
            prenomBeneficiaire: ['', forms_1.Validators.required],
            telephoneBeneficiaire: ['', [forms_1.Validators.required, forms_1.Validators.pattern(this.regexNumber)]],
            cniBeneficiaire: ['', forms_1.Validators.required],
            frais: [],
            total: []
        });
        //this.formTransaction.reset()
    };
    DepotComponent.prototype.clickEmetteur = function () {
        this.seeEmetteur = true;
        this.seeBeneficiaire = false;
    };
    DepotComponent.prototype.clickBenef = function () {
        this.seeEmetteur = false;
        this.seeBeneficiaire = true;
    };
    // clickEvent (event){
    //   alert('ok,');
    //   console.log(this.cni);
    // }
    DepotComponent.prototype.clickFrais = function (event) {
        var frais;
        var montant = +event.target.value;
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
        this.tax = frais;
        this.total = montant + frais;
        this.montantToSend = montant;
    };
    DepotComponent.prototype.sendDepot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.formTransaction.value);
                        this.dataSend = {
                            "envoyeur": {
                                "nom_complet": this.formTransaction.value.prenom + " " + this.formTransaction.value.nom,
                                "telephone": this.formTransaction.value.telephone,
                                "numero_cni": this.formTransaction.value.cni
                            },
                            "receveur": {
                                "nom_complet": this.formTransaction.value.prenomBeneficiaire + " " + this.formTransaction.value.nomBeneficiaire,
                                "numero_cni": this.formTransaction.value.cniBeneficiaire,
                                "telephone": this.formTransaction.value.telephoneBeneficiaire
                            },
                            "montant": this.montantToSend
                        };
                        console.log(this.dataSend);
                        return [4 /*yield*/, this.modalConroller.create({
                                component: depot_modal_component_1.DepotModalComponent,
                                componentProps: {
                                    'type': 'confirmation',
                                    'data': this.dataSend
                                },
                                cssClass: "mainAlert"
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.style.cssText = '--min-width: 250px; --max-width: 460px;';
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DepotComponent = __decorate([
        core_1.Component({
            selector: 'app-depot',
            templateUrl: 'depot.component.html',
            styleUrls: ['./depot.component.scss']
        })
    ], DepotComponent);
    return DepotComponent;
}());
exports.DepotComponent = DepotComponent;
