export default function (template, payload) {
  if (!payload) return template

  // Find all matches like {user}, without matches like { user }
  const regex = /\{([^\s{}]+)\}/g
  const matches = [...template.matchAll(regex)].map((m) => m[1])

  // Replace with payload values, if existent
  return matches.reduce((str, key) => {
    if (key in payload) {
      return str.replace(new RegExp(`\\{${key}\\}`, 'g'), payload[key])
    }
    return str
  }, template)
}
