<script setup>
import { computed } from 'vue';

const props = defineProps({
  challenge: Object,
  url: String,
})

const LevelMap = {
  'beginner': 1,
  'intermediate': 2,
  'advanced': 3,
  'pro': 4,
}

const level = computed(() => {
  return props.challenge.data.level.toLowerCase()
})
</script>

<template>
<div class="challenge-card card">
	<div class="card-image">
		<figure class="image is-4by3">
			<img
				loading="lazy"
				:src="`/challenges-cover/${challenge.data.previewImage}`"
				:alt="challenge.data.title"
			>
			<div class="difficulty-badge">
				<span class="difficulty-number" :class="level">
          {{ LevelMap[level] }}
        </span>
				<span class="difficulty-label" :class="level">
					{{ level }}
				</span>
			</div>
		</figure>
	</div>
	<div class="card-content">
		<div class="card-topics">
      <span class="topic" v-for="topic in challenge.data.topics">
        {{ topic }}
      </span>
		</div>

		<div class="content">
			{{ challenge.data.description }}
		</div>

		<a class="challenge-cta" :href="url">Scopri</a>
	</div>
</div>
</template>

<style scoped>
.challenge-card .card {
  text-align: left;
  cursor: pointer;
}
.challenge-card figure.image {
  position: relative;
  overflow: hidden;
}
.challenge-card figure.image > img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.challenge-card .image > .difficulty-badge {
  position: absolute;
  top: 15px;
  right: 10px;
  font-weight: 500;
  border-radius: 4px;
  text-transform: uppercase;
  border-radius: 4px;
  z-index: 2;
}
.challenge-card .card-topics {
  display: flex;
  flex-wrap: wrap;
  height: 50px;
}
.challenge-card .content {
	margin-top: 20px;
  height: 150px;
  text-align: left;
  color: var(--card-text);
  font-weight: 300;
  font-size: 1.2rem;
}
.challenge-cta {
  display: block;
  width: 100%;
  padding: 10px 0;
  background-color: var(--green);
  color: #303030;
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 4px;
}
</style>