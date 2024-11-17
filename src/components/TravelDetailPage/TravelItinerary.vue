<template>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(day, index) in itinerary"
          :key="index"
        >
          <v-expansion-panel-title>
            Ngày {{ index + 1 }}: {{ day.title }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <ul>
              <li v-for="(activity, i) in day.activities" :key="i">
                <strong>{{ activity.time }}</strong>: {{ activity.description }}
              </li>
            </ul>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
  </template>
  
  <script>
  export default {
    data() {
      return {
        itinerary: [
          {
            title: "Khởi hành đến Đà Lạt",
            activities: [
              { time: "08:00 AM", description: "Tập trung tại điểm hẹn, khởi hành đi Đà Lạt." },
              { time: "12:00 PM", description: "Dừng chân ăn trưa tại trạm nghỉ." },
              { time: "05:00 PM", description: "Đến khách sạn, nhận phòng và nghỉ ngơi." },
            ],
          },
          {
            title: "Tham quan Đà Lạt",
            activities: [
              { time: "07:00 AM", description: "Ăn sáng tại khách sạn." },
              { time: "08:30 AM", description: "Tham quan Thung Lũng Tình Yêu." },
              { time: "12:00 PM", description: "Ăn trưa tại nhà hàng địa phương." },
              { time: "03:00 PM", description: "Khám phá đồi chè Cầu Đất." },
              { time: "06:00 PM", description: "Dùng bữa tối và tự do khám phá chợ đêm Đà Lạt." },
            ],
          },
          {
            title: "Kết thúc chuyến đi",
            activities: [
              { time: "07:00 AM", description: "Ăn sáng tại khách sạn, trả phòng." },
              { time: "08:00 AM", description: "Khởi hành về lại điểm xuất phát." },
              { time: "12:00 PM", description: "Dừng chân nghỉ ngơi và ăn trưa." },
              { time: "05:00 PM", description: "Kết thúc hành trình, tạm biệt đoàn." },
            ],
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Tuỳ chỉnh CSS nếu cần */
  </style>
  