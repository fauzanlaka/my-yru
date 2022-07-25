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
    
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">รายการผู้ใช้งานทั้งหมด</h3>
              </div>
              <div class="card-body">
                <div>
                    <div class="row">
                        <div class="col-6 col-sm-6 col-md-6">
                          <input type="text" v-model="query" class="form-control" placeholder="ค้นหา" aria-controls="example1">
                        </div>
                        <div class="col-6 col-sm-6 col-md-6">
                            <button @click="openModal(false)" class="btn btn-primary float-right"><i class="fa fa-plus-circle"></i> เพิ่ม</button>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <table class="table table-bordered table-striped dataTable dtr-inline" style="overflow-y: scrol !important">
                                <thead>
                                    <tr role="row">
                                        <th class="text-center">ID</th>
                                        <th class="text-center">ชื่อ นามสกุล</th>
                                        <th class="text-center">อีเมล</th>
                                        <th class="text-center">เบอร์โทร</th>
                                        <th class="text-center">แก้ไข้</th>
                                        <th class="text-center">ลบ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="odd" v-for="(item, index) in users" :key="index">
                                        <td class="dtr-control sorting_1 text-center" tabindex="0">
                                          <!-- {{index+1}} -->
                                          {{item.id}}
                                        </td>
                                        <td>
                                          {{item.name}} {{item.lastname}}
                                        </td>
                                        <td>{{item.email}}</td>
                                        <td style="">{{item.telephone}}</td>
                                        <td class="text-center text-white">
                                          <button @click="openModal(true, item)" class="btn btn-warning text-white"><i class="fa fa-edit"></i> แก้ไข</button>
                                        </td>
                                        <td class="text-center text-white">
                                          <button @click="deleteConfirming(item.id)" class="btn btn-danger text-white"><i class="fa fa-trash"></i> ลบ</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <pagination
                                v-if="pagination.last_page > 1"
                                :pagination="pagination"
                                :offset="5"
                                @paginate="query === '' ? retreiveUser() : searchUser()"
                            ></pagination>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- create/update form -->
    <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              <span v-if="!isEditMode">เพิ่ม</span>
              <span v-if="isEditMode">แก้ไข</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateUser()">
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 text-center">
                  <!-- <img src="/assets/img/AdminLTELogo.png" alt="" srcset=""> -->
                  <img v-if="imgUrl" class="img-thumbnail" width="150" height="200" :src="imgUrl" alt="User profile picture">
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-sm-6">
                  <!-- text input -->
                  <div class="form-group">
                    <label>ชื่อ</label>
                    <input type="text" class="form-control" v-model="name" placeholder="ชื่อ">
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>นามสกุล</label>
                    <input type="text" class="form-control" v-model="lastname" placeholder="นามสกุล" >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <!-- textarea -->
                  <div class="form-group">
                    <label>อีเมล</label>
                    <input type="text" class="form-control" v-model="email" placeholder="อีเมล">
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>เบอร์โทรศัพท์</label>
                    <input type="text" class="form-control" v-model="telephone" placeholder="เบอร์โทรศัพท์" >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <!-- textarea -->
                  <div class="form-group">
                    <label>username</label>
                    <input type="text" class="form-control" v-model="username" placeholder="username">
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>password</label>
                    <input type="password" class="form-control" v-model="password" placeholder="password" >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <!-- textarea -->
                  <div class="form-group">
                    <label>รูปโปรไฟล์</label>
                    <input type="file" class="form-control" @change="onFileChange">
                  </div>
                </div>
              </div>
            </form>  
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" @click.prevent="updateUser()" :disabled="disabled" class="btn btn-primary" v-if="isEditMode">แก้ไข</button>
            <button type="button" class="btn btn-primary" v-if="!isEditMode">บันทึก</button>
          </div>
        </div>
      </div>
    </div>
    <!-- !.create/update form -->

    <!-- confirming delete form -->
    <div class="modal fade" id="deleteConfirming" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              <span>ลบผู้ใช้งาน</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="deleteUser()">
              <div class="row mt-3">
                <div class="col-sm-12">
                  <!-- text input -->
                  <div class="form-group">
                    <label>รหัสผ่าน</label>
                    <input type="text" class="form-control" :class="{'is-invalid': serverErrors.confirming_password}" v-model="confirming_password" placeholder="ชื่อ">
                    <div class="text-danger" v-if="serverErrors.confirming_password">
                      {{serverErrors.confirming_password[0]}}
                    </div>
                  </div>
                </div>
              </div>
            </form>  
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">ยกเลิก</button>
            <button type="button" @click.prevent="deleteUser()" :disabled="disabled" class="btn btn-danger">ลบ</button>
          </div>
        </div>
      </div>
    </div>
    <!-- !.confirming delete form -->

