import React from 'react';
import { Provider } from 'react-redux'
import { store } from './store/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import Routes from './Routes'
import { Loading, Notify, Alert, Confirm } from './view/components'
import './global.css'

import { FaUser } from 'react-icons/fa'
import { Button, TextField } from '@material-ui/core'

import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DeleteIcon from '@material-ui/icons/Delete'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500]
    }
  },
  props: {
    MuiTextField: {
      variant: "outlined",
      fullWidth: true
    },
    MuiSelect: {
      variant: "outlined",
      fullWidth: true
    }
  }
})

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Alert />
      <Notify />
      <Loading />
      <Routes />
    </ThemeProvider>
  </Provider>
)

export default App;
