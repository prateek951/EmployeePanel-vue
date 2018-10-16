<template>
    <div id="new-employee">
        <h1>New Employee</h1>
        <div class="row">
            <form @submit.prevent="onSave()" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="employee_id" required>
                        <label for="">Employee ID#</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                        <label for="">Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="dept" required>
                        <label for="">Department</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="position" required>
                        <label for="">Position</label>
                    </div>
                </div>
                <button type='submit' class="btn">Add</button>
                <button class="btn btn-floating" @click="onMoveBack()">Go back</button>
            </form>
        </div>

    </div>
</template>

<script>
    import db from './firebaseinit';
    export default {
        name: 'NewEmployee',
        data() {
            return {
                employee_id : null,
                name : null,
                dept : null,
                position : null
            }
        },
        methods: {
           onSave()  {
                db.collection('employees').add({
                    employee_id : this.employee_id,
                    name : this.name,
                    dept : this.dept,
                    position : this.position
                }).then(ref => {
                    this.$router.push('/');
                }).catch(err => console.log(err))
                
            },
            onMoveBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>