<template>
  <h2 class="text-5x1 my-8 text-center">Create Product Type</h2>  

  <div class="form-container">

          <input type="text" placeholder="Name Type" v-model = "typename" typename="name">
          <input type="submit" value="Submit" @click="handleSubmit" >
          

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
</template>

<script setup>
import{onMounted, ref} from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

let typename = ref("");
let errorMessage = ref("");
let successMessage = ref("");

const route = useRoute();
const router = useRouter();
const currentPath = router.currentRoute.value.typename;
const _id = router.currentRoute.value.params?.productId;

const handleSubmit = async () => {
errorMessage.value = "";
successMessage.value = "";

console.log(typename.value);
let request = {
  typename: typename.value
};

if (typename.value.trim() === "") {
  errorMessage.value = "Please enter valid data.";
  return;
};
try {
  const response = await axios.post("http://localhost:4000/productType/create",request);
  console.log(response);
  successMessage.value = "Your purchase has been confirmed!";
} catch (error) {
  console.error(error);
  errorMessage.value = "Error! Task failed successfully.";
};
if(currentPath.includes("productTypeEdit")){
  const response = await axios.post(
    `http://localhost:4000/productType/update/${_id}`,
    request);
} else {
  const response = await axios.post(
    "http://localhost:4000/productType/create",
    request);
};
}
onMounted(async () => {
  if(currentPath.includes("productTypeEdit")) {
      const response = await axios.get(`http://localhost:4000/productTypes/${route.params.productId}`);
  if(response.status == 200) {

      const data = response.data;
      typename.value = data.typename;
  }}
})
</script>

<style>
.form-container {
          width: 900px;
          margin: 0 auto;
          padding: 20px;
          border: none;
          border-radius: 5px;
          background-color: rgb(13, 82, 80);
      }

      .form-container input[type="text"],
      .form-container input[type="email"],
      .form-container input[type="password"] {
          width: 100%;
          padding: 10px;
          border: none;
          margin-bottom: 10px;
          border-radius: 3px;
      }

      .form-container input[type="submit"] {
          width: 100%;
          margin: 2px;
          padding: 10px;
          background-color: #039dea;
          color: #fff;
          border: none;
          border-radius: 3px;
          cursor: pointer;
      }
      .form-container input[type="button"] {
          width: 100%;
          padding: 10px;
          background-color: #374987;
          color: #fff;
          border: none;
          border-radius: 3px;
          cursor: pointer;
      }

      /* Additional styling for the submit button on hover */
      .form-container input[type="submit"]:hover {
          background-color: #45a049;
      }
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
