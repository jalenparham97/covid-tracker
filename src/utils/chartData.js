export default {
  options: {
    chart: {
      id: 'bar',
      background: '#f6f6f6',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    title: {
      text: 'Covid 19 Worldwide Stats by Continent',
      align: 'center',
      margin: 50,
      offsetY: 5,
      style: {
        fontSize: '25px'
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'right',
      offsetY: 50
    },
    noData: {
      text: 'Loading...'
    },
    colors: ['#2196f3', '#f44336', '#ff9800', '#4caf50']
  },
  series: []
}
