<template>
  <div>
    <h1>Add A User</h1>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Name*:</label>
          <input type="text" class="form-control" v-model="user.name">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>UserName*:</label>
          <input type="text" class="form-control col-md-6" v-model="user.username">
        </div>
      </div>
    </div><br />
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Email*:</label>
          <input type="email" class="form-control col-md-6" v-model="user.email">
        </div>
      </div>
    </div><br />
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Password*:</label>
          <input type="password" class="form-control col-md-6" v-model="user.password">
        </div>
      </div>
    </div><br />
    <div class="form-group">
      <button class="btn btn-primary" @click="addUser()">Add User</button>
    </div>
  </div>
</template>

<script>
export default{
	data(){
		return {
			user: {
				name: '',
				username: '',
        email: '',
        password: ''
			}
		}
	},
	methods:{
		addUser: function(){
			let uri = 'http://localhost:4000/users/add';
      this.axios.post(uri, this.user).then((response) => {
        this.$router.push({name: 'HomePage'});
      }).catch(function (error) {
        console.log(error);
      });
		}
	}
}

</script>