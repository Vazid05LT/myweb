// API endpoint for programmatic redirects
export default function handler(req, res) {
  const { page } = req.query;

  // Define redirect mappings
  const redirects = {
    'forms': '/forms',
    'auth': '/auth',
    'login': '/auth',
    'upload': '/file-upload',
    'files': '/file-upload',
    'images': '/image-injection',
    'todo': '/todo',
    'todos': '/todo',
    'dynamic': '/dynamic-content',
    'scroll': '/infinite-scroll',
    'a11y': '/accessibility',
    'perf': '/performance',
    'errors': '/error-handling',
    'test': '/testing-features',
    'responsive': '/responsive-demo',
    'modal': '/modals'
  };

  if (req.method === 'GET') {
    if (page && redirects[page.toLowerCase()]) {
      // Redirect to the appropriate page
      res.redirect(302, redirects[page.toLowerCase()]);
    } else {
      // Return available redirects
      res.status(200).json({
        message: 'Redirect API',
        usage: '/api/redirect?page=forms',
        availablePages: Object.keys(redirects),
        redirects
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 