<template>
  <div class="p-5 bg-gray-100 min-h-screen max-h-max text-black">
    <h1 class="text-3xl mb-2 font-bold">Kelas Yang tersedia</h1>
    <br>
    <hr>
    <div class="flex flex-col mt-6">
      <h1 class="text-md sm:text-xl font-bold mb-4">Browse Dengan Kategori</h1>
      <div class="category_menu w-full ">
        <select
          class="select w-full max-w-xs"
          v-model="selected"
          @change="selectCategory(selected)"
        >
        <option value="all">Semua Kelas</option>
          <option v-for="categories in getCategories" :value="categories.id">
            {{ categories.name }}
          </option>
        </select>
      </div>
      <h1 class="text-md sm:text-xl font-bold my-4">List Course</h1>
        <div class="flex flex-col sm:flex-row gap-5">
          <class-sale-card
            v-for="kelas in smallList"
            :img="kelas.thumbnail_url"
            :title="kelas.name"
            :harga="kelas.harga"
            @click="
              router.push({
                path: `free-class/${kelas.id}`,
              })
            "
          />
        </div>
        <div class="btn-group flex flex-row justify-center mt-3" v-if="getKelasCategory.length > 5">
          <button class="btn btn-sm text-white btn-primary" @click="prevPage" :disabled="currentPage === 1">«</button>
          <button class="btn btn-sm btn-secondary">Page {{ currentPage }}</button>
        <button class="btn btn-sm text-white btn-primary" @click="nextPage" :disabled="maxPage">»</button>
</div>
    </div>
  </div>
</template>

<script setup>
import ClassSaleCard from "../../components/Card/ClassSaleCard.vue";
import { usePagination } from "../../composables/Pagination";
import { onMounted, computed, ref,   } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const store = useStore();

const selected = ref('all');

const kelasCategory = computed(() => {
  return store.state.kelasByCategory;
});

const getKelasCategory = computed(() => {
  return store.getters.getKelasByCategory;
});

const categories = computed(() => store.state.categories);
const getCategories = computed(() => store.getters.getCategories);

async function selectCategory() {
  await store.dispatch("GET_KELAS_BY_CATEGORY", selected.value);
}

const {pageSize, currentPage, smallList, maxPage, lastPageSize, nextPage, prevPage,listData,
} = usePagination({
  listData: computed(() => store.getters.getKelasByCategory),
})

onMounted(() => {
  store.dispatch("GET_KELAS_BY_CATEGORY", selected.value);
  store.dispatch("GET_CATEGORIES");
});




</script>

<style lang="scss" scoped></style>
