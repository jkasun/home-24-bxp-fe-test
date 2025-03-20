const categories = require('./data/categories');
const products = require('./data/products');

module.exports = () => {
  const data = {
    categories,
    products,
  };

  return data;
};
