import { Injectable } from '@angular/core';
import { ProductorDataService } from '@shared/productor-data/services/productor-data.service';
import { TakerDataService } from '@shared/taker-data/services/taker-data.service';
import { AdjustmentDataService } from '@shared/adjustment-data/services/adjustment-data.service';
import { ConditionsBenefitsCommercialDataService } from '@shared/conditions-benefits-commercial-data/services/conditions-benefits-commercial-data.service';
import { PlansDataService } from '@shared/plans-data/services/plans-data.service';
import { UniformCapitalDataService } from '@shared//uniform-capital-data/services/uniform-capital-data.service';
import { fixedCapital as FixedCapital, UniformCapitalTypeEnum, variableCapital as VariableCapital, fixedWithEmployeesCapital as FixedWithEmployeesCapital, quoteUniformCapital as QuoteUniformCapital } from '@shared//uniform-capital-data/services/uniform-capital-data.interfaces'
import { InsuredService } from '../insured/insured.service';
import { CoverageService } from '../coverage/coverage.service';
import { emitTaker as EmitTaker } from '@shared//emit-taker-data/services/emit-taker-data.interfaces';
import { EmitTakerDataService } from '@shared/emit-taker-data/services/emit-taker-data.service';
import { fields as field_law, group as group_law } from '../insured/model/law-employment-contract';
import { fields as field_com_agre, group as group_com_agre } from '../insured/model/commercial-agreement';
import { fields as field_rural, group as group_rural } from '../insured/model/rural-employees';
import { fields as field_optional, group as group_optional } from '../insured/model/optional-death-disability';
import { fields as field_profeet, group as group_profeet } from '../insured/model/optional-profeet';
import { fields as field_burial, group as group_burial } from '../insured/model/burial';
import { fields as field_debit_balance, group as group_debit_balance } from '../insured/model/debit-balance';
import { fields as field_collective, group as group_dcollective } from '../insured/model/mandatory-collective';
import { fields, group } from '../roster/roster';
import { PlansDataFieldEnum } from '@shared/plans-data/services/plans-data.interfaces';
import { simpleConditionsBenefitsCommercial as SimpleConditionsBenefitsCommercial, addCardConditionsBenefitsCommercial as AddCardConditionsBenefitsCommercial } from '@shared/conditions-benefits-commercial-data/services/conditions-benefits-commercial-data.interfaces';
import { RosterService } from '../roster/roster.service';
import { EditableService } from '../editable-table/editable.service';
import { fields as f_ben, group as gr_ben } from '../editable-table/model/beneficiary';
import { fields as f_fre, group as gr_fre } from '../editable-table/model/payment_frequency';
import { ClonerService } from '@shared/services/clone.service';
import { quote as QuoteTakeData } from '@shared//taker-data/services/taker-data.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LifeQuoteService {
  hasRosted: boolean = false;
  hasInsured: boolean = false;
  product: string;
  simpleConditionsBenefitsCommercial = SimpleConditionsBenefitsCommercial;
  addCardConditionsBenefitsCommercial = AddCardConditionsBenefitsCommercial;
  fixedCapital = FixedCapital;
  fixedWithEmployeesCapital = FixedWithEmployeesCapital;
  variableCapital = VariableCapital;
  quoteUniformCapital = QuoteUniformCapital;
  emitTaker = EmitTaker;
  quoteTakeData = QuoteTakeData;

  plansFields = {
    'CATEGORY_1': () => {
      //(1) SEGURO DE VIDA OBLIGATORIO
      this.createRosterTable(fields, group);
      this.hasInsured = false;
      this.hasRosted = true;
    },
    'CATEGORY_2': () => {
      this.createInsuredtable(field_law, group_law);
      this.hasInsured = true;
      this.hasRosted = false;
      // (2) LEY DE CONTRATO DE TRABAJO
    },
    'CATEGORY_3': () => {
      this.createInsuredtable(field_com_agre, group_com_agre);
      this.hasInsured = true;
      this.hasRosted = false;
      //(3) CONVENIO MERCANTIL (C.C.T. 130/75)
    },
    'CATEGORY_157': () => {
      //(157) UNIFORMES $ 10.000.-
    },
    'CATEGORY_206': () => {
      this.createInsuredtable(field_rural, group_rural);
      this.hasInsured = true;
      this.hasRosted = false;
      //(206) SEGURO DE VIDA COLECTIVO EMP RURALES
    },
    'CATEGORY_216': () => {
      this.createInsuredtable(field_profeet, group_profeet);
      this.hasInsured = true;
      this.hasRosted = false;
      //(216) OPTATIVO MULTIPLO 12 SUELDOS
    },
    'CATEGORY_269': () => {
      this.createInsuredtable(field_profeet, group_profeet);
      this.hasInsured = true;
      this.hasRosted = false;
      //(269)SEGURO OPTATIVO MULTIPLO 30 SUELDOS
    },
    'CATEGORY_505': () => {
      //(505) SEGURO OPTATIVO MUERTE/INVALIDEZ
    },
    'CATEGORY_559': () => {
      //(559) OPTATIVO - MUERTE/INVALIDEZ/ACCIDENTE
    },
    'CATEGORY_617': () => {
      this.createInsuredtable(field_profeet, group_profeet);
      this.hasInsured = true;
      this.hasRosted = false;
      //(617) OPTATIVO MULTIPLO 24 SUELDOS
    },
    'CATEGORY_675': () => {
      this.createInsuredtable(field_profeet, group_profeet);
      this.hasInsured = true;
      this.hasRosted = false;
      //(675) OPTATIVO MULTIPLO 10 SUELDOS
    },
    'CATEGORY_676': () => {
      this.createInsuredtable(field_profeet, group_profeet);
      this.hasInsured = true;
      this.hasRosted = false;
      //(676) OPTATIVO MULTIPLO 5 SUELDOS
    },
    'CATEGORY_1052': () => {
      this.createInsuredtable(field_debit_balance, group_debit_balance);
      this.hasInsured = true;
      this.hasRosted = false;
      /// (1052) DEUDOR (MUERTE) SEC 23 "$"
    },
    'CATEGORY_1072': () => {
      this.createInsuredtable(field_burial, group_burial);
      this.hasInsured = true;
      this.hasRosted = false;
      // (1072) Sepelio individual reintegro
      // (1072)  Sepelio colectivo reintegro
      // (1072)  Sepelio colectivo prestacional
    },
  }

  //fusionar con el mapping de arriba
  uniforms = {
    'CATEGORY_1': UniformCapitalTypeEnum.ColectivoObligatorio, // Capital fijo con empleados
    'CATEGORY_206': UniformCapitalTypeEnum.EmpleadosRurales, // Capital fijo con empleados
    'CATEGORY_505': UniformCapitalTypeEnum.MuerteInvalidez, // capital variable
    'CATEGORY_559': UniformCapitalTypeEnum.MuerteInvalidez, // capital variable
    'CATEGORY_1072': UniformCapitalTypeEnum.Sepelio, // capital variable
    'CATEGORY_2': UniformCapitalTypeEnum.LeydeContratodeTrabajo, // no tiene
    'CATEGORY_3': UniformCapitalTypeEnum.ConvenioMercantil,  // no tiene
    'CATEGORY_269': UniformCapitalTypeEnum.MultiplosdeSueldos, // no tiene
    'CATEGORY_617': UniformCapitalTypeEnum.MultiplosdeSueldos, // no tiene
    'CATEGORY_676': UniformCapitalTypeEnum.MultiplosdeSueldos, // no tiene
    'CATEGORY_675': UniformCapitalTypeEnum.MultiplosdeSueldos, // no tiene
    'CATEGORY_1052': UniformCapitalTypeEnum.SaldoDeudor, // no tiene
  }

  constructor(
    private clonerService: ClonerService,
    private emitTakerDataService: EmitTakerDataService,
    private productorDataService: ProductorDataService,
    private takerDataService: TakerDataService,
    private adjustmentDataService: AdjustmentDataService,
    private conditionsBenefitsCommercialDataService: ConditionsBenefitsCommercialDataService,
    private plansDataService: PlansDataService,
    private uniformCapitalFixedDataService: UniformCapitalDataService,
    private uniformCapitalVariableDataService: UniformCapitalDataService,
    private uniformCapitalFixedWithEmployeesDataService: UniformCapitalDataService,
    private uniformCapitalQuoteDataService: UniformCapitalDataService,
    private insuredDataService: InsuredService,
    private _rosterService: RosterService,
    private editableService: EditableService,
  ) {

    this.productorDataService.initPanel(true);
    this.takerDataService.initPanelWithType(true, QuoteTakeData);
    this.adjustmentDataService.initPanel(true);
    this.conditionsBenefitsCommercialDataService.initPanelWithType(true, this.simpleConditionsBenefitsCommercial);
    this.plansDataService.initPanel(true);

    //uniformCapitalFixedDataService
    this.uniformCapitalFixedDataService = clonerService.deepClone(uniformCapitalFixedDataService);
    this.uniformCapitalFixedDataService.initPanelWithType(true, this.fixedCapital);

    //uniformCapitalVariableDataService
    this.uniformCapitalVariableDataService = clonerService.deepClone(uniformCapitalVariableDataService);
    this.uniformCapitalVariableDataService.initPanelWithType(true, this.variableCapital);

    //uniformCapitalFixedWithEmployeesDataService
    this.uniformCapitalFixedWithEmployeesDataService = clonerService.deepClone(uniformCapitalFixedWithEmployeesDataService);
    this.uniformCapitalFixedWithEmployeesDataService.initPanelWithType(true, this.fixedWithEmployeesCapital);

    //uniformCapitalQuoteDataService
    this.uniformCapitalQuoteDataService = clonerService.deepClone(uniformCapitalQuoteDataService);
    this.uniformCapitalQuoteDataService.initPanelWithType(true, this.quoteUniformCapital);


    this.emitTakerDataService.initPanelWithType(true, this.emitTaker);// este no se si va aca o en otra pantalla
    this.observables();

    //mock
    const product = `CATEGORY_1052`;
    this.setTableData(product)
  }

  uniformCapitalTypeValue = 0;
  get uniformCapitalTypeEnum() {
    return this.uniformCapitalTypeValue;
  }

  observables() {
    const formGroup = this.plansDataService.formGroup;
    if (!formGroup) return;

    const product = formGroup.controls[PlansDataFieldEnum.product];
    product.valueChanges.subscribe(value => {
      if (value) {
        const product = `CATEGORY_${value}`;
        this.setTableData(product)
      }
    })
  }

  setTableData(product: string) {
    this.product = product;
    this.plansFields[product]();
    this.insuredDataService.setProduct(product);
    console.log(product);
    this.uniformCapitalTypeValue = this.uniforms[product];
  }


  createRosterTable(field, group) {
    const table = {
      Cotizar: {
        fields: { ...field },
        group: { ...group }
      }
    }
    this._rosterService.initializeForms(table);
    setTimeout(() => {
      const elements = [{}];
      this._rosterService.setTableData(elements)
    }, 500);
  }


  // pasarle el producto 
  createInsuredtable(field, group) {
    const table = {
      Cotizar: {
        fields: { ...field },
        group: { ...group }
      }
    }
    this.insuredDataService.initializeForms(table);
    setTimeout(() => {
      const elements = [{}];
      this.insuredService.setTableData(elements)
    }, 500);
  }


  get rosterService() {
    return this._rosterService;
  }

  get insuredService() {
    return this.insuredDataService;
  }
  get productorService() {
    return this.productorDataService;
  }

  get takerService() {
    return this.takerDataService;
  }

  get adjustmentService() {
    return this.adjustmentDataService;
  }

  get conditionsBenefitsCommercialService() {
    return this.conditionsBenefitsCommercialDataService;
  }

  get plansService() {
    return this.plansDataService;
  }

  get uniformCapitalFixedService() {
    return this.uniformCapitalFixedDataService;
  }

  get uniformCapitalVariableService() {
    return this.uniformCapitalVariableDataService;
  }

  get uniformCapitalFixedWithEmployeesService() {
    return this.uniformCapitalFixedWithEmployeesDataService;
  }

  get emitTakerService() {
    return this.emitTakerDataService;
  }

  get uniformCapitalQuoteService() {
    return this.uniformCapitalQuoteDataService;
  }


}
