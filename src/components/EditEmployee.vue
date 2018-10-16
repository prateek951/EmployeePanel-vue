<template>
    <div id="edit-employee">
        <h1>Edit Employee</h1>
        <div class="row">
            <form @submit.prevent="onUpdate()" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="employee_id" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="dept" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="position" required>
                    </div>
                </div>
                <button type='submit' class="btn">Edit</button>
                <button class="btn btn-floating" @click="onMoveBack()">Go back</button>
            </form>
        </div>

    </div>
</template>

<script>
   import db from './firebaseinit';
    export default {
        name: 'EditEmployee',
        data() {
            return {
                employee_id : null,
                name :  null,
                dept : null,
                position : null
            }
        },
        async beforeRouteEnter (to, from, next) {
            const snapshot = await db.collection('employees').where('employee_id','==',to.params.employee_id).get()
            snapshot.forEach(doc => {
                next(vm => {
                    vm.employee_id = doc.data().employee_id;
                    vm.name = doc.data().name;
                    vm.dept = doc.data().dept;
                    vm.position = doc.data().position;
                });
            });
       },
       watch: {
           '$route' : 'fetchData'
       },
       methods : {
           async fetchData() {
             const snapshot =   await db.collection('employees').where('employee_id','==',this.$route.params.employee_id)
             snapshot.forEach(doc => {
                 this.employee_id = doc.data().employee_id;
                 this.name = doc.data().name;
                 this.dept = doc.data().dept;
                 this.position = doc.data().position;
             });
           },
           async onUpdate() {
              const snapshot = await db.collection('employees').where('employee_id','==',this.$route.params.employee_id).get()
              snapshot.forEach(doc => {
                  doc.ref.update({
                      employee_id : this.employee_id,
                      name : this.name,
                      dept : this.dept,
                      position : this.position
                  });
              });
              this.$router.push({name: 'ViewEmployee',params: {employee_id : this.employee_id}});
          },
          onMoveBack() {
              this.$router.go(-1);
          }
       }    
       
    }
</script>

<style scoped>

</style>