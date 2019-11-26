import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { Foundation, Feather, FontAwesome } from "@expo/vector-icons";
import CatDataItem from "../components/CatDataItem";
import moment from "moment";
import BackArrow from "../components/BackArrow";
import { deleteCat } from "../store/actions/cats";

const numOfYears = date => {
  const current = moment(new Date());
  const birthday = moment(date, "DD-MM-YYYY");
  return current.diff(birthday, "years");
};

const InformationsScreen = props => {
  const catId = props.cats.selectedCatId;
  const selectedCat = props.cats.catsList.find(cat => cat.id === catId);
  const years = numOfYears(selectedCat.birthday);

  useEffect(() => {
    props.navigation.setParams({
      id: catId,
      deleteCat: props.deleteCat,
      selectedCat: selectedCat
    });
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.image}>
        <FontAwesome name="camera" size={50} color="lightgray" />
      </View>
      <View style={styles.header}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{selectedCat.name}</Text>
          {selectedCat.sex === "male" ? (
            <Foundation name="male-symbol" color="black" size={28} />
          ) : (
            <Foundation name="female-symbol" color="black" size={28} />
          )}
        </View>
        <Text style={styles.years}>{years} years old</Text>
      </View>
      <View style={styles.tileContainer}>
        <CatDataItem title="Birthday" data={selectedCat.birthday} />
        <CatDataItem title="Breed" data={selectedCat.breed} />
        <CatDataItem title="Sterilised" data={selectedCat.sterilised} />
        <CatDataItem title="Weight" data={selectedCat.weight} />
      </View>
    </View>
  );
};

InformationsScreen.navigationOptions = props => ({
  headerLeft: <BackArrow navigation={props.navigation} />,
  headerRight: (
    <>
      <TouchableOpacity
        onPress={() => {
          const { selectedCat } = props.navigation.state.params;
          props.navigation.navigate({
            routeName: "AddCat",
            params: {
              selectedCat: selectedCat
            }
          });
        }}
      >
        <Feather name="edit-2" size={24} style={{ marginRight: 15 }} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          const { id, deleteCat } = props.navigation.state.params;
          props.navigation.navigate({
            routeName: "CatsList"
          });
          deleteCat(id);
        }}
      >
        <Feather name="trash-2" size={24} style={{ marginRight: 15 }} />
      </TouchableOpacity>
    </>
  )
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    paddingTop: 25
  },
  image: {
    height: 160,
    width: 160,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 80,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    marginLeft: 15,
    // marginVertical: 15,
    marginTop: 15,
    marginBottom: 10,
    width: "100%",
    justifyContent: "flex-start"
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  name: {
    fontWeight: "bold",
    fontSize: 30,
    marginRight: 10
  },
  years: {
    color: "grey"
  },
  tileContainer: {
    height: "55%",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
});

const mapStateToProps = state => ({
  cats: state.cats
});

const mapDispatchToProps = dispatch => ({
  deleteCat: id => dispatch(deleteCat(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(InformationsScreen);
