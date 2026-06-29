import React, { useState } from 'react';
import './App.css';
import StatsBar from './components/StatsBar';
import partidosPasados, { partidosActuales } from './data/partidosPasados';

function App() {
  const [pantallaActual, setPantallaActual] = useState("inicio");
  const [busqueda, setBusqueda] = useState("");
  const [pestaña, setPestaña] = useState("actual");
  const [ligaFiltro, setLigaFiltro] = useState("todos");
  const [soloValor, setSoloValor] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [buscadorEnFoco, setBuscadorEnFoco] = useState(false);

  const toggleNotificacion = (id) => {
    setNotificaciones(prev =>
      prev.includes(id) ? prev.filter(nId => nId !== id) : [...prev, id]
    );
  };

  const poolPartidos = pestaña === "actual" ? partidosActuales : partidosPasados;

  const partidosFiltrados = poolPartidos.filter((item) => {
    const coincideBusqueda = item.partido.toLowerCase().includes(busqueda.toLowerCase());
    const coincideLiga = ligaFiltro === "todos" || item.liga === ligaFiltro;
    const coincideValor = !soloValor || item.esValor;
    return coincideBusqueda && coincideLiga && coincideValor;
  });

  if (pantallaActual === "inicio") {
    return (
      <div className="landing-container">
        <div className="landing-hero">
          <div className="landing-badge">MÓDULO CRONOLÓGICO MÓVIL</div>
          <h1>RED-PREDICT <span className="live-badge-hero">IA</span></h1>
          <p className="landing-tagline">
            Fase de eliminación directa de la <strong>Copa Mundial 2026</strong> con analítica
            predictiva y horarios sincronizados en tu mano.
          </p>
          <div className="landing-stats-row">
            <div className="landing-stat-card"><h3>🌍 MUNDIAL</h3><p>Dieciseisavos de Final</p></div>
            <div className="landing-stat-card"><h3>🇲🇽 LIGA MX</h3><p>Próximamente</p></div>
            <div className="landing-stat-card"><h3>🇪🇺 UCL</h3><p>Próximamente</p></div>
          </div>
          <button className="landing-main-btn" onClick={() => setPantallaActual("app")}>
            Entrar al Panel Horario 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header>
        <div className="header-main-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
            <button className="back-to-home-btn" onClick={() => setPantallaActual("inicio")}>🏠</button>
            <h1 style={{ margin: 0, fontSize: '1.2rem', whiteSpace: 'nowrap' }}>🔥 RED-PREDICT</h1>
            <input
              type="text"
              placeholder="🔍 Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onFocus={() => setBuscadorEnFoco(true)}
              onBlur={() => setBuscadorEnFoco(false)}
              className="buscador-input"
              style={{
                width: buscadorEnFoco ? '150px' : '90px',
                transition: 'width 0.3s ease',
                opacity: buscadorEnFoco ? 1 : 0.5,
              }}
            />
          </div>
          <button
            className={`filtro-btn ${soloValor ? 'filtro-valor-activo' : ''}`}
            onClick={() => setSoloValor(!soloValor)}
          >
            💎 {soloValor ? "Valor ON" : "Valor OFF"}
          </button>
        </div>

        <div className="tabs-tiempo">
          <button
            className={`tab-btn ${pestaña === "pasado" ? "active" : ""}`}
            onClick={() => { setPestaña("pasado"); setLigaFiltro("todos"); }}
          >⏪ Pasados</button>
          <button
            className={`tab-btn ${pestaña === "actual" ? "active" : ""}`}
            onClick={() => { setPestaña("actual"); setLigaFiltro("todos"); }}
          >📅 Dieciseisavos</button>
        </div>

        <div className="filtros-region">
          <button className={`filtro-btn ${ligaFiltro === "todos" ? "active" : ""}`} onClick={() => setLigaFiltro("todos")}>⚽ Todo</button>
          <button className={`filtro-btn ${ligaFiltro === "mundial" ? "active" : ""}`} onClick={() => setLigaFiltro("mundial")}>🌍 Mundial</button>
          <button className={`filtro-btn ${ligaFiltro === "ligamx" ? "active" : ""}`} onClick={() => setLigaFiltro("ligamx")}>🇲🇽</button>
          <button className={`filtro-btn ${ligaFiltro === "champions" ? "active" : ""}`} onClick={() => setLigaFiltro("champions")}>🇪🇺</button>
        </div>
      </header>

      <StatsBar partidos={partidosPasados} />

      <main className="partidos-grid">
        {partidosFiltrados.length === 0 && (
          <p className="no-results">Sin partidos activos.</p>
        )}

        {partidosFiltrados.map((p) => (
          <div
            key={p.id}
            className={`partido-card-sportsbook${p.proximamente ? ' card-proximamente' : ''}`}
          >
            <div className="card-header">
              <div className="card-header-left">
                <span className="liga-tag">
                  {p.liga === "mundial" && "🌍 COPA MUNDIAL 2026"}
                  {p.liga === "ligamx" && "🇲🇽 LIGA MX"}
                  {p.liga === "champions" && "🇪🇺 UEFA CHAMPIONS"}
                </span>
                {!p.proximamente && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '5px' }}>
                    <span className="cronologia-tag">📅 {p.fecha} · 🕒 {p.hora} HRS</span>
                    {p.sede && <span className="cronologia-tag" style={{ opacity: 0.7 }}>🏟️ {p.sede}</span>}
                  </div>
                )}
              </div>

              {p.proximamente ? (
                <span className="proximamente-badge">BLOQUEADO</span>
              ) : (
                <div className="action-buttons-top">
                  <button
                    className={`notif-btn ${notificaciones.includes(p.id) ? 'active' : ''}`}
                    onClick={() => toggleNotificacion(p.id)}
                  >
                    {notificaciones.includes(p.id) ? "🔔" : "🔕"}
                  </button>
                </div>
              )}
            </div>

            {p.proximamente ? (
              <>
                <h3>{p.partido}</h3>
                <div className="bloque-espera-ia">
                  <p>🤖 Servidores procesando calendarios.</p>
                  <span className="fecha-estreno-tag">Pronto: {p.fechaEstreno}</span>
                </div>
              </>
            ) : (
              <>
                {p.esValor && (
                  <span className="value-badge">💎 VALOR {p.cuotaMercado ? `(${p.cuotaMercado})` : ''}</span>
                )}
                <h3>{p.partido}</h3>
                <div className="confianza-ia-container">
                  <span className="confianza-label">Confianza:</span>
                  <span className="confianza-estrellas">{"⭐".repeat(p.confianzaIA || 4)}</span>
                </div>
                <div className="radar-rachas">
                  <div className="racha-equipo">
                    <span>{p.local.substring(0, 3).toUpperCase()}:</span>
                    <div>{p.rachaLocal?.join(" ")}</div>
                  </div>
                  <div className="racha-equipo">
                    <span>{p.visitante.substring(0, 3).toUpperCase()}:</span>
                    <div>{p.rachaVisita?.join(" ")}</div>
                  </div>
                </div>
                {pestaña === "pasado" && (
                  <div
                    className="marcador-final-box"
                    style={{ borderColor: p.acierto ? '#00c853' : '#d50000' }}
                  >
                    Resultado: <span>{p.resultado}</span>
                    <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: p.acierto ? '#00c853' : '#d50000' }}>
                      {p.acierto ? "✅ Acierto" : "❌ Fallo"}
                    </span>
                  </div>
                )}
                <div className="cuotas-container">
                  <div className="cuota-box">
                    <span className="cuota-label">Local</span>
                    <span className="cuota-valor">{p.gana_local}%</span>
                  </div>
                  <div className="cuota-box">
                    <span className="cuota-label">Empate</span>
                    <span className="cuota-valor">{p.empate}%</span>
                  </div>
                  <div className="cuota-box">
                    <span className="cuota-label">Visita</span>
                    <span className="cuota-valor">{p.gana_visitante}%</span>
                  </div>
                </div>
                <div className="marcadores-compactos">
                  <h4>Top Marcador Probable</h4>
                  {p.top_marcadores?.map((m, idx) => (
                    <div key={idx} className="marcador-fila-mini">
                      <span className="mini-goles">{m.marcador}</span>
                      <div className="barra-mini-bg">
                        <div className="barra-mini-fill" style={{ width: `${m.probabilidad}%` }} />
                      </div>
                      <span className="mini-porcentaje">{m.probabilidad}%</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;