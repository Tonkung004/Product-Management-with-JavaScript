<template>
  <div class="container mx-auto">
    <h1 style="text-align: center;">Product List</h1>
    <RouterLink to="/create" class="btn btn-info" style="float: right;">Create</RouterLink>
    <table class="table">
      <thead>
      <tr style="text-align: center;">
        <th Bgcolor="#1E90FF">Number</th>
        <th Bgcolor="#1E90FF">Name</th>
        <th Bgcolor="#1E90FF">Description</th>
        <th Bgcolor="#1E90FF">Price</th>
        <th Bgcolor="#1E90FF">Type</th>
        <th Bgcolor="#1E90FF">Action</th>
        <th Bgcolor="#1E90FF">Delete</th>
      </tr>
      <tr style="text-align: center;">
        <th Bgcolor="#E336E6">#</th>
        <th Bgcolor="#E336E6"><input v-model="name" @input="searchProducts" type="text" placeholder="Type here" class="input input-bordered input-error" /></th>
        <th Bgcolor="#E336E6"><input v-model="description" @input="searchProducts" type="text" placeholder="Type here" class="input input-bordered input-error" /></th>
        <th Bgcolor="#E336E6"><input v-model="price" @input="searchProducts" type="number" placeholder="Type here" class="input input-bordered input-error" /></th>
        <th Bgcolor="#E336E6"></th>
        <th Bgcolor="#E336E6"></th>
      </tr>
    </thead>
    <tbody v-for="(d, index) in data" :key="d._id">
      <tr style="text-align: center;">
        <td Bgcolor="orange">{{ index + 1 }}</td> 
        <td Bgcolor="orange">{{ d.name }}</td> 
        <td Bgcolor="orange">{{ d.description }}</td>
        <td Bgcolor="orange">{{ d.price }}</td>
        <td Bgcolor="orange">{{ d.type }}</td>
        <td Bgcolor="blue">
          <RouterLink :to="{ name: 'edit', params: { productId: d._id } }" class="btn btn-outline">Edit</RouterLink>
        </td>
        <td Bgcolor="#00FFFF">
          <label :key="d._id" :for="`modal-${index}`" class="btn btn-outline">Delete</label>
          <input :key="d._id" type="checkbox" :id="`modal-${index}`" class="modal-toggle" />
          <div class="modal" data-theme="aqua">
            <div class="modal-box">
              <h3 class="font-bold text-lg">Do you want to delete {{ d.name }}</h3>
              <div class="modal-action">
                <label :for="`modal-${index}`" class="btn" @click="deleteData(d._id)">Yes</label>
                <label :for="`modal-${index}`" class="btn" >No</label>
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
  //import req from 'express/lib/request';
  import { onMounted, ref } from 'vue';
  //import { RouterLink } from 'vue-router';
  let data = ref([]);
  let name = ref('')
  let description = ref('')
  let price = ref('')
  const deleteData = async (_id) => {
  try {
    await axios.post(`http://localhost:4000/product/delete/${_id}`);
    await fetchData(); // เมื่อลบข้อมูลสำเร็จ อัปเดตข้อมูลสินค้าใหม่
  }   catch (error) {
    console.error(error);
  }
}

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:4000/getproducts');
    data.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

  onMounted(async() => {
    await axios.get('http://localhost:4000/getproducts').then((respone) => {
      console.log(respone);
      data.value = respone.data;
    });
  });
  const searchProducts = async () => {
    const request = {
      name: {"$regex":`.*${name.value}.*`},
      description: {"$regex":`.*${description.value}.*`},
      // price: {"$regex":`.*parseIn(${price.value}).*`},
    }
    if(price.value){
      request.price = price.value;
    }
    await axios.post('http://localhost:4000/searchProducts', request).then((respone) => {
      data.value = respone.data;
    });
  }
  
</script>
  
<style>
  table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
  table.center {
  margin-left: auto;
  margin-right: auto;
}
</style>