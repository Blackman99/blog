<!-- Demo-TodoList: the todo list the article builds — remove an item with the
     red button, add one from the two inputs (old Demo/TodoList.vue; the Quasar
     q-btn / q-input are replaced by plain buttons and filled inputs). -->
<script lang="ts">
  interface TodoItem {
    name: string
    date: string
  }

  let todoItems = $state<TodoItem[]>([
    { name: '事项一', date: '2020-02-02' },
    { name: '事项二', date: '2020-02-03' },
    { name: '事项三', date: '2020-02-04' },
    { name: '事项四', date: '2020-02-05' },
  ])
  let newItem = $state<TodoItem>({ name: '', date: '' })

  function removeItem(idx: number) {
    todoItems.splice(idx, 1)
  }

  function addItem() {
    todoItems.push({ ...newItem })
    newItem.name = ''
    newItem.date = ''
  }
</script>

<div class="todo-list">
  <ul>
    {#each todoItems as item, i (item)}
      <li class="todo-item">
        <span class="item-name">
          名称：{item.name}
        </span>
        &nbsp;
        <span class="item-date">
          日期：{item.date}
        </span>
        <button
          type="button"
          class="round-btn round-btn--remove"
          aria-label="删除"
          onclick={() => removeItem(i)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 13H5v-2h14v2Z" /></svg>
        </button>
      </li>
    {/each}
  </ul>
  <div class="row">
    <label class="field">
      <input bind:value={newItem.name} placeholder=" " />
      <span>名称</span>
    </label>
    <label class="field">
      <input bind:value={newItem.date} placeholder=" " />
      <span>日期</span>
    </label>
    <div>
      <button type="button" class="round-btn round-btn--add" aria-label="添加" onclick={addItem}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" /></svg>
      </button>
    </div>
  </div>
</div>

<style>
  .todo-list {
    font-family: var(--sp-font-sans);
  }
  .item-name {
    font-size: 16px;
    font-weight: bold;
  }
  .item-date {
    font-size: 14px;
    color: var(--sp-blog-muted);
  }
  /* q-btn round, size 10px, padding 2px, unelevated */
  .round-btn {
    appearance: none;
    border: none;
    border-radius: 50%;
    padding: 2px;
    width: 1.4em;
    height: 1.4em;
    font-size: 15px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    color: #fff;
    cursor: pointer;
  }
  .round-btn:hover {
    filter: brightness(1.1);
  }
  .round-btn svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
  .round-btn--remove {
    background: #d32f2f; /* Quasar red-7 */
    margin-left: 8px;
  }
  .round-btn--add {
    background: var(--sp-blog-primary);
    margin-left: 8px;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
  }
  /* q-input filled rounded dense with a floating label */
  .field {
    position: relative;
    display: block;
  }
  .field input {
    box-sizing: border-box;
    height: 40px;
    min-width: 180px;
    padding: 14px 24px 2px;
    border: none;
    border-bottom: 1px solid var(--sp-blog-border);
    border-radius: 28px;
    background: color-mix(in srgb, var(--sp-blog-text) 6%, transparent);
    color: var(--sp-blog-text);
    font: inherit;
    font-size: 14px;
    outline: none;
  }
  .field input:focus {
    border-bottom: 2px solid var(--sp-blog-primary);
  }
  .field span {
    position: absolute;
    left: 24px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: var(--sp-blog-muted);
    pointer-events: none;
    transition:
      top 0.2s,
      font-size 0.2s,
      color 0.2s;
  }
  .field input:focus + span,
  .field input:not(:placeholder-shown) + span {
    top: 10px;
    font-size: 10.5px;
  }
  .field input:focus + span {
    color: var(--sp-blog-primary);
  }
</style>
