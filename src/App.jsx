import { useState } from 'react'
import NDMSPrototype from './components/ndms-prototype'
import C6Mobile from './components/ndms-c6-mobile'
import 'leaflet/dist/leaflet.css'
import './App.css'

function App() {
  const [mobileMode, setMobileMode] = useState(false)

  if (mobileMode) {
    return <C6Mobile onBackToDesktop={() => setMobileMode(false)} />
  }

  return <NDMSPrototype onOpenMobile={() => setMobileMode(true)} />
}

export default App
