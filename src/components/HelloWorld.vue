<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>
    <button type="button" class="btn btn-link" @click="modalToggle()">Link</button>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>fdsfdsfdsfdsf</p>
            <i class="fa-regular fa-user"></i>
            <i class="fa-solid fa-barcode"></i>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="modalToggle">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="active" class="modal-backdrop fade show"></div>
</template>

<script>
import $ from "jquery"
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data(){
    return{
      active: false,
    }
  },
  methods:{
    modalToggle(){
      // const body = document.querySelector("body")
      // this.active = !this.active
      // this.active ? body.classList.add("modal-open") : body.classList.remove("modal-open")
      $("#exampleModal").modal("show")
    }
  }
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
