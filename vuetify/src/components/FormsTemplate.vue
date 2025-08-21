<script setup lang="ts">
import Button from "./Button.vue";

defineProps<{
  title: string;
  slotNames: string[];
  leftButton: {
    text: string;
    clickAction: () => void;
  };
  rightButton: {
    text: string;
    clickAction: () => void;
  };
}>();
</script>

<template>
  <div>
    <v-card class="pa-12" width="800">
      <div class="text-h4">{{ $props.title }}</div>
      <v-divider class="my-4" />
      <slot v-for="name in $props.slotNames" :key="name" :name="name" />
      <v-row class="mt-4">
        <Button
          @click="$props.leftButton.clickAction"
          :text="$props.leftButton.text"
          importance="secondary"
        ></Button>
        <v-spacer />
        <Button
          @click="$props.rightButton.clickAction"
          :text="$props.rightButton.text"
          importance="primary"
        ></Button>
      </v-row>
    </v-card>
  </div>
</template>
