import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { formatNumber } from '../../utils/utils'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main
  },
  tableCell: {
    color: '#fff'
  },
  link: {
    color: '#000'
  },
  title: {
    fontWeight: 700
  },
  tableTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

export default function MaterialTable({ countryData }) {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filterCountries = (country, query) => {
    return country.toLowerCase().indexOf(query.toLowerCase()) !== -1
  }

  return (
    <div className="table">
      <div className={classes.tableTitle}>
        <h2 className={classes.title}>Country Covid 19 Stats</h2>

        <div className="searchFilter">
          <TextField
            id="country-search-field"
            placeholder="Search Country"
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell className={classes.tableCell}>Country</TableCell>
              <TableCell align="right" className={classes.tableCell}>
                Cases
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                Deaths
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                Active
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                Critical
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                Recovered
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                Tests
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countryData
              .filter((country) => filterCountries(country.country, searchTerm))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((country) => (
                <TableRow key={country.countryInfo._id}>
                  <TableCell component="th" scope="row">
                    <Link to="#" className={classes.link}>
                      {country.country}
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(country.cases)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(country.deaths)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(country.active)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(country.critical)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(country.recovered)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(country.tests)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={countryData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  )
}
