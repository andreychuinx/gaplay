<template>
  <div>
    <label>Card :</label>
    <input type="text" v-model="card"></input>
    <label for="">Number :</label>
    <input type="text" v-model="number"></input>

    <button @click="submitDomino()">Add</button>
    <ul>
      <li v-for="(domino, idx) of dominos" :key="idx">
        <div v-if="!domino.edit">
          {{domino.card}} &nbsp {{domino.number}}
          <button @click="removeName(domino['.key'])">delete</button> &nbsp
          <button @click="editName(domino['.key'])">Edit</button>
        </div>
        <div v-else>
          <label>Card :</label>
          <input type="text" v-model="domino.card"></input>
          <label for="">{Number} :</label>
          <input type="text" v-model="domino.number"></input>
          <button @click="saveEdit(domino)">save</button>
          <button @click="cancelEdit(domino['.key'])">Cancel</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { dominosRef } from '../firebase'

export default {
  data() {
    return {
      dominos: {},
      number: '',
      card: '',
    }
  },

  firebase: {
    dominos: dominosRef,
  },
  methods: {
    submitDomino() {
      dominosRef.push({ number: this.number, card: this.card })
      this.number = ''
      this.card = ''
    },
    removeName(key) {
      dominosRef.child(key).remove()
    },
    editName(key) {
      dominosRef.child(key).update({ edit: true })
    },
    cancelEdit(key) {
      dominosRef.child(key).update({ edit: false })
    },
    saveEdit(person) {
      const key = person['.key']
      dominosRef.child(key).set({ name: person.name, edit: false })
    },
  },
}
</script>