// Vercel serverless function for forms endpoint
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      // Return form configuration or data
      res.status(200).json({
        message: 'Forms endpoint - GET request',
        endpoint: '/api/forms',
        availableForms: [
          { id: 'contact', name: 'Contact Form', path: '/forms' },
          { id: 'auth', name: 'Authentication Form', path: '/auth' },
          { id: 'upload', name: 'File Upload Form', path: '/file-upload' },
          { id: 'todo', name: 'Todo Form', path: '/todo' }
        ],
        timestamp: new Date().toISOString()
      });
      break;

    case 'POST':
      // Handle form submission
      const { formType, data } = req.body;
      
      // Simulate form processing
      console.log('Form submission received:', { formType, data });
      
      res.status(200).json({
        success: true,
        message: 'Form submitted successfully',
        formType,
        submittedData: data,
        timestamp: new Date().toISOString()
      });
      break;

    case 'PUT':
      // Handle form updates
      res.status(200).json({
        success: true,
        message: 'Form updated successfully',
        timestamp: new Date().toISOString()
      });
      break;

    case 'DELETE':
      // Handle form deletion
      res.status(200).json({
        success: true,
        message: 'Form deleted successfully',
        timestamp: new Date().toISOString()
      });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 