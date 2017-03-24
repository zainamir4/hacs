import React from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, ControlLabel, Col, FormControl} from "react-bootstrap";

import { createRoom, joinRoom } from "../actions/roomActions";
import { newURLInput, changeVideo } from "../actions/videoPlayerActions";
require("../../style/main.css");
var socket, password, url;

export class Room extends React.Component {
    constructor(props) {
        super(props);
    }

    handlePassword = e => {
        password = e.target.value;
    }

    handleVideoUrl = e => {
        url = e.target.value;
    }

    onsubmit(){
        this.props.createRoom(url, password);
    }

    joinRoom = e => {
        e.preventDefault();
        const roomName = this.refs.getRoomName.value;
        const pass = this.refs.getPass.value;
        this.props.rooms.room.roomname = roomName;
        this.props.rooms.password = pass;
        console.log(roomName, " ",  pass, "GOT HERE!!");
        socket.connect();

        socket.on("videoChange", (data) => {
            this.props.newURLInput(data.videoUrl);
            this.props.changeVideo(data.videoUrl);
        });

        socket.emit("join",{
            roomname: this.props.rooms.room.roomname,
            roompass: this.props.rooms.password
        });
        this.props.joinRoom2(roomName);
    }


    render () {
        return (
            <div>
                <Col smOffset={4} sm={4} className="create_room_container" >
                    <Form horizontal onSubmit= {e => {
                        e.preventDefault();
                        e.target.reset();
                        this.onsubmit();
                        }}>
                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={10}>
                                <FormControl type="password" placeholder="Room Password" onChange={this.handlePassword}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                VideoUrl
                            </Col>
                            <Col sm={10}>
                                <FormControl ref="url" type="text" placeholder="Video Url" onChange={this.handleVideoUrl}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                          <Col smOffset={2} sm={10}>
                            <Button bsStyle="primary" type="submit">
                              Create Room
                            </Button>
                          </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </div>
        );
    }
}

Room.propTypes = {
    createRoom: React.PropTypes.func,
    rooms: React.PropTypes.object,
    videoPlayerReducer: React.PropTypes.object,
    changeVideo: React.PropTypes.func,
    socket: React.PropTypes.object,
    location: React.PropTypes.string,
    joinRoom2: React.PropTypes.func,
    newURLInput: React.PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
    return {
        createRoom: (url, password) => dispatch(createRoom(url, password)),
        newURLInput: url => dispatch(newURLInput(url)),
        changeVideo: (url) => dispatch(changeVideo(url)),
        joinRoom2: (roomName) => dispatch(joinRoom(roomName))
    };
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Room);
