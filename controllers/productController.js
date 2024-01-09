const data = {
    products: require('../model/products.json'),
    setProducts: function (data) { this.products = data }
};
const fspromises = require('fs').promises;
const path = require('path');

const getALlProducts = (req, res) => {
    res.json(data.products);
};

const createNewProduct = async (req, res) => {
    const newProduct = {
        id: data.products[data.products.length - 1].id + 1 || 1,
        productName: req.body.productName,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock
    }
    if (!newProduct.productName || !newProduct.image || !newProduct.category || !newProduct.price || !newProduct.stock) {
        return res.status(400).json({ 'message': 'Product name, image, category, price and stock are required to create new products' });
    }
    data.setProducts([...data.products, newProduct]);
    await fspromises.writeFile(
        path.join(__dirname, '..', 'model', 'products.json'),
        JSON.stringify(data.products)
    );
    res.status(201).json(data.products);
};

const updateProduct = async (req, res) => {
    const product = data.products.find(pro => pro.id === parseInt(req.body.id));
    if (!product) {
        return res.status(400).json({ 'message': `Product id ${req.body.id} not found` });
    }
    if (req.body.productName) product.productName = req.body.productName;
    if (req.body.image) product.image = req.body.image;
    if (req.body.category) product.category = req.body.category;
    if (req.body.price) product.price = req.body.price;
    if (req.body.stock) product.stock = req.body.stock;
    const filteredArray = data.products.filter(pro => pro.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, product];
    data.setProducts(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    await fspromises.writeFile(
        path.join(__dirname, '..', 'model', 'products.json'),
        JSON.stringify(data.products)
    );
    res.status(201).json(data.products);
};

const deleteProduct = async (req, res) => {
    const product = data.products.find(pro => pro.id === parseInt(req.body.id));
    if (!product) {
        return res.status(400).json({ 'message': `Product id ${req.body.id} not found` });
    }
    const filteredArray = data.products.filter(pro => pro.id !== parseInt(req.body.id));
    data.setProducts([...filteredArray]);
    await fspromises.writeFile(
        path.join(__dirname, '..', 'model', 'products.json'),
        JSON.stringify(data.products)
    );
    res.status(201).json(data.products);
};

const getProduct = (req, res) => {
    const product = data.products.find(pro => pro.id == parseInt(req.params.id));
    if (!product) {
        return res.status(400).json({ 'message': `Product id ${req.params.id} not found` });
    }
    res.status(201).json(product);
}

module.exports = {
    getALlProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProduct
}