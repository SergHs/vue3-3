<template>
  <span :class="[statusColor]">{{statusName}}</span>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
// import { mapGetters } from 'vuex'

export default {
  props: ['status'],
  setup (props) {
    const store = useStore()
    return {
      statusColor: computed(() => store.getters.statusColor[props.status]),
      statusName: computed(() => store.getters.statusName[props.status])
    }
  }
  //  computed : {
  //    ...mapGetters(['statusColor','statusName']),
  //  }

}
</script>
