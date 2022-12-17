import PropTypes from "prop-types";
import * as React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Checkbox,
  TableSortLabel,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { DeleteForever, AddBoxRounded, Edit } from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";

function TableToolBar({ selectedLength, hed, dek, shouldShowDelete }: any) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedLength > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selectedLength > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {dek}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {hed}
        </Typography>
      )}
      {selectedLength > 0 ? (
        <>
          <Tooltip title="Update">
            <IconButton color={"secondary"}>
              <Edit />
            </IconButton>
          </Tooltip>
          {shouldShowDelete && (
            <Tooltip title="Delete">
              <IconButton color={"secondary"}>
                <DeleteForever />
              </IconButton>
            </Tooltip>
          )}
        </>
      ) : (
        <Tooltip title="Create">
          <IconButton color={"secondary"}>
            <AddBoxRounded />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

function EnhancedTable(props: any) {
  const {
    dek,
    items,
    header,
    rowsPerPage,
    pageCount,
    page,
    handlePageChange,
    handleRowsPerPageChange,
    shouldShowToolBar,
    showPagination,
    rowsPerPageOptions,
    disableSelectCheckBox,
    disableSelectAllCheckBox,
  } = props;
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [selectDek, setSelectDek] = React.useState<string>(dek);

  const [orderBy, setOrderBy] = React.useState<any>("id");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");

  const selectedLength = selected.length;
  const itemsLength = items.length;
  const isSelected = (id: any) => selected.indexOf(id) !== -1;

  const handleRowClick = (id: any) => {
    if (isSelected(id)) {
      setSelected([...selected.filter((each) => each !== id)]);
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSortClick = (key: string) => {
    const isAsc = orderBy === key && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(key);
  };

  const handleSelectAllClick = () => {
    if (selected.length === items.length) {
      setSelected([]);
    } else {
      setSelected(items.map(([id]: any) => id));
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }} variant="outlined">
        {shouldShowToolBar && (
          <TableToolBar
            {...props}
            selectedLength={selectedLength}
            dek={selectDek}
          />
        )}
        <TableContainer>
          <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <TableHead>
              <TableRow>
                {!disableSelectCheckBox && !disableSelectAllCheckBox && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selectedLength > 0 && selectedLength < itemsLength
                      }
                      checked={
                        itemsLength > 0 && selectedLength === itemsLength
                      }
                      onChange={handleSelectAllClick}
                      inputProps={{
                        "aria-label": "select all",
                      }}
                    />
                  </TableCell>
                )}
                {header.map((headCell: any, index: number) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? "right" : "left"}
                    padding={headCell.disablePadding ? "none" : "normal"}
                    sortDirection={orderBy === headCell.key ? order : false}
                  >
                    {headCell.sortable ? (
                      <TableSortLabel
                        active={orderBy === headCell.key}
                        direction={orderBy === headCell.key ? order : "asc"}
                        onClick={() => handleSortClick(headCell.key)}
                      >
                        {headCell.label}
                        {orderBy === headCell.key ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    ) : (
                      <>{headCell.label}</>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((column: any, i: number) => (
                <TableRow
                  key={i}
                  onClick={() => handleRowClick(column[0])}
                  aria-checked={isSelected(column[0])}
                  role="checkbox"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {!disableSelectCheckBox && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isSelected(column[0])}
                        inputProps={{
                          "aria-labelledby": `enhanced-table-checkbox-${i}`,
                        }}
                      />
                    </TableCell>
                  )}
                  {column.map((row: any, j: number) => (
                    <TableCell
                      component="th"
                      scope="row"
                      align={header[j].numeric ? "right" : "left"}
                      padding={header[j].disablePadding ? "none" : "normal"}
                      key={j}
                      {...(i == 0
                        ? { id: `enhanced-table-checkbox-${i}` }
                        : {})}
                    >
                      {row}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {showPagination && (
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={pageCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        )}
      </Paper>
    </Box>
  );
}

EnhancedTable.propTypes = {
  dek: PropTypes.string,
  handlePageChange: PropTypes.func,
  handleRowsPerPageChange: PropTypes.func,
  header: PropTypes.array,
  hed: PropTypes.string,
  items: PropTypes.array,
  page: PropTypes.number,
  pageCount: PropTypes.number,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  shouldShowDelete: PropTypes.bool,
  shouldShowToolBar: PropTypes.bool,
  showPagination: PropTypes.bool,
};

EnhancedTable.defaultProps = {
  hed: "Branch and Outlets",
  dek: "",
  header: [],
  items: [],
  page: 1,
  pageCount: 10,
  rowsPerPage: 10,
  rowsPerPageOptions: [10, 15, 20],
  handlePageChange: () => {},
  handleRowsPerPageChange: () => {},
  shouldShowDelete: true,
  shouldShowToolBar: true,
  showPagination: false,
  disableSelectCheckBox: false,
  disableSelectAllCheckBox: false,
  handleSelectAllClick: () => {},
};

export default EnhancedTable;
