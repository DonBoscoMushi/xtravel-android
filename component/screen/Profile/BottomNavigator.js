import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Home" component={Login} />
      <Tab.Screen name="Contact" component={Profile} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;