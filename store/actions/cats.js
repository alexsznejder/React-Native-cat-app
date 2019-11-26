import Cat from "../../models/Cat";

export const SET_SELECTED_CAT_ID = "SET_SELECTED_CAT_ID";
export const ADD_CAT = "ADD_CAT";
export const DELETE_CAT = "DELETE_CAT";
export const GET_CATS = "GET_CATS";
export const EDIT_CAT = "EDIT_CAT";

export const setSelectedCatId = catId => {
  return {
    type: SET_SELECTED_CAT_ID,
    catId: catId
  };
};

export const fetchCats = () => async dispatch => {
  try {
    const response = await fetch(
      "https://cat-owner-helper.firebaseio.com/cats.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    const loadedCats = [];

    for (const key in resData) {
      loadedCats.push(
        new Cat(
          key,
          resData[key].name,
          resData[key].sex,
          resData[key].birthday,
          resData[key].breed,
          resData[key].sterilised,
          resData[key].weight,
          resData[key].image
        )
      );
    }

    dispatch({
      type: GET_CATS,
      cats: loadedCats
    });
  } catch (err) {
    throw err;
  }
};

export const addCat = (
  name,
  sex,
  birthday,
  breed,
  sterilised,
  weight,
  image
) => {
  return async dispatch => {
    const response = await fetch(
      "https://cat-owner-helper.firebaseio.com/cats.json",
      {
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          sex,
          birthday,
          breed,
          sterilised,
          weight,
          image
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: ADD_CAT,
      payload: {
        id: resData.name,
        name,
        sex,
        birthday,
        breed,
        sterilised,
        weight,
        image
      }
    });
  };
};

export const editCat = (
  catId,
  name,
  sex,
  birthday,
  breed,
  sterilised,
  weight,
  image
) => {
  return async dispatch => {
    await fetch(`https://cat-owner-helper.firebaseio.com/cats/${catId}.json`, {
      method: "PATCH",
      header: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        sex,
        birthday,
        breed,
        sterilised,
        weight,
        image
      })
    });

    dispatch({
      type: EDIT_CAT,
      payload: {
        catId,
        name,
        sex,
        birthday,
        breed,
        sterilised,
        weight,
        image
      }
    });
  };
};

export const deleteCat = catId => async dispatch => {
  await fetch(`https://cat-owner-helper.firebaseio.com/cats/${catId}.json`, {
    method: "DELETE"
  });

  dispatch({
    type: DELETE_CAT,
    payload: catId
  });
};
