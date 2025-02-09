<template>
  <HeroSection />
  <FeaturedDestinations />
  <AboutUs />
  <Testimonials />
</template>

<script>
// import Test from './components/Test.vue'
import HeroSection from '@/components/HeroSection.vue';
import FeaturedDestinations from '@/components/FeaturedDestinations.vue'
import AboutUs from '@/components/AboutUs.vue'
import Testimonials from '@/components/Testimonials.vue'
export default {
  name: 'HomePageView',
  components: {
    HeroSection,
    FeaturedDestinations,
    AboutUs,
    Testimonials,
  },

  data: () => ({
  }),
}
</script>
