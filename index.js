require('dotenv').config();
const mysql = require('mysql');
const util = require('util');
const Model = require('./model.js');
const User = require('./user.js');
const Car = require('./car.js');

// https://adonisjs.com/docs/4.0/lucid - Lucid Models

global.db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

global.db.query = util.promisify(global.db.query);

// Открыть с БД и вывести в консоль сузествующего пользователя с машинами
let user2 = new User();
(async function (){
    try{
        const user_id = 2;
        await user2.load(user_id);
        const res = await Car.loadAll();
        let cars = [];
        let n = 0;
        for (let i in res){
          cars[i] = new Car();
          j = 0;
          for (let key in res[i]){
            cars[i].data[j++] = res[i][key];
          }
          cars[i].pk = res[i][cars[i].fields[0]];
          if (user2.pk == cars[i].data[1]){
            user2.hasMany[n] = {
                model : cars[i],
                primaryKey : cars[i].data[0],
                foreignKey : cars[i].data[1]
                }
            n++;
          }
        }
    }catch(e){
        console.log('error\n');
        console.log(e);
    }
})().then(res => {
    console.log("-------------------------------------------------------")
    console.log("1)Открыть БД и вывести в консоль существующего пользователя с машинами");
    console.log("-------------------------------------------------------")
    console.log(user2.toString());
    console.log("-----------------END-------------------------------");
});

// Создать нового пользователя
 try{
        console.log("-------------------------------------------------------")
        console.log("2)Создать нового пользователя");
        console.log("-------------------------------------------------------")
        let user = new User()
        user.setData('Petr', 'Petrov', 25, 'M');
        user.save();
    }catch(e){
      console.log('error\n');
      console.log(e);
    }
  console.log("Пользователь добавлен");
  console.log("-----------------END----------------------------------");

// Изменить имя пользователю
(async function (){
    try{
        let user1 = new User();
        const user_id = 1;
        await user1.load(user_id);
        user1.setName('Ivan','Sidorov');
        //user1.setName('Ivan','Ivanov');
        user1.save();
    }catch(e){
        console.log('error\n');
        console.log(e);
    }
})().then(res => {
    console.log("-------------------------------------------------------");
    console.log("3)Изменить имя пользователя");
    console.log("-------------------------------------------------------");
    console.log("Пользователь изменен");
    console.log("-----------------END-------------------------------");
});

// Удалить пользователя
let user1 = new User;
(async function (){
    try{
        const result = await User.loadAll();
        let j = 0;
        for (let i in result){
           j++;
        }
        //delete last id
        user1.pk = result[--j].id;
    }catch(e){
        console.log('error\n');
        console.log(e);
    }
})().then(res => {
    console.log("-------------------------------------------------------");
    console.log("4)Удаление пользователя");
    console.log("-------------------------------------------------------");
    user1.delete();
    console.log("Пользователь удален");
    console.log("-----------------END-------------------------------");
});
// Добавить пользователю новую машину
let car = new Car();
(async function (){
    try{
        let user = new User();
        const user_id = 2;
        await user.load(user_id);
        car.setData(user.pk, 'BMW', '2018');
    }catch(e){
        console.log('error\n');
        console.log(e);
    }
  })().then(res => {
    console.log("-------------------------------------------------------");
    console.log("5)Добавление пользователю новой машини");
    console.log("-------------------------------------------------------");
    car.save();
    console.log("Машина добавлена");
    console.log("-----------------END-------------------------------");
  });
