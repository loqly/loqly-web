const o = async (r, t = {}) => {
  if (!r) throw new Error("API key is required");
  let e = t;
  try {
    const s = window.location.href.includes("http://localhost") ? "http://localhost:3000" : "https://api.loqly.dev", n = await fetch(`${s}/v1/strings`, {
      method: "GET",
      headers: {
        Authorization: `Apikey ${r}`,
        "Content-Type": "application/json"
      }
    }), a = await n.json();
    if (!n.ok || a.error)
      throw new Error(a.error || "Something went wrong, please try again.");
    a.strings && (e = a.strings);
  } catch (s) {
    throw new Error(s);
  } finally {
    return e;
  }
};
function c(r, t) {
  if (!t) return r;
  const e = /\{([^\s{}]+)\}/g;
  return [...r.matchAll(e)].map((n) => n[1]).reduce((n, a) => a in t ? n.replace(new RegExp(`\\{${a}\\}`, "g"), t[a]) : n, r);
}
class h {
  constructor({ apiKey: t, defaultLocale: e = "en" }) {
    this.apiKey = t, this._defaultLocale = e, this._locale = e, this._translations = null, this._translatableElements = [];
  }
  // Initialize translations from your API
  async init() {
    this._translations = await o(this.apiKey), this.cacheElements(), this.translateElements(this._translatableElements);
  }
  // Only fetch & return translations
  static async getTranslations(t) {
    return await o(t);
  }
  static interpolateTranslation(t, e = null) {
    return c(t, e);
  }
  // Translation lookup with fallback
  t(t, e = null) {
    var n, a, l, i;
    const s = ((a = (n = this._translations) == null ? void 0 : n[t]) == null ? void 0 : a[this._locale]) || ((i = (l = this._translations) == null ? void 0 : l[t]) == null ? void 0 : i[this._defaultLocale]);
    return s ? c(s, e) : t;
  }
  // Cache all elements with data-t attribute
  cacheElements() {
    this._translatableElements = Array.from(
      document.querySelectorAll("[data-t]")
    );
  }
  // Translate a list of elements
  translateElements(t) {
    t.forEach((e) => {
      const s = e.getAttribute("data-t");
      s && (e.textContent = this.t(s));
    });
  }
  // Translate the whole page (re-queries if cache is empty)
  translatePage() {
    this._translatableElements.length || this.cacheElements(), this.translateElements(this._translatableElements);
  }
  // Update current language and re-translate
  updateLanguage(t) {
    this._locale = t, this.translatePage();
  }
  // Getters / setters
  get translations() {
    return this._translations;
  }
  set translations(t) {
    this._translations = t;
  }
  get locale() {
    return this._locale;
  }
  set locale(t) {
    this.locale = t;
  }
  get defaultLocale() {
    return this._defaultLocale;
  }
  set defaultLocale(t) {
    this._defaultLocale = t;
  }
}
export {
  h as default
};
