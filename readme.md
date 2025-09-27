# loqly-web

**loqly-web** is a JavaScript package that makes it easy to integrate [loqly](https://loqly.dev) for internationalization and copy management in your web projects.

For detailed documentation and guides, visit the [loqly documentation](https://loqly.dev/documentation).

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Updating the language](#updating-the-language)
- [Custom functionality](#using-loqly-in-custom-functionality)
- [Interpolation](#interpolation)

## Installation

Install via npm

```bash
npm install @loqly/web
```

Include via script tag

```html
<script src="https://unpkg.com/@loqly/web/dist/index.umd.js"></script>
```

## Setup

To auto-select your elements, they should have a data attribute like so:

```html
<button data-t="auth.btn.login"></button>
```

```js
import Loqly from '@loqly/web'

const loqly = new Loqly({
  apiKey: 'your-loqly-api-key',
  defaultLocale: 'en', // Optional, defaults to 'en', used as fallback language
})

// Fetch your translations & translate the current page
await loqly.init()
```

## Updating the language

```js
loqly.updateLanguage('de') // Automatically translates the current page
loqly.locale = 'de' // Updating the language without auto translation
```

## Manually translating elements

```js
// Translate the whole page
loqly.translatePage()

// Translate multiple elements
const paragraphs = document.querySelectorAll('p')
loqly.translateElements(paragraphs)

// Translate a single element
const loginBtn = document.querySelector('button.login')
loginBtn.textContent = loqly.t('auth.btn.login')
```

## Using loqly in custom functionality

You can implement loqly into your existing system and just fetch your translations. No need to init loqly then.

```js
import Loqly from '@loqly/web'

const translations = await Loqly.getTranslations(
  apiKey: 'your-loqly-api-key',

  // Optional configurations
  options: {
    projectIds: ['website'],
    namespaces: ['auth', 'error'],
    languages: ['en', 'de']
  },
  fallback: {
    "auth.btn.login": { en: 'Login', de: 'Anmelden' }
  }
)
```

## Interpolation

You can easily insert dynamic content into your translations using our string interpolation feature.

```js
const count = document.querySelector('.count')
count.textContent = loqly.t('User {user} has {count} new notifications', {
  user: 'Alice',
  count: 3,
})
```

This will render as:

```html
<p class="count">User Alice has 3 new notifications</p>
```
