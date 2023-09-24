import Vue from 'vue'
import VueRouter from 'vue-router'
import Issues from "@/components/Issues.vue";
import AssigenedFeedbackDetail from "@/components/AssigenedFeedbackDetail.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Issues,
  },
  {
    path: '/assigned-feedback/:item', // Hier fügen Sie den Platzhalter hinzu
    name: 'assigned-feedback',
    component: AssigenedFeedbackDetail,
    props: true,
  },
  {
    path: '/feedback',
    name: 'feedback',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Feedback.vue')
  },
  {
    path: '/assignment',
    name: 'assignment',
    component: () => import(/* webpackChunkName: "about" */ '../components/BertAssignment.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
