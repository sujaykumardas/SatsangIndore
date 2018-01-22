<template>
	<div class="container">
		<div  class="maps-container" v-for="(location,index) in locationNames">	
			<span class="google-map-span">{{location}}</span>	
  		<div class="google-map" :id="location" ></div><br><br>
		</div>
  </div>
</template>

<script>
	export default {
	  name: 'google-map',
	  props: ['locationDetails'],
	  data: function () {
	    return {
	      locationDetailsChild: this.locationDetails,
	      locationMapAddresses: [],
	      locationNames: []
	    }
	  },

	  methods: {
	  	showMaps(addresses,names) {
		  	const geocoder = new google.maps.Geocoder();
		    const options = {
		      zoom: 14,
		      mapTypeId: google.maps.MapTypeId.HYBRID
		    }
		    const map1 = new google.maps.Map(document.getElementById(names[0]), options);
		    const map2 = new google.maps.Map(document.getElementById(names[1]), options);
		    geocoder.geocode({
		      'address': addresses[0]
		   	}, 
			  function(results, status) {
			    if(status == google.maps.GeocoderStatus.OK) {
		        new google.maps.Marker({
		          position: results[0].geometry.location,
		          map: map1
		        });
		        map1.setCenter(results[0].geometry.location);
			    }
			  });
			  geocoder.geocode({
		      'address': addresses[1]
		   	}, 
			  function(results, status) {
			    if(status == google.maps.GeocoderStatus.OK) {
		        new google.maps.Marker({
		          position: results[0].geometry.location,
		          map: map2
		        });
		        map2.setCenter(results[0].geometry.location);
			    }
			  });
	  	}
	  },
	  watch: {
	    locationDetailsChild: function () {
	    	if(typeof this.locationDetailsChild[0]!= "undefined" && typeof this.locationDetailsChild[1]!= "undefined") {
		    	this.locationMapAddresses.push(this.locationDetailsChild[0]['nearby_address'],this.locationDetailsChild[1]['nearby_address']);
		    	this.locationNames.push(this.locationDetailsChild[0]['name'],this.locationDetailsChild[1]['name']);	    		
	    	}
	    }
	  },
	  updated() {
	  	this.showMaps(this.locationMapAddresses,this.locationNames);
	  }
	};
</script>

<style scoped>
	.google-map {
	  width: 300px;
	  height: 200px;
	  top: 20px;
	  left: 800px;
	  background: gray;
	}
	.google-map-span{
		font-weight: bold;
		padding-left: 800px;
		color: #87CEFA;
		font-size: 20px;
	}
	.maps-container{
	}
</style>