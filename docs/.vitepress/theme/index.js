// import DefaultTheme from 'vitepress/theme'
// import './style.css'

// export default DefaultTheme
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // Custom global logic? Add here
  }
}
