import Vue from 'vue'
import VueRouter from 'vue-router'
import Issues from "@/components/Issues.vue";
import AssigenedFeedbackDetail from "@/components/AssigenedFeedbackDetail.vue";
import ToreCategoriesForFeedback from "@/components/ToreCategoriesForFeedback.vue";

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
    component: () => import(/* webpackChunkName: "about" */ '../components/Feedback.vue')
  },
  {
    path: '/tore-feedback/:item', // Hier fügen Sie den Platzhalter hinzu
    name: 'tore-feedback',
    component: ToreCategoriesForFeedback,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
