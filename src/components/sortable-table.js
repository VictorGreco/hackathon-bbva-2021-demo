import React, { useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { useHistory } from "react-router-dom";
import { visuallyHidden } from '@mui/utils';

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
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

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
        id: ' cd_cliente',
        numeric: false,
        disablePadding: true,
        label: ' Código cliente',
    },
    {
        id: 'nm_sector',
        numeric: true,
        disablePadding: false,
        label: 'Nombre del sector',
    },
    {
        id: 'emisiones_directas',
        numeric: true,
        disablePadding: false,
        label: 'Emisiones directas',
    },
    {
        id: 'emisiones_indirectas',
        numeric: true,
        disablePadding: false,
        label: 'Emisiones indirectas',
    },
    {
        id: 'otras_indirectas',
        numeric: true,
        disablePadding: false,
        label: 'Otras indirectas',
    },
    {
        id: 'emisiones_totales',
        numeric: true,
        disablePadding: false,
        label: 'Emisiones totales',
    }
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable({ search }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('nm_sector');
    const [rows, setRows] = React.useState([]);
    const [filteredRows, setFilteredRows] = React.useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get('https://hackathon-bbva-21-calc-verde.herokuapp.com/company')
            .then(({ data }) => {

                setRows(data);
            })
    }, [])

    useEffect(() => {
        setFilteredRows(rows);
    }, [rows])

    useEffect(() => {
        if (search !== '') {
            console.log(search)
            const filter = rows.filter((row) => row.cd_cliente.includes(search) || row.nm_sector.toLowerCase().includes(search));

            setFilteredRows(filter)
        } else {
            setFilteredRows(rows)
        }

    }, [search, rows])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, cd_cliente) => {

        history.push(`/company/${cd_cliente}`);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={filteredRows.length}
                        />
                        <TableBody>
                            {stableSort(filteredRows, getComparator(order, orderBy))
                                .map((row, index) => {

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.cd_cliente)}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.cd_cliente}
                                        >
                                            <TableCell padding="checkbox"></TableCell>
                                            <TableCell component="th" scope="row">{row.cd_cliente}</TableCell>
                                            <TableCell align="right">{row.nm_sector}</TableCell>
                                            <TableCell align="right">{row.emisiones_directas || '5.000 tCO2'}</TableCell>
                                            <TableCell align="right">{row.emisiones_indirectas || '2.000 tCO2'}</TableCell>
                                            <TableCell align="right">{row.otras_indirectas || '7.000 tCO2'}</TableCell>
                                            <TableCell align="right">{row.emisiones_totales || '14.000 tCO2'}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}