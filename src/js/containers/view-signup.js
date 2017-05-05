/**
 * Created by davidzaludek on 29/04/17.
 */
/**
 * Created by davidzaludek on 23/03/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {Form,FormGroup,Col,ControlLabel,FormControl,Checkbox,Button,Well,HelpBlock} from "react-bootstrap";

import {changeView, userSignUp} from "../actions/index";

class SignUpView extends Component {
    render() {
        return (
            <SighUpForm userSignUp={this.props.userSignUp} />
        );
    }
}

const SighUpForm = React.createClass({
    getInitialState() {
        return {
            name: 'Name',
            pass: 'Password',
            repeatPass: 'Repeat password'
        };
    },

    validation:{
        name: 'error',
        pass: 'error',
        repeatPass: 'error',
        isValid(){
            return this.name === "success" && this.pass === "success" && this.repeatPass === "success";
        },
    },

    onSubmit(e){
        e.preventDefault();

        if (this.validation.isValid())
        {
            this.props.userSignUp(this.state.name,this.state.pass);
        }
    },

    onChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log(value);
        console.log(name);

        this.setState({
            [name]: value
        });
    },

    formValidation(){
        if (this.state.name.length > 4) {
            this.validation.name = 'success';
        }else{
            this.validation.name = 'error';
        }

        if (this.state.pass.length > 7){
            this.validation.pass = 'success';
        }else{
            this.validation.pass = 'error';
        }

        if (this.state.pass == this.state.repeatPass){
            this.validation.repeatPass = 'success';
        }else{
            this.validation.repeatPass = 'error';
        }
    },

    render() {

        this.formValidation();

        return (
            <Well>
                <Form horizontal onSubmit={this.onSubmit} onChange={(e) => {this.onChange(e)}}>
                    <FormGroup controlId="formHorizontalName" validationState={this.validation.name}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10} lg={5}>
                            <FormControl type="name" placeholder={this.state.name} name="name"/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword" validationState={this.validation.pass}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10} lg={5}>
                            <FormControl type="password" placeholder={this.state.pass} name="pass"/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalRepeatPassword" validationState={this.validation.repeatPass}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Repeat password
                        </Col>
                        <Col sm={10} lg={5}>
                            <FormControl type="password" placeholder={this.state.repeatPass} name="repeatPass" />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button bsStyle='success' type='submit'> Sign in </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Well>
        );
    }
});



function mapStateToProps(state) {
    return {

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {changeView: changeView,userSignUp:userSignUp}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(SignUpView);
