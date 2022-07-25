<template>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>ผู้ใช้งาน</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">ผู้ใช้งาน</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
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
                http.get('users')
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