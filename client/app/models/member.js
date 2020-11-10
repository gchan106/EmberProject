import Model, { attr } from '@ember-data/model';

export default class MemberModel extends Model {
  @attr('string') name;
  @attr('number') age;
}
