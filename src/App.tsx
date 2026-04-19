import { useState, useCallback } from 'react';
import './index.css';
import { 
  CircleDashed, // Arkanoid
  Ghost,        // Pacman
  Orbit,        // Pong (representing 2 paddles and a ball conceptually)
  MoveDiagonal, // Snake
  Rocket,       // Space invaders
  Grid3X3,      // Tetris
  ChevronRight,
  MonitorPlay,
  Trophy
} from 'lucide-react';

// Centralizamos los 6 links reales de Cloud Run
const games = [
  {
    id: 'arkanoid',
    title: 'Arkanoid Neón',
    description: 'Destruye los bloques de neón con precisión.',
    url: 'https://juegoarkanoid-1070505193439.us-central1.run.app',
    color: '#00ffff',
    icon: CircleDashed,
    delay: '0.1s'
  },
  {
    id: 'pacman',
    title: 'Pac-Man Neón',
    description: 'Come, huye de los fantasmas y domina el laberinto.',
    url: 'https://juegopac-man-1070505193439.us-central1.run.app',
    color: '#ffff00',
    icon: Ghost,
    delay: '0.2s'
  },
  {
    id: 'pong',
    title: 'Pong Neón',
    description: 'El clásico tenis retro reinventado.',
    url: 'https://juegopong-1070505193439.us-central1.run.app',
    color: '#ff00ff',
    icon: Orbit,
    delay: '0.3s'
  },
  {
    id: 'snake',
    title: 'Serpiente Neón',
    description: 'Crece sin límites y evita chocar contigo mismo.',
    url: 'https://juegoserpiente-1070505193439.us-central1.run.app',
    color: '#00ff00',
    icon: MoveDiagonal,
    delay: '0.4s'
  },
  {
    id: 'spaceinvaders',
    title: 'Space Invaders',
    description: 'Defiende la Tierra del asalto alienígena.',
    url: 'https://juegospaceinvaders-1070505193439.us-central1.run.app',
    color: '#ff0055',
    icon: Rocket,
    delay: '0.5s'
  },
  {
    id: 'tetris',
    title: 'Tetris Neón',
    description: 'Encaja las piezas al ritmo del synthwave.',
    url: 'https://juegotetris-1070505193439.us-central1.run.app',
    color: '#aa00ff',
    icon: Grid3X3,
    delay: '0.6s'
  }
];

function App() {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);

  // Sonido sintético "PRO" estilo arcade interactivo al hacer hover
  const playHoverSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); 
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch(e) {
      // Ignorar si el navegador bloquea el autoplay de Web Audio API
    }
  }, []);

  const handlePlayClick = (url: string) => {
    // Abrir en la misma pestaña pero dejando el historial para poder volver
    window.location.href = url; 
  };

  return (
    <div className="hub-container">
      {/* Elementos ambientales PRO */}
      <div className="scanlines"></div>
      <div className="vignette"></div>
      <div className="particles-overlay"></div>
      
      <header className="hub-header">
        <div className="logo-container">
          <MonitorPlay size={40} className="logo-icon text-glow" />
          <h1>NEON <span className="text-glow">ARCADE</span></h1>
        </div>
        <p className="subtitle">Selecciona tu experiencia retro</p>
        
        <div className="stats-bar">
          <span className="stat-badge"><Trophy size={16} /> 6 JUEGOS ACTIVOS</span>
          <span className="stat-badge online">ESTADO: ONLINE</span>
        </div>
      </header>

      <main className="games-grid">
        {games.map((game) => {
          const Icon = game.icon;
          const isHovered = hoveredGame === game.id;
          return (
            <div 
              key={game.id} 
              className={`game-card fade-in-up ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => {
                setHoveredGame(game.id);
                playHoverSound();
              }}
              onMouseLeave={() => setHoveredGame(null)}
              style={{ 
                '--glow-color': game.color,
                animationDelay: game.delay
              } as React.CSSProperties}
            >
              <div className="card-bg-gradient" style={{ background: `radial-gradient(circle at top right, ${game.color}22, transparent 70%)` }}></div>
              <div className="card-content">
                <div className="icon-wrapper">
                  <Icon className="game-icon" size={56} color={game.color} />
                  {isHovered && <div className="icon-ping"></div>}
                </div>
                <h2>{game.title}</h2>
                <p>{game.description}</p>
                
                <button 
                  className="play-button"
                  onClick={() => handlePlayClick(game.url)}
                  style={{ 
                    borderColor: game.color, 
                    color: isHovered ? '#000' : game.color,
                    backgroundColor: isHovered ? game.color : 'transparent',
                    boxShadow: isHovered ? `0 0 20px ${game.color}` : 'none'
                  }}
                >
                  JUGAR AHORA <ChevronRight size={20} />
                </button>
              </div>
              
              <div className="card-border-glow"></div>
            </div>
          );
        })}
      </main>

      <footer className="hub-footer">
        <div className="footer-line"></div>
        <p className="glitch-text" data-text="Hecho por Galindez - 2026">Hecho por Galindez - 2026</p>
        <p className="version">v1.0.0 Alpha</p>
      </footer>
    </div>
  );
}

export default App;
