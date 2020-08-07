/* Editor: Johnson Gao
 * Date This Project Created:
 * Description Of This Class:This is the service worker of the website. it is responsible for fetch and cache events.
 * Therefore, user can install this application in their tablets.
 * Also, It supports the website to run off-line.
 */

//static files list
/**
 * The version name of the user's cache.\
 * CAUTION: Everytime there is a change with the file this variable must be updated. Otherwise user's cache will remain old.
 * CAUTION:  Cache is permenant in the browser. They can remain for long time.
 * @type String
 */
const CACHE_NAME = "static-cache-v8";

/**
 * This is for up-to-date cache. Since there is no api in this service worker we don't need to worry about this.
 * @type String
 */
const DATA_CACHE_NAME ="data-cache-v1";

/**
 * All static files of this website. Everytime service worker caches it will cache the following files.
 * @type Array
 */
const FILES_TO_CACHE = [
    "service-worker.js",
    'index.html',
    'manifest.json',
    'MyProjects.html',
    'BahamasTrip.html',
    'js/js.js',"js/install.js"
    ,"images/860_AT_guitar_acoustics.png",
    "images/background-backlight-blur-color-262713.jpg",
    "images/beach.jpg",
    "images/bird32.svg",
    "images/canvas-by-instructure-logo_fbb.gif",
    "images/ccytz.png",
    "images/chemcats.png",
    "images/download32.svg","images/intconpsci.jpg","images/intiii.jpg","images/loudsound32.svg"
    ,"images/mute32.svg","images/mytrips.png","images/notgood.svg","images/nutral.svg","images/rabbit128.svg","images/rabbit128.png","images/rabbit192.png",
   "images/rabbit32.svg", "images/rabbit32.png","images/rabbit512.png","images/sight32.svg","images/smile.svg","images/smrdflag.svg","images/smstar.svg",
    "images/stoneWall.jpg","images/wood.jpg","images/x16.svg","images/xc.PNG","images/musicico32.svg","css/style.css","images/mail.jpeg"
];


self.addEventListener("install", evt => {
    console.log("[ServiceWorker] Install");
    // Precache static resources here.
    evt.waitUntil(
            caches.open(CACHE_NAME).then(cache => {
        console.log("[ServiceWorker] Pre-caching offline page");
        return cache.addAll(FILES_TO_CACHE);
    })
            );
    self.skipWaiting();
});

self.addEventListener("activate", evt => {
    console.log("[ServiceWorker] Activate");
//remove cache
    evt.waitUntil(
            caches.keys().then(keyList => {
                //promise is now supported in js. It either success or fail. Netbeans is not doing a good job supporting it.
        return Promise.all(
                keyList.map(key => {
                    //after precache
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME)
                    {
                        console.log("[ServiceWorker] Removing old cache", key);
                        return caches.delete(key);
                    }
                })
                );
    })
            );
    self.clients.claim();
});

self.addEventListener("fetch", evt => {
 const req = evt.request;
  evt.respondWith(cacheFirst(req));
});

/**
 * The algorithm used to cache static files.
 * @param {type} req The  cache matches the request and send back to the client. 
 * The client is responding to itself.
 * @returns {unresolved} 
 */
async function cacheFirst(req) {
  const cache = await caches.open(CACHE_NAME); 
  const cachedResponse = await cache.match(req); 
  return cachedResponse || fetch(req); 
}

