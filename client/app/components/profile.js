import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import ENV from 'client/config/environment';

export default class profileComponent extends Component {
    @tracked activePage = 'profile';
    @service router;
    @tracked username;
    @tracked id;
    @tracked desc;
    
    @tracked userInfo;
    @tracked betsApartOf = [];

    constructor(){
        super(...arguments);
        this.username = this.args.username;
        this.userInfo = null;
        this.betsCreated = [];
        //get bet info
        $.get(`${ENV.APP.API_ENDPOINT}/profile/apartOfBets`, {username: this.args.model.cookie}).done(betsApartOfList => {
          this.betsApartOf = betsApartOfList;
      });
}

    uploadFile(event) {
      var self = this;
      const reader = new FileReader();
      const file = event.target.files[0];
      let imageData;

      reader.onload = function() {
      imageData = reader.result;
      self = ('image', imageData);
      };

      if (file) {
        reader.readAsDataURL(file);
      }

      $('#preview-image').attr('src', event.target.result);

  }

  get notEmptyArray(){
    if(this.betsApartOf.length == 0)
        return false;
    else
        return true;
  }

  @action
  redirectToIndiv(id){
      this.args.betInfoHandler(id);
      this.args.changePage('createbet');
  }
};
