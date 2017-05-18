/**
 * Created by davidzaludek on 23/03/17.
 */
import React, {Component} from 'react';

import {bindActionCreators} from "redux";
import {connect} from 'react-redux';

import {Button,FormGroup,ControlLabel,HelpBlock,FormControl,Col,Grid,Row,Table} from "react-bootstrap";

import {changeView, uploadFile,deleteFile} from "../actions/index";

import {Banks} from '../Utils/banks';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class FilesView extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col sm={4} md={4} lg={3}>
                        <FormGroup>
                            <ControlLabel>Select bank</ControlLabel>
                            <FormControl componentClass="select" inputRef={(ref) => this.bankSelected = ref}>
                                {
                                    Banks.map((val) => {
                                        return (<option key={val.id} value={val.id}>{val.name}</option>);
                                    })
                                }
                            </FormControl>
                            <FieldGroup id="formControlsFile" type="file" label="File" help="Select banks statement from your bank." inputRef={(ref) => this.fileUpload = ref}/>
                            <Button onClick={() => this.props.uploadFile(this.fileUpload.files[0],Banks[this.bankSelected.options[this.bankSelected.selectedIndex].value],this.props.user)}>Upload file</Button>
                        </FormGroup>
                    </Col>
                    <Col sm={8} md={8} lg={9}>
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>File name</th>
                                <th>Bank</th>
                                <th>Date from</th>
                                <th>Date to</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.user.files.map((val) => {
                                    return (
                                        <tr key={val.uid}>
                                            <td>{val.name}</td>
                                            <td>{val.bankName}</td>
                                            <td>{val.dateFrom}</td>
                                            <td>{val.dateTo}</td>
                                            <td>
                                                <Button onClick={() => this.props.deleteFile(val.uid)}>x</Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.activeUser
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeView: changeView,
            uploadFile: uploadFile,
            deleteFile: deleteFile
        }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(FilesView);