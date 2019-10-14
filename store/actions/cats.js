export const SET_SELECTED_CAT_ID = "SET_SELECTED_CAT_ID";

export const setSelectedCatId = catId => {
  return {
    type: SET_SELECTED_CAT_ID,
    catId: catId
  };
};
