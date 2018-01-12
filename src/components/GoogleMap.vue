<template>
  <div class="google-map" :id="kName"></div>
</template>

<script>
	export default {
	  name: 'google-map',
	  props: ['kendraName','viharName'],
	  data: function () {
	    return {
	      kName: this.kendraName + " Map",
	      vName: this.viharName + " Map",
	    }
	  },
	  methods: {
	  	showMaps(address) {
		  	const geocoder = new google.maps.Geocoder();
		    const element = document.getElementById(this.kName)
		    const options = {
		      zoom: 14,
		      mapTypeId: google.maps.MapTypeId.HYBRID
		    }
		    const map = new google.maps.Map(element, options);
		    geocoder.geocode({
		      'address': address
		   	}, 
			  function(results, status) {
			    if(status == google.maps.GeocoderStatus.OK) {
		        new google.maps.Marker({
		          position: results[0].geometry.location,
		          map: map
		        });
		        map.setCenter(results[0].geometry.location);
			    }
			  });
	  	}
	  },
	  mounted: function () {
	  	console.log(this.kName);
	  	console.log(this.vName);
	  	this.showMaps('Sai Mandir,Manavata Nagar,Indore, MP');
	  }
	};
</script>

<style scoped>
	.google-map {
	  width: 300px;
	  height: 200px;
	  margin: 0 auto;
	  top: 80px;
	  background: gray;
	}
</style>