<template>
    <div class="login-box">
        <!-- /.login-logo -->
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
                <a href="#" class="h1"><b>YRU</b> LOGIN</a>
            </div>
            <div class="card-body">
                <p class="login-box-msg">Sign in to start your session</p>
                <form @submit.prevent="submitLogin()">
                    <div class="input-group mb-2">
                        <input type="text" v-model="username" class="form-control" :class="{'is-invalid': serverErrors.username}" placeholder="Email">
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="text-danger mb-2" v-if="serverErrors.username">
                        {{serverErrors.username[0]}}
                    </div>
                    <div class="input-group mb-2">
                        <input type="password" v-model="password" :class="{'is-invalid': serverErrors.password}" class="form-control" placeholder="Password">
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="text-danger mb-2" v-if="serverErrors.password">
                        {{serverErrors.password[0]}}
                    </div>
                    <div class="row">
                        <!-- <div class="col-8">
                            <div class="icheck-primary">
                            <input type="checkbox" id="remember">
                            <label for="remember">
                                Remember Me
                            </label>
                            </div>
                        </div> -->
                        <!-- /.col -->
                        <div class="col-12">
                            <button type="submit" :disabled="disabled" class="btn btn-primary btn-block">Sign In</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>
                <!-- <div class="social-auth-links text-center mt-2 mb-3">
                    <a href="#" class="btn btn-block btn-primary">
                    <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
                    </a>
                    <a href="#" class="btn btn-block btn-danger">
                    <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
                    </a>
                </div> -->
                <!-- /.social-auth-links -->
                <!-- <p class="mb-1">
                    <a href="#">I forgot my password</a>
                </p>
                <p class="mb-0">
                    <a href="#" class="text-center">Register a new membership</a>
                </p> -->
            </div>
            <!-- /.card-body -->
        </div>
        <!-- /.card -->
    </div>
</template>

<script>
    import http from "@/services/auth"
    // import { useToast } from "vue-toastification";
    // import axios from 'axios';
    // import User from "@/services/User"
    export default {
        data(){
            return{
                username: '',
                password: '',
                disabled: false,
                serverErrors: '',
            }
        },
        methods:{
            login(){
                this.disabled = true
                this.$store.dispatch('auth/signIn', {
                    username: this.username,
                    password: this.password,
                })
                    .then(() => {
                        this.disabled = false
                        this.serverErrors = ''
                        window.location.href = 'dashboard'
                    }).catch(error => {
                        this.disabled = false
                        this.serverErrors = error.response.data.errors
                    });
            },
            submitLogin(){
                this.disabled = true
                http.get(process.env.VUE_APP_RUL_COOKIE+'sanctum/csrf-cookie').then(() => {
                    // console.log(response.data)
                    this.login()
                });
            }
            // login() {
            //     User.login(this.form)
            //         .then(() => {
            //         // this.$root.$emit("login", true);
            //         localStorage.setItem("auth", "true");
            //         this.$router.push({ name: "Dashboard" });
            //         })
            //         .catch(error => {
            //         if (error.response.status === 422) {
            //             this.serverErrors = error.response.data.errors;
            //         }
            //         });
            //     }
        }   
    }
</script>

<style lang="scss" scoped>

</style>
