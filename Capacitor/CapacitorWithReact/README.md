# Как сделать нативное приложение для Windows и Linux из React приложения с помощью Capacitor

# Документация

Capacitor - https://capacitorjs.com/ .
Capacitor with React - https://capacitorjs.com/solution/react .
Capacitor Electron - https://capacitor-community.github.io/electron/docs/gettingstarted .

### 1. Установить Capacitor.

##### Добавьте Capacitor в свой проект

```bash
npm install @capacitor/core @capacitor/cli
```

##### Команда npx cap init сгенерирует файл capacitor.config.ts конфигурацию для вашего приложения.

Пользуясь подсказками установить appName и appID
Папку ресурсов указать как webDir: 'build'

```bash
npx cap init
```

После чего можно собрать проект

```bash
npm run build
```

### 2. Для создания приложений для Windows и Linux установить Capacitor Electron.

1. Создайте веб-приложение в своем проекте, инициированном конденсатором («npm run build», например).
2. Запустить npm i @capacitor-community/electron в каталоге проектов веб-приложения. Это установит платформу для использования с @capacitor/cli.

```bash
npm i @capacitor-community/electron
```

3. Запустить npx cap add @capacitor-community/electron чтобы инициировать платформу, это создаст папку electron в вашем веб-приложении.

```bash
npx cap add @capacitor-community/electron
```

4. Синхронизировать проект.

```bash
npx cap sync @capacitor-community/electron

```

5. Запустить npx cap open @capacitor-community/electron для запуска в дев режиме.

```bash
npx cap open @capacitor-community/electron
```

6. Для удобства добавим скрипты в packege.json.

```bash
    "cap:start": "npx cap open @capacitor-community/electron",
    "cap:sync": "npx cap sync @capacitor-community/electron",
    "cap:dev": "npm run build && npm run cap:sync && npm run cap:start"
```

### 3. Далее при запуске программы возникнут ошибки.

##### 1. Content Security Policy (CSP)

 <div style="background-color: #f8d7da; color: #721c24; padding: 10px; border: 1px solid #f5c6cb; border-radius: 5px;">
     Refused to connect to 'http://djemsolutions.com:11754/api/app' because it violates the following Content Security Policy directive: "default-src capacitor-electron://* 'unsafe-inline' devtools://* 'unsafe-eval' data:". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback.
   </div>
   <div style="background-color: #f8d7da; color: #721c24; padding: 10px; border: 1px solid #f5c6cb; border-radius: 5px;">
     Refused to connect to 'http://djemsolutions.com:11754/api/app' because it violates the document's Content Security Policy.
   </div>

Она связанна с политикой безопастности Capacitor приложений Политика безопасности контента (CSP). CSP может использоваться для ограничения ресурсов, которые пользовательский агент может загружать в Web View (например, изображения, XHR, видео, веб-сокеты и т. Д.).
https://capacitorjs.com/docs/v6/guides/security#content-security-policy

##### Решение:

1. Разрешить ресурсы. В файле electron/src/setup.ts заменить функцию setupContentSecurityPolicy на следующую. При необходимости редактировать. Добавить\изменить\удалить ресурсы.

```ts
export function setupContentSecurityPolicy(customScheme: string): void {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    // Базовые разрешения для всех директив
    const baseSources = ["'self'", `${customScheme}://*`, 'http://localhost:*', 'ws://localhost:*'];

    // Специфичные разрешения для разных типов контента
    const djemsSources = [
      'http://djemsolutions.com:11752',
      'http://djemsolutions.com:11754',
      'http://djemsolutions.com:11755', // Добавили медиа-порт
    ];

    // Формируем директивы CSP
    const directives = {
      'default-src': baseSources,
      'connect-src': [...baseSources, ...djemsSources],
      'img-src': [...baseSources, 'data:', 'blob:', ...djemsSources],
      'media-src': [...baseSources, 'data:', 'blob:', ...djemsSources],
      'style-src': [...baseSources, "'unsafe-inline'", ...djemsSources],
      'font-src': [...baseSources, ...djemsSources],
      'script-src': [...baseSources, "'unsafe-inline'", ...djemsSources],
      'frame-src': ["'self'", djemsSources[0]], // Только первый djems-адрес
    };

    // Формируем итоговую политику
    const policy = Object.entries(directives)
      .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
      .join('; ');

    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [policy],
      },
    });
  });
}
```

##### 2. Вторая проблема связанна с проксированием и она небудет вызывать ошибок а просто при запросах будет приходить пустой документ.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app" />
    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>ЕАБР Диск</title>
    <script defer="defer" src="/static/js/main.01ba8767.js"></script>
    <link href="/static/css/main.0c44b77b.css" rel="stylesheet" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

##### Решение:

В файле src/api/proxyBase.ts изменить export const BASE_URL = "/api"; на следующее.

```ts
export const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api`;
```

