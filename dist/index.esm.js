const c = async (r, t = null, e = {}) => {
  if (!r) throw new Error("API key is required");
  let a = "";
  Object.keys(t).length > 0 && (t.projectIds && (a += `projectIds=${t.projectIds.join(",")}&`), t.namespaces && (a += `namespaces=${t.namespaces.join(",")}&`), t.languages && (a += `languages=${t.languages.join(",")}`));
  let s = e;
  try {
    const n = window.location.href.includes("http://localhost") ? "http://localhost:3000" : "https://api.loqly.dev", i = await fetch(`${n}/v1/strings?${a}`, {
      method: "GET",
      headers: {
        Authorization: `Apikey ${r}`,
        "Content-Type": "application/json"
      }
    }), l = await i.json();
    if (!i.ok || l.error)
      throw new Error(l.error || "Something went wrong, please try again.");
    l.strings && (s = l.strings);
  } catch (n) {
    throw new Error(n);
  } finally {
    return s;
  }
};
function o(r, t) {
  if (!t) return r;
  const e = /\{([^\s{}]+)\}/g;
  return [...r.matchAll(e)].map((s) => s[1]).reduce((s, n) => n in t ? s.replace(new RegExp(`\\{${n}\\}`, "g"), t[n]) : s, r);
}
class h {
  constructor({ apiKey: t, defaultLocale: e = "en" }) {
    this.apiKey = t, this.this._defaultLocale = e, this._locale = e, this._translations = null, this._translatableElements = [];
  }
  // Initialize translations from your API
  async init() {
    this._translations = await c(this.apiKey), this.cacheElements(), this.translateElements(this._translatableElements);
  }
  // Only fetch & return translations
  static async getTranslations(t, e = null, a = {}) {
    return await c(t, e, a);
  }
  static interpolateTranslation(t, e = null) {
    return o(t, e);
  }
  // Translation lookup with fallback
  t(t, e = null) {
    var s, n, i, l;
    const a = ((n = (s = this._translations) == null ? void 0 : s[t]) == null ? void 0 : n[this._locale]) || ((l = (i = this._translations) == null ? void 0 : i[t]) == null ? void 0 : l[this._defaultLocale]);
    return o(a || t, e);
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
    this._locale = t;
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
