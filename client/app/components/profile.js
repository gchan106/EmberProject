import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
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
    @tracked betsCreated = [];

    constructor(){
        super(...arguments);
        this.username = this.args.username;
        this.userInfo = null;
        this.betsCreated = [];
        //get user info
        $.get(`${ENV.APP.API_ENDPOINT}/profile/getUsersBets?username=`+this.username).done(betsUserCreatedList => {
          this.betsCreated = betsUserCreatedList;
        });
        //get bet info
        $.get(`${ENV.APP.API_ENDPOINT}/profile/apartOfBets`, ({username: this.username}), (betsUserCreatedList) => {
          this.betsCreated = betsUserCreatedList;
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
};
