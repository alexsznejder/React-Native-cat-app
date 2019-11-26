class Product {
  constructor(id, catId, name, active = true) {
    (this.id = id),
      (this.catId = catId),
      (this.name = name),
      (this.active = active);
  }
}

export default Product;
