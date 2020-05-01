import React from 'react'
import Chart from 'react-apexcharts'
import './Chart.scss'

export const ApexChart = ({ options, series, type, width, height }) => {
  return (
    <div className="chart-container">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type={type}
            width={width}
            height={height}
          />
        </div>
      </div>
    </div>
  )
}
