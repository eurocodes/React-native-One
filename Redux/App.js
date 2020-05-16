import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";

import contacts from './contacts';

// import Screens
import ContactListscreen from './screens/ContactListScreen';
import AddContactScreen from './screens/AddContactScreen';
import ContactDetailsScreen from './screens/ContactDetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';


const MainStack = createStackNavigator({
  ContactList: ContactListscreen,
  ContactDetails: ContactDetailsScreen,
  AddContact: AddContactScreen,
},
  {
    initialRoutName: "ContactList",
    navigationOptions: {
      headerTintColor: '#a41034',
      headerStyle: {
        backgroundColor: '#fff',
      }
    }
  }
);

MainStack.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <Ionicons
      name={`ios-contacts${focused ? "" : "-outline"}`}
      size={25}
      color={tintColor}
    />
  )
};

const MainTabs = createBottomTabNavigator({
  Contacts: MainStack,
  Settings: SettingsScreen,
}, {
  tabBarOptions: {
    activeTintColor: '#a41034',
  }
});

const AppNavigator = createSwitchNavigator({
  Login: LoginScreen,
  Main: MainTabs,
})

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  state = {
    showContacts: false,
    showForm: false,
    contacts,
  }

  addContact = newContact => {
    this.setState(prevState => ({
      showForm: false,
      contacts: [...prevState.contacts, newContact]
    }))
  }

  render() {
    return (
      <AppContainer
        screenProps={{ contacts: this.state.contacts, addContact: this.addContact }}
      />
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});