</template>

<script>
  import http from '@/services/auth';
  import $ from 'jquery'
  import { useToast } from "vue-toastification";
  export default {
    mounted(){
      this.retreiveUser()
    },
    data(){
      return{
        users: [],
        pagination:{
          current_page: 1
        },
        query: '',
        isEditMode: false,
        //form data
        id: '',
        imgUrl: '',
        name: '',
        lastname: '',
        email: '',
        telephone: '',
        username: '',
        password: '',
        avatar: null,
        disabled: false, 
        serverErrors: '',
        //delete confirming password
        confirming_password: '',
        user_id: '',
      }
    },
    setup(){
      // Get toast interface
      const toast = useToast();
      // Make it available inside methods
      return { toast }
    },
    watch:{
      query: function(){
        if(this.query == "")
        {
          this.retreiveUser()
        }else{
          this.searchUser()
        }
      }  
    },
    methods:{
      deleteUser(){
        this.disabled = true
        this.$Progress.start()
        http.post('userDelete', {
          confirming_password: this.confirming_password,
          user_id: this.user_id
        })
          .then(response => {
            console.log(response.data.message)
            this.toast.success("ลบข้อมูลสำเร็จ", {
              position: "top-right",
              timeout: 2000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: false,
              closeButton: "button",
              icon: true,
              rtl: false
            });
            this.disabled = false
            this.$Progress.finish()
            this.serverErrors = ""
            this.retreiveUser()
            $("#deleteConfirming").modal("hide")
          })
          .catch(error => {
            this.$Progress.fail()
            this.disabled = false
            this.serverErrors = error.response.data.errors
          })
      },
      deleteConfirming(id){
        $("#deleteConfirming").modal("show")
        this.user_id = id
      },
      updateUser(){
        let formData = new FormData()
        formData.append('name', this.name) 
        formData.append('lastname', this.lastname) 
        formData.append('email', this.email) 
        formData.append('telephone', this.telephone) 
        formData.append('username', this.username) 
        formData.append('password', this.password) 
        formData.append('avatar', this.avatar) 
        formData.append('_method', 'PATCH')
        this.disabled = true
        http.post(`users/${this.id}`, formData)
          .then(() => {
            this.toast.success("แก้ไขข้อมูลสำเร็จ", {
              position: "top-right",
              timeout: 2000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: false,
              closeButton: "button",
              icon: true,
              rtl: false
            });
            this.disabled = false
            this.serverErrors = ''
            this.retreiveUser()
          })
          .catch(error => {
            this.serverErrors = error.response.data.errors
            this.disabled = false
          })
        },
      openModal(id, item){
        $("#staticBackdrop").modal("show")
        this.id = item.id
        this.name = item.name
        this.lastname = item.lastname
        this.email = item.email
        this.telephone = item.telephone
        this.username = item.username
        this.imgUrl = item.avatar
        // this.password = item.password
        this.isEditMode = id
      },
      onFileChange(e){
          const file = e.target.files[0]
          this.avatar = e.target.files[0]
          this.imgUrl = URL.createObjectURL(file)
          // this.eimgUrl = URL.createObjectURL(file)
      },
      searchUser(){
        http.get(`userSearch?q=${this.query}&&page=1`)
          .then(result => {
            this.users = result.data.data.data
            this.pagination = result.data.data
          })
          .catch(err => {
            if(err.response.status == 401){
              this.$store.dispatch('auth/destroyLogedIn')
            }
          })
      },
      retreiveUser(){
        this.$Progress.start()
        http.get(`users?page=${this.pagination.current_page}`)
          .then(result => {
            // console.log(result.data)  
            this.users = result.data.data.data
            this.pagination = result.data.data
            this.$Progress.finish()
          }).catch((err) => {
            if(err.response.status == 401){
              this.$store.dispatch('auth/destroyLogedIn')
            }
            this.$Progress.fail()
          });  
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>