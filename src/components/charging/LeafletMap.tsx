// Always loaded client-only via next/dynamic({ ssr: false }) — no 'use client' needed here
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { OcmPoi, CountryCode } from '@/lib/charging';
import { COUNTRY_CONFIG } from '@/lib/charging';

// ── Custom div-icons (no image files needed) ─────────────────────────────────
function makeIcon(fast: boolean) {
  const bg = fast ? '#22c55e' : '#64748b';   // green-500 / slate-500
  const border = fast ? '#16a34a' : '#475569';
  return L.divIcon({
    className: '',
    html: `<div style="
      width:28px;height:28px;border-radius:50% 50% 50% 0;
      background:${bg};border:2px solid ${border};
      transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 6px rgba(0,0,0,.5)">
      <span style="transform:rotate(45deg);font-size:13px;line-height:1">⚡</span>
    </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
  });
}

const fastIcon     = makeIcon(true);
const standardIcon = makeIcon(false);

function isFast(poi: OcmPoi) {
  return poi.Connections?.some(c => (c.PowerKW ?? 0) >= 50) ?? false;
}

// ── Pan/zoom to new country without full remount ──────────────────────────────
function FlyTo({ country }: { country: CountryCode }) {
  const map = useMap();
  useEffect(() => {
    const cfg = COUNTRY_CONFIG[country];
    map.flyTo(cfg.center, cfg.zoom, { animate: true, duration: 0.8 });
  }, [country, map]);
  return null;
}

// ── Main map component ────────────────────────────────────────────────────────
interface Props {
  pois: OcmPoi[];
  country: CountryCode;
}

export default function LeafletMap({ pois, country }: Props) {
  const cfg = COUNTRY_CONFIG[country];

  return (
    <MapContainer
      center={cfg.center}
      zoom={cfg.zoom}
      style={{ height: '500px', width: '100%', borderRadius: '12px', background: '#0f172a' }}
      scrollWheelZoom={false}
    >
      {/* CartoDB Dark Matter — matches site palette */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />

      <FlyTo country={country} />

      {pois.map(poi => (
        <Marker
          key={poi.ID}
          position={[poi.AddressInfo.Latitude, poi.AddressInfo.Longitude]}
          icon={isFast(poi) ? fastIcon : standardIcon}
        >
          <Popup>
            <div style={{ minWidth: 180, fontFamily: 'sans-serif' }}>
              <p style={{ fontWeight: 700, marginBottom: 4, fontSize: 13 }}>
                {poi.AddressInfo.Title}
              </p>
              {poi.AddressInfo.Town && (
                <p style={{ color: '#64748b', fontSize: 11, margin: '2px 0' }}>
                  {poi.AddressInfo.Town}
                  {poi.AddressInfo.StateOrProvince ? `, ${poi.AddressInfo.StateOrProvince}` : ''}
                </p>
              )}
              {poi.OperatorInfo?.Title && (
                <p style={{ color: '#94a3b8', fontSize: 11, margin: '2px 0' }}>
                  {poi.OperatorInfo.Title}
                </p>
              )}
              {poi.NumberOfPoints && (
                <p style={{ fontSize: 11, margin: '4px 0 2px' }}>
                  <strong>{poi.NumberOfPoints}</strong> points
                </p>
              )}
              {poi.Connections?.slice(0, 4).map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 2 }}>
                  <span style={{
                    background: (c.PowerKW ?? 0) >= 50 ? '#dcfce7' : '#f1f5f9',
                    color: (c.PowerKW ?? 0) >= 50 ? '#15803d' : '#475569',
                    borderRadius: 4, padding: '1px 5px', fontSize: 10, fontWeight: 600,
                  }}>
                    {c.ConnectionType?.Title?.replace('Type ', 'T') ?? '—'}
                    {c.PowerKW ? ` · ${c.PowerKW} kW` : ''}
                  </span>
                </div>
              ))}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
