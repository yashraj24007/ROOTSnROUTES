# Deployment and Refresh Handling Configuration

This application includes comprehensive configuration files to ensure proper handling of page refreshes and client-side routing across different hosting platforms and web servers.

## Configuration Files Included

### 1. **_redirects** (Netlify)
```
/*    /index.html   200
```
- Located in `public/_redirects`
- Handles all routes by serving `index.html` with 200 status

### 2. **vercel.json** (Vercel)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
- Rewrites all routes to serve `index.html`

### 3. **.htaccess** (Apache)
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```
- Located in `public/.htaccess`
- Handles client-side routing for Apache servers

### 4. **nginx.conf** (Nginx)
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
- Complete Nginx configuration with security headers and caching

### 5. **server.js** (Express.js)
```javascript
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
```
- Node.js/Express server configuration

### 6. **404.html** (GitHub Pages)
- Located in `public/404.html`
- Redirects 404 errors back to the main application
- Preserves the intended route in sessionStorage

## How It Works

1. **Development**: Vite automatically handles client-side routing
2. **Production**: Server configuration ensures all routes serve `index.html`
3. **Refresh Handling**: React Router takes over once the app loads
4. **Fallback**: 404.html provides backup for platforms without server-side configuration

## Deployment Instructions

### Netlify
- Deploy the `dist` folder
- `_redirects` file is automatically recognized

### Vercel
- Deploy the project root
- `vercel.json` is automatically recognized

### Apache
- Upload `dist` folder contents
- Ensure `.htaccess` file is in the root directory

### Nginx
- Copy `nginx.conf` to your server configuration
- Point document root to `dist` folder

### Express/Node.js
- Use the provided `server.js` file
- Run: `node server.js`

### GitHub Pages
- Deploy `dist` folder
- `404.html` handles routing fallback

## Testing Refresh Functionality

1. Navigate to any page (e.g., `/about`, `/destinations`)
2. Refresh the browser (F5 or Ctrl+R)
3. The page should reload and remain on the same route
4. No 404 errors should occur

This configuration ensures your Single Page Application works correctly across all major hosting platforms and web servers.