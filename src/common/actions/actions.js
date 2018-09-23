import * as types from '../constants/ActionTypes';

function addMessage(message) {
    return {
        type: types.ADD_MESSAGE,
        message
    };
}

export function welcomePage(username) {
    return {
        type: types.SAVE_USERNAME,
        username
    };
}