const fs = require('fs');
const opentype = require('opentype.js');
const https = require('https');

const fontUrl = 'https://raw.githubusercontent.com/google/fonts/main/ofl/shadowsintolighttwo/ShadowsIntoLightTwo-Regular.ttf';
https.get(fontUrl, (res) => {
  const chunks = [];
  res.on('data', c => chunks.push(c));
  res.on('end', () => {
    const buffer = Buffer.concat(chunks);
    fs.writeFileSync('/tmp/Kalam-Regular.ttf', buffer);
    const font = opentype.loadSync('/tmp/Kalam-Regular.ttf');
    
    // Create the path for "Brandon Bell"
    const textPath = font.getPath('Brandon Bell', 0, 0, 72);
    
    const svgBox = textPath.getBoundingBox();
    const width = svgBox.x2 - svgBox.x1;
    const height = svgBox.y2 - svgBox.y1;
    
    // We add some padding
    const pad = 10;
    const vBox = `${svgBox.x1 - pad} ${svgBox.y1 - pad} ${width + pad*2} ${height + pad*2}`;
    
    const svgPathData = textPath.toPathData(3);
    
    const componentStr = `export default function Signature({ className = '' }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="${vBox}" 
      className={\`fill-current \${className}\`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="${svgPathData}" />
    </svg>
  );
}
`;
    
    fs.writeFileSync('/Users/brandonbell/Documents/bbell03/components/shared/Signature.tsx', componentStr);
    console.log('SUCCESS: Generated Signature.tsx in components/shared');
  });
}).on('error', (err) => {
  console.error('ERROR downloading font:', err);
});
