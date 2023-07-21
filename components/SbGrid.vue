<script setup>
const { id, data, columns, gridattr } = defineProps([
  "id",
  "data",
  "columns",
  "gridattr",
]);

onMounted(() => {
  let SBGridProperties = {
    ...gridattr,
    parentid: id,
    id: id,
    jsonref: data,
    columns: columns,
    checkboximage: true,
  };

  window._SBGrid.create(SBGridProperties);
});
</script>

<template>
  <div :id="id"></div>
</template>

<style scoped></style>
