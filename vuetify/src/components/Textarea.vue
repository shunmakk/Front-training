<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  title: string;
  hint?: string;
  placeholder?: string;
  width: string | number;
}>();

const inputted = defineModel<string>("inputted", { required: true });
defineEmits(["update"]);

const disabled = ref<boolean>(false);

defineExpose({
  setDisabled: () => (disabled.value = true),
  setEnabled: () => (disabled.value = false),
});
</script>

<template>
  <div>
    <div class="text-h6">{{ $props.title }}</div>
    <div class="text-caption" v-if="$props.hint">{{ $props.hint }}</div>
    <v-textarea
      v-model:model-value="inputted"
      @update:model-value="$emit('update')"
      :disabled="disabled"
      :placeholder="$props.placeholder"
      :width="$props.width"
      density="compact"
      counter
      persistent-counter
      color="primary"
      base-color="tertiary"
    >
    </v-textarea>
  </div>
</template>
