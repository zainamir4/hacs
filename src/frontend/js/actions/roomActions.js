import axios from "axios";

export function createRoom(url, password) {
    return function(dispatch) {
        axios.put("/api/createroom", {
            roomPassword: password,
            videoUrl: url
        })
        .then((response) => {
            dispatch({type: "CreateRoom", payload: response.data, pass: password });
        })
        .catch((err) => {
            dispatch({type: "CreateRoomError", payload: err});
        });
    };
}

export function joinRoom(){
    // return function(dispatch) {
    //
    // };
}
