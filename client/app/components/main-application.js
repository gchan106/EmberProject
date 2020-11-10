import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class MainApplicationComponent extends Component {
    @tracked  activePage = 'profile';
    @service router;

    get isProfilePage(){
        return this.activePage === 'profile';
    }

    @action
    navigateTo(page){
        this.activePage=page;
    }

    @action 
    logOut(){
        //log out request
        this.router.transitionTo('login');
    }
}
