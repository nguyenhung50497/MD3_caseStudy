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
            HouseService.connect.query(`INSERT INTO house(nameHouse, typeRoom, addressHouse, amountBedroom, amountBathroom, description, pricePerDay, statusHouse) VALUES ('${house.nameHouse}', '${house.typeRoom}', '${house.addressHouse}', ${house.amountBedroom}, ${house.amountBathroom}, '${house.description}', ${house.pricePerDay}, 'Còn trống')`, (err, data) => {
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

    static findById(id) {
        return new Promise((resolve, reject) => {
            HouseService.connect.query(`SELECT * FROM house WHERE idHouse = ${id}`, (err, houses) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(houses);
                 }
             }) 
        })
    }

    static remove(id) {
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

    static update(house, id) {
        return new Promise((resolve, reject) => {
            HouseService.connect.query(`UPDATE house SET nameHouse = '${house.nameHouse}', typeRoom = '${house.typeRoom}', addressHouse = '${house.addressHouse}', amountBedroom = ${house.amountBedroom}, amountBathroom = ${house.amountBathroom}, price = ${product.price}, description = '${product.description}', idCategory = '${product.idCategory}' WHERE id = ${id}`, (err, products) => {
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