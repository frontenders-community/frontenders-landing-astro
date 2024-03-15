<script setup>
import { computed, reactive } from 'vue';
import ChallengePreview from "./ChallengePreview.vue"
import { TOPICS } from '../content/utils';

const props = defineProps({
  challenges: Array,
})

const state = reactive({
  activeTopics: [],
})

const topics = TOPICS;

const activeChallenges = computed(() => {
  let newItems = [];

  if (props.challenges === null) {
    newItems = [];
  } else {
    if (state.activeTopics.length === 0) {
      newItems = props.challenges;
    } else {
      newItems = props.challenges.filter(challenge => {
        return challenge.data.topics.filter(topic => state.activeTopics.includes(topic)).length > 0;
      });
    }
  }

  return newItems;
})

const handleFilter = (selectedTopic) => {
  if (state.activeTopics.includes(selectedTopic)) {
    state.activeTopics = state.activeTopics.filter(topic => topic !== selectedTopic);
  } else {
    state.activeTopics.push(selectedTopic);
  }
  //updateQueryParams(newTopic);
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
                v-if="topics"
                v-for="topic in topics"
                :key="topic"
                class="topic tag is-large"
                :class="{ active: state.activeTopics.includes(topic) }"
                @click="handleFilter(topic)"
              >
                {{ topic }}
              </div>
            </div>
            <div
              v-if="state.activeTopics.length > 0"
              class="clear tag is-large"
              @click="state.activeTopics = []"
            >
              Annulla
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
</style>