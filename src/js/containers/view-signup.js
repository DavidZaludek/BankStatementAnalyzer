/**
 * Created by davidzaludek on 29/04/17.
 */
/**
 * Created by davidzaludek on 23/03/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {Form,FormGroup,Col,ControlLabel,FormControl,Grid,Row,Button,Well,HelpBlock} from "react-bootstrap";

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
            repeatPass: 'Repeat password',
        };
    },

    validation:{
        name: '',
        pass: '',
        repeatPass: '',
        nameError:"",
        passError:"",
        repeatPassError:"",
        userExists:false,
        isValid(){
            return this.name === "success" && this.pass === "success" && this.repeatPass === "success";
        },
    },

    onSubmit(e){
        e.preventDefault();

        if (this.validation.isValid())
        {
            this.props.userSignUp(this.state.name,this.state.pass);
            this.validation.userExists = true;
            this.validation.name = "error";
            this.validation.nameError = "Username already exists in database.";
            this.setState({...this.state});
        }
    },

    onChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name === "name")
            this.validation.userExists = false;

        this.setState({
            [name]: value
        });
    },

    formValidation(){
        if (this.state.name.length > 4) {
            this.validation.name = 'success';
            this.validation.nameError = "";
        }else{
            this.validation.name = 'warning';
            this.validation.nameError = "Name minimum length is 4."
        }

        if (this.validation.userExists){
            this.validation.name = "error";
            this.validation.nameError = "Username already exists in database."
        }

        if (this.state.pass.length > 7){
            this.validation.pass = 'success';
            this.validation.passError = "";
        }else{
            this.validation.pass = 'warning';
            this.validation.passError = "Password minimum length is 8."
        }

        if (this.state.pass === this.state.repeatPass){
            this.validation.repeatPass = 'success';
            this.validation.repeatPassError = "";
        }else{
            this.validation.repeatPass = 'error';
            this.validation.repeatPassError = "Password miss match."
        }
    },

    render() {

        this.formValidation();

        return (
            <Grid>
                <Row>
                    <Well>
                        <Form horizontal onSubmit={this.onSubmit} onChange={(e) => {
                            this.onChange(e)
                        }}>
                            <FormGroup controlId="formHorizontalName" validationState={this.validation.name}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Name
                                </Col>
                                <Col sm={10} lg={5}>
                                    <FormControl type="name" placeholder={this.state.name} name="name"/>
                                    <HelpBlock>{this.validation.nameError}</HelpBlock>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword" validationState={this.validation.pass}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                </Col>
                                <Col sm={10} lg={5}>
                                    <FormControl type="password" placeholder={this.state.pass} name="pass"/>
                                    <HelpBlock>{this.validation.passError}</HelpBlock>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalRepeatPassword"
                                       validationState={this.validation.repeatPass}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Repeat password
                                </Col>
                                <Col sm={10} lg={5}>
                                    <FormControl type="password" placeholder={this.state.repeatPass} name="repeatPass"/>
                                    <HelpBlock>{this.validation.repeatPassError}</HelpBlock>
                                </Col>
                            </FormGroup>


                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button bsStyle='success' type='submit'> Sign in </Button>
                                </Col>

                            </FormGroup>
                        </Form>
                    </Well>
                </Row>
            </Grid>
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
