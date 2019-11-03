import Product from "../../models/Product";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const TOGGLE_ACTIVE = "TOGGLE_ACTIVE";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://cat-owner-helper.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(key, resData[key].catId, resData[key].name)
        );
      }

      dispatch({
        type: GET_PRODUCTS,
        products: loadedProducts
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addProduct = (name, catId) => {
  return async dispatch => {
    const response = await fetch(
      "https://cat-owner-helper.firebaseio.com/products.json",
      {
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          catId,
          name,
          active: true
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: ADD_PRODUCT,
      productData: {
        id: resData.name,
        catId,
        name,
        active: true
      }
    });
  };
};

export const toggleActive = (proId, active) => {
  return async dispatch => {
    await fetch(
      `https://cat-owner-helper.firebaseio.com/products/${proId}.json`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          active: !active
        })
      }
    );

    dispatch({
      type: TOGGLE_ACTIVE,
      proId: proId
    });
  };
};

export const deleteProduct = proId => {
  return async dispatch => {
    await fetch(
      `https://cat-owner-helper.firebaseio.com/products/${proId}.json`,
      {
        method: "DELETE"
      }
    );

    dispatch({
      type: DELETE_PRODUCT,
      proId: proId
    });
  };
};
