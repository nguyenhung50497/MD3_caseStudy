const connection = require('../model/connection');
connection.connecting();

class HouseService {
    static connect = connection.getConnection();
    static FindAllHouse() {
        return new Promise((resolve, reject) => {
            HouseService.connect.query('SELECT * FROM house', (err, houses) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(houses);
                }
            })
        });
    }

    static findByNameContaining(nameHouse) {
        return new Promise((resolve, reject) => {
            HouseService.connect.query(`SELECT * FROM house WHERE nameHouse LIKE '%${nameHouse}%'`, (err, houses) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(houses);
                 }
             }) 
        })
    }

    static save(house) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`INSERT INTO my_database1.product(name, price, description, image, idCategory) VALUES ('${product.name}', ${product.price}, '${product.description}', '${product.image}', '${+product.idCategory}')`, (err, data) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(data);
                 }
             }) 
         })
    }
}

module.exports = HouseService;