const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const dir = 'F:\\My Project\\Landing Page\\nexora-studio\\public\\screenshots';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

async function findBlueImage() {
  for (const file of files) {
    try {
      const image = await Jimp.read(path.join(dir, file));
      let blueCount = 0;
      let totalCount = 0;
      
      // sample top left area (which is very blue in the home screen)
      for (let x = 0; x < 100; x+=10) {
        for (let y = 0; y < 100; y+=10) {
          const color = image.getPixelColor(x, y);
          const r = (color >> 24) & 255;
          const g = (color >> 16) & 255;
          const b = (color >> 8) & 255;
          if (b > r + 30 && b > g + 10) {
            blueCount++;
          }
          totalCount++;
        }
      }
      console.log(`${file}: ${Math.round(blueCount/totalCount*100)}% blue pixels in top-left`);
    } catch(e) {
      console.log(`Error reading ${file}`);
    }
  }
}

findBlueImage();
