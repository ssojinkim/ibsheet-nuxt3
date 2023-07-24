// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      title: "SBGrid",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "SBGrid/css/SBGrid_Navy.css",
          type: "text/css",
        },
        {
          rel: "stylesheet",
          href: "SBGrid/css/SBGrid_Navy_Default.css",
          type: "text/css",
        },
      ],
      script: [
        {
          src: "SBGrid/SBGrid_Lib.js",
          type: "text/javascript",
        },
        {
          src: "SBGrid/SBGrid_min.js",
          type: "text/javascript",
        },
        {
          src: "SBGrid/js/lib/jquery-sbgrid.min.js",
          type: "text/javascript",
        },
      ],
    },
  },
  plugins: ["~/plugins/mirage"],
  devtools: { enabled: true },
});
