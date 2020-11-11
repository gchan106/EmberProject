import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'


export default class FriendsListComponent extends Component {

    @tracked friendsListData

    constructor(){
        super(...arguments)

        let fakeFriendsData = [{firstName: "Jasper", lastName: "Caballero", img: "http://placekitten.com/200/300"} , {firstName: "Daniel", lastName: "Dolan", img:"http://placekitten.com/300/300"}, {firstName: "Victoria", lastName: "Fischer", img: "http://placekitten.com/201/300"}]
        this.friendsListData = fakeFriendsData

        console.log(this.friendsListData)
    }


}