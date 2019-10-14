import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Input } from "react-native-elements";
import { connect } from "react-redux";
import ProductListItem from "../components/ProductListItem";
import { AntDesign } from "@expo/vector-icons";
import {
  addProduct,
  toggleActive,
  deleteProduct
} from "../store/actions/products";

const ShoppingListScreen = props => {
  const catId = props.cats.selectedCatId;
  const [productName, setProductName] = useState("");

  const productsList = props.products.productsList.map(pro => (
    <ProductListItem
      key={pro.id}
      id={pro.id}
      name={pro.name}
      active={pro.active}
      handleCheckBoxPress={props.toggleActive}
      handleProductDelete={props.deleteProduct}
    />
  ));

  return (
    <View style={styles.screen}>
      <Input
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder="Add product"
        rightIcon={
          <AntDesign
            name="pluscircleo"
            size={22}
            color="lightgray"
            onPress={() => {
              props.addProduct(productName, catId);
              setProductName("");
            }}
          />
        }
        rightIconContainerStyle={styles.icon}
        value={productName}
        onChangeText={text => setProductName(text)}
      />
      <ScrollView style={styles.productsContainer}>{productsList}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  input: {
    width: "100%",
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16
  },
  icon: {
    paddingRight: 15
  },
  productsContainer: {
    width: "100%",
    marginTop: 10
  },
  inputContainer: {
    borderBottomColor: "lightgray"
  }
});

const mapStateToProps = state => ({
  products: state.products,
  cats: state.cats
});

const mapDispatchToProps = dispatch => ({
  addProduct: (productName, catId) => dispatch(addProduct(productName, catId)),
  toggleActive: proId => dispatch(toggleActive(proId)),
  deleteProduct: proId => dispatch(deleteProduct(proId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingListScreen);
