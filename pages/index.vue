<template>
  <div class="flex bg-zinc-900 h-screen">
    <!-- sidebar  -->
    <div class="bg-black w-[320px] p-8 flex flex-col">
      <div>
        <Logo />
      </div>
      <!-- today main cotainer  -->
      <div class="flex-grow">
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Today</p>
        <div class="ml-2 space-y-2">
          <div
            class="p-2 rounded-lg cursor-pointer"
            v-for="note in todaysNotes"
            :class="{
              'bg-[#a1842c]': note.id === selectedNote.id,
              'hover:bg-[#a1842c/50]': note.id !== selectedNote.id,
            }"
            @click="setNote(note)"
          >
            <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
              {{ note.text.substring(0, 50) }}
            </h3>
            <div class="leading-none truncate text-[#D6D6D6]">
              <span class="text-xs text-[#F4F4F5] mr-4">{{
                new Date(note.updatedAt).toLocaleDateString()
              }}</span>
              <span v-if="note.text.length > 50" class="text-xs text-[#d6d6d6]"
                >... {{ note.text.substring(50, 100) }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- /today main container  -->

      <!-- yesterday main cotainer  -->
      <div>
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Yesterday</p>
        <div class="ml-2 space-y-2">
          <div
            class="p-2 rounded-lg cursor-pointer"
            v-for="note in yesterdaysNotes"
            :class="{
              'bg-[#a2842c]': note.id === selectedNote.id,
              'hover:bg-[#a2842c]/50': note.id !== selectedNote.id,
            }"
            @click="setNote(note)"
          >
            <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
              {{ note.text.substring(0, 50) }}
            </h3>
            <div class="leading-none truncate text-[#D6D6D6]">
              <span class="text-xs text-[#F4F4F5] mr-4">{{
                new Date(note.updatedAt).toDateString() ===
                new Date().toDateString()
                  ? "Today"
                  : new Date(note.updatedAt).toLocaleDateString()
              }}</span>
              <span v-if="note.text.length > 50" class="text-xs text-[#d6d6d6]"
                >... {{ note.text.substring(50, 100) }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- /yesterday main container  -->

      <!-- earlier days main container  -->
      <div>
        <p class="text-xs font-bold text-[#c2c2c5] mt-12 mb-4">Earlier</p>
        <div class="ml-2 space-y-2">
          <div
            v-for="note in earlierNotes"
            class="p-2 rounded-lg cursor-pointer"
            :class="{
              'bg-[#a1842c]': note.id === selectedNote.id,
              'hover:bg-[#a1842c]/50': note.id !== selectedNote.id,
            }"
            @click="setNote(note)"
          >
            <h3 class="text-sm font-bold text-[#f4f4f5] truncate">
              {{ note.text.substring(0, 50) }}
            </h3>
            <div class="leading-none truncate text-[#d6d6d6]">
              <span class="text-xs text-[#f4f4f5] mr-4">{{
                new Date(note.updatedAt).toDateString() ===
                new Date().toDateString()
                  ? "Today"
                  : new Date(note.updatedAt).toLocaleDateString()
              }}</span>
              <span v-if="note.text.length > 50" class="text-xs text-[#d6d6d6]"
                >... {{ note.text.substring(50, 100) }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- /earlier days main container  -->
    </div>
    <!-- /sidebar  -->

    <!-- note container  -->
    <div class="w-full flex flex-col">
      <div class="flex justify-between w-full items-start p-8">
        <button
          class="inline-flex items-center text-xs text-[#c2c2c5] hover:text-white font-bold space-x-2"
          @click="createNewNote"
        >
          <PencilIcon />
          <span>Create Note</span>
        </button>
        <button>
          <TrashIcon
            class="text-[#6d6d73] hover:text-white"
            @click="deleteNote"
          />
        </button>
      </div>

      <div class="max-w-[800px] mx-auto w-full flex-grow flex flex-col">
        <p class="text-[#929292] font-mono">
          {{ new Date(selectedNote.updatedAt).toLocaleDateString() }}
        </p>
        <textarea
          ref="textarea"
          v-model="updatedNote"
          name="note"
          id="note"
          class="text-[#d4d4d4] my-4 w-full bg-transparent focus:outline-none resize-none flex-grow"
          @input="
            () => {
              debouncedFn();
              selectedNote.text = updatedNote;
            }
          "
        >
        </textarea>
      </div>

      <button
        class="text-zinc-400 hover:text-white text-sm font-bold absolute right-0 bottom-0 p-8"
        @click="logout"
      >
        Logout
      </button>
    </div>
    <!-- /note container  -->
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
// import { useDebounceFn } from "@vueuse/core";

const updatedNote = ref("");
const notes = ref([]);
const selectedNote = ref({});
const textarea = ref(null);

definePageMeta({
  middleware: ["auth"],
});

function setNote(note) {
  selectedNote.value = note;
  updatedNote.value = note.text;
}

function logout() {
  const jwtCookie = useCookie("NoteNestJWT");
  jwtCookie.value = null;
  navigateTo("/login");
}

async function deleteNote() {
  const { isConfirmed } = await Swal.fire({
    title: "Are your sure?",
    text: "This will delete your note permanently, are you extra sure you like to do this?",
    icon: "warning",
    confirmButtonText: "Yes, delete",
    showCancelButton: true,
  });

  if (isConfirmed) {
    try {
      await $fetch(`/api/notes/${selectedNote.value.id}`, {
        method: "DELETE",
      });

      const index = notes.value.findIndex(
        (note) => note.id === selectedNote.value.id
      );

      if (index !== -1) {
        notes.value.splice(index, 1);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Could not delete note",
        icon: "error",
      });
    }
  }
}

async function createNewNote() {
  try {
    const newNote = await $fetch("/api/notes", {
      method: "POST",
    });

    notes.value.unshift(newNote);
    selectedNote.value = notes.value[0];
    updatedNote.value = "";
    textarea.value.focus();
  } catch (err) {
    Swal.fire({
      title: "Error",
      text: "Could not create note",
      icon: "error",
    });
  }
}

const debouncedFn = useDebounceFn(async () => {
  await updateNote();
}, 2000);

async function updateNote() {
  console.log("Updated called with:", updatedNote.value);

  try {
    await $fetch(`/api/notes/${selectedNote.value.id}`, {
      method: "PATCH",
      body: {
        updatedNote: updatedNote.value,
      },
    });
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "unable to update",
      icon: "error",
    });
  }
}

const todaysNotes = computed(() => {
  return notes.value.filter((note) => {
    const noteDate = new Date(note.updatedAt);
    return noteDate.toDateString() === new Date().toDateString();
  });
});

const yesterdaysNotes = computed(() => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return notes.value.filter((note) => {
    const noteDate = new Date(note.updatedAt);
    return noteDate.toDateString() === yesterday.toDateString();
  });
});

const earlierNotes = computed(() => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return notes.value.filter((note) => {
    const noteDate = new Date(note.updatedAt);
    return (
      noteDate < yesterday &&
      noteDate.toDateString() !== yesterday.toDateString()
    );
  });
});

onMounted(async () => {
  notes.value = await $fetch("/api/notes");
  notes.value.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  if (notes.value.length > 0) selectedNote.value = notes.value[0];
  else {
    await createNewNote();
    selectedNote.value = notes.value[0];
  }

  updatedNote.value = selectedNote.value.text;

  textarea.value?.focus();
});
</script>
