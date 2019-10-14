export const ADD_PRODUCT = "ADD_PRODUCT";
export const TOGGLE_ACTIVE = "TOGGLE_ACTIVE";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const addProduct = (name, catId) => {
  return {
    type: ADD_PRODUCT,
    catId: catId,
    name: name
  };
};

export const toggleActive = proId => {
  return {
    type: TOGGLE_ACTIVE,
    proId: proId
  };
};

export const deleteProduct = proId => {
  return {
    type: DELETE_PRODUCT,
    proId: proId
  };
};
