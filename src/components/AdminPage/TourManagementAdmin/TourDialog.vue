<template>
  <v-dialog :model-value="dialog" max-width="600px" @update:model-value="closeDialog">
    <v-card>
      <v-card-title>
        <span class="text-h6">{{ dialogTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="localTour.name"
            label="Tên Tour"
            :rules="[rules.required]"
            required
          ></v-text-field>
          <v-textarea
            v-model="localTour.description"
            label="Mô tả"
            :rules="[rules.required]"
          ></v-textarea>
          <v-text-field
            v-model="localTour.price"
            label="Giá"
            type="number"
            :rules="[rules.required, rules.positive]"
            required
          ></v-text-field>
          <v-text-field
            v-model="localTour.location"
            label="Địa điểm"
            :rules="[rules.required]"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="save" :disabled="!valid">
          Lưu
        </v-btn>
        <v-btn text color="error" @click="closeDialog">Hủy</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive, watch, toRefs, defineProps, defineEmits } from 'vue';

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
  tour: {
    type: Object,
    required: true,
  },
  dialogTitle: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:dialog', 'save', 'close']);

const { tour } = toRefs(props);

const valid = ref(false);
const localTour = reactive({ ...tour.value });

const rules = {
  required: (value) => !!value || "Trường này là bắt buộc.",
  positive: (value) => value > 0 || "Giá phải lớn hơn 0.",
};

watch(tour, (newValue) => {
  Object.assign(localTour, newValue);
}, { deep: true });

const save = () => {
  emit('save', { ...localTour });
};

const closeDialog = () => {
  emit('update:dialog', false);
  emit('close');
};
</script>