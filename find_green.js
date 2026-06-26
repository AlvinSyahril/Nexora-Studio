const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const dir = 'F:\\My Project\\Landing Page\\nexora-studio\\public\\screenshots';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

async function checkGreen() {
  for (const file of files) {
    try {
      const image = await Jimp.read(path.join(dir, file));
      let greenCount = 0;
      let totalCount = 0;
      
      for (let x = 0; x < image.bitmap.width; x+=10) {
        for (let y = 0; y < image.bitmap.height; y+=10) {
          const color = image.getPixelColor(Math.floor(x), Math.floor(y));
          const r = (color >> 24) & 255;
          const g = (color >> 16) & 255;
          const b = (color >> 8) & 255;
          if (g > r + 40 && g > b + 40 && g > 100) {
            greenCount++;
          }
          totalCount++;
        }
      }
      console.log(`${file}: ${Math.round(greenCount/totalCount*100)}% green pixels`);
    } catch(e) {
      console.log(`Error reading ${file}`);
    }
  }
}

checkGreen();
