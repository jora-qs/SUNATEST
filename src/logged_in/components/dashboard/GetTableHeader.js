export default function GetTableHeader(headername) {
  
  const results = [];
  for(let i=0; i<headername.length; i++)
  {
     const cell={id:headername[i], Label:headername[i]};
     results.push(cell);
  }

  return results;
  // return(
  //   [
  //     { id: 'Symbol', label: 'Symbol' },
  //     { id: 'P',      label: 'P' },
  //     { id: 'O',      label: 'O', },
  //     { id: 'A',      label: 'A', },
  //     { id: 'Spread', label: 'Spread',},
  //     { id: 'Bid',    label: 'Bid',},
  //     { id: 'Ask',    label: 'Ask',},
  //   ]
  // );
}