import * as React from 'react';
import { Button, StyleSheet, TextInput, Text, View } from 'react-native';
import { connect } from 'react-redux';

// import { login } from '../api';
import { loginUser } from '../redux/actions';

class LoginScreen extends React.Component {

    // static propTypes = {
    //     err: PropTypes.string,
    //     token: PropTypes.string,
    //     loginUser: PropTypes.func,
    // }

    state = {
        username: '',
        password: '',
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.token) {
            this.props.navigation.navigate('Main')
        }
    }

    _login = async () => {
        this.props.loginUser(this.state.username, this.state.password)
    }

    handleUsernameUpdate = username => {
        this.setState({ username })
    }

    handlePasswordUpdate = password => {
        this.setState({ password })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{this.props.err}</Text>
                <TextInput
                    placeholder="Username"
                    value={this.state.username}
                    onChangeText={this.handleUsernameUpdate}
                    autoCapitalize="none" />

                <TextInput
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={this.handlePasswordUpdate}
                    autoCapitalize="none"
                    secureTextEntry />
                <Button
                    title="Press to login" onPress={this._login}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
    },
    error: {
        textAlign: 'center',
        color: 'red',
    }
});

const mapStateToProps = state => ({
    err: state.user.loginErr,
    token: state.user.token,
})

export default connect(mapStateToProps, { loginUser })(LoginScreen);