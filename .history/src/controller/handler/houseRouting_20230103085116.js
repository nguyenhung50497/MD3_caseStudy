const fs = require('fs');
const qs = require('qs');
const formidable = require('formidable');
const path = require("path");

class HouseRouting {
    static getHomeHtml(homehtml, houses) {

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

mo