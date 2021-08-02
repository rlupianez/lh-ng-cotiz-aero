import { Component, OnInit } from '@angular/core';
import { HomeService } from '@core/services/components/home.service';
import { trigger } from '@angular/animations';

import * as animations  from '@core/animations/router.animations';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
  animations: [ 
    trigger('fadeIn', animations.SkeletonfadeIn()),
    trigger('fadeOut', animations.SkeletonfadeOut()),
   
  ]
})
export class HeaderNavComponent implements OnInit {

  notificaciones: object[];
  notifQty: number = 0;
  initialLoading: boolean;

  constructor(private homeService: HomeService) { }

  ngOnInit() {

    this.initialLoading  = true;
    this.homeService.getAlert().subscribe( res => {
      if(res['p_list_alertas']){
        this.notificaciones= res['p_list_alertas'];
        this.notifQty = res['p_list_alertas'].length;
      }
      this.initialLoading = false;
    },
    error =>{
      this.initialLoading = false;
    });

  }


  openNotif(item){
    // console.log('notif', item);
    window.open(item['url_link'], '_blank');
  }

  

}
