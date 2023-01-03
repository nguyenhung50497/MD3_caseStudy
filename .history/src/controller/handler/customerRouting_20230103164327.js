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
    static getHomeHouse(homehtml, houses) {
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
                    <td>${house.pricePerDay}</td>
                    <td>${house.description}</td>
                    <td><img src="../media/${house.image}" alt="Image" style="width: 100px;height: 100px;"></td>
                    <td>${house.statusHouse}</td>
                    <td>${house.countCustomer}</td>
                    <td></td>
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
                    <td>${house.pricePerDay}</td>
                    <td>${house.description}</td>
                    <td><img src="../media/${house.image}" alt="Image" style="width: 100px;height: 100px;"></td>
                    <td>${house.statusHouse}</td>
                    <td>${house.countCustomer}</td>
                    <td><a href="/house/edit/${house.idHouse}"><button class="btn btn-primary">Edit</button></a></td>
                    <td>
                        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal${house.idHouse}">Delete</button>
                        <div class="modal fade" id="deleteModal${house.idHouse}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Delete: <span style="color: red; font-size: 36px">${house.nameHouse}</span></h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <h3>Are you sure???</h3>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                        <form action="/house/delete/${house.idHouse}" method="post">
                                            <button type="submit" class="btn btn-danger">Yes</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    </tr>
                    `
            }
        })
        homehtml = homehtml.replace('{display}', tbody);
        return homehtml;
    }
    static showHomeHtml(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/house/homeHouseAdmin.html', 'utf-8', async (err, homeHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let houses = await HouseService.FindAllHouse();
                    homeHtml = CustomerRouting.getHomeHouse(homeHtml, houses);
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
                    fs.readFile('./views/house/homeHouseAdmin.html', 'utf-8', (err, searchHtml) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            searchHtml = HouseRouting.getHomeHouse(searchHtml, mess);
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
            fs.readFile('./views/login.html', 'utf-8', async (err, signUpHtml) => {
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
                    console.log(data);
                    let customer = await CustomerService.login(data.userName, data.password);
                    console.log(customer);
                    res.writeHead(301, {'location': `/customer/home/${customer[0].}`});
                    res.end();
                }
            })
        }
    }
}

module.exports = CustomerRouting;