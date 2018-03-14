module.exports = {
  /*
  ** Headers of the page
  */
  dev: (process.env.NODE_ENV !== 'production'),
  head: {
    title: 'nuxt-test',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'http://finance.sina.com.cn/text/1007/2015-07-02/common.min.css'},
      {rel: "stylesheet", href: "https://unpkg.com/element-ui@2.0.11/lib/theme-chalk/index.css"}
    ]
  },
  css: [
    './assets/main.css'  // 翻页动画
  ],
  router: {
    // 在每页渲染前运行 middleware/user-agent.js 中间件的逻辑
    middleware: ["ssr-cookie"]
  },
  cache: true,
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    analyze: false,// 开启构建分析图
    vendor: ['~/plugins/element.js', 'axios'],
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [{src: '~/plugins/element.js', ssr: true}],
  transition: {
    name: 'page'
  }
};
