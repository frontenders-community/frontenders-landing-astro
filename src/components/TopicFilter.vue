<script setup>
import { reactive } from "vue";
import { TOPICS } from "../content/utils";

const topics = TOPICS;

const state = reactive({
  activeTopics: [],
});

const emit = defineEmits(["updateTopics", "clearTopics"]);

const handleTopicClick = (topic) => {
  console.log(topic);

  if (state.activeTopics.includes(topic)) {
    state.activeTopics = state.activeTopics.filter((t) => t !== topic);
  } else {
    state.activeTopics = [...state.activeTopics, topic];
  }
  emit("updateTopics", state.activeTopics);
};

const handleClearTopics = () => {
  state.activeTopics = [];
  emit("clearTopics");
};
</script>

<template>
  <h2 class="title is-4">Filtra per argomento</h2>
  <div class="topics tags ">
    <div
      v-for="topic in topics"
      :key="topic"
      class="topic tag is-medium mr-2"
      :class="{ active: state.activeTopics.includes(topic) }"
      @click="handleTopicClick(topic)"
    >
      {{ topic }}
    </div>
  </div>
  <button
    :disabled="state.activeTopics.length === 0"
    class="button is-danger is-fullwidth"
    @click="handleClearTopics"
  >
    Annulla tutti i filtri
  </button>
</template>

<style scoped>
.topics.is-vertical {
  flex-direction: column;
  align-items: stretch;
}

.topics.is-vertical .topic {
  margin-bottom: 10px;
}

.topics {
  margin: 20px 0 20px 0;
}

.topic,
.topic:active {
  background-color: transparent;
  color: var(--text);
  font-weight: 400;
  border: 1px solid var(--text);
  cursor: pointer;
  transition: 0.3s;
}

.topic:hover {
  background-color: #333;
  border: 1px solid transparent;
  color: var(--white);
}

.topic.active {
  background-color: var(--brand);
  color: var(--topic-text);
}
</style>
