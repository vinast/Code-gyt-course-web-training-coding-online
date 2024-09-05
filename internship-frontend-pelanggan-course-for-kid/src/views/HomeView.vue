<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
import HomeCard from "../components/Card/HomeCard.vue";
import ClassSaleCard from "../components/Card/ClassSaleCard.vue";

const store = useStore();

const kelas = computed(() => {
  return store.state.kelas;
});

const getKelas = computed(() => {
  return store.getters.getKelas;
});

onMounted(() => {
  store.dispatch("GET_KELAS");
});

const cards = [
  {
    no: 1,
    title: "Mengembangkan Keterampilan",
    deskripsi:
      "Anak-anak yang belajar koding dapat meningkatkan keterampilan logika dan matematika mereka secara signifikan. Ini membantu mereka mengembangkan kemampuan untuk memecahkan masalah secara sistematis dan kreatif.",
  },
  {
    no: 2,
    title: "Meningkatkan Kreativitas",
    deskripsi:
      "Koding mengajarkan anak-anak untuk berpikir kreatif dalam mencari solusi untuk setiap masalah yang mereka hadapi. Ini merangsang imajinasi mereka dan membantu mereka melihat masalah dari berbagai sudut pandang.",
  },
  {
    no: 3,
    title: "Membuat Apk dan Game",
    deskripsi:
      "Anak-anak memiliki kesempatan untuk mengembangkan aplikasi atau game sesuai dengan minat. Ini tidak hanya meningkatkan keterampilan teknis mereka tetapi juga membantu memahami proses pengembangan perangkat lunak.",
  },
  {
    no: 4,
    title: "Pembelajaran Kolaboratif",
    deskripsi:
      "Kelas koding juga memberikan pengalaman kolaboratif yang memungkinkan anak-anak untuk belajar. Ini mempromosikan keterampilan komunikasi dan kerjasama yang penting dalam lingkungan kerja.",
  },
];

const route = useRoute();
const router = useRouter();

function toRegister() {
  router.push({ name: "register" });
}

function toLogin() {
  router.push({ name: "login" });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Auto-slide functionality
const currentSlide = ref(1);
const totalSlides = 2; // Update this if you add more slides
let slideInterval;

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  clearInterval(slideInterval);
});

function startAutoSlide() {
  slideInterval = setInterval(changeSlide, 5000); // Change slide every 5 seconds
}

