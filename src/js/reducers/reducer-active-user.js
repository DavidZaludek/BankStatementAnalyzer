import {default as UUID} from "node-uuid";

var initialState = {
    uid: UUID.v4(),
    name: "default",
    loggedIn: false,
    files:[]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'USER_LOGIN':
            state = action.payload;
            return state;
        case 'USER_LOGOUT':
            state = initialState;
            state.uid = UUID.v4();
            return state;
        case 'ADD_FILE':
            state.files.push(action.payload);
            return {...state};
        case 'REMOVE_FILE':{
            for (var i =0; i < state.files.length; i++){
                if (state.files[i].uid === action.payload) {
                    state.files.splice(i,1);
                    break;
                }
            }
            return {...state};
        }
        default:
            return state;
    }
}
