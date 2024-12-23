<template>
  <div class="overflow-x-auto">
      <h2 style="text-align: center;font-size: 20px;">Product Type</h2><br>
      <RouterLink to="/productType/create" class="btn btn-info" style="float: right;">Create</RouterLink>  
      <table class="table">
          <thead>
              <tr style="text-align: center;" Bgcolor="#1E90FF">
                  <th>No.</th>
                  <th>TypeName</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody v-for="(d, index) in data" :key="d._id">
              <tr class="hover" style="text-align: center;">
                  <td >{{ index + 1 }}</td>
                  <td>{{ d.typename }}</td>
                  <td>
                    <RouterLink :to="{ name: 'productTypeEdit', params: { productId: d._id } }" class="btn btn-outline w-full">Edit</RouterLink>
                  </td>
                  <td>
                        <label :key="d._id" :for="`modal-${index}`" class="btn btn-outline w-full">Delete</label>
                        <input :key="d._id" type="checkbox" :id="`modal-${index}`" class="modal-toggle" />
                        <div class="modal" data-theme="dark">
                            <div class="modal-box">
                                <h3 class="font-bold text-lg">Do you want to delete {{ d.type }}</h3>
                                <div class="modal-action">
                                    <label :for="`modal-${index}`" class="btn" @click="deleteData(d._id)">Yes</label>
                                    <label :for="`modal-${index}`" class="btn">No</label>
                                </div>
                            </div>
                        </div>
                    </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>
  
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
let data = ref([]);

const deleteData = async (_id) => {
  await axios.delete(`http://localhost:4000/productType/delete/${_id}`);
  fetchData();
}

const fetchData = async () => {
  await axios.get('http://localhost:4000/getproductTypes').then((response) => {
      data.value = response.data;
  });
}

onMounted(async () => {
  fetchData();
});
</script>

<style></style>
  