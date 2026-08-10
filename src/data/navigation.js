import { House, UserRound, BriefcaseBusiness, Mail, PanelsTopLeft } from '@lucide/vue'

export const navigation = [
  { label: 'Головна', to: '/', icon: House },
  { label: 'Про мене', to: '/about', icon: UserRound },
  { label: 'Послуги', to: '/services', icon: BriefcaseBusiness },
  { label: 'Портфоліо', to: '/portfolio', icon: PanelsTopLeft },
  { label: 'Контакти', to: '/contact', icon: Mail },
]
