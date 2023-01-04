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

    static findByNameHouseContaining(nameHouse) {
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

    static saveHouse(house) {
        return new Promise((resolve, reject) => {
            HouseService.connect.query(`INSERT INTO house(nameHouse, typeRoom, addressHouse, amountBedroom, amountBathroom, description, pricePerDay, statusHouse, countCustomer) VALUES ('${house.nameHouse}', '${house.typeRoom}', '${house.addressHouse}', ${house.amountBedroom}, ${house.amountBathroom}, '${house.description}', ${house.pricePerDay}, 'Còn trống', 0)`, (err, data) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(data);
                 }
             }) 
         })
    }

    static editImageHouse(image, id) {
        return new Promise((resolve, reject) => {
            HouseService.connect.query(`UPDATE house SET image = '${image}' WHERE idHouse = ${id}`,(err, data) => {
                if (err) {
                    reject(err)
                } else {    
                    resolve(data)
                }
            })
        })
    }

    static findByIdHouse(id) {
        return new Promise((resolve, reject) => {
            HouseService.connect.query(`SELECT * FROM house WHERE idHouse = ${id}`, (err, house) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(house);
                 }
             }) 
        })
    }

    static removeHouse(id) {
        return new Promise((resolve, reject) => {
            HouseService.connect.query(`DELETE FROM house WHERE idHouse = ${id}`, (err) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve('Xoá thành công');
                 }
             }) 
         })
    }

    static updateHouse(house, id) {
        return new Promise((resolve, reject) => {
            HouseService.connect.query(`UPDATE house SET nameHouse = '${house.nameHouse}', typeRoom = '${house.typeRoom}', addressHouse = '${house.addressHouse}', amountBedroom = ${house.amountBedroom}, amountBathroom = ${house.amountBathroom}, description = '${house.description}', pricePerDay = ${house.pricePerDay} WHERE idHouse = ${id}`, (err, houses) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(houses);
                 }
             }) 
        })
    }

    static changeStatusRent(idHouse, count) {
        return new Promise((resolve, reject) => {
            HouseService.connect.query(`UPDATE house SET statusHouse = 'Đã thuê', countCustomer = ${+count} WHERE idHouse = ${idHouse}`, (err, status) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(status)
                }
            })
        });
    }

    static changeStatusCancel(idHouse, count) {
        return new Promise((resolve, reject) => {
            HouseService.connect.query(`UPDATE house SET statusHouse = 'Còn trống', countCustomer = ${+count} WHERE idHouse = ${idHouse}`, (err, status) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(status)
                }
            })
        });
    }

    static history() {
        return new Promise((resolve, reject) => {
            HouseService.connect.query(`SELECT * FROM house JOIN ordermanager ON house.idHouse = ordermanager.idHouse JOIN customer ON ordermanager.idCustomer = customer.idCustomer WHERE statusOrder = 'true'`, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            })
        });
    }
}

module.exports = HouseService;

