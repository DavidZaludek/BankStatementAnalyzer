
export const ViewEnum =
    {MAIN_VIEW:"MAIN_VIEW",FILES_VIEW:"FILES_VIEW",GRAPH_VIEW:"GRAPH_VIEW",LOGIN_VIEW:"LOGIN_VIEW",SIGN_UP_VIEW:"SIGN_UP_VIEW",list:["MAIN_VIEW","FILES_VIEW","GRAPH_VIEW","LOGIN_VIEW","SIGNUP_VIEW"]};

export const TransactionTypeEnum =
    {
        DEFAULT: "DEFAULT",
        ATM: "ATM",
        TRANSFER_OUT: "TRANSFER_OUT",
        TRANSFER_IN: "TRANSFER_IN",
        CARD: "CARD",
        CASH_DEPOSIT: "CASH_DEPOSIT",
        CASH_WITHDRAWAL: "CASH_WITHDRAWAL",
        FEE:"FEE",
        list: [
            {
                name: "Other",
                enum: "DEFAULT",
                color: "#4D4D4D"
            }
            ,
            {
                name: "Atm withdrawal",
                enum: "ATM",
                color: "#5DA5DA"
            }
            ,
            {
                name: "Incoming bank transfer",
                enum: "TRANSFER_IN",
                color: "#FAA43A"
            }
            ,
            {
                name: "Outgoing bank transfer",
                enum: "TRANSFER_OUT",
                color: "#60BD68"
            }
            ,
            {
                name: "Card payment",
                enum: "CARD",
                color: "#F15854"
            }
            ,
            {
                name: "Cash deposit",
                enum: "CASH_DEPOSIT",
                color: "#B2912F"
            }
            ,
            {
                name: "Cash withdrawal",
                enum: "CASH_WITHDRAWAL",
                color: "#B276B2"
            }
            ,
            {
                name: "Fee",
                enum: "FEE",
                color: "#DECF3F"
            }
        ]
    };

export const GranularityEnum=
    {
        DAY: "DAY",
        WEEK: "WEEK",
        MONTH: "MONTH",
        YEAR: "YEAR"
        ,
        list: [
            {
                name: "Day",
                enum: "DAY"
            }
            ,
            {
                name: "Week",
                enum: "WEEK"
            }
            ,
            {
                name: "Month",
                enum: "MONTH"
            },
            {
                name: "Year",
                enum: "YEAR"
            }
        ]
    };

