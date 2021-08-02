'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">extranet-laholando documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AnuladosIncobrablesModule.html" data-type="entity-link">AnuladosIncobrablesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AnuladosIncobrablesModule-6e10d7a40df380432a4030b9a41e4ff8"' : 'data-target="#xs-components-links-module-AnuladosIncobrablesModule-6e10d7a40df380432a4030b9a41e4ff8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AnuladosIncobrablesModule-6e10d7a40df380432a4030b9a41e4ff8"' :
                                            'id="xs-components-links-module-AnuladosIncobrablesModule-6e10d7a40df380432a4030b9a41e4ff8"' }>
                                            <li class="link">
                                                <a href="components/AnuladosIncobrablesListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AnuladosIncobrablesListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AnuladosIncobrablesRoutingModule.html" data-type="entity-link">AnuladosIncobrablesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AnularIncobrablesModule.html" data-type="entity-link">AnularIncobrablesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AnularIncobrablesModule-6bb68c5e73b68cf1c8b0d7466a1cff18"' : 'data-target="#xs-components-links-module-AnularIncobrablesModule-6bb68c5e73b68cf1c8b0d7466a1cff18"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AnularIncobrablesModule-6bb68c5e73b68cf1c8b0d7466a1cff18"' :
                                            'id="xs-components-links-module-AnularIncobrablesModule-6bb68c5e73b68cf1c8b0d7466a1cff18"' }>
                                            <li class="link">
                                                <a href="components/AnularIncobrablesListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AnularIncobrablesListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AnularIncobrablesRoutingModule.html" data-type="entity-link">AnularIncobrablesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-0de1c9f365ba41486ff38e1998de91cb"' : 'data-target="#xs-components-links-module-AppModule-0de1c9f365ba41486ff38e1998de91cb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-0de1c9f365ba41486ff38e1998de91cb"' :
                                            'id="xs-components-links-module-AppModule-0de1c9f365ba41486ff38e1998de91cb"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-eda468ab2f894a936c4505b0448d4995"' : 'data-target="#xs-injectables-links-module-AuthModule-eda468ab2f894a936c4505b0448d4995"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-eda468ab2f894a936c4505b0448d4995"' :
                                        'id="xs-injectables-links-module-AuthModule-eda468ab2f894a936c4505b0448d4995"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComisionesFactPendModule.html" data-type="entity-link">ComisionesFactPendModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComisionesFactPendModule-a47a966b4f5cd96adb7ccecbf5025c2e"' : 'data-target="#xs-components-links-module-ComisionesFactPendModule-a47a966b4f5cd96adb7ccecbf5025c2e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComisionesFactPendModule-a47a966b4f5cd96adb7ccecbf5025c2e"' :
                                            'id="xs-components-links-module-ComisionesFactPendModule-a47a966b4f5cd96adb7ccecbf5025c2e"' }>
                                            <li class="link">
                                                <a href="components/ComisionesFactPendListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ComisionesFactPendListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComisionesFactPendRoutingModule.html" data-type="entity-link">ComisionesFactPendRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CuentaCorrienteModule.html" data-type="entity-link">CuentaCorrienteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CuentaCorrienteModule-1cbc1dd1908dcdd85eeaf62a1e0ae555"' : 'data-target="#xs-components-links-module-CuentaCorrienteModule-1cbc1dd1908dcdd85eeaf62a1e0ae555"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CuentaCorrienteModule-1cbc1dd1908dcdd85eeaf62a1e0ae555"' :
                                            'id="xs-components-links-module-CuentaCorrienteModule-1cbc1dd1908dcdd85eeaf62a1e0ae555"' }>
                                            <li class="link">
                                                <a href="components/CuentaCorrienteListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CuentaCorrienteListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CuentaCorrienteRoutingModule.html" data-type="entity-link">CuentaCorrienteRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DeudaExigibleModule.html" data-type="entity-link">DeudaExigibleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DeudaExigibleModule-f4ef3b6941174f36c6853c6910bfa371"' : 'data-target="#xs-components-links-module-DeudaExigibleModule-f4ef3b6941174f36c6853c6910bfa371"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DeudaExigibleModule-f4ef3b6941174f36c6853c6910bfa371"' :
                                            'id="xs-components-links-module-DeudaExigibleModule-f4ef3b6941174f36c6853c6910bfa371"' }>
                                            <li class="link">
                                                <a href="components/DeudaExigibleListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeudaExigibleListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeudaExigibleRoutingModule.html" data-type="entity-link">DeudaExigibleRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FormComponentsModule.html" data-type="entity-link">FormComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FormComponentsModule-78aabca93f32aea3420128443a679d53"' : 'data-target="#xs-components-links-module-FormComponentsModule-78aabca93f32aea3420128443a679d53"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormComponentsModule-78aabca93f32aea3420128443a679d53"' :
                                            'id="xs-components-links-module-FormComponentsModule-78aabca93f32aea3420128443a679d53"' }>
                                            <li class="link">
                                                <a href="components/AutocompleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AutocompleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatepickerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatepickerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RangeDatepickerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RangeDatepickerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RangeMonthyearpickerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RangeMonthyearpickerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoaderModule.html" data-type="entity-link">LoaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoaderModule-f064968776e45f0b45b1541e43e11d13"' : 'data-target="#xs-components-links-module-LoaderModule-f064968776e45f0b45b1541e43e11d13"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoaderModule-f064968776e45f0b45b1541e43e11d13"' :
                                            'id="xs-components-links-module-LoaderModule-f064968776e45f0b45b1541e43e11d13"' }>
                                            <li class="link">
                                                <a href="components/LoaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LoaderModule-f064968776e45f0b45b1541e43e11d13"' : 'data-target="#xs-injectables-links-module-LoaderModule-f064968776e45f0b45b1541e43e11d13"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoaderModule-f064968776e45f0b45b1541e43e11d13"' :
                                        'id="xs-injectables-links-module-LoaderModule-f064968776e45f0b45b1541e43e11d13"' }>
                                        <li class="link">
                                            <a href="injectables/LoaderService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LoaderService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PipesModule.html" data-type="entity-link">PipesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-PipesModule-86585e33c2eb8ebe7d07fbc48c62eb36"' : 'data-target="#xs-pipes-links-module-PipesModule-86585e33c2eb8ebe7d07fbc48c62eb36"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PipesModule-86585e33c2eb8ebe7d07fbc48c62eb36"' :
                                            'id="xs-pipes-links-module-PipesModule-86585e33c2eb8ebe7d07fbc48c62eb36"' }>
                                            <li class="link">
                                                <a href="pipes/FilterTablePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterTablePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ObjectKeysPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ObjectKeysPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/OrderByPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderByPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SearchPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RetencionesCtaCteModule.html" data-type="entity-link">RetencionesCtaCteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RetencionesCtaCteModule-c8e1c2989835c83236d9b4dd42265035"' : 'data-target="#xs-components-links-module-RetencionesCtaCteModule-c8e1c2989835c83236d9b4dd42265035"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RetencionesCtaCteModule-c8e1c2989835c83236d9b4dd42265035"' :
                                            'id="xs-components-links-module-RetencionesCtaCteModule-c8e1c2989835c83236d9b4dd42265035"' }>
                                            <li class="link">
                                                <a href="components/RetencionesCtaCteListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RetencionesCtaCteListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RetencionesCtaCteRoutingModule.html" data-type="entity-link">RetencionesCtaCteRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RetencionesIvaModule.html" data-type="entity-link">RetencionesIvaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RetencionesIvaModule-dcf0a9613a5e0d83d8ec3216d68748a2"' : 'data-target="#xs-components-links-module-RetencionesIvaModule-dcf0a9613a5e0d83d8ec3216d68748a2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RetencionesIvaModule-dcf0a9613a5e0d83d8ec3216d68748a2"' :
                                            'id="xs-components-links-module-RetencionesIvaModule-dcf0a9613a5e0d83d8ec3216d68748a2"' }>
                                            <li class="link">
                                                <a href="components/RetencionesIvaListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RetencionesIvaListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RetencionesIvaRoutingModule.html" data-type="entity-link">RetencionesIvaRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesModule.html" data-type="entity-link">ServicesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ServicesModule-50b4d75ca4c1bceebc1578b8b3179892"' : 'data-target="#xs-injectables-links-module-ServicesModule-50b4d75ca4c1bceebc1578b8b3179892"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ServicesModule-50b4d75ca4c1bceebc1578b8b3179892"' :
                                        'id="xs-injectables-links-module-ServicesModule-50b4d75ca4c1bceebc1578b8b3179892"' }>
                                        <li class="link">
                                            <a href="injectables/ApiService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ApiService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FormsValidatorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FormsValidatorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HttpClientService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>HttpClientService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ToasterService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ToasterService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TestModule.html" data-type="entity-link">TestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TestModule-2afd4c1cfcec83ee4b6bbe4a77546df3"' : 'data-target="#xs-components-links-module-TestModule-2afd4c1cfcec83ee4b6bbe4a77546df3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TestModule-2afd4c1cfcec83ee4b6bbe4a77546df3"' :
                                            'id="xs-components-links-module-TestModule-2afd4c1cfcec83ee4b6bbe4a77546df3"' }>
                                            <li class="link">
                                                <a href="components/FormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TestRoutingModule.html" data-type="entity-link">TestRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UiComponentsModule.html" data-type="entity-link">UiComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UiComponentsModule-9a1699caf87227f341b4da4500c8ca82"' : 'data-target="#xs-components-links-module-UiComponentsModule-9a1699caf87227f341b4da4500c8ca82"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UiComponentsModule-9a1699caf87227f341b4da4500c8ca82"' :
                                            'id="xs-components-links-module-UiComponentsModule-9a1699caf87227f341b4da4500c8ca82"' }>
                                            <li class="link">
                                                <a href="components/FiltersToolbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FiltersToolbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MaterialTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MaterialTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToogleColumnsBtnComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToogleColumnsBtnComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AnuladosIncobrables.html" data-type="entity-link">AnuladosIncobrables</a>
                            </li>
                            <li class="link">
                                <a href="classes/AnularIncobrables.html" data-type="entity-link">AnularIncobrables</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/ComisionesFactPend.html" data-type="entity-link">ComisionesFactPend</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeudaExigible.html" data-type="entity-link">DeudaExigible</a>
                            </li>
                            <li class="link">
                                <a href="classes/MatPaginatorIntlES.html" data-type="entity-link">MatPaginatorIntlES</a>
                            </li>
                            <li class="link">
                                <a href="classes/RetencionesCtaCte.html" data-type="entity-link">RetencionesCtaCte</a>
                            </li>
                            <li class="link">
                                <a href="classes/RetencionesIva.html" data-type="entity-link">RetencionesIva</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AnuladosIncobrablesService.html" data-type="entity-link">AnuladosIncobrablesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnularIncobrablesService.html" data-type="entity-link">AnularIncobrablesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ComisionesFactPendService.html" data-type="entity-link">ComisionesFactPendService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeudaExigibleService.html" data-type="entity-link">DeudaExigibleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RetencionesCtaCteService.html" data-type="entity-link">RetencionesCtaCteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RetencionesIvaService.html" data-type="entity-link">RetencionesIvaService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link">RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ColumnItem.html" data-type="entity-link">ColumnItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColumnItem-1.html" data-type="entity-link">ColumnItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColumnItem-2.html" data-type="entity-link">ColumnItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColumnItem-3.html" data-type="entity-link">ColumnItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColumnItem-4.html" data-type="entity-link">ColumnItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColumnItem-5.html" data-type="entity-link">ColumnItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Control.html" data-type="entity-link">Control</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControlItem.html" data-type="entity-link">ControlItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControlItem-1.html" data-type="entity-link">ControlItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControlItem-2.html" data-type="entity-link">ControlItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControlItem-3.html" data-type="entity-link">ControlItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControlItem-4.html" data-type="entity-link">ControlItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControlItem-5.html" data-type="entity-link">ControlItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControlItemOptions.html" data-type="entity-link">ControlItemOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControlItemOptions-1.html" data-type="entity-link">ControlItemOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControlItemOptions-2.html" data-type="entity-link">ControlItemOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControlItemOptions-3.html" data-type="entity-link">ControlItemOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControlItemOptions-4.html" data-type="entity-link">ControlItemOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControlItemOptions-5.html" data-type="entity-link">ControlItemOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControlOptions.html" data-type="entity-link">ControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControlOptions-1.html" data-type="entity-link">ControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Filter.html" data-type="entity-link">Filter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterItem.html" data-type="entity-link">FilterItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterItem-1.html" data-type="entity-link">FilterItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterItem-2.html" data-type="entity-link">FilterItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterItem-3.html" data-type="entity-link">FilterItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterItem-4.html" data-type="entity-link">FilterItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterItem-5.html" data-type="entity-link">FilterItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LabelItem.html" data-type="entity-link">LabelItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LabelItem-1.html" data-type="entity-link">LabelItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LabelItem-2.html" data-type="entity-link">LabelItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LabelItem-3.html" data-type="entity-link">LabelItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LabelItem-4.html" data-type="entity-link">LabelItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LabelItem-5.html" data-type="entity-link">LabelItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LabelOptions.html" data-type="entity-link">LabelOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LabelOptions-1.html" data-type="entity-link">LabelOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoaderState.html" data-type="entity-link">LoaderState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenResponse.html" data-type="entity-link">TokenResponse</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});