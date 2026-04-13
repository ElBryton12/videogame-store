export default function Logo({ size = 'md' }) {
  const scale = size === 'sm' ? 0.5 : size === 'lg' ? 1 : 0.7
  const w = Math.round(680 * scale)
  const h = Math.round(340 * scale)

  return (
    <svg width={w} height={h} viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="20" width="600" height="300" fill="#0a0a1a"/>
      <rect x="44" y="24" width="592" height="292" fill="#0d0d22"/>
      <rect x="40" y="20" width="600" height="8" fill="#ff2d78"/>
      <rect x="40" y="312" width="600" height="8" fill="#ff2d78"/>
      <rect x="40" y="20" width="8" height="300" fill="#ff2d78"/>
      <rect x="632" y="20" width="8" height="300" fill="#ff2d78"/>
      <rect x="40" y="20" width="16" height="16" fill="#ff2d78"/>
      <rect x="624" y="20" width="16" height="16" fill="#ff2d78"/>
      <rect x="40" y="304" width="16" height="16" fill="#ff2d78"/>
      <rect x="624" y="304" width="16" height="16" fill="#ff2d78"/>
      <g transform="translate(80,110)">
        <rect x="10" y="40" width="60" height="36" fill="#222244"/>
        <rect x="14" y="44" width="52" height="28" fill="#1a1a3a"/>
        <rect x="34" y="16" width="12" height="28" fill="#ff2d78"/>
        <rect x="30" y="12" width="20" height="8" fill="#ff2d78"/>
        <rect x="34" y="8" width="12" height="8" fill="#ff66aa"/>
        <rect x="16" y="50" width="10" height="10" fill="#00e5ff"/>
        <rect x="30" y="50" width="10" height="10" fill="#ff2d78"/>
        <rect x="44" y="50" width="10" height="10" fill="#ffe600"/>
        <rect x="58" y="50" width="10" height="10" fill="#39ff14"/>
      </g>
      <rect x="180" y="80" width="8" height="40" fill="#ff2d78"/>
      <rect x="188" y="80" width="24" height="8" fill="#ff2d78"/>
      <rect x="188" y="100" width="24" height="8" fill="#ff2d78"/>
      <rect x="212" y="80" width="8" height="28" fill="#ff2d78"/>
      <rect x="232" y="80" width="8" height="40" fill="#ff2d78"/>
      <rect x="252" y="80" width="8" height="40" fill="#ff2d78"/>
      <rect x="288" y="80" width="8" height="40" fill="#ff2d78"/>
      <rect x="260" y="96" width="8" height="8" fill="#ff2d78"/>
      <rect x="268" y="104" width="8" height="8" fill="#ff2d78"/>
      <rect x="276" y="96" width="8" height="8" fill="#ff2d78"/>
      <rect x="268" y="88" width="8" height="8" fill="#ff2d78"/>
      <rect x="260" y="112" width="8" height="8" fill="#ff2d78"/>
      <rect x="276" y="112" width="8" height="8" fill="#ff2d78"/>
      <rect x="308" y="80" width="8" height="40" fill="#ff2d78"/>
      <rect x="316" y="80" width="24" height="8" fill="#ff2d78"/>
      <rect x="316" y="100" width="20" height="8" fill="#ff2d78"/>
      <rect x="316" y="112" width="24" height="8" fill="#ff2d78"/>
      <rect x="356" y="80" width="8" height="40" fill="#ff2d78"/>
      <rect x="364" y="112" width="24" height="8" fill="#ff2d78"/>
      <rect x="180" y="148" width="8" height="32" fill="#00e5ff"/>
      <rect x="212" y="148" width="8" height="32" fill="#00e5ff"/>
      <rect x="188" y="168" width="8" height="8" fill="#00e5ff"/>
      <rect x="204" y="168" width="8" height="8" fill="#00e5ff"/>
      <rect x="196" y="176" width="8" height="8" fill="#00e5ff"/>
      <rect x="232" y="148" width="8" height="40" fill="#00e5ff"/>
      <rect x="264" y="148" width="8" height="40" fill="#00e5ff"/>
      <rect x="240" y="148" width="24" height="8" fill="#00e5ff"/>
      <rect x="240" y="168" width="24" height="8" fill="#00e5ff"/>
      <rect x="284" y="148" width="8" height="40" fill="#00e5ff"/>
      <rect x="316" y="148" width="8" height="40" fill="#00e5ff"/>
      <rect x="292" y="180" width="24" height="8" fill="#00e5ff"/>
      <rect x="336" y="148" width="8" height="40" fill="#00e5ff"/>
      <rect x="344" y="180" width="24" height="8" fill="#00e5ff"/>
      <rect x="368" y="148" width="40" height="8" fill="#00e5ff"/>
      <rect x="384" y="156" width="8" height="32" fill="#00e5ff"/>
      <g transform="translate(530,110)">
        <rect x="8" y="0" width="40" height="8" fill="#ffe600"/>
        <rect x="0" y="8" width="8" height="8" fill="#ffe600"/>
        <rect x="48" y="8" width="8" height="8" fill="#ffe600"/>
        <rect x="0" y="16" width="8" height="40" fill="#ffe600"/>
        <rect x="48" y="16" width="8" height="40" fill="#ffe600"/>
        <rect x="0" y="56" width="8" height="8" fill="#ffe600"/>
        <rect x="48" y="56" width="8" height="8" fill="#ffe600"/>
        <rect x="8" y="64" width="40" height="8" fill="#ffe600"/>
        <rect x="24" y="12" width="8" height="48" fill="#ffe600"/>
        <rect x="16" y="16" width="24" height="8" fill="#cc9900"/>
        <rect x="16" y="28" width="24" height="8" fill="#cc9900"/>
        <rect x="16" y="40" width="24" height="8" fill="#cc9900"/>
        <rect x="16" y="16" width="8" height="32" fill="#cc9900"/>
        <rect x="32" y="24" width="8" height="32" fill="#cc9900"/>
      </g>
      <text x="340" y="230" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="#00e5ff" letterSpacing="6">VIDEOGAME STORE</text>
      <text x="340" y="268" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#ffe600" letterSpacing="3">-- INSERT COIN --</text>
      <rect x="80" y="270" width="4" height="4" fill="#ff2d78"/>
      <rect x="92" y="270" width="4" height="4" fill="#ff2d78"/>
      <rect x="104" y="270" width="4" height="4" fill="#ff2d78"/>
      <rect x="572" y="270" width="4" height="4" fill="#ff2d78"/>
      <rect x="584" y="270" width="4" height="4" fill="#ff2d78"/>
      <rect x="596" y="270" width="4" height="4" fill="#ff2d78"/>
    </svg>
  )
}