const fs = require('fs');
const qs = require('qs');
const formidable = require('formidable');
const path = require("path");
const CustomerService = require('../../service/customerService');

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
                    <td colspan="2"></td>
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
                    <td><img src="./avatar/${customer.image}" alt="Image" style="width: 100px;height: 100px;"></td>
                    <td><a href="/house/edit/${customer.idCustomer}"><button class="btn btn-primary">Edit</button></a></td>
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
                                        <form action="/house/delete/${customer.idCustomer}" method="post">
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

    static showHomeHtml(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/homeProtected.html', 'utf-8', async (err, homeHtml) => {
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
                    fs.readFile('./views/homeProtected.html', 'utf-8', (err, searchHtml) => {
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
            fs.readFile('./views/house/createHouse.html', 'utf-8', async (err, createHtml) => {
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
                    const house = qs.parse(create);
                    let data = await HouseService.saveHouse(house);
                    console.log(data)
                    res.writeHead(301, {'location': `/house/upload/${data.insertId}`});
                    res.end();
                }
            })
        }
    }

    static showFormUpLoad(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/house/uploadImgHouse.html', 'utf-8', (err, upLoadHtml) => {
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
                let newPath = path.join(__dirname, '..', '..', "media", files.img.originalFilename);
                fs.readFile(newPath, (err) => {
                    if (err) {
                        fs.copyFile(tmpPath, newPath, (err) => {
                            if (err) throw err;
                        });
                    }
                })
                await HouseService.editImageHouse(files.img.originalFilename, id);
                res.writeHead(301, {'location': '/home'})
                res.end();
            });
        }
    }

    static editHouse(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/house/editHouse.html', 'utf-8', async (err, editHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let house = await HouseService.findByIdHouse(id);
                    editHtml = editHtml.replace('{nameHouse}', house[0].nameHouse);
                    editHtml = editHtml.replace('{typeRoom}', house[0].typeRoom);
                    editHtml = editHtml.replace('{addressHouse}', house[0].addressHouse);
                    editHtml = editHtml.replace('{amountBedroom}', house[0].amountBedroom);
                    editHtml = editHtml.replace('{amountBathroom}', house[0].amountBathroom);
                    editHtml = editHtml.replace('{statusHouse}', house[0].statusHouse);
                    editHtml = editHtml.replace('{pricePerDay}', house[0].pricePerDay);
                    editHtml = editHtml.replace('{description}', house[0].description);
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
                    let house = qs.parse(data);
                    const mess = await HouseService.updateHouse(house, id);
                    res.writeHead(301, {'location': `/home`});
                    res.end();
                }
            })
        }
    }

    static async deleteHouse(req, res, id) {
        if (req.method === 'POST') {
            let mess = await HouseService.removeHouse(id);
            res.writeHead(301, {'location': '/home'});
            res.end();
        }
    }
}

module.exports = CustomerRouting;