const HouseRouting = require('./handler/houseRouting');
const CustomerRouting = require('./handler/customerRouting');

const handler = {
    "home": HouseRouting.showHome,
    "house/home": HouseRouting.showHomeHtml,
    "house/create": HouseRouting.createHouse,
    "house/upload": HouseRouting.showFormUpLoad,
    "house/delete": HouseRouting.deleteHouse,
    "house/edit": HouseRouting.editHouse,
    "customer/home": CustomerRouting.showHomeHtml,
    "customer/homeAdmin": CustomerRouting.showHomeAdminHtml,
    "customer/create": CustomerRouting.createCustomer,
    "customer/upload": CustomerRouting.showFormUpLoad,
    "customer/delete": CustomerRouting.deleteCustomer,
    "customer/edit": CustomerRouting.editCustomer,
    "customer/signup": CustomerRouting.signUp,
    "customer/login": CustomerRouting.login,
    "customer/logout": CustomerRouting.log
}

module.exports = handler;