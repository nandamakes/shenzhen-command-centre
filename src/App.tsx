import { useState } from 'react'
import { CommandCentre } from './components/CommandCentre'
import { JessieGame } from './components/JessieGame'
import './App.css'

function App() {
  const [view, setView] = useState<'guide' | 'game'>('game')

  return (
    <div className="app">
      <div className="app-switcher">
        <button className={view === 'guide' ? 'active' : ''} onClick={() => setView('guide')}>📋 Travel Guide</button>
        <button className={view === 'game' ? 'active' : ''} onClick={() => setView('game')}>🎮 Jessie's Game</button>
      </div>
      {view === 'guide' ? <CommandCentre /> : <JessieGame />}
    </div>
  )
}

export default App
