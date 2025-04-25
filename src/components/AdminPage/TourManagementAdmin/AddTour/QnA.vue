<template>
  <v-card-text>
    <v-btn @click="addFaq" color="primary">+ Thêm câu hỏi</v-btn>
    <div class="overflow-container">
      <v-row
        v-for="(item, index) in localFaqs"
        :key="index"
        class="mt-2"
        align="start"
      >
        <v-text-field
          v-model="item.question"
          :label="`Câu hỏi ${index + 1}`"
          required
        />
        <!-- Add a label for the Quill editor -->
        <v-col :cols="12">
          <quill-editor
            v-model:content="item.description"
            contentType="html"
            :options="editorOptions"
            :style="{ height: '200px' }"
          />
        </v-col>
        <v-col :cols="12" class="justify-center align-center">
          <v-btn @click="removeFaq(index)" variant="outlined" color="red"
            >Remove</v-btn
          >
        </v-col>
      </v-row>
    </div>
  </v-card-text>
</template>

<script setup>
import { ref, defineEmits, watch, defineProps } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const props = defineProps({
  faq: {
    type: Array,
    default: () => [], // Mảng mặc định nếu không có giá trị từ cha
  },
});
const emit = defineEmits(["update:faq"]);

const localFaqs = ref(props.faq);

const addFaq = () => {
  localFaqs.value.push({ question: "", answer: "" });
};

const removeFaq = (index) => {
  localFaqs.value.splice(index, 1);
};

watch(
  localFaqs,
  () => {
    emit("update:faq", localFaqs.value);
  },
  { deep: true }
);

const editorOptions = {
  theme: "snow",
  modules: {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      ["link"],
      [{ align: [] }],
      ["image"],
      ["blockquote", "code-block"],
    ],
  },
};
</script>

<style scoped>
.faq-item {
  margin-bottom: 1rem;
}

/* Container to hold the scrollable content */
.overflow-container {
  max-height: 60vh; /* Use 60% of the viewport height */
  overflow-y: auto; /* Enable vertical scrolling when content exceeds the container's height */
  padding-right: 16px; /* Optional: Adds a right padding to compensate for scrollbar width */
  box-sizing: border-box; /* To ensure padding doesn't cause overflow */
}

/* Ensure Quill Editor doesn't overflow */
.v-quill-editor {
  max-width: 100%;
  box-sizing: border-box;
}
</style>
