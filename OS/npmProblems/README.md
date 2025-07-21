# Проблемы с зависанием npm i

Проверить текуций реестр.
По умолчанию используется https://registry.npmjs.org/.

```bash
npm config get registry
```

Официальный реестр

```bash
npm config set registry https://registry.npmjs.org/
```

Переключиться на китайское зеркало

```bash
npm config set registry https://registry.npmmirror.com/
```

Очистить кеш npm

```bash
npm cache clean --force
```

Принудительно использовать IPv4 (если IPv6 глючит)
вручную прописать IP в /etc/hosts (Linux/macOS).
Или C:\Windows\System32\drivers\etc\hosts (Windows):

```bash
104.16.0.35 registry.npmjs.org
```
