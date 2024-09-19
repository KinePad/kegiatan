import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'kegiatan.txt');

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Ambil data dari request body
    const { judul, deskripsi } = req.body;

    // Simpan data ke file
    const newKegiatan = `${judul}|${deskripsi}\n`;
    fs.appendFileSync(filePath, newKegiatan, 'utf8');

    // Kembalikan daftar kegiatan terbaru
    const data = fs.readFileSync(filePath, 'utf8');
    const kegiatan = data.split('\n').filter(line => line).map(line => {
      const [judul, deskripsi] = line.split('|');
      return { judul, deskripsi };
    });
    
    res.status(200).json(kegiatan);
  } else if (req.method === 'GET') {
    // Baca file dan kirim daftar kegiatan
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      const kegiatan = data.split('\n').filter(line => line).map(line => {
        const [judul, deskripsi] = line.split('|');
        return { judul, deskripsi };
      });
      res.status(200).json(kegiatan);
    } else {
      res.status(200).json([]);
    }
  }
}
