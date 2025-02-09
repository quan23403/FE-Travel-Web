<template>
  <v-data-table
    :headers="headers"
    :items="tours"
    item-value="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-text-field
        v-model="search"
        label="Tìm kiếm"
        class="mx-4"
        clearable
      ></v-text-field>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="$emit('edit', item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="$emit('delete', item.id)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    tours: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Tên Tour", value: "name" },
        { text: "Mô tả", value: "description" },
        { text: "Giá", value: "price" },
        { text: "Địa điểm", value: "location" },
        { text: "Hành động", value: "actions", sortable: false },
      ],
    };
  },
};
</script>
