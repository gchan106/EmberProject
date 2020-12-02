import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'
import $ from 'jquery';
import ENV from 'client/config/environment';
//import { model } from 'mongoose';

export default class FriendsListComponent extends Component {

    @tracked friendsListData

    constructor(){
        super(...arguments)

        //is there
        //${this.args.model.username}
        $.get(`${ENV.APP.API_ENDPOINT}/friends/friendlist?username=${this.args.model.username}`).done(friendList => {
            this.friendsListData = friendList
        })
        // let fakeFriendsData = [{firstName: "Jasper", lastName: "Caballero", img: "http://placekitten.com/200/300"} , {firstName: "Daniel", lastName: "Dolan", img:"http://placekitten.com/300/300"}, {firstName: "Victoria", lastName: "Fischer", img: "http://placekitten.com/201/300"}]
        // this.friendsListData = fakeFriendsData

        console.log(this.friendsListData)
    }


}