const c = async (s) => {
  if (!s) throw new Error("API key is required");
  const t = window.location.href.includes("http://localhost") ? "http://localhost:3000" : "https://api.loqly.dev", e = await fetch(`${t}/v1/strings`, {
    method: "GET",
    headers: {
      Authorization: `Apikey ${s}`,
      "Content-Type": "application/json"
    }
  }), a = await e.json();
  if (!e.ok || a.error)
    throw new Error(a.error || "Something went wrong, please try again.");
  return a.strings ? a.strings : {};
};
class u {
  constructor({ apiKey: t, defaultLocale: e = "en" }) {
    this.apiKey = t, this._defaultLocale = e, this._locale = e, this._translations = null, this._translatableElements = [];
  }
  // Initialize translations from your API
  async init() {
    this._translations = await getTranslations(this.apiKey), this.cacheElements(), this.translateElements(this._translatableElements);
  }
  // Translation lookup with fallback
  t(t, e = {}) {
    var n, l, r, i;
    const a = ((l = (n = this._translations) == null ? void 0 : n[t]) == null ? void 0 : l[this._locale]) || ((i = (r = this._translations) == null ? void 0 : r[t]) == null ? void 0 : i[this._defaultLocale]);
    return a ? Object.keys(e).reduce(
      (h, o) => h.replaceAll(`{{${o}}}`, e[o]),
      a
    ) : t;
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
      const a = e.getAttribute("data-t");
      a && (e.textContent = this.t(a));
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
    this.updateLanguage(t);
  }
  get defaultLocale() {
    return this._defaultLocale;
  }
  set defaultLocale(t) {
    this._defaultLocale = t;
  }
}
export {
  u as default,
  c as getTranslations
};
