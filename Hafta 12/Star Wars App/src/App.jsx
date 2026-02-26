import { BrowserRouter, Routes, Route } from "react-router-dom";
import StarshipList from "./StarshipList";
import StarshipDetail from "./StarshipDetail";
import "./starwars.css";

export default function App() {
  return (
    // BrowserRouter: tüm routing altyapısını sağlar, uygulamayı sarmalaması gerekir
    <BrowserRouter>
      {/*
        Routes: içindeki Route'lardan URL'ye uyan birini seçer
        Route path="/": ana sayfa → StarshipList
        Route path="/starship/:id": detay sayfası → StarshipDetail
        :id buradaki ":" dinamik parametre anlamına gelir
      */}
      <Routes>
        <Route path="/" element={<StarshipList />} />
        <Route path="/starship/:id" element={<StarshipDetail />} />
      </Routes>
    </BrowserRouter>
  );
}