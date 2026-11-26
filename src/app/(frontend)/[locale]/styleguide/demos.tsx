'use client'

import { useState } from 'react'

import {
  Accordion,
  Button,
  Input,
  Modal,
  Select,
  StickyMobileCTA,
  Tabs,
  Textarea,
  useToast,
  WhatsAppFab,
} from '@/components/ui'

const projectOptions = [
  { value: 'a', label: '[Project name A]' },
  { value: 'b', label: '[Project name B]' },
]

export function FormDemos() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-5 rounded-xl border border-line bg-white p-6 sm:p-9">
        <p className="text-display-s text-ink">Light</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input label="Full name" required placeholder="e.g. Rahim Uddin" autoComplete="name" />
          <Input
            label="Phone number"
            required
            type="tel"
            inputMode="tel"
            placeholder="01XXX-XXXXXX"
            defaultValue="0181"
            error="Enter an 11-digit number starting with 01"
          />
        </div>
        <Select
          label="Interested project"
          required
          placeholder="Select a project"
          options={projectOptions}
        />
        <Textarea
          label="Message"
          placeholder="Anything you would like us to know"
          hint="Optional"
        />
        <Input label="Disabled" disabled defaultValue="Read only value" />
      </div>
      <div className="flex flex-col gap-5 rounded-xl bg-forest p-6 sm:p-9">
        <p className="text-display-s text-cream">Dark</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input theme="dark" label="Full name" required placeholder="e.g. Rahim Uddin" />
          <Input
            theme="dark"
            label="Phone number"
            required
            type="tel"
            placeholder="01XXX-XXXXXX"
            error="Phone number is required"
          />
        </div>
        <Select
          theme="dark"
          label="Interested project"
          required
          placeholder="Select a project"
          options={projectOptions}
        />
        <Textarea theme="dark" label="Message" placeholder="Anything you would like us to know" />
        <Button fullWidth>Request a Call Back</Button>
        <p className="text-small text-cream/60">
          By submitting, you agree to be contacted by phone or WhatsApp. See our{' '}
          <a href="#" className="underline underline-offset-2 hover:text-cream">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export function InteractiveDemos() {
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const toast = useToast()

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-6">
        <Tabs
          label="Project status"
          items={[
            {
              id: 'ongoing',
              label: 'Ongoing',
              content: <p className="pt-6 text-body text-muted">Ongoing projects appear here.</p>,
            },
            {
              id: 'upcoming',
              label: 'Upcoming',
              content: <p className="pt-6 text-body text-muted">Upcoming projects appear here.</p>,
            },
            {
              id: 'completed',
              label: 'Completed',
              content: <p className="pt-6 text-body text-muted">Completed projects appear here.</p>,
            },
          ]}
        />
        <Tabs
          variant="chips"
          label="Floor plans"
          items={[
            { id: 'a', label: 'Type A · 2,150 sft' },
            { id: 'b', label: 'Type B · 2,380 sft' },
            { id: 'c', label: 'Type C · 2,650 sft' },
          ]}
        />
      </div>

      <Accordion
        className="max-w-3xl"
        defaultOpen={['q1']}
        items={[
          {
            id: 'q1',
            question: 'Is the project approved by RAJUK?',
            answer: 'Yes. The approval number is shown on every project page: [RAJUK no.].',
          },
          {
            id: 'q2',
            question: 'Can I pay in instalments?',
            answer:
              'Most projects offer a down payment followed by monthly instalments until handover.',
          },
          {
            id: 'q3',
            question: 'Do you arrange home loans?',
            answer: 'We work with several banks and can introduce you to a loan officer.',
          },
        ]}
      />

      <div className="flex flex-wrap gap-4">
        <Button variant="dark" onClick={() => setModal(true)}>
          Open modal
        </Button>
        <Button variant="outline" onClick={() => setDrawer(true)}>
          Open drawer
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: 'Thank you, we’ll call you soon',
              description: 'An advisor will call within one working day.',
            })
          }
        >
          Success toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              tone: 'error',
              title: 'Something went wrong',
              description: 'Please try again or call us.',
            })
          }
        >
          Error toast
        </Button>
      </div>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Book a site visit"
        description="Pick a day and we’ll confirm by phone."
      >
        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <Input label="Full name" required placeholder="e.g. Rahim Uddin" />
          <Input label="Phone number" required type="tel" placeholder="01XXX-XXXXXX" />
          <Button type="submit" fullWidth onClick={() => setModal(false)}>
            Book a Visit
          </Button>
        </form>
      </Modal>

      <Modal
        variant="drawer"
        open={drawer}
        onClose={() => setDrawer(false)}
        title="Lead details"
        description="Drawer variant, used for the admin lead view and mobile menus."
      >
        <div className="flex flex-col gap-4 text-body text-muted">
          <p>Slides in from the right on desktop and up from the bottom on phones.</p>
          <Button variant="dark" onClick={() => setDrawer(false)}>
            Done
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export function MobileBarsDemo({
  phoneHref,
  whatsappHref,
}: {
  phoneHref: string
  whatsappHref: string
}) {
  const [variant, setVariant] = useState<'floating' | 'bar'>('floating')
  return (
    <div className="flex flex-col gap-6">
      <p className="max-w-xl text-body text-muted">
        Below 1024px the sticky bar is pinned to the bottom of this page; above it, the floating
        WhatsApp button shows instead.
      </p>
      <Tabs
        label="Mobile bar variant"
        value={variant}
        onChange={(id) => setVariant(id as 'floating' | 'bar')}
        items={[
          { id: 'floating', label: 'Home (floating)' },
          { id: 'bar', label: 'Project (bar)' },
        ]}
      />
      <StickyMobileCTA
        variant={variant}
        phoneHref={phoneHref}
        whatsappHref={whatsappHref}
        primary={{ label: variant === 'bar' ? 'Book a Site Visit' : 'Enquire', href: '#forms' }}
      />
      <WhatsAppFab href={whatsappHref} />
    </div>
  )
}
