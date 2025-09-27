export interface LoqlyOptions {
  apiKey: string
  defaultLocale?: string
}

export default class Loqly {
  constructor(options: LoqlyOptions)
  init(): Promise<void>
  updateLanguage(lang: string): void
  translatePage(): void
  translateElement(elements: Element | Element[]): void
}

export function getTranslations(apiKey: string): Promise<Record<string, string>>
export function t(key: string): string
