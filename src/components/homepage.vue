<template>
  <div class="container">
    <div class="card" style="width: 30rem;">
      <div class="card-body">
        <h5 class="card-title">Player {{test}}</h5>
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
    <div class="card" style="width: 18rem; margin-top: 10px;">
      <img class="card-img-top" src="" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">Player 1</h5>
        <h5 class="card-title">Player 2</h5>
        <h5 class="card-title">Player 3</h5>
        <p class="card-text">{{test}}</p>
        <a href="#" class="btn btn-primary"></a>
      </div>{{gamePlayPlayersRef}}
    </div>
  </div>

</template>
<script>
import { dominosRef, roomsRef, gamePlayPlayersRef } from '../firebase'

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
      test: localStorage.getItem('user'),
      room: '-L2cd9_fzpsEGcBTgWF4',
    }
  },
  created() {
    while (this.dominosUsed.length < 8) {
      var randomNumber = Math.floor(Math.random() * 28) + 1
      if (this.dominosUsed.indexOf(randomNumber) > -1) continue
      this.dominosUsed[this.dominosUsed.length] = randomNumber
    }
    if ((this.dominosUsed.length = 8)) {
      roomsRef.push({
        creator: 'idPlayer create room',
        players: [
          {
            idPlayer: localStorage.getItem('user'),
            pointBet: 1000,
          },
        ],
      })
    }
  },
  firebase: {
    dominos: dominosRef,
    rooms: roomsRef,
  },
  methods: {
    checkGamePlay(key) {
      roomsRef
        .child(key)
        .child('gameplay')
        .update({
          playerbet: {
            idPlayer: '1',
            statusBet: 'check',
            pointBet: 100,
          },
        })
      this.pointPlayer = this.pointPlayer - 100
      this.statusBet = 'You Check'
    },
    raiseGamePlay(key) {
      let betRaise = Number(this.betRaise)
      roomsRef
        .child(key)
        .child('gameplay')
        .child('playerbet')
        .child('-L2ahqtrtwvrn1yYQ1H4')
        .update({
          idPlayer: 'idPlayer creator room',
          statusBet: 'raise',
          pointBet: betRaise,
        })
      this.pointPlayer = this.pointPlayer - betRaise
      this.betRaise = ''
      this.statusBet = 'You Raise ' + betRaise + ' point'
    },
    foldGamePlay(key) {
      roomsRef.child(key).child('gameplay').child('playerbet').child('-L2ahqtrtwvrn1yYQ1H4').update({
          idPlayer : 'idPlayer creator room',
          statusBet : 'fold',
          pointBet : 100,
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
      let firstCard = ''
      let secondCard = ''
      this.room[0].players.forEach((player, idx) => {
        if (player == 'idPlayer creator room') {
          let numberPlayer = (idx + 1) * 2
          // console.log(this.dominosUsed[numberPlayer - 2], 'ini number player')
          let firstCardUsed = this.dominosUsed[numberPlayer - 1]
          let secondCardUsed = this.dominosUsed[numberPlayer - 2]
          firstCard = this.dominos[firstCardUsed]
          secondCard = this.dominos[secondCardUsed]
        }
      })
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
    },
  },
}
</script>