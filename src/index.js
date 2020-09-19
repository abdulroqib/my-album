import React from 'react'
import ReactDOM from 'react-dom'
import Album from './components/album'
import { PhotoProvider } from './components/context'
import './assets/css/main.css'

ReactDOM.render(
  <React.StrictMode>
    <PhotoProvider>
      <Album />
    </PhotoProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
