import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// import Components
import contacts from './contacts';
import Row from './Row';
// import ScrollViewContacts from './ScrollViewContacts';
import SectionListContacts from './SectionListContacts';
import AddContactForm from './AddContactForm';

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
    if (this.state.showForm) return <AddContactForm onSubmit={this.addContact} />
    return (
      <View style={styles.container}>
        <Button title="Toggle Contact" onPress={this.toggle} />
        <Button title="add Contact" onPress={this.showForm} />
        {this.state.showContacts && (<SectionListContacts contacts={this.state.contacts} />)}
      </View>
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
