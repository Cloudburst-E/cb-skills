---
name: features-story-patterns
description: Canonical Storybook patterns for Cloudburst components (controls, Playground + CompleteShowcase, helper controls).
owner: cb-engineering-agent
---

# Storybook Patterns (enforced by `cb-engineering-agent`)

All components must ship with two stories: `Playground` (interactive) and `CompleteShowcase` (visual reference). Use these patterns to keep controls functional and predictable.

## Core Rules

1. **Story names are fixed**: `Playground` and `CompleteShowcase` only.
2. **CompleteShowcase** disables controls via `parameters: { controls: { disable: true } }`, uses column layout with section headers styled as `<h3 class="cb-h4">`.
3. **No HTML comments or decorative separators**; rely on flex layouts and spacing.
4. **Each section has a descriptive title** (e.g., “Primary Variant”, “Error States”).

## Playground Patterns

### Simple Props

```ts
const meta = {
  title: "CB UI/Tag",
  component: Tag,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: { type: "select" }, options: ["fill", "outline"] },
    state: { control: { type: "select" }, options: ["active", "hover", "error"] },
    text: { control: "text" },
  },
  args: { text: "Special", variant: "fill", state: "active" },
} satisfies Meta<typeof Tag>

export const Playground: Story = {}
```

### Array Props (Breadcrumbs, lists)

Storybook’s object control can’t push new entries. Use an `itemCount` helper and derive arrays inside `render`.

```ts
argTypes: {
  itemCount: {
    control: { type: "number", min: 1, max: 10 },
    description: "Number of breadcrumb items",
  },
  items: { control: false },
},
args: { itemCount: 5 },
render: (args) => ({
  components: { Breadcrumbs },
  setup() {
    const items = Array.from({ length: args.itemCount || 1 }, (_, i) => ({
      title: `Breadcrumb ${i + 1}`,
      href: i < (args.itemCount || 1) - 1 ? "#" : undefined,
    }))
    return { items, maxItems: args.maxItems }
  },
  template: '<Breadcrumbs :items="items" :max-items="maxItems" />',
})
```

### Icon Props

Expose a `selectedIcon` string control, then map it to a Vuetify `VIcon` inside `render`.

```ts
argTypes: {
  iconPosition: { control: { type: "select" }, options: ["none", "left", "right"] },
  selectedIcon: { control: { type: "select" }, options: ["none", "star", "heart"] },
  leftIcon: { control: false },
  rightIcon: { control: false },
},
render: (args) => ({
  components: { Button },
  setup() {
    const iconMap = { star: "mdi-star", heart: "mdi-heart" }
    const iconComponent = args.selectedIcon !== "none"
      ? { render: () => h(VIcon, { icon: iconMap[args.selectedIcon] }) }
      : undefined
    const leftIcon = args.iconPosition === "left" ? iconComponent : undefined
    const rightIcon = args.iconPosition === "right" ? iconComponent : undefined
    return { args, leftIcon, rightIcon }
  },
  template: '<Button v-bind="args" :left-icon="leftIcon" :right-icon="rightIcon" />',
})
```

### Form Components with `v-model`

Never expose `modelValue` as a control. Instead, use a local ref.

```ts
argTypes: {
  modelValue: { control: false },
  label: { control: "text" },
  placeholder: { control: "text" },
}
render: (args) => ({
  components: { TextField },
  setup() {
    const value = ref("")
    return { args, value }
  },
  template: '<div style="width: 600px;"><TextField v-bind="args" v-model="value" /></div>',
})
```

## CompleteShowcase Layout

```ts
export const CompleteShowcase: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    setup() {
      const StarIcon = { render: () => h(VIcon, { icon: "mdi-star" }) }
      return { StarIcon }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:20px;">
        <section>
          <h3 class="cb-h4" style="color:white;margin-bottom:12px;">Primary Variant</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <Button variant="primary" state="active" text="Active" />
            <Button variant="primary" state="hover" text="Hover" />
            <Button variant="primary" :disabled="true" text="Disabled" />
          </div>
        </section>
        <section>
          <h3 class="cb-h4" style="color:white;margin-bottom:12px;">With Icons</h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <Button variant="primary" text="With Icon" icon-position="left" :left-icon="StarIcon" />
          </div>
        </section>
      </div>
    `,
  }),
}
```

## Common Violations & Fixes

| Violation | Fix |
|-----------|-----|
| Exposing `modelValue` control | Remove control, use `ref` + `v-model` |
| Using `control: 'object'` for arrays | Replace with numeric helper control + computed data |
| Missing story names or extra stories | Rename to `Playground` and `CompleteShowcase` |
| Comments/HR tags used as separators | Replace with section headings + flex gaps |
| No `layout: 'centered'` in meta | Add to `parameters` for consistent rendering |

Stick to these patterns and Storybook remains predictable for every component.

<!--
Source references:
- frontend/.ai/story-patterns.md
-->
