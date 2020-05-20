import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import contacts from './contacts';
import { store, persistor } from './redux/store';

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
    contacts,
  }

  /*
  componentDidMount() {
    this.getUsers()
  }

  getUsers = async () => {
    const results = await fetchUsers()
    this.setState({contacts: results})
  }
  */

  addContact = newContact => {
    this.setState(prevState => ({
      showForm: false,
      contacts: [...prevState.contacts, newContact]
    }))
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
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
