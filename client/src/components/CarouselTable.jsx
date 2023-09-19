import { useState, useMemo, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { BASE_URL } from "../api/axios";
import { Collapse, ImageListItem } from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: "alt",
        numeric: false,
        disablePadding: true,
        label: "Alt",
    },
    {
        id: "image",
        numeric: false,
        disablePadding: false,
        label: "File",
    },
    {
        id: "type",
        numeric: false,
        disablePadding: true,
        label: "Type",
    },
    {
        id: "order",
        numeric: false,
        disablePadding: true,
        label: "Order",
    },
    {
        id: "createdAt",
        numeric: false,
        disablePadding: false,
        label: "Created-at",
    },
    {
        id: "updatedAt",
        numeric: false,
        disablePadding: false,
        label: "Updated-at",
    },
];

function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all desserts",
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar({
    numSelected,
    deleteSlectedItems,
    swapCarouselItems,
    revertItemsOrder,
}) {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Carousel Images
                </Typography>
            )}
            {numSelected === 2 && (
                <Tooltip title="swap">
                    <IconButton onClick={swapCarouselItems}>
                        <SwapVertIcon />
                    </IconButton>
                </Tooltip>
            )}
            {numSelected > 0 && (
                <Tooltip title="revert">
                    <IconButton onClick={revertItemsOrder}>
                        <SettingsBackupRestoreIcon />
                    </IconButton>
                </Tooltip>
            )}
            {
                numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton onClick={deleteSlectedItems}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    ""
                )
                //(
                //   <Tooltip title="Filter list">
                //     <IconButton>
                //       <FilterListIcon />
                //     </IconButton>
                //   </Tooltip>
                // )
            }
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function UsersTable({ rld, setUpdateTime, setItemToUpdate }) {
    const axiosPrivate = useAxiosPrivate();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("calories");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [rows, setRows] = useState([]);
    const [lod, setLod] = useState(false);
    const [deleteRLod, setDeleteRLod] = useState(false);
    const [open, setOpen] = useState(false);
    const [cellId, setCellId] = useState(0);

    useEffect(() => {
        axiosPrivate.get("/carousel/getCarouselItems").then((res) => {
            setRows(res.data.carouselItems);
            setLod(!lod);
        });
    }, [rld, deleteRLod]);

    const deleteSlectedItems = () => {
        console.log(selected);
        axiosPrivate
            .post("/carousel/deleteCarouselItems", selected)
            .then((res) => {
                console.log(res);
                setDeleteRLod(!deleteRLod);
                setSelected([]);
            });
    };
    const swapCarouselItems = () => {
        console.log(selected);
        axiosPrivate
            .post("/carousel/swapCarouselItems", selected)
            .then((res) => {
                console.log(res);
                setDeleteRLod(!deleteRLod);
                setSelected([]);
            });
    };
    const revertItemsOrder = () => {
        console.log(selected);
        axiosPrivate
            .post("/carousel/revertItemsOrder", selected)
            .then((res) => {
                console.log(res);
                setDeleteRLod(!deleteRLod);
                setSelected([]);
            });
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage, lod]
    );

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    deleteSlectedItems={deleteSlectedItems}
                    swapCarouselItems={swapCarouselItems}
                    revertItemsOrder={revertItemsOrder}
                />
                <TableContainer sx={{ maxHeight: "65vh" }}>
                    <Table
                        sx={{ minWidth: "750", borderRadius: "3%" }}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row._id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <Fragment key={row._id}>
                                        <TableRow
                                            onDoubleClick={() => {
                                                setUpdateTime(true);
                                                setItemToUpdate(row);
                                            }}
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            selected={isItemSelected}
                                            sx={{ cursor: "pointer" }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) =>
                                                        handleClick(
                                                            event,
                                                            row._id
                                                        )
                                                    }
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby":
                                                            labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.alt}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => {
                                                        setOpen(!open);
                                                        setCellId(row._id);
                                                    }}
                                                >
                                                    {open ? (
                                                        <KeyboardArrowUpIcon />
                                                    ) : (
                                                        <KeyboardArrowDownIcon />
                                                    )}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.type}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.order}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.createdAt?.slice(0, 10)}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.updatedAt?.slice(0, 10)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                style={{
                                                    paddingBottom: 0,
                                                    paddingTop: 0,
                                                }}
                                                colSpan={6}
                                            >
                                                <Collapse
                                                    in={
                                                        open &&
                                                        row._id === cellId
                                                    }
                                                    timeout="auto"
                                                    unmountOnExit
                                                >
                                                    <Box
                                                        sx={{ margin: 1 }}
                                                        key={row._id}
                                                    >
                                                        <ImageListItem
                                                            sx={{
                                                                height: "350px",
                                                                width: "622.3px",
                                                            }}
                                                        >
                                                            {row.type ===
                                                                "i" && (
                                                                <img
                                                                    src={`${BASE_URL}/assets/${row.picturePath}`}
                                                                    alt={
                                                                        row.picturePath
                                                                    }
                                                                    loading="lazy"
                                                                />
                                                            )}
                                                            {row.type ===
                                                                "v" && (
                                                                <video
                                                                    style={{
                                                                        pointerEvents:
                                                                            "all",
                                                                        height: "350px",
                                                                        width: "622.3px",
                                                                    }}
                                                                    controls
                                                                    id={`${row._id}`}
                                                                >
                                                                    <source
                                                                        src={`${BASE_URL}/carousel/streamingVideos/${row.picturePath}`}
                                                                    />
                                                                </video>
                                                            )}
                                                        </ImageListItem>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </Fragment>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
            />
        </Box>
    );
}
