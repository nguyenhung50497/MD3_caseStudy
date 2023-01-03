const HouseRouting = require('./handler/houseRouting');
const CustomerRouting = require('./handler/customerRouting');

const handler = {
    "house/home": HouseRouting.showHomeHtml,
    "house/create": HouseRouting.createHouse,
    "house/upload": HouseRouting.showFormUpLoad,
    "house/delete": HouseRouting.deleteHouse,
    "house/edit": HouseRouting.editHouse,
    "customer/homeAmdmin": CustomerRouting.showHomeHtml,
    "customer/homeAmdmin": CustomerRouting.showHomeHtml,
    "customer/create": CustomerRouting.createCustomer,
    "customer/upload": CustomerRouting.showFormUpLoad,
    "customer/delete": CustomerRouting.deleteCustomer,
    "customer/edit": CustomerRouting.editCustomer,
    "customer/signup": CustomerRouting.signUp,
    "customer/login": CustomerRouting.login
}

module.exports = handler;