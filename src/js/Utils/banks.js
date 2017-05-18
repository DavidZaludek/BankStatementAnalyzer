/**
 * Created by davidzaludek on 03/05/17.
 */
import Papa from "papaparse";
import moment from "moment";
import {TransactionTypeEnum} from "../enums/index";

export const Banks =
    [
        {
            id: 0,
            name: "Unknown",
            enum: "UNKNOWN",
            color: "#4D4D4D",
            parse(data){
                return [];
            }
        }
        ,
        {
            id: 1,
            name: "Fio CZ",
            enum: "FIOCZ",
            color: "#5DA5DA",
            parse: (data)=>{
                var parsedData = Papa.parse(data,
                    {header: false,
                        dynamicTyping: true});

                var records = [];

                for (var prop in parsedData.data) {

                    var tmpRecord ={};

                    var rawRecord = parsedData.data[prop];

                    if (rawRecord.length !== 19)
                        continue;

                    var tmpDate = moment(rawRecord[1],"DD.MM.YYYY");

                    if (tmpDate.isValid()) {
                        tmpRecord.amount = parseFloat(rawRecord[2]);
                        tmpRecord.currency = rawRecord[3];
                        tmpRecord.date = tmpDate.toString();

                        if (rawRecord[11].startsWith("Nákup: ")){
                            var str = rawRecord[11];
                            tmpRecord.companyName = str.substring(str.indexOf("Nákup: ")+ 7,str.indexOf(","));
                        }else {
                            tmpRecord.companyName = "Unknown";
                        }

                        switch (rawRecord[13]) {
                            case "Karetní transakce":
                                if (rawRecord[5].startsWith("Výběr z bankomatu"))
                                    tmpRecord.transactionType = TransactionTypeEnum.ATM;
                                else
                                    tmpRecord.transactionType = TransactionTypeEnum.CARD;
                                break;
                            case "Vklad v hotovosti":
                                tmpRecord.transactionType = TransactionTypeEnum.CASH_DEPOSIT;
                                break;
                            case "Bezhotovostní platba":
                            case "Platba převodem uvnitř banky":
                                tmpRecord.transactionType = TransactionTypeEnum.TRANSFER_OUT;
                                break;
                            case "Bezhotovostní příjem":
                                tmpRecord.transactionType = TransactionTypeEnum.TRANSFER_IN;
                                break;
                            default:
                                if (rawRecord[5].startsWith("Poplatek")) {
                                    tmpRecord.transactionType = TransactionTypeEnum.FEE;
                                } else {
                                    tmpRecord.transactionType = TransactionTypeEnum.DEFAULT;
                                }
                                console.log(rawRecord);
                                break;
                        }

                        records.push(tmpRecord);
                    }
                }

                return records;
            }
        }
        ,
        {
            id: 2,
            name: "VÚB SK",
            enum: "VUBSK",
            color: "#FAA43A",
            parse: (data)=>{
                var parsedData = Papa.parse(data,
                    {header: false,
                        dynamicTyping: true});

                var records = [];

                console.log(parsedData.data);

                for (var prop in parsedData.data) {

                    var tmpRecord ={};

                    var rawRecord = parsedData.data[prop];

                    var tmpDate = moment(rawRecord[0],"YYYYMMDD");

                    if (tmpDate.isValid()) {

                        tmpRecord.amount = parseFloat(rawRecord[5].replace(",","."));
                        tmpRecord.currency = rawRecord[6];
                        tmpRecord.date = tmpDate.toString();
                        tmpRecord.transactionType = TransactionTypeEnum.DEFAULT;
                        tmpRecord.companyName = "Unknown";

                        if (rawRecord[2]==="")
                        {
                            if (tmpRecord.amount > 0 )
                            {
                                tmpRecord.transactionType = TransactionTypeEnum.TRANSFER_IN;
                            }
                            if (tmpRecord.amount < 0 )
                            {
                                tmpRecord.transactionType = TransactionTypeEnum.CARD;
                            }
                        }
                        if (rawRecord[2]!=="")
                        {
                            if (tmpRecord.amount > 0 )
                            {
                                tmpRecord.transactionType = TransactionTypeEnum.TRANSFER_IN;
                            }
                            if (tmpRecord.amount < 0 )
                            {
                                tmpRecord.transactionType = TransactionTypeEnum.TRANSFER_OUT;
                            }
                        }


                        records.push(tmpRecord);
                    }
                }

                return records;
            }
        }
    ];