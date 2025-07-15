'use client'

import * as React from 'react'
import Image from 'next/image'

import { NavPresidencia } from '@/components/shadcn/sidebar/nav-presidencia'
import { NavDAF } from '@/components/shadcn/sidebar/nav-daf'
import { NavDIT } from '@/components/shadcn/sidebar/nav-dit'
import { NavDDA } from '@/components/shadcn/sidebar/nav-dda'
import { NavUser } from '@/components/shadcn/sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/shadcn/ui/sidebar'

const data = {
  user: {
    name: 'Otthon Leão',
    email: 'otthon.leao@aadesam.org',
    avatar: 'https://github.com/otthonleao.png',
  },
  navPresidencia: [
    {
      title: 'Diretor-Presidente',
      url: '#',
      isActive: true,
      items: [
        {
          title: 'Repasse Financeiro',
          url: '#',
        },
        {
          title: 'Recursos Humanos',
          url: '#',
        },
      ],
    },
    {
      title: 'Comunicação Social - COS',
      url: '#',
    },
    {
      title: 'Contralodoria - CIC',
      url: '#',
    },
    {
      title: 'Consultoria Técnica - COT',
      url: '#',
    },
    {
      title: 'Consultoria Jurídica - COJ',
      url: '#',
    },
    {
      title: 'Comissão Licitação - COL',
      url: 'presidencia/col',
      items: [
        {
          title: 'TCE - e-Contas',
          url: 'presidencia/col/tce',
        },
      ],
    },
    {
      title: 'Ouvidoria - OUV',
      url: '#',
    },
  ],
  navDAF: [
    {
      title: 'Diretoria - DAF',
      url: '#',
    },
    {
      title: 'Orçamentos e Finanças - GOF',
      url: '#',
    },
    {
      title: 'Recursos Humanos - GRH',
      url: '#',
    },
    {
      title: 'Apoio Logístico - GAL',
      url: '#',
    },
    {
      title: 'Tecnologia Informação - GTI',
      url: '#',
    },
  ],
  navDIT: [
    {
      title: 'Diretoria - DIT',
      url: '#',
    },
    {
      title: 'Elaboração de Projetos - GEP',
      url: '#',
    },
    {
      title: 'Prestação de Contas - GPC',
      url: '#',
    },
    {
      title: 'Monitoramento e Controle - GMP',
      url: '#',
    },
  ],
  navDDA: [
    {
      title: 'Diretoria - DDA',
      url: '#',
    },
    {
      title: 'Pesquisa e Estudos - GET',
      url: '#',
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="h-16">
              <a href="#">
                <div className="flex items-center justify-center p-4">
                  <Image
                    src="/brand/aadesam-brand-white.png"
                    alt="Logo AADESAM"
                    className="object-contain"
                    priority
                    fill
                  />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavPresidencia items={data.navPresidencia} />
        <NavDAF items={data.navDAF} />
        <NavDIT items={data.navDIT} />
        <NavDDA items={data.navDDA} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
