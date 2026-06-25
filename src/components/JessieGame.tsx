import { useEffect, useRef, useState, useCallback } from 'react';
import './JessieGame.css';

const TILE = 32;
const GRAVITY = 0.5;
const JUMP_FORCE = -11;
const SPEED = 3.5;
const CANVAS_W = 800;
const CANVAS_H = 480;

interface Vec { x: number; y: number; }
interface Player {
  pos: Vec; vel: Vec;
  onGround: boolean; facingRight: boolean;
  frame: number; frameTimer: number;
  health: number; invincible: number;
}
interface Enemy {
  pos: Vec; vel: Vec;
  type: 'creeper' | 'blocker';
  dir: number; alive: boolean; frame: number; frameTimer: number;
}
interface Coin { pos: Vec; collected: boolean; bob: number; }
interface Platform { x: number; y: number; w: number; h: number; color: string; }
interface Particle { pos: Vec; vel: Vec; life: number; color: string; size: number; }

const LEVELS: { platforms: Platform[]; coins: Coin[]; enemies: Enemy[]; goalX: number; bgColor: string }[] = [
  {
    bgColor: '#87ceeb',
    goalX: 2400,
    platforms: [
      { x: 0,    y: 416, w: 400,  h: 64,  color: '#5d4037' },
      { x: 450,  y: 352, w: 160,  h: 32,  color: '#4caf50' },
      { x: 650,  y: 288, w: 160,  h: 32,  color: '#4caf50' },
      { x: 850,  y: 352, w: 200,  h: 32,  color: '#4caf50' },
      { x: 1100, y: 416, w: 400,  h: 64,  color: '#5d4037' },
      { x: 1550, y: 320, w: 160,  h: 32,  color: '#e91e63' },
      { x: 1760, y: 256, w: 160,  h: 32,  color: '#e91e63' },
      { x: 1970, y: 320, w: 160,  h: 32,  color: '#4caf50' },
      { x: 2200, y: 384, w: 300,  h: 96,  color: '#5d4037' },
    ],
    coins: [
      { pos: { x: 460, y: 316 }, collected: false, bob: 0 },
      { pos: { x: 496, y: 316 }, collected: false, bob: 0.5 },
      { pos: { x: 660, y: 252 }, collected: false, bob: 1 },
      { pos: { x: 696, y: 252 }, collected: false, bob: 1.5 },
      { pos: { x: 860, y: 316 }, collected: false, bob: 0 },
      { pos: { x: 900, y: 316 }, collected: false, bob: 0.5 },
      { pos: { x: 1560, y: 284 }, collected: false, bob: 0 },
      { pos: { x: 1770, y: 220 }, collected: false, bob: 0 },
      { pos: { x: 1980, y: 284 }, collected: false, bob: 0 },
      { pos: { x: 2250, y: 348 }, collected: false, bob: 0 },
      { pos: { x: 2290, y: 348 }, collected: false, bob: 0.5 },
      { pos: { x: 2330, y: 348 }, collected: false, bob: 1 },
    ],
    enemies: [
      { pos: { x: 200, y: 384 }, vel: { x: -1.5, y: 0 }, type: 'creeper', dir: -1, alive: true, frame: 0, frameTimer: 0 },
      { pos: { x: 860, y: 320 }, vel: { x: 1.2, y: 0 }, type: 'blocker', dir: 1, alive: true, frame: 0, frameTimer: 0 },
      { pos: { x: 1200, y: 384 }, vel: { x: -1.5, y: 0 }, type: 'creeper', dir: -1, alive: true, frame: 0, frameTimer: 0 },
      { pos: { x: 1560, y: 288 }, vel: { x: 1.2, y: 0 }, type: 'blocker', dir: 1, alive: true, frame: 0, frameTimer: 0 },
    ],
  },
];

