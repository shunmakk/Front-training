<template>
  <!-- <HelloWorld /> -->
  <v-conatiner class="my-10">
    <v-row class="flex flex-column align-center">
      <h1>vuetify Input実装</h1>
      <!-- v-modelを使用して<InputText>とリアクティブ変数を双方向バインディング -->
      <InputText
        v-model:inputted="text"
        title="テキストフィールド"
        hint="1 行以内のテキストを入力する場合に使用します。"
        width="400"
        placeholder="テキストを入力"
      >
      </InputText>
      <div>入力値{{ text }}</div>
      <Textarea
        v-model:inputted="text2"
        title="テキストエリア"
        hint="1 行以上のテキストを入力する場合に使用します"
        width="400"
      >
      </Textarea>
      <div>入力値{{ text2 }}</div>
      <RadioButton
        v-model:selected="selected"
        title="ラジオボタン"
        hint="JavaScriptのフレームワーク・ライブラリを1つ選べ"
        :choices="choices"
        width="400"
      ></RadioButton>
      <div>難易度::{{ selected }}</div>
      <Checkbox
        v-model:selected="selectedCheckbox"
        title="チェックボックス"
        hint="選択肢の中から 1 つ以上選択する場合に使用します。"
        :choices="choicesCheckbox"
        width="400"
      ></Checkbox>
      <div>選択された値⇒{{ selectedCheckbox }}</div>
      <Button
        @click="clickAction"
        text="プライマリ"
        importance="primary"
        class="mx-2"
      >
      </Button>
      <div>カウントした回数{{ count }}</div>
      <!-- この下からテンプレート -->
      <FormsTemplate
        title="入力フォームテンプレート"
        :slot-names="['name', 'confirm']"
        :left-button="{
          text: '戻る',
          clickAction: () => {
            /* 何もしない */
          },
        }"
        :right-button="{
          text: '進む',
          clickAction: () => {
            /* 何もしない */
          },
        }"
      >
        <template #name>
          <InputText
            v-model:inputted="name"
            title="名前"
            width="400"
            class="my-4"
          ></InputText>
        </template>
        <template #confirm>
          <Checkbox
            v-model:selected="selected2"
            title="確認事項"
            :choices="choices2"
            width="400"
            class="my-4"
          ></Checkbox>
        </template>
      </FormsTemplate>
    </v-row>
  </v-conatiner>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import InputText from "@/components/InputText.vue";
import Textarea from "@/components/Textarea.vue";
import RadioButton from "@/components/RadioButton.vue";
import Checkbox from "@/components/Checkbox.vue";
import Button from "@/components/Button.vue";
import FormsTemplate from "@/components/FormsTemplate.vue";

const text = ref<string>("");
const text2 = ref<string>("");
const selected = ref<string>("");
const choices = [
  { label: "React", value: "普通" },
  { label: "Angular", value: "難しい" },
  { label: "JQuery", value: "簡単" },
];

const selectedCheckbox = ref<string[]>([]);
const choicesCheckbox = [
  { label: "プロパティの宣言", value: "defineProps" },
  { label: "双方向バインディングプロパティの宣言", value: "defineModel" },
  { label: "発行するイベントの宣言", value: "defineEmits" },
  { label: "明示的に公開するプロパティの宣言", value: "defineExpose" },
];

const count = ref<number>(0);
const clickAction = () => {
  count.value++;
};

const name = ref<string>("");
const selected2 = ref<string[]>([]);
const choices2 = [{ label: "確認しました", value: "checked" }];
</script>
