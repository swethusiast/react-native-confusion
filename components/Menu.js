import React, { Component } from 'react';
import { View, SafeAreaView, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
class Menu extends Component {
    state = {
        dishes: DISHES,
    };

    render() {
        const { navigate } = this.props.navigation;

        const renderMenuItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => {
                        console.log('====================================');
                        console.log(item.id);
                        console.log('====================================');
                        navigate('Dishdetail', { dishId: item.id });
                    }}
                    leftAvatar={{ source: require('./images/uthappizza.png') }}
                />
            );
        };
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={this.state.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </SafeAreaView>
        );
    }
}
export default Menu;
