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
        houses.map(a)
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