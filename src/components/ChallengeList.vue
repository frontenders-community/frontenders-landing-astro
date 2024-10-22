<script setup>
import { computed, reactive } from "vue";
import ChallengePreview from "./ChallengePreview.vue";
import { LEVELS } from "../content/utils";
import TopicFilter from "./TopicFilter.vue";
import MultiSelect from "./MultiSelect.vue";

const props = defineProps({
  challenges: Array,
});

const state = reactive({
  activeTopics: [],
  activeLevels: [],
  isOffcanvasOpen: false,
});

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
      state.activeLevels.length === 0 || state.activeLevels.includes(challenge.data.level);

    return topicMatch && levelMatch;
  });
});

const handleTopicFilter = (selectedTopic) => {
  state.activeTopics = selectedTopic;
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
        <TopicFilter @updateTopics="handleTopicFilter" @clearTopics="clearFilters" />
      </div>
    </aside>

    <!-- Offcanvas per i filtri su mobile -->
    <div
      class="offcanvas is-hidden-tablet"
      :class="{ 'is-active': state.isOffcanvasOpen }"
    >
      <div class="offcanvas-background" @click="toggleOffcanvas"></div>
      <div class="offcanvas-content">
        <div>{{ activeChallenges.length }} challenge trovati</div>

        <TopicFilter
          @updateTopics="handleTopicFilter"
          @clearTopics="clearFilters"
        />
      </div>
    </div>

    <!-- Contenuto principale -->
    <main class="main-content">
      <section class="section  top-section">
        <div class="container has-text-centered">
          <p class="section-header-subtitle subtitle is-6 is-uppercase">
            le nostre challenge
          </p>
          <h2 class="section-header-title title is-1">Affila la tastiera</h2>

          <div
            class="levels is-flex is-flex-wrap-wrap is-justify-content-space-between is-align-items-center"
          >
            <div class="mb-2">{{ activeChallenges.length }} challenge trovati</div>

            <div class="is-flex is-align-items-center ml-auto">
              <div class="select-wrapper">
                <MultiSelect
                  :options="levels"
                  v-model="state.activeLevels"
                />
              </div>
              <!-- Pulsante per aprire l'offcanvas su mobile -->
              <button
                class="button is-primary is-hidden-tablet ml-2"
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
            <div v-if="activeChallenges.length === 0" class="mx-auto">
              <img class="nothing-found-image" :src="`/images/nothing-found.webp`" alt="Nessuna challenge trovata" />
              <p class="title is-4">Nessuna challenge trovata</p>
            </div>
            <div
              v-else
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

.challenges {
  margin-top: 40px;
}

.levels {
  margin: 20px 0 20px 0;
  flex-direction: row-reverse;
}

@media screen and (min-width: 426px) {
  .levels {
    flex-direction: row;
  }
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

.challenge-list-container {
  display: flex;
}

.nothing-found-image {
  width: 100%;
  max-width: 300px;
}

.sidebar {
  width: 250px;
  padding: 20px;
  background-color: #f5f5f5;
}

.main-content {
  flex: 1;
}

.main-content .section {
  min-height: 100vh;
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
  top: 100px;
}

@media screen and (max-width: 768px) {
  .challenge-list-container {
    flex-direction: column;
  }
}
</style>
