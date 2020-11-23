import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import ENV from 'client/config/environment';

export default class MainApplicationComponent extends Component {
    @tracked  activePage = 'profile';
    @service router;
    
    get isProfilePage(){
        return this.activePage === 'profile';
    }

    get isActiveBetPage(){
        return this.activePage === 'activebet';
    }

    get isCreateBetPage(){
        return this.activePage === 'createbet';
    }
    get isSignUpPage(){
        return this.activePage === 'signup';
    }


    @action
    navigateTo(page){
        this.activePage=page;
    }

    @action 
    logOut(){
        //log out request
        // const cookie = parseInt(this.router._router.currentRoute.attributes.cookie);
        const cookie = localStorage.getItem('cookie');
        
        $.post(`${ENV.APP.API_ENDPOINT}/auth/logout`, ({cookie:cookie}), (result)=>{
            if(result){
                this.router.transitionTo('login');
                console.log(result);
            }
        });  
    }
}
