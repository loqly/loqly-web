export default async (apiKey, options = null, fallback = {}) => {
  if (!apiKey) throw new Error('API key is required')

  let query = ''
  if (options && Object.keys(options).length > 0) {
    if (options.projectIds)
      query += `projectIds=${options.projectIds.join(',')}&`
    if (options.namespaces)
      query += `namespaces=${options.namespaces.join(',')}&`
    if (options.languages) query += `languages=${options.languages.join(',')}`
  }

  let strings = fallback
  try {
    const url = window.location.href.includes('http://localhost')
      ? 'http://localhost:3000'
      : 'https://api.loqly.dev'

    const response = await fetch(`${url}/v1/strings?${query}`, {
      method: 'GET',
      headers: {
        Authorization: `Apikey ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok || data.error) {
      throw new Error(data.error || 'Something went wrong, please try again.')
    } else if (data.strings) {
      strings = data.strings
    }
  } catch (error) {
    throw new Error(error)
  } finally {
    return strings
  }
}
