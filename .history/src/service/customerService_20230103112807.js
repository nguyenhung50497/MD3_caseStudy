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
            CustomerService.connect.query(`INSERT INTO customer(nameCustomer, yearOfBirth, addressCustomer, phoneNumber, email, userName, password) VALUES ('${customer.nameCustomer}', ${customer.yearOfBirth}, '${customer.addressCustomer}', ${customer.phoneNumber}, '${customer.email}', '${customer.userName}', '${customer.password}')`, (err, data) => {
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
            CustomerService.connect.query(`UPDATE customer SET avatar = '${avatar}' WHERE idCustomer = ${id}`,(err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    static findByIdCustomer(id) {
        return new Promise((resolve, reject) => {
            CustomerService.connect.query(`SELECT * FROM customer WHERE idCustomer = ${id}`, (err, customer) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(customer);
                 }
             }) 
        })
    }

    static removeCustomer(id) {
        return new Promise((resolve, reject) => {
            CustomerService.connect.query(`DELETE FROM customer WHERE idCustomer = ${id}`, (err) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve('Xoá thành công');
                 }
             }) 
         })
    }

    static updateCustomer(customer, id) {
        return new Promise((resolve, reject) => {
            CustomerService.connect.query(`UPDATE customer SET nameCustomer = '${customer.nameCustomer}', yearOfBirth = ${customer.yearOfBirth}, addressCustomer = '${house.addressHouse}', phoneNumber = ${house.amountBedroom}, email = ${house.amountBathroom}, userName = '${house.description}', password = ${house.pricePerDay}, statusHouse = '${house.statusHouse}' WHERE idHouse = ${id}`, (err, customers) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(customers);
                 }
             }) 
        })
    }
}

module.exports = CustomerService;