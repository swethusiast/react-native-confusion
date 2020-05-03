import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './Loading';
const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        leaders: state.leaders,
        promotions: state.promotions,
    };
};
function RenderItem({ item, isLoading, errMess }) {
    if (isLoading) {
        return <Loading />;
    } else if (errMess) {
        return (
            <View>
                <Text>{errMess}</Text>
            </View>
        );
    } else {
        if (item != null) {
            return (
                <Card
                    featuredTitle={item.name}
                    featuredSubtitle={item.designation}
                    image={{ uri: baseUrl + item.image }}
                >
                    <Text style={{ margin: 10 }}>{item.description}</Text>
                </Card>
            );
        } else {
            return <View />;
        }
    }
}
class Home extends Component {
    render() {
        return (
            <ScrollView>
                <RenderItem
                    item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    erreMess={this.props.dishes.erreMess}
                    isLoading={this.props.dishes.isLoading}
                />
                <RenderItem
                    item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    erreMess={this.props.promotions.erreMess}
                    isLoading={this.props.promotions.isLoading}
                />
                <RenderItem
                    item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    erreMess={this.props.leaders.erreMess}
                    isLoading={this.props.leaders.isLoading}
                />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);
