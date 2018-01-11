<template>
  <div class="container">
    <div class="card" style="width: 30rem;">
      <div class="card-body">
        <h5 class="card-title">Player 1</h5>
        <div class="row">
          <div class="col-md-4">
            <div class="row">
              <div class="col-md-12">
                <p style="font-size: 60px;" v-if="loaded">
                   {{firstCard}} {{secondCard}} {{cardCount}}
                </p>
                <p v-else>
                  <button @click="myDomino('-L2a_su7ETDM2oO6nvQG')">Show Card</button>
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
                <button type="button" class="btn btn-success" @click="checkGamePlay('-L2a_su7ETDM2oO6nvQG')" :disabled="disabledButton">CHECK</button>
                <button type="button" class="btn btn-danger" :disabled="disabledButton" @click="foldGamePlay('-L2a_su7ETDM2oO6nvQG')">FOLD</button>
              </div>
            </div>
            <div class="row" style="margin-top: 10px">
              <div class="col-md-12">
                <div class="form-row">
                  <div class="form-group col-md-8">
                    <input type="text" class="form-control" id="inputCity" placeholder="Raise Here" v-model="betRaise">
                  </div>
                  <div class="form-group col-md-4">
                    <button type="button" class="btn btn-primary" @click="raiseGamePlay('-L2a_su7ETDM2oO6nvQG')" :disabled="disabledButton">RAISE</button>

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
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>secondCard
    </div>
  </div>

</template>
<script>
import { dominosRef, roomsRef } from '../firebase'

export default {
  data() {
    return {
      loaded: false,
      dominos: {},
      gamePlay: {},
      name: '',
      dominosUsed: [],
      room: {},
      secondCard : '',
      firstCard: '',
      cardCount : null,
      pointPlayer : 1000,
      betRaise : '',
      statusBet : '',
      disabledButton : false
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
          'idPlayer creator room',
          'idPlayer yang di invite 1',
          'idPlayer yang di invite 2',
          'idPlayer yang di invite 3',
        ],
        gameplay: {
          dominosUsed: this.dominosUsed,
          
        },
      })
    }
  },
  firebase: {
    dominos: dominosRef,
    room: roomsRef,
  },
  methods: {
    checkGamePlay(key){
      roomsRef.child(key).child('gameplay').update({
        playerbet : {
          idPlayer : 'idPlayer creator room',
          statusBet : 'check',
          pointBet : 100,
        }
      })
      this.pointPlayer = this.pointPlayer - 100
      this.statusBet = 'You Check'
    },
    raiseGamePlay(key){
      let betRaise = Number(this.betRaise)
      roomsRef.child(key).child('gameplay').child('playerbet').child('-L2ahqtrtwvrn1yYQ1H4').update({
          idPlayer : 'idPlayer creator room',
          statusBet : 'raise',
          pointBet : betRaise,
      })
      this.pointPlayer = this.pointPlayer - betRaise
      this.betRaise = ''
      this.statusBet = 'You Raise ' + betRaise + ' point'
    },
    foldGamePlay(key){
      roomsRef.child(key).child('gameplay').child('playerbet').child('-L2ahqtrtwvrn1yYQ1H4').update({
          idPlayer : 'idPlayer creator room',
          statusBet : 'fold',
          pointBet : 100,
      })
      this.statusBet = 'You Fold'
      this.disabledButton = true
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
      if(countCard >= 20){
        this.cardCount = countCard - 20
      }else if(countCard >= 10){
        this.cardCount = countCard - 10
      }else{
        this.cardCount = countCard
      }
    },
  },
  
}
</script>