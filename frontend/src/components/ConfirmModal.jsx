import '../styles/global.css'

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.85)',
      display:'flex', alignItems:'center', justifyContent:'center', zIndex:300
    }}>
      <div style={{
        background:'#0a0a1a', border:'2px solid #ff2d78',
        padding:'2rem', maxWidth:'380px', width:'90%', position:'relative'
      }}>
        <div style={{
          position:'absolute', top:4, left:4, right:4, bottom:4,
          border:'1px solid #2a2a4a', pointerEvents:'none'
        }}/>

        <p style={{
          fontFamily:"'Press Start 2P', monospace",
          fontSize:'0.5rem', color:'#ff2d78',
          letterSpacing:'2px', marginBottom:'0.5rem'
        }}>⚠ ADVERTENCIA</p>

        <p style={{
          fontFamily:"'Press Start 2P', monospace",
          fontSize:'0.45rem', color:'#e0e0ff',
          letterSpacing:'1px', lineHeight:2,
          marginBottom:'2rem'
        }}>{message}</p>

        <div style={{display:'flex', gap:'1rem'}}>
          <button
            onClick={onConfirm}
            style={{
              flex:1, padding:'0.75rem',
              fontFamily:"'Press Start 2P', monospace",
              fontSize:'0.45rem', letterSpacing:'1px',
              background:'#ff2d78', color:'#fff',
              border:'2px solid #ff66aa', cursor:'pointer'
            }}>
            ✓ CONFIRMAR
          </button>
          <button
            onClick={onCancel}
            style={{
              flex:1, padding:'0.75rem',
              fontFamily:"'Press Start 2P', monospace",
              fontSize:'0.45rem', letterSpacing:'1px',
              background:'transparent', color:'#6666aa',
              border:'2px solid #2a2a4a', cursor:'pointer'
            }}>
            ✕ CANCELAR
          </button>
        </div>
      </div>
    </div>
  )
}