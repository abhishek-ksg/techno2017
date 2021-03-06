import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { TechService } from '../../shared/techService'

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})


export class Standings {

  teams : any[];
  
  constructor(
    private techService: TechService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    public navCtrl: NavController) {
    
  }

  ionViewDidEnter(){

    this.teams = [];

    let loader = this.loadingController.create({
       content: 'Loading Standings...' 
    });

    loader.present().then( () => {

      this.techService.getTeamSuperData().then( data => {
        
        if(data){

          var res = [];
          for (var x in data){
            data.hasOwnProperty(x) && res.push(data[x])
          }

          this.teams = res;
        }

        loader.dismiss();
      });
    });

    
  }

}
