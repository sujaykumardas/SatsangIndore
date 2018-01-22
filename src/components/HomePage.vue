<template>
	<div>
		<div class="header">
			<img src='../images/satsang_logo.png'></img>
			<h1>SATSANG INDORE</h1>
		</div>
		<ul>
		  <li><a href="#home">Home</a></li>
		  <li><a href="#contactModal">Contact</a></li>
		  <li><a href="#about">About</a></li>
		</ul>
		<google-map :locationDetails="locationDetails"></google-map>
	</div>
</template>

<script>
	import GoogleMap from './GoogleMap.vue';
	import ContactModal from './ContactModal.vue';
	export default{
		data() {
			return{
				locationDetails: [],
				showContactModal: false
			}
		},
		methods: {
			getLocations() {
				let uri = 'http://localhost:4000/locations';
        this.axios.get(uri).then(response => {
        	if(response.data.length > 0){
        		response.data.forEach((currentValue, index) => {
        			this.locationDetails.push(currentValue);
        		});
        	}
		    })
		    .catch(err => {
		    	console.log(err);
		    });
			}
		},
		components: {
	      GoogleMap,
	      ContactModal
	    },
	    created: function() {
	    	this.getLocations();
	    }
	}
</script>

<style>	
	h1 {
		font-family: arial, sans-serif;
		font-size: 36px;
		font-weight: bold;
		margin-bottom: 1px;
		margin-left: 20px;
		margin-top: 30px;
		float: left;
	}
	img {		
		width: 130px;
		float: left;	
		opacity: 0.7;	
	}
	.header {
		margin-top: 20px;
		float: left;
		width: 100%;
		background-color: #87CEFA;
	}
	ul {
    list-style-type: none;
    overflow: hidden;
    background-color: #dddddd;
	}

	li {
	   float: left;
	   border-right: 1px solid #bbb;
	}

	li a {
    display: block;
    padding: 8px;
	}
	li a:hover {
    background-color: #87CEFA;
	}
	.active {
    background-color: #87CEFA;
	}
</style>