<script setup>
import { computed, reactive } from "vue";
import ChallengePreview from "./ChallengePreview.vue";
import { TOPICS, LEVELS } from "../content/utils";

const props = defineProps({
  challenges: Array,
});

const state = reactive({
  activeTopics: [],
  activeLevel: "",
  isOffcanvasOpen: false,
});

const topics = TOPICS;
const levels = LEVELS;

const activeChallenges = computed(() => {
  if (props.challenges === null) {
    return [];
  }

  return props.challenges.filter((challenge) => {
    const topicMatch =
      state.activeTopics.length === 0 ||
      challenge.data.topics.some((topic) => state.activeTopics.includes(topic));

    const levelMatch =
      state.activeLevel === "" || state.activeLevel === challenge.data.level;

    return topicMatch && levelMatch;
  });
});

const handleTopicFilter = (selectedTopic) => {
  if (state.activeTopics.includes(selectedTopic)) {
    state.activeTopics = state.activeTopics.filter(
      (topic) => topic !== selectedTopic
    );
  } else {
    state.activeTopics.push(selectedTopic);
  }
};

const clearFilters = () => {
  state.activeTopics = [];
  state.activeLevels = [];
};

const toggleOffcanvas = () => {
  state.isOffcanvasOpen = !state.isOffcanvasOpen;
};
</script>

<template>
  <div class="challenge-list-container">
    <!-- Sidebar per i filtri su desktop -->
    <aside class="sidebar is-hidden-mobile has-background-white">
      <div class="inner">
        <h2 class="title is-4">Filtra per argomento</h2>
        <div class="topics tags is-vertical">
          <div
            v-for="topic in topics"
            :key="topic"
            class="topic tag is-small mr-2"
            :class="{ active: state.activeTopics.includes(topic) }"
            @click="handleTopicFilter(topic)"
          >
            {{ topic }}
          </div>
        </div>
        <button
          :disabled="state.activeTopics.length === 0"
          class="button is-danger is-fullwidth"
          @click="clearFilters"
        >
          Annulla tutti i filtri
        </button>
      </div>
    </aside>

    <!-- Offcanvas per i filtri su mobile -->
    <div
      class="offcanvas is-hidden-tablet"
      :class="{ 'is-active': state.isOffcanvasOpen }"
    >
      <div class="offcanvas-background" @click="toggleOffcanvas"></div>
      <div class="offcanvas-content">
        <h2 class="title is-4">Filtra per argomento</h2>
        <div class="topics tags is-vertical">
          <div
            v-for="topic in topics"
            :key="topic"
            class="topic tag mr-2"
            :class="{ active: state.activeTopics.includes(topic) }"
            @click="handleTopicFilter(topic)"
          >
            {{ topic }}
          </div>
        </div>
        <button 
          class="button is-danger is-fullwidth"
          @click="clearFilters"
          :disabled="state.activeTopics.length === 0"
        >
          Annulla tutti i filtri
        </button>
      </div>
    </div>

    <!-- Contenuto principale -->
    <main class="main-content">
      <section class="section">
        <div class="container has-text-centered">
          <p class="section-header-subtitle subtitle is-6 is-uppercase">
            le nostre challenge
          </p>
          <h2 class="section-header-title title is-1">Affila la tastiera</h2>

          <div
            class="levels is-flex is-justify-content-space-between is-align-items-center"
          >
            <div>{{ activeChallenges.length }} challenge trovati</div>

            <div class="is-flex is-align-items-center">
              <div class="select-wrapper">
                <label for="level-select" class="sr-only"
                  >Seleziona il livello di difficoltà</label
                >
                <select
                  id="level-select"
                  class="select is-primary is-rounded"
                  v-model="state.activeLevel"
                  aria-label="Filtra per livello di difficoltà"
                >
                  <option value="">Tutti i livelli</option>
                  <option v-for="level in levels" :key="level" :value="level">
                    {{ level }}
                  </option>
                </select>
              </div>
              <!-- Pulsante per aprire l'offcanvas su mobile -->
              <button
                class="button is-primary is-hidden-tablet is-small ml-2"
                @click="toggleOffcanvas"
                aria-label="Filtra per argomento"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="16"
                  height="16"
                >
                  <path
                    d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="challenges columns is-multiline">
            <div
              v-for="challenge in activeChallenges"
              :key="challenge.id"
              class="column is-12-mobile is-6-tablet is-4-desktop"
            >
              <ChallengePreview
                :challenge="challenge"
                :url="`/challenges/${challenge.slug}/`"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
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

.level,
.level:active {
  background-color: transparent;
  color: var(--text);
  font-weight: 400;
  border: 1px solid var(--text);
  cursor: pointer;
  transition: 0.3s;
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

.challenge-list-container {
  display: flex;
}

.sidebar {
  width: 250px;
  padding: 20px;
  background-color: #f5f5f5;
}

.main-content {
  flex: 1;
}

.topics.is-vertical {
  flex-direction: column;
  align-items: stretch;
}

.topics.is-vertical .topic {
  margin-bottom: 10px;
}

.offcanvas {
  height: 100vh;
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100%;
  background-color: #fff;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
}

.offcanvas.is-active {
  left: 0;
}

.offcanvas.is-active .offcanvas-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.offcanvas-content {
  height: 100%;
  position: relative;
  padding: 20px;
  z-index: 1000;
  background-color: var(--white);
}

.sidebar .inner {
  position: sticky;
  top: 0;
}

@media screen and (max-width: 768px) {
  .challenge-list-container {
    flex-direction: column;
  }
}
</style>
