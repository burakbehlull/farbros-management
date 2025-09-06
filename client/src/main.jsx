import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@ui'
import { Toaster } from 'react-hot-toast'
import { CookiesProvider } from "react-cookie";
import { Provider } from 'react-redux'

import { store } from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <App />
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </StrictMode>,
)
