const HouseRouting = require('./handler/houseRouting');

const handler = {
    "home": HouseRouting.showHomeHtml,
    "house/create": HouseRouting.createHouse,
    "house/upload": HouseRouting.showFormUpLoad
    "house/upload": HouseRouting.showFormUpLoad
}

module.exports = handler;