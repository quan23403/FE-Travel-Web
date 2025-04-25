// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VFileUpload } from 'vuetify/lib/labs/VFileUpload'
import { VFileUploadItem } from 'vuetify/lib/labs/VFileUpload'
import { VListItem } from 'vuetify/lib/components/index.mjs'
// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  components: {
    VDateInput,
    VFileUpload,
    VFileUploadItem,
    VListItem,
  },
})
