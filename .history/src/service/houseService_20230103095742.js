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

    static findByNameContaining(name) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`SELECT * FROM house WHERE name LIKE '%${nameHouse}%'`, (err, house) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(products);
                 }
             }) 
        })
    }
}

module.exports = HouseService;