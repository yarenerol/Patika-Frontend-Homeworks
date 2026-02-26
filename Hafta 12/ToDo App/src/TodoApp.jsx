// TodoApp.jsx
// React'te bir uygulama yazmak için önce useState hook'unu import ediyoruz.
// useState, verilerimizi (todo listesi gibi) "hatırlamak" için kullanılır.
import { useState } from "react";

// CSS'i de import etmeyi unutma! (index.css dosyanı aynı klasöre koy)
// import "./index.css";

// Her todo item'ın nasıl görüneceğini tutan başlangıç verisi
const initialTodos = [
  { id: 1, text: "Learn JavaScript", completed: true },
  { id: 2, text: "Learn React", completed: false },
  { id: 3, text: "Have a life!", completed: false },
];

export default function TodoApp() {
  // --- STATE TANIMLARI ---
  // useState ile uygulamamızın "hafızasını" oluşturuyoruz.

  // todos: tüm todo listesi
  // setTodos: listeyi güncellemek için kullanılan fonksiyon
  const [todos, setTodos] = useState(initialTodos);

  // inputValue: input kutusuna yazılan metin
  const [inputValue, setInputValue] = useState("");

  // filter: hangi todoların gösterileceği ("all", "active", "completed")
  const [filter, setFilter] = useState("all");

  // --- FONKSİYONLAR ---

  // Enter'a basınca yeni todo ekle
  function handleKeyDown(e) {
    // Eğer Enter'a basılmadıysa veya input boşsa hiçbir şey yapma
    if (e.key !== "Enter" || inputValue.trim() === "") return;

    // Yeni todo objesi oluştur
    const newTodo = {
      id: Date.now(), // benzersiz bir id için şu anki zamanı kullanıyoruz
      text: inputValue.trim(),
      completed: false,
    };

    // Mevcut listeye yeni todoyu ekle
    // [...todos, newTodo] = eski listeyi kopyala ve sona yeni elemanı ekle
    setTodos([...todos, newTodo]);

    // Input kutusunu temizle
    setInputValue("");
  }

  // Checkbox'a tıklanınca todo'nun tamamlanma durumunu değiştir
  function toggleTodo(id) {
    // map: her todo için dön, eğer id eşleşiyorsa completed'ı tersine çevir
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Çöp kutusu butonuna basınca todo'yu sil
  function deleteTodo(id) {
    // filter: id'si farklı olanları tut, eşleşeni at
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // "Clear completed" butonuna basınca tamamlananları temizle
  function clearCompleted() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  // Tüm todoları complete/uncomplete yap
  function toggleAll(e) {
    const checked = e.target.checked;
    setTodos(todos.map((todo) => ({ ...todo, completed: checked })));
  }

  // --- FİLTRELEME ---
  // Seçili filtreye göre hangi todoların gösterileceğini belirle
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all" için hepsini göster
  });

  // Kaç tane tamamlanmamış todo var?
  const activeCount = todos.filter((todo) => !todo.completed).length;

  // Tamamlanmış todo var mı? (Clear completed butonunu göstermek için)
  const hasCompleted = todos.some((todo) => todo.completed);

  // --- RENDER (Ekrana çizim) ---
  return (
    <>
      <section className="todoapp">
        {/* HEADER - Başlık ve input */}
        <header className="header">
          <h1>todos</h1>
          {/* form'un default submit davranışını engelliyoruz */}
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={inputValue}
              // Her tuş basımında inputValue'yu güncelle
              onChange={(e) => setInputValue(e.target.value)}
              // Enter'a basılınca handleKeyDown çalışır
              onKeyDown={handleKeyDown}
            />
          </form>
        </header>

        {/* MAIN - Liste ve toggle-all, sadece todo varsa göster */}
        {todos.length > 0 && (
          <section className="main">
            <input
              id="toggle-all"
              className="toggle-all"
              type="checkbox"
              // Eğer hepsi tamamlandıysa checkbox işaretli görünsün
              checked={todos.every((todo) => todo.completed)}
              onChange={toggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list">
              {/* filteredTodos dizisindeki her todo için bir <li> oluştur */}
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  // tamamlandıysa "completed" class'ı ekle
                  className={todo.completed ? "completed" : ""}
                >
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <label>{todo.text}</label>
                    <button
                      className="destroy"
                      onClick={() => deleteTodo(todo.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FOOTER - Sayaç, filtreler, temizle butonu */}
        {todos.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              <strong>{activeCount}</strong>{" "}
              {activeCount === 1 ? "item" : "items"} left
            </span>

            <ul className="filters">
              {["all", "active", "completed"].map((f) => (
                <li key={f}>
                  <a
                    // Seçili filtreye "selected" class'ı ekle
                    className={filter === f ? "selected" : ""}
                    onClick={() => setFilter(f)}
                    href="#/"
                  >
                    {/* İlk harfi büyüt */}
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </a>
                </li>
              ))}
            </ul>

            {/* Sadece tamamlanmış todo varsa göster */}
            {hasCompleted && (
              <button className="clear-completed" onClick={clearCompleted}>
                Clear completed
              </button>
            )}
          </footer>
        )}
      </section>
    </>
  );
}
