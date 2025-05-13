<template>
  <v-container>
    <!-- Tìm kiếm người dùng -->
    <v-text-field
      v-model="search"
      label="Tìm kiếm theo email"
      append-icon="mdi-magnify"
      single-line
      hide-details
      class="mb-4"
    />
    <!-- Button Thêm mới người dùng -->
    <v-btn @click="openDialog" color="primary" class="mb-4">
      <v-icon>mdi-plus</v-icon> Thêm người dùng
    </v-btn>
    <!-- Bảng thông tin người dùng -->
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="editUser(item)">mdi-pencil</v-icon>
        <v-icon @click="deleteUser(item.id)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <!-- Dialog thêm người dùng -->
    <v-dialog v-model="addDialog" max-width="500px">
      <v-card>
        <v-card-title>Thêm người dùng</v-card-title>
        <v-card-text>
          <v-form ref="addForm" v-model="valid" lazy-validation>
            <v-text-field
              v-model="user.userName"
              :rules="nameRules"
              label="Tên người dùng"
              required
            />
            <v-text-field
              v-model="user.email"
              :rules="emailRules"
              label="Email"
              required
            />
            <v-text-field v-model="user.phone" label="Số điện thoại" required />
            <v-select
              v-model="user.roles"
              :items="roles"
              label="Vai trò"
              chips
              multiple
              required
            />
            <v-text-field
              v-model="user.password"
              type="password"
              :rules="passwordRules"
              label="Mật khẩu"
              required
            />
            <v-text-field
              v-model="user.confirmPassword"
              type="password"
              :rules="confirmPasswordRules"
              label="Xác nhận mật khẩu"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeAddDialog" color="grey" text>Hủy</v-btn>
          <v-btn @click="saveUser" :disabled="!valid" color="blue">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog chỉnh sửa người dùng -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>Chỉnh sửa người dùng</v-card-title>
        <v-card-text>
          <v-form ref="editForm" v-model="valid" lazy-validation>
            <v-text-field
              v-model="editedUser.userName"
              :rules="nameRules"
              label="Tên người dùng"
              required
            />
            <v-text-field
              v-model="editedUser.phone"
              label="Số điện thoại"
              required
            />
            <v-select
              v-model="editedUser.roles"
              :items="roles"
              label="Vai trò"
              multiple
              chips
              required
            />
          </v-form>
          <p>{{ editedUser }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeEditDialog" color="grey" text>Hủy</v-btn>
          <v-btn @click="updateUserFunction" :disabled="!valid" color="blue"
            >Lưu</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { getAllUsers, updateUser, createUserByAdmin } from "@/api/api";
const search = ref("");
const valid = ref(false);
const addDialog = ref(false);
const editDialog = ref(false);
const roles = ["ADMIN", "USER", "TOUR_GUIDE", "EMPLOYEE"];
const user = reactive({
  id: null,
  userName: "",
  email: "",
  password: "",
  phone: "",
  roles: [],
  confirmPassword: "",
});

const editedUser = reactive({
  id: null,
  userName: "",
  phone: "",
  roles: [],
});

onMounted(() => {
  fetchUsers();
});
const users = ref([]);
const headers = [
  { title: "ID", key: "id", sortable: true },
  { title: "Tên", align: "start", key: "userName", sortable: true },
  { title: "Email", key: "email", sortable: true },
  { title: "Phone", key: "phone", sortable: false },
  { title: "Role", key: "roles", sortable: false },
  { title: "Hành động", key: "actions", align: "center", sortable: false },
];

const nameRules = [(v) => !!v || "Tên không được để trống"];
const emailRules = [
  (v) => !!v || "Email không được để trống",
  (v) => /.+@.+\..+/.test(v) || "Email không hợp lệ",
];

const passwordRules = [
  (v) => !!v || "Mật khẩu không được để trống",
  (v) => v.length >= 6 || "Mật khẩu phải có ít nhất 6 ký tự",
];

const confirmPasswordRules = [
  (v) => !!v || "Xác nhận mật khẩu không được để trống",
  (v) => v === user.password || "Mật khẩu xác nhận không khớp",
];

const fetchUsers = async () => {
  // Gọi API để lấy danh sách người dùng
  try {
    const response = await getAllUsers();
    users.value = response.data.data;
    console.log("users", users.value);
  } catch (err) {
    console.error("Error fetching users", err);
  }
};

const saveUser = async () => {
  try {
    const response = await createUserByAdmin({
        userName: user.userName,
        email: user.email,
        password: user.password,
        phone: user.phone,
        roles: user.roles,
    });
    users.value.push(response.data.data);
    closeAddDialog();
  } catch (err) {
    console.error("Error saving user", err);
  }
};
// const saveUser = async () => {
//   if (isEdit.value) {
//     try {
//       const response = await useApi().put(`/users/${user.id}`, user);
//       users.value = users.value.map(u => u.id === user.id ? response.data : u);
//       dialog.value = false;
//       clearUser();
//     } catch (err) {
//       console.error('Error saving user', err);
//     }
//   } else {
//     try {
//       const response = await useApi().post('/users', user);
//       users.value.push(response.data);
//       dialog.value = false;
//       clearUser();
//     } catch (err) {
//       console.error('Error saving user', err);
//     }
//   }
// };

const editUser = (item) => {
  console.log("item", item);
  editedUser.id = item.id;
  editedUser.userName = item.userName;
  editedUser.phone = item.phone;
  editedUser.roles = item.roles;
  editDialog.value = true;
};

const updateUserFunction = async () => {
  try {
    const response = await updateUser(editedUser.id, {
      userName: editedUser.userName,
      phone: editedUser.phone,
      roles: editedUser.roles,
    });
    console.log("response", response.data.data);
    users.value = users.value.map((u) =>
      u.id === editedUser.id ? response.data.data : u
    );
    editDialog.value = false;
  } catch (err) {
    console.error("Error updating user", err);
  }
};

// const deleteUser = async (id) => {
//   try {
//     await useApi().delete(`/users/${id}`);
//     users.value = users.value.filter(u => u.id !== id);
//   } catch (err) {
//     console.error('Error deleting user', err);
//   }
// };

const openDialog = () => {
  addDialog.value = true;
};

const closeAddDialog = () => {
  user.id = null;
  user.name = "";
  user.email = "";
  user.password = "";
  user.phone = "";
  user.roles = [];
  addDialog.value = false;
};

const closeEditDialog = () => {
  editedUser.id = null;
  editedUser.userName = "";
  editedUser.phone = "";
  editedUser.roles = [];
  editDialog.value = false;
};

// Lọc người dùng dựa trên tìm kiếm
// const filteredUsers = computed(() => {
//   return users.value.filter(user =>
//     user.name.toLowerCase().includes(search.value.toLowerCase()) ||
//     user.email.toLowerCase().includes(search.value.toLowerCase())
//   );
// });

watch(search, () => {
  // Có thể thêm xử lý lọc tùy chỉnh nếu cần
});
</script>

<style scoped></style>
