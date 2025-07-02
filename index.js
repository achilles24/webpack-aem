import './styles.css';

document.addEventListener('DOMContentLoaded', async function() {
    const { default: SimpleParallax } = await import('simple-parallax-js');
    
    const image = document.querySelector('.parallax');
    new SimpleParallax(image, {
        scale: 1.5,
        delay: .6,
        transition: 'cubic-bezier(0,0,0,1)'
    });

    // PDF download functionality
    document.getElementById('downloadPDF').addEventListener('click', async function() {
        const html2pdf = await import('html2pdf.js');
        const element = document.body;
        const opt = {
            margin: 1,
            filename: 'webpage.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf.default().set(opt).from(element).save();
    });
});