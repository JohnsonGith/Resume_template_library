// server.js

const express = require('express');
const bodyParser = require('body-parser'); // For parsing request bodies
const pdfkit = require('pdfkit'); // For generating PDFs (you'll need to install this)

const app = express();
const PORT = process.env.PORT || 3000;

// Sample data for resume (you can replace this with a database)
const sampleResumeData = {
  name: 'John Doe',
  email: 'john@example.com',
  education: 'Bachelor of Science in Computer Science',
  experience: 'Software Engineer at XYZ Corp',
  skills: 'JavaScript, Node.js, Express.js, MongoDB',
};

// Middleware
app.use(bodyParser.json());

// API endpoint to generate a resume
app.post('/generate-resume', (req, res) => {
  const { templateId } = req.body; // Assuming you'll send the template ID from the frontend

  // Fetch template content based on templateId (from your database)
  const templateContent = getTemplateContent(templateId);

  // Combine template content with user-specific data
  const completeResume = combineResumeData(templateContent, sampleResumeData);

  // Generate PDF
  const pdfDoc = new pdfkit();
  pdfDoc.text(completeResume); // Customize layout as needed

  // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');

  // Pipe the PDF to the response
  pdfDoc.pipe(res);
  pdfDoc.end();
});

// Dummy function to fetch template content (replace with your database logic)
function getTemplateContent(templateId) {
  // Return template content based on templateId
  // Example: You could have predefined templates stored in an object or database
  const templates = {
    1: 'Template 1 content...',
    2: 'Template 2 content...',
    // Add more templates here
  };

  return templates[templateId] || 'Default template content...';
}

// Dummy function to combine template content with user data
function combineResumeData(templateContent, userData) {
  // Replace placeholders in template content with actual user data
  // Example: Replace '{{name}}' with userData.name
  return templateContent.replace('{{name}}', userData.name)
    .replace('{{email}}', userData.email)
    .replace('{{education}}', userData.education)
    .replace('{{experience}}', userData.experience)
    .replace('{{skills}}', userData.skills);
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});