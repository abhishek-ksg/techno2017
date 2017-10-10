import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { TechService } from '../../shared/techService'

@Component({
  selector: 'page-judgestandings',
  templateUrl: 'judgestandings.html',
})


export class Judgestandings {

  teamBallots : any[];
  
  constructor(
    private techService: TechService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    public navCtrl: NavController) {
    
  }

  ionViewDidEnter(){

    let loader = this.loadingController.create({
       content: 'Fetching Ballots...' 
    });

    
    loader.present().then( () => {
      this.techService.getAllBallotsArray();

      console.log("Ballots length " + this.techService.allBallots.length);
      loader.dismiss();
    }); 
    console.log("test");

  }
}
