// StarshipDetail.jsx
// Detay sayfası: seçilen yıldız gemisinin tüm bilgilerini gösterir

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function StarshipDetail() {
  const [ship, setShip] = useState(null);   // gemi verisi
  const [loading, setLoading] = useState(true);

  // useParams: URL'deki :id parametresini okur
  // Örnek: /starship/9 → { id: "9" }
  const { id } = useParams();

  const navigate = useNavigate();

  // Sayfa açılınca o gemi için API isteği at
  useEffect(() => {
    async function fetchShip() {
      setLoading(true);
      try {
        const response = await fetch(`https://swapi.dev/api/starships/${id}/`);
        const data = await response.json();
        setShip(data);
      } catch (error) {
        console.error("Gemi verisi çekilemedi:", error);
      }
      setLoading(false);
    }

    fetchShip();
  }, [id]); // id değişirse tekrar çalış

  // Yüklenirken spinner göster
  if (loading) {
    return (
      <div className="sw-status" style={{ marginTop: 80 }}>
        <div className="sw-spinner" />
        <div>LOADING SHIP DATA...</div>
      </div>
    );
  }

  // Gemi bulunamadıysa
  if (!ship) {
    return (
      <div className="sw-status" style={{ marginTop: 80 }}>
        SHIP NOT FOUND
      </div>
    );
  }

  // Detayları güzel göstermek için bir dizi oluşturuyoruz
  const details = [
    { label: "Manufacturer",       value: ship.manufacturer },
    { label: "Starship Class",     value: ship.starship_class },
    { label: "Passengers",         value: ship.passengers },
    { label: "Max Atm. Speed",     value: ship.max_atmosphering_speed },
    { label: "Crew",               value: ship.crew },
    { label: "Cargo Capacity",     value: ship.cargo_capacity },
    { label: "Hyperdrive Rating",  value: ship.hyperdrive_rating },
    { label: "MGLT",               value: ship.MGLT },
    { label: "Length",             value: ship.length },
    { label: "Cost",               value: ship.cost_in_credits !== "unknown" ? `${ship.cost_in_credits} credits` : "unknown" },
  ];

  return (
    <div className="sw-detail">
      {/* Geri butonu */}
      <button className="sw-back-btn" onClick={() => navigate(-1)}>
        ← Back to Fleet
      </button>

      {/* Detay kartı */}
      <div className="sw-detail-card">
        {/* Üst başlık alanı */}
        <div className="sw-detail-header">
          <div className="sw-detail-name">{ship.name}</div>
          <div className="sw-detail-model">{ship.model}</div>
        </div>

        {/* Bilgi grid'i - her bilgi için bir kutu */}
        <div className="sw-detail-grid">
          {details.map((item) => (
            <div key={item.label} className="sw-detail-item">
              <div className="sw-detail-label">{item.label}</div>
              <div className="sw-detail-value">{item.value || "—"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
