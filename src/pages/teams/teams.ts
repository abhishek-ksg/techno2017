import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { Ballots } from '../ballots/ballots'
import { Standings } from '../standings/standings'
import { TechService } from '../../shared/techService'

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})


export class Teams {
  
  teams : any;
  userId : string = "";
  judgeId : string = "";
  superJudgeId : string = "";
  pageTitle: string = "Judge's Login";

  eligibleJudgeId = ['judge1', 'judge2', 'judge3', 'judge4', 'judge5', 'judge6', 'judge7'];
  superUser = "superAdmin"

  constructor(
    private alertController: AlertController,
    public navCtrl: NavController, 
    private techService: TechService, 
    private loadingController: LoadingController) {
      this.judgeId = this.techService.judgeId;
      this.pageTitle = "Judge's Login";
  }

  ionViewDidLoad(){
    let loader = this.loadingController.create({
       content: 'Initializing...' 
    });

    loader.present().then( () => {
      this.techService.getTeams().then( data => {

        this.teams = data;
        loader.dismiss();
      } );
    });    
  }

  goToTeamBallot(event, team){
    this.navCtrl.push(Ballots, team);
  }

  getStandingsForSuperAdmin(){
    this.navCtrl.push(Standings);
  }

  login(){
      if( this.eligibleJudgeId.indexOf(this.userId) != -1){
        this.techService.judgeId = this.userId;
        this.judgeId = this.techService.judgeId;
        this.pageTitle = "Teams";
      }
      else if(this.userId === this.superUser){
        this.techService.judgeId = this.superUser;
        this.judgeId = this.techService.judgeId;
        this.superJudgeId = this.techService.judgeId;
        this.pageTitle = "Teams";
      }
      else {
        let alert = this.alertController.create({
          title: 'Not Authorized',
          buttons: [{
            text:'OK'
          }]
        });
        alert.present();
        this.userId = "";
      }
  }
}
