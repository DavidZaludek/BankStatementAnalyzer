import {combineReducers} from 'redux';
import ActiveView from './reducer-active-view';
import ActiveUserReducer from './reducer-active-user';
import GraphData from "./reducer-graph-data";

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    activeUser: ActiveUserReducer,
    activeView: ActiveView,
    graphData: GraphData
});

export default allReducers
