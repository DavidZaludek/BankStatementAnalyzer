/**
 * Created by davidzaludek on 01/05/17.
 */
/* eslint-disable */
import React from 'react';

import {FormGroup,ControlLabel,Radio,Grid,Col,Row,Label,Button} from "react-bootstrap";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend,ReferenceLine,ResponsiveContainer,LineChart, Line,PieChart,Pie,Cell } from 'recharts';
import moment from "moment";

import {GranularityEnum,TransactionTypeEnum} from "../enums";
import {Currencies} from "../enums/currencies"

import {Banks} from "../Utils/banks";

import {DatePickerElement,SliderElement,CurrencySelectElement} from "../components/filterFormElements";

import {fx} from "money";

export const Graphs = {
    list: [
        {
            name: "Spending by period",
            chartEnum: "SPENDING_BY_PERIOD",
            getHandler(){
                return {
                    filter: {
                        dateFrom: moment().subtract(12, 'months').toISOString(),
                        dateTo: moment().toISOString(),
                        granularity: 0,
                        currency: "CZK"
                    },

                    getFilter(){
                        return this.filter;
                    },

                    handleDateChange(e, name){
                        this.filter[name] = e;
                    },

                    handleChange(e){
                        const target = e.target;
                        const value = target.type === 'checkbox' ? target.checked : target.value;
                        const name = target.name;

                        this.filter[name] = value;
                    },

                    renderForm(filterChangeHandler){
                        return (
                            <FormGroup>
                                <DatePickerElement label="From :"
                                                   name="dateFrom"
                                                   value={this.filter.dateFrom}
                                                   onChange={(e) => {
                                                       this.handleDateChange(e, "dateFrom");
                                                   }}/>

                                <DatePickerElement label="To :"
                                                   name="dateTo"
                                                   value={this.filter.dateTo}
                                                   onChange={(e) => {
                                                       this.handleDateChange(e, "dateTo");
                                                   }}
                                />

                                <SliderElement
                                    label="Granularity :"
                                    name="granularity"
                                    displayGranularity={GranularityEnum.list[this.filter.granularity].name}
                                    defaultValue={0}
                                    type="range"
                                    min={0}
                                    max={GranularityEnum.list.length - 1}
                                    onChange={(e) => {
                                        this.handleChange(e);
                                    }}
                                ></SliderElement>

                                <CurrencySelectElement name="currency" onChange={(e) => {
                                    this.handleChange(e);
                                }} selected={this.filter.currency}>
                                </CurrencySelectElement>

                                <Button onClick={() => {
                                    filterChangeHandler()
                                }}>Generate</Button>
                            </FormGroup>
                        );
                    },

                    filterRecords(records, filter){

                        console.log("FILTERING DATA");

                        var tmpFilter = {};

                        tmpFilter.from = moment(filter.dateFrom);
                        tmpFilter.to = moment(filter.dateTo);
                        tmpFilter.granularity = filter.granularity;
                        tmpFilter.currency = Currencies.getCurrency(filter.currency);

                        var tmpRecords = [];

                        for (var index = 0; index < records.length; ++index) {
                            var tmpRecord = records[index];
                            if (moment(tmpRecord.date).isAfter(tmpFilter.from) && moment(tmpRecord.date).isBefore(tmpFilter.to)) {
                                tmpRecords.push(tmpRecord);
                            }
                        }

                        tmpRecords.sort((a, b) => {
                            if (moment(a.date).isBefore(moment(b.date))) {
                                return -1;
                            }
                            if (moment(a.date).isAfter(moment(b.date))) {
                                return 1;
                            }
                            return 0;
                        });

                        tmpRecords = tmpRecords.map((rec) => {
                            var val = JSON.parse(JSON.stringify(rec));
                            val.amount = fx(val.amount).from(val.currency).to(tmpFilter.currency.code);
                            val.currency = tmpFilter.currency.code;
                            return val;
                        });

                        var formatString = "D MM YYYY";

                        switch (GranularityEnum.list[filter.granularity].enum) {
                            case GranularityEnum.DAY:
                                formatString = "D MM YYYY";
                                break;
                            case GranularityEnum.WEEK:
                                formatString = "WW YYYY";
                                break;
                            case GranularityEnum.MONTH:
                                formatString = "MMM YYYY";
                                break;
                            case GranularityEnum.YEAR:
                                formatString = "YYYY";
                                break;
                            default:
                                break;
                        }

                        var startDate = tmpFilter.from;

                        var tmpDisplayData = [];

                        index = 0;

                        while (tmpRecords.length > 0 && startDate.isSameOrBefore(tmpFilter.to)) {

                            var formattedStartDate = startDate.format(formatString).toString();

                            var amountPlus = 0;
                            var amountMinus = 0;

                            tmpRecord = tmpRecords[index];

                            while (index < tmpRecords.length && moment(tmpRecord.date).format(formatString).toString() === formattedStartDate) {
                                tmpRecord = tmpRecords[index];
                                if (tmpRecord.amount > 0) {
                                    amountPlus += tmpRecord.amount;
                                }
                                else {
                                    amountMinus += tmpRecord.amount;
                                }

                                index++;

                                if (index >= tmpRecords.length) {
                                    break;
                                }
                            }

                            tmpDisplayData.push({
                                amountPlus: amountPlus.toFixed(3),
                                amountMinus: amountMinus.toFixed(3),
                                formattedDate: formattedStartDate
                            });

                            startDate = startDate.add(1, 'd');
                            while (startDate.format(formatString) === formattedStartDate) {
                                startDate = startDate.add(1, 'd');
                            }
                        }

                        return tmpDisplayData;
                    },

                    renderGraph(graphData){
                        return (
                            <ResponsiveContainer aspect={1}>
                                <BarChart data={graphData}
                                          margin={{top: 5, right: 30, left: 20, bottom: 5}} stackOffset="sign">
                                    <XAxis dataKey="formattedDate"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend />
                                    <ReferenceLine y={0} stroke='#000'/>
                                    <Bar dataKey="amountPlus" stackId="a" fill="#0000ff"/>
                                    <Bar dataKey="amountMinus" stackId="a" fill="#ff0000"/>
                                </BarChart>
                            </ResponsiveContainer>
                        );
                    }
                };
            }
        }
        ,
        {
            name: "Spending by category",
            chartEnum: "SPENDING_BY_CATEGORY",
            getHandler(){
                return {
                    filter: {
                        category: GranularityEnum.WEEK,
                        currency: "CZK"
                    },

                    getFilter(){
                        return this.filter;
                    },

                    handleDateChange(e, name){
                        this.filter[name] = e;
                    },

                    handleChange(e){
                        const target = e.target;
                        const value = target.type === 'checkbox' ? target.checked : target.value;
                        const name = target.name;
                        this.filter[name] = value;
                    },

                    renderForm(filterChangeHandler){
                        return (

                            <FormGroup>

                                <ControlLabel>Select category :</ControlLabel>
                                <FormGroup name="category" onChange={(e) => {
                                    this.handleChange(e);
                                    filterChangeHandler()
                                }}>
                                    <Radio name="category" value={GranularityEnum.WEEK}>
                                        Days of week
                                    </Radio>
                                    <Radio name="category" value={GranularityEnum.MONTH}>
                                        Months of year
                                    </Radio>
                                    <Radio name="category" value="TRANSACTION_TYPE">
                                        Transaction types
                                    </Radio>
                                    <Radio name="category" value="COMPANY_NAME">
                                        Company name
                                    </Radio>
                                </FormGroup>
                                <CurrencySelectElement name="currency" onChange={(e) => {
                                    this.handleChange(e);
                                    filterChangeHandler()
                                }} selected={this.filter.currency}>
                                </CurrencySelectElement>
                            </FormGroup>
                        );
                    },

                    filterRecords(records, filter){
                        var tmpFilter = {};

                        tmpFilter.granularity = filter.granularity;
                        tmpFilter.currency = Currencies.getCurrency(filter.currency);

                        var formatString = "D MM YYYY";

                        var tmpDisplayData = [];

                        switch (filter.category) {
                            case GranularityEnum.WEEK:
                                formatString = "dddd";
                                for (var i = 0; i < 7; i++) {

                                    var date = moment().day(i).format(formatString);

                                    var tmpRecords = records.filter((val) => {
                                        return moment(val.date).format(formatString).toString() === date;
                                    });

                                    tmpRecords = tmpRecords.map((rec) => {
                                        var val = JSON.parse(JSON.stringify(rec));
                                        val.amount = fx(val.amount).from(val.currency).to(tmpFilter.currency.code);
                                        val.currency = tmpFilter.currency.code;
                                        return val;
                                    });

                                    var amount = 0;
                                    tmpRecords.map((val) => {
                                        if (val.amount < 0)
                                            amount -= val.amount;
                                        return {};
                                    });

                                    tmpDisplayData.push({
                                        amountMinus: amount.toFixed(3),
                                        name: date
                                    });

                                }
                                break;
                            case GranularityEnum.MONTH:
                                formatString = "MMMM";
                                for (var i = 0; i < 12; i++) {
                                    var date = moment().month(i).format(formatString);

                                    var tmpRecords = records.filter((val) => {
                                        return moment(val.date).format(formatString).toString() === date;
                                    });

                                    tmpRecords = tmpRecords.map((rec) => {
                                        var val = JSON.parse(JSON.stringify(rec));
                                        val.amount = fx(val.amount).from(val.currency).to(tmpFilter.currency.code);
                                        val.currency = tmpFilter.currency.code;
                                        return val;
                                    });

                                    var amount = 0;
                                    tmpRecords.map((val) => {
                                        if (val.amount < 0)
                                            amount -= val.amount;
                                        return {};
                                    });

                                    tmpDisplayData.push({
                                        amountMinus: amount.toFixed(3),
                                        name: date
                                    });

                                }
                                break;
                            case "TRANSACTION_TYPE":
                                tmpDisplayData = TransactionTypeEnum.list.map((val) => {
                                    var amountMinus = 0;
                                    var amountPlus = 0;

                                    var tmpRecords = records.filter((record) => {
                                        if (record.transactionType === val.enum) {
                                            if (record.amount < 0) {
                                                amountMinus -= fx(record.amount).from(record.currency).to(tmpFilter.currency.code);
                                            }
                                        }
                                        return false;
                                    });

                                    return {
                                        name: val.name,
                                        amountMinus: amountMinus
                                    };
                                });
                                break;
                            case "COMPANY_NAME":
                                var mySet = new Set();

                                records.filter((val) => {
                                    mySet.add(val.companyName);
                                });

                                for (let item of mySet.values()) {
                                    var amountMinus = 0;
                                    var amountPlus = 0;

                                    var tmpRecords = records.filter((record) => {
                                        if (record.companyName === item) {
                                            if (record.amount < 0) {
                                                amountMinus -= fx(record.amount).from(record.currency).to(tmpFilter.currency.code);
                                            }
                                        }
                                        return false;
                                    });

                                    tmpDisplayData.push({
                                        name: item,
                                        amountMinus: amountMinus
                                    });
                                }
                                break;
                            default:
                                break;
                        }

                        return tmpDisplayData;
                    },

                    renderGraph(graphData){
                        return (
                            <ResponsiveContainer aspect={1}>
                                <BarChart data={graphData}
                                          margin={{top: 5, right: 30, left: 20, bottom: 5}} stackOffset="sign">
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend />
                                    <ReferenceLine y={0} stroke='#000'/>
                                    <Bar dataKey="amountMinus" stackId="a" fill="#ff0000"/>
                                </BarChart>
                            </ResponsiveContainer>
                        );
                    }
                };
            }
        }
        ,
        {
            name: "Accumulative spending",
            chartEnum: "BALANCE",
            getHandler(){
                return {
                    filter: {
                        dateFrom: moment().subtract(12, "month").toISOString(),
                        dateTo: moment().toISOString(),
                        granularity: 0,
                        currency: "CZK"
                    }
                    ,

                    getFilter(){
                        return this.filter;
                    },

                    handleDateChange(e, name){
                        this.filter[name] = e;
                    },

                    handleChange(e){
                        const target = e.target;
                        const value = target.type === 'checkbox' ? target.checked : target.value;
                        const name = target.name;

                        this.filter[name] = value;

                    },

                    renderForm(filterChangeHandler){
                        return (
                            <FormGroup>
                                <DatePickerElement label="From :" name="dateFrom" value={this.filter.dateFrom}
                                                   onChange={(e) => {
                                                       this.handleDateChange(e, "dateFrom");
                                                   }}/>
                                <DatePickerElement label="To :" name="dateTo" value={this.filter.dateTo}
                                                   onChange={(e) => {
                                                       this.handleDateChange(e, "dateTo");
                                                   }}/>
                                <SliderElement
                                    label="Granularity :"
                                    name="granularity"
                                    type="range"
                                    defaultValue={this.filter.granularity}
                                    min={0}
                                    max={GranularityEnum.list.length - 1}
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }}>
                                </SliderElement>
                                <CurrencySelectElement name="currency" onChange=
                                    {(e) => {
                                        this.handleChange(e);
                                    }} selected={this.filter.currency}>
                                </CurrencySelectElement>
                                <Button onClick={() => {
                                    filterChangeHandler()
                                }}>Generate</Button>
                            </FormGroup>
                        );
                    },

                    filterRecords(records, filter){

                        var tmpFilter = {};

                        tmpFilter.from = moment(filter.dateFrom);
                        tmpFilter.to = moment(filter.dateTo);
                        tmpFilter.granularity = filter.granularity;
                        tmpFilter.currency = filter.currency;


                        var tmpRecords = [];

                        for (var index = 0; index < records.length; ++index) {
                            var tmpRecord = records[index];
                            if (moment(tmpRecord.date).isAfter(tmpFilter.from) && moment(tmpRecord.date).isBefore(tmpFilter.to)) {
                                tmpRecords.push(tmpRecord);
                            }
                        }

                        tmpRecords.sort((a, b) => {
                            if (moment(a.date).isBefore(moment(b.date))) {
                                return -1;
                            }
                            if (moment(a.date).isAfter(moment(b.date))) {
                                return 1;
                            }
                            return 0;
                        });

                        var formatString = "D MM YYYY";

                        switch (GranularityEnum.list[filter.granularity].enum) {
                            case GranularityEnum.DAY:
                                formatString = "D MM YYYY";
                                break;
                            case GranularityEnum.WEEK:
                                formatString = "WW YYYY";
                                break;
                            case GranularityEnum.MONTH:
                                formatString = "MMM YYYY";
                                break;
                            case GranularityEnum.YEAR:
                                formatString = "YYYY";
                                break;
                        }

                        var accountBalanceMinus = 0;
                        var accountBalancePlus = 0;

                        var startDate = tmpFilter.from;

                        var tmpDisplayData = [];

                        var i = 0;

                        while (tmpRecords.length > 0 && startDate.isSameOrBefore(tmpFilter.to)) {
                            var formattedStartDate = startDate.format(formatString).toString();
                            tmpRecord = tmpRecords[i];

                            while (i < tmpRecords.length && moment(tmpRecord.date).format(formatString).toString() === formattedStartDate) {
                                tmpRecord = tmpRecords[i];
                                if (tmpRecord.amount < 0)
                                    accountBalanceMinus -= fx(tmpRecord.amount).from(tmpRecord.currency).to(filter.currency);
                                else
                                    accountBalancePlus += fx(tmpRecord.amount).from(tmpRecord.currency).to(filter.currency);
                                i++;
                            }

                            tmpDisplayData.push({
                                formattedDate: formattedStartDate,
                                amountMinus: accountBalanceMinus,
                                amountPlus: accountBalancePlus
                            });

                            startDate = startDate.add(1, 'd');

                            while (startDate.format(formatString) === formattedStartDate) {
                                startDate = startDate.add(1, 'd');
                            }
                        }

                        return tmpDisplayData;
                    },

                    renderGraph(graphData){
                        return (
                            <ResponsiveContainer aspect={1}>
                                <LineChart data={graphData}
                                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                    <XAxis dataKey="formattedDate"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend />
                                    <Line dataKey="amountMinus" fill="#ff6600" activeDot={{r: 1}}/>
                                    <Line dataKey="amountPlus" fill="#4dff4d" activeDot={{r: 2}}/>
                                </LineChart>
                            </ResponsiveContainer>);
                    }
                };
            },
        }
        ,
        {
            name: "Pie chart",
            chartEnum: "PIE_CHART",
            getHandler(){
                return {
                    filter: {
                        type: "BANK",
                        list: Banks
                    },

                    getFilter(){
                        return this.filter;
                    },

                    handleChange(e){
                        const target = e.target;

                        this.filter.type = target.value;

                        if (target.value === "BANK") {
                            this.filter.list = Banks;
                        } else if (target.value === "TRANSACTION_TYPE") {
                            this.filter.list = TransactionTypeEnum.list;
                        }

                    },
                    renderForm(filterChangeHandler){
                        return (
                            <FormGroup onChange={(e) => {
                                this.handleChange(e);
                                filterChangeHandler()
                            }}>
                                <ControlLabel>Select graph type :</ControlLabel>
                                <FormGroup>
                                    <Radio name="type" value="BANK" list={Banks}>
                                        By bank
                                    </Radio>
                                    <Radio name="type" value="TRANSACTION_TYPE" list={TransactionTypeEnum.list}>
                                        By transaction type
                                    </Radio>
                                    <Radio name="type" value="COMPANY_NAME">
                                        By company name
                                    </Radio>
                                </FormGroup>
                            </FormGroup>
                        );
                    },

                    filterRecords(records, filter){

                        var tmpDisplayData = [];

                        var amountPlusSum = 0;
                        var amountMinusSum = 0;

                        if (filter.type === "BANK") {
                            tmpDisplayData = filter.list.map((val) => {
                                var amountMinus = 0;
                                var amountPlus = 0;

                                var tmpRecords = records.filter((record) => {
                                    if (record.bankName === val.enum) {
                                        if (record.amount < 0) {
                                            amountMinus -= fx(record.amount).from(record.currency).to("USD");
                                        }
                                        else {
                                            amountPlus += fx(record.amount).from(record.currency).to("USD");
                                        }
                                    }
                                    return false;
                                });

                                return {
                                    name: val.name,
                                    amountMinus: amountMinus,
                                    amountPlus: amountPlus,
                                    color: val.color
                                };
                            });
                        } else if (filter.type === "TRANSACTION_TYPE") {
                            tmpDisplayData = filter.list.map((val) => {
                                var amountMinus = 0;
                                var amountPlus = 0;

                                var tmpRecords = records.filter((record) => {
                                    if (record.transactionType === val.enum) {
                                        if (record.amount < 0) {
                                            amountMinus -= fx(record.amount).from(record.currency).to("USD");
                                        }
                                        else {
                                            amountPlus += fx(record.amount).from(record.currency).to("USD");
                                        }
                                    }
                                    return false;
                                });

                                return {
                                    name: val.name,
                                    amountMinus: amountMinus,
                                    amountPlus: amountPlus,
                                    color: val.color
                                };
                            });
                        } else if (filter.type === "COMPANY_NAME") {
                            var mySet = new Set();

                            records.filter((val) => {
                                mySet.add(val.companyName);
                            });

                            for (let item of mySet.values()) {
                                var amountMinus = 0;
                                var amountPlus = 0;

                                var tmpRecords = records.filter((record) => {
                                    if (record.companyName === item) {
                                        if (record.amount < 0) {
                                            amountMinus -= fx(record.amount).from(record.currency).to("USD");
                                        }
                                    }
                                    return false;
                                });

                                tmpDisplayData.push({
                                    name: item,
                                    amountMinus: amountMinus,
                                    amountPlus: 0
                                });
                            }
                        }

                        tmpDisplayData.map((val) => {
                            amountPlusSum += val.amountPlus;
                            amountMinusSum += val.amountMinus;
                            return false;
                        });

                        tmpDisplayData = tmpDisplayData.map((val) => {
                            return {
                                name: val.name,
                                amountMinus: val.amountMinus === 0 ? 0 : val.amountMinus / amountMinusSum,
                                amountPlus: val.amountPlus === 0 ? 0 : val.amountPlus / amountPlusSum,
                                color: val.color
                            };
                        });

                        return tmpDisplayData;
                    },

                    renderGraph(graphData){

                        var dataMinus = graphData.filter((val) => {
                            return val.amountMinus > 0;
                        }).sort((a, b) => {
                            return a.amountMinus > b.amountMinus ? 1 : (a.amountMinus === b.amountMinus ? 0 : -1);
                        });

                        var dataPlus = graphData.filter((val) => {
                            return val.amountPlus > 0;
                        }).sort((a, b) => {
                            return a.amountPlus > b.amountPlus ? 1 : (a.amountPlus === b.amountPlus ? 0 : -1);
                        });

                        return (
                            <Grid>
                                <Row>
                                    <Col>
                                        <Label>Money spend by type :</Label>
                                        <ResponsiveContainer aspect={3}>
                                            <PieChart>
                                                <Pie valueKey="amountMinus" data={dataMinus} paddingAngle={2}
                                                     minAngle={1}>
                                                    {
                                                        dataMinus.map((entry, index) => {
                                                            return (<Cell key={index} fill={entry.color}/>)
                                                        })
                                                    }
                                                </Pie>
                                                <Tooltip/>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Col>
                                    <Col>
                                        <Label>Money received by type :</Label>
                                        <ResponsiveContainer aspect={3}>
                                            <PieChart>
                                                <Pie valueKey="amountPlus" data={dataPlus} paddingAngle={2}
                                                     minAngle={1}>
                                                    {
                                                        dataPlus.map((entry, index) => {
                                                            return (<Cell key={index} fill={entry.color}/>)
                                                        })
                                                    }
                                                </Pie>
                                                <Tooltip/>
                                                <Legend/>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Col>
                                </Row>
                            </Grid>
                        );
                    }
                };
            }
        }
    ],

};