/**
 * Created by davidzaludek on 23/03/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {changeView} from  '../actions/index';
import {Jumbotron,Button,Grid,Row} from "react-bootstrap";

import {ViewEnum} from "../enums/index";

class MainView extends Component {
    render() {
        return (<Grid>
            <Row>
            <Jumbotron>
                <h1>Bank statement analyzer</h1>
                <p>Application to analyze financial transactions.</p>
                <p><Button onClick={()=>this.props.changeView(ViewEnum.LOGIN_VIEW)} bsStyle="primary" >Login</Button></p>
                <p><Button onClick={()=>this.props.changeView(ViewEnum.FILES_VIEW)} bsStyle="primary" >Continue as guest</Button></p>
            </Jumbotron>
            </Row></Grid>);
    }
}

function mapStateToProps(state) {
    return {
        user: state.activeUser
    };
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({changeView: changeView}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(MainView);