import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Foundation } from "@expo/vector-icons";
import CatDataItem from "../components/CatDataItem";

const numOfYears = date => {
  const birthDate = new Date(date);
  let actualDate = new Date();

  const utc1 = Date.UTC(
    actualDate.getFullYear(),
    actualDate.getMonth(),
    actualDate.getDate()
  );
  const utc2 = Date.UTC(
    birthDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  let years = ((utc1 - utc2) / 1000 / 60 / 60 / 24 / 365).toFixed(1);

  if (years < 1) {
    return years;
  } else {
    if (years[years.length - 1] < 5) {
      years = Number(years).toFixed();
      return years;
    } else {
      years = years.substr(0, years.length - 1) + 5;
      return years;
    }
  }
};

const InformationsScreen = props => {
  const catId = props.cats.selectedCatId;
  const selectedCat = props.cats.catsList.find(cat => cat.id === catId);
  const years = numOfYears(selectedCat.birthDate);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.image}></View>
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
          <CatDataItem title="Birthday" data={selectedCat.birthDate} />
          <CatDataItem title="Breed" data={selectedCat.breed} />
          <CatDataItem title="Sterilised" data={selectedCat.sterilised} />
          <CatDataItem title="Weight" data={selectedCat.weight} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 15
  },
  image: {
    height: 200,
    width: 200,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 100,
    overflow: "hidden"
  },
  header: {
    marginLeft: 15,
    marginVertical: 15,
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
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
});

const mapStateToProps = state => ({
  cats: state.cats
});

export default connect(mapStateToProps)(InformationsScreen);
