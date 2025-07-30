// Добовляем шаблон если человек зайдёт с телефона
function createPdfTemplate() {
  const main = document.querySelector('.main');
  if (!main) {
    console.error('Основной блок .main не найден');
    return;
  }

  const template = document.createElement('div');
  template.id = 'pdf-template';
  template.style.cssText = 'position: absolute; left: -9999px; width: 555px; overflow: hidden;';

  const clone = main.cloneNode(true);
  clone.querySelectorAll('[contenteditable]').forEach(el => {
    el.removeAttribute('contenteditable');
  });

  template.appendChild(clone);
  document.body.appendChild(template);
}

// Проверка - заходит ли человек с мобилки
function isMobile() {
  return window.innerWidth < 555;
}

// Выбор эл-а: если мобилка - выбрать шаблон, если не мобилка - форматировать из main
function getElementForPdf() {
  if (isMobile()) {
    let template = document.getElementById('pdf-template');
    if (!template) {
      createPdfTemplate();
      template = document.getElementById('pdf-template');
    }
    return template;
  } else {
    return document.querySelector('.main');
  }
}


function setupPdfDownload() {
  const button = document.getElementById('download');

  button.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const html2canvas = window.html2canvas;

    const element = getElementForPdf();
    if (!element) {
      console.error('Элемент для генерации PDF не найден');
      return;
    }

    const isMobileDevice = isMobile();
    const canvasWidth = isMobileDevice ? 555 : element.scrollWidth;

    html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: canvasWidth,
      windowWidth: isMobileDevice ? 800 : element.scrollWidth,
      scrollY: 0,
      scrollX: 0,
      allowTaint: true
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
}


document.addEventListener('DOMContentLoaded', () => {
  setupPdfDownload();
});