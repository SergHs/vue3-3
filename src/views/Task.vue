<template>

  <div v-if="task!==undefined" class="card">
   <h2>{{task.name}}</h2>
    <p><strong>Статус</strong>: <AppStatus :status="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ task.dateCreate.toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{task.text}}</p>
    <div>
      <button class="btn" @click="changeStatys(1)">Взять в работу</button>
      <button class="btn primary" @click="changeStatys(2)">Завершить</button>
      <button class="btn danger" @click="changeStatys(3)">Отменить</button>
    </div>
  </div>
  <h3 v-else class="text-white center">
    Задачи с id = <strong>{{taskId}}</strong> нет.
  </h3>

</template>

<script>
import AppStatus from '../components/AppStatus'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  props: ['taskId'],
  setup (props) {
    const store = useStore()
    function changeStatys (status) {
      store.dispatch('changeTaskStatus', { id: props.taskId, status })
    }

    return {
      task: computed(() => store.getters.listTask.find(t => t.id === props.taskId)),
      changeStatys
    }
  },

  // computed: {
  //   task()  { return this.$store.getters['listTask'].find(t=>t.id===this.taskId)},
  // },

  // methods: {
  //   changeStatys(status) {
  //     this.$store.dispatch('changeTaskStatus',{ id: this.taskId, status })
  //   }
  // },

  components: { AppStatus }
}
</script>

<style scoped>

</style>
