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

    static rent(rent, idHouse, idCustomer, totalMoney) {
        return new Promise((resolve, reject) => {
            CustomerService.connect.query(`INSERT INTO ordermanager(checkIn, checkOut, totalMoney, idHouse, idCustomer, timeRent, statusOrder) VALUES ('${rent.checkIn}', '${rent.checkOut}', ${totalMoney}, ${idHouse}, ${idCustomer}, ${rent.timeRent}, 'false')`, (err, data) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(data)
                }
            })
        });
    }

    static findMyHouseById(idCustomer) {
        return new Promise((resolve, reject) => {
            CustomerService.connect.query(`SELECT * FROM house JOIN ordermanager ON house.idHouse = ordermanager.idHouse WHERE idCustomer = ${idCustomer}`, (err, house) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(house)
                }
            })
        });
    }

    static findOrderById(idOrder) {
        return new Promise((resolve, reject) => {
            CustomerService.connect.query(`SELECT * FROM ordermanager WHERE idOrder = ${idOrder}`, (err, order) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(order)
                }
            })
        });
    }

    static changeStatusOrderTrue(idOrder) {
        return new Promise((resolve, reject) => {
            CustomerService.connect.query(`UPDATE ordermanager SET statusOrder = 'true' WHERE idHouse = ${idHouse}`, (err, status) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(status)
                }
            })
        });
    }

    static cancel(idCustomer, idOrder) {
        return new Promise((resolve, reject) => {
            CustomerService.connect.query(`DELETE FROM ordermanager WHERE idOrder = ${idOrder}`, (err, data) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(data)
                }
            })
        });
    }
}

module.exports = CustomerService;