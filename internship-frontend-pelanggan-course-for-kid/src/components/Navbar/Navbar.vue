<template>
  <nav class="bg-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <div class="lg:flex lg:items-center">
          <!-- Dropdown -->
          <div class="relative">
            <button
              @click="toggleDropdown"
              type="button"
              class="btn btn-ghost lg:hidden focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            <ul
              v-show="isDropdownOpen"
              class="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-md border border-b space-y-4"
            >
              <li>
                <a
                  @click="scrollToSection('tentang-kami')"
                  class="flex items-center px-4 py-2 text-gray-900 hover:bg-gray-200 hover:text-white"
                >
                  <span>Learn More</span>
                  <svg
                    class="h-4 w-4 ml-2 fill-current text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42z"
                    />
                  </svg>
                </a>
                <ul class="p-2 space-y-2 bg-white shadow-sm border border-b">
                  <li>
                    <a
                      @click="scrollToSection('tentang-kami')"
                      class="text-gray-900 hover:bg-gray-200 hover:text-white block px-4 py-2"
                    >Tentang Kami</a>
                  </li>
                  <li>
                    <a
                      @click="scrollToSection('contact')"
                      class="text-gray-900 hover:bg-gray-200 hover:text-white block px-4 py-2"
                    >Contact</a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  class="text-gray-900 hover:bg-gray-200 hover:text-white block px-4 py-2"
                >Materi Belajar</a>
              </li>
              <li>
                <button
                  @click="toLogin"
                  class="btn btn-primary w-full text-white"
                >Login</button>
              </li>
            </ul>
          </div>

          <!-- Brand -->
          <router-link to="/" class="text-xl font-bold"> {{ title }} </router-link>
        </div>

        <!-- Right-side buttons -->
        <div class="hidden lg:flex lg:items-center lg:space-x-4">
          <ul class="menu menu-horizontal p-0 z-20">
            <li>
              <a
                @click="scrollToSection('tentang-kami')"
                class="flex items-center px-4 py-2 text-gray-900 hover:bg-gray-200 hover:text-white"
              >
                <span>Tentang Kami</span>
                <svg
                  class="h-4 w-4 ml-2 fill-current text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42z"
                  />
                </svg>
              </a>
              <ul class="p-2 space-y-2 bg-white shadow-sm">
                <li>
                  <a
                    @click="scrollToSection('tentang-kami')"
                    class="text-gray-900 hover:bg-gray-200 hover:text-white block px-4 py-2"
                  >Tentang Kami</a>
                </li>
                <li>
                  <a
                    @click="scrollToSection('contact')"
                    class="text-gray-900 hover:bg-gray-200 hover:text-white block px-4 py-2"
                  >Contact</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                class="text-gray-900 hover:bg-gray-200 hover:text-white px-4 py-2"
              >Materi Belajar</a>
            </li>
          </ul>

          <button
            @click="toLogin"
            class="btn btn-primary text-white"
          >Login</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, ref } from "vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const title = computed(() => store.getters.getWebTitle);
const isDropdownOpen = ref(false);

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function toLogin() {
  router.push({
    name: "login",
  });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<style scoped>
/* Custom styles can be added here */
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-600;
}
</style>
