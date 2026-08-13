import fs from 'fs';
import path from 'path';
import https from 'https';

const IMAGES = [
  { url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80', filename: 'refeicao.jpg' },
  { url: 'https://images.unsplash.com/photo-1559841644-08984562005a?w=600&auto=format&fit=crop&q=80', filename: 'moqueca.jpg' },
  { url: 'https://images.unsplash.com/photo-1582879304171-82fd42cb4cb4?w=600&auto=format&fit=crop&q=80', filename: 'feijoada.jpg' },
  { url: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=600&auto=format&fit=crop&q=80', filename: 'peixe.jpg' },
  { url: 'https://images.unsplash.com/photo-1513104890d38-7c0f474c31e8?w=600&auto=format&fit=crop&q=80', filename: 'pizza.jpg' },
  { url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80', filename: 'burguer.jpg' },
  { url: 'https://images.unsplash.com/photo-1625944230945-1b7dd1246ee5?w=600&auto=format&fit=crop&q=80', filename: 'camarao.jpg' },
  { url: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=600&auto=format&fit=crop&q=80', filename: 'file-fritas.jpg' },
  { url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80', filename: 'batata.jpg' },
  { url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80', filename: 'refrigerante.jpg' },
  { url: 'https://images.unsplash.com/photo-1614316719525-4a2588385d34?w=600&auto=format&fit=crop&q=80', filename: 'cerveja.jpg' },
  { url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80', filename: 'suco.jpg' },
  { url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80', filename: 'drink1.jpg' },
  { url: 'https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?w=600&auto=format&fit=crop&q=80', filename: 'drink2.jpg' },
  { url: 'https://images.unsplash.com/photo-1590080874088-eec64895b423?w=600&auto=format&fit=crop&q=80', filename: 'pudim.jpg' },
  { url: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=600&auto=format&fit=crop&q=80', filename: 'brigadeiro.jpg' }
];

const DIR = path.join(process.cwd(), 'public', 'imagens');

if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR, { recursive: true });
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(DIR, filename));
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close(resolve);
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }
    }).on('error', (err) => {
      fs.unlink(path.join(DIR, filename), () => reject(err));
    });
  });
}

async function run() {
  for (const img of IMAGES) {
    console.log(`Downloading ${img.filename}...`);
    try {
      await downloadImage(img.url, img.filename);
      console.log(`Saved ${img.filename}`);
    } catch (err) {
      console.error(`Failed to download ${img.filename}: ${err}`);
    }
  }
}

run();
