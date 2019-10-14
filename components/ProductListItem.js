import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const ProductListItem = props => {
  return (
    <View style={styles.container}>
      <CheckBox
        containerStyle={styles.checkBox}
        checked={!props.active}
        onPress={() => props.handleCheckBoxPress(props.id)}
      />
      <Text
        style={
          props.active ? styles.text : { ...styles.text, ...styles.checkedPro }
        }
      >
        {props.name}
      </Text>
      <View style={styles.deleteIcon}>
        <AntDesign
          name="delete"
          size={22}
          color="lightgray"
          onPress={() => props.handleProductDelete(props.id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    flexGrow: 1,
    fontSize: 16
  },
  checkBox: {
    padding: 0,
    paddingLeft: 10
  },
  deleteIcon: {
    marginRight: 25
  },
  checkedPro: {
    textDecorationLine: "line-through"
  }
});

export default ProductListItem;
