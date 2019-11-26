import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from "react-native";
import Cat from "../components/Cat";
import { connect } from "react-redux";
import { setSelectedCatId, fetchCats } from "../store/actions/cats";
import SmallAddButton from "../components/SmallAddButton";

const CatsScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const loadCats = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await props.fetchCats();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [setIsLoading, setError]);

  useEffect(() => {
    loadCats();
  }, [loadCats]);

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
        keyExtractor={item => {
          return item.id.toString();
        }}
        data={props.cats.catsList}
        renderItem={renderCat}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={{ width: "100%", alignItems: "center" }}>
            <SmallAddButton navigation={props.navigation} />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginTop: 45,
    flex: 1,
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({
  cats: state.cats
});

const mapDispatchToProps = dispatch => ({
  setSelectedCatId: catId => dispatch(setSelectedCatId(catId)),
  fetchCats: () => dispatch(fetchCats())
});

export default connect(mapStateToProps, mapDispatchToProps)(CatsScreen);
