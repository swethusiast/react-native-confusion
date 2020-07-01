import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import React, { Component } from 'react';
import { Image, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import About from './AboutUs';
import Contact from './ContactUs';
import Dishdetail from './Dishdetail';
import Reservation from './Reservation';
import Favorites from './Favorites';

import Home from './Home';
import Menu from './Menu';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { fetchComments, fetchDishes, fetchLeaders, fetchPromotions } from '../redux/ActionCreators';
const mapStateToProps = (state) => {
    return {
        leaders: state.leaders,
    };
};
const mapDispatchToProps = (dispatch) => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchPromotions: () => dispatch(fetchPromotions()),
});
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const screenOptions = (navigation) => {
    return {
        headerStyle: {
            backgroundColor: '#512DA8',
        },
        headerTintColor: '#000',
        headerTitleStyle: { color: '#fff' },
        gestureEnabled: true,
        headerLeftContainerStyle: { padding: 20 },
        headerLeft: () => (
            <Icon onPress={navigation.toggleDrawer} style={{ padding: 20 }} name="menu" size={24} color="#fff" />
        ),
    };
};
function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={({ navigation, route }) => screenOptions(navigation)}>
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
        </Stack.Navigator>
    );
}
function ReservationStack() {
    return (
        <Stack.Navigator
            initialRouteName="Reservation"
            screenOptions={({ navigation, route }) => screenOptions(navigation)}
        >
            <Stack.Screen name="Reservation" component={Reservation} options={{ title: 'Reservation' }} />
        </Stack.Navigator>
    );
}
function FavoritesStack() {
    return (
        <Stack.Navigator
            initialRouteName="Favorites"
            screenOptions={({ navigation, route }) => screenOptions(navigation)}
        >
            <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
        </Stack.Navigator>
    );
}
function ContactStack() {
    return (
        <Stack.Navigator
            initialRouteName="Contact"
            screenOptions={({ navigation, route }) => screenOptions(navigation)}
        >
            <Stack.Screen name="Contact" component={Contact} options={{ title: 'Contact Us' }} />
        </Stack.Navigator>
    );
}
function AboutStack() {
    return (
        <Stack.Navigator initialRouteName="About" screenOptions={({ navigation, route }) => screenOptions(navigation)}>
            <Stack.Screen name="About" component={About} options={{ title: 'About Us' }} />
        </Stack.Navigator>
    );
}
function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName="Menu"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#512DA8',
                },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' },
                gestureEnabled: true,
            }}
        >
            <Stack.Screen
                name="Menu"
                component={Menu}
                options={({ navigation, route }) => ({
                    headerTitle: 'Menu',
                    headerLeftContainerStyle: { padding: 20 },
                    headerLeft: () => (
                        <Icon
                            onPress={navigation.toggleDrawer}
                            style={{ padding: 20 }}
                            name="menu"
                            size={24}
                            color="#fff"
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ title: 'Dish Details' }}
                initialParams={{ user: 'me' }}
            />
        </Stack.Navigator>
    );
}
function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.drawerHeader}>
                    <View style={{ flex: 1 }}>
                        <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
                <DrawerItem label="Help" onPress={() => alert('Link to help')} />
            </SafeAreaView>
        </DrawerContentScrollView>
    );
}
export class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchLeaders();
        this.props.fetchPromotions();
        this.props.fetchComments();
    }
    render() {
        return (
            <SafeAreaProvider style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
                <NavigationContainer>
                    <Drawer.Navigator
                        initialRouteName="Home"
                        drawerContentOptions={{
                            activeTintColor: '#512DA8',
                            itemStyle: {
                                marginVertical: 5,
                            },
                        }}
                        drawerContent={(props) => <CustomDrawerContent {...props} />}
                    >
                        <Drawer.Screen
                            name="Home"
                            options={{
                                drawerLabel: 'Home',
                                drawerIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
                            }}
                            component={HomeStack}
                        />

                        <Drawer.Screen
                            name="About"
                            options={{
                                drawerLabel: 'About',
                                drawerIcon: ({ color }) => <Icon name="info" size={24} color={color} />,
                            }}
                            component={AboutStack}
                        />
                        <Drawer.Screen
                            name="Menu"
                            options={{
                                drawerLabel: 'Menu',
                                drawerIcon: ({ color }) => <Icon name="view-list" size={24} color={color} />,
                            }}
                            component={RootStack}
                        />
                        <Drawer.Screen
                            name="Contact"
                            options={{
                                drawerLabel: 'Contact',
                                drawerIcon: ({ color }) => <Icon name="contact-mail" size={24} color={color} />,
                            }}
                            component={ContactStack}
                        />
                        <Drawer.Screen
                            name="Reserve Table"
                            options={{
                                drawerLabel: 'Reserve Table',
                                drawerIcon: ({ color }) => (
                                    <Icon name="cutlery" type="font-awesome" size={24} color={color} />
                                ),
                            }}
                            component={ReservationStack}
                        />
                        <Drawer.Screen
                            name="My Favorites"
                            options={{
                                drawerLabel: 'Favorites',
                                drawerIcon: ({ color }) => (
                                    <Icon name="heart" type="font-awesome" size={24} color={color} />
                                ),
                            }}
                            component={FavoritesStack}
                        />
                    </Drawer.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60,
    },
});
