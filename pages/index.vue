<script setup>
import SbGrid from "/components/SbGrid.vue";
import CreateModal from "~/components/CreateModal.vue";
import UpdateModal from "~/components/UpdateModal.vue";

const gridId = "grid1";
const gridData = await $fetch("http://localhost:3001/rowItems");
const gridColumns = await $fetch("http://localhost:3001/colItems");
const gridAttributes = ref([
  {
    rowheight: "30",
    rowheader: "seq",
    selectmode: "free",
    saveorgdata: true,
  },
]);
const showCreateModal = ref(false);
const showUpdateModal = ref(false);

const createItem = async (item) => {
  try {
    await $fetch("http://localhost:3001/rowItems", {
      method: "post",
      body: item,
    });
    const gridObject = window._SBGrid.getGrid(gridId);
    gridObject.addRow(true, item, true);
    showCreateModal.value = false;
  } catch (err) {
    console.error(err);
  }
};

const updateItem = async (item) => {
  try {
    await $fetch(`http://localhost:3001/rowItems/${item.id}`, {
      method: "put",
      body: item,
    });
    const gridObject = window._SBGrid.getGrid(gridId);
    gridObject.setRowData(item.id, item);
    showUpdateModal.value = false;
  } catch (err) {
    console.error(err);
  }
};

const deleteItem = async () => {
  const gridObject = window._SBGrid.getGrid(gridId);
  const rowIdx = gridObject.getRow();
  await $fetch(`http://localhost:3001/rowItems/${rowIdx}`, {
    method: "delete",
  });
  gridObject.deleteRow(rowIdx);
};
</script>

<template>
  <div>
    <button class="btn" @click="showCreateModal = !showCreateModal">
      등록
    </button>
    <button class="btn" @click="showUpdateModal = !showUpdateModal">
      수정
    </button>
    <button class="btn" @click="deleteItem">삭제</button>
    <SbGrid
      :id="gridId"
      :parentId="gridId"
      :data="gridData"
      :columns="gridColumns"
      :gridattr="gridAttributes"
    />
    <CreateModal v-if="showCreateModal" @create="createItem" />
    <UpdateModal v-if="showUpdateModal" @update="updateItem" />
  </div>
</template>

<style>
.btn {
  margin: 0px 10px 10px 0px;
  padding: 10px 20px;
  color: #212d5d;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>
