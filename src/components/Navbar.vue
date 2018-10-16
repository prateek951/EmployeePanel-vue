<template>
    <nav>
        <div class="nav-wrapper black">
            <div class="container">
                <router-link to="/" class="brand-logo left">Employee Manager</router-link>
                <ul class="right">
                    <li v-if="isLoggedin"><span class="email">{{currentUser}}</span></li>
                    <li v-if="isLoggedin"><router-link to="/">Dashboard</router-link></li>
                    <li v-if="!isLoggedin"><router-link to="/login">Login</router-link></li>
                    <li v-if="!isLoggedin"><router-link to="/register">Register</router-link></li>
                    <li><button v-if="isLoggedin" class="btn black" @click="onLogout()">Logout</button></li>
                </ul>
            </div>
        </div>          
    </nav>
</template>

<script>
    import firebase from 'firebase';
    export default {
        name: 'Navbar',
        data() {
            return {
                isLoggedin : false,
                currentUser: null
            }
        },
        created() {
            if(firebase.auth().currentUser) {
                this.isLoggedin = true;
                this.currentUser = firebase.auth().currentUser.email;
            }
        },
        methods: {
            async onLogout() {
                await firebase.auth().signOut();
                this.isLoggedin = false;
                this.$router.go({path: this.$router.path});
            }   
        }
    }
</script>

<style scoped>

</style>