function HistoryPositionData(testValue) {
  let transactions1 = [];
  const iterations = 32;

  // for (let i = 0; i < iterations; i += 1) {
  //   const transaction1 = {
  //     id: testValue,
  //     symbolName: "GBPUSD",
  //     accountId: 19773402,
  //     accountString: "Spotware Demo 3328629",
  //     tradeNumber: 0,
  //     volume: 218000,
  //     entryPrice: 1.38861,
  //     takeProfit: 1.39361,
  //     takeProfitPipsNow: 50,
  //     stopLossPipsNow: 15,
  //     stopLoss: 1.39011,
  //     initialStopLossPips: 50,
  //     initialTakProfitPips: 50,
  //     status: 4,
  //     positionDirection: "Buy Market",
  //     orderId: 52612291,
  //     positionId: 30035393,
  //     closingPrice: 1.39009,
  //     grossProfit: 267.06,
  //     commission: -11.290000000000001,
  //     swap: 0,
  //     strategyName: "SSRShortTerm",
  //     openTime: "2021-04-28T12:39:46.281+03:00",
  //     closeTime: "2021-04-28T20:24:43.647+03:00",
  //     endTime: "1970-01-01T00:00:00Z"
  //   };

  //   transactions1.push(transaction1);
  // }

  transactions1 = [
    {
      id: 123,
      symbolName: "GBPUSD",
      accountId: 19773402,
      accountString: "Spotware Demo 3328629",
      tradeNumber: 0,
      volume: 218000,
      entryPrice: 1.38861,
      netProfit: 1.39361,
      takeProfitPipsNow: 50,
      stopLossPipsNow: 15,
      stopLoss: 1.39011,
      initialStopLossPips: 50,
      initialTakProfitPips: 50,
      status: 4,
      positionDirection: "Buy Market",
      orderId: 52612291,
      positionId: 30035393,
      closingPrice: 1.39009,
      grossProfit: 267.06,
      commission: -11.290000000000001,
      swap: 0,
      strategyName: "SSRShortTerm",
      openTime: "2021-04-28T12:39:46.281+03:00",
      closeTime: "2021-04-28T20:24:43.647+03:00",
      endTime: "1970-01-01T00:00:00Z"
    },
    {
      id: 456,
      symbolName: "EURUSD",
      accountId: 19773402,
      accountString: "Spotware Demo 3328629",
      tradeNumber: 0,
      volume: 218000,
      entryPrice: 1.38861,
      netProfit: 1.39361,
      takeProfitPipsNow: 50,
      stopLossPipsNow: 15,
      stopLoss: 1.39011,
      initialStopLossPips: 50,
      initialTakProfitPips: 50,
      status: 4,
      positionDirection: "Buy Market",
      orderId: 52612291,
      positionId: 30035393,
      closingPrice: 1.39009,
      grossProfit: 267.06,
      commission: -11.290000000000001,
      swap: 0.1,
      strategyName: "SSRShortTerm",
      openTime: "2021-04-28T12:39:46.281+03:00",
      closeTime: "2021-04-28T20:24:43.647+03:00",
      endTime: "1970-01-01T00:00:00Z"
    },
    {
      id: 789,
      symbolName: "GBPUSD",
      accountId: 19773402,
      accountString: "Spotware Demo 3328628",
      tradeNumber: 0,
      volume: 218000,
      entryPrice: 1.38861,
      netProfit: 1.39361,
      takeProfitPipsNow: 50,
      stopLossPipsNow: 15,
      stopLoss: 1.39011,
      initialStopLossPips: 50,
      initialTakProfitPips: 50,
      status: 4,
      positionDirection: "Buy Market",
      orderId: 52612291,
      positionId: 30035393,
      closingPrice: 1.39009,
      grossProfit: 267.06,
      commission: -11.290000000000001,
      swap: 0.2,
      strategyName: "SSRShortTerm",
      openTime: "2021-04-28T12:39:46.281+03:00",
      closeTime: "2021-04-28T20:24:43.647+03:00",
      endTime: "1970-01-01T00:00:00Z"
    }
  ];

  return transactions1;
}

export default HistoryPositionData;