function rectOverlap(ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function drawPixelChar(ctx: CanvasRenderingContext2D, x: number, y: number, facingRight: boolean, frame: number, health: number, invincible: number) {
  ctx.save();
  if (!facingRight) { ctx.scale(-1, 1); x = -x - 20; }
  const flash = invincible > 0 && Math.floor(invincible / 4) % 2 === 0;
  if (flash) { ctx.restore(); return; }

  const px = Math.floor(x);
  const py = Math.floor(y);
  const P = 4;

  // Hair (brown)
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(px, py, 20*P/5, 2*P/5);
  // Face
  ctx.fillStyle = '#FFDAB9';
  ctx.fillRect(px + 2, py + 2, 16*P/5, 10*P/5);
  // Eyes
  ctx.fillStyle = '#333';
  ctx.fillRect(px + 4, py + 4, 2, 2);
  ctx.fillRect(px + 14, py + 4, 2, 2);
  // Smile
  ctx.fillStyle = '#c0392b';
  ctx.fillRect(px + 6, py + 8, 8, 1);
  // Body (pink top - Roblox style blocky)
  ctx.fillStyle = '#e91e63';
  ctx.fillRect(px + 2, py + 12, 16, 10);
  // Arms
  const armOff = frame % 2 === 0 ? 0 : 2;
  ctx.fillStyle = '#e91e63';
  ctx.fillRect(px - 2, py + 12 + armOff, 4, 8);
  ctx.fillRect(px + 18, py + 12 - armOff, 4, 8);
  // Pants (blue)
  ctx.fillStyle = '#1976d2';
  ctx.fillRect(px + 2, py + 22, 16, 8);
  // Shoes
  ctx.fillStyle = '#333';
  ctx.fillRect(px + 2, py + 30, 6, 4);
  ctx.fillRect(px + 12, py + 30, 6, 4);

  // Health indicator
  if (health < 3) {
    ctx.fillStyle = 'rgba(255,0,0,0.8)';
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i < health ? '#ff5252' : 'rgba(255,255,255,0.4)';
      ctx.fillRect(px + i * 8, py - 8, 6, 4);
    }
  }

  ctx.restore();
}

function drawEnemy(ctx: CanvasRenderingContext2D, e: Enemy) {
  if (!e.alive) return;
  const x = Math.floor(e.pos.x);
  const y = Math.floor(e.pos.y);
  if (e.type === 'creeper') {
    // Green creeper block
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(x, y, 24, 24);
    ctx.fillStyle = '#388e3c';
    ctx.fillRect(x + 2, y + 2, 20, 20);
    // Face
    ctx.fillStyle = '#1b5e20';
    ctx.fillRect(x + 4, y + 6, 4, 4);
    ctx.fillRect(x + 16, y + 6, 4, 4);
    ctx.fillRect(x + 8, y + 14, 2, 2);
    ctx.fillRect(x + 14, y + 14, 2, 2);
    ctx.fillRect(x + 10, y + 16, 4, 2);
    ctx.fillRect(x + 8, y + 12, 8, 2);
  } else {
    // Red blocker
    ctx.fillStyle = '#f44336';
    ctx.fillRect(x, y, 24, 28);
    ctx.fillStyle = '#c62828';
    ctx.fillRect(x + 2, y + 2, 20, 24);
    // Angry eyes
    ctx.fillStyle = '#fff';
    ctx.fillRect(x + 4, y + 6, 6, 5);
    ctx.fillRect(x + 14, y + 6, 6, 5);
    ctx.fillStyle = '#000';
    ctx.fillRect(x + 6, y + 8, 3, 3);
    ctx.fillRect(x + 16, y + 8, 3, 3);
    // Eyebrows angry
    ctx.fillStyle = '#000';
    ctx.fillRect(x + 4, y + 4, 6, 2);
    ctx.fillRect(x + 14, y + 4, 6, 2);
    // Mouth
    ctx.fillStyle = '#000';
    ctx.fillRect(x + 6, y + 18, 12, 2);
  }
}

function drawCoin(ctx: CanvasRenderingContext2D, coin: Coin, t: number) {
  if (coin.collected) return;
  const bob = Math.sin(t * 3 + coin.bob * Math.PI) * 3;
  const x = Math.floor(coin.pos.x);
  const y = Math.floor(coin.pos.y + bob);
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(x + 8, y + 8, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFA000';
  ctx.beginPath();
  ctx.arc(x + 8, y + 8, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFE082';
  ctx.fillRect(x + 6, y + 5, 3, 3);
}

function drawPlatform(ctx: CanvasRenderingContext2D, p: Platform, camX: number) {
  const sx = p.x - camX;
  ctx.fillStyle = p.color;
  ctx.fillRect(sx, p.y, p.w, p.h);
  // Top grass/detail strip
  ctx.fillStyle = lighten(p.color);
  ctx.fillRect(sx, p.y, p.w, 6);
  // Brick pattern
  ctx.fillStyle = darken(p.color);
  const bw = TILE;
  for (let bx = sx; bx < sx + p.w; bx += bw) {
    ctx.fillRect(bx, p.y, 2, p.h);
  }
  for (let by = p.y; by < p.y + p.h; by += 16) {
    ctx.fillRect(sx, by, p.w, 1);
  }
}

function lighten(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((n >> 16) & 0xff) + 40);
  const g = Math.min(255, ((n >> 8) & 0xff) + 40);
  const b = Math.min(255, (n & 0xff) + 40);
  return `rgb(${r},${g},${b})`;
}
function darken(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((n >> 16) & 0xff) - 30);
  const g = Math.max(0, ((n >> 8) & 0xff) - 30);
  const b = Math.max(0, (n & 0xff) - 30);
  return `rgb(${r},${g},${b})`;
}

