<template>
  <form class="card"  @submit.prevent="submit">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title"  v-model.trim="name">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date"   v-model.trim="dateCreate">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model.trim="text"></textarea>
    </div>

    <button class="btn primary" :disabled="!isValid" type="submit">Создать</button>
  </form>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()

    const name = ref('')
    const dateCreate = ref('')
    const text = ref('')

    const isValid = computed(() => name.value !== '' && dateCreate.value !== '' && text.value !== '')

    function submit () {
      if (isValid.value) {
        store.dispatch('newTask', {
          name: name.value,
          dateCreate: new Date(dateCreate.value),
          text: text.value
        })
        router.push('/')
      }
    }

    return {
      name,
      dateCreate,
      text,
      isValid,
      submit
    }
  }

  // data() {
  //   return {
  //     name: '',
  //     dateCreate: '',
  //     text: ''
  //   }
  // },
  // computed: {
  //   isValid() {
  //     return this.name !== '' && this.dateCreate !== '' && this.text !== ''
  //   }
  // },

  // methods: {
  //   submit() {
  //     if (this.isValid) {
  //       this.$store.dispatch('newTask',{
  //         name : this.name,
  //         dateCreate: new Date(this.dateCreate),
  //         text: this.text
  //       })
  //       this.$router.replace('/')
  //     }
  //   }
  // }

}
</script>
