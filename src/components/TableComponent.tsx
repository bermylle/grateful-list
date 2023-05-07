import { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  TableSortLabel,
  DialogContent,
} from "@mui/material";

export const TableComponent = (props: any) => {
  const rowsPerPage = 5;
  const [page, setPage] = useState(0);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleChangePage = (e: any, newPage: number) => {
    e.preventDefault();
    setPage(newPage);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedRows = [...props.gratefulList].sort((a, b) => {
    const sortMultiplier = sortDirection === "asc" ? 1 : -1;

    if (sortColumn === "input") {
      return sortMultiplier * a.input.localeCompare(b.input);
    }

    if (sortColumn === "date") {
      return (
        sortMultiplier *
        (new Date(a.date).getTime() - new Date(b.date).getTime())
      );
    }

    return 0;
  });

  const rows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      {rows.length === 0 ? (
        <DialogContent>No submissions yet.</DialogContent>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>The thing you're grateful for</TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={sortColumn === "date"}
                      direction={sortDirection}
                      onClick={() => handleSort("date")}
                    >
                      Date Written
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.input}
                    </TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={props.gratefulList.length}
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}
          />
        </>
      )}
    </>
  );
};
