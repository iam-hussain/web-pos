import PropTypes from "prop-types";
import * as React from "react";
import {
  Box,
  Paper,
  Button,
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

function TableToolBar({
  selectedLength,
  hed,
  disableDeleteAction,
  showCredActions,
  showIconButton,
  handleAddActionClick,
  handleEditActionClick,
  handleDeleteActionClick,
}: any) {
  return (
    <Toolbar
      sx={{
        px: { sm: 2 },
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
          {`${selectedLength.toString()} selected`}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%", fontWeight: 400 }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {hed}
        </Typography>
      )}
      {showCredActions && (
        <>
          {selectedLength > 0 ? (
            <>
              <Tooltip title="Update">
                {showIconButton ? (
                  <IconButton
                    color={"secondary"}
                    onClick={handleEditActionClick}
                  >
                    <Edit />
                  </IconButton>
                ) : (
                  <Button
                    variant="outlined"
                    color={"primary"}
                    endIcon={<Edit />}
                    onClick={handleEditActionClick}
                  >
                    Update
                  </Button>
                )}
              </Tooltip>
              {!disableDeleteAction && (
                <Tooltip title="Delete">
                  {showIconButton ? (
                    <IconButton
                      color={"secondary"}
                      onClick={handleDeleteActionClick}
                    >
                      <DeleteForever />
                    </IconButton>
                  ) : (
                    <Button
                      variant="outlined"
                      color={"primary"}
                      endIcon={<DeleteForever />}
                      onClick={handleDeleteActionClick}
                    >
                      Delete
                    </Button>
                  )}
                </Tooltip>
              )}
            </>
          ) : (
            <Tooltip title="Create">
              {showIconButton ? (
                <IconButton color={"secondary"} onClick={handleAddActionClick}>
                  <AddBoxRounded />
                </IconButton>
              ) : (
                <Button
                  variant="outlined"
                  color={"primary"}
                  endIcon={<AddBoxRounded />}
                  onClick={handleAddActionClick}
                >
                  Create
                </Button>
              )}
            </Tooltip>
          )}
        </>
      )}
    </Toolbar>
  );
}

function EnhancedTable(props: any) {
  const {
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
    noItemsFound,
    shouldSingleSelect,
  } = props;
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const [orderBy, setOrderBy] = React.useState<any>("id");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");

  const selectedLength = selected.length;
  const itemsLength = items.length || 0;
  const isSelected = (id: any) => selected.indexOf(id) !== -1;

  const handleRowClick = (id: any) => {
    if (isSelected(id)) {
      if (shouldSingleSelect) {
        setSelected([]);
      } else {
        setSelected([...selected.filter((each) => each !== id)]);
      }
    } else {
      if (shouldSingleSelect) {
        setSelected([id]);
      } else {
        setSelected([...selected, id]);
      }
    }
  };

  const handleSortClick = (key: string) => {
    const isAsc = orderBy === key && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(key);
  };

  const handleSelectAllClick = () => {
    if (selectedLength === itemsLength) {
      setSelected([]);
    } else {
      setSelected(items.map(([id]: any) => id));
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }} variant="outlined">
        {shouldShowToolBar && (
          <TableToolBar {...props} selectedLength={selectedLength} />
        )}
        <>
          <TableContainer>
            <Table
              stickyHeader
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <TableHead>
                <TableRow>
                  {!disableSelectCheckBox && (
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
                        disabled={disableSelectAllCheckBox}
                      />
                    </TableCell>
                  )}

                  {header.map((headCell: any, index: number) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? "right" : "left"}
                      padding={headCell.disablePadding ? "none" : "normal"}
                      sortDirection={orderBy === headCell.key ? order : false}
                      sx={{
                        userSelect: "none",
                      }}
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
                {items.length > 0 ? (
                  <>
                    {items.map((column: any, i: number) => (
                      <TableRow
                        key={i}
                        onClick={() => handleRowClick(column[0])}
                        aria-checked={isSelected(column[0])}
                        role="checkbox"
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
                            padding={
                              header[j].disablePadding ? "none" : "normal"
                            }
                            key={j}
                            {...(i == 0
                              ? { id: `enhanced-table-checkbox-${i}` }
                              : {})}
                            dangerouslySetInnerHTML={{ __html: row }}
                          />
                        ))}
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={header.length}>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "center",
                          padding: 4,
                        }}
                      >
                        {noItemsFound}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
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
        </>
      </Paper>
    </Box>
  );
}

EnhancedTable.propTypes = {
  disableDeleteAction: PropTypes.bool,
  disableSelectAllCheckBox: PropTypes.bool,
  disableSelectCheckBox: PropTypes.bool,
  handleAddActionClick: PropTypes.func,
  handleDeleteActionClick: PropTypes.func,
  handleEditActionClick: PropTypes.func,
  handlePageChange: PropTypes.func,
  handleRowsPerPageChange: PropTypes.func,
  handleSelectAllClick: PropTypes.func,
  header: PropTypes.array,
  hed: PropTypes.string,
  items: PropTypes.array,
  noItemsFound: PropTypes.string,
  page: PropTypes.number,
  pageCount: PropTypes.number,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  shouldShowToolBar: PropTypes.bool,
  showCredActions: PropTypes.bool,
  showPagination: PropTypes.bool,
};

EnhancedTable.defaultProps = {
  hed: "Branch and Outlets",
  header: [],
  items: [],
  page: 1,
  pageCount: 10,
  rowsPerPage: 10,
  rowsPerPageOptions: [10, 15, 20],
  handlePageChange: () => {},
  handleRowsPerPageChange: () => {},
  disableDeleteAction: true,
  shouldShowToolBar: true,
  showPagination: false,
  disableSelectCheckBox: false,
  disableSelectAllCheckBox: false,
  handleSelectAllClick: () => {},
  noItemsFound: "No item available",
  showCredActions: false,
  handleAddActionClick: () => {},
  handleEditActionClick: () => {},
  handleDeleteActionClick: () => {},
  showIconButton: false,
  shouldSingleSelect: false,
};

export default EnhancedTable;
