<script setup>
import CustomTable from '../components/CustomTable.vue';
import Explanation from '../components/Explanation.vue';
</script>

<template>
  <main>
    <p>
    <ul>
      <li>Hover over a column header to see if it is sortable. Up/Down arrows will appear on sortable columns.</li>
      <li>Click a sortable column header to change the sort order from Ascending, to Descending, or None.</li>
      <li>To change column order, Drag-n-Drop a column header onto another header.</li>
      <li>To change which columns to display, Check/Uncheck the column(s) in the Display Selection.</li>
    </ul>
    </p>
    <CustomTable />
    <hr />
    <Explanation />
  </main>
</template>

<style lang="scss" scoped>
main {
  align-self: start;
}

p {
  position: relative;
  text-align: center;
}

ul {
  display: inline-block;
  margin: 1rem;
  padding: 1rem 1rem 1rem 3rem;
  text-align: left;
  border: 2px solid lightgreen;
  border-radius: 12px;
}

hr {
  margin: 3rem 1rem 1rem 0.5rem;
  height: 3px;
  background-image: linear-gradient(to right, rgba(9, 9, 255, .9), rgba(128, 0, 128, .9));
  border: none;
}
</style>
