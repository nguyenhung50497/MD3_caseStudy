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
        return new Promise((resolve, reject) => {
            HouseService.connect.query(`INSERT INTO house(nameHouse, typeRoom, addressHouse, amountBedroom, amountBathroom, description, pricePerDay, statusHouse) VALUES ('${house.nameHouse}', '${house.typeRoom}', '${house.addressHouse}', ${house.amountBedroom}, ${house.amountBathroom}, '${}', 70, 'Còn trống')`, (err, data) => {
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