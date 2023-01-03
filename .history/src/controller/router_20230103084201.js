const productRouting = require('./handler/productRouting');

const handler = {
    "home": productRouting.showHome,
    "product/create": productRouting.createProduct,
    "product/delete": productRouting.deleteProduct,
    "product/edit": productRouting.editProduct,
    "product/upload": productRouting.showFormUpLoad
}

module.exports = handler;