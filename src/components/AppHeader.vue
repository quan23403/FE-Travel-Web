<template>
    <v-navigation-drawer
      v-model="drawer"
      color="primary"
      disable-resize-watcher
    >
      <v-list nav>
        <v-list-item v-for="item in items" :key="item" link :title="item" />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="white" flat>
      <template #prepend>
        <v-app-bar-nav-icon
          v-if="$vuetify.display.smAndDown"
          @click="drawer = !drawer"
        />
      </template>

      <div class="d-flex flex-1-1-0 ps-md-4">
        <v-avatar image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png" />
      </div>

      <div class="d-md-flex d-none ga-4 mx-auto">
        <v-btn
          v-for="item in items"
          :key="item"
          class="text-none"
          :text="item"
        />
      </div>

      <div class="d-flex flex-1-1-0 pe-3">
        <v-btn
          append-icon="mdi-chevron-right"
          class="ms-auto text-none"
          slim
          text="Login"
        />
      </div>
    </v-app-bar>

</template>

<script setup>
import { shallowRef } from "vue";

const drawer = shallowRef(false);

const items = ["Products", "Services", "About", "Contact"];
</script>

