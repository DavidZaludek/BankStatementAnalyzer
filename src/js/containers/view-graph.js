/**
 * Created by davidzaludek on 23/03/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Col,Grid,Row} from "react-bootstrap";
import {bindActionCreators} from "redux";

import {filterData} from "../actions";

class GraphView extends Component {

    render() {
        return (
            <Grid>
                <Row>
                    <Col sm={4} md={4} lg={3}>
                        {
                            this.props.graphData.graphHandler.renderForm(() => {
                                this.props.filterData(this.props.graphData.records, this.props.graphData.graphHandler.filterRecords, this.props.graphData.graphHandler.filter)
                            })
                        }
                    </Col>
                    <Col sm={8} md={8} lg={9}>
                        {
                            this.renderGraph()
                        }
                    </Col>
                </Row>
            </Grid>);
    }

    renderGraph() {
        return this.props.graphData.graphHandler.renderGraph(this.props.graphData.displayData);
    }
}

function mapStateToProps(state) {
    return {
        user: state.activeUser,
        graphData: state.graphData,
        graphHandler: state.graphData.graphHandler
    };
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({filterData: filterData}, dispatch);
}


export default connect(mapStateToProps,matchDispatchToProps)(GraphView);