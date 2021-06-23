<template>
  <div class="todo-list">
    <ul>
      <li v-for="(item, i) in todoItems" :key="i" class="todo-item">
        <span class="item-name">
          名称：{{ item.name }}
        </span>
        &nbsp;
        <span class="item-date">
          日期：{{ item.date }}
        </span>
        <q-btn padding="2px" size="10px" icon="remove" round color="red-7" unelevated class="q-ml-sm" @click="removeItem(i)" />
      </li>
    </ul>
    <div class="row items-center q-gutter-md">
      <q-input v-model="newItem.name" label="名称" dense filled rounded />
      <q-input v-model="newItem.date" label="日期" dense rounded filled />
      <div>
        <q-btn padding="2px" size="10px" icon="add" round color="primary" unelevated class="q-ml-sm" @click="addItem" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      todoItems: [
        { name: '事项一', date: '2020-02-02' },
        { name: '事项二', date: '2020-02-03' },
        { name: '事项三', date: '2020-02-04' },
        { name: '事项四', date: '2020-02-05' },
      ],
      newItem: {
        name: '',
        date: ''
      }
    }
  },
  methods: {
    removeItem(idx) {
      this.todoItems.splice(idx, 1)
    },
    addItem() {
      this.todoItems.push({ ...this.newItem })
      this.newItem.name = ''
      this.newItem.date = ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.todo-list {
  .todo-item {
    .item-name {
      font-size: 16px;
      font-weight: bold;
    }
    .item-date {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
