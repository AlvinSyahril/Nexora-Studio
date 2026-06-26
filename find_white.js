const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const dir = 'F:\\My Project\\Landing Page\\nexora-studio\\public\\screenshots';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

async function checkWhite() {
  for (const file of files) {
    try {
      const image = await Jimp.read(path.join(dir, file));
      let whiteCount = 0;
      let totalCount = 0;
      
      // sample center area
      const cx = image.bitmap.width / 2;
      const cy = image.bitmap.height / 2;
      
      for (let x = cx - 50; x < cx + 50; x+=10) {
        for (let y = cy - 50; y < cy + 50; y+=10) {
          const color = image.getPixelColor(Math.floor(x), Math.floor(y));
          const r = (color >> 24) & 255;
          const g = (color >> 16) & 255;
          const b = (color >> 8) & 255;
          if (r > 240 && g > 240 && b > 240) {
            whiteCount++;
          }
          totalCount++;
        }
      }
      console.log(`${file}: ${Math.round(whiteCount/totalCount*100)}% white pixels in center`);
    } catch(e) {
      console.log(`Error reading ${file}`);
    }
  }
}

checkWhite();
