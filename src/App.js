import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import theme from './assets/theme'
import { ThemeProvider } from '@material-ui/styles'
import Navbar from './components/Navbar'
import './App.css'
import { HomePage } from './pages/HomePage/HomePage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    </ThemeProvider>
  )
}

export default App
