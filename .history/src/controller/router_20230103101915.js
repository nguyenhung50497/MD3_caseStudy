const HouseRouting = require('./handler/houseRouting');

const handler = {
    "home": HouseRouting.showHomeHtml,
    "house/create": HouseRouting.create
    
}

module.exports = handler;