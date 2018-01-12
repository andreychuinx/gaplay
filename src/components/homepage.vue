<template>
  <div class="container">
    <div class="card" style="width: 50rem; margin-top: 10px;">
      <div class="card-body" v-for="(user, idx) in users">
        <h3>{{user.name}}</h3>
        <div v-if="rooms[0].gameplay">
          <div v-if="rooms[0].gameplay.playerbet[user.name]">
            <span>{{rooms[0].gameplay.playerbet[user.name].statusBet}}</span>
            <span>{{rooms[0].gameplay.playerbet[user.name].pointBet}} Point</span>
          </div>
        </div>

      </div>
      <div>
        <button @click="getWinner()">Whos Winner?</button>
      </div>
    </div>
    <div class="card" style="width: 30rem;">
      <div class="card-body">
        <h5 class="card-title">{{user.displayName}}</h5>
        <div class="row">
          <div class="col-md-4">
            <div class="row">
              <div class="col-md-12">
                <p style="font-size: 60px;" v-if="loaded">
                  {{firstCard}} {{secondCard}} {{cardCount}}
                </p>
                <p v-else>
                  <button @click="myDomino(room)">Show Card</button>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-8 text-center">
            <div class="row">
              <div class="col-md-12">
                You Have {{this.pointPlayer}} Points
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button type="button" class="btn btn-success" @click="checkGamePlay(room)" :disabled="disabledButton">CHECK</button>
                <button type="button" class="btn btn-danger" :disabled="disabledButton" @click="foldGamePlay(room)">FOLD</button>
              </div>
            </div>
            <div class="row" style="margin-top: 10px">
              <div class="col-md-12">
                <div class="form-row">
                  <div class="form-group col-md-8">
                    <input type="text" class="form-control" id="inputCity" placeholder="Raise Here" v-model="betRaise">
                  </div>
                  <div class="form-group col-md-4">
                    <button type="button" class="btn btn-primary" @click="raiseGamePlay(room)" :disabled="disabledButton">RAISE</button>

                  </div>
                  <div class="col-md-12">
                    {{statusBet}}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
import { dominosRef, roomsRef, usersRef } from '../firebase'

export default {
  data() {
    return {
      loaded: false,
      dominos: {},
      gamePlay: {},
      name: '',
      dominosUsed: [],
      rooms: {},
      secondCard: '',
      firstCard: '',
      cardCount: null,
      pointPlayer: 1000,
      betRaise: '',
      statusBet: '',
      disabledButton: false,
      room: '-L2dHUhMmPJidceaCi6E',
      users: {},
      user: JSON.parse(localStorage.getItem('user')),
    }
  },
  created() {
    localStorage.setItem('userId', '1')
    while (this.dominosUsed.length < 4) {
      var randomNumber = Math.floor(Math.random() * 28) + 1
      if (this.dominosUsed.indexOf(randomNumber) > -1) continue
      this.dominosUsed[this.dominosUsed.length] = randomNumber
    }
  },
  firebase: {
    dominos: dominosRef,
    rooms: roomsRef,
    users: usersRef,
  },
  methods: {
    getWinner() {
      const getWinner = function(arr, totalBet) {
        var max = arr.reduce(function(a, b) {
          return Math.max(a, b)
        })
        let playerWin = []
        arr.forEach((card, players) => {
          if (card == max) {
            playerWin.push(players)
          }
        })
        let dapat = Math.round(totalBet / playerWin.length)
        return {
          players: playerWin,
          getPoint: dapat,
        }
      }
    },
    checkGamePlay(key) {
      let name = JSON.parse(localStorage.getItem('user'))
      roomsRef
        .child(key)
        .child(`gameplay/playerbet/${name.displayName}/`)
        .set({
          namaPlayer: this.user.displayName,
          statusBet: 'check',
          pointBet: 100,
        })
        .then(result => {
          localStorage.setItem('idGamePlayUser', result.key)
        })
      this.pointPlayer = this.pointPlayer - 100
      this.statusBet = 'You Check'
    },
    raiseGamePlay(key) {
      let betRaise = Number(this.betRaise)
      let name = JSON.parse(localStorage.getItem('user'))
      roomsRef
        .child(key)
        .child(`gameplay/playerbet/${name.displayName}/`)
        .set({
          namaPlayer: this.user.displayName,
          statusBet: 'raise',
          pointBet: betRaise,
        })
        .then(result => {
          localStorage.setItem('idGamePlayUser', result.key)
        })
      this.pointPlayer = this.pointPlayer - betRaise
      this.betRaise = ''
      this.statusBet = 'You Raise ' + betRaise + ' point'
    },
    foldGamePlay(key) {
      roomsRef
        .child(key)
        .child('gameplay')
        .child('playerbet')
        .child('-L2ahqtrtwvrn1yYQ1H4')
        .update({
          idPlayer: 'idPlayer creator room',
          statusBet: 'fold',
          pointBet: 100,
        })
      this.statusBet = 'You Fold'
      this.disabledButton = true
      // roomsRef.child(key).child('players').push({
      //       idPlayer: '2',
      //       pointBet: 1000,
      // })
    },
    myDomino(key) {
      let player = 4
      let firstCard = this.dominos[this.dominosUsed[0]]
      let secondCard = this.dominos[this.dominosUsed[1]]
      this.firstCard = firstCard.card
      this.secondCard = secondCard.card
      this.loaded = true
      let numberFirstCard = Number(firstCard.number)
      let numberSecondCard = Number(secondCard.number)
      let countCard = numberFirstCard + numberSecondCard
      if (countCard >= 20) {
        this.cardCount = countCard - 20
      } else if (countCard >= 10) {
        this.cardCount = countCard - 10
      } else {
        this.cardCount = countCard
      }
      if()
      roomsRef.child(`${key}/gameplay/bulkCountCard`).set(this.cardCount)
    },
    logOut() {
      var database = firebase.database()
      let user = JSON.parse(localStorage.getItem('user'))
      database.ref('user/' + user.uid).remove()
      this.$router.push('/')
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  },
}
</script>