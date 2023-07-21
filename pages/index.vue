<script setup>
import SbGrid from "/components/SbGrid.vue";
import CreateModal from "~/components/CreateModal.vue";

const gridId = "grid1";
const gridData = ref([]);
const gridColumns = ref([
  {
    caption: ["이름"],
    type: "input",
    ref: "name",
    width: "100px",
    style: "text-align:center",
    typeinfo: { oneclickedit: true, hideeditesckey: true },
  },
  {
    caption: ["소속"],
    type: "combo",
    ref: "team",
    width: "100px",
    style: "text-align:center",
    typeinfo: {
      ref: [
        {
          label: "FE팀",
          value: "FE팀",
        },
        {
          label: "BE팀",
          value: "BE팀",
        },
        {
          label: "DX팀",
          value: "DX팀",
        },
      ],
      label: "label",
      value: "value",
      oneclickedit: true,
      displayui: true,
    },
  },
  {
    caption: ["직급"],
    type: "combo",
    ref: "role",
    width: "100px",
    style: "text-align:center",
    typeinfo: {
      ref: [
        {
          label: "팀장",
          value: "팀장",
        },
        {
          label: "파트장",
          value: "파트장",
        },
        {
          label: "프로",
          value: "프로",
        },
      ],
      label: "label",
      value: "value",
      oneclickedit: true,
      displayui: true,
    },
  },
  {
    caption: ["전화번호"],
    type: "input",
    ref: "phoneNumber",
    width: "150px",
    style: "text-align:center",
    typeinfo: {
      autofillinput: { type: "phone", filldata: true },
      oneclickedit: true,
      hideeditesckey: true,
    },
  },
  {
    caption: ["생년월일"],
    type: "datepicker",
    ref: "birthDate",
    width: "150px",
    style: "text-align:center",
    typeinfo: {
      dateformat: "yyyy-mm-dd",
      displayui: true,
      yearrange: 50,
      oneclickedit: true,
      hideeditesckey: true,
    },
  },
  {
    caption: ["나이"],
    type: "spinner",
    ref: "age",
    width: "50px",
    style: "text-align:center",
    typeinfo: { min: 1, oneclickedit: true, hideeditesckey: true },
  },
  {
    caption: ["식대지급"],
    type: "checkbox",
    ref: "meal",
    width: "80px",
    style: "text-align:center",
    typeinfo: {
      checkedvalue: "T",
      uncheckedvalue: "F",
      fixedcellcheckbox: {
        usemode: true,
        rowindex: 0,
        deletecaption: false,
      },
    },
  },
]);
const gridAttributes = ref([
  {
    rowheight: "30",
    rowheader: "seq",
    selectmode: "free",
    saveorgdata: true,
  },
]);

onMounted(() => {
  const gridObject = window._SBGrid.getGrid(gridId);
  console.log("gridObject", gridObject);
  getMembers(gridObject);
});

const getMembers = async (gridObject) => {
  try {
    const response = await fetch("/api/members");
    if (response.ok) {
      const { members } = await response.json();
      gridData.value = members;
      gridObject.addRows(gridData.value, true);
    } else {
      console.error(response);
    }
  } catch (err) {
    console.error(err);
  }
};

const createMembers = async (data) => {
  console.log("createdata", data);
  const gridObject = window._SBGrid.getGrid(gridId);
  const rowIdx = gridObject.getLastFocusRow();
  if (rowIdx === -1) {
    gridObject.addRow(true, data, true);
  } else {
    gridObject.setRowData(rowIdx, data);
  }
  try {
    await fetch("/api/members", { method: "POST", body: JSON.stringify(data) });
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <div>
    <SbGrid
      :id="gridId"
      :parentId="gridId"
      :data="gridData"
      :columns="gridColumns"
      :gridattr="gridAttributes"
    />
    <!--    <button @click="createMembers">등록</button>-->
    <CreateModal @create="createMembers" />
  </div>
</template>

<style></style>
