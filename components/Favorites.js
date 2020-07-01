import React, { Component } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './Loading';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        favorites: state.favorites,
    };
};
class Favorites extends Component {
    render() {
        const { navigate } = this.props.navigation;
        console.log('====================================');
        console.log(this.props.dishes);
        console.log(this.props.favorites);
        console.log('====================================');
        const renderMenuItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => {
                        navigate('Dishdetail', { dishId: item.id });
                    }}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                />
            );
        };
        if (this.props.dishes.isLoading) {
            return <Loading />;
        } else if (this.props.dishes.errMess) {
            return (
                <SafeAreaView>
                    <Text>{this.props.dishes.errMess}</Text>
                </SafeAreaView>
            );
        } else {
            console.log('====================================');
            console.log(this.props.favorites);
            console.log('====================================');
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        data={this.props.dishes.dishes.filter((dish) =>
                            this.props.favorites.some((el) => el === dish.id),
                        )}
                        renderItem={renderMenuItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </SafeAreaView>
            );
        }
    }
}
export default connect(mapStateToProps)(Favorites);
