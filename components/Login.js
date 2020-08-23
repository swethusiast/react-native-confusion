import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Icon, Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { baseUrl } from '../shared/baseUrl';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as ImageManipulator from 'expo-image-manipulator';
import Constants from 'expo-constants';

class LoginTab extends Component {
    state = {
        username: '',
        password: '',
        remember: false,
    };

    componentDidMount() {
        SecureStore.getItemAsync('userinfo').then((userdata) => {
            let userinfo = JSON.parse(userdata);
            if (userinfo) {
                this.setState({ username: userinfo.username });
                this.setState({ password: userinfo.password });
                this.setState({ remember: true });
            }
        });
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({ username: this.state.username, password: this.state.password }),
            ).catch((error) => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo').catch((error) => console.log('Could not delete user info', error));
        }
    }

    render() {
        return (
            <View>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({ username })}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({ remember: !this.state.remember })}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button onPress={() => this.handleLogin()} title="Login" color="#512DA8" />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title="Register"
                        clear
                        icon={<Icon name="user-plus" type="font-awesome" size={24} color="blue" />}
                        titleStyle={{
                            color: 'blue',
                        }}
                    />
                </View>
            </View>
        );
    }
}

class RegisterTab extends Component {
    state = {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        remember: false,
        imageUrl: baseUrl + 'images/logo.png',
    };

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [ 4, 3 ],
                quality: 1,
            });
            if (!result.cancelled) {
                this.processImage(result.uri);
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };
    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [ 4, 3 ],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }
    };

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulate(imageUri, [ { resize: { width: 400 } } ], {
            format: 'png',
        });
        console.log(processedImage);
        this.setState({ imageUrl: processedImage.uri });
    };

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({ username: this.state.username, password: this.state.password }),
            ).catch((error) => console.log('Could not save user info', error));
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: this.state.imageUrl }}
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image}
                        />
                        <Button title="Camera" onPress={this.getImageFromCamera} />
                        <Button title="Gallery" onPress={this._pickImage} />
                    </View>
                    <Input
                        placeholder="Username"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Password"
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="First Name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(firstname) => this.setState({ firstname })}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Last Name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(lastname) => this.setState({ lastname })}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Email"
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                    />
                    <CheckBox
                        title="Remember Me"
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({ remember: !this.state.remember })}
                        containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleRegister()}
                            title="Register"
                            icon={<Icon name="user-plus" type="font-awesome" size={24} color="white" />}
                            buttonStyle={{
                                backgroundColor: '#512DA8',
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    image: {
        margin: 10,
        width: 80,
        height: 60,
    },
    formInput: {
        margin: 10,
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null,
    },
    formButton: {
        margin: 30,
    },
});

const Tab = createBottomTabNavigator();

export default function Login() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Login" component={LoginTab} />
            <Tab.Screen name="Register" component={RegisterTab} />
        </Tab.Navigator>
    );
}
