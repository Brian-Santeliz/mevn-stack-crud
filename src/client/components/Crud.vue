<template>
  <div>
    <nav class="navbar navbar-light bg-primary" style="background:#42b883 !important">
      <div class="container">
        <h3 class="navbar-brand mx-auto text-white">CRUD VUEJS</h3>
      </div>
    </nav>
  
    <div class="col-md-12 mt-4">
      <div class="container">
        <card class="card card-body">
          <form @submit.prevent="agregarRegistro">
            <div class="form-group">
              <label for="nombre">Write you name:</label>
              <input type="text" name id="nombre" class="form-control" v-model="registroNombre" />
            </div>
            <div class="form-group">
              <label for="telefono">Write you phone:</label>
              <input
                type="number"
                name
                id="telefono"
                class="form-control"
                v-model="registroTelefono"
              />
            </div>
            <button
              v-if="this.editar == false"
              class="btn btn-success btn-block mt-3 font-bold"
              type="Submit"
              style="background: #1d7d57 !important;
              border: none; !important"
            >SUBMIT</button>
            <button
              v-else
              class="btn btn-info btn-block mt-3"
              type="button"
              @click="actualizar()"
            >UPDATE</button>
          </form>
        </card>
      </div>
    </div>

    <div class="container">
      <div class="col-md-12 my-4">
        <table class="table">
          <thead v-if="registros.length > 0">
            <tr>
              <th>Name:</th>
              <th>Phone:</th>
 		          <th class="text-center">Actions:</th>
            </tr>
          </thead>
          <template v-else>
            <h3
              class="text-center p-2 mt-3 border-bottom border border-secondary"
            >The DB is empty</h3>
          </template>
          <tr
            v-for="(registro) in registros"
            v-bind:key="registro.id"
            v-bind:nombre="registro.nombre"
            v-bind:telefono="registro.telefono"
          >
            <td class="text-left">{{registro.nombre}}</td>
            <td class="text-left">{{registro.telefono}}</td>
            <td class="text-right">
              <button
                @click="editarRegistro(registro.nombre, registro.telefono, registro.id)"
                class="btn btn-info"
              ><i class="fas fa-edit"></i></button>
              <button @click="eliminarRegistro(registro.id)" class="btn btn-danger"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </table>
      </div>
    </div>

	<footer class="navbar navbar-light bg-secondary" style="background:#35495e !important">
      <div class="container d-flex justify-content-between text-white p-2">
        <span> <a class="text-white" href="https://github.com/Brian-Santeliz">Github</a> <i class="fab fa-github "></i></span>
	      <span>Brian Santeliz</span>
      </div>
  </footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      registros: [],
      id: "",
      registroNombre: "",
      registroTelefono: "",
      editar: false
    };
  },
  mounted() {
    this.obtenerRegistros();
  },
  methods: {
    obtenerRegistros() {
      axios
        .get("/registro")
        .then(res => (this.registros = res.data))
        .catch(e => console.log(e));
    },
    agregarRegistro() {
      if (this.registroNombre === "" || this.registroTelefono === "") {
        alert("Todos los campos son obligatorios");
        return;
      }
      axios
        .post("/registro", {
          nombre: this.registroNombre,
          telefono: this.registroTelefono
        })
        .then(res => {
          this.registroNombre = "";
          this.registroTelefono = "";
          this.obtenerRegistros();
        })
        .catch(e => console.log(e));
    },
    eliminarRegistro(id) {
      axios
        .delete(`/registro/${id}`)
        .then(res => {
          this.registroNombre = "";
          this.registroTelefono = "";
          this.obtenerRegistros();
        })
        .catch(e => console.log(e));
    },
    editarRegistro(registroNombre, registroTelefono, id) {
      this.id = id;
      this.registroNombre = registroNombre;
      this.registroTelefono = registroTelefono;
      this.editar = true;
    },
    actualizar() {
      axios
        .put(`/registro/${this.id}`, {
          nombre: this.registroNombre,
          telefono: this.registroTelefono
        })
        .then(res => {
          this.registroNombre = "";
          this.registroTelefono = "";
          this.editar = false;
          this.obtenerRegistros();
        })
        .catch(e => console.log(e));
    }
  }
};
</script>