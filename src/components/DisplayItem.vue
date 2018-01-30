<template>
    <div>
        <h1 v-if='areItems'>Items</h1>
        <h1 v-else>There Are No Items</h1>
        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2">
            <router-link :to="{ name: 'CreateItem' }" class="btn btn-primary">Create Item</router-link>
          </div>
        </div><br />

        <table class="table table-hover" v-if='areItems'>
            <thead>
            <tr>
                <td>ID</td>
                <td>Item Name</td>
                <td>Item Price</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="(item,index) in items">
                    <td>{{ item._id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                    <td><router-link :to="{name: 'EditItem', params: { id: item._id }}" class="btn btn-primary">Edit</router-link></td>
                    <td><button class="btn btn-danger" v-on:click="deleteItem(item._id,index)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import store from '../store';
    import { mapState } from 'vuex';
    export default {
        data(){
            return{
                areItems: true,
            }
        },

        created: function()
        {
            this.$store.registerModule('$_items', store);
            this.$store.dispatch('$_items/fetchItems',this.axios);
        },

        computed: {
            ...mapState('$_items', {
              items: 'items'
            }),

        },

        updated: function()
        {
            if(this.items.length <= 0){
                this.areItems = true;
            }
        },

        methods: {
            deleteItem(id,index)
            {
                let uri = 'http://localhost:4000/items/delete/'+id;
                this.items.splice(index, 1);                
                this.axios.get(uri);
            }
        }
    }
</script>