# loqly-web

**loqly-web** is a JavaScript package that makes it easy to integrate [loqly](https://loqly.dev) for internationalization and copy management in your web projects.

For detailed documentation and guides, visit the [loqly documentation](https://loqly.dev/documentation).

## Installation

```bash
npm install @loqly/web
```

## Setup

```js
import Loqly from '@loqly/web'

const loqly = new Loqly({
  apiKey: 'your-loqly-api-key',
  defaultLocale: 'en', // defaults to 'en', is used as fallback language
})

// fetches your translations & translates the current page
await loqly.init()
```

### Updating the language

```js
import { updateLanguage } from '@loqly/web'

loqly.updateLanguage('de') // automatically translated the current page
```

### Manually translating elements

```js
import { translatePage, translateElements, t } from '@loqly/web'

// translating the whole page
loqly.translatePage()

// translating multiple elements
const paragraphs = document.querySelectorAll('p')
loqly.translateElement(paragraphs)

// translating a single element
const loginBtn = document.querySelector('button.login')
loginBtn.textContent = t('auth.btn.login')
```

### Implementing into your custom functionality

You can implement loqly into your existing system and just fetch your translations

```js
import { getTranslations } from '@loqly/web'

const translations = await getTranslations('your-loqly-api-key')
```
