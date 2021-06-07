import React, { useCallback, useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableContainer,
  TableHead,
  withStyles,
  makeStyles
} from "@material-ui/core";

import PropTypes from "prop-types";
import HighlightedInformation from "./HighlightedInformation";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  }
});
const styles = (theme) => ({
  tableWrapper: {
    overflowX: "auto",
    width: "100%"
  },
  blackBackground: {
    backgroundColor: theme.palette.primary.main
  },
  contentWrapper: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2)
    },
    width: "50%"
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

export default function SubscriptionTable(props) {
  const { transactions, tableMaxheight, initialRows, headername } = props;

  const [columns, setcolumns] = useState([]);

  const GetHeader = useCallback(() => {
    const coLumns = [];
    const iterations = headername?.length;

    for (let i = 0; i < iterations; i += 1) {
      const column = { id: headername[i].id, Label: headername[i].Label }; //headername[i] };
      coLumns.push(column);
    }
    setcolumns(coLumns);
  }, [setcolumns]);

  useEffect(() => {
    GetHeader();
  }, [GetHeader]);

  // let columns = [];
  // for (let i = 0; i < headername.length; i++) {
  //   columns.push({ id: headername[i], Label: headername[i] });
  // }

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(initialRows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (transactions.length > 0) {
    return (
      <div className={styles.tableWrapper}>
        <TableContainer style={{ maxHeight: tableMaxheight }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            size="small"
            // fixedHeader={false}
            style={{ tableLayout: "auto" }}
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, padding: 10 }}
                  >
                    {column.Label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth, padding: 10 }}
                          >
                            {/* {column.format && typeof value === "number"
                              ? column.format(value.toFixed(2))
                              : value} */}
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          labelRowsPerPage=""
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    );
  }
  return (
    <div className={styles.contentWrapper}>
      <HighlightedInformation>
        No transactions received yet.
      </HighlightedInformation>
    </div>
  );
}
