import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/components/App/App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/redux/store'
import ScrollToTop from './app/components/ScrollToTop/ScrollToTop'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Router>
    <Provider store={store}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Provider>
  </Router>
)
