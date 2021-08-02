import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as animations from '@core/animations/router.animations';
import { trigger } from '@angular/animations';
import { HomeService } from '@core/services/components/home.service';

@Component({
  selector: 'app-cotizadores-selector',
  templateUrl: './cotizadores-selector.component.html',
  styleUrls: ['./cotizadores-selector.component.scss'],
  animations: [
    trigger('slideInOut', animations.SlideInOut() ),
    trigger('fadeIn', animations.SkeletonfadeIn() )
  ]
})
export class CotizadoresSelectorComponent implements OnInit {


  @Input() set show(value: boolean){
    this.status = value ? 'in' : 'out';
  }

  status: 'out' | 'in' = 'in';
  
  @Output() closeSelector: EventEmitter<boolean> = new EventEmitter<boolean>();

  list: object;

  activeItem: string;

  productListState: 'out' | 'in' = 'out';

  activeProducts: object[];

  emptyList: object[];

  loading: boolean;

  constructor(private homeService: HomeService) { 

    this.emptyList = [
      { id: 1 },{ id: 2 },{ id: 3 },{ id: 4 },{ id: 5 },{ id: 6 },
      { id: 7 },{ id: 8 },{ id: 9 },{ id: 10 },{ id: 1 },{ id: 2 },
      { id: 3 },{ id: 4 },{ id: 5 },{ id: 6 },{ id: 7 },{ id: 8 }
    ];

    this.loading = true;
    this.homeService.getRamos().subscribe( res => {
      console.log('Ramos cotizadores', res);
      this.list = res['ramos'];

      setTimeout( () => { 
        this.loading = false;
      }, 800);
      
    },
    error => {
      this.loading = false;
    })
  }


  ngOnInit() {
  }

  toggleSelector(){
    this.show = false;
    this.closeSelector.emit(false);
  }

  itemClicked(item: object){
    
    if(this.activeItem === item['o_menu']){
      this.activeItem = null;
    }else {
      this.activeItem = item['o_menu'];
      this.activeProducts = item['productos'];
      this.toggleProductList();
    }
    
  }

  toggleProductList(){
    this.productListState = this.productListState === 'out' ? 'in' : 'out';
  }

  menuClosed(){
    this.activeItem = null;
  }


  open(item){

    if(item['t_modulo'] !== 'ANGULAR'){

      let ldData = {
        title: item['etiqueta'],
        type : item['t_modulo'],
        o_menu: item['o_menu'],
        url : item['url'],
        help : item['url_ayuda']
      };

      console.log('open link producto = DATA load Module', JSON.stringify(ldData) );

      (<any>parent).loadModule(ldData);
    }
    
  }
}
