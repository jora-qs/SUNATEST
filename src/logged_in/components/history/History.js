import React, { useCallback, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Box, Grid, Badge, Button } from "@material-ui/core";
import SubscriptionTable from "../../../shared/components/SubscriptionTable";
import { useSelector } from "react-redux";
import {
  selectHistoryPosition,
  selectAccount,
  selectSymbol,
  selectStrategies,
  selectFilterStrategy
} from "../ServerInfo";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import ButtonGroup from '@material-ui/core/ButtonGroup';


import Chart from "react-google-charts";

import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  DarkStyle: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  LightStyle: {
    backgroundColor: theme.palette.common.lightblack,
    color: theme.palette.common.white
    // justifyContent: "space-between !important"
  },
  HDarkStyle: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: "20px !important"
  },
  HLightStyle: {
    backgroundColor: theme.palette.common.lightblack,
    color: theme.palette.common.white,
    padding: "20px !important"
  },
  InfoClass: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
    // marginRight: theme.spacing(15),
    // padding: 2,
    justifyContent: "space-between",
    width: "auto"
  },
  BtnTrue: {
    backgroundColor: theme.palette.primary
  },
  BtnFalse: {
    backgroundColor: theme.palette.secondary
  },

  paperClass: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: 5,
    justifyContent: "space-between",
    width: "auto",
    height: 550
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
}));


