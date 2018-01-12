<template>
	<div>
		<google-map :kendraName="kendraName" :viharName="viharName" ></google-map>
	</div>
</template>

<script>
	import GoogleMap from './GoogleMap.vue';
	export default{
		data() {
			return{
				kendraName: 'Satsang Kendra Indore',
				viharName: 'Satsang Vihar Indore'
			}
		},
		components: {
      GoogleMap
    }
	}
</script>