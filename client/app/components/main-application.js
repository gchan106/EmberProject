import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class MainApplicationComponent extends Component {
    @tracked  activePage = 'profile';
    @tracked betID = null;
    @tracked displayCreateBet = true;
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
        if(this.betID)
            this.displayCreateBet = false;
        else
            this.displayCreateBet = true;
    }
}