function drawBackground(ctx: CanvasRenderingContext2D, camX: number, bgColor: string) {
  // Sky
  const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
  grad.addColorStop(0, bgColor);
  grad.addColorStop(1, '#e3f2fd');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Clouds (parallax)
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  const clouds = [
    { x: 100, y: 60, w: 120, h: 40 },
    { x: 400, y: 40, w: 90, h: 30 },
    { x: 700, y: 80, w: 140, h: 50 },
    { x: 1000, y: 50, w: 100, h: 35 },
    { x: 1400, y: 70, w: 130, h: 45 },
    { x: 1800, y: 55, w: 110, h: 38 },
    { x: 2200, y: 65, w: 150, h: 55 },
  ];
  clouds.forEach(c => {
    const sx = c.x - camX * 0.3;
    ctx.beginPath();
    ctx.ellipse(sx + c.w / 2, c.y + c.h / 2, c.w / 2, c.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.ellipse(sx + c.w * 0.3, c.y + c.h * 0.4, c.w * 0.35, c.h * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.ellipse(sx + c.w * 0.7, c.y + c.h * 0.45, c.w * 0.3, c.h * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
  });
}

export function JessieGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    player: {
      pos: { x: 60, y: 350 }, vel: { x: 0, y: 0 },
      onGround: false, facingRight: true,
      frame: 0, frameTimer: 0,
      health: 3, invincible: 0,
    } as Player,
    enemies: JSON.parse(JSON.stringify(LEVELS[0].enemies)) as Enemy[],
    coins: JSON.parse(JSON.stringify(LEVELS[0].coins)) as Coin[],
    particles: [] as Particle[],
    keys: new Set<string>(),
    score: 0,
    t: 0,
    camX: 0,
    gameState: 'playing' as 'playing' | 'dead' | 'win',
  });

  const [uiScore, setUiScore] = useState(0);
  const [uiHealth, setUiHealth] = useState(3);
  const [gameState, setGameState] = useState<'playing' | 'dead' | 'win'>('playing');
  const rafRef = useRef(0);

  const restart = useCallback(() => {
    const s = stateRef.current;
    s.player = { pos: { x: 60, y: 350 }, vel: { x: 0, y: 0 }, onGround: false, facingRight: true, frame: 0, frameTimer: 0, health: 3, invincible: 0 };
    s.enemies = JSON.parse(JSON.stringify(LEVELS[0].enemies));
    s.coins = JSON.parse(JSON.stringify(LEVELS[0].coins));
    s.particles = [];
    s.score = 0;
    s.t = 0;
    s.camX = 0;
    s.gameState = 'playing';
    setUiScore(0);
    setUiHealth(3);
    setGameState('playing');
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent, down: boolean) => {
      e.preventDefault();
      if (down) stateRef.current.keys.add(e.code);
      else stateRef.current.keys.delete(e.code);
    };
    const kd = (e: KeyboardEvent) => onKey(e, true);
    const ku = (e: KeyboardEvent) => onKey(e, false);
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => { window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    const level = LEVELS[0];

    const loop = () => {
      const s = stateRef.current;
      if (s.gameState !== 'playing') { rafRef.current = requestAnimationFrame(loop); return; }

      s.t += 1 / 60;
      const { player, keys, enemies, coins, particles } = s;

      // Input
      const left = keys.has('ArrowLeft') || keys.has('KeyA');
      const right = keys.has('ArrowRight') || keys.has('KeyD');
      const jump = keys.has('ArrowUp') || keys.has('KeyW') || keys.has('Space');

      if (left) { player.vel.x = -SPEED; player.facingRight = false; }
      else if (right) { player.vel.x = SPEED; player.facingRight = true; }
      else player.vel.x *= 0.7;

      if (jump && player.onGround) { player.vel.y = JUMP_FORCE; player.onGround = false; }

      // Gravity
      player.vel.y += GRAVITY;
      player.pos.x += player.vel.x;
      player.pos.y += player.vel.y;
      player.onGround = false;

      // Platform collision
      const pw = 20, ph = 34;
      for (const p of level.platforms) {
        if (rectOverlap(player.pos.x, player.pos.y, pw, ph, p.x, p.y, p.w, p.h)) {
          const overlapLeft = (player.pos.x + pw) - p.x;
          const overlapRight = (p.x + p.w) - player.pos.x;
          const overlapTop = (player.pos.y + ph) - p.y;
          const overlapBottom = (p.y + p.h) - player.pos.y;
          const minH = Math.min(overlapLeft, overlapRight);
          const minV = Math.min(overlapTop, overlapBottom);
          if (minV < minH) {
            if (overlapTop < overlapBottom) { player.pos.y = p.y - ph; player.vel.y = 0; player.onGround = true; }
            else { player.pos.y = p.y + p.h; player.vel.y = 0; }
          } else {
            if (overlapLeft < overlapRight) player.pos.x = p.x - pw;
            else player.pos.x = p.x + p.w;
          }
        }
      }

      // Fall death
      if (player.pos.y > CANVAS_H + 100) { player.health = 0; }

      // Clamp left
      if (player.pos.x < 0) player.pos.x = 0;

      // Enemies
      for (const e of enemies) {
        if (!e.alive) continue;
        e.pos.x += e.vel.x;
        e.pos.y += GRAVITY;
        // Enemy platform collision
        for (const p of level.platforms) {
          if (rectOverlap(e.pos.x, e.pos.y, 24, 24, p.x, p.y, p.w, p.h)) {
            const ot = (e.pos.y + 24) - p.y;
            const ob = (p.y + p.h) - e.pos.y;
            if (ot < ob) { e.pos.y = p.y - 24; e.vel.y = 0; }
            else { e.pos.y = p.y + p.h; e.vel.y = 0; }
          }
        }
        // Turn at platform edges
        const eh = 24;
        const onAnyPlatform = level.platforms.some(p =>
          e.pos.x + eh/2 > p.x && e.pos.x + eh/2 < p.x + p.w &&
          Math.abs((e.pos.y + 24) - p.y) < 4
        );
        if (!onAnyPlatform && e.vel.x !== 0) { e.vel.x *= -1; e.dir *= -1; }

        // Player-enemy collision
        if (player.invincible === 0 && rectOverlap(player.pos.x, player.pos.y, pw, ph, e.pos.x, e.pos.y, 24, 24)) {
          // Jump on top to kill
          if (player.vel.y > 0 && player.pos.y + ph < e.pos.y + 12) {
            e.alive = false;
            player.vel.y = JUMP_FORCE * 0.6;
            s.score += 50;
            for (let i = 0; i < 8; i++) {
              particles.push({ pos: { x: e.pos.x + 12, y: e.pos.y + 12 }, vel: { x: (Math.random()-0.5)*5, y: Math.random()*-5 }, life: 30, color: e.type === 'creeper' ? '#4caf50' : '#f44336', size: 4 + Math.random()*4 });
            }
          } else {
            player.health--;
            player.invincible = 90;
            player.vel.x = player.facingRight ? -4 : 4;
            player.vel.y = -5;
          }
        }
      }

      // Coins
      for (const coin of coins) {
        if (!coin.collected && rectOverlap(player.pos.x, player.pos.y, pw, ph, coin.pos.x, coin.pos.y, 16, 16)) {
          coin.collected = true;
          s.score += 10;
          for (let i = 0; i < 6; i++) {
            particles.push({ pos: { x: coin.pos.x + 8, y: coin.pos.y + 8 }, vel: { x: (Math.random()-0.5)*4, y: Math.random()*-4-1 }, life: 25, color: '#FFD700', size: 3 + Math.random()*3 });
          }
        }
      }

      // Win condition
      if (player.pos.x > level.goalX) { s.gameState = 'win'; setGameState('win'); }
      if (player.health <= 0) { s.gameState = 'dead'; setGameState('dead'); }

      // Invincibility
      if (player.invincible > 0) player.invincible--;

      // Animation frame
      player.frameTimer++;
      if (Math.abs(player.vel.x) > 0.5 && player.frameTimer > 8) { player.frame = (player.frame + 1) % 2; player.frameTimer = 0; }

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.pos.x += p.vel.x; p.pos.y += p.vel.y;
        p.vel.y += 0.2; p.life--;
        if (p.life <= 0) particles.splice(i, 1);
      }

      // Camera
      const targetCam = player.pos.x - CANVAS_W / 3;
      s.camX += (targetCam - s.camX) * 0.1;
      s.camX = Math.max(0, s.camX);

      // UI sync every 10 frames
      if (Math.floor(s.t * 60) % 10 === 0) { setUiScore(s.score); setUiHealth(player.health); }

      // DRAW
      drawBackground(ctx, s.camX, level.bgColor);

      // Platforms
      for (const p of level.platforms) drawPlatform(ctx, p, s.camX);

      // Goal flag
      const gx = level.goalX - s.camX;
      ctx.fillStyle = '#ff9800';
      ctx.fillRect(gx, 280, 4, 104);
      ctx.fillStyle = '#ff5722';
      ctx.fillRect(gx + 4, 280, 40, 24);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('GOAL', gx + 6, 296);

      // Coins
      for (const c of coins) {
        const sx = c.pos.x - s.camX;
        drawCoin(ctx, { ...c, pos: { x: sx, y: c.pos.y } }, s.t);
      }

      // Enemies
      ctx.save();
      for (const e of enemies) {
        drawEnemy(ctx, { ...e, pos: { x: e.pos.x - s.camX, y: e.pos.y } });
      }
      ctx.restore();

      // Particles
      for (const p of particles) {
        ctx.globalAlpha = p.life / 30;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.pos.x - s.camX - p.size/2, p.pos.y - p.size/2, p.size, p.size);
      }
      ctx.globalAlpha = 1;

      // Player
      drawPixelChar(ctx, player.pos.x - s.camX, player.pos.y, player.facingRight, player.frame, player.health, player.invincible);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="jessie-game">
      <div className="game-header">
        <div className="game-title">Jessie's Pixel Adventure</div>
        <div className="game-hud">
          <span className="hud-item">
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} className={`heart ${i < uiHealth ? 'full' : 'empty'}`}>♥</span>
            ))}
          </span>
          <span className="hud-item score">Score: {uiScore}</span>
        </div>
      </div>

      <div className="canvas-wrapper">
        <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="game-canvas" />

        {gameState === 'dead' && (
          <div className="game-overlay dead">
            <div className="overlay-box">
              <div className="overlay-title">Game Over</div>
              <div className="overlay-sub">Jessie got knocked out!</div>
              <div className="overlay-score">Score: {uiScore}</div>
              <button className="overlay-btn" onClick={restart}>Try Again</button>
            </div>
          </div>
        )}

        {gameState === 'win' && (
          <div className="game-overlay win">
            <div className="overlay-box">
              <div className="overlay-title">You Win!</div>
              <div className="overlay-sub">Jessie made it to the goal!</div>
              <div className="overlay-score">Score: {uiScore}</div>
              <button className="overlay-btn" onClick={restart}>Play Again</button>
            </div>
          </div>
        )}
      </div>

      <div className="game-controls">
        <div className="controls-group">
          <span className="key">A / ←</span> Move Left
          <span className="key">D / →</span> Move Right
          <span className="key">W / ↑ / Space</span> Jump
        </div>
        <div className="controls-tip">Jump on enemies to defeat them! Collect all coins!</div>
      </div>

      <div className="mobile-controls">
        <button className="mob-btn" onPointerDown={() => stateRef.current.keys.add('ArrowLeft')} onPointerUp={() => stateRef.current.keys.delete('ArrowLeft')}>◀</button>
        <button className="mob-btn jump" onPointerDown={() => stateRef.current.keys.add('Space')} onPointerUp={() => stateRef.current.keys.delete('Space')}>▲</button>
        <button className="mob-btn" onPointerDown={() => stateRef.current.keys.add('ArrowRight')} onPointerUp={() => stateRef.current.keys.delete('ArrowRight')}>▶</button>
      </div>
    </div>
  );
}
