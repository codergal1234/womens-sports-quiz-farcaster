const fs = require('fs');
const path = require('path');

// Simple script to create a placeholder PNG icon
// In a real scenario, you'd use a library like sharp or canvas

const svgContent = fs.readFileSync(path.join(__dirname, '../public/icon.svg'), 'utf8');

// For now, let's create a simple HTML file that you can use to convert manually
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Icon Converter</title>
    <style>
        body { margin: 0; padding: 20px; background: #f0f0f0; }
        .icon-container { 
            width: 1024px; 
            height: 1024px; 
            background: white; 
            border: 2px solid #ccc;
            margin: 20px auto;
        }
        .instructions {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="instructions">
        <h2>Icon Conversion Instructions</h2>
        <p>To convert your SVG icon to PNG:</p>
        <ol>
            <li>Right-click on the icon below</li>
            <li>Select "Save image as..." or "Copy image"</li>
            <li>Save as <code>icon.png</code> in your <code>public/</code> folder</li>
            <li>Make sure it's exactly 1024x1024 pixels</li>
        </ol>
        <p><strong>Note:</strong> The icon should have no transparency/alpha channel for Farcaster requirements.</p>
    </div>
    
    <div class="icon-container">
        ${svgContent}
    </div>
    
    <script>
        // Auto-download functionality (optional)
        function downloadIcon() {
            const svg = document.querySelector('svg');
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = 1024;
            canvas.height = 1024;
            
            const img = new Image();
            const svgBlob = new Blob([svg.outerHTML], {type: 'image/svg+xml'});
            const url = URL.createObjectURL(svgBlob);
            
            img.onload = function() {
                ctx.drawImage(img, 0, 0, 1024, 1024);
                canvas.toBlob(function(blob) {
                    const a = document.createElement('a');
                    a.download = 'icon.png';
                    a.href = URL.createObjectURL(blob);
                    a.click();
                });
            };
            
            img.src = url;
        }
        
        // Add download button
        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = 'Download PNG Icon';
        downloadBtn.onclick = downloadIcon;
        downloadBtn.style.cssText = 'position: fixed; top: 20px; right: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;';
        document.body.appendChild(downloadBtn);
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '../public/icon-converter.html'), htmlContent);
console.log('Icon converter created at public/icon-converter.html');
console.log('Open this file in your browser to convert the SVG to PNG'); 