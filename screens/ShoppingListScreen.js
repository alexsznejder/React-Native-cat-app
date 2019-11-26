import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Input } from "react-native-elements";
import { connect } from "react-redux";
import ProductListItem from "../components/ProductListItem";
import { AntDesign } from "@expo/vector-icons";
import {
  fetchProducts,
  addProduct,
  toggleActive,
  deleteProduct
} from "../store/actions/products";
import BackArrow from "../components/BackArrow";

const ShoppingListScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const catId = props.cats.selectedCatId;
  const [productName, setProductName] = useState("");

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await props.fetchProducts();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [setIsLoading, setError]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const productsList = props.products.productsList
    .filter(pro => pro.catId === catId)
    .map(pro => (
      <ProductListItem
        key={pro.id}
        id={pro.id}
        name={pro.name}
        active={pro.active}
        handleCheckBoxPress={props.toggleActive}
        handleProductDelete={props.deleteProduct}
      />
    ));

  if (error) {
    return (
      <View style={{ ...styles.screen, justifyContent: "center" }}>
        <Text>Error</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ ...styles.screen, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

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
ShoppingListScreen.navigationOptions = props => ({
  headerLeft: <BackArrow navigation={props.navigation} />
});

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
  fetchProducts: () => dispatch(fetchProducts()),
  addProduct: (productName, catId) => dispatch(addProduct(productName, catId)),
  toggleActive: (proId, active) => dispatch(toggleActive(proId, active)),
  deleteProduct: proId => dispatch(deleteProduct(proId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListScreen);
