import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StarshipList() {
  // --- STATE ---
  const [starships, setStarships] = useState([]); // yüklenen gemiler
  const [nextUrl, setNextUrl] = useState(null);   // API'nin "sonraki sayfa" linki
  const [loading, setLoading] = useState(false);  // yükleniyor mu?
  const [search, setSearch] = useState("");        // arama kutusu değeri

  // useNavigate: React Router ile sayfalar arası geçiş için
  const navigate = useNavigate();

  // --- API'DEN VERİ ÇEKME ---
  async function fetchStarships(url) {
    setLoading(true);
    try {
      // fetch: tarayıcının yerleşik HTTP istek fonksiyonu
      const response = await fetch(url);
      const data = await response.json();

      // Gelen gemileri mevcut listeye EKLE (üzerine yazma)
      setStarships((prev) => [...prev, ...data.results]);

      // API'nin sonraki sayfası varsa kaydet, yoksa null
      setNextUrl(data.next);
    } catch (error) {
      console.error("Veri çekilemedi:", error);
    }
    setLoading(false);
  }

  // --- ARAMA ---
  // Arama değişince API'ye yeni istek at (listeyi sıfırla)
  useEffect(() => {
    // Arama boşsa ilk sayfaya dön
    const url = search.trim()
      ? `https://swapi.dev/api/starships/?search=${encodeURIComponent(search)}`
      : "https://swapi.dev/api/starships/";

    // Yeni arama: eski listeyi sil
    setStarships([]);
    fetchStarships(url);
  }, [search]); // search değiştiğinde çalış

  // --- DAHA FAZLA YÜKLE ---
  function loadMore() {
    if (nextUrl) fetchStarships(nextUrl);
  }

  // --- RENDER ---
  return (
    <>
      {/* Başlık */}
      <header className="sw-header">
        <div className="sw-logo">STARSHIPS</div>
        <div className="sw-subtitle">Star Wars · Galactic Fleet Database</div>
      </header>

      {/* Arama kutusu */}
      <div className="sw-search-wrap">
        <span className="sw-search-icon">⌕</span>
        <input
          className="sw-search"
          type="text"
          placeholder="Search by name or model..."
          value={search}
          // Her tuş basımında search state'ini güncelle
          // useEffect bunu izliyor ve API isteği atıyor
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Kart grid */}
      <div className="sw-grid">
        {starships.map((ship, index) => (
          <div
            key={ship.url} // her kartın benzersiz key'i
            className="sw-card"
            style={{ animationDelay: `${(index % 10) * 0.05}s` }} // staggered animasyon
            onClick={() => {
              // URL'den ID'yi çıkar: ".../starships/9/" → "9"
              const id = ship.url.split("/").filter(Boolean).pop();
              navigate(`/starship/${id}`);
            }}
          >
            <div className="sw-card-accent" />
            <div className="sw-card-body">
              <div className="sw-card-name">{ship.name}</div>
              <div className="sw-card-model">{ship.model}</div>
              <div className="sw-card-stats">
                <div className="sw-stat">
                  <span className="sw-stat-label">Max Speed</span>
                  <span className="sw-stat-value">{ship.max_atmosphering_speed}</span>
                </div>
                <div className="sw-stat">
                  <span className="sw-stat-label">Crew</span>
                  <span className="sw-stat-value">{ship.crew}</span>
                </div>
                <div className="sw-stat">
                  <span className="sw-stat-label">Class</span>
                  <span className="sw-stat-value">{ship.starship_class}</span>
                </div>
              </div>
            </div>
            <div className="sw-card-footer">
              <span className="sw-view-btn">View Details →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Yükleniyor göstergesi */}
      {loading && (
        <div className="sw-status">
          <div className="sw-spinner" />
          <div>LOADING FLEET DATA...</div>
        </div>
      )}

      {/* Hiç sonuç yoksa */}
      {!loading && starships.length === 0 && (
        <div className="sw-status">NO SHIPS FOUND</div>
      )}

      {/* Daha Fazla butonu - sadece sonraki sayfa varsa ve yüklenmiyorsa göster */}
      {!loading && nextUrl && (
        <div className="sw-load-wrap">
          <button className="sw-load-btn" onClick={loadMore}>
            ⬇ Load More Ships
          </button>
        </div>
      )}
    </>
  );
}
