import Component from '@glimmer/component';
import {action} from '@ember/object'; 
// import { inject as service }from '@ember/service';

export default class NavbarComponent extends Component {
    // @service router;

    // @action
    // redirectToSignInPage(){
    //     //this.router.transitionTo('/');
    // }

    @action
    redirectToSignUpPage(){
        this.args.changePage('signup')
        //this.router.transitionTo('signup');
    }

    @action
    redirectToProfilePage(){
        this.args.changePage('profile')
        //this.router.transitionTo('profile');
    }

    @action
    redirectToActiveBetsPage(){
        this.args.changePage('activebets')
        //Active Bets Page is the Home Page
        //this.router.transitionTo('home');
    }

    @action
    redirectToCreateBetPage(){
        this.args.changePage('createbet')
        //this.router.transitionTo('createbet');
    }    
}
