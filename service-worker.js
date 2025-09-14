// Service Worker for Offline Functionality
// Seasonal Feeding Calculator & Schedule

const CACHE_NAME = 'feeding-calculator-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/main.css',
    '/css/mobile.css',
    '/js/calculator.js',
    '/js/calendar.js',
    '/js/emergency.js',
    '/js/recipes.js',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Georgia:wght@400;700&family=Inter:wght@400;500;600;700&display=swap'
];

// Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.error('Cache installation failed:', err);
            })
    );
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Claim all clients
    self.clients.claim();
});

// Fetch Event - Network First, Fall Back to Cache
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // If we got a valid response, clone it and update the cache
                if (response && response.status === 200) {
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                }
                return response;
            })
            .catch(() => {
                // Network failed, try to get from cache
                return caches.match(event.request)
                    .then(response => {
                        if (response) {
                            return response;
                        }
                        
                        // If not in cache, return offline page for navigation requests
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                        
                        // Return a basic offline response for other requests
                        return new Response('Offline - Content not available', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
});

// Background Sync for Saving User Data
self.addEventListener('sync', event => {
    if (event.tag === 'sync-feeding-data') {
        event.waitUntil(syncFeedingData());
    }
});

// Sync feeding data when connection is restored
async function syncFeedingData() {
    try {
        // Get all pending data from IndexedDB or localStorage
        const pendingData = await getPendingData();
        
        if (pendingData && pendingData.length > 0) {
            // Send to server when implemented
            console.log('Syncing feeding data:', pendingData);
            // await sendToServer(pendingData);
            
            // Clear pending data after successful sync
            await clearPendingData();
        }
    } catch (error) {
        console.error('Sync failed:', error);
    }
}

// Helper function to get pending data
async function getPendingData() {
    // This would retrieve from IndexedDB in a real implementation
    return [];
}

// Helper function to clear pending data
async function clearPendingData() {
    // This would clear IndexedDB in a real implementation
    return true;
}

// Listen for messages from the main app
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => cache.addAll(event.data.urls))
        );
    }
});

// Periodic Background Sync (if supported)
self.addEventListener('periodicsync', event => {
    if (event.tag === 'update-feeding-reminders') {
        event.waitUntil(updateFeedingReminders());
    }
});

// Update feeding reminders based on schedule
async function updateFeedingReminders() {
    // This would check the feeding schedule and send notifications
    console.log('Checking feeding schedule for reminders');
}

// Push Notifications (for future implementation)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Time to check your bees!',
        icon: '/images/icons/icon-192x192.png',
        badge: '/images/icons/icon-72x72.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Open Calculator',
                icon: '/images/icons/icon-72x72.png'
            },
            {
                action: 'close',
                title: 'Dismiss',
                icon: '/images/icons/icon-72x72.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Feeding Reminder', options)
    );
});

// Notification Click Handler
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        // Open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Cache versioning and update notification
const broadcastUpdate = async () => {
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(client => {
        client.postMessage({
            type: 'CACHE_UPDATED',
            version: CACHE_NAME
        });
    });
};

// Listen for skip waiting from client
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('Service Worker loaded - Version:', CACHE_NAME);