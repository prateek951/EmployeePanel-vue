<template>
    <div id="view-employee">
        <h1>View Employee</h1>
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>{{name}}</h4>
            </li>
            <li class="collection-item">EmployeeID : {{employee_id}}</li>
            <li class="collection-item">Department : {{dept}}</li>
            <li class="collection-item">Position: {{position}}</li>
            <button class="btn-floating black" @click="onMoveBack()">Go back</button>
            <button class="btn-floating red" @click="onDelete()">Delete</button>
        </ul>
    </div>
</template>

<script>
    import db from './firebaseinit';
    export default {
        name: 'ViewEmployee',
        data() {
            return {
                employee_id : null,
                name: null,
                dept : null,
                position : null
            }
        },
        async beforeRouteEnter(to,from,next) {
            const snapshot = await db.collection('employees').where('employee_id','==',to.params.employee_id).get();
            snapshot.forEach(doc => {
                next(vm => {
                    vm.employee_id = doc.data().employee_id,
                    vm.name = doc.data().name,
                    vm.dept = doc.data().dept,
                    vm.position = doc.data().position
                });
            });
        },
        watch: {
            '$route' : 'fetchData'
        },
        methods: {
            async fetchData() {
                const snapshot = await db.collection('employees').where('employee_id','==',this.$route.params.employee_id).get()
                snapshot.forEach(doc => {
                        this.employee_id  = doc.data().employee_id,
                        this.name =  doc.data().name,
                        this.dept = doc.data().dept,
                        this.position = doc.data().position
                });
           },
           onMoveBack() {
               this.$router.go(-1);
           },
           async onDelete() {
               if(window.confirm('Are you sure that you want to delete ? ')) {
                  const snapshot = await db.collection('employees').where('employee_id','==',this.$route.params.employee_id).get();
                  snapshot.forEach(doc => {
                      doc.ref.delete();
                      this.$router.push('/');
                  })
               }
           }
        }
    }
</script>

<style scoped>

</style>