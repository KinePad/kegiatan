import { useState, useEffect } from 'react';

export default function Home() {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [kegiatan, setKegiatan] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/kegiatan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ judul, deskripsi }),
    });

    const data = await res.json();
    setKegiatan(data);
    setJudul('');
    setDeskripsi('');
  };

  useEffect(() => {
    async function fetchKegiatan() {
      const res = await fetch('/api/kegiatan');
      const data = await res.json();
      setKegiatan(data);
    }
    fetchKegiatan();
  }, []);

  return (
    <div>
      <h1>Daftar Kegiatan</h1>
      <form onSubmit={handleSubmit}>
        <label>Judul Kegiatan:</label>
        <input 
          type="text" 
          value={judul} 
          onChange={(e) => setJudul(e.target.value)} 
          required
        /><br />
        
        <label>Deskripsi Kegiatan:</label><br />
        <textarea 
          value={deskripsi} 
          onChange={(e) => setDeskripsi(e.target.value)} 
          rows="4" 
          cols="50" 
          required
        /><br />
        
        <button type="submit">Tambahkan Kegiatan</button>
      </form>

      <h2>Daftar Kegiatan:</h2>
      <ul>
        {kegiatan.map((keg, index) => (
          <li key={index}>{keg.judul}</li>
        ))}
      </ul>
    </div>
  );
}
