/**
 * Created by davidzaludek on 23/03/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {Form,FormGroup,Col,ControlLabel,FormControl,Checkbox,Button,Well} from "react-bootstrap";

import {changeView, userLogin} from "../actions/index";

class LoginView extends Component {


    render() {
        return (
            <LogInForm userLogin={this.props.userLogin} />
        );
    }
}

const LogInForm = React.createClass({
        getInitialState() {
            return {
                name: 'Name',
                pass: 'Password'
            };
        },

        onChange(e){
            const target = e.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            this.setState({
                [name]: value
            });
        },

        render() {
            return (
                <Well>
                    <Form horizontal onChange={this.onChange}>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={10} lg={5}>
                                <FormControl name="name" type="name" placeholder="Name"/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={10} lg={5}>
                                <FormControl name="pass" type="pass" placeholder="Password"/>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10} lg={5}>
                                <Checkbox>Remember me</Checkbox>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button onClick={() => this.props.userLogin(this.state.name, this.state.pass)}>
                                    Sign in
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Well>
            );
        }
    }
);

function mapStateToProps(state) {
    return {

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeView: changeView,userLogin:userLogin}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(LoginView);
