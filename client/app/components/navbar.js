import Component from '@glimmer/component';
import {action} from '@ember/object'; 
import { inject as service }from '@ember/service';

export default class NavbarComponent extends Component {
    @service router;

    // @action
    // redirectToSignInPage(){
    //     //this.router.transitionTo('/');
    // }

    @action
    redirectToSignUpPage(){
        //this.router.transitionTo('signup');
    }

    @action
    redirectToProfilePage(){
        //this.router.transitionTo('profile');
    }

    @action
    redirectToActiveBetsPage(){
        //Active Bets Page is the Home Page
        //this.router.transitionTo('home');
    }

    @action
    redirectToCreateBetPage(){
        //this.router.transitionTo('createbet');
    }    
}
