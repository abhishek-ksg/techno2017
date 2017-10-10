import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { Ballots } from '../ballots/ballots'
import { Standings } from '../standings/standings'
import { Judgestandings } from '../judgestandings/judgestandings'
import { TechService } from '../../shared/techService'


@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})


export class Teams {
  
  teams : any;
  userId : string = "";
  judgeName : string = "";
  judgeId : string = "";
  superJudgeId : string = "";
  pageTitle: string = "Judge's Login";

  eligibleJudges : any;
  superUser = "superuser";

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
        this.techService.allTeams = this.teams;
        
      } ).then( () => {
        this.techService.getJudges().then( data => {

        this.eligibleJudges = data;
        loader.dismiss();
        } );      
      } );

      
    });    
  }

  goToTeamBallot(event, team){
    this.navCtrl.push(Ballots, team);
  }

  getStandingsForSuperAdmin(){
    this.navCtrl.push(Standings);
  }

  getStandingsForJudge(){
    this.navCtrl.push(Judgestandings);
  }

  login(){

     this.userId = this.userId.toLowerCase();  
      if( this.checkValidJudge() ){
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

  checkValidJudge() : boolean{
    var validJudge : boolean = false;
    if(this.eligibleJudges && this.eligibleJudges.length){
      for(var i=0; i<this.eligibleJudges.length; i++){
        if(this.userId === this.eligibleJudges[i].id){
          validJudge = true;
          this.judgeName = this.eligibleJudges[i].name;
          break;
        }
      }
    }
    return validJudge;
  }
}
