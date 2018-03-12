<template>
    <div>
        <input type="text" v-model="newTodo" @keyup.enter="addNewTodo" placeholder="add new Todo">
        <ul>
            <li 
                is="todo-item" 
                v-for="(item, index) in todos" 
                :key="item.id"
                :title="item.title"
                @remove="todos.splice(index, 1)"
            ></li>
        </ul>
    </div>
</template>

<script>
import todoItem from '@/components/todo_item';

export default {
  name: 'app',
  data: () => {
      return {
          message: 'This is Life',
          newTodo: '',
          todos: [{
              id: 1,
              title: '总结webpack配置'
          }],
          nextTodoId: 2
      };
  },
  components: {
      todoItem
  },
  methods: {
      addNewTodo:function() {
          this.todos.push({
              title: this.newTodo,
              id: this.nextTodoId++
          });
          this.newTodo = '';
      }
  }
};
</script>
