// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VFileUpload } from 'vuetify/lib/labs/VFileUpload'
import { VFileUploadItem } from 'vuetify/lib/labs/VFileUpload'
import { VList } from 'vuetify/lib/components'
import { VDataTableServer } from 'vuetify/lib/components'
import { VListItem } from 'vuetify/lib/components'
// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  components: {
    VDateInput,
    VFileUpload,
    VFileUploadItem,
    VList,
    VListItem,
    VDataTableServer
  },
})
