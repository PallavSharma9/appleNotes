<template>
  <div class="flex bg-zinc-900 h-screen">
    <!-- sidebar  -->
    <div class="bg-black w-[320px] p-8 flex flex-col">
      <div>
        <Logo />
      </div>
      <!-- today main cotainer  -->
      <div>
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Today</p>
        <div class="ml-2 space-y-2">
          <div class="p-2 rounded-lg cursor-pointer">
            <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
              Finally moved in my..
            </h3>
            <div class="leading-none truncate text-[#D6D6D6]">
              <span class="text-xs text-[#F4F4F5] mr-4">Today</span>
              <span class="text-xs text-[#d6d6d6]">Tiny house today..</span>
            </div>
          </div>
        </div>
      </div>
      <!-- /today main container  -->

      <!-- yesterday main cotainer  -->
      <div>
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Yesterday</p>
        <div class="ml-2 space-y-2">
          <div class="p-2 rounded-lg cursor-pointer">
            <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
              Finally moved in my..
            </h3>
            <div class="leading-none truncate text-[#D6D6D6]">
              <span class="text-xs text-[#F4F4F5] mr-4">Today</span>
              <span class="text-xs text-[#d6d6d6]">Tiny house today..</span>
            </div>
          </div>
        </div>
      </div>
      <!-- /yesterday main container  -->
    </div>
    <!-- /sidebar  -->

    <!-- note container  -->
    <div class="w-full flex flex-col">
      <div class="flex justify-between w-full items-start p-8">
        <button
          class="inline-flex items-center text-xs text-[#c2c2c5] hover:text-white font-bold space-x-2"
        >
          <PencilIcon />
          <span>Create Note</span>
        </button>
        <button>
          <TrashIcon class="text-[#6d6d73] hover:text-white" />
        </button>
      </div>

      <div class="max-w-[800px] mx-auto w-full flex-grow flex flex-col">
        <p class="text-[#929292] font-mono">Date</p>
        <p class="text-[#ccc] font-mono">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
          cupiditate culpa temporibus sequi recusandae tenetur, sunt, ab
          deserunt omnis similique asperiores qui molestias nam. Nobis
          asperiores at perferendis eveniet, doloremque, esse id libero culpa ex
          dolorem repellat laborum. Quibusdam perferendis aliquam qui quos
          delectus dolore dolorum deleniti cupiditate numquam facilis accusamus
          repellat harum laborum cumque repudiandae fugit, placeat corporis
          voluptates? Quod veritatis earum quisquam reprehenderit ducimus
          perferendis fugiat quos eos dicta, modi maxime, similique in
          asperiores ad delectus incidunt libero! Quasi illum laboriosam id,
          saepe optio, deleniti a ut fugit dolore enim accusamus veniam nobis?
          Aliquam odio delectus saepe? Laudantium.
        </p>
      </div>
    </div>
    <!-- /note container  -->
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>
