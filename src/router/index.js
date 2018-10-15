import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/components/Dashboard';
import NewEmployee from '@/components/NewEmployee';
import ViewEmployee from '@/components/ViewEmployee';
import EditEmployee from '@/components/EditEmployee';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/new',
            name: 'NewEmployee',
            component: NewEmployee
        },
        {
            path: '/edit/:employee_id',
            name: 'EditEmployee',
            component: EditEmployee
        },
        {
            path: '/:employee_id',
            name: 'ViewEmployee',
            component: ViewEmployee
        }
    ]
});