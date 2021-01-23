import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state () {
    return {
      listTask: [],
      statusColor: ['badge primary', 'badge warning', 'badge primary', 'badge danger'],
      statusName: ['Активен', 'Выполняется', 'Завершен', 'Отменен']

    }
  },

  getters: {
    listTask (state) { return state.listTask },
    statusColor (state) { return state.statusColor },
    statusName (state) { return state.statusName },
    activTask (state) { return state.listTask.filter(t => t.status === 0).length },
    countTask (state) { return state.listTask.length }
  },

  mutations: {
    setChangeTaskStatus (state, { id, status }) {
      state.listTask.filter(t => t.id === id)[0].status = status
    },
    setNewTask (state, task) {
      state.listTask.push(task)
    },
    setLoadListTask (state, listTask) {
      listTask.forEach(task => {
        task.dateCreate = new Date(task.dateCreate)
        state.listTask.push(task)
      })
    }

  },

  actions: {
    async changeTaskStatus ({ commit, getters }, { id, status }) {
      const task = getters.listTask.find(t => t.id === id)
      await axios.put(
        `https://vue-with-https-default-rtdb.firebaseio.com/tasks/${id}.json`,
        { name: task.name, dateCreate: task.dateCreate, text: task.text, status }
      )

      await commit('setChangeTaskStatus', { id, status })
    },

    async newTask ({ commit }, { name, dateCreate, text }) {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      let status = 0
      if (dateCreate.valueOf() < today.valueOf()) {
        status = 3
      }
      const { data } = await axios.post(
        'https://vue-with-https-default-rtdb.firebaseio.com/tasks.json',
        { name, dateCreate, text, status }
      )
      commit('setNewTask', { id: data.name, name, dateCreate, text, status })
    },

    async loadListTask ({ commit }) {
      try {
        const { data } = await axios.get(
          'https://vue-with-https-default-rtdb.firebaseio.com/tasks.json')
        if (data) {
          const listTask = Object.keys(data).map(key => {
            return {
              id: key,
              ...data[key]
            }
          })
          commit('setLoadListTask', listTask)
        }
      } catch (e) {
        console.error(e.message)
      }
    }

  }

})
