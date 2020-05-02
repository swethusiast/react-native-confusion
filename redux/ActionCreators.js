import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Erro ' + response.status + ' : ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                let error = new Error(error.message);
                throw error;
            },
        )
        .then((response) => response.json())
        .then((comments) => dispatch(addComments(comments)))
        .catch((error) => dispatch(commentsFailed(error.message)));
};

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments,
});
export const commentsFailed = (errMess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess,
});

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());

    return fetch(baseUrl + 'dishes')
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                let error = new Error(error.message);
                throw error;
            },
        )
        .then((response) => response.json())
        .then((dishes) => dispatch(addDishes(dishes)))
        .catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess,
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes,
});

export const fetchPromotions = () => (dispatch) => {
    dispatch(promotionsLoading());
    return fetch(baseUrl + 'promotions')
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                let error = new Error(error.message);
                throw error;
            },
        )
        .then((response) => response.json())
        .then((promotions) => dispatch(addPromotions(promotions)))
        .catch((error) => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING,
});

export const promotionsFailed = (errMess) => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess,
});

export const addPromotions = (promotions) => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions,
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                let error = new Error(error.message);
                throw error;
            },
        )
        .then((response) => response.json())
        .then((leaders) => dispatch(addLeaders(leaders)))
        .catch((error) => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errMess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMess,
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders,
});
