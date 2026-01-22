// registry.js
export const toolRegistry = [
    { 
        id: 'urlEncoder', 
        name: 'URL Encoder/Decode', 
        category: 'Encoding', 
        path: '/urlEncoder',
        description: 'Easily encode or decode URLs to ensure they are safe for web transmission. This tool handles special characters and formatting for developers.'
    },
    { 
        id: 'ua', 
        name: 'UserAgent Display', 
        category: 'Browser', 
        path: '/ua',
        description: 'View your current browser user agent string. Essential for debugging cross-browser issues and identifying device platform details.'
    },
    { 
        id: 'md5', 
        name: 'MD5 Generator', 
        category: 'Security', 
        path: '/md5',
        description: 'Generate secure MD5 hashes for any string. A fast, browser-side hashing utility for developers needing quick data verification.'
    },
    { 
        id: 'base64', 
        name: 'Base64 Encoder/Decoder', 
        category: 'Encoding', 
        path: '/base64',
        description: 'Convert text to Base64 format or decode it back. Optimized for UTF-8 characters and high-performance developer workflows.'
    },
    { 
        id: 'qsExtractor', 
        name: 'QueryString Extractor', 
        category: 'Utilities', 
        path: '/queryStringExtractor',
        description: 'Parse complex URLs to extract and sort query string parameters in a clean grid view. Perfect for debugging API calls and tracking links.'
    }
];