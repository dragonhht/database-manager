import React from 'react'
import ReactDom from 'react-dom'
import 'antd/dist/antd.css'
import Main from '@/page/Main'
import reportWebVitals from './reportWebVitals'

ReactDom.render(
  <React.StrictMode>
    <Main></Main>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()