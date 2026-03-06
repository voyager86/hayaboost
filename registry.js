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
    id: 'gzip', 
    name: 'GZip Compressor', 
    category: 'Encoding', 
    path: '/gzip',
    description: 'Compress strings using GZip (CompressionStream) to reduce data size, or decompress GZip-encoded Base64 strings back to plain text.'
},
    { 
        id: 'maze3d', 
        name: '3D Maze ScreenSaver', 
        category: 'Utilities', 
        path: '/maze3d',
        description: 'A nostalgic 3D Raycasting engine inspired by the classic Windows 95 Maze screensaver. Features automated navigation through a retro brick maze.'
    },
    { 
        id: 'screensaver', 
        name: 'ScreenSaver', 
        category: 'Utilities', 
        path: '/screenSaver',
        description: 'A professional fullscreen animation generator. Features random visual effects like starfields and particles to protect your screen.'
    },
    { 
        id: 'lunar', 
        name: '农历万年历 Chinese Lunar Calendar', 
        category: 'Utilities', 
        path: '/lunar',
        description: '提供准确的公历转农历（阴历）查询，支持查看干支纪年、生肖属相及纳音五行等传统日历信息。'
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