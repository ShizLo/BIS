<template>
  <section class="banner-wrapper">
    <v-container class="banner-block">
      <v-row class="text-center">
        <v-col cols="6 d-flex">
          <div class="banner__block-text text-left">
            <h1 class="banner__text">Инженерные коммуникации и благоустройство участка</h1>
            <button class="banner__button">
              Обсудить задачу
              <svg
                class="banner__button-icon"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame 1864">
                  <path
                    id="Vector"
                    d="M1.75 7.29163H12.25M12.25 7.29163L7 12.5416M12.25 7.29163L7 2.04163"
                    stroke="#102938"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </v-col>
        <v-col cols="6">
          <v-img :src="logo" class="my-3" contain height="200" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import logo from '../assets/logo.svg'

export default {
  name: 'HelloWorld',

  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader/tree/next',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify/tree/next',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    logo,
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Roadmap',
        href: 'https://vuetifyjs.com/introduction/roadmap/',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
}
</script>

<style>
.banner-wrapper {
  background-color: #f5f5f5;
}
.banner__block-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
}
.banner__text {
  font-weight: 700;
  line-height: 120%;
  font-size: 34px;
  color: #102938;
}
.banner__button {
  font: 600 16px / 125% 'Roboto Flex';
  display: flex;
  height: 48px;
  padding: 11px 14px;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid #102938;
  background: rgba(245, 245, 245, 0);
  color: #102938;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}
</style>
