/**
 * Created by davidzaludek on 04/05/17.
 */

import React, {Component} from 'react';

import {FormControl,ControlLabel} from "react-bootstrap";

import {Currencies} from "../enums/currencies"
import DatePicker from "react-bootstrap-date-picker";

export class DatePickerElement extends Component {
    render() {
        return (<div>
            <ControlLabel>{this.props.label}</ControlLabel>
            <DatePicker
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.onChange} />
        </div>);
    }
}

export class SliderElement extends Component {
    render() {
        return (
            <div>
                <ControlLabel>{this.props.label}</ControlLabel>
                <ControlLabel>{this.props.displayGranularity}</ControlLabel>
                <FormControl
                    name={this.props.name}
                    defaultValue={this.props.defaultValue}
                    type="range"
                    min={this.props.min}
                    max={this.props.max}
                    onChange={this.props.onChange}
                ></FormControl>
            </div>);
    }
}

export class CurrencySelectElement extends Component {
    render() {
        return (
            <div>
                <ControlLabel>Select currency :</ControlLabel>
                <FormControl name="currency" componentClass="select" onChange={this.props.onChange}>
                    {
                        Currencies.list.map((val) => {
                            return (<option key={val.code} selected={val.code === this.props.selected}
                                            name={this.props.name} value={val.code}>{val.name}</option>)
                        })
                    }
                </FormControl>

            </div>
        );
    }
}