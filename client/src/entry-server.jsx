import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './App'
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux"
import { store } from "./store.js"


export function render() {
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location="">
        <App />
      </StaticRouter>
    </Provider>
  )
  return { html }
}
