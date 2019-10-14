import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Cat from "../components/Cat";
import { connect } from "react-redux";
import { setSelectedCatId } from "../store/actions/cats";

const CatsScreen = props => {
  const renderCat = itemData => {
    return (
      <Cat
        name={itemData.item.name}
        onSelectCat={() => {
          props.setSelectedCatId(itemData.item.id);
          props.navigation.navigate({
            routeName: "Informations"
          });
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item, index) => {
          return item.id.toString();
        }}
        data={props.cats.catsList}
        renderItem={renderCat}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => ({
  cats: state.cats
});

const mapDispatchToProps = dispatch => ({
  setSelectedCatId: catId => dispatch(setSelectedCatId(catId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatsScreen);
