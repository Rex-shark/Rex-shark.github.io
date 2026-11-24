import { createStore } from '../lib/store'
import type { Billing, PlanKey } from './data'

/**
 * 方案介紹頁狀態（模組層級，風格之外）。對應 spec/templates/landing.md。
 * 訂閱對話框的表單也放這裡，切換風格時不會遺失。
 */

export interface SubscribeForm {
  plan: PlanKey
  billing: Billing
  startMonth: string
  name: string
  email: string
  gift: boolean
  recipient: string
  card: string
  terms: boolean
}

export interface LandingState {
  version: number
  billing: Billing
  compareOpen: boolean
  dialogOpen: boolean
  form: SubscribeForm
  subscribed: boolean
}

let version = 0

const emptyForm = (plan: PlanKey, billing: Billing): SubscribeForm => ({
  plan,
  billing,
  startMonth: '',
  name: '',
  email: '',
  gift: false,
  recipient: '',
  card: '',
  terms: false,
})

function init(): LandingState {
  return { version: version++, billing: 'monthly', compareOpen: false, dialogOpen: false, form: emptyForm('forest', 'monthly'), subscribed: false }
}

export type LandingAction =
  | { type: 'billing'; billing: Billing }
  | { type: 'compare'; open: boolean }
  | { type: 'openSubscribe'; plan: PlanKey }
  | { type: 'closeSubscribe' }
  | { type: 'form'; patch: Partial<SubscribeForm> }
  | { type: 'subscribed' }

function reducer(s: LandingState, a: LandingAction): LandingState {
  switch (a.type) {
    case 'billing':
      return { ...s, billing: a.billing }
    case 'compare':
      return { ...s, compareOpen: a.open }
    case 'openSubscribe':
      // 帶入點擊的方案與頁面目前的付款週期；上次成功訂閱後重開則清空表單
      return {
        ...s,
        dialogOpen: true,
        subscribed: false,
        form: s.subscribed ? emptyForm(a.plan, s.billing) : { ...s.form, plan: a.plan, billing: s.billing },
      }
    case 'closeSubscribe':
      return { ...s, dialogOpen: false }
    case 'form':
      return { ...s, form: { ...s.form, ...a.patch } }
    case 'subscribed':
      return { ...s, subscribed: true }
  }
}

export const landingStore = createStore(init, reducer)
export const dispatch = landingStore.dispatch
