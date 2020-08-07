<template>
  <div class="container mt-3 p-2">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <h1>CRUD VUEJS</h1>
        <form v-on:submit.prevent="agregarRegistro">
          <div class="form-group">
            <label for="nombre">Escribe tu nombre:</label>
            <input type="text" name id="nombre" class="form-control" v-model="registroNombre" />
          </div>
          <div class="form-group">
            <label for="telefono">Escribe tu telefono:</label>
            <input type="number" name id="telefono" class="form-control" v-model="registroTelefono" />
          </div>
          <button
            v-if="this.editar == false"
            class="btn btn-primary btn-block mt-3"
            type="Submit"
          >ENVIAR</button>
          <button
            v-else
            class="btn btn-success btn-block mt-3"
            type="button"
            v-on:click="actualizar()"
          >ACTUALIZAR</button>
        </form>
        <table class="table">
          <thead>
            <tr>
              <th>Nombre:</th>
              <th>Telefono:</th>
            </tr>
          </thead>
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
                v-on:click="editarRegistro(registro.nombre, registro.telefono, registro.id)"
                class="btn btn-info"
              >Editar</button>
              <button v-on:click="eliminarRegistro(registro.id)" class="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
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
    editarRegistro(registroNombre, registroTelefono, id){
        this.id = id;
        this.registroNombre = registroNombre;
        this.registroTelefono = registroTelefono;
        this.editar = true
    },
    actualizar(){
        axios.put(`/registro/${this.id}`,{
            nombre:this.registroNombre,
            telefono:this.registroTelefono
        })
            .then((res=>{
                this.registroNombre = ''
                this.registroTelefono = ''
                this.editar = false
                this.obtenerRegistros()
            }))
            .catch(e=>console.log(e))
    }

  }
};
</script>