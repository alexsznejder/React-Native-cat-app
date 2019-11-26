import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const BackArrow = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate({
          routeName: "CatsList"
        });
      }}
    >
      <Feather
        name="arrow-left"
        size={24}
        color="black"
        style={{ marginLeft: 15 }}
      />
    </TouchableOpacity>
  );
};

export default BackArrow;
