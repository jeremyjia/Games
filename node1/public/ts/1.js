function getProduct(id){
    return {
      id: id,
      name: `Awesome Gadget ${id}`,
      price: 99.5
    }
  }
  const showProduct = (name, price)  => {
    console.log(`The product ${name} costs ${price}$.`);
  };

  const product = getProduct(1);
showProduct(product.price, product.name);