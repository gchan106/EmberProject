import Component from '@glimmer/component';
import {action} from '@ember/object'; 
import $ from 'jquery';
import ENV from 'client/config/environment';
import { inject as service } from '@ember/service';

export default class NavbarComponent extends Component {
    @service router;

    @action
    redirectToProfilePage(){
        this.args.changePage('profile')
        // this.router.transitionTo('home');
    }

    @action
    redirectToActiveBetsPage(){
        this.args.changePage('activebet')
        //Active Bets Page is the Home Page
        //this.router.transitionTo('home');
    }

    @action
    redirectToCreateBetPage(){
        this.args.betInfoHandler(null)
        this.args.changePage('createbet')
        //this.router.transitionTo('createbet');
    }  

    @action 
    logOut(){
        const cookie = localStorage.getItem('cookie');       
        $.post(`${ENV.APP.API_ENDPOINT}/auth/logout`, ({cookie:cookie}), (result)=>{
            if(result){
                this.router.transitionTo('login');
            }
        });  
    }
}
