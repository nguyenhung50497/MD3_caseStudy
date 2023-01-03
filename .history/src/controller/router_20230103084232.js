const productRouting = require('./handler/houseRouting');

const handler = {
    "home": productRouting.showHome,
    "product/create": productRouting.createProduct,
    "product/delete": productRouting.deleteProduct,
    "product/edit": productRouting.editProduct,
    "product/upload": productRouting.showFormUpLoad
}

module.exports = handler;