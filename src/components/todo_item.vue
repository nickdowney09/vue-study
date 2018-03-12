<template>
    <div>
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
