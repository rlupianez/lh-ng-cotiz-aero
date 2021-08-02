import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate, state, group, query } from '@angular/animations';
import { HomeService } from '@core/services/components/home.service';


export const SlideInOutAnimation = [
  trigger('slideInOut', [
      state('in', style({
          'max-height': '100%', 'opacity': '1', 'visibility': 'visible', padding: '1rem'
      })),
      state('out', style({
          'max-height': '0px', 'opacity': '0', 'visibility': 'hidden', padding: 0
      })),
      transition('in => out', [group([
          animate('400ms ease-in-out', style({
              'opacity': '0',  padding: 0
          })),
          animate('600ms ease-in-out', style({
              'max-height': '0px'
          })),
          animate('700ms ease-in-out', style({
              'visibility': 'hidden'
          }))
      ]
      )]),
      transition('out => in', [group([
          animate('1ms ease-in-out', style({
              'visibility': 'visible', padding: '1rem'
          })),
          animate('600ms ease-in-out', style({
              'max-height': '100%'
          })),
          animate('800ms ease-in-out', style({
              'opacity': '1'
          }))
      ]
      )])
  ]),
]

@Component({
  selector: 'app-favoritos-manager',
  templateUrl: './favoritos-manager.component.html',
  styleUrls: ['./favoritos-manager.component.scss'],
  animations: [
    SlideInOutAnimation
  ]
})
export class FavoritosManagerComponent implements OnInit {

  favoritos: object[] = [];

  initialStatusById: object = null;
  lastStatusById: object = null;
  maxFavsQty: number;
  status: 'in' | 'out';
  favsChanges: object = {
    add: [],
    remove: []
  }

  colsArray: any[];
  rowsArray: any[];
  
  @Input() set managerStatus(value: 'in' | 'out' ){
    this.status = value;

    this.homeService.getFavoritos().subscribe( 
      res => {
        if(res['disponibles']){
          this.favoritos = res['disponibles'];
          this.initialStatusById = this.getFavoritosStatus();
          this.maxFavsQty = res['cant_maxima'];
          this.calcRows();
        }
        
      }
    )
  };


  

  @Output() changesApplied: EventEmitter<any> = new EventEmitter<any>();


  constructor(private homeService: HomeService) { }

  ngOnInit() {
    /*
    this.favoritos = [
      { icon: 'home_car', title: 'Automoviles', favorite: true },
      { icon: 'home_family', title: 'Combinado Familiar', favorite: true },
      { icon: 'home_shopping_bag', title: 'Comercio', favorite: true },
      { icon: 'home_building', title: 'Consorcio' },
      { icon: 'home_factory', title: 'Indutrias' },
      { icon: 'home_calculator', title: 'Cotizadores', link: '/aeronavegacion/cotizar' },
      { icon: 'home_coin', title: 'Saldos' },
      { icon: 'home_umbrella', title: 'Siniestros' },
      { icon: 'home_document', title: 'Polizas', link: '/poliza-cartera/list' }
    ];
    */

    this.homeService.getFavoritos().subscribe( 
      res => {
        if(res['disponibles']){
          this.favoritos = res['disponibles'];
          this.initialStatusById = this.getFavoritosStatus();
          this.maxFavsQty = res['cant_maxima'];
        }
        
      }
    )

  }

  toggleFavorite(item, itemId){
    itemId = parseInt(itemId);
    if(this.maxFavsQty > this.selectedQty){
      this.favoritos[itemId]['seleccionado'] = this.favoritos[itemId]['seleccionado'] === 'S' ? 'N' : 'S'; 
    }else if(this.favoritos[itemId]['seleccionado'] === 'S'){
      this.favoritos[itemId]['seleccionado'] = 'N';
    }

    this.lastStatusById = this.getFavoritosStatus();
    this.favsChanges = this.getAddedDeletedFavs();
    
  }

  apply(){
    this.status = 'out';
    // this.changeStatus();
    this.lastStatusById = this.getFavoritosStatus();
    // se hace procesan los agregados y eliminado
    const favStatus = this.getAddedDeletedFavs();
    this.changesApplied.emit( { data: favStatus, show: false });
  }

  cancel(){
    this.status = 'out';
    this.changesApplied.emit( { show: false });
  }

  addFavorito(favorito){

  }

  changeStatus(){
    this.status = this.status === 'out' ? 'in' : 'out';
  }

  get selectedFavorites(){
    return this.favoritos.filter( element => {
      return element['seleccionado'] === 'S';
    });
  }

  getFavoritosStatus(){
    let favsByMenuId = {};

    for(let item of this.favoritos){

      // si posee o_menu (id menu)
      if(item['o_menu']){
        const id = item['o_menu'];

        if(item['seleccionado'] === 'S'){
          favsByMenuId[id] = true;
        }

        if(item['seleccionado'] === 'N'){
          favsByMenuId[id] = false;
        } 

      }

    }

    return favsByMenuId;

  }


  get selectedQty(){
    return this.selectedFavorites.length;
  }


  getAddedDeletedFavs(){
    let favs = {
      add: [],
      remove: []
    }

    let ids = Object.keys(this.lastStatusById);

    for(let id of ids){

      // si esta seleccionado y antes venia seleccionado
      if(this.lastStatusById[id] && !this.initialStatusById[id]){
        favs.add.push(id);
      }

      // si no esta seleccionado y antes estaba seleccionado
      if(!this.lastStatusById[id] && this.initialStatusById[id]){
        favs.remove.push(id);
      }
      
    }

    return favs;
  }


  getRowsByResolution(){
    const width = screen.width;
    let displayItems = 2;

    if(width > 875 && width < 1148 ){
      
      displayItems = 4;

    }

    if(width > 875 && width < 975 ){
      
      displayItems = 4;

    }

    if(width > 775 && width < 875 ){
      
      displayItems = 4;

    }

    if(width > 675 && width < 775 ){
      
      displayItems = 5;

    }

    if(width > 575 && width < 675 ){
      
      displayItems = 5;

    }

    if(width < 575 ){
      
      displayItems = 5;

    }


    return displayItems;
  }



  calcRows(){
    const qty = this.favoritos.length;
    const rowsQty = this.getRowsByResolution();
    const itemsPerRow = qty / rowsQty;

    let itemsKey = Object.keys(this.favoritos);
    this.rowsArray = [];
    
    for(let i = 0; i < itemsKey.length; i = i + itemsPerRow){
      
      if(i <= itemsKey.length){
        this.rowsArray.push(itemsKey.slice(i, i + itemsPerRow));
      }else{
        this.rowsArray.push(itemsKey.slice(i, itemsKey.length));
      }

     
    }

  }

}
