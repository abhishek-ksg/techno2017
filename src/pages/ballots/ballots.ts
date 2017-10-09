import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { TechService } from '../../shared/techService'

import firebase from 'firebase';

@Component({
  selector: 'page-ballots',
  templateUrl: 'ballots.html',
})


export class Ballots {
  
  team: any;
  ballot: any = {};

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController, 
    private navParam: NavParams, 
    private techService: TechService,
    private loadingController: LoadingController) {

      this.team = this.navParam.data;
  }

  ionViewDidEnter(){

    this.ballot = {};

    let loader = this.loadingController.create({
       content: 'Loading Ballot...' 
    });

    loader.present().then( () => {

      this.techService.getTeamBallotData(this.team.id).then( data => {
        
        if(data){

          this.ballot.innovation = data['innovation'];
          this.ballot.implementation = data['implementation'];
          this.ballot.impact = data['impact'];
          this.ballot.presentation = data['presentation'];
          this.ballot.battle = data['battle'];
          this.ballot.savedCount = data["savedCount"]

        }

        loader.dismiss();
      });
    });

    
  }

  submitTeamBallot(){

    var ref = firebase.database().ref(`team-data/${this.team.id}/ballot/${this.techService.judgeId}`);

    var validationResult = this.validateForm();

    if(!validationResult){
        let alert = this.alertController.create({
          title: 'Validation Error',
          
          buttons: [{
            text:'OK'
          }]
        });
        alert.present();
    }
    else {
      var total = Number(this.ballot.innovation) + Number(this.ballot.implementation) + Number(this.ballot.impact) + Number(this.ballot.presentation) + Number(this.ballot.battle);
      ref.update( {
          "total": total,
					"savedCount": ++this.ballot.savedCount,
					"innovation": this.ballot.innovation,
					"implementation": this.ballot.implementation,
					"impact": this.ballot.impact,
					"presentation": this.ballot.presentation,
					"battle": this.ballot.battle
      });  
    }
    
  }

  validateForm() : boolean{

    var validationResult = true;

    if(this.ballot.innovation == "" || this.ballot.innovation > 10){
      validationResult = false;
    }  
    else if(this.ballot.implementation == "" || this.ballot.implementation > 15){
      validationResult = false;
    }
    else if(this.ballot.impact == "" || this.ballot.impact > 10){
      validationResult = false;
    }
    else if(this.ballot.presentation == "" || this.ballot.presentation > 5){
      validationResult = false;
    }
    else if(this.ballot.battle == "" || this.ballot.battle > 10){
      validationResult = false;
    }

    return validationResult;
  }

}
