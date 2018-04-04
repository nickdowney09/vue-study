<template>
    <div class="fl">
        <span>{{ title }}</span>
        <button @click="$emit('remove')">X</button>
    </div>
</template>

<script>
export default {
    name: 'todo-item',
    props: ['title']
};
</script>


<style>
    button {
        border: 1px solid lightblue;
        border-radius: 4px;
    }
</style>
