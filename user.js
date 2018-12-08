const Model = require('./model');
const Car = require('./car');

class User extends Model {
  static table() {
    return 'users';
  }

  constructor() {
    super();
    this.pk = 'id';
    this.fields = ['id', 'first_name', 'last_name', 'age', 'gender'];
    this.hasMany = [
      {
        model: new Car(),
        primaryKey: 'id',
        foreignKey: 'user_id'
      }
    ];
    this.data = [];
  }

  toString(){
     let str = `User data : [ ${this.data.join(', ')}]\n`;
     for (let key in this.hasMany){
        str += `${this.hasMany[key].model}
        primaryKey: ${this.hasMany[key].primaryKey}
        foreignKey: ${this.hasMany[key].foreignKey}\n`;
      }
     return str;
   };

  setData(first_name, last_name, age, gender){
    this.data = [0, first_name, last_name, age, gender];
  }

  setName(first_name, last_name){
    this.data = [this.data[0], first_name, last_name, this.data[3], this.data[4]];
  }
}

module.exports = User;
