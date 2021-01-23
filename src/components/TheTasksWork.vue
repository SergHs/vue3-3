<template>
    <h1 v-if="countTask===0" class="text-white center">Задач пока нет</h1>
    <div v-else>
      <h3  class="text-white">Всего активных задач: {{activTask}}</h3>
      <div  v-for="task in listTask" :key="task.id" class="card">
        <slot  :task="task" />
      </div>
    </div>

</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
// import { mapGetters} from 'vuex'
export default {
  setup () {
    const store = useStore()
    return {
      listTask: computed(() => store.getters.listTask),
      countTask: computed(() => store.getters.countTask),
      activTask: computed(() => store.getters.activTask)
    }
  }
//  computed : {
//    ...mapGetters(['listTask','countTask','activTask']),
//  }
}
</script>
