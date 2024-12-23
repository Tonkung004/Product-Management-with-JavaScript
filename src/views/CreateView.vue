<template>
  <div class="container mx-auto flex flex-col items-center border-2 border-gray-400 p-4 " style="background-color: rgb(13, 82, 80); color: white;">
    <h2 class="text-5xl my-10">Create Product</h2>
    <div class="flex flex-col max-w-xs space-y-4" >
      <div class="flex flex-col max-w-xs space-y-4">Name<input type="text" placeholder="Name" v-model="name" style="width:400px;" class="input input-bordered fontcolor" /></div>

      <div class="mb-4">
        <img v-if="urlImagePreview" :src="urlImagePreview"/>
        <label for="image" class="block font-medium">Image:</label>
        <input @change="handleChangeImage($event)" type="file" class="file-input file-input-bordered w-full" id="image" ref="image" font style="color:black" />
      </div>

      <div class="flex flex-col max-w-xs space-y-4">Description<input type="text" placeholder="Description" v-model="description" style="width:400px;" class="input input-bordered fontcolor" /></div>

      <div class="inputBox">
        <label for="productType" class="block font-medium">Type</label>
        <select v-model="type" class="select select-bordered w-full" id="productType" font style="color:black">
          <option value="">โปรดเลือก</option>
          <option v-for="(d,index) in dataDropDown" :key="index" :value="d.typename">{{ d.typename }}</option>
        </select>
      </div>

      <div class="flex flex-col max-w-xs space-y-4">Price<input type="number" placeholder="Price" v-model="price" style="width:400px;" class="input input-bordered fontcolor" /></div>

      <div class="flex space-x-4">
        <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" style="background-color: blue; color: white;" @click="handleSubmit">Create</button>
        <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" style="background-color: rgb(193, 169, 64); color: white;"><a @click="$router.go(-1)">Back</a></button>
      </div>
      <div v-if="errorMessage" class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ errorMessage }}</span>
      </div>
      <div v-if="successMessage" class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ successMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

let name = ref("");
let description = ref("");
let price = ref("");

let dataDropDown = ref("[]");
let type = ref("");

let image = ref(null);
let urlImagePreview = ref(null);

let errorMessage = ref("");
let successMessage = ref("");

const route = useRoute();
const router = useRouter();
const currentPath = router.currentRoute.value.name;
const _id = router.currentRoute.value.params?.productId;

const handleChangeImage = (e) => {
  const file = e.target.files[0];
  urlImagePreview.value = URL.createObjectURL(file);
}

const handleSubmit = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (name.value.trim() === "" || !Number.isInteger(parseFloat(price.value)) || parseFloat(price.value) <= 0) {
    errorMessage.value = "Please enter valid data.";
    return;
  }

  if (!image.value) {
    errorMessage.value = "Please select an image.";
    return;
  }

  console.log(name.value, price.value, description.value, dataDropDown.$event);
  // let request = {
  //   name: name.value,
  //   price: price.value,
  //   description: description.value,
  //   dataDropDown: dataDropDown.value,
  //   type: type.value,
  //   image: image.value,
  //   urlImagePreview: urlImagePreview.value,
  // };
  // if(currentPath.includes("edit")) {
  //   const response = await axios.post(
  //     `http://localhost:5000/product/update/${_id}`,
  //     request);
  // } else{
  //   const response = await axios.post(
  //     "http://localhost:5000/product/create",
  //      request);
  // }
    const request = new FormData();
  request.append('file', image.value.files[0]);
  request.append('name', name.value);
  request.append('price', price.value);
  request.append('description', description.value);
  request.append('type', type.value);


  try {
        if (currentPath.includes("edit")) {
            const response = await axios.post(`http://localhost:4000/product/update/${_id}`, request);
            console.log(response);
            successMessage.value = "Your purchase has been confirmed!";
        } else {
            const response = await axios.post(`http://localhost:4000/product/create`, request);
            console.log(response);
            successMessage.value = "Your purchase has been confirmed!";
        }
    } catch (error) {
        console.error(error);
        errorMessage.value = "Error! Task failed successfully.";
    }
};

onMounted(async() => {
  // const route = useRoute();
  // const router = useRouter();
  if(currentPath.includes("edit")) {
    const response = await axios.get(`http://localhost:4000/getproduct/${route.params.productId}`);
  if(response.status == 200) {
    const data = response.data;
    name.value = data.name
    price.value = data.price
    description.value = data.description
    type.value = data.type
    }
  }
  await axios.get('http://localhost:4000/getProductTypes').then((respone) => {
        dataDropDown.value = respone.data;
      });
})

</script>

<style>
.fontcolor {
  color: rgb(0, 0, 0);
}
button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
.text-box {
  width: 400px;
  height: 200px;
  border: 1px solid #c9c9c9;
  padding: 10px;
}
</style>
