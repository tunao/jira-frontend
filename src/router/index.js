import Vue from 'vue'
import VueRouter from 'vue-router'
import Issues from "@/components/Issues.vue";
import IssuesDetails from "@/components/IssuesDetails.vue";
import FeedbackDetails from "@/components/FeedbackDetails.vue";
import JiraDashboard from "@/JiraDashboard.vue";
import Feedback from "@/components/Feedback.vue";
import ImportJiraProject from "@/components/ImportJiraProject.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/jira',
    redirect: "/jira/issues",
  },
  {
    path: '/jira',
    component: JiraDashboard,
    children: [
      {
        path: 'issues',
        component: Issues,
      },
      {
        path: 'issues/:item',
        name: "assigned_feedback",
        component: IssuesDetails,
        props: true,
      },
      {
        path: 'feedback',
        component: Feedback,
      },
      {
        path: 'feedback/:item',
        name: "tore_feedback",
        component: FeedbackDetails,
        props: true,
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
