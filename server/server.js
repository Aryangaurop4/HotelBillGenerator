// server/server.js
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

app.post('/update-document', (req, res) => {
  try {
    const selectedCity = req.body.selectedCity;
    const hotelDetails = getHotelDetails(selectedCity);

    const templatePath = path.join(__dirname, 'templates', 'hotel_bill_template.docx');
    const templateContent = fs.readFileSync(templatePath, 'binary');

    const doc = new Docxtemplater();
    doc.loadZip(new PizZip(templateContent));

    doc.setData({
      place: hotelDetails,
      add: 'Sample Address',
      phone: 'Sample Phone Number',
      mail: 'sample@mail.com',
    });

    doc.render();
    const generatedDocContent = doc.getZip().generate({ type: 'nodebuffer' });

    const outputPath = path.join(__dirname, '../public/generated_documents', `generated_document_${Date.now()}.docx`);
    fs.writeFileSync(outputPath, generatedDocContent);

    res.send('Document updated successfully');
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).send('Error updating document');
  }
});

app.post('/generate-bill', (req, res) => {
  try {
    const templatePath = path.join(__dirname, 'templates', 'hotel_bill_template.docx');
    const templateContent = fs.readFileSync(templatePath, 'binary');

    const doc = new Docxtemplater();
    doc.loadZip(new PizZip(templateContent));

    const data = req.body;

    doc.setData(data);

    doc.render();
    const generatedDocContent = doc.getZip().generate({ type: 'nodebuffer' });

    const outputPath = path.join(__dirname, '../public/generated_documents', `generated_document_${Date.now()}.docx`);
    fs.writeFileSync(outputPath, generatedDocContent);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=generated_document.docx');
    res.send(generatedDocContent);
  } catch (error) {
    console.error('Error generating document:', error);
    res.status(500).send('Error generating document');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
