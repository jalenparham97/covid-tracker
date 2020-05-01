import React, { useState, useEffect } from 'react'
import './HomePage.scss'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { getAllStats, getContinents, getCountryData } from '../../api/covid'
import { ApexChart } from '../../components/Chart/Chart'
import chartOptions from '../../utils/chartData'
import MaterialTable from '../../components/Table/Table'
import { returnDataArray, formatNumber } from '../../utils/utils'

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: '20px'
  },
  statCards: {
    marginBottom: '50px'
  },
  card: {
    background: '#f6f6f6'
  },
  cardTitle: {
    fontSize: '18px'
  }
}))

export const HomePage = () => {
  const classes = useStyles()
  const [stats, setStats] = useState([])
  const [chartData, setChartData] = useState(chartOptions)
  const [countryData, seCountryData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const allStats = await getAllStats()
      const countryData = await getCountryData()
      setStats(allStats)
      seCountryData(countryData)
      const continentData = await getContinents()
      const continents = returnDataArray(continentData, 'continent')
      const cases = returnDataArray(continentData, 'cases')
      const deaths = returnDataArray(continentData, 'deaths')
      const critical = returnDataArray(continentData, 'critical')
      const recovered = returnDataArray(continentData, 'recovered')
      setChartData({
        options: {
          ...chartData.options,
          xaxis: {
            categories: [...continents]
          }
        },
        series: [
          { name: 'cases', data: [...cases] },
          { name: 'deaths', data: [...deaths] },
          { name: 'critical', data: [...critical] },
          { name: 'recovered', data: [...recovered] }
        ]
      })
    }
    fetchData()
  }, [])

  return (
    <div className="home">
      <Container className="container">
        <h1 className={classes.title}>
          The latest Global statistics on the Coronavirus pandemic
        </h1>

        <Grid container spacing={3} className={classes.statCards}>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card} elevation={0}>
              <CardContent>
                <span className={classes.cardTitle}>Global Cases</span>
                <Typography className="stat-number cases">
                  {formatNumber(stats.cases)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" variant="outlined">
                  View More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card} elevation={0}>
              <CardContent>
                <span className={classes.cardTitle}>Global Deaths</span>
                <Typography className="stat-number deaths">
                  {formatNumber(stats.deaths)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" variant="outlined">
                  View More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card} elevation={0}>
              <CardContent>
                <span className={classes.cardTitle}>Global Critical</span>
                <Typography className="stat-number critical">
                  {formatNumber(stats.critical)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" variant="outlined">
                  View More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card} elevation={0}>
              <CardContent>
                <span className={classes.cardTitle}>Global Recovered</span>
                <Typography className="stat-number recovered">
                  {formatNumber(stats.recovered)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" variant="outlined">
                  View More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <ApexChart
          className="chart"
          options={chartData.options}
          series={chartData.series}
          type="bar"
          width="100%"
          height="500"
        />

        <div className="country-stats-table-container">
          <MaterialTable countryData={countryData} />
        </div>
      </Container>
    </div>
  )
}
