import React from "react";
import Room from "./room";
import VideoPlayer from "./videoPlayer";
import { connect } from "react-redux";
//insert css here using require statement


class Layout extends React.Component {
    render () {
        var result = null;

        if (this.props.rooms.fetched){
            result = <VideoPlayer />;
        }
        return (
            <div>
              <h1>NOW-SYNC</h1>
              <Room />
              { result }
            </div>
        );
    }
}


Layout.propTypes = {
    rooms: React.PropTypes.object,
    videoPlayerReducer: React.PropTypes.object
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(
    mapStateToProps
)(Layout);
