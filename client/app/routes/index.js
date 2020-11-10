import Route from '@ember/routing/route';
import { inject as service} from "@ember/service";

const FAKE_COOKIES = 123123123
export default class IndexRoute extends Route {
    @service store;
    model() {
        debugger;
        return this.store.queryRecord('member', {userCookie: FAKE_COOKIES}) // see ES6 Promise specification for
    }
}
