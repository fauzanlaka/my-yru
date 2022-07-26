<template>
    
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>นักศึกษา</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">นักศึกษา</li>
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
                <h3 class="card-title">รายชื่อนักศึกษา</h3>
              </div>
              <div class="card-body">
                <div>
                    <div class="row">
                        <div class="col-6 col-sm-6 col-md-6">
                          <!-- <input type="text" v-model="query" class="form-control" placeholder="ค้นหา" aria-controls="example1"> -->
                        </div>
                        <div class="col-6 col-sm-6 col-md-6">
                            <button @click="openModalAdd()" class="btn btn-primary float-right"><i class="fa fa-plus-circle"></i> เพิ่ม</button>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <table class="table table-bordered table-striped dataTable dtr-inline" style="overflow-y: scrol !important">
                                <thead>
                                    <tr role="row">
                                        <th class="text-center">หรัสนักศึกษา</th>
                                        <th class="text-center">ชื่อ นามสกุล</th>
                                        <th class="text-center">หมายเลขห้อง</th>
                                        <th class="text-center">แก้ไข้</th>
                                        <th class="text-center">ลบ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="odd" v-for="(item, index) in students" :key="index">
                                        <td class="dtr-control sorting_1 text-center" tabindex="0">
                                          {{item.code}}
                                        </td>
                                        <td>
                                          {{item.name}} {{item.lastname}}
                                        </td>
                                        <td>{{item.room_number}}</td>
                                        <td class="text-center text-white">
                                          <button @click="openModalUpdate(item)" class="btn btn-warning text-white"><i class="fa fa-edit"></i> แก้ไข</button>
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
                                @paginate="query === '' ? retreiveStudent() : searchStudent()"
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
            <form>
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 text-center">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <!-- text input -->
                  <div class="form-group">
                    <label>รหัสนักศึกษา</label>
                    <input type="text" class="form-control" :class="{'is-invalid': serverErrors.code}" v-model="code"  placeholder="ชื่อ">
                    <div v-if="serverErrors.code">
                        <span class="text-danger">{{serverErrors.code[0]}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <!-- text input -->
                  <div class="form-group">
                    <label>ชื่อ</label>
                    <input type="text" class="form-control" :class="{'is-invalid': serverErrors.name}" v-model="name"  placeholder="ชื่อ">
                    <div v-if="serverErrors.name">
                        <span class="text-danger">{{serverErrors.name[0]}}</span>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>นามสกุล</label>
                    <input type="text" class="form-control" :class="{'is-invalid': serverErrors.lastname}" v-model="lastname"  placeholder="นามสกุล" >
                    <div v-if="serverErrors.lastname">
                        <span class="text-danger">{{serverErrors.lastname[0]}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <!-- text input -->
                  <div class="form-group">
                    <label>หมายเลขห้อง</label>
                    <input type="text" class="form-control" :class="{'is-invalid': serverErrors.room_number}" v-model="room_number"  placeholder="ชื่อ">
                    <div v-if="serverErrors.room_number">
                        <span class="text-danger">{{serverErrors.room_number[0]}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>  
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" @click.prevent="updateStudent()" :disabled="disabled" class="btn btn-primary" v-if="isEditMode">แก้ไข</button>
            <button type="button" @click.prevent="addStudent()" class="btn btn-primary" v-if="!isEditMode">เพิ่ม</button>
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
            <form @submit.prevent="deleteStudent()">
              <div class="row mt-3">
                <div class="col-sm-12">
                  <!-- text input -->
                  <div class="form-group">
                    <label>รหัสผ่าน</label>
                    <input type="password" class="form-control" :class="{'is-invalid': serverErrors.confirming_password}" v-model="confirming_password" placeholder="รหัสผ่าน">
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
            <button type="button" @click.prevent="deleteStudent()" :disabled="disabled" class="btn btn-danger">ลบ</button>
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
            this.retreiveStudent()
        },  
        data(){
            return{
                students: [],
                pagination:{
                    current_page: 1
                },
                query: '',
                isEditMode: false,
                //form
                id: '',
                code: '',
                name: '',
                lastname: '',
                room_number: '',
                disabled: false,
                serverErrors: '',
                student_id: '',
                confirming_password: '',
            }
        },
        setup(){
            // Get toast interface
            const toast = useToast();
            // Make it available inside methods
            return { toast }
        },
        methods:{
            deleteStudent(){
                this.disabled = true
                this.$Progress.start()
                http.post('studentDelete', {
                    confirming_password: this.confirming_password,
                    student_id: this.student_id
                })
                .then(response => {
                    console.log(response.data)
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
                    this.retreiveStudent()
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
                this.student_id = id
                this.confirming_password = ''
            },
            updateStudent(){
                this.disabled = true        
                let formData = new FormData()
                formData.append('name', this.name) 
                formData.append('lastname', this.lastname) 
                formData.append('code', this.code) 
                formData.append('room_number', this.room_number) 
                formData.append('_method', 'PATCH')
                http.post(`student/${this.id}`, formData)
                    .then(() => {
                        this.serverErrors = ''
                        this.disabled = false
                        this.retreiveStudent()
                        $("#staticBackdrop").modal("hide")
                    })
                    .catch(error => {
                        this.disabled = false
                        this.serverErrors = error.response.data.errors
                    })
            },
            openModalUpdate(item){
                this.id = item.id
                this.code = item.code
                this.name = item.name
                this.lastname = item.lastname
                this.room_number = item.room_number
                $("#staticBackdrop").modal("show")
                this.isEditMode = true
                this.serverErrors = ''
            },
            addStudent(){
                this.disabled = true        
                let formData = new FormData()
                formData.append('name', this.name) 
                formData.append('lastname', this.lastname) 
                formData.append('code', this.code) 
                formData.append('room_number', this.room_number) 
                http.post('student', formData)
                    .then((result) => {
                        console.log(result)   
                        this.disabled = false
                        this.serverErrors = ''
                        this.$Progress.finish()
                        this.retreiveStudent()
                        $("#staticBackdrop").modal("hide")
                    }).catch((err) => {
                        console.log(err)
                        this.disabled = false
                        this.serverErrors = err.response.data.errors
                        this.$Progress.fail()
                    });
            },
            openModalAdd(){
                this.code = ''
                this.name = ''
                this.lastname = ''
                this.room_number = ''
                $("#staticBackdrop").modal("show")
                this.isEditMode = false
                this.serverErrors = ''
            },
            retreiveStudent(){
                this.$Progress.start()
                http.get(`student?page=${this.pagination.current_page}`)
                    .then(result => {
                        // console.log(result.data)  
                        this.students = result.data.data.data
                        this.pagination = result.data.data
                        this.$Progress.finish()
                    })
                    .catch((err) => {
                        if(err.response.status == 401){
                            this.$store.dispatch('auth/destroyLogedIn')
                        }
                        this.$Progress.fail()
                    });  
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>