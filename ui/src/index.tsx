import React from 'react'
import ReactDom from 'react-dom'
import 'antd/dist/antd.css'
import Main from '@/page/Main'
import reportWebVitals from '@/reportWebVitals'

ReactDom.render(
  <Main />,
  document.getElementById('root')
)

reportWebVitals(null)