function changeSlide() {
  if (!isScrolling()) {
    currentSlide.value = (currentSlide.value % totalSlides) + 1;
    document
      .getElementById(`slide${currentSlide.value}`)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function isScrolling() {
  // Check if the user is currently scrolling manually
  return Date.now() - lastScrollTime < 1000; // Adjust this threshold as needed
}

// let lastScrollTime = 0;
// window.addEventListener("scroll", () => {
//   lastScrollTime = Date.now();
//   clearInterval(slideInterval);
//   setTimeout(startAutoSlide, 100); // Delay restart of auto slide to avoid interference
// });

</script>
<script>
export default {
  data() {
    return {
      menuOpen: false,
      submenuOpen: false,
      isAuthenticated: false, // Assuming you have a way to set this based on authentication status

      getKelas: [
        // Data kelas
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      this.submenuOpen = false; // Close the submenu when toggling the main menu
    },
    toggleSubmenu() {
      this.submenuOpen = !this.submenuOpen;
    },
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        this.menuOpen = false; // Close the menu after selecting an item
        this.submenuOpen = false; // Close the submenu after selecting an item
      }
    },
    toLogin() {
      // Your login logic here
    },

    navigateToClass(classId) {
      // Navigasi ke halaman detail kelas dengan menggunakan ID atau slug kelas
      window.location.href = `/kelas/${classId}`;
    },
  },
};
</script>

<template>
  <nav class="bg-white bg-opacity-80 backdrop-blur-sm shadow-md fixed w-full z-50">
    <div class="container mx-auto flex justify-between items-center p-2 h-12">
      <!-- Logo and Title -->
      <div class="flex items-center space-x-4">
        <router-link to="/" class="flex items-center">
          <img src="../assets/hero/logogyt.png" alt="Logo" class="h-8 w-8 mr-2" />
          <span class="btn btn-ghost normal-case text-xl font-bold text-gray-800">
            {{ title }}
          </span>
        </router-link>
      </div>

      <!-- Navbar Menu for larger screens -->
      <div class="hidden lg:flex lg:items-center lg:space-x-4 ml-auto">
        <ul class="menu menu-horizontal p-0">
          <li tabindex="0" class="relative group">
            <a @click="toggleSubmenu" class="flex items-center text-gray-700 hover:text-secondary cursor-pointer">
              More
              <svg class="fill-current ml-2 group-hover:rotate-180 transition-transform"
                xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul
              class="absolute left-0 mt-2 p-2 space-y-2 bg-white shadow-lg rounded-lg border border-gray-200 hidden group-hover:block"
              v-show="submenuOpen">
              <li
                class="text-base font-normal text-gray-700 hover:bg-secondary hover:text-white rounded-lg p-2 cursor-pointer"
                @click="scrollToSection('tentang-kami')">
                <a>Tentang Kami</a>
              </li>
              <li
                class="text-base font-normal text-gray-700 hover:bg-secondary hover:text-white rounded-lg p-2 cursor-pointer"
                @click="scrollToSection('contact')">
                <a>Contact</a>
              </li>
            </ul>
          </li>
          <li>
            <a v-if="isAuthenticated" class="text-base font-normal text-gray-700 hover:text-secondary rounded-lg p-2">
              Materi Belajar
            </a>
            <a v-else @click="toLogin" class="text-base font-normal text-gray-700 hover:text-secondary rounded-lg p-2">
              Materi Belajar
            </a>
          </li>
        </ul>
        <base-button design="secondary" size="sm" @click="toLogin" class="ml-4">Login</base-button>
      </div>

      <!-- Navbar Menu for mobile screens -->
      <div class="lg:hidden">
        <label tabindex="0" class="btn btn-ghost p-1" @click="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
      </div>
    </div>

    <!-- Dropdown Menu for mobile screens -->
    <div :class="{ 'hidden': !menuOpen, 'flex': menuOpen }"
      class="lg:hidden flex-col items-start p-4 bg-white shadow-lg border-t border-gray-200 w-full">
      <ul class="menu menu-vertical p-0 w-full">
        <li class="relative group w-full">
          <div @click="toggleSubmenu"
            class="flex items-center text-gray-700 hover:text-secondary w-full p-2 cursor-pointer">
            Learn More
            <svg class="fill-current ml-2 transition-transform" :class="{ 'rotate-180': submenuOpen }"
              xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </div>
          <ul v-show="submenuOpen" class="p-2 space-y-2 bg-white shadow-lg rounded-lg border border-gray-200 mt-2">
            <li
              class="text-base font-normal text-gray-700 hover:bg-secondary hover:text-white rounded-lg p-2 cursor-pointer"
              @click="scrollToSection('tentang-kami')">
              <a>Tentang Kami</a>
            </li>
            <li
              class="text-base font-normal text-gray-700 hover:bg-secondary hover:text-white rounded-lg p-2 cursor-pointer"
              @click="scrollToSection('contact')">
              <a>Contact</a>
            </li>
          </ul>
        </li>
        <li class="w-full">
          <a v-if="isAuthenticated" @click="scrollToSection('materi-belajar')"
            class="text-base font-normal text-gray-700 hover:text-secondary rounded-lg p-2 w-full cursor-pointer">
            Materi Belajar
          </a>
          <a v-else @click="toLogin"
            class="text-base font-normal text-gray-700 hover:text-secondary rounded-lg p-2 w-full cursor-pointer">
            Materi Belajar
          </a>
        </li>
        <li class="w-full">
          <base-button design="secondary" size="md" @click="toLogin" class="w-full">Login</base-button>
        </li>
      </ul>
    </div>
  </nav>



  <!-- No custom CSS needed, everything is styled using Tailwind classes -->


  <section class="h-full sm:h-96 bg-primary flex justify-center items-center">
    <div class="h-full sm:w-full bg-secondary flex justify-center items-center">
      <div class="carousel w-full max-w-screen-lg">
        <div id="slide1"
          class="carousel-item py-4 relative w-full flex flex-col sm:flex-row justify-center items-center">
          <div class="sm:w-1/2 w-full h-full flex justify-center items-center flex-col order-2">
            <h1 class="text-2xl sm:text-3xl text-center font-bold text-black">
              Bergabunglah dengan Program Kelas Kami Mulai Coding Sekarang,
              <br />untuk Semua Usia dan Tingkat Keahlian!
            </h1>
            <br>
            <base-button @click="toRegister" design="primary" size="lg"
              class="base-button inline-block text-center text-white rounded-full bg-gradient-to-r from-primary to-primary shadow-md hover:from-green-700 hover:to-green-900 transition duration-300 ease-in-out py-3 px-6 lg:py-4 lg:px-8">Daftar
              Sekarang</base-button>
          </div>
          <img src="../assets/hero/hero1.png" class="w-full sm:w-72 order-1 object-cover" />
          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" class="btn btn-outline btn-primary btn-circle -mx-3">❮</a>
            <a href="#slide2" class="btn btn-outline btn-primary btn-circle -mx-3">❯</a>
          </div>
        </div>

        <div id="slide2"
          class="carousel-item py-4 relative w-full flex flex-col sm:flex-row justify-center items-center">
          <div class="sm:w-1/2 w-full h-full flex justify-center items-center flex-col order-2">
            <h1 class="text-2xl sm:text-3xl text-center font-bold text-black">
              Temukan Dunia Koding Bersama Kami
            </h1>
            <br>
            <base-button @click="toRegister" design="primary" size="lg"
              class="base-button inline-block text-center text-white rounded-full bg-gradient-to-r from-primary to-primary shadow-md hover:from-green-700 hover:to-green-900 transition duration-300 ease-in-out py-3 px-6 lg:py-4 lg:px-8">Daftar
              Sekarang</base-button>
          </div>
          <img src="../assets/hero/hero3.png" class="w-80 lg:w-90 order-1" />
          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" class="btn btn-outline btn-primary btn-circle -mx-3">❮</a>
            <a href="#slide1" class="btn btn-outline btn-primary btn-circle -mx-3">❯</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="belajar-coding" class="bg-white min-h-screen">

    <br /><br /><br /><br />

    <div class="container mx-auto px-4">
      <h2 class="font-bold text-2xl sm:text-3xl text-primary mt-5 mb-4 sm:mb-8 text-center">
        Kenapa Harus Belajar Coding?
      </h2>
      <hr class="border-t-1 border-green-600 my-4" />
      <div class="flex flex-col sm:flex-row">
        <!-- Penggunaan 'grid' untuk layout card -->
        <home-card v-for="card in cards" :key="card.no" :no="card.no" :desk="card.deskripsi" :title="card.title"
          class="w-full sm:w-1/2 lg:w-1/3 p-2" />
      </div>
    </div>
  </section>

  <section id="rekomendasi-kelas" class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto px-4">
      <h2 class="font-bold text-3xl text-primary mt-5 mb-4 sm:mb-8 text-center">
        Rekomendasi Kelas
      </h2>
      <hr class="border-t-1 border-green-600 my-4" />
      <div class="flex flex-wrap justify-center text-black w-full">
        <class-sale-card v-for="kelas in getKelas" :key="kelas.id" :img="kelas.thumbnail_url" :title="kelas.name"
          :harga="kelas.harga" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-6"
          @click="navigateToClass(kelas.id)" />
      </div>
    </div>
  </section>

  <section id="tentang-kami" class="py-8 bg-white">
    <div class="container px-4 mx-auto flex flex-wrap items-center">
      <div class="w-full md:w-1/2">
        <img src="../assets/hero/logogyt.png" alt="Tentang Kami Image" class="w-full h-auto rounded-lg shadow-lg">
      </div>
      <div class="w-full md:w-1/2 md:pl-8 mt-8 md:mt-0">
        <div class="text-center md:text-left">
          <h2 class="font-bold text-3xl text-primary mb-4">
            Tentang Kami
          </h2>
          <hr class="border-t-1 border-green-600 my-4 mx-auto md:mx-0 w-1/2 md:w-full">
        </div>
        <div class="text-justify font-sans">
          <p class="text-base text-gray-700 leading-relaxed mb-6">
            &nbsp;&nbsp;&nbsp;"Di <b>Code GYT</b>, kami berdedikasi untuk menyiapkan generasi mendatang dengan
            keterampilan yang esensial dalam dunia digital yang terus berkembang. Sebagai pelopor dalam inovasi
            teknologi, kami berkomitmen untuk memperluas penguasaan coding di kalangan anak-anak. Kami meyakini bahwa
            dengan mempelajari coding, anak-anak tidak hanya memperoleh keterampilan teknis yang sangat berharga, tetapi
            juga mengembangkan kemampuan berpikir logis, kreativitas, serta keterampilan dalam memecahkan masalah.
          </p>
          <p class="text-base text-gray-700 leading-relaxed mb-6">
            &nbsp;&nbsp;&nbsp;Melalui pendekatan pembelajaran yang interaktif dan menyenangkan, kami berusaha untuk
            menumbuhkan rasa ingin tahu dan minat anak-anak terhadap teknologi. Program-program kami dirancang untuk
            memberikan dasar yang kuat dalam pemrograman, yang akan menjadi bekal mereka dalam menghadapi tantangan di
            masa depan. Kami percaya bahwa dengan memberikan akses ke pendidikan coding sejak dini, kami membuka pintu
            bagi anak-anak untuk menjadi inovator dan pemimpin di bidang teknologi.
          </p>
          <p class="text-base text-gray-700 leading-relaxed mb-6">
            &nbsp;&nbsp;&nbsp;Di Code GYT, kami tidak hanya mengajarkan kode, tetapi juga membangun fondasi bagi masa
            depan yang lebih cerah. Anak-anak yang belajar coding dengan kami akan mampu berpikir kritis, berkolaborasi
            dengan efektif, dan menciptakan solusi inovatif untuk masalah-masalah yang kompleks. Dengan demikian, kami
            membantu mereka untuk siap menghadapi dunia yang semakin terhubung dan berbasis teknologi. Dengan Code GYT,
            kami percaya bahwa masa depan adalah milik mereka yang siap menghadapi perubahan. Melalui pendidikan coding
            yang komprehensif dan berkelanjutan, kami membekali anak-anak dengan alat dan pengetahuan yang mereka
            butuhkan untuk sukses di dunia digital. Bersama-sama, kita menciptakan generasi yang tidak hanya mampu
            mengikuti perkembangan teknologi, tetapi juga memimpinnya."
          </p>
        </div>
      </div>




      <div class="flex flex-wrap -mx-4 mt-6">
        <div class="w-full md:w-1/2 px-4 mb-6">
          <div
            class="bg-white p-6 rounded-lg shadow-md text-primary border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <h3 class="font-semibold text-xl mb-2 text-primary flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M5 3a2 2 0 100 4 2 2 0 000-4zm7 4a2 2 0 100-4 2 2 0 000 4zm-4 2a2 2 0 110-4 2 2 0 010 4zm-1 2a2 2 0 012 2v4a2 2 0 11-4 0v-4a2 2 0 012-2zm5 0a2 2 0 012 2v4a2 2 0 11-4 0v-4a2 2 0 012-2zm4-3a2 2 0 11-4 0 2 2 0 014 0zM3 9a2 2 0 11-4 0 2 2 0 014 0z">
                </path>
              </svg>
              Kelas Berjenjang
            </h3>
            <p class="text-gray-700 leading-relaxed">
              Mulai dari dasar hingga mahir, kami menawarkan berbagai kelas yang
              sesuai dengan usia dan kebutuhan anak-anak.
            </p>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-4 mb-6">
          <div
            class="bg-white p-6 rounded-lg shadow-md text-primary border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <h3 class="font-semibold text-xl mb-2 text-primary flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M5 3a2 2 0 100 4 2 2 0 000-4zm7 4a2 2 0 100-4 2 2 0 000 4zm-4 2a2 2 0 110-4 2 2 0 010 4zm-1 2a2 2 0 012 2v4a2 2 0 11-4 0v-4a2 2 0 012-2zm5 0a2 2 0 012 2v4a2 2 0 11-4 0v-4a2 2 0 012-2zm4-3a2 2 0 11-4 0 2 2 0 014 0zM3 9a2 2 0 11-4 0 2 2 0 014 0z">
                </path>
              </svg>
              Pengajar Berpengalaman
            </h3>
            <p class="text-gray-700 leading-relaxed">
              Tim pengajar kami terdiri dari profesional di bidang teknologi yang
              berdedikasi untuk menginspirasi dan membimbing anak-anak.
            </p>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-4 mb-6">
          <div
            class="bg-white p-6 rounded-lg shadow-md text-primary border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <h3 class="font-semibold text-xl mb-2 text-primary flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M5 3a2 2 0 100 4 2 2 0 000-4zm7 4a2 2 0 100-4 2 2 0 000 4zm-4 2a2 2 0 110-4 2 2 0 010 4zm-1 2a2 2 0 012 2v4a2 2 0 11-4 0v-4a2 2 0 012-2zm5 0a2 2 0 012 2v4a2 2 0 11-4 0v-4a2 2 0 012-2zm4-3a2 2 0 11-4 0 2 2 0 014 0zM3 9a2 2 0 11-4 0 2 2 0 014 0z">
                </path>
              </svg>
              Proyek Kreatif
            </h3>
            <p class="text-gray-700 leading-relaxed">
              Kami menyediakan proyek-proyek menarik yang memungkinkan anak-anak
              untuk menerapkan apa yang mereka pelajari dalam pembuatan aplikasi
              dan game.
            </p>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-4 mb-6">
          <div
            class="bg-white p-6 rounded-lg shadow-md text-primary border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <h3 class="font-semibold text-xl mb-2 text-primary flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M5 3a2 2 0 100 4 2 2 0 000-4zm7 4a2 2 0 100-4 2 2 0 000 4zm-4 2a2 2 0 110-4 2 2 0 010 4zm-1 2a2 2 0 012 2v4a2 2 0 11-4 0v-4a2 2 0 012-2zm5 0a2 2 0 012 2v4a2 2 0 11-4 0v-4a2 2 0 012-2zm4-3a2 2 0 11-4 0 2 2 0 014 0zM3 9a2 2 0 11-4 0 2 2 0 014 0z">
                </path>
              </svg>
              Lingkungan Kolaboratif
            </h3>
            <p class="text-gray-700 leading-relaxed">
              Kami menciptakan lingkungan yang mendukung kolaborasi antara anak-anak,
              sehingga mereka dapat belajar bekerja sama dan mengembangkan keterampilan sosial mereka.
            </p>
          </div>
        </div>
      </div>
    </div>


    <br><br><br>

    <h2 class="font-bold text-xl text-primary mb-4 text-center">
      Our Gallery
    </h2>
    <!-- Galeri Perusahaan -->

    <div class="flex flex-wrap -mx-4 mt-6">
      <div class="w-full md:w-1/3 px-4 mb-6">
        <div
          class="rounded-lg shadow-md h-full overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <img src="https://asset-2.tstatic.net/tribunnews/foto/bank/images/hp-indonesia-hp-street-code.jpg"
            alt="Galeri Perusahaan" class="rounded-t-lg h-48 w-full object-cover" />
          <div class="p-4 bg-white rounded-b-lg">
            <p class="text-center text-gray-600 mt-2 font-semibold text-lg">
              Kelas Coding
            </p>
            <p class="text-center text-gray-500 text-sm italic">
              June 21, 2023
            </p>
            <a href="https://example.com/kelas-coding"
              class="block text-center text-blue-500 hover:text-blue-700 mt-2 flex justify-center items-center">
              <span class="mr-2">Read More</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3">
                </path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/3 px-4 mb-6">
        <div
          class="rounded-lg shadow-md h-full overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <img
            src="https://static.wixstatic.com/media/8b1ac8_45dabfe0b8894f638d09399c5e0b18d1~mv2.jpg/v1/fill/w_1000,h_667,al_c,q_85,usm_0.66_1.00_0.01/8b1ac8_45dabfe0b8894f638d09399c5e0b18d1~mv2.jpg"
            alt="Galeri Perusahaan" class="rounded-t-lg h-48 w-full object-cover" />
          <div class="p-4 bg-white rounded-b-lg">
            <p class="text-center text-gray-600 mt-2 font-semibold text-lg">
              Workshop Kreatif
            </p>
            <p class="text-center text-gray-500 text-sm italic">
              July 15, 2023
            </p>
            <a href="https://example.com/workshop-kreatif"
              class="block text-center text-blue-500 hover:text-blue-700 mt-2 flex justify-center items-center">
              <span class="mr-2">Read More</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3">
                </path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/3 px-4 mb-6">
        <div
          class="rounded-lg shadow-md h-full overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <img
            src="https://cdn1-production-images-kly.akamaized.net/jgwH7wIeOI5jy9HKqFlVubKnI10=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/831695/original/073877700_1426735477-microsoft.jpg"
            alt="Galeri Perusahaan" class="rounded-t-lg h-48 w-full object-cover" />
          <div class="p-4 bg-white rounded-b-lg">
            <p class="text-center text-gray-600 mt-2 font-semibold text-lg">
              Hackathon
            </p>
            <p class="text-center text-gray-500 text-sm italic">
              August 10, 2023
            </p>
            <a href="https://example.com/hackathon"
              class="block text-center text-blue-500 hover:text-blue-700 mt-2 flex justify-center items-center">
              <span class="mr-2">Read More</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3">
                </path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Akhir Galeri Perusahaan -->
    <div class="text-center mt-8">
      <a href="https://vinast.github.io/single.html"
        class="base-button inline-block text-center text-white rounded-full bg-gradient-to-r from-primary to-primary shadow-md hover:from-green-700 hover:to-green-900 transition duration-300 ease-in-out py-3 px-6 lg:py-4 lg:px-8">
        Explore More
      </a>
    </div>



  </section>

  <section id="contact" class="py-8 bg-gray-100">
    <div class="container mx-auto px-4 bg-gray rounded-lg shadow-lg p-6">
      <h2 class="font-bold text-3xl text-primary mb-4 text-center">Contact</h2>
      <hr class="border-t-1 border-green-600 my-4">
      <div class="text-base text-gray-700 text-center mb-6">
        <p>Anda Dapat Menghubungi Kami Melalui Data Dibawah ini</p>
      </div>
      <div class="flex flex-col md:flex-row justify-around">
        <div class="text-center mb-4 md:mb-0">
          <span class="block mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-6 h-6 inline text-primary">
              <path fill="#146154"
                d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
            </svg>
          </span>
          <span class="block font-bold text-primary">ALAMAT</span>
          <span class="block text-gray-500">Jl. Lowanu, RT.02/01 Kel. Sorosutan</span>
          <span class="block text-gray-500">Kec. Umbulharjo Yogyakarta, 55163</span>
        </div>

        <div class="text-center mb-4 md:mb-0">

          <span class="block mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-6 h-6 inline text-primary">
              <path fill="#146154"
                d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
          </span>
          <span class="block font-bold text-primary">TELEPON / WHATSAPP</span>
          <a href="https://wa.me/6285600418470?text=Halo%20Admin%20Code%20GYT"><span class="block text-gray-500">+62 882
              7870 8348</span></a>
        </div>

        <div class="text-center mb-4 md:mb-0">
          <span class="block mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 inline text-primary">
              <path fill="#146255"
                d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
            </svg>
          </span>
          <span class="block font-bold text-primary">EMAIL</span>
          <a href="mailto:codegyt@gmail.com"><span class="block text-gray-500">codegyt@gmail.com</span></a>
        </div>
        <div class="text-center">
          <span class="block mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 inline text-primary">
              <path fill="#146154"
                d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
            </svg>
          </span>
          <span class="block font-bold text-primary">WEBSITE</span>
          <a href="https://www.thecodeguy.co.uk/"><span class="block text-gray-500">codegyt.com</span></a>
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <div class="w-full lg:w-full lg:w-1/2">
          <h2 class="font-bold text-xl text-primary mb-4 text-center">Beri Masukkan</h2>
          <form class="bg-white rounded-lg shadow-lg p-6 w-200">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Your Name</label>
              <input
                class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name" type="text" placeholder="Your Name">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Your Email</label>
              <input
                class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email" type="email" placeholder="Your Email">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="message">Message</label>
              <textarea
                class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message" placeholder="Message"></textarea>
            </div>
            <div class="flex items-center justify-between">
              <button
                class="base-button inline-block text-center text-white rounded-full bg-gradient-to-r from-primary to-primary shadow-md hover:from-green-700 hover:to-green-900 transition duration-300 ease-in-out py-3 px-6 lg:py-4 lg:px-8"
                type="button">
                Kirim Masukkan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>



  <section>
    <footer class="bg-primary text-white shadow-md">
      <div class="container mx-auto px-4 py-6 flex flex-col lg:flex-row items-center justify-between">
        <div class="mb-4 lg:mb-0">
          <p class="text-lg font-bold">Stay Connected</p>
          <div class="flex mt-2">
            <a href="#" class="text-gray-200 hover:text-white hover:underline mr-4">
              <svg class="w-6 h-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.5 0h-15C1.675 0 0 1.675 0 3.75v12.5C0 18.325 1.675 20 3.75 20h6.25v-7.5H8.125V9.375H10V7.5H8.125c0-2.075 1.55-3.75 3.55-3.75 1 0 1.875.1 2.125.125v2.475h-1.45c-1.15 0-1.375.55-1.375 1.35v1.775h2.75l-.4 2.625h-2.35V20h4.6c2.075 0 3.75-1.675 3.75-3.75V3.75C20 1.675 18.325 0 16.25 0h1.25z" />
              </svg>
            </a>
            <a href="#" class="text-gray-200 hover:text-white hover:underline">
              <svg class="w-6 h-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.5 0h-15C1.675 0 0 1.675 0 3.75v12.5C0 18.325 1.675 20 3.75 20h12.5c2.075 0 3.75-1.675 3.75-3.75v-12.5C20 1.675 18.325 0 16.25 0zm-2.025 15h-7.45v-1.975h2.475v-1.4H8.025v-2.475h2.475v-1.4H8.025V6.25h2.475V4.275h-2.45C7.5 4.275 6.25 5.525 6.25 7v6.25H3.75c-.825 0-1.5-.675-1.5-1.5V3.75c0-.825.675-1.5 1.5-1.5h12.5c.825 0 1.5.675 1.5 1.5v12.5c0 .825-.675 1.5-1.5 1.5z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <p class="text-lg font-bold">Legal</p>
          <div class="flex mt-2">
            <a href="#" class="text-gray-200 hover:text-white hover:underline mr-4">Privacy Policy</a>
            <a href="#" class="text-gray-200 hover:text-white hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
      <div class="container mx-auto px-4 py-2">
        <p class="text-sm text-center">&copy; 2024 CodeGYT. All Rights Reserved.</p>
        <br>
      </div>
    </footer>
  </section>

</template>
