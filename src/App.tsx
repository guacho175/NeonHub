import { useState } from 'react';
import './App.css';
import { Gamepad2, ChevronRight } from 'lucide-react';

// Información de los juegos
const games = [
  {
    id: 'arkanoid',
    title: 'Arkanoid Neón',
    description: 'Destruye los bloques con tu pelota rebotante.',
    url: 'https://juegoarkanoid-1070505193439.us-central1.run.app',
    color: '#00ffff'
  },
  {
    id: 'pacman',
    title: 'Pac-Man Neón',
    description: 'Come y huye de los fantasmas en el laberinto.',
    url: 'https://juegopac-man-1070505193439.us-central1.run.app', // Placeholder
    color: '#ffff00'
  },
  {
    id: 'pong',
    title: 'Pong Neón',
    description: 'El clásico juego de tenis retro.',
    url: 'https://juegopong-1070505193439.us-central1.run.app', // Placeholder
    color: '#ff00ff'
  },
  {
    id: 'snake',
    title: 'Serpiente Neón',
    description: 'Come y crece sin chocar contra las paredes.',
    url: 'https://juegoserpiente-1070505193439.us-central1.run.app',
    color: '#00ff00'
  },
  {
    id: 'spaceinvaders',
    title: 'Space Invaders',
    description: 'Defiende la galaxia de los invasores.',
    url: 'https://juegospaceinvaders-1070505193439.us-central1.run.app', // Placeholder
    color: '#ff0055'
  },
  {
    id: 'tetris',
    title: 'Tetris Neón',
    description: 'Acomoda las piezas y limpia las líneas.',
    url: 'https://juegotetris-1070505193439.us-central1.run.app', // Placeholder
    color: '#aa00ff'
  }
];

function App() {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);

  const handlePlayClick = (url: string) => {
    window.location.href = url; // Opción A: Redirección directa al otro sitio (Cloud Run)
  };

  return (
    <div className="hub-container">
      <div className="scanlines"></div>
      
      <header className="hub-header">
        <h1>NEON <span className="text-glow">ARCADE</span></h1>
        <p>Tu portal a la era dorada.</p>
      </header>

      <main className="games-grid">
        {games.map((game) => (
          <div 
            key={game.id} 
            className={`game-card ${hoveredGame === game.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredGame(game.id)}
            onMouseLeave={() => setHoveredGame(null)}
            style={{ '--glow-color': game.color } as React.CSSProperties}
          >
            <div className="card-content">
              <Gamepad2 className="game-icon" size={48} color={game.color} />
              <h2>{game.title}</h2>
              <p>{game.description}</p>
              
              <button 
                className="play-button"
                onClick={() => handlePlayClick(game.url)}
                style={{ borderColor: game.color, color: game.color }}
              >
                JUGAR <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="card-border-glow"></div>
          </div>
        ))}
      </main>

      <footer className="hub-footer">
        <p>Hecho por Galindez - 2026</p>
      </footer>
    </div>
  );
}

export default App;
