<script setup>
import { ref, onBeforeMount } from 'vue';
import List from './List.vue';
import CreateTaskDialog from './CreateTaskDialog.vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const taskList = ref([]);
const todo = ref([]);
const completed = ref([]);
const dialogConfig = ref({
    visible: false,
    task: null
});
const selectedTask = ref(null);

onBeforeMount(async () => {
    taskList.value = await getTasks();

    categorize(taskList.value);
});

const getTasks = async () => {
    const response = await fetch('/demo/data/tasks.json');
    const { data } = await response.json();

    return data;
};
const categorize = (tasks) => {
    todo.value = tasks.filter((task) => task.completed !== true);
    completed.value = tasks.filter((task) => task.completed);
};
const onCheckboxChange = (updatedTask) => {
    taskList.value.find((task) => task.id === updatedTask.id).completed = updatedTask.completed;

    categorize(taskList.value);
};
const onDeleteTask = (deletedTask) => {
    taskList.value = taskList.value.filter((task) => task.id !== deletedTask.id);

    categorize(taskList.value);
};
const openEditDialog = (task) => {
    dialogConfig.value.visible = true;
    dialogConfig.value.header = 'Edit Task';

    selectedTask.value = task;
};
const openCreateDialog = () => {
    dialogConfig.value.visible = true;
    dialogConfig.value.header = 'Create Task';

    selectedTask.value = null;
};
const onCloseDialog = () => {
    dialogConfig.value.visible = false;
};
const onSaveDialog = (task) => {
    if (task) {
        taskList.value = taskList.value.filter((t) => t.id !== task.id);

        taskList.value.push(task);
        toast.add({ severity: 'success', summary: 'Edited', detail: `Task "${task.name}" edited successfully.`, life: 3000 });
    } else {
        taskList.value.push(task);
        toast.add({ severity: 'success', summary: 'Success', detail: `Task "${task.name}" created successfully.`, life: 3000 });
    }

    categorize(taskList.value);

    dialogConfig.value.visible = false;
};
</script>

<template>
    <div class="card">
        <div class="flex justify-content-between align-items-center mb-5">
            <span class="text-900 text-xl font-semibold">Task List</span>
            <Button class="font-semibold" outlined icon="pi pi-plus" label="Create Task" @click="openCreateDialog()"></Button>
        </div>
        <List :task-list="todo" title="ToDo" @checkbox:change="onCheckboxChange" @delete:task="onDeleteTask" @open:edit:dialog="openEditDialog"></List>
        <List :task-list="completed" title="Completed" @checkbox:change="onCheckboxChange" @delete:task="onDeleteTask" @open:edit:dialog="openEditDialog"></List>
    </div>

    <Dialog :header="dialogConfig.header || ''" v-model:visible="dialogConfig.visible" modal class="mx-3 sm:mx-0 sm:w-full md:w-8 lg:w-6" contentClass="border-round-bottom border-top-1 surface-border p-0">
        <CreateTaskDialog :selected-task="selectedTask" @close="onCloseDialog()" @save="onSaveDialog"></CreateTaskDialog>
    </Dialog>
</template>
