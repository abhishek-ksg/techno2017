import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

import 'rxjs';

import {Observable} from 'rxjs/Rx';

@Injectable()
export class TechService {

    private baseUrl = 'https://technophilia-2017.firebaseio.com/';
    public judgeId : string = "";
    public allBallots : any[] = [];
    currentTeamBallot: any = {};
    public allTeams: any[] = [];
    public allTeamsId : string[] = [];
    
    constructor(private http: Http, public loadingController: LoadingController) {

    }

    getTeams(){
        return new Promise( resolve => {
            this.http.get(`${this.baseUrl}/teams.json`)
                .subscribe( res => resolve(res.json()));
        });
    }

    getJudges(){
        return new Promise( resolve => {
            this.http.get(`${this.baseUrl}/judges.json`)
                .subscribe( res => resolve(res.json()));
        });
    }

    getTeamBallotData(teamId){
        return new Promise( resolve => {
            this.http.get(`${this.baseUrl}/team-data/${teamId}/ballot/${this.judgeId}.json`)
                .subscribe( res => {

                     this.currentTeamBallot = res.json();   
                     resolve( res.json() )   

                } );     
        });
    }

    getTeamSuperData(){
        if(this.judgeId === "superAdmin"){
            return new Promise( resolve => {
            this.http.get(`${this.baseUrl}/team-data.json`)
                .subscribe( res => resolve(res.json()));
            });
        }
    }

    getAllBallotsArray(){

        this.allTeamsId = this.getTeamsIdFromTeams();

        let loader = this.loadingController.create({
            content: 'Fetching Ballots...' 
        });

        loader.present().then( () => {
            Observable.forkJoin(
                this.allTeamsId.map(
                    teamId => this.http.get(`${this.baseUrl}/team-data/${teamId}/ballot/${this.judgeId}.json`)
                        .map(res => res.json())
                )
            ).subscribe(
                ballot => {
                    this.allBallots = ballot;
                    loader.dismiss();
                }
            );
            
        }); 

        
    }

    getTeamsIdFromTeams() : string[]{

        for(var i=0; i<this.allTeams.length; i++){
            this.allTeamsId.push(this.allTeams[i].id);
        }

        return this.allTeamsId;
    }

}