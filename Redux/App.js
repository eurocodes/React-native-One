import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import contacts from './contacts';

// import Screens
import ContactListscreen from './screens/ContactListScreen';

const MainStack = createStackNavigator({
  ContactList: ContactListscreen,
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

const AppContainer = createAppContainer(MainStack);

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

  toggle = () => this.setState(prevState => ({ showContacts: !prevState.showContacts }));

  showForm = () => this.setState({ showForm: true })

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
