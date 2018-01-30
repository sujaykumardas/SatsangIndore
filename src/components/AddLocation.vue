<template>
  <div>
    <h1>Add A Location</h1>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Location Name:</label>
          <input type="text" class="form-control" v-model="location.name">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Location Address:</label>
          <input type="text" class="form-control col-md-6" v-model="location.address">
        </div>
      </div>
    </div><br />
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Nearby Location Address:</label>
          <input type="text" class="form-control col-md-6" v-model="location.nearby_address">
        </div>
      </div>
    </div><br />
    <div class="form-group">
      <button class="btn btn-primary" @click="addLocation()">Add Location</button>
    </div>
  </div>
</template>

<script>
export default{
	data(){
		return {
			location: {
				name: '',
				address: '',
        nearby_address: ''
			}
		}
	},
	methods:{
		addLocation: function(){
			let uri = 'http://localhost:4000/locations/add';
      this.axios.post(uri, this.location).then((response) => {
        this.$router.push({name: 'HomePage'});
      }).catch(function (error) {
        console.log(error);
      });
		}
	}
}

</script>