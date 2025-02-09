<template>
  <div class="travel-header">
    <!-- Title Section -->
    <v-container class="text-center py-8">
      <h1 class="text-h2 font-weight-bold primary--text">Thác K50</h1>
      <div class="text-h5 text-uppercase font-weight-medium mt-2">
        CẤP ĐỘ - MOUNTAIN HIKING
      </div>

      <v-row justify="center" class="mt-6">
        <v-col cols="12" md="8">
          <p class="text-body-1">
            Thác K50 nằm ở đầu nguồn sông Côn trong khu bảo tồn thiên nhiên Kon
            Chu Rẵng, được mệnh danh là nàng thơ giữa đại ngàn Tây Nguyên. Đây
            là cung hiking kỳ vĩ đi qua những con đường mòn giữa rừng, băng qua
            các con suối nhỏ và ghềnh đá.
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-carousel
        cycle
        height="500"
        hide-delimiter-background
        show-arrows-on-hover
        :interval="5000"
      >
        <v-carousel-item
          v-for="(image, i) in mainImages"
          :key="i"
          :src="image"
          cover
        >
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "TravelHeader",
  data() {
    return {
      mainImages: [
        "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
        "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
        "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
        "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
      ],
      thumbnailImages: [
        "/placeholder.svg?height=300&width=400&text=Thumbnail 1",
        "/placeholder.svg?height=300&width=400&text=Thumbnail 2",
        "/placeholder.svg?height=300&width=400&text=Thumbnail 3",
      ],
    };
  },
  methods: {
    showAllPhotos() {
      // Implement photo gallery view logic here
      console.log("Show all photos clicked");
    },
  },
};
</script>

<style scoped>
.travel-header {
  background-color: #f5f5f5;
}

.rounded-lg {
  border-radius: 8px;
}

.position-relative {
  position: relative;
}

.v-carousel {
  border-radius: 8px;
  overflow: hidden;
}
</style>
