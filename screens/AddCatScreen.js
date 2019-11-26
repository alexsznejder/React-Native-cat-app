import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView
} from "react-native";
import moment from "moment";
import { CheckBox } from "react-native-elements";
import CustomFormInput from "../components/CustomFormInput";
import SelectItemWrapper from "../components/SelectIconWrapper";
import { Foundation, Ionicons, FontAwesome } from "@expo/vector-icons";
import ImagePicker from "expo-image-picker";
import Permissions from "expo-permissions";
import { connect } from "react-redux";
import { addCat, editCat } from "../store/actions/cats";
import BigAddButton from "../components/BigAddButton";

const AddCatScreen = ({ addCat, navigation, editCat }) => {
  const selectedCat = navigation.getParam("selectedCat");
  const [name, setName] = useState(selectedCat ? selectedCat.name : "");
  const [gender, setGender] = useState(
    selectedCat ? selectedCat.sex : "female"
  );
  const [birthday, setBirthday] = useState(
    selectedCat ? selectedCat.birthday : ""
  );
  const [breed, setBreed] = useState(selectedCat ? selectedCat.breed : "");
  const [sterilised, setSterilised] = useState(
    selectedCat ? selectedCat.sterilised : false
  );
  const [weight, setWeight] = useState(selectedCat ? selectedCat.weight : "");
  const [image, setImage] = useState(selectedCat ? selectedCat.image : "");

  // getPermissionAsync = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   if (status !== "granted") {
  //     alert("Sorry, we need camera roll permissions to make this work!");
  //   }
  // };

  // _pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All, //"Images"
  //     allowsEditing: true,
  //     aspect: [4, 3]
  //   });

  //   console.log(result);
  // };

  // useEffect(() => {
  //   getPermissionAsync();
  // }, []);

  const validation = () => {
    if (name.trim().length == 0) {
      ToastAndroid.show("Enter the cat's name.", ToastAndroid.SHORT);
      return true;
    } else if (birthday.trim().length == 0) {
      ToastAndroid.show("Enter the cat's birthday.", ToastAndroid.SHORT);
      return true;
    } else if (birthday) {
      const m = moment(birthday, "DD-MM-YYYY");
      if (m.isValid()) {
        return false;
      } else {
        ToastAndroid.show("Wrong date. Try DD-MM-YYYY.", ToastAndroid.SHORT);
        return true;
      }
    } else {
      return false;
    }
  };

  const handleAddCatButton = () => {
    const isSomethingMissing = validation();
    if (!isSomethingMissing) {
      addCat(name, gender, birthday, breed, sterilised, weight, image);
      navigation.navigate({
        routeName: "CatsList"
      });
    }
  };

  const handleEditCatButton = () => {
    const isSomethingMissing = validation();
    if (!isSomethingMissing) {
      editCat(
        selectedCat.id,
        name,
        gender,
        birthday,
        breed,
        sterilised,
        weight,
        image
      );
      navigation.navigate({
        routeName: "CatsList"
      });
    }
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.imageContainer}>
          <FontAwesome name="camera" size={50} color="lightgray" />
          <TouchableOpacity style={styles.addDot}>
            <Ionicons
              name="ios-add"
              color="black"
              size={30}
              // onPress={_pickImage}
            />
          </TouchableOpacity>
        </View>
        <CustomFormInput
          label="Name:"
          placeholder=""
          value={name}
          valueChange={text => setName(text)}
        />
        <View style={styles.row}>
          <Text style={styles.labelText}>Gender:</Text>
          <View style={styles.iconsContainer}>
            <SelectItemWrapper>
              <Foundation
                name="female-symbol"
                color={gender == "female" ? "black" : "lightgray"}
                size={30}
                onPress={() => setGender("female")}
              />
            </SelectItemWrapper>
            <SelectItemWrapper>
              <Foundation
                name="male-symbol"
                color={gender == "male" ? "black" : "lightgray"}
                size={30}
                onPress={() => setGender("male")}
              />
            </SelectItemWrapper>
          </View>
        </View>
        <CustomFormInput
          label="Birthday:"
          placeholder="DD-MM-YYYY"
          value={birthday}
          valueChange={text => setBirthday(text)}
        />
        <CustomFormInput
          label="Breed:"
          placeholder=""
          value={breed}
          valueChange={text => setBreed(text)}
        />
        <View style={styles.checkBoxContainer}>
          <CheckBox
            containerStyle={styles.checkBox}
            checked={sterilised}
            onPress={() => setSterilised(!sterilised)}
            checkedColor="#f06e9c"
          />
          <Text style={styles.labelText}>Sterilised</Text>
        </View>
        <CustomFormInput
          label="Weight:"
          placeholder=""
          value={weight}
          valueChange={text => setWeight(text)}
        />
        <BigAddButton
          handleOnPress={selectedCat ? handleEditCatButton : handleAddCatButton}
          buttonText={selectedCat ? "Edit your kitty" : "Add new kitty"}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center"
  },
  imageContainer: {
    height: 150,
    width: 150,
    marginVertical: 30,
    borderWidth: 1,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center"
  },
  addDot: {
    position: "absolute",
    width: 50,
    height: 50,
    top: 100,
    left: 100,
    backgroundColor: "#f06e9c",
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 20
  },
  iconsContainer: {
    flexDirection: "row"
  },
  labelText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold"
  },
  checkBox: {
    padding: 0
  },
  checkBoxContainer: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20
  }
});

const mapStateToProps = state => ({ cats: state.cats });

const mapDispatchToProps = dispatch => ({
  addCat: (name, sex, birthday, breed, sterilised, weight, image) =>
    dispatch(addCat(name, sex, birthday, breed, sterilised, weight, image)),
  editCat: (catId, name, sex, birthday, breed, sterilised, weight, image) =>
    dispatch(
      editCat(catId, name, sex, birthday, breed, sterilised, weight, image)
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCatScreen);
