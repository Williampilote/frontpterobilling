import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Server from "../views/Server.vue";
import About from "../views/About.vue";
import ("../assets/css/ostylebase.css");

Vue.use(VueRouter);
const navbar = [{
        path: "/",
        name: "Home",
        icon: "mdi-home",
    },
    {
        path: "/about",
        name: "About",
        icon: "mdi-account-box",
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "mdi-view-dashboard",
    },
];

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
    },
    {
        path: "/servers/:identifier",
        name: "Server",
        component: Server,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export { router, routes, navbar };