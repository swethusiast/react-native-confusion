import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
function RenderItem({ item }) {
    if (item != null) {
        return (
            <Card
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={require('./images/uthappizza.png')}
            >
                <Text style={{ margin: 10 }}>{item.description}</Text>
            </Card>
        );
    } else {
        return <View />;
    }
}
class Home extends Component {
    state = {
        dishes: DISHES,
        promotions: PROMOTIONS,
        leaders: LEADERS,
    };
    render() {
        return (
            <ScrollView>
                <RenderItem item={this.state.dishes.filter((dish) => dish.featured)[0]} />
                <RenderItem item={this.state.promotions.filter((promo) => promo.featured)[0]} />
                <RenderItem item={this.state.leaders.filter((leader) => leader.featured)[0]} />
            </ScrollView>
        );
    }
}

export default Home;
