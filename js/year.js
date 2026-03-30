const yearSpan = document.getElementById('currentYear');
const now = new Date();
yearSpan.textContent = now.getFullYear();

const lastmod = document.getElementById('lastModified');
lastmod.textContent = `Last modified: ${document.lastModified}`;