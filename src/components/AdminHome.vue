<template>
  <div id="admin-home-template"><br><br>
    <div class="modal-container">
      <div class="modal-header">
        <slot name="header">
          <div>
            Welcome {{ username }}
          </div>
        </slot>
      </div><br>
      <router-link :to="{ name: 'AddUser' }" class="btn btn-primary">AddUser</router-link><br><br>
      <router-link :to="{ name: 'AddLocation' }" class="btn btn-primary">AddLocation</router-link><br><br>
      <router-link :to="{ name: 'AddContact' }" class="btn btn-primary">AddContact</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
  export default{
    name: 'AdminHome',
    data() {
      return {
        username: this.$session.get('user_name')
      }
    },
    methods: {
      
    }
  }
</script>

<style type="text/css">
  
</style>