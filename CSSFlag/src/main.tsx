import React from 'react'
import ReactDOM from 'react-dom/client'
import Flag from './Flag.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Flag rowCount={9} columnCount={12} width={720} height={540} duration={1} staggerDelay={0.1} maxAmplitude={20}
              currentColor={"skyblue"}/>
    </React.StrictMode>,
)
