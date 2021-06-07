import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import HistoryPositionData from "./TEST/HistoryPositionData";
import AccountsData from "./TEST/AccountsData";
import SymbolData from "./TEST/SymbolData";

// import { format } from 'date-fns';
// import moment from 'moment';
// import dateFormat from 'dateformat';

export const slice = createSlice({
  name: "Serverinfo",
  initialState: {
    historyPosition: [],
    accounts: [],
    symbols: [],
    strategies: [],
    timer: null,
    testValue: 0,
    filterStrategy: ""
  },
  reducers: {
    getFilterStrategy: (state, action) => {
      state.filterStrategy = action.payload;
    },
    getHistoryPosition: (state, action) => {
      // state.testValue += 1;
      // state.historyPosition = HistoryPositionData(state.testValue);
      state.historyPosition = action.payload;
      // for (let i = 0; i < state.historyPosition.length; i++) {
      //   var d = new Date(state.historyPosition[i].closeTime);
      //   state.historyPosition[i].closeTime = d.toLocaleString();
      //   d = new Date(state.historyPosition[i].openTime);
      //   state.historyPosition[i].openTime = d.toLocaleString();
      // }

      // state.historyPosition[0].closeTime = format(d, 'yyyy/MM/dd kk:mm:ss');
      // state.historyPosition[0].closeTime = moment(state.historyPosition[0].closeTime).format('DD MMM, YYYY hh:mm:ss');
      // state.historyPosition[0].closeTime = dateFormat(state.historyPosition[0].closeTime, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
      // state.historyPosition[0].closeTime = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(d)



    },

    getAccounts: (state, action) => {
      // state.accounts = AccountsData();
      state.accounts = action.payload;
    },

    getSymbols: (state, action) => {
      // state.symbols = SymbolData();
      state.symbols = action.payload;
    },
    getStrategies: (state, action) => {
      // state.strategies = SymbolData();
      state.strategies = action.payload;
    },

    getTimer: (state, action) => {
      state.timer = action.payload;
    }
  }
});

export const {
  getHistoryPosition,
  getTimer,
  getAccounts,
  getStrategies,
  getSymbols,
  getFilterStrategy
} = slice.actions;

export const selectHistoryPosition = (state) =>
  state.information.historyPosition;
export const selectAccount = (state) => state.information.accounts;
export const selectSymbol = (state) => state.information.symbols;
export const selectStrategies = (state) => state.information.strategies;
export const selectTimer = (state) => state.information.timer;
export const selectFilterStrategy = (state) => state.information.filterStrategy;

export default slice.reducer;
