<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  title: string;
  hint?: string;
  choices: { label: string; value: string }[];
  width: string | number;
}>();

const selected = defineModel<string[]>("selected", { required: true });
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
    <v-checkbox
      v-model:model-value="selected"
      @update:model-value="$emit('update')"
      :disabled="disabled"
      v-for="choice in $props.choices"
      :key="choice.value"
      :label="choice.label"
      :value="choice.value"
      :width="$props.width"
      density="compact"
      hide-details="auto"
      color="primary"
      base-color="tertiary"
    ></v-checkbox>
  </div>
</template>
