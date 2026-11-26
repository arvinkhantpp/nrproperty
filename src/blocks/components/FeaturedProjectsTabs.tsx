'use client'

import { ProjectCard, Tabs, type ProjectCardProps } from '@/components/ui'

type Group = { id: string; label: string; cards: ProjectCardProps[] }

function Row({ cards }: { cards: ProjectCardProps[] }) {
  return (
    // Phones: swipeable row of 300px cards (peeking the next one). Desktop: three-column grid.
    <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:-mx-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
      {cards.map((c, i) => (
        <li key={c.href} className="w-[300px] shrink-0 snap-start sm:w-[340px] lg:w-auto">
          <ProjectCard {...c} priority={false} className={i === 0 ? '' : undefined} />
        </li>
      ))}
    </ul>
  )
}

export function FeaturedProjectsTabs({ groups, tabsLabel }: { groups: Group[]; tabsLabel: string }) {
  if (groups.length === 1 || !groups[0]?.label) {
    return (
      <div className="mt-10 lg:mt-14">
        <Row cards={groups[0]?.cards ?? []} />
      </div>
    )
  }
  return (
    <Tabs
      label={tabsLabel}
      className="mt-8 lg:mt-12"
      panelClassName="mt-8 lg:mt-10"
      items={groups.map((g) => ({ id: g.id, label: g.label, content: <Row cards={g.cards} /> }))}
    />
  )
}
