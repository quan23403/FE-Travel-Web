<template>
  <v-app-bar app color="white" prominent>
    <!-- Mobile Menu Icon -->
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      class="d-md-none"
    ></v-app-bar-nav-icon>

    <!-- Logo and Title -->
    <v-toolbar-title>
      <span class="font-weight-bold"
        >Travel <span class="text-primary">Tour</span></span
      >
    </v-toolbar-title>

    <!-- Spacer to push content to the right -->
    <v-spacer></v-spacer>

    <!-- Desktop Navigation Links (Hidden on Mobile) -->
    <v-row class="d-none d-md-flex">
      <v-btn text>Home</v-btn>
      <v-btn text>Pages</v-btn>
      <v-btn text>Tour List</v-btn>
      <v-btn text>Room List</v-btn>
      <v-btn text>Tour Search</v-btn>
      <v-btn text>Blog</v-btn>
    </v-row>

    <!-- Currency Selector and Login Button (Visible on All Screens) -->
    <v-select
      :items="currencies"
      label="Currency"
      outlined
      dense
      hide-details
      class="mx-2"
      style="max-width: 100px"
    ></v-select>
    <v-btn color="primary" outlined class="ml-2">Login</v-btn>
  </v-app-bar>



  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item link>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Pages</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Tour List</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Room List</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Tour Search</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Blog</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from "vue";

// const items = [
//   {
//     title: "Foo",
//     value: "foo",
//   },
//   {
//     title: "Bar",
//     value: "bar",
//   },
//   {
//     title: "Fizz",
//     value: "fizz",
//   },
//   {
//     title: "Buzz",
//     value: "buzz",
//   },
// ];

const drawer = ref(false);
const group = ref(null);

watch(group, () => {
  drawer.value = false;
});
</script>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: "Foo",
        value: "foo",
      },
      {
        title: "Bar",
        value: "bar",
      },
      {
        title: "Fizz",
        value: "fizz",
      },
      {
        title: "Buzz",
        value: "buzz",
      },
    ],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
