import { createStore } from '../lib/store'
import type { Region } from '../data/places'
import type { ContactCategory, NewsCategory } from './data'

/**
 * 公司官網狀態（模組層級，風格之外）。對應 spec/templates/corporate.md。
 * 聯絡表單放在這裡，因為「我要應徵」要從職缺區塊預填表單。
 */

export interface ContactValues {
  name: string
  email: string
  phone: string
  category: ContactCategory | ''
  message: string
  privacy: boolean
}

export const EMPTY_CONTACT: ContactValues = { name: '', email: '', phone: '', category: '', message: '', privacy: false }

export interface CorpState {
  version: number
  storeRegion: Region | 'all'
  newsCategory: NewsCategory | 'all'
  newsExpanded: boolean
  contact: ContactValues
  contactSent: boolean
}

let version = 0

function init(): CorpState {
  return {
    version: version++,
    storeRegion: 'all',
    newsCategory: 'all',
    newsExpanded: false,
    contact: { ...EMPTY_CONTACT },
    contactSent: false,
  }
}

export type CorpAction =
  | { type: 'storeRegion'; region: Region | 'all' }
  | { type: 'newsCategory'; category: NewsCategory | 'all' }
  | { type: 'newsExpanded' }
  | { type: 'contact'; patch: Partial<ContactValues> }
  | { type: 'contactSent' }
  | { type: 'contactReset' }

function reducer(s: CorpState, a: CorpAction): CorpState {
  switch (a.type) {
    case 'storeRegion':
      return { ...s, storeRegion: a.region }
    case 'newsCategory':
      return { ...s, newsCategory: a.category }
    case 'newsExpanded':
      return { ...s, newsExpanded: true }
    case 'contact':
      return { ...s, contact: { ...s.contact, ...a.patch }, contactSent: false }
    case 'contactSent':
      return { ...s, contactSent: true }
    case 'contactReset':
      return { ...s, contact: { ...EMPTY_CONTACT }, contactSent: false }
  }
}

export const corpStore = createStore(init, reducer)
export const dispatch = corpStore.dispatch
