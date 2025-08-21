<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{
  text: string;
  importance: "primary" | "secondary" | "tertiary";
}>();
defineEmits(["click"]);

const disabld = ref<boolean>(false);
defineExpose({
  setDisabled: () => (disabld.value = true),
  setEnabled: () => (disabld.value = false),
});

//ボタンのimportanceによってカラーを変更する
const variant =
  props.importance === "primary"
    ? "elevated"
    : props.importance == "secondary"
    ? "outlined"
    : "tonal";
</script>

<template>
  <div>
    <v-btn
      @click="$emit('click')"
      :disabled="disabld"
      :text="$props.text"
      min-height="48"
      min-width="96"
      :variant="variant"
      :color="$props.importance"
      :base-color="props.importance"
    >
    </v-btn>
  </div>
</template>
