const HouseRouting = require('./handler/houseRouting');

const handler = {
    "home": HouseRouting.showHomeHtml,
    "house/create": HouseRouting.createHouse,
    "house/update": HouseRouting.updateHouse
    
}

module.exports = handler;