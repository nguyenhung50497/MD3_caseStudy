const fs = require('fs');
const qs = require('qs');
const formidable = require('formidable');
const path = require("path");
const HouseService = require('../../service/houseService');
const CustomerService = require('../../service/customerService');

class HouseRouting {
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
                    <td>${house.pricePerDay}$</td>
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

    static showHome(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/home.html', 'utf-8', async (err, homeHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
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
                    res.writeHead(200, 'text/html');
                    res.end();
                }
            })
        }
    }

    static showHomeHtml(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/house/homeHouseAdmin.html', 'utf-8', async (err, homeHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let houses = await HouseService.FindAllHouse();
                    homeHtml = HouseRouting.getHomeHouse(homeHtml, houses);
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

    static createHouse(req, res) {
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
                res.writeHead(301, {'location': '/house/home'})
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
                    res.writeHead(301, {'location': `/house/home`});
                    res.end();
                }
            })
        }
    }

    static async deleteHouse(req, res, id) {
        if (req.method === 'POST') {
            let mess = await HouseService.removeHouse(id);
            res.writeHead(301, {'location': '/house/home'});
            res.end();
        }
    }

    static historyHouse(req, res) {
        fs.readFile('./views/house/homeHouseAdmin.html', 'utf-8', async (err, historyHtml) => {
            if (err) {
                console.log(err);
            }
            else {
                let history = await HouseService.history();
                console.log(history);
                let tbody = `<tr>
                                <td>Number</td>
                                <td>Name Customer</td>
                                <td>Year of birth</td>
                                <td>Address Customer</td>
                                <td>Name House</td>
                                <td>Type Room</td>
                                <td>Address House</td>
                                <td>Price/Day</td>
                                <td>Image</td>
                                <td>Count Customer</td>
                                <td>Check in</td>
                                <td>Check out</td>
                            </tr>`;
                history.map((order, index) => {
                    tbody += `<tr>
                                <td>${index + 1}</td>
                                <td>${history.nameCustomer}</td>
                                <td>${history.yearOfBirth}</td>
                                <td>${history.addressCustomer}</td>
                                <td>${history.nameHouse}</td>
                                <td>${history.typeRoom}</td>
                                <td>${history.addressHouse}</td>
                                <td>${history.pricePerDay}$</td>
                                <td><img src="../media/${history.image}" alt="Image" style="width: 100px;height: 100px;"></td>
                                <td>${history.statusHouse}</td>
                                <td>${history.countCustomer}</td>
                                <td>${history.checkIn}</td>
                                <td>${history.checkOut}</td>
                            </tr>`
                })
                historyHtml = historyHtml.replace('{display}', tbody);
                res.writeHead(200, 'text/html');
                res.write(historyHtml);
                res.end();
            }
        });
    }
}

module.exports = HouseRouting;