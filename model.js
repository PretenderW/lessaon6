class Model {
  // do magic
  //получение экземпляра одной строки с БД по первичному ключу
  load(){
      global.db.query(`SELECT * FROM ${this.constructor.table()} WHERE id = ${this.pk}`)
      .then(result=>{
        let j = 0;
        for (let key in result[0]){
          this.fields[j++] = result[0][key];
        }
      });
  }

  //получение массива экземпляров класса
 static loadAll(){
    return  global.db.query(`SELECT * FROM ${this.table()}`);
  }

  //сохранение в БД (если PK не задан - то создание, иначе - обновление)
  save(names){
    if (this.pk === 'id'){
      let str = `(${names.fields.slice(1).join(', ')} ) VALUES ( '${this.fields.slice(1).join("', '")} ')`
      //console.log(str);
      global.db.query(`INSERT INTO ${this.constructor.table()} ${str}`);
    }
    else {
        const n =  this.fields.length;
        let str=``;
        for (let i = 1;  i < n; i++){
           if (i != 1)
               str += `, `;
           str += `${names.fields[i]} = '${this.fields[i]}'`;
        }
      global.db.query(`UPDATE ${this.constructor.table()} SET ${str} WHERE id = ${this.pk}`);
      }
  }

  // удаление с БД
  delete(){
      global.db.query(`DELETE FROM ${this.constructor.table()} WHERE id = ${this.pk}`);
  }
}

module.exports = Model;
