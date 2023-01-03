const HouseRouting = require('./handler/houseRouting');
const CustomerRouting = require('./handler/customerRouting');

const handler = {
    "home": HouseRouting.showHomeHtml,
    "house/create": HouseRouting.createHouse,
    "house/upload": HouseRouting.showFormUpLoad,
    "house/delete": HouseRouting.deleteHouse,
    "house/edit": HouseRouting.editHouse,
    "customer/create": CustomerRouting.createCustomer,
    
}

module.exports = handler;