import React, { Component } from 'react';
import { ScrollView, View, Button, Modal, Text, FlatList } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites,
    };
};
const mapDispatchToProps = (dispatch) => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
});
function RenderComments({ comments }) {
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Rating imageSize={20} readonly startingValue={item.rating} style={{ paddingVertical: 10 }} />
                </View>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Card title="Comments">
            <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={(item) => item.id.toString()} />
        </Card>
    );
}

const RenderDish = ({ dish, favorite, onPress, addCommentModal }) => {
    if (dish != null) {
        return (
            <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
                <Text style={{ margin: 10 }}>{dish.description}</Text>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    <Icon
                        raised
                        reverse
                        name={favorite ? 'heart' : 'heart-o'}
                        type="font-awesome"
                        color="#f50"
                        onPress={() => (favorite ? console.log('Already favorite') : onPress())}
                    />
                    <Icon
                        raised
                        reverse
                        name={'pencil'}
                        type="font-awesome"
                        color="#512DA8"
                        onPress={() => addCommentModal()}
                    />
                </View>
            </Card>
        );
    } else {
        return <View />;
    }
};
class Dishdetail extends Component {
    state = {
        showModal: false,
        rating: 0,
        author: '',
        comment: '',
    };
    toggleModal = () => {
        this.setState((state, props) => ({ showModal: !state.showModal }));
    };
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    ratingCompleted = (rating) => {
        console.log('Rating is: ' + rating);
        this.setState({ rating });
    };
    handleComments = (dishId) => {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
    };
    resetForm = () => {
        this.setState({
            showModal: false,
            rating: 0,
            author: '',
            comment: '',
        });
    };
    render() {
        const dishId = this.props.route.params.dishId;
        return (
            <ScrollView>
                <RenderDish
                    dish={this.props.dishes.dishes[dishId]}
                    favorite={this.props.favorites.some((el) => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    addCommentModal={this.toggleModal}
                />
                <RenderComments
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}
                />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}
                >
                    <Rating onFinishRating={this.ratingCompleted} showRating fractions="1" />
                    <Input
                        placeholder="Author"
                        onChangeText={(value) => this.setState({ author: value })}
                        leftIcon={<Icon name="user-o" type="font-awesome" size={24} color="black" />}
                    />
                    <Input
                        placeholder="Comment"
                        onChangeText={(value) => this.setState({ comment: value })}
                        leftIcon={<Icon name="comment-o" type="font-awesome" size={24} color="black" />}
                    />
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => {
                                this.handleComments(dishId);
                                this.resetForm();
                            }}
                            color="#512DA8"
                            title="Submit"
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => {
                                this.resetForm();
                            }}
                            color="#c8c8c8"
                            title="Cancel"
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
