<template>
    <div>
    <br><br>
    <br><br>
        <div class="container">
            <div class="row">
                <div class="col s12 m8 offset-m2">
                    <div class="login card-panel black-text center">
                        <h3>Login</h3>
                        <p class="red-text">{{feedback ? feedback : null}}</p>
                        <form @submit.prevent="onLogin()">
                            <div class="input-field">
                                <i class="material-icons prefix">email</i>
                                <input v-model="email" type="email" name="" id="email">
                                <label for="email">Email</label>
                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">lock</i>
                                <input v-model="password" type="password" name="" id="password">
                                <label for="password">Password</label>
                            </div>
                            <button class="btn btn-large grey lighten-4 black-text">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import firebase from 'firebase';
    export default {
        name: 'Login',
        data() {
            return {
                email : null,
                password : null,
                feedback : null
            }
        },
        methods: {
            async onLogin() {
                try {
                   await firebase.auth().signInWithEmailAndPassword(this.email,this.password);
                   this.$router.go({path : this.$router.path});                    
                } catch (ex) {
                    this.feedback = ex.message;
                }
            }
        }
    }
</script>


<style scoped>

</style>
