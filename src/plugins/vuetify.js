import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
	theme: {
		dark: true,
    themes: {
      dark: {
        primary: '#19396A',
        secondary: '#304566',
        secondaryAlt: '#fff'
      }
    }
	},
})
