import React, { Component } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './Loading';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
    };
};
class Menu extends Component {
    render() {
        const { navigate } = this.props.navigation;

        const renderMenuItem = ({ item, index }) => {
            return (
                <TouchableOpacity>
                    <Tile
                        key={index}
                        title={item.name}
                        caprion={item.description}
                        featured
                        onPress={() => {
                            navigate('Dishdetail', { dishId: item.id });
                        }}
                        imageSrc={{ uri: baseUrl + item.image }}
                    />
                </TouchableOpacity>
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
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        data={this.props.dishes.dishes}
                        renderItem={renderMenuItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </SafeAreaView>
            );
        }
    }
}
export default connect(mapStateToProps)(Menu);
