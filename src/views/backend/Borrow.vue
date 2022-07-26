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
              <li class="breadcrumb-item active">ยืมอุปกรณ์</li>
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
                          <input type="text" v-model="query" class="form-control" placeholder="ค้นหา" aria-controls="example1" disabled>
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
                                        <th class="text-center">ยืม</th>
                                        <!-- <th class="text-center"></th> -->
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
                                          <button @click="openModalBorrow(item)" class="btn btn-warning text-white"><i class="fa fa-edit"></i> คลิกเพื่อบันทึกการยืม</button>
                                        </td>
                                        <!-- <td class="text-center text-white">
                                          <button @click="deleteConfirming(item.id)" class="btn btn-danger text-white"><i class="fa fa-trash"></i> ลบ</button>
                                        </td> -->
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

    <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              <span>ข้อมูลอุปกรณ์</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-sm-6">
                    <p class="text-bold">รหัสอุปกรณ์ : {{code}}</p>
                    <p class="text-bold">ชื่ออุปกรณ์ : {{equipment}}</p>
                    <p class="text-bold">คงเหลือ : {{remaining}}</p>
                  </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <!-- text input -->
                  <div class="form-group">
                    <label>กรอกรหัสนักศึกษาที่ต้องการยืม</label>
                    <input type="text" class="form-control" :class="{'is-invalid': serverErrors.student}" v-model="student"  placeholder="">
                    <div v-if="serverErrors.student">
                        <span class="text-danger">{{serverErrors.student[0]}}</span>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>จำนวนที่ต้องการ</label>
                    <input type="text" class="form-control" :class="{'is-invalid': serverErrors.amount}" v-model="amount"  placeholder="" >
                    <div v-if="serverErrors.amount">
                        <span class="text-danger">{{serverErrors.amount[0]}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>  
          </div>
          <div class="modal-footer">
            <button type="button" @click.prevent="addBorrow()" :disabled="disabled" class="btn btn-primary">บันทึก</button>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
    import http from '@/services/auth';
    import $ from 'jquery'
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
                id: '',
                code: '',
                equipment: '',
                remaining: '',
                //borrow form
                student: '',
                amount: '',
                serverErrors: '',
                disabled: true
            }
        },
        methods:{
            searchEquipments(){
                
            },
            addBorrow(){
                this.disabled = true
                this.$Progress.start()
                let formData = new FormData()
                formData.append('student', this.student)
                formData.append('amount', this.amount)
                http.post('borrow', formData)
                    .then(() => {
                        this.disabled = false
                        this.serverErrors = ""
                        this.$Progress.finish()
                    })
                    .catch(error => {
                        this.serverErrors = error.response.data.errors
                        this.disabled = false
                        this.$Progress.fail()
                    })
            },
            openModalBorrow(item){
                $("#staticBackdrop").modal("show")
                this.id = item.id
                this.code = item.code
                this.equipment = item.equipment
                this.remaining = item.remaining
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