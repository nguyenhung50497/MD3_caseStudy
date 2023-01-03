const fs = require('fs');
const qs = require('qs');
const formidable = require('formidable');
const path = require("path");

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
                    <td colspan="3"></td>
                </tr>`;
        houses.map((house, index) => {
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
                    <td>${house.image}</td>
                    <td>${house.status}</td>
                    <td><a href="/product/edit/${house.idHouse}"><button class="btn btn-primary">Edit</button></a></td>
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
                                        <form action="/product/delete/${house.idHouse}" method="post">
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
    }

    static showHomeHtml(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/home.html', 'utf-8', async (err, homeHtml) => {
                if (err) {
                    console.log(err);
                }
                else {
                    // let products = await HouseService.findAll();
                    // homeHtml = HouseRouting.getHomeHtml(homeHtml, products);
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
                    console.log(1);
                    // const houses = qs.parse(data);
                    // const mess = await HouseService.findByNameContaining(houses.search);
                    // fs.readFile('./views/home.html', 'utf-8', (err, searchHtml) => {
                    //     if (err) {
                    //         console.log(err);
                    //     }
                    //     else {
                    //         searchHtml = HouseRouting.getHomeHtml(searchHtml, mess);
                    //         res.writeHead(200, 'text/html');
                    //         res.write(searchHtml);
                    //         res.end();
                    //     }
                    // });
                }
            })
        }
    }
}

module.exports = HouseRouting;