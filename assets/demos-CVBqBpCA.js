import{z as v}from"./modelDoc-CZSlftHX.js";import{p as M}from"./akarionMedia-BkIMgOoi.js";import{ae as b,af as k}from"./stageModel-DOIQEd1e.js";import{e as T}from"./onlineConfig-Cv8HExAR.js";import{U as z}from"./modelUrls.generated-C3aPcGjK.js";import{G as S}from"./list-IIpi6Miz.js";import"./preload-helper-BXl3LOEh.js";import"./three-engine-BteDTChT.js";import"./compression-NJe3JlLV.js";import"./motions-CvmnnzeK.js";import"./rigMoves-D_uKkHTf.js";import"./graphicsQuality-C2oIwR6r.js";import"./react-core-Ci-x9IAP.js";import"./index-BiUSOoji.js";import"./textCodes-XUqFJakb.js";import"./rpg-core-CKeu5hXC.js";import"./builtInPropThumbnails.generated-C59IzV5m.js";import"./larch-math-D2H1mtik.js";import"./rpgLibrary-CpYa3bVZ.js";import"./pixelFxInfo-_oYiCnJa.js";import"./lineScene-BUNEvCgP.js";import"./zap-B3CbDpVa.js";import"./palette-Ci-UNBO-.js";import"./sparkles-LwGJvKcj.js";import"./uiSkills-DmuKjbqj.js";import"./rpgOnlineCore-Cf0T3qAK.js";const R={chess:`// 大理石西洋棋：點棋子、再點目的地下棋；拖曳旋轉棋盤、滾輪（手機兩指）縮放。
// 一個人跟電腦下；作者打開多人連線時，兩個人進同一個房間就能對弈（先進來的人執白）。

// ==ENGINE== 西洋棋規則與電腦棋手（純計算，不碰畫面）
// 棋盤是 64 格的陣列：第 0 格是 a1、第 63 格是 h8；白棋是正數、黑棋是負數。
const P = 1, N = 2, B = 3, R = 4, Q = 5, K = 6;
const DOUBLE = 1, EP = 2, CK = 3, CQ = 4; // 兵走兩格、吃過路兵、王翼入堡、后翼入堡
const KNIGHT = [], KING = [], RAYS = [];
(() => {
  const inb = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;
  const kd = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
  const gd = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]; // 前四個直線、後四個斜線
  for (let s = 0; s < 64; s++) {
    const f = s & 7, r = s >> 3;
    KNIGHT[s] = kd.filter(([x, y]) => inb(f + x, r + y)).map(([x, y]) => (r + y) * 8 + f + x);
    KING[s] = gd.filter(([x, y]) => inb(f + x, r + y)).map(([x, y]) => (r + y) * 8 + f + x);
    RAYS[s] = dirs.map(([x, y]) => { const out = []; for (let i = 1; inb(f + x * i, r + y * i); i++) out.push((r + y * i) * 8 + f + x * i); return out; });
  }
})();
// 王或城堡離開原位（或城堡被吃掉）就失去入堡權
const CASTLE_MASK = new Array(64).fill(15);
CASTLE_MASK[4] = 12; CASTLE_MASK[7] = 14; CASTLE_MASK[0] = 13; CASTLE_MASK[60] = 3; CASTLE_MASK[63] = 11; CASTLE_MASK[56] = 7;

const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const sqName = (s) => 'abcdefgh'[s & 7] + ((s >> 3) + 1);
const sqOf = (name) => 'abcdefgh'.indexOf(name[0]) + (Number(name[1]) - 1) * 8;

function fromFen(fen) {
  const [place, turn, cast, ep, half] = fen.split(' ');
  const b = new Int8Array(64);
  place.split('/').forEach((row, i) => {
    let f = 0;
    for (const ch of row) {
      if (/\\d/.test(ch)) { f += Number(ch); continue; }
      const t = 'pnbrqk'.indexOf(ch.toLowerCase()) + 1;
      b[(7 - i) * 8 + f++] = ch === ch.toLowerCase() ? -t : t;
    }
  });
  const g = { b, side: turn === 'b' ? -1 : 1, castle: 0, ep: -1, half: Number(half) || 0, wk: b.indexOf(K), bk: b.indexOf(-K) };
  if (cast.includes('K')) g.castle |= 1;
  if (cast.includes('Q')) g.castle |= 2;
  if (cast.includes('k')) g.castle |= 4;
  if (cast.includes('q')) g.castle |= 8;
  if (ep && ep !== '-') g.ep = sqOf(ep);
  return g;
}

/** 某一格有沒有被 by 這一方攻擊。 */
function attacked(b, sq, by) {
  const f = sq & 7, pr = (sq >> 3) - by;
  if (pr >= 0 && pr < 8) {
    if (f > 0 && b[pr * 8 + f - 1] === P * by) return true;
    if (f < 7 && b[pr * 8 + f + 1] === P * by) return true;
  }
  for (const s of KNIGHT[sq]) if (b[s] === N * by) return true;
  for (const s of KING[sq]) if (b[s] === K * by) return true;
  const rays = RAYS[sq];
  for (let d = 0; d < 8; d++) {
    const ray = rays[d];
    for (let i = 0; i < ray.length; i++) {
      const v = b[ray[i]];
      if (!v) continue;
      const t = v * by;
      if (t === Q || t === (d < 4 ? R : B)) return true;
      break;
    }
  }
  return false;
}
const inCheck = (g) => attacked(g.b, g.side > 0 ? g.wk : g.bk, -g.side);
const mv = (from, to, p, cap, promo, flag) => ({ from, to, p, cap, promo, flag });

/** 所有「看起來能走」的步（還沒檢查自己的王會不會被將）。capsOnly：只要吃子與升變。 */
function pseudo(g, capsOnly) {
  const b = g.b, side = g.side, out = [];
  for (let s = 0; s < 64; s++) {
    const p = b[s];
    if (p * side <= 0) continue;
    const t = p * side;
    if (t === P) {
      const f = s & 7, one = s + 8 * side, promo = (one >> 3) === (side > 0 ? 7 : 0) ? Q : 0;
      if (!b[one]) {
        if (!capsOnly || promo) out.push(mv(s, one, p, 0, promo, 0));
        if (!capsOnly && (s >> 3) === (side > 0 ? 1 : 6) && !b[one + 8 * side]) out.push(mv(s, one + 8 * side, p, 0, 0, DOUBLE));
      }
      for (let df = -1; df <= 1; df += 2) {
        if (f + df < 0 || f + df > 7) continue;
        const to = one + df, v = b[to];
        if (v * side < 0) out.push(mv(s, to, p, v, promo, 0));
        else if (to === g.ep) out.push(mv(s, to, p, -P * side, 0, EP));
      }
    } else if (t === N || t === K) {
      for (const to of (t === N ? KNIGHT : KING)[s]) { const v = b[to]; if (v * side > 0) continue; if (!capsOnly || v) out.push(mv(s, to, p, v, 0, 0)); }
      if (t === K && !capsOnly) {
        const o = side > 0 ? 0 : 56, kBit = side > 0 ? 1 : 4, qBit = side > 0 ? 2 : 8, rook = R * side;
        if (s === o + 4 && (g.castle & (kBit | qBit)) && !attacked(b, s, -side)) {
          if ((g.castle & kBit) && !b[o + 5] && !b[o + 6] && b[o + 7] === rook && !attacked(b, o + 5, -side) && !attacked(b, o + 6, -side)) out.push(mv(s, o + 6, p, 0, 0, CK));
          if ((g.castle & qBit) && !b[o + 3] && !b[o + 2] && !b[o + 1] && b[o] === rook && !attacked(b, o + 3, -side) && !attacked(b, o + 2, -side)) out.push(mv(s, o + 2, p, 0, 0, CQ));
        }
      }
    } else {
      const rays = RAYS[s], d0 = t === B ? 4 : 0, d1 = t === R ? 4 : 8;
      for (let d = d0; d < d1; d++) {
        for (const to of rays[d]) {
          const v = b[to];
          if (v * side > 0) break;
          if (!capsOnly || v) out.push(mv(s, to, p, v, 0, 0));
          if (v) break;
        }
      }
    }
  }
  return out;
}

/** 走一步（回傳還原用的資料）。 */
function make(g, m) {
  const b = g.b, side = g.side;
  const u = { castle: g.castle, ep: g.ep, half: g.half };
  b[m.from] = 0;
  if (m.flag === EP) b[m.to - 8 * side] = 0;
  b[m.to] = m.promo ? m.promo * side : m.p;
  if (m.flag === CK) { b[m.to + 1] = 0; b[m.to - 1] = R * side; }
  else if (m.flag === CQ) { b[m.to - 2] = 0; b[m.to + 1] = R * side; }
  if (m.p === K) g.wk = m.to; else if (m.p === -K) g.bk = m.to;
  g.castle &= CASTLE_MASK[m.from] & CASTLE_MASK[m.to];
  g.ep = m.flag === DOUBLE ? (m.from + m.to) >> 1 : -1;
  g.half = m.cap || m.p * side === P ? 0 : g.half + 1;
  g.side = -side;
  return u;
}
function unmake(g, m, u) {
  const b = g.b;
  g.side = -g.side;
  const side = g.side;
  b[m.from] = m.p;
  if (m.flag === EP) { b[m.to] = 0; b[m.to - 8 * side] = m.cap; }
  else b[m.to] = m.cap;
  if (m.flag === CK) { b[m.to + 1] = R * side; b[m.to - 1] = 0; }
  else if (m.flag === CQ) { b[m.to - 2] = R * side; b[m.to + 1] = 0; }
  if (m.p === K) g.wk = m.from; else if (m.p === -K) g.bk = m.from;
  g.castle = u.castle; g.ep = u.ep; g.half = u.half;
}

/** 真正合法的步：走完自己的王不能被將。 */
function legal(g, capsOnly) {
  const side = g.side, out = [];
  for (const m of pseudo(g, capsOnly)) {
    const u = make(g, m);
    if (!attacked(g.b, side > 0 ? g.wk : g.bk, -side)) out.push(m);
    unmake(g, m, u);
  }
  return out;
}

function perft(g, depth) {
  if (!depth) return 1;
  let n = 0;
  for (const m of legal(g)) { const u = make(g, m); n += perft(g, depth - 1); unmake(g, m, u); }
  return n;
}

/** 子力不夠將死（只剩王、或王＋一個主教／騎士）。 */
function insufficient(b) {
  let minors = 0;
  for (let s = 0; s < 64; s++) {
    const t = Math.abs(b[s]);
    if (t === P || t === R || t === Q) return false;
    if (t === N || t === B) minors++;
  }
  return minors <= 1;
}
const posKey = (g) => \`\${g.b.join('')}|\${g.side}|\${g.castle}|\${g.ep}\`;

// ── 電腦棋手：子力＋一點位置分（位置表照白棋的角度排，第一列是第 8 橫列）
const VAL = [0, 100, 320, 330, 500, 900, 0];
const PST = [null,
  [0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30, 20, 10, 10, 5, 5, 10, 25, 25, 10, 5, 5, 0, 0, 0, 20, 20, 0, 0, 0, 5, -5, -10, 0, 0, -10, -5, 5, 5, 10, 10, -20, -20, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0],
  [-50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0, 0, 0, -20, -40, -30, 0, 10, 15, 15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30, -30, 0, 15, 20, 20, 15, 0, -30, -30, 5, 10, 15, 15, 10, 5, -30, -40, -20, 0, 5, 5, 0, -20, -40, -50, -40, -30, -30, -30, -30, -40, -50],
  [-20, -10, -10, -10, -10, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 10, 10, 5, 0, -10, -10, 5, 5, 10, 10, 5, 5, -10, -10, 0, 10, 10, 10, 10, 0, -10, -10, 10, 10, 10, 10, 10, 10, -10, -10, 5, 0, 0, 0, 0, 5, -10, -20, -10, -10, -10, -10, -10, -10, -20],
  [0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 10, 10, 10, 10, 10, 5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 5, 5, 0, 0, 0],
  [-20, -10, -10, -5, -5, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 5, 5, 5, 0, -10, -5, 0, 5, 5, 5, 5, 0, -5, 0, 0, 5, 5, 5, 5, 0, -5, -10, 5, 5, 5, 5, 5, 0, -10, -10, 0, 5, 0, 0, 0, 0, -10, -20, -10, -10, -5, -5, -10, -10, -20],
  [-30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -20, -30, -30, -40, -40, -30, -30, -20, -10, -20, -20, -20, -20, -20, -20, -10, 20, 20, 0, 0, 0, 0, 20, 20, 20, 30, 10, 0, 0, 10, 30, 20],
];
/** 盤面分數（白棋的角度）。pw：位置分的比重。 */
function evaluate(b, pw) {
  let score = 0;
  for (let s = 0; s < 64; s++) {
    const v = b[s];
    if (!v) continue;
    if (v > 0) score += VAL[v] + PST[v][(7 - (s >> 3)) * 8 + (s & 7)] * pw;
    else score -= VAL[-v] + PST[-v][s] * pw;
  }
  return score;
}
const MATE = 100000;
// 先算吃大子的步（被吃的越值錢、吃的越便宜越先），剪枝剪得多
const moveRank = (m) => (m.cap ? VAL[Math.abs(m.cap)] * 10 - VAL[Math.abs(m.p)] + 1000 : 0) + (m.promo ? 900 : 0);
const orderMoves = (moves) => moves.sort((a, c) => moveRank(c) - moveRank(a));

/** 只算吃子，算到局面安靜下來（避免算到一半剛好被吃）。 */
function quiesce(g, alpha, beta, depth, ctx) {
  ctx.nodes++;
  const stand = g.side * evaluate(g.b, ctx.pw);
  if (depth <= 0 || stand >= beta) return stand;
  if (stand > alpha) alpha = stand;
  for (const m of orderMoves(legal(g, true))) {
    const u = make(g, m);
    const s = -quiesce(g, -beta, -alpha, depth - 1, ctx);
    unmake(g, m, u);
    if (s >= beta) return s;
    if (s > alpha) alpha = s;
  }
  return alpha;
}
/** 極小化極大搜尋（負極大值寫法）＋alpha-beta 剪枝；分數是輪到的那一方的角度。 */
function search(g, depth, alpha, beta, ply, ctx) {
  ctx.nodes++;
  if (depth <= 0) return ctx.quiet ? quiesce(g, alpha, beta, 4, ctx) : g.side * evaluate(g.b, ctx.pw);
  const moves = legal(g);
  if (!moves.length) return inCheck(g) ? -MATE + ply : 0;
  let best = -Infinity;
  for (const m of orderMoves(moves)) {
    const u = make(g, m);
    const s = -search(g, depth - 1, -beta, -alpha, ply + 1, ctx);
    unmake(g, m, u);
    if (s > best) best = s;
    if (s > alpha) alpha = s;
    if (alpha >= beta) break;
  }
  return best;
}
// ==END ENGINE==

// ==GAME== 畫面、操作與流程
const level = ['easy', 'normal', 'hard'].includes(larch.params.level) ? larch.params.level : 'normal';
const LEVEL_NAME = { easy: '輕鬆', normal: '普通', hard: '認真' }[level];
const TYPE_NAME = ['', '兵', '騎士', '主教', '城堡', '皇后', '國王'];
const PIECE_KEY = ['', 'pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];
const BLACK_KEY = ['', 'bPawn', 'bKnight', 'bBishop', 'bRook', 'bQueen', 'bKing']; // 黑棋自己的模型（空白就用白棋模型換顏色）
const HEIGHT = [0, 0.74, 1.06, 1.1, 0.94, 1.24, 1.36]; // 各種棋子的高度（一格寬 1）
const TABLE_Y = -0.39;                               // 桌面高度（棋盤格子表面是 y = 0）
const sqX = (s) => (s & 7) - 3.5;
const sqZ = (s) => 3.5 - (s >> 3);
const sideName = (side) => (side > 0 ? '白棋' : '黑棋');

larch.music(larch.params.bgm, { volume: 0.5 });
larch.setLook({ hour: 9.5, look: 'natural', fog: 0, bloom: 0.5, exposure: 0.95 }); // 柔和的晨光從鏡頭左前方照過來
larch.sky('#181513');

// ── 介面：深色底、金色細框、襯線字（只改這張卡自己的介面）
const SERIF = '"Noto Serif TC","Songti TC","Source Han Serif TC","PMingLiU",Georgia,"Times New Roman",serif';
{
  const css = document.createElement('style');
  css.textContent = \`
.lg-ui.marble{--gold:#d8b46a}
.lg-ui.marble .lg-chip,.lg-ui.marble .lg-toast{background:rgba(24,20,17,.82)!important;color:#f4ecdc!important;border:1px solid rgba(216,180,106,.55);border-radius:10px!important;box-shadow:0 10px 28px rgba(0,0,0,.35)!important;font-family:\${SERIF};font-weight:500;letter-spacing:.05em}
.lg-ui.marble .lg-banner{background:rgba(24,20,17,.88)!important;border:1px solid rgba(216,180,106,.6);border-radius:14px!important;box-shadow:0 20px 60px rgba(0,0,0,.45)!important}
.lg-ui.marble .lg-banner b{color:#ecd296;font-family:\${SERIF};font-weight:600;letter-spacing:.14em}
.lg-ui.marble .lg-banner span{color:#ddd3c2;font-family:\${SERIF};font-weight:400;letter-spacing:.04em}
.lg-ui.marble .l3d-dialogue{background:rgba(24,20,17,.92)!important;border:1px solid rgba(216,180,106,.5);border-radius:14px!important;box-shadow:0 20px 60px rgba(0,0,0,.45)!important}
.lg-ui.marble .l3d-dialogue p{color:#f4ecdc;font-family:\${SERIF};letter-spacing:.03em}
.lg-ui.marble .cz-btn{background:#2b241e!important;color:#f4ecdc!important;border:1px solid rgba(216,180,106,.75)!important;border-radius:999px!important;box-shadow:0 6px 16px rgba(0,0,0,.3)!important;text-shadow:none!important;font-family:\${SERIF};font-weight:500;letter-spacing:.06em}
.lg-ui.marble .cz-btn.blue{background:linear-gradient(180deg,#ecd296,#c2954a)!important;color:#221a12!important;border-color:#f1dca8!important}
.lg-ui.marble .cz-btn:hover{transform:none;filter:brightness(1.12)}
.lg-ui.marble .cz-btn:focus-visible{outline:2px solid #ecd296;outline-offset:3px}\`;
  larch.ui.root.append(css);
  larch.ui.root.classList.add('marble');
}

// ── 小工具：畫布貼圖、圓角板子
function canvasTexture(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
function roundRect(w, h, r) {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return s;
}
/** 圓角、有倒角的框（hole：中間挖掉的正方形邊長，0 就是實心）；上表面在 y = 0。 */
function frame(outer, hole, h, r, bevel) {
  const s = roundRect(outer - bevel * 2, outer - bevel * 2, r);
  if (hole) {
    const k = hole / 2 + bevel, p = new THREE.Path();
    p.moveTo(-k, -k); p.lineTo(-k, k); p.lineTo(k, k); p.lineTo(k, -k); p.lineTo(-k, -k);
    s.holes.push(p);
  }
  const geo = new THREE.ExtrudeGeometry(s, { depth: Math.max(0.001, h - bevel * 2), bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 8 });
  geo.rotateX(-Math.PI / 2);
  geo.computeBoundingBox();
  geo.translate(0, -geo.boundingBox.max.y, 0);
  return geo;
}
const rand = (seed) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

// ── 攝影棚的反光：大理石、金邊、木頭亮面反射的就是這幾盞柔光燈
function studioReflections() {
  const s = new THREE.Scene();
  s.background = new THREE.Color('#2a241f');
  const soft = (w, h, color, k, pos) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(...pos); m.lookAt(0, 0, 0); s.add(m);
  };
  soft(9, 5, '#fff3e2', 5, [-7, 9, 6]);   // 主燈：左前上方
  soft(6, 4, '#ffe1bd', 1.6, [8, 5, 5]);  // 補光
  soft(14, 3, '#ffffff', 2.4, [0, 11, -2]); // 頂上長條燈
  soft(10, 3, '#ffcf96', 1.1, [0, 3, -10]); // 背後的暖光
  const pm = new THREE.PMREMGenerator(larch.renderer);
  const tex = pm.fromScene(s, 0.04).texture;
  pm.dispose();
  return tex;
}
const ENV = studioReflections();
const GOLD = new THREE.MeshStandardMaterial({ color: '#dcb767', metalness: 1, roughness: 0.26, envMap: ENV, envMapIntensity: 1.25 });

// ── 桌子：深色桃花心木，越往外越暗（像只有棋盤上有燈）
const tableTex = canvasTexture(1024, 1024, (x, w, h) => {
  const r = rand(7);
  x.fillStyle = '#4a2b1e'; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 220; i++) {
    const y0 = r() * h, amp = 2 + r() * 6, k = 0.002 + r() * 0.006;
    x.strokeStyle = \`rgba(\${r() < 0.55 ? '32,16,10' : '120,72,46'},\${0.05 + r() * 0.12})\`;
    x.lineWidth = 0.6 + r() * 2.4;
    x.beginPath();
    for (let px = 0; px <= w; px += 16) { const py = y0 + Math.sin(px * k + i) * amp; if (px) x.lineTo(px, py); else x.moveTo(px, py); }
    x.stroke();
  }
  const g = x.createRadialGradient(w / 2, h / 2, w * 0.12, w / 2, h / 2, w * 0.5);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.55, 'rgba(8,4,2,0.35)'); g.addColorStop(1, 'rgba(8,4,2,0.92)');
  x.fillStyle = g; x.fillRect(0, 0, w, h);
});
const table = new THREE.Mesh(new THREE.CylinderGeometry(13, 13, 0.5, 96), [
  new THREE.MeshStandardMaterial({ color: '#1c100b', roughness: 0.6 }),
  new THREE.MeshPhysicalMaterial({ map: tableTex, roughness: 0.42, clearcoat: 0.6, clearcoatRoughness: 0.25, envMap: ENV, envMapIntensity: 0.35 }),
  new THREE.MeshStandardMaterial({ color: '#1c100b' }),
]);
table.position.y = TABLE_Y - 0.25;
table.receiveShadow = true;
larch.scene.add(table);

// ── 棋盤：鑲嵌的大理石格子（淺色是卡拉拉白大理石、深色用作者選的顏色）、胡桃木框、金邊
const boardColor = new THREE.Color(larch.params.board || '#2f3b36');
const marbleTex = canvasTexture(1024, 1024, (x, w) => {
  const cell = w / 8, r = rand(11);
  const dark = \`#\${boardColor.getHexString()}\`;
  const darkVein = boardColor.getHSL({}).l < 0.45 ? 'rgba(232,222,204,0.5)' : 'rgba(40,46,44,0.35)';
  for (let f = 0; f < 8; f++) for (let k = 0; k < 8; k++) {
    // 畫布最上面一列是第 8 橫列（貼圖 v 往上 = 世界 -z）
    const rank = 7 - k, isDark = (f + rank) % 2 === 0, px = f * cell, py = k * cell;
    x.save(); x.beginPath(); x.rect(px, py, cell, cell); x.clip();
    x.fillStyle = isDark ? dark : '#efe8dc'; x.fillRect(px, py, cell, cell);
    // 雲霧般的底紋
    for (let i = 0; i < 16; i++) {
      const cx = px + r() * cell, cy = py + r() * cell, rr = cell * (0.15 + r() * 0.4);
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, rr);
      const tone = isDark ? (r() < 0.5 ? '0,0,0' : '255,255,255') : (r() < 0.6 ? '150,140,128' : '255,252,246');
      g.addColorStop(0, \`rgba(\${tone},\${0.06 + r() * 0.09})\`); g.addColorStop(1, \`rgba(\${tone},0)\`);
      x.fillStyle = g; x.fillRect(px, py, cell, cell);
    }
    // 紋路：一條主紋＋幾條細紋，每格方向不一樣（每塊石頭切自不同的石板）
    const ang = r() * Math.PI, dx = Math.cos(ang), dy = Math.sin(ang);
    x.lineCap = 'round'; x.lineJoin = 'round';
    for (let v = 0; v < 2 + Math.floor(r() * 4); v++) {
      let cx = px + cell / 2 - dx * cell * 0.9 + (r() - 0.5) * cell, cy = py + cell / 2 - dy * cell * 0.9 + (r() - 0.5) * cell;
      x.strokeStyle = isDark ? darkVein : 'rgba(132,124,116,0.6)';
      x.globalAlpha = v === 0 ? 0.85 : 0.22 + r() * 0.4;
      x.lineWidth = v === 0 ? 1.1 + r() * 1.4 : 0.4 + r() * 0.9;
      x.shadowColor = x.strokeStyle; x.shadowBlur = v === 0 ? 5 : 3;
      x.beginPath(); x.moveTo(cx, cy);
      for (let s = 0; s < 14; s++) { cx += dx * cell * 0.14 + (r() - 0.5) * cell * 0.1; cy += dy * cell * 0.14 + (r() - 0.5) * cell * 0.1; x.lineTo(cx, cy); }
      x.stroke();
    }
    x.restore();
    x.globalAlpha = 1; x.shadowBlur = 0;
  }
  // 格子之間細細的接縫
  x.strokeStyle = 'rgba(30,24,18,0.45)'; x.lineWidth = 2;
  for (let i = 1; i < 8; i++) { x.beginPath(); x.moveTo(i * cell, 0); x.lineTo(i * cell, w); x.stroke(); x.beginPath(); x.moveTo(0, i * cell); x.lineTo(w, i * cell); x.stroke(); }
});
const marble = new THREE.Mesh(new THREE.PlaneGeometry(8, 8).rotateX(-Math.PI / 2), new THREE.MeshPhysicalMaterial({ map: marbleTex, roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.06, envMap: ENV, envMapIntensity: 0.75 }));
marble.receiveShadow = true;
larch.scene.add(marble);
const walnutTex = canvasTexture(512, 512, (x, w, h) => {
  const r = rand(23);
  x.fillStyle = '#3d2417'; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 120; i++) {
    const y0 = r() * h, amp = 1 + r() * 4, k = 0.01 + r() * 0.02;
    x.strokeStyle = \`rgba(\${r() < 0.5 ? '22,11,6' : '110,66,40'},\${0.08 + r() * 0.16})\`;
    x.lineWidth = 0.6 + r() * 2;
    x.beginPath();
    for (let px = 0; px <= w; px += 8) { const py = y0 + Math.sin(px * k + i * 0.7) * amp; if (px) x.lineTo(px, py); else x.moveTo(px, py); }
    x.stroke();
  }
});
walnutTex.wrapS = walnutTex.wrapT = THREE.RepeatWrapping;
walnutTex.repeat.set(0.22, 0.22);
const walnut = new THREE.MeshPhysicalMaterial({ map: walnutTex, roughness: 0.38, clearcoat: 0.8, clearcoatRoughness: 0.18, envMap: ENV, envMapIntensity: 0.55 });
const walnutFrame = new THREE.Mesh(frame(10.3, 8.0, 0.5, 0.32, 0.06), walnut);
walnutFrame.position.y = 0.04;
walnutFrame.castShadow = true; walnutFrame.receiveShadow = true;
larch.scene.add(walnutFrame);
// 金邊：格子外一圈、木框側面一圈
const innerGold = new THREE.Mesh(frame(8.16, 8.0, 0.07, 0.01, 0), GOLD);
innerGold.position.y = 0.05;
const sideGold = new THREE.Mesh(frame(10.36, 10.2, 0.07, 0.36, 0), GOLD);
sideGold.position.y = -0.12;
larch.scene.add(innerGold, sideGold);
// 木框上燙金的座標與細線（金屬材質的透明貼圖）
const deco = canvasTexture(1024, 1024, (x, w) => {
  const u = w / 10.3, c = (v) => (v + 5.15) * u;
  x.clearRect(0, 0, w, w);
  x.strokeStyle = '#ffffff'; x.fillStyle = '#ffffff';
  x.lineWidth = 2; x.strokeRect(c(-4.88), c(-4.88), 9.76 * u, 9.76 * u);
  x.lineWidth = 1; x.strokeRect(c(-4.8), c(-4.8), 9.6 * u, 9.6 * u);
  for (const [cx, cz] of [[-4.6, -4.6], [4.6, -4.6], [-4.6, 4.6], [4.6, 4.6]]) {
    x.beginPath(); x.moveTo(c(cx), c(cz) - 9); x.lineTo(c(cx) + 9, c(cz)); x.lineTo(c(cx), c(cz) + 9); x.lineTo(c(cx) - 9, c(cz)); x.closePath(); x.fill();
  }
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.font = \`500 30px \${SERIF}\`;
  for (let i = 0; i < 8; i++) {
    const L = 'abcdefgh'[i], n = String(i + 1);
    x.fillText(L, c(i - 3.5), c(4.5)); x.fillText(L, c(i - 3.5), c(-4.5));
    x.fillText(n, c(-4.5), c(3.5 - i)); x.fillText(n, c(4.5), c(3.5 - i));
  }
});
const decal = new THREE.Mesh(new THREE.PlaneGeometry(10.3, 10.3).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#dcb767', alphaMap: deco, transparent: true, metalness: 1, roughness: 0.3, envMap: ENV, envMapIntensity: 1.2, depthWrite: false }));
decal.position.y = 0.041;
larch.scene.add(decal);
// 棋盤上方一盞柔和的燈：大理石上有漂亮的反光
const lamp = new THREE.SpotLight('#fff1dc', 420, 40, 0.62, 0.85, 2);
lamp.position.set(-3.5, 13, 7);
lamp.target.position.set(0, 0, 0);
larch.scene.add(lamp, lamp.target);

// ── 發光的圈：可以走的格子、可以吃的棋子、選中的棋子、被將軍的國王
const glowTex = canvasTexture(128, 128, (x) => {
  // 細細的實心圈＋往內外散開的光暈
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(255,255,255,0.08)'); g.addColorStop(0.66, 'rgba(255,255,255,0.4)');
  g.addColorStop(0.71, 'rgba(255,255,255,1)'); g.addColorStop(0.78, 'rgba(255,255,255,1)'); g.addColorStop(0.84, 'rgba(255,255,255,0.35)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 128, 128);
});
const squareTex = canvasTexture(128, 128, (x) => {
  x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(6, 6, 116, 116);
  x.strokeStyle = 'rgba(255,255,255,1)'; x.lineWidth = 5; x.strokeRect(6, 6, 116, 116);
});
// 顏色乘到 1 以上：後製的光暈（bloom）會讓圈圈微微發光
const glowMat = (color, glow, tex = glowTex) => new THREE.MeshBasicMaterial({ map: tex, color: new THREE.Color(color).multiplyScalar(glow), transparent: true, depthWrite: false, toneMapped: false });
const MOVE_MAT = glowMat('#e0ad45', 1.35), CAPTURE_MAT = glowMat('#d84a3a', 1.5), SELECT_MAT = glowMat('#ffcf6a', 1.6), CHECK_MAT = glowMat('#ff2f45', 1.7);
const LAST_MAT = glowMat('#e8c066', 1, squareTex), CURSOR_MAT = glowMat('#8fb8ff', 1.3, squareTex);
LAST_MAT.opacity = 0.32;
const flatPlane = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
const marks = [];
function mark(sq, mat, size, y = 0.012) {
  let m = marks.find((x) => !x.visible);
  if (!m) { m = new THREE.Mesh(flatPlane, mat); m.renderOrder = 2; marks.push(m); larch.scene.add(m); }
  m.material = mat; m.visible = true;
  m.position.set(sqX(sq), y, sqZ(sq)); m.scale.setScalar(size);
  return m;
}
const clearMarks = (only) => { for (const m of marks) if (!only || only.includes(m.material)) m.visible = false; };

// ── 棋子：白棋、黑棋各六種模型，各載一次，其他都 larch.clone（黑棋模型沒設定時，白棋模型乘上作者選的顏色）
const STONE = {
  1: new THREE.MeshPhysicalMaterial({ color: '#f2efea', roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.08, envMap: ENV, envMapIntensity: 0.8 }),
  '-1': new THREE.MeshPhysicalMaterial({ color: '#1e1d21', roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.06, envMap: ENV, envMapIntensity: 0.9 }),
};
function fallbackPiece(t, side) {
  // 模型參數空白時：用旋轉體做一顆大理石棋子，腰上一圈金
  const V = (pts) => pts.map(([a, b]) => new THREE.Vector2(a, b));
  const arc = (cx, cy, r, a0, a1, n = 8) => Array.from({ length: n + 1 }, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [cx + Math.sin(a) * r, cy - Math.cos(a) * r]; });
  const foot = [[0, 0], [0.34, 0], [0.36, 0.05], [0.33, 0.1], [0.26, 0.13], [0.24, 0.17]];
  const g = new THREE.Group(), mat = STONE[side];
  const add = (geo, y = 0, m = mat) => { const mesh = new THREE.Mesh(geo, m); mesh.position.y = y; g.add(mesh); return mesh; };
  if (t === P) add(new THREE.LatheGeometry(V([...foot, [0.14, 0.3], [0.11, 0.5], [0.2, 0.53], [0.2, 0.56], [0.1, 0.6], ...arc(0, 0.76, 0.17, 0.5, Math.PI)]), 32));
  else if (t === R) {
    add(new THREE.LatheGeometry(V([...foot, [0.22, 0.3], [0.2, 0.62], [0.3, 0.68], [0.3, 0.9], [0.2, 0.9], [0.2, 0.84], [0, 0.84]]), 32));
    for (let i = 0; i < 6; i++) { const b = add(new THREE.BoxGeometry(0.1, 0.1, 0.13), 0.94); const a = i * Math.PI / 3; b.position.x = Math.sin(a) * 0.25; b.position.z = Math.cos(a) * 0.25; b.rotation.y = a; }
  } else if (t === B) add(new THREE.LatheGeometry(V([...foot, [0.15, 0.32], [0.1, 0.56], [0.22, 0.6], [0.12, 0.64], ...arc(0, 0.82, 0.18, 0.4, Math.PI * 0.8), [0.06, 1.0], ...arc(0, 1.06, 0.06, 0.5, Math.PI, 4)]), 32));
  else if (t === Q) add(new THREE.LatheGeometry(V([...foot, [0.16, 0.36], [0.11, 0.66], [0.24, 0.7], [0.13, 0.75], [0.15, 0.85], [0.27, 1.02], [0.2, 1.03], [0.1, 0.98], ...arc(0, 1.09, 0.09, 0.6, Math.PI, 5)]), 32));
  else if (t === K) {
    add(new THREE.LatheGeometry(V([...foot, [0.17, 0.38], [0.12, 0.7], [0.25, 0.74], [0.14, 0.79], [0.17, 0.9], [0.25, 1.0], [0.1, 1.04], [0, 1.04]]), 32));
    add(new THREE.BoxGeometry(0.07, 0.26, 0.07), 1.15, GOLD); add(new THREE.BoxGeometry(0.2, 0.07, 0.07), 1.17, GOLD);
  } else {
    add(new THREE.LatheGeometry(V([...foot, [0.24, 0.24], [0, 0.24]]), 32));
    const s = new THREE.Shape();
    s.moveTo(-0.2, 0); s.lineTo(0.2, 0); s.quadraticCurveTo(0.2, 0.22, 0.12, 0.34); s.lineTo(0.32, 0.42); s.quadraticCurveTo(0.36, 0.5, 0.3, 0.56);
    s.lineTo(0.1, 0.68); s.lineTo(0.06, 0.8); s.lineTo(-0.02, 0.7); s.quadraticCurveTo(-0.24, 0.6, -0.22, 0.3); s.closePath();
    const head = new THREE.ExtrudeGeometry(s, { depth: 0.16, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 3 });
    head.translate(0, 0, -0.08); head.rotateY(-Math.PI / 2);
    add(head, 0.2);
  }
  const band = add(new THREE.TorusGeometry(0.25, 0.018, 8, 40), 0.15, GOLD);
  band.rotation.x = Math.PI / 2;
  g.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
  const box = new THREE.Box3().setFromObject(g), holder = new THREE.Group();
  g.scale.setScalar(HEIGHT[t] / Math.max(0.01, box.max.y - box.min.y));
  holder.add(g);
  return holder;
}
async function loadPiece(id, t) {
  if (!id) return null;
  try {
    const m = await larch.model(id, { height: HEIGHT[t] });
    m.userData = {}; // 棋子用不到 larch.animate：清掉 userData，複製 32 顆才快（clone 會把 userData 整份 JSON 複製）
    return m;
  } catch (error) { console.warn('棋子模型載不到，改用內建的形狀', error); return null; }
}
const proto = { 1: [], '-1': [] };
await Promise.all(PIECE_KEY.map(async (key, t) => {
  if (!t) return;
  const [white, black] = await Promise.all([loadPiece(larch.params[key], t), loadPiece(larch.params[BLACK_KEY[t]], t)]);
  proto[1][t] = white || fallbackPiece(t, 1);
  proto[-1][t] = black || (white ? larch.tint(larch.clone(white), larch.params.dark || '#2b2a2e') : fallbackPiece(t, -1));
}));

/** 騎士面向對手，再稍微轉向棋盤中間（從自己這一側看得到側臉）。 */
function knightYaw(v, s) {
  const toward = sqX(s) < 0 ? 1 : -1;
  return v > 0 ? Math.PI - toward * 0.75 : toward * 0.75;
}
function newPiece(v, s) {
  const o = larch.clone(proto[v > 0 ? 1 : -1][Math.abs(v)]);
  o.position.set(sqX(s), 0, sqZ(s));
  o.rotation.y = Math.abs(v) === N ? knightYaw(v, s) : (v > 0 ? 0 : Math.PI);
  o.userData.piece = true;
  larch.scene.add(o);
  return o;
}

// ── 動畫
function hop(o, x, z, height, seconds) {
  const sx = o.position.x, sy = o.position.y, sz = o.position.z, k = { t: 0 };
  const stop = larch.onUpdate(() => {
    const t = k.t;
    o.position.set(sx + (x - sx) * t, sy + (0 - sy) * t + Math.sin(Math.PI * t) * height, sz + (z - sz) * t);
  });
  return larch.tween(k, { t: 1 }, seconds, 'inOut').then(() => { stop(); o.position.set(x, 0, z); });
}
/** 被吃掉的棋子：揚起一點石粉、縮小，再出現在桌邊。 */
async function knockOut(o, v) {
  larch.effect('dust', [o.position.x, 0.05, o.position.z], { scale: 0.45 });
  larch.sound('hit', 0.45);
  await larch.tween(o.scale, { x: 1.12, y: 1.12, z: 1.12 }, 0.1, 'out');
  await larch.tween(o.scale, { x: 0.01, y: 0.01, z: 0.01 }, 0.25, 'in');
  // 白棋吃掉的黑子排在右邊、黑棋吃掉的白子排在左邊（手機直放時排在棋盤前後，才看得到）
  const side = v > 0 ? -1 : 1, i = captured[side]++;
  const along = (i % 8) * 0.62 - 3.5, row = 5.95 + Math.floor(i / 8) * 0.62;
  if (larch.camera.aspect < 1) o.position.set(side * along, TABLE_Y, side * row);
  else o.position.set(side * row, TABLE_Y, -side * along);
  o.rotation.z = 0;
  await larch.tween(o.scale, { x: 0.68, y: 0.68, z: 0.68 }, 0.35, 'outBack');
}

// ── 一盤棋的狀態
let g = fromFen(START_FEN);
let meshAt = new Array(64).fill(null);
let loose = [];              // 被吃掉、擺在桌邊的棋子
let captured = { 1: 0, '-1': 0 };
let myColor = 1, mode = 'ai';
let turnMoves = [], selected = -1, targets = [];
let waitPlayer = null;       // 等玩家走棋（resolve）
let posCount = new Map();
let lastMove = null;
let lifted = null;           // 選中的棋子（會浮起來）

function setStatus(text) { larch.ui.text('status', text, { at: 'top' }); }

/** 擺一個局面（新的一盤、或測試用的局面）。drop：棋子從空中掉下來排好。 */
async function setPosition(fen, drop) {
  for (const o of [...meshAt, ...loose]) if (o) larch.scene.remove(o);
  meshAt = new Array(64).fill(null); loose = []; captured = { 1: 0, '-1': 0 };
  g = fromFen(fen);
  posCount = new Map([[posKey(g), 1]]);
  lastMove = null; selected = -1; targets = []; lifted = null;
  clearMarks();
  const order = [];
  for (let s = 0; s < 64; s++) if (g.b[s]) { meshAt[s] = newPiece(g.b[s], s); order.push(s); }
  if (!drop) return;
  // 從近到遠一排一排輕輕放下
  order.sort((a, b) => sqZ(b) - sqZ(a) || sqX(a) - sqX(b));
  for (const s of order) meshAt[s].position.y = 0.9;
  for (let i = 0; i < order.length; i++) {
    const o = meshAt[order[i]];
    larch.tween(o.position, { y: 0 }, 0.5, 'out');
    if (i % 8 === 0) larch.sound('land', 0.25);
    await larch.wait(0.035);
  }
  await larch.wait(0.5);
}

// ── 選棋與走棋（點擊、鍵盤都走這裡）
function select(s) {
  deselect(true);
  selected = s;
  targets = turnMoves.filter((m) => m.from === s);
  lifted = meshAt[s];
  if (lifted) larch.tween(lifted.position, { y: 0.22 }, 0.15, 'out');
  mark(s, SELECT_MAT, 1.15);
  for (const m of targets) {
    const capture = m.cap !== 0;
    mark(m.to, capture ? CAPTURE_MAT : MOVE_MAT, capture ? 1.1 : 0.72);
  }
  larch.sound('click', 0.5);
  if (!targets.length) larch.ui.toast(inCheck(g) ? '先解除將軍！' : \`這個\${TYPE_NAME[Math.abs(g.b[s])]}現在沒有路可以走\`);
}
function deselect(quiet) {
  if (lifted) { const o = lifted; larch.tween(o.position, { y: 0 }, 0.15, 'in'); }
  lifted = null; selected = -1; targets = [];
  clearMarks([MOVE_MAT, CAPTURE_MAT, SELECT_MAT]);
  if (!quiet) larch.sound('click', 0.25);
}
function tapSquare(s) {
  if (!waitPlayer || s < 0) return;
  const m = selected >= 0 ? targets.find((x) => x.to === s) : null;
  if (m) {
    const done = waitPlayer;
    waitPlayer = null;
    lifted = null; selected = -1; targets = [];
    clearMarks([MOVE_MAT, CAPTURE_MAT, SELECT_MAT]);
    done(m);
    return;
  }
  if (s === selected) { deselect(); return; }
  if (g.b[s] * myColor > 0) { select(s); return; }
  if (selected >= 0) {
    larch.sound('error', 0.4);
    if (inCheck(g)) larch.ui.toast('國王被將軍了，先解除！');
    return;
  }
}

/** 真的走一步：規則、動畫、聲音、標記。 */
async function playMove(m) {
  clearMarks([MOVE_MAT, CAPTURE_MAT, SELECT_MAT, CHECK_MAT]);
  const side = g.side, t = Math.abs(m.p);
  const mover = meshAt[m.from];
  const capSq = m.flag === EP ? m.to - 8 * side : m.cap ? m.to : -1;
  const victim = capSq >= 0 ? meshAt[capSq] : null;
  make(g, m);
  posCount.set(posKey(g), (posCount.get(posKey(g)) || 0) + 1);
  meshAt[m.from] = null;
  if (capSq >= 0) meshAt[capSq] = null;
  meshAt[m.to] = mover;
  lastMove = m;
  // 起跳
  larch.sound('whoosh', 0.3);
  const seconds = t === N ? 0.55 : 0.42;
  const jumps = [hop(mover, sqX(m.to), sqZ(m.to), t === N ? 0.95 : 0.38, seconds)];
  if (t === N) larch.tween(mover.rotation, { y: knightYaw(m.p, m.to) }, seconds, 'inOut');
  if (m.flag === CK || m.flag === CQ) {
    // 入堡：城堡跳過國王
    const rf = m.flag === CK ? m.to + 1 : m.to - 2, rt = m.flag === CK ? m.to - 1 : m.to + 1;
    const rook = meshAt[rf];
    meshAt[rf] = null; meshAt[rt] = rook;
    jumps.push(larch.wait(0.12).then(() => hop(rook, sqX(rt), sqZ(rt), 0.9, 0.5)));
  }
  if (victim) { loose.push(victim); jumps.push(larch.wait(seconds * 0.72).then(() => knockOut(victim, g.b[m.to] > 0 ? -1 : 1))); }
  await Promise.all(jumps);
  larch.sound(victim ? 'hit' : 'land', 0.5);
  larch.effect('dust', [sqX(m.to), 0.02, sqZ(m.to)], { scale: 0.35 });
  // 升變：兵變成皇后
  if (m.promo) {
    const queen = newPiece(m.promo * side, m.to);
    queen.scale.setScalar(0.01);
    larch.effect('level-up', [sqX(m.to), 0.1, sqZ(m.to)], { scale: 0.6 });
    larch.sound('morph', 0.7);
    await larch.tween(mover.scale, { x: 0.01, y: 0.01, z: 0.01 }, 0.2, 'in');
    larch.scene.remove(mover);
    meshAt[m.to] = queen;
    await larch.tween(queen.scale, { x: 1, y: 1, z: 1 }, 0.4, 'outBack');
    larch.ui.toast('兵升變成皇后！');
  }
  clearMarks([LAST_MAT]);
  mark(m.from, LAST_MAT, 0.96, 0.004); mark(m.to, LAST_MAT, 0.96, 0.004);
  markCheck();
}
function markCheck() {
  clearMarks([CHECK_MAT]);
  if (inCheck(g)) mark(g.side > 0 ? g.wk : g.bk, CHECK_MAT, 1.35, 0.016);
}

/** 這一盤結束了嗎？還沒的話順便記下這一輪可以走的步。 */
function gameStatus() {
  const moves = legal(g);
  if (!moves.length) return inCheck(g) ? { winner: -g.side, why: 'mate' } : { winner: 0, why: 'stalemate' };
  if (g.half >= 100) return { winner: 0, why: 'fifty' };
  if (insufficient(g.b)) return { winner: 0, why: 'material' };
  if ((posCount.get(posKey(g)) || 0) >= 3) return { winner: 0, why: 'repeat' };
  turnMoves = moves;
  return null;
}

// ── 電腦：算一點、讓一格畫面，不會卡住
async function think() {
  const moves = legal(g);
  if (level === 'easy') {
    // 輕鬆：亂走，但看到能吃的多半會吃
    const caps = moves.filter((m) => m.cap || m.promo);
    if (caps.length && Math.random() < 0.8) return larch.pickOne(caps);
    return larch.pickOne(moves);
  }
  const hard = level === 'hard';
  const ctx = { nodes: 0, quiet: hard, pw: hard ? 1 : 0.35 };
  const depth = hard ? 3 : 2, noise = hard ? 6 : 16;
  let best = moves[0], bestScore = -Infinity, alpha = -Infinity, slice = performance.now();
  for (const m of orderMoves(moves)) {
    const u = make(g, m);
    const s = -search(g, depth - 1, -Infinity, -alpha, 1, ctx);
    unmake(g, m, u);
    // 差不多好的步之間隨機挑一個（下得比較像人）；將死的步不加亂數
    const score = Math.abs(s) > MATE / 2 ? s : s + Math.random() * noise;
    if (score > bestScore) { bestScore = score; best = m; }
    alpha = Math.max(alpha, Math.abs(s) > MATE / 2 ? s : s - noise);
    if (performance.now() - slice > 8) { await larch.wait(0); slice = performance.now(); }
  }
  return best;
}
async function computerMove() {
  setStatus('電腦思考中…');
  const start = larch.time;
  const m = await think();
  const rest = 0.6 - (larch.time - start);
  if (rest > 0) await larch.wait(rest);
  return m;
}

// ── 玩家：等點擊
async function playerMove() {
  setStatus(inCheck(g) ? '將軍！快保護國王' : \`輪到你（\${sideName(myColor)}）\`);
  resignButton.style.visibility = 'visible';
  const m = await new Promise((resolve) => { waitPlayer = resolve; });
  resignButton.style.visibility = 'hidden';
  return m;
}

// ── 線上對弈
const online = { inbox: [], opp: null, left: false, off: false, game: 0, ply: 0, last: null };
function moveMessage(m) {
  return { t: 'move', from: sqName(m.from), to: sqName(m.to), promo: m.promo ? 'q' : '', g: online.game, n: online.ply };
}
async function joinOnline() {
  larch.online.on('message', (data, from) => {
    if (!data || typeof data !== 'object' || !from) return;
    // 我沒在線上對弈（等太久改跟電腦下了）：跟對方說一聲，對方才不會一直等
    if (online.off && data.t === 'hello') { larch.online.send({ t: 'busy' }); return; }
    online.inbox.push({ ...data, by: from.id });
  });
  larch.online.on('leave', (p) => {
    if (mode === 'online' && online.opp && p && p.id === online.opp.id) { online.left = true; larch.ui.toast(\`\${online.opp.name} 離開了\`); }
  });
  // 等太久可以改跟電腦下
  let cancel = () => {};
  const cancelled = new Promise((resolve) => { cancel = () => resolve('cancel'); });
  let stop = false;
  cancelled.then(() => { stop = true; });
  larch.ui.button('改跟電腦下', cancel, { at: 'bottom', color: 'white', id: 'cancel-online' });
  setStatus('連線中…');
  const me = await Promise.race([larch.online.join(), cancelled]);
  if (!stop) {
    setStatus('等另一位玩家加入…');
    larch.ui.toast('請朋友打開同一部作品、選「線上對弈」');
    while (larch.online.players.length < 2 && !stop) await larch.wait(0.3);
  }
  larch.ui.remove('cancel-online');
  if (stop) { online.off = true; return false; }
  const two = larch.online.players.slice(0, 2);
  if (!two.some((p) => p.id === me.id)) { online.off = true; larch.ui.toast('房間滿了，先跟電腦下'); return false; }
  online.me = me;
  online.opp = two.find((p) => p.id !== me.id);
  online.two = two;
  larch.online.send({ t: 'hello' });
  return true;
}
/** 線上這一盤我執哪一色：第一盤 players[0] 執白，之後每盤交換。 */
const onlineColor = () => (online.two[online.game % 2].id === online.me.id ? 1 : -1);
async function remoteMove() {
  setStatus(\`等 \${online.opp.name} 走棋…\`);
  let resent = larch.time;
  for (;;) {
    for (let i = online.inbox.length - 1; i >= 0; i--) {
      const msg = online.inbox[i];
      if (msg.t === 'busy' && msg.by === online.opp.id) { online.inbox.splice(i, 1); return 'left'; }
      if (msg.by !== online.opp.id || msg.t === 'hello' || msg.g < online.game || (msg.t === 'move' && msg.g === online.game && msg.n < online.ply)) { online.inbox.splice(i, 1); continue; }
      if (msg.g !== online.game) continue;
      if (msg.t === 'resign') { online.inbox.splice(i, 1); return 'opp-resign'; }
      if (msg.t === 'move' && msg.n === online.ply) {
        online.inbox.splice(i, 1);
        const m = turnMoves.find((x) => sqName(x.from) === msg.from && sqName(x.to) === msg.to);
        if (m) return m;
      }
    }
    if (online.left) return 'left';
    // 對方很久沒動靜：把我上一步再送一次（訊息掉了也接得回來）
    if (online.last && larch.time - resent > 4) { larch.online.send(online.last); resent = larch.time; }
    await larch.wait(0.15);
  }
}

// ── 點擊與鍵盤
let cursor = -1;
larch.input.onTap((p) => {
  if (cursor >= 0) { cursor = -1; clearMarks([CURSOR_MAT]); }
  let s = -1;
  if (p.hit && p.hit.root && p.hit.root.userData.piece) s = meshAt.indexOf(p.hit.root);
  if (s < 0) {
    const at = larch.screenToGround(p.x, p.y, 0);
    if (at && Math.abs(at.x) < 4 && Math.abs(at.z) < 4) s = Math.floor(at.x + 4) + Math.floor(4 - at.z) * 8;
  }
  if (s >= 0) tapSquare(s);
  else if (selected >= 0 && waitPlayer) deselect();
});
const camForward = new THREE.Vector3();
larch.input.onKey((code, isDown) => {
  if (!isDown || !waitPlayer) return;
  if (code === 'Escape') { deselect(); return; }
  if (code === 'Enter' || code === 'Space') { if (cursor >= 0) tapSquare(cursor); return; }
  const step = { ArrowUp: [0, 1], KeyW: [0, 1], ArrowDown: [0, -1], KeyS: [0, -1], ArrowLeft: [-1, 0], KeyA: [-1, 0], ArrowRight: [1, 0], KeyD: [1, 0] }[code];
  if (!step) return;
  if (cursor < 0) cursor = selected >= 0 ? selected : (myColor > 0 ? sqOf('e2') : sqOf('e7'));
  else {
    // 方向跟著鏡頭：「上」是遠離自己的那一邊
    larch.camera.getWorldDirection(camForward);
    let fx = 0, fz = 0;
    if (Math.abs(camForward.z) >= Math.abs(camForward.x)) fz = Math.sign(camForward.z); else fx = Math.sign(camForward.x);
    const wx = fx * step[1] - fz * step[0], wz = fz * step[1] + fx * step[0];
    const f = (cursor & 7) + Math.round(wx), r = (cursor >> 3) - Math.round(wz);
    if (f >= 0 && f < 8 && r >= 0 && r < 8) cursor = r * 8 + f;
  }
  clearMarks([CURSOR_MAT]);
  mark(cursor, CURSOR_MAT, 0.98, 0.008);
  larch.sound('click', 0.2);
});

// ── 每一格：圈圈呼吸、選中的棋子浮著
larch.onUpdate((dt, t) => {
  const pulse = 0.82 + 0.18 * Math.sin(t * 4.5);
  MOVE_MAT.opacity = pulse; CAPTURE_MAT.opacity = pulse; SELECT_MAT.opacity = 0.85 + 0.15 * Math.sin(t * 3);
  CHECK_MAT.opacity = 0.65 + 0.35 * Math.sin(t * 7);
  CURSOR_MAT.opacity = 0.6 + 0.3 * Math.sin(t * 5);
  if (lifted) lifted.position.y = 0.22 + Math.sin(t * 3.2) * 0.04;
});

// ── 鏡頭：拖曳旋轉、滾輪或兩指縮放；手機直放時拉遠一點才看得到整個棋盤
function cameraShot(side) {
  const aspect = larch.camera.aspect || 16 / 9;
  const tanH = Math.tan(THREE.MathUtils.degToRad(larch.camera.fov / 2)) * aspect;
  const portrait = aspect < 1;
  return { target: [0, 0, portrait ? 0 : 0.55 * side], distance: THREE.MathUtils.clamp((portrait ? 5.45 : 6.2) / tanH, 11.5, 30), pitch: portrait ? 1.12 : 0.84, yaw: side > 0 ? 0 : Math.PI };
}
function aimCamera(side, shot = cameraShot(side)) {
  larch.orbitCamera({ ...shot, minDistance: 6, maxDistance: shot.distance * 1.5, minPitch: 0.3, maxPitch: 1.42 });
}
/** 開場：鏡頭從低處斜斜地繞到自己這一側。 */
async function sweepCamera(side, seconds) {
  const end = cameraShot(side), k = { t: 0 };
  const stop = larch.onUpdate(() => {
    const e = k.t;
    aimCamera(side, { target: end.target, distance: end.distance * (1.3 - 0.3 * e), pitch: 0.4 + (end.pitch - 0.4) * e, yaw: end.yaw - 1.2 * (1 - e) });
  });
  await larch.tween(k, { t: 1 }, seconds, 'inOut');
  stop();
  aimCamera(side);
}

// ── 認輸按鈕
let resignAsked = false;
const resignButton = larch.ui.button('認輸', async () => {
  if (!waitPlayer || resignAsked) return;
  resignAsked = true;
  // larch.ui.button 在按下時就觸發：等這一下點擊結束再開確認視窗，手機上同一下才不會直接點到「認輸」
  await larch.wait(0.35);
  const i = await larch.choose('真的要認輸嗎？', ['繼續下', '認輸']);
  resignAsked = false;
  if (i === 1 && waitPlayer) { const done = waitPlayer; waitPlayer = null; deselect(true); done('resign'); }
}, { at: 'bottom-right', color: 'white', id: 'resign' });
resignButton.style.visibility = 'hidden';

// ── 一盤棋
let boardReady = false; // 開場已經擺好第一盤的棋子了
async function playOneGame() {
  if (!boardReady) await setPosition(START_FEN, true);
  boardReady = false;
  online.ply = 0; online.last = null;
  for (;;) {
    const st = gameStatus();
    if (st) return st;
    let m;
    if (g.side === myColor) m = await playerMove();
    else if (mode === 'ai') m = await computerMove();
    else m = await remoteMove();
    if (m === 'resign') {
      if (mode === 'online') larch.online.send({ t: 'resign', g: online.game });
      return { winner: -myColor, why: 'resign' };
    }
    if (m === 'opp-resign') return { winner: myColor, why: 'resign' };
    if (m === 'left') {
      const i = await larch.choose(\`\${online.opp.name} 離開了。要怎麼辦？\`, ['跟電腦下完這盤', '算我贏，結束']);
      if (i === 1) return { winner: myColor, why: 'left' };
      mode = 'ai';
      larch.ui.text('who', \`電腦：\${LEVEL_NAME}\`, { at: 'top-left', size: 'small' });
      continue;
    }
    if (mode === 'online' && g.side === myColor) { online.last = moveMessage(m); larch.online.send(online.last); }
    online.ply++;
    await playMove(m);
  }
}

/** 公布結果：倒下的國王、彩帶、橫幅。回傳 win／lose／draw。 */
async function showResult(st) {
  setStatus('這盤結束了');
  clearMarks([MOVE_MAT, CAPTURE_MAT, SELECT_MAT, CURSOR_MAT]);
  const result = st.winner === 0 ? 'draw' : st.winner === myColor ? 'win' : 'lose';
  if (st.winner !== 0) {
    // 輸的那一方的國王倒下
    const king = meshAt[st.winner > 0 ? g.bk : g.wk];
    if (king) {
      larch.tween(king.position, { y: 0.24 }, 0.8, 'inOut');
      await larch.tween(king.rotation, { z: Math.PI / 2 * 0.94 }, 0.8, 'inOut');
      larch.sound('land', 0.7);
    }
  }
  const why = {
    mate: '將死', stalemate: '對方無棋可走，算和棋（逼和）', fifty: '五十步都沒有吃子或動兵，和棋',
    material: '剩下的棋子不夠將死，和棋', repeat: '同一個局面出現三次，和棋', resign: '', left: '對手離開了',
  }[st.why];
  if (result === 'win') {
    // 贏的那一方的國王身邊升起金色星光
    const king = meshAt[st.winner > 0 ? g.wk : g.bk];
    if (king) larch.effect('level-up', [king.position.x, 0.1, king.position.z], { scale: 0.9 });
    larch.sound('levelup', 0.6);
    await larch.ui.banner('你贏了！', st.why === 'resign' ? '對手認輸了' : why);
  } else if (result === 'lose') {
    larch.sound('break', 0.5);
    await larch.ui.banner(st.why === 'resign' ? '你認輸了' : '這盤輸了', st.why === 'mate' ? '被將死了，再接再厲！' : '下次再來！');
  } else {
    larch.sound('chime', 0.7);
    await larch.ui.banner('和棋', why);
  }
  return result;
}

// ── 開場
window.__chess = {
  fen: () => {
    let s = '';
    for (let r = 7; r >= 0; r--) { let e = 0; for (let f = 0; f < 8; f++) { const v = g.b[r * 8 + f]; if (!v) { e++; continue; } if (e) { s += e; e = 0; } s += v > 0 ? ' PNBRQK'[v] : ' pnbrqk'[-v]; } if (e) s += e; if (r) s += '/'; }
    return \`\${s} \${g.side > 0 ? 'w' : 'b'}\`;
  },
  tap: (name) => tapSquare(sqOf(name)),
  load: async (fen) => { await setPosition(fen, false); gameStatus(); markCheck(); },
  state: () => ({ side: g.side, myColor, mode, waiting: Boolean(waitPlayer), selected: selected >= 0 ? sqName(selected) : '', targets: targets.map((m) => sqName(m.to)), check: inCheck(g), captured: { ...captured } }),
  think: async () => { const m = await think(); return m && sqName(m.from) + sqName(m.to); },
};

larch.ui.text('who', \`電腦：\${LEVEL_NAME}\`, { at: 'top-left', size: 'small' });
const sweep = sweepCamera(1, 3);
await setPosition(START_FEN, true);
boardReady = true;
await sweep;
await larch.ui.banner('大理石西洋棋', larch.phone ? '點棋子、再點要去的格子・拖曳轉棋盤、兩指縮放' : '點棋子、再點要去的格子・拖曳轉棋盤、滾輪縮放');
if (larch.online.available) {
  const i = await larch.choose('要怎麼下？', ['跟電腦下', '線上對弈']);
  if (i === 1 && await joinOnline()) {
    mode = 'online';
    larch.ui.text('who', \`線上：你 vs \${online.opp.name}\`, { at: 'top-left', size: 'small' });
  }
}
let last = 'draw', again = false;
for (;;) {
  if (mode === 'online') { myColor = onlineColor(); larch.ui.toast(\`這盤你執\${sideName(myColor)}\${myColor > 0 ? '，你先走' : ''}\`); }
  if (mode === 'online' || again) aimCamera(myColor);
  last = await playOneGame();
  last = await showResult(last);
  again = await larch.choose('再下一盤嗎？', ['再來一盤', '不玩了']) === 0;
  if (!again) break;
  if (mode === 'online') online.game++;
}
larch.ui.remove('resign');
larch.complete({ score: last === 'win' ? 1 : last === 'draw' ? 0.5 : 0, result: last });
`,icecream:`// 霜淇淋小舖（Soft Serve Shop）：照客人點的口味與圈數擠霜淇淋。
// 按住「擠」按鈕、空白鍵，或按住畫面，霜淇淋就從機器流到會轉的甜筒上，一圈一圈疊起來；放開就停。
// 選口味（1–4）、加配料（Q・W・E），按「完成」（Enter）交給客人：圈數、高度、口味、配料越對、做得越快，小費越多。
// 機器、甜筒、客人、配樂、客人數、耐心都是參數（larch.params），作者在卡片設定換掉就好。

const P = larch.params;
const num = (v, d) => (v === '' || v === undefined || v === null || !Number.isFinite(Number(v)) ? d : Number(v));
const CUSTOMERS = Math.max(1, Math.round(num(P.customers, 6)));
const PATIENCE = Math.max(5, num(P.patience, 25));
const V3 = THREE.Vector3;
const clamp = larch.clamp;
const TAU = Math.PI * 2;

// ── 畫面與配樂 ───────────────────────────────────────
larch.music(P.bgm, { volume: .55 });
larch.sky('#ffe4ec');
larch.setLook({ hour: 11, look: 'storybook', bloom: .35, fog: 0, exposure: 1.1 });

const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: .8, metalness: 0, ...o });
function shadows(obj, cast = true, receive = true) {
  obj.traverse((o) => { if (o.isMesh) { o.castShadow = cast; o.receiveShadow = receive; } });
  return obj;
}
function paint(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
// 圓角方塊（擠出一個圓角矩形）
function roundBox(w, h, d, r, mat) {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  const b = Math.min(.06, r * .6);
  const g = new THREE.ExtrudeGeometry(s, { depth: d - b * 2, bevelEnabled: true, bevelThickness: b, bevelSize: b * .8, bevelSegments: 3, curveSegments: 6 });
  g.translate(0, 0, -(d - b * 2) / 2);
  return new THREE.Mesh(g, mat);
}

// ── 小店 ──────────────────────────────────────────
const shop = new THREE.Group();
larch.scene.add(shop);
const FLOOR_Y = -.8;
{
  // 地板：粉色格子磁磚
  const tiles = paint(256, 256, (g, w) => {
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { g.fillStyle = (x + y) % 2 ? '#ffe3ea' : '#fff8f1'; g.fillRect(x * w / 8, y * w / 8, w / 8, w / 8); }
  });
  tiles.wrapS = tiles.wrapT = THREE.RepeatWrapping; tiles.repeat.set(4, 3);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(16, 10).rotateX(-Math.PI / 2), std('#ffffff', { map: tiles, roughness: .6 }));
  floor.position.set(0, FLOOR_Y, -2.5);
  floor.receiveShadow = true;
  shop.add(floor);
  // 後面的牆：薄荷色條紋，中間一扇大窗戶看得到藍天
  const wallTex = paint(512, 256, (g, w, h) => {
    for (let i = 0; i < 16; i++) { g.fillStyle = i % 2 ? '#c9f0e3' : '#dcf7ee'; g.fillRect(i * w / 16, 0, w / 16, h); }
    g.fillStyle = '#ffd1dc'; g.fillRect(0, h * .78, w, h * .22);
    g.fillStyle = '#ffffff'; g.fillRect(0, h * .76, w, h * .03);
  });
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(16, 6.5), std('#ffffff', { map: wallTex, roughness: .9 }));
  wall.position.set(0, FLOOR_Y + 3.25, -4);
  wall.receiveShadow = true;
  shop.add(wall);
  for (const k of [-1, 1]) {
    const side = new THREE.Mesh(new THREE.PlaneGeometry(8, 6.5), std('#ffdbe5', { roughness: .9 }));
    side.position.set(k * 6.2, FLOOR_Y + 3.25, 0); side.rotation.y = -k * Math.PI / 2; side.receiveShadow = true;
    shop.add(side);
  }
  const skyTex = paint(256, 160, (g, w, h) => {
    const grd = g.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, '#8fd0ff'); grd.addColorStop(1, '#e3f4ff');
    g.fillStyle = grd; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(255,255,255,.95)';
    for (const [x, y, s] of [[60, 50, 1], [180, 90, 1.3], [120, 120, .8]]) { for (const [dx, dy, r] of [[0, 0, 14], [16, -6, 18], [34, 0, 14], [17, 6, 14]]) { g.beginPath(); g.arc(x + dx * s, y + dy * s, r * s, 0, TAU); g.fill(); } }
  });
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.2), new THREE.MeshBasicMaterial({ map: skyTex, toneMapped: false }));
  glass.position.set(0, 1.85, -3.98);
  shop.add(glass);
  const frameMat = std('#ffffff', { roughness: .5 });
  for (const [w, h, x, y] of [[4.5, .16, 0, 2.95], [4.5, .16, 0, .75], [.16, 2.36, -2.17, 1.85], [.16, 2.36, 2.17, 1.85], [.08, 2.2, 0, 1.85]]) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(w, h, .1), frameMat); bar.position.set(x, y, -3.93); shop.add(bar);
  }
  // 窗上的招牌
  const sign = paint(512, 128, (g, w, h) => {
    g.fillStyle = '#ff8fb1'; g.beginPath(); g.roundRect(6, 6, w - 12, h - 12, 54); g.fill();
    g.strokeStyle = '#ffffff'; g.lineWidth = 6; g.beginPath(); g.roundRect(16, 16, w - 32, h - 32, 46); g.stroke();
    g.fillStyle = '#ffffff'; g.font = 'bold 64px "Huninn","PingFang TC","Noto Sans TC",sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('霜淇淋小舖', w / 2, h / 2 + 4);
  });
  const board = new THREE.Mesh(new THREE.PlaneGeometry(2.6, .65), new THREE.MeshStandardMaterial({ map: sign, transparent: true, roughness: .6 }));
  board.position.set(0, 3.45, -3.9);
  shop.add(board);
  // 彩旗
  const flagGeo = new THREE.BufferGeometry().setFromPoints([new V3(-.13, 0, 0), new V3(.13, 0, 0), new V3(0, -.3, 0)]);
  flagGeo.computeVertexNormals();
  const flagColors = ['#ff8fb1', '#ffd36e', '#8fd8ff', '#b9e88a', '#c8a8ff'];
  for (let i = 0; i < 26; i++) {
    const x = -6.5 + i * .52, y = 3.95 - Math.sin((i / 25) * Math.PI) * .45;
    const f = new THREE.Mesh(flagGeo, std(flagColors[i % 5], { side: THREE.DoubleSide }));
    f.position.set(x, y, -3.85); f.rotation.z = Math.cos((i / 25) * Math.PI) * .25;
    shop.add(f);
  }
}
// 櫃台
const COUNTER_Y = 0;
{
  const top = roundBox(7.4, .16, 1.7, .08, std('#fffaf3', { roughness: .35 }));
  top.position.set(0, COUNTER_Y - .12, 0); // 圓角會多出一點厚度，往下移讓檯面剛好在 y = 0
  const body = new THREE.Mesh(new THREE.BoxGeometry(7.1, .75, 1.5), std('#ffc4d3'));
  body.position.set(0, COUNTER_Y - .5, 0);
  const trim = new THREE.Mesh(new THREE.BoxGeometry(7.2, .08, 1.58), std('#ff8fb1'));
  trim.position.set(0, COUNTER_Y - .2, 0);
  shop.add(shadows(top), shadows(body), shadows(trim));
}

// ── 模型（參數空白時用 THREE 做的替代形狀）────────────────
const eyeGeo = new THREE.SphereGeometry(.05, 10, 8), eyeMat = std('#2b3049', { roughness: .3 });
const cheekMat = std('#ff9fb8');
function face(g, y, z, gap, s = 1) {
  for (const k of [-1, 1]) {
    const e = new THREE.Mesh(eyeGeo, eyeMat); e.position.set(k * gap, y, z); e.scale.setScalar(s); g.add(e);
    const c = new THREE.Mesh(eyeGeo, cheekMat); c.position.set(k * gap * 1.6, y - .08 * s, z - .02); c.scale.set(1.3 * s, .7 * s, .5 * s); g.add(c);
  }
}
const waffle = paint(128, 128, (g, w) => {
  g.fillStyle = '#e8a95a'; g.fillRect(0, 0, w, w);
  g.strokeStyle = '#c9843c'; g.lineWidth = 7;
  for (let i = -w; i < w * 2; i += 26) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + w, w); g.stroke(); g.beginPath(); g.moveTo(i + w, 0); g.lineTo(i, w); g.stroke(); }
});
waffle.wrapS = waffle.wrapT = THREE.RepeatWrapping; waffle.repeat.set(3, 2);
const FALLBACK = {
  machine() {
    const g = new THREE.Group();
    const body = roundBox(1.1, 1.0, .9, .18, std('#ffc1d4')); body.position.y = .5;
    const panel = new THREE.Mesh(new THREE.BoxGeometry(.6, .45, .05), std('#e8eef8')); panel.position.set(0, .48, .46);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(.45, 20, 12, 0, TAU, 0, Math.PI / 2), std('#fff6e6')); dome.position.y = 1.0;
    const spout = new THREE.Mesh(new THREE.CylinderGeometry(.06, .08, .3, 10), std('#d9dde8', { metalness: .5, roughness: .3 })); spout.position.set(0, .3, .62); spout.rotation.x = .2;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(.12, .12, .25), std('#d9dde8', { metalness: .5, roughness: .3 })); arm.position.set(0, .42, .55);
    g.add(body, panel, dome, spout, arm);
    return g;
  },
  cone() {
    const pts = [new THREE.Vector2(.01, 0), new THREE.Vector2(.24, .6), new THREE.Vector2(.27, .64), new THREE.Vector2(.25, .68)];
    const cone = new THREE.Mesh(new THREE.LatheGeometry(pts, 24), std('#ffffff', { map: waffle, roughness: .7 }));
    return cone;
  },
  penguin() {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(.5, 20, 16), std('#4c8ef0')); body.scale.set(1, 1.15, .95); body.position.y = .58;
    const belly = new THREE.Mesh(new THREE.SphereGeometry(.4, 20, 16), std('#ffffff')); belly.scale.set(1, 1.1, .7); belly.position.set(0, .52, .2);
    const beak = new THREE.Mesh(new THREE.ConeGeometry(.08, .16, 10), std('#ffb347')); beak.rotation.x = Math.PI / 2; beak.position.set(0, .78, .5);
    const scarf = new THREE.Mesh(new THREE.TorusGeometry(.38, .07, 8, 20), std('#ff6b6b')); scarf.rotation.x = Math.PI / 2; scarf.position.y = .62;
    g.add(body, belly, beak, scarf); face(g, .88, .45, .14);
    return g;
  },
  bear() {
    const g = new THREE.Group();
    const fur = std('#f4f1ec');
    const body = new THREE.Mesh(new THREE.SphereGeometry(.45, 20, 16), fur); body.scale.set(1, 1.1, .9); body.position.y = .5;
    const head = new THREE.Mesh(new THREE.SphereGeometry(.34, 20, 16), fur); head.position.y = 1.08;
    for (const k of [-1, 1]) { const ear = new THREE.Mesh(new THREE.SphereGeometry(.1, 12, 10), fur); ear.position.set(k * .25, 1.36, 0); g.add(ear); }
    const snout = new THREE.Mesh(new THREE.SphereGeometry(.12, 14, 10), std('#ffffff')); snout.scale.set(1, .75, .8); snout.position.set(0, 1.0, .3);
    const nose = new THREE.Mesh(new THREE.SphereGeometry(.04, 10, 8), eyeMat); nose.position.set(0, 1.04, .4);
    g.add(body, head, snout, nose); face(g, 1.14, .29, .12);
    return g;
  },
};
const HEIGHT = { machine: 1.7, cone: .85, penguin: 1.7, bear: 1.85 };
async function load(key) {
  if (P[key]) {
    try { return { obj: await larch.model(P[key], { height: HEIGHT[key] }), real: true }; } catch (e) { console.warn('[soft serve]', e); }
  }
  const g = FALLBACK[key]();
  const box = new THREE.Box3().setFromObject(g);
  g.scale.multiplyScalar(HEIGHT[key] / Math.max(.05, box.max.y - box.min.y));
  g.position.y -= box.min.y * g.scale.y;
  const holder = new THREE.Group(); holder.add(g);
  return { obj: shadows(holder), real: false };
}
const MODEL = {};
await Promise.all(Object.keys(HEIGHT).map(async (k) => { MODEL[k] = await load(k); }));

// 模型上的一些點：找機器的出口（最前面、最低的那一點）、甜筒口的高度和半徑
function points(obj, fn) {
  obj.updateMatrixWorld(true);
  const v = new V3(), inv = new THREE.Matrix4().copy(obj.matrixWorld).invert(), m = new THREE.Matrix4();
  obj.traverse((o) => {
    if (!o.isMesh || !o.geometry?.attributes?.position) return;
    m.multiplyMatrices(inv, o.matrixWorld);
    const p = o.geometry.attributes.position, step = Math.max(1, Math.floor(p.count / 6000));
    for (let i = 0; i < p.count; i += step) fn(v.fromBufferAttribute(p, i).applyMatrix4(m));
  });
}
const nozzleLocal = new V3(0, HEIGHT.machine * .2, HEIGHT.machine * .35);
{
  let maxZ = -1e9;
  points(MODEL.machine.obj, (v) => { if (v.y < HEIGHT.machine * .6) maxZ = Math.max(maxZ, v.z); });
  let best = null;
  points(MODEL.machine.obj, (v) => { if (v.y < HEIGHT.machine * .6 && v.z > maxZ - HEIGHT.machine * .07 && (!best || v.y < best.y)) best = v.clone(); });
  if (best) nozzleLocal.copy(best);
}
let rimR = .24, rimY = HEIGHT.cone * .92;
{
  let r = 0, n = 0, y = 0;
  points(MODEL.cone.obj, (v) => { if (v.y > HEIGHT.cone * .8) { r = Math.max(r, Math.hypot(v.x, v.z)); y += v.y; n++; } });
  if (n) { rimR = clamp(r * .92, .12, .5); rimY = clamp(y / n, HEIGHT.cone * .75, HEIGHT.cone); }
}

// ── 機器、甜筒架 ───────────────────────────────────
const PED_H = 1.5;
const pedestal = roundBox(1.25, PED_H, 1.05, .14, std('#d9ccff'));
pedestal.position.set(-1.1, COUNTER_Y + PED_H / 2, -.5);
shop.add(shadows(pedestal, false, true));
const machine = MODEL.machine.obj;
machine.position.set(-1.1, COUNTER_Y + PED_H, -.5);
machine.rotation.y = .55;
shop.add(machine);
machine.traverse((o) => { if (o.isMesh) o.castShadow = false; });
larch.animate(machine, 'breathe');
machine.updateMatrixWorld(true);
const nozzle = machine.localToWorld(nozzleLocal.clone());
const facing = new V3(Math.sin(machine.rotation.y), 0, Math.cos(machine.rotation.y));
// 甜筒的軸在出口前面一點：霜淇淋落在甜筒口的邊上，甜筒一轉就繞成一圈
const TUBE_R = clamp(rimR * .42, .06, .14);
const R0 = rimR - TUBE_R * .35;
const coneAxis = nozzle.clone().addScaledVector(facing, R0).setY(0);
const NOZZLE_ANGLE = Math.atan2(nozzle.z - coneAxis.z, nozzle.x - coneAxis.x);
const GAP = TUBE_R * 1.8;
const LIFT_MIN = COUNTER_Y + .1;
// 甜筒架：底座、伸縮的柱子、托住甜筒的圈（會一邊擠一邊往下降）
const stand = new THREE.Group();
stand.position.copy(coneAxis).setY(COUNTER_Y);
shop.add(stand);
const standMat = std('#f2f4fa', { metalness: .35, roughness: .3 });
const standBase = new THREE.Mesh(new THREE.CylinderGeometry(.3, .36, .08, 28), std('#ff8fb1'));
standBase.position.y = .04;
const post = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, 1, 12), standMat);
const lift = new THREE.Group();
const ring = new THREE.Mesh(new THREE.TorusGeometry(rimR * .62, .025, 8, 28), standMat);
ring.rotation.x = Math.PI / 2;
ring.position.y = HEIGHT.cone * .55;
lift.add(ring);
stand.add(standBase, post, lift);
shadows(stand);
const LIFT_TOP = nozzle.y - GAP - TUBE_R - rimY;
// 出口流下來的那一條
const streamMat = std('#ffffff', { roughness: .5 });
const stream = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 10, 1, true), streamMat);
stream.visible = false;
shop.add(stream);
const headCap = new THREE.Mesh(new THREE.SphereGeometry(1, 14, 10), streamMat);
headCap.visible = false;

// 裝飾：一杯備用甜筒、三罐配料（點罐子也能加配料）、小費罐
const jars = [];
{
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(.2, .17, .28, 20), std('#ffd36e'));
  cup.position.set(-2.3, COUNTER_Y + .14, .25);
  shop.add(shadows(cup));
  for (let i = 0; i < 3; i++) {
    const c = larch.clone(MODEL.cone.obj);
    c.position.set(-2.3 + (i - 1) * .07, COUNTER_Y + .08 + i * .04, .25 + (i % 2) * .05);
    c.rotation.set((i - 1) * .2, i, (i - 1) * .15);
    shop.add(c);
  }
}
const glassMat = new THREE.MeshStandardMaterial({ color: '#e9f6ff', transparent: true, opacity: .5, roughness: .1, depthWrite: false });
const sprinkleColors = ['#ff6b8b', '#ffd166', '#4ecdc4', '#8e7dff', '#7bd389', '#ffffff'].map((c) => new THREE.Color(c));
const sprinkleGeo = new THREE.CapsuleGeometry(.018, .06, 2, 5);
const sprinkleMat = std('#ffffff', { roughness: .5 });
const cherryMat = std('#e8243c', { roughness: .2, emissive: '#5a0010', emissiveIntensity: .25 });
const stemMat = std('#5d8a3a');
const sauceMat = std('#5a2f1c', { roughness: .15, metalness: .1 });
function makeCherry(r = .07) {
  const g = new THREE.Group();
  const ball = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 14), cherryMat);
  ball.scale.set(1, .92, 1); ball.position.y = r * .9;
  const stem = new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new V3(0, r * 1.6, 0), new V3(.02, r * 2.6, 0), new V3(r * .9, r * 3.2, 0)), 8, .008, 5), stemMat);
  g.add(ball, stem);
  return shadows(g);
}
{
  const fill = [
    (g) => { const m = new THREE.InstancedMesh(sprinkleGeo, sprinkleMat, 60); const d = new THREE.Object3D(); for (let i = 0; i < 60; i++) { d.position.set((Math.random() - .5) * .16, .03 + Math.random() * .16, (Math.random() - .5) * .16); d.rotation.set(Math.random() * 6, Math.random() * 6, 0); d.scale.setScalar(1.6); d.updateMatrix(); m.setMatrixAt(i, d.matrix); m.setColorAt(i, sprinkleColors[i % 6]); } g.add(m); },
    (g) => { for (let i = 0; i < 5; i++) { const c = makeCherry(.055); c.position.set(Math.cos(i * 2.4) * .06, .02 + Math.floor(i / 3) * .07, Math.sin(i * 2.4) * .06); g.add(c); } },
    (g) => { const s = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, .16, 18), sauceMat); s.position.y = .09; g.add(s); },
  ];
  const lids = ['#ff8fb1', '#ff6b6b', '#8a5537'];
  for (let i = 0; i < 3; i++) {
    const g = new THREE.Group();
    const jar = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, .26, 20, 1, true), glassMat);
    jar.position.y = .13;
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(.14, .14, .05, 20), std(lids[i]));
    lid.position.y = .28;
    const bottom = new THREE.Mesh(new THREE.CircleGeometry(.13, 20).rotateX(-Math.PI / 2), std('#ffffff'));
    bottom.position.y = .005;
    g.add(bottom, lid); fill[i](g); g.add(jar);
    g.position.set(.75 + i * .36, COUNTER_Y, .5);
    g.userData.topping = i;
    shop.add(shadows(g));
    jars.push(g);
  }
}
const tipJar = new THREE.Group();
const coinMesh = new THREE.InstancedMesh(new THREE.CylinderGeometry(.045, .045, .014, 14), std('#ffcf4a', { metalness: .6, roughness: .3, emissive: '#7a5200', emissiveIntensity: .2 }), 80);
{
  const jar = new THREE.Mesh(new THREE.CylinderGeometry(.2, .18, .42, 24, 1, true), glassMat);
  jar.position.y = .21;
  const rim = new THREE.Mesh(new THREE.TorusGeometry(.2, .014, 6, 24), std('#ffffff', { roughness: .3 }));
  rim.rotation.x = Math.PI / 2; rim.position.y = .42;
  const label = new THREE.Mesh(new THREE.PlaneGeometry(.26, .1), new THREE.MeshBasicMaterial({ transparent: true, map: paint(128, 48, (g) => { g.fillStyle = '#ff8fb1'; g.beginPath(); g.roundRect(2, 2, 124, 44, 20); g.fill(); g.fillStyle = '#fff'; g.font = 'bold 28px "PingFang TC","Noto Sans TC",sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('TIPS', 64, 26); }) }));
  label.position.set(0, .2, .2);
  coinMesh.count = 0;
  coinMesh.castShadow = true;
  coinMesh.frustumCulled = false;
  tipJar.add(coinMesh, jar, rim, label);
  tipJar.position.set(2.05, COUNTER_Y, .3);
  shop.add(tipJar);
}
function fillTipJar(tips) {
  const n = Math.min(80, Math.round(tips / 2.5));
  const d = new THREE.Object3D();
  for (let i = coinMesh.count; i < n; i++) {
    const layer = Math.floor(i / 6), a = i * 2.39;
    d.position.set(Math.cos(a) * .09 * ((i % 3) / 2 + .2), .01 + layer * .016, Math.sin(a) * .09 * ((i % 3) / 2 + .2));
    d.rotation.set((Math.random() - .5) * .4, a, (Math.random() - .5) * .4);
    d.updateMatrix(); coinMesh.setMatrixAt(i, d.matrix);
  }
  coinMesh.count = n;
  coinMesh.instanceMatrix.needsUpdate = true;
}

// ── 霜淇淋：沿著螺旋長出來的一條有稜紋的管子（BufferGeometry 先開好，擠多少畫多少）────
const FLAVORS = [
  { id: 'vanilla', name: '香草', color: '#fff7e8' },
  { id: 'strawberry', name: '草莓', color: '#ffb0c6' },
  { id: 'chocolate', name: '巧克力', color: '#8f5a3c' },
  { id: 'matcha', name: '抹茶', color: '#a8d98a' },
].map((f) => ({ ...f, rgb: new THREE.Color(f.color) }));
const TOPPINGS = [
  { id: 'sprinkles', name: '彩色糖粒', key: 'KeyQ' },
  { id: 'cherry', name: '櫻桃', key: 'KeyW' },
  { id: 'sauce', name: '巧克力醬', key: 'KeyE' },
];
const RAD = 20, MAXP = 640, PER_REV = 40, RIDGES = 5;
const RISE = TUBE_R * 1.5;
const swirlIndex = (() => {
  const idx = new Uint16Array((MAXP - 1) * RAD * 6);
  let o = 0;
  for (let i = 0; i < MAXP - 1; i++) for (let k = 0; k < RAD; k++) {
    const a = i * RAD + k, b = i * RAD + (k + 1) % RAD, c = a + RAD, d = b + RAD;
    idx.set([a, c, b, b, c, d], o); o += 6;
  }
  return new THREE.BufferAttribute(idx, 1);
})();
const swirlMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .42, metalness: 0, emissive: '#ffffff', emissiveIntensity: .08 });
// 螺旋的形狀：第 s 圈在哪裡（半徑越往上越小，最後疊成尖尖的一球）
const helixR = (s) => R0 * Math.pow(Math.max(0, 1 - s / 4.4), .8);
const helixY = (s) => rimY + TUBE_R * .55 + s * RISE + Math.max(0, s - 3.6) * TUBE_R * .9;
const tubeR = (s) => TUBE_R * (1 - .22 * Math.min(s, 4.4) / 4.4);

function makeSwirl() {
  const g = new THREE.BufferGeometry();
  const n = MAXP * RAD * 3;
  for (const name of ['position', 'normal', 'color']) g.setAttribute(name, new THREE.BufferAttribute(new Float32Array(n), 3).setUsage(THREE.DynamicDrawUsage));
  g.setIndex(swirlIndex);
  g.setDrawRange(0, 0);
  g.boundingSphere = new THREE.Sphere(new V3(0, HEIGHT.cone, 0), 1.6);
  const mesh = new THREE.Mesh(g, swirlMat);
  mesh.castShadow = true; mesh.receiveShadow = true;
  mesh.frustumCulled = false;
  return { mesh, g, pts: [], s: 0, angle: 0, flowing: false, ramp: 0 };
}
const _T = new V3(), _U = new V3(), _W = new V3(), _O = new V3(), _c = new THREE.Color();
// 加一圈截面（星形的擠花口：6 條稜紋，越往上微微扭轉）
// 截面的方向用「平行移動」接著上一圈算，管子才不會突然翻面扭成一片；每一筆的第一圈從外往內的方向開始
function pushRing(sw, x, y, z, r, flavor, fresh = false) {
  if (sw.pts.length >= MAXP) return false;
  const i = sw.pts.length, prev = fresh ? null : sw.pts[i - 1];
  _O.set(x, 0, z); if (_O.lengthSq() < 1e-6) _O.set(Math.cos(sw.angle), 0, Math.sin(sw.angle)); _O.normalize();
  if (prev) _T.set(x - prev.x, y - prev.y, z - prev.z); else _T.set(_O.z, 0, -_O.x);
  if (_T.lengthSq() < 1e-8) _T.set(_O.z, 0, -_O.x);
  _T.normalize();
  const from = prev ? prev.U : _O;
  _U.copy(from).addScaledVector(_T, -from.dot(_T)); if (_U.lengthSq() < 1e-6) _U.copy(_O); _U.normalize();
  _W.crossVectors(_U, _T).normalize();
  const pos = sw.g.attributes.position.array, nor = sw.g.attributes.normal.array, col = sw.g.attributes.color.array;
  const base = FLAVORS[flavor].rgb, twist = i * .09;
  for (let k = 0; k < RAD; k++) {
    const th = (k / RAD) * TAU, ph = RIDGES * th + twist;
    const rr = r * (1 + .1 * Math.cos(ph)), dr = -r * .1 * RIDGES * Math.sin(ph) * .6;
    const cu = Math.cos(th), sw2 = Math.sin(th);
    const o = (i * RAD + k) * 3;
    pos[o] = x + rr * (cu * _U.x + sw2 * _W.x); pos[o + 1] = y + rr * (cu * _U.y + sw2 * _W.y); pos[o + 2] = z + rr * (cu * _U.z + sw2 * _W.z);
    const nu = dr * sw2 + rr * cu, nw = -dr * cu + rr * sw2, len = Math.hypot(nu, nw) || 1;
    nor[o] = (nu * _U.x + nw * _W.x) / len; nor[o + 1] = (nu * _U.y + nw * _W.y) / len; nor[o + 2] = (nu * _U.z + nw * _W.z) / len;
    const shade = 1 + .08 * Math.cos(ph) + .05 * sw2;
    _c.copy(base).multiplyScalar(shade);
    col[o] = _c.r; col[o + 1] = _c.g; col[o + 2] = _c.b;
  }
  sw.pts.push({ x, y, z, r, flavor, s: sw.s, U: _U.clone(), W: _W.clone() });
  for (const name of ['position', 'normal', 'color']) {
    const attr = sw.g.attributes[name];
    // 只上傳新加的這一圈（同一格加好幾圈時範圍會累積，three.js 上傳後自己清掉）
    if (attr.addUpdateRange) attr.addUpdateRange(i * RAD * 3, RAD * 3);
    attr.needsUpdate = true;
  }
  sw.g.setDrawRange(0, Math.max(0, (sw.pts.length - 1) * RAD * 6));
  return true;
}
// 擠出一個點：在 s 圈、甜筒轉到 rho 的時候，出口正下方那一點
function depositPoint(sw, rho, r, fresh = false) {
  sw.angle = NOZZLE_ANGLE - rho;
  const rh = helixR(sw.s);
  return pushRing(sw, Math.cos(sw.angle) * rh, helixY(sw.s), Math.sin(sw.angle) * rh, r, S.flavor, fresh);
}
// 放開時收尾：再繞一小段、越來越細、往上翹，像真的霜淇淋尖尖的尾巴
function finishStroke(sw) {
  const last = sw.pts[sw.pts.length - 1];
  if (!last || last.r < 1e-4) return;
  for (let k = 1; k <= 7; k++) {
    const a = sw.angle - k * (TAU / PER_REV) * .8, t = k / 7, rh = helixR(sw.s) * (1 - t * .5);
    pushRing(sw, Math.cos(a) * rh, last.y + t * t * TUBE_R * 1.1, Math.sin(a) * rh, last.r * (1 - t) ** .8 + 1e-4, last.flavor);
  }
  sw.angle -= 7 * (TAU / PER_REV) * .8;
}
function swirlTop(sw) {
  let top = rimY;
  for (const p of sw.pts) top = Math.max(top, p.y + p.r);
  return top;
}

// ── 一支甜筒（甜筒模型＋霜淇淋＋配料，一起轉）──────────────
let cone = null;
function newCone() {
  const pivot = new THREE.Group();
  const model = larch.clone(MODEL.cone.obj);
  pivot.add(model);
  const sw = makeSwirl();
  pivot.add(sw.mesh);
  // 甜筒口先墊一層（擠第一圈時才出現），甜筒的斜口才不會露出空隙
  const fill = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 12, 0, TAU, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: FLAVORS[0].color, roughness: .45 }));
  fill.scale.set(rimR * .98, TUBE_R * 1.3, rimR * .98);
  fill.position.y = rimY - TUBE_R * .4;
  fill.visible = false;
  pivot.add(fill);
  lift.add(pivot);
  pivot.scale.setScalar(.01);
  larch.tween(pivot.scale, { x: 1, y: 1, z: 1 }, .35, 'outBack');
  cone = { pivot, sw, fill, toppings: new Set(), extras: [], spin: 0, rho: 0 };
  lift.position.y = LIFT_TOP;
  return cone;
}
function disposeCone(c) {
  c.pivot.parent?.remove(c.pivot);
  c.sw.g.dispose();
  c.fill.geometry.dispose(); c.fill.material.dispose();
  for (const x of c.extras) x.traverse?.((o) => { if (o.isInstancedMesh) o.dispose(); });
}

// 配料
function addTopping(index) {
  if (!cone || S.phase !== 'serve') return;
  const t = TOPPINGS[index], sw = cone.sw;
  if (cone.toppings.has(t.id)) { larch.ui.toast(\`已經加過\${t.name}了\`); return; }
  if (sw.pts.length < 6) { larch.ui.toast('先擠霜淇淋，再加配料！'); sfx('error', .4); return; }
  if (sw.flowing) stopFlow();
  cone.toppings.add(t.id);
  updateButtons();
  const upper = sw.pts.filter((p) => p.s > sw.s - 1.4 && p.r > TUBE_R * .4);
  const top = sw.pts.reduce((a, p) => (p.y > a.y ? p : a), sw.pts[0]);
  if (t.id === 'sprinkles') {
    const n = 90, m = new THREE.InstancedMesh(sprinkleGeo, sprinkleMat, n);
    m.castShadow = true;
    m.frustumCulled = false;
    const d = new THREE.Object3D(), list = [];
    for (let i = 0; i < n; i++) {
      const p = upper[Math.floor(Math.random() * upper.length)] || top, th = Math.random() * Math.PI;
      const pos = new V3(p.x, p.y, p.z).addScaledVector(p.U, Math.cos(th) * p.r * 1.08).addScaledVector(p.W, Math.sin(th) * p.r * 1.08);
      list.push({ pos, rot: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6), delay: Math.random() * .35 });
      m.setColorAt(i, sprinkleColors[i % sprinkleColors.length]);
    }
    cone.pivot.add(m); cone.extras.push(m);
    // 糖粒從上面撒下來
    let t0 = 0;
    const off = larch.onUpdate((dt) => {
      t0 += dt;
      list.forEach((s, i) => {
        const k = clamp((t0 - s.delay) / .3, 0, 1);
        d.position.copy(s.pos); d.position.y += (1 - k * k) * .5; d.rotation.copy(s.rot); d.scale.setScalar(k > 0 ? 1 : .001);
        d.updateMatrix(); m.setMatrixAt(i, d.matrix);
      });
      m.instanceMatrix.needsUpdate = true;
      if (t0 > .7) off();
    });
    sfx('pop', .5); setTimeout(() => sfx('pop', .4), 120); setTimeout(() => sfx('pop', .35), 240);
  } else if (t.id === 'cherry') {
    const c = makeCherry();
    c.position.set(top.x, top.y + top.r * .6 + .5, top.z);
    cone.pivot.add(c); cone.extras.push(c);
    larch.tween(c.position, { y: top.y + top.r * .55 }, .5, 'outBounce');
    sfx('boing', .5);
  } else {
    // 巧克力醬：沿著上面一圈半淋下去，再滴幾滴
    const pts = upper.filter((_, i) => i % 2 === 0).map((p) => new V3(p.x, p.y, p.z).addScaledVector(p.W, p.r * .78).addScaledVector(p.U, p.r * .35));
    if (pts.length < 2) pts.push(new V3(top.x, top.y + top.r, top.z), new V3(top.x + .01, top.y + top.r, top.z));
    pts.push(new V3(top.x, top.y + top.r * .9, top.z));
    const g = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), pts.length * 3, TUBE_R * .32, 8);
    const sauce = new THREE.Mesh(g, sauceMat);
    sauce.castShadow = true;
    const total = g.index.count;
    g.setDrawRange(0, 0);
    const group = new THREE.Group(); group.add(sauce);
    for (let i = 0; i < 6; i++) {
      const p = upper[Math.floor((i + .5) / 6 * upper.length)];
      if (!p) continue;
      const drip = new THREE.Mesh(new THREE.SphereGeometry(TUBE_R * .28, 10, 8), sauceMat);
      drip.position.copy(new V3(p.x, p.y, p.z).addScaledVector(p.U, p.r * 1.0).addScaledVector(p.W, -p.r * .25));
      drip.scale.set(1, .01, 1);
      group.add(drip);
      larch.tween(drip.scale, { y: 2.2 }, .6 + i * .05, 'out');
    }
    cone.pivot.add(group); cone.extras.push(group);
    let t0 = 0;
    const off = larch.onUpdate((dt) => { t0 += dt; g.setDrawRange(0, Math.round(clamp(t0 / .6, 0, 1) * total / 3) * 3); if (t0 > .6) off(); });
    sfx('gulp', .5);
  }
  larch.effect('eat', coneTopWorld(), { scale: .6 });
}
const _p = new V3();
function coneTopWorld() {
  const sw = cone.sw, last = sw.pts[sw.pts.length - 1];
  _p.set(last ? last.x : 0, last ? last.y + last.r : rimY, last ? last.z : 0);
  return cone.pivot.localToWorld(_p).clone();
}

// ── 音效 ──────────────────────────────────────────
const lastSfx = {};
function sfx(name, vol = .5, gap = .06) {
  if (larch.time - (lastSfx[name] ?? -9) < gap) return;
  lastSfx[name] = larch.time;
  larch.sound(name, vol);
}

// ── 介面（Larch 的圓角卡片風格）──────────────────────
const ui = larch.ui.root;
const css = document.createElement('style');
css.textContent = \`
.ic-hud{position:absolute;left:max(14px,env(safe-area-inset-left));top:max(12px,env(safe-area-inset-top));display:flex;gap:8px;pointer-events:none;flex-wrap:wrap;max-width:calc(100% - 90px)}
.ic-pill{display:flex;align-items:center;gap:7px;padding:6px 14px 6px 8px;font-weight:600;font-size:16px;line-height:1}
.ic-pill b{font-size:17px}
.ic-pill.is-bump{animation:icBump .4s ease}
@keyframes icBump{40%{transform:scale(1.15)}}
.ic-dock{position:absolute;left:50%;bottom:max(12px,env(safe-area-inset-bottom));transform:translateX(-50%);display:grid;grid-template-columns:auto auto auto auto;grid-template-areas:"flavor squeeze topping done";align-items:center;gap:10px 12px;padding:10px 14px;pointer-events:auto;touch-action:none;user-select:none;-webkit-user-select:none}
.ic-group{display:flex;gap:6px}
.ic-group.flavor{grid-area:flavor}.ic-group.topping{grid-area:topping}
.ic-dock .cz-btn{touch-action:none}
.ic-chip{display:grid;justify-items:center;gap:3px;min-width:58px;padding:7px 6px 6px;font-size:13px;border-radius:16px}
.ic-chip i{display:block;width:26px;height:26px;border-radius:50%;background:var(--f);box-shadow:inset 0 -3px 0 rgba(0,0,0,.12),0 0 0 2px #fff,0 0 0 3px rgba(43,48,73,.12)}
.ic-chip svg{width:26px;height:26px}
.ic-chip.is-on{box-shadow:0 0 0 3px var(--ring,#ff7aa2),0 5px 0 #dde1ef,0 12px 22px rgba(72,82,140,.16)}
.ic-chip.is-done{opacity:.55}
.ic-chip.is-done::after{content:"✓";position:absolute;top:2px;right:6px;font-size:13px;color:#18b273;font-weight:700}
.ic-squeeze{grid-area:squeeze;--c:#ff7aa2;--d:#e2517f;width:118px;height:84px;border-radius:28px!important;font-size:22px!important;display:grid;place-items:center;line-height:1.1}
.ic-squeeze small{display:block;font-size:12px;opacity:.85;font-weight:600}
.ic-squeeze.is-down{transform:translateY(4px) scale(.97)}
.ic-side{grid-area:done;display:grid;gap:7px}
.ic-done{min-width:84px;height:54px;font-size:19px!important}
.ic-redo{min-height:0!important;height:34px;padding:0 12px!important;font-size:13.5px!important}
.ic-group.topping .ic-chip{min-width:70px}
.ic-bubble{position:absolute;z-index:3;transform:translate(-50%,-100%);padding:10px 14px 11px;min-width:150px;pointer-events:none;display:grid;gap:6px;font-weight:600;transition:opacity .2s}
.ic-bubble::after{content:"";position:absolute;left:50%;bottom:-9px;width:18px;height:18px;margin-left:-9px;background:#fff;transform:rotate(45deg);border-radius:3px;box-shadow:4px 4px 0 #dde1ef}
.ic-bubble .row{display:flex;align-items:center;gap:7px;font-size:16px;white-space:nowrap}
.ic-bubble .dot{width:18px;height:18px;border-radius:50%;background:var(--f);box-shadow:0 0 0 2px #fff,0 0 0 3px rgba(43,48,73,.15)}
.ic-bubble .n{font-size:20px;font-weight:700;color:#e2517f}
.ic-bubble .top{font-size:13.5px;color:#5b6180}
.ic-bubble .revs{display:flex;gap:4px}
.ic-bubble .revs u{position:relative;display:block;width:16px;height:16px;border-radius:50%;background:#eef0f8;overflow:hidden;box-shadow:inset 0 0 0 2px #dde1ef}
.ic-bubble .revs u::before{content:"";position:absolute;inset:0;background:var(--f);transform:scaleY(var(--k,0));transform-origin:bottom;box-shadow:inset 0 0 0 2px rgba(0,0,0,.08)}
.ic-bubble .revs u.over::before{background:#f45b65}
.ic-bubble .wait{height:7px;border-radius:999px;background:#eef0f8;overflow:hidden}
.ic-bubble .wait b{display:block;height:100%;width:100%;border-radius:999px;background:var(--w,#2fd88e);transition:width .2s linear}
.ic-bubble.is-say{min-width:0;font-size:17px;white-space:nowrap}
.ic-bubble.is-angry{animation:icShake .4s ease infinite}
@keyframes icShake{25%{margin-left:-3px}75%{margin-left:3px}}
.ic-float{position:absolute;z-index:4;transform:translate(-50%,-50%);font-weight:700;font-size:22px;color:#ffb020;text-shadow:0 2px 0 #fff,0 0 10px rgba(255,255,255,.8);pointer-events:none;white-space:nowrap;animation:icFloat 1.4s ease-out forwards}
@keyframes icFloat{0%{opacity:0;margin-top:10px;scale:.6}15%{opacity:1;scale:1.15}100%{opacity:0;margin-top:-60px;scale:1}}
.ic-live{position:absolute;z-index:3;transform:translate(-50%,-50%);padding:5px 11px;font-weight:700;font-size:15px;pointer-events:none;white-space:nowrap}
@media (max-width:640px){
  .ic-dock{grid-template-columns:1fr auto;grid-template-areas:"flavor flavor" "topping topping" "squeeze done";gap:8px;padding:9px 10px;width:calc(100% - 20px);box-sizing:border-box}
  .ic-group{justify-content:center}
  .ic-chip{min-width:0;flex:1;padding:6px 3px 5px;font-size:12px}
  .ic-chip i,.ic-chip svg{width:22px;height:22px}
  .ic-squeeze{width:100%;height:68px}
  .ic-side{grid-area:done;display:flex;gap:6px}
  .ic-done{min-width:72px;height:60px}
  .ic-redo{height:60px}
  .ic-group.topping .ic-chip{min-width:0}
  .ic-pill{font-size:14px;padding:5px 11px 5px 7px}
}
\`;
ui.append(css);
const ICON = {
  coin: '<svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.2" fill="#ffc93d" stroke="#d98b06" stroke-width="1.4"/><circle cx="12" cy="12" r="6" fill="none" stroke="#fff3b8" stroke-width="1.6"/><path d="M12 8.6v6.8" stroke="#d98b06" stroke-width="2" stroke-linecap="round"/></svg>',
  people: '<svg width="22" height="22" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.6" fill="#8ea4ff"/><path d="M2.5 20c0-4 2.9-6.6 6.5-6.6s6.5 2.6 6.5 6.6z" fill="#8ea4ff"/><circle cx="17" cy="9" r="2.8" fill="#ffb0c6"/><path d="M14 20c.2-3.4 1.4-5.5 3.2-5.5 2.6 0 4.3 2.4 4.3 5.5z" fill="#ffb0c6"/></svg>',
  sprinkles: '<svg viewBox="0 0 24 24"><g stroke-width="2.6" stroke-linecap="round"><path d="M5 7l2.5 2" stroke="#ff6b8b"/><path d="M12 4l.5 3" stroke="#4ecdc4"/><path d="M18 7l-2 2.2" stroke="#ffd166"/><path d="M6 15l3-1" stroke="#8e7dff"/><path d="M13 12l1.5 2.5" stroke="#7bd389"/><path d="M18.5 15l-2.8.6" stroke="#ff6b8b"/><path d="M10 19l2-1.5" stroke="#ffd166"/></g></svg>',
  cherry: '<svg viewBox="0 0 24 24"><path d="M12 13c0-5 2-8 6-10" stroke="#5d8a3a" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="11" cy="16" r="5.5" fill="#e8243c"/><path d="M8.6 14.2a2.6 2.6 0 0 1 2-1.6" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".8"/></svg>',
  sauce: '<svg viewBox="0 0 24 24"><path d="M3 8c3 2 6-1 9 0s6 2 9 0v3c-1 .8-1.6 3-1.6 5a1.4 1.4 0 0 1-2.8 0c0-1.6-.6-3-1.6-3.4-.6 2-1 4.4-1 6.6a1.5 1.5 0 0 1-3 0c0-2.2-.4-4.6-1-6.6-1 .4-1.6 2-1.6 3.4a1.4 1.4 0 0 1-2.8 0c0-2-.6-4.2-1.6-5z" fill="#6a3a22"/><path d="M6 10.5c1.4.4 2.8.1 4-.4" stroke="#b07a55" stroke-width="1.2" stroke-linecap="round" fill="none"/></svg>',
};
const hud = document.createElement('div');
hud.className = 'ic-hud';
hud.innerHTML = \`<div class="cz-pill ic-pill" data-k="tips">\${ICON.coin}<span>小費</span><b class="cz-num">$0</b></div><div class="cz-pill ic-pill" data-k="guest">\${ICON.people}<b class="cz-num"></b></div>\`;
ui.append(hud);
const hudVal = (k) => hud.querySelector(\`[data-k="\${k}"] b\`);
function bump(k) { const el = hud.querySelector(\`[data-k="\${k}"]\`); el.classList.remove('is-bump'); void el.offsetWidth; el.classList.add('is-bump'); }

// 下面的操作列：口味、擠、配料、完成
const dock = document.createElement('div');
dock.className = 'ic-dock cz-card';
dock.innerHTML = \`<div class="ic-group flavor">\${FLAVORS.map((f, i) => \`<button type="button" class="cz-btn white ic-chip" data-flavor="\${i}" style="--f:\${f.color};--ring:\${f.id === 'vanilla' ? '#f2c46b' : f.color}"><i></i>\${f.name}</button>\`).join('')}</div>
<button type="button" class="cz-btn ic-squeeze" data-squeeze>按住擠<small>空白鍵</small></button>
<div class="ic-group topping">\${TOPPINGS.map((t, i) => \`<button type="button" class="cz-btn white ic-chip" data-topping="\${i}">\${ICON[t.id]}\${t.name}</button>\`).join('')}</div>
<div class="ic-side"><button type="button" class="cz-btn green ic-done" data-done>完成</button><button type="button" class="cz-btn white ic-redo" data-redo>重做</button></div>\`;
ui.append(dock);
const squeezeBtn = dock.querySelector('[data-squeeze]');
let holdingButton = false;
squeezeBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); holdingButton = true; squeezeBtn.classList.add('is-down'); try { squeezeBtn.setPointerCapture(e.pointerId); } catch { /* 沒關係 */ } });
const letGo = () => { holdingButton = false; squeezeBtn.classList.remove('is-down'); };
for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) squeezeBtn.addEventListener(ev, letGo);
dock.addEventListener('pointerdown', (e) => {
  const b = e.target.closest('button');
  if (!b || b === squeezeBtn) return;
  e.preventDefault();
  sfx('click', .4);
  if (b.dataset.flavor) setFlavor(Number(b.dataset.flavor));
  else if (b.dataset.topping) addTopping(Number(b.dataset.topping));
  else if (b.hasAttribute('data-done')) serve();
  else if (b.hasAttribute('data-redo')) redo();
});
dock.addEventListener('contextmenu', (e) => e.preventDefault());
function updateButtons() {
  dock.querySelectorAll('[data-flavor]').forEach((b) => b.classList.toggle('is-on', Number(b.dataset.flavor) === S.flavor));
  dock.querySelectorAll('[data-topping]').forEach((b) => b.classList.toggle('is-done', Boolean(cone?.toppings.has(TOPPINGS[Number(b.dataset.topping)].id))));
}

// 客人頭上的對話泡泡（點單、耐心條）
const bubble = document.createElement('div');
bubble.className = 'ic-bubble cz-card';
bubble.style.opacity = '0';
ui.append(bubble);
const live = document.createElement('div');
live.className = 'ic-live cz-pill';
live.style.opacity = '0';
ui.append(live);
function orderHtml(o) {
  const f = FLAVORS[o.flavor], t = o.topping ? TOPPINGS.find((x) => x.id === o.topping) : null;
  return \`<div class="row"><span class="dot" style="--f:\${f.color}"></span>\${f.name}口味<span class="n">\${o.n}</span>圈</div>
<div class="row top">\${t ? \`加 \${t.name}\` : '不要配料'}</div>
<div class="revs" style="--f:\${f.color}">\${Array.from({ length: o.n + 1 }, (_, i) => \`<u\${i === o.n ? ' class="over" style="display:none"' : ''}></u>\`).join('')}</div>
<div class="wait"><b></b></div>\`;
}
function say(text, ms = 1500) {
  bubble.classList.add('is-say');
  bubble.classList.remove('is-angry');
  bubble.textContent = text;
  bubble.style.opacity = '1';
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const proj = new V3();
function toScreen(p) {
  proj.copy(p).project(larch.camera);
  return { x: (proj.x * .5 + .5) * ui.clientWidth, y: (-proj.y * .5 + .5) * ui.clientHeight };
}
function floatText(text, p) {
  const s = toScreen(p);
  const el = document.createElement('div');
  el.className = 'ic-float';
  el.textContent = text;
  el.style.left = \`\${s.x}px\`; el.style.top = \`\${s.y}px\`;
  ui.append(el);
  setTimeout(() => el.remove(), 1450);
}

// ── 客人 ──────────────────────────────────────────
const WAIT_AT = new V3(1.05, FLOOR_Y, -1.55);
const guests = [];
function makeGuest(kind) {
  const g = larch.clone(MODEL[kind].obj);
  g.position.set(5.2, FLOOR_Y, WAIT_AT.z);
  g.rotation.y = -Math.PI / 2;
  larch.scene.add(g);
  return { kind, obj: g, state: 'enter', wait: PATIENCE, order: null, happy: 0 };
}
function makeOrder(i) {
  if (i === 0) return { n: 2, flavor: 0, topping: null };
  if (i === 1) return { n: 3, flavor: 1, topping: 'sprinkles' };
  return { n: larch.randomInt(2, 4), flavor: larch.randomInt(0, 3), topping: Math.random() < .65 ? larch.pickOne(TOPPINGS).id : null };
}

// ── 遊戲狀態 ───────────────────────────────────────
const S = { phase: 'idle', flavor: 0, tips: 0, served: 0, perfect: 0, guest: null, index: 0, omega: TAU * .45, holdT: 0 };
function setFlavor(i) {
  S.flavor = clamp(i, 0, FLAVORS.length - 1);
  streamMat.color.set(FLAVORS[S.flavor].color);
  updateButtons();
}
function startFlow() {
  const sw = cone.sw;
  if (sw.flowing || sw.pts.length >= MAXP - 10) return;
  sw.flowing = true; sw.ramp = 0; sw.acc = 0;
  // 新的一筆從一個點開始（跟上一筆的尾巴之間不會連出一片）
  depositPoint(sw, cone.rho, 1e-4, true);
  if (!cone.fill.visible) { cone.fill.visible = true; cone.fill.material.color.set(FLAVORS[S.flavor].color); larch.tween(cone.fill.scale, { y: TUBE_R * 1.3 }, .2); }
  stream.visible = true;
  sfx('gulp', .35, .2);
}
function stopFlow() {
  const sw = cone.sw;
  if (!sw.flowing) return;
  sw.flowing = false;
  finishStroke(sw);
  stream.visible = false;
  headCap.visible = false;
}
function redo() {
  if (S.phase !== 'serve' || !cone) return;
  if (cone.sw.flowing) stopFlow();
  if (!cone.sw.pts.length) return;
  // 倒掉重做：這支掉進桶子裡
  const old = cone;
  const world = old.pivot.getWorldPosition(new V3());
  shop.attach(old.pivot);
  larch.tween(old.pivot.position, { x: world.x - .6, y: -1.5 }, .45, 'in').then(() => disposeCone(old));
  larch.tween(old.pivot.rotation, { z: 1.2 }, .45, 'in');
  sfx('whoosh', .45);
  newCone();
  updateButtons();
}

// 把甜筒交給客人，算小費
function grade(o, c) {
  const sw = c.sw;
  const revs = sw.s;
  const countScore = clamp(1 - Math.max(0, Math.abs(revs - o.n) - .15) / 1.1, 0, 1);
  const want = helixY(o.n) + tubeR(o.n) - rimY, got = swirlTop(sw) - rimY;
  const heightScore = clamp(1 - Math.max(0, Math.abs(got - want) - want * .08) / (want * .7), 0, 1);
  const right = sw.pts.filter((p) => p.flavor === o.flavor).length;
  const flavorScore = sw.pts.length ? right / sw.pts.length : 0;
  const extra = [...c.toppings].filter((t) => t !== o.topping).length;
  let toppingScore = o.topping ? (c.toppings.has(o.topping) ? 1 : 0) : 1;
  toppingScore = clamp(toppingScore - extra * .35, 0, 1);
  const q = revs < .3 ? 0 : clamp(countScore * .35 + heightScore * .15 + flavorScore * .3 + toppingScore * .2, 0, 1);
  return { q, countScore, heightScore, flavorScore, toppingScore, revs };
}
async function serve() {
  const g = S.guest;
  if (S.phase !== 'serve' || !g || g.state !== 'wait' || !cone) return;
  if (cone.sw.flowing) stopFlow();
  if (cone.sw.s < .3) { larch.ui.toast('甜筒還是空的！按住「擠」'); sfx('error', .45); return; }
  S.phase = 'react';
  const c = cone, o = g.order, r = grade(o, c);
  const timeLeft = clamp(g.wait / PATIENCE, 0, 1);
  const tip = Math.round(r.q ** 1.6 * 18 + r.q * timeLeft * 8);
  const stars = r.q >= .85 ? 3 : r.q >= .6 ? 2 : r.q >= .35 ? 1 : 0;
  // 甜筒飛到客人手上
  cone = null;
  live.style.opacity = '0';
  shop.attach(c.pivot);
  const hand = new V3(g.obj.position.x + .62, COUNTER_Y - .1, g.obj.position.z + .45);
  sfx('whoosh', .5);
  larch.tween(c.pivot.rotation, { y: c.pivot.rotation.y + TAU }, .55, 'out');
  await larch.tween(c.pivot.position, { x: hand.x, y: hand.y, z: hand.z }, .55, 'inOut');
  g.obj.attach(c.pivot);
  g.cone = c;
  newCone();
  updateButtons();
  S.tips += tip; S.served++;
  if (stars === 3) S.perfect++;
  const head = new V3(g.obj.position.x, FLOOR_Y + HEIGHT[g.kind] + .25, g.obj.position.z + .2);
  if (stars >= 2) {
    larch.effect('hearts', head, { scale: stars === 3 ? 1.4 : 1 });
    if (stars === 3) larch.effect('confetti', head);
    larch.animate(g.obj, 'hop');
    sfx(stars === 3 ? 'levelup' : 'coin', .6);
  } else if (stars === 1) {
    larch.animate(g.obj, 'breathe');
    sfx('coin', .4);
  } else {
    larch.effect('dust', head, { scale: .8 });
    larch.shake(.12, .25);
    sfx('error', .55);
  }
  hudVal('tips').textContent = \`$\${S.tips}\`; bump('tips');
  fillTipJar(S.tips);
  if (tip > 0) floatText(\`+$\${tip}  \${'★'.repeat(stars)}\${'☆'.repeat(3 - stars)}\`, tipJar.position.clone().setY(.7));
  const lines = [['唔…這不是我點的…', '算了，謝謝…'], ['嗯，還可以啦。', '謝謝～'], ['好好吃的樣子！', '謝謝老闆！'], ['完美！跟我想的一模一樣！', '太厲害了吧！']][stars];
  await say(larch.pickOne(lines), 1500);
  g.state = 'leave';
  bubble.style.opacity = '0';
  larch.animate(g.obj, 'waddle');
  larch.tween(g.obj.rotation, { y: -Math.PI / 2 }, .3);
}
function guestLeavesAngry(g) {
  // 沒交出去的那支先倒掉，再換下一位
  if (cone?.sw.flowing) stopFlow();
  if (cone && cone.sw.pts.length) redo();
  S.phase = 'react';
  say('等太久了，我先走了…', 1300).then(() => { bubble.style.opacity = '0'; });
  larch.effect('dust', new V3(g.obj.position.x, FLOOR_Y + HEIGHT[g.kind], g.obj.position.z), { scale: .8 });
  sfx('error', .5);
  g.state = 'leave';
  larch.animate(g.obj, 'waddle');
  larch.tween(g.obj.rotation, { y: -Math.PI / 2 }, .3);
}

// ── 每一格 ────────────────────────────────────────
const headW = new V3(), mid = new V3(), up = new V3(0, 1, 0), dir = new V3();
larch.onUpdate((dt) => {
  // 甜筒架上的甜筒一直慢慢轉
  if (cone) {
    cone.rho += S.omega * dt;
    cone.pivot.rotation.y = -cone.rho;
    const sw = cone.sw;
    const wantHold = S.phase === 'serve' && (holdingButton || larch.input.down('Space') || canvasHold());
    if (wantHold && !sw.flowing) startFlow();
    if (!wantHold && sw.flowing) stopFlow();
    if (sw.flowing) {
      // 擠出來的量跟著甜筒轉的角度走：轉一圈＝擠一圈
      sw.s += S.omega * dt / TAU;
      sw.acc += S.omega * dt;
      sw.ramp = Math.min(1, sw.ramp + dt * 5);
      while (sw.acc >= TAU / PER_REV) {
        sw.acc -= TAU / PER_REV;
        if (!depositPoint(sw, cone.rho, tubeR(sw.s) * (.25 + .75 * sw.ramp))) { stopFlow(); break; }
      }
      const prevWhole = Math.floor(sw.s - S.omega * dt / TAU);
      if (Math.floor(sw.s) > prevWhole) sfx(Math.floor(sw.s) === S.guest?.order?.n ? 'chime' : 'pop', .35);
      // 出口到霜淇淋頭的那一條
      const last = sw.pts[sw.pts.length - 1];
      if (last) {
        headW.set(last.x, last.y, last.z);
        sw.mesh.localToWorld(headW);
        dir.subVectors(headW, nozzle);
        const len = dir.length();
        mid.addVectors(nozzle, headW).multiplyScalar(.5);
        stream.position.copy(mid);
        stream.quaternion.setFromUnitVectors(up, dir.normalize());
        const w = last.r * .7 * (1 + Math.sin(larch.time * 30) * .06);
        stream.scale.set(w, len, w);
        if (!headCap.parent) sw.mesh.add(headCap);
        headCap.visible = true;
        headCap.position.set(last.x, last.y, last.z);
        headCap.scale.setScalar(last.r * 1.02);
      }
    }
    // 一邊擠，甜筒架一邊往下降，霜淇淋頂端保持在出口下面
    const target = Math.max(LIFT_MIN, LIFT_TOP - Math.max(0, helixY(sw.s) - helixY(0)));
    lift.position.y += (target - lift.position.y) * Math.min(1, dt * 6);
  }
  post.position.y = (lift.position.y + HEIGHT.cone * .55) / 2;
  post.scale.y = Math.max(.01, lift.position.y + HEIGHT.cone * .55);
  updateGuests(dt);
});
let pointerSince = -1;
function canvasHold() {
  // 按住畫面（不是點一下）也能擠：按超過 0.12 秒才算
  if (!larch.input.pointer.down) { pointerSince = -1; return false; }
  if (pointerSince < 0) pointerSince = larch.time;
  return larch.time - pointerSince > .12;
}
function updateGuests(dt) {
  for (let i = guests.length - 1; i >= 0; i--) {
    const g = guests[i];
    if (g.state === 'enter') {
      g.obj.position.x = Math.max(WAIT_AT.x, g.obj.position.x - dt * 2.1);
      if (g.obj.position.x <= WAIT_AT.x) {
        g.state = 'turn';
        larch.tween(g.obj.rotation, { y: 0 }, .3).then(() => { g.state = 'order'; });
        larch.animate(g.obj, 'breathe');
      }
    } else if (g.state === 'wait' && S.phase === 'serve') {
      g.wait -= dt;
      const k = clamp(g.wait / PATIENCE, 0, 1);
      const bar = bubble.querySelector('.wait b');
      if (bar) { bar.style.width = \`\${k * 100}%\`; bar.style.setProperty('--w', k > .5 ? '#2fd88e' : k > .25 ? '#ffc93d' : '#f45b65'); }
      bubble.classList.toggle('is-angry', k < .2);
      if (g.wait <= 0) guestLeavesAngry(g);
    } else if (g.state === 'leave') {
      g.obj.position.x -= dt * 2.3;
      if (g.obj.position.x < -5.5) {
        if (g.cone) disposeCone(g.cone);
        larch.scene.remove(g.obj);
        guests.splice(i, 1);
      }
    }
  }
  // 泡泡跟著現在的客人；圈數小圓點跟著擠的進度
  const g = S.guest;
  if (g && g.state !== 'leave') {
    const p = toScreen(mid.set(g.obj.position.x, FLOOR_Y + HEIGHT[g.kind] + .32, g.obj.position.z));
    bubble.style.left = \`\${clamp(p.x, bubble.offsetWidth / 2 + 8, ui.clientWidth - bubble.offsetWidth / 2 - 8)}px\`;
    bubble.style.top = \`\${Math.max(bubble.offsetHeight + 60, p.y)}px\`;
    if (g.state === 'wait' && cone) {
      const s = cone.sw.s;
      bubble.querySelectorAll('.revs u').forEach((u, i) => {
        if (i < g.order.n) u.style.setProperty('--k', clamp(s - i, 0, 1).toFixed(3));
        else { u.style.display = s > g.order.n + .02 ? 'block' : 'none'; u.style.setProperty('--k', clamp(s - i, 0, 1).toFixed(3)); }
      });
    }
  }
  // 甜筒旁邊的即時圈數
  if (cone && cone.sw.s > 0 && S.phase === 'serve') {
    const p = toScreen(mid.copy(stand.position).setY(nozzle.y + .25).add(dir.set(.55, 0, 0)));
    live.style.left = \`\${p.x}px\`; live.style.top = \`\${p.y}px\`;
    live.textContent = \`\${cone.sw.s.toFixed(1)} 圈\`;
    live.style.opacity = '1';
  } else if (S.phase === 'serve') live.style.opacity = '0';
}

// ── 鏡頭：固定的好角度，直的手機拉遠一點 ─────────────────────
const camTarget = new V3((coneAxis.x + WAIT_AT.x) / 2 - .1, .95, -.4);
const camDir = new V3(.1, .34, 1).normalize();
const fitCam = new THREE.PerspectiveCamera();
let lastAspect = 0;
function fitCamera() {
  const W = ui.clientWidth || innerWidth, H = ui.clientHeight || innerHeight, aspect = W / H;
  if (Math.abs(aspect - lastAspect) < .01) return;
  lastAspect = aspect;
  const portrait = aspect < .9;
  const keys = [new V3(coneAxis.x, COUNTER_Y + .05, coneAxis.z), new V3(nozzle.x, nozzle.y + .2, nozzle.z), new V3(WAIT_AT.x, FLOOR_Y + HEIGHT.bear + .1, WAIT_AT.z), new V3(WAIT_AT.x + .55, FLOOR_Y + 1, WAIT_AT.z), new V3(1.55, COUNTER_Y, .6)];
  fitCam.copy(larch.camera); fitCam.aspect = aspect; fitCam.updateProjectionMatrix();
  const target = camTarget.clone().add(new V3(0, portrait ? -.15 : 0, 0));
  const fits = (d) => {
    fitCam.position.copy(target).addScaledVector(camDir, d); fitCam.lookAt(target); fitCam.updateMatrixWorld();
    return keys.every((p) => { proj.copy(p).project(fitCam); return Math.abs(proj.x) < .92 && proj.y < (portrait ? .4 : .52) && proj.y > (portrait ? -.3 : -.6); });
  };
  let lo = 1.5, hi = 30;
  for (let i = 0; i < 22; i++) { const m = (lo + hi) / 2; if (fits(m)) hi = m; else lo = m; }
  larch.camera.position.copy(target).addScaledVector(camDir, hi);
  larch.camera.lookAt(target);
}
fitCamera();
addEventListener('resize', () => setTimeout(fitCamera, 60));

// ── 鍵盤、點罐子 ───────────────────────────────────
larch.input.onKey((code, isDown) => {
  if (!isDown) return;
  const f = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3, Numpad1: 0, Numpad2: 1, Numpad3: 2, Numpad4: 3 }[code];
  if (f !== undefined) setFlavor(f);
  const t = TOPPINGS.findIndex((x) => x.key === code);
  if (t >= 0) addTopping(t);
  if (code === 'Enter' || code === 'NumpadEnter') serve();
  if (code === 'Backspace' || code === 'KeyR') redo();
});
larch.input.onTap((p) => {
  const hit = larch.pick(p.x, p.y, jars);
  for (let o = hit?.object; o; o = o.parent) if (o.userData.topping !== undefined) { sfx('click', .4); addTopping(o.userData.topping); break; }
});

// ── 一天的生意 ──────────────────────────────────────
async function serveGuest(i) {
  S.index = i;
  S.omega = TAU * Math.min(.62, .42 + i * .03);
  hudVal('guest').textContent = \`客人 \${i + 1} / \${CUSTOMERS}\`;
  const g = makeGuest(i % 2 === 0 ? 'penguin' : 'bear');
  bubble.style.opacity = '0';
  larch.animate(g.obj, 'waddle');
  guests.push(g);
  S.guest = g;
  while (g.state !== 'order') await larch.wait(.05);
  g.order = makeOrder(i);
  bubble.classList.remove('is-say', 'is-angry');
  bubble.innerHTML = orderHtml(g.order);
  bubble.style.opacity = '1';
  sfx('talk', .5);
  g.wait = PATIENCE;
  g.state = 'wait';
  S.phase = 'serve';
  if (!cone) newCone();
  while (g.state !== 'leave') await larch.wait(.05);
  await larch.wait(.4);
  S.phase = 'idle';
  if (!cone) { newCone(); updateButtons(); }
}
async function playDay() {
  S.tips = 0; S.served = 0; S.perfect = 0;
  hudVal('tips').textContent = '$0';
  coinMesh.count = 0;
  setFlavor(0);
  if (cone) { disposeCone(cone); cone = null; }
  newCone();
  updateButtons();
  dock.style.visibility = 'visible';
  for (let i = 0; i < CUSTOMERS; i++) await serveGuest(i);
  S.phase = 'over';
  dock.style.visibility = 'hidden';
  live.style.opacity = '0';
  while (guests.length) await larch.wait(.1);
  larch.effect('confetti', tipJar.position.clone().setY(.8), { scale: 1.3 });
  sfx('levelup', .7);
  await larch.ui.banner('打烊囉！', \`今天收到 $\${S.tips} 小費・完美 \${S.perfect} 支\`);
  return S.tips;
}

dock.style.visibility = 'hidden';
await larch.ui.banner('霜淇淋小舖', '按住「擠」或空白鍵，照客人點的圈數放開！');
for (;;) {
  const tips = await playDay();
  const again = await larch.choose(\`今天一共收到 $\${tips} 小費！要再開一天店嗎？\`, ['再玩一次', '結束']);
  if (again !== 0) { larch.complete({ score: tips, result: tips >= CUSTOMERS * 15 ? 'win' : 'complete' }); break; }
}
`,pottery:`// 拉坯小陶藝：轉盤上的陶土跟著手指走——往內拖就壓進去、往外拖就拉出來、在頂端往上拖就拉高。
// 陰乾之後到工作台：上釉、用筆彩繪（轉盤轉著畫出一圈圈色帶，停下來自由畫）、貼上自己挑的小裝飾，
// 再送進窯裡燒，燒好的作品照形狀打分數，放上展示台。鍵盤：方向鍵移動手／筆、按住空白鍵捏／畫。

const SECONDS = larch.clamp(Number(larch.params.seconds) || 60, 10, 600);
const CLAY_COLOR = new THREE.Color(larch.params.clay || '#c98b62');

larch.music(larch.params.bgm, { volume: 0.5 });
larch.setLook({ hour: 17, look: 'golden', fog: 0, bloom: 0.5 }); // 傍晚的太陽從後面的窗戶斜斜照進來
larch.sky('#f0c48a');

// ── 介面：米色紙卡、木頭色按鈕、襯線標題（只改這張卡自己的介面）
const SERIF = '"Noto Serif TC","Songti TC","Source Han Serif TC","PMingLiU",Georgia,"Times New Roman",serif';
const INK = '#3b2a1d', PAPER = 'rgba(250,244,233,.95)', EDGE = '#d6c09c', WOOD = '#8a5a33';
{
  const css = document.createElement('style');
  css.textContent = \`
.lg-ui.studio .lg-chip,.lg-ui.studio .lg-toast,.lg-ui.studio .lg-bar{background:\${PAPER}!important;color:\${INK}!important;border:1px solid \${EDGE};border-radius:10px!important;box-shadow:0 6px 22px rgba(60,35,15,.18)!important;font-family:\${SERIF};font-weight:500;letter-spacing:.04em}
.lg-ui.studio .lg-bar b{font-weight:500}
.lg-ui.studio .lg-bar i{background:#eadcc4!important;height:6px!important}
.lg-ui.studio .lg-bar i u{background:\${WOOD}!important}
.lg-ui.studio .lg-banner{background:\${PAPER}!important;border:1px solid \${EDGE};border-radius:12px!important;box-shadow:0 18px 50px rgba(60,35,15,.22)!important}
.lg-ui.studio .lg-banner b{color:\${INK};font-family:\${SERIF};font-weight:600;letter-spacing:.12em}
.lg-ui.studio .lg-banner span{color:#7a5c43;font-family:\${SERIF};font-weight:400}
.lg-ui.studio .l3d-dialogue{background:\${PAPER}!important;border:1px solid \${EDGE};border-radius:12px!important;box-shadow:0 18px 50px rgba(60,35,15,.22)!important}
.lg-ui.studio .l3d-dialogue p{color:\${INK};font-family:\${SERIF}}
.lg-ui.studio .cz-btn{background:#fbf6ec!important;color:\${INK}!important;border:1px solid #9c7b52!important;border-radius:8px!important;box-shadow:0 2px 0 #dcc6a3!important;text-shadow:none!important;font-family:\${SERIF};font-weight:500;letter-spacing:.06em}
.lg-ui.studio .cz-btn.blue,.lg-ui.studio .cz-btn.green,.lg-ui.studio .cz-btn.orange{background:\${WOOD}!important;color:#fff8ec!important;border-color:#6d4425!important;box-shadow:0 2px 0 #5a371d!important}
.lg-ui.studio .cz-btn:hover{transform:none;filter:brightness(1.06)}
.lg-ui.studio .cz-btn:focus-visible{outline:2px solid \${WOOD};outline-offset:3px}
.lg-ui.studio .pot-card{position:absolute;display:grid;gap:10px;box-sizing:border-box;padding:16px 20px;background:\${PAPER};color:\${INK};border:1px solid \${EDGE};border-radius:12px;box-shadow:0 18px 50px rgba(60,35,15,.22);font-family:\${SERIF}}
.lg-ui.studio .pot-card h3{margin:0;font-size:19px;font-weight:600;letter-spacing:.08em}
.lg-ui.studio .pot-card small{color:#8a6e55;font-size:12.5px;letter-spacing:.06em}
.lg-ui.studio .pot-studio{left:50%;bottom:max(12px,env(safe-area-inset-bottom));transform:translateX(-50%);width:min(640px,calc(100% - 20px));pointer-events:auto;gap:8px;padding:12px 16px 14px}
.lg-ui.studio .pot-studio h3{font-size:16px;text-align:center;letter-spacing:.06em}
.lg-ui.studio .pot-head{display:flex;align-items:center;justify-content:space-between;gap:10px}
.lg-ui.studio .pot-tabs,.lg-ui.studio .pot-group{display:inline-flex;gap:3px;padding:3px;background:#efe3cd;border-radius:10px}
.lg-ui.studio .pot-studio button{font-family:inherit;touch-action:manipulation;cursor:pointer}
.lg-ui.studio .pot-studio button:focus-visible{outline:2px solid \${WOOD};outline-offset:2px}
.lg-ui.studio .pot-tab{border:0;background:transparent;color:#5d4330;font-size:14.5px;letter-spacing:.08em;padding:6px 13px;border-radius:8px}
.lg-ui.studio .pot-tab:hover{background:rgba(255,250,241,.55)}
.lg-ui.studio .pot-tab[aria-selected=true],.lg-ui.studio .pot-group .pot-chip[aria-pressed=true]{background:#fffaf1;color:\${INK};font-weight:600;box-shadow:0 0 0 1px #9c7b52,0 1px 3px rgba(60,35,15,.25)}
.lg-ui.studio .pot-next{padding:8px 16px!important;font-size:15px!important;white-space:nowrap}
.lg-ui.studio .pot-hint{margin-top:-3px;font-size:12.5px;line-height:1.55;color:#6e5340;text-align:center;white-space:pre-line}
.lg-ui.studio .pot-body{display:grid;gap:9px}
.lg-ui.studio .pot-body[hidden]{display:none}
.lg-ui.studio .pot-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:7px}
.lg-ui.studio .pot-glaze{display:grid;justify-items:center;gap:4px;border:0;background:none;padding:2px;color:#5d4330;font-size:12.5px}
.lg-ui.studio .pot-glaze i,.lg-ui.studio .pot-sw i{display:block;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(60,35,15,.45),inset 0 -3px 6px rgba(0,0,0,.25),0 1px 3px rgba(60,35,15,.3)}
.lg-ui.studio .pot-glaze i{width:38px;height:38px}
.lg-ui.studio .pot-glaze[aria-pressed=true] span{color:\${INK};font-weight:600}
.lg-ui.studio .pot-sw{border:0;background:none;padding:3px;border-radius:50%}
.lg-ui.studio .pot-sw i{width:28px;height:28px}
.lg-ui.studio .pot-sw:hover i,.lg-ui.studio .pot-glaze:hover i{transform:scale(1.08)}
.lg-ui.studio [aria-pressed=true]>i{outline:2px solid \${WOOD};outline-offset:3px}
.lg-ui.studio .pot-chip{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:34px;padding:5px 12px;border:1px solid #9c7b52;border-radius:8px;background:#fbf6ec;color:\${INK};font-size:14px;letter-spacing:.04em;box-shadow:0 2px 0 #dcc6a3}
.lg-ui.studio .pot-chip:hover:not(:disabled){filter:brightness(1.04)}
.lg-ui.studio .pot-chip:active:not(:disabled){transform:translateY(1px);box-shadow:none}
.lg-ui.studio .pot-chip:disabled{opacity:.45;cursor:default}
.lg-ui.studio .pot-group .pot-chip{min-height:30px;padding:4px 11px;border-color:transparent;background:transparent;box-shadow:none;color:#5d4330}
.lg-ui.studio .pot-dot{display:inline-block;width:var(--d);height:var(--d);border-radius:50%;background:currentColor}
.lg-ui.studio .pot-kind{display:grid;justify-items:center;gap:1px;width:46px;padding:5px 0 4px;border:1px solid transparent;border-radius:9px;background:none;color:#5d4330;font-size:12px}
.lg-ui.studio .pot-kind svg{width:24px;height:24px;fill:currentColor}
.lg-ui.studio .pot-kind:hover{background:rgba(239,227,205,.6)}
.lg-ui.studio .pot-kind[aria-pressed=true]{background:#f1e4cc;border-color:\${WOOD};color:\${INK};font-weight:600}
@media (max-width:520px){.lg-ui.studio .pot-row{gap:6px}.lg-ui.studio .pot-studio{padding:10px 10px 12px;gap:7px}.lg-ui.studio .pot-tab{padding:6px 10px;font-size:14px}.lg-ui.studio .pot-palette{gap:5px}.lg-ui.studio .pot-sw{padding:2px}.lg-ui.studio .pot-sw i{width:24px;height:24px}.lg-ui.studio .pot-kinds{gap:3px}.lg-ui.studio .pot-kind{width:40px}.lg-ui.studio .pot-glaze i{width:34px;height:34px}.lg-ui.studio .pot-chip{font-size:13px;padding:4px 9px;min-height:32px}}\`;
  larch.ui.root.append(css);
  larch.ui.root.classList.add('studio');
}

// ── 小工具
function canvasTexture(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
const shadowy = (o) => { o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };
const V2 = (pts) => pts.map(([x, y]) => new THREE.Vector2(x, y));
const smoothstep = (a, b, x) => { const t = larch.clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const rand = (seed) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
/** 牆、地板這種拼起來的方塊：照世界座標給貼圖座標，接縫才對得起來。 */
function worldBox(w, h, d, x, y, z, mat, scale) {
  const geo = new THREE.BoxGeometry(w, h, d);
  geo.translate(x, y, z);
  const p = geo.attributes.position, n = geo.attributes.normal, uv = geo.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const side = Math.abs(n.getX(i)) > 0.5;
    uv.setXY(i, (side ? p.getZ(i) : p.getX(i)) / scale, p.getY(i) / scale);
  }
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = true; m.receiveShadow = true;
  larch.scene.add(m);
  return m;
}

// ── 亮面反射的工作室：暖色的牆、後面一扇很亮的窗（濕陶土、燒好的釉、架上的瓷器都反射它）
const ROOM = (() => {
  const s = new THREE.Scene();
  s.background = new THREE.Color('#3a2a1e');
  const soft = (w, h, color, k, pos) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(k), side: THREE.DoubleSide })); m.position.set(...pos); m.lookAt(0, 1, 0); s.add(m); };
  soft(3, 2.2, '#ffd9a0', 6, [0.4, 2.2, -5]);   // 夕陽的窗
  soft(10, 4, '#8a6448', 0.9, [-6, 2, 0]);      // 側牆
  soft(10, 4, '#7a5a40', 0.7, [0, 2, 6]);       // 身後
  soft(12, 12, '#5c4030', 0.6, [0, -3, 0]);     // 地板
  soft(6, 3, '#fff0d8', 1.4, [5, 5, 3]);        // 天窗的柔光
  const pm = new THREE.PMREMGenerator(larch.renderer);
  const tex = pm.fromScene(s, 0.04).texture;
  pm.dispose();
  return tex;
})();

// ── 工作室：舊木地板、石牆（開一扇窗，夕陽從這裡照進來）、灰泥牆、層架
const floorTex = canvasTexture(1024, 1024, (x, w, h) => {
  const r = rand(5), rows = 6;
  for (let i = 0; i < rows; i++) {
    const y0 = i * h / rows, bh = h / rows;
    for (let seg = 0, x0 = -r() * w * 0.5; x0 < w; seg++) {
      const len = w * (0.45 + r() * 0.5), tone = 120 + Math.round(r() * 34);
      x.fillStyle = \`rgb(\${tone},\${Math.round(tone * 0.7)},\${Math.round(tone * 0.48)})\`;
      x.fillRect(x0, y0, len, bh);
      for (let k = 0; k < 14; k++) {
        x.strokeStyle = \`rgba(\${r() < 0.6 ? '60,36,20' : '190,150,110'},\${0.05 + r() * 0.1})\`; x.lineWidth = 0.6 + r() * 2.2;
        const yy = y0 + 4 + r() * (bh - 8);
        x.beginPath(); x.moveTo(x0, yy); x.bezierCurveTo(x0 + len * 0.3, yy + (r() - 0.5) * 8, x0 + len * 0.7, yy + (r() - 0.5) * 8, x0 + len, yy); x.stroke();
      }
      if (r() < 0.35) { const kx = x0 + r() * len, ky = y0 + bh * (0.3 + r() * 0.4); x.fillStyle = 'rgba(55,32,18,.35)'; x.beginPath(); x.ellipse(kx, ky, 6 + r() * 6, 3 + r() * 3, 0, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = 'rgba(30,18,10,.55)'; x.fillRect(x0 + len - 2, y0, 2, bh);
      x0 += len;
    }
    x.fillStyle = 'rgba(30,18,10,.6)'; x.fillRect(0, y0, w, 3);
  }
  // 磨舊的地方比較淺
  const g = x.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.6);
  g.addColorStop(0, 'rgba(255,230,190,.08)'); g.addColorStop(1, 'rgba(0,0,0,.18)');
  x.fillStyle = g; x.fillRect(0, 0, w, h);
});
floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
floorTex.repeat.set(3, 3);
const floor = new THREE.Mesh(new THREE.PlaneGeometry(18, 18).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.82 }));
floor.receiveShadow = true;
larch.scene.add(floor);

const stoneTex = canvasTexture(1024, 1024, (x, w, h) => {
  const r = rand(17);
  x.fillStyle = '#958571'; x.fillRect(0, 0, w, h); // 灰漿
  for (let y0 = 0, row = 0; y0 < h; row++) {
    const bh = 70 + r() * 50;
    for (let x0 = -(row % 2) * 60 - r() * 40; x0 < w; ) {
      const bw = 110 + r() * 120, tone = 156 + Math.round(r() * 42), warm = r() * 16;
      const pad = 4 + r() * 3;
      x.beginPath(); if (x.roundRect) x.roundRect(x0 + pad, y0 + pad, bw - pad * 2, bh - pad * 2, 12 + r() * 14); else x.rect(x0 + pad, y0 + pad, bw - pad * 2, bh - pad * 2);
      // 每塊石頭上亮下暗，看起來有一點厚度
      const shade = x.createLinearGradient(0, y0, 0, y0 + bh);
      shade.addColorStop(0, \`rgb(\${tone + warm + 14},\${tone + 10 + warm * 0.4},\${tone - 6})\`); shade.addColorStop(1, \`rgb(\${tone + warm - 18},\${tone - 22 + warm * 0.4},\${tone - 34})\`);
      x.fillStyle = shade; x.fill();
      for (let k = 0; k < 10; k++) { x.fillStyle = \`rgba(\${r() < 0.5 ? '255,245,225' : '70,55,40'},\${r() * 0.12})\`; x.beginPath(); x.arc(x0 + r() * bw, y0 + r() * bh, 4 + r() * 18, 0, Math.PI * 2); x.fill(); }
      x0 += bw;
    }
    y0 += bh;
  }
});
stoneTex.wrapS = stoneTex.wrapT = THREE.RepeatWrapping;
const stoneMat = new THREE.MeshStandardMaterial({ map: stoneTex, roughness: 0.95 });
const plasterTex = canvasTexture(512, 512, (x, w, h) => {
  const r = rand(29);
  x.fillStyle = '#e4d3b8'; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 700; i++) { x.fillStyle = \`rgba(\${r() < 0.5 ? '255,250,240' : '150,120,90'},\${r() * 0.06})\`; x.beginPath(); x.arc(r() * w, r() * h, 3 + r() * 16, 0, Math.PI * 2); x.fill(); }
});
plasterTex.wrapS = plasterTex.wrapT = THREE.RepeatWrapping;
const plasterMat = new THREE.MeshStandardMaterial({ map: plasterTex, roughness: 0.97 });
const oak = new THREE.MeshStandardMaterial({ color: '#8d6240', roughness: 0.72 });
const darkOak = new THREE.MeshStandardMaterial({ color: '#5a3b26', roughness: 0.75 });
// 後牆（石頭）：窗戶開在拉坯機後上方，夕陽穿過窗戶剛好照在陶土上
const WIN = { x0: -0.4, x1: 1.3, y0: 1.3, y1: 2.75 };
const WALL_Z = -3.15, WALL_D = 0.3;
{
  // 窗洞四周的四塊牆
  const left = WIN.x0 + 8, right = 8 - WIN.x1;
  worldBox(left, 6, WALL_D, -8 + left / 2, 3, WALL_Z, stoneMat, 3.4);
  worldBox(right, 6, WALL_D, WIN.x1 + right / 2, 3, WALL_Z, stoneMat, 3.4);
  worldBox(WIN.x1 - WIN.x0, WIN.y0, WALL_D, (WIN.x0 + WIN.x1) / 2, WIN.y0 / 2, WALL_Z, stoneMat, 3.4);
  worldBox(WIN.x1 - WIN.x0, 6 - WIN.y1, WALL_D, (WIN.x0 + WIN.x1) / 2, (6 + WIN.y1) / 2, WALL_Z, stoneMat, 3.4);
  // 側牆（灰泥）＋轉角的木柱、天花板的大樑
  worldBox(WALL_D, 6, 16, -4.35, 3, 0, plasterMat, 3);
  worldBox(0.28, 6, 0.28, -4.06, 3, WALL_Z + 0.3, darkOak, 1);
  worldBox(16, 0.32, 0.36, 0, 3.7, WALL_Z + 0.35, darkOak, 1);
  // 窗框、窗格、窗台
  const cx = (WIN.x0 + WIN.x1) / 2, cy = (WIN.y0 + WIN.y1) / 2, ww = WIN.x1 - WIN.x0, wh = WIN.y1 - WIN.y0;
  for (const [w, h, x, y] of [[ww + 0.16, 0.08, cx, WIN.y1], [ww + 0.16, 0.08, cx, WIN.y0], [0.08, wh, WIN.x0, cy], [0.08, wh, WIN.x1, cy], [0.045, wh, cx, cy], [ww, 0.045, cx, cy]]) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.07), oak);
    b.position.set(x, y, WALL_Z + 0.04); larch.scene.add(shadowy(b));
  }
  const sill = new THREE.Mesh(new THREE.BoxGeometry(ww + 0.3, 0.06, 0.36), oak);
  sill.position.set(cx, WIN.y0 - 0.03, WALL_Z + 0.2); larch.scene.add(shadowy(sill));
  const planter = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.15, 20), new THREE.MeshStandardMaterial({ color: '#a8603f', roughness: 0.85 }));
  planter.position.set(WIN.x1 - 0.18, WIN.y0 + 0.075, WALL_Z + 0.2);
  const leaves = new THREE.Group();
  const leafMat = new THREE.MeshStandardMaterial({ color: '#6f8f4a', roughness: 0.8, side: THREE.DoubleSide });
  for (let i = 0; i < 9; i++) { const l = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), leafMat); const a = i * 2.4; l.scale.set(0.6, 1.6, 0.3); l.position.set(Math.cos(a) * 0.05, 0.1 + (i % 3) * 0.04, Math.sin(a) * 0.05); l.rotation.set(Math.cos(a) * 0.6, a, Math.sin(a) * 0.6); leaves.add(l); }
  leaves.position.copy(planter.position).add(new THREE.Vector3(0, 0.05, 0));
  larch.scene.add(shadowy(planter), shadowy(leaves));
}

// 層架：本來就有幾件作品，玩家做的會擺進空位
const shelfSlots = [];
{
  const SX = 2.95, shelf = new THREE.Group();
  for (const y of [0.85, 1.45, 2.05]) {
    const board = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.06, 0.42), oak); board.position.set(0, y, 0); shelf.add(board);
    for (const sx of [-0.65, 0, 0.65]) shelfSlots.push(new THREE.Vector3(SX + sx, y + 0.03, WALL_Z + 0.36));
  }
  for (const x of [-1.08, 1.08]) { const post = new THREE.Mesh(new THREE.BoxGeometry(0.07, 2.2, 0.42), darkOak); post.position.set(x, 1.1, 0); shelf.add(post); }
  shelf.position.set(SX, 0, WALL_Z + 0.36);
  larch.scene.add(shadowy(shelf));
  const pots = [
    [0, '#7f9c86', 0.18, [[0, 0], [0.07, 0], [0.12, 0.08], [0.13, 0.2], [0.07, 0.34], [0.05, 0.42], [0.08, 0.46], [0.06, 0.47], [0.04, 0.44], [0, 0.44]]], // 青瓷瓶
    [2, '#2c1b14', 0.14, [[0, 0], [0.06, 0], [0.16, 0.08], [0.2, 0.14], [0.18, 0.145], [0.1, 0.06], [0, 0.06]]],                                       // 天目碗
    [3, '#c8875a', 0.9, [[0, 0], [0.09, 0], [0.16, 0.12], [0.17, 0.24], [0.11, 0.33], [0.12, 0.36], [0.1, 0.36], [0.09, 0.32], [0, 0.32]]],          // 素燒罐
    [5, '#e8dfcc', 0.2, [[0, 0], [0.07, 0], [0.1, 0.03], [0.11, 0.18], [0.1, 0.19], [0.09, 0.04], [0, 0.04]]],                                        // 志野杯
    [6, '#33507e', 0.16, [[0, 0], [0.08, 0], [0.14, 0.1], [0.14, 0.2], [0.09, 0.28], [0.1, 0.31], [0.08, 0.31], [0.07, 0.27], [0, 0.27]]],           // 藍釉罐
    [8, '#a7714a', 0.25, [[0, 0], [0.06, 0], [0.18, 0.07], [0.22, 0.1], [0.2, 0.105], [0.1, 0.04], [0, 0.04]]],                                       // 灰釉盤
  ];
  for (const [slot, color, rough, pts] of pots) {
    const m = new THREE.Mesh(new THREE.LatheGeometry(V2(pts), 40), new THREE.MeshPhysicalMaterial({ color, roughness: rough, clearcoat: rough < 0.5 ? 1 : 0, clearcoatRoughness: 0.08, envMap: ROOM, envMapIntensity: 0.8 }));
    m.position.copy(shelfSlots[slot]);
    m.rotation.y = slot;
    larch.scene.add(shadowy(m));
  }
  for (const s of [8, 6, 5, 3, 2, 0]) shelfSlots.splice(s, 1); // 剩下的空位給玩家
}

// 木水桶和海綿（拉坯要沾水）
{
  const stave = new THREE.MeshStandardMaterial({ color: '#7a5233', roughness: 0.85 });
  const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.17, 0.32, 20, 1, true), new THREE.MeshStandardMaterial({ color: '#7a5233', roughness: 0.85, side: THREE.DoubleSide }));
  const hoops = [0.07, 0.25].map((y) => { const h = new THREE.Mesh(new THREE.TorusGeometry(0.19 + y * 0.12, 0.008, 6, 32), new THREE.MeshStandardMaterial({ color: '#3a3532', metalness: 0.6, roughness: 0.5 })); h.rotation.x = Math.PI / 2; h.position.y = y; return h; });
  const water = new THREE.Mesh(new THREE.CircleGeometry(0.2, 24).rotateX(-Math.PI / 2), new THREE.MeshPhysicalMaterial({ color: '#7d6352', roughness: 0.05, clearcoat: 1 }));
  water.position.y = 0.26;
  const bottom = new THREE.Mesh(new THREE.CircleGeometry(0.17, 20).rotateX(-Math.PI / 2), stave);
  bottom.position.y = 0.005;
  const b = new THREE.Group();
  bucket.position.y = 0.16;
  b.add(bucket, ...hoops, water, bottom);
  b.position.set(-1.25, 0, 0.85);
  const sponge = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 0.1), new THREE.MeshStandardMaterial({ color: '#d9b25e', roughness: 1 }));
  sponge.position.set(-0.98, 0.025, 1.1); sponge.rotation.y = 0.5;
  larch.scene.add(shadowy(b), shadowy(sponge));
}

// 光裡飄的灰塵：從窗戶照到拉坯機的那一道光裡，慢慢飄
const SUN = new THREE.Vector3(-0.14, -0.33, 0.94).normalize(); // 光前進的方向（傍晚的太陽在窗外）
(() => {
  const n = 160, pos = new Float32Array(n * 3), seed = new Float32Array(n * 4), r = rand(41);
  for (let i = 0; i < n; i++) {
    const t = 0.4 + r() * 3.6, wx = WIN.x0 + r() * (WIN.x1 - WIN.x0), wy = WIN.y0 + r() * (WIN.y1 - WIN.y0);
    seed.set([wx + SUN.x * t, wy + SUN.y * t, WALL_Z + SUN.z * t, r() * 6.28], i * 4);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dot = canvasTexture(32, 32, (x) => { const g = x.createRadialGradient(16, 16, 0, 16, 16, 16); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 32, 32); });
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ map: dot, color: '#ffe2b0', size: 0.028, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }));
  pts.frustumCulled = false;
  larch.scene.add(pts);
  larch.onUpdate((dt, t) => {
    for (let i = 0; i < n; i++) {
      const s = i * 4, w = seed[s + 3];
      pos[i * 3] = seed[s] + Math.sin(t * 0.21 + w) * 0.12;
      pos[i * 3 + 1] = seed[s + 1] + Math.sin(t * 0.13 + w * 1.7) * 0.15;
      pos[i * 3 + 2] = seed[s + 2] + Math.cos(t * 0.17 + w) * 0.12;
    }
    geo.attributes.position.needsUpdate = true;
  });
})();

// ── 模型：拉坯機和陶窯（參數空白就用 THREE 做一台）
function fallbackWheel() {
  const g = new THREE.Group();
  const clayMat = oak;
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.62, 0.5, 40), clayMat); base.position.y = 0.25;
  const tray = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.06, 10, 40), new THREE.MeshStandardMaterial({ color: '#e7dccb', roughness: 0.6 })); tray.rotation.x = Math.PI / 2; tray.position.y = 0.6;
  const col = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.4, 16), darkOak); col.position.y = 0.7;
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.08, 48), new THREE.MeshStandardMaterial({ color: '#e9e2d6', roughness: 0.5 })); disc.position.y = 0.92;
  g.add(base, tray, col, disc);
  return shadowy(g);
}
function fallbackKiln() {
  const g = new THREE.Group();
  const brick = new THREE.MeshStandardMaterial({ color: '#e0b48a', roughness: 0.85 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 1.0, 32), brick); body.position.y = 0.5;
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), brick); dome.position.y = 1.0;
  const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.5, 16), new THREE.MeshStandardMaterial({ color: '#c8754d', roughness: 0.8 })); chimney.position.set(0.1, 1.95, 0);
  const door = new THREE.Mesh(new THREE.CircleGeometry(0.28, 24, 0, Math.PI), new THREE.MeshStandardMaterial({ color: '#5a3a2a', roughness: 0.9 }));
  door.position.set(0, 0.32, 0.951);
  const doorLow = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.32), door.material); doorLow.position.set(0, 0.16, 0.952);
  g.add(body, dome, chimney, door, doorLow);
  return shadowy(g);
}
async function loadModel(key, height, fallback) {
  const id = larch.params[key];
  if (id) { try { return await larch.model(id, { height }); } catch (error) { console.warn(\`\${key} 模型載不到，改用內建的形狀\`, error); } }
  const holder = new THREE.Group(), made = fallback();
  holder.userData.fallback = true;
  const box = new THREE.Box3().setFromObject(made);
  made.scale.setScalar(height / Math.max(0.01, box.max.y - box.min.y));
  holder.add(made);
  return holder;
}
const [wheel, kiln] = await Promise.all([loadModel('wheel', 1.0, fallbackWheel), loadModel('kiln', 2.2, fallbackKiln)]);
larch.scene.add(wheel);
kiln.position.set(-2.35, 0, -1.55);
kiln.rotation.y = 0.5; // 窯門稍微轉向拉坯機
larch.scene.add(kiln);

/** 找轉盤：從上往下打一格一格的射線，最高的那一塊（中間的軸或盤面）就是中心，周圍平的就是盤面。 */
function findDisc(obj) {
  obj.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(obj), rc = new THREE.Raycaster(), down = new THREE.Vector3(0, -1, 0), from = new THREE.Vector3();
  const pts = [], n = 28;
  for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) {
    from.set(box.min.x + (a + 0.5) / n * (box.max.x - box.min.x), box.max.y + 1, box.min.z + (b + 0.5) / n * (box.max.z - box.min.z));
    rc.set(from, down);
    const hit = rc.intersectObject(obj, true)[0];
    if (hit) pts.push([from.x, hit.point.y, from.z]);
  }
  if (!pts.length) return { x: 0, z: 0, y: box.max.y, r: 0.4, top: box.max.y };
  const top = Math.max(...pts.map((p) => p[1]));
  const plateau = pts.filter((p) => p[1] > top - 0.015);
  const x = plateau.reduce((s, p) => s + p[0], 0) / plateau.length, z = plateau.reduce((s, p) => s + p[2], 0) / plateau.length;
  const dist = (p) => Math.hypot(p[0] - x, p[2] - z);
  const ring = pts.filter((p) => dist(p) > 0.1 && dist(p) < 0.24).map((p) => p[1]).sort((a, c) => a - c);
  const y = ring.length ? ring[Math.floor(ring.length / 2)] : top;
  const flat = pts.filter((p) => Math.abs(p[1] - y) < 0.025).map(dist).sort((a, c) => a - c);
  const r = flat.length ? flat[Math.floor(flat.length * 0.85)] : 0.4;
  return { x, z, y, r: larch.clamp(r, 0.25, 0.75), top, hub: Math.max(...plateau.map(dist)) };
}
const disc = findDisc(wheel);
// 有的拉坯機模型中間有一根軸凸出盤面：做碗、盤子時會從內底穿出來，所以把它壓平到轉盤面底下（被坯板蓋住）
if (disc.top > disc.y + 0.06) {
  const cut = disc.y + 0.03, w = Math.min(disc.r * 0.5, disc.hub + 0.04), v = new THREE.Vector3(), inv = new THREE.Matrix4();
  wheel.updateMatrixWorld(true);
  wheel.traverse((m) => {
    const pos = m.isMesh && m.geometry?.attributes?.position;
    if (!pos) return;
    inv.copy(m.matrixWorld).invert();
    let flat = false;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
      if (v.y > cut && Math.abs(v.x - disc.x) < w && Math.abs(v.z - disc.z) < w) { v.y = cut; v.applyMatrix4(inv); pos.setXYZ(i, v.x, v.y, v.z); flat = true; }
    }
    if (flat) { pos.needsUpdate = true; m.geometry.computeBoundingSphere(); m.geometry.computeBoundingBox(); }
  });
}
// 會轉的轉盤面（蓋在模型的盤面上，畫幾條放射線才看得出在轉）
// 轉盤上墊一塊沾了泥漿的木板（拉坯用的「坯板」）：木紋和泥漬跟著轉，看得出轉盤在轉
const headTex = canvasTexture(256, 256, (x) => {
  const r = rand(53);
  x.fillStyle = '#9b7350'; x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 40; i++) { x.strokeStyle = \`rgba(\${r() < 0.5 ? '70,45,28' : '170,130,95'},\${0.1 + r() * 0.15})\`; x.lineWidth = 1 + r() * 2; const y = r() * 256; x.beginPath(); x.moveTo(0, y); x.bezierCurveTo(80, y + (r() - 0.5) * 10, 170, y + (r() - 0.5) * 10, 256, y); x.stroke(); }
  for (let i = 0; i < 9; i++) { x.fillStyle = \`rgba(\${Math.round(CLAY_COLOR.r * 255)},\${Math.round(CLAY_COLOR.g * 255)},\${Math.round(CLAY_COLOR.b * 255)},\${0.25 + r() * 0.3})\`; x.beginPath(); x.ellipse(40 + r() * 176, 40 + r() * 176, 8 + r() * 22, 4 + r() * 10, r() * 3, 0, Math.PI * 2); x.fill(); }
});
const head = new THREE.Mesh(new THREE.CylinderGeometry(disc.r * 0.86, disc.r * 0.86, 0.035, 48), [new THREE.MeshStandardMaterial({ color: '#7d5a3d', roughness: 0.7 }), new THREE.MeshStandardMaterial({ map: headTex, roughness: 0.55 }), new THREE.MeshStandardMaterial({ color: '#7d5a3d' })]);
head.position.set(disc.x, disc.y + 0.0175, disc.z);
head.castShadow = true; head.receiveShadow = true;
larch.scene.add(head);
const BASE = new THREE.Vector3(disc.x, disc.y + 0.035, disc.z); // 陶土的底
// 尺寸照轉盤大小縮放（換了別的拉坯機模型也合適）
const U = larch.clamp(disc.r / 0.6, 0.5, 1.5);

// ── 陶土：32 圈半徑，用 LatheGeometry 轉出來；捏的時候只改頂點位置
const RINGS = 32, SEG = 72;
const WALL = 0.05 * U, FLOOR = 0.08 * U;
const MIN_R = 0.08 * U, MAX_R = 0.62 * U, MAX_H = 1.15 * U, MIN_H = 0.15 * U, FOOT = 0.15 * U, REACH = 0.24 * U;
const clay = { r: new Float32Array(RINGS), h: 0, wobble: 0, phase: 0, collapses: 0, pinch: 0, thin: 0 };
function resetClay() {
  clay.h = 0.36 * U; clay.wobble = 0; clay.collapses = 0; clay.pinch = 0; clay.thin = 0;
  clay.phase = Math.random() * 6;
  for (let i = 0; i < RINGS; i++) { const t = i / (RINGS - 1); clay.r[i] = (0.34 - 0.035 * t * t * t) * U; } // 圓圓的一團
}
resetClay();
const PTS = 2 * RINGS + 6;
const profile = Array.from({ length: PTS }, () => new THREE.Vector2());
const rimW = new Float32Array(PTS), nx = new Float32Array(PTS), ny = new Float32Array(PTS);
const SIN = [], COS = [], PHI = [];
for (let i = 0; i <= SEG; i++) { PHI[i] = i / SEG * Math.PI * 2; SIN[i] = Math.sin(PHI[i]); COS[i] = Math.cos(PHI[i]); }
/** 半徑 → 輪廓（外壁往上、圓圓的口緣、內壁往下、內底）。 */
function fillProfile() {
  const H = clay.h, r = clay.r;
  let k = 0;
  const put = (x, y, w) => { profile[k].set(Math.max(0, x), y); rimW[k] = w; k++; };
  put(0, 0, 0);
  put(r[0] - 0.012 * U, 0, 0);
  for (let i = 0; i < RINGS; i++) { const t = i / (RINGS - 1); put(r[i], t * H, smoothstep(0.7, 1, t)); }
  const top = r[RINGS - 1];
  put(top - WALL * 0.15, H + WALL * 0.3, 1); put(top - WALL * 0.5, H + WALL * 0.45, 1); put(top - WALL * 0.85, H + WALL * 0.3, 1);
  for (let i = RINGS - 1; i >= 0; i--) { const t = i / (RINGS - 1); put(Math.max(0.012, r[i] - WALL), FLOOR + t * (H - FLOOR), smoothstep(0.7, 1, t)); }
  put(0, FLOOR, 0);
  // 輪廓上每一點的法線（2D）
  for (let j = 0; j < PTS; j++) {
    const a = profile[Math.max(0, j - 1)], b = profile[Math.min(PTS - 1, j + 1)];
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
    nx[j] = dy / len; ny[j] = -dx / len;
  }
}
fillProfile();
const clayGeo = new THREE.LatheGeometry(profile, SEG);
clayGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(clayGeo.attributes.position.count * 3).fill(1), 3));
function updateClay() {
  fillProfile();
  const pa = clayGeo.attributes.position.array, na = clayGeo.attributes.normal.array;
  let v = 0;
  for (let i = 0; i <= SEG; i++) {
    const s = SIN[i], c = COS[i];
    // 口緣拉太快會歪歪的（只有口緣附近上下起伏）
    const wob = clay.wobble * (Math.sin(3 * PHI[i] + clay.phase) * 0.7 + Math.sin(5 * PHI[i] + clay.phase * 2) * 0.3);
    for (let j = 0; j < PTS; j++, v += 3) {
      const p = profile[j];
      pa[v] = p.x * s; pa[v + 1] = p.y + wob * rimW[j]; pa[v + 2] = p.x * c;
      na[v] = nx[j] * s; na[v + 1] = ny[j]; na[v + 2] = nx[j] * c;
    }
  }
  clayGeo.attributes.position.needsUpdate = true;
  clayGeo.attributes.normal.needsUpdate = true;
  clayGeo.computeBoundingSphere();
}
// 濕陶土的貼圖：一圈一圈的拉坯紋，加一點指痕（轉起來才看得出在轉）
const clayTex = canvasTexture(256, 512, (x, w, h) => {
  x.fillStyle = '#ffffff'; x.fillRect(0, 0, w, h);
  for (let y = 0; y < h; y += 3) { const k = Math.sin(y * 0.21) * 0.5 + Math.sin(y * 0.047) * 0.5; x.fillStyle = k > 0 ? \`rgba(255,255,255,\${k * 0.25})\` : \`rgba(90,50,30,\${-k * 0.13})\`; x.fillRect(0, y, w, 3); }
  for (let i = 0; i < 14; i++) { x.fillStyle = \`rgba(80,45,25,\${0.05 + Math.random() * 0.06})\`; x.beginPath(); x.ellipse(Math.random() * w, Math.random() * h, 6 + Math.random() * 14, 2 + Math.random() * 3, 0, 0, Math.PI * 2); x.fill(); }
});
// 濕的陶土滑亮（泥漿的反光）；捏完陰乾就變淺、變霧面
const DRY_COLOR = CLAY_COLOR.clone().lerp(new THREE.Color('#efe2cf'), 0.4);
const wetClay = new THREE.MeshPhysicalMaterial({ color: CLAY_COLOR, map: clayTex, roughness: 0.26, clearcoat: 0.8, clearcoatRoughness: 0.15, envMap: ROOM, envMapIntensity: 0.6 });
function clayLook(dry) {
  wetClay.color.copy(CLAY_COLOR).lerp(DRY_COLOR, dry);
  wetClay.roughness = 0.26 + 0.66 * dry;
  wetClay.clearcoat = 0.8 * (1 - dry);
}
async function dryOut(seconds) {
  const k = { d: 0 };
  const stop = larch.onUpdate(() => clayLook(k.d));
  await larch.tween(k, { d: 1 }, seconds, 'inOut');
  stop();
  clayLook(1);
}
const clayMesh = new THREE.Mesh(clayGeo, wetClay);
clayMesh.castShadow = true; clayMesh.receiveShadow = true;
const pot = new THREE.Group(); // 陶土跟著轉盤轉；送進窯、放上展示台都是搬這個
pot.add(clayMesh);
pot.position.copy(BASE);
larch.scene.add(pot);
updateClay();

// ── 手（手指）與碰到的那一圈
const fingerMat = new THREE.MeshStandardMaterial({ color: '#f4c8a6', roughness: 0.55, transparent: true, opacity: 0.95 });
const finger = new THREE.Mesh(new THREE.CapsuleGeometry(0.032 * U, 0.2 * U, 6, 14), fingerMat);
finger.rotation.z = Math.PI / 2;
finger.castShadow = true;
const nail = new THREE.Mesh(new THREE.SphereGeometry(0.02 * U, 12, 8), new THREE.MeshStandardMaterial({ color: '#fde3d6', roughness: 0.3 }));
const hand = new THREE.Group();
hand.add(finger, nail);
hand.visible = false;
larch.scene.add(hand);
const touchRing = new THREE.Mesh(new THREE.TorusGeometry(1, 0.012, 6, 72), new THREE.MeshBasicMaterial({ color: new THREE.Color('#fff7e0').multiplyScalar(1.4), transparent: true, opacity: 0.8, toneMapped: false, depthWrite: false }));
touchRing.rotation.x = Math.PI / 2;
touchRing.visible = false;
larch.scene.add(touchRing);

// ── 鏡頭（自己控制：拉坯特寫、去窯邊、展示台）
const cam = { px: 0, py: 0, pz: 0, tx: 0, ty: 0, tz: 0 };
function shotFor(name) {
  const portrait = larch.camera.aspect < 1;
  const back = portrait ? 0.8 / larch.camera.aspect : 1;
  if (name === 'wide') return { px: 1.9, py: 2.0, pz: 3.7, tx: -0.5, ty: 0.8, tz: -0.9 };
  // 拉坯特寫：從右前方斜斜看，窗戶的夕陽在陶土後面
  if (name === 'throw') return { px: BASE.x + 0.7 * U * back, py: BASE.y + 0.78 * U * back, pz: BASE.z + 1.82 * U * back, tx: BASE.x, ty: BASE.y + 0.42 * U, tz: BASE.z };
  if (name === 'glaze') return { px: BASE.x + 0.35 * U, py: BASE.y + 0.6 * U * back, pz: BASE.z + 1.75 * U * back, tx: BASE.x, ty: BASE.y + 0.3 * U + (portrait ? -0.2 : 0), tz: BASE.z };
  if (name === 'kiln') { const eye = kiln.localToWorld(new THREE.Vector3(-0.9, 1.45, 3.3 * back)), look = kiln.localToWorld(new THREE.Vector3(0.1, 0.95, 0)); return { px: eye.x, py: eye.y, pz: eye.z, tx: look.x, ty: look.y, tz: look.z }; }
  if (name === 'show' && portrait) {
    // 直的手機：分數卡在上面、選項在下面，作品放大擺在中間那一段
    const tan = Math.tan(larch.camera.fov * Math.PI / 360), H = clay.h + 0.1 * U, R = Math.max(...clay.r) + 0.05 * U;
    const d = Math.max(H / (0.4 * 2 * tan), 2 * R / (0.72 * 2 * tan * larch.camera.aspect));
    return { px: SHOW.x - 0.15 * d, py: SHOW.y + H * 0.5 + 0.3 * d, pz: SHOW.z + d, tx: SHOW.x, ty: SHOW.y + H * 0.5 - 0.06 * d * tan, tz: SHOW.z };
  }
  if (name === 'show') { const d = (1.35 + clay.h * 1.2) * back; return { px: SHOW.x - 0.15 * d, py: SHOW.y + 0.32 * d + clay.h * 0.3, pz: SHOW.z + d, tx: SHOW.x - (portrait ? 0 : 0.18 * d), ty: SHOW.y + clay.h * 0.42 - (portrait ? 0.1 : 0.12 * d), tz: SHOW.z }; }
  return cam;
}
const setCam = (s) => Object.assign(cam, s);
const moveCam = (name, seconds, ease = 'inOut') => larch.tween(cam, shotFor(name), seconds, ease);
let camGoal = null; // 工作台：鏡頭慢慢靠過去（介面高度變了也會跟著調）
larch.onUpdate((dt) => {
  if (camGoal) { const k = 1 - Math.exp(-dt * 3.2); for (const key in camGoal) cam[key] += (camGoal[key] - cam[key]) * k; }
  larch.camera.position.set(cam.px, cam.py, cam.pz); larch.camera.lookAt(cam.tx, cam.ty, cam.tz);
});

// ── 拉坯：手的位置、怎麼捏
const handState = { y: 0, r: 0, side: 1, active: false, py: 0, pr: 0, key: false, seen: false, push: 0 };
let phase = 'intro';
let spin = 0, spinGoal = null; // 轉盤每秒轉幾圈（工作台上慢慢轉到 spinGoal）
const sway = { at: null, t: 0 }; // 展示台上：好看的那一面對著鏡頭，左右輕輕擺
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), plane = new THREE.Plane(), hit = new THREE.Vector3(), toCam = new THREE.Vector3(), side = new THREE.Vector3();
/** 手指在畫面上的位置 → 穿過陶土中心、面向鏡頭的那一片平面上：高度與離中心多遠。 */
function pointerToHand(x, y) {
  toCam.set(larch.camera.position.x - BASE.x, 0, larch.camera.position.z - BASE.z).normalize();
  side.set(toCam.z, 0, -toCam.x); // 鏡頭的右手邊
  plane.setFromNormalAndCoplanarPoint(toCam, BASE);
  ndc.set(x, y);
  ray.setFromCamera(ndc, larch.camera);
  if (!ray.ray.intersectPlane(plane, hit)) return false;
  const along = (hit.x - BASE.x) * side.x + (hit.z - BASE.z) * side.z;
  handState.y = larch.clamp(hit.y - BASE.y, -0.1, MAX_H + 0.3);
  handState.r = Math.abs(along);
  handState.side = along >= 0 ? 1 : -1;
  return true;
}
const ringAt = (y) => larch.clamp(Math.round(y / clay.h * (RINGS - 1)), 0, RINGS - 1);
const radiusAt = (y) => clay.r[ringAt(y)];
let trimmedHint = false, raiseHint = false;
/** 捏一格：回傳有沒有改到形狀。 */
function shape(dt) {
  const dy = handState.y - handState.py;
  const lift = handState.key ? handState.push : dy; // 鍵盤：照按的方向算（手被限制在口緣附近）
  handState.py = handState.y; handState.pr = handState.r;
  if (!handState.active) { clay.pinch = 0; return false; }
  const H = clay.h, r = clay.r, top = r[RINGS - 1];
  let changed = false;
  // 在頂端往上拖：把陶土拉高（拉太快口緣會歪）
  if (lift > 0 && handState.y > H - 0.1 * U && handState.y < H + 0.25 * U && handState.r < top + REACH && handState.r > top - 0.25 * U) {
    const grow = Math.min(lift * 0.6, MAX_H - H);
    if (grow > 0.0005) {
      clay.h += grow;
      clay.wobble = Math.min(0.05 * U, clay.wobble + grow * 0.05);
      for (let i = 0; i < RINGS; i++) r[i] = Math.max(MIN_R, r[i] - grow * 0.1 * (i / (RINGS - 1))); // 拉高會變細一點
      changed = true;
      if (!raiseHint) { raiseHint = true; larch.ui.toast('往上拉，越拉越高！'); }
    }
  }
  // 從口緣上方往下壓：變矮
  if (lift < 0 && handState.y > H - 0.02 * U && Math.abs(handState.r - top) < 0.1 * U) {
    const shrink = Math.min(-lift * 0.5, clay.h - MIN_H);
    if (shrink > 0.0005) { clay.h -= shrink; changed = true; }
  }
  // 輕輕扶著口緣：修平
  if (Math.abs(handState.y - H) < 0.07 * U && Math.abs(handState.r - top) < 0.07 * U && Math.abs(dy) < 0.004 && clay.wobble > 0.002) {
    clay.wobble *= Math.exp(-dt * 2.2);
    if (!trimmedHint && clay.wobble < 0.01) { trimmedHint = true; larch.ui.toast('口緣修平了'); }
  }
  // 那個高度附近的幾圈：手在裡面就壓進去、在外面附近就被拉出來
  const kIn = 1 - Math.exp(-dt * 9), kOut = 1 - Math.exp(-dt * 4), sigma = 0.11 * U;
  let pinched = false;
  for (let i = 0; i < RINGS; i++) {
    const y = i / (RINGS - 1) * clay.h, w = Math.exp(-(((y - handState.y) / sigma) ** 2));
    if (w < 0.02) continue;
    const want = handState.r < r[i] ? handState.r : handState.r < r[i] + REACH ? handState.r : r[i];
    if (want === r[i]) continue;
    r[i] += (want - r[i]) * w * (want < r[i] ? kIn : kOut);
    if (r[i] < MIN_R) { r[i] = MIN_R; if (w > 0.6 && want < MIN_R) pinched = true; }
    changed = true;
  }
  // 太細還一直壓：上面那段塌下來
  clay.pinch = pinched ? clay.pinch + dt : 0;
  if (clay.pinch > 0.4) collapse();
  if (changed) settle(0.15);
  return changed;
}
/** 整形：不讓陶土變成奇怪的形狀（底部要站得住、往外翻太多會垮）。 */
function settle(amount) {
  const r = clay.r, dyRing = clay.h / (RINGS - 1);
  for (let i = 1; i < RINGS - 1; i++) r[i] += (r[i - 1] + r[i + 1] - 2 * r[i]) * amount * 0.5;
  for (let i = 0; i < RINGS; i++) {
    if (i < 3) r[i] = Math.max(r[i], FOOT);
    if (i > 0) r[i] = Math.min(r[i], r[i - 1] + 1.7 * dyRing);
    r[i] = larch.clamp(r[i], MIN_R, MAX_R);
  }
}
function collapse() {
  clay.pinch = 0;
  clay.collapses++;
  const keep = Math.max(MIN_H, clay.h * 0.8);
  // 細的那一段往下垮：高度變矮、那裡變粗、口緣歪掉
  const i0 = ringAt(handState.y);
  for (let i = Math.max(0, i0 - 3); i < RINGS; i++) clay.r[i] += 0.035 * U * Math.exp(-((i - i0) ** 2) / 8);
  clay.h = keep;
  clay.wobble = Math.min(0.05 * U, clay.wobble + 0.02 * U);
  larch.sound('break', 0.6);
  larch.shake(0.1, 0.25);
  larch.ui.toast('太細了，塌下來一點！');
}

/** 手指的模型：指尖碰著手的位置，從鏡頭右手邊（或左邊）伸過來。 */
function placeHand() {
  if (!(phase === 'throw' && (handState.active || handState.key))) { hand.visible = false; touchRing.visible = false; return; }
  toCam.set(larch.camera.position.x - BASE.x, 0, larch.camera.position.z - BASE.z).normalize();
  side.set(toCam.z, 0, -toCam.x);
  const len = 0.13 * U, s = handState.side;
  hand.visible = true;
  hand.position.set(BASE.x + side.x * s * (handState.r + len), BASE.y + handState.y, BASE.z + side.z * s * (handState.r + len));
  hand.rotation.y = Math.atan2(-side.z, side.x);
  finger.position.set(0, 0, 0);
  nail.position.set(-len * 0.85, 0.015 * U, 0);
  finger.rotation.set(0, 0, Math.PI / 2);
  hand.scale.x = s; // 左手邊的時候整隻翻過來
  fingerMat.opacity = handState.active ? 0.97 : 0.5;
  const touching = handState.active && handState.y >= -0.02 && handState.y <= clay.h + 0.06 * U && handState.r < radiusAt(handState.y) + REACH;
  touchRing.visible = touching;
  if (touching) {
    const rr = radiusAt(handState.y);
    touchRing.position.set(BASE.x, BASE.y + larch.clamp(handState.y, 0, clay.h), BASE.z);
    touchRing.scale.set(rr + 0.004, rr + 0.004, 1);
  }
}

// ── 現在像什麼、打分數
const TYPES = {
  plate: { name: '盤子', h: [0.1, 0.24] },
  bowl: { name: '碗', h: [0.26, 0.5] },
  cup: { name: '杯子', h: [0.45, 0.75] },
  jar: { name: '圓肚罐', h: [0.5, 0.85] },
  vase: { name: '花瓶', h: [0.75, 1.15] },
  tube: { name: '筆筒', h: [0.7, 1.15] },
  lump: { name: '陶土塊', h: [0.3, 0.6] },
};
function features() {
  const r = clay.r;
  let rMax = 0, iMax = 0;
  for (let i = 0; i < RINGS; i++) if (r[i] > rMax) { rMax = r[i]; iMax = i; }
  const H = clay.h / U, top = r[RINGS - 1], bottom = r[2];
  return { H, rMax, ratio: clay.h / (2 * rMax), neck: top / rMax, flare: top / bottom, belly: iMax / (RINGS - 1), straight: Math.abs(top - bottom) / rMax };
}
function classify(f) {
  if (f.ratio < 0.3 && f.flare > 1.05) return 'plate';
  if (f.ratio > 0.4 && f.ratio < 0.8 && f.neck > 0.86 && f.flare < 1.05 && clay.h < 0.45 * U) return 'lump'; // 還沒怎麼捏
  if (f.neck < 0.74 && f.ratio > 0.95) return 'vase';
  if (f.neck < 0.8 && f.ratio > 0.45) return 'jar';
  if (f.ratio < 0.75 && f.flare > 1.12) return 'bowl';
  if (f.ratio >= 0.6 && f.ratio < 1.7 && f.straight < 0.35) return 'cup';
  if (f.ratio >= 1.7 && f.straight < 0.35) return 'tube';
  if (f.ratio < 0.75 && f.flare > 0.98) return 'bowl';
  return 'lump';
}
const near = (v, a, b, soft) => (v >= a && v <= b ? 1 : Math.max(0, 1 - (v < a ? a - v : v - b) / soft));
function judge() {
  const f = features(), type = classify(f), t = TYPES[type], r = clay.r;
  // 勻稱：輪廓有多平順（凹凹凸凸的地方越少越好）
  let bump = 0;
  for (let i = 1; i < RINGS - 1; i++) bump += Math.abs(r[i - 1] - 2 * r[i] + r[i + 1]);
  const smooth = larch.clamp(1 - (bump / U - 0.05) / 0.25, 0, 1);
  // 高度：這種器形該有的高度
  const height = near(f.H, t.h[0], t.h[1], 0.25);
  // 口緣：平不平、最上面幾圈順不順
  let rimBump = 0;
  for (let i = RINGS - 5; i < RINGS - 1; i++) rimBump += Math.abs(r[i - 1] - 2 * r[i] + r[i + 1]);
  const rim = larch.clamp(1 - clay.wobble / (0.035 * U), 0, 1) * larch.clamp(1 - rimBump / U / 0.06, 0.3, 1);
  // 結實：有沒有塌過、哪裡太薄
  let thinnest = Infinity; for (let i = 0; i < RINGS; i++) thinnest = Math.min(thinnest, r[i]);
  const sturdy = larch.clamp(1 - clay.collapses * 0.3 - (thinnest < MIN_R * 1.3 ? 0.25 : 0), 0, 1);
  // 像不像：跟這種器形的樣子比
  const like = {
    plate: near(f.ratio, 0.1, 0.25, 0.15) * near(f.flare, 1.4, 3, 0.6),
    bowl: near(f.ratio, 0.32, 0.55, 0.25) * near(f.flare, 1.4, 2.6, 0.5) * near(f.neck, 0.9, 1, 0.3),
    cup: near(f.ratio, 0.8, 1.3, 0.4) * near(f.straight, 0, 0.18, 0.25),
    jar: near(f.neck, 0.5, 0.75, 0.25) * near(f.belly, 0.3, 0.65, 0.3) * near(f.ratio, 0.7, 1.2, 0.4),
    vase: near(f.neck, 0.3, 0.62, 0.25) * near(f.belly, 0.15, 0.55, 0.3) * near(f.ratio, 1.2, 2.2, 0.5),
    tube: near(f.ratio, 1.7, 3, 0.5) * near(f.straight, 0, 0.15, 0.2),
    lump: 0.2,
  }[type];
  const parts = [['勻稱', smooth, 25], ['高度', height, 20], ['口緣', rim, 20], ['結實', sturdy, 15], ['像不像', like, 20]];
  const score = Math.round(parts.reduce((s, [, v, w]) => s + v * w, 0));
  const word = type === 'lump' ? '' : score >= 85 ? '完美的' : score >= 70 ? '漂亮的' : score >= 50 ? '可愛的' : '有個性的';
  return { type, word, name: \`\${word}\${t.name}\`, score, parts };
}

// ── 介面：時間、現在像什麼、完成按鈕
function updateHud(left) {
  larch.ui.bar('time', left / SECONDS, { at: 'top', label: \`拉坯時間 \${Math.ceil(left)} 秒\`, color: left < 10 ? '#f45b65' : '#2fd88e' });
}
let looksTimer = 0;
function updateLooks(dt) {
  looksTimer -= dt;
  if (looksTimer > 0) return;
  looksTimer = 0.4;
  larch.ui.text('looks', \`現在像：\${TYPES[classify(features())].name}\`, { at: larch.camera.aspect < 1 ? 'top' : 'top-left', size: 'small' });
}

// ── 每一格
let timeLeft = SECONDS, finishNow = null, shapedFor = 0;
larch.onUpdate((dt, t) => {
  // 轉盤
  if (spinGoal !== null) spin += (spinGoal - spin) * (1 - Math.exp(-dt * 4));
  const turn = spin * Math.PI * 2 * dt;
  pot.rotation.y += turn; head.rotation.y += turn;
  if (sway.at !== null) { sway.t += dt; pot.rotation.y = sway.at + Math.sin(sway.t * 0.7) * 0.32; }
  if (phase === 'glaze' || phase === 'paint' || phase === 'decorate') studioFrame(dt);
  if (paintDirty) { paintDirty = false; paintTex.needsUpdate = true; } // 這一格畫了東西才重新上傳貼圖
  if (phase !== 'throw') { placeHand(); return; }
  // 輸入：滑鼠／手指按著就是手；不然用鍵盤
  const p = larch.input.pointer;
  if (p.down) { handState.key = false; handState.active = pointerToHand(p.x, p.y); if (!handState.seen) { handState.py = handState.y; handState.pr = handState.r; } handState.seen = true; }
  else {
    handState.seen = false;
    const ax = larch.input.axis;
    if (ax.x || ax.y || larch.input.down('Space')) {
      if (!handState.key) { handState.key = true; handState.side = 1; handState.y = clay.h * 0.6; handState.r = radiusAt(clay.h * 0.6) + 0.08 * U; handState.py = handState.y; handState.pr = handState.r; }
      // 鍵盤的手不會離開陶土太遠（最高到口緣上面一點）；往上按著空白鍵就一直拉高
      handState.push = ax.y * dt * 0.45 * U;
      handState.y = larch.clamp(handState.y + handState.push, 0, clay.h + 0.1 * U);
      handState.r = larch.clamp(handState.r + ax.x * dt * 0.3 * U, 0.02, MAX_R + 0.3 * U);
    } else handState.push = 0;
    handState.active = handState.key && larch.input.down('Space');
  }
  if (shape(dt)) {
    updateClay();
    // 捏了一陣子就把說明收起來
    shapedFor += dt;
    if (shapedFor > 3 && shapedFor - dt <= 3) larch.ui.remove('hint');
  }
  placeHand();
  updateLooks(dt);
  timeLeft = Math.max(0, timeLeft - dt);
  updateHud(timeLeft);
  if (timeLeft <= 0 && finishNow) finishNow('time');
});

// ── 釉色
const GLAZES = [
  { name: '青瓷', color: '#8dbfa6' }, { name: '霽藍', color: '#2f4f9e' }, { name: '胭脂紅', color: '#c3415a' },
  { name: '鵝黃', color: '#f0c45a' }, { name: '象牙白', color: '#f3ecdf' }, { name: '天目黑', color: '#2f2421' },
];
let glaze = 0, twoTone = false;
const raw = new THREE.Color(), tmp = new THREE.Color();
/** 上釉：每個頂點一個顏色（底部一圈不上釉、雙色就是下半部浸另一種釉）。fired：燒好之後顏色比較深、比較亮。 */
function paintGlaze(fired) {
  const main = new THREE.Color(GLAZES[glaze].color), second = new THREE.Color(glaze === 5 ? GLAZES[4].color : GLAZES[5].color);
  if (!fired) { main.lerp(new THREE.Color('#ffffff'), 0.38); second.lerp(new THREE.Color('#ffffff'), 0.38); } // 生釉粉粉的
  raw.copy(CLAY_COLOR).multiplyScalar(fired ? 0.78 : 1);
  const col = clayGeo.attributes.color.array, pa = clayGeo.attributes.position.array;
  const H = clay.h;
  const soft = 0.035 * U;
  for (let i = 0, v = 0; i <= SEG; i++) {
    const dip = H * (0.42 + 0.04 * Math.sin(PHI[i] * 3 + 1) + 0.02 * Math.sin(PHI[i] * 7)); // 浸釉線有一點波浪
    for (let j = 0; j < PTS; j++, v += 3) {
      const y = pa[v + 1], outer = j > 0 && j <= RINGS + 1;
      tmp.copy(main);
      if (twoTone && outer) tmp.lerp(second, 1 - smoothstep(dip - soft, dip + soft, y)); // 下半部浸另一種釉
      if (outer) tmp.lerp(raw, 1 - smoothstep(0.02 * U, 0.05 * U, y));                   // 底足不上釉
      col[v] = tmp.r; col[v + 1] = tmp.g; col[v + 2] = tmp.b;
    }
  }
  clayGeo.attributes.color.needsUpdate = true;
}
const glazeTex = canvasTexture(64, 256, (x, w, h) => {
  x.fillStyle = '#ffffff'; x.fillRect(0, 0, w, h);
  for (let y = 0; y < h; y += 2) { const k = Math.sin(y * 0.3) * 0.5 + 0.5; x.fillStyle = \`rgba(0,0,0,\${k * 0.05})\`; x.fillRect(0, y, w, 2); }
});

// ── 彩繪：顏料畫在一張貼圖上（橫的是繞一圈的角度；直的是沿著表面從底部量過口緣、一路到內底），疊在釉色上面
const PAINTS = [
  { name: '青花藍', color: '#24418f' }, { name: '鐵紅', color: '#b0391f' }, { name: '櫻花粉', color: '#e69aab' }, { name: '鵝黃', color: '#f2c64a' }, { name: '草綠', color: '#5b8f4b' },
  { name: '天青', color: '#84bddb' }, { name: '葡萄紫', color: '#6b4a97' }, { name: '描金', color: '#c99a3c' }, { name: '白化妝土', color: '#f6f0e3' }, { name: '墨黑', color: '#241d1a' },
];
const BRUSHES = [{ name: '細筆', size: 0.01 }, { name: '中筆', size: 0.022 }, { name: '粗筆', size: 0.048 }]; // 筆寬（照拉坯機大小縮放）
const PAINT_W = 1024, PAINT_H = 1024;
const paintCanvas = document.createElement('canvas');
paintCanvas.width = PAINT_W; paintCanvas.height = PAINT_H;
const pctx = paintCanvas.getContext('2d');
function paintTexture(canvas) {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.premultiplyAlpha = true; // 筆畫邊緣不會出現一圈黑邊
  t.wrapS = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}
const paintTex = paintTexture(paintCanvas);
const paintUv = new THREE.BufferAttribute(new Float32Array(clayGeo.attributes.position.count * 2), 2);
clayGeo.setAttribute('paintUv', paintUv);
clayGeo.setAttribute('uv1', paintUv); // 射線打到陶坯時直接拿到同一組座標
const pv = new Float32Array(PTS);
let paintLen = 1, paintDirty = false;
/** 形狀定了之後量一次：輪廓上每一點離底部多遠（沿著表面量），寫進彩繪的貼圖座標。 */
function measurePaint() {
  fillProfile();
  let s = 0;
  for (let j = 1; j < PTS; j++) { s += profile[j].distanceTo(profile[j - 1]); pv[j] = s; }
  paintLen = Math.max(s, 0.01);
  for (let j = 0; j < PTS; j++) pv[j] /= paintLen;
  const a = paintUv.array;
  for (let i = 0, k = 0; i <= SEG; i++) for (let j = 0; j < PTS; j++, k += 2) { a[k] = i / SEG; a[k + 1] = pv[j]; }
  paintUv.needsUpdate = true;
}
/** 輪廓上第 jf 點（可以有小數）：半徑、高度、法線、貼圖的 v。 */
function atJ(jf) {
  const j = larch.clamp(jf, 0, PTS - 1.001), j0 = Math.floor(j), t = j - j0, a = profile[j0], b = profile[j0 + 1];
  return { r: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, nx: nx[j0] + (nx[j0 + 1] - nx[j0]) * t, ny: ny[j0] + (ny[j0 + 1] - ny[j0]) * t, v: pv[j0] + (pv[j0 + 1] - pv[j0]) * t };
}
function jAtV(v) {
  let lo = 0, hi = PTS - 1;
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (pv[m] <= v) lo = m; else hi = m; }
  return lo + larch.clamp((v - pv[lo]) / Math.max(1e-6, pv[hi] - pv[lo]), 0, 1);
}
/** 外壁的高度比例（0 底、1 口緣；1～2 越過口緣沿著內壁往下，2 是內底）→ 輪廓上第幾點。 */
const jOfH = (h) => (h <= 1 ? 2 + larch.clamp(h, 0, 1) * (RINGS - 1) : RINGS + 1 + Math.min(1, h - 1) * (RINGS + 3));
const frac = (x) => x - Math.floor(x);

/** 釉的材質疊上彩繪那一層（顏料蓋在釉色上；chalk：還沒燒的顏料有一點粉）。 */
function withPaint(mat, chalk, tex) {
  const uniforms = { paintMap: { value: tex }, paintChalk: { value: chalk } };
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, uniforms);
    sh.vertexShader = 'attribute vec2 paintUv;\\nvarying vec2 vPaintUv;\\n' + sh.vertexShader.replace('#include <uv_vertex>', '#include <uv_vertex>\\n\\tvPaintUv = paintUv;');
    sh.fragmentShader = 'uniform sampler2D paintMap;\\nuniform float paintChalk;\\nvarying vec2 vPaintUv;\\n' + sh.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\\n\\tvec4 paintC = texture2D(paintMap, vPaintUv);\\n\\tpaintC.rgb = mix(paintC.rgb, vec3(paintC.a), paintChalk);\\n\\tdiffuseColor.rgb = diffuseColor.rgb * (1.0 - paintC.a) + paintC.rgb;');
  };
  mat.customProgramCacheKey = () => 'pot-paint';
  return mat;
}
const FIRED = { vertexColors: true, map: glazeTex, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.06, envMap: ROOM, envMapIntensity: 1 };
const rawGlaze = withPaint(new THREE.MeshStandardMaterial({ vertexColors: true, map: glazeTex, roughness: 0.92 }), 0.14, paintTex);
const firedGlaze = withPaint(new THREE.MeshPhysicalMaterial(FIRED), 0, paintTex);

// 每一筆記下來（復原時整張重畫）：{ c 顏色, s 筆寬, pts: [[u, v] 或 null（筆離開陶坯）] } 或色帶 { c, band: [v0, v1] }
const art = { strokes: [], cur: null, paintUndo: [], color: 0, brush: 1, wheel: true, decos: [], decoUndo: [], kind: 0, decoColor: 2, decoSize: 1, decoWheel: false, leafFlip: 1, press: null };
/** 畫一段（u 不繞回 0～1，跨過接縫也連得起來）：照那一圈的半徑換算，筆在陶坯上永遠是圓的。 */
function drawSeg(ctx, col, size, a, b) {
  const r = Math.max(0.015 * U, atJ(jAtV((a[1] + b[1]) / 2)).r), C = Math.PI * 2 * r, k = Math.floor(Math.min(a[0], b[0]));
  const x0 = (a[0] - k) * C, y0 = (1 - a[1]) * paintLen, x1 = (b[0] - k) * C, y1 = (1 - b[1]) * paintLen;
  ctx.fillStyle = ctx.strokeStyle = col;
  ctx.lineWidth = size; ctx.lineCap = 'round';
  for (let off = -1; off <= 1; off++) {
    ctx.setTransform(PAINT_W / C, 0, 0, PAINT_H / paintLen, off * PAINT_W, 0);
    ctx.beginPath();
    if (Math.hypot(x1 - x0, y1 - y0) < size * 0.05) { ctx.arc(x0, y0, size / 2, 0, Math.PI * 2); ctx.fill(); }
    else { ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); }
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  paintDirty = true;
}
function drawStroke(ctx, st) {
  if (st.band) { ctx.fillStyle = st.c; ctx.fillRect(0, (1 - Math.max(...st.band)) * PAINT_H, PAINT_W, Math.abs(st.band[1] - st.band[0]) * PAINT_H); paintDirty = true; return; }
  let prev = null;
  for (const p of st.pts) { if (p) drawSeg(ctx, st.c, st.s, prev || p, p); prev = p; }
}
function repaint() { pctx.clearRect(0, 0, PAINT_W, PAINT_H); for (const st of art.strokes) drawStroke(pctx, st); paintDirty = true; }
function beginStroke(c = PAINTS[art.color].color, size = BRUSHES[art.brush].size * U) {
  endStroke();
  art.cur = { c, s: size, pts: [] };
  art.strokes.push(art.cur); art.paintUndo.push({ add: art.cur });
  larch.sound('swoosh', 0.12);
  studioUi?.refresh();
}
/** 筆碰到的那一點（null：筆離開陶坯，下一點不連過去）。 */
function strokeTo(s) {
  const st = art.cur; if (!st) return;
  const last = st.pts[st.pts.length - 1];
  if (!s) { if (last) st.pts.push(null); return; }
  let u = s.u;
  if (last) { const du = u - frac(last[0]); u = last[0] + du - Math.round(du); if (Math.abs(u - last[0]) < 2e-4 && Math.abs(s.v - last[1]) < 2e-4) return; }
  const pt = [u, s.v];
  st.pts.push(pt);
  drawSeg(pctx, st.c, st.s, last || pt, pt);
}
function endStroke() {
  const st = art.cur; art.cur = null;
  if (!st) return;
  if (!st.band && !st.pts.some(Boolean)) { art.strokes.splice(art.strokes.indexOf(st), 1); art.paintUndo = art.paintUndo.filter((e) => e.add !== st); }
  studioUi?.refresh();
}
function undoPaint() {
  endStroke();
  const e = art.paintUndo.pop(); if (!e) return;
  if (e.add) art.strokes.splice(art.strokes.indexOf(e.add), 1); else art.strokes = e.clear;
  repaint(); larch.sound('click', 0.4); studioUi?.refresh();
}
function clearPaint() {
  endStroke();
  if (!art.strokes.length) return;
  art.paintUndo.push({ clear: art.strokes }); art.strokes = [];
  repaint(); studioUi?.refresh();
}

// ── 小裝飾：陶土捏的小花、葉子、愛心、星星、圓點，站在口緣的小鳥和小貓，還有把手（都在這裡用形狀拼出來）
const DECOS = [
  { id: 'flower', name: '小花' }, { id: 'leaf', name: '葉子' }, { id: 'heart', name: '愛心' }, { id: 'star', name: '星星' },
  { id: 'dot', name: '圓點' }, { id: 'bird', name: '小鳥', rim: true }, { id: 'cat', name: '小貓', rim: true }, { id: 'handle', name: '把手' },
];
const DECO_SIZES = [{ name: '小', k: 0.7 }, { name: '中', k: 1 }, { name: '大', k: 1.4 }];
const DECO_S = 0.055 * U, DECO_MAX = 40;
const UP = new THREE.Vector3(0, 1, 0), WHITE = new THREE.Color('#ffffff');
const ball = new THREE.SphereGeometry(1, 16, 12);
const M = (x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = sx, sz = sx) => new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(sx, sy, sz));
/** 幾個形狀併成一個（只留位置和法線）。 */
function merge(parts) {
  const gs = parts.map(([g, m]) => { const c = g.index ? g.toNonIndexed() : g.clone(); c.applyMatrix4(m); return c; });
  const pos = new Float32Array(gs.reduce((n, g) => n + g.attributes.position.array.length, 0)), nor = new Float32Array(pos.length);
  let o = 0;
  for (const g of gs) { pos.set(g.attributes.position.array, o); nor.set(g.attributes.normal.array, o); o += g.attributes.position.array.length; g.dispose(); }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3)); out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  out.computeBoundingSphere();
  return out;
}
function flatShape(points) {
  const s = new THREE.Shape();
  points(s);
  return new THREE.ExtrudeGeometry(s, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.11, bevelSize: 0.1, bevelSegments: 3, curveSegments: 14 });
}
/** 每種裝飾的形狀（單位大小）：main 是選的顏色，light 淺一點，gold 金色，dark 眼睛。平的裝飾面向 +z、站著的面向 +x／+z。 */
function buildDeco(id) {
  const ring = (n, f) => Array.from({ length: n }, (_, i) => f(i * Math.PI * 2 / n));
  if (id === 'flower') return { main: merge(ring(5, (a) => [ball, M(Math.sin(a) * 0.5, Math.cos(a) * 0.5, 0.13, 0, 0, -a, 0.34, 0.56, 0.17)])), gold: merge([[ball, M(0, 0, 0.22, 0, 0, 0, 0.27, 0.27, 0.18)]]) };
  if (id === 'leaf') return { main: merge([[ball, M(0, 0, 0.09, 0, 0, 0, 0.36, 0.95, 0.13)], [new THREE.CylinderGeometry(0.035, 0.035, 1.5, 6), M(0, 0, 0.19, 0, 0, 0, 1, 1, 0.6)]]) };
  if (id === 'heart') return { main: merge([[flatShape((s) => s.moveTo(0, -0.95).bezierCurveTo(-0.4, -0.55, -1.05, -0.15, -0.98, 0.35).bezierCurveTo(-0.9, 0.9, -0.2, 1.0, 0, 0.5).bezierCurveTo(0.2, 1.0, 0.9, 0.9, 0.98, 0.35).bezierCurveTo(1.05, -0.15, 0.4, -0.55, 0, -0.95)), M(0, 0, 0.07, 0, 0, 0, 0.6)]]) };
  if (id === 'star') return { main: merge([[flatShape((s) => { for (let i = 0; i < 10; i++) { const a = Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 0.46 : 1; if (i) s.lineTo(Math.cos(a) * r, Math.sin(a) * r); else s.moveTo(Math.cos(a) * r, Math.sin(a) * r); } }), M(0, 0, 0.07, 0, 0, 0, 0.62)]]) };
  if (id === 'dot') return { main: merge([[ball, M(0, 0, 0.05, 0, 0, 0, 0.3, 0.3, 0.22)]]) };
  if (id === 'bird') return {
    main: merge([[ball, M(0, 0.5, 0, 0, 0, 0.15, 0.72, 0.5, 0.5)], [ball, M(0.52, 0.98, 0, 0, 0, 0, 0.36)], [ball, M(-0.74, 0.74, 0, 0, 0, 0.55, 0.42, 0.1, 0.26)]]),
    light: merge([[ball, M(-0.05, 0.62, 0.42, 0.3, 0, 0.2, 0.5, 0.27, 0.1)], [ball, M(-0.05, 0.62, -0.42, -0.3, 0, 0.2, 0.5, 0.27, 0.1)]]),
    gold: merge([[new THREE.ConeGeometry(0.12, 0.3, 10), M(0.96, 0.95, 0, 0, 0, -Math.PI / 2)]]),
    dark: merge([[ball, M(0.76, 1.06, 0.2, 0, 0, 0, 0.055)], [ball, M(0.76, 1.06, -0.2, 0, 0, 0, 0.055)]]),
  };
  if (id === 'cat') return {
    main: merge([[ball, M(0, 0.62, 0, 0, 0, 0, 0.55, 0.62, 0.48)], [ball, M(0, 1.36, 0.06, 0, 0, 0, 0.46, 0.42, 0.42)], [new THREE.ConeGeometry(0.15, 0.3, 8), M(0.25, 1.73, 0.04, 0, 0, -0.32)], [new THREE.ConeGeometry(0.15, 0.3, 8), M(-0.25, 1.73, 0.04, 0, 0, 0.32)],
      [new THREE.TorusGeometry(0.5, 0.085, 6, 18, Math.PI * 1.1), M(0, 0.12, 0, -Math.PI / 2, 0, 0)], [ball, M(0.2, 0.08, 0.36, 0, 0, 0, 0.15, 0.1, 0.17)], [ball, M(-0.2, 0.08, 0.36, 0, 0, 0, 0.15, 0.1, 0.17)]]),
    light: merge([[ball, M(0, 1.25, 0.42, 0, 0, 0, 0.17, 0.12, 0.08)]]),
    dark: merge([[ball, M(0.16, 1.42, 0.42, 0, 0, 0, 0.06)], [ball, M(-0.16, 1.42, 0.42, 0, 0, 0, 0.06)], [ball, M(0, 1.31, 0.49, 0, 0, 0, 0.04)]]),
  };
  // 把手：半圈，兩端黏在外壁上（放的時候照外壁的斜度轉）
  return { main: merge([[new THREE.TorusGeometry(1, 0.17, 10, 30, Math.PI), M(0, 0, 0, 0, 0, -Math.PI / 2)]]) };
}
const decoGeo = {};
const decoMats = new Map();
const TONES = { gold: '#d8ac45', dark: '#1f1814' };
const toneColor = (tone, hex) => (tone === 'main' ? hex : tone === 'light' ? \`#\${new THREE.Color(hex).lerp(WHITE, 0.5).getHexString()}\` : TONES[tone]);
/** 裝飾的材質：還沒燒是霧面、淡一點；燒好亮亮的（描金會有金屬光澤）。 */
function decoMat(hex, fired) {
  const key = hex + (fired ? '+' : '-');
  if (!decoMats.has(key)) {
    const gold = hex === PAINTS[7].color || hex === TONES.gold;
    decoMats.set(key, fired
      ? new THREE.MeshPhysicalMaterial({ color: hex, roughness: gold ? 0.3 : 0.16, metalness: gold ? 0.75 : 0, clearcoat: 1, clearcoatRoughness: 0.07, envMap: ROOM, envMapIntensity: 1 })
      : new THREE.MeshStandardMaterial({ color: new THREE.Color(hex).lerp(WHITE, 0.14), roughness: 0.9 }));
  }
  return decoMats.get(key);
}
const ghostMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.7, transparent: true, opacity: 0.55, depthWrite: false });
function makeDeco(id, hex, ghost) {
  const g = new THREE.Group(), parts = decoGeo[id] || (decoGeo[id] = buildDeco(id));
  for (const tone of Object.keys(parts)) {
    const m = new THREE.Mesh(parts[tone], ghost ? ghostMat : decoMat(toneColor(tone, hex), false));
    m.userData.tone = tone;
    m.castShadow = m.receiveShadow = !ghost;
    g.add(m);
  }
  g.userData = { kind: id, color: hex };
  return g;
}
const wobAt = (phi) => clay.wobble * (Math.sin(3 * phi + clay.phase) * 0.7 + Math.sin(5 * phi + clay.phase * 2) * 0.3);
const bx = new THREE.Vector3(), by = new THREE.Vector3(), bz = new THREE.Vector3(), rho = new THREE.Vector3(), basis = new THREE.Matrix4();
/** 把裝飾放到瞄準的那一點：平的貼著表面、往上對齊；小鳥小貓站在口緣；把手兩端黏在外壁上。 */
function orientDeco(obj, s, sizeK) {
  const id = obj.userData.kind, phi = s.u * Math.PI * 2;
  rho.set(Math.sin(phi), 0, Math.cos(phi));
  let k = DECO_S * sizeK;
  const pos = new THREE.Vector3();
  if (id === 'bird' || id === 'cat') {
    k *= 1.55;
    const r = clay.r[RINGS - 1] - WALL * 0.5;
    pos.copy(rho).multiplyScalar(r).setY(clay.h + WALL * 0.42 + wobAt(phi) - 0.04 * k);
    by.copy(UP);
    const out = isLow() ? -0.5 : 0.5; // 高的瓶罐：望向外面；矮的碗盤：探頭看碗裡
    if (id === 'bird') { bx.set(Math.cos(phi), 0, -Math.sin(phi)).multiplyScalar(0.85).addScaledVector(rho, out).normalize(); bz.crossVectors(bx, by); }
    else { bz.copy(rho).multiplyScalar(Math.sign(out)); bx.crossVectors(by, bz); }
  } else if (id === 'handle') {
    const H = clay.h, R0 = Math.min(0.1 * U * sizeK, H * 0.36), lo = R0 + 0.05 * H;
    const y = larch.clamp(s.j <= RINGS + 1 ? atJ(s.j).y : H * 0.55, lo, Math.max(lo, H - R0 - 0.03 * U));
    const rAt = (yy) => { const t = larch.clamp(yy / H, 0, 1) * (RINGS - 1), i = Math.min(RINGS - 2, Math.floor(t)); return clay.r[i] + (clay.r[i + 1] - clay.r[i]) * (t - i); };
    const e = 0.12 * R0, rt = rAt(y + R0) - e, rb = rAt(y - R0) - e, dr = rt - rb, len = Math.hypot(dr, 2 * R0);
    by.copy(rho).multiplyScalar(dr / len).addScaledVector(UP, 2 * R0 / len);
    bx.copy(rho).multiplyScalar(2 * R0 / len).addScaledVector(UP, -dr / len);
    bz.crossVectors(bx, by);
    pos.copy(rho).multiplyScalar((rt + rb) / 2).setY(y);
    k = len / 2;
  } else {
    bz.copy(s.n);
    by.copy(UP).addScaledVector(bz, -bz.y);
    if (by.lengthSq() < 0.04) by.set(Math.cos(phi), 0, -Math.sin(phi)); // 口緣上、內底：沿著圓周擺
    by.normalize();
    bx.crossVectors(by, bz);
    if (id === 'leaf') { const a = 0.55 * art.leafFlip, c = Math.cos(a), sn = Math.sin(a), x = bx.clone(); bx.multiplyScalar(c).addScaledVector(by, sn); by.multiplyScalar(c).addScaledVector(x, -sn); }
    pos.copy(s.p).addScaledVector(bz, -0.03 * k);
  }
  obj.quaternion.setFromRotationMatrix(basis.makeBasis(bx, by, bz));
  obj.position.copy(pos);
  obj.scale.setScalar(k);
}
function addDeco(s, kind = art.kind, hex = PAINTS[art.decoColor].color, sizeK = DECO_SIZES[art.decoSize].k) {
  if (!s) return null;
  if (art.decos.length >= DECO_MAX) { larch.ui.toast('裝飾已經滿滿的了'); return null; }
  const id = DECOS[kind].id, d = makeDeco(id, hex, false);
  orientDeco(d, s, sizeK);
  if (id === 'leaf') art.leafFlip *= -1; // 葉子一左一右
  pot.add(d); art.decos.push(d); art.decoUndo.push({ add: d });
  const to = d.scale.x;
  d.scale.setScalar(to * 0.01);
  larch.tween(d.scale, { x: to, y: to, z: to }, 0.28, 'outBack');
  larch.sound('pop', 0.5);
  studioUi?.refresh();
  return d;
}
function undoDeco() {
  const e = art.decoUndo.pop(); if (!e) return;
  if (e.add) { pot.remove(e.add); art.decos.splice(art.decos.indexOf(e.add), 1); if (e.add.userData.kind === 'leaf') art.leafFlip *= -1; }
  else for (const d of e.clear) { pot.add(d); art.decos.push(d); }
  larch.sound('click', 0.4); studioUi?.refresh();
}
function clearDeco() {
  if (!art.decos.length) return;
  const list = art.decos.splice(0);
  for (const d of list) pot.remove(d);
  art.decoUndo.push({ clear: list }); studioUi?.refresh();
}
function fireDecos() { for (const d of art.decos) d.traverse((m) => { if (m.isMesh) m.material = decoMat(toneColor(m.userData.tone, d.userData.color), true); }); }

// ── 瞄準：滑鼠、手指（射線打在陶坯上）、鍵盤或測試腳本的游標（離鏡頭正面幾度、輪廓第幾點）
const cursor = { a: 0, j: 0, on: false, down: false, scripted: false };
// 鍵盤的游標：高的作品在外壁（h 0 底～1 口緣）；矮的碗盤在對面那一側的內壁（從上面看得到的那一面，h 0 內底～1 口緣）
const kb = { a: 0, h: 0.55, inside: false };
const isLow = () => clay.h < 1.25 * (features().rMax + 0.02 * U);
const pRay = new THREE.Raycaster(), pNdc = new THREE.Vector2();
const camAngle = () => Math.atan2(larch.camera.position.x - BASE.x, larch.camera.position.z - BASE.z);
/** 陶坯自己的座標：角度 u（0～1）＋輪廓第 jf 點 → 一個瞄準點（位置、法線都在 pot 裡）。 */
function sampleAt(u, jf) {
  const q = atJ(jf), phi = u * Math.PI * 2, s = Math.sin(phi), c = Math.cos(phi);
  return { u: frac(u), v: q.v, j: jf, p: new THREE.Vector3(q.r * s, q.y, q.r * c), n: new THREE.Vector3(q.nx * s, q.ny, q.nx * c).normalize() };
}
function potHit(x, y) {
  larch.camera.updateMatrixWorld(); pot.updateMatrixWorld(true);
  pRay.setFromCamera(pNdc.set(x, y), larch.camera);
  const h = pRay.intersectObject(clayMesh, false)[0];
  if (!h || !h.uv1) return null;
  return { u: frac(h.uv1.x), v: h.uv1.y, j: jAtV(h.uv1.y), p: pot.worldToLocal(h.point.clone()), n: h.normal.clone().normalize() };
}
const cursorSample = () => sampleAt((camAngle() + cursor.a - pot.rotation.y) / (Math.PI * 2), cursor.j);

// 畫筆：木頭筆桿、金屬筆箍、沾了顏料的筆尖（筆尖碰到的地方就是畫的地方）
const brushTool = new THREE.Group();
const brushTip = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 16).rotateX(Math.PI).translate(0, 0.5, 0), new THREE.MeshStandardMaterial({ roughness: 0.6 }));
const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(1, 0.92, 1, 16), new THREE.MeshStandardMaterial({ color: '#c8b48c', metalness: 0.85, roughness: 0.3, envMap: ROOM }));
const brushStick = new THREE.Mesh(new THREE.CylinderGeometry(0.0055 * U, 0.0078 * U, 0.26 * U, 14), new THREE.MeshPhysicalMaterial({ color: '#b98c55', roughness: 0.45, clearcoat: 0.6, envMap: ROOM, envMapIntensity: 0.6 }));
brushTool.add(brushTip, ferrule, brushStick);
brushTool.visible = false;
larch.scene.add(brushTool);
function shapeBrush() {
  const r = Math.max(0.0045 * U, BRUSHES[art.brush].size * U * 0.55), h = 0.05 * U, fr = Math.max(r * 1.05, 0.0078 * U);
  brushTip.scale.set(r, h, r);
  ferrule.scale.set(fr, 0.035 * U, fr); ferrule.position.y = h + 0.0175 * U;
  brushStick.position.y = h + 0.035 * U + 0.13 * U;
  brushTip.material.color.set(PAINTS[art.color].color);
}
const wp = new THREE.Vector3(), wn = new THREE.Vector3(), right = new THREE.Vector3(), dir = new THREE.Vector3();
function showBrush(s, down) {
  brushTool.visible = Boolean(s);
  if (!s) return;
  pot.updateMatrixWorld(true);
  wp.copy(s.p).applyMatrix4(pot.matrixWorld); wn.copy(s.n).transformDirection(pot.matrixWorld);
  right.subVectors(larch.camera.position, wp).setY(0).normalize();
  right.crossVectors(UP, right);
  dir.copy(wn).addScaledVector(UP, 0.6).addScaledVector(right, 0.45).normalize();
  brushTool.position.copy(wp).addScaledVector(wn, down ? 0.001 * U : 0.016 * U);
  brushTool.quaternion.setFromUnitVectors(UP, dir);
}
let ghost = null, ghostKey = '';
function showGhost(s) {
  if (!s) { if (ghost) ghost.visible = false; return; }
  const key = \`\${art.kind}|\${art.decoSize}\`;
  if (!ghost || ghostKey !== key) { if (ghost) pot.remove(ghost); ghost = makeDeco(DECOS[art.kind].id, '#ffffff', true); ghostKey = key; pot.add(ghost); }
  ghostMat.color.set(PAINTS[art.decoColor].color);
  ghost.visible = true;
  orientDeco(ghost, s, DECO_SIZES[art.decoSize].k);
}

// ── 工作台每一格：畫畫、轉動作品、預覽裝飾
let mouseAt = '', mouseLive = false;
function studioFrame(dt) {
  const p = larch.input.pointer, tab = phase;
  // 滑鼠動了就改用滑鼠（鍵盤的游標收起來）
  const at = \`\${p.clientX},\${p.clientY}\`;
  if (at !== mouseAt) { mouseAt = at; mouseLive = !larch.phone; if (!cursor.scripted) cursor.on = false; }
  // 鍵盤：方向鍵移動游標、空白鍵畫／貼
  const ax = larch.input.axis, space = larch.input.down('Space');
  if (!cursor.scripted && tab !== 'glaze' && (ax.x || ax.y || space)) {
    cursor.on = true;
    kb.a = larch.clamp(kb.a + (kb.inside ? -ax.x : ax.x) * dt * 1.1, -1.25, 1.25);
    kb.h = larch.clamp(kb.h + ax.y * dt * 0.55, 0, kb.inside ? 1 : 1.06);
    cursor.a = kb.inside ? Math.PI + kb.a : kb.a;
    cursor.j = kb.inside ? RINGS + 3 + (1 - kb.h) * (PTS - RINGS - 4.3) : jOfH(kb.h);
  }
  if (!cursor.scripted) cursor.down = space;
  // 按下去的那一下：按在陶坯上＝畫畫，按在旁邊＝拖曳轉動作品
  if (p.down && !art.press) {
    const paint = tab === 'paint' && potHit(p.x, p.y);
    art.press = { mode: paint ? 'paint' : 'turn', x: p.x, last: p.x, moved: false };
    if (paint) beginStroke();
  }
  if (!p.down && art.press) { if (art.press.mode === 'paint') endStroke(); art.press = null; }
  if (art.press?.mode === 'turn') {
    if (Math.abs(p.x - art.press.x) > 0.02) art.press.moved = true;
    if (art.press.moved) { const d = (p.x - art.press.last) * 2.6; pot.rotation.y += d; head.rotation.y += d; }
    art.press.last = p.x;
  }
  let s = null, painting = false;
  if (art.press?.mode === 'paint') { s = potHit(p.x, p.y); painting = true; }
  else if (cursor.on) { s = cursorSample(); painting = tab === 'paint' && cursor.down; }
  else if (mouseLive && !p.down) s = potHit(p.x, p.y);
  if (tab === 'paint') {
    if (painting) { if (!art.cur) beginStroke(); strokeTo(s); }
    else if (art.cur) endStroke();
    showBrush(s, painting);
  } else showBrush(null);
  if (tab === 'decorate') {
    if (cursor.on && !cursor.scripted && larch.input.pressed('Space')) addDeco(s);
    showGhost(s);
  } else showGhost(null);
}
// 點一下：彩繪點一個點、裝飾貼一個（很快的點擊每一格的輪詢可能沒看到，這裡補上）
larch.input.onTap((tp) => {
  if (phase === 'paint' && !art.cur) { const s = potHit(tp.x, tp.y); if (s) { beginStroke(); strokeTo(s); endStroke(); } }
  else if (phase === 'decorate') addDeco(potHit(tp.x, tp.y));
});

// ── 工作台：上釉 → 彩繪 → 裝飾（分頁可以來回切換），最後送進窯裡燒
const STEPS = [{ id: 'glaze', name: '上釉' }, { id: 'paint', name: '彩繪' }, { id: 'decorate', name: '裝飾' }];
const HINTS = larch.phone ? [
  '選一種釉當底色，也可以讓下半部浸另一種釉',
  '按住陶坯畫：轉盤轉著會畫出一圈圈色帶，停下來就能自由畫\\n在陶坯旁邊拖曳可以轉動作品',
  '點一下陶坯貼上裝飾，小鳥和小貓會站在口緣\\n在陶坯旁邊拖曳可以轉動作品',
] : [
  '選一種釉當底色・鍵盤：← → 或 1～6 換釉、D 雙色浸釉、Enter 下一步',
  '按住陶坯畫：轉盤轉著畫出一圈圈色帶，停下來就能自由畫；在旁邊拖曳轉動作品\\n鍵盤：方向鍵移動筆、按住空白鍵畫、1～0 換顏色、[ ] 筆的粗細、R 轉盤、Z 復原',
  '點陶坯貼上裝飾，小鳥和小貓會站在口緣；在旁邊拖曳轉動作品\\n鍵盤：方向鍵移動、空白鍵貼上、1～8 換裝飾、C 換顏色、[ ] 大小、Z 復原',
];
const ICONS = {
  flower: '<circle cx="12" cy="6.5" r="3.6"/><circle cx="17.2" cy="10.3" r="3.6"/><circle cx="15.2" cy="16.5" r="3.6"/><circle cx="8.8" cy="16.5" r="3.6"/><circle cx="6.8" cy="10.3" r="3.6"/><circle cx="12" cy="12" r="2.4" fill="#f3d27a"/>',
  leaf: '<path d="M12 2.5C18 6 19.5 12 15.5 18c-1.1 1.6-2.3 2.6-3.5 3.5-1.2-.9-2.4-1.9-3.5-3.5C4.5 12 6 6 12 2.5Z"/><path d="M12 7v13" stroke="#fbf6ec" stroke-width="1.3" fill="none"/>',
  heart: '<path d="M12 20.5S3.5 15.2 3.5 9.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8.5 2.2c0 6-8.5 11.3-8.5 11.3Z"/>',
  star: '<path d="m12 2.8 2.7 5.9 6.4.7-4.8 4.3 1.4 6.3L12 16.8 6.3 20l1.4-6.3-4.8-4.3 6.4-.7z"/>',
  dot: '<circle cx="6.5" cy="12" r="2.6"/><circle cx="12.5" cy="12" r="2.6"/><circle cx="18.5" cy="12" r="2.6"/>',
  bird: '<ellipse cx="10.5" cy="14.5" rx="6.5" ry="4.5"/><circle cx="16" cy="9" r="3.4"/><path d="m19 8 3.2 1.2L19 10.4zM4.6 13.4 1.4 9.6l4.8 2.2z"/><circle cx="17" cy="8.4" r=".8" fill="#fbf6ec"/>',
  cat: '<path d="m5.5 4 3.2 3.6a8 8 0 0 1 6.6 0L18.5 4l.6 6.2A7.5 7.5 0 0 1 12 20.5a7.5 7.5 0 0 1-7.1-10.3z"/><circle cx="9.4" cy="12.6" r="1" fill="#fbf6ec"/><circle cx="14.6" cy="12.6" r="1" fill="#fbf6ec"/>',
  handle: '<path d="M4 6h11v10a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M15 9h1.8a3 3 0 0 1 0 6H15" fill="none" stroke="currentColor" stroke-width="2"/>',
};
let studioUi = null;
function studio() {
  return new Promise((resolve) => {
    let tab = 0, finished = false;
    const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
    const btn = (cls, html, onClick, label) => {
      const b = el('button', cls); b.type = 'button'; b.innerHTML = html;
      if (label) { b.title = label; b.setAttribute('aria-label', label); }
      b.addEventListener('click', (e) => { if (b.disabled) return; onClick(); larch.sound('click', 0.35); refresh(); if (e.detail) b.blur(); }); // 滑鼠點完不留焦點：Enter 一樣是「下一步」
      return b;
    };
    const row = (...kids) => { const r = el('div', 'pot-row'); r.append(...kids); return r; };
    const group = (labels, get, set) => { const g = el('div', 'pot-group'); const list = labels.map(([html, label], i) => { const b = btn('pot-chip', html, () => set(i), label); g.append(b); return b; }); return { g, sync: () => list.forEach((b, i) => b.setAttribute('aria-pressed', String(i === get()))) }; };
    const palette = (get, set) => { const r = el('div', 'pot-row pot-palette'); const list = PAINTS.map((c, i) => { const b = btn('pot-sw', \`<i style="background:radial-gradient(circle at 34% 28%,rgba(255,255,255,.4) 0,rgba(255,255,255,0) 45%),\${c.color}"></i>\`, () => set(i), \`\${c.name}（\${(i + 1) % 10}）\`); r.append(b); return b; }); return { r, sync: () => list.forEach((b, i) => b.setAttribute('aria-pressed', String(i === get()))) }; };

    const panel = el('div', 'pot-card pot-studio');
    const tabs = el('div', 'pot-tabs');
    tabs.setAttribute('role', 'tablist');
    const tabBtns = STEPS.map((s, i) => { const b = btn('pot-tab', s.name, () => go(i)); b.setAttribute('role', 'tab'); tabs.append(b); return b; });
    const next = btn('cz-btn orange pot-next', '', () => (tab < 2 ? go(tab + 1) : done()));
    const head = el('div', 'pot-head'); head.append(tabs, next);
    const status = el('h3'), hint = el('div', 'pot-hint');
    // 上釉
    const glazeRow = el('div', 'pot-row');
    const glazeBtns = GLAZES.map((g, i) => { const b = btn('pot-glaze', \`<i style="background:radial-gradient(circle at 34% 28%,rgba(255,255,255,.55) 0,rgba(255,255,255,0) 42%),\${g.color}"></i><span>\${g.name}</span>\`, () => setGlaze(i), g.name); glazeRow.append(b); return b; });
    const dip = btn('pot-chip', '', () => { twoTone = !twoTone; paintGlaze(false); });
    const glazeBody = el('div', 'pot-body'); glazeBody.append(glazeRow, row(dip));
    // 彩繪
    const paintPal = palette(() => art.color, (i) => { art.color = i; });
    const brushes = group(BRUSHES.map((b, i) => [\`<i class="pot-dot" style="--d:\${[4, 8, 13][i]}px"></i>\`, b.name]), () => art.brush, (i) => { art.brush = i; });
    const paintWheel = btn('pot-chip', '', () => { art.wheel = !art.wheel; });
    const paintUndoBtn = btn('pot-chip', '復原', undoPaint, '復原（Z）'), paintClear = btn('pot-chip', '清除', clearPaint, '全部擦掉');
    const paintBody = el('div', 'pot-body'); paintBody.append(paintPal.r, row(brushes.g, paintWheel, paintUndoBtn, paintClear));
    // 裝飾
    const kindRow = el('div', 'pot-row pot-kinds');
    const kindBtns = DECOS.map((d, i) => { const b = btn('pot-kind', \`<svg viewBox="0 0 24 24" aria-hidden="true">\${ICONS[d.id]}</svg><span>\${d.name}</span>\`, () => { art.kind = i; }, \`\${d.name}（\${i + 1}）\`); kindRow.append(b); return b; });
    const decoPal = palette(() => art.decoColor, (i) => { art.decoColor = i; });
    const sizes = group(DECO_SIZES.map((s) => [s.name, \`\${s.name}的裝飾\`]), () => art.decoSize, (i) => { art.decoSize = i; });
    const decoWheel = btn('pot-chip', '', () => { art.decoWheel = !art.decoWheel; });
    const decoUndoBtn = btn('pot-chip', '復原', undoDeco, '復原（Z）'), decoClear = btn('pot-chip', '清除', clearDeco, '全部拿掉');
    const decoBody = el('div', 'pot-body'); decoBody.append(kindRow, decoPal.r, row(sizes.g, decoWheel, decoUndoBtn, decoClear));
    const bodies = [glazeBody, paintBody, decoBody];
    panel.append(head, status, hint, ...bodies);
    larch.ui.root.append(panel);

    function setGlaze(i) { glaze = (i + GLAZES.length) % GLAZES.length; paintGlaze(false); }
    function refresh() {
      if (finished) return;
      tabBtns.forEach((b, i) => b.setAttribute('aria-selected', String(i === tab)));
      bodies.forEach((b, i) => { b.hidden = i !== tab; });
      next.textContent = tab < 2 ? (larch.phone ? '下一步 ›' : \`下一步：\${STEPS[tab + 1].name} ›\`) : '送進窯裡燒';
      hint.textContent = HINTS[tab];
      status.textContent = tab === 0 ? \`釉色：\${GLAZES[glaze].name}\${twoTone ? '＋' + GLAZES[glaze === 5 ? 4 : 5].name : ''}\`
        : tab === 1 ? \`彩繪：\${PAINTS[art.color].name}・\${BRUSHES[art.brush].name}\${art.strokes.length ? \`・\${art.strokes.length} 筆\` : ''}\`
          : \`裝飾：\${DECOS[art.kind].name}・\${PAINTS[art.decoColor].name}・\${DECO_SIZES[art.decoSize].name}\${art.decos.length ? \`・\${art.decos.length} 個\` : ''}\`;
      glazeBtns.forEach((b, i) => b.setAttribute('aria-pressed', String(i === glaze)));
      dip.textContent = twoTone ? '雙色浸釉：開' : '雙色浸釉：關';
      dip.setAttribute('aria-pressed', String(twoTone));
      paintPal.sync(); brushes.sync(); decoPal.sync(); sizes.sync();
      kindBtns.forEach((b, i) => b.setAttribute('aria-pressed', String(i === art.kind)));
      paintWheel.textContent = art.wheel ? '轉盤：轉' : '轉盤：停';
      decoWheel.textContent = art.decoWheel ? '轉盤：轉' : '轉盤：停';
      paintWheel.setAttribute('aria-pressed', String(art.wheel)); decoWheel.setAttribute('aria-pressed', String(art.decoWheel));
      paintWheel.title = decoWheel.title = '轉盤轉動／停住（R）';
      paintUndoBtn.disabled = !art.paintUndo.length; paintClear.disabled = !art.strokes.length;
      decoUndoBtn.disabled = !art.decoUndo.length; decoClear.disabled = !art.decos.length;
      spinGoal = tab === 0 ? 0.25 : tab === 1 ? (art.wheel ? 0.8 : 0) : (art.decoWheel ? 0.2 : 0);
      shapeBrush();
    }
    /** 鏡頭照作品的大小、介面的高度找角度（矮的碗盤從高一點看，看得到裡面）。 */
    function aim() {
      const f = features(), R = f.rMax + 0.02 * U, H = clay.h + 0.06 * U;
      const panelFrac = Math.min(0.5, (panel.getBoundingClientRect().height + 14) / Math.max(1, larch.ui.root.clientHeight || innerHeight));
      const el2 = isLow() ? 0.62 : 0.32, az = 0.2, tan = Math.tan(larch.camera.fov * Math.PI / 360);
      const free = Math.max(0.35, 1 - panelFrac - 0.07), tall = H * Math.cos(el2) + 2 * R * Math.sin(el2);
      const d = Math.max(tall / (free * 2 * tan), (2 * R) / (0.86 * 2 * tan * larch.camera.aspect), 0.6 * U);
      const cy = BASE.y + H * 0.48;
      camGoal = { px: BASE.x + Math.sin(az) * Math.cos(el2) * d, py: cy + Math.sin(el2) * d, pz: BASE.z + Math.cos(az) * Math.cos(el2) * d, tx: BASE.x, ty: cy - panelFrac * d * tan / Math.cos(el2) * 0.95, tz: BASE.z };
    }
    function go(i) {
      endStroke();
      tab = larch.clamp(i, 0, 2);
      phase = STEPS[tab].id;
      if (!cursor.scripted) cursor.on = false;
      refresh();
      aim();
    }
    const offKey = larch.input.onKey((code, down) => {
      if (!down || finished) return;
      const focus = document.activeElement;
      if (/Enter|Space/.test(code) && focus?.tagName === 'BUTTON' && panel.contains(focus)) return; // 鍵盤停在某個按鈕上：交給那個按鈕
      const shift = larch.input.down('ShiftLeft') || larch.input.down('ShiftRight');
      if (code === 'Enter' || code === 'NumpadEnter') { if (shift) go(tab - 1); else next.click(); return; }
      const m = /^(?:Digit|Numpad)(\\d)$/.exec(code), n = m ? (Number(m[1]) + 9) % 10 : -1; // 1 是第一個…0 是第十個
      if (tab === 0) {
        if (n >= 0 && n < GLAZES.length) setGlaze(n);
        else if (code === 'ArrowRight') setGlaze(glaze + 1);
        else if (code === 'ArrowLeft') setGlaze(glaze - 1);
        else if (code === 'KeyD') { twoTone = !twoTone; paintGlaze(false); }
        else return;
      } else if (code === 'KeyZ' || code === 'Backspace') (tab === 1 ? undoPaint : undoDeco)();
      else if (code === 'KeyR') { if (tab === 1) art.wheel = !art.wheel; else art.decoWheel = !art.decoWheel; }
      else if (code === 'BracketLeft' || code === 'Minus') { if (tab === 1) art.brush = Math.max(0, art.brush - 1); else art.decoSize = Math.max(0, art.decoSize - 1); }
      else if (code === 'BracketRight' || code === 'Equal') { if (tab === 1) art.brush = Math.min(2, art.brush + 1); else art.decoSize = Math.min(2, art.decoSize + 1); }
      else if (tab === 1 && n >= 0) art.color = n;
      else if (tab === 2 && n >= 0 && n < DECOS.length) art.kind = n;
      else if (tab === 2 && code === 'KeyC') art.decoColor = (art.decoColor + (shift ? PAINTS.length - 1 : 1)) % PAINTS.length;
      else return;
      larch.sound('click', 0.3);
      refresh();
    });
    function done() {
      if (finished) return;
      finished = true;
      endStroke(); offKey(); panel.remove();
      studioUi = null; camGoal = null; spinGoal = null; art.press = null;
      cursor.on = cursor.scripted = cursor.down = false;
      showBrush(null); showGhost(null);
      larch.sound('whoosh', 0.5);
      resolve();
    }
    studioUi = { go, next: () => next.click(), refresh, tab: () => tab };
    kb.inside = isLow(); kb.a = 0; kb.h = kb.inside ? 0.5 : 0.55;
    paintGlaze(false);
    clayMesh.material = rawGlaze;
    go(0);
  });
}

/** 作品的名字：照器形、分數，再看貼了什麼、畫了什麼（貓咪花瓶、青花碗、雙耳罐、馬克杯…）。 */
const MOTIF = { cat: '貓咪', bird: '小鳥', flower: '花朵', heart: '愛心', star: '星星', leaf: '綠葉', dot: '點點' };
function dressName(r) {
  const count = (k) => art.decos.filter((d) => d.userData.kind === k).length;
  let base = TYPES[r.type].name, ears = '';
  const handles = count('handle');
  if (handles === 1 && r.type === 'cup') base = '馬克杯';
  else if (handles) ears = handles > 1 ? '雙耳' : '單耳';
  const top = Object.keys(MOTIF).map((k) => [k, count(k) * (k === 'cat' || k === 'bird' ? 10 : 1)]).sort((a, b) => b[1] - a[1])[0];
  let motif = top[1] ? MOTIF[top[0]] : '';
  if (!motif && art.strokes.length) {
    const by = {};
    for (const s of art.strokes) by[s.c] = (by[s.c] || 0) + 1;
    const c = Object.keys(by).sort((a, b) => by[b] - by[a])[0];
    motif = c === PAINTS[0].color ? '青花' : c === PAINTS[7].color ? '描金' : '彩繪';
  }
  r.name = \`\${r.word}\${motif}\${ears}\${base}\`;
}
/** 裝飾、彩繪最多的那一面要從哪個角度看（pot 自己的角度；兩邊差不多就回傳 null）。
 *  裝飾看它面向哪裡（內壁上的、探頭看碗裡的小貓要從對面看）；內壁的彩繪也一樣；把手看側面比較好看，不算。 */
function frontAngle() {
  let x = 0, z = 0;
  const add = (a, w) => { x += Math.sin(a) * w; z += Math.cos(a) * w; }, face = new THREE.Vector3();
  for (const d of art.decos) if (d.userData.kind !== 'handle') { face.set(0, 0, 1).applyQuaternion(d.quaternion); add(Math.atan2(face.x, face.z), d.userData.kind === 'bird' || d.userData.kind === 'cat' ? 2 : 1); }
  for (const st of art.strokes) for (const p of st.pts || []) if (p) add(p[0] * Math.PI * 2 + (jAtV(p[1]) > RINGS + 3 ? Math.PI : 0), 0.05);
  return Math.hypot(x, z) > 0.3 ? Math.atan2(x, z) : null;
}
/** 展示台上：把最好看的那一面轉向鏡頭（拍照、分享之前也會轉）。 */
async function faceFront(seconds) {
  sway.at = null;
  const f = frontAngle();
  if (f === null) return false;
  const s = shotFor('show');
  let d = Math.atan2(s.px - pot.position.x, s.pz - pot.position.z) - f - pot.rotation.y;
  d -= Math.round(d / (Math.PI * 2)) * Math.PI * 2;
  spin = 0;
  await larch.tween(pot.rotation, { y: pot.rotation.y + d }, seconds, 'inOut');
  return true;
}
/** 展示中：有好看的一面就對著鏡頭輕輕擺，不然慢慢轉一圈圈。 */
async function showOff(seconds) {
  if (await faceFront(seconds)) { sway.at = pot.rotation.y; sway.t = 0; } else spin = 0.1;
}
/** 再做一個：這件（連同彩繪、裝飾）收到層架上，工作台清乾淨。 */
const kept = []; // 層架每一格現在擺的作品（擺滿了從第一格換掉，舊的收掉）
function keepOnShelf(i) {
  const slot = shelfSlots[i], old = kept[i];
  if (old) { larch.scene.remove(old); old.userData.tex.dispose(); old.children[0].geometry.dispose(); old.children[0].material.dispose(); }
  const keep = new THREE.Group();
  const copy = document.createElement('canvas');
  copy.width = PAINT_W; copy.height = PAINT_H;
  copy.getContext('2d').drawImage(paintCanvas, 0, 0);
  keep.userData.tex = paintTexture(copy);
  kept[i] = keep;
  const body = new THREE.Mesh(clayGeo.clone(), withPaint(new THREE.MeshPhysicalMaterial(FIRED), 0, keep.userData.tex));
  body.castShadow = true;
  keep.add(body);
  for (const d of art.decos) { keep.add(d.clone()); pot.remove(d); }
  const box = new THREE.Box3().setFromObject(keep), size = box.getSize(new THREE.Vector3());
  const fit = Math.min(1, 0.5 / Math.max(size.y, 0.01), 0.44 / Math.max(size.x, size.z, 0.01));
  keep.scale.setScalar(fit);
  keep.position.set(slot.x, slot.y - box.min.y * fit, slot.z);
  keep.rotation.y = -(frontAngle() ?? 0); // 好看的那一面朝外
  larch.scene.add(keep);
  Object.assign(art, { strokes: [], cur: null, paintUndo: [], decos: [], decoUndo: [], leafFlip: 1 });
  repaint();
}

// ── 陶窯：門口的位置、燒窯的火光
function kilnDoor() {
  kiln.updateMatrixWorld(true);
  return kiln.localToWorld(new THREE.Vector3(...KILN.door));
}
const glowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ff9a3d').multiplyScalar(2), transparent: true, opacity: 0, toneMapped: false, depthWrite: false });
// 窯門（在陶窯自己的座標裡：正面朝 +z）與煙囪口；內建的替代陶窯門在正中間
const KILN = (() => {
  // 門的高度、大小照模型量的；門面在哪、煙囪口在哪用射線找（換了別的窯也大致對得上）
  const spot = kiln.userData.fallback ? { door: [0, 0.28], size: [0.5, 0.6] } : { door: [0.05, 0.72], size: [0.95, 0.75] };
  kiln.updateMatrixWorld(true);
  const o = kiln.localToWorld(new THREE.Vector3()), back = kiln.localToWorld(new THREE.Vector3(0, 0, -1)).sub(o);
  const hitFront = new THREE.Raycaster(kiln.localToWorld(new THREE.Vector3(spot.door[0], spot.door[1], 6)), back).intersectObject(kiln, true)[0];
  const frontZ = hitFront ? kiln.worldToLocal(hitFront.point.clone()).z : 0.9;
  const chimney = findDisc(kiln), top = kiln.worldToLocal(new THREE.Vector3(chimney.x, chimney.top, chimney.z));
  return { door: [spot.door[0], spot.door[1], frontZ], top: [top.x, top.y, top.z], size: spot.size };
})();
// 門口發亮：柔邊的拱形光（加法混色，對不太準也像光）
const archTex = canvasTexture(128, 160, (x) => {
  const g = x.createRadialGradient(64, 96, 4, 64, 96, 74);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.55, 'rgba(255,255,255,0.75)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.beginPath(); x.moveTo(14, 160); x.lineTo(14, 70); x.arc(64, 70, 50, Math.PI, 0); x.lineTo(114, 160); x.closePath(); x.fill();
});
const doorGlow = new THREE.Mesh(new THREE.PlaneGeometry(KILN.size[0], KILN.size[1]), glowMat);
glowMat.map = archTex;
glowMat.blending = THREE.AdditiveBlending;
doorGlow.position.set(KILN.door[0], KILN.door[1], KILN.door[2] + 0.03);
kiln.add(doorGlow);
const fireLight = new THREE.PointLight('#ff8a3c', 0, 5, 1.5);
fireLight.position.set(KILN.door[0], KILN.door[1] + 0.2, KILN.door[2] + 0.5);
kiln.add(fireLight);

// ── 展示台
const SHOW = new THREE.Vector3(1.75, 0.62, 0.55);
// 展示時打一盞暖暖的燈在作品正面
const showLight = new THREE.PointLight('#ffd7a3', 0, 4.5, 1.6);
showLight.position.set(SHOW.x - 0.3, SHOW.y + 1.3, SHOW.z + 1.4);
larch.scene.add(showLight);
const pedestal = new THREE.Group();
{
  // 車出來的木頭展示座，上面一塊亞麻布
  const turned = new THREE.Mesh(new THREE.LatheGeometry(V2([[0, 0], [0.36, 0], [0.37, 0.04], [0.3, 0.08], [0.22, 0.14], [0.2, 0.42], [0.25, 0.48], [0.4, 0.53], [0.42, 0.6], [0, 0.6]]), 48), new THREE.MeshPhysicalMaterial({ color: '#7b4f30', roughness: 0.45, clearcoat: 0.5, clearcoatRoughness: 0.3 }));
  const linen = new THREE.Mesh(new THREE.CylinderGeometry(0.39, 0.39, 0.012, 48), new THREE.MeshStandardMaterial({ color: '#e9dfcd', roughness: 1 }));
  linen.position.y = 0.606;
  pedestal.add(turned, linen);
}
pedestal.position.set(SHOW.x, 0, SHOW.z);
pedestal.scale.setScalar(0.01);
pedestal.visible = false;
larch.scene.add(shadowy(pedestal));

// ── 一個作品從頭到尾
async function throwPot() {
  phase = 'throw';
  timeLeft = SECONDS;
  spin = 1.6;
  larch.sound('whoosh', 0.4);
  updateHud(timeLeft);
  looksTimer = 0;
  shapedFor = 0;
  larch.ui.text('hint', larch.phone ? '按住陶土拖曳：往內壓、往外拉\\n在頂端往上拖就會拉高' : '按住陶土拖曳：往內壓、往外拉、頂端往上拉高\\n鍵盤：方向鍵移動手、按住空白鍵捏、Enter 完成', { at: 'bottom-left', size: 'small' });
  const done = larch.ui.button('完成', () => finishNow && finishNow('button'), { at: 'bottom-right', color: 'green', id: 'done' });
  done.title = 'Enter';
  const offKey = larch.input.onKey((code, down) => { if (down && code === 'Enter' && finishNow) finishNow('button'); });
  const why = await new Promise((resolve) => { finishNow = resolve; });
  finishNow = null;
  offKey();
  larch.ui.remove('done');
  phase = 'dry';
  handState.active = false; handState.key = false;
  placeHand();
  larch.ui.remove('time');
  larch.ui.remove('looks');
  larch.ui.remove('hint');
  larch.tween({ get s() { return spin; }, set s(v) { spin = v; } }, { s: 0.25 }, 1.2, 'out');
  // 陰乾：濕亮的陶土慢慢變成霧面、顏色變淺
  larch.ui.text('drying', '陰乾中…', { at: 'top' });
  await Promise.all([larch.ui.banner(why === 'time' ? '時間到' : '完成', \`看起來像：\${TYPES[classify(features())].name}・接著上釉、彩繪、貼裝飾\`), dryOut(2.2)]);
  larch.ui.remove('drying');
}

async function fireInKiln() {
  // 拿起來、飛到窯門口、進去（彩繪和裝飾都跟著一起）
  phase = 'fire';
  spin = 0;
  const door = kilnDoor();
  moveCam('kiln', 1.6);
  await larch.tween(pot.position, { y: pot.position.y + 0.35 }, 0.45, 'out');
  const from = pot.position.clone(), k = { t: 0 };
  const stop = larch.onUpdate(() => {
    const t = k.t;
    pot.position.set(from.x + (door.x - from.x) * t, from.y + (door.y - 0.12 - from.y) * t + Math.sin(Math.PI * t) * 0.5, from.z + (door.z - from.z) * t);
    pot.rotation.y += 0.05;
  });
  await larch.tween(k, { t: 1 }, 1.3, 'inOut');
  stop();
  larch.sound('whoosh', 0.4);
  await larch.tween(pot.scale, { x: 0.01, y: 0.01, z: 0.01 }, 0.3, 'in');
  pot.visible = false;
  // 燒窯：門口發光、火、煙、熱得發抖
  larch.sound('fire', 0.8);
  const top = kiln.localToWorld(new THREE.Vector3(...KILN.top));
  const flames = larch.effect('fire', [top.x, top.y + 0.02, top.z], { scale: 0.55, loop: true }); // 柴窯的煙囪口冒火（燒窯時一直燒）
  const smoke = larch.effect('smoke', [top.x, top.y + 0.35, top.z], { scale: 1.3, loop: true });
  const heat = { k: 0 };
  const glow = larch.onUpdate((dt, t) => {
    const flicker = 0.85 + Math.sin(t * 17) * 0.08 + Math.sin(t * 29) * 0.07;
    glowMat.opacity = heat.k * flicker;
    fireLight.intensity = heat.k * 6 * flicker;
  });
  larch.tween(heat, { k: 1 }, 0.8, 'out');
  for (let i = 0; i <= 30; i++) {
    larch.ui.bar('kiln', i / 30, { at: 'top', label: \`燒窯中… \${Math.round(600 + i / 30 * 630)}°C\`, color: '#ff9446' });
    if (i % 10 === 5) larch.shake(0.05, 0.3);
    await larch.wait(0.1);
  }
  // 關火
  flames?.stop(); smoke?.stop();
  larch.ui.remove('kiln');
  // 出窯：亮晶晶的
  paintGlaze(true);
  clayMesh.material = firedGlaze; // 彩繪那一層也一起燒得亮亮的
  fireDecos();
  larch.effect('smoke', [door.x, door.y, door.z + 0.1], { scale: 0.6 }); // 開窯冒出一陣熱氣（只冒一輪）
  larch.sound('levelup', 0.7);
  pot.visible = true;
  pot.position.set(door.x, door.y - 0.12, door.z);
  await larch.tween(pot.scale, { x: 1, y: 1, z: 1 }, 0.45, 'outBack');
  await larch.tween(heat, { k: 0 }, 0.4, 'in');
  glow();
  // 飛上展示台
  pedestal.visible = true;
  larch.tween(pedestal.scale, { x: 1, y: 1, z: 1 }, 0.5, 'outBack');
  moveCam('show', 1.5);
  const start = pot.position.clone(), k2 = { t: 0 };
  const stop2 = larch.onUpdate(() => {
    const t = k2.t;
    pot.position.set(start.x + (SHOW.x - start.x) * t, start.y + (SHOW.y - start.y) * t + Math.sin(Math.PI * t) * 0.8, start.z + (SHOW.z - start.z) * t);
  });
  await larch.tween(k2, { t: 1 }, 1.4, 'inOut');
  stop2();
  pot.position.copy(SHOW);
  larch.sound('land', 0.6);
  phase = 'show';
  larch.tween(showLight, { intensity: 5 }, 0.8, 'inOut');
  await showOff(0.9);
}

/** 分數卡：作品名稱、星星、每一項的條。 */
function scoreCard(result) {
  const card = document.createElement('div');
  card.className = 'pot-card';
  const portrait = larch.camera.aspect < 1;
  card.style.cssText = \`\${portrait ? 'left:50%;top:max(14px,env(safe-area-inset-top));transform:translateX(-50%)' : 'left:max(24px,env(safe-area-inset-left));top:50%;transform:translateY(-50%)'};width:\${portrait ? 'calc(100% - 28px)' : '270px'};pointer-events:none;gap:9px\`;
  const stars = Math.max(1, Math.round(result.score / 20));
  const made = [art.strokes.length ? \`彩繪 \${art.strokes.length} 筆\` : '', art.decos.length ? \`裝飾 \${art.decos.length} 個\` : ''].filter(Boolean).join('・');
  const starRow = \`<div style="font-size:17px;letter-spacing:3px;color:#a8792f">\${'★'.repeat(stars)}<span style="color:#e2d3ba">\${'★'.repeat(5 - stars)}</span></div>\`;
  if (portrait) { // 直的手機：精簡成幾行，作品才看得到
    card.innerHTML = \`<small>你的作品</small><h3 style="font-size:21px;line-height:1.25">\${result.name}</h3>
      <div style="display:flex;justify-content:space-between;align-items:center">\${starRow}<b style="font-size:26px;font-weight:600;font-variant-numeric:tabular-nums">\${result.score}<span style="font-size:14px;font-weight:400"> 分</span></b></div>
      <small style="color:#6e5340;line-height:1.6">\${[made, result.parts.map(([label, v]) => \`\${label} \${Math.round(v * 100)}\`).join('・')].filter(Boolean).join('<br>')}</small>\`;
    larch.ui.root.append(card);
    return card;
  }
  card.innerHTML = \`<small>你的作品</small>
    <h3 style="font-size:23px;line-height:1.25">\${result.name}</h3>
    \${starRow}
    \${made ? \`<small style="color:#6e5340">\${made}</small>\` : ''}
    \${result.parts.map(([label, v]) => \`<div style="display:grid;grid-template-columns:52px 1fr 30px;align-items:center;gap:10px;font-size:13.5px"><span>\${label}</span><i style="display:block;height:5px;border-radius:3px;background:#eadcc4"><u style="display:block;height:100%;border-radius:3px;background:\${WOOD};width:\${Math.round(v * 100)}%"></u></i><span style="text-align:right;color:#8a6e55;font-variant-numeric:tabular-nums">\${Math.round(v * 100)}</span></div>\`).join('')}
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:4px;padding-top:8px;border-top:1px solid #e3d3b8"><span>總分</span><b style="font-size:30px;font-weight:600;font-variant-numeric:tabular-nums">\${result.score}</b></div>\`;
  larch.ui.root.append(card);
  return card;
}

// ── 開場
// 測試用（只有作者試玩時）：腳本可以一步一步走、照座標畫畫和貼裝飾（錄宣傳片用虛擬時間也一樣，全部跟著遊戲時間走）。
// u：繞一圈的位置 0～1（front() 是現在正對鏡頭的那個 u）；v：外壁的高度 0 底～1 口緣，1～2 越過口緣沿內壁往下。
// color：PAINTS 的第幾個、名字或 #色碼；size：0 細／1 中／2 粗（彩繪）、0 小／1 中／2 大（裝飾），彩繪也可以給小數＝筆寬（公尺）。
if (larch.testPlay) {
  const hexOf = (c) => (typeof c === 'number' ? PAINTS[larch.clamp(Math.round(c), 0, PAINTS.length - 1)].color : PAINTS.find((p) => p.name === c)?.color ?? (/^#[0-9a-f]{6}$/i.test(String(c)) ? String(c) : PAINTS[art.color].color));
  const widthOf = (s) => (s == null ? BRUSHES[art.brush].size * U : Number.isInteger(s) && s >= 0 && s <= 2 ? BRUSHES[s].size * U : Number(s));
  const vOf = (h) => atJ(jOfH(h)).v;
  const ready = () => Boolean(studioUi);
  const addStroke = (st) => { endStroke(); art.strokes.push(st); art.paintUndo.push({ add: st }); drawStroke(pctx, st); studioUi?.refresh(); return art.strokes.length; };
  window.__pottery = {
    KILN, clay, hand: handState, disc, BASE, art, PAINTS: PAINTS.map((p) => p.name), DECOS: DECOS.map((d) => d.id), GLAZES: GLAZES.map((g) => g.name),
    judge: () => judge(), features: () => features(), phase: () => phase,
    finish: () => finishNow && finishNow('button'),
    /** 下一步：拉坯→完成；工作台→下一頁，最後一頁就送進窯裡燒。 */
    step() { if (phase === 'throw') finishNow?.('button'); else studioUi?.next(); return phase; },
    tab(name) { studioUi?.go(typeof name === 'number' ? name : STEPS.findIndex((s) => s.id === name)); return phase; },
    /** 直接給形狀（拉坯時）：r 是每一圈的半徑（陣列或 t→半徑 的函式，t 0 底～1 口緣），h 是高度；單位都是拉坯機大小 U 的倍數。 */
    setShape(r, h) {
      if (phase !== 'throw' && phase !== 'intro') return false;
      const at = (t) => { if (typeof r === 'function') return r(t); const x = t * (r.length - 1), i = Math.min(r.length - 2, Math.floor(x)); return r[i] + (r[i + 1] - r[i]) * (x - i); };
      for (let i = 0; i < RINGS; i++) clay.r[i] = at(i / (RINGS - 1)) * U;
      clay.h = larch.clamp(h, MIN_H / U, MAX_H / U) * U; clay.wobble = 0;
      settle(0); updateClay();
      return true;
    },
    glaze(i, two = twoTone) { glaze = larch.clamp(Math.round(i), 0, GLAZES.length - 1); twoTone = Boolean(two); paintGlaze(false); studioUi?.refresh(); },
    wheel(on) { if (phase === 'decorate') art.decoWheel = Boolean(on); else art.wheel = Boolean(on); studioUi?.refresh(); },
    front: () => frac((camAngle() - pot.rotation.y) / (Math.PI * 2)),
    paintRing(color, v0, v1) { return ready() && addStroke({ c: hexOf(color), band: [vOf(Math.min(v0, v1)), vOf(Math.max(v0, v1))] }); },
    paintAt(u, v, color, size) { return ready() && addStroke({ c: hexOf(color), s: widthOf(size), pts: [[u, vOf(v)]] }); },
    paintStroke(points, color, size) {
      if (!ready()) return false;
      const pts = [];
      for (const p of points) { if (!p) { pts.push(null); continue; } const last = pts[pts.length - 1]; let u = p[0]; if (last) { const du = u - frac(last[0]); u = last[0] + du - Math.round(du); } pts.push([u, vOf(p[1])]); }
      return addStroke({ c: hexOf(color), s: widthOf(size), pts });
    },
    /** 腳本的筆：angle 離鏡頭正面幾度（弧度）、v 高度、down 有沒有碰到陶坯；跟著遊戲時間畫（轉盤轉著就是一圈圈）。
     *  換位置時筆會先提起來（新的一筆）；drag: true 才是拖過去、連成一條線（每一格給一點點就是動畫）。null 收起來。 */
    brush(o) {
      if (!o) { cursor.scripted = cursor.on = cursor.down = false; endStroke(); return; }
      if (!o.drag && (o.angle != null || o.v != null)) endStroke();
      cursor.scripted = cursor.on = true;
      if (o.angle != null) cursor.a = o.angle;
      if (o.v != null) cursor.j = jOfH(o.v);
      if (o.down != null) cursor.down = Boolean(o.down);
      if (o.color != null) { const i = typeof o.color === 'number' ? o.color : PAINTS.findIndex((p) => p.name === o.color || p.color === o.color); if (i >= 0) art.color = i; }
      if (o.size != null) art.brush = larch.clamp(o.size, 0, 2);
      studioUi?.refresh();
    },
    decorate(kind, u, v, o = {}) {
      if (!ready()) return false;
      const k = typeof kind === 'number' ? kind : DECOS.findIndex((d) => d.id === kind || d.name === kind);
      if (k < 0) return false;
      return Boolean(addDeco(sampleAt(u, jOfH(v)), k, hexOf(o.color ?? art.decoColor), DECO_SIZES[larch.clamp(o.size ?? art.decoSize, 0, 2)].k));
    },
    undo() { (phase === 'decorate' ? undoDeco : undoPaint)(); },
    clear() { (phase === 'decorate' ? clearDeco : clearPaint)(); },
    state: () => ({ phase, strokes: art.strokes.length, decorations: art.decos.map((d) => d.userData.kind), glaze: GLAZES[glaze].name, twoTone, spin }),
  };
}
setCam(shotFor('wide'));
pedestal.visible = false;
let shelfIndex = 0, lastScore = 0;
moveCam('throw', 2.6);
await larch.ui.banner('陶藝工作室', larch.phone ? '手指按住陶土：往內拖壓進去、往外拖拉出來、在頂端往上拖拉高' : '按住陶土拖曳：往內壓、往外拉、在頂端往上拉高（鍵盤：方向鍵＋空白鍵）');
for (;;) {
  await throwPot();
  measurePaint();
  await studio();
  await fireInKiln();
  const result = judge();
  dressName(result);
  lastScore = result.score;
  larch.sound('chime', 0.6);
  const card = scoreCard(result);
  await larch.ui.banner(result.name, \`\${result.score} 分\`);
  // 做好的作品：存成圖片、分享到作品的留言區（玩家確認後才發），再決定要不要再做一個。
  let again = -1;
  for (;;) {
    const pick = await larch.choose(\`做好了一個\${result.name}！\`, ['分享到留言區', '存成圖片', '再做一個', '收工']);
    if (pick === 0 || pick === 1) {
      card.style.visibility = 'hidden';
      await faceFront(0.6);
      await larch.wait(0.05);
      const ok = pick === 0
        ? await larch.share({ text: \`我在陶藝工作室做了一個\${result.name}，拿到 \${result.score} 分！\`, name: \`我的\${result.name}\` })
        : await larch.savePhoto(\`我的\${result.name}\`);
      card.style.visibility = '';
      showOff(0.4);
      if (ok) larch.ui.toast(pick === 0 ? '分享到留言區了！' : '圖片存好了');
      continue;
    }
    again = pick === 2 ? 0 : 1;
    break;
  }
  card.remove();
  if (again !== 0) break;
  // 作品（連同彩繪、裝飾）擺上層架，再拿一塊新的陶土
  keepOnShelf(shelfIndex++ % shelfSlots.length);
  pot.visible = false;
  sway.at = null; spin = 0;
  larch.tween(pedestal.scale, { x: 0.01, y: 0.01, z: 0.01 }, 0.3, 'in').then(() => { pedestal.visible = false; });
  larch.tween(showLight, { intensity: 0 }, 0.6, 'inOut');
  resetClay();
  updateClay();
  clayMesh.material = wetClay;
  clayLook(0);
  pot.position.copy(BASE); pot.scale.setScalar(1); pot.rotation.set(0, 0, 0);
  await moveCam('throw', 1.4);
  pot.visible = true;
  larch.effect('dust', [BASE.x, BASE.y + 0.05, BASE.z], { scale: 0.4 });
  larch.sound('pop', 0.6);
}
larch.complete({ score: lastScore });
`,snake:`// ═══════════════════════════════════════════════════════════════════════════
// 貪吃小蛇 Snack Snake：3D 小遊戲卡的範例（方塊世界・可愛風）
// 小蛇在一顆小方塊堆成的大方塊上爬：六個面都能走，爬過邊緣就繞到隔壁那一面。
// 方向鍵／WASD（手機在畫面上滑一下）照「畫面上」的上下左右轉彎；方塊跟著小蛇慢慢轉，小蛇在的那一面一直朝著你。
// 吃到蘋果變長一格，偶爾出現的金星果分數更多；咬到自己就結束（小蛇會撞得頭暈眼花）。小蛇越長跑得越快。
// 蘋果、金星果的模型從參數來（larch.params.apple、star），空白時用 THREE 自己做的替代形狀。
// ═══════════════════════════════════════════════════════════════════════════

const P = larch.params;
const PHONE = larch.phone;
const scene = larch.scene, camera = larch.camera;
const N = Math.round(larch.clamp(Number(P.size) || 8, 5, 12));        // 方塊一條邊幾格
const BASE_SPEED = larch.clamp(Number(P.speed) || 6, 2, 14);          // 每秒幾格
const BODY_HEX = /^#[0-9a-f]{6}$/i.test(String(P.body)) ? String(P.body) : '#6fd14f';
const V3 = THREE.Vector3, Quat = THREE.Quaternion;
const TAU = Math.PI * 2;
const H = N / 2;                 // 方塊表面離中心多遠（一格 = 1）
const rand = (a, b) => a + Math.random() * (b - a);
const smooth = (x) => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };
const C = (hex) => new THREE.Color(hex);
const BODY = C(BODY_HEX);
const BODY_DARK = BODY.clone().multiplyScalar(.84);   // 一節深、一節淺：方方的一格一格看得出來
const BODY_LIGHT = BODY.clone().lerp(C('#ffffff'), .16);

// ── 夜空與柔和的光 ──────────────────────────────────────────────────────────
larch.music(P.bgm, { volume: .5 });
larch.sky('#141a3c');
larch.setLook({ hour: 14, look: 'miniature', bloom: .45, exposure: 1.06, fog: 0, clouds: 0 });

// Larch 的太陽（下午兩點）大約從這個方向照過來。整個方塊世界放在 world 裡：
// 小蛇在的那一面永遠朝上（+Y）被太陽照亮，「轉鏡頭」其實是轉 world，所以每一面都一樣亮、影子方向也一樣。
const SUN = new V3(-.065, .859, -.508).normalize();
const N0 = new V3(0, 1, 0);
const SUN_FROM = -.78;   // 太陽從畫面左上方照過來：小蛇那一面最亮、上面那一條次亮、右邊那一條暗，影子落在右下方看得到
const sunAz = Math.atan2(SUN.x, -SUN.z) + SUN_FROM;
const U0 = new V3(Math.cos(sunAz), 0, Math.sin(sunAz));   // 畫面的「上」（往遠處）
const R0 = new V3().crossVectors(U0, N0);                 // 畫面的「右」
const QBASE = new Quat().setFromRotationMatrix(new THREE.Matrix4().makeBasis(R0, U0, N0));
const world = new THREE.Group();
scene.add(world);

// ── 小工具 ───────────────────────────────────────────────────────────────────
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: .8, metalness: 0, ...o });
function mesh(geo, mat, x = 0, y = 0, z = 0, cast = true) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = cast; m.receiveShadow = true;
  return m;
}
// 圓角方塊（方塊世界、蛇頭、蛇身都是）：r 是圓角佔邊長的比例，m 是圓角分幾段；法線直接算，邊上才不會有摺痕
function roundedCube(r = .22, m = 3) {
  const S = 2 * m + 2, g = new THREE.BoxGeometry(1, 1, 1, S, S, S);
  const p = g.attributes.position, nr = g.attributes.normal, v = new V3(), c = new V3(), inner = .5 - r;
  const remap = (x) => { const k = Math.abs(x) * S; return Math.sign(x) * (k <= 1 ? k * inner : inner + (k - 1) / m * r); };
  for (let k = 0; k < p.count; k++) {
    v.fromBufferAttribute(p, k);
    v.set(remap(v.x), remap(v.y), remap(v.z));
    c.set(Math.max(-inner, Math.min(inner, v.x)), Math.max(-inner, Math.min(inner, v.y)), Math.max(-inner, Math.min(inner, v.z)));
    v.sub(c).normalize();
    nr.setXYZ(k, v.x, v.y, v.z);
    v.multiplyScalar(r).add(c);
    p.setXYZ(k, v.x, v.y, v.z);
  }
  return g;
}
// 邊緣加一點柔柔的亮光（像軟膠玩具、果凍）
function rimGlow(mat, color, power, amount) {
  mat.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace('#include <emissivemap_fragment>', \`#include <emissivemap_fragment>
    float rimK = 1. - clamp(dot(normalize(normal), normalize(vViewPosition)), 0., 1.);
    totalEmissiveRadiance += vec3(\${color.map((x) => x.toFixed(3)).join(',')}) * pow(rimK, \${power.toFixed(2)}) * \${amount.toFixed(3)};\`);
  };
  return mat;
}
const dummy = new THREE.Object3D();
const ballGeo = new THREE.SphereGeometry(1, 16, 12);
const lowBallGeo = new THREE.SphereGeometry(1, 10, 8);
// 五角星（金星果的替代形狀、頭暈的小星星）
function starShape(R, r) {
  const s = new THREE.Shape();
  for (let k = 0; k < 10; k++) {
    const a = Math.PI / 2 + k / 10 * TAU, rr = k % 2 ? r : R;
    k ? s.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : s.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  return s;
}

// ═══════════════════════════ 1. 背景：深藍色的夜空、中間一圈柔光、會眨眼的星星 ═══════════════════════════
// 天空球跟著鏡頭（顏色照「畫面的方向」算：中間亮、上面偏紫、下面深藍）
const skyDome = (() => {
  const R = 520, g = new THREE.SphereGeometry(R, 40, 24), p = g.attributes.position, col = new Float32Array(p.count * 3);
  const top = C('#231f5c'), bottom = C('#090a24'), glow = C('#3a3a8c'), c = new THREE.Color();
  for (let k = 0; k < p.count; k++) {
    const x = p.getX(k) / R, y = p.getY(k) / R, z = p.getZ(k) / R;
    c.copy(bottom).lerp(top, smooth((y + .7) / 1.5));
    c.lerp(glow, Math.pow(Math.max(0, -z), 7) * .75 + Math.pow(Math.max(0, -z), 2) * .08);   // 鏡頭看的方向（-Z）最亮：方塊後面一圈柔光
    if (x > .2 && y > .1) c.lerp(C('#3b2f78'), smooth((x + y - .5) / 1.2) * .3);            // 右上角淡淡的紫色星雲
    c.toArray(col, k * 3);
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, depthWrite: false, fog: false }));
  m.renderOrder = -3; m.frustumCulled = false;
  scene.add(m);
  return m;
})();
// 四芒星的小貼圖（星星、閃光共用）
const sparkTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(.16, 'rgba(255,255,255,.75)'); grd.addColorStop(.42, 'rgba(190,210,255,.16)'); grd.addColorStop(1, 'rgba(190,210,255,0)');
  g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
  g.fillStyle = 'rgba(255,255,255,.95)'; g.beginPath();
  g.moveTo(32, 3); g.quadraticCurveTo(34.5, 29.5, 61, 32); g.quadraticCurveTo(34.5, 34.5, 32, 61); g.quadraticCurveTo(29.5, 34.5, 3, 32); g.quadraticCurveTo(29.5, 29.5, 32, 3);
  g.fill();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
})();
const twinkleUniforms = { uTime: { value: 0 }, uMap: { value: sparkTex }, uScale: { value: 400 } };
// 一群會眨眼的點：每一顆大小、顏色、閃的節奏都不一樣（size：世界單位，近大遠小）
function twinkles(list) {
  const g = new THREE.BufferGeometry(), n = list.length;
  const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), size = new Float32Array(n), phase = new Float32Array(n);
  list.forEach((s, k) => { pos.set(s.p, k * 3); col.set(s.c, k * 3); size[k] = s.s; phase[k] = Math.random(); });
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  g.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
  const m = new THREE.Points(g, new THREE.ShaderMaterial({
    uniforms: twinkleUniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
    vertexShader: \`attribute float aSize; attribute float aPhase; attribute vec3 aColor; uniform float uTime; uniform float uScale; varying float vA; varying vec3 vC;
      void main() { vec4 mv = modelViewMatrix * vec4(position, 1.); float tw = .5 + .5 * sin(uTime * (1.1 + aPhase * 1.8) + aPhase * 6.283);
        vA = .35 + .65 * tw; vC = aColor; gl_PointSize = aSize * uScale * (.75 + .35 * tw) / -mv.z; gl_Position = projectionMatrix * mv; }\`,
    fragmentShader: \`uniform sampler2D uMap; varying float vA; varying vec3 vC; void main() { vec4 t = texture2D(uMap, gl_PointCoord); gl_FragColor = vec4(vC * t.rgb, t.a * vA); }\`,
  }));
  m.frustumCulled = false; m.renderOrder = -2;
  return m;
}
{
  // 遠遠的星星（掛在天空球上，跟著鏡頭）
  const list = [];
  for (let k = 0; k < 170; k++) {
    const u = rand(-1, 1), a = rand(0, TAU), r = Math.sqrt(1 - u * u);
    const tint = Math.random();
    list.push({ p: [Math.cos(a) * r * 480, u * 480, Math.sin(a) * r * 480], c: tint < .2 ? [1, .92, .75] : tint < .4 ? [.78, .86, 1] : [1, 1, 1], s: rand(2.2, 5.5) * (Math.random() < .08 ? 2 : 1) });
  }
  skyDome.add(twinkles(list));
}
// 方塊旁邊飄著的大閃光：排成一圈圍在方塊外面（不擋到格子），跟著鏡頭的方向慢慢轉
const sparkles = (() => {
  const list = [];
  for (let k = 0; k < 30; k++) {
    const a = k / 30 * TAU + rand(-.08, .08), r = H * rand(1.55, 2.7);
    list.push({ p: [Math.cos(a) * r, Math.sin(a) * r, H * rand(-1.4, .2)], c: Math.random() < .3 ? [1, .93, .7] : [.85, .92, 1], s: rand(.22, .5) });
  }
  const m = twinkles(list);
  scene.add(m);
  return m;
})();

// ═══════════════════════════ 2. 方塊世界：外面一層圓角小方塊（淺藍棋盤格），裡面一顆發光的芯 ═══════════════════════════
{
  const shell = [];
  for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) for (let z = 0; z < N; z++) {
    if (x === 0 || y === 0 || z === 0 || x === N - 1 || y === N - 1 || z === N - 1) shell.push([x, y, z]);
  }
  const tileMat = rimGlow(std('#ffffff', { roughness: .62, emissive: '#3d5fc4', emissiveIntensity: .06 }), [.62, .74, 1], 2.4, .2);
  const tiles = new THREE.InstancedMesh(roundedCube(.22, 3), tileMat, shell.length);
  const LIGHT = C('#c2d9ff'), DARK = C('#a2bff7'), c = new THREE.Color();
  shell.forEach(([x, y, z], k) => {
    dummy.position.set(x - (N - 1) / 2, y - (N - 1) / 2, z - (N - 1) / 2);
    dummy.scale.setScalar(.955); dummy.rotation.set(0, 0, 0); dummy.updateMatrix();
    tiles.setMatrixAt(k, dummy.matrix);
    c.copy((x + y + z) % 2 ? DARK : LIGHT).offsetHSL(rand(-.006, .006), 0, rand(-.012, .012));
    tiles.setColorAt(k, c);
  });
  tiles.castShadow = false; tiles.receiveShadow = true;
  world.add(tiles);
  // 芯：從小方塊之間的縫透出一點光
  world.add(new THREE.Mesh(new THREE.BoxGeometry(N - 1.15, N - 1.15, N - 1.15), new THREE.MeshBasicMaterial({ color: '#86a6f4' })));
}

// ═══════════════════════════ 3. 方塊表面的格子：「兩倍座標」的整數 ═══════════════════════════
// 一格的中心 = (x, y, z) / 2：表面那一軸是 ±N（法線就是那一軸），另外兩軸是 1-N、3-N … N-1
const FACE = { right: [1, 0, 0], left: [-1, 0, 0], top: [0, 1, 0], bottom: [0, -1, 0], front: [0, 0, 1], back: [0, 0, -1] };
const FACES = Object.values(FACE).map(([x, y, z]) => ({ x, y, z }));
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
const neg = (a) => ({ x: -a.x, y: -a.y, z: -a.z });
const same = (a, b) => a.x === b.x && a.y === b.y && a.z === b.z;
const cross = (a, b) => ({ x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x });
const TANGENTS = new Map(FACES.map((f) => [\`\${f.x},\${f.y},\${f.z}\`, FACES.filter((d) => dot(d, f) === 0)]));
const tangents = (n) => TANGENTS.get(\`\${n.x},\${n.y},\${n.z}\`);
function cell(x, y, z) {
  const n = Math.abs(x) === N ? { x: Math.sign(x), y: 0, z: 0 } : Math.abs(y) === N ? { x: 0, y: Math.sign(y), z: 0 } : { x: 0, y: 0, z: Math.sign(z) };
  return { x, y, z, n, k: ((x + 40) * 81 + (y + 40)) * 81 + (z + 40) };
}
// 往 d 走一格；超出這一面就繞過邊緣到隔壁那一面（原本往 d 走，繞過去之後往 -n 走；axis 是轉過去的軸）
function advance(c, d) {
  const x = c.x + 2 * d.x, y = c.y + 2 * d.y, z = c.z + 2 * d.z;
  if (Math.abs(x) <= N && Math.abs(y) <= N && Math.abs(z) <= N) return { cell: cell(x, y, z), dir: d, axis: null };
  const n = c.n;
  return { cell: cell(c.x + d.x - n.x, c.y + d.y - n.y, c.z + d.z - n.z), dir: neg(n), axis: cross(n, d) };
}
// 「畫面」的方向：r＝畫面右、u＝畫面上、n＝朝著你的那一面（小蛇的頭在的那一面）。爬過邊緣時三個一起繞那條邊轉 90°
const turnVec = (v, a) => { const c = cross(a, v), k = dot(a, v); return { x: c.x + a.x * k, y: c.y + a.y * k, z: c.z + a.z * k }; };
const turnFrame = (f, a) => ({ r: turnVec(f.r, a), u: turnVec(f.u, a), n: turnVec(f.n, a) });
// 任何一面的預設方向（給測試用的 lay）：上面那一面是「往後＝上、往右＝右」
function frameFor(n) {
  if (n.y === 1) return { r: { x: 1, y: 0, z: 0 }, u: { x: 0, y: 0, z: -1 }, n };
  const u = n.y === 0 ? { x: 0, y: 1, z: 0 } : { x: 0, y: 0, z: -1 };
  return { r: cross(u, n), u, n };
}
function cellAt(face, i, j) {
  const f = FACE[face] || FACE.top, ax = f[0] ? 0 : f[1] ? 1 : 2, other = [0, 1, 2].filter((a) => a !== ax);
  const c = [0, 0, 0], q = (v) => 2 * Math.max(0, Math.min(N - 1, Math.round(v))) + 1 - N;
  c[ax] = N * f[ax]; c[other[0]] = q(i); c[other[1]] = q(j);
  return cell(c[0], c[1], c[2]);
}
const faceName = (n) => Object.keys(FACE).find((k) => FACE[k][0] === n.x && FACE[k][1] === n.y && FACE[k][2] === n.z);
function cellInfo(c) {
  if (!c) return null;
  const ax = c.n.x ? 0 : c.n.y ? 1 : 2, v = [c.x, c.y, c.z], other = [0, 1, 2].filter((a) => a !== ax);
  return { face: faceName(c.n), i: (v[other[0]] + N - 1) / 2, j: (v[other[1]] + N - 1) / 2 };
}
const surf = (c, out) => out.set(c.x / 2, c.y / 2, c.z / 2);   // 格子中心（在方塊表面上）
const nvec = (n, out) => out.set(n.x, n.y, n.z);

// ═══════════════════════════ 4. 模型：蘋果、金星果；蛇頭是自己做的方方小蛇 ═══════════════════════════
function fitModel(inner, size) {
  const box = new THREE.Box3().setFromObject(inner);
  const dim = box.getSize(new V3()), c = box.getCenter(new V3());
  const k = size / Math.max(dim.x, dim.z, 1e-3);
  inner.scale.multiplyScalar(k);
  inner.position.set(-c.x * k, -box.min.y * k, -c.z * k);
  const outer = new THREE.Group();
  outer.add(inner);
  outer.userData.size = new V3(dim.x * k, dim.y * k, dim.z * k);
  return outer;
}
async function loadModel(key, size, fallback) {
  const id = P[key];
  if (id) {
    try {
      const m = await larch.model(id);
      if (!new THREE.Box3().setFromObject(m).isEmpty()) return fitModel(m, size);
    } catch (e) { console.warn(\`[貪吃小蛇] \${key} 模型讀不到，改用替代形狀\`, e && e.message); }
  }
  return fitModel(fallback(), size);
}
const cubeGeo = roundedCube(.24, 3);
const eyes = [], pupils = [];
let tongue = null, face = null;
// 小蛇頭：方方的綠色圓角方塊。臉（大眼睛、腮紅、微笑）長在頭頂上：鏡頭從上面看，臉會自己轉成在畫面上正正的，
// 黑眼珠看著小蛇要去的方向；舌頭從頭的前面（+Z）吐出來
function makeHead() {
  const g = new THREE.Group();
  const skull = mesh(cubeGeo, rimGlow(std(BODY, { roughness: .45 }), [1, 1, .9], 3, .18), 0, .42, 0); skull.scale.set(.96, .84, .96); g.add(skull);
  const white = std('#ffffff', { roughness: .3 }), black = std('#1d2a1a', { roughness: .25 }), shine = new THREE.MeshBasicMaterial({ color: '#ffffff' });
  const blush = std('#ffa6b8', { roughness: .7, emissive: '#ff8aa4', emissiveIntensity: .2 });
  face = new THREE.Group(); face.position.set(0, .83, 0); g.add(face);   // 頭頂的正中間；face 的 +Z 是畫面的下方
  for (const sx of [-1, 1]) {
    const eye = new THREE.Group(); eye.position.set(sx * .2, .09, -.13); face.add(eye); eyes.push(eye);
    const ball = mesh(ballGeo, white, 0, 0, 0); ball.scale.set(.2, .19, .2); eye.add(ball);
    const pupil = mesh(ballGeo, black, 0, .17, 0, false); pupil.scale.set(.12, .12, .05); eye.add(pupil); pupils.push(pupil);
    const hi = mesh(ballGeo, shine, 0, 0, 0, false); hi.position.set(-.33, 1, -.33).normalize().multiplyScalar(.205); hi.scale.setScalar(.034); eye.add(hi);
    const cheek = mesh(ballGeo, blush, sx * .34, .015, .13, false); cheek.scale.set(.085, .012, .06); face.add(cheek);
  }
  const smile = mesh(new THREE.TorusGeometry(.065, .016, 6, 14, Math.PI), black, 0, .02, .16, false); smile.rotation.x = Math.PI / 2; face.add(smile);
  // 小小的粉紅舌頭（偶爾吐一下）
  tongue = new THREE.Group(); tongue.position.set(0, .3, .48); g.add(tongue);
  const tm = std('#ff7f9e', { roughness: .5, emissive: '#ff5f86', emissiveIntensity: .15 });
  const stem = mesh(new THREE.BoxGeometry(.05, .015, .16), tm, 0, 0, .08, false); tongue.add(stem);
  for (const sx of [-1, 1]) { const tip = mesh(new THREE.BoxGeometry(.035, .015, .07), tm, sx * .02, 0, .18, false); tip.rotation.y = sx * .5; tongue.add(tip); }
  tongue.scale.set(1, 1, .01);
  return g;
}
function makeApple() {
  const g = new THREE.Group();
  const body = mesh(ballGeo, std('#ff5a5f', { roughness: .4 }), 0, .32, 0); body.scale.set(.32, .29, .32); g.add(body);
  const stem = mesh(new THREE.CylinderGeometry(.025, .03, .16, 6), std('#8a5a3a'), 0, .64, 0); stem.rotation.z = .2; g.add(stem);
  const leaf = mesh(ballGeo, std('#6cc94f'), .1, .66, 0); leaf.scale.set(.1, .025, .05); leaf.rotation.z = -.4; g.add(leaf);
  return g;
}
const starGeo = new THREE.ExtrudeGeometry(starShape(.36, .17), { depth: .12, bevelEnabled: true, bevelThickness: .07, bevelSize: .06, bevelSegments: 3, curveSegments: 4 });
starGeo.center();
const goldMat = std('#ffd23f', { roughness: .35, emissive: '#ffb000', emissiveIntensity: .35 });
function makeStar() { return mesh(starGeo, goldMat, 0, .45, 0); }

const [APPLE, STAR] = await Promise.all([loadModel('apple', .82, makeApple), loadModel('star', .95, makeStar)]);
const HEAD = fitModel(makeHead(), 1.04);
world.add(HEAD, APPLE, STAR);
// 會動的東西不投真的影子（會一閃一閃有顆粒），改成底下一塊柔柔的圓角影子
for (const o of [HEAD, APPLE, STAR]) o.traverse((m) => { m.castShadow = false; });
APPLE.visible = STAR.visible = false;
const HEAD_H = HEAD.userData.size.y;

// 金星果旁邊的倒數小金珠（一顆一顆消失）
const starDots = new THREE.InstancedMesh(lowBallGeo, goldMat, 12);
starDots.visible = false; starDots.frustumCulled = false;
world.add(starDots);
let starFx = null;

// 撞到之後頭上轉圈圈的小星星
const dizzy = new THREE.Group();
const smallStar = new THREE.ExtrudeGeometry(starShape(.2, .09), { depth: .05, bevelEnabled: true, bevelThickness: .035, bevelSize: .03, bevelSegments: 2, curveSegments: 1 });
smallStar.center();
const dizzyMat = std('#ffe14a', { roughness: .3, emissive: '#ffc400', emissiveIntensity: .7 });
for (let k = 0; k < 5; k++) dizzy.add(mesh(smallStar, dizzyMat, 0, 0, 0, false));
dizzy.visible = false;
world.add(dizzy);

// ═══════════════════════════ 5. 蛇身：一節一個圓角方塊，深淺綠交錯，尾巴越來越小 ═══════════════════════════
const MAX_SEG = 6 * N * N + 8;
const bodyMesh = new THREE.InstancedMesh(cubeGeo, rimGlow(std('#ffffff', { roughness: .45 }), [1, 1, .9], 3, .18), MAX_SEG);
bodyMesh.frustumCulled = false; bodyMesh.castShadow = false; bodyMesh.receiveShadow = true;
for (let k = 0; k < MAX_SEG; k++) bodyMesh.setColorAt(k, k % 2 ? BODY_DARK : BODY_LIGHT);
bodyMesh.count = 0;
world.add(bodyMesh);
// 柔柔的影子（一張模糊的圓角方形貼在表面上，往太陽的反方向偏一點）
const blobTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  g.shadowColor = 'rgba(255,255,255,1)'; g.shadowBlur = 9; g.shadowOffsetX = 200;
  g.fillStyle = '#fff'; g.beginPath();
  const x = 14 - 200, y = 14, w = 36, r = 11;
  g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + w, r); g.arcTo(x + w, y + w, x, y + w, r); g.arcTo(x, y + w, x, y, r); g.arcTo(x, y, x + w, y, r); g.fill();
  return new THREE.CanvasTexture(c);
})();
const blobs = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: '#1b2c78', alphaMap: blobTex, transparent: true, opacity: .5, depthWrite: false }), MAX_SEG + 4);
blobs.frustumCulled = false; blobs.count = 0; blobs.renderOrder = 1;
world.add(blobs);

// ═══════════════════════════ 6. 表面上擴散的小圈圈、飄起來的分數、找蘋果的小箭頭 ═══════════════════════════
const waves = [];
for (let i = 0; i < 4; i++) {
  const m = new THREE.Mesh(new THREE.RingGeometry(.82, 1, 40), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false }));
  m.visible = false;
  world.add(m);
  waves.push({ m, age: 1, life: .55, size: 2 });
}
let waveNext = 0;
const Z_AXIS = new V3(0, 0, 1), Y_AXIS = new V3(0, 1, 0);
function wave(c, color, size = 2) {
  const w = waves[waveNext]; waveNext = (waveNext + 1) % waves.length;
  const n = nvec(c.n, new V3());
  w.age = 0; w.size = size; w.m.visible = true; w.m.material.color.set(color);
  surf(c, w.m.position).addScaledVector(n, .04);
  w.m.quaternion.setFromUnitVectors(Z_AXIS, n);
}

const css = document.createElement('style');
const outline = (c) => [[3, 3], [-3, 3], [3, -3], [-3, -3], [0, 4], [0, -4], [4, 0], [-4, 0], [2, 4], [-2, 4], [2, -4], [-2, -4], [4, 2], [-4, 2], [4, -2], [-4, -2]].map(([x, y]) => \`\${x}px \${y}px 0 \${c}\`).join(',');
css.textContent = \`
.sn-pop{position:absolute;left:0;top:0;font:900 clamp(26px,3.2vmin,40px)/1 "Baloo 2","Nunito","Noto Sans TC",system-ui,sans-serif;color:#fff;pointer-events:none;white-space:nowrap;
  text-shadow:\${outline('#3fae3a')},0 7px 8px rgba(20,40,90,.35)}
.sn-pop.gold{font-size:clamp(32px,4vmin,50px);text-shadow:\${outline('#f39a1d')},0 6px 8px rgba(160,90,0,.25)}
/* 找東西的小提示：白框圓圓的小蘋果（金星果），外面一個會輕輕跳的白色箭頭 */
.sn-hint{position:absolute;left:0;top:0;width:0;height:0;pointer-events:none;opacity:0;transition:opacity .3s}
.sn-hint.on{opacity:1}
.sn-hint b{position:absolute;left:-15px;top:-15px;width:30px;height:30px;border-radius:50%;box-shadow:0 0 0 3px #fff,0 4px 10px rgba(5,10,40,.45);
  background:radial-gradient(circle at 36% 34%,#ffb0ac 0 12%,#ff5a5f 46%,#e23f4c 100%)}
.sn-hint b::after{content:"";position:absolute;left:15px;top:-4px;width:11px;height:6px;border-radius:6px 0;background:#6cc94f;transform:rotate(-25deg)}
.sn-hint.gold b{background:radial-gradient(circle at 36% 34%,#fff4b8 0 12%,#ffd23f 50%,#f5a623 100%)}
.sn-hint.gold b::after{display:none}
.sn-hint i{position:absolute;left:-9px;top:-6px;width:0;height:0;border-left:9px solid transparent;border-right:9px solid transparent;border-bottom:12px solid #fff;
  filter:drop-shadow(0 2px 3px rgba(5,10,40,.4));transform:rotate(var(--a)) translateY(-30px);animation:snNudge .7s ease-in-out infinite alternate}
@keyframes snNudge{to{transform:rotate(var(--a)) translateY(-37px)}}
/* 大標題卡：手機上原本只有半個畫面寬，說明會擠成好幾行 */
.lg-ui .lg-banner{width:max-content;max-width:calc(100% - 40px)}
.lg-ui .lg-banner span{white-space:pre-line}\`;
document.head.append(css);
let VW = larch.ui.root.clientWidth || innerWidth, VH = larch.ui.root.clientHeight || innerHeight;
addEventListener('resize', () => { VW = larch.ui.root.clientWidth || innerWidth; VH = larch.ui.root.clientHeight || innerHeight; });
const toScreen = (p) => { const q = p.clone().project(camera); return { x: (q.x * .5 + .5) * VW, y: (-q.y * .5 + .5) * VH, behind: q.z > 1 }; };
// 「+10」這種彈起來的字（pos：世界座標）
function popText(text, pos, gold = false) {
  const s = toScreen(pos.clone().addScaledVector(camera.up, .7));
  if (s.behind) return;
  const el = document.createElement('div');
  el.className = \`sn-pop\${gold ? ' gold' : ''}\`;
  el.textContent = text;
  larch.ui.root.append(el);
  const { x, y } = s;
  el.animate([
    { transform: \`translate(\${x}px,\${y}px) translate(-50%,-50%) scale(.3)\`, opacity: 0 },
    { transform: \`translate(\${x}px,\${y - 30}px) translate(-50%,-50%) scale(1.25)\`, opacity: 1, offset: .22 },
    { transform: \`translate(\${x}px,\${y - 40}px) translate(-50%,-50%) scale(1)\`, opacity: 1, offset: .5 },
    { transform: \`translate(\${x}px,\${y - 70}px) translate(-50%,-50%) scale(.9)\`, opacity: 0 },
  ], { duration: 1000, easing: 'ease-out', fill: 'forwards' }).onfinish = () => el.remove();
}
function makeHint(gold) {
  const el = document.createElement('div');
  el.className = \`sn-hint\${gold ? ' gold' : ''}\`;
  el.innerHTML = '<i></i><b></b>';
  larch.ui.root.append(el);
  return { el, dir: null, on: false };
}
const appleHint = makeHint(false), starHint = makeHint(true);
let best = 0;
function showScore() {
  larch.ui.text('score', \`分數 \${score}\`, { at: 'top-left' });
  larch.ui.text('len', \`長度 \${len}　最佳 \${best}\`, { at: 'top-left', size: 'small' });
}

// ═══════════════════════════ 7. 遊戲狀態 ═══════════════════════════
const OPP = { up: 'down', down: 'up', left: 'right', right: 'left' };
let frame = frameFor({ x: 0, y: 1, z: 0 });   // 鏡頭要轉到的方向（跟著小蛇的頭，爬過邊緣就轉 90°）
let cells = [];                // 蛇走過的格子：cells[0] 是頭正要走進去的格子
let len = 3, grow = 0, dir = frame.r, queue = [];
let acc = 0, alive = false, moving = false, frozen = false, score = 0, visLen = 2;
let apple = null, star = null, starT = 0, nextStar = 12;
const bumps = [];              // 吞下去的東西在肚子裡往後走的小鼓包
let headPunch = 0, wobble = 0, bonk = 0, dizzyT = 0, crawl = 0, hitDir = null, snapCam = true, snapHead = true, snapFace = true;
let blinkT = 2, tongueT = 3.5;

const rate = () => BASE_SPEED * (1 + Math.min(.8, (len - 3) * .03)); // 越長越快（最多快八成）
const occupied = (key, upto = len) => { for (let k = 0; k < Math.min(upto, cells.length); k++) if (cells[k].k === key) return true; return false; };
const localDir = (name) => (name === 'up' ? frame.u : name === 'down' ? neg(frame.u) : name === 'right' ? frame.r : neg(frame.r));
const screenOf = (d) => (same(d, frame.u) ? 'up' : same(d, neg(frame.u)) ? 'down' : same(d, frame.r) ? 'right' : same(d, neg(frame.r)) ? 'left' : null);
const randomOn = (n) => cellAt(faceName(n), Math.floor(Math.random() * N), Math.floor(Math.random() * N));
// 放東西的空格：一半放在小蛇這一面，大多放在隔壁四面，偶爾才放到背面（玩家才不用到處找）
function freeCell() {
  const h = cells[0];
  const ok = (c) => !occupied(c.k, len + 1) && !(apple && apple.k === c.k) && !(star && star.k === c.k)
    && Math.abs(c.x - h.x) + Math.abs(c.y - h.y) + Math.abs(c.z - h.z) >= 6;
  for (let tries = 0; tries < 300; tries++) {
    const r = Math.random();
    const n = r < .5 ? h.n : r < .94 ? tangents(h.n)[Math.floor(Math.random() * 4)] : neg(h.n);
    const c = randomOn(n);
    if (ok(c)) return c;
  }
  for (const f of FACES) for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const c = cellAt(faceName(f), i, j); if (ok(c)) return c; }
  return null;
}
function placeApple(at) {
  apple = at || freeCell();
  if (!apple) { APPLE.visible = false; return; }
  APPLE.visible = true;
  APPLE.scale.setScalar(.01);
  larch.tween(APPLE.scale, { x: 1, y: 1, z: 1 }, .45, 'outBack');
  wave(apple, '#ffffff', 1.4);
  appleHint.dir = firstStep(apple);
}
function placeStar(at) {
  star = at || freeCell();
  if (!star) return;
  starT = 7;
  STAR.visible = true; starDots.visible = true;
  STAR.scale.setScalar(.01);
  larch.tween(STAR.scale, { x: 1, y: 1, z: 1 }, .5, 'outBack');
  wave(star, '#fff3b0', 2);
  if (starFx) starFx.stop();
  starFx = larch.effect('sparkle', toWorld(star, .5), { loop: true, follow: STAR, scale: .6 });
  larch.sound('chime', .5);
  larch.ui.toast('金星果出現了！快去吃！');
  starHint.dir = firstStep(star);
}
function removeStar() {
  star = null; STAR.visible = false; starDots.visible = false; nextStar = rand(10, 16);
  if (starFx) { starFx.stop(); starFx = null; }
}
// 從頭出發、避開身體，一圈一圈往外找：要去那裡的第一步往哪走（給「看不到蘋果」時的小箭頭）
function firstStep(target) {
  if (!target || !cells.length) return null;
  const start = cells[0];
  const blocked = new Set();
  for (let k = 1; k < Math.min(len, cells.length) - 1; k++) blocked.add(cells[k].k);
  for (const avoid of [true, false]) {
    const first = new Map([[start.k, null]]), list = [start];
    for (let q = 0; q < list.length; q++) {
      const c = list[q];
      if (c.k === target.k) return first.get(c.k);
      for (const d of tangents(c.n)) {
        const nx = advance(c, d).cell;
        if (first.has(nx.k) || (avoid && blocked.has(nx.k))) continue;
        first.set(nx.k, q === 0 ? d : first.get(c.k));
        list.push(nx);
      }
    }
  }
  return null;
}

// 新的一局：小蛇在上面那一面的中間、往右走
function reset() {
  frame = frameFor({ x: 0, y: 1, z: 0 });
  dir = frame.r;
  const head = cellAt('top', Math.floor(N / 2), Math.floor(N / 2));
  cells = [head];
  let c = head, back = neg(dir);
  for (let k = 0; k < 5; k++) { const mv = advance(c, back); c = mv.cell; back = mv.dir; cells.push(c); }
  len = 3; grow = 0; queue = []; acc = 0; score = 0; visLen = len - 1;
  bumps.length = 0; headPunch = 0; wobble = 0; bonk = 0; dizzyT = 0; hitDir = null; snapHead = true;
  dizzy.visible = false;
  apple = null; removeStar(); nextStar = rand(8, 12);
  placeApple();
  alive = true; moving = false;
  larch.setVar('snakeLength', len);
  showScore();
}

// 往前走一格：轉彎、爬過邊緣、撞到自己、吃東西
function step() {
  while (queue.length) {
    const d = localDir(queue.shift());
    if (same(d, dir) || same(d, neg(dir))) continue; // 不能直接掉頭
    dir = d; break;
  }
  const mv = advance(cells[0], dir), next = mv.cell;
  if (occupied(next.k, grow === 0 ? len - 1 : len)) { die(); return; }
  cells.unshift(next);
  if (mv.axis) { frame = turnFrame(frame, mv.axis); dir = mv.dir; }   // 爬過邊緣：鏡頭跟著轉過去
  if (grow > 0) { grow--; len++; larch.setVar('snakeLength', len); } // （劇情觸發可以用：小蛇長到幾節就播對話卡）
  while (cells.length > len + 2) cells.pop();
  if (apple && next.k === apple.k) eat(false);
  if (star && next.k === star.k) eat(true);
  appleHint.dir = firstStep(apple);
  starHint.dir = firstStep(star);
}
const toWorld = (c, lift = 0) => { const p = surf(c, new V3()); p.addScaledVector(nvec(c.n, new V3()), lift); return world.localToWorld(p); };
function eat(golden) {
  const pos = toWorld(cells[0], .6);
  grow += 1;
  score += golden ? 50 : 10;
  headPunch = 1;
  bumps.push({ s: 0, big: golden ? 1.4 : 1 });
  if (golden) {
    larch.effect('confetti', pos, { scale: .8 });
    larch.effect('hearts', pos, { scale: 1.6 });
    wave(cells[0], '#ffe27a', 3.2);
    larch.sound('yum', .7); larch.sound('coin', .5);
    popText('+50', pos, true);
    removeStar();
  } else {
    larch.effect('hearts', pos, { scale: 1.3 });
    wave(cells[0], '#ffffff', 2.2);
    larch.sound('gulp', .55); larch.sound('pop', .35);
    popText('+10', pos);
    placeApple();
  }
  showScore();
}
function die() {
  alive = false; moving = false;
  acc = 1; // 停在撞到的那一刻：身體接著頭
  hitDir = dir;
  larch.shake(.25, .3);
  larch.sound('boing', .7); larch.sound('puff', .4);
  larch.effect('dust', toWorld(cells[0], .3), { scale: .8 });
  wobble = 1; bonk = 1; dizzyT = 0;
  dizzy.visible = true;
}

// ═══════════════════════════ 8. 輸入：鍵盤、滑動（照畫面上的方向） ═══════════════════════════
function turn(name) {
  if (!alive || !OPP[name]) return;
  if (!moving) { moving = true; larch.ui.remove('hint'); }   // 第一次按方向就出發
  const last = queue.length ? queue[queue.length - 1] : screenOf(dir);
  if (name === last || name === OPP[last]) return;
  if (queue.length < 3) queue.push(name);
}
const KEYS = { ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down', ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right' };
larch.input.onKey((code, isDown) => { if (isDown && KEYS[code]) turn(KEYS[code]); });
// 手機：在畫面上滑一下就轉彎；手指不放開也可以連續轉
const swipe = { x: 0, y: 0 };
larch.input.onDrag((p, d) => {
  swipe.x += d.x * camera.aspect; swipe.y += d.y;
  if (Math.hypot(swipe.x, swipe.y) < .07) return;
  if (Math.abs(swipe.x) > Math.abs(swipe.y)) turn(swipe.x > 0 ? 'right' : 'left');
  else turn(swipe.y > 0 ? 'up' : 'down');
  swipe.x = swipe.y = 0;
});

// ═══════════════════════════ 9. 鏡頭（其實是轉方塊世界） ═══════════════════════════
// 方塊世界轉成「小蛇頭底下那塊表面」朝著你：把方塊想成圓角很大的方塊，頭底下的法線在面中間是直的、靠近邊緣慢慢斜、
// 剛好在邊上是 45°（兩面一樣），所以爬過邊緣時鏡頭是連續轉過去的，不會突然跳，也先看得到下一面。
// 頭在畫面上的位置（anchor）跟著小蛇走；方塊再慢慢移回「這一面在中間」，移的速度比小蛇慢，小蛇在畫面上永遠是往前走。
// tilt：從上面往下看多少（看得到上面那一面）、side：往右偏多少；round：離邊緣幾成開始轉；follow：頭留在中間的程度；fit／zoom：遠近
const CAM = { fov: 34, tilt: -.42, side: .22, round: .55, follow: .5, depth: .3, pan: 2.4, panMax: .45, fit: .88, fitTall: .74, zoom: 1, k: 7, sway: 1, headLook: .55 };
const _m = new THREE.Matrix4(), _fq = new Quat(), q1 = new Quat(), qF = new Quat(), _sw = new Quat(), _e = new THREE.Euler();
const _cr = new V3(), _cu = new V3(), _cn = new V3(), _po = new V3();
const anchor = new V3(), prevHp = new V3(), _ga = new V3(), _gb = new V3();
const flat = (v) => v.addScaledVector(N0, -v.dot(N0));   // 只留跟畫面平行的部分
function cameraTarget(hp) {
  const inner = H * (1 - CAM.round), cl = (v) => Math.max(-inner, Math.min(inner, v));
  _cn.set(hp.x - cl(hp.x), hp.y - cl(hp.y), hp.z - cl(hp.z));
  if (_cn.lengthSq() < 1e-8) nvec(frame.n, _cn); else _cn.normalize();
  nvec(frame.u, _cu).addScaledVector(_cn, -_cu.dot(_cn)).normalize();   // 畫面的「上」：跟著小蛇一起繞過邊緣
  _cr.crossVectors(_cu, _cn);
  return _fq.setFromRotationMatrix(_m.makeBasis(_cr, _cu, _cn)).invert();
}
const _cd = new V3(), _sz = new Quat();
function placeCamera() {
  if (camera.fov !== CAM.fov) { camera.fov = CAM.fov; camera.updateProjectionMatrix(); }   // 長一點的鏡頭：像在看桌上的小模型，不會變形
  const t = CAM.tilt, s = CAM.side;
  _cd.set(Math.sin(s) * Math.cos(t), -Math.sin(t), Math.cos(s) * Math.cos(t)).applyQuaternion(QBASE);
  const tanV = Math.tan(camera.fov * Math.PI / 360), tanH = tanV * camera.aspect;
  const dist = (H * Math.sqrt(3) + .8) * (camera.aspect < .9 ? CAM.fitTall : CAM.fit) / Math.sin(Math.atan(Math.min(tanV, tanH))) / CAM.zoom;   // 手機直拿：方塊可以超出兩邊一點，格子才夠大
  camera.up.copy(U0);
  camera.position.copy(_cd).multiplyScalar(dist);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  skyDome.position.copy(camera.position);
  skyDome.quaternion.copy(camera.quaternion);
  sparkles.quaternion.copy(camera.quaternion).multiply(_sz.setFromAxisAngle(Z_AXIS, larch.time * .025));
}
placeCamera();

// ═══════════════════════════ 10. 每一格 ═══════════════════════════
// A → B 這一段走了 f（0..1）：同一面就直直走；不同面就以那顆邊角小方塊的中心為軸、繞過邊緣（中間稍微抬高一點）
const _ax = new V3(), _aq = new Quat();
function linkPoint(A, B, f, outP, outN) {
  if (same(A.n, B.n)) {
    outP.set(A.x + (B.x - A.x) * f, A.y + (B.y - A.y) * f, A.z + (B.z - A.z) * f).multiplyScalar(.5);
    return nvec(A.n, outN);
  }
  const ax = cross(A.n, B.n);
  _aq.setFromAxisAngle(_ax.set(ax.x, ax.y, ax.z), f * Math.PI / 2);
  nvec(A.n, outN).applyQuaternion(_aq);
  return outP.set(A.x / 2 - A.n.x * .5, A.y / 2 - A.n.y * .5, A.z / 2 - A.n.z * .5).addScaledVector(outN, .5 + .15 * Math.sin(Math.PI * f));
}
// 沿著蛇走過的路，從頭往後量 s 格，找到那個位置（表面上的點）和那裡的法線
function pathPoint(s, t, outP, outN) {
  if (s <= t) return linkPoint(cells[1], cells[0], t - s, outP, outN);
  s -= t;
  const k = Math.min(cells.length - 2, 1 + Math.floor(s));
  return linkPoint(cells[k + 1], cells[k], Math.max(0, 1 - (s - (k - 1))), outP, outN);
}

// 蛇身方塊的前方對齊格子的軸（方塊轉 90° 看起來一樣，轉彎那一節才不會斜成菱形；繞過邊緣時跟著那條邊轉）
const AXES = [new V3(1, 0, 0), new V3(0, 1, 0), new V3(0, 0, 1)], _cand = new V3(), _keep = new V3(), _cx = new V3();
function snapForward(f, n) {
  let best = -2;
  const out = _cand.set(0, 0, 0), keep = _keep.copy(f);
  for (const e of AXES) {
    if (Math.abs(e.dot(n)) > .5) continue;
    for (const c of [e, _cx.crossVectors(n, e)]) {
      const d = c.dot(keep);
      if (Math.abs(d) > best) { best = Math.abs(d); out.copy(c).multiplyScalar(d < 0 ? -1 : 1); }
    }
  }
  return f.copy(out).addScaledVector(n, -out.dot(n)).normalize();
}
const _hp = new V3(), _hn = new V3(), _p = new V3(), _n = new V3(), _a = new V3(), _b = new V3(), _f = new V3(), _r = new V3(), _s = new V3(), _w = new V3(), _v = new V3();
const _px = new THREE.Vector2(), _hw = new V3();
// 影子：p 是表面上的點、n 是法線、size 是寬、height 是那個東西離表面多高（越高影子離越遠）
const _sunL = new V3(), _bq = new Quat(), _bs = new V3(), _bp = new V3(), _bo = new V3(), _bm = new THREE.Matrix4();
let nBlob = 0;
function blob(p, n, size, height) {
  if (nBlob >= MAX_SEG + 4) return;
  const lit = _sunL.dot(n);
  if (lit < .08) return;   // 背光的那一面不畫
  _bo.copy(_sunL).addScaledVector(n, -lit).multiplyScalar(-Math.min(1, height / Math.max(.4, lit)));
  _bp.copy(p).addScaledVector(n, .015).add(_bo);
  _bq.setFromUnitVectors(Z_AXIS, n);
  blobs.setMatrixAt(nBlob++, _bm.compose(_bp, _bq, _bs.set(size, size, 1)));
}
const _lk = new Quat();
const headQ = new Quat(), headT = new Quat(), _hq = new Quat(), _he = new THREE.Euler(), _up = new Quat(), _spin = new Quat();
// 那一格在不在鏡頭看得到的那一面（看不到時顯示小箭頭）
function hidden(c) {
  nvec(c.n, _v).transformDirection(world.matrixWorld);
  _w.copy(toWorld(c));
  return _v.dot(_a.subVectors(camera.position, _w).normalize()) < .12;
}
function updateHint(h, target, headWorld) {
  const show = Boolean(alive && moving && target && h.dir && hidden(target));
  if (show !== h.on) { h.on = show; h.el.classList.toggle('on', show); }
  if (!show) return;
  const name = screenOf(h.dir) || 'up';
  const [dx, dy] = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[name];
  const s = toScreen(headWorld), gap = PHONE ? 58 : 72, off = h === starHint && appleHint.on && appleHint.dir && same(appleHint.dir, h.dir) ? 40 : 0;
  const x = Math.max(28, Math.min(VW - 28, s.x + dx * gap + dy * off)), y = Math.max(70, Math.min(VH - 40, s.y + dy * gap + dx * off));
  h.el.style.transform = \`translate(\${x}px,\${y}px)\`;
  h.el.style.setProperty('--a', \`\${{ up: 0, right: 90, down: 180, left: 270 }[name]}deg\`);
}

larch.onUpdate((dt, time) => {
  if (!larch.input.pointer.down) swipe.x = swipe.y = 0;
  twinkleUniforms.uTime.value = time;
  twinkleUniforms.uScale.value = larch.renderer.getDrawingBufferSize(_px).y / (2 * Math.tan(camera.fov * Math.PI / 360));

  // 前進：每 1/rate 秒走一格；t 是這一格走了多少
  if (alive && moving && !frozen) {
    acc += dt * rate();
    while (acc >= 1 && alive) { acc -= 1; step(); }
  }
  const t = alive ? (moving || frozen ? acc : 0) : 1;
  visLen += (len - 1 - visLen) * (1 - Math.exp(-6 * dt));
  crawl += ((alive && (moving || frozen) ? 1 : 0) - crawl) * (1 - Math.exp(-5 * dt));   // 爬行的扭動（停下來就慢慢不扭）

  // 方塊世界轉到小蛇頭底下的表面朝著你（兩段平滑：起步、停下都很柔，不會暈）
  pathPoint(0, t, _hp, _hn);
  cameraTarget(_hp);
  if (snapCam) { q1.copy(_fq); qF.copy(_fq); }
  const kk = 1 - Math.exp(-dt * CAM.k);
  q1.slerp(_fq, kk); qF.slerp(q1, kk);
  _sw.setFromEuler(_e.set(Math.sin(time * .7) * .012 * CAM.sway, 0, Math.sin(time * .53) * .012 * CAM.sway));   // 輕輕漂浮
  world.quaternion.copy(_sw).multiply(QBASE).multiply(qF);
  // 頭在畫面上的位置：跟著小蛇在表面上走的那一段移動（方塊轉的那部分不算），再慢慢移回這一面置中的位置
  const wq = world.quaternion, home = flat(_ga.copy(_hp).applyQuaternion(wq)).multiplyScalar(1 - CAM.follow);
  if (snapCam) { anchor.copy(home); prevHp.copy(_hp); snapCam = false; }
  anchor.add(flat(_gb.copy(_hp).sub(prevHp).applyQuaternion(wq)).multiplyScalar(1 - CAM.follow));
  prevHp.copy(_hp);
  const pan = _gb.subVectors(home, anchor).multiplyScalar(1 - Math.exp(-dt * CAM.pan)), panMax = CAM.panMax * (1 - CAM.follow) * 2 * rate() * dt;   // 比小蛇在畫面上走得慢
  if (pan.length() > panMax) pan.setLength(panMax);
  anchor.add(pan);
  if (anchor.length() > H * 1.1) anchor.setLength(H * 1.1);
  _po.copy(_hp).applyQuaternion(wq);
  world.position.copy(anchor).sub(_po).addScaledVector(N0, _po.dot(N0) * (1 - CAM.depth)).addScaledVector(U0, Math.sin(time * .9) * .05 * CAM.sway);
  placeCamera();
  world.updateMatrixWorld(true);
  _sunL.copy(SUN).applyQuaternion(_bq.copy(world.quaternion).invert());   // 太陽在方塊世界裡的方向
  nBlob = 0;

  // 蛇頭：朝著走的方向（轉彎時慢慢轉過去），吃東西時鼓一下，撞到時壓扁、然後頭暈晃來晃去
  pathPoint(.14, t, _a, _n);
  _f.subVectors(_hp, _a); _f.addScaledVector(_hn, -_f.dot(_hn));
  if (_f.lengthSq() < 1e-6) nvec(dir, _f);
  _f.normalize(); _r.crossVectors(_hn, _f);
  headT.setFromRotationMatrix(_m.makeBasis(_r, _hn, _f));
  if (snapHead) { headQ.copy(headT); snapHead = false; }
  headQ.slerp(headT, 1 - Math.exp(-16 * dt));
  headPunch = Math.max(0, headPunch - dt * 4);
  wobble = Math.max(0, wobble - dt * 1.5);
  bonk = Math.max(0, bonk - dt * 3);
  const hop = Math.abs(Math.sin(time * 9)) * .035 * crawl;
  HEAD.position.copy(_hp).addScaledVector(_hn, .01 + hop + Math.sin(time * 2.5) * .02);
  blob(_hp, _hn, 1.12, .45 + hop);
  if (!alive && hitDir) HEAD.position.addScaledVector(nvec(hitDir, _a), .22 * Math.min(1, dizzyT * 6 + .3));
  if (alive) _he.set(.06 - headPunch * .12, 0, Math.sin(time * 9) * .05 * crawl, 'YXZ');   // 頭稍微往前低一點：臉在頭頂上，從上面看得清楚
  else {
    dizzyT += dt;
    const k = Math.min(1, dizzyT * 1.5);
    _he.set(.06 + Math.cos(dizzyT * 6) * .14 * k, Math.sin(time * 30) * wobble * .25, Math.sin(dizzyT * 6) * .22 * k, 'YXZ');
  }
  // 頭往鏡頭那邊仰一點（像抬頭看著你）：不管往哪走、鏡頭在哪，頭頂上的臉都看得清楚
  _a.copy(camera.position); world.worldToLocal(_a).sub(HEAD.position).applyQuaternion(_hq.copy(headQ).invert()).normalize();
  _lk.setFromAxisAngle(_b.set(_a.z, 0, -_a.x).normalize(), Math.acos(Math.min(1, _a.y)) * CAM.headLook);
  HEAD.quaternion.copy(headQ).multiply(_lk).multiply(_hq.setFromEuler(_he));
  // 臉轉成在畫面上正正的（畫面的下方 = face 的 +Z），黑眼珠往小蛇走的方向看
  _a.copy(U0).negate().applyQuaternion(_hq.copy(world.quaternion).multiply(HEAD.quaternion).invert());
  let fa = Math.atan2(_a.x, _a.z) - face.rotation.y;
  fa = Math.atan2(Math.sin(fa), Math.cos(fa));
  face.rotation.y += snapFace ? fa : fa * (1 - Math.exp(-14 * dt));
  snapFace = false;
  const ry = -face.rotation.y;
  if (alive) _b.set(Math.sin(ry) * .5, 1, Math.cos(ry) * .5).normalize();   // 頭的前方（+Z）換成 face 裡的方向
  else _b.set(Math.cos(dizzyT * 9) * .55, 1, Math.sin(dizzyT * 9) * .55).normalize();   // 頭暈：眼珠轉圈圈
  for (const pp of pupils) { pp.position.copy(_b).multiplyScalar(.17); pp.quaternion.setFromUnitVectors(Z_AXIS, _b); }
  const sq = 1 + headPunch * .22 + bonk * .2 + Math.sin(time * 18) * .025 * crawl;
  HEAD.scale.set(sq, 1 + headPunch * .1 - bonk * .25 - Math.sin(time * 18) * .02 * crawl, sq);
  // 眨眼、吐舌頭
  blinkT -= dt; tongueT -= dt;
  const blink = blinkT < .13 ? .12 : 1;
  if (blinkT < 0) blinkT = rand(2, 4.5);
  for (const e of eyes) e.scale.z = alive ? blink : 1;
  const tk = tongueT < .5 && tongueT > 0 ? Math.sin(tongueT / .5 * Math.PI) : 0;
  if (tongueT < 0) tongueT = rand(2.5, 5);
  if (tongue) tongue.scale.z = alive ? Math.max(.01, tk) : .01;
  // 頭暈的小星星
  if (dizzy.visible) {
    dizzy.position.copy(HEAD.position).addScaledVector(_hn, HEAD_H * (1 - bonk * .2) + .35);
    dizzy.quaternion.copy(headQ);
    dizzy.children.forEach((s, k) => {
      const a = dizzyT * 3.6 + k / 5 * TAU;
      s.position.set(Math.cos(a) * .7, Math.sin(a * 2) * .08, Math.sin(a) * .7);
      s.rotation.set(-Math.PI / 2 + .35 + Math.sin(dizzyT * 8 + k) * .2, 0, dizzyT * 5 + k);   // 平躺朝上（鏡頭從上面看），自己轉
      s.scale.setScalar(Math.min(1, dizzyT * 4) * (1 + Math.sin(dizzyT * 10 + k) * .12));
    });
  }

  // 蛇身：從頭往後一格一個方塊，跟著頭走過的路（爬過邊緣時繞著邊轉）；越靠尾巴越小，吃下去的東西鼓成一個大一點的方塊往後走
  for (const b of bumps) b.s += dt * rate();
  while (bumps.length && bumps[0].s > visLen + 1) bumps.shift();
  const total = Math.max(0, visLen);
  let n = 0;
  for (let k = 1; k <= Math.ceil(total) && n < MAX_SEG; k++) {
    const s = k;
    pathPoint(Math.max(0, s - .06), t, _a, _n); pathPoint(s + .06, t, _b, _n);
    pathPoint(s, t, _p, _n);
    snapForward(_f.subVectors(_a, _b), _n);
    const w = Math.sin(time * 9 - k * 1.1) * .08 * crawl;           // 方塊微微左右擺
    _r.crossVectors(_n, _f); _f.multiplyScalar(Math.cos(w)).addScaledVector(_r, Math.sin(w)); _r.crossVectors(_n, _f);
    const grown = Math.min(1, total - k + 1);                        // 剛長出來的那一節慢慢變大
    let size = .86 * (1 - .1 * k / Math.max(1, total));
    size *= .62 + .38 * smooth((total + 1 - k) / 2.2);              // 尾巴那兩三節比較小
    for (const b of bumps) { const d = s - b.s; size += .16 * b.big * Math.exp(-d * d * 3); }
    size *= grown;
    const lift = Math.max(0, Math.sin(time * 9 - k * 1.1)) * .07 * crawl;   // 一節一節輪流跳一下
    blob(_p, _n, size * 1.18, size * .45 + lift);
    _m.makeBasis(_r, _n, _f).scale(_s.set(size, size * .92, size)).setPosition(_p.addScaledVector(_n, size * .46 - .02 + lift));
    bodyMesh.setMatrixAt(n++, _m);
  }
  bodyMesh.count = n;
  bodyMesh.instanceMatrix.needsUpdate = true;

  // 蘋果輕輕上下飄、慢慢轉；金星果一直面向鏡頭、左右搖擺、閃閃發亮
  nvec(frame.u, _v);
  if (apple) {
    nvec(apple.n, _n);
    const bob = .05 + Math.sin(time * 2.6) * .06;
    surf(apple, APPLE.position).addScaledVector(_n, bob);
    if (APPLE.visible) blob(surf(apple, _p), _n, .78, .35 + bob);
    _a.copy(_n).multiplyScalar(.35).addScaledVector(_v, Math.max(0, 1 - Math.abs(_v.dot(_n)))).normalize();   // 往畫面上方站：看得到蘋果的側面和蒂頭
    APPLE.quaternion.copy(_up.setFromUnitVectors(Y_AXIS, _a)).multiply(_spin.setFromAxisAngle(Y_AXIS, time * 1.1));
  }
  if (star) {
    if (alive) starT -= dt;
    nvec(star.n, _n);
    const sbob = .12 + Math.sin(time * 3.2) * .08;
    surf(star, STAR.position).addScaledVector(_n, sbob);
    blob(surf(star, _p), _n, .72, .45 + sbob);
    // 正面朝著鏡頭（鏡頭的方向換成方塊世界裡的方向）
    _a.copy(camera.position).applyMatrix4(_m.copy(world.matrixWorld).invert()).sub(STAR.position).normalize();
    _b.copy(_v).addScaledVector(_a, -_v.dot(_a)).normalize();
    _r.crossVectors(_b, _a);
    STAR.quaternion.setFromRotationMatrix(_m.makeBasis(_r, _b, _a)).multiply(_spin.setFromAxisAngle(Y_AXIS, Math.sin(time * 2.4) * .6));
    STAR.visible = starT > 2 || Math.floor(time * 8) % 2 === 0;   // 快消失時閃爍
    const shown = Math.ceil(Math.max(0, starT) / 7 * 12);
    const [e1, e2] = tangents(star.n);
    surf(star, _p);
    for (let k = 0; k < 12; k++) {
      const a = k / 12 * TAU + time;
      dummy.position.copy(_p).addScaledVector(_n, .1).add(_w.set(e1.x, e1.y, e1.z).multiplyScalar(Math.cos(a) * .55)).add(_w.set(e2.x, e2.y, e2.z).multiplyScalar(Math.sin(a) * .55));
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(k < shown ? .06 : 0); dummy.updateMatrix();
      starDots.setMatrixAt(k, dummy.matrix);
    }
    starDots.instanceMatrix.needsUpdate = true;
    if (starT <= 0) { larch.effect('sparkle', toWorld(star, .4), { scale: .5 }); removeStar(); }
  } else if (alive && moving) {
    nextStar -= dt;
    if (nextStar <= 0) placeStar();
  }

  blobs.count = nBlob;
  blobs.instanceMatrix.needsUpdate = true;

  // 小圈圈
  for (const wv of waves) {
    if (wv.age >= wv.life) { wv.m.visible = false; continue; }
    wv.age += dt;
    const k = Math.min(1, wv.age / wv.life);
    wv.m.scale.setScalar(.2 + wv.size * (1 - Math.pow(1 - k, 3)));
    wv.m.material.opacity = .85 * (1 - k);
  }

  // 蘋果（金星果）在背面、看不到時：頭旁邊出現一個小箭頭，指要往哪邊走
  const hw = world.localToWorld(_hw.copy(HEAD.position));
  updateHint(appleHint, apple, hw);
  updateHint(starHint, star, hw);
});

// ═══════════════════════════ 11. 流程 ═══════════════════════════
// 測試用：作者試玩時，主控台可以用 window.__snake 看狀態、擺一條長長的蛇、調鏡頭（拍封面）
if (larch.testPlay) window.__snake = {
  get state() { return { alive, moving, len, score, best, head: cellInfo(cells[0]), dir: screenOf(dir), apple: cellInfo(apple), star: cellInfo(star), frame: { r: { ...frame.r }, u: { ...frame.u }, n: { ...frame.n } }, hint: appleHint.on ? screenOf(appleHint.dir) : null }; },
  turn: (name) => turn(name),
  feed(k = 3) { grow += k; },
  faces: Object.keys(FACE),
  // moves：照「畫面」方向一段一段走，例如 'R4 U9 L3'（從 start 那一格出發；預設是開局的位置）；最後一格是頭
  lay(moves, start = {}) {
    let c = start.face ? cellAt(start.face, start.i ?? 0, start.j ?? 0) : cellAt('top', Math.floor(N / 2) - 2, Math.floor(N / 2));
    let fr = frameFor(c.n), d = fr.r;
    const path = [c];
    for (const m of String(moves).trim().split(/\\s+/)) {
      const name = { U: 'up', D: 'down', L: 'left', R: 'right' }[m[0].toUpperCase()];
      for (let k = 0; k < (parseInt(m.slice(1), 10) || 1); k++) {
        const want = name === 'up' ? fr.u : name === 'down' ? neg(fr.u) : name === 'right' ? fr.r : neg(fr.r);
        const mv = advance(c, want);
        c = mv.cell; d = mv.axis ? mv.dir : want;
        if (mv.axis) fr = turnFrame(fr, mv.axis);
        path.push(c);
      }
    }
    cells = path.reverse(); frame = fr; dir = d;
    len = Math.max(3, cells.length - 2); visLen = len - 1; grow = 0; queue = []; acc = .999;   // 頭停在最後一格
    snapCam = true; snapHead = true;
    showScore();
  },
  appleAt(face, i, j) { placeApple(cellAt(face, i, j)); },
  // 頭的前面第 n 格（會繞過邊緣），再往畫面右邊 side 格
  appleAhead(k = 3, side = 0) {
    let c = cells[0], d = dir, fr = frame;
    for (let i = 0; i < k; i++) { const mv = advance(c, d); c = mv.cell; if (mv.axis) { fr = turnFrame(fr, mv.axis); d = mv.dir; } }
    let sd = side > 0 ? fr.r : neg(fr.r);
    for (let i = 0; i < Math.abs(side); i++) { const mv = advance(c, sd); c = mv.cell; if (mv.axis) sd = mv.dir; }
    placeApple(c);
    return cellInfo(c);
  },
  starNow(face, i, j) { removeStar(); placeStar(face ? cellAt(face, i, j) : undefined); },
  cam: CAM,
  snapCamera() { snapCam = true; },
  freeze(on = true) { frozen = on; },
  hud(on = true) { larch.ui.root.style.visibility = on ? '' : 'hidden'; },
  // 頭在畫面上的位置（px），測「按上就往畫面上走」用
  headScreen() { return toScreen(world.localToWorld(HEAD.position.clone())); },
  cellScreen(face, i, j) { return toScreen(toWorld(cellAt(face, i, j))); },
  // 走一格（freeze 時一步一步測）；probe：照現在的鏡頭，頭的那一格和往 name 走一格之後的那一格在畫面上的位置
  stepNow() { if (!alive) return false; moving = true; step(); acc = .999; return alive; },
  probe(name) { const a = toScreen(toWorld(cells[0], .4)), b = toScreen(toWorld(advance(cells[0], localDir(name)).cell, .4)); return { a, b }; },
};

let first = true;
for (;;) {
  reset();
  if (first) await larch.ui.banner('貪吃小蛇', PHONE ? '在畫面上滑動轉彎・吃蘋果變長\\n爬過邊緣會繞到下一面，別咬到自己' : '方向鍵／WASD 照畫面轉彎・吃蘋果變長\\n爬過邊緣會繞到下一面，別咬到自己');
  else await larch.wait(.3);
  first = false;
  // 等玩家按第一個方向才出發
  if (!moving) larch.ui.text('hint', PHONE ? '滑一下就出發' : '按方向鍵出發', { at: 'bottom' });
  await new Promise((res) => { const off = larch.onUpdate(() => { if (!alive) { off(); res(); } }); });
  await larch.wait(1.6);
  const newBest = score > best && score > 0;
  best = Math.max(best, score);
  showScore();
  larch.sound(newBest ? 'levelup' : 'pop', .6);
  if (newBest) larch.effect('confetti', world.localToWorld(HEAD.position.clone()).addScaledVector(camera.up, 1), { scale: 1 });
  await larch.ui.banner(newBest ? '新紀錄！' : '頭暈暈～', \`分數 \${score}・長度 \${len}\`);
  const again = await larch.choose(\`分數 \${score}（長度 \${len}）\${newBest ? '・新紀錄！' : ''}　要再玩一次嗎？\`, ['再玩一次', '結束']);
  if (again !== 0) { larch.complete({ score, result: newBest ? 'best' : 'done' }); break; }
}
`,space:`// ═══════════════════════════════════════════════════════════════════════════
// 星際突擊 Star Strike：3D 小遊戲卡的範例（太空射擊）
// 方向鍵／WASD（手機用搖桿）駕駛戰機，空白鍵（手機按住「發射」）射擊；
// 1／Q 追蹤飛彈、2／E 光束雷射、3／Shift 極速衝刺，Esc／P 暫停。
// 兩台僚機跟著一起打；撐過幾波攔截機與重裝砲艇，迴旋母艦就會出現。
// 開場是艦長的出擊前簡報（立繪＋對話），中間選一次強化裝備；再玩一次就直接出擊。
// 模型都從參數來（larch.params.ship …），參數空白時改用 THREE 自己做的替代形狀；
// 立繪是 larch.params.captain／pilot／ai，空白或讀不到時只顯示對話框。
// ═══════════════════════════════════════════════════════════════════════════

const P = larch.params;
const scene = larch.scene, camera = larch.camera;
const PHONE = larch.phone;
const MAX_HP = Math.round(larch.clamp(Number(P.hp) || 3500, 100, 99999));
const SHIP_SPEED = larch.clamp(Number(P.speed) || 9, 4, 20);
const WAVES = Math.round(larch.clamp(Number(P.waves) || 5, 1, 20));
const V3 = THREE.Vector3, ADD = THREE.AdditiveBlending;
const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = larch.clamp;
const hdr = (hex, k) => new THREE.Color(hex).multiplyScalar(k); // 超過 1 的顏色：後製泛光會讓它發亮

// ── 登場人物：立繪從參數來（艦長站左邊、AI 站右邊）──────────────────────────
// face：通訊視窗裡大頭照要看立繪的哪裡（圖寬、圖高的 %）
const CAST = {
  captain: { name: '霍恩艦長', img: '', x: 25, mark: '艦', face: [50, 9] },
  pilot: { name: '雷恩', img: '', x: 25, mark: '隼', face: [50, 9] },
  ai: { name: '艾可', img: '', x: 75, mark: 'AI', face: [50, 9] },
};
// 先把立繪載進快取（跟模型一起載），簡報開始時才不會一張一張跳出來；讀不到的就不放
const portraitsReady = Promise.all(Object.entries(CAST).map(([key, c]) => new Promise((done) => {
  const url = typeof P[key] === 'string' ? P[key].trim() : '';
  if (!url) { done(); return; }
  c.img = url;
  const im = new Image();
  im.decoding = 'async';
  im.onload = () => done();
  im.onerror = () => { c.img = ''; done(); };
  im.src = url;
})));

// ── 光線與調色：電影感、強泛光 ────────────────────────────────────────────
larch.music(P.bgm, { volume: .55 });
larch.sky('space');
larch.setLook({ hour: 17.3, look: 'vivid', bloom: .95, exposure: 1, fog: 0 });
if (typeof larch.ui.theme === 'function') larch.ui.theme('tech'); // 內建的橫幅、選項也換成科幻風

const SUN_DIR = new V3(.34, .1, -1).normalize();
const keyLight = new THREE.DirectionalLight(0xffd2a6, 2.6);
keyLight.position.copy(SUN_DIR).multiplyScalar(60).add(new V3(0, 40, 0));
const fillLight = new THREE.DirectionalLight(0x4cc6ff, 1.5);
fillLight.position.set(-30, -24, 26);
scene.add(keyLight, fillLight);

// ── 共用的雜訊（GLSL）：星雲、雲海、行星都用 ─────────────────────────────
const NOISE = \`
float hash3(vec3 p){ p = fract(p * .3183099 + .1); p *= 17.; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float vnoise(vec3 x){ vec3 i = floor(x), f = fract(x); f = f * f * (3. - 2. * f);
  return mix(mix(mix(hash3(i), hash3(i + vec3(1., 0., 0.)), f.x), mix(hash3(i + vec3(0., 1., 0.)), hash3(i + vec3(1., 1., 0.)), f.x), f.y),
             mix(mix(hash3(i + vec3(0., 0., 1.)), hash3(i + vec3(1., 0., 1.)), f.x), mix(hash3(i + vec3(0., 1., 1.)), hash3(i + vec3(1., 1., 1.)), f.x), f.y), f.z); }
float fbm(vec3 p){ float s = 0., a = .5; for (int i = 0; i < \${PHONE ? 4 : 5}; i++){ s += a * vnoise(p); p = p * 2.02 + vec3(1.7, 9.2, 3.1); a *= .5; } return s; }\`;

// 軟軟的圓形光點貼圖（引擎光、太陽、閃光）
function canvasTexture(size, draw) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  draw(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const glowTex = canvasTexture(128, (g, s) => {
  const r = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.22, 'rgba(255,255,255,.6)');
  r.addColorStop(.55, 'rgba(255,255,255,.14)'); r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r; g.fillRect(0, 0, s, s);
});
function glowSprite(color, size, opacity = 1) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color, transparent: true, opacity, blending: ADD, depthWrite: false, fog: false }));
  s.scale.setScalar(size);
  return s;
}

// ═══════════════════════════ 1. 背景：星雲、行星、太陽、雲海 ═══════════════════════════
const skyRig = new THREE.Group(); // 跟著鏡頭走，看起來永遠在很遠的地方
scene.add(skyRig);

// 星雲：一顆從裡面看的大球，用 fbm 雜訊畫出青、紫、橘的雲氣
const nebula = new THREE.Mesh(new THREE.SphereGeometry(900, 40, 24), new THREE.ShaderMaterial({
  uniforms: { uSun: { value: SUN_DIR }, uTime: { value: 0 } },
  vertexShader: 'varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }',
  fragmentShader: \`varying vec3 vDir; uniform vec3 uSun; uniform float uTime; \${NOISE}
  void main(){
    vec3 d = normalize(vDir);
    float n = fbm(d * 2.3 + vec3(0., 0., uTime * .004));
    float m = fbm(d * 4.6 + n * 1.6 + 4.2);
    float band = exp(-pow((d.y - .24 + (n - .5) * .7) * 2.4, 2.));
    vec3 col = vec3(.003, .006, .018);
    col += vec3(.02, .26, .4) * smoothstep(.42, .82, n) * band;
    col += vec3(.3, .07, .46) * smoothstep(.5, .86, m) * band * .7;
    col += vec3(.9, .3, .5) * smoothstep(.38, .64, m * n) * band * .25;
    float s = max(dot(d, uSun), 0.);
    col += vec3(1., .42, .14) * (pow(s, 16.) * (.25 + n * .5) + pow(s, 3.) * .035);
    col += vec3(1., .8, .55) * pow(s, 90.) * 1.2;
    gl_FragColor = vec4(col, 1.);
  }\`,
  side: THREE.BackSide, depthWrite: false,
}));
nebula.renderOrder = -3;
nebula.frustumCulled = false;
skyRig.add(nebula);

// 行星：左上方的一顆藍色氣態行星，邊緣有一圈大氣光
const PLANET_POS = new V3(-.62, .36, -.7).normalize().multiplyScalar(330);
const planetVert = 'varying vec3 vN; varying vec3 vW; varying vec3 vP; void main(){ vP = position; vN = normalize(mat3(modelMatrix) * normal); vec4 w = modelMatrix * vec4(position, 1.); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }';
const planet = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32), new THREE.ShaderMaterial({
  uniforms: { uSun: { value: SUN_DIR } },
  vertexShader: planetVert,
  fragmentShader: \`varying vec3 vN; varying vec3 vW; varying vec3 vP; uniform vec3 uSun; \${NOISE}
  void main(){
    vec3 n = normalize(vN), v = normalize(cameraPosition - vW);
    float b = fbm(vec3(vP.x * 1.5, vP.y * 7.5, vP.z * 1.5));
    vec3 base = mix(vec3(.05, .1, .24), vec3(.3, .52, .8), b);
    base = mix(base, vec3(.85, .55, .4), smoothstep(.58, .78, fbm(vP * 3.2 + 2.)) * .55);
    float lit = dot(n, uSun);
    float day = smoothstep(-.25, .75, lit);
    float rim = pow(1. - max(dot(n, v), 0.), 2.4);
    vec3 col = base * (.03 + day * 1.1) + vec3(.3, .72, 1.) * rim * smoothstep(-.6, .4, lit) * 1.5;
    gl_FragColor = vec4(col, 1.);
  }\`,
}));
planet.scale.setScalar(70);
planet.position.copy(PLANET_POS);
planet.rotation.set(.2, 0, .38);
skyRig.add(planet);
const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 24), new THREE.ShaderMaterial({
  uniforms: { uSun: { value: SUN_DIR } },
  vertexShader: planetVert,
  fragmentShader: \`varying vec3 vN; varying vec3 vW; uniform vec3 uSun;
  void main(){
    vec3 n = normalize(vN), v = normalize(cameraPosition - vW);
    float e = clamp(-dot(n, v) / .45, 0., 1.);
    vec3 col = vec3(.28, .7, 1.) * pow(e, 3.) * (.18 + smoothstep(-.6, .6, dot(n, uSun)) * 1.1);
    gl_FragColor = vec4(col, 1.);
  }\`,
  side: THREE.BackSide, blending: ADD, transparent: true, depthWrite: false,
}));
atmosphere.scale.setScalar(70 * 1.12);
atmosphere.position.copy(PLANET_POS);
atmosphere.renderOrder = -.45;
skyRig.add(atmosphere);

// 太陽：低低掛在雲海上方，暖色光暈＋一條橫向的鏡頭光痕
const sunCore = glowSprite(hdr(0xfff1dc, 3), 70);
const sunHalo = glowSprite(0xff8a40, 300, .4);
const sunStreak = glowSprite(hdr(0x9fe6ff, 1.4), 1, .55);
sunStreak.scale.set(1300, 12, 1);
for (const s of [sunCore, sunHalo, sunStreak]) { s.position.copy(SUN_DIR).multiplyScalar(700); s.renderOrder = -.4; skyRig.add(s); }

// 雲海：下面很遠的一大片雲，用 shader 一直往後捲動
const cloudSea = new THREE.Mesh(new THREE.PlaneGeometry(2800, 2800), new THREE.ShaderMaterial({
  uniforms: { uSun: { value: SUN_DIR }, uTravel: { value: 0 } },
  vertexShader: 'varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position, 1.); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
  fragmentShader: \`varying vec3 vW; uniform vec3 uSun; uniform float uTravel; \${NOISE}
  void main(){
    vec2 q = vec2(vW.x, vW.z - uTravel) * .0105;
    float dist = length(vW.xz - cameraPosition.xz);
    float h = fbm(vec3(q, 0.));
    float h2 = fbm(vec3(q * 2.7 + h * 1.5, 3.));
    float c = smoothstep(.3, .8, h * .78 + h2 * .42);
    c = mix(c, .55, smoothstep(350., 1100., dist));          // 遠處的細節收掉，才不會閃
    vec3 v = normalize(vW - cameraPosition);
    float toward = pow(max(dot(v, uSun), 0.), 10.);
    vec3 col = mix(vec3(.012, .02, .06), vec3(.2, .28, .48), c);
    col += vec3(1., .5, .22) * toward * (.12 + c * .9);
    col = mix(col, vec3(.7, .38, .22) * toward + vec3(.03, .045, .1), smoothstep(450., 1300., dist) * .6);
    float a = (1. - smoothstep(700., 1350., dist)) * (.5 + c * .5);
    gl_FragColor = vec4(col, a);
  }\`,
  transparent: true, depthWrite: false,
}));
cloudSea.rotation.x = -Math.PI / 2;
cloudSea.position.y = -52;
cloudSea.renderOrder = -.5;
cloudSea.frustumCulled = false;
scene.add(cloudSea);

// 速度線：一圈很細的光線從身邊往後衝（位置在 shader 裡算，CPU 不用動）
const STREAKS = PHONE ? 150 : 260, RANGE = 300;
const streakGeo = new THREE.BufferGeometry();
{
  const pos = new Float32Array(STREAKS * 6), tail = new Float32Array(STREAKS * 2), seed = new Float32Array(STREAKS * 2);
  for (let i = 0; i < STREAKS; i++) {
    const a = Math.random() * TAU, r = 5 + Math.pow(Math.random(), .8) * 46;
    const x = Math.cos(a) * r * 1.5, y = Math.sin(a) * r * .9 + 3, z = Math.random() * RANGE;
    pos.set([x, y, z, x, y, z], i * 6);
    tail[i * 2 + 1] = 1;
    seed[i * 2] = seed[i * 2 + 1] = Math.random();
  }
  streakGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  streakGeo.setAttribute('aTail', new THREE.BufferAttribute(tail, 1));
  streakGeo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
}
const streakMat = new THREE.ShaderMaterial({
  uniforms: { uTravel: { value: 0 }, uLen: { value: 3 }, uColor: { value: new THREE.Color(.5, .85, 1.3) } },
  vertexShader: \`attribute float aTail; attribute float aSeed; uniform float uTravel; uniform float uLen; varying float vA;
  void main(){
    float head = mod(position.z + uTravel * (.8 + aSeed * .5), \${RANGE}.) - \${RANGE - 15}.;
    float z = head - aTail * uLen * (.5 + aSeed);
    vA = (1. - aTail * .92) * smoothstep(-\${RANGE - 15}., -\${RANGE * .5}., head) * smoothstep(14., 3., head) * (.3 + aSeed * .7);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.);
  }\`,
  fragmentShader: 'uniform vec3 uColor; varying float vA; void main(){ gl_FragColor = vec4(uColor * vA, 1.); }',
  blending: ADD, transparent: true, depthWrite: false,
});
const streaks = new THREE.LineSegments(streakGeo, streakMat);
streaks.frustumCulled = false;
scene.add(streaks);

// 兩旁飄過的岩塊（裝飾，不會撞到）：一個 InstancedMesh 畫全部
function rockGeometry(seed, detail = 1) {
  const g = new THREE.IcosahedronGeometry(1, detail);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const k = 1 + .26 * Math.sin(x * 3.1 + seed) * Math.cos(y * 2.7 + seed * 1.3) + .14 * Math.sin(z * 5.3 + seed * 2.1);
    p.setXYZ(i, x * k, y * k * .82, z * k);
  }
  g.computeVertexNormals();
  return g;
}
const rockMat = new THREE.MeshStandardMaterial({ color: 0x4a4550, roughness: .92, metalness: .08, flatShading: true });
const decorList = []; // 隕石模型載好之後才放（見第 2 節最後）
function placeDecor(d, far) {
  const side = Math.random() < .5 ? -1 : 1;
  d.obj.position.set(side * rand(17, 70), rand(-30, 18), far ? rand(-420, 0) : rand(-440, -380));
  d.obj.scale.setScalar(rand(.8, 3.6));
  d.ax.set(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize(); d.spin = rand(-.7, .7);
}

// ═══════════════════════════ 2. 模型：參數給的模型，或 THREE 做的替代形狀 ═══════════════════════════
const MAT = {
  dark: new THREE.MeshStandardMaterial({ color: 0x1c1f27, metalness: .2, roughness: .8 }),
  gold: new THREE.MeshStandardMaterial({ color: 0xc8902e, metalness: .3, roughness: .6, emissive: 0x2a1800 }),
  white: new THREE.MeshStandardMaterial({ color: 0xd8dde6, metalness: .1, roughness: .75 }),
  crimson: new THREE.MeshStandardMaterial({ color: 0x8e1426, metalness: .2, roughness: .7 }),
  gun: new THREE.MeshStandardMaterial({ color: 0x2b2e36, metalness: .25, roughness: .75 }),
  glass: new THREE.MeshStandardMaterial({ color: 0x0c2a3a, metalness: .2, roughness: .08, emissive: 0x0b5a7a, emissiveIntensity: .7 }),
  cyan: new THREE.MeshBasicMaterial({ color: hdr(0x45dcff, 2.4) }),
  red: new THREE.MeshBasicMaterial({ color: hdr(0xff3048, 2.4) }),
  orange: new THREE.MeshBasicMaterial({ color: hdr(0xff8a3a, 2) }),
};
// 替代形狀不反射天空（貼著視線的機翼會被反光照成一片白）
for (const m of Object.values(MAT)) if (m.isMeshStandardMaterial) m.envMapIntensity = .1;
// 車床轉出流線型機身，機頭朝 +Z
function lathe(profile, sx = 1, sy = 1, seg = 14) {
  const g = new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), seg);
  g.rotateX(Math.PI / 2);
  g.scale(sx, sy, 1);
  return g;
}
// 一片三角翼（平面形狀擠出厚度，機頭方向 = +Z）
function deltaWing(span, root, tip, sweep, thick) {
  const s = new THREE.Shape();
  s.moveTo(0, root * .5 + .3); s.lineTo(span, root * .5 - sweep); s.lineTo(span, root * .5 - sweep - tip);
  s.lineTo(.25, -root * .5); s.lineTo(-.25, -root * .5); s.lineTo(-span, root * .5 - sweep - tip); s.lineTo(-span, root * .5 - sweep);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: thick, bevelEnabled: false });
  g.rotateX(Math.PI / 2);
  g.translate(0, thick / 2, 0);
  return g;
}
const mesh = (geo, mat, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); return m; };
const cylZ = (r1, r2, len, seg = 12) => new THREE.CylinderGeometry(r2, r1, len, seg).rotateX(Math.PI / 2); // 沿 Z 的圓柱（+Z 那頭半徑 r2）

// 戰機：黑金配色、雙引擎
function makeFighter() {
  const g = new THREE.Group();
  g.add(mesh(lathe([[0, 2.1], [.16, 1.6], [.34, .8], [.42, -.2], [.4, -1.1], [.3, -1.55], [0, -1.56]], 1.2, .62), MAT.dark));
  const canopy = mesh(new THREE.SphereGeometry(1, 16, 10), MAT.glass, 0, .2, .75); canopy.scale.set(.2, .15, .62); g.add(canopy);
  g.add(mesh(deltaWing(1.75, 2, .4, 1.15, .07), MAT.dark, 0, -.04, -.35));
  g.add(mesh(deltaWing(1.82, 2.08, .44, 1.17, .04), MAT.gold, 0, -.1, -.37));
  for (const sx of [-1, 1]) {
    const fin = mesh(new THREE.BoxGeometry(.05, .5, .6), MAT.gold, sx * .32, .28, -1.1); fin.rotation.z = -sx * .35; g.add(fin);
    g.add(mesh(cylZ(.18, .16, .6), MAT.gun, sx * .3, 0, -1.35));
    g.add(mesh(new THREE.CircleGeometry(.13, 16).rotateY(Math.PI), MAT.cyan, sx * .3, 0, -1.66));
  }
  return g;
}
// 僚機：白金色的小無人機
function makeWingman() {
  const g = new THREE.Group();
  g.add(mesh(lathe([[0, 1.2], [.14, .8], [.26, .1], [.24, -.6], [.16, -.8], [0, -.81]], 1.1, .7), MAT.white));
  g.add(mesh(deltaWing(.9, 1, .22, .55, .05), MAT.gold, 0, -.02, -.2));
  g.add(mesh(new THREE.CircleGeometry(.12, 14).rotateY(Math.PI), MAT.cyan, 0, 0, -.82));
  return g;
}
// 攔截機：深色機身、兩顆紅色引擎艙
function makeInterceptor() {
  const g = new THREE.Group();
  const body = mesh(new THREE.OctahedronGeometry(1, 0), MAT.dark); body.scale.set(.55, .28, 1.15); g.add(body);
  g.add(mesh(new THREE.BoxGeometry(1.9, .06, .6), MAT.dark, 0, 0, -.1));
  for (const sx of [-1, 1]) {
    g.add(mesh(cylZ(.26, .3, 1.3), MAT.gun, sx * 1, 0, -.1));
    g.add(mesh(new THREE.TorusGeometry(.27, .05, 6, 18), MAT.red, sx * 1, 0, .56));
    g.add(mesh(new THREE.CircleGeometry(.2, 14), MAT.red, sx * 1, 0, .55));
  }
  g.add(mesh(new THREE.SphereGeometry(.12, 10, 8), MAT.red, 0, .1, .8));
  return g;
}
// 重裝砲艇：深紅色裝甲、兩管砲
function makeGunship() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(1.5, .7, 2.4), MAT.crimson));
  g.add(mesh(new THREE.BoxGeometry(1, .36, 1.4), MAT.dark, 0, .5, -.2));
  g.add(mesh(new THREE.BoxGeometry(.7, .1, .12), MAT.orange, 0, .5, .52));
  g.add(mesh(new THREE.BoxGeometry(3.2, .08, .7), MAT.dark, 0, 0, -.4));
  for (const sx of [-1, 1]) {
    g.add(mesh(new THREE.BoxGeometry(.5, .55, 1.8), MAT.crimson, sx * 1.05, -.05, -.1));
    g.add(mesh(cylZ(.09, .08, 1.1), MAT.gun, sx * .45, -.25, 1.5));
    g.add(mesh(new THREE.SphereGeometry(.07, 8, 6), MAT.red, sx * .45, -.25, 2.06));
  }
  return g;
}
// 隕石
function makeRock() { return mesh(rockGeometry(5.1, 1), rockMat); }
// 母艦：一彎新月形的巨艦，前緣有青色光條
function makeBattleship() {
  const g = new THREE.Group();
  const L = 7.2, D = 2.6, W = 2.3, N = 24;
  const front = [], back = [];
  for (let i = 0; i <= N; i++) {
    const u = -1 + 2 * i / N, k = 1 - u * u;
    front.push(new THREE.Vector2(u * L, D * k));
    back.push(new THREE.Vector2(u * L * .9, D * k - W * Math.pow(k, .7)));
  }
  const s = new THREE.Shape([...front, ...back.reverse()]);
  const hull = new THREE.ExtrudeGeometry(s, { depth: .8, bevelEnabled: true, bevelThickness: .14, bevelSize: .14, bevelSegments: 2, curveSegments: 4 });
  hull.rotateX(Math.PI / 2); hull.translate(0, .4, 0);
  g.add(mesh(hull, MAT.dark));
  g.add(mesh(new THREE.BoxGeometry(2.2, 1, 2), MAT.gun, 0, .7, 1.4));
  g.add(mesh(new THREE.BoxGeometry(1.2, .7, 1), MAT.dark, 0, 1.4, 1.2));
  g.add(mesh(new THREE.BoxGeometry(.9, .1, .1), MAT.cyan, 0, 1.45, 1.72));
  const edge = new THREE.CatmullRomCurve3(front.map((p) => new V3(p.x, .2, p.y + .12)));
  g.add(mesh(new THREE.TubeGeometry(edge, 60, .06, 5), MAT.cyan));
  for (const u of [-.7, -.35, .35, .7]) {
    const k = 1 - u * u;
    g.add(mesh(new THREE.CylinderGeometry(.25, .3, .4, 10), MAT.gun, u * L * .95, .7, D * k - .9));
    g.add(mesh(new THREE.SphereGeometry(.16, 8, 6), MAT.red, u * L * .95, .95, D * k - .9));
  }
  g.rotation.x = .9; // 前緣往下壓，玩家從正面看得到整片艦身
  const tilt = new THREE.Group(); tilt.add(g);
  return tilt;
}
// 我方航母「曙光號」：簡報時陪在小隊旁邊，出擊後慢慢落在後面（只在開場出現）
const CARRIER_EDGE = [[-40, 0], [-34, 3], [-14, 6.5], [8, 8], [30, 8], [38, 6]]; // 右半邊的輪廓（z, x），機頭朝 -Z
function carrierHalfWidth(z) {
  for (let i = 1; i < CARRIER_EDGE.length; i++) {
    const [z0, x0] = CARRIER_EDGE[i - 1], [z1, x1] = CARRIER_EDGE[i];
    if (z <= z1) return x0 + (x1 - x0) * clamp((z - z0) / (z1 - z0), 0, 1);
  }
  return CARRIER_EDGE[CARRIER_EDGE.length - 1][1];
}
function makeCarrier() {
  const g = new THREE.Group();
  // 航母自己的材質：鐵灰船身、淺灰甲板（比戰機的黑金亮一點，遠遠看才看得出形狀）
  const hullMat = new THREE.MeshStandardMaterial({ color: 0x3d4554, metalness: .35, roughness: .5, envMapIntensity: .35 });
  const deckMat = new THREE.MeshStandardMaterial({ color: 0xaab3c2, metalness: .25, roughness: .55, envMapIntensity: .35 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x262b35, metalness: .3, roughness: .6, envMapIntensity: .3 });
  const outline = [...CARRIER_EDGE.map(([z, x]) => [x, z]), ...CARRIER_EDGE.slice(1).reverse().map(([z, x]) => [-x, z])];
  // 上視圖的輪廓擠出厚度：(x, z) → 高度方向是 y
  const slab = (k, depth, mat, y, bevel = .25) => {
    const s = new THREE.Shape(outline.map(([x, z]) => new THREE.Vector2(x * k, -z * (k * .3 + .7))));
    const geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 1, curveSegments: 1 });
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, y, 0);
    return mesh(geo, mat);
  };
  g.add(slab(1, 2.2, hullMat, -1.2));
  g.add(slab(1.035, .24, MAT.gold, -.2, 0));     // 一圈金色腰線
  g.add(slab(.7, 1.3, deckMat, 1.1));             // 上層甲板
  g.add(slab(.42, .7, hullMat, 2.5, .15));
  // 艦橋
  g.add(mesh(new THREE.BoxGeometry(3.6, 4.4, 6.5), hullMat, 0, 4.4, 24));
  g.add(mesh(new THREE.BoxGeometry(7, 1.1, 3.8), darkMat, 0, 6.9, 23));
  g.add(mesh(new THREE.BoxGeometry(6, .22, .1), MAT.cyan, 0, 7, 21.05));
  g.add(mesh(new THREE.BoxGeometry(.12, 3.4, .12), MAT.gun, 1.4, 9, 24.5));
  // 甲板上的小設備（固定的亂數，每次都一樣）
  let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 16; i++) {
    const z = -24 + rnd() * 48, w = carrierHalfWidth(z) * .55;
    g.add(mesh(new THREE.BoxGeometry(.6 + rnd() * 1.6, .3 + rnd() * .7, .8 + rnd() * 2.4), i % 3 ? darkMat : hullMat, (rnd() * 2 - 1) * w, 2.5, z));
  }
  // 兩側的青色航行燈
  for (const sx of [-1, 1]) for (let z = -30; z <= 34; z += 4) g.add(mesh(new THREE.BoxGeometry(.18, .12, .9), MAT.cyan, sx * (carrierHalfWidth(z) * .7 + .2), 1.25, z));
  // 右舷的發進口（金隼小隊剛從這裡出來）
  const bayZ = -8, bayX = carrierHalfWidth(bayZ) + .3;
  g.add(mesh(new THREE.BoxGeometry(.12, 1.3, 7), MAT.cyan, bayX, -.3, bayZ));
  const bayGlow = glowSprite(hdr(0x6fd8ff, 1.2), 9, .45); bayGlow.position.set(bayX + .4, -.3, bayZ); g.add(bayGlow);
  // 艦尾三顆主引擎
  for (const x of [-4.2, 0, 4.2]) {
    g.add(mesh(cylZ(1.7, 1.5, 3), darkMat, x, -.1, 39.6));
    const core = glowSprite(hdr(0xdff8ff, 2.2), 4.2), halo = glowSprite(0x2aa8ff, 11, .55);
    core.position.set(x, -.1, 41.3); halo.position.set(x, -.1, 41.6);
    g.add(core, halo);
  }
  // 翼端的紅、綠航行燈（會閃）
  const nav = [glowSprite(hdr(0xff3048, 2), 1.6), glowSprite(hdr(0x45ff9a, 2), 1.6)];
  nav[0].position.set(-8.3, .2, 10); nav[1].position.set(8.3, .2, 10);
  g.add(...nav);
  g.userData.nav = nav;
  return g;
}

// 把模型縮到「水平最長邊 = size」，中心放在原點，外面包一層 Group（之後只動這一層）
function fitModel(inner, size) {
  const box = new THREE.Box3().setFromObject(inner);
  const dim = box.getSize(new V3()), c = box.getCenter(new V3());
  const k = size / Math.max(dim.x, dim.z, 1e-3);
  inner.scale.multiplyScalar(k);
  inner.position.set(-c.x * k, -c.y * k, -c.z * k);
  const outer = new THREE.Group();
  outer.add(inner);
  outer.userData.half = new V3(dim.x * k / 2, dim.y * k / 2, dim.z * k / 2);
  return outer;
}
async function loadModel(key, size, fallback) {
  const id = P[key];
  if (id) {
    try {
      const m = await larch.model(id);
      if (!new THREE.Box3().setFromObject(m).isEmpty()) {
        // 這些模型不播動作：把 userData 清掉，之後 larch.clone 複製幾十份才會快
        m.traverse((o) => { o.userData = {}; });
        return fitModel(m, size);
      }
    } catch (e) { console.warn(\`[星際突擊] \${key} 模型讀不到，改用替代形狀\`, e && e.message); }
  }
  return fitModel(fallback(), size);
}

// 載入中的提示（模型通常一兩秒就好）
larch.ui.text('loading', '系統啟動中…', { at: 'center', size: 'small' });
const [TPL_SHIP, TPL_WING, TPL_SAUCER, TPL_BUG, TPL_ROCK, TPL_BOSS] = await Promise.all([
  loadModel('ship', 3.4, makeFighter),
  loadModel('wing', 1.7, makeWingman),
  loadModel('saucer', 3, makeInterceptor),
  loadModel('bug', 4, makeGunship),
  loadModel('rock', 2.4, makeRock),
  loadModel('boss', 24, makeBattleship),
]);
larch.ui.remove('loading');
// 兩旁飄過的隕石（裝飾，不會撞到）：複製隕石模型
for (let i = 0; i < (PHONE ? 12 : 20); i++) {
  const d = { obj: larch.clone(TPL_ROCK), ax: new V3(), spin: 0 };
  scene.add(d.obj);
  placeDecor(d, true);
  decorList.push(d);
}

// ═══════════════════════════ 3. 特效：光點粒子、震波環、電弧、尾焰帶 ═══════════════════════════

// 3a. 光點粒子：一個 Points 畫全部（爆炸火花、飛彈尾煙、衝刺光點…）
const PMAX = PHONE ? 520 : 900;
const pGeo = new THREE.BufferGeometry();
const pPos = new Float32Array(PMAX * 3), pCol = new Float32Array(PMAX * 3), pSize = new Float32Array(PMAX), pAlpha = new Float32Array(PMAX);
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3).setUsage(THREE.DynamicDrawUsage));
pGeo.setAttribute('aColor', new THREE.BufferAttribute(pCol, 3).setUsage(THREE.DynamicDrawUsage));
pGeo.setAttribute('aSize', new THREE.BufferAttribute(pSize, 1).setUsage(THREE.DynamicDrawUsage));
pGeo.setAttribute('aAlpha', new THREE.BufferAttribute(pAlpha, 1).setUsage(THREE.DynamicDrawUsage));
const pMat = new THREE.ShaderMaterial({
  uniforms: { uScale: { value: 400 } },
  vertexShader: \`attribute float aSize; attribute float aAlpha; attribute vec3 aColor; uniform float uScale; varying vec3 vC; varying float vA;
  void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.); gl_Position = projectionMatrix * mv; gl_PointSize = aSize * uScale / max(.5, -mv.z); vC = aColor; vA = aAlpha; }\`,
  fragmentShader: \`varying vec3 vC; varying float vA;
  void main(){ vec2 q = gl_PointCoord * 2. - 1.; float d = dot(q, q); if (d > 1.) discard; float a = 1. - d; a *= a; gl_FragColor = vec4(vC * a * vA, 1.); }\`,
  blending: ADD, transparent: true, depthWrite: false,
});
const points = new THREE.Points(pGeo, pMat);
points.frustumCulled = false;
points.renderOrder = 5;
scene.add(points);
const parts = [];
for (let i = 0; i < PMAX; i++) parts.push({ on: false, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, age: 0, life: 1, s0: 1, s1: 0, r: 1, g: 1, b: 1, drag: 0 });
let pNext = 0;
function emit(x, y, z, vx, vy, vz, life, s0, s1, color, drag = 0) {
  const p = parts[pNext]; pNext = (pNext + 1) % PMAX;
  p.on = true; p.x = x; p.y = y; p.z = z; p.vx = vx; p.vy = vy; p.vz = vz; p.age = 0; p.life = life; p.s0 = s0; p.s1 = s1; p.drag = drag;
  p.r = color.r; p.g = color.g; p.b = color.b;
}
const COL = {
  cyan: hdr(0x45dcff, 2.2), ice: hdr(0xc8f6ff, 2.4), white: hdr(0xffffff, 3), gold: hdr(0xffc65a, 2.4),
  orange: hdr(0xff7a2e, 2.4), red: hdr(0xff3050, 2.2), violet: hdr(0xb07bff, 2),
};
function burst(pos, n, speed, life, size, color, drag = 2, drift = 14) {
  for (let i = 0; i < n; i++) {
    const u = Math.random() * 2 - 1, a = Math.random() * TAU, k = Math.sqrt(1 - u * u), s = speed * rand(.3, 1);
    emit(pos.x, pos.y, pos.z, Math.cos(a) * k * s, u * s, Math.sin(a) * k * s + drift, life * rand(.6, 1.2), size * rand(.6, 1.3), 0, color, drag);
  }
}
function updateParticles(dt) {
  for (let i = 0; i < PMAX; i++) {
    const p = parts[i];
    if (!p.on) { pSize[i] = 0; continue; }
    p.age += dt;
    if (p.age >= p.life) { p.on = false; pSize[i] = 0; continue; }
    const f = Math.exp(-p.drag * dt);
    p.vx *= f; p.vy *= f; p.vz *= f;
    p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
    const t = p.age / p.life;
    pPos[i * 3] = p.x; pPos[i * 3 + 1] = p.y; pPos[i * 3 + 2] = p.z;
    pCol[i * 3] = p.r; pCol[i * 3 + 1] = p.g; pCol[i * 3 + 2] = p.b;
    pSize[i] = p.s0 + (p.s1 - p.s0) * t;
    pAlpha[i] = 1 - t * t;
  }
  for (const k of ['position', 'aColor', 'aSize', 'aAlpha']) pGeo.attributes[k].needsUpdate = true;
}

// 3b. 震波環
const ringGeo = new THREE.RingGeometry(.84, 1, 48);
const rings = [];
for (let i = 0; i < 12; i++) {
  const m = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, blending: ADD, depthWrite: false, side: THREE.DoubleSide }));
  m.visible = false; m.frustumCulled = false; m.renderOrder = 6;
  scene.add(m);
  rings.push({ m, on: false, age: 0, life: 1, size: 1, face: true, vz: 0 });
}
let ringNext = 0;
function ring(pos, size, color, life = .5, faceCamera = true, vz = 0) {
  const r = rings[ringNext]; ringNext = (ringNext + 1) % rings.length;
  r.on = true; r.age = 0; r.life = life; r.size = size; r.face = faceCamera; r.vz = vz;
  r.m.position.copy(pos); r.m.material.color.copy(color); r.m.visible = true; r.m.rotation.set(0, 0, 0);
}
function updateRings(dt) {
  for (const r of rings) {
    if (!r.on) continue;
    r.age += dt;
    const t = r.age / r.life;
    if (t >= 1) { r.on = false; r.m.visible = false; continue; }
    r.m.scale.setScalar(r.size * (1 - Math.pow(1 - t, 3)) + .05);
    r.m.material.opacity = Math.pow(1 - t, 1.6);
    r.m.position.z += r.vz * dt;
    if (r.face) r.m.quaternion.copy(camera.quaternion);
  }
}

// 3c. 電弧：鋸齒狀的閃電線
const ARC_PTS = 12, arcs = [];
for (let i = 0; i < 10; i++) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(ARC_PTS * 3), 3).setUsage(THREE.DynamicDrawUsage));
  const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: hdr(0x8fefff, 3), transparent: true, blending: ADD, depthWrite: false }));
  line.visible = false; line.frustumCulled = false; line.renderOrder = 7;
  scene.add(line);
  arcs.push({ line, on: false, age: 0, life: .2, a: new V3(), b: new V3(), jitter: .3 });
}
let arcNext = 0;
function arc(a, b, life = .18, jitter = .35, color = 0x8fefff) {
  const r = arcs[arcNext]; arcNext = (arcNext + 1) % arcs.length;
  r.on = true; r.age = 0; r.life = life; r.a.copy(a); r.b.copy(b); r.jitter = jitter; r.line.visible = true;
  r.line.material.color.setHex(color).multiplyScalar(3);
}
function updateArcs(dt) {
  for (const r of arcs) {
    if (!r.on) continue;
    r.age += dt;
    if (r.age >= r.life) { r.on = false; r.line.visible = false; continue; }
    const pos = r.line.geometry.attributes.position;
    for (let i = 0; i < ARC_PTS; i++) {
      const t = i / (ARC_PTS - 1), j = (i === 0 || i === ARC_PTS - 1) ? 0 : r.jitter * Math.sin(t * Math.PI);
      pos.setXYZ(i, r.a.x + (r.b.x - r.a.x) * t + rand(-j, j), r.a.y + (r.b.y - r.a.y) * t + rand(-j, j), r.a.z + (r.b.z - r.a.z) * t + rand(-j, j));
    }
    pos.needsUpdate = true;
    r.line.material.opacity = Math.random() < .25 ? .25 : 1 - r.age / r.life;
  }
}

// 3d. 尾焰帶：引擎後面拖出來的長光帶（舊的點跟著世界往後飄，朝著鏡頭攤平）
const trailVert = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }';
const trailFrag = \`uniform vec3 uColor; uniform float uAlpha; varying vec2 vUv;
void main(){ float across = 1. - abs(vUv.y * 2. - 1.); float along = pow(1. - vUv.x, 1.5);
  gl_FragColor = vec4((uColor * pow(across, 1.4) + vec3(1.) * pow(across, 8.)) * along * uAlpha, 1.); }\`;
function makeTrail(n, width, color) {
  const pos = new Float32Array(n * 6), uv = new Float32Array(n * 4), idx = [];
  for (let i = 0; i < n; i++) {
    uv.set([i / (n - 1), 0, i / (n - 1), 1], i * 4);
    if (i < n - 1) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  geo.setIndex(idx);
  const mat = new THREE.ShaderMaterial({ uniforms: { uColor: { value: color }, uAlpha: { value: 1 } }, vertexShader: trailVert, fragmentShader: trailFrag, blending: ADD, transparent: true, depthWrite: false, side: THREE.DoubleSide });
  const m = new THREE.Mesh(geo, mat);
  m.frustumCulled = false; m.renderOrder = 4;
  scene.add(m);
  return { m, mat, n, width, pts: Array.from({ length: n }, () => new V3()), acc: 0 };
}
const _t = new V3(), _s = new V3(), _c = new V3();
function updateTrail(tr, head, drift, dt) {
  const pts = tr.pts;
  for (let i = 1; i < tr.n; i++) pts[i].z += drift * dt;
  tr.acc += dt;
  while (tr.acc >= 1 / 60) { tr.acc -= 1 / 60; for (let i = tr.n - 1; i > 0; i--) pts[i].copy(pts[i - 1]); }
  pts[0].copy(head);
  const pos = tr.m.geometry.attributes.position;
  for (let i = 0; i < tr.n; i++) {
    _t.copy(pts[Math.max(0, i - 1)]).sub(pts[Math.min(tr.n - 1, i + 1)]);
    if (_t.lengthSq() < 1e-6) _t.set(0, 0, -1);
    _c.copy(camera.position).sub(pts[i]);
    _s.crossVectors(_t, _c).normalize().multiplyScalar(tr.width * (1 - i / tr.n * .65) * .5);
    pos.setXYZ(i * 2, pts[i].x + _s.x, pts[i].y + _s.y, pts[i].z + _s.z);
    pos.setXYZ(i * 2 + 1, pts[i].x - _s.x, pts[i].y - _s.y, pts[i].z - _s.z);
  }
  pos.needsUpdate = true;
}

// ═══════════════════════════ 4. 玩家：戰機、僚機、引擎、能量環、準星 ═══════════════════════════
const ship = new THREE.Group();          // 位置
const shipBank = new THREE.Group();      // 傾斜、翻滾
ship.add(shipBank);
TPL_SHIP.rotation.y = Math.PI;           // 模型機頭朝 +Z，戰機要往 -Z 飛
shipBank.add(TPL_SHIP);
scene.add(ship);
const SHIP_HALF = TPL_SHIP.userData.half; // 半寬、半高、半長

// 引擎：機尾兩顆藍白色的光（機尾在 +Z 那頭）
const engineLocal = [new V3(-SHIP_HALF.x * .2, SHIP_HALF.y * .15, SHIP_HALF.z * .95), new V3(SHIP_HALF.x * .2, SHIP_HALF.y * .15, SHIP_HALF.z * .95)];
const engines = engineLocal.map((p) => {
  const core = glowSprite(hdr(0xdff8ff, 2.2), .55), halo = glowSprite(0x2aa8ff, 1.8, .7);
  core.position.copy(p); halo.position.copy(p);
  shipBank.add(core, halo);
  return { core, halo, local: p, world: new V3() };
});
const shipTrails = engines.map(() => makeTrail(22, .45, hdr(0x3fb8ff, 1.4)));

// 繞著戰機的能量環：三段弧，平躺在機身四周慢慢轉
function arcRing(radius, opacity) {
  const g = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({ color: hdr(0x45dcff, 2.2), transparent: true, opacity, blending: ADD, depthWrite: false });
  const geo = new THREE.TorusGeometry(radius, .02, 5, 40, 1.5);
  for (let i = 0; i < 3; i++) { const m = new THREE.Mesh(geo, mat); m.rotation.z = i * TAU / 3; m.renderOrder = 6; g.add(m); }
  g.rotation.x = Math.PI / 2;
  g.userData.mat = mat;
  return g;
}
const energyRing = arcRing(SHIP_HALF.x * .95, .3), energyRing2 = arcRing(SHIP_HALF.x * 1.12, .18);
energyRing.material = energyRing.userData.mat; energyRing2.material = energyRing2.userData.mat;
ship.add(energyRing, energyRing2);
// 受傷時亮一下的護盾
const shield = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), new THREE.MeshBasicMaterial({ color: hdr(0x45dcff, 1.2), transparent: true, opacity: 0, blending: ADD, depthWrite: false }));
shield.scale.set(SHIP_HALF.x * 1.1, SHIP_HALF.x * .6, SHIP_HALF.z * 1.2);
ship.add(shield);

// 僚機
const wingmen = [-1, 1].map((side) => {
  const root = new THREE.Group(), bank = new THREE.Group();
  const model = side < 0 ? TPL_WING : larch.clone(TPL_WING);
  model.rotation.y = Math.PI;
  bank.add(model); root.add(bank); scene.add(root);
  const h = TPL_WING.userData.half;
  const glow = glowSprite(0x6fd8ff, .6, .8);
  glow.position.set(0, 0, h.z * .95);
  bank.add(glow);
  return { side, root, bank, glow, vx: 0, fireT: side < 0 ? 0 : .16, trail: makeTrail(16, .2, hdr(0x9fe6ff, 1.2)), tail: new V3() };
});

// 航母曙光號：遠遠地跟小隊一起飛，出擊後落在後面（位置在簡報第一個鏡頭時才決定，放在畫面右上方）
const carrier = makeCarrier();
carrier.scale.setScalar(1.8);
carrier.visible = false;
scene.add(carrier);
let carrierSpeed = 0;

// 準星：瞄準方向前方的一個小圓框
const reticleTex = canvasTexture(128, (g, s) => {
  g.strokeStyle = 'rgba(140,235,255,.95)'; g.lineWidth = 4;
  g.beginPath(); g.arc(s / 2, s / 2, s * .3, 0, TAU); g.stroke();
  g.lineWidth = 6;
  for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; g.beginPath(); g.moveTo(s / 2 + Math.cos(a) * s * .36, s / 2 + Math.sin(a) * s * .36); g.lineTo(s / 2 + Math.cos(a) * s * .48, s / 2 + Math.sin(a) * s * .48); g.stroke(); }
  g.fillStyle = 'rgba(200,250,255,1)'; g.beginPath(); g.arc(s / 2, s / 2, 4, 0, TAU); g.fill();
});
const reticle = new THREE.Sprite(new THREE.SpriteMaterial({ map: reticleTex, color: hdr(0x9fefff, 1.3), transparent: true, opacity: .8, blending: ADD, depthWrite: false, depthTest: false }));
reticle.scale.setScalar(1.6);
reticle.renderOrder = 9;
scene.add(reticle);

// ═══════════════════════════ 5. 子彈：玩家的光彈、敵人的菱形彈、飛彈、雷射 ═══════════════════════════
const diamond = new THREE.OctahedronGeometry(1, 0);
const dummy = new THREE.Object3D();
const FWD = new V3(0, 0, 1);
function bulletLayer(max, coreColor, haloColor, haloOpacity) {
  const core = new THREE.InstancedMesh(diamond, new THREE.MeshBasicMaterial({ color: coreColor }), max);
  const halo = new THREE.InstancedMesh(diamond, new THREE.MeshBasicMaterial({ color: haloColor, transparent: true, opacity: haloOpacity, blending: ADD, depthWrite: false }), max);
  core.frustumCulled = halo.frustumCulled = false;
  core.count = halo.count = 0;
  halo.renderOrder = 6;
  scene.add(core, halo);
  const list = [];
  for (let i = 0; i < max; i++) list.push({ on: false, p: new V3(), v: new V3(), dir: new V3(0, 0, -1), life: 0, dmg: 1, spin: 0, small: false });
  return { core, halo, list };
}
const bolts = bulletLayer(160, hdr(0xbff6ff, 3.2), hdr(0x2bb8ff, 1.6), .5);   // 玩家：青色長菱形
const shots = bulletLayer(200, hdr(0xffd0d8, 3), hdr(0xff2f5a, 1.8), .55);      // 敵人：紅色菱形

function fireBolt(from, dir, speed, dmg, small) {
  const b = bolts.list.find((x) => !x.on);
  if (!b) return;
  b.on = true; b.p.copy(from); b.dir.copy(dir).normalize(); b.v.copy(b.dir).multiplyScalar(speed); b.life = 1.6; b.dmg = dmg; b.small = small;
}
function fireShot(from, dir, speed) {
  const s = shots.list.find((x) => !x.on);
  if (!s) return;
  s.on = true; s.p.copy(from); s.dir.copy(dir).normalize(); s.v.copy(s.dir).multiplyScalar(speed); s.life = 6; s.spin = rand(0, TAU);
}
function drawBullets(layer, sizeCore, sizeHalo, spinSpeed, dt) {
  let n = 0;
  for (const b of layer.list) {
    if (!b.on) continue;
    b.spin += spinSpeed * dt;
    dummy.position.copy(b.p);
    dummy.quaternion.setFromUnitVectors(FWD, b.dir);
    if (spinSpeed) dummy.rotateZ(b.spin);
    const k = b.small ? .65 : 1;
    dummy.scale.set(sizeCore.x * k, sizeCore.y * k, sizeCore.z * k); dummy.updateMatrix();
    layer.core.setMatrixAt(n, dummy.matrix);
    dummy.scale.set(sizeHalo.x * k, sizeHalo.y * k, sizeHalo.z * k); dummy.updateMatrix();
    layer.halo.setMatrixAt(n, dummy.matrix);
    n++;
  }
  layer.core.count = layer.halo.count = n;
  layer.core.instanceMatrix.needsUpdate = layer.halo.instanceMatrix.needsUpdate = true;
}
const BOLT_CORE = new V3(.09, .09, 1.6), BOLT_HALO = new V3(.26, .26, 2.4);
const SHOT_CORE = new V3(.2, .2, .4), SHOT_HALO = new V3(.46, .46, .78);

// 追蹤飛彈
const missileTpl = new THREE.Group();
missileTpl.add(mesh(cylZ(.07, .07, .7, 8), MAT.white));
missileTpl.add(mesh(new THREE.ConeGeometry(.07, .22, 8).rotateX(Math.PI / 2), MAT.gold, 0, 0, .46));
const missileGlow = glowSprite(hdr(0xffd08a, 2), .7);
missileGlow.position.z = -.4;
missileTpl.add(missileGlow);
const missiles = [];
for (let i = 0; i < 10; i++) {
  const m = missileTpl.clone(); m.visible = false; scene.add(m);
  const trail = makeTrail(16, .32, hdr(0xffb050, 2)); trail.mat.uniforms.uAlpha.value = 0;
  missiles.push({ m, on: false, p: m.position, v: new V3(), target: null, age: 0, puff: 0, trail, fade: 0 });
}

// 光束雷射：兩層圓柱（白色核心＋青色外層），從機頭往前射出去
const beamGeo = new THREE.CylinderGeometry(1, 1, 1, 14, 1, true).rotateX(-Math.PI / 2).translate(0, 0, -.5);
const beam = new THREE.Group();
const beamCore = mesh(beamGeo, new THREE.MeshBasicMaterial({ color: hdr(0xffffff, 3.2), transparent: true, blending: ADD, depthWrite: false }));
const beamOuter = mesh(beamGeo, new THREE.MeshBasicMaterial({ color: hdr(0x2bc4ff, 1.8), transparent: true, opacity: .55, blending: ADD, depthWrite: false }));
beamCore.renderOrder = beamOuter.renderOrder = 8;
beam.add(beamCore, beamOuter);
beam.visible = false;
scene.add(beam);
const BEAM_LEN = 260;

// ═══════════════════════════ 6. 敵人 ═══════════════════════════
const KIND = {
  saucer: { name: '攔截機', tpl: TPL_SAUCER, hp: 3, score: 150, r: 1.6, lv: 1 },
  bug: { name: '重裝砲艇', tpl: TPL_BUG, hp: 10, score: 400, r: 2.1, lv: 3 },
  rock: { name: '隕石', tpl: TPL_ROCK, hp: 4, score: 60, r: 1.3, lv: 1 },
};
const pools = { saucer: [], bug: [], rock: [] };
const enemies = [];
function spawnEnemy(kind, x, y, z, extra = {}) {
  const k = KIND[kind];
  const obj = pools[kind].pop() || larch.clone(k.tpl);
  obj.visible = true; obj.rotation.set(0, 0, 0); obj.scale.setScalar(1);
  obj.position.set(x, y, z);
  scene.add(obj);
  const e = { kind, obj, p: obj.position, name: k.name, hp: k.hp, max: k.hp, r: k.r, lv: k.lv + wave, score: k.score, age: 0, t: 0, state: 0, x0: x, y0: y, ph: rand(0, TAU), fireT: rand(1, 2), bt: 0, punch: 0, vx: 0, vy: 0, vz: 0, hold: -30, stay: 4, scale: 1, spin: null, burstLeft: 0, acc: 0, isWave: kind !== 'rock', ...extra };
  if (kind === 'rock') {
    e.scale = rand(.7, 1.5); obj.scale.setScalar(e.scale); e.r = k.r * e.scale; e.hp = e.max = Math.round(3 * e.scale + 1);
    e.spin = new V3(rand(-1.5, 1.5), rand(-1.5, 1.5), rand(-1.5, 1.5));
  }
  enemies.push(e);
  return e;
}
function removeEnemy(e) {
  const i = enemies.indexOf(e);
  if (i >= 0) enemies.splice(i, 1);
  scene.remove(e.obj);
  pools[e.kind].push(e.obj);
  if (lockTarget === e) lockTarget = null;
}

// ═══════════════════════════ 7. 母艦 ═══════════════════════════
const boss = { on: false, obj: TPL_BOSS, p: TPL_BOSS.position, hp: 1, max: 1, t: 0, mode: 'enter', modeT: 0, step: 0, stepT: 0, base: new V3(), ram: new V3(), lv: 0, name: '迴旋母艦', isBoss: true, pattern: 0, dying: 0, half: TPL_BOSS.userData.half, rammed: false, acc: 0 };
TPL_BOSS.visible = false;
scene.add(TPL_BOSS);
const bossGlow = glowSprite(hdr(0xff3a6a, 1.5), 1, 0);
TPL_BOSS.add(bossGlow);
// 砲塔位置（母艦自己的座標）：沿著機身前緣排開
const bossTurrets = [-.75, -.4, 0, .4, .75].map((u) => new V3(u * boss.half.x * .9, boss.half.y * .15, boss.half.z * (.4 - Math.abs(u) * .5)));
const BOSS_Z = -58;

// ═══════════════════════════ 8. 畫面上的介面（自己的 DOM） ═══════════════════════════
{
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;800&family=Rajdhani:wght@500;600;700&display=swap';
  document.head.append(link);
}
const css = document.createElement('style');
css.textContent = \`
.ss{position:absolute;inset:0;pointer-events:none;color:#e9f8ff;font-family:Rajdhani,"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif;font-weight:600;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;z-index:2}
.ss *{box-sizing:border-box}
.ss .o{font-family:Rajdhani,ui-monospace,Menlo,monospace;font-variant-numeric:tabular-nums}
.ss .gl{text-shadow:0 0 10px rgba(70,210,255,.85),0 1px 2px rgba(0,0,0,.85)}
.ss-tl{position:absolute;left:max(18px,env(safe-area-inset-left));top:max(14px,env(safe-area-inset-top));width:clamp(150px,22vw,250px)}
.ss-time{font-size:42px;font-weight:500;letter-spacing:.06em;line-height:1}
.ss-cap{margin-top:4px;font-size:11px;letter-spacing:.4em;color:#9fe2ff}
.ss-hp{margin-top:12px}
.ss-row{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-size:15px}
.ss-row b{color:#8fe6ff;letter-spacing:.24em;font-size:13px}
.ss-bar{position:relative;height:10px;margin-top:5px;background:rgba(60,170,230,.18);border:1px solid rgba(110,220,255,.4);clip-path:polygon(0 0,100% 0,calc(100% - 7px) 100%,0 100%)}
.ss-bar u{position:absolute;left:0;top:0;bottom:0;width:var(--v,100%);background:linear-gradient(90deg,#168dff,#6ff0ff);box-shadow:0 0 14px #3fd4ff;transition:width .25s ease}
.ss-bar::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 9px,rgba(4,10,20,.6) 9px 11px)}
.ss-hp.low .ss-bar u{background:linear-gradient(90deg,#ff2f55,#ff9a6a);box-shadow:0 0 14px #ff4a6a}
.ss-hp.low .ss-row span{color:#ffc2cc}
.ss-score{position:absolute;left:50%;top:max(12px,env(safe-area-inset-top));transform:translateX(-50%);text-align:center}
.ss-score .o{display:block;font-size:40px;font-weight:600;letter-spacing:.14em;line-height:1}
.ss-score small{display:block;margin-top:5px;font-size:11px;letter-spacing:.44em;color:#9fe2ff}
.ss-combo{display:block;margin-top:6px;font-size:16px;letter-spacing:.12em;color:#ffd36a;text-shadow:0 0 10px rgba(255,170,50,.85),0 1px 2px rgba(0,0,0,.8);opacity:0;transition:opacity .2s}
.ss-combo.on{opacity:1}
.ss-tr{position:absolute;right:max(16px,env(safe-area-inset-right));top:max(14px,env(safe-area-inset-top));display:grid;justify-items:end;gap:12px}
.ss-btn{pointer-events:auto;display:inline-flex;align-items:center;justify-content:center;gap:9px;height:40px;padding:0 18px;border:1px solid rgba(120,225,255,.75);background:linear-gradient(180deg,rgba(16,54,90,.9),rgba(6,18,34,.9));color:#eefbff;font:700 14px/1 Orbitron,Rajdhani,"Noto Sans TC",sans-serif;letter-spacing:.16em;cursor:pointer;clip-path:polygon(9px 0,100% 0,100% calc(100% - 9px),calc(100% - 9px) 100%,0 100%,0 9px);box-shadow:inset 0 0 14px rgba(70,200,255,.28);transition:background .15s,transform .1s}
.ss-btn:hover{background:linear-gradient(180deg,rgba(28,86,132,.95),rgba(8,28,50,.95))}
.ss-btn:active{transform:scale(.97)}
.ss-btn:focus-visible{outline:2px solid #bff4ff;outline-offset:2px}
.ss-stop i{display:inline-block;width:11px;height:12px;border-left:3px solid currentColor;border-right:3px solid currentColor}
.ss-radar{position:relative;width:124px;height:124px;border-radius:50%;background:radial-gradient(circle,rgba(10,44,70,.6),rgba(3,12,24,.78));border:1px solid rgba(110,220,255,.55);box-shadow:0 0 18px rgba(60,190,255,.25),inset 0 0 22px rgba(60,190,255,.16)}
.ss-radar canvas{width:100%;height:100%;display:block}
.ss-skills{position:absolute;left:max(18px,env(safe-area-inset-left));top:54%;transform:translateY(-50%);display:grid;gap:10px}
.ss-skill{pointer-events:auto;position:relative;display:grid;grid-template-columns:42px 1fr;align-items:center;gap:11px;width:214px;padding:9px 12px 9px 10px;border:1px solid rgba(110,220,255,.42);border-left:3px solid #45dcff;background:linear-gradient(90deg,rgba(8,32,56,.8),rgba(6,16,30,.5));color:#eefbff;text-align:left;font:inherit;cursor:pointer;clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,0 100%);transition:background .15s,opacity .2s,box-shadow .2s}
.ss-skill:hover{background:linear-gradient(90deg,rgba(18,62,100,.92),rgba(8,26,46,.62))}
.ss-skill:focus-visible{outline:2px solid #bff4ff;outline-offset:2px}
.ss-skill:active{background:linear-gradient(90deg,rgba(40,130,190,.92),rgba(8,26,46,.62))}
.ss-skill svg{width:42px;height:42px;padding:7px;border:1px solid rgba(110,220,255,.42);background:rgba(40,140,200,.14);stroke:#86ebff;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.ss-skill .nm{display:flex;justify-content:space-between;align-items:center;gap:6px;font-size:16px;letter-spacing:.06em}
.ss-skill kbd{font:700 12px Rajdhani,monospace;color:#bff0ff;border:1px solid rgba(110,220,255,.5);padding:2px 5px;line-height:1}
.ss-skill .ct{font:700 14px Rajdhani,monospace;color:#d8f8ff;min-width:42px;text-align:right}
.ss-pr{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:6px}
.ss-pips{display:flex;gap:3px;flex:1}
.ss-pips i{flex:1;height:6px;background:rgba(110,220,255,.18);transform:skewX(-20deg)}
.ss-pips i.on{background:#45dcff;box-shadow:0 0 8px #45dcff}
.ss-skill.ready{border-color:rgba(150,238,255,.95);box-shadow:0 0 18px rgba(70,210,255,.35)}
.ss-skill.ready svg{stroke:#fff;background:rgba(70,210,255,.32)}
.ss-skill.active{border-left-color:#fff;background:linear-gradient(90deg,rgba(40,140,205,.82),rgba(6,16,30,.5))}
.ss-skill.empty{opacity:.62}
.ss-lock{position:absolute;left:0;top:0;width:60px;height:60px;opacity:0;transition:opacity .12s;will-change:transform}
.ss-lock.on{opacity:1}
.ss-lock>span{position:absolute;width:14px;height:14px;border:2px solid #ff5a78;filter:drop-shadow(0 0 4px rgba(255,80,110,.9))}
.ss-lock>span:nth-child(1){left:0;top:0;border-right:0;border-bottom:0}
.ss-lock>span:nth-child(2){right:0;top:0;border-left:0;border-bottom:0}
.ss-lock>span:nth-child(3){left:0;bottom:0;border-right:0;border-top:0}
.ss-lock>span:nth-child(4){right:0;bottom:0;border-left:0;border-top:0}
.ss-lock em{position:absolute;left:calc(100% + 8px);top:-6px;white-space:nowrap;font-style:normal;font-size:14px;line-height:1.25;padding:3px 9px 5px;background:rgba(36,4,14,.72);border-left:2px solid #ff5a78;color:#ffe6ea}
.ss-lock em small{display:block;font:700 12px Rajdhani,monospace;color:#ffa6b6;letter-spacing:.08em}
.ss-lock.flip em{left:auto;right:calc(100% + 8px);border-left:0;border-right:2px solid #ff5a78;text-align:right}
.ss-lock em u{display:block;height:3px;margin-top:3px;background:rgba(255,90,120,.25);text-decoration:none}
.ss-lock em u b{display:block;height:100%;width:var(--v,100%);background:#ff5a78}
.ss-dmg{position:absolute;left:0;top:0;font:700 22px/1 Rajdhani,sans-serif;color:#fff;text-shadow:0 0 8px #3fd4ff,0 2px 2px rgba(0,0,0,.75);white-space:nowrap;opacity:0}
.ss-dmg.big{font-size:30px;color:#ffe08a;text-shadow:0 0 10px #ffb43a,0 2px 2px rgba(0,0,0,.75)}
.ss-dmg.hurt{color:#ff8a9c;text-shadow:0 0 10px #ff2f55,0 2px 2px rgba(0,0,0,.75)}
.ss-dmg.info{font:700 18px/1 Rajdhani,"Noto Sans TC",sans-serif;letter-spacing:.14em;color:#c8f6ff}
.ss-boss{position:absolute;left:50%;top:calc(max(12px,env(safe-area-inset-top)) + 82px);transform:translateX(-50%);width:min(640px,56vw);opacity:0;transition:opacity .4s}
.ss-boss.on{opacity:1}
.ss-boss .ss-row{color:#ffe0e6;letter-spacing:.12em;text-shadow:0 1px 2px rgba(0,0,0,.85)}
.ss-boss .ss-row b{color:#ffadbd}
.ss-boss .ss-bar{height:12px;border-color:rgba(255,110,140,.55);background:rgba(255,60,100,.16)}
.ss-boss .ss-bar u{background:linear-gradient(90deg,#ff2f6a,#ff9a5a);box-shadow:0 0 14px #ff4a7a}
.ss-hurt{position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 48%,rgba(255,30,70,.62));opacity:0}
.ss-flash{position:absolute;inset:0;background:#e8fbff;opacity:0}
.ss-banner{position:absolute;left:0;right:0;top:32%;display:grid;justify-items:center;gap:8px;padding:0 16px;text-align:center;opacity:0}
.ss-banner b{font:700 clamp(28px,6vw,56px)/1.15 Orbitron,Rajdhani,"Noto Sans TC",sans-serif;letter-spacing:.14em;color:#fff;text-shadow:0 0 20px rgba(70,210,255,.95),0 2px 3px rgba(0,0,0,.6)}
.ss-banner span{font-size:clamp(15px,2.4vw,20px);letter-spacing:.2em;color:#c8f4ff;text-shadow:0 1px 3px rgba(0,0,0,.9)}
.ss-banner::before,.ss-banner::after{content:"";width:min(560px,80vw);height:1px;background:linear-gradient(90deg,transparent,#45dcff,transparent)}
.ss-banner.warn b{color:#ffe2e7;text-shadow:0 0 20px rgba(255,40,80,.95),0 2px 3px rgba(0,0,0,.6)}
.ss-banner.warn span{color:#ffd0d8}
.ss-banner.warn::before,.ss-banner.warn::after{height:10px;background:repeating-linear-gradient(-45deg,rgba(255,60,90,.85) 0 10px,transparent 10px 20px)}
.ss-over{position:absolute;inset:0;display:none;place-items:center;pointer-events:auto;background:rgba(2,8,18,.55);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}
.ss-over.on{display:grid}
.ss-over.see{background:rgba(2,8,18,.35);-webkit-backdrop-filter:none;backdrop-filter:none;pointer-events:none;align-items:start;padding-top:11vh}
.ss-card{display:grid;gap:14px;justify-items:center;min-width:min(440px,88vw);padding:26px 30px;border:1px solid rgba(110,220,255,.6);background:linear-gradient(180deg,rgba(10,32,56,.94),rgba(4,12,24,.94));clip-path:polygon(16px 0,100% 0,100% calc(100% - 16px),calc(100% - 16px) 100%,0 100%,0 16px);box-shadow:inset 0 0 30px rgba(60,190,255,.16)}
.ss-card h2{margin:0;font:700 clamp(22px,5vw,38px)/1.15 Orbitron,Rajdhani,"Noto Sans TC",sans-serif;letter-spacing:.12em;color:#fff;text-shadow:0 0 16px rgba(70,210,255,.8);text-align:center}
.ss-card.lose h2{text-shadow:0 0 16px rgba(255,60,90,.85)}
.ss-card p{margin:0;color:#c8f4ff;letter-spacing:.14em;text-align:center}
.ss-card .acts{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.ss-card .acts .ss-btn{min-width:150px;height:46px;font-size:16px}
.ss-stats{display:grid;grid-template-columns:auto auto;gap:8px 30px;margin:4px 0 0;font-size:18px}
.ss-stats dt{color:#9fe2ff;letter-spacing:.14em}
.ss-stats dd{margin:0;text-align:right;font-family:Rajdhani,monospace;font-weight:700;font-variant-numeric:tabular-nums}
.ss.phone .ss-tl{width:132px}
.ss.phone .ss-time{font-size:22px}
.ss.phone .ss-cap{font-size:9px;letter-spacing:.3em}
.ss.phone .ss-hp{margin-top:7px}
.ss.phone .ss-row{font-size:12px}
.ss.phone .ss-row b{font-size:11px}
.ss.phone .ss-score .o{font-size:20px;letter-spacing:.1em}
.ss.phone .ss-score small{font-size:9px;letter-spacing:.3em}
.ss.phone .ss-btn{height:36px;padding:0 12px}
.ss.phone .ss-stop span{display:none}
.ss.phone .ss-radar{width:86px;height:86px}
.ss.phone .ss-skills{left:auto;right:max(14px,env(safe-area-inset-right));top:auto;bottom:calc(max(16px,env(safe-area-inset-bottom)) + 108px);transform:none;gap:8px}
.ss.phone .ss-skill{width:66px;grid-template-columns:1fr;justify-items:center;gap:3px;padding:6px 6px 7px;border-left-width:1px;border-bottom:3px solid #45dcff}
.ss.phone .ss-skill svg{width:36px;height:36px;padding:6px}
.ss.phone .ss-skill .nm{display:none}
.ss.phone .ss-skill .ss-pr{width:100%;margin-top:3px}
.ss.phone .ss-skill .ct{position:absolute;right:4px;top:2px;min-width:0;font-size:11px}
.ss.phone .ss-boss{width:calc(100% - 36px);top:calc(max(12px,env(safe-area-inset-top)) + 100px)}
.ss.phone .ss-lock em{font-size:12px}
/* 簡報：上下黑邊、地點字幕、跳過鈕；平常的 HUD 先收起來 */
.ss-tl,.ss-score,.ss-tr,.ss-skills{transition:opacity .5s,visibility 0s}
.ss.cine .ss-tl,.ss.cine .ss-score,.ss.cine .ss-tr,.ss.cine .ss-skills,.ss.cine .ss-boss{opacity:0;visibility:hidden;transition:opacity .3s,visibility 0s .3s}
.ss-lb-t,.ss-lb-b{position:absolute;left:0;right:0;height:min(7vh,54px);background:#02050c;transform:scaleY(0);transition:transform .7s cubic-bezier(.2,.8,.2,1)}
.ss-lb-t{top:0;transform-origin:top}
.ss-lb-b{bottom:0;transform-origin:bottom}
.ss.cine .ss-lb-t,.ss.cine .ss-lb-b{transform:scaleY(1)}
.ss-loc{position:absolute;left:max(20px,env(safe-area-inset-left));top:calc(min(7vh,54px) + 14px);display:grid;gap:3px;opacity:0;transform:translateX(-8px);transition:opacity .6s .3s,transform .6s .3s}
.ss.cine .ss-loc{opacity:1;transform:none}
.ss-loc small{font-size:12px;letter-spacing:.42em;color:#8fe6ff}
.ss-loc b{font-size:20px;letter-spacing:.16em;color:#f2fbff;font-weight:700}
.ss-loc::before{content:"";width:46px;height:2px;margin-bottom:5px;background:linear-gradient(90deg,#ffc65a,transparent)}
.ss-skip{position:absolute;right:max(16px,env(safe-area-inset-right));top:calc(min(7vh,54px) + 12px);opacity:0;visibility:hidden;transition:opacity .3s,visibility 0s .3s}
.ss-skip kbd{font:700 11px Rajdhani,monospace;color:#bff0ff;border:1px solid rgba(110,220,255,.5);padding:2px 5px;line-height:1;letter-spacing:.06em}
.ss.cine .ss-skip{opacity:1;visibility:visible;transition:opacity .3s .4s,visibility 0s}
.ss.cine.choosing .ss-skip{opacity:0;visibility:hidden;transition:opacity .2s,visibility 0s .2s}
/* 選強化時 larch.choose 沒有立繪：照 Larch 對話框的立繪位置自己放一張艾可（在對話框後面） */
.ss-pose{position:absolute;bottom:0;left:75%;height:88%;width:0;opacity:0;transform:translateY(16px);transition:opacity .35s,transform .35s}
.ss-pose.on{opacity:1;transform:none}
.ss-pose img{position:absolute;left:0;bottom:0;height:100%;width:auto;max-width:none;transform:translateX(-50%) scale(var(--s,.86));transform-origin:bottom center;filter:drop-shadow(0 10px 18px rgba(20,24,44,.28))}
/* 選的強化：HP 下面一個金色標籤，強化的技能加金邊 */
.ss-load{display:inline-flex;align-items:center;gap:7px;margin-top:10px;padding:3px 10px 4px 8px;font-size:13px;letter-spacing:.14em;color:#ffe7b0;background:linear-gradient(90deg,rgba(84,54,8,.82),rgba(40,26,4,.2));border-left:2px solid #ffc65a;text-shadow:0 1px 2px rgba(0,0,0,.8)}
.ss-load:empty{display:none}
.ss-load::before{content:"";width:7px;height:7px;background:#ffc65a;transform:rotate(45deg);box-shadow:0 0 8px #ffb43a}
.ss-load.pop{animation:ssPop 1.2s ease-out}
@keyframes ssPop{0%,30%{box-shadow:0 0 0 1px #ffd78a,0 0 22px rgba(255,190,80,.8)}100%{box-shadow:none}}
.ss-skill.boost{border-left-color:#ffc65a}
.ss-skill.boost .nm span::after{content:" +";color:#ffd27a}
.ss-skill.boost .ss-pips i.on{background:#ffc65a;box-shadow:0 0 8px #ffb43a}
.ss-hp.armored .ss-bar{border-color:rgba(255,205,120,.8);box-shadow:0 0 10px rgba(255,190,80,.35)}
.ss-hp.armored .ss-row b::after{content:"+";color:#ffd27a}
/* 戰鬥中的通訊視窗：大頭照＋一句話，遊戲照常進行 */
.ss-comm{position:absolute;left:max(18px,env(safe-area-inset-left));bottom:max(24px,env(safe-area-inset-bottom));display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center;width:min(500px,calc(100% - 36px));padding:10px 18px 10px 10px;background:linear-gradient(90deg,rgba(8,30,54,.92),rgba(5,13,27,.8));border:1px solid rgba(110,220,255,.5);border-left:3px solid #45dcff;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%);opacity:0;transform:translateY(12px);transition:opacity .25s,transform .25s}
.ss-comm.on{opacity:1;transform:none}
.ss-comm.warn{border-left-color:#ff5a78}
.ss-face{--half:34px;position:relative;width:68px;height:68px;overflow:hidden;background:radial-gradient(circle at 50% 30%,rgba(70,200,255,.38),rgba(4,14,28,.95));border:1px solid rgba(110,220,255,.55)}
.ss-face img{position:absolute;left:0;top:0;width:260%;max-width:none;transform:translate(calc(var(--half) - var(--fx,50%)),calc(var(--half) - var(--fy,11%)))}
.ss-face b{position:absolute;inset:0;display:grid;place-items:center;font:700 20px Orbitron,Rajdhani,"Noto Sans TC",sans-serif;color:#9fefff}
.ss-face.has-img b{display:none}
.ss-face::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(0,10,20,.22) 0 1px,transparent 1px 3px)}
.ss-comm small{display:block;font-size:12px;letter-spacing:.3em;color:#8fe6ff}
.ss-comm p{margin:3px 0 0;font-size:18px;line-height:1.45;color:#eefbff;letter-spacing:.04em}
.ss.phone .ss-loc{left:max(14px,env(safe-area-inset-left))}
.ss.phone .ss-loc b{font-size:15px;letter-spacing:.1em}
.ss.phone .ss-loc small{font-size:10px;letter-spacing:.3em}
.ss.phone .ss-skip kbd{display:none}
.ss.phone .ss-load{font-size:11px;margin-top:7px;padding:2px 8px 3px 6px;letter-spacing:.08em}
.ss.phone .ss-skill.boost{border-bottom-color:#ffc65a}
.ss.phone .ss-comm{left:50%;bottom:auto;top:calc(max(12px,env(safe-area-inset-top)) + 142px);gap:10px;padding:8px 12px 8px 8px;transform:translate(-50%,12px)}
.ss.phone .ss-comm.on{transform:translate(-50%,0)}
.ss.phone .ss-face{--half:26px;width:52px;height:52px}
.ss.phone .ss-comm p{font-size:15px}
.ss.phone .ss-comm small{font-size:10px}
@media (orientation:landscape) and (max-height:500px){
  .ss.phone .ss-comm{top:calc(max(12px,env(safe-area-inset-top)) + 84px);width:min(440px,56vw)}
  .ss.phone .ss-skills{grid-auto-flow:column;bottom:max(16px,env(safe-area-inset-bottom));right:calc(max(14px,env(safe-area-inset-right)) + 104px)}
  .ss.phone .ss-boss{top:calc(max(12px,env(safe-area-inset-top)) + 46px);width:min(420px,50vw)}
}
@media (prefers-reduced-motion:reduce){.ss-bar u{transition:none}}
\`;
document.head.append(css);

const hud = document.createElement('div');
hud.className = \`ss\${PHONE ? ' phone' : ''}\`;
const ICONS = {
  missile: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6l-9 9-6-6z"/><path d="M8 16l-4 4"/><path d="M7 11l-3 1 1 3"/><path d="M13 17l-1 3-3-1"/></svg>',
  laser: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="2.5"/><path d="M8 12h13"/><path d="M8 8.5l11-1.5M8 15.5l11 1.5"/></svg>',
  dash: '<svg viewBox="0 0 24 24"><path d="M4 6l6 6-6 6"/><path d="M11 6l6 6-6 6"/><path d="M18 9l3 3-3 3"/></svg>',
};
const SKILLS = [['missile', '追蹤飛彈', '1', 6], ['laser', '光束雷射', '2', 5], ['dash', '極速衝刺', '3', 3]];
hud.innerHTML = \`
  <div class="ss-tl">
    <div class="ss-time o gl" data-r="time">00:00</div>
    <div class="ss-cap">GAME TIME</div>
    <div class="ss-hp" data-r="hpbox"><div class="ss-row gl"><b>HP</b><span class="o" data-r="hp"></span></div><div class="ss-bar"><u data-r="hpbar"></u></div></div>
    <div class="ss-load" data-r="load"></div>
  </div>
  <div class="ss-score"><span class="o gl" data-r="score">0000000</span><small>SCORE</small><span class="ss-combo" data-r="combo"></span></div>
  <div class="ss-tr">
    <button type="button" class="ss-btn ss-stop" data-r="stop" aria-label="暫停"><i></i><span>STOP</span></button>
    <div class="ss-radar" aria-hidden="true"><canvas data-r="radar"></canvas></div>
  </div>
  <div class="ss-boss" data-r="boss"><div class="ss-row"><b>迴旋母艦</b><span class="o" data-r="bosshp"></span></div><div class="ss-bar"><u data-r="bossbar"></u></div></div>
  <div class="ss-skills">
    \${SKILLS.map(([k, name, key, pips]) => \`<button type="button" class="ss-skill" data-skill="\${k}" aria-label="\${name}">\${ICONS[k]}<div><div class="nm"><span>\${name}</span>\${PHONE ? '' : \`<kbd>\${key}</kbd>\`}</div><div class="ss-pr"><div class="ss-pips">\${'<i></i>'.repeat(pips)}</div><span class="ct o"></span></div></div></button>\`).join('')}
  </div>
  <div class="ss-lock" data-r="lock"><span></span><span></span><span></span><span></span><em><span data-r="lockname"></span><small data-r="locklv"></small><u><b data-r="lockhp"></b></u></em></div>
  <div data-r="dmg"></div>
  <div class="ss-comm" data-r="comm" role="status"><div class="ss-face" data-r="face"><img data-r="faceimg" alt=""><b data-r="facemark"></b></div><div><small data-r="commwho"></small><p data-r="commtext"></p></div></div>
  <div class="ss-pose" data-r="pose"><img data-r="poseimg" alt=""></div>
  <div class="ss-lb-t"></div><div class="ss-lb-b"></div>
  <div class="ss-loc"><small>出擊前簡報</small><b>航母曙光號｜天琴星門外圍</b></div>
  <button type="button" class="ss-btn ss-skip" data-r="skip">跳過劇情 ›\${PHONE ? '' : ' <kbd>ESC</kbd>'}</button>
  <div class="ss-banner" data-r="banner"><b></b><span></span></div>
  <div class="ss-hurt" data-r="hurt"></div>
  <div class="ss-flash" data-r="flash"></div>
  <div class="ss-over" data-r="pause"><div class="ss-card"><h2>PAUSE</h2><p>暫停中</p><div class="acts"><button type="button" class="ss-btn" data-r="resume">繼續</button></div></div></div>
  <div class="ss-over see" data-r="result"><div class="ss-card" data-r="resultcard"><h2 data-r="rtitle"></h2><p data-r="rsub"></p><dl class="ss-stats" data-r="rstats"></dl></div></div>
\`;
larch.ui.root.append(hud);
const ui = {};
for (const el of hud.querySelectorAll('[data-r]')) ui[el.dataset.r] = el;
const skillEls = {};
for (const el of hud.querySelectorAll('[data-skill]')) skillEls[el.dataset.skill] = { el, pips: [...el.querySelectorAll('.ss-pips i')], ct: el.querySelector('.ct') };

// 雷達
const radarCtx = ui.radar.getContext('2d');
const DPR = Math.min(2, window.devicePixelRatio || 1);
function sizeRadar() { const s = Math.round(ui.radar.clientWidth * DPR) || 120; if (ui.radar.width !== s) ui.radar.width = ui.radar.height = s; }
sizeRadar();

// 傷害數字（DOM，跟著 3D 位置）
const dmgPool = [];
for (let i = 0; i < 18; i++) { const d = document.createElement('div'); d.className = 'ss-dmg'; ui.dmg.append(d); dmgPool.push(d); }
let dmgNext = 0;
const _scr = new V3();
let VW = larch.ui.root.clientWidth || innerWidth, VH = larch.ui.root.clientHeight || innerHeight;
addEventListener('resize', () => { VW = larch.ui.root.clientWidth || innerWidth; VH = larch.ui.root.clientHeight || innerHeight; sizeRadar(); });
const scr = { x: 0, y: 0, ok: false };
function toScreen(pos) {
  _scr.copy(pos).project(camera);
  scr.x = (_scr.x * .5 + .5) * VW; scr.y = (-_scr.y * .5 + .5) * VH;
  scr.ok = _scr.z < 1 && Math.abs(_scr.x) < 1.2 && Math.abs(_scr.y) < 1.2;
  return scr;
}
function popNumber(text, pos, kind = '') {
  const s = toScreen(pos);
  if (!s.ok) return;
  const d = dmgPool[dmgNext]; dmgNext = (dmgNext + 1) % dmgPool.length;
  d.className = \`ss-dmg \${kind}\`;
  d.textContent = text;
  const x = s.x + rand(-34, 34), y = s.y - rand(0, 26);
  d.getAnimations().forEach((a) => a.cancel());
  d.animate([
    { opacity: 0, transform: \`translate(\${x}px,\${y}px) translate(-50%,-50%) scale(.6)\` },
    { opacity: 1, transform: \`translate(\${x}px,\${y - 14}px) translate(-50%,-50%) scale(1.15)\`, offset: .18 },
    { opacity: 1, transform: \`translate(\${x}px,\${y - 30}px) translate(-50%,-50%) scale(1)\`, offset: .7 },
    { opacity: 0, transform: \`translate(\${x}px,\${y - 48}px) translate(-50%,-50%) scale(.95)\` },
  ], { duration: 820, easing: 'ease-out', fill: 'forwards' });
}
function flashEl(el, peak, ms) { el.getAnimations().forEach((a) => a.cancel()); el.animate([{ opacity: peak }, { opacity: 0 }], { duration: ms, easing: 'ease-out', fill: 'forwards' }); }

// 大標題（第幾波、警告）：照遊戲時間等，暫停時也會停
function banner(title, sub, warn = false, secs = 2) {
  const el = ui.banner;
  el.classList.toggle('warn', warn);
  el.querySelector('b').textContent = title;
  el.querySelector('span').textContent = sub || '';
  el.getAnimations().forEach((a) => a.cancel());
  el.animate([
    { opacity: 0, transform: 'scale(1.12)' },
    { opacity: 1, transform: 'scale(1)', offset: .14 },
    { opacity: 1, transform: 'scale(1)', offset: .82 },
    { opacity: 0, transform: 'scale(.98)' },
  ], { duration: secs * 1000, easing: 'ease-out', fill: 'forwards' });
  return gwait(secs * .85);
}

// ═══════════════════════════ 9. 遊戲狀態 ═══════════════════════════
let paused = false, gameTime = 0, playTime = 0, phase = 'intro';
let hp = MAX_HP, score = 0, kills = 0, wave = 0, combo = 0, comboT = 0, bestCombo = 0;
let alive = true, invuln = 0, travelSpeed = 46, travel = 0;
const vel = new THREE.Vector2();
let fireHeld = false, fireT = 0, shotSound = 0, sparkFx = 0;
const skill = { missiles: 6, missileT: 0, laser: 0, laserOn: 0, dash: 3, dashT: 0, dashOn: 0 };
let lockTarget = null;
let XLIM = 7.5;
const YMIN = -2.2, YMAX = 3.4;
let camMix = 0;   // 0 = 開場鏡頭，1 = 追尾鏡頭
let skip = false; // 測試用：直接跳到母艦戰
// 出擊前選的強化（null＝還沒選）與它改掉的數值
let loadout = null;
let maxHp = MAX_HP, armor = 1, missileMax = 6, missileEvery = 4, laserTime = 16;
// 劇情：skip＝簡報按了跳過，choosing＝正在選強化，comm＝戰鬥中的通訊還在講
const story = { skip: false, choosing: false, comm: false, seen: false };
// 簡報的鏡頭：繞著小隊慢慢轉（a 是從機尾量起的角度，side＝主角往畫面哪一邊偏，讓開立繪）
const cine = { a: 2.3, r: 14, h: 3.4, side: 1, ta: 2.3, tr: 14, th: 3.4, tside: 1, focus: 'squad', t: 0, look: new V3(), ready: false };

// 照遊戲時間等待（暫停時不會往前走）
const waiters = [];
function until(fn) { return new Promise((res) => waiters.push({ fn, res })); }
function gwait(s) { const at = gameTime + s; return until(() => gameTime >= at); }

// ═══════════════════════════ 10. 輸入 ═══════════════════════════
let fireBtn = null;
if (PHONE) {
  larch.input.useStick(true);
  fireBtn = larch.ui.button('發射', () => { fireHeld = true; }, { at: 'bottom-right', color: 'blue', id: 'fire' });
  fireBtn.style.cssText += ';width:88px;height:88px;min-height:88px;padding:0;font-size:18px;letter-spacing:.12em;clip-path:polygon(28% 0,72% 0,100% 28%,100% 72%,72% 100%,28% 100%,0 72%,0 28%)';
  fireBtn.addEventListener('pointerdown', (e) => { try { fireBtn.setPointerCapture(e.pointerId); } catch { /* 沒關係 */ } });
  const stop = () => { fireHeld = false; };
  fireBtn.addEventListener('pointerup', stop);
  fireBtn.addEventListener('pointercancel', stop);
  fireBtn.addEventListener('lostpointercapture', stop);
}
for (const [k, s] of Object.entries(skillEls)) {
  s.el.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); useSkill(k); });
  s.el.addEventListener('keydown', (e) => { if (e.key === 'Enter') useSkill(k); });
}
// 結算時把搖桿、發射鈕、技能收起來（才不會蓋住「再玩一次」）
function showControls(on) {
  if (PHONE) { larch.input.useStick(on); if (fireBtn) fireBtn.style.display = on ? '' : 'none'; }
  hud.querySelector('.ss-skills').style.visibility = on ? '' : 'hidden';
}
ui.stop.addEventListener('click', () => setPaused(true));
ui.resume.addEventListener('click', () => setPaused(false));
function setPaused(on) {
  if (phase === 'over' || phase === 'intro' || phase === 'brief') on = false;
  if (on === paused) return;
  paused = on;
  ui.pause.classList.toggle('on', on);
  larch.sound('click', .5);
  if (on) { fireHeld = false; ui.resume.focus(); }
}

// ═══════════════════════════ 11. 技能 ═══════════════════════════
function useSkill(k) {
  if (paused || !alive || (phase !== 'play' && phase !== 'boss')) return;
  if (k === 'missile') {
    if (skill.missiles <= 0) { larch.sound('error', .4); return; }
    const targets = pickTargets(2);
    for (let i = 0; i < 2 && skill.missiles > 0; i++) {
      const m = missiles.find((x) => !x.on);
      if (!m) break;
      skill.missiles--;
      m.on = true; m.age = 0; m.m.visible = true; m.target = targets[i] || targets[0] || null;
      m.p.set(ship.position.x + (i ? 1 : -1) * SHIP_HALF.x * .6, ship.position.y - .2, ship.position.z - .5);
      for (const q of m.trail.pts) q.copy(m.p);
      m.fade = 1;
      m.v.set((i ? 1 : -1) * 9, 5, -14);
    }
    larch.sound('swoosh', .6);
    ring(ship.position, 2.4, COL.gold, .4, false);
  } else if (k === 'laser') {
    if (skill.laser < 1 || skill.laserOn > 0) { larch.sound('error', .4); return; }
    skill.laser = 0; skill.laserOn = 2.6;
    larch.sound('magicburst', .7); larch.sound('zap', .6);
    larch.shake(.25, .4);
    ring(ship.position, 3, COL.cyan, .5, false);
  } else if (k === 'dash') {
    if (skill.dash < 1 || skill.dashOn > 0) { larch.sound('error', .4); return; }
    skill.dash--; skill.dashOn = 1;
    larch.sound('whoosh', .8);
    for (let i = 0; i < 3; i++) ring(ship.position, 3 + i * 1.4, COL.cyan, .45 + i * .12, false, 30 + i * 10);
    for (let i = 0; i < 40; i++) emit(ship.position.x + rand(-3, 3), ship.position.y + rand(-2, 2), ship.position.z + rand(-6, 2), 0, 0, rand(60, 110), rand(.25, .5), rand(.12, .3), 0, COL.ice, 0);
    popNumber('HI SPEED', ship.position, 'info');
  }
}
// 飛彈要追的目標：鎖定的那個優先，再來是最近的
function pickTargets(n) {
  const list = enemies.filter((e) => e.p.z < -4 && e.p.z > -160);
  if (boss.on && !boss.dying && boss.mode !== 'enter') list.push(boss);
  list.sort((a, b) => (a === lockTarget ? -1 : b === lockTarget ? 1 : 0) || a.p.distanceToSquared(ship.position) - b.p.distanceToSquared(ship.position));
  return list.slice(0, n);
}

// ═══════════════════════════ 12. 傷害、爆炸、得分 ═══════════════════════════
function explode(pos, size, color = COL.orange) {
  emit(pos.x, pos.y, pos.z, 0, 0, 10, .22, 5 * size, 9 * size, COL.white, 0);
  emit(pos.x, pos.y, pos.z, 0, 0, 12, .45, 3 * size, 6 * size, color, 0);
  burst(pos, Math.round(24 * size), 14 * size, .8, .35 * size, color, 2.2);
  burst(pos, Math.round(12 * size), 20 * size, .5, .2 * size, COL.ice, 3);
  ring(pos, 4 * size, color, .5, true, 10);
  if (size > .9) ring(pos, 6.5 * size, COL.cyan, .7, true, 10);
  larch.effect('sparks', pos, { scale: size });
}
function addScore(n) { score += Math.round(n * (1 + Math.min(combo, 10) * .1)); }
// 傷害數字：連續打中同一個目標時，0.12 秒內的傷害合成一個數字（雷射、母艦才不會疊成一團）
function showDamage(t, dmg, at) {
  t.acc += dmg;
  if (gameTime - (t.popAt || 0) < .12 && t.hp > 0) return;
  popNumber(String(Math.round(t.acc * 100)), at, t.acc >= 4 ? 'big' : '');
  t.acc = 0; t.popAt = gameTime;
}
function damageEnemy(e, dmg, at) {
  e.hp -= dmg;
  e.punch = .12;
  if (sparkFx <= 0) { larch.effect('sparks', at, { scale: .5 }); sparkFx = .1; }
  if (dmg >= .5) burst(at, 5, 9, .25, .16, COL.ice, 4, 8);
  showDamage(e, dmg, at);
  if (e.hp <= 0) {
    explode(e.p, e.kind === 'bug' ? 1.4 : e.kind === 'rock' ? .8 * e.scale : 1, e.kind === 'rock' ? COL.gold : COL.orange);
    larch.sound(e.kind === 'bug' ? 'explosion' : 'blast', e.kind === 'bug' ? .7 : .45);
    if (e.kind === 'bug') larch.shake(.25, .3);
    kills++; combo++; comboT = 2.5; bestCombo = Math.max(bestCombo, combo);
    addScore(e.score);
    skill.laser = Math.min(1, skill.laser + (e.kind === 'bug' ? .14 : .05));
    removeEnemy(e);
  }
}
function damageBoss(dmg, at) {
  if (!boss.on || boss.dying || boss.mode === 'enter') return;
  const before = boss.hp;
  boss.hp = Math.max(0, boss.hp - dmg);
  if (sparkFx <= 0) {
    larch.effect('sparks', at, { scale: .8 }); sparkFx = .1;
    arc(at, _c.copy(at).add(_s.set(rand(-2, 2), rand(-1, 1.5), rand(-.5, .5))), .12, .4);
  }
  if (dmg >= .5) burst(at, 4, 8, .25, .2, COL.ice, 4, 4);
  showDamage(boss, dmg, at);
  addScore((before - boss.hp) * 10);
  if (boss.hp <= 0) { boss.dying = 3; boss.mode = 'dying'; larch.sound('roar', .8); larch.shake(.6, 1); }
}
function hurtPlayer(dmg, at) {
  if (!alive || invuln > 0 || phase === 'over' || phase === 'brief') return;
  if (skill.dashOn > 0) { popNumber('閃避', ship.position, 'info'); return; }
  dmg = Math.round(dmg * armor);
  hp = Math.max(0, hp - dmg);
  invuln = 1;
  combo = 0;
  larch.shake(.55, .4);
  larch.sound('hurt', .8); larch.sound('impact', .6);
  flashEl(ui.hurt, 1, 600);
  shield.material.opacity = .55;
  burst(at || ship.position, 18, 10, .5, .25, COL.red, 3, 10);
  arc(ship.position, _c.copy(ship.position).add(_s.set(rand(-2, 2), rand(-1, 1), rand(-1, 1))), .2, .5);
  popNumber(\`-\${dmg}\`, ship.position, 'hurt');
  if (hp <= 0) {
    alive = false;
    explode(ship.position, 2.2, COL.orange);
    explode(ship.position, 1.4, COL.cyan);
    larch.sound('explosion', 1); larch.shake(1.2, .9);
    flashEl(ui.flash, .7, 700);
    ship.visible = false; skill.laserOn = 0; beam.visible = false;
    for (const w of wingmen) { w.root.visible = false; explode(w.root.position, .8); }
  }
}

// ═══════════════════════════ 13. 每一格 ═══════════════════════════
const _v = new V3(), _w = new V3(), _aim = new V3(), _q = new V3(), _from = new V3(), _size = new THREE.Vector2();
const camPos = new V3(0, 3, 9), camLook = new V3(0, .5, -20);
const introPos = new V3(-6.2, .5, -7.2), introLook = new V3(0, 1.9, -1);

larch.onUpdate((dt) => {
  if (phase === 'brief') { if (larch.input.pressed('Escape')) skipStory(); }
  else if (larch.input.pressed('Escape') || larch.input.pressed('KeyP')) setPaused(!paused);
  if (!paused) step(dt);
  updateCamera(paused ? 0 : dt);
  skyRig.position.copy(camera.position);
  cloudSea.position.x = camera.position.x; cloudSea.position.z = camera.position.z;
  pMat.uniforms.uScale.value = larch.renderer.getDrawingBufferSize(_size).y / (2 * Math.tan(camera.fov * Math.PI / 360));
  drawHud();
});

function step(dt) {
  gameTime += dt;
  for (let i = waiters.length - 1; i >= 0; i--) if (waiters[i].fn()) waiters.splice(i, 1)[0].res();
  const fighting = phase === 'play' || phase === 'boss';
  if (fighting && alive) playTime += dt;
  sparkFx -= dt;

  // 前進速度（衝刺時更快）
  const dashing = skill.dashOn > 0;
  const wantSpeed = (38 + SHIP_SPEED * 1.6) * (dashing ? 2.6 : 1) * (phase === 'brief' ? .4 : 1); // 簡報時巡航慢一點
  travelSpeed += (wantSpeed - travelSpeed) * (1 - Math.exp(-5 * dt));
  travel += travelSpeed * dt;
  streakMat.uniforms.uTravel.value = travel;
  streakMat.uniforms.uLen.value = 1.5 + travelSpeed * .07;
  cloudSea.material.uniforms.uTravel.value = travel;
  nebula.material.uniforms.uTime.value = gameTime;

  // 航母：簡報時跟小隊一起飛，出擊後慢慢落到後面
  if (carrier.visible) {
    carrierSpeed += ((phase === 'brief' ? travelSpeed : 12) - carrierSpeed) * (1 - Math.exp(-1.2 * dt));
    carrier.position.z += (travelSpeed - carrierSpeed) * dt;
    carrier.position.y = carrier.userData.y + Math.sin(gameTime * .5) * .4;
    const blink = Math.sin(gameTime * 4) > .6 ? 1 : .15;
    for (const n of carrier.userData.nav) n.material.opacity = blink;
    if (carrier.position.z > 320) carrier.visible = false;
  }

  // 兩旁飄過的隕石
  for (const d of decorList) {
    d.obj.position.z += travelSpeed * dt;
    d.obj.rotateOnAxis(d.ax, d.spin * dt);
    if (d.obj.position.z > 40) placeDecor(d, false);
  }

  updatePlayer(dt, fighting);
  updateWingmen(dt, fighting);
  updateBolts(dt);
  updateMissiles(dt);
  updateLaser(dt);
  updateEnemies(dt);
  updateShots(dt);
  updateBoss(dt);
  updateParticles(dt);
  updateRings(dt);
  updateArcs(dt);
  drawBullets(bolts, BOLT_CORE, BOLT_HALO, 0, dt);
  drawBullets(shots, SHOT_CORE, SHOT_HALO, 6, dt);

  // 技能慢慢回復
  if (fighting) {
    skill.missileT += dt;
    if (skill.missiles < missileMax && skill.missileT > missileEvery) { skill.missiles++; skill.missileT = 0; }
    if (skill.missiles >= missileMax) skill.missileT = 0;
    if (skill.laserOn <= 0) skill.laser = Math.min(1, skill.laser + dt / laserTime);
    skill.dashT += dt;
    if (skill.dash < 3 && skill.dashT > 5) { skill.dash++; skill.dashT = 0; }
    if (skill.dash >= 3) skill.dashT = 0;
    if (larch.input.pressed('Digit1') || larch.input.pressed('KeyQ')) useSkill('missile');
    if (larch.input.pressed('Digit2') || larch.input.pressed('KeyE')) useSkill('laser');
    if (larch.input.pressed('Digit3') || larch.input.pressed('ShiftLeft') || larch.input.pressed('ShiftRight')) useSkill('dash');
  }
  if (skill.dashOn > 0) skill.dashOn = Math.max(0, skill.dashOn - dt);
  comboT -= dt;
  if (comboT <= 0) combo = 0;
  invuln = Math.max(0, invuln - dt);
}

// 戰機移動、傾斜、開火
function updatePlayer(dt, fighting) {
  XLIM = camera.aspect < 1 ? 4.2 : 6.2;
  const ax = fighting && alive ? larch.input.axis : { x: 0, y: 0 };
  const dashing = skill.dashOn > 0;
  const maxV = SHIP_SPEED * (dashing ? 1.9 : 1);
  vel.x += (ax.x * maxV - vel.x) * (1 - Math.exp(-9 * dt));
  vel.y += (ax.y * maxV * .75 - vel.y) * (1 - Math.exp(-9 * dt));
  const p = ship.position;
  p.x = clamp(p.x + vel.x * dt, -XLIM, XLIM);
  p.y = clamp(p.y + vel.y * dt, YMIN, YMAX);
  if (Math.abs(p.x) >= XLIM) vel.x *= .5;
  // 轉彎時傾斜機身；衝刺時整台翻一圈
  const roll = -vel.x / SHIP_SPEED * .45;
  if (dashing) shipBank.rotation.z = roll + (1 - skill.dashOn) * TAU;
  else { if (Math.abs(shipBank.rotation.z) > Math.PI) shipBank.rotation.z %= TAU; shipBank.rotation.z += (roll - shipBank.rotation.z) * (1 - Math.exp(-10 * dt)); }
  shipBank.rotation.x = vel.y / SHIP_SPEED * .25;
  shipBank.position.y = Math.sin(gameTime * 2.1) * .06;
  ship.visible = alive && (invuln <= 0 || Math.floor(gameTime * 18) % 2 === 0);

  // 引擎光閃爍＋尾焰帶
  const flick = .85 + Math.random() * .3, boost = dashing ? 1.7 : 1;
  shipBank.updateMatrixWorld(true);
  engines.forEach((en, i) => {
    en.core.scale.setScalar(.6 * flick * boost); en.halo.scale.setScalar(1.9 * flick * boost);
    en.world.copy(en.local); shipBank.localToWorld(en.world);
    updateTrail(shipTrails[i], en.world, travelSpeed * .2, dt);
    shipTrails[i].mat.uniforms.uAlpha.value = alive ? (dashing ? 1.6 : 1) : 0;
    if (alive && Math.random() < .35) emit(en.world.x, en.world.y, en.world.z, rand(-1.5, 1.5), rand(-1.5, 1.5), travelSpeed * rand(.2, .5), rand(.15, .3), rand(.06, .14), 0, COL.ice, 0);
  });

  // 能量環慢慢轉、呼吸
  energyRing.rotation.z += dt * 1.1; energyRing2.rotation.z -= dt * 1.7;
  energyRing.rotation.x = Math.PI / 2 + Math.sin(gameTime * .9) * .08; energyRing2.rotation.y = Math.sin(gameTime * .7) * .12;
  const ringOn = alive ? 1 : 0;
  energyRing.material.opacity = (.2 + Math.sin(gameTime * 3) * .07 + (dashing ? .5 : 0)) * ringOn;
  energyRing2.material.opacity = (.11 + Math.cos(gameTime * 2.3) * .05 + (dashing ? .4 : 0)) * ringOn;
  shield.material.opacity *= Math.exp(-5 * dt);

  // 準星：瞄準前方
  reticle.position.set(p.x + vel.x * .15, p.y + .2, -26);
  reticle.material.opacity = fighting && alive ? .75 : 0;
  reticle.material.rotation += dt * .6;

  // 開火：按住空白鍵或「發射」
  fireT -= dt;
  const firing = fighting && alive && (larch.input.down('Space') || fireHeld);
  if (firing && fireT <= 0) {
    fireT = .1;
    aimFrom(p, _aim);
    for (const sx of [-1, 1]) {
      _from.set(p.x + sx * SHIP_HALF.x * .42, p.y - .05, p.z - SHIP_HALF.z * .6);
      fireBolt(_from, _aim, 150, 1, false);
      emit(_from.x, _from.y, _from.z, 0, 0, 0, .06, .7, .2, COL.cyan, 0);
    }
    if ((shotSound = (shotSound + 1) % 2) === 0) larch.sound('zap', .16);
  }
}
// 瞄準：有鎖定目標而且角度不大，子彈就飛向它（手機上比較好打中）
function aimFrom(from, out) {
  out.set(0, 0, -1);
  const t = lockTarget;
  if (t && (t.isBoss ? boss.on : enemies.includes(t))) {
    _q.copy(t.p).sub(from);
    if (_q.z < -3 && Math.hypot(_q.x, _q.y) < -_q.z * .3) out.copy(_q).normalize();
  }
  return out;
}

// 僚機：跟在兩側，延遲一點點，一起開火
function updateWingmen(dt, fighting) {
  const portrait = camera.aspect < 1;
  for (const w of wingmen) {
    const p = w.root.position;
    const tx = clamp(ship.position.x + w.side * (portrait ? 1.8 : 2.4), -XLIM - 1.2, XLIM + 1.2), ty = ship.position.y + .45 + Math.sin(gameTime * 1.7 + w.side) * .15, tz = 1.2;
    const k = 1 - Math.exp(-5 * dt);
    const nx = p.x + (tx - p.x) * k;
    w.vx = (nx - p.x) / Math.max(dt, 1e-3);
    p.set(nx, p.y + (ty - p.y) * k, p.z + (tz - p.z) * k);
    w.bank.rotation.z = -w.vx * .07 + (skill.dashOn > 0 ? (1 - skill.dashOn) * TAU : 0);
    w.glow.scale.setScalar(.6 * (.85 + Math.random() * .3));
    w.bank.updateMatrixWorld(true);
    w.tail.copy(w.glow.position); w.bank.localToWorld(w.tail);
    updateTrail(w.trail, w.tail, travelSpeed * .2, dt);
    w.trail.mat.uniforms.uAlpha.value = w.root.visible ? .8 : 0;
    w.fireT -= dt;
    if (fighting && alive && w.root.visible && (larch.input.down('Space') || fireHeld) && w.fireT <= 0) {
      w.fireT = .3;
      aimFrom(p, _aim);
      _from.set(p.x, p.y, p.z - 1);
      fireBolt(_from, _aim, 140, .6, true);
    }
  }
}

// 玩家子彈：往前飛，這一格掃過敵人就算打中
function updateBolts(dt) {
  for (const b of bolts.list) {
    if (!b.on) continue;
    const z0 = b.p.z;
    b.p.addScaledVector(b.v, dt);
    b.life -= dt;
    if (b.life <= 0 || b.p.z < -260) { b.on = false; continue; }
    for (const e of enemies) {
      const r = e.r;
      if (e.p.z > z0 + r || e.p.z < b.p.z - r) continue;
      const dx = e.p.x - b.p.x, dy = e.p.y - b.p.y;
      if (dx * dx + dy * dy < r * r) { damageEnemy(e, b.dmg, b.p); b.on = false; break; }
    }
    if (b.on && boss.on && !boss.dying && hitsBoss(b.p, z0)) { damageBoss(b.dmg, b.p); b.on = false; }
  }
}
// 母艦的打擊範圍：一個扁的橢圓（左右寬、上下窄）
function hitsBoss(p, z0) {
  const h = boss.half, c = boss.p;
  if (c.z > z0 + h.z || c.z < p.z - h.z) return false;
  const dx = (p.x - c.x) / (h.x * .92), dy = (p.y - c.y) / Math.max(1.4, h.y);
  return dx * dx + dy * dy < 1;
}

// 追蹤飛彈：先往旁邊彈出去，再轉向目標
function updateMissiles(dt) {
  for (const m of missiles) {
    // 飛彈消失後，尾煙再留一下慢慢淡掉
    if (m.fade > 0) { updateTrail(m.trail, m.p, travelSpeed * .25, dt); m.trail.mat.uniforms.uAlpha.value = m.fade; if (!m.on) m.fade = Math.max(0, m.fade - dt * 3); }
    if (!m.on) continue;
    m.age += dt;
    const t = m.target;
    if (!(t && (t.isBoss ? boss.on && !boss.dying : enemies.includes(t)))) m.target = pickTargets(1)[0] || null;
    const speed = Math.min(90, 22 + m.age * 120);
    if (m.target) _v.copy(m.target.p).sub(m.p).normalize().multiplyScalar(speed);
    else _v.set(0, 0, -speed);
    m.v.lerp(_v, 1 - Math.exp(-(m.age < .25 ? 2 : 9) * dt));
    m.p.addScaledVector(m.v, dt);
    m.m.lookAt(_w.copy(m.p).add(m.v));
    m.puff -= dt;
    if (m.puff <= 0) { m.puff = .03; emit(m.p.x, m.p.y, m.p.z, rand(-1, 1), rand(-1, 1), travelSpeed * .3, .25, .1, .2, COL.gold, 2); }
    const hit = m.target && m.target.p.distanceTo(m.p) < (m.target.isBoss ? 3.2 : m.target.r + .6) ? m.target : null;
    if (hit || m.age > 3.2) {
      if (hit) { if (hit.isBoss) damageBoss(8, m.p); else damageEnemy(hit, 8, m.p); explode(m.p, .7, COL.gold); larch.sound('blast', .5); }
      m.on = false; m.m.visible = false;
    }
  }
}

// 光束雷射：持續一小段時間，碰到的都扣血
function updateLaser(dt) {
  if (skill.laserOn <= 0) { beam.visible = false; return; }
  skill.laserOn -= dt;
  const k = Math.max(0, Math.min(1, skill.laserOn / .3, (2.6 - skill.laserOn) / .15));
  beam.visible = alive;
  beam.position.set(ship.position.x, ship.position.y + .05, ship.position.z - SHIP_HALF.z * .8);
  const w = (.9 + Math.random() * .2) * k;
  beamCore.scale.set(.16 * w, .16 * w, BEAM_LEN);
  beamOuter.scale.set(.55 * w, .55 * w, BEAM_LEN);
  beamOuter.material.opacity = .4 + Math.random() * .25;
  if (Math.random() < .6) { const z = beam.position.z - rand(2, 60); arc(_v.set(beam.position.x, beam.position.y, z), _w.set(beam.position.x + rand(-1.5, 1.5), beam.position.y + rand(-1.2, 1.2), z - rand(2, 6)), .1, .35); }
  emit(beam.position.x, beam.position.y, beam.position.z, rand(-2, 2), rand(-2, 2), rand(-4, 4), .2, .8, 0, COL.ice, 2);
  const dmg = 22 * dt;
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    if (e.p.z > beam.position.z || e.p.z < beam.position.z - BEAM_LEN) continue;
    if (Math.hypot(e.p.x - beam.position.x, e.p.y - beam.position.y) < e.r + .5) {
      _v.set(beam.position.x, beam.position.y, e.p.z + e.r * .5);
      if (Math.random() < .25) burst(_v, 3, 8, .25, .25, COL.ice, 3, 0);
      damageEnemy(e, dmg * 3, _v);
    }
  }
  if (boss.on && !boss.dying && boss.p.z < beam.position.z) {
    _v.set(beam.position.x, beam.position.y, boss.p.z + boss.half.z * .5);
    const dx = (_v.x - boss.p.x) / (boss.half.x * .92), dy = (_v.y - boss.p.y) / Math.max(1.4, boss.half.y);
    if (dx * dx + dy * dy < 1) {
      damageBoss(dmg * 2.2, _v);
      if (Math.random() < .4) burst(_v, 4, 10, .3, .3, COL.ice, 3, 0);
    }
  }
}

// 敵人的行為
function updateEnemies(dt) {
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i], p = e.p;
    e.age += dt;
    if (e.kind === 'saucer') {
      // 衝進來 → 在前方左右飄、開火 → 從旁邊飛走
      const amp = Math.min(1, e.age * .5) * 4;
      if (e.state === 0) { p.z += 60 * dt; if (p.z >= e.hold) { e.state = 1; e.t = 0; } }
      else if (e.state === 1) { e.t += dt; p.z += (e.hold + Math.sin(e.age * 1.3 + e.ph) * 2 - p.z) * dt * 2; if (e.t > e.stay) { e.state = 2; e.vx = (p.x >= ship.position.x ? 1 : -1) * rand(8, 14); } }
      else { p.z += (25 + e.age * 4) * dt; e.x0 += e.vx * dt; p.y += 2 * dt; }
      const nx = e.x0 + Math.sin(e.age * 1.1 + e.ph) * amp;
      e.obj.rotation.z = clamp(-(nx - p.x) / Math.max(dt, 1e-3) * .05, -.7, .7);
      p.x = nx;
      if (e.state < 2) p.y += (e.y0 + Math.cos(e.age * .9 + e.ph) * .8 - p.y) * dt * 2;
      if (e.state === 1) { e.fireT -= dt; if (e.fireT <= 0) { e.fireT = rand(1.4, 2.2); aimedShot(p, 26, .5); } }
    } else if (e.kind === 'bug') {
      // 慢慢逼近，停在遠一點的地方左右移動，三連發
      if (e.state === 0) { p.z += 32 * dt; if (p.z >= e.hold) { e.state = 1; e.t = 0; } }
      else if (e.state === 1) {
        e.t += dt;
        e.fireT -= dt;
        if (e.fireT <= 0) { e.burstLeft = 3; e.fireT = rand(2.2, 3); }
        e.bt -= dt;
        if (e.burstLeft > 0 && e.bt <= 0) { e.bt = .16; e.burstLeft--; for (const sx of [-1, 1]) aimedShot(_v.set(p.x + sx * .5, p.y - .2, p.z + 1.5), 24, .35); larch.sound('zap', .12); }
        if (e.t > e.stay) e.state = 2;
      } else { p.y += 7 * dt; p.z -= 12 * dt; if (p.y > 22) { removeEnemy(e); continue; } }
      const nx = e.x0 + Math.sin(e.age * .55 + e.ph) * 5;
      e.obj.rotation.z = clamp(-(nx - p.x) / Math.max(dt, 1e-3) * .04, -.5, .5);
      p.x = nx;
    } else {
      // 隕石：直直飄過來，一邊翻滾
      p.x += e.vx * dt; p.y += e.vy * dt; p.z += e.vz * dt;
      e.obj.rotation.x += e.spin.x * dt; e.obj.rotation.y += e.spin.y * dt; e.obj.rotation.z += e.spin.z * dt;
    }
    // 被打中時抖一下
    if (e.punch > 0) { e.punch = Math.max(0, e.punch - dt); e.obj.scale.setScalar(e.scale * (1 + e.punch * .8)); }
    // 撞到戰機
    if (alive && Math.abs(p.z - ship.position.z) < e.r + .8) {
      const dx = p.x - ship.position.x, dy = p.y - ship.position.y, rr = e.r + .55;
      if (dx * dx + dy * dy < rr * rr) {
        if (skill.dashOn > 0) { damageEnemy(e, 20, p); continue; }
        hurtPlayer(e.kind === 'rock' ? 700 : 900, p);
        damageEnemy(e, 99, p);
        continue;
      }
    }
    if (p.z > 16) removeEnemy(e);
  }
}
function aimedShot(from, speed, spread = 0) {
  _q.copy(ship.position).sub(from);
  _q.x += rand(-spread, spread); _q.y += rand(-spread, spread);
  fireShot(from, _q, speed);
}

// 敵人子彈
function updateShots(dt) {
  for (const s of shots.list) {
    if (!s.on) continue;
    s.p.addScaledVector(s.v, dt);
    s.life -= dt;
    if (s.life <= 0 || s.p.z > 14) { s.on = false; continue; }
    if (alive && Math.abs(s.p.z - ship.position.z) < .9) {
      const dx = s.p.x - ship.position.x, dy = s.p.y - ship.position.y;
      if (dx * dx + dy * dy < .55) { s.on = false; hurtPlayer(Math.round(rand(320, 420)), s.p); burst(s.p, 10, 8, .3, .25, COL.red, 3, 5); }
    }
  }
}

// ═══════════════════════════ 14. 母艦的行為 ═══════════════════════════
function sway(dt) {
  boss.base.set(Math.sin(boss.t * .35) * (camera.aspect < 1 ? 3 : 6), 4.5 + Math.sin(boss.t * .6) * 1.2, BOSS_Z);
  boss.p.lerp(boss.base, 1 - Math.exp(-1.6 * dt));
}
function updateBoss(dt) {
  if (!boss.on) return;
  const o = boss.obj, p = boss.p;
  boss.t += dt; boss.modeT += dt;
  o.updateMatrixWorld(true);
  if (boss.mode !== 'dying') { o.rotation.z = Math.sin(boss.t * .35) * -.08; o.rotation.x = .12; }
  bossGlow.material.opacity *= Math.exp(-3 * dt);
  const angry = boss.hp / boss.max < .5;

  if (boss.mode === 'enter') {
    p.z += (BOSS_Z - p.z) * (1 - Math.exp(-1.1 * dt));
    p.y += (4.5 - p.y) * (1 - Math.exp(-1.1 * dt));
    if (Math.abs(p.z - BOSS_Z) < 2 && !story.comm) nextBossMode(); // 通訊講完才開打
  } else if (boss.mode === 'idle') {
    sway(dt);
    if (boss.modeT > (angry ? .8 : 1.3)) nextBossMode();
  } else if (boss.mode === 'turret') {
    sway(dt);
    // 砲塔輪流朝戰機開火
    boss.stepT -= dt;
    if (boss.stepT <= 0) {
      boss.stepT = angry ? .13 : .18;
      const i = boss.step++ % bossTurrets.length;
      _from.copy(bossTurrets[i]); o.localToWorld(_from);
      aimedShot(_from, 30, .6);
      emit(_from.x, _from.y, _from.z, 0, 0, 0, .15, 1.6, .3, COL.red, 0);
      if (boss.step % 2) larch.sound('zap', .15);
    }
    if (boss.modeT > 2.8) setBossMode('idle');
  } else if (boss.mode === 'fan') {
    sway(dt);
    // 扇形彈幕：三波
    boss.stepT -= dt;
    if (boss.stepT <= 0 && boss.step < 3) {
      boss.stepT = .5; boss.step++;
      _from.set(p.x, p.y - .3, p.z + boss.half.z);
      _q.copy(ship.position).sub(_from).normalize();
      const base = Math.atan2(_q.x, _q.z), n = angry ? 11 : 9;
      for (let i = 0; i < n; i++) {
        const a = base + (i / (n - 1) - .5) * 1.1 + (boss.step % 2 ? .05 : -.05);
        fireShot(_from, _v.set(Math.sin(a), _q.y, Math.cos(a)), 24);
      }
      larch.sound('blast', .35);
      ring(_from, 3, COL.red, .35, true, 0);
    }
    if (boss.modeT > 2.2) setBossMode('idle');
  } else if (boss.mode === 'spiral') {
    sway(dt);
    // 旋轉的環狀彈幕：一圈一圈往外擴，像一條隧道
    boss.stepT -= dt;
    if (boss.stepT <= 0 && boss.step < 7) {
      boss.stepT = .32; boss.step++;
      _from.set(p.x, p.y, p.z + boss.half.z);
      const n = 12, off = boss.step * .22;
      for (let i = 0; i < n; i++) { const a = off + i / n * TAU; fireShot(_from, _v.set(Math.cos(a) * .3, Math.sin(a) * .22, 1), 22); }
      larch.sound('zap', .25);
    }
    if (boss.modeT > 2.8) setBossMode('idle');
  } else if (boss.mode === 'drones') {
    sway(dt);
    if (boss.step === 0) {
      boss.step = 1;
      for (const sx of [-1, 1]) for (let i = 0; i < 2; i++) spawnEnemy('saucer', p.x + sx * boss.half.x * .8, p.y + i * 1.2 - .6, p.z + 2, { hold: rand(-34, -24), stay: rand(3, 5), isWave: false, x0: p.x + sx * (3 + i * 2.5) });
      larch.sound('whoosh', .5);
      popNumber('增援出動', p, 'info');
    }
    if (boss.modeT > 1.6) setBossMode('idle');
  } else if (boss.mode === 'charge') {
    // 衝撞：先集氣（紅光、粒子往中間吸），再往戰機的位置直衝過來
    if (boss.step === 0) {
      sway(dt);
      boss.ram.copy(ship.position);
      bossGlow.scale.setScalar(4 + boss.modeT * 7);
      bossGlow.material.opacity = .4 + boss.modeT * .5;
      if (Math.random() < .7) { const a = Math.random() * TAU; emit(p.x + Math.cos(a) * 9, p.y + Math.sin(a) * 4, p.z, -Math.cos(a) * 14, -Math.sin(a) * 6, 0, .6, .5, .1, COL.red, 0); }
      if (Math.random() < .3) arc(p, _v.set(p.x + rand(-6, 6), p.y + rand(-2, 2), p.z + rand(-1, 1)), .12, .6, 0xff5a7a);
      if (boss.modeT > 1.5) { boss.step = 1; boss.modeT = 0; boss.rammed = false; boss.from = p.clone(); larch.sound('roar', .7); larch.shake(.4, .5); }
    } else if (boss.step === 1) {
      const k = Math.min(1, boss.modeT / .85), e = k * k;
      p.set(boss.from.x + (boss.ram.x - boss.from.x) * e, boss.from.y + (boss.ram.y - boss.from.y) * e, boss.from.z + (3 - boss.from.z) * e);
      bossGlow.material.opacity = 1;
      if (Math.random() < .5) arc(p, _v.set(p.x + rand(-6, 6), p.y + rand(-2, 2), p.z + rand(-1, 1)), .1, .6, 0xff5a7a);
      if (!boss.rammed && Math.abs(p.z - ship.position.z) < boss.half.z + .8) {
        const dx = (ship.position.x - p.x) / (boss.half.x * .55), dy = (ship.position.y - p.y) / Math.max(1.2, boss.half.y * .8);
        if (dx * dx + dy * dy < 1) { boss.rammed = true; hurtPlayer(1200, ship.position); }
      }
      if (k >= 1) { boss.step = 2; boss.modeT = 0; }
    } else {
      p.lerp(_v.set(boss.base.x, boss.base.y, BOSS_Z), 1 - Math.exp(-2.2 * dt));
      if (boss.modeT > 1.6) setBossMode('idle');
    }
  } else if (boss.mode === 'dying') {
    // 被擊沉：機身到處爆炸，最後一個大爆炸
    boss.dying -= dt;
    p.y -= dt * 1.2; o.rotation.z += dt * .15;
    if (Math.random() < dt * 9) {
      _v.set(p.x + rand(-1, 1) * boss.half.x, p.y + rand(-1, 1) * boss.half.y, p.z + rand(-1, 1) * boss.half.z);
      explode(_v, rand(.8, 1.6));
      larch.sound('explosion', .5);
      larch.shake(.35, .25);
    }
    if (boss.dying <= 0) {
      explode(p, 4, COL.orange); explode(p, 3, COL.cyan);
      for (let i = 0; i < 4; i++) ring(p, 14 + i * 6, i % 2 ? COL.cyan : COL.gold, .8 + i * .2, true, 6);
      larch.effect('magic-burst', p, { scale: 4 });
      larch.sound('explosion', 1); larch.sound('thunder', .8);
      larch.shake(1.4, 1.2);
      flashEl(ui.flash, .85, 900);
      boss.on = false; o.visible = false;
      addScore(8000);
    }
  }
}
const BOSS_ORDER = ['turret', 'fan', 'charge', 'spiral', 'turret', 'drones', 'fan', 'charge'];
function nextBossMode() {
  let next = BOSS_ORDER[boss.pattern++ % BOSS_ORDER.length];
  if (next === 'drones' && boss.hp / boss.max > .7) next = 'spiral';
  setBossMode(next);
}
function setBossMode(m) {
  boss.mode = m; boss.modeT = 0; boss.step = 0; boss.stepT = 0;
  if (m === 'charge') { banner('⚠ 衝撞警告', '往旁邊閃開！', true, 1.4); larch.sound('error', .5); }
}

// ═══════════════════════════ 15. 鏡頭 ═══════════════════════════
// 簡報的分鏡：誰在講話就換一個角度（a：0＝機尾正後方、π＝機頭正前方；r 距離；h 高度）
const SHOTS = {
  wide: { a: 2.25, r: 15, h: 3.6, focus: 'squad' },      // 小隊＋後面的航母
  fleet: { a: 1.9, r: 18, h: 6, focus: 'squad' },        // 從右邊遠一點看小隊與後面的航母
  ship: { a: 3.75, r: 6.4, h: .9, focus: 'ship' },       // 戰機特寫
  cockpit: { a: 2.6, r: 4.6, h: 1.8, focus: 'nose' },    // 座艙
  wing: { a: 1.75, r: 5.6, h: 1.1, focus: 'wing' },      // 右邊的僚機
  high: { a: 2.75, r: 11, h: 7, focus: 'squad' },        // 從前上方看整個編隊
  launch: { a: 2.95, r: 8.5, h: 3.4, focus: 'squad' },   // 出擊前：前上方，接著鏡頭從小隊上面飛過、繞到機尾
};
const UP = new V3(0, 1, 0), _cf = new V3(), _cr = new V3(), _cp = new V3();
function shot(name, side, snap = false) {
  const s = SHOTS[name] || SHOTS.wide;
  Object.assign(cine, { ta: s.a, tr: s.r, th: s.h, tside: side, focus: s.focus });
  if (snap || !cine.ready) { Object.assign(cine, { a: s.a, r: s.r, h: s.h, side, ready: false }); }
}
function focusPoint(name, out) {
  const p = ship.position;
  if (name === 'ship') return out.set(p.x, p.y + .25, p.z - .4);
  if (name === 'nose') return out.set(p.x, p.y + .35, p.z - SHIP_HALF.z * .55);
  if (name === 'wing') return out.copy(wingmen[1].root.position).add(_cp.set(-.4, .1, 0));
  if (name === 'carrier') return out.set(p.x - 9, p.y - 3, p.z + 8);
  return out.set(p.x, p.y + .2, p.z + .6);
}
function aimCine(dt, portrait) {
  const k = cine.ready ? 1 - Math.exp(-1.4 * dt) : 1;
  cine.t += dt;
  cine.a += (cine.ta - cine.a) * k; cine.r += (cine.tr - cine.r) * k; cine.h += (cine.th - cine.h) * k; cine.side += (cine.tside - cine.side) * k;
  focusPoint(cine.focus, _cp);
  if (cine.ready) cine.look.lerp(_cp, k); else cine.look.copy(_cp);
  const a = cine.a + Math.sin(cine.t * .13) * .22;           // 慢慢來回擺，不會停住
  const r = cine.r * (portrait ? 1.5 : 1);
  introPos.set(cine.look.x + Math.sin(a) * r, cine.look.y + cine.h + Math.sin(cine.t * .21) * .3, cine.look.z + Math.cos(a) * r);
  // 主角放在畫面上半部、偏到立繪的另一邊（對話框在下面、立繪在左或右）
  _cf.subVectors(cine.look, introPos).normalize();
  _cr.crossVectors(_cf, UP).normalize();
  introLook.copy(cine.look).addScaledVector(_cr, -cine.side * r * (portrait ? .05 : .2));
  introLook.y -= r * (portrait ? .2 : .13);
  if (!cine.ready) {
    camera.position.copy(introPos);
    if (carrier.userData.place) {
      // 航母放在這個鏡頭的右上方、很遠的地方（不會被左邊的立繪擋住，也不會像停在小隊腳下）
      carrier.userData.place = false;
      camera.lookAt(introLook); camera.updateMatrixWorld(); camera.updateProjectionMatrix();
      _cp.set(portrait ? .1 : .36, portrait ? .42 : .44, .5).unproject(camera).sub(camera.position).normalize();
      carrier.position.copy(camera.position).addScaledVector(_cp, portrait ? 300 : 250);
      carrier.userData.y = carrier.position.y;
    }
    cine.ready = true;
  }
}
// 出擊時的鏡頭：從簡報最後一個角度沿著小隊右側繞到機尾（小隊一直在畫面裡）
const launchCam = { on: false, a: 0, r: 0, h: 0 };
function updateCamera(dt) {
  const p = ship.position, portrait = camera.aspect < 1;
  if (phase === 'brief') aimCine(dt, portrait);
  else if (phase === 'intro' && launchCam.on) {
    const k = camMix * camMix * (3 - 2 * camMix), a = launchCam.a * (1 - k);
    const r = larch.lerp(launchCam.r, portrait ? 10.8 : 8.6, k), h = larch.lerp(launchCam.h, 2.6, k);
    introPos.set(p.x + Math.sin(a) * r, p.y + h, p.z + Math.cos(a) * r);
  }
  // 追尾鏡頭：在戰機後上方，稍微跟著左右
  camPos.set(p.x * (portrait ? .8 : .62), 2.6 + p.y * .55, portrait ? 10.8 : 8.6);
  camLook.set(p.x * (portrait ? .88 : .75), .55 + p.y * .7, -20);
  // 開場鏡頭：從戰機側前方繞到後面
  const k = camMix * camMix * (3 - 2 * camMix);
  _v.lerpVectors(introPos, camPos, k); _w.lerpVectors(introLook, camLook, k);
  if (dt > 0) camera.position.lerp(_v, 1 - Math.exp(-10 * dt));
  camera.lookAt(_w);
  camera.rotateZ(-vel.x * .012);
  const fov = (portrait ? 50 + (1 - camera.aspect) * 38 : 52) + (skill.dashOn > 0 ? 12 : 0) - (phase === 'brief' ? 8 : 0);
  if (Math.abs(camera.fov - fov) > .01) { camera.fov += (fov - camera.fov) * (dt > 0 ? 1 - Math.exp(-6 * dt) : 1); camera.updateProjectionMatrix(); }
  camera.updateMatrixWorld();
}

// ═══════════════════════════ 16. 每一格畫介面 ═══════════════════════════
const last = {};
const pad = (n, w) => String(Math.max(0, Math.floor(n))).padStart(w, '0');
function setText(key, el, text) { if (last[key] !== text) { last[key] = text; el.textContent = text; } }
function setClass(el, name, on) { if (el.classList.contains(name) !== on) el.classList.toggle(name, on); }
function drawHud() {
  setText('time', ui.time, \`\${pad(playTime / 60, 2)}:\${pad(playTime % 60, 2)}\`);
  setText('hp', ui.hp, \`\${Math.ceil(hp)} / \${maxHp}\`);
  const hpv = \`\${(hp / maxHp * 100).toFixed(1)}%\`;
  if (last.hpv !== hpv) { last.hpv = hpv; ui.hpbar.style.setProperty('--v', hpv); setClass(ui.hpbox, 'low', hp / maxHp < .3); }
  setText('score', ui.score, pad(Math.min(score, 9999999), 7));
  if (combo >= 2) setText('combo', ui.combo, \`連擊 ×\${combo}\`);
  setClass(ui.combo, 'on', combo >= 2);
  // 技能面板
  const ms = skillEls.missile, ls = skillEls.laser, ds = skillEls.dash;
  ms.pips.forEach((pip, i) => setClass(pip, 'on', i < skill.missiles));
  setText('mct', ms.ct, \`×\${skill.missiles}\`);
  setClass(ms.el, 'ready', skill.missiles > 0); setClass(ms.el, 'empty', skill.missiles <= 0);
  const lc = skill.laserOn > 0 ? skill.laserOn / 2.6 : skill.laser;
  ls.pips.forEach((pip, i) => setClass(pip, 'on', i < Math.floor(lc * 5 + 1e-4)));
  setText('lct', ls.ct, skill.laserOn > 0 ? 'FIRE' : skill.laser >= 1 ? 'READY' : \`\${Math.floor(skill.laser * 100)}%\`);
  setClass(ls.el, 'ready', skill.laser >= 1 && skill.laserOn <= 0); setClass(ls.el, 'active', skill.laserOn > 0); setClass(ls.el, 'empty', skill.laser < 1 && skill.laserOn <= 0);
  ds.pips.forEach((pip, i) => setClass(pip, 'on', i < skill.dash));
  setText('dct', ds.ct, \`×\${skill.dash}\`);
  setClass(ds.el, 'ready', skill.dash > 0); setClass(ds.el, 'active', skill.dashOn > 0); setClass(ds.el, 'empty', skill.dash <= 0);
  // 母艦血條
  setClass(ui.boss, 'on', boss.on && boss.mode !== 'enter');
  if (boss.on) { setText('bosshp', ui.bosshp, \`\${Math.ceil(boss.hp * 100)} / \${boss.max * 100}\`); ui.bossbar.style.setProperty('--v', \`\${(boss.hp / boss.max * 100).toFixed(1)}%\`); }
  drawLock();
  drawRadar();
}

// 鎖定框：離準星最近的敵人
function drawLock() {
  if (!paused) {
    let best = null, bestD = .5;
    if ((phase === 'play' || phase === 'boss') && alive) {
      _q.copy(reticle.position).project(camera);
      const rx = _q.x * camera.aspect, ry = _q.y;
      const consider = (t) => {
        if (t.p.z > -5) return;
        _v.copy(t.p).project(camera);
        if (_v.z > 1) return;
        const d = Math.hypot(_v.x * camera.aspect - rx, _v.y - ry) - (t === lockTarget ? .08 : 0) + (-t.p.z) * .0006;
        if (d < bestD) { bestD = d; best = t; }
      };
      for (const e of enemies) consider(e);
      if (boss.on && !boss.dying && boss.mode !== 'enter') consider(boss);
    }
    lockTarget = best;
  }
  const t = lockTarget;
  setClass(ui.lock, 'on', Boolean(t));
  if (!t) return;
  const s = toScreen(t.p);
  const dist = camera.position.distanceTo(t.p);
  const r = t.isBoss ? boss.half.x * .55 : t.r;
  const size = clamp(r / dist * VH * 1.6, 34, 280);
  ui.lock.style.width = ui.lock.style.height = \`\${size}px\`;
  ui.lock.style.transform = \`translate(\${s.x - size / 2}px,\${s.y - size / 2}px)\`;
  setClass(ui.lock, 'flip', s.x + size / 2 + 150 > VW);
  setText('lockname', ui.lockname, t.name);
  setText('locklv', ui.locklv, \`Lv.\${t.isBoss ? boss.lv : t.lv} ・ \${Math.round(dist * 10)}m\`);
  ui.lockhp.style.setProperty('--v', \`\${clamp(t.hp / t.max, 0, 1) * 100}%\`);
}

// 雷達：以戰機為中心，上面是前方
function drawRadar() {
  const S = ui.radar.width, R = S / 2, g = radarCtx;
  g.clearRect(0, 0, S, S);
  g.save(); g.translate(R, R);
  g.strokeStyle = 'rgba(110,220,255,.3)'; g.lineWidth = DPR;
  for (const k of [.36, .68, .96]) { g.beginPath(); g.arc(0, 0, R * k, 0, TAU); g.stroke(); }
  g.beginPath(); g.moveTo(-R, 0); g.lineTo(R, 0); g.moveTo(0, -R); g.lineTo(0, R); g.stroke();
  const a = (gameTime * 2.4) % TAU;
  g.fillStyle = 'rgba(70,210,255,.16)';
  g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, R * .96, a - .7, a); g.closePath(); g.fill();
  const blip = (x, z, size, color) => {
    let bx = (x - ship.position.x) / 40, by = z / 180;
    const len = Math.hypot(bx, by);
    if (len > .92) { bx *= .92 / len; by *= .92 / len; }
    g.fillStyle = color; g.shadowColor = color; g.shadowBlur = 6 * DPR;
    g.beginPath(); g.arc(bx * R, by * R, size * DPR, 0, TAU); g.fill();
  };
  for (const e of enemies) blip(e.p.x, e.p.z, e.kind === 'bug' ? 3.4 : 2.4, e.kind === 'rock' ? '#c8b89a' : '#ff5a78');
  if (boss.on) blip(boss.p.x, boss.p.z, 6, '#ff3fae');
  for (const w of wingmen) if (w.root.visible) blip(w.root.position.x, w.root.position.z, 2, '#9fefff');
  g.shadowBlur = 0;
  g.fillStyle = '#e8fbff';
  g.beginPath(); g.moveTo(0, -5 * DPR); g.lineTo(4 * DPR, 4 * DPR); g.lineTo(-4 * DPR, 4 * DPR); g.closePath(); g.fill();
  g.restore();
}

// ═══════════════════════════ 17. 關卡流程 ═══════════════════════════
function waveTip(w) { return ['攔截機編隊來襲', '小心重裝砲艇的三連發', '隕石群接近中', '敵方增援', '最後防線'][Math.min(4, w - 1)]; }
// 一組敵人：V 字編隊、橫排、砲艇
function spawnGroup(type, w) {
  const spread = camera.aspect < 1 ? .6 : 1;
  if (type === 'vee') {
    const cx = rand(-3, 3) * spread;
    for (let i = 0; i < 5; i++) { const o = i - 2; spawnEnemy('saucer', cx + o * 2.4 * spread, 1 + Math.abs(o) * .6, -190 - Math.abs(o) * 10, { x0: cx + o * 2.4 * spread, y0: 1 + Math.abs(o) * .4, hold: -25 - Math.abs(o) * 2.5, stay: rand(3, 5) }); }
  } else if (type === 'line') {
    const side = Math.random() < .5 ? -1 : 1;
    for (let i = 0; i < 4; i++) { const y = rand(-.5, 2.5); spawnEnemy('saucer', side * (2 + i * 2.2) * spread, y, -200 - i * 14, { x0: side * (2 + i * 1.6) * spread, y0: y, hold: rand(-32, -22), stay: rand(2.5, 4.5) }); }
  } else if (type === 'bug') {
    const x = rand(-4, 4) * spread;
    spawnEnemy('bug', x, rand(.5, 3), -210, { x0: x, hold: rand(-38, -32), stay: 8 + w * .5, fireT: 1 });
  }
}
function spawnRock() {
  const tx = ship.position.x + rand(-3, 3), ty = ship.position.y + rand(-1.5, 1.5);
  const x = rand(-12, 12) * (camera.aspect < 1 ? .6 : 1), y = rand(-3, 6), z = -200;
  const time = 200 / rand(34, 44);
  spawnEnemy('rock', x, y, z, { vx: (tx - x) / time, vy: (ty - y) / time, vz: 200 / time });
}
async function runWave(w) {
  const groups = [];
  for (let i = 0; i < 2 + w; i++) groups.push(w >= 2 && i % 3 === 2 ? 'bug' : i % 2 ? 'line' : 'vee');
  if (w >= 3) groups.push('bug');
  let rockT = 1, gi = 0, gapT = 0;
  const done = until(() => !alive || skip || (gi >= groups.length && !enemies.some((e) => e.isWave)));
  const stopSpawning = larch.onUpdate((dt) => {
    if (paused || !alive) return;
    rockT -= dt;
    if (rockT <= 0) { rockT = rand(1.1, 2.2) / (1 + w * .08); spawnRock(); }
    gapT -= dt;
    if (gi < groups.length && gapT <= 0) { spawnGroup(groups[gi++], w); gapT = Math.max(2.4, 4.6 - w * .3); }
  });
  await done;
  stopSpawning();
}
async function bossFight() {
  phase = 'boss';
  larch.sound('roar', .8);
  await banner('WARNING', '巨大母艦接近中', true, 2.6);
  boss.on = true; boss.dying = 0; boss.t = 0; boss.pattern = 0; boss.acc = 0;
  boss.max = 600 + WAVES * 40; boss.hp = boss.max; boss.lv = 10 + WAVES * 2;
  boss.obj.visible = true; boss.p.set(0, 12, -360); boss.obj.rotation.set(.12, 0, 0);
  setBossMode('enter');
  comm(BOSS_COMM); // 不用等：遊戲照常進行，母艦等通訊講完才開火
  await until(() => !alive || !boss.on);
}

// ═══════════════════════════ 18. 劇情 ═══════════════════════════
// 世界觀：「蝕月艦隊」是一支會吃掉恆星的機械艦隊，吸乾一顆太陽就往下一顆前進，整支艦隊聽新月形的迴旋母艦指揮。
// 曙光艦隊的航母「曙光號」守在天琴星門外，四萬名撤離民正排隊跳躍離開；玩家是金隼小隊的王牌雷恩，搭檔是座艙 AI 艾可。
// 每一句：[誰, 鏡頭, 台詞]
const BRIEFING = [
  ['captain', 'wide', '金隼小隊，簡報開始。三小時前，蝕月艦隊吞掉了賽芙拉星系的太陽。'],
  ['captain', 'fleet', '它們靠吸乾恆星前進，下一站就是我們身後的天琴星門──四萬名撤離民還在排隊跳躍。'],
  ['pilot', 'ship', '所以要我們守門，守到最後一艘船跳走？'],
  ['captain', 'high', '守住，然後擊沉它們的迴旋母艦。整支艦隊都聽它指揮，打掉它，剩下的就是一堆廢鐵。'],
  ['ai', 'cockpit', '補充一下：雷恩上次說「小事一樁」，回來的時候左翼少了一半。'],
  ['pilot', 'wing', '那叫輕量化改裝。'],
  ['captain', 'wide', '艾可，把剩下的能源分給金隼。雷恩──活著回來，這是命令。'],
];
// 出擊前的選擇：能源只夠強化一個系統（選了什麼，HUD 的 HP 下面會有金色標籤、強化的技能加金邊）
const LOADOUTS = [
  { id: 'missile', label: '追蹤飛彈加倍（10 發）', hud: '飛彈艙擴充 ×10', line: '飛彈艙擴充完成，十發追蹤飛彈，裝填也更快。別一次全丟光，我會心疼。' },
  { id: 'laser', label: '雷射快充（充能 ×2）', hud: '雷射超頻 ×2', line: '雷射迴路超頻，充能快一倍，一出擊就能發射。燒得漂亮一點。' },
  { id: 'shield', label: '護盾強化（耐久 +40%）', hud: '護盾強化 +40%', line: '護盾輸出拉到最高，耐久多四成、受到的傷害少兩成。……這次機翼要完整帶回來喔。' },
];
const BOSS_COMM = [
  ['ai', '偵測到超大型反應──迴旋母艦現身！它正在吸附近的星光充能！'],
  ['captain', '撤離船隊只差最後一批。金隼，把它打下來！'],
  ['pilot', '收到。艾可，火控全開！'],
];
const WIN_LINES = [
  ['captain', '母艦訊號消失，最後一艘撤離船也跳走了。金隼，歡迎回家。'],
  ['ai', () => (hp / maxHp > .6 ? '機翼完整度百分之百。我要把今天存成紀念日。' : '機身到處是洞……不過機翼都還在！我要把今天存成紀念日。')],
];
const LOSE_LINES = [
  ['ai', '機體受損過重，緊急彈射成功……雷恩，我抓住你了。下一次一定行。'],
];

// 用 Larch 的對話框說一句（有立繪就站在自己的位置：艦長、雷恩在左，艾可在右）
function sayAs(who, text) {
  const c = CAST[who];
  return larch.say({ speaker: c.name, text, image: c.img || undefined, place: { x: c.x } });
}
// 對話框的「下一句」：跟按 Enter 一樣（打字中先整句顯示，再按一次換下一句）
function advanceTalk() {
  for (const type of ['keydown', 'keyup']) dispatchEvent(new KeyboardEvent(type, { code: 'Enter', key: 'Enter' }));
}
// 跳過劇情：把這一句收掉，直接到選強化
function skipStory() {
  if (phase !== 'brief' || story.skip || story.choosing) return;
  story.skip = true;
  advanceTalk(); advanceTalk();
}
ui.skip.addEventListener('click', skipStory);
// 打開對話框前，等玩家放開空白鍵（按住射擊時，鍵盤連發會一口氣把台詞翻完）
function keysUp(maxSecs) {
  const at = gameTime + maxSecs;
  return until(() => (!larch.input.down('Space') && !larch.input.down('Enter') && !fireHeld) || gameTime >= at);
}

async function briefing() {
  for (const [who, cam, text] of BRIEFING) {
    if (story.skip) return;
    shot(cam, who === 'ai' ? -1 : 1);
    await sayAs(who, text);
  }
}
function setPips(key, n) {
  const s = skillEls[key], box = s.el.querySelector('.ss-pips');
  if (s.pips.length === n) return;
  box.innerHTML = '<i></i>'.repeat(n);
  s.pips = [...box.children];
}
// 套用強化：數值、HUD 標籤、技能面板
function applyLoadout(id) {
  loadout = LOADOUTS.find((l) => l.id === id) || null;
  const k = loadout ? loadout.id : '';
  missileMax = k === 'missile' ? 10 : 6; missileEvery = k === 'missile' ? 2.8 : 4;
  laserTime = k === 'laser' ? 8 : 16;
  maxHp = k === 'shield' ? Math.round(MAX_HP * 1.4) : MAX_HP; armor = k === 'shield' ? .8 : 1;
  hp = maxHp;
  skill.missiles = missileMax;
  skill.laser = k === 'laser' ? 1 : .4;
  setPips('missile', missileMax);
  setClass(skillEls.missile.el, 'boost', k === 'missile');
  setClass(skillEls.laser.el, 'boost', k === 'laser');
  setClass(ui.hpbox, 'armored', k === 'shield');
  ui.load.textContent = loadout ? \`強化・\${loadout.hud}\` : '';
}
async function chooseLoadout() {
  story.choosing = true;
  setClass(hud, 'choosing', true);
  shot('cockpit', -1);
  if (CAST.ai.img) {
    ui.poseimg.src = CAST.ai.img; ui.poseimg.alt = CAST.ai.name;
    ui.poseimg.onerror = () => setClass(ui.pose, 'on', false);
    ui.poseimg.style.setProperty('--s', String((larch.ui.root.clientWidth || innerWidth) < 640 ? .62 : .86));
    setClass(ui.pose, 'on', true);
  }
  const i = await larch.choose('艾可：能源只夠強化一個系統，要分給哪裡？', LOADOUTS.map((l) => l.label));
  story.choosing = false;
  setClass(hud, 'choosing', false);
  setClass(ui.pose, 'on', false);
  applyLoadout((LOADOUTS[i] || LOADOUTS[0]).id);
  larch.sound('levelup', .45);
  if (!story.skip) await sayAs('ai', loadout.line);
  if (!story.skip) { shot('launch', 1); await sayAs('pilot', '金隼一號，出擊！'); }
}
// 出擊：收掉黑邊、整隊翻滾加速，鏡頭從簡報的角度繞回追尾鏡頭
function launch() {
  setClass(hud, 'cine', false);
  const portrait = camera.aspect < 1;
  Object.assign(launchCam, { on: true, a: cine.a + Math.sin(cine.t * .13) * .22, r: cine.r * (portrait ? 1.5 : 1), h: cine.h });
  skill.dashOn = 1;
  larch.sound('whoosh', .9); larch.sound('magicburst', .35);
  for (let i = 0; i < 3; i++) ring(ship.position, 3 + i * 1.4, COL.cyan, .45 + i * .12, false, 30 + i * 10);
  flashEl(ui.flash, .3, 450);
  ui.load.classList.remove('pop'); void ui.load.offsetWidth; ui.load.classList.add('pop');
}
// 戰鬥中的通訊：左下（手機在上面）一個小視窗，一句一句自己換，遊戲照常進行
let roundId = 0;
async function comm(lines) {
  const round = roundId;
  story.comm = true;
  for (const [who, text] of lines) {
    if (round !== roundId || !alive) break;
    const c = CAST[who];
    ui.commwho.textContent = c.name;
    ui.commtext.textContent = text;
    ui.facemark.textContent = c.mark;
    ui.faceimg.hidden = !c.img;
    if (c.img) {
      ui.faceimg.onerror = () => { ui.faceimg.hidden = true; setClass(ui.face, 'has-img', false); };
      if (ui.faceimg.getAttribute('src') !== c.img) ui.faceimg.src = c.img;
      ui.faceimg.style.setProperty('--fx', \`\${c.face[0]}%\`); ui.faceimg.style.setProperty('--fy', \`\${c.face[1]}%\`);
    }
    setClass(ui.face, 'has-img', Boolean(c.img));
    setClass(ui.comm, 'warn', who === 'ai' && lines[0][1] === text);
    ui.comm.classList.add('on');
    larch.sound('talk', .5);
    await gwait(clamp(text.length * .1, 2.4, 3.6));
  }
  if (round === roundId) { ui.comm.classList.remove('on'); story.comm = false; }
}

// ═══════════════════════════ 19. 一回合 ═══════════════════════════
const INTRO_POS = introPos.clone(), INTRO_LOOK = introLook.clone();
function resetRound() {
  roundId++;
  for (const e of [...enemies]) removeEnemy(e);
  for (const b of bolts.list) b.on = false;
  for (const s of shots.list) s.on = false;
  for (const m of missiles) { m.on = false; m.m.visible = false; }
  for (const p of parts) p.on = false;
  boss.on = false; boss.obj.visible = false; boss.dying = 0;
  score = 0; kills = 0; wave = 0; combo = 0; bestCombo = 0; playTime = 0;
  alive = true; invuln = 0; fireHeld = false;
  Object.assign(skill, { missiles: 6, missileT: 0, laser: .4, laserOn: 0, dash: 3, dashT: 0, dashOn: 0 });
  applyLoadout(loadout ? loadout.id : null); // 沿用上一次選的強化（hp、飛彈數也在這裡補滿）
  ship.position.set(0, 0, 0); ship.visible = true; vel.set(0, 0);
  for (const w of wingmen) { w.root.visible = true; w.root.position.set(w.side * 2.6, .45, 1.2); }
  for (const tr of [...shipTrails, ...wingmen.map((w) => w.trail)]) for (const p of tr.pts) p.copy(ship.position);
  lockTarget = null;
  introPos.copy(INTRO_POS); introLook.copy(INTRO_LOOK); cine.ready = false; launchCam.on = false;
  carrier.visible = false;
  story.comm = false; story.skip = false; story.choosing = false;
  ui.comm.classList.remove('on');
}

// mode：'story'＝完整簡報、'pick'＝只重選強化、'again'＝直接出擊
async function playRound(mode) {
  resetRound();
  const cinematic = mode === 'story' || mode === 'pick';
  if (cinematic) {
    phase = 'brief';
    camMix = 0; // 鏡頭交給簡報的分鏡
    showControls(false);
    carrier.visible = true; carrier.userData.place = true; carrierSpeed = travelSpeed;
    setClass(hud, 'cine', true);
    if (mode === 'story') {
      shot('wide', 1, true);
      await Promise.race([portraitsReady, gwait(5)]);
      await gwait(1.4);
      await briefing();
    } else shot('cockpit', -1, true);
    await chooseLoadout();
    story.seen = true;
    launch();
  }
  phase = 'intro';
  // 開場：鏡頭從簡報的角度（或戰機側前方）繞到後面
  camMix = cinematic ? 0 : .6;
  const swoop = larch.onUpdate((dt) => { if (!paused) camMix = Math.min(1, camMix + dt / 2.6); });
  if (mode === 'story') await larch.ui.banner('星際突擊', PHONE ? '左下搖桿移動・按住「發射」射擊・點右邊的技能' : '方向鍵／WASD 移動・空白鍵射擊・1 2 3 放技能');
  await until(() => camMix >= 1);
  swoop();
  phase = 'play';
  showControls(true);
  for (let w = 1; w <= WAVES && alive && !skip; w++) {
    wave = w;
    await banner(\`WAVE \${w}\`, \`第 \${w} 波・\${waveTip(w)}\`, false, 2);
    await runWave(w);
    if (alive && w < WAVES) { larch.sound('levelup', .5); await gwait(.8); }
  }
  skip = false;
  if (alive) await bossFight();
  const win = alive;
  phase = 'over';
  fireHeld = false;
  ui.comm.classList.remove('on');
  await gwait(win ? 1.4 : 1.8);
  if (win) addScore(Math.round(hp) + Math.max(0, 600 - playTime) * 10);
  showControls(false);
  // 結尾的一兩句
  await keysUp(5);
  for (const [who, text] of win ? WIN_LINES : LOSE_LINES) await sayAs(who, typeof text === 'function' ? text() : text);
  // 結算畫面
  setClass(ui.resultcard, 'lose', !win);
  ui.rtitle.textContent = win ? 'MISSION COMPLETE' : 'MISSION FAILED';
  ui.rsub.textContent = win ? '母艦已擊沉，天琴星門守住了！' : '機體損毀……再試一次吧';
  ui.rstats.innerHTML = '';
  for (const [k, v] of [['分數', pad(score, 7)], ['擊墜', String(kills)], ['最高連擊', String(bestCombo)], ['時間', \`\${pad(playTime / 60, 2)}:\${pad(playTime % 60, 2)}\`], ['強化', loadout ? loadout.hud : '—'], ['到達', win ? '母艦戰・勝利' : boss.on ? '母艦戰' : \`第 \${Math.max(1, wave)} 波\`]]) {
    const dt = document.createElement('dt'); dt.textContent = k;
    const dd = document.createElement('dd'); dd.textContent = v;
    ui.rstats.append(dt, dd);
  }
  ui.result.classList.add('on');
  larch.sound(win ? 'levelup' : 'error', .7);
  await gwait(.9); // 先看一下結算，連按 Enter 翻台詞時才不會直接按到「再玩一次」
  return win;
}

// 測試用：作者試玩時，主控台可以用 window.__starStrike 看狀態、跳關
if (larch.testPlay) window.__starStrike = { get state() { return { phase, wave, hp, maxHp, score, kills, enemies: enemies.length, boss: boss.on ? Math.round(boss.hp) : null, bossMode: boss.mode, paused, alive, camMix, loadout: loadout && loadout.id, missiles: skill.missiles, missileMax, laser: skill.laser, story: { ...story }, carrier: carrier.visible, portraits: Object.fromEntries(Object.entries(CAST).map(([k, c]) => [k, c.img])) }; }, shot: (n, side) => shot(n, side, true), skipWaves() { skip = true; for (const e of [...enemies]) removeEnemy(e); }, skipStory, useSkill, hurt: (n) => hurtPlayer(n), pause: setPaused, killBoss() { if (boss.on) damageBoss(9999, boss.p); } };

// ═══════════════════════════ 20. 開始 ═══════════════════════════
// 第一次有完整的簡報；之後「再玩一次」直接出擊，「換裝備再出擊」只重選強化
let mode = 'story';
for (;;) {
  const win = await playRound(mode);
  const again = await larch.choose(\`\${win ? '任務完成' : '任務失敗'}・分數 \${score.toLocaleString()}　要再挑戰一次嗎？\`, ['再玩一次', '換裝備再出擊', '結束']);
  ui.result.classList.remove('on');
  if (again === 0) mode = 'again';
  else if (again === 1) mode = 'pick';
  else { larch.complete({ score, result: win ? 'win' : 'lose' }); break; }
}
`,td:`// 城堡守衛戰（Castle Keep）：3D 塔防範例，暗色奇幻風。
// 點路旁的石台蓋塔（砲塔、冰晶塔、弩箭塔），點蓋好的塔可以升級或賣掉；按「下一波」放怪物出來，
// 別讓牠們走進城堡。拖曳可以轉視角、滾輪（手機兩指）縮放。
// 模型、配樂、金幣、波數、城堡血量都是參數（larch.params），作者在卡片設定換掉就好，不用改程式。

const P = larch.params;
const num = (v, d) => (v === '' || v === undefined || v === null || !Number.isFinite(Number(v)) ? d : Number(v));
const WAVES = Math.max(1, Math.round(num(P.waves, 8)));
const START_GOLD = Math.max(0, Math.round(num(P.gold, 120)));
const CASTLE_HP = Math.max(1, Math.round(num(P.castleHp, 20)));
const V3 = THREE.Vector3;
const clamp = larch.clamp;

// ── 畫面與配樂：黃昏、薄霧、暖色的火光 ─────────────────────
larch.music(P.bgm, { volume: .5 });
larch.sky('#5e5a6c');
larch.setLook({ hour: 17.2, look: 'film', fog: .22, bloom: .8, exposure: 1.12 });

// 固定的亂數：每次打開都是同一塊地
let seed = 11;
const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: .92, metalness: 0, ...o });
const glowMat = (color, opacity = 1) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false, toneMapped: false });
function shadows(obj, cast = true, receive = true) {
  obj.traverse((o) => { if (o.isMesh) { o.castShadow = cast; o.receiveShadow = receive; } });
  return obj;
}
function paint(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
// 把幾塊幾何體併成一塊（樹、草叢這些用 InstancedMesh 一次畫很多個）
function merge(parts) {
  const pos = [], nor = [];
  for (const [geo, m] of parts) {
    const g = geo.clone().applyMatrix4(m).toNonIndexed();
    pos.push(...g.attributes.position.array); nor.push(...g.attributes.normal.array);
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  return out;
}
const at = (x, y, z, rx = 0, ry = 0, rz = 0, s = 1) => new THREE.Matrix4().compose(new V3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new V3(s, s, s));

// ── 路線：轉角是圓的，怪物沿著走 ────────────────────────
const CORNERS = [[-11.2, -4], [-5, -4], [-5, 3], [0, 3], [0, -3], [5, -3], [5, 2], [8.4, 2]].map(([x, z]) => new V3(x, 0, z));
const path = new THREE.CurvePath();
{
  const R = 1.6;
  let from = CORNERS[0].clone();
  for (let i = 1; i < CORNERS.length - 1; i++) {
    const c = CORNERS[i];
    const a = c.clone().addScaledVector(c.clone().sub(CORNERS[i - 1]).normalize(), -R);
    const b = c.clone().addScaledVector(CORNERS[i + 1].clone().sub(c).normalize(), R);
    path.add(new THREE.LineCurve3(from, a));
    path.add(new THREE.QuadraticBezierCurve3(a, c.clone(), b));
    from = b;
  }
  path.add(new THREE.LineCurve3(from, CORNERS[CORNERS.length - 1].clone()));
}
const PATH_LEN = path.getLength();
// 先取樣好，之後怪物每一格只查表
const SAMPLES = 360;
const pathPts = [], pathDirs = [];
for (let i = 0; i <= SAMPLES; i++) { pathPts.push(path.getPointAt(i / SAMPLES)); pathDirs.push(path.getTangentAt(i / SAMPLES)); }
function pathPoint(d, out) {
  const u = clamp(d / PATH_LEN, 0, 1) * SAMPLES, i = Math.min(SAMPLES - 1, Math.floor(u));
  return out.copy(pathPts[i]).lerp(pathPts[i + 1], u - i);
}
const pathDir = (d) => pathDirs[Math.round(clamp(d / PATH_LEN, 0, 1) * SAMPLES)];
const distToPath = (x, z) => { let best = 1e9; for (const p of pathPts) best = Math.min(best, (p.x - x) ** 2 + (p.z - z) ** 2); return Math.sqrt(best); };

// 可以蓋塔的石台（都在路旁、塔打得到兩段路以上的地方）
const SPOTS = [[-7.6, -1.2], [-8.6, 3.2], [-7.8, -6.5], [-2.5, .8], [-2.5, -2.2], [-2.5, 5.4], [2.5, -.9], [2.5, 2.3], [2.5, -5.5], [7.1, -.9], [7, 4.7]];
const CASTLE_AT = new V3(10.3, 0, 2);

// ── 浮在霧裡的一塊荒地 ───────────────────────────────
const world = new THREE.Group();
larch.scene.add(world);
const ISLAND = { x: .2, z: -.5, w: 27.4, h: 16.6, r: 3.2 };
function roundRect(w, h, r) {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0);
  s.lineTo(x + w, y + h - r); s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2);
  s.lineTo(x + r, y + h); s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI);
  s.lineTo(x, y + r); s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
  return s;
}
function slab(w, h, r, depth, bevel, mats, topY) {
  const g = new THREE.ExtrudeGeometry(roundRect(w, h, r), { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments: 14 });
  g.rotateX(-Math.PI / 2);
  g.computeBoundingBox();
  g.translate(ISLAND.x, topY - g.boundingBox.max.y, ISLAND.z);
  return new THREE.Mesh(g, mats);
}
// 地面貼圖：枯黃的草、深色的泥土塊、細細的草紋（只畫一次）
const big = !larch.phone;
const groundTex = paint(big ? 1024 : 512, big ? 620 : 310, (g, w, h) => {
  g.fillStyle = '#69703f'; g.fillRect(0, 0, w, h);
  const blot = (x, y, r, color, a) => { const grd = g.createRadialGradient(x, y, 0, x, y, r); grd.addColorStop(0, color); grd.addColorStop(1, 'rgba(0,0,0,0)'); g.globalAlpha = a; g.fillStyle = grd; g.fillRect(x - r, y - r, r * 2, r * 2); };
  const k = w / 1024;
  for (let i = 0; i < 260; i++) blot(rand() * w, rand() * h, (14 + rand() * 60) * k, ['#566234', '#7d8049', '#8f8550', '#4a5530', '#6f6a3c'][i % 5], .35 + rand() * .3);
  for (let i = 0; i < 40; i++) blot(rand() * w, rand() * h, (16 + rand() * 40) * k, '#5e4a33', .45);
  g.lineWidth = Math.max(1, 1.2 * k);
  for (let i = 0; i < 2600 * k * k + 600; i++) {
    const x = rand() * w, y = rand() * h, l = (2 + rand() * 3.5) * k, a = rand() * Math.PI * 2;
    g.globalAlpha = .35 + rand() * .35;
    g.strokeStyle = ['#878a4f', '#535d34', '#a09456', '#6d7340'][i % 4];
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
  }
  g.globalAlpha = 1;
});
groundTex.repeat.set(1 / (ISLAND.w + .6), 1 / (ISLAND.h + .6));
groundTex.offset.set(.5, .5);
const grass = slab(ISLAND.w, ISLAND.h, ISLAND.r, .35, .3, [std('#ffffff', { map: groundTex }), std('#5b5537')], 0);
grass.receiveShadow = true;
world.add(grass);
world.add(slab(ISLAND.w - .4, ISLAND.h - .4, ISLAND.r - .1, 1.4, .3, [std('#5a4836'), std('#4d3d2e', { flatShading: true })], -.55));
{
  // 地底下的岩層：圓錐亂抖一下，像一塊從霧裡浮起來的地
  const g = new THREE.CylinderGeometry(1, .16, 1, 16, 5);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i);
    if (y > .49) continue;
    const k = 1 + (rand() - .5) * .34;
    p.setXYZ(i, p.getX(i) * k, y + (rand() - .5) * .1, p.getZ(i) * k);
  }
  g.computeVertexNormals();
  const rock = new THREE.Mesh(g, std('#4f4943', { flatShading: true }));
  rock.scale.set(ISLAND.w * .48, 7, ISLAND.h * .47);
  rock.position.set(ISLAND.x, -5.7, ISLAND.z);
  world.add(rock);
}

// 土路：車輪壓出來的兩條深色痕跡、碎石
const roadTex = paint(128, 512, (g, w, h) => {
  g.fillStyle = '#7a5c3e'; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 900; i++) { g.fillStyle = ['#6b4f35', '#8a6a48', '#5d4530', '#94785a'][i % 4]; g.globalAlpha = .6; const r = 1 + rand() * 3; g.fillRect(rand() * w, rand() * h, r, r); }
  g.globalAlpha = .35; g.fillStyle = '#4a3624';
  for (const x of [w * .3, w * .7]) for (let y = 0; y < h; y += 4) g.fillRect(x - 5 + Math.sin(y * .05) * 2, y, 10, 4);
  g.globalAlpha = 1;
});
roadTex.wrapS = roadTex.wrapT = THREE.RepeatWrapping;
function ribbon(width, y, mat) {
  const n = SAMPLES + 1, pos = new Float32Array(n * 6), nor = new Float32Array(n * 6), uv = new Float32Array(n * 4), idx = [];
  for (let i = 0; i < n; i++) {
    const p = pathPts[i], t = pathDirs[i], lx = -t.z * width / 2, lz = t.x * width / 2, v = (i / SAMPLES) * PATH_LEN / 3;
    pos.set([p.x + lx, y, p.z + lz, p.x - lx, y, p.z - lz], i * 6);
    nor.set([0, 1, 0, 0, 1, 0], i * 6);
    uv.set([0, v, 1, v], i * 4);
    if (i < SAMPLES) { const a = i * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setIndex(idx);
  const m = new THREE.Mesh(g, mat);
  m.receiveShadow = true;
  return m;
}
const flat = { polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 };
world.add(ribbon(2.25, .015, std('#4a3829', flat)), ribbon(1.8, .03, std('#ffffff', { ...flat, map: roadTex })));

// ── 裝飾：枯樹、松樹、石頭、乾草叢、路邊火把 ─────────────────
const decor = { dead: [], pine: [], rock: [], tuft: [] };
function freeSpot(x, z, gap) {
  const cx = ISLAND.w / 2 - ISLAND.r, cz = ISLAND.h / 2 - ISLAND.r;
  const dx = Math.max(0, Math.abs(x - ISLAND.x) - cx), dz = Math.max(0, Math.abs(z - ISLAND.z) - cz);
  if (Math.abs(x - ISLAND.x) > ISLAND.w / 2 - .8 || Math.abs(z - ISLAND.z) > ISLAND.h / 2 - .8 || Math.hypot(dx, dz) > ISLAND.r - .8) return false;
  if (distToPath(x, z) < 1.55 + gap) return false;
  if (SPOTS.some(([sx, sz]) => Math.hypot(sx - x, sz - z) < 1.35 + gap)) return false;
  if (Math.hypot(CASTLE_AT.x - x, CASTLE_AT.z - z) < 3 + gap) return false;
  return Math.hypot(CORNERS[0].x - x, CORNERS[0].z - z) > 2.4;
}
const near = (list, x, z, d) => list.some(([a, b]) => Math.hypot(a - x, b - z) < d);
for (let tries = 0; tries < 1200; tries++) {
  const x = ISLAND.x + (rand() - .5) * ISLAND.w, z = ISLAND.z + (rand() - .5) * ISLAND.h, r = rand();
  if (r < .16 && decor.dead.length < 11 && freeSpot(x, z, .3) && !near(decor.dead, x, z, 2.2)) decor.dead.push([x, z, .85 + rand() * .5, rand() * 6]);
  else if (r < .28 && decor.pine.length < (big ? 14 : 9) && freeSpot(x, z, .4) && !near(decor.pine, x, z, 1.3) && !near(decor.dead, x, z, 1.2)) decor.pine.push([x, z, .8 + rand() * .55, rand() * 6]);
  else if (r < .45 && decor.rock.length < 20 && freeSpot(x, z, -.1)) decor.rock.push([x, z, .35 + rand() * (rand() < .2 ? 1.3 : .6), rand() * 6]);
  else if (decor.tuft.length < (big ? 90 : 50) && freeSpot(x, z, -.35)) decor.tuft.push([x, z, .7 + rand() * .7, rand() * 6]);
}
// 路邊的碎石
for (let i = 4; i <= SAMPLES - 4; i += 5) {
  const p = pathPts[i], t = pathDirs[i], side = rand() < .5 ? 1 : -1, s = .14 + rand() * .2;
  if (rand() < .5) decor.rock.push([p.x - t.z * 1.15 * side, p.z + t.x * 1.15 * side, s, rand() * 6]);
}
const dummy = new THREE.Object3D();
function instanced(geo, mat, list, place) {
  const m = new THREE.InstancedMesh(geo, mat, Math.max(1, list.length));
  list.forEach((item, i) => { dummy.position.set(0, 0, 0); dummy.rotation.set(0, 0, 0); dummy.scale.setScalar(1); place(item, i); dummy.updateMatrix(); m.setMatrixAt(i, dummy.matrix); });
  m.count = list.length;
  m.castShadow = true; m.receiveShadow = true;
  world.add(m);
  return m;
}
{
  const branch = new THREE.CylinderGeometry(.035, .07, 1, 5);
  const deadTree = merge([
    [new THREE.CylinderGeometry(.09, .19, 1.7, 6), at(0, .85, 0, .06, 0, .05)],
    [branch, at(.26, 1.35, 0, 0, 0, -.95, .85)], [branch, at(-.24, 1.05, .05, .1, 0, 1.0, .75)],
    [branch, at(.02, 1.75, .18, .75, 0, .2, .7)], [branch, at(.52, 1.72, 0, 0, 0, -.35, .45)], [branch, at(-.5, 1.32, .05, 0, 0, .4, .4)],
  ]);
  instanced(deadTree, std('#4b3e35', { flatShading: true }), decor.dead, ([x, z, s, a]) => { dummy.position.set(x, 0, z); dummy.scale.setScalar(s); dummy.rotation.y = a; });
  instanced(new THREE.CylinderGeometry(.08, .11, .5, 5), std('#3f3128'), decor.pine, ([x, z, s]) => { dummy.position.set(x, .25 * s, z); dummy.scale.setScalar(s); });
  const pine = merge([[new THREE.ConeGeometry(.72, 1.3, 7), at(0, 1.05, 0)], [new THREE.ConeGeometry(.52, 1.05, 7), at(0, 1.65, 0, 0, .4, 0)], [new THREE.ConeGeometry(.32, .7, 7), at(0, 2.15, 0, 0, .8, 0)]]);
  const pines = instanced(pine, std('#ffffff', { flatShading: true }), decor.pine, ([x, z, s, a]) => { dummy.position.set(x, 0, z); dummy.scale.set(s, s * (1 + (a % 1) * .3), s); dummy.rotation.y = a; });
  const darkGreens = ['#3c5238', '#344a33', '#46593a'].map((c) => new THREE.Color(c));
  decor.pine.forEach((_, i) => pines.setColorAt(i, darkGreens[i % 3]));
  instanced(new THREE.DodecahedronGeometry(.5, 0), std('#77726b', { flatShading: true }), decor.rock, ([x, z, s, a]) => { dummy.position.set(x, .14 * s, z); dummy.scale.set(s, s * .72, s * .9); dummy.rotation.set(a, a * 2, a * 3); });
  const blade = new THREE.ConeGeometry(.035, .42, 3);
  const tuft = merge([0, 1, 2, 3, 4].map((i) => [blade, at(Math.cos(i * 1.3) * .07, .19, Math.sin(i * 1.3) * .07, Math.cos(i * 1.3) * .35, 0, Math.sin(i * 1.3) * .35)]));
  const tufts = instanced(tuft, std('#ffffff', { flatShading: true }), decor.tuft, ([x, z, s, a]) => { dummy.position.set(x, 0, z); dummy.scale.setScalar(s); dummy.rotation.y = a; });
  const dry = ['#a49758', '#8b8a4c', '#b3a466', '#76783f'].map((c) => new THREE.Color(c));
  decor.tuft.forEach((_, i) => tufts.setColorAt(i, dry[i % 4]));
}

// 黃昏的霧雲（在地底下飄）
const clouds = new THREE.Group();
{
  const puff = new THREE.IcosahedronGeometry(1, 1), mist = std('#5d5966', { roughness: 1 });
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2 + rand(), r = 16 + rand() * 7, cloud = new THREE.Group();
    for (let k = 0; k < 4; k++) {
      const m = new THREE.Mesh(puff, mist);
      m.position.set((k - 1.5) * 1.4, rand() * .5, (rand() - .5) * 1.2);
      m.scale.setScalar(1.1 + rand() * 1);
      cloud.add(m);
    }
    cloud.position.set(Math.cos(a) * r, -5 - rand() * 4, Math.sin(a) * r * .7);
    cloud.rotation.y = rand() * 3;
    clouds.add(cloud);
  }
  world.add(clouds);
}

// ── 光點貼圖（火光、閃光、拖尾都用它）──────────────────────
const glowTex = paint(64, 64, (g, w) => {
  const grd = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
  grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(.3, 'rgba(255,255,255,.7)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd; g.fillRect(0, 0, w, w);
});
function glowSprite(color, size) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  s.scale.setScalar(size);
  return s;
}

// 路邊的火把（火焰特效＋一團暖光）
const torches = [];
{
  for (let d = 3.5; d < PATH_LEN - 2; d += 5.2) {
    const p = pathPoint(d, new V3()), t = pathDir(d), side = torches.length % 2 ? 1 : -1;
    const x = p.x - t.z * 1.4 * side, z = p.z + t.x * 1.4 * side;
    if (SPOTS.some(([sx, sz]) => Math.hypot(sx - x, sz - z) < 1.25)) continue;
    torches.push({ x, z });
  }
  instanced(new THREE.CylinderGeometry(.055, .085, 1.15, 6), std('#3b2c21'), torches, ({ x, z }) => dummy.position.set(x, .575, z));
  instanced(new THREE.CylinderGeometry(.17, .08, .18, 8), std('#2f2c2a', { metalness: .6, roughness: .5 }), torches, ({ x, z }) => dummy.position.set(x, 1.2, z));
  for (const t of torches) {
    t.glow = glowSprite('#ff9a3c', 1.7);
    t.glow.position.set(t.x, 1.45, t.z);
    t.phase = rand() * 9;
    world.add(t.glow);
    larch.effect('fire', [t.x, 1.3, t.z], { scale: .38, loop: true });
  }
}
// 飄著的餘燼
larch.effect('embers', [-2, 1.5, 0], { scale: 2.4, loop: true });
larch.effect('embers', [7, 2, 2], { scale: 1.6, loop: true });

// 怪物出來的地方：地上會轉的召喚陣＋一圈斷掉的立石
const spawnAt = CORNERS[0].clone();
const gate = new THREE.Group();
const swirlDisc = new THREE.Mesh(new THREE.CircleGeometry(1.35, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({
  transparent: true, depthWrite: false, toneMapped: false,
  map: paint(128, 128, (g, n) => {
    const grd = g.createRadialGradient(n / 2, n / 2, 2, n / 2, n / 2, n / 2);
    grd.addColorStop(0, '#b8f08a'); grd.addColorStop(.22, '#5fae3a'); grd.addColorStop(.55, '#3b1d55'); grd.addColorStop(.85, '#1c0f2a'); grd.addColorStop(1, 'rgba(20,10,30,0)');
    g.fillStyle = grd; g.fillRect(0, 0, n, n);
    g.strokeStyle = 'rgba(190,255,140,.65)'; g.lineWidth = 3; g.lineCap = 'round';
    for (let k = 0; k < 3; k++) { g.beginPath(); for (let a = .3; a < 5.2; a += .1) { const r = a * 11; g.lineTo(n / 2 + Math.cos(a + k * 2.1) * r, n / 2 + Math.sin(a + k * 2.1) * r); } g.stroke(); }
    g.beginPath(); g.arc(n / 2, n / 2, n * .46, 0, Math.PI * 2); g.stroke();
  }),
}));
{
  swirlDisc.position.y = .06;
  const stoneGeo = new THREE.BoxGeometry(.34, 1, .28), stoneMat = std('#5d5853', { flatShading: true });
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + .3, s = new THREE.Mesh(stoneGeo, stoneMat);
    const tall = .5 + rand() * .9;
    s.scale.y = tall;
    s.position.set(Math.cos(a) * 1.7, tall / 2 - .05, Math.sin(a) * 1.7);
    s.rotation.set((rand() - .5) * .35, -a, (rand() - .5) * .35);
    gate.add(s);
  }
  shadows(gate);
  const glow = glowSprite('#5fae3a', 2.2); glow.position.y = .4;
  gate.add(swirlDisc, glow);
  gate.position.copy(spawnAt);
  world.add(gate);
  larch.effect('smoke', [spawnAt.x, .2, spawnAt.z], { scale: 1.2, loop: true });
}

// ── 模型（參數空白時用 THREE 做的替代形狀）────────────────
const eyeGeo = new THREE.SphereGeometry(.07, 8, 6), eyeMat = std('#ffd84a', { emissive: '#ffb020', emissiveIntensity: 1.2 });
function eyes(group, y, z, gap) {
  for (const s of [-1, 1]) { const e = new THREE.Mesh(eyeGeo, eyeMat); e.position.set(s * gap, y, z); group.add(e); }
}
const stone = () => std('#8a857c', { flatShading: true });
const FALLBACK = {
  cannon() {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(.62, .74, 1.15, 9), stone());
    base.position.y = .58;
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(.72, .66, .22, 9), stone());
    rim.position.y = 1.2;
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.16, .24, .95, 12), std('#a9773a', { roughness: .4, metalness: .6 }));
    barrel.rotation.x = Math.PI / 2.6; barrel.position.set(0, 1.45, .22);
    g.add(base, rim, barrel);
    return g;
  },
  crystal() {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(.4, .66, 1.35, 6), std('#3d3a48', { flatShading: true }));
    base.position.y = .68;
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(.36, 0), std('#7fd0ff', { emissive: '#2f8fff', emissiveIntensity: 1.1, roughness: .2 }));
    gem.scale.set(1, 1.8, 1); gem.position.y = 1.95;
    g.add(base, gem);
    return g;
  },
  archer() {
    const g = new THREE.Group();
    const wood = std('#6b4a2f', { flatShading: true });
    for (const [x, z] of [[-.4, -.4], [.4, -.4], [-.4, .4], [.4, .4]]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(.07, .09, 1.5, 5), wood); leg.position.set(x, .75, z); g.add(leg); }
    const deck = new THREE.Mesh(new THREE.BoxGeometry(1.1, .14, 1.1), wood); deck.position.y = 1.55;
    const bow = new THREE.Mesh(new THREE.TorusGeometry(.42, .05, 5, 12, Math.PI), std('#4a3322')); bow.position.set(0, 1.85, .2); bow.rotation.x = -Math.PI / 2;
    const rail = new THREE.Mesh(new THREE.BoxGeometry(.12, .12, .9), wood); rail.position.set(0, 1.78, 0);
    g.add(deck, bow, rail);
    return g;
  },
  slime() {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(.45, 18, 12), std('#8fe03a', { roughness: .25, emissive: '#2f6a10', emissiveIntensity: .4 }));
    body.scale.set(1, .78, 1); body.position.y = .35;
    g.add(body); eyes(g, .45, .38, .15);
    return g;
  },
  goblin() {
    const g = new THREE.Group();
    const skin = std('#5f7a3a');
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(.34, .45, 4, 10), std('#4a3b2e'));
    body.position.y = .62;
    const head = new THREE.Mesh(new THREE.SphereGeometry(.3, 14, 10), skin);
    head.position.y = 1.2;
    const axe = new THREE.Mesh(new THREE.BoxGeometry(.06, .9, .06), std('#5a4030'));
    axe.position.set(.45, .7, .1); axe.rotation.z = -.3;
    const blade = new THREE.Mesh(new THREE.BoxGeometry(.32, .26, .04), std('#9aa0a8', { metalness: .7, roughness: .4 }));
    blade.position.set(.58, 1.08, .1);
    g.add(body, head, axe, blade); eyes(g, 1.24, .26, .11);
    return g;
  },
  beetle() {
    const g = new THREE.Group();
    const shell = new THREE.Mesh(new THREE.SphereGeometry(.6, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), std('#2d3a52', { roughness: .3, metalness: .5 }));
    shell.scale.set(1, .85, 1.2); shell.position.y = .15;
    const horn = new THREE.Mesh(new THREE.ConeGeometry(.08, .45, 6), std('#c9a24a', { metalness: .6 }));
    horn.position.set(0, .45, .7); horn.rotation.x = 1.1;
    g.add(shell, horn); eyes(g, .32, .66, .17);
    return g;
  },
  castle() {
    const g = new THREE.Group();
    const wall = stone(), roof = std('#4a3b3a'), banner = std('#9b2226');
    const keep = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.4, 2), wall); keep.position.y = 1.2;
    g.add(keep);
    for (const [x, z] of [[-1.4, -1], [1.4, -1], [-1.4, 1], [1.4, 1]]) {
      const t = new THREE.Mesh(new THREE.CylinderGeometry(.48, .55, 3.1, 8), wall); t.position.set(x, 1.55, z);
      const c = new THREE.Mesh(new THREE.ConeGeometry(.62, 1, 8), roof); c.position.set(x, 3.6, z);
      g.add(t, c);
    }
    for (const x of [-.6, .6]) { const b = new THREE.Mesh(new THREE.BoxGeometry(.4, 1.1, .05), banner); b.position.set(x, 1.6, 1.03); g.add(b); }
    const door = new THREE.Mesh(new THREE.BoxGeometry(.8, 1.1, .1), std('#3a2a1e')); door.position.set(0, .55, 1.02);
    g.add(door);
    return g;
  },
};
// 模型正面都朝 +z。範例的砲塔砲管朝 +x、弩砲朝 -z：瞄準時整座塔一起轉，這裡記著要多轉多少（換成自己的模型時不轉）
const AIM = { cannon: P.cannon === 'mg-td-cannon' ? -Math.PI / 2 : 0, archer: P.archer === 'mg-td-archer' ? Math.PI : 0, crystal: 0 };
const HEIGHT = { cannon: 2.0, crystal: 2.5, archer: 2.6, slime: 1.25, goblin: 1.5, beetle: 1.05, castle: 4.5 };
async function load(key) {
  if (P[key]) {
    try { return await larch.model(P[key], { height: HEIGHT[key] }); } catch (e) { console.warn('[castle keep]', e); }
  }
  const g = FALLBACK[key]();
  const box = new THREE.Box3().setFromObject(g);
  g.scale.setScalar(HEIGHT[key] / Math.max(.1, box.max.y));
  const holder = new THREE.Group(); holder.add(g);
  return shadows(holder);
}
const MODEL = {};
await Promise.all(Object.keys(HEIGHT).map(async (k) => { MODEL[k] = await load(k); }));

// 城堡（城門朝著來的路）
const castle = MODEL.castle;
{
  // 城堡太寬時縮小一點，才不會壓到路和石台
  const size = new THREE.Box3().setFromObject(castle).getSize(new V3());
  const wide = Math.max(size.x, size.z);
  if (wide > 4.8) castle.scale.setScalar(4.8 / wide);
}
const CASTLE_SCALE = castle.scale.x;
castle.position.copy(CASTLE_AT);
castle.rotation.y = -Math.PI / 2 + .3;
world.add(castle);
const gateAt = CORNERS[CORNERS.length - 1].clone().setY(.6);
{
  // 城門口兩支大火把
  for (const s of [-1, 1]) {
    const x = gateAt.x + .3, z = gateAt.z + s * 1.5;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(.08, .11, 1.6, 6), std('#3b2c21')); post.position.set(x, .8, z);
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(.22, .1, .22, 8), std('#2f2c2a', { metalness: .6, roughness: .5 })); cup.position.set(x, 1.65, z);
    world.add(shadows(post), shadows(cup));
    const glow = glowSprite('#ff9a3c', 2.2); glow.position.set(x, 1.95, z); world.add(glow);
    torches.push({ x, z, glow, phase: s * 3 });
    larch.effect('fire', [x, 1.75, z], { scale: .5, loop: true });
  }
}

// ── 一閃而過的光與衝擊波、子彈拖出來的尾巴（用完放回池子）────────
const flashes = [];
const ringGeo = new THREE.RingGeometry(.82, 1, 40).rotateX(-Math.PI / 2);
function flash(pos, color, size, ring = false) {
  let f = flashes.find((x) => !x.live && x.ring === ring);
  if (!f) {
    f = { live: false, ring, t: 0, obj: ring ? new THREE.Mesh(ringGeo, glowMat('#ffffff', .8)) : glowSprite('#ffffff', 1) };
    larch.scene.add(f.obj); flashes.push(f);
  }
  f.live = true; f.t = 0; f.size = size; f.obj.visible = true;
  f.obj.position.copy(pos);
  f.obj.material.color.set(color);
  return f;
}
const puffs = [];
function puff(pos, color, size, life, glow) {
  let p = puffs.find((x) => !x.live && x.glow === glow);
  if (!p) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, toneMapped: false, blending: glow ? THREE.AdditiveBlending : THREE.NormalBlending }));
    p = { obj: s, glow, live: false };
    larch.scene.add(s); puffs.push(p);
  }
  Object.assign(p, { live: true, t: 0, life, size });
  p.obj.visible = true;
  p.obj.position.copy(pos);
  p.obj.material.color.set(color);
  p.obj.scale.setScalar(size);
}
function updateFx(dt) {
  for (const f of flashes) {
    if (!f.live) continue;
    f.t += dt / (f.ring ? .45 : .28);
    if (f.t >= 1) { f.live = false; f.obj.visible = false; continue; }
    f.obj.scale.setScalar(f.size * (f.ring ? .3 + f.t * .9 : .6 + f.t * .6));
    f.obj.material.opacity = (1 - f.t) * (f.ring ? .85 : 1);
  }
  for (const p of puffs) {
    if (!p.live) continue;
    p.t += dt / p.life;
    if (p.t >= 1) { p.live = false; p.obj.visible = false; continue; }
    p.obj.scale.setScalar(p.size * (p.glow ? 1 - p.t * .6 : 1 + p.t * 1.4));
    p.obj.material.opacity = (1 - p.t) * (p.glow ? .9 : .5);
    if (!p.glow) p.obj.position.y += dt * .5;
  }
}
// 音效：同一種聲音太密就跳過
const lastSfx = {};
function sfx(name, vol = .5, gap = .07) {
  const now = larch.time;
  if (now - (lastSfx[name] ?? -9) < gap) return;
  lastSfx[name] = now;
  larch.sound(name, vol);
}

// ── 介面：深色木板與石板、金色描邊 ─────────────────────────
const ui = larch.ui.root;
const css = document.createElement('style');
css.textContent = \`
.td{--gold:#d9b25c;--gold2:#ffe39a;--ink:#f1e2c0;font-family:"Noto Serif TC","Source Han Serif TC","Songti TC","PMingLiU",Georgia,serif;color:var(--ink)}
.td-wood{background:repeating-linear-gradient(92deg,rgba(0,0,0,.07) 0 2px,transparent 2px 9px),linear-gradient(180deg,#4d3826,#2c1f15);border:2px solid var(--gold);border-radius:7px;box-shadow:0 0 0 2px #140d08,inset 0 1px 0 rgba(255,225,160,.28),inset 0 -2px 0 rgba(0,0,0,.35),0 8px 18px rgba(0,0,0,.45)}
.td-stone{background:radial-gradient(120% 90% at 30% 0%,#56524c,#2e2b28);border:2px solid var(--gold);border-radius:8px;box-shadow:0 0 0 2px #120f0c,inset 0 1px 0 rgba(255,240,210,.18),0 10px 24px rgba(0,0,0,.5)}
.td-hud{position:absolute;left:max(14px,env(safe-area-inset-left));top:max(12px,env(safe-area-inset-top));display:flex;align-items:center;gap:14px;padding:7px 16px 7px 10px;pointer-events:none;flex-wrap:wrap;max-width:calc(100% - 96px)}
.td-stat{display:flex;align-items:center;gap:7px;font-weight:700;font-size:17px;line-height:1;white-space:nowrap}
.td-stat svg{flex:none;filter:drop-shadow(0 1px 0 rgba(0,0,0,.6))}
.td-num{color:var(--gold2);font-family:Georgia,"Noto Serif TC",serif;font-variant-numeric:tabular-nums;text-shadow:0 1px 0 #000,0 0 8px rgba(255,190,80,.35);min-width:1.4em}
.td-sep{width:1px;align-self:stretch;background:linear-gradient(transparent,rgba(217,178,92,.6),transparent)}
.td-hp i{display:block;width:92px;height:10px;border-radius:2px;background:#1a110c;border:1px solid #7a5a2c;overflow:hidden}
.td-hp i u{display:block;height:100%;width:100%;background:linear-gradient(180deg,#e2564a,#9b2226);transition:width .3s ease}
.is-bump{animation:tdBump .35s ease}
@keyframes tdBump{40%{transform:scale(1.15)}}
.td-btn{pointer-events:auto;position:absolute;display:grid;place-items:center;min-height:50px;padding:0 22px;border:2px solid var(--gold);border-radius:7px;font:700 17px/1 "Noto Serif TC","Songti TC",Georgia,serif;letter-spacing:.06em;color:var(--gold2);text-shadow:0 2px 0 #000;cursor:pointer;touch-action:manipulation;
  background:linear-gradient(180deg,#9c3424,#5c1910);box-shadow:0 0 0 2px #140d08,inset 0 1px 0 rgba(255,200,150,.35),inset 0 -3px 0 rgba(0,0,0,.35),0 8px 18px rgba(0,0,0,.45);transition:transform .12s,filter .12s}
.td-btn[hidden],.td-preview[hidden]{display:none}
.td-btn:hover{filter:brightness(1.15)}
.td-btn:active{transform:translateY(2px)}
.td-btn:focus-visible{outline:2px solid var(--gold2);outline-offset:3px}
.td-btn.is-wood{background:repeating-linear-gradient(92deg,rgba(0,0,0,.07) 0 2px,transparent 2px 9px),linear-gradient(180deg,#5a4230,#2f2117);font-size:15px;min-height:44px;padding:0 16px}
.td-btn.is-on{background:linear-gradient(180deg,#2f5f8a,#173450)}
.td-btn.next{right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom))}
.td-btn.next small{display:block;margin-top:4px;font-size:11px;letter-spacing:.02em;color:#e9cf96;font-weight:600}
.td-btn.speed{left:max(16px,env(safe-area-inset-left));bottom:max(16px,env(safe-area-inset-bottom))}
.td-btn.next.is-pulse{animation:tdPulse 1.4s ease-in-out infinite}
@keyframes tdPulse{50%{box-shadow:0 0 0 2px #140d08,0 0 22px rgba(255,200,90,.65),0 8px 18px rgba(0,0,0,.45)}}
.td-pop{position:absolute;z-index:6;display:grid;gap:8px;padding:10px;pointer-events:auto;transform:translate(-50%,-100%);animation:tdPop .2s ease-out}
.td-pop.is-below{transform:translate(-50%,0)}
@keyframes tdPop{0%{opacity:0;scale:.85}100%{opacity:1;scale:1}}
.td-pop h4{margin:0 4px;font-size:15px;font-weight:700;color:var(--gold2);display:flex;justify-content:space-between;align-items:baseline;gap:14px;text-shadow:0 1px 0 #000}
.td-pop h4 small{font-size:12px;color:#b9a77f;font-weight:600}
.td-row{display:flex;gap:8px}
.td-opt{display:grid;justify-items:center;gap:3px;width:94px;padding:9px 6px 8px;border:1px solid #6f5a35;border-radius:6px;background:linear-gradient(180deg,#3d3a36,#24221f);color:var(--ink);font:inherit;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,240,210,.12),0 2px 0 #0d0b09;transition:border-color .12s,transform .12s}
.td-opt:hover{border-color:var(--gold2);transform:translateY(-2px)}
.td-opt:active{transform:translateY(1px)}
.td-opt b{font-size:15px;font-weight:700}
.td-opt span{font-size:12px;color:#b9a77f}
.td-opt em{display:flex;align-items:center;gap:4px;font-style:normal;font-weight:700;font-size:14px;color:var(--gold2);font-family:Georgia,serif}
.td-opt[disabled]{opacity:.55;cursor:not-allowed;transform:none;border-color:#4a3d28}
.td-opt[disabled] em{color:#e0705f}
.td-opt.sell em{color:#9fd88a}
.td-tip{position:absolute;left:50%;bottom:calc(max(16px,env(safe-area-inset-bottom)) + 82px);transform:translateX(-50%);padding:9px 18px;font-weight:700;font-size:15px;color:var(--gold2);white-space:nowrap;pointer-events:none;animation:tdTip 1.6s ease-in-out infinite}
@keyframes tdTip{50%{margin-bottom:5px}}
.td-preview{position:absolute;right:max(16px,env(safe-area-inset-right));bottom:calc(max(16px,env(safe-area-inset-bottom)) + 62px);padding:6px 12px;font-size:13px;font-weight:600;color:#e9d7ae;pointer-events:none;max-width:min(330px,60vw)}
.td-toast{position:absolute;left:50%;top:19%;transform:translateX(-50%);padding:9px 22px;font-weight:700;font-size:16px;color:var(--gold2);text-shadow:0 1px 0 #000;white-space:nowrap;pointer-events:none;animation:tdToast 1.8s ease forwards}
@keyframes tdToast{0%{opacity:0;margin-top:10px}12%{opacity:1;margin-top:0}80%{opacity:1}100%{opacity:0;margin-top:-12px}}
.td-banner{position:absolute;left:50%;top:40%;transform:translate(-50%,-50%);display:grid;gap:8px;justify-items:center;padding:20px 40px 22px;text-align:center;pointer-events:none;animation:tdBanner 2.4s ease forwards;max-width:calc(100% - 32px)}
.td-banner b{font-size:clamp(28px,6vw,46px);font-weight:800;letter-spacing:.12em;color:var(--gold2);text-shadow:0 2px 0 #000,0 0 18px rgba(255,190,80,.45)}
.td-banner span{font-size:16px;font-weight:600;color:#e9d7ae}
.td-banner::before,.td-banner::after{content:"";position:absolute;left:14px;right:14px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.td-banner::before{top:7px}.td-banner::after{bottom:7px}
@keyframes tdBanner{0%{opacity:0;scale:.9}12%{opacity:1;scale:1}82%{opacity:1}100%{opacity:0;scale:1.02}}
.td-float{position:absolute;z-index:4;font:800 18px Georgia,"Noto Serif TC",serif;color:#ffd76a;text-shadow:0 2px 0 #3a2000,0 0 8px rgba(0,0,0,.5);pointer-events:none;transform:translate(-50%,-50%);animation:tdFloat .9s ease-out forwards;white-space:nowrap}
.td-float.is-red{color:#ff5a4a;text-shadow:0 2px 0 #2a0000;font-size:22px}
@keyframes tdFloat{0%{opacity:0;margin-top:6px;scale:.6}20%{opacity:1;scale:1.1}100%{opacity:0;margin-top:-44px;scale:1}}
.td-hurt{position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 110px rgba(200,20,20,.6);opacity:0;transition:opacity .45s}
.td-hurt.is-on{opacity:1;transition:none}
@media (max-width:560px){.td-hud{gap:9px;padding:6px 12px 6px 8px}.td-sep{display:none}.td-stat{font-size:15px}.td-hp i{width:58px}.td-opt{width:86px}.td-btn{font-size:16px;padding:0 16px}.td-preview{max-width:62vw}}
\`;
ui.append(css);
ui.classList.add('td');
const ICON = {
  coin: '<svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.2" fill="#e9b949" stroke="#7a5212" stroke-width="1.4"/><circle cx="12" cy="12" r="6" fill="none" stroke="#fff0b0" stroke-width="1.2" opacity=".8"/><path d="M12 8.4v7.2" stroke="#7a5212" stroke-width="2" stroke-linecap="round"/></svg>',
  flag: '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 3v18" stroke="#c9a24a" stroke-width="2.2" stroke-linecap="round"/><path d="M7 4h11l-2.6 4L18 12H7z" fill="#b8282c" stroke="#5c1010" stroke-width=".8"/></svg>',
  keep: '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 21V8h3v2h2V8h2v2h2V8h2v2h2V8h3v13z" fill="#a49c8c" stroke="#3a342c" stroke-width="1.1"/><path d="M10 21v-5a2 2 0 0 1 4 0v5z" fill="#3a2a1e"/></svg>',
  cannon: '<svg width="32" height="32" viewBox="0 0 24 24"><circle cx="9" cy="14" r="6" fill="#2b2a2e" stroke="#000" stroke-width=".8"/><circle cx="7" cy="12" r="1.5" fill="#6d6a72"/><path d="M13.5 9.5 18 6.5" stroke="#c98a3a" stroke-width="2" stroke-linecap="round"/><circle cx="19.4" cy="5.4" r="1.9" fill="#ffb347"/></svg>',
  crystal: '<svg width="32" height="32" viewBox="0 0 24 24"><path d="M12 2l5 7-5 13-5-13z" fill="#6cc6ff" stroke="#1f5fbf" stroke-width="1.2" stroke-linejoin="round"/><path d="M12 2v20M7 9h10" stroke="#e6f7ff" stroke-width=".8" opacity=".75"/></svg>',
  archer: '<svg width="32" height="32" viewBox="0 0 24 24"><path d="M4 7c4-4 12-4 16 0" stroke="#8a5a2b" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M4 7l8 3 8-3" stroke="#d9cdb0" stroke-width=".9" fill="none"/><path d="M12 21V8" stroke="#6b4a2f" stroke-width="2.2" stroke-linecap="round"/><path d="M12 4l2 3h-4z" fill="#c9cfd8"/></svg>',
  up: '<svg width="32" height="32" viewBox="0 0 24 24"><path d="M12 3l7 8h-4v9H9v-9H5z" fill="#d9b25c" stroke="#6b4a12" stroke-width="1.2" stroke-linejoin="round"/></svg>',
  sell: '<svg width="32" height="32" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#e9b949" stroke="#7a5212" stroke-width="1.4"/><path d="M12 7v10M9 10l3-3 3 3" stroke="#7a5212" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>',
};
const hud = document.createElement('div');
hud.className = 'td-hud td-wood';
hud.innerHTML = \`<div class="td-stat" data-k="gold">\${ICON.coin}<b class="td-num"></b></div><i class="td-sep"></i>
<div class="td-stat" data-k="wave">\${ICON.flag}<b></b></div><i class="td-sep"></i>
<div class="td-stat td-hp" data-k="hp">\${ICON.keep}<i><u></u></i><b class="td-num"></b></div>\`;
ui.append(hud);
const hurt = document.createElement('div');
hurt.className = 'td-hurt';
ui.append(hurt);
const stat$ = (k) => hud.querySelector(\`[data-k="\${k}"]\`);
function bump(k) { const el = stat$(k); el.classList.remove('is-bump'); void el.offsetWidth; el.classList.add('is-bump'); }
function el(tag, cls, html) { const e = document.createElement(tag); e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
// 大標題與提示（自己畫，配合暗色奇幻的介面）
function banner(title, sub) {
  const b = el('div', 'td-banner td-wood');
  b.append(el('b', '', ''), el('span', '', ''));
  b.children[0].textContent = title; b.children[1].textContent = sub || '';
  ui.append(b);
  sfx('chime', .5);
  return new Promise((resolve) => setTimeout(() => { b.remove(); resolve(); }, 2400));
}
function toast(text) {
  ui.querySelectorAll('.td-toast').forEach((t) => t.remove());
  const t = el('div', 'td-toast td-wood');
  t.textContent = text;
  ui.append(t);
  setTimeout(() => t.remove(), 1850);
}
function button(cls, onPress) {
  const b = el('button', \`td-btn \${cls}\`);
  b.type = 'button';
  b.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); sfx('click', .45); onPress(); });
  b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPress(); } });
  ui.append(b);
  return b;
}

// ── 塔與怪物的數值 ──────────────────────────────────
const TOWERS = {
  cannon: { name: '砲塔', desc: '範圍爆炸', cost: 70, range: 4.3, rate: 1.75, dmg: 20, splash: 1.5, muzzle: 1.65 },
  crystal: { name: '秘法塔', desc: '冰凍減速', cost: 60, range: 4.1, rate: 1.0, dmg: 5, slow: .5, slowTime: 2.2, muzzle: 2.05 },
  archer: { name: '弩砲塔', desc: '射得快', cost: 50, range: 4.7, rate: .5, dmg: 7, muzzle: 2.45 },
};
const ORDER = ['cannon', 'crystal', 'archer'];
const ENEMIES = {
  slime: { name: '酸液史萊姆', hp: 22, speed: 1.45, gold: 4, armor: 0, hurt: 1, motion: 'hop', fx: 'goo' },
  goblin: { name: '獸人戰士', hp: 34, speed: 2.0, gold: 6, armor: 0, hurt: 1, motion: 'waddle', fx: 'dust' },
  beetle: { name: '巨甲蟲', hp: 62, speed: 1.05, gold: 9, armor: 5, hurt: 2, motion: 'waddle', fx: 'sparks' },
  boss: { name: '獸人督軍', hp: 520, speed: .8, gold: 60, armor: 3, hurt: 5, motion: 'waddle', fx: 'magic-burst', model: 'goblin', scale: 1.6 },
};
const MAX_LEVEL = 3;
function stat(t) {
  const b = TOWERS[t.type], k = t.level - 1;
  return {
    dmg: b.dmg * 1.6 ** k, range: b.range + .45 * k, rate: b.rate * .86 ** k,
    splash: (b.splash || 0) + .2 * k, slow: b.slow ? b.slow - .08 * k : 1, slowTime: (b.slowTime || 0) + .3 * k,
    slowArea: t.type === 'crystal' && t.level >= 3 ? 1.3 : 0,
  };
}
const upgradeCost = (t) => Math.round(TOWERS[t.type].cost * (t.level === 1 ? .8 : 1.25) / 5) * 5;
const sellValue = (t) => Math.round(t.spent * .6 / 5) * 5;

const S = { gold: START_GOLD, hp: CASTLE_HP, wave: 0, phase: 'build', kills: 0, speed: 1, spawnQueue: [], spawnT: 0, built: 0, waveHurt: 0, hpMul: 1, win: false };
const enemies = [];
const shots = [];
const towers = new Array(SPOTS.length).fill(null);
let pop = null;
function refreshHud() {
  stat$('gold').querySelector('b').textContent = S.gold;
  stat$('wave').querySelector('b').textContent = \`第 \${Math.max(1, S.wave)} / \${WAVES} 波\`;
  stat$('hp').querySelector('b').textContent = Math.max(0, S.hp);
  stat$('hp').querySelector('u').style.width = \`\${clamp(S.hp / CASTLE_HP, 0, 1) * 100}%\`;
  // 小視窗開著時，錢夠不夠也跟著變
  if (pop) for (const b of pop.el.querySelectorAll('[data-cost]')) b.disabled = S.gold < Number(b.dataset.cost);
}

// ── 石台 ──────────────────────────────────────────
const padGeo = new THREE.CylinderGeometry(.92, 1.02, .24, 10), padMat = std('#7e7a72', { flatShading: true }), padTop = std('#9a958b', { flatShading: true });
const padInner = new THREE.CylinderGeometry(.76, .78, .05, 10);
const markGeo = new THREE.RingGeometry(.5, .68, 32).rotateX(-Math.PI / 2);
const levelGeo = new THREE.TorusGeometry(.98, .07, 6, 32).rotateX(Math.PI / 2);
const levelMats = [null, glowMat('#cfd8e6', .95), glowMat('#ffc94a', 1)];
const spots = SPOTS.map(([x, z], i) => {
  const g = new THREE.Group();
  const pad = new THREE.Mesh(padGeo, padMat); pad.position.y = .12; pad.rotation.y = i;
  const top = new THREE.Mesh(padInner, padTop); top.position.y = .25; top.rotation.y = i;
  const mark = new THREE.Mesh(markGeo, glowMat('#ffc24a', .9)); mark.position.y = .29;
  const ring = new THREE.Mesh(levelGeo, levelMats[1]); ring.position.y = .22; ring.visible = false;
  g.add(pad, top, mark, ring);
  pad.castShadow = pad.receiveShadow = top.receiveShadow = true;
  g.position.set(x, 0, z);
  g.userData.spot = i;
  world.add(g);
  return { i, x, z, group: g, mark, ring };
});

// 射程圈
const rangeRing = new THREE.Group();
{
  const edge = new THREE.Mesh(new THREE.RingGeometry(.96, 1, 64).rotateX(-Math.PI / 2), glowMat('#ffffff', .55));
  const fill = new THREE.Mesh(new THREE.CircleGeometry(1, 48).rotateX(-Math.PI / 2), glowMat('#ffffff', .07));
  rangeRing.add(edge, fill);
  rangeRing.visible = false;
  larch.scene.add(rangeRing);
}
function showRange(spot, range, color) {
  rangeRing.visible = true;
  rangeRing.position.set(spot.x, .07, spot.z);
  rangeRing.scale.setScalar(range);
  rangeRing.children.forEach((m) => m.material.color.set(color));
}

// ── 怪物 ──────────────────────────────────────────
const barBg = new THREE.PlaneGeometry(1, .17), barFill = new THREE.PlaneGeometry(1, .1).translate(.5, 0, 0);
const barOpts = { transparent: true, depthTest: false, depthWrite: false, toneMapped: false };
const barBgMat = new THREE.MeshBasicMaterial({ ...barOpts, color: '#140d08', opacity: .85 });
const barArmorMat = new THREE.MeshBasicMaterial({ ...barOpts, color: '#8c9bb3', opacity: .95 });
const barMats = ['#e04a3a', '#e8b83a', '#7fd65a'].map((c) => new THREE.MeshBasicMaterial({ ...barOpts, color: c }));
const iceGeo = new THREE.RingGeometry(.3, .64, 24).rotateX(-Math.PI / 2), iceMat = glowMat('#9fe2ff', .8);
const auraMat = glowMat('#ff4a2a', .55);
const pool = { slime: [], goblin: [], beetle: [], boss: [] };
function makeEnemy(type) {
  const info = ENEMIES[type], key = info.model || type;
  const body = larch.clone(MODEL[key]);
  const scale = info.scale || 1;
  body.scale.setScalar(scale);
  const pivot = new THREE.Group();
  const ice = new THREE.Mesh(iceGeo, iceMat); ice.position.y = .05; ice.visible = false; ice.scale.setScalar(scale);
  pivot.add(body, ice);
  if (type === 'boss') {
    // 督軍：顏色深一點，腳下一圈紅光
    larch.tint(body, '#d99a8a');
    const aura = new THREE.Mesh(iceGeo, auraMat); aura.position.y = .06; aura.scale.setScalar(2.1);
    pivot.add(aura);
  }
  const bar = new THREE.Group();
  const w = type === 'boss' ? 1.7 : .9;
  const bg = new THREE.Mesh(barBg, info.armor >= 4 ? barArmorMat : barBgMat), fill = new THREE.Mesh(barFill, barMats[2]);
  bg.scale.x = w + .1; fill.scale.x = w; fill.position.set(-w / 2, 0, .001);
  bg.renderOrder = 60; fill.renderOrder = 61;
  bar.add(bg, fill);
  return { type, info, pivot, body, bar, fill, barW: w, ice, height: HEIGHT[key] * scale };
}
const tmp = new V3(), tmp2 = new V3();
function spawnEnemy(type, hpMul) {
  const e = pool[type].pop() || makeEnemy(type);
  const info = e.info;
  Object.assign(e, { d: 0, lane: (Math.random() - .5) * .7, hp: info.hp * hpMul, maxHp: info.hp * hpMul, slowT: 0, slowK: 1, alive: true, dying: 0, squash: 0, rise: 0, yaw: Math.atan2(pathDirs[0].x, pathDirs[0].z), wobble: Math.random() * 6 });
  larch.scene.add(e.pivot, e.bar);
  e.bar.visible = true;
  e.manual = !larch.animate(e.body, info.motion);
  e.fill.material = barMats[2];
  e.fill.scale.x = e.barW;
  e.ice.visible = false;
  enemies.push(e);
  placeEnemy(e, 0);
  flash(tmp.copy(spawnAt).setY(.6), '#9dff6a', 2.6);
  return e;
}
function placeEnemy(e, dt) {
  const dir = pathDir(e.d);
  pathPoint(e.d, e.pivot.position);
  e.pivot.position.x += -dir.z * e.lane; e.pivot.position.z += dir.x * e.lane;
  const want = Math.atan2(dir.x, dir.z);
  let diff = want - e.yaw; diff = Math.atan2(Math.sin(diff), Math.cos(diff));
  e.yaw += diff * Math.min(1, dt * 10);
  e.pivot.rotation.y = e.yaw;
  // 從召喚陣爬出來、被打到時壓扁一下
  e.rise = Math.min(1, e.rise + dt * 3);
  const sq = e.squash, r = e.rise;
  e.pivot.scale.set((1 + sq * .22) * r, (1 - sq * .26) * r, (1 + sq * .22) * r);
  if (e.manual) e.body.position.y = Math.abs(Math.sin(larch.time * 7 + e.wobble)) * (e.info.motion === 'hop' ? .3 : .08);
  e.bar.position.set(e.pivot.position.x, e.height + .45, e.pivot.position.z);
  e.bar.quaternion.copy(larch.camera.quaternion);
}
function removeEnemy(e) {
  e.alive = false;
  larch.scene.remove(e.pivot, e.bar);
  pool[e.type].push(e);
}
function hurtEnemy(e, dmg, ignoreArmor = false) {
  if (!e.alive || e.dying) return;
  const real = Math.max(1, dmg - (ignoreArmor ? 0 : e.info.armor));
  e.hp -= real;
  e.squash = 1;
  const k = clamp(e.hp / e.maxHp, 0, 1);
  e.fill.scale.x = e.barW * k;
  e.fill.material = barMats[k > .6 ? 2 : k > .3 ? 1 : 0];
  // 盔甲擋掉大部分傷害：閃一下白光
  if (e.info.armor >= 4 && !ignoreArmor && dmg < 12) flash(tmp.copy(e.pivot.position).setY(e.height * .6), '#ffffff', .8);
  if (e.hp <= 0) killEnemy(e);
}
function killEnemy(e) {
  e.dying = .001;
  e.bar.visible = false;
  const gain = e.info.gold + Math.floor(S.wave / 3);
  S.gold += gain; S.kills++;
  refreshHud(); bump('gold');
  const p = tmp.copy(e.pivot.position).setY(e.height * .5);
  larch.effect(e.info.fx, p, { scale: e.type === 'boss' ? 2 : .9 });
  if (e.type === 'boss') { larch.effect('dust', p, { scale: 2.5 }); larch.shake(.4, .45); }
  floatText(\`+\${gain}\`, p.setY(e.height + .6));
  sfx('pop', .45); sfx('coin', .35, .12);
}

// ── 塔 ───────────────────────────────────────────
function buildTower(spotIndex, type) {
  const spot = spots[spotIndex], info = TOWERS[type];
  if (towers[spotIndex] || S.gold < info.cost) { sfx('error', .5); return false; }
  S.gold -= info.cost; refreshHud(); bump('gold');
  const model = larch.clone(MODEL[type]);
  model.position.set(spot.x, .25, spot.z);
  model.scale.setScalar(.01);
  world.add(model);
  const t = { type, level: 1, spot, model, body: model.children[0] || model, cd: .3, spent: info.cost, aim: 0, kick: 0, glow: null };
  if (type === 'crystal') {
    t.glow = glowSprite('#5fb4ff', 1.8);
    t.glow.position.set(spot.x, .25 + HEIGHT.crystal * .8, spot.z);
    world.add(t.glow);
  }
  towers[spotIndex] = t;
  spot.mark.visible = false;
  larch.tween(model.scale, { x: 1, y: 1, z: 1 }, .45, 'outBack');
  larch.effect('dust', [spot.x, .3, spot.z], { scale: 1.3 });
  sfx('land', .7);
  if (++S.built === 1) setTip(null);
  return true;
}
function upgradeTower(t) {
  if (t.level >= MAX_LEVEL) return false;
  const cost = upgradeCost(t);
  if (S.gold < cost) { sfx('error', .5); return false; }
  S.gold -= cost; t.spent += cost; t.level++;
  refreshHud(); bump('gold');
  const s = 1 + (t.level - 1) * .12;
  larch.tween(t.model.scale, { x: s, y: s, z: s }, .4, 'outBack');
  t.spot.ring.visible = true;
  t.spot.ring.material = levelMats[t.level - 1];
  if (t.glow) t.glow.position.y = .25 + HEIGHT.crystal * .8 * s;
  larch.effect('level-up', [t.spot.x, .3, t.spot.z], { scale: 1.1 });
  sfx('levelup', .6);
  return true;
}
function sellTower(t) {
  const back = sellValue(t);
  S.gold += back;
  world.remove(t.model);
  if (t.glow) world.remove(t.glow);
  towers[t.spot.i] = null;
  t.spot.mark.visible = true;
  t.spot.ring.visible = false;
  refreshHud(); bump('gold');
  larch.effect('dust', [t.spot.x, .3, t.spot.z]);
  floatText(\`+\${back}\`, tmp.set(t.spot.x, 1.5, t.spot.z));
  sfx('coin', .5);
}
// 找射程裡走在最前面的怪物
function findTarget(t, range) {
  let best = null;
  for (const e of enemies) {
    if (!e.alive || e.dying) continue;
    const dx = e.pivot.position.x - t.spot.x, dz = e.pivot.position.z - t.spot.z;
    if (dx * dx + dz * dz <= range * range && (!best || e.d > best.d)) best = e;
  }
  return best;
}
function updateTower(t, dt) {
  const st = stat(t);
  t.cd -= dt;
  t.kick = Math.max(0, t.kick - dt * 4);
  t.body.scale.set(1 + t.kick * .06, 1 - t.kick * .1, 1 + t.kick * .06);
  if (t.glow) { t.glow.material.opacity = .5 + Math.sin(larch.time * 3 + t.spot.i) * .15 + t.kick * .5; t.glow.scale.setScalar(1.5 + t.kick * 1.4); }
  const target = findTarget(t, st.range);
  if (!target) return;
  if (t.type !== 'crystal') {
    // 砲塔、弩箭塔轉向目標
    const want = Math.atan2(target.pivot.position.x - t.spot.x, target.pivot.position.z - t.spot.z);
    let diff = want - t.aim; diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    t.aim += diff * Math.min(1, dt * 8);
    t.model.rotation.y = t.aim + AIM[t.type];
  }
  if (t.cd > 0) return;
  t.cd = st.rate;
  t.kick = 1;
  fire(t, target, st);
}

// ── 子彈：弩箭、砲彈、冰晶 ─────────────────────────────
const boltGeo = new THREE.CylinderGeometry(.045, .045, 1.0, 5).rotateX(Math.PI / 2);
const boltTipGeo = new THREE.ConeGeometry(.1, .26, 6).rotateX(Math.PI / 2).translate(0, 0, .62);
const boltFinGeo = new THREE.BoxGeometry(.2, .016, .22).translate(0, 0, -.42);
const ballGeo = new THREE.SphereGeometry(.22, 14, 10), orbGeo = new THREE.IcosahedronGeometry(.18, 1);
const shotMats = { wood: std('#6b4a2f'), steel: std('#c9ced8', { metalness: .6, roughness: .35 }), fin: std('#8a2a22'), ball: std('#4a3a32', { roughness: .45, metalness: .4, emissive: '#ff5a10', emissiveIntensity: .45 }), orb: std('#c8eeff', { emissive: '#3aa0ff', emissiveIntensity: 1.6, roughness: .2 }) };
function makeShot(kind) {
  const g = new THREE.Group();
  if (kind === 'arrow') g.add(new THREE.Mesh(boltGeo, shotMats.wood), new THREE.Mesh(boltTipGeo, shotMats.steel), new THREE.Mesh(boltFinGeo, shotMats.fin));
  if (kind === 'ball') { const b = new THREE.Mesh(ballGeo, shotMats.ball); b.castShadow = true; g.add(b, glowSprite('#ff8a2a', 1.1)); }
  if (kind === 'orb') g.add(new THREE.Mesh(orbGeo, shotMats.orb), glowSprite('#5fb4ff', 1.3));
  return { kind, obj: g, live: false, from: new V3(), to: new V3() };
}
const prevPos = new V3(), Z = new V3(0, 0, 1);
function fire(t, target, st) {
  const kind = t.type === 'archer' ? 'arrow' : t.type === 'cannon' ? 'ball' : 'orb';
  let s = shots.find((x) => !x.live && x.kind === kind);
  if (!s) { s = makeShot(kind); shots.push(s); }
  const scale = 1 + (t.level - 1) * .12;
  Object.assign(s, { live: true, t: 0, target, st, trail: 0 });
  s.from.set(t.spot.x, .25 + TOWERS[t.type].muzzle * scale, t.spot.z);
  s.to.copy(target.pivot.position).setY(target.height * .55);
  s.obj.position.copy(s.from);
  s.obj.visible = true;
  larch.scene.add(s.obj);
  const dist = Math.hypot(target.pivot.position.x - t.spot.x, target.pivot.position.z - t.spot.z);
  if (kind === 'ball') {
    // 砲彈：抓提前量，拋物線落在怪物等一下會走到的地方
    s.dur = .55 + dist * .06;
    pathPoint(target.d + target.info.speed * target.slowK * s.dur, s.to).setY(.1);
    s.arc = 1.3 + dist * .15;
    flash(s.from, '#ffb15a', 1.4);
    larch.effect('dust', s.from, { scale: .45 });
    sfx('jump', .3, .1);
  } else if (kind === 'arrow') {
    s.dur = .16 + dist * .045; s.arc = .25 + dist * .05;
    sfx('whoosh', .2, .09);
  } else {
    s.dur = .3 + dist * .08; s.arc = .5;
    sfx('chime', .16, .15);
  }
}
function updateShot(s, dt) {
  s.t += dt / s.dur;
  const e = s.target;
  if (s.kind !== 'ball' && e.alive && !e.dying) s.to.copy(e.pivot.position).setY(e.height * .55);
  const k = Math.min(1, s.t);
  prevPos.copy(s.obj.position);
  s.obj.position.lerpVectors(s.from, s.to, k);
  s.obj.position.y += Math.sin(k * Math.PI) * s.arc;
  if (s.kind === 'arrow') {
    tmp2.subVectors(s.obj.position, prevPos);
    if (tmp2.lengthSq() > 1e-6) s.obj.quaternion.setFromUnitVectors(Z, tmp2.normalize());
  } else if (s.kind === 'orb') s.obj.rotation.y += dt * 8;
  // 尾巴：砲彈冒煙、冰晶閃光、弩箭一條白線
  s.trail -= dt;
  if (s.trail <= 0 && s.t < 1) {
    s.trail = s.kind === 'ball' ? .03 : .018;
    if (s.kind === 'ball') puff(s.obj.position, '#bdb5aa', .5, .6, false);
    else if (s.kind === 'orb') puff(s.obj.position, '#7cc8ff', .55, .3, true);
    else puff(s.obj.position, '#ffe2b0', .24, .14, true);
  }
  if (s.t < 1) return;
  s.live = false; s.obj.visible = false;
  larch.scene.remove(s.obj);
  const st = s.st;
  if (s.kind === 'ball') {
    // 爆炸：範圍內的怪物都受傷
    flash(tmp.copy(s.to).setY(.45), '#ff9a3c', 3.6);
    flash(tmp.copy(s.to).setY(.09), '#ffc98a', st.splash * 1.15, true);
    larch.effect('dust', s.to, { scale: 1.1 });
    sfx('break', .38, .1);
    larch.shake(.08, .15);
    for (const o of enemies) {
      if (!o.alive || o.dying) continue;
      const dx = o.pivot.position.x - s.to.x, dz = o.pivot.position.z - s.to.z;
      if (dx * dx + dz * dz <= st.splash * st.splash) hurtEnemy(o, st.dmg);
    }
  } else if (s.kind === 'arrow') {
    if (e.alive && !e.dying) { hurtEnemy(e, st.dmg); sfx('hit', .16, .08); }
    flash(s.obj.position, '#ffe2b0', .6);
  } else {
    // 冰晶：減速（滿級時一小圈都減速），魔法不吃盔甲
    for (const o of enemies) {
      if (!o.alive || o.dying) continue;
      if (o !== e && !(st.slowArea && o.pivot.position.distanceTo(s.to) < st.slowArea)) continue;
      o.slowT = st.slowTime; o.slowK = st.slow; o.ice.visible = true;
      hurtEnemy(o, st.dmg, true);
    }
    larch.effect('frost', s.obj.position, { scale: st.slowArea ? 1 : .6 });
    flash(s.obj.position, '#8fd8ff', 1.4);
    if (st.slowArea) flash(tmp.copy(s.to).setY(.09), '#a8e4ff', st.slowArea, true);
  }
}

// ── 飄出來的字（拿到金幣、城堡受傷）、提示 ────────────────
const proj = new V3();
function toScreen(p) {
  proj.copy(p).project(larch.camera);
  return { x: (proj.x * .5 + .5) * ui.clientWidth, y: (-proj.y * .5 + .5) * ui.clientHeight, behind: proj.z > 1 };
}
function floatText(text, p, red = false) {
  if (ui.querySelectorAll('.td-float').length > 14) return;
  const s = toScreen(p);
  if (s.behind) return;
  const f = el('div', \`td-float\${red ? ' is-red' : ''}\`);
  f.textContent = text;
  f.style.left = \`\${s.x}px\`; f.style.top = \`\${s.y}px\`;
  ui.append(f);
  setTimeout(() => f.remove(), 950);
}
let tipEl = null;
function setTip(text) {
  if (!text) { tipEl?.remove(); tipEl = null; return; }
  if (!tipEl) { tipEl = el('div', 'td-tip td-wood'); ui.append(tipEl); }
  tipEl.textContent = text;
}

// ── 蓋塔／升級的小視窗（石板）────────────────────────
function closePop() {
  if (!pop) return;
  pop.el.remove(); pop = null;
  rangeRing.visible = false;
}
function openPop(spotIndex) {
  closePop();
  const spot = spots[spotIndex], t = towers[spotIndex];
  const box = el('div', 'td-pop td-stone');
  const coin = ICON.coin.replace(/"22"/g, '"16"');
  if (!t) {
    box.innerHTML = \`<h4><span>蓋一座塔</span><small>按 1・2・3</small></h4><div class="td-row">\${ORDER.map((k) => {
      const info = TOWERS[k];
      return \`<button type="button" class="td-opt" data-build="\${k}" data-cost="\${info.cost}" \${S.gold < info.cost ? 'disabled' : ''}>\${ICON[k]}<b>\${info.name}</b><span>\${info.desc}</span><em>\${coin}\${info.cost}</em></button>\`;
    }).join('')}</div>\`;
    showRange(spot, TOWERS.archer.range, '#ffe2a0');
  } else {
    const info = TOWERS[t.type], st = stat(t);
    const next = t.level < MAX_LEVEL ? upgradeCost(t) : 0;
    box.innerHTML = \`<h4><span>\${info.name}・\${'★'.repeat(t.level)}</span><small>\${t.level < MAX_LEVEL ? '按 U 升級' : '已經滿級'}</small></h4><div class="td-row">
      \${t.level < MAX_LEVEL ? \`<button type="button" class="td-opt" data-up data-cost="\${next}" \${S.gold < next ? 'disabled' : ''}>\${ICON.up}<b>升級</b><span>更強、更遠</span><em>\${coin}\${next}</em></button>\` : ''}
      <button type="button" class="td-opt sell" data-sell>\${ICON.sell}<b>賣掉</b><span>拿回金幣</span><em>+\${sellValue(t)}</em></button></div>\`;
    showRange(spot, st.range, t.type === 'crystal' ? '#9fe2ff' : t.type === 'cannon' ? '#ffb87a' : '#ffe2a0');
  }
  box.addEventListener('pointerdown', (ev) => {
    ev.stopPropagation();
    const b = ev.target.closest('button');
    if (!b) return;
    ev.preventDefault();
    if (b.disabled) { sfx('error', .4); return; }
    sfx('click', .4);
    if (b.dataset.build) buildTower(spotIndex, b.dataset.build);
    else if (b.hasAttribute('data-up')) upgradeTower(t);
    else if (b.hasAttribute('data-sell')) sellTower(t);
    closePop();
  });
  ui.append(box);
  pop = { el: box, spot, spotIndex };
  placePop();
}
function placePop() {
  if (!pop) return;
  const p = toScreen(tmp.set(pop.spot.x, 2.8, pop.spot.z));
  const w = pop.el.offsetWidth, h = pop.el.offsetHeight, W = ui.clientWidth, H = ui.clientHeight;
  const below = p.y - h < 64;
  pop.el.classList.toggle('is-below', below);
  const y = below ? toScreen(tmp.set(pop.spot.x, 0, pop.spot.z)).y + 18 : p.y;
  pop.el.style.left = \`\${clamp(p.x, w / 2 + 8, W - w / 2 - 8)}px\`;
  pop.el.style.top = \`\${below ? clamp(y, 8, H - h - 8) : clamp(y, h + 8, H - 8)}px\`;
}

// 點畫面：點到石台或塔就開視窗，點別的地方就關掉
larch.input.onTap((p) => {
  if (S.phase === 'over') return;
  let index = -1;
  const hit = larch.pick(p.x, p.y, [...spots.map((s) => s.group), ...towers.filter(Boolean).map((t) => t.model)]);
  for (let o = hit?.object; o && index < 0; o = o.parent) {
    if (o.userData.spot !== undefined) index = o.userData.spot;
    else { const t = towers.find((x) => x && x.model === o); if (t) index = t.spot.i; }
  }
  if (index < 0) {
    // 沒點準：找離點下去的地面最近的石台
    const g = larch.screenToGround(p.x, p.y, 0);
    let best = 1.6;
    if (g) for (const sp of spots) { const d = Math.hypot(sp.x - g.x, sp.z - g.z); if (d < best) { best = d; index = sp.i; } }
  }
  if (index < 0 || (pop && pop.spotIndex === index)) { closePop(); return; }
  sfx('click', .35);
  openPop(index);
});
larch.input.onKey((code, isDown) => {
  if (!isDown || S.phase === 'over') return;
  if (code === 'Escape') closePop();
  if ((code === 'KeyN' || code === 'Enter') && S.phase === 'build') startWave();
  if (code === 'KeyF') toggleSpeed();
  if (!pop) return;
  const t = towers[pop.spotIndex];
  const n = { Digit1: 0, Digit2: 1, Digit3: 2, Numpad1: 0, Numpad2: 1, Numpad3: 2 }[code];
  if (!t && n !== undefined && buildTower(pop.spotIndex, ORDER[n])) closePop();
  if (t && code === 'KeyU' && upgradeTower(t)) openPop(t.spot.i);
});

// ── 一波一波 ──────────────────────────────────────
function waveList(w) {
  let s = 1000 + w * 97;
  const r = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  const list = [], n = 5 + w * 2;
  for (let i = 0; i < n; i++) {
    const x = r();
    let type = 'slime';
    if (w >= 2 && x < .3 + w * .025) type = 'goblin';
    if (w >= 3 && x > .8 - w * .03) type = 'beetle';
    list.push({ type, gap: Math.max(.5, 1.05 - w * .05) });
  }
  // 每三波：中間來一小隊獸人衝鋒
  if (w % 3 === 0) list.splice(Math.floor(n / 2), 0, ...Array.from({ length: 4 }, () => ({ type: 'goblin', gap: .35 })));
  if (w === WAVES && WAVES >= 2) list.push({ type: 'boss', gap: 2.5 });
  return list;
}
const hpScale = (w) => 1 + .32 * (w - 1) + .03 * (w - 1) ** 2;
function preview(w) {
  const count = {};
  for (const x of waveList(w)) count[x.type] = (count[x.type] || 0) + 1;
  return Object.entries(count).map(([k, n]) => \`\${ENEMIES[k].name}×\${n}\`).join('、');
}
const nextBtn = button('next is-pulse', () => startWave());
const speedBtn = button('speed is-wood', () => toggleSpeed());
const previewEl = el('div', 'td-preview td-wood');
ui.append(previewEl);
function showNextButton(on) {
  nextBtn.hidden = !on; previewEl.hidden = !on;
  if (!on) return;
  nextBtn.innerHTML = \`<span>第 \${S.wave + 1} 波 ▶<small>N 或 Enter</small></span>\`;
  previewEl.textContent = \`下一波：\${preview(S.wave + 1)}\`;
}
function speedButton() {
  speedBtn.textContent = S.speed === 1 ? '快轉 ×2' : '正常速度';
  speedBtn.classList.toggle('is-on', S.speed !== 1);
}
function toggleSpeed() { S.speed = S.speed === 1 ? 2 : 1; speedButton(); }
function startWave() {
  if (S.phase !== 'build') return;
  S.wave++;
  S.phase = 'wave';
  S.waveHurt = 0;
  S.spawnQueue = waveList(S.wave);
  S.spawnT = .6;
  S.hpMul = hpScale(S.wave);
  showNextButton(false);
  setTip(null);
  refreshHud(); bump('wave');
  toast(S.wave === WAVES && WAVES >= 2 ? '最後一波！獸人督軍來了' : \`第 \${S.wave} 波來了！\`);
  sfx('whoosh', .5);
  larch.tween(gate.scale, { x: 1.25, y: 1.25, z: 1.25 }, .2, 'out').then(() => larch.tween(gate.scale, { x: 1, y: 1, z: 1 }, .5, 'outBack'));
}
function waveCleared() {
  const bonus = 8 + S.wave * 2;
  S.gold += bonus;
  refreshHud(); bump('gold');
  if (S.wave >= WAVES) { endGame(true); return; }
  S.phase = 'build';
  toast(S.waveHurt ? \`擋下第 \${S.wave} 波　+\${bonus} 金幣\` : \`完美防守！第 \${S.wave} 波　+\${bonus} 金幣\`);
  sfx('coin', .6);
  larch.effect('level-up', tmp.copy(castle.position).setY(.5), { scale: 1.6 });
  showNextButton(true);
}
function castleHit(e) {
  const hurtBy = e.info.hurt;
  S.hp -= hurtBy; S.waveHurt += hurtBy;
  refreshHud(); bump('hp');
  sfx('hit', .7, .05);
  larch.shake(.3, .3);
  larch.effect('dust', gateAt, { scale: 1.4 });
  floatText(\`-\${hurtBy}\`, tmp.copy(gateAt).setY(3), true);
  hurt.classList.add('is-on');
  setTimeout(() => hurt.classList.remove('is-on'), 120);
  const k = CASTLE_SCALE;
  larch.tween(castle.scale, { x: 1.05 * k, y: .93 * k, z: 1.05 * k }, .08, 'out').then(() => larch.tween(castle.scale, { x: k, y: k, z: k }, .35, 'outBack'));
  if (S.hp <= 0) endGame(false);
}

// ── 每一格 ────────────────────────────────────────
function step(dt) {
  if (S.phase === 'wave') {
    S.spawnT -= dt;
    if (S.spawnT <= 0 && S.spawnQueue.length) {
      const next = S.spawnQueue.shift();
      spawnEnemy(next.type, S.hpMul);
      S.spawnT = next.gap;
      if (next.type === 'boss') { sfx('boing', .7); larch.shake(.3, .6); }
    }
  }
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    if (e.dying) {
      // 倒下：壓扁、縮小、消失
      e.dying += dt / .3;
      const k = Math.min(1, e.dying);
      e.pivot.scale.set(1 + k * .5, Math.max(.01, 1 - k), 1 + k * .5);
      if (k >= 1) { removeEnemy(e); enemies.splice(i, 1); }
      continue;
    }
    if (e.slowT > 0) { e.slowT -= dt; if (e.slowT <= 0) { e.slowK = 1; e.ice.visible = false; } }
    e.d += e.info.speed * e.slowK * dt;
    e.squash = Math.max(0, e.squash - dt * 6);
    placeEnemy(e, dt);
    if (e.d >= PATH_LEN) { removeEnemy(e); enemies.splice(i, 1); castleHit(e); if (S.phase === 'over') return; }
  }
  for (const t of towers) if (t) updateTower(t, dt);
  for (const s of shots) if (s.live) updateShot(s, dt);
  if (S.phase === 'wave' && !S.spawnQueue.length && !enemies.length) waveCleared();
}
larch.onUpdate((dt, time) => {
  // 快轉時拆成小步算，子彈才不會穿過去
  if (S.phase !== 'over') {
    const total = dt * S.speed, n = Math.ceil(total / .034);
    for (let i = 0; i < n && S.phase !== 'over'; i++) step(total / n);
  }
  updateFx(dt);
  swirlDisc.rotation.y -= dt * 1.6;
  clouds.rotation.y += dt * .012;
  for (const t of torches) t.glow.material.opacity = .6 + Math.sin(time * 11 + t.phase) * .12 + Math.sin(time * 23 + t.phase * 2) * .08;
  for (const sp of spots) if (sp.mark.visible) sp.mark.material.opacity = .45 + Math.sin(time * 3 + sp.i * .7) * .35;
  placePop();
});

// ── 鏡頭：整塊地放得進畫面（直的手機轉 90 度，城堡在上面）────────
let lastPortrait = null;
const fitCam = new THREE.PerspectiveCamera();
const fitPts = [];
for (const sx of [-1, 1]) for (const sz of [-1, 1]) fitPts.push(new V3(ISLAND.x + sx * (ISLAND.w / 2 - 1.2), 0, ISLAND.z + sz * (ISLAND.h / 2 - 1.2)));
fitPts.push(CASTLE_AT.clone().setY(HEIGHT.castle * CASTLE_SCALE));
function fitCamera() {
  const W = ui.clientWidth || innerWidth, H = ui.clientHeight || innerHeight;
  const portrait = H > W * 1.05;
  if (portrait === lastPortrait) return;
  lastPortrait = portrait;
  const yaw = portrait ? -Math.PI / 2 : -.22, pitch = portrait ? 1.05 : .88;
  const target = new V3(.4, 0, portrait ? -.5 : -.1);
  fitCam.copy(larch.camera); fitCam.aspect = W / H; fitCam.updateProjectionMatrix();
  const fits = (dist) => {
    const c = Math.cos(pitch);
    fitCam.position.set(target.x + Math.sin(yaw) * c * dist, target.y + Math.sin(pitch) * dist, target.z + Math.cos(yaw) * c * dist);
    fitCam.lookAt(target); fitCam.updateMatrixWorld();
    return fitPts.every((p) => { proj.copy(p).project(fitCam); return Math.abs(proj.x) < .95 && proj.y < (portrait ? .74 : .8) && proj.y > (portrait ? -.78 : -.86); });
  };
  let lo = 8, hi = 90;
  for (let i = 0; i < 24; i++) { const mid = (lo + hi) / 2; if (fits(mid)) hi = mid; else lo = mid; }
  larch.orbitCamera({ target: [target.x, target.y, target.z], distance: hi, minDistance: hi * .45, maxDistance: hi * 1.25, pitch, yaw, minPitch: .5, maxPitch: 1.4 });
}
fitCamera();
addEventListener('resize', () => setTimeout(fitCamera, 60));

// ── 一局 ──────────────────────────────────────────
let finish = null;
function endGame(win) {
  if (S.phase === 'over') return;
  S.phase = 'over';
  S.win = win;
  closePop();
  for (const s of shots) if (s.live) { s.live = false; larch.scene.remove(s.obj); }
  showNextButton(false);
  speedBtn.hidden = true;
  finish?.();
}
function resetRound() {
  for (const e of enemies) removeEnemy(e);
  enemies.length = 0;
  for (const s of shots) { s.live = false; larch.scene.remove(s.obj); }
  for (const t of towers) if (t) { world.remove(t.model); if (t.glow) world.remove(t.glow); }
  towers.fill(null);
  for (const sp of spots) { sp.mark.visible = true; sp.ring.visible = false; }
  Object.assign(S, { gold: START_GOLD, hp: CASTLE_HP, wave: 0, phase: 'build', kills: 0, speed: 1, spawnQueue: [], built: 0, win: false });
  refreshHud();
  speedBtn.hidden = false;
  speedButton();
  showNextButton(true);
}
async function playRound() {
  resetRound();
  setTip('點發光的石台蓋第一座塔');
  await new Promise((resolve) => { finish = resolve; });
  const win = S.win;
  const score = win ? S.hp * 100 + S.kills * 10 + S.gold : S.kills * 10 + (S.wave - 1) * 50;
  setTip(null);
  if (win) {
    larch.effect('confetti', tmp.copy(castle.position).setY(4.8), { scale: 1.6 });
    larch.effect('level-up', tmp.copy(castle.position).setY(.4), { scale: 2.2 });
    sfx('levelup', .8);
  } else {
    larch.effect('dust', tmp.copy(castle.position).setY(1), { scale: 2.6 });
    larch.effect('magic-burst', tmp.copy(castle.position).setY(2), { scale: 1.6 });
    larch.shake(.7, .8);
    sfx('break', .8);
  }
  await banner(win ? '城堡守住了！' : '城堡失守…', win ? \`擋下全部 \${WAVES} 波・城堡還有 \${S.hp} 血・得分 \${score}\` : \`撐到第 \${S.wave} 波・擊倒 \${S.kills} 隻怪物・得分 \${score}\`);
  return { win, score };
}


refreshHud();
speedButton();
showNextButton(false);
speedBtn.hidden = true;
await banner('城堡守衛戰', '在路旁的石台蓋塔，擋住一波波怪物！');
for (;;) {
  const { win, score } = await playRound();
  const again = await larch.choose(win ? \`守城成功！得分 \${score}。要再守一次嗎？\` : \`城堡失守了，得分 \${score}。要再挑戰一次嗎？\`, ['再玩一次', '結束']);
  if (again !== 0) { larch.complete({ score, result: win ? 'win' : 'lose' }); break; }
}
`,windmill:`// ═══════════════════════════════════════════════════════════════════════════
// 像素風車島 Pixel Windmill Isle：3D 小遊戲卡的範例（像素藝術立體模型風）
// 整座浮空小島都是程式一格一格堆出來的像素方塊（一格 = 1/8 公尺），光影直接「畫」進每一格的顏色：
// 夕陽 → 黃昏 → 夜晚，窗戶和路燈亮起來、螢火蟲出來。
// 玩法：WASD／方向鍵（手機用搖桿）或點地面讓小農夫走過去；走過成熟的作物就收成，連續收成有連擊加分。
// 籃子滿了送到小屋旁的木箱；烏鴉會飛下來偷吃，走近牠或按空白鍵（手機按「吆喝」）把牠趕走。
// 晚上會出現金色螢火蟲，碰到加分。一局 90 秒（作者可以在參數調）。
// 不用任何模型檔：方塊、貼圖、粒子都是這份程式畫的。
// ═══════════════════════════════════════════════════════════════════════════

const P = larch.params;
const PHONE = larch.phone;
const scene = larch.scene, camera = larch.camera;
const V3 = THREE.Vector3, TAU = Math.PI * 2;
const num = (v, d, lo, hi) => { const n = Number(v); return v !== '' && v !== null && v !== undefined && Number.isFinite(n) ? Math.max(lo, Math.min(hi, n)) : d; };
const SECONDS = num(P.seconds, 90, 20, 600);           // 一局幾秒
const BASKET = Math.round(num(P.basket, 8, 3, 30));    // 籃子裝幾個
const MAX_CROWS = Math.round(num(P.crows, 3, 0, 6));   // 同時最多幾隻烏鴉
const SPEED = num(P.speed, 4.2, 2, 10);                // 農夫走路速度（公尺／秒）
const OVERALLS = /^#[0-9a-f]{6}$/i.test(String(P.overalls || '')) ? String(P.overalls) : '#2f86d8';
const PX = 1 / 8;                                      // 一個像素方塊的邊長
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

// 遊戲用的亂數有種子（錄影、測試時每次都一樣）；地形用的是固定的雜湊，小島永遠長一樣
let seedState = 20261116;
const rng = () => { seedState = (seedState * 16807) % 2147483647; return (seedState - 1) / 2147483646; };
const R = (a = 0, b = 1) => a + rng() * (b - a);
const reseed = (s) => { seedState = (Math.floor(Math.abs(Number(s) || 1)) % 2147483645) + 1; };
reseed(Math.floor(Math.random() * 1e9));
const H = (x, y, z) => {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(z | 0, 1103515245);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};
function vnoise(x, z, s = 0) {   // 平滑的雜訊（土層、草地深淺、鐘乳石）
  const xi = Math.floor(x), zi = Math.floor(z), fx = x - xi, fz = z - zi;
  const u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
  const a = H(xi, s, zi), b = H(xi + 1, s, zi), c = H(xi, s, zi + 1), d = H(xi + 1, s, zi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

// ── 畫面：黑色的虛空，只有小島自己在發光 ─────────────────────────────────────
larch.music(P.bgm, { volume: .5 });
larch.sky('#0b0a12');
larch.setLook({ hour: 17.5, look: 'natural', bloom: .75, exposure: 1.08, fog: 0, clouds: 0 });

// ═══════════════════════════ 1. 調色盤（像素畫只用少少的顏色）═══════════════════════════
// 名字、顏色、旗標（s＝小裝飾，不擋路；g＝自己會發光：窗戶、燈、水晶）
const ovDark = new THREE.Color(OVERALLS).multiplyScalar(.55);
const PAL_SRC = [
  ['g0', '#193c3e'], ['g1', '#265c42'], ['g2', '#3e8948'], ['g3', '#63c74d'], ['g4', '#94d65a'], ['g5', '#c8ec7c'],
  ['d0', '#3e2731'], ['d1', '#5a3530'], ['d2', '#733e39'], ['d3', '#9c5a41'], ['d4', '#b86f50'], ['d5', '#c28569'], ['d6', '#e4a672'], ['d7', '#ead4aa'],
  ['s0', '#181425'], ['s1', '#262b44'], ['s2', '#3a4466'], ['s3', '#5a6988'], ['s4', '#8b9bb4'], ['s5', '#c0cbdc'], ['wh', '#ffffff'],
  ['r0', '#a22633'], ['r1', '#e43b44'], ['o0', '#be4a2f'], ['o1', '#f77622'], ['o2', '#d77643'], ['y1', '#feae34'], ['y2', '#fee761'],
  ['b0', '#124e89'], ['b1', '#0099db'], ['b2', '#2ce8f5'],
  ['p0', '#68386c'], ['p1', '#b55088'], ['p2', '#f6757a'], ['p3', '#e8b796'], ['p4', '#ffc2d4'],
  ['ov', OVERALLS], ['ov2', \`#\${ovDark.getHexString()}\`],
  ['tuft', '#94d65a', 's'], ['tuft2', '#c8ec7c', 's'], ['stem', '#3e8948', 's'],
  ['flP', '#f6757a', 's'], ['flW', '#ffffff', 's'], ['flY', '#fee761', 's'], ['flB', '#7ec8ff', 's'], ['flV', '#b55088', 's'],
  ['reed', '#3e8948', 's'], ['cat', '#733e39', 's'], ['pebble', '#8b9bb4', 's'], ['pad', '#63c74d', 's'], ['padF', '#f6757a', 's'], ['shroom', '#e43b44', 's'], ['shroomW', '#ead4aa', 's'],
  ['Lwin', '#ffc861', 'g'], ['Lwin2', '#ff9f43', 'g'], ['Llamp', '#fff1a6', 'g'], ['Lcrys', '#5ff2ff', 'g'], ['Lcrys2', '#c79bff', 'g'], ['Lflag', '#e43b44'],
];
const PAL = [null], PI = {}, SOFT = new Uint8Array(256), GLOW = new Uint8Array(256);
for (const [name, hex, flags = ''] of PAL_SRC) {
  const i = PAL.length;
  PAL.push(new THREE.Color(hex));   // three 會換成線性色彩
  PI[name] = i;
  if (flags.includes('s')) SOFT[i] = 1;
  if (flags.includes('g')) GLOW[i] = 1;
}

// ═══════════════════════════ 2. 像素方塊：格子、把格子變成網格、光影 ═══════════════════════════
function Grid(nx, ny, nz, ox, oy, oz) { return { nx, ny, nz, ox, oy, oz, d: new Uint8Array(nx * ny * nz) }; }
function gset(g, x, y, z, v) {
  x += g.ox; y += g.oy; z += g.oz;
  if (x < 0 || y < 0 || z < 0 || x >= g.nx || y >= g.ny || z >= g.nz) return;
  g.d[x + g.nx * (z + g.nz * y)] = v;
}
function gget(g, x, y, z) {
  x += g.ox; y += g.oy; z += g.oz;
  if (x < 0 || y < 0 || z < 0 || x >= g.nx || y >= g.ny || z >= g.nz) return 0;
  return g.d[x + g.nx * (z + g.nz * y)];
}
const NB = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
const QUAD = [
  [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]], [[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]],
  [[0, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 0]], [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]],
  [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]], [[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0]],
];
const TAN = [[[0, 1, 0], [0, 0, 1]], [[0, 1, 0], [0, 0, 1]], [[1, 0, 0], [0, 0, 1]], [[1, 0, 0], [0, 0, 1]], [[1, 0, 0], [0, 1, 0]], [[1, 0, 0], [0, 1, 0]]];
const unit = (x, y, z) => { const l = Math.hypot(x, y, z); return [x / l, y / l, z / l]; };
// 光：夕陽從左前方低低地照過來（影子拉得很長）；晚上月光從右後方、高高的；燈是暖黃色
const LIGHT = {
  amb: [.4, .33, .5], sun: [1.16, .8, .5], sunDir: unit(-.6, .44, .66),
  ambN: [.055, .07, .18], moon: [.17, .24, .52], moonDir: unit(.52, .78, -.36),
  lamp: [1.2, .68, .3],
};

/**
 * 把一個格子變成網格：每個露在外面的方塊面一片，顏色在這裡就算好（夕陽版、夜晚版各一份）——
 * 方向（頂面亮、背光面偏紫）、角落的陰影（AO）、太陽和月亮的影子、燈光（一圈一圈、邊緣用像素混色）。
 * 發光的方塊（窗戶、燈）另外放一個網格，晚上會亮起來。
 */
function meshGrid(g, o = {}) {
  const { nx, ny, nz, d } = g;
  const S = PX, sh = o.shift || [0, 0, 0];
  const sx = sh[0] - g.ox, sy = sh[1] - g.oy, sz = sh[2] - g.oz;
  const lamps = o.lamps || [];
  const at = (x, y, z) => (x < 0 || y < 0 || z < 0 || x >= nx || y >= ny || z >= nz) ? 0 : d[x + nx * (z + nz * y)];
  let yTop = 0;
  for (let i = d.length - 1; i >= 0; i--) if (d[i]) { yTop = Math.floor(i / (nx * nz)) + 1; break; }
  const blocked = (x, y, z, n, dir, steps) => {
    let px = x + .5 + n[0] * .55, py = y + .5 + n[1] * .55, pz = z + .5 + n[2] * .55;
    const dx = dir[0] * .75, dy = dir[1] * .75, dz = dir[2] * .75;
    for (let s = 0; s < steps; s++) {
      px += dx; py += dy; pz += dz;
      if (py >= yTop || px < 0 || pz < 0 || px >= nx || pz >= nz || py < 0) return false;
      if (d[(px | 0) + nx * ((pz | 0) + nz * (py | 0))]) return true;
    }
    return false;
  };
  const pos = [], col = [], coln = [], idx = [], gpos = [], gcol = [], gidx = [];
  const SD = LIGHT.sunDir, MD = LIGHT.moonDir, A = LIGHT.amb, SU = LIGHT.sun, AN = LIGHT.ambN, MO = LIGHT.moon, LA = LIGHT.lamp;
  for (let y = 0; y < ny; y++) for (let z = 0; z < nz; z++) {
    const row = nx * (z + nz * y);
    for (let x = 0; x < nx; x++) {
      const v = d[row + x];
      if (!v) continue;
      const alb = PAL[v];
      // 夜晚的顏色先褪一半的色（月光底下東西偏灰藍），燈光照到的地方用原本的顏色
      const lum = alb.r * .3 + alb.g * .55 + alb.b * .15, nr = lerp(alb.r, lum, .5), ng = lerp(alb.g, lum, .5), nb = lerp(alb.b, lum, .5);
      for (let f = 0; f < 6; f++) {
        const n = NB[f];
        if (at(x + n[0], y + n[1], z + n[2])) continue;
        const q = QUAD[f];
        if (GLOW[v]) {
          const k = f === 2 ? 1 : f === 3 ? .55 : .82;
          const b = gpos.length / 3;
          for (let c = 0; c < 4; c++) { gpos.push((x + q[c][0] + sx) * S, (y + q[c][1] + sy) * S, (z + q[c][2] + sz) * S); gcol.push(alb.r * k, alb.g * k, alb.b * k); }
          gidx.push(b, b + 1, b + 2, b, b + 2, b + 3);
          continue;
        }
        // 角落陰影：這一面外面那一層，旁邊有幾格被擋住
        const ax = x + n[0], ay = y + n[1], az = z + n[2], t1 = TAN[f][0], t2 = TAN[f][1];
        let occ = 0, occd = 0;
        if (at(ax + t1[0], ay + t1[1], az + t1[2])) occ++;
        if (at(ax - t1[0], ay - t1[1], az - t1[2])) occ++;
        if (at(ax + t2[0], ay + t2[1], az + t2[2])) occ++;
        if (at(ax - t2[0], ay - t2[1], az - t2[2])) occ++;
        if (at(ax + t1[0] + t2[0], ay + t1[1] + t2[1], az + t1[2] + t2[2])) occd++;
        if (at(ax - t1[0] + t2[0], ay - t1[1] + t2[1], az - t1[2] + t2[2])) occd++;
        if (at(ax + t1[0] - t2[0], ay + t1[1] - t2[1], az + t1[2] - t2[2])) occd++;
        if (at(ax - t1[0] - t2[0], ay - t1[1] - t2[1], az - t1[2] - t2[2])) occd++;
        const ao = Math.max(.4, 1 - .1 * occ - .05 * occd);
        const jit = 1 + (H(x, y, z) - .5) * .09;
        const kd = (.8 + .2 * n[1]) * ao;
        const ls = n[0] * SD[0] + n[1] * SD[1] + n[2] * SD[2];
        let sun = ls > 0 ? ls : 0;
        if (sun > 0 && o.shadows && blocked(x, y, z, n, SD, 170)) sun = 0;
        const lm = n[0] * MD[0] + n[1] * MD[1] + n[2] * MD[2];
        let moon = lm > 0 ? lm : 0;
        if (moon > 0 && o.shadows && blocked(x, y, z, n, MD, 70)) moon = 0;
        // 迎著夕陽的頂面邊緣，亮一條細細的邊
        let rim = 0;
        if (f === 2 && sun > 0 && ((!at(x - 1, y, z) && !at(x - 1, y + 1, z)) || (!at(x, y, z + 1) && !at(x, y + 1, z + 1)))) rim = .16;
        // 燈光：一圈一圈，邊緣用雜湊混色（像素畫的漸層）
        let lamp = 0;
        for (const L of lamps) {
          const cx = x + .5 + n[0] * .5, cy = y + .5 + n[1] * .5, cz = z + .5 + n[2] * .5;
          const dx = L.x - cx, dy = L.y - cy, dz = L.z - cz, dist = Math.hypot(dx, dy, dz);
          if (dist >= L.r) continue;
          const nd = (dx * n[0] + dy * n[1] + dz * n[2]) / Math.max(.01, dist);
          if (nd < .02) continue;
          lamp += L.k * Math.pow(1 - dist / L.r, 1.3) * (.15 + .85 * nd);
        }
        if (lamp > 0) lamp = Math.floor(Math.min(1.6, lamp) * 3.2 + H(x + 7, y + 3, z) * .9) / 3.2;
        const r0 = alb.r * ((A[0] * kd + SU[0] * sun) * jit + rim), g0 = alb.g * ((A[1] * kd + SU[1] * sun) * jit + rim * .8), b0 = alb.b * ((A[2] * kd + SU[2] * sun) * jit + rim * .5);
        const nl = o.nightLamp ?? NIGHT_LAMP;
        if (nl) lamp = nl * (.55 + .45 * Math.max(0, n[2]) + .25 * Math.max(0, n[1]));
        const r1 = nr * (AN[0] * kd + MO[0] * moon) * jit + alb.r * LA[0] * lamp, g1 = ng * (AN[1] * kd + MO[1] * moon) * jit + alb.g * LA[1] * lamp, b1 = nb * (AN[2] * kd + MO[2] * moon) * jit + alb.b * LA[2] * lamp;
        const b = pos.length / 3;
        for (let c = 0; c < 4; c++) { pos.push((x + q[c][0] + sx) * S, (y + q[c][1] + sy) * S, (z + q[c][2] + sz) * S); col.push(r0, g0, b0); coln.push(r1, g1, b1); }
        idx.push(b, b + 1, b + 2, b, b + 2, b + 3);
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  geo.setAttribute('colorNight', new THREE.Float32BufferAttribute(coln, 3));
  geo.setIndex(pos.length / 3 > 65535 ? new THREE.Uint32BufferAttribute(idx, 1) : new THREE.Uint16BufferAttribute(idx, 1));
  geo.computeBoundingSphere();
  let glow = null;
  if (gpos.length) {
    glow = new THREE.BufferGeometry();
    glow.setAttribute('position', new THREE.Float32BufferAttribute(gpos, 3));
    glow.setAttribute('color', new THREE.Float32BufferAttribute(gcol, 3));
    glow.setIndex(gidx);
    glow.computeBoundingSphere();
  }
  return { geo, glow, faces: idx.length / 6 };
}

// 材質：夕陽版和夜晚版的顏色在 GPU 上混（uNight 0→1），整體再乘一個隨時間變的色調（uDay）
const U = { night: { value: 0 }, day: { value: new THREE.Color(1, 1, 1) } };
const voxMat = new THREE.MeshBasicMaterial({ vertexColors: true, fog: false });
voxMat.onBeforeCompile = (sh) => {
  sh.uniforms.uNight = U.night; sh.uniforms.uDay = U.day;
  sh.vertexShader = sh.vertexShader
    .replace('#include <color_pars_vertex>', '#include <color_pars_vertex>\\nattribute vec3 colorNight;\\nuniform float uNight;\\nuniform vec3 uDay;')
    .replace('#include <color_vertex>', '#include <color_vertex>\\nvColor.rgb = mix(color.rgb * uDay, colorNight, uNight);\\n#ifdef USE_INSTANCING_COLOR\\nvColor.rgb *= instanceColor.rgb;\\n#endif');
};
voxMat.customProgramCacheKey = () => 'larch-pixel-voxel';
const glowMat = new THREE.MeshBasicMaterial({ vertexColors: true, fog: false });   // color 每一格跟著天色變亮
let NIGHT_LAMP = 0;   // 會動的小模型晚上自己帶一點暖光（農夫提著燈籠、作物在燈籠旁邊才看得到）
function voxModel(w, h, dd, ox, oy, oz, fill, o = {}) {
  const g = Grid(w, h, dd, ox, oy, oz);
  fill((x, y, z, name) => gset(g, x, y, z, typeof name === 'number' ? name : (PI[name] || 0)));
  return meshGrid(g, o);
}
function voxObject(model) {
  const grp = new THREE.Group();
  grp.add(new THREE.Mesh(model.geo, voxMat));
  if (model.glow) grp.add(new THREE.Mesh(model.glow, glowMat));
  return grp;
}

// ═══════════════════════════ 3. 浮空小島：草地、土層、底下尖尖的岩石 ═══════════════════════════
// 世界的格子：x −84…83、y −80…71、z −68…67（單位是方塊；y = 0 是地面）
const W = Grid(168, 152, 136, 84, 80, 68);
const ws = (x, y, z, v) => gset(W, x, y, z, typeof v === 'string' ? PI[v] : v);
const wg = (x, y, z) => gget(W, x, y, z);
const FW = 168, FD = 136, FX = 84, FZ = 68;
const fi = (x, z) => (x + FX) + FW * (z + FZ);
const vx = (u) => Math.round(u * 8);   // 公尺 → 方塊

// 小島的形狀：圓圓的方塊（半公尺一階，邊緣才有像素的階梯感）
function inIsland(ux, uz) {
  const a = Math.atan2(uz, ux);
  const rx = 9.1 + .55 * Math.sin(3 * a + 1.1) + .3 * Math.sin(7 * a + .4);
  const rz = 6.9 + .45 * Math.sin(4 * a + 2) + .25 * Math.sin(6 * a + 1.3);
  return Math.pow(Math.abs(ux) / rx, 2.3) + Math.pow(Math.abs(uz) / rz, 2.3) <= 1;
}
// 後面的小土坡（不能走，種樹）
function raiseAt(ux, uz) {
  if (uz < -5.1 + .5 * Math.sin(ux * .9) && ux > -2.4 && ux < 3.6) return uz < -6 && ux > -1.2 && ux < 2.6 ? 8 : 4;
  return 0;
}
const FOOT = new Uint8Array(FW * FD), TOP = new Int16Array(FW * FD), EDGE = new Int16Array(FW * FD), SURF = new Uint8Array(FW * FD);
for (let z = -FZ; z < FD - FZ; z++) for (let x = -FX; x < FW - FX; x++) {
  const cx = (Math.floor(x / 4) * 4 + 2) / 8, cz = (Math.floor(z / 4) * 4 + 2) / 8;
  if (!inIsland(cx, cz)) continue;
  FOOT[fi(x, z)] = 1;
  TOP[fi(x, z)] = raiseAt(cx, cz);
}
{ // 每一格離邊緣多遠（底下的岩石越往中間越深）
  const q = new Int32Array(FW * FD); let head = 0, tail = 0;
  EDGE.fill(-1);
  for (let i = 0; i < FW * FD; i++) if (!FOOT[i]) { EDGE[i] = 0; q[tail++] = i; }
  while (head < tail) {
    const i = q[head++], x = i % FW, z = (i / FW) | 0;
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const X = x + dx, Z = z + dz;
      if (X < 0 || Z < 0 || X >= FW || Z >= FD) continue;
      const j = X + FW * Z;
      if (EDGE[j] < 0) { EDGE[j] = EDGE[i] + 1; q[tail++] = j; }
    }
  }
}

// ── 地面的樣子：草地、小路、田、池塘邊的沙 ──
const SURF_GRASS = 0, SURF_PATH = 1, SURF_SOIL = 2, SURF_BORDER = 3, SURF_SAND = 4, SURF_STONE = 5;
const PATHS = [
  [[-4.75, -1.6], [-4.7, -.5], [-4.1, .8], [-3.1, 1.5], [4, 1.5], [4.45, .5], [4.55, -.7], [5.1, -1.7], [5.6, -2.2]],
  [[-4.1, .8], [-3.7, 2.3], [-3.6, 3.6], [-4.0, 4.8]],
  [[-4.7, -.5], [-3.2, -.9], [-2.2, -1.3]],
];
const PATH_W = .44;
function distToPath(ux, uz) {
  let best = 99;
  for (const pl of PATHS) for (let k = 0; k + 1 < pl.length; k++) {
    const [ax, az] = pl[k], [bx, bz] = pl[k + 1];
    const dx = bx - ax, dz = bz - az, t = clamp(((ux - ax) * dx + (uz - az) * dz) / (dx * dx + dz * dz), 0, 1);
    best = Math.min(best, Math.hypot(ux - ax - dx * t, uz - az - dz * t));
  }
  return best;
}
// 田：兩塊 6×2 的田（麥子、胡蘿蔔），風車旁一小塊南瓜田
const PLOTS = [
  { x0: -2.5, z0: -1, w: 6, d: 2, types: ['wheat', 'wheat'] },
  { x0: -2.5, z0: 2, w: 6, d: 2, types: ['carrot', 'carrot'] },
  { x0: 5, z0: 0, w: 2, d: 2, types: ['pumpkin', 'pumpkin'] },
];
const POND = { x: -5.9, z: 3.0, rx: 1.95, rz: 1.35 };
const STREAM_X = -5.6;
const inPond = (ux, uz, k = 1) => ((ux - POND.x) / (POND.rx * k)) ** 2 + ((uz - POND.z) / (POND.rz * k)) ** 2 <= 1;
for (let z = -FZ; z < FD - FZ; z++) for (let x = -FX; x < FW - FX; x++) {
  const i = fi(x, z);
  if (!FOOT[i] || TOP[i]) continue;
  const ux = (x + .5) / 8, uz = (z + .5) / 8;
  let s = SURF_GRASS;
  if (distToPath(ux, uz) < PATH_W + (vnoise(x / 3, z / 3, 9) - .5) * .18) s = SURF_PATH;
  for (const p of PLOTS) {
    if (ux >= p.x0 - .12 && ux < p.x0 + p.w + .12 && uz >= p.z0 - .12 && uz < p.z0 + p.d + .12) s = (ux >= p.x0 && ux < p.x0 + p.w && uz >= p.z0 && uz < p.z0 + p.d) ? SURF_SOIL : SURF_BORDER;
  }
  if (inPond(ux, uz, 1.28) || (Math.abs(ux - STREAM_X) < .62 && uz > POND.z && uz < 7.5)) s = SURF_SAND;
  if (ux > -5.25 && ux < -4.25 && uz > -1.75 && uz < -1.2) s = SURF_STONE;   // 門口的石階
  SURF[i] = s;
}

// ── 一格一格填土：最上面是草（邊緣垂下來一點），下面是一層一層的土，再下面是岩石 ──
function groundColor(x, z, s) {
  const h = H(x, 5, z), n = vnoise(x / 5, z / 5, 1) + (h - .5) * .35;
  if (s === SURF_PATH) return h > .93 ? 'pebble' : n < .35 ? 'd5' : h > .7 ? 'd7' : 'd6';
  if (s === SURF_SOIL) { const lz = ((z % 4) + 4) % 4; return lz === 1 || lz === 2 ? (h > .8 ? 'd4' : 'd3') : (h > .7 ? 'd1' : 'd2'); }
  if (s === SURF_BORDER) return h > .5 ? 'd2' : 'd1';
  if (s === SURF_SAND) return h > .85 ? 'd6' : h > .2 ? 'd7' : 'd5';
  if (s === SURF_STONE) return ((x >> 1) + (z >> 1)) % 2 ? 's4' : 's5';
  return n < .22 ? 'g2' : n > .8 ? (h > .7 ? 'g5' : 'g4') : h > .985 ? 'g5' : 'g3';
}
for (let z = -FZ; z < FD - FZ; z++) for (let x = -FX; x < FW - FX; x++) {
  const i = fi(x, z);
  if (!FOOT[i]) continue;
  const top = TOP[i], e = EDGE[i];
  const stal = Math.floor(Math.pow(vnoise(x / 6, z / 6, 3), 2) * 16 + Math.pow(vnoise(x / 2.5, z / 2.5, 4), 4) * 14);
  const bottom = -Math.min(78, 22 + Math.floor(e * .86) + stal);
  const drip = 1 + (H(x, 1, z) > .45 ? 1 : 0) + (H(x, 2, z) > .8 ? 2 : 0) + (H(x, 3, z) > .96 ? 2 : 0);
  for (let y = bottom; y < top; y++) {
    const dy = top - 1 - y;   // 從地面往下第幾格
    let c;
    if (dy === 0) c = top > 0 ? groundColor(x, z, SURF_GRASS) : groundColor(x, z, SURF[i]);
    else if (dy <= drip && (top > 0 || SURF[i] === SURF_GRASS)) c = H(x, y, z) > .6 ? 'g2' : 'g3';
    else if (dy < 26 + (top > 0 ? 4 : 0)) {
      const band = Math.floor((dy + vnoise(x / 4, z / 4, 7) * 3) / 3) % 4;
      const h = H(x, y, z);
      c = h > .965 ? (h > .985 ? 's4' : 's3') : ['d4', 'd3', 'd5', 'd2'][band];
      if (h < .03) c = 'd1';
    } else {
      const h = H(x, y, z), n = vnoise(x / 3 + y * .2, z / 3, 8);
      c = n > .68 ? 's4' : n < .22 ? 's2' : 's3';
      if (h > .97) c = 's4';
      if (dy < 32 && h < .08) c = 'g2';   // 岩石上緣長一點苔蘚
    }
    ws(x, y, z, c);
  }
  // 最尖的地方掛著會發光的小水晶（晚上很漂亮）
  if (e > 3 && H(x, 9, z) > .978) { const len = 1 + Math.floor(H(x, 10, z) * 3); for (let k = 1; k <= len; k++) ws(x, bottom - k, z, H(x, 11, z) > .5 ? 'Lcrys' : 'Lcrys2'); }
}
// 池塘：挖下去兩格，底部深色，邊上有石頭、蘆葦、蓮葉；小溪一路流到小島邊緣變成瀑布
let FALL_Z = 0;
for (let z = -FZ; z < FD - FZ; z++) for (let x = -FX; x < FW - FX; x++) {
  const i = fi(x, z); if (!FOOT[i]) continue;
  const ux = (x + .5) / 8, uz = (z + .5) / 8;
  const pond = inPond(ux, uz), stream = Math.abs(ux - STREAM_X) < .38 && uz > POND.z;
  if (!pond && !stream) continue;
  ws(x, -1, z, 0); ws(x, -2, z, 0);
  const deep = pond && inPond(ux, uz, .6);
  ws(x, -3, z, deep ? 'g0' : (H(x, 4, z) > .5 ? 'g1' : 'g0'));
  if (stream) FALL_Z = Math.max(FALL_Z, z);
}
for (let z = 0; z < 60; z++) { const x = vx(STREAM_X); if (FOOT[fi(x, z)]) FALL_Z = Math.max(FALL_Z, z); }
for (const [ux, uz, c] of [[-6.9, 2.6, 'pad'], [-5.4, 3.5, 'pad'], [-6.2, 3.7, 'pad'], [-4.9, 2.6, 'pad']]) {
  const x0 = vx(ux), z0 = vx(uz);
  for (const [dx, dz] of [[0, 0], [1, 0], [0, 1], [1, 1], [-1, 0], [0, -1]]) ws(x0 + dx, -2, z0 + dz, c);
  if (H(x0, 1, z0) > .4) ws(x0, -2, z0, 'padF');
}

// ═══════════════════════════ 4. 小屋、風車、樹、田邊的小東西 ═══════════════════════════
const LAMPS = [];   // 晚上會亮的燈（方塊座標）：烘進夜晚的顏色
const lampAt = (x, y, z, k, r) => LAMPS.push({ x: x + W.ox, y: y + W.oy, z: z + W.oz, k, r });
const box = (x0, y0, z0, x1, y1, z1, c) => { for (let y = y0; y < y1; y++) for (let z = z0; z < z1; z++) for (let x = x0; x < x1; x++) { const v = typeof c === 'function' ? c(x, y, z) : c; if (v !== null && v !== undefined && v !== false) ws(x, y, z, v); } };

// ── 小屋：白牆、木頭框、紅瓦斜屋頂、石頭煙囪，窗台上有花 ──
const HOUSE = { x0: -54, x1: -22, z0: -36, z1: -14 };
const DOOR_X = -38, CHIMNEY = { x: -30, z: -31, top: 33 };
{
  const { x0, x1, z0, z1 } = HOUSE;
  const zc = (z0 + z1) / 2;
  box(x0, 0, z0, x1, 16, z1, (x, y, z) => {
    const edgeX = x <= x0 + 1 || x >= x1 - 2, edgeZ = z <= z0 + 1 || z >= z1 - 2;
    if (y === 0) return ((x + z) >> 1) % 2 ? 's3' : 's4';
    if (edgeX && edgeZ) return 'd2';
    if (y === 7 || y === 15) return 'd2';
    if (z === z1 - 1 && (x === -45 || x === -32)) return 'd2';
    const h = H(x, y, z);
    return h < .1 ? 'd6' : h > .95 ? 'p3' : 'd7';
  });
  // 三角形的山牆（屋頂下面）
  for (let z = z0; z < z1; z++) { const dd = Math.abs(z + .5 - zc) - .5; for (let y = 16; y < 16 + (13 - dd) - 1; y++) for (let x = x0; x < x1; x++) ws(x, y, z, (x === x0 || x === x1 - 1) && (y % 4 === 0) ? 'd2' : 'd7'); }
  // 屋頂：一層一層的瓦片
  for (let z = z0 - 3; z < z1 + 3; z++) {
    const dd = Math.abs(z + .5 - zc) - .5, ry = 16 + (13 - dd);
    for (let x = x0 - 2; x < x1 + 2; x++) for (const y of [ry - 1, ry]) {
      const h = H(x, y, z);
      let c = dd % 3 === 0 ? 'r0' : h > .85 ? 'o2' : 'o0';
      if (dd < 1) c = 'd2';
      if (x === x0 - 2 || x === x1 + 1) c = 'd2';
      if (y === ry - 1 && dd > 0) c = 'd1';
      ws(x, y, z, c);
    }
  }
  // 門（往內凹一格）和門框
  box(DOOR_X - 3, 1, z1 - 1, DOOR_X + 3, 14, z1, 0);
  box(DOOR_X - 3, 1, z1 - 2, DOOR_X + 3, 14, z1 - 1, (x) => (x === DOOR_X - 1 || x === DOOR_X + 1 ? 'd2' : 'd3'));
  ws(DOOR_X + 1, 7, z1 - 2, 'y1');
  box(DOOR_X - 4, 1, z1 - 1, DOOR_X - 3, 15, z1, 'd1'); box(DOOR_X + 3, 1, z1 - 1, DOOR_X + 4, 15, z1, 'd1'); box(DOOR_X - 4, 14, z1 - 1, DOOR_X + 4, 15, z1, 'd1');
  // 窗戶：木框、十字窗格，裡面暖暖的燈光；窗台的花箱
  const windowFront = (wx) => {
    box(wx - 3, 5, z1 - 1, wx + 3, 12, z1, 'd1');
    box(wx - 2, 6, z1 - 1, wx + 2, 11, z1, 0);
    box(wx - 2, 6, z1 - 2, wx + 2, 11, z1 - 1, (x, y) => (x === wx || y === 8 ? 'd2' : (y > 8 ? 'Lwin' : 'Lwin2')));
    box(wx - 3, 4, z1, wx + 3, 5, z1 + 1, 'd3');
    for (let x = wx - 3; x < wx + 3; x++) ws(x, 5, z1, ['flP', 'g3', 'flY', 'g2', 'flP', 'g3'][(x - wx + 3) % 6]);
    lampAt(wx, 8.5, z1 + .6, .95, 27);
  };
  windowFront(-48); windowFront(-28);
  const windowSide = (wx, out) => {
    box(wx, 5, -29, wx + 1, 12, -21, 'd1');
    box(wx, 6, -28, wx + 1, 11, -22, 0);
    box(wx - out, 6, -28, wx - out + 1, 11, -22, (x, y, z) => (z === -25 || y === 8 ? 'd2' : 'Lwin'));
    lampAt(wx + out * 1.2 + .5, 8.5, -24.5, .8, 24);
  };
  windowSide(x0, -1); windowSide(x1 - 1, 1);
  // 山牆上的小圓窗
  box(x1 - 1, 20, -27, x1, 24, -23, 'd1'); box(x1 - 1, 21, -26, x1, 23, -24, 0); box(x1 - 2, 21, -26, x1 - 1, 23, -24, 'Lwin');
  lampAt(x1 + .5, 22, -24.5, .55, 18);
  // 煙囪
  box(CHIMNEY.x, 18, CHIMNEY.z, CHIMNEY.x + 3, CHIMNEY.top, CHIMNEY.z + 3, (x, y, z) => (y === CHIMNEY.top - 1 ? 's2' : (y + (x + z) % 2) % 3 === 0 ? 's2' : H(x, y, z) > .5 ? 's4' : 's3'));
  // 門邊的小燈
  box(DOOR_X + 5, 11, z1, DOOR_X + 7, 12, z1 + 1, 's1'); box(DOOR_X + 5, 9, z1, DOOR_X + 7, 11, z1 + 1, 'Llamp'); box(DOOR_X + 5, 8, z1, DOOR_X + 7, 9, z1 + 1, 's1');
  lampAt(DOOR_X + 6, 9.5, z1 + 1.4, 1.15, 34);
  // 牆邊的木桶和柴堆
  for (let y = 0; y < 5; y++) for (let z = -18; z < -12; z++) for (let x = x0 - 6; x < x0; x++) {
    if (Math.hypot(x + .5 - (x0 - 3), z + .5 + 15) > 2.7) continue;
    ws(x, y, z, y === 1 || y === 3 ? 's2' : y === 4 ? (Math.hypot(x + .5 - (x0 - 3), z + .5 + 15) < 1.6 ? 'd2' : 'd4') : 'd3');
  }
  box(x1, 0, -33, x1 + 3, 5, -24, (x, y, z) => (x === x1 + 2 || z === -33 || z === -25 ? ((y + z) % 2 ? 'd6' : 'd5') : 'd2'));
}
// ── 送貨的木箱（小屋右前方）──
const CRATE = { x: -2.05, z: -1.95 };
{
  const cx = vx(CRATE.x), cz = vx(CRATE.z);
  box(cx - 3, 0, cz - 3, cx + 3, 5, cz + 3, (x, y, z) => {
    const ex = x === cx - 3 || x === cx + 2, ez = z === cz - 3 || z === cz + 2;
    if (!ex && !ez && y > 0) return 0;     // 上面是空的（裝收成）
    if ((ex && ez) || y === 4 || y === 0) return 'd2';
    return (y === 2 ? 'd3' : 'd4');
  });
}
// ── 風車：石頭底座、白色塔身、深藍色的尖屋頂，旁邊一面小紅旗 ──
const MILL = { x: 45, z: -29 };
const HUB = new V3(MILL.x * PX, 45.5 * PX, (MILL.z + 13.5) * PX);
{
  const { x: cx, z: cz } = MILL;
  const rad = (y) => (y < 6 ? 11.3 : lerp(10.6, 8, (y - 6) / 32));
  for (let y = 0; y < 38; y++) for (let z = cz - 12; z < cz + 12; z++) for (let x = cx - 12; x < cx + 12; x++) {
    const dd = Math.hypot(x + .5 - cx, z + .5 - cz);
    if (dd > rad(y)) continue;
    const h = H(x, y, z);
    let c;
    if (y < 6) c = y === 2 || y === 5 || ((Math.floor(Math.atan2(z + .5 - cz, x + .5 - cx) * 6) + (y > 2 ? 1 : 0)) % 3 === 0 && dd > rad(y) - 1.2) ? 's2' : h > .5 ? 's4' : 's3';
    else if (y === 17 || y === 18) c = 'd3';
    else c = y % 4 === 0 ? 's5' : h > .97 ? 's4' : h > .9 ? 's5' : 'wh';
    ws(x, y, z, c);
  }
  // 門
  for (let y = 1; y < 11; y++) for (let x = cx - 2; x < cx + 2; x++) {
    if (y === 10 && (x === cx - 2 || x === cx + 1)) continue;
    let z = cz + 12; while (z > cz && !wg(x, y, z)) z--;
    ws(x, y, z, 0); ws(x, y, z - 1, (x === cx - 1 ? 'd2' : 'd3'));
  }
  // 窗戶
  for (const [y0, side] of [[24, 'front'], [12, 'west']]) for (let y = y0; y < y0 + 4; y++) for (let k = -1; k < 1; k++) {
    if (side === 'front') { let z = cz + 12; while (z > cz && !wg(cx + k, y, z)) z--; ws(cx + k, y, z, 'Lwin'); if (y === y0 || y === y0 + 3) ws(cx + k, y, z, 'd1'); }
    else { let x = cx - 12; while (x < cx && !wg(x, y, cz + k)) x++; ws(x, y, cz + k, 'Lwin'); if (y === y0 || y === y0 + 3) ws(x, y, cz + k, 'd1'); }
  }
  lampAt(cx, 25.5, cz + 10, .75, 22); lampAt(cx - 10, 13.5, cz, .6, 18);
  // 屋頂
  for (let y = 38; y < 53; y++) {
    const r = 9.6 * (1 - Math.pow((y - 38) / 15, 1.5)) + .3;
    for (let z = cz - 11; z < cz + 11; z++) for (let x = cx - 11; x < cx + 11; x++) {
      if (Math.hypot(x + .5 - cx, z + .5 - cz) > r) continue;
      ws(x, y, z, y === 38 ? 'd2' : y % 2 ? (H(x, y, z) > .8 ? 's3' : 's2') : 's1');
    }
  }
  box(cx - 1, 53, cz - 1, cx + 1, 57, cz + 1, 'd1');
  box(cx + 1, 55, cz - 1, cx + 5, 57, cz, (x, y) => (y === 56 ? 'r1' : 'r0'));
  // 轉軸的木盒（風扇裝在它前面）
  box(cx - 2, 43, cz + 6, cx + 2, 48, cz + 13, (x, y, z) => (z === cz + 12 ? 'd1' : y === 47 ? 'd3' : 'd2'));
}
// ── 樹：圓圓的果樹、秋天的楓樹、粉紅花樹、松樹；灌木 ──
const LEAVES = {
  green: ['g1', 'g2', 'g3', 'g4', 'g5'], autumn: ['d2', 'o0', 'o1', 'y1', 'y2'], blossom: ['p0', 'p1', 'p2', 'p4', 'wh'],
};
const TREES = [];   // 有葉子會掉的
function roundTree(ux, uz, o = {}) {
  const x0 = vx(ux), z0 = vx(uz), base = o.base || 0, th = o.trunk ?? 9, r = o.r ?? 10, pal = LEAVES[o.kind || 'green'];
  const tw = r > 10 ? 3 : 2;
  for (let y = base; y < base + th + 3; y++) for (let dz = 0; dz < tw; dz++) for (let dx = 0; dx < tw; dx++) ws(x0 + dx - 1, y, z0 + dz - 1, dx === 0 && dz === tw - 1 ? 'd4' : H(dx, y, dz) > .7 ? 'd2' : 'd3');
  for (const [dx, dz] of [[-2, 0], [tw, 0], [0, -2], [0, tw]]) if (H(x0 + dx, base, z0 + dz) > .3) ws(x0 + dx - 1, base, z0 + dz - 1, 'd2');
  const cy = base + th + r * .55;
  const blobs = [[0, 0, 0, r], [-.55 * r, -.22 * r, .25 * r, .68 * r], [.55 * r, -.18 * r, -.2 * r, .64 * r], [.12 * r, .42 * r, -.1 * r, .62 * r], [-.1 * r, -.15 * r, .6 * r, .6 * r]];
  const R0 = Math.ceil(r * 1.5);
  for (let y = Math.floor(cy - R0); y < cy + R0; y++) for (let z = z0 - R0; z < z0 + R0; z++) for (let x = x0 - R0; x < x0 + R0; x++) {
    let inside = false;
    for (const [bx, by, bz, br] of blobs) {
      const dd = Math.hypot(x + .5 - x0 - bx, (y + .5 - cy - by) * 1.1, z + .5 - z0 - bz);
      if (dd < br * (.86 + H(x, y, z) * .16)) { inside = true; break; }
    }
    if (!inside) continue;
    const t = (y - cy) / r + (H(x, y + 1, z) - .5) * .55 + ((x0 - x) * .6 + (z - z0) * .4) / r * .25;
    let c = t < -.5 ? pal[0] : t < -.05 ? pal[1] : t < .42 ? pal[2] : t < .8 ? pal[3] : pal[4];
    if (o.fruit && H(x, y, z + 5) > .965) c = o.fruit;
    ws(x, y, z, c);
  }
  TREES.push({ x: ux, z: uz, y: (cy) * PX, r: r * PX, kind: o.kind || 'green' });
}
function pine(ux, uz, base = 0, s = 1) {
  const x0 = vx(ux), z0 = vx(uz);
  box(x0 - 1, base, z0 - 1, x0 + 1, base + 6, z0 + 1, 'd2');
  for (const [y0, hh, rr] of [[4, 8, 8.5], [10, 7, 6.5], [15, 6, 4.5], [19, 5, 2.5]]) {
    for (let y = 0; y < hh * s; y++) {
      const rad = rr * s * (1 - y / (hh * s)) + .8;
      for (let z = z0 - 10; z < z0 + 10; z++) for (let x = x0 - 10; x < x0 + 10; x++) {
        const dd = Math.hypot(x + .5 - x0, z + .5 - z0);
        if (dd > rad + (H(x, y, z) - .5) * 1.2) continue;
        const h = H(x, y0 + y, z);
        ws(x, base + Math.round(y0 * s) + y, z, y === 0 ? 'g0' : dd > rad - 1.3 ? (h > .6 ? 'g2' : 'g1') : h > .85 ? 'g3' : 'g1');
      }
    }
  }
}
function bush(ux, uz, r = 3.6, berry = 'r1', base = 0) {
  const x0 = vx(ux), z0 = vx(uz);
  for (let y = base; y < base + r * 1.6; y++) for (let z = z0 - 6; z < z0 + 6; z++) for (let x = x0 - 6; x < x0 + 6; x++) {
    const dd = Math.hypot(x + .5 - x0, (y - base + .5 - r * .45) * 1.25, z + .5 - z0);
    if (dd > r * (.85 + H(x, y, z) * .2)) continue;
    const h = H(x, y + 3, z);
    ws(x, y, z, berry && h > .93 ? berry : y - base > r * .9 ? (h > .5 ? 'g4' : 'g3') : h > .45 ? 'g3' : 'g2');
  }
}
roundTree(-7.9, -.5, { r: 10.5, trunk: 8, fruit: 'r1' });
roundTree(2.1, -6.1, { r: 9.5, trunk: 9, kind: 'autumn', base: 8 });
pine(-1.0, -5.9, 8, 1);
roundTree(8.25, -.9, { r: 9.5, trunk: 8 });
pine(7.4, 3.7, 0, .92);
roundTree(-8.05, 2.35, { r: 7.5, trunk: 7, kind: 'blossom' });
bush(.6, -5.5, 3.4, 'p2', 4); bush(3.4, -5.4, 3, 'r1', 4); bush(-6.5, -5.1, 3.5, 'r1'); bush(-1.5, 5.6, 3.2, 'flY'); bush(4.6, 5.1, 3.4, 'p2'); bush(8.3, 1.8, 3, 'r1'); bush(-7.6, 4.6, 3, 'flP');
// ── 路燈 ──
const POSTS = [[-3.45, .3], [4.0, -1.55]];
for (const [ux, uz] of POSTS) {
  const x = vx(ux), z = vx(uz);
  box(x, 0, z, x + 1, 12, z + 1, (xx, y) => (y < 2 ? 's2' : 's1'));
  box(x - 1, 12, z - 1, x + 2, 13, z + 2, 's1');
  box(x - 1, 13, z - 1, x + 2, 15, z + 2, (xx, y, zz) => ((xx === x || zz === z) ? 'Llamp' : 's1'));
  box(x - 1, 15, z - 1, x + 2, 16, z + 2, 's1'); ws(x, 16, z, 's2');
  lampAt(x + .5, 14, z + .5, 1.25, 32);
}
// ── 稻草人（一點用都沒有，烏鴉照樣來）──
{
  const x = vx(4.3), z = vx(2.85);
  box(x, 0, z, x + 1, 13, z + 1, 'd3');
  box(x - 6, 10, z, x + 7, 11, z + 1, 'd3');
  box(x - 2, 6, z, x + 3, 12, z + 1, (xx, y) => ((xx + y) % 3 === 0 ? 'r0' : 'r1'));
  box(x - 5, 10, z, x - 2, 12, z + 1, 'r1'); box(x + 3, 10, z, x + 6, 12, z + 1, 'r1');
  ws(x - 6, 10, z, 'y1'); ws(x + 6, 10, z, 'y1'); ws(x - 6, 11, z, 'y2'); ws(x + 6, 11, z, 'y2');
  box(x - 1, 12, z - 1, x + 2, 15, z + 2, 'd6'); ws(x - 1, 13, z + 1, 's0'); ws(x + 1, 13, z + 1, 's0'); ws(x, 12, z + 1, 'd2');
  box(x - 2, 15, z - 2, x + 3, 16, z + 3, 'd2'); box(x - 1, 16, z - 1, x + 2, 18, z + 2, 'd1');
}
// ── 乾草捆、田邊的籬笆 ──
for (const [ux, uz, rot] of [[3.55, -3.0, 0], [3.3, -4.05, 1]]) {
  const x = vx(ux), z = vx(uz), w = rot ? 4 : 6, dd = rot ? 6 : 4;
  box(x - (w >> 1), 0, z - (dd >> 1), x + (w >> 1), 4, z + (dd >> 1), (xx, y, zz) => {
    const along = rot ? zz - z : xx - x;
    if (along === -2 || along === 1) return 'd4';
    return y === 3 && H(xx, y, zz) > .6 ? 'y2' : H(xx, y, zz) > .5 ? 'y1' : 'd6';
  });
}
{
  const z = vx(5.45);
  for (let x = vx(-2.6); x < vx(3.6); x++) {
    const post = (x - vx(-2.6)) % 6 === 0;
    if (post) box(x, 0, z, x + 1, 6, z + 1, (xx, y) => (y === 5 ? 'd4' : 'd3'));
    else { ws(x, 2, z, 'd4'); ws(x, 4, z, 'd4'); }
  }
}
// ── 草地上的小花、小草、石頭、香菇 ──
for (let z = -FZ; z < FD - FZ; z++) for (let x = -FX; x < FW - FX; x++) {
  const i = fi(x, z);
  if (!FOOT[i] || EDGE[i] < 3) continue;
  const top = TOP[i];
  if (top === 0 && SURF[i] !== SURF_GRASS) continue;
  if (wg(x, top, z) || wg(x, top + 1, z)) continue;
  const h = H(x, 20, z), patch = vnoise(x / 9, z / 9, 21);
  if (h > .992 - patch * .02) { const fl = ['flP', 'flW', 'flY', 'flB', 'flV'][Math.floor(H(x, 21, z) * 5)]; if (H(x, 22, z) > .5) { ws(x, top, z, 'stem'); ws(x, top + 1, z, fl); } else ws(x, top, z, fl); }
  else if (h > .975) { ws(x, top, z, 'tuft'); if (H(x, 23, z) > .6) ws(x, top + 1, z, 'tuft2'); }
  else if (h < .004) ws(x, top, z, 'pebble');
}
for (const [ux, uz] of [[-6.6, -1.2], [-7.2, 1.1], [7.6, -2.6], [-1.2, -4.0]]) { const x = vx(ux), z = vx(uz); ws(x, 0, z, 'shroomW'); ws(x, 1, z, 'shroom'); ws(x + 1, 1, z, 'shroom'); ws(x - 1, 1, z, 'shroom'); ws(x, 2, z, 'shroom'); ws(x, 1, z + 1, 'shroomW'); }
// 池塘邊：一圈石頭和蘆葦
for (let k = 0; k < 64; k++) {
  const a = k / 64 * TAU, ux = POND.x + Math.cos(a) * POND.rx * 1.08, uz = POND.z + Math.sin(a) * POND.rz * 1.1;
  if (Math.sin(a) > .6) continue;   // 小溪流出去的地方留空
  const x = vx(ux), z = vx(uz);
  if (H(k, 1, 7) > .55) { ws(x, 0, z, H(k, 2, 7) > .5 ? 's4' : 's3'); if (H(k, 3, 7) > .7) ws(x + 1, 0, z, 's3'); }
  else if (H(k, 4, 7) > .4 && Math.cos(a) < .3) { const hh = 2 + Math.floor(H(k, 5, 7) * 3); for (let y = 0; y < hh; y++) ws(x, y, z, 'reed'); ws(x, hh, z, 'cat'); }
}

// ═══════════════════════════ 5. 把世界變成網格（光影一次算好）═══════════════════════════
const WORLD = meshGrid(W, { shadows: true, lamps: LAMPS });
const worldMesh = new THREE.Mesh(WORLD.geo, voxMat);
worldMesh.frustumCulled = false;
scene.add(worldMesh);
if (WORLD.glow) scene.add(new THREE.Mesh(WORLD.glow, glowMat));

// ── 哪裡可以走：地面平的、上面沒有東西、離邊緣有一點距離（農夫是一個半徑兩格的圓）──
const WALK = new Uint8Array(FW * FD), FREE = new Uint8Array(FW * FD);
for (let z = -FZ; z < FD - FZ; z++) for (let x = -FX; x < FW - FX; x++) {
  const i = fi(x, z);
  if (!FOOT[i] || TOP[i] || EDGE[i] < 4 || !wg(x, -1, z)) continue;
  let ok = true;
  for (let y = 0; y < 11 && ok; y++) { const v = wg(x, y, z); if (v && !SOFT[v]) ok = false; }
  WALK[i] = ok ? 1 : 0;
}
for (let z = -FZ + 2; z < FD - FZ - 2; z++) for (let x = -FX + 2; x < FW - FX - 2; x++) {
  let ok = 1;
  for (let dz = -2; dz <= 2 && ok; dz++) for (let dx = -2; dx <= 2; dx++) if (!WALK[fi(x + dx, z + dz)]) { ok = 0; break; }
  FREE[fi(x, z)] = ok;
}
const freeAt = (ux, uz) => { const x = Math.floor(ux / PX), z = Math.floor(uz / PX); return x >= -FX && z >= -FZ && x < FW - FX && z < FD - FZ && FREE[fi(x, z)] === 1; };

// 尋路（點地面、自動玩的時候用）：半公尺一格的 A*
const CW = 42, CD = 34;
const cellFree = (i, j) => i >= 0 && j >= 0 && i < CW && j < CD && freeAt((i * 4 - FX + 2) * PX, (j * 4 - FZ + 2) * PX);
const CFREE = new Uint8Array(CW * CD);
for (let j = 0; j < CD; j++) for (let i = 0; i < CW; i++) CFREE[i + CW * j] = cellFree(i, j) ? 1 : 0;
const toCell = (ux, uz) => [clamp(Math.floor((ux / PX + FX) / 4), 0, CW - 1), clamp(Math.floor((uz / PX + FZ) / 4), 0, CD - 1)];
const cellPos = (i, j) => [(i * 4 - FX + 2) * PX, (j * 4 - FZ + 2) * PX];
function nearestFreeCell(i, j) {
  if (CFREE[i + CW * j]) return [i, j];
  for (let r = 1; r < 12; r++) for (let dj = -r; dj <= r; dj++) for (let di = -r; di <= r; di++) {
    if (Math.max(Math.abs(di), Math.abs(dj)) !== r) continue;
    const a = i + di, b = j + dj;
    if (a >= 0 && b >= 0 && a < CW && b < CD && CFREE[a + CW * b]) return [a, b];
  }
  return null;
}
function lineFree(ax, az, bx, bz) {
  const n = Math.ceil(Math.hypot(bx - ax, bz - az) / .1);
  for (let k = 1; k <= n; k++) if (!freeAt(lerp(ax, bx, k / n), lerp(az, bz, k / n))) return false;
  return true;
}
function findPath(ax, az, bx, bz) {
  if (lineFree(ax, az, bx, bz) && freeAt(bx, bz)) return [[bx, bz]];
  const s = nearestFreeCell(...toCell(ax, az)), e = nearestFreeCell(...toCell(bx, bz));
  if (!s || !e) return null;
  const N = CW * CD, gS = new Float32Array(N).fill(1e9), from = new Int32Array(N).fill(-1), closed = new Uint8Array(N);
  const si = s[0] + CW * s[1], ei = e[0] + CW * e[1];
  gS[si] = 0;
  const open = [si];
  const hh = (k) => { const dx = Math.abs(k % CW - e[0]), dz = Math.abs(((k / CW) | 0) - e[1]); return Math.max(dx, dz) + .414 * Math.min(dx, dz); };
  while (open.length) {
    let bi = 0;
    for (let k = 1; k < open.length; k++) if (gS[open[k]] + hh(open[k]) < gS[open[bi]] + hh(open[bi])) bi = k;
    const cur = open.splice(bi, 1)[0];
    if (cur === ei) break;
    closed[cur] = 1;
    const ci = cur % CW, cj = (cur / CW) | 0;
    for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
      if (!di && !dj) continue;
      const a = ci + di, b = cj + dj;
      if (a < 0 || b < 0 || a >= CW || b >= CD) continue;
      const k = a + CW * b;
      if (!CFREE[k] || closed[k]) continue;
      if (di && dj && (!CFREE[ci + di + CW * cj] || !CFREE[ci + CW * (cj + dj)])) continue;
      const ng = gS[cur] + (di && dj ? 1.414 : 1);
      if (ng < gS[k]) { gS[k] = ng; from[k] = cur; if (!open.includes(k)) open.push(k); }
    }
  }
  if (from[ei] < 0 && si !== ei) return null;
  const pts = [];
  for (let k = ei; k !== si && k >= 0; k = from[k]) pts.unshift(cellPos(k % CW, (k / CW) | 0));
  if (freeAt(bx, bz)) pts.push([bx, bz]);
  // 拉直：看得到的就直接走過去
  const out = [];
  let px = ax, pz = az, k = 0;
  while (k < pts.length) {
    let far = k;
    for (let m = pts.length - 1; m > k; m--) if (lineFree(px, pz, pts[m][0], pts[m][1])) { far = m; break; }
    out.push(pts[far]); [px, pz] = pts[far]; k = far + 1;
  }
  return out;
}

// ═══════════════════════════ 6. 會動的東西：風車扇葉、水、瀑布、煙 ═══════════════════════════
const blades = new THREE.Group();
blades.position.copy(HUB);
{
  const m = voxModel(58, 58, 3, 29, 29, 0, (put) => {
    const arm = (k, a, b, z, c) => {
      let x = b, y = a;
      for (let r = 0; r < k; r++) [x, y] = [-y - 1, x];
      put(x, y, z, c);
    };
    for (let k = 0; k < 4; k++) {
      for (let a = 2; a < 27; a++) { arm(k, a, -1, 0, 'd1'); arm(k, a, 0, 0, 'd2'); }
      for (let a = 8; a < 26; a++) for (let b = 1; b < 7; b++) {
        const frame = b === 6 || a === 8 || a === 25;
        if (frame || a % 3 === 0) arm(k, a, b, 0, frame ? 'd2' : 'd3');
        else arm(k, a, b, 1, H(a, b, k) > .85 ? 'wh' : H(a, b + 9, k) > .3 ? 'd7' : 'p3');
      }
    }
    for (let y = -3; y < 3; y++) for (let x = -3; x < 3; x++) { put(x, y, 0, 'd1'); if (Math.abs(x + .5) < 2 && Math.abs(y + .5) < 2) put(x, y, 1, 'd2'); }
    put(-1, -1, 2, 'y1'); put(0, -1, 2, 'y1'); put(-1, 0, 2, 'y1'); put(0, 0, 2, 'y1');
  });
  blades.add(new THREE.Mesh(m.geo, voxMat));
}
scene.add(blades);

// 像素貼圖的小工具：每一格一個像素、不模糊
function pixTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d');
  draw(g, w, h);
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.colorSpace = THREE.SRGBColorSpace;
  return { tex: t, ctx: g, canvas: c };
}
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + .5) / 16);
// 池塘的水：每 1/6 秒重畫一次，水面的亮紋慢慢飄、偶爾閃一下
const pondBox = { x0: POND.x - POND.rx - .4, x1: POND.x + POND.rx + .4, z0: POND.z - POND.rz - .4, z1: (FALL_Z + 1) * PX };
const pondW = Math.round((pondBox.x1 - pondBox.x0) * 8), pondH = Math.round((pondBox.z1 - pondBox.z0) * 8);
const water = pixTex(pondW, pondH, () => {});
let waterT = -1;
function drawWater(t, night) {
  const g = water.ctx;
  for (let y = 0; y < pondH; y++) for (let x = 0; x < pondW; x++) {
    const ux = pondBox.x0 + (x + .5) / 8, uz = pondBox.z0 + (y + .5) / 8;
    const deep = inPond(ux, uz, .62);
    const w = Math.sin(x * .55 + y * .25 + t * 2.2) + Math.sin(y * .7 - t * 1.6 + x * .1);
    let c = deep ? (night ? '#142a52' : '#124e89') : (night ? '#1b3d6e' : '#1d76b8');
    if (w > 1.45) c = night ? '#3a6aa8' : '#2ce8f5';
    else if (w > 1.05) c = night ? '#2a5590' : '#3aa6e8';
    if (H(x, Math.floor(t * 3), y) > .992) c = night ? '#c0cbdc' : '#ffffff';
    if (Math.abs(ux - STREAM_X) < .4 && uz > POND.z + POND.rz * .6) c = (Math.floor(uz * 8 - t * 14) + x) % 4 === 0 ? (night ? '#5a7fb8' : '#bff6ff') : (night ? '#1f4a86' : '#2a9be0');
    g.fillStyle = c; g.fillRect(x, y, 1, 1);
  }
  water.tex.needsUpdate = true;
}
const waterMat = new THREE.MeshBasicMaterial({ map: water.tex, transparent: true, opacity: .9, fog: false, depthWrite: false });
{
  const m = new THREE.Mesh(new THREE.PlaneGeometry(pondBox.x1 - pondBox.x0, pondBox.z1 - pondBox.z0), waterMat);
  m.rotation.x = -Math.PI / 2;
  m.position.set((pondBox.x0 + pondBox.x1) / 2, -.17, (pondBox.z0 + pondBox.z1) / 2);
  m.renderOrder = 1;
  scene.add(m);
}
// 瀑布：從小島邊緣一直掉進虛空，越下面越淡；水流一個像素一個像素往下跑
const fallTex = pixTex(6, 32, (g) => {
  for (let y = 0; y < 32; y++) for (let x = 0; x < 6; x++) {
    const h = H(x, y, 77);
    g.fillStyle = (x + Math.floor(y / 3)) % 5 === 0 || h > .82 ? '#ffffff' : h > .45 ? '#8fe9ff' : '#3aa6e8';
    g.fillRect(x, y, 1, 1);
  }
});
fallTex.tex.wrapS = fallTex.tex.wrapT = THREE.RepeatWrapping;
const FALL_H = 7.5;
fallTex.tex.repeat.set(1, FALL_H * 8 / 32);
const fallMat = new THREE.MeshBasicMaterial({ map: fallTex.tex, vertexColors: true, transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: false });
{
  const geo = new THREE.PlaneGeometry(.75, FALL_H, 1, 12), p = geo.attributes.position, c = new Float32Array(p.count * 4);
  for (let k = 0; k < p.count; k++) { const t = (p.getY(k) / FALL_H + .5); c.set([1, 1, 1, Math.floor(Math.min(1, t * 1.6) * 6) / 6], k * 4); }
  geo.setAttribute('color', new THREE.BufferAttribute(c, 4));
  const m = new THREE.Mesh(geo, fallMat);
  m.position.set(vx(STREAM_X) * PX + PX * .5 - .02, -.17 - FALL_H / 2, (FALL_Z + 1) * PX + .03);
  m.renderOrder = 2;
  scene.add(m);
}
const FALL_BOTTOM = new V3(vx(STREAM_X) * PX, -.17 - FALL_H * .75, (FALL_Z + 1) * PX + .1);
const FALL_TOP = new V3(vx(STREAM_X) * PX, -.2, (FALL_Z + 1) * PX + .08);

// ═══════════════════════════ 7. 像素粒子（每一顆都是一個方方的像素）═══════════════════════════
const PSCALE = { value: 600 };
const _db = new THREE.Vector2();
function pixelPool(max, additive) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(max * 3), col = new Float32Array(max * 3), size = new Float32Array(max), alpha = new Float32Array(max);
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('pcolor', new THREE.BufferAttribute(col, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('psize', new THREE.BufferAttribute(size, 1).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('palpha', new THREE.BufferAttribute(alpha, 1).setUsage(THREE.DynamicDrawUsage));
  const mat = new THREE.ShaderMaterial({
    uniforms: { uScale: PSCALE },
    vertexShader: 'attribute vec3 pcolor; attribute float psize; attribute float palpha; uniform float uScale; varying vec3 vC; varying float vA;\\nvoid main(){ vC = pcolor; vA = palpha; vec4 mv = modelViewMatrix * vec4(position, 1.); gl_Position = projectionMatrix * mv; gl_PointSize = max(1., floor(psize * uScale / -mv.z + .5)); }',
    fragmentShader: 'varying vec3 vC; varying float vA;\\nvoid main(){ if (vA < .004) discard; gl_FragColor = vec4(vC, vA); }',
    transparent: true, depthWrite: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false; pts.renderOrder = additive ? 4 : 3;
  scene.add(pts);
  const list = [];
  return {
    list,
    add(p) { if (list.length < max) { p.age = 0; list.push(p); } return p; },
    draw() {
      const n = Math.min(max, list.length);
      for (let k = 0; k < n; k++) {
        const p = list[k];
        pos[k * 3] = p.x; pos[k * 3 + 1] = p.y; pos[k * 3 + 2] = p.z;
        col[k * 3] = p.r; col[k * 3 + 1] = p.g; col[k * 3 + 2] = p.b;
        size[k] = p.size; alpha[k] = p.alpha ?? 1;
      }
      geo.setDrawRange(0, n);
      for (const a of ['position', 'pcolor', 'psize', 'palpha']) geo.attributes[a].needsUpdate = true;
    },
  };
}
const glowFx = pixelPool(900, true), softFx = pixelPool(500, false);
const lin = (hex, k = 1) => { const c = new THREE.Color(hex); return [c.r * k, c.g * k, c.b * k]; };
function spark(x, y, z, hex, o = {}) {
  const [r, g, b] = lin(hex, o.glow ?? 1.6);
  return (o.soft ? softFx : glowFx).add({ kind: o.kind || 'spark', x, y, z, vx: o.vx ?? R(-1, 1) * (o.spread ?? 1.6), vy: o.vy ?? R(1, 3), vz: o.vz ?? R(-1, 1) * (o.spread ?? 1.6), grav: o.grav ?? 6, drag: o.drag ?? 1.5, life: o.life ?? R(.45, .8), size: o.size ?? PX * 1.2, r, g, b, a: o.a ?? 1, ph: R(0, TAU), ref: o.ref });
}
function burst(x, y, z, hexes, n = 14, o = {}) { for (let k = 0; k < n; k++) spark(x, y, z, hexes[k % hexes.length], o); }

// 星星：只在晚上出現，一閃一閃
const STAR_N = 420;
const stars = (() => {
  const geo = new THREE.BufferGeometry(), pos = new Float32Array(STAR_N * 3), a = new Float32Array(STAR_N), s = new Float32Array(STAR_N);
  for (let k = 0; k < STAR_N; k++) {
    const u = H(k, 1, 9) * 2 - 1, t = H(k, 2, 9) * TAU, r = 260, q = Math.sqrt(1 - u * u);
    pos.set([Math.cos(t) * q * r, u * r * .8 - 40, Math.sin(t) * q * r], k * 3);
    s[k] = H(k, 3, 9) > .9 ? 3 : 2;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('palpha', new THREE.BufferAttribute(a, 1).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('psize', new THREE.BufferAttribute(s, 1));
  const mat = new THREE.ShaderMaterial({
    uniforms: { uPx: { value: 1 } },
    vertexShader: 'attribute float palpha; attribute float psize; uniform float uPx; varying float vA;\\nvoid main(){ vA = palpha; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); gl_PointSize = floor(psize * uPx + .5); }',
    fragmentShader: 'varying float vA;\\nvoid main(){ if (vA < .01) discard; gl_FragColor = vec4(vec3(1.4, 1.35, 1.6) * vA, 1.); }',
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const p = new THREE.Points(geo, mat); p.frustumCulled = false; p.renderOrder = -1;
  scene.add(p);
  return { p, a, mat, geo };
})();
// 夕陽和月亮：畫在小島後面的虛空裡（太陽慢慢沉到小島底下，月亮從另一邊升起來）
function discTex(size, draw) { return pixTex(size, size, (g) => { for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) { const c = draw(x, y, Math.hypot(x + .5 - size / 2, y + .5 - size / 2) / (size / 2)); if (c) { g.fillStyle = c; g.fillRect(x, y, 1, 1); } } }).tex; }
const sunTex = discTex(32, (x, y, d) => {
  const b = BAYER[(x & 3) + (y & 3) * 4];
  if (d < .42) return d < .25 ? '#fffbe0' : '#fee761';
  if (d < .55) return '#feae34';
  if (d < .75) return b < (.75 - d) * 3 ? 'rgba(247,118,34,.7)' : null;
  if (d < 1) return b < (1 - d) * 1.4 ? 'rgba(190,74,47,.45)' : null;
  return null;
});
const moonTex = discTex(28, (x, y, d) => {
  const b = BAYER[(x & 3) + (y & 3) * 4];
  if (d < .5) { const crater = H(x >> 1, 3, y >> 1) > .78; return crater ? '#8b9bb4' : d < .38 ? '#f4f0ff' : '#c0cbdc'; }
  if (d < 1) return b < (1 - d) * .8 ? 'rgba(160,190,255,.35)' : null;
  return null;
});
const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: sunTex, transparent: true, depthWrite: false, fog: false }));
const moonSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: moonTex, transparent: true, depthWrite: false, fog: false }));
sunSprite.renderOrder = moonSprite.renderOrder = -2;
scene.add(sunSprite, moonSprite);

// ═══════════════════════════ 8. 作物（一格一格長大）═══════════════════════════
const CROPS = { wheat: { pts: 10, name: '小麥', fx: ['#fee761', '#feae34'] }, carrot: { pts: 10, name: '胡蘿蔔', fx: ['#f77622', '#94d65a'] }, pumpkin: { pts: 25, name: '南瓜', fx: ['#f77622', '#fee761'] } };
function cropModel(type, stage) {
  return voxModel(9, 10, 9, 4, 0, 4, (put) => {
    const hv = (a, b) => H(a * 7 + stage * 31, b * 13 + 3, type.length * 5);
    if (stage === 0) { put(-2, 0, -2, 'd4'); put(1, 0, 1, 'd4'); put(1, 0, -2, 'd5'); put(-2, 0, 1, 'd5'); return; }
    if (type === 'wheat') {
      for (const [sx, sz] of [[-3, -3], [0, -3], [2, -2], [-2, 0], [1, 0], [-3, 2], [0, 2], [3, 1]]) {
        const tall = stage === 1 ? 1 + (hv(sx, sz) > .5 ? 1 : 0) : stage === 2 ? 3 + (hv(sx, sz) > .5 ? 1 : 0) : 5 + Math.floor(hv(sx, sz) * 2.5);
        for (let y = 0; y < tall; y++) {
          if (stage === 3 && y >= tall - 3) put(sx, y, sz, y === tall - 1 ? 'y2' : (y + sx) % 2 ? 'y1' : 'd6');
          else put(sx, y, sz, stage === 3 ? (y < 2 ? 'd6' : 'y1') : y === tall - 1 ? 'g4' : 'g3');
        }
        if (stage === 3) put(sx + (hv(sz, sx) > .5 ? 1 : -1), tall - 2, sz, 'y1');
        if (stage === 2 && hv(sx + 9, sz) > .5) put(sx + 1, tall - 2, sz, 'g4');
      }
    } else if (type === 'carrot') {
      if (stage === 1) { put(0, 0, 0, 'g3'); put(0, 1, 0, 'g4'); put(-1, 0, -1, 'g3'); put(1, 0, 1, 'g4'); return; }
      const tall = stage === 2 ? 3 : 5;
      if (stage === 3) { for (const [x, z] of [[-1, -1], [0, -1], [-1, 0], [0, 0]]) put(x, 0, z, 'o1'); put(-1, 0, -1, 'o2'); put(0, 0, 0, 'y1'); }
      for (let k = 0; k < 6; k++) {
        const a = k / 6 * TAU + .3;
        for (let y = 1; y <= tall; y++) {
          const rr = y * (stage === 3 ? .62 : .5);
          put(Math.round(Math.cos(a) * rr - .5), y, Math.round(Math.sin(a) * rr - .5), y === tall ? 'g4' : (y + k) % 2 ? 'g3' : 'g2');
        }
      }
      put(-1, 1, -1, 'g2'); put(0, 1, 0, 'g2');
    } else {
      if (stage === 1) { put(0, 0, 0, 'g2'); put(1, 0, 0, 'g3'); put(0, 1, 0, 'g3'); put(-1, 0, 1, 'g3'); put(-1, 1, 1, 'g4'); return; }
      const big = stage === 3, RX = big ? 3.4 : 1.9, RY = big ? 2.5 : 1.5, cy = RY;
      for (let y = 0; y < 7; y++) for (let z = -4; z < 5; z++) for (let x = -4; x < 5; x++) {
        const dx = x + .5, dy = y + .5 - cy, dz = z + .5;
        if ((dx * dx + dz * dz) / (RX * RX) + (dy * dy) / (RY * RY) > 1) continue;
        const rib = Math.cos(Math.atan2(dz, dx) * 5) > .55;
        put(x, y, z, big ? (rib ? 'o0' : dy > RY * .45 && hv(x, z) > .5 ? 'y1' : 'o1') : (rib ? 'g2' : 'g3'));
      }
      const top = Math.ceil(cy + RY) - 1;
      put(0, top, 0, 'd2'); put(0, top + 1, 0, 'g2'); put(1, top + 1, 0, 'g3');
      for (const [x, z] of [[-4, -2], [-4, -3], [3, 3], [4, 3], [-3, 3]]) put(x, 0, z, hv(x, z) > .5 ? 'g2' : 'g3');
    }
  });
}
NIGHT_LAMP = 0;
const CELLS = [];
for (const plot of PLOTS) for (let j = 0; j < plot.d; j++) for (let i = 0; i < plot.w; i++) CELLS.push({ x: plot.x0 + i + .5, z: plot.z0 + j + .5, type: plot.types[j], stage: 0, t: 0, rot: 0, pop: 0, crow: null, sway: 0 });
CELLS.forEach((c, k) => { c.rot = Math.floor(H(k, 5, 5) * 4) * Math.PI / 2; c.sway = H(k, 6, 5) * TAU; });
const CROP_MESH = {};
NIGHT_LAMP = .2;
for (const type of Object.keys(CROPS)) {
  const n = CELLS.filter((c) => c.type === type).length;
  CROP_MESH[type] = [0, 1, 2, 3].map((st) => {
    const m = cropModel(type, st);
    const im = new THREE.InstancedMesh(m.geo, voxMat, Math.max(1, n));
    im.count = 0; im.frustumCulled = false;
    scene.add(im);
    return { im, geo: m.geo };
  });
}
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _s = new V3(), _p = new V3();
function drawCrops(time) {
  for (const type of Object.keys(CROP_MESH)) for (const m of CROP_MESH[type]) m.im.count = 0;
  for (const c of CELLS) {
    const m = CROP_MESH[c.type][c.stage];
    const k = c.pop > 0 ? 1 + Math.sin(c.pop * Math.PI) * .35 : 1;
    const sw = c.stage === 3 ? Math.sin(time * 2.1 + c.sway) * .07 : c.stage === 2 ? Math.sin(time * 1.7 + c.sway) * .04 : 0;
    const peck = c.crow && c.crow.state === 'eat' ? Math.sin(time * 18) * .05 : 0;
    _e.set(sw * .6 + peck, c.rot, sw);
    _q.setFromEuler(_e);
    _s.set(k, c.pop > 0 ? 2 - k : 1, k);
    _p.set(c.x, 0, c.z);
    _m.compose(_p, _q, _s);
    m.im.setMatrixAt(m.im.count++, _m);
  }
  for (const type of Object.keys(CROP_MESH)) for (const m of CROP_MESH[type]) m.im.instanceMatrix.needsUpdate = true;
}
const growTime = (c) => (c.type === 'pumpkin' ? 9.5 : 7) * R(.75, 1.3);

// ═══════════════════════════ 9. 小農夫 ═══════════════════════════
NIGHT_LAMP = .5;
const farmer = (() => {
  const root = new THREE.Group(), body = new THREE.Group();
  root.add(body);
  body.position.y = 2 * PX;
  const part = (m, x, y, z, parent = body) => { const g = voxObject(m); g.position.set(x * PX, y * PX, z * PX); parent.add(g); return g; };
  const leg = voxModel(2, 2, 3, 1, 2, 1, (put) => { for (let x = -1; x < 1; x++) for (let z = -1; z < 1; z++) { put(x, -2, z, 'd2'); put(x, -1, z, 'ov'); } put(-1, -2, 1, 'd1'); put(0, -2, 1, 'd1'); });
  const legL = part(leg, -1, 0, 0), legR = part(leg, 1, 0, 0);
  part(voxModel(4, 4, 2, 2, 0, 1, (put) => {
    for (let y = 0; y < 4; y++) for (let z = -1; z < 1; z++) for (let x = -2; x < 2; x++) put(x, y, z, y < 2 ? 'ov' : 'd7');
    put(-1, 2, 0, 'ov'); put(0, 2, 0, 'ov'); put(-2, 3, 0, 'ov2'); put(1, 3, 0, 'ov2'); put(-2, 3, -1, 'ov2'); put(1, 3, -1, 'ov2');
    put(-1, 3, 0, 'r1'); put(0, 3, 0, 'r1'); put(0, 1, 0, 'ov2'); put(-2, 2, 0, 'y1');
  }), 0, 0, 0);
  const arm = voxModel(1, 3, 2, 0, 3, 1, (put) => { for (let z = -1; z < 1; z++) { put(0, -1, z, 'd7'); put(0, -2, z, 'd7'); put(0, -3, z, 'p3'); } }, { shift: [-.5, 0, 0] });
  const armL = part(arm, -2.5, 4, 0), armR = part(arm, 2.5, 4, 0);
  const head = part(voxModel(5, 4, 4, 2, 0, 2, (put) => {
    for (let y = 0; y < 4; y++) for (let z = -2; z < 2; z++) for (let x = -2; x < 3; x++) {
      let c = 'p3';
      if (z === -2 || y === 3 || ((x === -2 || x === 2) && z < 0 && y > 0)) c = 'd2';
      put(x, y, z, c);
    }
    put(-1, 2, 1, 's0'); put(1, 2, 1, 's0'); put(-2, 1, 1, 'p2'); put(2, 1, 1, 'p2'); put(0, 3, 1, 'd2');
  }, { shift: [-.5, 0, 0] }), 0, 4, 0);
  const hat = part(voxModel(7, 3, 7, 3, 0, 3, (put) => {
    for (let z = -3; z < 4; z++) for (let x = -3; x < 4; x++) put(x, 0, z, Math.max(Math.abs(x), Math.abs(z)) === 3 ? 'd6' : H(x, 0, z) > .7 ? 'y2' : 'y1');
    for (let y = 1; y < 3; y++) for (let z = -2; z < 3; z++) for (let x = -2; x < 3; x++) if (Math.max(Math.abs(x), Math.abs(z)) < 3) put(x, y, z, y === 1 ? 'r1' : H(x, y, z) > .6 ? 'y2' : 'y1');
  }, { shift: [-.5, 0, -.5] }), 0, 4, 0, head);
  hat.rotation.z = .08;
  // 籃子（左手提著，裡面的收成越來越多）
  const basket = new THREE.Group(); basket.position.set(-.2 * PX, -3.4 * PX, .8 * PX); armL.add(basket);
  part(voxModel(4, 4, 3, 2, 0, 1, (put) => {
    for (let z = -1; z < 2; z++) for (let x = -2; x < 2; x++) { put(x, 0, z, 'd3'); if (x === -2 || x === 1 || z === -1 || z === 1) put(x, 1, z, (x + z) % 2 ? 'd4' : 'd3'); }
    put(-2, 2, 0, 'd2'); put(1, 2, 0, 'd2'); put(-1, 3, 0, 'd2'); put(0, 3, 0, 'd2');
  }), 0, 0, 0, basket);
  const fills = [
    voxModel(2, 1, 1, 1, 0, 0, (put) => { put(-1, 0, 0, 'o1'); put(0, 0, 0, 'y1'); }),
    voxModel(2, 1, 1, 1, 0, 0, (put) => { put(-1, 0, 0, 'y2'); put(0, 0, 0, 'o1'); }),
    voxModel(1, 1, 1, 0, 0, 0, (put) => { put(0, 0, 0, 'g3'); }),
  ].map((m, k) => part(m, 0, 1 + k, 0, basket));
  // 晚上提的小燈籠（右手）
  const lantern = part(voxModel(2, 4, 2, 1, 4, 1, (put) => { for (let z = -1; z < 1; z++) for (let x = -1; x < 1; x++) { put(x, -2, z, 's1'); put(x, -3, z, 'Llamp'); put(x, -4, z, 's1'); } put(0, -1, 0, 'd1'); }), 0, -1.6, .6, armR);
  scene.add(root);
  return { root, body, legL, legR, armL, armR, head, hat, basket, fills, lantern };
})();
const F = { x: -2.9, z: 1.5, yaw: 1.2, speed: 0, walk: 0, harvestT: 0, shoutT: 0, shoutCd: 0, cheer: 0, path: null, goal: null, blink: 2, idle: 0 };

// ═══════════════════════════ 10. 烏鴉 ═══════════════════════════
NIGHT_LAMP = .15;
const crowParts = {
  body: voxModel(3, 4, 5, 1, 1, 2, (put) => {
    for (let y = 0; y < 3; y++) for (let z = -2; z < 3; z++) for (let x = -1; x < 2; x++) put(x, y, z, y === 0 ? 's0' : y === 2 && H(x, y, z) > .5 ? 'p0' : 's1');
    put(-1, -1, 0, 'o2'); put(1, -1, 0, 'o2');
  }, { shift: [-.5, 0, 0] }),
  head: voxModel(3, 3, 5, 1, 0, 0, (put) => {
    for (let y = 0; y < 3; y++) for (let z = 0; z < 3; z++) for (let x = -1; x < 2; x++) put(x, y, z, y === 2 ? 'p0' : 's1');
    put(-1, 1, 1, 'wh'); put(1, 1, 1, 'wh'); put(0, 1, 3, 'y1'); put(0, 1, 4, 'o1'); put(0, 0, 3, 'o2');
  }, { shift: [-.5, 0, 0] }),
  wingR: voxModel(4, 1, 4, 0, 0, 2, (put) => { for (let z = -2; z < 2; z++) for (let x = 0; x < 4; x++) put(x, 0, z, x === 3 || z === -2 ? 's0' : H(x, 0, z) > .6 ? 'p0' : 's1'); }),
  wingL: voxModel(4, 1, 4, 4, 0, 2, (put) => { for (let z = -2; z < 2; z++) for (let x = -4; x < 0; x++) put(x, 0, z, x === -4 || z === -2 ? 's0' : H(x, 0, z) > .6 ? 'p0' : 's1'); }),
  tail: voxModel(3, 1, 3, 1, 0, 3, (put) => { for (let z = -3; z < 0; z++) for (let x = -1; x < 2; x++) if (z > -3 || x === 0) put(x, 0, z, 's0'); }, { shift: [-.5, 0, 0] }),
  loot: voxModel(2, 2, 2, 1, 1, 1, (put) => { put(-1, -1, -1, 'o1'); put(0, -1, -1, 'o1'); put(-1, -1, 0, 'o2'); put(0, -1, 0, 'o1'); put(-1, 0, -1, 'g3'); }),
};
const shadowTex = pixTex(10, 6, (g) => { for (let y = 0; y < 6; y++) for (let x = 0; x < 10; x++) { const d = Math.hypot((x + .5 - 5) / 5, (y + .5 - 3) / 3); if (d < 1) { g.fillStyle = d < .7 ? 'rgba(24,20,37,.5)' : 'rgba(24,20,37,.25)'; g.fillRect(x, y, 1, 1); } } }).tex;
const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, fog: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
const shadowGeo = new THREE.PlaneGeometry(1.25, .75); shadowGeo.rotateX(-Math.PI / 2);
function blob(scale = 1) { const m = new THREE.Mesh(shadowGeo, shadowMat); m.scale.setScalar(scale); m.renderOrder = 1; scene.add(m); return m; }
const farmerShadow = blob(.9);
const crows = [];
for (let k = 0; k < 6; k++) {
  const root = new THREE.Group(), body = voxObject(crowParts.body);
  root.add(body);
  const head = voxObject(crowParts.head); head.position.set(0, 2 * PX, 2 * PX); body.add(head);
  const wingL = voxObject(crowParts.wingL); wingL.position.set(-1.5 * PX, 2.5 * PX, 0); body.add(wingL);
  const wingR = voxObject(crowParts.wingR); wingR.position.set(1.5 * PX, 2.5 * PX, 0); body.add(wingR);
  const tail = voxObject(crowParts.tail); tail.position.set(0, 1.5 * PX, -2 * PX); body.add(tail);
  const loot = voxObject(crowParts.loot); loot.position.set(0, 1 * PX, 5 * PX); head.add(loot);
  root.visible = false; root.scale.setScalar(.95);
  scene.add(root);
  const warn = new THREE.Sprite(new THREE.SpriteMaterial({ map: null, transparent: true, depthTest: false, depthWrite: false, fog: false }));
  warn.renderOrder = 19; warn.visible = false;
  scene.add(warn);
  crows.push({ root, body, head, wingL, wingR, loot, warn, shadow: blob(.75), on: false, state: 'off', t: 0, from: new V3(), ctrl: new V3(), to: new V3(), pos: new V3(), vel: new V3(), cell: null, eatT: 0, yaw: 0, flap: 0 });
}

NIGHT_LAMP = 0;
// ═══════════════════════════ 11. 像素數字（+10、×2 飄起來）、記號 ═══════════════════════════
const FONT = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001010010010', 8: '111101111101111', 9: '111101111001111', '+': '000010111010000', '-': '000000111000000', x: '000101010101000', '!': '010010010000010' };
const textCache = new Map();
function pixelText(str, fill) {
  const key = \`\${str}|\${fill}\`;
  if (textCache.has(key)) return textCache.get(key);
  const chars = [...str], w = chars.length * 4 + 1, h = 7;
  const t = pixTex(w, h, (g) => {
    const dot = (cx, cy, col) => { g.fillStyle = col; g.fillRect(cx, cy, 1, 1); };
    for (const [pass, col] of [[0, '#181425'], [1, fill]]) chars.forEach((ch, i) => {
      const bits = FONT[ch]; if (!bits) return;
      for (let y = 0; y < 5; y++) for (let x = 0; x < 3; x++) if (bits[y * 3 + x] === '1') {
        const px = 1 + i * 4 + x, py = 1 + y;
        if (pass === 0) for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, 1], [-1, 1], [1, -1]]) dot(px + dx, py + dy, col);
        else dot(px, py, col);
      }
    });
  });
  const out = { tex: t.tex, w, h };
  textCache.set(key, out);
  return out;
}
const pops = [];
function popText(str, x, y, z, fill = '#fee761', big = 1) {
  const t = pixelText(str, fill);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t.tex, transparent: true, depthTest: false, depthWrite: false, fog: false }));
  const k = .075 * big;
  sp.scale.set(t.w * k, t.h * k, 1);
  sp.position.set(x, y, z);
  sp.renderOrder = 20;
  scene.add(sp);
  pops.push({ sp, age: 0, y0: y, k });
}
function updatePops(dt) {
  for (let i = pops.length - 1; i >= 0; i--) {
    const p = pops[i];
    p.age += dt;
    p.sp.position.y = p.y0 + Math.min(1, p.age * 3) * .5 + p.age * .35;
    const s = p.age < .12 ? .5 + p.age / .12 * .7 : p.age < .25 ? 1.2 - (p.age - .12) / .13 * .2 : 1;
    p.sp.scale.set(p.sp.material.map.image.width * p.k * s, p.sp.material.map.image.height * p.k * s, 1);
    p.sp.material.opacity = p.age > .9 ? Math.max(0, 1 - (p.age - .9) / .35) : 1;
    if (p.age > 1.25) { scene.remove(p.sp); p.sp.material.dispose(); pops.splice(i, 1); }
  }
}
// 烏鴉頭上的紅色驚嘆號
{
  const t = pixelText('!', '#e43b44');
  for (const cr of crows) { cr.warn.material.map = t.tex; cr.warn.material.needsUpdate = true; cr.warn.scale.set(t.w * .11, t.h * .11, 1); }
}
// 籃子滿了：木箱上面跳著一個黃色箭頭
const arrow = voxObject(voxModel(5, 6, 1, 2, 0, 0, (put) => {
  const rows = ['..x..', '.xxx.', 'xxxxx', '.xxx.', '.xxx.', '.xxx.'];
  rows.forEach((r, y) => [...r].forEach((ch, x) => { if (ch === 'x') put(x - 2, y, 0, (x === 0 || x === 4 || y === 0 || (y > 2 && (x === 1 || x === 3))) ? 'o1' : 'y2'); }));
}, { shift: [-.5, 0, -.5] }));
arrow.rotation.x = Math.PI; arrow.visible = false;
arrow.children[0].material = new THREE.MeshBasicMaterial({ vertexColors: true, fog: false, color: new THREE.Color(1.5, 1.4, 1.2) });   // 箭頭晚上也亮亮的
scene.add(arrow);
// 木箱裡的收成堆（越送越滿）
const heap = voxObject(voxModel(4, 3, 4, 2, 0, 2, (put) => {
  for (let y = 0; y < 3; y++) for (let z = -2; z < 2; z++) for (let x = -2; x < 2; x++) {
    if (y === 2 && (Math.abs(x + .5) > 1 || Math.abs(z + .5) > 1)) continue;
    const h = H(x, y, z);
    put(x, y, z, h > .7 ? 'o1' : h > .45 ? 'y1' : h > .25 ? 'g3' : 'r1');
  }
}));
heap.position.set(vx(CRATE.x) * PX, 1 * PX, vx(CRATE.z) * PX);
heap.visible = false;
scene.add(heap);
// 點地面時出現的小圈圈
const markTex = pixTex(12, 12, (g) => { for (let y = 0; y < 12; y++) for (let x = 0; x < 12; x++) { const d = Math.hypot(x + .5 - 6, y + .5 - 6); if (d > 4 && d < 6) { g.fillStyle = '#ffffff'; g.fillRect(x, y, 1, 1); } } }).tex;
const mark = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.5).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: markTex, transparent: true, depthWrite: false, fog: false, color: new THREE.Color(1.4, 1.3, .9) }));
mark.visible = false; mark.renderOrder = 2;
scene.add(mark);
let markT = 0;
// 燈籠照在地上的一圈光（晚上）
const poolTex = pixTex(40, 40, (g) => {
  for (let y = 0; y < 40; y++) for (let x = 0; x < 40; x++) {
    const d = Math.hypot(x + .5 - 20, y + .5 - 20) / 20;
    if (d >= 1) continue;
    const q = Math.floor((1 - d) * 3 + BAYER[(x & 3) + (y & 3) * 4]) / 3;
    if (q <= 0) continue;
    g.fillStyle = \`rgba(255,255,255,\${(q * .55).toFixed(3)})\`; g.fillRect(x, y, 1, 1);
  }
}).tex;
const lightPool = new THREE.Mesh(new THREE.PlaneGeometry(5, 5).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: poolTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, color: new THREE.Color(1, .62, .26), polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }));
lightPool.renderOrder = 1;
scene.add(lightPool);

// ═══════════════════════════ 12. 遊戲狀態 ═══════════════════════════
const G = { phase: 'title', left: SECONDS, score: 0, harvested: 0, shooed: 0, delivered: 0, deliveries: 0, lost: 0, gold: 0, basket: 0, combo: 0, comboT: 0, best: 0, round: 0, prog: 0, crowT: 7, goldT: 0, crate: 0, wind: 0, fullTold: false, nightTold: 0, auto: false, paused: false, hint: 0 };
let progOverride = null, nightOverride = null;
const golds = [];   // 晚上的金色螢火蟲
const virt = { x: 0, y: 0 };   // 測試用：腳本推的虛擬搖桿
const mult = () => (G.combo >= 6 ? 3 : G.combo >= 3 ? 2 : 1);
let hudOn = true;

function resetRound() {
  G.left = SECONDS; G.score = 0; G.harvested = 0; G.shooed = 0; G.delivered = 0; G.deliveries = 0; G.lost = 0; G.gold = 0;
  G.basket = 0; G.combo = 0; G.comboT = 0; G.crowT = 6.5; G.goldT = 2; G.crate = 0; G.fullTold = false; G.nightTold = 0;
  CELLS.forEach((c) => { c.crow = null; c.pop = 0; c.stage = rng() < .45 ? 3 : Math.floor(R(0, 3)); c.t = growTime(c) * R(.2, 1); });
  for (const cr of crows) { cr.on = false; cr.state = 'off'; cr.root.visible = false; cr.shadow.visible = false; cr.warn.visible = false; }
  golds.length = 0;
  F.path = null; F.goal = null;
  if (G.round > 1) { F.x = -2.9; F.z = 1.5; F.yaw = 1.2; }
}

// ── 收成、送貨、趕烏鴉 ──
const flying = [];   // 收成時飛進籃子的作物
function harvest(c) {
  if (G.basket >= BASKET) {
    if (!G.fullTold) { G.fullTold = true; larch.ui.toast('籃子滿了！送到小屋旁的木箱'); larch.sound('drop', .5); }
    return false;
  }
  G.combo = G.comboT > 0 ? G.combo + 1 : 1;
  G.comboT = 2.0;
  const pts = CROPS[c.type].pts * mult();
  G.score += pts; G.harvested++; G.basket++;
  const m = new THREE.Mesh(CROP_MESH[c.type][3].geo, voxMat);
  m.position.set(c.x, 0, c.z); m.rotation.y = c.rot;
  scene.add(m);
  flying.push({ m, t: 0, from: new V3(c.x, 0, c.z) });
  burst(c.x, .45, c.z, [...CROPS[c.type].fx, '#ffffff'], 16, { spread: 1.4, vy: undefined });
  popText(\`+\${pts}\`, c.x, 1.2, c.z, mult() > 1 ? '#f6757a' : '#fee761', mult() > 1 ? 1.25 : 1);
  larch.sound(c.type === 'pumpkin' ? 'coin' : 'pop', .55); larch.sound('pickup', .3);
  if (G.combo >= 3 && G.combo % 2 === 1) larch.sound('sparkle', .35);
  c.stage = 0; c.t = growTime(c); c.pop = 1;
  if (c.crow) { c.crow.cell = null; c.crow = null; }
  F.harvestT = .28;
  if (G.basket >= BASKET) { G.fullTold = true; larch.ui.toast('籃子滿了！送到小屋旁的木箱'); }
  return true;
}
function deliver() {
  const n = G.basket;
  if (!n) return;
  const pts = n * 5 + (n >= BASKET ? 20 : 0);
  G.score += pts; G.delivered += n; G.deliveries++; G.basket = 0; G.fullTold = false;
  G.crate = Math.min(1, G.crate + n / 32);
  G.wind = 3.5;
  const cx = vx(CRATE.x) * PX, cz = vx(CRATE.z) * PX;
  burst(cx, .8, cz, ['#fee761', '#feae34', '#ffffff'], 26, { spread: 2, vy: undefined });
  popText(\`+\${pts}\`, cx, 1.6, cz, '#ffffff', 1.35);
  larch.sound('coins', .6); larch.sound('chime', .4);
  larch.ui.toast(n >= BASKET ? \`送了一整籃！+\${pts}\` : \`送了 \${n} 個 +\${pts}\`);
  F.cheer = .6;
}
function scare(cr, byShout) {
  if (cr.state !== 'in' && cr.state !== 'eat') return;
  if (cr.cell) { cr.cell.crow = null; cr.cell = null; }
  cr.state = 'flee'; cr.t = 0;
  cr.vel.set(cr.pos.x - F.x, 0, cr.pos.z - F.z).setY(0);
  if (cr.vel.lengthSq() < .01) cr.vel.set(R(-1, 1), 0, R(-1, 1));
  cr.vel.normalize().multiplyScalar(6).setY(5);
  G.shooed++; G.score += 15;
  popText('+15', cr.pos.x, cr.pos.y + 1, cr.pos.z, '#ffffff');
  burst(cr.pos.x, cr.pos.y + .3, cr.pos.z, ['#262b44', '#181425', '#68386c'], 10, { soft: true, glow: 1, grav: 1.2, drag: 2.5, life: 1.2, vy: undefined, size: PX * 1.4 });
  larch.sound('flap', .6); if (!byShout) larch.sound('whoosh', .4);
}
function shout() {
  if (G.phase !== 'play' || F.shoutCd > 0) return;
  F.shoutCd = 1.2; F.shoutT = .5;
  larch.sound('pop', .5); larch.sound('whoosh', .5);
  for (let k = 0; k < 20; k++) { const a = k / 20 * TAU; spark(F.x + Math.cos(a) * .4, .6, F.z + Math.sin(a) * .4, '#ffffff', { vx: Math.cos(a) * 5, vy: 0, vz: Math.sin(a) * 5, grav: 0, drag: 4, life: .4, glow: 1.3 }); }
  popText('!', F.x, 2.1, F.z, '#ffffff', 1.3);
  for (const cr of crows) if (cr.on && Math.hypot(cr.pos.x - F.x, cr.pos.z - F.z) < 3.4 && cr.pos.y < 3) scare(cr, true);
}
function spawnCrow() {
  const free = crows.find((c) => !c.on);
  const ripe = CELLS.filter((c) => c.stage === 3 && !c.crow && Math.hypot(c.x - F.x, c.z - F.z) > 2.2);
  if (!free || !ripe.length) return false;
  const cell = ripe[Math.floor(rng() * ripe.length)];
  const a = R(0, TAU);
  free.from.set(Math.cos(a) * 13, R(5, 7), Math.sin(a) * 10);
  free.to.set(cell.x, .2, cell.z);
  free.ctrl.copy(free.from).lerp(free.to, .55).setY(R(4, 5.5));
  free.pos.copy(free.from);
  free.cell = cell; cell.crow = free;
  free.on = true; free.state = 'in'; free.t = 0; free.root.visible = true; free.loot.visible = false; free.shadow.visible = true;
  larch.sound('flap', .35);
  return true;
}
function retarget(cr) {
  const ripe = CELLS.filter((c) => c.stage === 3 && !c.crow);
  if (!ripe.length) { cr.state = 'leave'; cr.t = 0; cr.vel.set(cr.pos.x, 0, cr.pos.z).normalize().multiplyScalar(4).setY(3); return; }
  ripe.sort((a, b) => Math.hypot(a.x - cr.pos.x, a.z - cr.pos.z) - Math.hypot(b.x - cr.pos.x, b.z - cr.pos.z));
  const cell = ripe[0];
  cr.from.copy(cr.pos); cr.to.set(cell.x, .2, cell.z); cr.ctrl.copy(cr.from).lerp(cr.to, .5).setY(Math.max(cr.pos.y, 2.5) + 1);
  cr.cell = cell; cell.crow = cr; cr.state = 'in'; cr.t = 0;
}
function bez(a, b, c, t, out) { const u = 1 - t; return out.set(u * u * a.x + 2 * u * t * b.x + t * t * c.x, u * u * a.y + 2 * u * t * b.y + t * t * c.y, u * u * a.z + 2 * u * t * b.z + t * t * c.z); }
const _v = new V3(), _w = new V3();
function updateCrows(dt, time) {
  for (const cr of crows) {
    if (!cr.on) continue;
    cr.t += dt;
    const was = _w.copy(cr.pos);
    if (cr.state === 'in') {
      if (!cr.cell || cr.cell.stage !== 3) { if (cr.cell) cr.cell.crow = null; cr.cell = null; retarget(cr); }
      const k = Math.min(1, cr.t / 2.6);
      bez(cr.from, cr.ctrl, cr.to, 1 - (1 - k) * (1 - k), cr.pos);
      cr.flap = 14;
      if (k >= 1) { cr.state = 'eat'; cr.eatT = G.left < SECONDS * .35 ? 3.4 : 4.2; cr.t = 0; larch.sound('chomp', .35); }
    } else if (cr.state === 'eat') {
      cr.eatT -= dt; cr.flap = 0;
      cr.pos.y = .2 + Math.abs(Math.sin(time * 3)) * .04;
      if (Math.floor(cr.t * 2.5) % 3 === 0 && Math.floor((cr.t - dt) * 2.5) % 3 !== 0) burst(cr.pos.x, .35, cr.pos.z, ['#e4a672', '#63c74d'], 3, { soft: true, glow: 1, spread: .8, life: .5, size: PX });
      if (cr.eatT <= 0) {
        const c = cr.cell;
        if (c) { c.stage = 0; c.t = growTime(c); c.pop = 1; c.crow = null; }
        cr.cell = null; G.lost++;
        cr.state = 'leave'; cr.t = 0; cr.loot.visible = true;
        cr.vel.set(cr.pos.x, 0, cr.pos.z).normalize().multiplyScalar(3.5).setY(3.2);
        popText('-1', cr.pos.x, 1.3, cr.pos.z, '#e43b44');
        larch.sound('error', .3);
      }
    } else {
      cr.vel.y += (cr.state === 'flee' ? 2 : 1) * dt;
      cr.pos.addScaledVector(cr.vel, dt);
      cr.flap = cr.state === 'flee' ? 22 : 13;
      if (cr.t > 4 || cr.pos.y > 14) { cr.on = false; cr.state = 'off'; cr.root.visible = false; cr.shadow.visible = false; cr.warn.visible = false; }
    }
    // 樣子：朝飛的方向、拍翅膀、啄東西
    _v.subVectors(cr.pos, was);
    if (cr.state === 'eat') { if (Math.hypot(F.x - cr.pos.x, F.z - cr.pos.z) < 3) cr.yaw = lerp(cr.yaw, Math.atan2(F.x - cr.pos.x, F.z - cr.pos.z) + Math.PI, .05); }
    else if (_v.x * _v.x + _v.z * _v.z > 1e-6) { let want = Math.atan2(_v.x, _v.z), d = want - cr.yaw; d = Math.atan2(Math.sin(d), Math.cos(d)); cr.yaw += d * Math.min(1, dt * 8); }
    cr.root.position.copy(cr.pos);
    cr.root.rotation.y = cr.yaw;
    const f = cr.flap ? Math.sin(time * cr.flap) * 1.0 : -.15;
    cr.wingL.rotation.z = -f; cr.wingR.rotation.z = f;
    cr.head.rotation.x = cr.state === 'eat' ? (Math.sin(time * 9) > .3 ? .75 : .05) : 0;
    cr.body.rotation.x = cr.state === 'in' ? .15 : cr.state === 'eat' ? .2 : -.25;
    cr.shadow.position.set(Math.round(cr.pos.x / PX) * PX, .012, Math.round(cr.pos.z / PX) * PX);
    cr.shadow.scale.setScalar(clamp(.8 - cr.pos.y * .06, .3, .8));
    cr.shadow.visible = cr.pos.y < 9;
    // 正在偷吃：頭上閃紅色的驚嘆號（快吃完時閃得更快）
    cr.warn.visible = cr.state === 'eat' && Math.floor(time * (cr.eatT < 1.5 ? 8 : 4)) % 2 === 0;
    if (cr.warn.visible) { cr.warn.position.set(cr.pos.x, cr.pos.y + 1.05, cr.pos.z); }
  }
}

// ═══════════════════════════ 13. 鏡頭（立體模型的角度，慢慢轉；可以拖曳轉）═══════════════════════════
const CAM = { yaw: .62, pitch: .66, dist: 1, sway: .16, spin: 0, user: 0, userPitch: 0, follow: null, zoom: 1, target: null };
const camT = new V3(0, -1.6, .5);
let camYaw = CAM.yaw, camPitch = CAM.pitch, spinYaw = 0, camSnap = false;
// 手機直拿：轉一點角度，整座島（連風車）斜斜地放進窄窄的畫面
const baseYaw = () => CAM.yaw + (camera.aspect < .82 ? .33 : 0);
function placeCamera(dt, time) {
  const tall = camera.aspect < .82;
  spinYaw += CAM.spin * dt;
  const wantYaw = baseYaw() + CAM.user + spinYaw + Math.sin(time * .09) * CAM.sway;
  const wantPitch = clamp((tall ? .86 : CAM.pitch) + CAM.userPitch, .3, 1.25);
  const ease = camSnap ? 1 : 1 - Math.exp(-dt * 5), ease3 = camSnap ? 1 : 1 - Math.exp(-dt * 3);
  let dYaw = wantYaw - camYaw; dYaw = Math.atan2(Math.sin(dYaw), Math.cos(dYaw));   // 走最短的那一邊
  camYaw += dYaw * ease;
  camPitch = lerp(camPitch, wantPitch, ease);
  const tanV = Math.tan(camera.fov * Math.PI / 360), tanH = tanV * camera.aspect;
  const dist = Math.max((tall ? 19.8 : 27) / (2 * tanH), (tall ? 22 : 24.5) / (2 * tanV)) * CAM.dist / CAM.zoom;
  const follow = CAM.follow ?? (tall ? .15 : .12);
  const tx = (CAM.target ? CAM.target[0] : (tall ? .6 : 0)) + F.x * follow, tz = (CAM.target ? CAM.target[2] : .4) + F.z * follow, ty = CAM.target ? CAM.target[1] : (tall ? -2 : -2.5);
  camT.x = lerp(camT.x, tx, ease3); camT.y = lerp(camT.y, ty, ease3); camT.z = lerp(camT.z, tz, ease3);
  camSnap = false;
  const c = Math.cos(camPitch);
  camera.position.set(camT.x + Math.sin(camYaw) * c * dist, camT.y + Math.sin(camPitch) * dist, camT.z + Math.cos(camYaw) * c * dist);
  camera.lookAt(camT);
}
// 夕陽和月亮放在小島後面（照預設的鏡頭方向）
function skyDisc(sprite, az, el, size, dist = 95) {
  const yaw = baseYaw() + Math.PI + az;
  sprite.position.set(Math.sin(yaw) * Math.cos(el) * dist, Math.sin(el) * dist - 2, Math.cos(yaw) * Math.cos(el) * dist);
  sprite.scale.set(size, size, 1);
}

// ═══════════════════════════ 14. 輸入 ═══════════════════════════
larch.input.useStick(true);
larch.input.onKey((code, isDown) => {
  if (!isDown) return;
  if (code === 'Space') shout();
  if (code === 'KeyQ') CAM.user += Math.PI / 4;
  if (code === 'KeyE') CAM.user -= Math.PI / 4;
});
larch.input.onDrag((p, d) => { CAM.user -= d.x * 2.2; CAM.userPitch = clamp(CAM.userPitch - d.y * 1.1, -.35, .5); });
larch.input.onTap((p) => {
  if (G.phase !== 'play') return;
  // 點到烏鴉：走過去趕牠
  for (const cr of crows) {
    if (!cr.on || (cr.state !== 'eat' && cr.state !== 'in')) continue;
    const s = cr.pos.clone().project(camera);
    if (Math.hypot((s.x - p.x) * camera.aspect, s.y - p.y) < .09) { walkTo(cr.pos.x, cr.pos.z); return; }
  }
  const hit = larch.screenToGround(p.x, p.y, 0);
  if (hit) walkTo(hit.x, hit.z);
});
if (PHONE) larch.ui.button('吆喝！', shout, { at: 'bottom-right', color: 'yellow', id: 'shout' });
function walkTo(x, z, quiet) {
  const path = findPath(F.x, F.z, x, z);
  if (!path) return false;
  F.path = path; F.goal = [x, z];
  if (!quiet) { mark.visible = true; markT = 0; mark.position.set(Math.round(x / PX) * PX, .015, Math.round(z / PX) * PX); }
  return true;
}

// ── 自動玩（測試、錄影用）：找最近的成熟作物、趕烏鴉、送貨、抓金色螢火蟲 ──
let autoT = 0;
function autopilot(dt) {
  autoT -= dt;
  if (autoT > 0 && F.path && F.path.length) return;
  autoT = .45;
  const d = (x, z) => Math.hypot(x - F.x, z - F.z);
  const threat = crows.filter((c) => c.on && c.state === 'eat').sort((a, b) => d(a.pos.x, a.pos.z) - d(b.pos.x, b.pos.z))[0];
  if (threat && (threat.eatT < 2.6 || d(threat.pos.x, threat.pos.z) < 3)) {
    if (d(threat.pos.x, threat.pos.z) < 3.2 && F.shoutCd <= 0 && threat.eatT < 1.6) { shout(); return; }
    walkTo(threat.pos.x, threat.pos.z, true); return;
  }
  const gold = golds.filter((g) => d(g.x, g.z) < 4).sort((a, b) => d(a.x, a.z) - d(b.x, b.z))[0];
  if (gold) { walkTo(gold.x, gold.z, true); return; }
  if (G.basket >= BASKET) { walkTo(vx(CRATE.x) * PX + .2, vx(CRATE.z) * PX + 1.05, true); return; }
  const ripe = CELLS.filter((c) => c.stage === 3).sort((a, b) => d(a.x, a.z) - d(b.x, b.z));
  if (ripe.length) { walkTo(ripe[0].x, ripe[0].z, true); return; }
  if (G.basket > 0) { walkTo(vx(CRATE.x) * PX + .2, vx(CRATE.z) * PX + 1.05, true); return; }
  const soon = CELLS.filter((c) => c.stage === 2).sort((a, b) => a.t - b.t)[0];
  if (soon) walkTo(soon.x + .6, soon.z, true);
}

// ═══════════════════════════ 15. 天色：夕陽 → 黃昏 → 夜晚 ═══════════════════════════
const DAY_GOLD = new THREE.Color(1.07, 1.0, .9), DAY_DUSK = new THREE.Color(1.04, .76, .74);
let nightNow = 0, glowNow = .5;
function applySky(prog, time) {
  const night = nightOverride ?? smooth(.48, .76, prog);
  nightNow = night;
  U.night.value = night;
  U.day.value.copy(DAY_GOLD).lerp(DAY_DUSK, smooth(.1, .5, prog));
  glowNow = lerp(.62, 1.75, smooth(.42, .62, Math.max(prog, nightOverride !== null ? night : 0)));
  glowMat.color.setScalar(glowNow);
  waterMat.color.setRGB(lerp(1, .85, night), lerp(1, .85, night), 1);
  fallMat.color.setRGB(lerp(1.05, .6, night), lerp(1, .68, night), lerp(.95, 1, night));
  // 夕陽往下沉、變紅變淡；月亮從另一邊升起
  const sp = smooth(0, .62, prog);
  skyDisc(sunSprite, -.62, lerp(-.2, -.82, sp), lerp(13, 15, sp));
  sunSprite.material.opacity = 1 - smooth(.5, .7, prog);
  sunSprite.material.color.setRGB(lerp(1.6, 1.2, sp), lerp(1.4, .7, sp), lerp(1.2, .6, sp));
  const mp = smooth(.45, .95, prog);
  skyDisc(moonSprite, .82, lerp(-.62, -.2, mp), 9.5);
  moonSprite.material.opacity = smooth(.5, .66, prog);
  moonSprite.material.color.setScalar(1.3);
  // 星星
  const sa = smooth(.55, .85, Math.max(prog, night));
  for (let k = 0; k < STAR_N; k++) {
    const tw = Math.sin(time * (1.5 + H(k, 4, 9) * 3) + H(k, 5, 9) * TAU);
    stars.a[k] = sa * (tw > .6 ? 1 : tw > -.2 ? .55 : .2) * (H(k, 6, 9) > .3 ? 1 : .5);
  }
  stars.geo.attributes.palpha.needsUpdate = true;
  lightPool.material.opacity = smooth(.5, .8, Math.max(prog, night));
}

// ═══════════════════════════ 16. 每一格 ═══════════════════════════
let dustT = 0, smokeT = 0, mistT = 0, glintT = 0, leafT = 0, hudKey = '';
function hud() {
  if (!hudOn) return;
  const left = Math.max(0, Math.ceil(G.left));
  const key = \`\${G.phase}|\${G.score}|\${G.basket}|\${left}|\${G.combo}|\${G.comboT > 0}|\${nightNow > .5}\`;
  if (key === hudKey) return;
  hudKey = key;
  larch.ui.text('score', \`分數 \${G.score}\`, { at: 'top-left', size: 'big' });
  larch.ui.bar('basket', G.basket / BASKET, { at: 'top-left', label: \`籃子 \${G.basket}／\${BASKET}\${G.basket >= BASKET ? '　滿了！' : ''}\`, color: G.basket >= BASKET ? '#e43b44' : '#feae34' });
  larch.ui.text('time', \`\${left <= 10 && G.phase === 'play' ? '⏰' : nightNow > .5 ? '🌙' : '🌇'} \${Math.floor(left / 60)}:\${String(left % 60).padStart(2, '0')}\`, { at: 'top-right', size: 'medium' });
  if (G.combo >= 2 && G.comboT > 0 && G.phase === 'play') larch.ui.text('combo', \`連擊 \${G.combo}\${mult() > 1 ? \`　分數 ×\${mult()}\` : ''}\`, { at: 'top' });
  else larch.ui.remove('combo');
}
const _c = new V3(), camRight = new V3(), camUp = new V3();
larch.onUpdate((dt, time) => {
  PSCALE.value = larch.renderer.getDrawingBufferSize(_db).y / (2 * Math.tan(camera.fov * Math.PI / 360));
  stars.mat.uniforms.uPx.value = larch.renderer.getPixelRatio();
  const play = G.phase === 'play' && !G.paused;
  if (play) {
    G.left = Math.max(0, G.left - dt);
    G.prog = 1 - G.left / SECONDS;
  } else if (G.phase === 'rewind') G.prog = Math.max(0, G.prog - dt * .7);
  const prog = progOverride ?? G.prog;
  applySky(prog, time);

  // ── 農夫走路 ──
  let mx = 0, mz = 0, speed = 0;
  if (play) {
    const ax = larch.input.axis;
    const ix = clamp(ax.x + virt.x, -1, 1), iy = clamp(ax.y + virt.y, -1, 1), len = Math.hypot(ix, iy);
    if (len > .12) {
      F.path = null; F.goal = null; mark.visible = false;
      const fx = -Math.sin(camYaw), fz = -Math.cos(camYaw), rx = Math.cos(camYaw), rz = -Math.sin(camYaw);
      mx = (rx * ix + fx * iy) / Math.max(1, len); mz = (rz * ix + fz * iy) / Math.max(1, len);
      speed = SPEED * Math.min(1, len);
    } else {
      if (G.auto) autopilot(dt);
      if (F.path && F.path.length) {
        const [tx, tz] = F.path[0], dx = tx - F.x, dz = tz - F.z, dd = Math.hypot(dx, dz);
        if (dd < .12) { F.path.shift(); if (!F.path.length) { F.path = null; mark.visible = false; } }
        else { mx = dx / dd; mz = dz / dd; speed = SPEED * Math.min(1, dd * 3 + .4); }
      }
    }
    if (F.harvestT > 0) speed *= .55;
  }
  if (speed > 0) {
    const step = speed * dt;
    const nx = F.x + mx * step, nz = F.z + mz * step;
    if (freeAt(nx, nz)) { F.x = nx; F.z = nz; }
    else if (freeAt(nx, F.z)) F.x = nx;
    else if (freeAt(F.x, nz)) F.z = nz;
    else F.path = null;
    let d = Math.atan2(mx, mz) - F.yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
    F.yaw += d * Math.min(1, dt * 12);
    F.walk += step * 3.2;
  }
  F.speed = lerp(F.speed, speed, 1 - Math.exp(-dt * 12));
  F.harvestT = Math.max(0, F.harvestT - dt); F.shoutT = Math.max(0, F.shoutT - dt); F.shoutCd = Math.max(0, F.shoutCd - dt); F.cheer = Math.max(0, F.cheer - dt);
  // 小農夫的動作：走路擺手、收成時蹲一下、吆喝時舉手、夜晚提燈籠
  {
    const fm = farmer, moving = clamp(F.speed / SPEED, 0, 1), sw = Math.sin(F.walk) * moving;
    fm.root.position.set(F.x, 0, F.z);
    fm.root.rotation.y = F.yaw;
    const bob = Math.abs(Math.sin(F.walk)) * moving * .07 + (G.phase === 'end' ? Math.abs(Math.sin(time * 7)) * .18 : 0) + (F.cheer > 0 ? Math.sin(F.cheer / .6 * Math.PI) * .25 : 0);
    fm.body.position.y = 2 * PX + bob - (F.harvestT > 0 ? Math.sin(F.harvestT / .28 * Math.PI) * .09 : 0);
    fm.body.rotation.x = F.harvestT > 0 ? Math.sin(F.harvestT / .28 * Math.PI) * .35 : moving * .08;
    fm.legL.rotation.x = sw * .8; fm.legR.rotation.x = -sw * .8;
    const up = F.shoutT > 0 || G.phase === 'end' || F.cheer > 0;
    fm.armL.rotation.x = up ? -2.6 + Math.sin(time * 14) * .2 : -sw * .7;
    fm.armR.rotation.x = up ? -2.6 - Math.sin(time * 14) * .2 : sw * .7 + (F.harvestT > 0 ? -.9 : 0);
    fm.armL.rotation.z = up ? -.3 : 0; fm.armR.rotation.z = up ? .3 : 0;
    fm.head.rotation.y = F.speed < .2 ? Math.sin(time * .8) * .25 : 0;
    fm.fills.forEach((f, k) => { f.visible = G.basket >= [1, Math.ceil(BASKET * .45), BASKET][k]; });
    fm.basket.visible = !up || G.phase !== 'end';
    fm.lantern.visible = nightNow > .35;
    farmerShadow.position.set(Math.round(F.x / PX) * PX, .012, Math.round(F.z / PX) * PX);
    lightPool.position.set(Math.round(F.x / PX) * PX, .02, Math.round(F.z / PX) * PX);
  }

  // ── 作物長大、收成、送貨 ──
  if (G.phase === 'play' || G.phase === 'title') for (const c of CELLS) {
    c.pop = Math.max(0, c.pop - dt * 3.5);
    if (c.stage < 3 && !G.paused) { c.t -= dt; if (c.t <= 0) { c.stage++; c.t = growTime(c); c.pop = 1; if (c.stage === 3) burst(c.x, .5, c.z, ['#fee761', '#ffffff'], 5, { spread: .6, vy: undefined, life: .5, size: PX }); } }
  }
  if (play) {
    let best = null, bd = .62;
    for (const c of CELLS) { if (c.stage !== 3) continue; const dd = Math.hypot(c.x - F.x, c.z - F.z); if (dd < bd) { bd = dd; best = c; } }
    if (best) harvest(best);
    if (G.basket > 0 && Math.hypot(vx(CRATE.x) * PX - F.x, vx(CRATE.z) * PX - F.z) < 1.25) deliver();
    G.comboT = Math.max(0, G.comboT - dt);
    if (G.comboT <= 0) G.combo = 0;
    // 烏鴉：越晚來得越多
    if (MAX_CROWS > 0) {
      G.crowT -= dt;
      if (G.crowT <= 0) {
        const active = crows.filter((c) => c.on && c.state !== 'leave' && c.state !== 'flee').length;
        if (active < MAX_CROWS) spawnCrow();
        G.crowT = lerp(7.5, 3.6, G.prog) * R(.75, 1.25);
      }
    }
    for (const cr of crows) if (cr.on && (cr.state === 'eat' || (cr.state === 'in' && cr.pos.y < 2.4)) && Math.hypot(cr.pos.x - F.x, cr.pos.z - F.z) < 1.55) scare(cr, false);
    // 晚上的金色螢火蟲
    if (nightNow > .55) {
      G.goldT -= dt;
      if (G.goldT <= 0 && golds.length < 3) {
        G.goldT = R(3, 5.5);
        for (let k = 0; k < 20; k++) { const x = R(-7, 7.5), z = R(-3.5, 5); if (freeAt(x, z) && Math.hypot(x - F.x, z - F.z) > 2.5) { golds.push({ x, z, y: R(.5, 1.1), age: 0, ph: R(0, TAU), vx: R(-.4, .4), vz: R(-.4, .4) }); break; } }
      }
    }
    if (!G.hint && G.harvested > 2) { G.hint = 1; larch.ui.remove('hint'); }
    if (G.nightTold === 0 && G.prog > .48) { G.nightTold = 1; larch.ui.toast('太陽下山了，點燈囉'); larch.sound('magic', .35); }
    if (G.nightTold === 1 && nightNow > .6) { G.nightTold = 2; larch.ui.toast('金色螢火蟲出來了！碰到 +20'); }
  }
  for (let i = golds.length - 1; i >= 0; i--) {
    const g = golds[i];
    g.age += dt;
    g.vx += Math.sin(time * 1.3 + g.ph) * dt * .8; g.vz += Math.cos(time * 1.1 + g.ph * 2) * dt * .8;
    g.vx *= .985; g.vz *= .985;
    const nx = g.x + g.vx * dt, nz = g.z + g.vz * dt;
    if (freeAt(nx, nz)) { g.x = nx; g.z = nz; } else { g.vx *= -1; g.vz *= -1; }
    // 一個發亮的十字（像素畫的星光），一閃一閃
    const bright = Math.sin(time * 6 + g.ph) > -.3 ? 1 : .4, gy = g.y + Math.sin(time * 2 + g.ph) * .15;
    const once = { vx: 0, vy: 0, vz: 0, grav: 0, life: Math.max(.001, dt) * 1.5, kind: 'still' };
    spark(g.x, gy, g.z, '#fff6b0', { ...once, size: PX * 2.2, glow: 3.2 * bright });
    camRight.setFromMatrixColumn(camera.matrixWorld, 0).multiplyScalar(PX * 2.4); camUp.setFromMatrixColumn(camera.matrixWorld, 1).multiplyScalar(PX * 2.4);
    for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) spark(g.x + camRight.x * a + camUp.x * b, gy + camRight.y * a + camUp.y * b, g.z + camRight.z * a + camUp.z * b, '#feae34', { ...once, size: PX * 1.3, glow: 2 * bright });
    if (play && Math.hypot(g.x - F.x, g.z - F.z) < .85) {
      G.score += 20; G.gold++;
      burst(g.x, g.y, g.z, ['#fee761', '#ffffff', '#feae34'], 18, { spread: 1.5, vy: undefined });
      popText('+20', g.x, g.y + .8, g.z, '#fee761', 1.2);
      larch.sound('sparkle', .55);
      golds.splice(i, 1);
    } else if (g.age > 14 || G.phase === 'end') golds.splice(i, 1);
  }
  if (!G.paused) updateCrows(dt, time);
  if (G.phase === 'end') for (const cr of crows) if (cr.on && (cr.state === 'in' || cr.state === 'eat')) { cr.state = 'leave'; cr.t = 0; if (cr.cell) { cr.cell.crow = null; cr.cell = null; } cr.vel.set(cr.pos.x, 0, cr.pos.z).normalize().multiplyScalar(4).setY(3); }

  // 飛進籃子的作物
  for (let i = flying.length - 1; i >= 0; i--) {
    const f = flying[i];
    f.t += dt / .4;
    farmer.basket.getWorldPosition(_c);
    const k = Math.min(1, f.t);
    f.m.position.lerpVectors(f.from, _c, k).setY(lerp(0, _c.y, k) + Math.sin(k * Math.PI) * .9);
    f.m.scale.setScalar(1 - k * .7);
    f.m.rotation.y += dt * 9;
    if (f.t >= 1) { scene.remove(f.m); flying.splice(i, 1); }
  }
  drawCrops(time);

  // ── 小島上的小動靜 ──
  G.wind = Math.max(0, G.wind - dt);
  blades.rotation.z -= dt * (.55 + G.wind * .9);
  arrow.visible = G.basket >= BASKET && G.phase === 'play';
  if (arrow.visible) { arrow.position.set(vx(CRATE.x) * PX, 1.5 + Math.abs(Math.sin(time * 4)) * .3, vx(CRATE.z) * PX); arrow.rotation.y = time * 2; }
  heap.visible = G.crate > 0;
  heap.scale.set(1, Math.max(.34, Math.ceil(G.crate * 3) / 3), 1);
  if (mark.visible) { markT += dt; mark.scale.setScalar(1 - Math.min(.5, markT)); mark.material.opacity = Math.max(0, 1 - markT * 1.2); if (markT > 1) mark.visible = false; }
  if (Math.floor(time * 6) !== waterT) { waterT = Math.floor(time * 6); drawWater(waterT / 6, nightNow > .5); }
  fallTex.tex.offset.y = Math.floor(time * 20) / 32;
  // 煙囪的煙
  smokeT -= dt;
  if (smokeT <= 0) { smokeT = .3; softFx.add({ kind: 'smoke', x: (CHIMNEY.x + 1.5) * PX, y: (CHIMNEY.top + .5) * PX, z: (CHIMNEY.z + 1.5) * PX, vx: .15, vy: .55, vz: -.05, grav: 0, drag: .2, life: 3.2, size: PX * 2, r: .55, g: .5, b: .6, a: .7, ph: R(0, TAU) }); }
  // 瀑布底下的水霧、往下掉的水珠
  mistT -= dt;
  if (mistT <= 0) {
    mistT = .05;
    spark(FALL_TOP.x + R(-.3, .3), FALL_TOP.y - R(0, 5), FALL_TOP.z + .05, '#bff6ff', { vx: 0, vy: -3, vz: R(0, .2), grav: 2, drag: 0, life: .9, size: PX, glow: lerp(1.1, .6, nightNow) });
    spark(FALL_BOTTOM.x + R(-.4, .4), FALL_BOTTOM.y + R(0, 1), FALL_BOTTOM.z, '#ffffff', { vx: R(-.4, .4), vy: R(-.2, .4), vz: R(0, .5), grav: -.2, drag: 1, life: 1.6, size: PX * 1.5, glow: lerp(.7, .35, nightNow), a: .7 });
  }
  // 夕陽下飄著的金色灰塵；晚上換成螢火蟲
  dustT -= dt;
  if (dustT <= 0) {
    dustT = .09;
    const nightFly = rng() < nightNow;
    const x = R(-8, 8), z = R(-5.5, 6), y = R(.3, 3);
    if (nightFly) glowFx.add({ kind: 'fly', x, y: R(.3, 1.8), z, vx: R(-.3, .3), vy: R(-.1, .1), vz: R(-.3, .3), grav: 0, drag: 0, life: R(4, 7), size: PX * (rng() < .3 ? 1.5 : 1), r: .9, g: 1.6, b: .35, a: 1, ph: R(0, TAU) });
    else if (rng() < .7) glowFx.add({ kind: 'dust', x, y, z, vx: R(-.15, .15), vy: R(.02, .12), vz: R(-.15, .15), grav: 0, drag: 0, life: R(3, 6), size: PX, r: 1.2, g: .85, b: .45, a: .55, ph: R(0, TAU) });
  }
  // 成熟的作物偶爾閃一下
  glintT -= dt;
  if (glintT <= 0) {
    glintT = .16;
    const ripe = CELLS.filter((c) => c.stage === 3);
    if (ripe.length) { const c = ripe[Math.floor(rng() * ripe.length)]; spark(c.x + R(-.3, .3), R(.5, .9), c.z + R(-.3, .3), '#ffffff', { vx: 0, vy: .3, vz: 0, grav: 0, drag: 0, life: .45, size: PX, kind: 'glint', glow: 2.2 }); }
  }
  // 秋天的樹掉葉子
  leafT -= dt;
  if (leafT <= 0) {
    leafT = R(.5, 1.2);
    const t = TREES[Math.floor(rng() * TREES.length)];
    const pal = t.kind === 'autumn' ? ['#f77622', '#feae34', '#be4a2f'] : t.kind === 'blossom' ? ['#f6757a', '#ffc2d4', '#ffffff'] : ['#63c74d', '#94d65a'];
    const [r, g, b] = lin(pal[Math.floor(rng() * pal.length)], 1);
    softFx.add({ kind: 'leaf', x: t.x + R(-1, 1) * t.r, y: t.y - t.r * .3, z: t.z + R(-1, 1) * t.r, vx: R(.1, .4), vy: -.35, vz: R(-.1, .2), grav: 0, drag: 0, life: 4, size: PX, r, g, b, a: 1, ph: R(0, TAU) });
  }
  // 粒子
  for (const pool of [glowFx, softFx]) {
    const L = pool.list;
    for (let i = L.length - 1; i >= 0; i--) {
      const p = L[i];
      p.age += dt;
      if (p.age >= p.life) { L[i] = L[L.length - 1]; L.pop(); continue; }
      const k = p.age / p.life;
      if (p.kind === 'smoke') { p.vx += .05 * dt; p.size = PX * (2 + Math.floor(k * 3)); p.alpha = p.a * (1 - k) * (.6 + .4 * (1 - nightNow)); }
      else if (p.kind === 'fly') { p.vx += Math.sin(p.age * 1.7 + p.ph) * dt * .6; p.vz += Math.cos(p.age * 1.3 + p.ph) * dt * .6; p.vy = Math.sin(p.age * 2 + p.ph) * .15; p.alpha = nightNow * Math.min(1, k * 5, (1 - k) * 4) * (Math.sin(p.age * 4 + p.ph) > 0 ? 1 : .15); }
      else if (p.kind === 'dust') { p.alpha = p.a * (1 - nightNow) * Math.min(1, k * 4, (1 - k) * 4); }
      else if (p.kind === 'leaf') { p.x += Math.sin(p.age * 3 + p.ph) * dt * .5; p.alpha = Math.min(1, (1 - k) * 4); if (p.y < -.05 && Math.abs(p.x) < 9 && Math.abs(p.z) < 7) { p.vy = 0; p.vx = 0; p.y = .01; } }
      else if (p.kind === 'glint') { p.alpha = Math.sin(k * Math.PI) > .5 ? 1 : .3; }
      else if (p.kind === 'still') p.alpha = p.a;
      else p.alpha = p.a * Math.min(1, (1 - k) * 3);
      p.vy -= (p.grav || 0) * dt;
      const dr = Math.exp(-(p.drag || 0) * dt);
      p.vx *= dr; p.vy *= p.kind === 'spark' ? 1 : dr; p.vz *= dr;
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
    }
    pool.draw();
  }
  updatePops(dt);
  placeCamera(dt, time);
  hud();
});

// ═══════════════════════════ 17. 測試用（作者試玩時）═══════════════════════════
// window.__windmill：看狀態、自動玩、推虛擬搖桿、跳到某個時間（天色）、調鏡頭、藏介面——錄宣傳片、拍封面用
if (larch.testPlay) window.__windmill = {
  get state() {
    return { phase: G.phase, left: +G.left.toFixed(2), prog: +(progOverride ?? G.prog).toFixed(3), night: +nightNow.toFixed(3), score: G.score, harvested: G.harvested, shooed: G.shooed, delivered: G.delivered, deliveries: G.deliveries, lost: G.lost, gold: G.gold, basket: G.basket, combo: G.combo, round: G.round,
      farmer: { x: +F.x.toFixed(2), z: +F.z.toFixed(2) }, ripe: CELLS.filter((c) => c.stage === 3).length, crows: crows.filter((c) => c.on).map((c) => ({ state: c.state, x: +c.pos.x.toFixed(2), y: +c.pos.y.toFixed(2), z: +c.pos.z.toFixed(2) })), golds: golds.length, faces: WORLD.faces };
  },
  autopilot(on = true) { G.auto = on !== false; },
  drive(x = 0, y = 0) { virt.x = x; virt.y = y; },
  walkTo: (x, z) => walkTo(x, z),
  place(x, z, yaw = F.yaw) { F.x = x; F.z = z; F.yaw = yaw; F.path = null; },
  shout,
  ripen(n = 99) { let k = 0; for (const c of CELLS) if (c.stage < 3 && k < n) { c.stage = 3; c.pop = 1; k++; } return k; },
  crow(n = 1) { let k = 0; for (let i = 0; i < n; i++) if (spawnCrow()) k++; return k; },
  firefly(n = 1) { for (let i = 0; i < n; i++) golds.push({ x: R(-3, 4), z: R(-1, 4), y: R(.6, 1.1), age: 0, ph: R(0, TAU), vx: R(-.3, .3), vz: R(-.3, .3) }); },
  setProgress(p) { progOverride = p === null || p === undefined ? null : clamp(Number(p), 0, 1); if (progOverride !== null && G.phase === 'play') { G.left = SECONDS * (1 - progOverride); G.prog = progOverride; progOverride = null; } },
  night(v) { nightOverride = v === null || v === undefined ? null : clamp(Number(v), 0, 1); },
  cam: CAM,
  // 鏡頭預設：wide（整座島）、field（田）、house（小屋）、mill（風車）、farmer（跟著農夫）
  view(name = 'wide') {
    const V = { wide: { target: null, zoom: 1, follow: null }, field: { target: [.6, .2, 1.4], zoom: 2.1, follow: 0 }, house: { target: [-4.4, .9, -2.4], zoom: 2.9, follow: 0 }, mill: { target: [5.2, 2.4, -2.6], zoom: 2.2, follow: 0 }, farmer: { target: [0, .5, 0], zoom: 3.2, follow: 1 } };
    Object.assign(CAM, V[name] || V.wide);
  },
  snap() { camSnap = true; },   // 鏡頭直接跳到位（不慢慢滑過去）
  hud(show = true) { hudOn = show !== false; larch.ui.root.style.visibility = hudOn ? '' : 'hidden'; hudKey = ''; },
  pause(on = true) { G.paused = on !== false; },
  seed(s) { reseed(s); },
  end() { G.left = 0; },
  get timeLeft() { return G.left; },
};

// ═══════════════════════════ 18. 流程 ═══════════════════════════
const until = (fn) => new Promise((res) => { const off = larch.onUpdate(() => { if (fn()) { off(); res(); } }); });
const RANKS = [[0, '見習小農夫'], [700, '勤勞小農夫'], [1500, '豐收能手'], [2600, '風車島傳說']];
resetRound();
placeCamera(1, 0);
let first = true;
for (;;) {
  G.round++;
  resetRound();
  if (!first) { G.phase = 'rewind'; await until(() => G.prog <= 0); }
  G.phase = 'title'; G.prog = 0;
  CAM.spin = 0; spinYaw = 0;
  hud();
  if (first) await larch.ui.banner('像素風車島', PHONE ? '搖桿或點地面走路・走過成熟的作物就收成\\n籃子滿了送到木箱・烏鴉來了按「吆喝」' : 'WASD／方向鍵或點地面走路・走過成熟的作物就收成\\n籃子滿了送到木箱・走近烏鴉或按空白鍵趕走牠');
  else await larch.ui.banner(\`第 \${G.round} 天\`, '又是收成的傍晚');
  first = false;
  G.phase = 'play';
  if (!G.hint && !PHONE) larch.ui.text('hint', 'WASD 走路・點地面走過去・拖曳或 Q／E 轉視角・空白鍵吆喝', { at: 'bottom', size: 'small' });
  await until(() => G.left <= 0);
  G.phase = 'end';
  CAM.spin = .1;
  larch.ui.remove('hint'); larch.ui.remove('combo');
  F.path = null;
  larch.sound('levelup', .6);
  const cx = vx(CRATE.x) * PX, cz = vx(CRATE.z) * PX;
  burst(cx, 1, cz, ['#fee761', '#f6757a', '#2ce8f5', '#ffffff'], 40, { spread: 2.4, vy: undefined, life: 1.2 });
  const newBest = G.score > G.best && G.score > 0;
  G.best = Math.max(G.best, G.score);
  const rank = RANKS.filter(([s]) => G.score >= s).pop()[1];
  await larch.ui.banner(newBest && G.round > 1 ? '新紀錄！' : '夜深了，收工！', \`\${rank}・分數 \${G.score}\`);
  const again = await larch.choose(\`今天收成 \${G.harvested} 個、送貨 \${G.deliveries} 次、趕走 \${G.shooed} 隻烏鴉\${G.gold ? \`、抓到 \${G.gold} 隻金色螢火蟲\` : ''}，得到 \${G.score} 分（\${rank}）。要再玩一天嗎？\`, ['再玩一天', '收工']);
  if (again !== 0) { larch.complete({ score: G.score, result: rank }); break; }
}
`},o=-Math.PI/2,t=(e,n,s,r,l=0)=>({key:e,name:n,nameEn:s,height:r,rotY:l}),H={space:{description:"Star Strike・3D 小遊戲卡的範例：方向鍵或 WASD（手機用搖桿）駕駛戰機，空白鍵或「發射」按鈕射擊，1／2／3 放飛彈、雷射與高速衝刺。兩台僚機跟著一起打，閃開隕石、擊落攔截機和重裝砲艇，撐到最後巨大的迴旋母艦會出現。戰機、僚機、敵機、隕石、母艦都是 AI 生成的模型卡，在卡片設定就能換成自己的。",models:[t("ship","戰機","Fighter",.55,o),t("wing","僚機","Wingman",.35,o),t("saucer","攔截機","Interceptor",.4,o),t("bug","重裝砲艇","Gunship",.7,o),t("rock","隕石","Asteroid",1.6),t("boss","母艦","Battleship",6,o)],params:[{key:"hp",label:"戰機耐久",labelEn:"Hull points",kind:"number",value:3500,min:500,max:2e4,step:100},{key:"speed",label:"戰機速度",labelEn:"Fighter speed",kind:"number",value:9,min:4,max:20,step:.5},{key:"waves",label:"母艦出現前的波數",labelEn:"Waves before the boss",kind:"number",value:5,min:1,max:20,step:1}],music:"/packs/larch-rpg-kingdom/music/battle.mp3",cover:"cover",scoreVar:"spaceScore",images:[{key:"captain",label:"艦長立繪",labelEn:"Captain portrait",file:"captain.png"},{key:"pilot",label:"飛行員立繪",labelEn:"Pilot portrait",file:"pilot.png"},{key:"ai",label:"AI 副駕立繪",labelEn:"AI co-pilot portrait",file:"ai.png"}]},snake:{description:"Snack Snake・3D 小遊戲卡的範例（方塊世界可愛風）：一節一節綠色圓角方塊的小蛇，在一顆小方塊堆成的大方塊上爬，六個面都能走，爬過邊緣就繞到隔壁那一面，方塊會跟著轉，小蛇在的那一面一直朝著你。方向鍵或 WASD（手機滑一下）照畫面上的方向轉彎，吃到蘋果就多一節，金星果加更多分；咬到自己就結束。蘋果、金星果是 AI 生成的模型卡；方塊大小、速度、蛇的顏色在參數裡就能換。",models:[t("apple","蘋果","Apple",.8),t("star","金星果","Star fruit",.8,o)],params:[{key:"size",label:"方塊每邊幾格",labelEn:"Cells per cube edge",kind:"number",value:8,min:5,max:12,step:1},{key:"speed",label:"速度（每秒幾格）",labelEn:"Speed (cells/s)",kind:"number",value:6,min:2,max:14,step:.5},{key:"body",label:"小蛇的顏色",labelEn:"Snake colour",kind:"color",value:"#6fd14f"}],music:"/packs/weird-doodle-creatures/music/01-tiptoe-through-bent-stars-a.mp3",cover:"cover",scoreVar:"snakeScore",story:{variable:"snakeLength",varLabel:"小蛇長度（節）",test:">=",value:"15",title:"小蛇長大了",titleEn:"The snake grew up",lines:[["小蛇","哇～我已經長到 15 節了！"],["小蛇","方塊世界的蘋果，我要全部吃光光！"]]}},td:{description:"Castle Keep・3D 小遊戲卡的範例（暗黑奇幻風）：點路旁的空地蓋塔（砲塔打得重、秘法塔會減速、弩砲塔射得快），用打怪拿到的金幣升級；酸液史萊姆、獸人戰士、巨甲蟲走到城堡就扣血。塔、怪物、城堡都是 AI 生成的模型卡。",models:[t("cannon","砲塔","Cannon tower",2.4),t("crystal","秘法塔","Arcane tower",2.6),t("archer","弩砲塔","Ballista tower",2.5),t("slime","酸液史萊姆","Acid slime",1,o),t("goblin","獸人戰士","Orc warrior",1.5,o),t("beetle","巨甲蟲","Giant scarab",1.2,o),t("castle","城堡","Castle",4.5,o)],params:[{key:"gold",label:"一開始的金幣",labelEn:"Starting gold",kind:"number",value:120,min:0,max:1e3,step:10},{key:"waves",label:"幾波",labelEn:"Waves",kind:"number",value:8,min:1,max:30,step:1},{key:"castleHp",label:"城堡血量",labelEn:"Castle HP",kind:"number",value:20,min:1,max:100,step:1}],music:"/packs/larch-rpg-kingdom/music/castle.mp3",cover:"cover",scoreVar:"tdScore"},chess:{description:"Marble Chess・3D 小遊戲卡的範例（大理石鑲金精品風）：點棋子再點目的地下棋，拖曳旋轉棋盤、滾輪縮放。一個人玩跟電腦下；打開多人連線，兩個人進同一個房間就能對弈。白棋與黑棋各六種都是 AI 生成的模型卡。",models:[t("king","白國王","White king",1),t("queen","白皇后","White queen",.92),t("rook","白城堡","White rook",.7),t("bishop","白主教","White bishop",.82),t("knight","白騎士","White knight",.8,o),t("pawn","白士兵","White pawn",.55),t("bKing","黑國王","Black king",1),t("bQueen","黑皇后","Black queen",.92),t("bRook","黑城堡","Black rook",.7),t("bBishop","黑主教","Black bishop",.82),t("bKnight","黑騎士","Black knight",.8),t("bPawn","黑士兵","Black pawn",.55)],params:[{key:"level",label:"電腦強度",labelEn:"Computer strength",kind:"choice",value:"normal",options:[{value:"easy",label:"輕鬆"},{value:"normal",label:"普通"},{value:"hard",label:"認真"}]},{key:"dark",label:"黑棋顏色（沒有黑棋模型時）",labelEn:"Dark tint (without black models)",kind:"color",value:"#2b2a2e"},{key:"board",label:"棋盤深色格",labelEn:"Dark squares",kind:"color",value:"#2f3a36"}],music:"/packs/starline-teahouse/music/01-last-tram-warm-tea.mp3",cover:"cover",players:2,scoreVar:"chessScore"},pottery:{description:"Pottery Studio・3D 小遊戲卡的範例（寫實工作室風）：轉盤上的陶土跟著手指上下拖曳往內壓、往外拉，做出碗、杯子或花瓶；陰乾之後上釉、拿毛筆自己彩繪（轉盤轉著畫出色帶，停下來自由畫），再貼上小花、愛心、小鳥、把手這些小裝飾，送進柴窯裡燒，燒好會照形狀打分數，可以存成圖片或分享到留言區。拉坯機和柴窯是 AI 生成的模型卡，陶土是程式即時算出來的形狀。",models:[t("wheel","拉坯機","Potter’s wheel",1),t("kiln","柴窯","Wood-fired kiln",2.2,o)],params:[{key:"clay",label:"陶土顏色",labelEn:"Clay colour",kind:"color",value:"#c98b62"},{key:"seconds",label:"拉坯時間（秒）",labelEn:"Shaping time (s)",kind:"number",value:60,min:15,max:300,step:5}],music:"/packs/larch-rpg-kingdom/music/farm.mp3",cover:"cover",scoreVar:"potteryScore"},icecream:{description:"Soft Serve Shop・3D 小遊戲卡的範例：客人會說要幾圈、什麼口味，按住拉桿（或按住畫面）擠出霜淇淋，甜筒會自己轉，放開就停；擠得越剛好、配料加得越對，小費越多。霜淇淋機、甜筒、企鵝和北極熊客人都是 AI 生成的模型卡。",models:[t("machine","霜淇淋機","Soft serve machine",1.6,o),t("cone","甜筒","Cone",.6),t("penguin","企鵝客人","Penguin customer",1.1,o),t("bear","北極熊客人","Polar bear customer",1.2,o)],params:[{key:"customers",label:"客人數",labelEn:"Customers",kind:"number",value:6,min:1,max:20,step:1},{key:"patience",label:"客人耐心（秒）",labelEn:"Patience (s)",kind:"number",value:25,min:8,max:90,step:1}],music:"/packs/weird-doodle-creatures/music/03-the-cloud-forgot-its-shoes-a.mp3",cover:"cover",scoreVar:"iceCreamTips"},windmill:{description:"Pixel Windmill Isle・3D 小遊戲卡的範例（像素藝術立體模型風）：漂在夜空裡的像素農場小島，從夕陽一路玩到天黑。WASD／方向鍵（手機用搖桿）或點地面讓小農夫走過去，走過成熟的小麥、胡蘿蔔、南瓜就收成，連續收成有連擊加分；籃子滿了送到小屋旁的木箱。烏鴉會飛下來偷吃，走近牠或按空白鍵（手機按「吆喝」）把牠趕走；天黑以後抓金色螢火蟲。整座島、風車、小屋、角色都是程式一格一格堆出來的像素方塊，不用任何模型檔。",models:[],params:[{key:"seconds",label:"一局幾秒",labelEn:"Round length (s)",kind:"number",value:90,min:20,max:600,step:5},{key:"basket",label:"籃子裝幾個",labelEn:"Basket size",kind:"number",value:8,min:3,max:30,step:1},{key:"crows",label:"同時最多幾隻烏鴉",labelEn:"Crows at once",kind:"number",value:3,min:0,max:6,step:1},{key:"speed",label:"農夫走路速度",labelEn:"Farmer speed",kind:"number",value:4.2,min:2,max:10,step:.2},{key:"overalls",label:"吊帶褲顏色",labelEn:"Overalls colour",kind:"color",value:"#2f86d8"}],music:"/packs/chibi-adventure/music/pinecone-village.mp3",cover:"cover",scoreVar:"windmillScore"}},se=S.map(e=>({...e,...H[e.id]})),h=z,y=(e,n)=>h[`mini-${e.id}/${n}`]??`/packs/larch-3d/tripo-games/mini-${e.id}/${n}`,w=(e,n)=>`mg-${e.id}-${n}`;function A(e,n){return{...v(n.name),source:"file",clay:void 0,file:{url:y(e,`${n.key}.glb`),format:"glb",name:`${n.key}.glb`},fit:{height:n.height,offset:[0,0,0],rotY:n.rotY??0},material:{preset:"scene"},ai:{provider:"tripo"}}}const P=e=>R[e]??"";function C(e){const n=e.models.map(a=>({key:a.key,label:a.name,labelEn:a.nameEn,kind:"model",value:w(e,a.key)})),s=e.music?M(e.music)||e.music:"",r=(e.images||[]).map(a=>({key:a.key,label:a.label,labelEn:a.labelEn,kind:"image",value:y(e,a.file)})),l=[...n,...r,...s?[{key:"bgm",label:"配樂",labelEn:"Music",kind:"music",value:s}]:[],...e.params];return b({v:1,code:P(e.id),params:l,values:{},scoreVar:e.scoreVar||"",online:!1,players:e.players??2,prompt:"",source:"sample"})}const f=(e,n,s,r)=>({id:e,type:"story",position:{x:n,y:s},data:r});function re(e,n,s){const r=new Date().toISOString(),l=`mg-${e.id}-story`,a=C(e),u=e.story?b({...a,stories:[{id:"s1",variable:e.story.variable,test:e.story.test,value:e.story.value,card:l,mode:"overlay",once:!0}]}):a,m=k(u),p=n("game"),x=n("model"),g=h[`mini-${e.id}/${e.cover}.webp`],E=[f(`mg-${e.id}-game`,120,120,{...p,title:e.name,pluginValues:{...p.pluginValues||{},game:JSON.stringify(u),summary:`3D 小遊戲 · ${e.blurb}`},pluginReadVars:[...new Set([...p.pluginReadVars||[],...m.reads])],pluginWriteVars:[...new Set([...p.pluginWriteVars||[],...m.writes])],localizations:[{locale:"en",title:e.nameEn}]}),...e.models.map((i,d)=>{const c=h[`mini-${e.id}/${i.key}.webp`];return f(w(e,i.key),120+d%6*340,520+Math.floor(d/6)*300,{...x,title:i.name,pluginValues:{...x.pluginValues||{},model:JSON.stringify({...A(e,i),...c?{thumb:c}:{}}),summary:"AI 生成模型",...c?{thumb:c}:{}},localizations:[{locale:"en",title:i.nameEn}]})}),...e.story?[f(l,480,120,{type:"dialogue",title:e.story.title,speaker:e.story.lines[0][0],text:e.story.lines[0][1],emotion:"開心",characterPosition:"left",dialogueLines:e.story.lines.map(([i,d],c)=>({id:`line-${c+1}`,speaker:i,text:d})),localizations:[{locale:"en",title:e.story.titleEn}]})]:[]];return{schemaVersion:1,id:`project-mini-${e.id}`,name:e.name,description:e.description,locale:"zh-Hant",languages:[{code:"zh-Hant",label:"繁體中文"},{code:"en",label:"English"}],createdAt:r,updatedAt:r,nodes:E,edges:[],media:[],characters:[],variables:[...e.scoreVar?[{id:`var-${e.scoreVar}`,name:e.scoreVar,label:e.scoreVar==="chessScore"?"棋局分數（贏 1、和 0.5、輸 0）":"小遊戲分數",type:"number",defaultValue:0}]:[],...e.story?[{id:`var-${e.story.variable}`,name:e.story.variable,label:e.story.varLabel,type:"number",defaultValue:0}]:[]],settings:{resolution:{width:1920,height:1080},textSpeed:32,...g?{titleCoverImage:g,titleCoverPositionX:50,titleCoverPositionY:50,titleCoverShade:.3}:{},plugins:{"larch-3d":{...s,settings:{...T({enabled:!1,scenes:[],cap:16,chat:!0,team:!1}),tutorial:"done"}}}}}}export{se as GAME_DEMOS,P as demoCode,y as demoFile,C as demoGameDoc,A as demoModelDoc,w as demoModelId,re as gameDemoProject};
