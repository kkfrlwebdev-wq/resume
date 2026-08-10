import { House, UserRound, BriefcaseBusiness, Mail, PanelsTopLeft } from '@lucide/vue'

export const navigation = [
  { labelKey: 'nav.home', to: '/', icon: House },
  { labelKey: 'nav.about', to: '/about', icon: UserRound },
  { labelKey: 'nav.services', to: '/services', icon: BriefcaseBusiness },
  { labelKey: 'nav.portfolio', to: '/portfolio', icon: PanelsTopLeft },
  { labelKey: 'nav.contact', to: '/contact', icon: Mail },
]