function History(props) {
  const { selectHistory } = props;
  const classes = useStyles();

  const [state, setState] = React.useState({
    account: "",
    symbol: "",
    strategy: useSelector(selectFilterStrategy),
    year: "",
    yearChart: ""
  });

  const handleChange = (event) => {
    const stateName = event.target.name;
    setState({
      ...state,
      [stateName]: event.target.value
    });
  };

  const filter = useSelector(selectFilterStrategy);
  console.log(filter);
  useEffect(() => {
    setState({
      ...state,
      strategy: filter
    });
  }, [filter]);


  useEffect(() => {
    selectHistory();
  }, [selectHistory]);

  const headername1 = [
    { id: "accountString", Label: "Account" },
    { id: "symbolName", Label: "Symbol" },
    { id: "positionDirection", Label: "Direction" },
    { id: "volume", Label: "Volume" },
    { id: "entryPrice", Label: "Entry Price" },
    { id: "closingPrice", Label: "Closing price" },
    { id: "openTime", Label: "Opened" },
    { id: "closeTime", Label: "Closed" },
    { id: "takeProfit", Label: "TP" },
    { id: "stopLoss", Label: "SL" },
    { id: "status", Label: "Status" },
    { id: "grossProfit", label: "Gr.Proft" },
    { id: "netProfit", Label: "Net Profit" },
    { id: "commission", Label: "Commission" },
    { id: "swap", Label: "Swap" },
    { id: "strategyName", Label: "Strategy" },
    { id: "positionId", Label: "Position ID" }
  ];

  const columns = [
    {
      getHeaderProps: (state, rowInfo) => ({
        className: classes.HDarkStyle
      }),
      columns: [
        {
          Header: "Symbol",
          accessor: "symbol",
          getProps: (state, rowInfo) => ({
            className: classes.DarkStyle
          }),
          getHeaderProps: (state, rowInfo) => ({
            className: classes.DarkStyle,
            borderColor: "white !important"
          })
        }
      ]
    },

    {
      Header: "Long",
      getHeaderProps: (state, rowInfo) => ({
        className: classes.HLightStyle
      }),
      columns: [
        {
          Header: "Trades",
          accessor: "longtrade",
          getProps: (state, rowInfo) => ({
            className: classes.LightStyle
          }),
          getHeaderProps: (state, rowInfo) => ({
            className: classes.LightStyle
          })
        },
        {
          Header: "Pips",
          accessor: "longpips",
          getProps: (state, rowInfo) => ({
            style: {
              color: rowInfo.row.longpips < 0 ? "orange" : "limegreen"
            },
            className: classes.LightStyle
          }),
          getHeaderProps: (state, rowInfo) => ({
            className: classes.LightStyle
          })
        },
        {
          Header: "Net Profit",
          accessor: "longnetProfit",
          getProps: (state, rowInfo) => ({
            className: classes.LightStyle,
            style: {
              color: rowInfo.row.longnetProfit < 0 ? "orange" : "limegreen"
            },
          }),
          getHeaderProps: (state, rowInfo) => ({
            className: classes.LightStyle
          })
        }
      ]
    },

    {
      Header: "Short",
      getHeaderProps: (state, rowInfo) => ({
        className: classes.HDarkStyle
      }),
      columns: [
        {
          Header: "Trades",
          accessor: "shorttrade",
          getProps: (state, rowInfo) => ({
            className: classes.DarkStyle
          }),
          getHeaderProps: (state, rowInfo) => ({
            className: classes.DarkStyle
          })
        },
        {
          Header: "Pips",
          accessor: "shortpips",
          getProps: (state, rowInfo) => ({
            className: classes.DarkStyle,
            style: {
              color: rowInfo.row.shortpips < 0 ? "orange" : "limegreen"
            },
          }),
          getHeaderProps: (state, rowInfo) => ({
            className: classes.DarkStyle
          })
        },
        {
          Header: "Net Profit",
          accessor: "shortnetProfit",
          getProps: (state, rowInfo) => ({
            className: classes.DarkStyle,
            style: {
              color: rowInfo.row.shortnetProfit < 0 ? "orange" : "limegreen"
            },
          }),
          getHeaderProps: (state, rowInfo) => ({
            className: classes.DarkStyle
          })
        }
      ]
    },

    {
      Header: "Total",
      getHeaderProps: (state, rowInfo) => ({
        className: classes.HLightStyle
      }),
      columns: [
        {
          Header: "Trades",
          accessor: "totaltrade",
          getProps: (state, rowInfo) => ({
            className: classes.LightStyle
          }),
          getHeaderProps: (state, rowInfo) => ({
            className: classes.LightStyle
          })
        },
        {
          Header: "Pips",
          accessor: "totalpips",
          getProps: (state, rowInfo) => ({
            className: classes.LightStyle,
            style: {
              color: rowInfo.row.totalpips < 0 ? "orange" : "limegreen"
            },
          }),
          getHeaderProps: (state, rowInfo) => ({
            className: classes.LightStyle
          })
        },
        {
          Header: "Net Profit",
          accessor: "totalnetProfit",
          getProps: (state, rowInfo) => ({
            className: classes.LightStyle,
            style: {
              color: rowInfo.row.totalnetProfit < 0 ? "orange" : "limegreen"
            },
          }),
          getHeaderProps: (state, rowInfo) => ({
            className: classes.LightStyle
          })
        },
        {
          Header: "Won (%)",
          accessor: "totalwon",
          getProps: (state, rowInfo) => ({
            className: classes.LightStyle
          }),
          getHeaderProps: (state, rowInfo) => ({
            className: classes.LightStyle
          })
        },
        {
          Header: "Lost (%)",
          accessor: "totallost",
          getProps: (state, rowInfo) => ({
            className: classes.LightStyle
          }),
          getHeaderProps: (state, rowInfo) => ({
            className: classes.LightStyle
          })
        }
      ]
    }
  ];

  const positions = useSelector(selectHistoryPosition);
  const accounts = useSelector(selectAccount);
  const symbols = useSelector(selectSymbol);
  const strategies = useSelector(selectStrategies);
  // const ffff = useSelector(selectFilterStrategy);
  // console.log("////", ffff);

  // setState(state.strategy, useSelector(selectFilterStrategy));

  const [filteredPositions, setfilteredPositions] = useState(positions);
  const [winCount, setWinCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [cost, setCost] = useState(0);
  const [commission, setCommission] = useState(0);
  const [swap, setSwap] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [yearHistory, setYearHistory] = useState([]);
  const [symbol_History_Order, setSymbolHistoryOrder] = useState([]);
  const [limitTime, setLimitTime] = useState('Fri, 01 Jan 1971 00:00:00 GMT');
  const [btn1W, setBtn1W] = useState(false);
  const [btn1M, setBtn1M] = useState(false);
  const [btn3M, setBtn3M] = useState(false);
  const [btn6M, setBtn6M] = useState(false);
  const [btn1Y, setBtn1Y] = useState(false);
  const [btnAll, setBtnAll] = useState(true);


  const GetSymbolHistory = () => {
    let symbolDatas = [];
    let volumeOrder = [];
    if (symbols.length <= 0) return;
    if (positions.length <= 0) return;
    let totalvolume = 0;

    for (let k = 0; k < positions.length; k++) {
      let dateClosed = new Date(positions[k].closeTime);
      if (dateClosed < limitTime)
        continue;
      if (positions[k].strategyName == state.strategy || state.strategy == "")
        totalvolume += positions[k].volume;
    }

    for (let i = 0; i < symbols.length; i++) {
      let long_trade = 0;
      let long_pips = 0;
      let long_profit = 0;
      let short_trade = 0;
      let short_pips = 0;
      let short_profit = 0;
      let won = 0;
      let lost = 0;
      let totalTrade = 0;
      let volume = 0;

      for (let j = 0; j < positions.length; j++) {
        let dateClosed = new Date(positions[j].closeTime);
        if (dateClosed < limitTime)
          continue;
        if (positions[j].symbolName == symbols[i] && (positions[j].strategyName == state.strategy || state.strategy == "")) {
          totalTrade++;
          if (positions[j].netProfit > 0) won++;
          else lost++;
          volume += positions[j].volume
          if (positions[j].positionDirection.indexOf("Buy") >= 0) {
            long_trade++;
            long_pips += positions[j].pips;
            long_profit += positions[j].netProfit;
          }
          if (positions[j].positionDirection.indexOf("Sell") >= 0) {
            short_trade++;
            short_pips += positions[j].pips;
            short_profit += positions[j].netProfit;
          }
        }
      }

      let wonPercent = ((won / totalTrade) * 100).toFixed(2);
      let lostPercent = ((lost / totalTrade) * 100).toFixed(2);

      let oneSymbolData = {
        symbol: symbols[i],

        longtrade: long_trade,
        longpips: long_pips.toFixed(2),
        longnetProfit: long_profit.toFixed(2),

        shorttrade: short_trade,
        shortpips: short_pips.toFixed(2),
        shortnetProfit: short_profit.toFixed(2),

        totaltrade: totalTrade,
        totalpips: (long_pips + short_pips).toFixed(2),
        totalnetProfit: (long_profit + short_profit).toFixed(2),
        totalwon: won.toString() + " (" + wonPercent.toString() + "%)",
        totallost: lost.toString() + " (" + lostPercent.toString() + "%)",

        symVolume: volume.toFixed(2),
        symVolumePercent: (volume / totalvolume * 100).toFixed(2),
        symAvgSize: (volume / totalTrade).toFixed(2),
        symWonPercent: wonPercent.toString() + "(%)",
        symLossPercent: lostPercent.toString() + "(%)",
        symWon: won,
        symLost: lost,
        symColor: "red"
      };

      volumeOrder.push(volume.toFixed(2));
      symbolDatas.push(oneSymbolData);  // prepare  data
    }

    volumeOrder.sort(function (a, b) { return b - a });
    let OrderedSymbol = [];
    let OrderedVolume = [];
    OrderedVolume.push(['Symbol', 'Volume']);
    for (let i = 0; i < volumeOrder.length; i++) {
      for (let j = 0; j < symbolDatas.length; j++) {
        if (volumeOrder[i] == symbolDatas[j].symVolume) {

          let graphyData = [symbolDatas[j].symbol, Number(symbolDatas[j].symVolume)];

          OrderedSymbol.push(symbolDatas[j]);
          OrderedVolume.push(graphyData);
          break;
        }
      }
    }
    if (OrderedVolume.length > 0)
      setChartData(OrderedVolume);
    if (OrderedSymbol.length > 0)
      setSymbolHistoryOrder(OrderedSymbol);

  };

  const GetYearHistory = () => {

    let transaction = [];

    for (let i = 0; i < positions.length; i++) {
      let year = (new Date(positions[i].closeTime).getFullYear());
      // console.log(year);

      let find = false;

      for (let j = 0; j < transaction.length; j++) {
        if (year == transaction[j] || year < 1970) {
          find = true;
          break;
        }
      }
      if (find == false) transaction.push(year);
    }
    transaction.sort(function (a, b) { return a - b });
    setYearHistory(transaction);


    let barData = [];
    let janP = 0, janM = 0;
    let febP = 0, febM = 0;
    let marP = 0, marM = 0;
    let aprP = 0, aprM = 0;
    let mayP = 0, mayM = 0;
    let junP = 0, junM = 0;
    let julP = 0, julM = 0;
    let augP = 0, augM = 0;
    let sepP = 0, sepM = 0;
    let octP = 0, octM = 0;
    let novP = 0, novM = 0;
    let decP = 0, decM = 0;
    barData.push(['Month', 'Winnig Trades', 'Losing Trades']);
    for (let i = 0; i < positions.length; i++) {
      let year = (new Date(positions[i].closeTime).getFullYear());
      let month = (new Date(positions[i].closeTime).getMonth());
      if (year != state.yearChart) {
        // console.log(year, "--year");
        // console.log(state.year, "++ state year")
        continue;
      }
      // console.log(month, "--month");
      if (positions[i].strategyName == state.strategy || state.strategy == "") {
        let profit = Number(positions[i].netProfit);
        switch (month) {
          case 1:
            profit > 0 ? janP++ : janM++;
            break;
          case 2:
            profit > 0 ? febP++ : febM++;
            break;
          case 3:
            profit > 0 ? marP++ : marM++;
            break;
          case 4:
            profit > 0 ? aprP++ : aprM++;
            break;
          case 5:
            profit > 0 ? mayP++ : mayM++;
            break;
          case 6:
            profit > 0 ? junP++ : junM++;
            break;
          case 7:
            profit > 0 ? julP++ : julM++;
            break;
          case 8:
            profit > 0 ? augP++ : augM++;
            break;
          case 9:
            profit > 0 ? sepP++ : sepM++;
            break;
          case 10:
            profit > 0 ? octP++ : octM++;
            break;
          case 11:
            profit > 0 ? novP++ : novM++;
            break;
          case 12:
            profit > 0 ? decP++ : decM++;
            break;
        }
      }

    }
    barData.push(['Jan', janP, janM]);
    barData.push(['Feb', febP, febM]);
    barData.push(['Mar', marP, marM]);
    barData.push(['Apr', aprP, aprM]);
    barData.push(['May', mayP, mayM]);
    barData.push(['Jun', junP, junM]);
    barData.push(['Jul', julP, julM]);
    barData.push(['Aug', augP, augM]);
    barData.push(['Sep', sepP, sepM]);
    barData.push(['Oct', octP, octM]);
    barData.push(['Nov', novP, novM]);
    barData.push(['Dec', decP, decM]);
    setBarChartData(barData);
  }

  const Mark = ({ colorValue }) => {
    // console.log(colorValue, "/////////");
    return (
      <Badge>
        <div
          style={
            {
              width: '12px',
              height: '12px',
              color: 'white',
              backgroundColor: colorValue,
              borderRadius: '50%',
              marginLeft: '5px'
            }
          }
        >
        </div>
      </Badge >
    );
  };

  const color_Array = [
    { color: "#2BB673" },
    { color: "#d91e48" },
    { color: "#007fad" },
    { color: "#e9a227" },
    { color: '#c7232a' },
    { color: '#f15b28' },
    { color: '#d7b920' },
    { color: '#89cadc' },
    { color: '#38b449' },
    { color: '#561871' },
    { color: '#337198' }
  ];

  const columns2 = [
    {
      accessor: "symColor",
      Cell: ({ row }) => {
        return <Mark colorValue={color_Array[row._index].color} />;
      },

      width: 30,
      getProps: (state, rowInfo) => ({
        className: classes.DarkStyle,
      }),
      getHeaderProps: (state, rowInfo) => ({
        className: classes.HDarkStyle
      })
    },
    {
      Header: "Symbol",
      accessor: "symbol",
      getProps: (state, rowInfo) => ({
        className: classes.DarkStyle
      }),
      getHeaderProps: (state, rowInfo) => ({
        className: classes.HDarkStyle
      })
    },
    {
      Header: "Volume",
      accessor: "symVolume",
      getProps: (state, rowInfo) => ({
        className: classes.DarkStyle
      }),
      getHeaderProps: (state, rowInfo) => ({
        className: classes.HDarkStyle
      })
    },
    {
      Header: "Volume %",
      accessor: "symVolumePercent",
      getProps: (state, rowInfo) => ({
        className: classes.DarkStyle
      }),
      getHeaderProps: (state, rowInfo) => ({
        className: classes.HDarkStyle
      })
    },
    {
      Header: "Avg.Trade Size",
      accessor: "symAvgSize",
      getProps: (state, rowInfo) => ({
        className: classes.DarkStyle
      }),
      getHeaderProps: (state, rowInfo) => ({
        className: classes.HDarkStyle
      })
    },
    {
      Header: "Trades",
      accessor: "totaltrade",
      getProps: (state, rowInfo) => ({
        className: classes.DarkStyle
      }),
      getHeaderProps: (state, rowInfo) => ({
        className: classes.HDarkStyle
      })
    },
    {
      Header: "Wining",
      accessor: "symWon",
      getProps: (state, rowInfo) => ({
        className: classes.DarkStyle
      }),
      getHeaderProps: (state, rowInfo) => ({
        className: classes.HDarkStyle
      })
    },
    {
      Header: "Wining (%)",
      accessor: "symWonPercent",
      getProps: (state, rowInfo) => ({
        className: classes.DarkStyle
      }),
      getHeaderProps: (state, rowInfo) => ({
        className: classes.HDarkStyle
      })
    },
    {
      Header: "Losing",
      accessor: "symLost",
      getProps: (state, rowInfo) => ({
        className: classes.DarkStyle
      }),
      getHeaderProps: (state, rowInfo) => ({
        className: classes.HDarkStyle
      })
    },
    {
      Header: "Losing (%)",
      accessor: "symLossPercent",
      getProps: (state, rowInfo) => ({
        className: classes.DarkStyle
      }),
      getHeaderProps: (state, rowInfo) => ({
        className: classes.HDarkStyle
      })
    },
  ];
  const GetFilteredPos = () => {
    let transactions = [];
    for (let i = 0; i < positions.length; i++) {
      if (state.account == "" || positions[i].accountString == state.account) {
        if (
          state.strategy == "" ||
          positions[i].strategyName == state.strategy
        ) {
          if (state.symbol == "" || positions[i].symbolName == state.symbol) {
            if (state.year == "" || new Date(positions[i].closeTime).getFullYear() == state.year) {
              var close = new Date(positions[i].closeTime).toLocaleString();
              var open = new Date(positions[i].openTime).toLocaleString();
              const onePosition = {
                accountString: positions[i].accountString,
                symbolName: positions[i].symbolName,
                positionDirection: positions[i].positionDirection,
                volume: positions[i].volume,
                entryPrice: positions[i].entryPrice,
                closingPrice: positions[i].closingPrice,
                openTime: open,
                closeTime: close,
                takeProfit: positions[i].takeProfit,
                stopLoss: positions[i].stopLoss,
                status: positions[i].status,
                grossProfit: positions[i].grossProfit,
                netProfit: positions[i].netProfit,
                commission: positions[i].commission,
                swap: positions[i].swap,
                strategyName: positions[i].strategyName,
                positionId: positions[i].positionId,
              }
              transactions.push(onePosition);
              // transactions.push(positions[i]);

            }
          }
        }
      }
    }

    setfilteredPositions(transactions);
    let win = 0;
    let loss = 0;
    let gross_profit = 0;
    let net_profit = 0;
    let cost = 0;
    let commission = 0;
    let swap = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (Number(transactions[i].netProfit) > 0) win++;
      else loss++;
      gross_profit += Number(transactions[i].grossProfit);
      net_profit += Number(transactions[i].netProfit);
      commission += 2 * Number(transactions[i].commission);
      swap += Number(transactions[i].swap);
    }
    cost = gross_profit - net_profit;
    setWinCount(win);
    setLossCount(loss);
    setGrossProfit(gross_profit);
    setNetProfit(net_profit);
    setCost(cost);
    setCommission(commission);
    setSwap(swap);
  };

  useEffect(() => {
    GetFilteredPos();
    GetSymbolHistory();
    GetYearHistory();
  }, [positions, accounts, symbols, strategies, limitTime, state]);

  const handleClick_1w = () => {
    setLimitTime(new Date(new Date().getTime() - (7 * 24 * 3600 * 1000)));
    setBtn1W(true);
    setBtn1M(false);
    setBtn3M(false);
    setBtn6M(false);
    setBtn1Y(false);
    setBtnAll(false);
  };
  const handleClick_1m = () => {
    setLimitTime(new Date(new Date().getTime() - (30 * 24 * 3600 * 1000)));
    setBtn1W(false);
    setBtn1M(true);
    setBtn3M(false);
    setBtn6M(false);
    setBtn1Y(false);
    setBtnAll(false);
  };
  const handleClick_3m = () => {
    setLimitTime(new Date(new Date().getTime() - (3 * 30 * 24 * 3600 * 1000)));
    setBtn1W(false);
    setBtn1M(false);
    setBtn3M(true);
    setBtn6M(false);
    setBtn1Y(false);
    setBtnAll(false);
  };
  const handleClick_6m = () => {
    setLimitTime(new Date(new Date().getTime() - (6 * 30 * 24 * 3600 * 1000)));
    setBtn1W(false);
    setBtn1M(false);
    setBtn3M(false);
    setBtn6M(true);
    setBtn1Y(false);
    setBtnAll(false);
  };
  const handleClick_1y = () => {
    setLimitTime(new Date(new Date().getTime() - (365 * 24 * 3600 * 1000)));
    setBtn1W(false);
    setBtn1M(false);
    setBtn3M(false);
    setBtn6M(false);
    setBtn1Y(true);
    setBtnAll(false);
  };
  const handleClick_all = () => {
    setLimitTime('Fri, 01 Jan 1971 00:00:00 GMT');
    setBtn1W(false);
    setBtn1M(false);
    setBtn3M(false);
    setBtn6M(false);
    setBtn1Y(false);
    setBtnAll(true);
  };


  return (
    <div>

      {symbol_History_Order.length > 0 && (
        <div>
          <Paper>
            <ReactTable
              data={symbol_History_Order}
              columns={columns}
              defaultPageSize={6}
              pageSizeOptions={[2, 4, 6]}
              className=" -highlight" //-striped
            />
          </Paper>

          <br />
          <ButtonGroup variant="contained" color="secondary" aria-label="outlined primary button group">
            <Button color={btn1W ? "primary" : "secondary"} onClick={handleClick_1w}>1W</Button>
            <Button color={btn1M ? "primary" : "secondary"} onClick={handleClick_1m}>1M</Button>
            <Button color={btn3M ? "primary" : "secondary"} onClick={handleClick_3m}>3M</Button>
            <Button color={btn6M ? "primary" : "secondary"} onClick={handleClick_6m}>6M</Button>
            <Button color={btn1Y ? "primary" : "secondary"} onClick={handleClick_1y}>1Y</Button>
            <Button color={btnAll ? "primary" : "secondary"} onClick={handleClick_all}>All</Button>
          </ButtonGroup>

          <br />
          <Grid container>
            <Grid item md={4}>
              {/* <Paper> */}
              <br />
              <Chart
                width={"100%"}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                  pieHole: 0.6,
                  slices: color_Array,
                  backgroundColor: 'transparent', //"#f5f5f5",
                  chartArea: {
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%"
                  },
                }}
                rootProps={{ 'data-testid': '1' }}
              />

              {/* </Paper> */}

            </Grid>
            <Grid item md={8}>
              <Paper>
                <ReactTable
                  data={symbol_History_Order}
                  columns={columns2}
                  defaultPageSize={6}
                  pageSizeOptions={[2, 4, 6]}
                  className=" -highlight" //-striped           
                />
              </Paper>
            </Grid>
          </Grid>

          <br />
          {yearHistory.length > 0 && (
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="yearChart-simple-select-outlined-label">Year</InputLabel>
              <Select
                labelId="yearChart-simple-select-outlined-label"
                // id="demo-simple-select-outlined"
                value={state.yearChart}
                onChange={handleChange}
                label="yearChart"
                inputProps={{
                  name: "yearChart",
                  id: "yearChart-simple-select-outlined"
                }}
              >
                <MenuItem value=""> <em>None</em></MenuItem>
                {yearHistory.map((oneyear) => {
                  return <MenuItem value={oneyear}>{oneyear}</MenuItem>;
                })}
              </Select>
            </FormControl>
          )}

          <br />
          <Chart
            width={"100%"}
            height={'300px'}
            chartType="ColumnChart"
            loader={<div >Loading Chart</div>}
            data={barChartData}
            options={{
              // Material design options

              backgroundColor: "#f5f5f5",
              colors: ["limegreen", "orange"],
              vAxis: {
                minValue: 0,
              },
            }}
            // For tests
            rootProps={{ 'data-testid': '2' }}
          />
          <br />
        </div>
      )}

      {accounts.length > 0 && (
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="account-native-label-placeholder">
            Account
          </InputLabel>
          <NativeSelect
            value={state.account}
            onChange={handleChange}
            inputProps={{
              name: "account",
              id: "account-native-label-placeholder"
            }}
          >
            <option value="">None</option>
            {accounts.map((account) => {
              return (
                <option value={account.accountString}>
                  {account.accountString}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      )}

      {/* {strategies.length > 0 && (
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="strategy-native-label-placeholder">
            Strategies
          </InputLabel>
          <NativeSelect
            value={state.strategy}
            onChange={handleChange}
            inputProps={{
              name: "strategy",
              id: "strategy-native-label-placeholder"
            }}
          >
            <option value="">None</option>
            {strategies.map((strategyCell) => {
              return <option value={strategyCell}>{strategyCell}</option>;
            })}
          </NativeSelect>
        </FormControl>
      )} */}

      {symbols.length > 0 && (
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="symbol-native-label-placeholder">
            Symbol
          </InputLabel>
          <NativeSelect
            value={state.symbol}
            onChange={handleChange}
            inputProps={{
              name: "symbol",
              id: "symbol-native-label-placeholder"
            }}
          >
            <option value="">None</option>
            {symbols.map((symbol) => {
              return <option value={symbol}>{symbol}</option>;
            })}
          </NativeSelect>
        </FormControl>
      )}

      {yearHistory.length > 0 && (
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="year-native-label-placeholder">
            Close Year
          </InputLabel>
          <NativeSelect
            value={state.year}
            onChange={handleChange}
            inputProps={{
              name: "year",
              id: "year-native-label-placeholder"
            }}
          >
            <option value="">None</option>
            {yearHistory.map((oneyear) => {
              return <option value={oneyear}>{oneyear}</option>;
            })}
          </NativeSelect>
        </FormControl>
      )}


      <Grid container>
        <Grid item md={2}>
          {filteredPositions.length > 0 && (
            <Paper elevation={3} className={classes.paperClass}>
              <br />
              <Grid container>
                <Grid item md={11}>
                  <Typography
                    variant="h6"
                    // display="inline"
                    align="center"
                    className={classes.InfoClass}
                  >
                    {"Total Positions : " + filteredPositions.length}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={12}>
                  <br />
                  <br />
                  <Typography
                    variant="h6"
                    display="inline"
                    className={classes.InfoClass}
                  >
                    {"Win Positions : " + winCount}
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <br />
                  <Typography
                    variant="h6"
                    display="inline"
                    className={classes.InfoClass}
                  >
                    {"Loss Positions : " + lossCount}
                  </Typography>
                </Grid>

                <Grid item md={12}>
                  <br />
                  <Typography
                    variant="h6"
                    display="inline"
                    className={classes.InfoClass}
                  >
                    {"Gross Profit : " + grossProfit.toFixed(2)}
                  </Typography>
                </Grid>

                <Grid item md={12}>
                  <br />
                  <Typography
                    variant="h6"
                    display="inline"
                    className={classes.InfoClass}
                  >
                    {"Net Profit : " + netProfit.toFixed(2)}
                  </Typography>
                </Grid>

                <Grid item md={12}>
                  <br />
                  <Typography
                    variant="h6"
                    display="inline"
                    className={classes.InfoClass}
                  >
                    {"Cost : " + cost.toFixed(2)}
                  </Typography>
                </Grid>

                <Grid item md={12}>
                  <br />
                  <Typography
                    variant="h6"
                    display="inline"
                    className={classes.InfoClass}
                  >
                    {"Commission : " + commission.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <br />
                  <Typography
                    variant="h6"
                    display="inline"
                    className={classes.InfoClass}
                  >
                    {"Swap : " + swap.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>

            </Paper>
          )}
        </Grid>
        <Grid item md={10}>
          <Paper>
            <SubscriptionTable
              transactions={filteredPositions}
              tableMaxheight={600}
              initialRows={5}
              headername={headername1}
            />
          </Paper>
        </Grid>
      </Grid>





    </div >
  );
}

History.propTypes = {
  selectHistory: PropTypes.func.isRequired
  // pushMessageToSnackbar: PropTypes.func
};

export default History;
