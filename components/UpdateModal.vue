<script setup>
let formData = ref({});

onMounted(() => {
  const gridObject = window._SBGrid.getGrid("grid1");
  const rowIdx = gridObject.getRow();
  formData.value = gridObject.getRowData(rowIdx);
});

const submitForm = () => {
  formData.meal = formData.meal ? "T" : "F";
  emit("update", formData.value);
  formData.value = {
    name: "",
    team: "",
    role: "",
    phoneNumber: "",
    age: "",
    birthDate: "",
    meal: false,
  };
};

const emit = defineEmits(["update"]);
</script>

<template>
  <div class="form-container">
    <label for="name">이름</label>
    <input type="text" id="name" v-model="formData.name" />

    <label for="team">소속</label>
    <select id="team" v-model="formData.team">
      <option value="FE팀">FE팀</option>
      <option value="BE팀">BE팀</option>
      <option value="DX팀">DX팀</option>
    </select>

    <label for="role">직급</label>
    <select id="role" v-model="formData.role">
      <option value="팀장">팀장</option>
      <option value="파트장">파트장</option>
      <option value="프로">프로</option>
    </select>

    <label for="phoneNumber">전화번호</label>
    <input type="tel" id="phoneNumber" v-model="formData.phoneNumber" />

    <label for="birthDate">생년월일</label>
    <input type="date" id="birthDate" v-model="formData.birthDate" />

    <label for="age">나이</label>
    <input type="number" id="age" v-model="formData.age" />

    <label for="meal">식대지급</label>
    <input type="checkbox" id="meal" v-model="formData.meal" />

    <button @click="submitForm">수정</button>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-container label {
  font-weight: bold;
  margin-bottom: 8px;
}

.form-container input[type="text"],
.form-container select,
.form-container input[type="tel"],
.form-container input[type="number"],
.form-container input[type="date"] {
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 3px;
  border: 1px solid #ccc;
}

.form-container button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #212d5d;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.form-container button:hover {
  background-color: #001f3f;
}
</style>
