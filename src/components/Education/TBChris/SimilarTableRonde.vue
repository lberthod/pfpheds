<template>
    <div class="similar-table-ronde">
      <div class="video-container">
        <iframe
          :src="videoUrl"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        ></iframe>
      </div>
      <div class="description">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
     
      <!-- Section Chat avec ChatGPT -->
      <div class="chat-section">
        <h3>Discuter avec ChatGPT</h3>
        <div class="chat-window" ref="chatWindow">
          <div
            v-for="(message, index) in conversation"
            :key="index"
            :class="message.sender"
          >
            <p>{{ message.text }}</p>
          </div>
          <div v-if="isLoading" class="loading">
            <p>ChatGPT est en train de répondre...</p>
          </div>
        </div>
        <form @submit.prevent="sendMessage" class="chat-form">
          <input
            v-model.trim="userInput"
            type="text"
            placeholder="Écrivez votre message..."
            required
            @keydown.enter.prevent
          />
          <button type="submit" :disabled="isLoading">Envoyer</button>
        </form>
        <div v-if="error" class="error">
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from "@/firebase"; 
  import { ref as dbRef, push, onChildAdded, set } from "firebase/database";
  import { ref, reactive, onMounted, onBeforeUnmount, watch } from "vue";
  
  const per = `
    tu es expert digital santé et tu discutes avec des étudiants 
    en soins infirmiers sur la techno. Répond de manière succincte, 
    claire et pédagogique. Ne dépasse pas trop.
  `;
  
  export default {
    name: "SimilarTableRonde",
    props: {
      videoUrl: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const userInput = ref("");
      const conversation = reactive([]);
      const isLoading = ref(false);
      const error = ref(null);
      const chatWindow = ref(null);
      let unsubscribeAnswer = null;
  
      const sendMessage = async () => {
        if (userInput.value.trim() === "") return;
  
        // Ajouter le message de l'utilisateur à la conversation
        conversation.push({ sender: "user", text: userInput.value });
  
        isLoading.value = true;
        error.value = null;
  
        try {
          // Référence "ask" dans Firebase
          const askMessagesRef = dbRef(db, "ask");
          const newMessageRef = push(askMessagesRef);
          const messageId = newMessageRef.key;
  
          // Définir les données du message
          await set(newMessageRef, {
            message: userInput.value,
            persona: per,
          });
  
          // Écouter la réponse dans "answer/messageId"
          const answerRefPath = `answer/${messageId}`;
          const answerRef = dbRef(db, answerRefPath);
  
          unsubscribeAnswer = onChildAdded(answerRef, (snapshot) => {
            const answerData = snapshot.val();
            if (answerData) {
              if (typeof answerData === 'string') {
                conversation.push({ sender: "bot", text: answerData });
              } else {
                console.warn("Réponse inattendue:", answerData);
                conversation.push({ sender: "bot", text: "Réponse invalide reçue." });
              }
              isLoading.value = false;
            } else {
              console.warn("Réponse vide reçue");
              isLoading.value = false;
            }
          });
        } catch (err) {
          console.error("Erreur lors de l'envoi du message:", err);
          conversation.push({
            sender: "bot",
            text: "Désolé, une erreur est survenue. Veuillez réessayer.",
          });
          error.value = "Impossible d'envoyer le message.";
          isLoading.value = false;
        }
  
        userInput.value = "";
      };
  
      const scrollToBottom = () => {
        if (chatWindow.value) {
          chatWindow.value.scrollTop = chatWindow.value.scrollHeight;
        }
      };
  
      watch(
        () => conversation.length,
        () => scrollToBottom()
      );
  
      onMounted(() => {
        scrollToBottom();
      });
  
      onBeforeUnmount(() => {
        if (unsubscribeAnswer) {
          unsubscribeAnswer();
        }
      });
  
      return {
        videoUrl: props.videoUrl,
        title: props.title,
        description: props.description,
        userInput,
        conversation,
        isLoading,
        sendMessage,
        chatWindow,
        error,
      };
    },
  };
  </script>
  
  <style scoped>
  .similar-table-ronde {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .video-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; 
    height: 0;
    border-radius: 8px;
    overflow: hidden;
  }
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .description {
    padding: 1rem;
    background-color: #f3f3f3;
    border-radius: 8px;
  }
  .description h2 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
  }
  .description p {
    margin: 0;
  }
  
  .chat-section {
    padding: 1rem;
    background-color: #fafafa;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  .chat-section h3 {
    margin-bottom: 1rem;
    color: #34495e;
  }
  
  .chat-window {
    max-height: 300px;
    overflow-y: auto;
    padding: 0.5rem;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .chat-window .user,
  .chat-window .bot {
    display: flex;
  }
  .chat-window .user {
    justify-content: flex-end;
  }
  .chat-window .user p {
    background-color: #d0e6f7;
    padding: 0.5rem 1rem;
    border-radius: 15px;
    max-width: 70%;
    word-wrap: break-word;
  }
  .chat-window .bot {
    justify-content: flex-start;
  }
  .chat-window .bot p {
    background-color: #ececec;
    padding: 0.5rem 1rem;
    border-radius: 15px;
    max-width: 70%;
    word-wrap: break-word;
  }
  
  .chat-form {
    display: flex;
    gap: 0.5rem;
  }
  .chat-form input {
    flex: 1;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .chat-form button {
    padding: 0.5rem 1rem;
    background-color: #2980b9;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .chat-form button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  .loading {
    text-align: center;
    color: #2980b9;
    font-style: italic;
  }
  .error {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: #ffe0e0;
    color: #d8000c;
    border: 1px solid #d8000c;
    border-radius: 4px;
  }
  </style>
  