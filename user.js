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
  }

  toString(){
     let str = `User pk : ${this.pk}  fields : [ ${this.fields.join(', ')}]\n`;
     for (let key in this.hasMany){
        str += `${this.hasMany[key].model}
        primaryKey: ${this.hasMany[key].primaryKey}
        foreignKey: ${this.hasMany[key].foreignKey}\n`;
      }
     return str;
   };

  setData(first_name, last_name, age, gender){
    this.fields = [this.fields[0], first_name, last_name, age, gender];
  }

  setName(first_name, last_name){
    this.fields = [this.fields[0], first_name, last_name, this.fields[3], this.fields[4]];
  }

}

module.exports = User;
