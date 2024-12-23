<template>
    <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 container mx-auto">
        <div class="card bg-base-100 shadow-xl" v-for="i in 10" :key="i">
            <figure><img src="https://gifdb.com/images/high/one-piece-straw-hat-pirates-nhtzhnf3t4e2do10.gif" alt="One Piece" /></figure>
            <div class="card-body">
                <h2 class="card-title">One Piece</h2>
                <p>I will be the pirate king!!</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Purchase</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
  <script setup>
  
  </script>
  
  <style scoped>
  
  </style>