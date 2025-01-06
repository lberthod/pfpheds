<script setup>
import { ref, nextTick, onMounted } from 'vue';
import ChatBox from '@/views/apps/chat/ChatBox.vue'
import ChatSidebar from '@/views/apps/chat/ChatSidebar.vue';

const activeUserId = ref(1);
const users = ref([]);
const currentUser = ref({});

onMounted(async () => {
  users.value = await getUserData();
  currentUser.value = users.value.find(user => user.id === activeUserId.value);
  scrollToLastMessage();
});

const getUserData = async () => {
  const response = await fetch('/demo/data/chat.json');
  const { data } = await response.json();

  return data;
};

const changeActiveUser = (user) => {
  activeUserId.value = user.id;
  currentUser.value = user;
  scrollToLastMessage();
};

const sendMessage = (message) => {
  const activeUser = findActiveUser();
  activeUser.messages.push(message);
  scrollToLastMessage();
};

const findActiveUser = () => {
  return users.value.find((user) => user.id === activeUserId.value) || {};
};

const scrollToLastMessage = async () => {
  await nextTick(() => {
    const element = document.querySelector('.user-message-container');
    if (element) {
      element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
    }
  });
};
</script>

<template>
  <div class="grid">
    <div class="col-12 md:col-8 lg:col-12">
      <div class="flex flex-column md:flex-row gap-5">
        <div class="md:w-25rem card p-0">
          <ChatSidebar @change:active:user="changeActiveUser" :users="users"></ChatSidebar>
        </div>
        <div class="flex-1 card p-0">
          <ChatBox @send:message="sendMessage" :user="findActiveUser()"></ChatBox>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
