import getTranslations from './getTranslations.js'

export default class Loqly {
  constructor({ apiKey, defaultLocale = 'en' }) {
    this.apiKey = apiKey
    this._defaultLocale = defaultLocale
    this._locale = defaultLocale
    this._translations = null

    // Cached elements for translation (SPA-friendly)
    this._translatableElements = []
  }

  // Initialize translations from your API
  async init() {
    this._translations = await getTranslations(this.apiKey)
    this.cacheElements()
    this.translateElements(this._translatableElements)
  }

  // Only fetch & return translations
  static async getTranslations(apiKey) {
    const translations = await getTranslations(apiKey)
    return translations
  }

  // Translation lookup with fallback
  t(key) {
    const translation =
      this._translations?.[key]?.[this._locale] ||
      this._translations?.[key]?.[this._defaultLocale]

    if (!translation) return key
    return translation
  }

  // Cache all elements with data-t attribute
  cacheElements() {
    this._translatableElements = Array.from(
      document.querySelectorAll('[data-t]')
    )
  }

  // Translate a list of elements
  translateElements(elements) {
    elements.forEach((el) => {
      const key = el.getAttribute('data-t')
      if (key) el.textContent = this.t(key)
    })
  }

  // Translate the whole page (re-queries if cache is empty)
  translatePage() {
    if (!this._translatableElements.length) this.cacheElements()
    this.translateElements(this._translatableElements)
  }

  // Update current language and re-translate
  updateLanguage(lang) {
    this._locale = lang
    this.translatePage()
  }

  // Getters / setters
  get translations() {
    return this._translations
  }

  set translations(obj) {
    this._translations = obj
  }

  get locale() {
    return this._locale
  }

  set locale(lang) {
    this.updateLanguage(lang)
  }

  get defaultLocale() {
    return this._defaultLocale
  }

  set defaultLocale(lang) {
    this._defaultLocale = lang
  }
}
