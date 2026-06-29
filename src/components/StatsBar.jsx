import React, { useMemo } from 'react';

function StatsBar({ partidos }) {
  const stats = useMemo(() => {
    const finalizados = partidos.filter(p => p.resultado && !p.proximamente);
    const aciertos = finalizados.filter(p => p.acierto).length;
    const fallos = finalizados.filter(p => !p.acierto).length;
    const total = finalizados.length;
    const porcentaje = total > 0 ? Math.round((aciertos / total) * 100) : 0;
    const valorAcertados = finalizados.filter(p => p.esValor && p.acierto).length;
    const valorTotal = finalizados.filter(p => p.esValor).length;

    return { aciertos, fallos, total, porcentaje, valorAcertados, valorTotal };
  }, [partidos]);

  const colorPorcentaje =
    stats.porcentaje >= 70 ? '#10b981' :
    stats.porcentaje >= 50 ? '#eab308' : '#ef4444';

  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-icon">✅</span>
        <div className="stat-info">
          <span className="stat-valor" style={{ color: '#10b981' }}>{stats.aciertos}</span>
          <span className="stat-label">Aciertos</span>
        </div>
      </div>

      <div className="stat-divider" />

      <div className="stat-item">
        <span className="stat-icon">❌</span>
        <div className="stat-info">
          <span className="stat-valor" style={{ color: '#ef4444' }}>{stats.fallos}</span>
          <span className="stat-label">Fallos</span>
        </div>
      </div>

      <div className="stat-divider" />

      <div className="stat-item">
        <span className="stat-icon">📊</span>
        <div className="stat-info">
          <span className="stat-valor" style={{ color: colorPorcentaje }}>{stats.porcentaje}%</span>
          <span className="stat-label">Efectividad</span>
        </div>
      </div>

      <div className="stat-divider" />

      <div className="stat-item">
        <span className="stat-icon">💎</span>
        <div className="stat-info">
          <span className="stat-valor" style={{ color: '#0284c7' }}>
            {stats.valorAcertados}/{stats.valorTotal}
          </span>
          <span className="stat-label">Valor</span>
        </div>
      </div>

      <div className="stat-barra-container">
        <div className="stat-barra-bg">
          <div
            className="stat-barra-fill"
            style={{
              width: `${stats.porcentaje}%`,
              backgroundColor: colorPorcentaje,
            }}
          />
        </div>
        <span className="stat-total">{stats.total} picks analizados</span>
      </div>
    </div>
  );
}

export default StatsBar;