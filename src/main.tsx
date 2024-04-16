import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {store} from "./store/store.ts"
import { Provider } from 'react-redux'
import { MantineProvider } from '@mantine/core'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </MantineProvider>
  </React.StrictMode>,
)
