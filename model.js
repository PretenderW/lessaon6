class Model {
  // do magic
  //получение экземпляра одной строки с БД по первичному ключу
  load(id){
      return global.db.query(`SELECT * FROM ${this.constructor.table()} WHERE ${this.fields[0]} = ${id}`)
      .then(result=>{
        let j = 0;
        this.pk = result[0][this.fields[0]];
        for (let key in result[0]){
          this.data[j++] = result[0][key];
        }
        return this;
      });
  }

  //получение массива экземпляров класса
 static loadAll(){
    return  global.db.query(`SELECT * FROM ${this.table()}`);
  }

  //сохранение в БД (если PK не задан - то создание, иначе - обновление)
  save(){
    if ((0 == this.pk) || ('undefined' == this.pk) || ('id' == this.pk)){
      let str = `(${this.fields.slice(1).join(', ')} ) VALUES ( '${this.data.slice(1).join("', '")} ')`
      global.db.query(`INSERT INTO ${this.constructor.table()} ${str}`);
    }
    else {
        let str = this.fields.map((item,i)=>{
            return `${this.fields[i]} = '${this.data[i]}'`});
         str.slice(1).join(', ')
      global.db.query(`UPDATE ${this.constructor.table()} SET ${str} WHERE ${this.fields[0]} = ${this.pk}`);
    }
  }

  // удаление с БД
  delete(){
      global.db.query(`DELETE FROM ${this.constructor.table()} WHERE ${this.fields[0]} = ${this.pk}`);
  }
}

module.exports = Model;
