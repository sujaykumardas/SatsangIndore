<template>
  <div id="login-template">
    <div id="modal-template" >
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  <div>
                    Sign In
                  </div>
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>UserName:</label>
                        <input type="text" class="form-control" v-model="user.username">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Password:</label>
                        <input type="password" class="form-control col-md-6" v-model="user.password">
                      </div>
                    </div>
                  </div><br />                  
                  <div class="form-group">
                    <button class="btn btn-primary" @click="authenticate()" >Login</button>
                  </div>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default{
    data() {
      return {
        user: {
          username: '',
          password: ''        
        }
      }
    },
    methods: {
      authenticate() {
        let uri = 'http://localhost:4000/authenticate';
        this.axios.post(uri, this.user).then( response => {
          this.setSession(response.data);
          this.$router.go();
        }).catch(function (error) {
          console.log(error);
        });
      },
      setSession(data) {
        this.$session.set('user_id', data[0]._id);
        this.$session.set('user_name', data[0].name);
      }      
    }
  }
</script>

<style type="text/css">
  
</style>