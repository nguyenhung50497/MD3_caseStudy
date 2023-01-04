const fs = require('fs');
const qs = require('qs');
const formidable = require('formidable');
const path = require("path");
const CustomerService = require('../../service/customerService');
const HouseService = require('../../service/houseService');

class CustomerRouting {
    static getHomeCustomer(homehtml, customers) {
        let tbody = `
                <tr>
                    <td>Number</td>
                    <td>Name</td>
                    <td>Year</td>
                    <td>Address</td>
                    <td>Phone</td>
                    <td>Email</td>
                    <td>UserName</td>
                    <td>Avatar</td>
                    <td></td>
                    <td></td>
                </tr>`;
        customers.map((customer, index) => {
            tbody += `
                    <tr>
                    <td>${index + 1}</td>
                    <td>${customer.nameCustomer}</td>
                    <td>${customer.yearOfBirth}</td>
                    <td>${customer.addressCustomer}</td>
                    <td>${customer.phoneNumber}</td>
                    <td>${customer.email}</td>
                    <td>${customer.userName}</td>
                    <td><img src="../avatar/${customer.avatar}" alt="Image" style="width: 100px;height: 100px;"></td>
                    <td><a href="/customer/edit/${customer.idCustomer}"><button class="btn btn-primary">Edit</button></a></td>
                    <td>
                        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal${customer.idCustomer}">Delete</button>
                        <div class="modal fade" id="deleteModal${customer.idCustomer}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Delete: <span style="color: red; font-size: 36px">${customer.nameCustomer}</span></h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <h3>Are you sure???</h3>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                        <form action="/customer/delete/${customer.idCustomer}" method="post">
                                            <button type="submit" class="btn btn-danger">Yes</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    </tr>
                    `
        })
        homehtml = homehtml.replace('{display}', tbody);
        return homehtml;
    }
    static getHomeHouse(homehtml, houses, idCustomer) {
        let tbody = `
                <tr>
                    <td>Number</td>
                    <td>Name</td>
                    <td>Type Room</td>
                    <td>Address</td>
                    <td>Bedroom</td>
                    <td>Bathroom</td>
                    <td>Price/Day</td>
                    <td>Description</td>
                    <td>Image</td>
                    <td>Status</td>
                    <td>Count Customer</td>
                    <td></td>
                </tr>`;
        houses.map((house, index) => {
            if (house.statusHouse === "Đã thuê") {
                tbody += `
                    <tr>
                    <td>${index + 1}</td>
                    <td>${house.nameHouse}</td>
                    <td>${house.typeRoom}</td>
                    <td>${house.addressHouse}</td>
                    <td>${house.amountBedroom}</td>
                    <td>${house.amountBathroom}</td>
                    <td>${house.pricePerDay}$</td>
                    <td>${house.description}</td>
                    <td><img src="../../media/${house.image}" alt="Image" style="width: 100px;height: 100px;"></td>
                    <td>${house.statusHouse}</td>
                    <td>${house.countCustomer}</td>
                    <td></td>
                    </tr>
                    `
            }
            else {
                tbody += `
                    <tr>
                    <td>${index + 1}</td>
                    <td>${house.nameHouse}</td>
                    <td>${house.typeRoom}</td>
                    <td>${house.addressHouse}</td>
                    <td>${house.amountBedroom}</td>
                    <td>${house.amountBathroom}</td>
                    <td>${house.pricePerDay}$</td>
                    <td>${house.description}</td>
                    <td><img src="../../media/${house.image}" alt="Image" style="width: 100px;height: 100px;"></td>
                    <td>${house.statusHouse}</td>
                    <td>${house.countCustomer}</td>
                    <td><a href="/customer/rent/${house.idHouse}/${idCustomer}"><button class="btn btn-primary">Rent</button></a></td>
                    </tr>
                    `
            }
        })
        homehtml = homehtml.replace('{display}', tbody);
        return homehtml;
    }
    static showHomeHtml(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/customer/homeCustomer.html', 'utf-8', async (err, homeHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let houses = await HouseService.FindAllHouse();
                    homeHtml = homeHtml.replace('{id1}', id);
                    homeHtml = homeHtml.replace('{id2}', id);
                    homeHtml = CustomerRouting.getHomeHouse(homeHtml, houses, id);
                    res.writeHead(200, 'text/html');
                    res.write(homeHtml);
                    res.end();
                }
            });
        }
        else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err);
                }
                else {
                    const houses = qs.parse(data);
                    const mess = await HouseService.findByNameHouseContaining(houses.search);
                    fs.readFile('./views/customer/homeCustomer.html', 'utf-8', (err, searchHtml) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            searchHtml = CustomerRouting.getHomeHouse(searchHtml, mess);
                            res.writeHead(200, 'text/html');
                            res.write(searchHtml);
                            res.end();
                        }
                    });
                }
            })
        }
    }
    static showHomeAdminHtml(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/customer/homeCustomerAdmin.html', 'utf-8', async (err, homeHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let customers = await CustomerService.FindAllCustomer();
                    homeHtml = CustomerRouting.getHomeCustomer(homeHtml, customers);
                    res.writeHead(200, 'text/html');
                    res.write(homeHtml);
                    res.end();
                }
            });
        }
        else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err);
                }
                else {
                    const customers = qs.parse(data);
                    const mess = await CustomerService.findByNameCustomerContaining(customers.search);
                    fs.readFile('./views/customer/homeCustomerAdmin.html', 'utf-8', (err, searchHtml) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            searchHtml = CustomerRouting.getHomeCustomer(searchHtml, mess);
                            res.writeHead(200, 'text/html');
                            res.write(searchHtml);
                            res.end();
                        }
                    });
                }
            })
        }
    }

    static createCustomer(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/customer/createCustomer.html', 'utf-8', async (err, createHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.writeHead(200, 'text/html');
                    res.write(createHtml);
                    res.end();
                }
            });
        }
        else {
            let create = '';
            req.on('data', chunk => {
                create += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err);
                }
                else {
                    const customer = qs.parse(create);
                    let data = await CustomerService.saveCustomer(customer);
                    res.writeHead(301, {'location': `/customer/upload/${data.insertId}`});
                    res.end();
                }
            })
        }
    }

    static showFormUpLoad(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/customer/uploadImgCustomer.html', 'utf-8', (err, upLoadHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(upLoadHtml);
                    res.end();
                }
            })
        } else {
            let form = new formidable.IncomingForm();
            form.parse(req, async function (err, fields, files) {
                if (err) {
                    console.log(err)
                }
                let tmpPath = files.img.filepath;
                let newPath = path.join(__dirname, '..', '..', "avatar", files.img.originalFilename);
                fs.readFile(newPath, (err) => {
                    if (err) {
                        fs.copyFile(tmpPath, newPath, (err) => {
                            if (err) throw err;
                        });
                    }
                })
                await CustomerService.editImageCustomer(files.img.originalFilename, id);
                res.writeHead(301, {'location': '/customer/homeAdmin'})
                res.end();
            });
        }
    }

    static editCustomer(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/customer/editCustomer.html', 'utf-8', async (err, editHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let customer = await CustomerService.findByIdCustomer(id);
                    editHtml = editHtml.replace('{nameCustomer}', customer[0].nameCustomer);
                    editHtml = editHtml.replace('{yearOfBirth}', customer[0].yearOfBirth);
                    editHtml = editHtml.replace('{addressCustomer}', customer[0].addressCustomer);
                    editHtml = editHtml.replace('{phoneNumber}', customer[0].phoneNumber);
                    editHtml = editHtml.replace('{email}', customer[0].email);
                    editHtml = editHtml.replace('{userName}', customer[0].userName);
                    editHtml = editHtml.replace('{id}', id);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml);
                    res.end();
                }
            });
        }
        else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
             
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err);
                }
                else {
                    let customer = qs.parse(data);
                    const mess = await CustomerService.updateCustomer(customer, id);
                    res.writeHead(301, {'location': `/customer/homeAdmin`});
                    res.end();
                }
            })
        }
    }

    static async deleteCustomer(req, res, id) {
        if (req.method === 'POST') {
            let mess = await CustomerService.removeCustomer(id);
            res.writeHead(301, {'location': '/customer/homeAdmin'});
            res.end();
        }
    }

    static signUp(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/signup.html', 'utf-8', async (err, signUpHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.writeHead(200, 'text/html');
                    res.write(signUpHtml);
                    res.end();
                }
            });
        }
        else {
            let create = '';
            req.on('data', chunk => {
                create += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err);
                }
                else {
                    const customer = qs.parse(create);
                    let data = await CustomerService.saveCustomer(customer);
                    res.writeHead(301, {'location': `/customer/upload/${data.insertId}`});
                    res.end();
                }
            })
        }
    }

    static login(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/login.html', 'utf-8', async (err, loginHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.writeHead(200, 'text/html');
                    res.write(loginHtml);
                    res.end();
                }
            });
        }
        else {
            let login = '';
            req.on('data', chunk => {
                login += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err);
                }
                else {
                    const data = qs.parse(login);
                    if (data.userName === "admin" && data.password === "admin") {
                        res.writeHead(301, {'location': `/house/home`});
                        res.end();
                    }
                    else {
                        let customer = await CustomerService.login(data.userName, data.password);
                        if (customer.length > 0) {
                            res.writeHead(301, {'location': `/customer/home/${customer[0].idCustomer}`});
                            res.end();
                        }
                    }
                }
            })
        }
    }

    static rentHouse(req, res, idHouse, idCustomer) {
        if (req.method === 'GET') {
            fs.readFile('./views/customer/rentHouse.html', 'utf-8', async (err, rentHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let house = await HouseService.findByIdHouse(idHouse);
                    let houseHtml = `
                                <tr>
                                <td>${house[0].nameHouse}</td>
                                <td>${house[0].typeRoom}</td>
                                <td>${house[0].addressHouse}</td>
                                <td>${house[0].amountBedroom}</td>
                                <td>${house[0].amountBathroom}</td>
                                <td>${house[0].pricePerDay}</td>
                                <td>${house[0].description}</td>
                                <td><img src="../../../media/${house[0].image}" alt="Image" style="width: 100px;height: 100px;"></td>
                                <td>${house[0].statusHouse}</td>
                                <td>${house[0].countCustomer}</td>
                                </tr>`
                    let customer = await CustomerService.findByIdCustomer(idCustomer);
                    rentHtml = rentHtml.replace('{nameCustomer}', customer[0].nameCustomer);
                    rentHtml = rentHtml.replace('{yearOfBirth}', customer[0].yearOfBirth);
                    rentHtml = rentHtml.replace('{addressCustomer}', customer[0].addressCustomer);
                    rentHtml = rentHtml.replace('{phoneNumber}', customer[0].phoneNumber);
                    rentHtml = rentHtml.replace('{email}', customer[0].email);
                    rentHtml = rentHtml.replace('{display}', houseHtml);
                    rentHtml = rentHtml.replace('{idHouse}', idHouse);
                    rentHtml = rentHtml.replace('{idCustomer}', idCustomer);
                    rentHtml = rentHtml.replace('{id1}', idCustomer);
                    rentHtml = rentHtml.replace('{id2}', idCustomer);
                    res.writeHead(200, 'text/html');
                    res.write(rentHtml);
                    res.end();
                }
            });
        }
        else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err);
                }
                else {
                    const rentDetail = qs.parse(data);  
                    let house = await HouseService.findByIdHouse(idHouse);
                    let count = (+house[0].countCustomer);
                    let price = house[0].pricePerDay;
                    let totalMoney = price * rentDetail.timeRent;
                    let mess = await CustomerService.rent(rentDetail, idHouse, idCustomer, totalMoney);
                    let status = await HouseService.changeStatusRent(idHouse, count);
                    res.writeHead(301, {'location': `/customer/home/${idCustomer}`});
                    res.end();
                }
            })
        }
    }

    static showMyHouse(req, res, idCustomer) {
        if (req.method === 'GET') {
            fs.readFile('./views/customer/homeCustomer.html', 'utf-8', async (err, myHouseHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let myhouses = await CustomerService.findMyHouseById(idCustomer);
                    myHouseHtml = myHouseHtml.replace('{id1}', idCustomer);
                    myHouseHtml = myHouseHtml.replace('{id2}', idCustomer);
                    let tbody = `<tr>
                                    <td>Number</td>
                                    <td>Name</td>
                                    <td>Type Room</td>
                                    <td>Address</td>
                                    <td>Bedroom</td>
                                    <td>Bathroom</td>
                                    <td>Price/Day</td>
                                    <td>Description</td>
                                    <td>Image</td>
                                    <td>Status</td>
                                    <td>Count Customer</td>
                                    <td></td>
                                    <td></td>
                                </tr>`
                    myhouses.map((myhouse, index) => {
                        if (myhouse.statusOrder === 'true') {
                            tbody += `<tr>
                                    <td>${index + 1}</td>
                                    <td>${myhouse.nameHouse}</td>
                                    <td>${myhouse.typeRoom}</td>
                                    <td>${myhouse.addressHouse}</td>
                                    <td>${myhouse.amountBedroom}</td>
                                    <td>${myhouse.amountBathroom}</td>
                                    <td>${myhouse.pricePerDay}$</td>
                                    <td>${myhouse.description}</td>
                                    <td><img src="../../media/${myhouse.image}" alt="Image" style="width: 100px;height: 100px;"></td>
                                    <td>${myhouse.statusHouse}</td>
                                    <td>${myhouse.countCustomer}</td>
                                    <td><p>Đã từng thuê</p></td>
                                    <td>
                                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#checkOutModal${myhouse.idHouse}">Rent again</button>
                                        <div class="modal fade" id="checkOutModal${myhouse.idHouse}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Check out: <span style="color: red; font-size: 36px">${myhouse.nameHouse}</span></h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <h3>Are you sure???</h3>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                                        <form action="/customer/rent/${myhouse.idHouse}/${idCustomer}" method="get">
                                                            <button type="submit" class="btn btn-primary">Yes</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>`
                        }
                        else {
                        tbody += `<tr>
                                    <td>${index + 1}</td>
                                    <td>${myhouse.nameHouse}</td>
                                    <td>${myhouse.typeRoom}</td>
                                    <td>${myhouse.addressHouse}</td>
                                    <td>${myhouse.amountBedroom}</td>
                                    <td>${myhouse.amountBathroom}</td>
                                    <td>${myhouse.pricePerDay}$</td>
                                    <td>${myhouse.description}</td>
                                    <td><img src="../../media/${myhouse.image}" alt="Image" style="width: 100px;height: 100px;"></td>
                                    <td>${myhouse.statusHouse}</td>
                                    <td>${myhouse.countCustomer}</td>
                                    <td>
                                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cancelModal${myhouse.idOrder}">Cancel</button>
                                        <div class="modal fade" id="cancelModal${myhouse.idHouse}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cancel: <span style="color: red; font-size: 36px">${myhouse.nameHouse}</span></h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <h3>Are you sure???</h3>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                                        <form action="/customer/cancel/${idCustomer}/${myhouse.idOrder}" method="post">
                                                            <button type="submit" class="btn btn-primary">Yes</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#checkOutModal${myhouse.idOrder}">Check out</button>
                                        <div class="modal fade" id="checkOutModal${myhouse.idOrder}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Check out: <span style="color: red; font-size: 36px">${myhouse.nameHouse}</span></h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <h2>Total money: ${myhouse.totalMoney}$</h2>
                                                        <h3>Are you sure???</h3>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                                        <form action="/customer/checkOut/${idCustomer}/${myhouse.idOrder}" method="post">
                                                            <button type="submit" class="btn btn-primary">Yes</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>`
                        }
                    });
                    myHouseHtml = myHouseHtml.replace('{display}', tbody)
                    res.writeHead(200, 'text/html');
                    res.write(myHouseHtml);
                    res.end();
                }
            });
        }
        // else {
        //     let data = '';
        //     req.on('data', chunk => {
        //         data += chunk;
        //     })
        //     req.on('end', async err => {
        //         if (err) {
        //             console.log(err);
        //         }
        //         else {
                    
        //         }
        //     })
        // }
    }
    static async checkOut(req, res, idCustomer, idOrder) {
        if (req.method === 'POST') {
            let order = await CustomerService.findOrderById(idOrder);
            let house = await HouseService.findByIdHouse(order[0].idHouse);
            let count = (+house[0].countCustomer) + 1;
            let mess1 = await CustomerService.changeStatusOrderTrue(idOrder);
            let mess = await HouseService.changeStatusCancel(order[0].idHouse, count);
            res.writeHead(301, {'location': `/customer/myHouse/${idCustomer}`});
            res.end();
        }
    }

    static async cancelRent(req, res, idCustomer, idOrder) {
        if (req.method === 'POST') {
            let order = await CustomerService.findOrderById(idOrder);
            let house = await HouseService.findByIdHouse(order[0].idHouse);
            let count = (+house[0].countCustomer);
            let mess1 = await HouseService.changeStatusCancel(order[0].idHouse, count);
            let mess2 = await CustomerService.cancel(idCustomer, idOrder);
            res.writeHead(301, {'location': `/customer/myHouse/${idCustomer}`});
            res.end();
        }
    }
}

module.exports = CustomerRouting;