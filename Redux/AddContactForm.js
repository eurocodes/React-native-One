import React from 'react'
import { Button, StyleSheet, TextInput, View, KeyboardAvoidingView } from 'react-native'
import Constants from 'expo-constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        minWidth: 100,
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
    },
})

export default class AddContactForm extends React.Component {
    state = {
        name: '',
        phone: '',
        isFormValid: false,
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.name !== prevState.name || this.state.phone !== prevState.phone) {
            this.validateForm()
        }
    }

    getHandler = key => val => {
        this.setState({ [key]: val })
    }

    handleNameChange = name => {
        this.setState({ name })
    }

    handlePhoneChange = phone => {
        this.setState({ phone })
    }

    validateForm = () => {
        const names = this.state.name.split(' ')
        if (+this.state.phone >= 0 && this.state.phone.length === 10 && names.length >= 2 && names[0] && names[1]) {
            this.setState({ isFormValid: true })
        } else {
            this.setState({ isFormValid: false })
        }
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state)
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        value={this.state.name}
                        onChangeText={this.getHandler("name")}
                        placeholder="Name"
                    />
                    <TextInput
                        keyboardType="numeric"
                        style={styles.input}
                        value={this.state.phone}
                        onChangeText={this.getHandler("phone")}
                        placeholder="Phone"
                    />
                    <Button title="Submit" onPress={this.handleSubmit} disabled={!this.state.isFormValid} />
                </View>
            </KeyboardAvoidingView>
        )
    }
}
