/**
 * Created by davidzaludek on 24/03/17.
 */

import {GraphTypeEnum} from "../enums/index";

var initialData = {
    records:[],
    graphType:"DEFAULT",
    displayData: [],
    graphHandler: {}
}

export default function (state = initialData, action) {
    switch (action.type) {
        case 'UPDATE_RECORDS':
            return {...state,records:action.payload};
        case "SET_DISPLAY_DATA":
            return {...state,displayData:action.payload};
        case "SET_GRAPH_TYPE":
            return {...state,graphType:action.payload};
        case "SET_GRAPH_HANDLER":
            return {...state,graphHandler:action.payload};
        default:
            return state;
    }
    return state;
}
