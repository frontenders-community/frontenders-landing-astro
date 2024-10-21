<script setup>
import { onUnmounted } from 'vue';
import { nextTick } from 'vue';
import { onMounted } from 'vue';
import { ref, watch } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Seleziona opzioni'
  },
  modelValue: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectedOptions = ref(props.modelValue);
const multiSelectRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const toggleOption = (option) => {
  const index = selectedOptions.value.indexOf(option);
  if (index === -1) {
    selectedOptions.value.push(option);
  } else {
    selectedOptions.value.splice(index, 1);
  }
  emit('update:modelValue', selectedOptions.value);
};

const selectAll = () => {
  if (selectedOptions.value.length === props.options.length) {
    selectedOptions.value = [];
  } else {
    selectedOptions.value = [...props.options];
  }
  emit('update:modelValue', selectedOptions.value);
};

const closeDropdown = (event) => {
  if (multiSelectRef.value && !multiSelectRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

const handleGlobalClick = (event) => {
  nextTick(() => {
    closeDropdown(event);
  });
};

onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
});

watch(() => props.options, () => {
  selectedOptions.value = [];
}, { immediate: true });

watch(() => props.modelValue, (newValue) => {
  selectedOptions.value = newValue;
}, { deep: true });
</script>

<template>
  <div class="multiselect" ref="multiSelectRef">
    <div class="select-trigger" @click.stop="toggleDropdown">
      <span v-if="selectedOptions.length === 0">{{ placeholder }}</span>
      <span v-else>{{ selectedOptions.length }} selezionati</span>
      <span class="arrow" :class="{ 'is-open': isOpen }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16">
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </span>
    </div>
    <div v-show="isOpen" class="options-container">
      <label class="option" @click.stop>
        <input
          type="checkbox"
          :checked="selectedOptions.length === options.length"
          @change="selectAll"
        />
        Seleziona tutto
      </label>
      <label v-for="option in options" :key="option" class="option" @click.stop>
        <input
          type="checkbox"
          :value="option"
          :checked="selectedOptions.includes(option)"
          @change="toggleOption(option)"
        />
        {{ option }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.multiselect {
  position: relative;
  width: 200px;
}

.select-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: var(--white);
  color: var(--text);
  border: 1px solid var(--text);
  cursor: pointer;
  border-radius: 4px;
}

.options-container .option {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 10px;
}

.arrow svg {
  transition: transform 0.3s ease;
  transform-origin: center;
  display: inline-block;
}

.arrow.is-open svg {
  transform: scaleY(-1);
}

.options-container {
  position: absolute;
  top: calc(100% - 4px);
  left: 0;
  right: 0;
  background-color: var(--white);
  border: 1px solid var(--text);
  border-radius: 0 0 4px 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}


.option:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

input[type="checkbox"] {
  margin-right: 10px;
}
</style>