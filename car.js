const Model = require('./model');

class Car extends Model {
  static table() {
    return 'cars';
  }

  constructor() {
    super();
    this.pk = 'id';
    this.fields = ['id', 'user_id', 'model', 'year'];
    this.data = [];
  }

  toString(){
     return `Car data : [ ${this.data.join(', ')}]`;
    };

  setData(id, model, year){
    this.data = [0, id, model, year];
  }
}

module.exports = Car;
