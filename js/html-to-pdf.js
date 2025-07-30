document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('download');
  const element = document.querySelector('.main');

  if (!button || !element) {
    console.error('Не найдены элементы для генерации PDF');
    return;
  }

  button.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const html2canvas = window.html2canvas;

    html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    })
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = pdf.internal.pageSize.getWidth();

      const imgWidth = pageWidth * 0.90;

      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const marginX = (pageWidth - imgWidth) / 2;
      const marginY = 5;

      pdf.addImage(imgData, 'PNG', marginX, marginY, imgWidth, imgHeight);
      pdf.save('Karthik-Resume.pdf');
    })
    .catch(err => {
      console.error('Ошибка при создании PDF:', err);
    });
  });
});
