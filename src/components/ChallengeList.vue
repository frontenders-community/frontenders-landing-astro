<script setup>
import { computed, reactive } from 'vue';
import ChallengePreview from "./ChallengePreview.vue"

const props = defineProps({
  challenges: Array,
})

const state = reactive({
  activeTopic: "all",
})

const topics = ["HTML/CSS", "Javascript", "API", "DOM", "Framework"];

const activeChallenges = computed(() => {
  let newItems = [];

  if (props.challenges === null) {
    newItems = [];
  } else {
    if (state.activeTopic === "all") {
      newItems = props.challenges;
    } else {
      newItems = props.challenges.filter(challenge => {
        return challenge.data.topics.includes(state.activeTopic);
      });
    }
  }

  return newItems;
})

const handleFilter = (newTopic) => {
  state.activeTopic = newTopic;
  //updateQueryParams(newTopic);
}
</script>

<template>
  <div>
    <section class="section has-text-centered">
      <div>
        <h2 class="section-header-title title is-3">
          Cerchi un topic specifico?
        </h2>
        <div class="columns is-multiline is-flex is-align-items-center">
          <div class="column is-12">
            <div class="topics tags is-centered">
              <div class="topic tag is-large" :class="{ active: state.activeTopic === 'all' }" @click="handleFilter('all')">
                Tutti
              </div>
              <div
                v-if="topics"
                v-for="topic in topics"
                :key="topic"
                class="topic tag is-large"
                :class="{ active: state.activeTopic === topic }"
                @click="handleFilter(topic)"
              >
                {{ topic }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section alternative">
      <div class="container has-text-centered">
        <h6 class="section-header-subtitle subtitle is-6 is-uppercase">
          le nostre challenge
        </h6>
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
.challenges {
  margin-top: 40px;
}
.topics {
  margin: 20px 0 40px 0;
}

.topic {
  background-color: transparent;
  color: var(--text);
  font-weight: 400;
  border: 1px solid var(--text);
  cursor: pointer;
  transition: .3s;
}

.topic:hover {
  background-color: var(--text);
  border: 1px solid transparent;
  color: var(--white);
}

.active {
  background-color: var(--brand);
  border: 1px solid transparent;
  color: var(--topic-text);
}
</style>