/**
 * Created by davidzaludek on 23/03/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {changeView} from  '../actions/index';
import {Jumbotron,Button} from "react-bootstrap";

import {ViewEnum} from "../enums/index";

class MainView extends Component {
    render() {
        return (<div>
            <Jumbotron>
                <h1>Analyzator financnych tranzakcii</h1>
                <p>Aplikacia na analyzu vypisou z uctu.</p>
                <p><Button onClick={()=>this.props.changeView(ViewEnum.LOGIN_VIEW)} bsStyle="primary" >Login</Button></p>
                <p><Button onClick={()=>this.props.changeView(ViewEnum.FILES_VIEW)} bsStyle="primary" >Continue as guest</Button></p>
            </Jumbotron>
        </div>);
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