<template>
  <the-tasks-work>
    <template  #default="{task}">
        <h2 class="card-title">
          {{task.name}}
          <AppStatus :status="task.status" />
        </h2>
        <p>
          <strong>
            <small>
              {{task.dateCreate.toLocaleDateString()}}
            </small>
          </strong>
        </p>
        <button class="btn primary" @click="$router.push('/task/'+task.id)" >Посмотреть</button>
    </template>
  </the-tasks-work>
</template>

<script>
import AppStatus from '../components/AppStatus'
import TheTasksWork from '../components/TheTasksWork'

export default {
  components: { AppStatus, TheTasksWork }
}
</script>
