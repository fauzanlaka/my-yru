<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img src="@/assets/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">YRU - SYSTEM</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="@/assets/img/avatar5.png" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">Carlos Carvalho</a>
        </div>
      </div>
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-header">การตั้งค่า</li>
          <li class="nav-item">
            <router-link :to="{name: 'Dashboard'}" class="nav-link">
              <a class="nav-link text-white">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'Users'}" class="nav-link">
              <a class="nav-link text-white">
                <i class="nav-icon fas fa-user"></i>
                <p>ผู้ใช้งาน</p>
              </a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'Students'}" class="nav-link">
              <a class="nav-link text-white">
                <i class="nav-icon fas fa-users"></i>
                <p>นักศึกษา</p>
              </a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'Equipment'}" class="nav-link">
              <a class="nav-link text-white">
                <i class="nav-icon fas fa-list"></i>
                <p>อุปกรณ์</p>
              </a>
            </router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link :to="{name: 'Roles'}" class="nav-link">
              <a class="nav-link text-white">
                <i class="nav-icon fas fa-ruler"></i>
                <p>สิทธิ์</p>
              </a>
            </router-link>
          </li> -->
          <li class="nav-item" @click="logout()" style="cursor: pointer;">
            <a class="nav-link bg-danger">
              <i class="nav-icon fas fa-sign-out-alt"></i>
              <p>ออกจากระบบ</p>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
// import http from '@/services/auth';
// import User from "@/services/User"
export default {
  methods:{
    logout(){
      this.$Progress.start()
      this.$store.dispatch('auth/signOut')
        .then(() => {
          // console.log(response.data)
          window.location.href = '/'
          this.$Progress.finish()
        })
        .catch(() => {
          this.$Progress.fail()
        });
    }
  }
}
</script>

<style>

</style>