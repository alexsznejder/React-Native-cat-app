import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import CatsScreen from "../screens/CatsScreen";
import CalendarScreen from "../screens/CalendarScreen";
import InformationsScreen from "../screens/InformationsScreen";
import LastActivitiesScreen from "../screens/LastActivitiesScreen";
import SensorsScreen from "../screens/SensorsScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";

const TabsNavigation = createMaterialBottomTabNavigator(
  {
    LastActivities: {
      screen: LastActivitiesScreen,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return <AntDesign name="bars" size={25} color="white" />;
        }
      }
    },
    Calendar: {
      screen: CalendarScreen,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return <AntDesign name="calendar" size={25} color="white" />;
        }
      }
    },
    Informations: {
      screen: InformationsScreen,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return <MaterialCommunityIcons name="paw" size={25} color="white" />;
        }
      }
    },
    Shopping: {
      screen: ShoppingListScreen,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return <AntDesign name="shoppingcart" size={25} color="white" />;
        }
      }
    },
    Sensors: {
      screen: SensorsScreen,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return <AntDesign name="API" size={25} color="white" />;
        }
      }
    }
  },
  {
    initialRouteName: "Informations",
    labeled: false,
    shifting: true,
    activeColor: "black",
    inactiveColor: "white"
  }
);

const MainNavigator = createStackNavigator(
  {
    CatsList: CatsScreen,
    Cat: TabsNavigation
  },
  {
    defaultNavigationOptions: {}
  }
);

export default createAppContainer(MainNavigator);
