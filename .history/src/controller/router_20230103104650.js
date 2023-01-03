const HouseRouting = require('./handler/houseRouting');

const handler = {
    "home": HouseRouting.showHomeHtml,
    "house/create": HouseRouting.createHouse,
    "house/upload": HouseRouting.showFormUpLoad,
    "house/delete": HouseRouting.deleteHouse
    "house/delete": HouseRouting.deleteHouse
}

module.exports = handler;