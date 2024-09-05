<template>
  <div class="flex flex-col p-5 bg-gray-100 sm:h-auto text-black">
    <div class="video__player">
      <iframe class="w-full aspect-video" :src="`https://www.youtube.com/embed/${content.content.content}?controls=1`"
        allowfullscreen></iframe>
      <div class="materi__title">
        <h3 class="text-2xl font-bold first-letter:uppercase py-3">
          {{ content.content.name }}
        </h3>
      </div>

      <div class="dekripsi__materi font-normal text-base flex flex-col">
        <div class="dekripsi ">
          <div class="collapse">
            <input type="checkbox" class="peer" />
            <div class="collapse-title bg-primary ">
              <h3 class="font-bold text-white peer-checked:bg-secondary peer-checked:text-secondary-content">
                Click Show/Hide Deskripsi
              </h3>
            </div>
            <div class="collapse-content bg-white text-primary-content peer-checked:bg-white peer-checked:text-black">
              <div class="h-auto w-full my-3">
                <div class="" v-html="content.content.deskripsi_content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUpdated } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const router = useRouter();
const route = useRoute();
const store = useStore();

const content = computed(() => {
  return store.state.content;
});
const getContent = computed(() => {
  return store.getters.getContent;
});

onUpdated(() => {
  store.dispatch("GET_CONTENTS_BYID", route.params.id);
});
onMounted(() => {
  store.dispatch("GET_CONTENTS_BYID", route.params.id);
});
</script>


<style>
@tailwind base;

@layer base {
  h1 {
    @apply text-2xl;
  }

  h2 {
    @apply text-xl;
  }

  h3 {
    @apply text-lg;
  }

  a {
    @apply text-blue-600 underline;
  }

  ul {
    @apply list-disc list-inside;
  }

  ol {
    @apply list-decimal list-inside;
  }

}

@tailwind components;

@tailwind utilities;
</style>