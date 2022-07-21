<template>
    <div>
        <p>{{name.headers}}</p>
    </div>
</template>

<script>
    import http from '@/services/auth';
    // import User from "@/services/User"
    export default {
        mounted(){
           this.retreiveUser()
        },
        data(){
            return{
                name: '',
            }
        },
        methods:{
            retreiveUser(){
                http.get('user')
                    .then((result) => {
                        this.name = result.data
                    }).catch(error => {
                        // console.log(error.response.status)
                        if(error.response.status == 401){
                            this.$store.dispatch('auth/destroyLogedIn')
                        }
                    });
            }
            
        }
    }
</script>

<style lang="scss" scoped>

</style>