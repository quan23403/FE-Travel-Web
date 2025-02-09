<template>
  <v-img
    src="https://toongadventure.com/media_path/2022/20221130/TEWEaYYpXIIWIhn9VXzA7QcsfWwFKrbNZyINKF41.jpg"
    height="100vh"
    width="100%"
    cover
  >
    <div class="overlay"></div>
    <v-container class="d-flex align-center justify-center fill-height">
      <div class="w-100 w-md-50 text-center">
        <v-chip border="thin opacity-25" color="surface" variant="flat">
          <span class="hidden-sm-and-down">Announcing our</span>
          <span class="hidden-md-and-up">Our&nbsp;</span> next round of funding.
          Click
          <a
            class="d-inline-block mx-1 text-decoration-none text-primary"
            href="#"
            >here</a
          >
          to learn more.
        </v-chip>

        <h1 class="text-h4 text-md-h2 font-weight-bold my-6 text-white">
          Data to enrich your online business
        </h1>

        <div class="text-body-1 mb-10 text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
          ratione debitis quis est labore voluptatibus! Eaque cupiditate minima,
          at placeat totam!
        </div>

        <div class="d-flex ga-4 justify-center">
          <v-btn
            class="text-none"
            color="primary"
            flat
            rounded="lg"
            text="Get started"
          />

          <v-btn
            color="primary"
            append-icon="mdi-chevron-right"
            class="text-none"
            flat
            rounded="lg"
            text="Learn more"
          />
        </div>
      </div>

      <div class="v-bg position-absolute top-0 right-0 left-0 bottom-0">
        <div
          aria-hidden="true"
          class="overflow-hidden opacity-20 w-100 h-100"
        ></div>
      </div>
    </v-container>
  </v-img>
</template>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.v-bg {
  filter: blur(56px);
  pointer-events: none;
  z-index: 1;
}

.v-bg > div {
  background: linear-gradient(
    to bottom right,
    rgba(var(--v-theme-primary), 0.7),
    rgba(var(--v-theme-error), 0.7)
  );
  z-index: 1;
  clip-path: polygon(
    20% 50%,
    27% 66%,
    41% 66%,
    50% 50%,
    41% 34%,
    27% 34%,
    20% 50%,
    55% 50%,
    62% 66%,
    76% 66%,
    85% 50%,
    76% 34%,
    62% 34%,
    55% 50%,
    30% 50%,
    37% 66%,
    51% 66%,
    60% 50%,
    51% 34%,
    37% 34%,
    30% 50%
  );
}

.v-container {
  position: relative;
  z-index: 2;
}
</style>