##### 3. Третья проблема связанна с keycloak.

При запросах будет возвращать ошибку 400. И на странице авторизации кейклок сообщение "Неверный параметр: redirect_uri".

Также мы можем видеть ошибку.

<div style="background-color: #f8d7da; color: #721c24; padding: 10px; border: 1px solid #f5c6cb; border-radius: 5px;">
Access to XMLHttpRequest at 'http://djemsolutions.com:11752/realms/Djems/protocol/openid-connect/token' from origin 'capacitor-electron://-' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
keyCloak.service.ts:97 undefined
keycloak.mjs:799 
 POST http://
</div>

##### Решение:

В Keycloak => Djem => Клиенты => minio-client-pub =>

1. Валидация URI перенаправления
2. Web источники

добавить новые строки.

```ts
capacitor-electron://*
```

и

```ts
capacitor-electron://-
```

##### После этих действий нативное приложение должно запускаться и работать в Dev-режиме без каких либо ошибок, должны загружаться все ресурсы.

### 4. Подготовка к сборке пакета под Linux

##### Примечание:

1. Для сборки пакета под Linux необходимо добавить обьект в конфигурацию electron/electron-builder.config

2. Для установки иконки приложения Linux необходимо в имени иконки указывать размер

```text
icon_512x512.png
```

а в конфигурации указать путь не к иконке а к каталогу где находится иконка "icon": "assets/" .

```json
  "linux": {
    "target": ["deb"],
    "icon": "assets/",
    "category": "Utility",
    "maintainer": "Djem Solutions <support@djemsolutions.com>",
    "synopsis": "DS3FS Client",
    "description": "Official client application for DS3FS system"
  }
```

Установить приложение

```bash
sudo dpkg -i ds3fs-clientapp_1.0.0_amd64.deb
```

Найти установленное приложение

```bash
dpkg -l | grep ds3fs-clientapp
```

Удалить

```bash
sudo apt purge ds3fs-clientapp
```

Проверка иконки

```bash
dpkg-deb -x ds3fs-clientapp_1.0.0_amd64.deb tmpdir
```

### Сборка пакетов

##### 1. Перейти в папку ./electron

##### 2. Запустить команду

Для Linux

```bash
npm run electron:make -- --linux --x64
```

Для Windows

```bash
npm run electron:make -- --win --x64
```

В консоли могут посыпятся ошибки

```bash
node_modules/builder-util-runtime/out/httpExecutor.d.ts:9:5 - error TS2411: Property '"accept-charset"' of type 'string | string[]' is not assignable to 'string' index type 'string'.

9     [key: string]: string;
      ~~~~~~~~~~~~~~~~~~~~~~

node_modules/builder-util-runtime/out/httpExecutor.d.ts:9:5 - error TS2411: Property '"accept-encoding"' of type 'string | string[]' is not assignable to 'string' index type 'string'.

9     [key: string]: string;
      ~~~~~~~~~~~~~~~~~~~~~~

node_modules/builder-util-runtime/out/httpExecutor.d.ts:9:5 - error TS2411: Property '"accept-language"' of type 'string | string[]' is not assignable to 'string' index type 'string'.

9     [key: string]: string;
      ~~~~~~~~~~~~~~~~~~~~~~
```

##### Решение:

В файле electron/tsconfig.json добавить флаги.

```json
"skipLibCheck": true,
"strict": false
```
##### После этих действий должны собераться .deb и .exe пакеты без каких либо проблем.