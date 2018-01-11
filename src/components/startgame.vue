<template>
  <div class="">
  <div class="row">
    <div class="col-sm-2 mt-4" style="margin: 60px 70px 0;">
      <div class="container">
        <div class="card card-inverse card-info">
          <ul class="list-group">
            <li class="list-group-item">
              <router-link class="navbar-brand link" :to="{ name: 'Blogdetail', params: {id: 123} }">
                Holaaa
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="container">
        <div class="card card-inverse card-info">
          <ul class="list-group">
            <li class="list-group-item">
              <router-link class="navbar-brand link" :to="{ name: 'Blogdetail', params: {id: 123} }">
                Holaaa
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="container">
        <div class="card card-inverse card-info">
          <ul class="list-group">
            <li class="list-group-item">
              <router-link class="navbar-brand link" :to="{ name: 'Blogdetail', params: {id: 123} }">
                Holaaa
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="container">
        <div class="card card-inverse card-info">
          <ul class="list-group">
            <li class="list-group-item">
              <router-link class="navbar-brand link" :to="{ name: 'Blogdetail', params: {id: 123} }">
                Holaaa
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <section id="wrapper">
      <div class="container py-3">
        <div class="row">
          <div class="col-md-12">
            <button type="button" class="btn btn-success btn-lg" :disabled="array.length <= 1" name="button">Start Game</button>
          </div>
        </div>
      </div>
    </section>
  </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      array: ['a']
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link {
  color: black;
}
.link:hover {
  color: blue;
}
#wrapper{
  width:100%;
  height:400px;
}
button{
  position:relative;
  margin: -20px -50px;
  width:100px;
  top:50%;
  left:30%;
}
.btn-lg {
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 10px;
  width:50%;
}
</style>
