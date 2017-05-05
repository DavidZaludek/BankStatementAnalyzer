/**
 * Created by davidzaludek on 23/03/17.
 */

import {ViewEnum} from "../enums/index"

var initialState =  ViewEnum.MAIN_VIEW;

export default function (state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_VIEW':
            state = action.payload;
            return state;
        default:
            return state;
    }
}
