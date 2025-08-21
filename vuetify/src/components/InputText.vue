<script setup lang="ts">
import { ref } from "vue";

// コンポーネントのプロパティを規定
defineProps<{
  title: string;
  hint?: string;
  placeholder?: string;
  width: string | number;
}>();

//入力された文字列
//degineモデルを使用してリアクティブ変数を親コンポーネントから双方向バイディングできるように
const inputted = defineModel<string>("inputted", { required: true });

//親コンポーネントに通知するイベントを宣言
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
    <v-text-field
      v-model:model-value="inputted"
      @update:model-value="$emit('update')"
      :disabled="disabled"
      :placeholder="$props.placeholder"
      :width="$props.width"
      density="compact"
      hide-details="auto"
      color="primary"
      base-color="tertiary"
    >
    </v-text-field>
  </div>
</template>
