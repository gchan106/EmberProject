import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class MainApplicationComponent extends Component {
    @tracked  activePage = 'profile';
    @tracked betID = null;
    @tracked displayCreateBet = true;
    @tracked isAdmin = false;
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
    betInfoHandler(id){
        this.betID = id;
        if(this.betID){
            this.displayCreateBet = false;
            this.isAdmin = false;
            }
        else
            this.displayCreateBet = true;
            //this.isAdmin = true;
    }
    
    @action
    betJoin(id){
        this.betID = id;
        this.displayCreateBet = false;
        this.isAdmin = false;
    }
}
