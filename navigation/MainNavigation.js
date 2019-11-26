import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import CatsScreen from "../screens/CatsScreen";
import CalendarScreen from "../screens/CalendarScreen";
import InformationsScreen from "../screens/InformationsScreen";
import SensorsScreen from "../screens/SensorsScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import AddCatScreen from "../screens/AddCatScreen";
import AddEventScreen from "../screens/AddEventScreen";

const InformationsStack = createStackNavigator({
  InformationsStackScreen: InformationsScreen
});

const CalendarStack = createStackNavigator({
  CalendarStackScreen: CalendarScreen,
  AddEvent: AddEventScreen
});
const ShoppingStack = createStackNavigator({
  ShoppingStackScreen: ShoppingListScreen
});

const SensorsStack = createStackNavigator({
  SensorsStackScreen: SensorsScreen
});

const TabsNavigation = createMaterialBottomTabNavigator(
  {
    Informations: {
      screen: InformationsStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return (
            <MaterialCommunityIcons name="paw" size={25} color={tintColor} />
          );
        }
      }
    },
    Calendar: {
      screen: CalendarStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <AntDesign name="calendar" size={25} color={tintColor} />;
        }
      }
    },
    Shopping: {
      screen: ShoppingStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <AntDesign name="shoppingcart" size={25} color={tintColor} />;
        }
      }
    },
    Sensors: {
      screen: SensorsStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <AntDesign name="API" size={25} color={tintColor} />;
        }
      }
    }
  },
  {
    initialRouteName: "Informations",
    labeled: false,
    shifting: false,
    activeColor: "white"
  }
);

const CatListStackNavigator = createStackNavigator(
  {
    CatsList: {
      screen: CatsScreen,
      navigationOptions: {
        header: null
      }
    },
    AddCat: AddCatScreen
  },
  { initialRouteName: "CatsList" }
);

const MainNavigator = createStackNavigator(
  {
    CatsListNav: CatListStackNavigator,
    Cat: TabsNavigation
  },
  {
    defaultNavigationOptions: { header: null }
  }
);

export default createAppContainer(MainNavigator);
