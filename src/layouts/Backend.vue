<template>
    <body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
      
      <!-- <Preloader></Preloader> -->
      <Navbar></Navbar>
      <Sidebar></Sidebar>

      <div class="content-wrapper">
        <router-view></router-view>
        <!-- <ContentHeader></ContentHeader>

        <section class="content">
          <div class="container-fluid">
            <ExampleForm></ExampleForm>
          </div>
        </section> -->
        
      </div>
      
      <Footer></Footer>
      <ControlSidebar></ControlSidebar>
      
    </div>
  </body>
</template>

<script>
    // import $ from 'jquery'
    // import "../node_modules/admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css"
    // import "../node_modules/admin-lte/plugins/select2/css/select2.min.css"
    // import Sidebar from "@/components/backend/Sidebar.vue";
    // import Navbar from "@/components/backend/Navbar.vue";
    // import Preloader from "./dashboard/backend/Preloader.vue"
    // import ContentHeader from "@/components/backend/ContentHeader.vue"
    // import ExampleForm from "@/components/backend/ExampleForm.vue"
    import Navbar from "@/components/backend/Navbar.vue";
    import Sidebar from "@/components/backend/Sidebar.vue";
    import Footer from "@/components/backend/Footer.vue";
    import ControlSidebar from "@/components/backend/ControlSidebar.vue"
    export default {
    name: "BackendLayout",
        components: {
            // Sidebar,
            // Navbar,
            // Preloader,
            // ContentHeader,
            // ExampleForm,
            Navbar,
            Sidebar,
            Footer,
            ControlSidebar
        },
    };
</script>

<style lang="scss" scoped>

</style>