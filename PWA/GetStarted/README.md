# Как сделать PWA из вашего приложения

### 1) Создать файл в /public/

```markdown
manifest.json
```

```json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

### 2) Cоздать файл в ./src

```markdown
serviceWorkerRegistration.ts
```

```ts
// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  console.log(process.env.NODE_ENV, process.env.NODE_ENV === 'production');
  if ('serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log('This web app is being served cache-first by a service ' + 'worker. To learn more, visit https://cra.link/PWA');
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log('New content is available and will be used when all ' + 'tabs for this page are closed. See https://cra.link/PWA.');

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
```

### 3) Создать файл в ./src

```md
service-worker.ts
```

```ts
/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkOnly, NetworkFirst } from 'workbox-strategies';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();
// clientsClaim заставляет новый активный сервис-воркер сразу же захватить все доступные клиенты (открытые вкладки ).

precacheAndRoute(self.__WB_MANIFEST);
// self.__WB_MANIFEST — это манифест, который содержит список URL-адресов ресурсов, которые должны быть предварительно кэшированы. Этот манифест обычно генерируется автоматически в процессе сборки вашего приложения (например, с помощью инструментов, таких как Workbox или Create React App
// precacheAndRoute() — выполняет две основные задачи:
// 1. Предварительное кэширование (Precaching): Функция кэширует все ресурсы, перечисленные в манифесте, во время установки сервис-воркера. Это означает, что эти ресурсы будут доступны офлайн.
// 2. Маршрутизация (Routing): Функция настраивает маршрутизацию таким образом, чтобы запросы к этим ресурсам обслуживались из кэша, если они доступны. Если ресурс не найден в кэше, он может быть загружен с сервера.
// https://cra.link/PWA
// https://developers.google.com/web/fundamentals/architecture/app-shell

// В этом примере, если POST-запрос на /posts проваливается из-за отсутствия интернета, он будет добавлен в очередь postsQueue и будет пытаться повторно отправиться в течение 24 часов. Если запрос не будет успешно отправлен в течение этого времени, он будет удален из очереди.
const bgSyncPlugin = new BackgroundSyncPlugin('myQueueName', {
  maxRetentionTime: 24 * 60, // Попытка выполнения повторного запроса будет выполнена в течение 24 часов (в минутах)
});
// Регистрация маршрута для кэширования данных с учетом пагинации
registerRoute(
  ({ url }) => {
    // Проверяем, что URL соответствует базовому URL и содержит параметры пагинации
    return url.origin === 'http://localhost:3000' && url.pathname === '/api/v1/Dictionaries/all';
  },
  new StaleWhileRevalidate({
    cacheName: 'paginated-data',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50, // Максимальное количество записей в кэше
        maxAgeSeconds: 60 * 60 * 24, // Срок хранения кэша в секундах (24 часа)
      }),
    ],
  })
);

// Регистрируем маршрут для обработки POST-запросов на /posts
registerRoute(
  ({ url }) => url.pathname === '/posts',
  new NetworkOnly({
    plugins: [bgSyncPlugin], // Используем плагин для фоновой синхронизации
  }),
  'POST' // Обрабатываем только POST-запросы
);

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Возвращает значение false, чтобы игнорировать запросы от выполнения с помощью index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    }

    // Если это не навигация, игнорируем.
    // Это может быть использовано для исключения определенных путей, например, для служебных маршрутов.
    if (url.pathname.startsWith('/_')) {
      return false;
    }

    // Если это похоже на URL-адрес ресурса, поскольку он содержит
    // расширение файла, игнорируем.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    // Возвращает true, чтобы сигнализировать о том, что мы хотим использовать обработчик.
    return true;
  },
  // Обработчик, который будет возвращать содержимое index.html для всех запросов, которые не были пропущены предыдущими условиями.
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// Пример маршрута кэширования во время выполнения для запросов, которые не обрабатываются предварительным кэшированием
registerRoute(
  // Проверяем, что URL имеет тот же домен и заканчивается на .png
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  // Эта стратегия сначала возвращает данные из кеша (если они есть), а затем обновляет кеш, запрашивая данные с сервера. Таким образом, пользователь получает данные быстро, но кеш постепенно обновляется.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Это плагин, который управляет временем жизни записей в кеше. В данном случае он ограничивает количество записей в кеше до 50, удаляя старые записи, когда лимит достигнут
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);
// Кешируем иконки .ico и .png с использованием стратегии CacheFirst
registerRoute(
  ({ url }) => url.origin === self.location.origin && (url.pathname.endsWith('.ico') || url.pathname.endsWith('.png')),
  // Стратегия кеширования, которая сначала пытается обслужить запрос из кеша, и только если данные в кеше отсутствуют, делает запрос на сервер
  new CacheFirst({
    cacheName: 'icons',
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);
// Регистрируем маршрут для кеширования данных с конкретного API-эндпоинта
registerRoute(
  // Проверяем, что URL соответствует API-эндпоинту для получения списка пользователей
  ({ url }) => url.origin === 'https://jsonplaceholder.typicode.com' && url.pathname === '/users',
  // Используем стратегию StaleWhileRevalidate для обслуживания запросов из кеша и обновления данных из сети
  new StaleWhileRevalidate({
    cacheName: 'users-list',
    plugins: [
      // Ограничиваем количество кешированных записей до 1, удаляя старые при необходимости
      new ExpirationPlugin({ maxEntries: 1 }),
    ],
  })
);
// Исключаем файлы CSS из кеширования
registerRoute(
  // Проверяем, что URL имеет тот же домен и заканчивается на .css
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.css'),
  // Используем стратегию NetworkOnly для загрузки файлов CSS только из сети и никогда не кеширования
  new NetworkOnly()
);

// skipWaiting заставляет новый сервис-воркер пропустить состояние ожидания и сразу же стать активным.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```

### 4) Зарегистрировать service worker в файле index.tsx

```ts
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// serviceWorkerRegistration.register() регестрируем сервис воркер
serviceWorkerRegistration.register();
```

### Установить зависимости и создать файл server.js и настроить прокси

```md
server.js
```

```ts
const express = require('express');
const proxy = require('express-http-proxy');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Проксирование запросов к API
app.use(
  '/api',
  proxy('http://www.djemsolutions.com:12010', {
    proxyReqPathResolver: (req) => {
      return '/api' + req.url;
    },
    proxyErrorHandler: (err, res, next) => {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy error');
    },
  })
);

// Сервер статических файлов
app.use(express.static(path.join(__dirname, 'build')));

// Обработка всех остальных запросов, чтобы React Router мог работать
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### 6) Сбилдить npm run build и запустить node server.js для работы прокси

```md
npm run build
```

```md
node server.js
```
