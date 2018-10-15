<template>
    <div id="dashboard">
        <h1>Dashboard</h1>
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>Employees</h4>
            </li>
            <li class="collection-item" v-for="employee in employees" :key="employee.id">
                <div class="chip">{{employee.dept}}</div>
                <h5> {{employee.employee_id}} : {{employee.name}}</h5>
                <router-link :to="{name: 'ViewEmployee',params: {employee_id : employee.employee_id}}">
                    <i class="fa fa-eye"></i>
                </router-link>
            </li>
        </ul>

        <div class="fixed-action-btn">
            <router-link to="/new" class="btn-floating btn-large blue">
                <i class="fa fa-plus"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
    import db from './firebaseinit';

   export default { 
        name: 'Dashboard',
        data() {
            return {
                employees: []      
            }
        },
      async created() {
        const snapshot = await db.collection('employees').orderBy('dept').get()    
        // console.log(typeof snapshot);
        snapshot.forEach(doc => {
            console.log(doc.data());
            const data = {
                'id' : doc.id,
                'employee_id' : doc.data().employee_id,
                'name' : doc.data().name,
                'dept' : doc.data().dept,
                'position' : doc.data().position
            }
            this.employees.push(data);
        });  
    }
    }
</script>


<style scoped>

</style>