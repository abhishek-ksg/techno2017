import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs';

@Injectable()
export class TechService {

    private baseUrl = 'https://technophilia-2017.firebaseio.com/';
    public judgeId : string = "";

    currentTeamBallot: any = {};
    
    constructor(private http: Http) {

    }

    getTeams(){
        return new Promise( resolve => {
            this.http.get(`${this.baseUrl}/teams.json`)
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

}