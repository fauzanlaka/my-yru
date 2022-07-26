<template>
    
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>อุปกรณ์</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">อุปกรณ์</li>
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
                <h3 class="card-title">รายการอุปกรณ์</h3>
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
                                        <th class="text-center">รหัสอุปกรณ์</th>
                                        <th class="text-center">ชื่ออุปกรณ์</th>
                                        <th class="text-center">คงเหลือ</th>
                                        <th class="text-center">แก้ไข้</th>
                                        <th class="text-center">ลบ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="odd" v-for="(item, index) in equipments" :key="index">
                                        <td class="dtr-control sorting_1 text-center" tabindex="0">
                                          {{item.code}}
                                        </td>
                                        <td>
                                          {{item.equipment}}
                                        </td>
                                        <td>{{item.remaining}}</td>
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
                                @paginate="query === '' ? retreiveEquipments() : searchEquipments()"
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
                    <label>รหัสอุปกรณ์</label>
                    <input type="text" class="form-control" :class="{'is-invalid': serverErrors.code}" v-model="code"  placeholder="">
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
                    <label>ชื่ออุปกรณ์</label>
                    <input type="text" class="form-control" :class="{'is-invalid': serverErrors.nequipmentame}" v-model="equipment"  placeholder="">
                    <div v-if="serverErrors.equipment">
                        <span class="text-danger">{{serverErrors.equipment[0]}}</span>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>คงเหลือ</label>
                    <input type="text" class="form-control" :class="{'is-invalid': serverErrors.remaining}" v-model="remaining"  placeholder="" >
                    <div v-if="serverErrors.remaining">
                        <span class="text-danger">{{serverErrors.remaining[0]}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>  
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" @click.prevent="updateStudent()" :disabled="disabled" class="btn btn-primary" v-if="isEditMode">แก้ไข</button>
            <button type="button" @click.prevent="addEquipment()" class="btn btn-primary" v-if="!isEditMode">เพิ่ม</button>
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
            <form @submit.prevent="deleteEquipment()">
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
            <button type="button" @click.prevent="deleteEquipment()" :disabled="disabled" class="btn btn-danger">ลบ</button>
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
            this.retreiveEquipments()
        },  
        data(){
            return{
                equipments: [],
                pagination:{
                    current_page: 1
                },
                query: '',
                isEditMode: false,
                //form
                id: '',
                code: '',
                equipment: '',
                remaining: '',
                disabled: false,
                serverErrors: '',
                equipment_id: '',
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
            deleteEquipment(){
                this.disabled = true
                this.$Progress.start()
                http.post('equipmentDelete', {
                    confirming_password: this.confirming_password,
                    equipment_id: this.equipment_id
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
                    this.retreiveEquipments()
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
                this.equipment_id = id
                this.confirming_password = ''
            },
            updateStudent(){
                this.disabled = true        
                let formData = new FormData()
                formData.append('id', this.id)
                formData.append('code', this.code)  
                formData.append('equipment', this.equipment) 
                formData.append('remaining', this.remaining) 
                formData.append('_method', 'PATCH')
                http.post(`equipment/${this.id}`, formData)
                    .then(() => {
                        this.serverErrors = ''
                        this.disabled = false
                        this.retreiveEquipments()
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
                this.equipment = item.equipment
                this.remaining = item.remaining
                $("#staticBackdrop").modal("show")
                this.isEditMode = true
                this.serverErrors = ''
            },
            addEquipment(){
                this.disabled = true        
                let formData = new FormData()
                formData.append('code', this.code)  
                formData.append('equipment', this.equipment) 
                formData.append('remaining', this.remaining) 
                http.post('equipment', formData)
                    .then((result) => {
                        console.log(result)   
                        this.disabled = false
                        this.serverErrors = ''
                        this.$Progress.finish()
                        this.retreiveEquipments()
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
                this.equipment = ''
                this.remaining = ''
                $("#staticBackdrop").modal("show")
                this.isEditMode = false
                this.serverErrors = ''
            },
            retreiveEquipments(){
                this.$Progress.start()
                http.get(`equipment?page=${this.pagination.current_page}`)
                    .then(result => {
                        // console.log(result.data)  
                        this.equipments = result.data.data.data
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