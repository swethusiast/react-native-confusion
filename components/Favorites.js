import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import { deleteFavorite } from '../redux/ActionCreators';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './Loading';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});
const mapDispatchToProps = (dispatch) => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
});
const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        favorites: state.favorites,
    };
};
class Favorites extends Component {
    render() {
        const closeRow = (rowMap, rowKey) => {
            if (rowMap[rowKey]) {
                rowMap[rowKey].closeRow();
            }
        };
        const { navigate } = this.props.navigation;
        const renderMenuItem = (rowData, rowMap) => {
            return (
                <View>
                    <ListItem
                        key={rowData.index}
                        leftAvatar={{ source: { uri: baseUrl + rowData.item.image } }}
                        title={rowData.item.name}
                        subtitle={rowData.item.description}
                        onPress={() => {
                            navigate('Dishdetail', { dishId: rowData.item.id });
                        }}
                        bottomDivider
                    />
                </View>
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
                    <SwipeListView
                        data={this.props.dishes.dishes.filter((dish) =>
                            this.props.favorites.some((el) => el === dish.id),
                        )}
                        renderItem={renderMenuItem}
                        keyExtractor={(item) => item.id.toString()}
                        renderHiddenItem={(rowData, rowMap) => (
                            <View style={styles.rowBack}>
                                <TouchableOpacity
                                    style={[ styles.backRightBtn, styles.backRightBtnLeft ]}
                                    onPress={() => closeRow(rowMap, rowData.item.id)}
                                >
                                    <Text style={styles.backTextWhite}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[ styles.backRightBtn, styles.backRightBtnRight ]}
                                    onPress={() => {
                                        Alert.alert(
                                            'Delete Favorite?',
                                            'Are you sure you wish to delete the favorite dish ' +
                                                rowData.item.name +
                                                '?',
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => closeRow(rowMap, rowData.item.id),
                                                    style: ' cancel',
                                                },
                                                {
                                                    text: 'OK',
                                                    onPress: () => this.props.deleteFavorite(rowData.item.id),
                                                },
                                            ],
                                            { cancelable: false },
                                        );
                                    }}
                                >
                                    <Text style={styles.backTextWhite}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                    />
                </SafeAreaView>
            );
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
