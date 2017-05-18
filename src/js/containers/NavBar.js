/**
 * Created by davidzaludek on 24/03/17.
 */
import React, {Component} from 'react';

import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {Nav,NavItem,Navbar,NavDropdown,MenuItem,Label} from 'react-bootstrap';

import {changeView,userLogout} from "../actions/index";

import {ViewEnum} from "../enums/index";
import {Graphs} from "../Utils/graphs";

class NavBar extends Component {
    render() {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand pullLeft>
                        <NavItem onClick={() => this.props.changeView(ViewEnum.MAIN_VIEW)}>Bank statement analyzer</NavItem>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem onClick={() => this.props.changeView(ViewEnum.FILES_VIEW)}>Files</NavItem>
                        <NavDropdown title="Graphs" id="basic-nav-dropdown">
                            {Graphs.list.map((val) => {
                                return (<MenuItem key={val.chartEnum}
                                                  onClick={() => this.props.changeView(ViewEnum.GRAPH_VIEW, this.props.activeUser, val)}>{val.name}</MenuItem>);
                            })}
                        </NavDropdown>
                    </Nav>
                    {
                        this.props.activeUser.loggedIn ?
                            <Nav pullRight>
                                <Navbar.Text>{this.props.activeUser.name}</Navbar.Text>
                                <NavItem onClick={() => this.props.userLogout()}>LogOut</NavItem>
                            </Nav>
                            :
                            <Nav pullRight>
                                <NavItem onClick={() => this.props.changeView(ViewEnum.LOGIN_VIEW)}
                                         href="#">Login</NavItem>
                                <NavItem onClick={() => this.props.changeView(ViewEnum.SIGN_UP_VIEW)}>Sign
                                    up</NavItem>
                            </Nav>
                    }

                </Navbar.Collapse>
                <Label
                    bsStyle="danger">{((this.props.activeView === ViewEnum.FILES_VIEW || this.props.activeView === ViewEnum.GRAPH_VIEW) && (!this.props.activeUser.loggedIn)) ? "Guest mode, all data will be lost !" : "" }</Label>

            </Navbar>

        );
    }
}

function mapStateToProps(state) {
    return {
        activeView: state.activeView,
        activeUser: state.activeUser,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeView: changeView,
            userLogout: userLogout,
        }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(NavBar);