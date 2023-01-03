const connection = require('../model/connection');
connection.connecting();

class CustomerService {
    static connect = connection.getConnection();
    static FindAllCustomer() {
        return new Promise((resolve, reject) => {
            CustomerService.connect.query('SELECT * FROM customer', (err, customers) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(customers);
                }
            })
        });
    }

    static findByNameCustomerContaining(nameCustomer) {
        return new Promise((resolve, reject) => {
            CustomerService.connect.query(`SELECT * FROM customer WHERE nameCustomer LIKE '%${nameCustomer}%'`, (err, customers) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(customers);
                 }
             }) 
        })
    }

    static saveCustomer(customer) {
        return new Promise((resolve, reject) => {
            CustomerService.connect.query(`INSERT INTO customer(nameHouse, typeRoom, addressHouse, amountBedroom, amountBathroom, description, pricePerDay, statusHouse) VALUES ('${house.nameHouse}', '${house.typeRoom}', '${house.addressHouse}', ${house.amountBedroom}, ${house.amountBathroom}, '${house.description}', ${house.pricePerDay}, 'Còn trống')`, (err, data) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(data);
                 }
             }) 
         })
    }

    static editImageCustomer(avatar, id) {
        return new Promise((resolve, reject) => {
            CustomerService.connect.query(`UPDATE customer SET avatar = '${avatar}' WHERE idHouse = ${id}`,(err, data) => {
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
            CustomerService.connect.query(`SELECT * FROM house WHERE idHouse = ${id}`, (err, houses) => {
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
            CustomerService.connect.query(`DELETE FROM house WHERE idHouse = ${id}`, (err) => {
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
            CustomerService.connect.query(`UPDATE house SET nameHouse = '${house.nameHouse}', typeRoom = '${house.typeRoom}', addressHouse = '${house.addressHouse}', amountBedroom = ${house.amountBedroom}, amountBathroom = ${house.amountBathroom}, description = '${house.description}', pricePerDay = ${house.pricePerDay}, statusHouse = '${house.statusHouse}' WHERE idHouse = ${id}`, (err, houses) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(houses);
                 }
             }) 
        })
    }
}

module.exports = CustomerService;