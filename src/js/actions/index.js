import {default as UUID} from "node-uuid";
import {GranuarityEnum,ViewEnum} from "../enums/index";
import db from "../Utils/database";
import {hashPassword} from "../Utils";
import CryptoJS from "crypto-js";


export function userLogin(username,password) {
    return (dispatch) => {
            db.table('users').where("name").equals(username).first()
            .then((user) => {
                console.log("LOG IN")
                console.log({msg:"user",user});

                if (user.passHash !== hashPassword(password,user.salt)){
                    console.log("WRONG PASS");
                }else {
                    db.files.where("userUID").equals(user.uid).toArray().then(
                        (files) => {
                            dispatch({
                                type: "USER_LOGIN",
                                payload: {
                                    uid: user.uid,
                                    name: user.name,
                                    loggedIn: true,
                                    files: files
                                }
                            });
                        }
                    )
                }
            });
    }
}

export function userSignUp(username,password) {
    return (dispatch) => {

        var saltWArray = CryptoJS.lib.WordArray.random(128/8).toString();
        var uid = UUID.v4();

        var passHash = hashPassword(password,saltWArray);

        db.table('users').add({uid: uid,name:username,passHash:passHash,salt:saltWArray});

        dispatch({
            type: "USER_LOGIN",
            payload: {
                uid: uid,
                name: username,
                loggedIn: true,
                files: []
            }
        });

        dispatch({
            type: "CHANGE_VIEW",
            payload: ViewEnum.FILES_VIEW
        });
    }
}

export function userLogout() {
    return {
        type: "USER_LOGOUT",
        payload: {
            uid: "",
            name: "default",
            loggedIn: false,
            files: []
        }
    }
}

export function uploadFile(file,bank,user) {
    var textType = /text.*/;
    var reader = new FileReader();

    if (file.type.match(textType)) {
        reader.readAsText(file);
    }
    else
        return {
            type: "UPLOAD_FILE_FAILED",
        };

    return (dispatch) => {
        reader.onload = () => {

            var tmpRecords = bank.parse(reader.result);

            var uId = UUID.v4();

            for (var o in tmpRecords) {
                tmpRecords[o].fileUID = uId;
                tmpRecords[o].uid = UUID.v4();
                tmpRecords[o].bankName = bank.bankEnum;
                tmpRecords[o].userUID = user.uid;
                db.records.add(tmpRecords[o]);
            }

            var parsedFile = {
                uid: uId,
                userUID: user.uid,
                name: file.name,
                dateFrom: tmpRecords[0].date.toString(),
                dateTo: tmpRecords[tmpRecords.length - 1].date.toString(),
                bankName: bank.bankEnum
            };

            db.files.add(
                parsedFile
            ).then(() => {
                    dispatch({
                        type: "ADD_FILE",
                        payload: parsedFile
                    });
                }
            );
        };
    };
}

export function deleteFile(fileId) {
    return (dispatch) => {
        db.files.delete(fileId).then(()=>{
            db.records.where("fileUID").equals(fileId).toArray().then((records)=>{
                records.forEach((record)=>{
                    db.records.delete(record.uid);
                });
                dispatch(
                    {
                        type : "REMOVE_FILE",
                        payload : fileId
                    }
                );
            });
        });
    };
}

export function changeView(view,user,graph) {
    return (dispatch) => {
        if (view === ViewEnum.GRAPH_VIEW) {
            db.records.where("userUID").equals(user.uid).toArray().then(
                (records)=>{
                    dispatch({
                        type:"UPDATE_RECORDS",
                        payload: records
                    });

                    var handler = graph.getHandler();

                    dispatch({
                        type:"SET_GRAPH_HANDLER",
                        payload: handler
                    });

                    var data = handler.filterRecords(records,handler.getFilter());

                    dispatch( {
                        type: "SET_DISPLAY_DATA",
                        payload: data
                    })

                    dispatch({
                        type: "CHANGE_VIEW",
                        payload: view
                    });
                }
            );
        } else {
            dispatch({
                type: "CHANGE_VIEW",
                payload: view
            });
        }
    }
}

export function filterData(records,filterFunction,filterSettings){
    return (dispatch) => {
        var data = filterFunction(records,filterSettings);
        dispatch( {
            type: "SET_DISPLAY_DATA",
            payload: data
        })
    };
}
