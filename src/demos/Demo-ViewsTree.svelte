<!-- Demo-ViewsTree: the q-tree in frontend-auto-import, with the same nodes
     the old post kept in its <script> (fileConstructure), expanded by
     default; click a folder to fold or unfold it. -->
<script lang="ts">
  import { base } from '$app/paths'

  interface Node {
    label: string
    children?: Node[]
  }

  const vue = (label: string): Node => ({ label })
  const TREE: Node[] = [
    {
      label: 'src',
      children: [
        {
          label: 'views',
          children: [
            {
              label: 'user',
              children: [
                { label: 'profile', children: [vue('basic.vue'), vue('vip.vue')] },
                vue('orders.vue'),
                vue('settings.vue'),
              ],
            },
            {
              label: 'system',
              children: [vue('user.vue'), vue('role.vue'), vue('authority.vue')],
            },
            vue('login.vue'),
          ],
        },
      ],
    },
  ]

  // default-expand-all: every folder starts open; keyed by path.
  let collapsed = $state<Record<string, boolean>>({})
</script>

{#snippet branch(nodes: Node[], path: string)}
  <ul>
    {#each nodes as node (node.label)}
      {@const key = `${path}/${node.label}`}
      <li>
        {#if node.children}
          <button
            type="button"
            class="row"
            aria-expanded={!collapsed[key]}
            onclick={() => (collapsed[key] = !collapsed[key])}
          >
            <svg class="arrow" class:open={!collapsed[key]} viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M8 5v14l11-7z"></path>
            </svg>
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
              ></path>
            </svg>
            {node.label}
          </button>
          {#if !collapsed[key]}
            {@render branch(node.children, key)}
          {/if}
        {:else}
          <span class="row leaf">
            <img class="icon" src="{base}/logos/vue-logo.png" alt="" />
            {node.label}
          </span>
        {/if}
      </li>
    {/each}
  </ul>
{/snippet}

<div class="tree">
  {@render branch(TREE, '')}
</div>

<style>
  .tree {
    font-family: var(--sp-font-sans);
    font-size: 14px;
    margin: 0.5rem 0;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ul ul {
    margin-left: 11px;
    padding-left: 12px;
    border-left: 1px solid var(--sp-blog-border);
  }
  li {
    margin: 0;
    padding: 0;
  }
  li::before {
    content: none;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 3px 4px;
    border-radius: 4px;
    color: var(--sp-blog-text);
    line-height: 1.4;
  }
  button.row {
    appearance: none;
    border: none;
    background: none;
    font: inherit;
    cursor: pointer;
  }
  button.row:hover {
    background: color-mix(in srgb, var(--sp-blog-primary) 12%, transparent);
  }
  .leaf {
    padding-left: 22px;
  }
  .arrow {
    width: 18px;
    height: 18px;
    color: var(--sp-blog-muted);
    transition: transform 0.2s ease;
  }
  .arrow.open {
    transform: rotate(90deg);
  }
  svg.icon {
    width: 20px;
    height: 20px;
    color: var(--sp-blog-primary);
  }
  /* beats the post column's generic `img { max-width: 100%; height: auto }` */
  .tree img.icon {
    height: 20px;
    width: 20px;
    object-fit: contain;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
  }
</style>
