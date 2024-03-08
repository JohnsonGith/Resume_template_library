const express = require('express');
   const bodyParser = require('body-parser');
   const app = express();
   const PORT = process.env.PORT || 3000;

   app.use(bodyParser.json());

   // Define API routes
   app.get('/api/templates', (req, res) => {
       // Return a list of available templates (from your database or data source)
       const templates = [
           { id: 1, name: 'Template 1', description: 'A clean and professional template' },
           // Add more templates
       ];
       res.json(templates);
   });

   app.post('/api/generate-resume', (req, res) => {
       // Handle resume generation based on user data
       const { templateId, userData } = req.body;
       // Implement logic to generate the resume (replace placeholders, etc.)
       const generatedResume = `Generated resume for template ${templateId}:\n${JSON.stringify(userData, null, 2)}`;
       res.send(generatedResume);
   });

   app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
   });