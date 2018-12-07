const Model = require('./model');

class Car extends Model {
  static table() {
    return 'cars';
  }

  constructor() {
    super();
    this.pk = 'id';
    this.fields = ['id', 'user_id', 'model', 'year'];
  }

  toString(){
     return `Car pk : ${this.pk} fields : [ ${this.fields.join(', ')}]`;
    };

  setData(id, model, year){
    this.fields = [this.fields[0], id, model, year];
  }
}

module.exports = Car;
