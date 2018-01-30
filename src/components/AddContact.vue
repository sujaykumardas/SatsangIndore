<template>
  <div>
    <h1>Add A New Contact</h1>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Name:</label>
          <input type="text" class="form-control" v-model="contact.name">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Designation:</label>
          <input type="text" class="form-control col-md-6" v-model="contact.designation">
        </div>
      </div>
    </div><br />
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Contact Number:</label>
          <input type="text" class="form-control col-md-6" v-model="contact.contact_no">
        </div>
      </div>
    </div><br />
    <div class="form-group">
      <button class="btn btn-primary" @click="addContact()">Add Contact</button>
    </div>
  </div>
</template>

<script>
export default{
	data(){
		return {
			contact: {
				name: '',
				designation: '',
        contact_no: ''
			}
		}
	},
	methods:{
		addContact: function(){
			let uri = 'http://localhost:4000/contacts/add';
      this.axios.post(uri, this.contact).then((response) => {
        this.$router.push({name: 'HomePage'});
      }).catch(function (error) {
        console.log(error);
      });
		}
	}
}

</script>