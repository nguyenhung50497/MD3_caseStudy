const HouseRouting = require('./handler/houseRouting');
const CustomerRouting = require('./handler/customerRouting');

const handler = {
    "house/home": HouseRouting.showHomeHtml,
    "house/create": HouseRouting.createHouse,
    "house/upload": HouseRouting.showFormUpLoad,
    "house/delete": HouseRouting.deleteHouse,
    "house/edit": HouseRouting.editHouse,
    "custom"
    "customer/create": CustomerRouting.createCustomer,
    "customer/upload": CustomerRouting.showFormUpLoad,
    "customer/delete": CustomerRouting.deleteCustomer,
    "customer/edit": CustomerRouting.editCustomer
}

module.exports = handler;