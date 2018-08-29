var fs = require('fs');
var path = require('path');
var PDFDocument = require("pdfkit");
  try {
    var doc = new PDFDocument();
    var pdfFile = path.join(__dirname, 'out.pdf');
    var pdfStream = fs.createWriteStream('out.pdf');
    // pra escolher uma fonte, cê precisa dar a localização dela.
    //  O pdfkit suporta os formatos ttf, otf, ttc e dfont.
    // Nesse exemplo, uso a fonte Roboto em negrito.
    //  Note que não existem opções para negrito e itálico.
    //      Se você precisa deles, tens de selecionar uma fonte com eles.
    doc.font(path.join(__dirname, 'Roboto', 'Roboto-Bold.ttf')).fontSize(25).text('Some text with an embedded font!', 100, 100);
    doc.addPage().fontSize(25).text('Here is some vector graphics...', 100, 100);
    doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");
    doc.scale(0.6).translate(470, -380).path('M 250,75 L 323,301 131,161 369,161 177,301 z').fill('red', 'even-odd').restore();
    doc.addPage().fillColor("blue").text('Here is a link!', 100, 100).underline(100, 100, 160, 27, {
      color: "#0000FF"
    }).link(100, 100, 160, 27, 'http://google.com/');
    doc.pipe(pdfStream);
    doc.end();

    pdfStream.addListener('finish', function() {
      console.log('PDF criado!')
    });

  } catch (err) {
    console.error('MakePDF ERROR: ' + err.message);
  }
