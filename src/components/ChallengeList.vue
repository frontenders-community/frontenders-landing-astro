<script setup>
import { computed, reactive } from 'vue';
import ChallengePreview from "./ChallengePreview.vue"
import { TOPICS, LEVELS } from '../content/utils';

const props = defineProps({
  challenges: Array,
})

const state = reactive({
  activeTopics: [],
  activeLevel: "",
})

const topics = TOPICS;
const levels = LEVELS;

const activeChallenges = computed(() => {
  if (props.challenges === null) {
    return [];
  }

  return props.challenges.filter(challenge => {
    const topicMatch = state.activeTopics.length === 0 || 
      challenge.data.topics.some(topic => state.activeTopics.includes(topic));
    
    const levelMatch = state.activeLevel === "" || 
      state.activeLevel === challenge.data.level;
    
    return topicMatch && levelMatch;
  });
})

const handleTopicFilter = (selectedTopic) => {
  if (state.activeTopics.includes(selectedTopic)) {
    state.activeTopics = state.activeTopics.filter(topic => topic !== selectedTopic);
  } else {
    state.activeTopics.push(selectedTopic);
  }
}

const handleLevelFilter = (selectedLevel) => {
  if (state.activeLevels.includes(selectedLevel)) {
    state.activeLevels = state.activeLevels.filter(level => level !== selectedLevel);
  } else {
    state.activeLevels.push(selectedLevel);
  }
}

const clearFilters = () => {
  state.activeTopics = [];
  state.activeLevels = [];
}
</script>

<template>
  <div>
    <section class="section has-text-centered">
      <div>
        <h2 class="section-header-title title is-3">
          Cerchi un argomento specifico?
        </h2>
        <div class="columns is-multiline is-flex is-align-items-center">
          <div class="column is-12">
            <div class="topics tags is-centered">
              <div
                v-for="topic in topics"
                :key="topic"
                class="topic tag is-large"
                :class="{ active: state.activeTopics.includes(topic) }"
                @click="handleTopicFilter(topic)"
              >
                {{ topic }}
              </div>
            </div>
            <div
              v-if="state.activeTopics.length > 0"
              class="clear tag is-large"
              @click="clearFilters"
            >
              Annulla tutti i filtri
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section alternative">
      <div class="container has-text-centered">
        <p class="section-header-subtitle subtitle is-6 is-uppercase">
          le nostre challenge
        </p>
        <h2 class="section-header-title title is-1">
          Affila la tastiera
        </h2>

        <div class="levels is-flex is-justify-content-space-between">
          <div>
            {{ activeChallenges.length }} challenge trovati
          </div>

          <div class="select-wrapper">
            <label for="level-select" class="sr-only">Seleziona il livello di difficoltà</label>
            <select 
              id="level-select"
              class="select is-primary is-rounded" 
              v-model="state.activeLevel"
              aria-label="Filtra per livello di difficoltà"
            >
              <option value="">Tutti i livelli</option>
              <option v-for="level in levels" :key="level" :value="level">{{ level }}</option>
            </select>
          </div>
        </div>
        <div class="challenges columns is-multiline">
          <div v-for="challenge in activeChallenges" :key="challenge.id"
            class="column is-12-mobile is-6-tablet is-4-desktop">
            <ChallengePreview :challenge="challenge" :url="`/challenges/${challenge.slug}/`" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.topics {
  margin: 20px 0 20px 0;
}

.topic, .topic:active {
  background-color: transparent;
  color: var(--text);
  font-weight: 400;
  border: 1px solid var(--text);
  cursor: pointer;
  transition: .3s;
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

.clear {
  background-color: red;
  color: var(--white);
  cursor: pointer;
}

.challenges {
  margin-top: 40px;
}

.levels {
  margin: 20px 0 20px 0;
}

.level, .level:active {
  background-color: transparent;
  color: var(--text);
  font-weight: 400;
  border: 1px solid var(--text);
  cursor: pointer;
  transition: .3s;
}

.level:hover {
  background-color: #333;
  border: 1px solid transparent;
  color: var(--white);
}

.level.active {
  background-color: var(--brand);
  color: var(--topic-text);
}

.select-wrapper {
  position: relative;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Assicurati che il select abbia un contrasto sufficiente */
.select.is-primary select {
  background-color: var(--brand);
  color: var(--white);
  border: 1px solid var(--brand);
}

.select.is-primary select:focus {
  outline: 2px solid var(--text);
  outline-offset: 2px;
}

/* Aggiungi uno stile per l'icona del select, se necessario */
.select.is-primary::after {
  border-color: var(--white);
}
</style>
