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
            CustomerService.connect.query(`UPDATE customer SET nameCustomer = '${customer.nameCustomer}', yearOfBirth = ${customer.yearOfBirth}, addressCustomer = '${customer.addressCustomer}', phoneNumber = ${customer.phoneNumber}, email = '${customer.email}', userName = '${customer.userName}', password = '${customer.password}' WHERE idCustomer = ${id}`, (err, customers) => {
                 if (err) {
                     reject(err);
                 }
                 else {
                     resolve(customers);
                 }
             }) 
        })
    }

    static login(userName, password) {
        return new Promise((resolve, reject) => {
            CustomerService.connect.query(`SELECT * FROM customer WHERE userName = '${userName}' AND password = '${password}'`, (err, customers) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(customers)
                }
            })
        });
    }

    rent(idHouse, idCustomer) {
        return new Promise((resolve, reject) => {
            CustomerService.connect.query(``, (err, data) => {
                
            })
        });
    }
}

module.exports = CustomerService;