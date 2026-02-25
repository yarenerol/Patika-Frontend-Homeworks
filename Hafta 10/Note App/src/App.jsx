import React, { useState } from 'react';

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [selectedColor, setSelectedColor] = useState('#fef08a');
  const [searchTerm, setSearchTerm] = useState('');

  const colors = [
    { name: 'Sarı', value: '#fef08a' },
    { name: 'Turuncu', value: '#fed7aa' },
    { name: 'Pembe', value: '#fbcfe8' },
    { name: 'Mor', value: '#e9d5ff' },
    { name: 'Mavi', value: '#bfdbfe' },
    { name: 'Yeşil', value: '#bbf7d0' }
  ];

  const handleAddNote = () => {
    if (noteText.trim()) {
      const newNote = {
        id: Date.now(),
        text: noteText,
        color: selectedColor,
        createdAt: new Date().toLocaleString('tr-TR')
      };
      setNotes([newNote, ...notes]);
      setNoteText('');
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          📝 Not Defterim
        </h1>

        {/* Not Ekleme Alanı */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Notunuzu buraya yazın..."
            className="w-full p-4 border-2 border-gray-200 rounded-lg resize-none focus:outline-none focus:border-blue-400 transition-colors"
            rows="4"
            style={{ backgroundColor: selectedColor }}
          />

          {/* Renk Seçimi */}
          <div className="mt-4 mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Renk Seçin:</p>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-10 h-10 rounded-full transition-transform hover:scale-110 ${
                    selectedColor === color.value ? 'ring-4 ring-gray-400 scale-110' : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Ekle Butonu */}
          <button
            onClick={handleAddNote}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            ➕ Not Ekle
          </button>
        </div>

        {/* Arama Alanı */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Notlarda ara..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
        </div>

        {/* Notlar Listesi */}
        <div className="space-y-4">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              {searchTerm ? 'Aramanıza uygun not bulunamadı' : 'Henüz not eklenmedi'}
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="rounded-lg shadow-md p-5 transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: note.color }}
              >
                <p className="text-gray-800 whitespace-pre-wrap mb-3">{note.text}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">{note.createdAt}</span>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}