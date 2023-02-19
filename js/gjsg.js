// Block rightClick
function stop() {
    return false;
}
document.oncontextmenu = stop;

//classic event block (element selected)
// noContext = document.getElementById('noContextMenu');
// noContext.addEventListener('contextmenu', e => {
//     e.preventDefault();
// });

// Axios----------------------------------------------------
// axios({
//     url: 'https://shiinaray-api.vercel.app/stat?vmid=796556',
//     method: 'get',
//     params: {
//         callback: 'jsonpCallback'
//     },
//     responseType: 'jsonp'
// }).then(function(response) {
//     var fansCount = response.data.follower;
//     document.getElementById('fans-count').innerHTML = '粉丝数：' + fansCount;
// }).catch(function(error) {
//     console.log(error);
// });

<!--cors problem-->
// // 指定代理服务器的地址和端口
// const proxyUrl = 'https://shiinaray-api.vercel.app';
// // 创建Vue实例
// const app = new Vue({
//     el: '#app',
//     data: {
//         items: [],
//     },
//     mounted() {
//         // 创建Axios实例
//         const axiosInstance = axios.create({
//             baseURL: proxyUrl,
//         });
//
//         // 发送请求
//         axiosInstance.get('/stat?vmid=796556').then((response) => {
//             this.items = response.data;
//         });
//     },
// });

// Axios---------------------------------------------------- // const axios = require('axios');
// 向给定ID的用户发起请求
// axios.get('/stat?vmid=796556')
//     .then(function (response) {
//         // 处理成功情况
//         console.log(response);
//     })
//     .catch(function (error) {
//         // 处理错误情况
//         console.log(error);
//     })
//     .finally(function () {
//         // 总是会执行
//     });
//
// // 上述请求也可以按以下方式完成（可选）
// axios.get('/stat', {
//     params: {
//         vmid: 796556
//     }
// })
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     })
//     .finally(function () {
//         // 总是会执行
//     });
//
// // 支持async/await用法
// async function getUser() {
//     try {
//         const response = await axios.get('/stat?vmid=796556');
//         console.log(response);
//     } catch (error) {
//         console.error(error);
//     }
// }

// Axios----------------------------------------------------
// import axios from "axios";
// import { startLoading, endLoading } from "../common/Loading";
// export function request(config) {
//     const instance = axios.create({
//         // baseURL: "/api",
//         // baseURL: "http://localhost:3001",
//         baseURL: "https://shiinaray-api.vercel.app/",
//         timeout: 30000,
//         withCredentials: true,
//     });
//
//     // 请求拦截
//     instance.interceptors.request.use(
//         config => {
//             if (config.url != "/login/qr/check") {
//                 startLoading();
//             }
//             return config;
//         },
//         error => {
//             return Promise.reject(error);
//         }
//     );
//     // 响应拦截
//     instance.interceptors.response.use(
//         response => {
//             endLoading();
//             return response;
//         },
//         error => {
//             endLoading();
//             return Promise.reject(error);
//         }
//     );
//     instance.defaults.withCredentials = true;
//     return instance(config);
// }
// // 下载音乐
// export function downloadMusic(config) {
//     const instance = axios.create({
//         timeout: 30000,
//         responseType: "blob",
//     });
//
//     // 请求拦截
//     instance.interceptors.request.use(
//         config => {
//             startLoading("准备下载...");
//             return config;
//         },
//         error => {
//             return Promise.reject(error);
//         }
//     );
//
//     // 响应拦截
//     instance.interceptors.response.use(
//         response => {
//             endLoading();
//             return response;
//         },
//         error => {
//             endLoading();
//             return Promise.reject(error);
//         }
//     );
//     return instance(config);
// }

// XMLHttpRequest  ----------------------------------------------------
// function fansQuery() {
//     var ajax = new XMLHttpRequest();
//     ajax._url = "https://api.bilibili.com/x/relation/stat?vmid=796556";
//     ajax.open("GET", ajax._url, true);
//     ajax.send(null);
//     ajax.onreadystatechange = function () {
//         if (ajax.readyState === 4) {
//         let ajax_f = ajax.responseText;
//         let ajax_z = JSON.parse(ajax_f);
//         let xianshi = document.getElementById("fensi");
//         xianshi.innerHTML = "现在共有" + ajax_z.fensishu + "只鸽总";
//         }
//     }
//     setTimeout(() => {
//     fansQuery();
//     }, 30000)
//     ajax.send(null);
// }
// fansQuery();


// XMLHttpRequest  ----------------------------------------------------
// const request = new XMLHttpRequest();
// request.open('GET', 'products.json');
// request.responseType = 'json';
//
// request.onload = function() {
//     if(request.status === 200) {
//         let products = request.response;
//         initialize(products);
//     } else {
//         console.log('Network request for products.json failed with response ' + request.status + ': ' + request.statusText)
//     }
// };
//
// request.send();

// fetch ----------------------------------------------------
// fetch(url)
//     .then( response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error: ${response.status}`);
//         }
//         return response.text();
//     })
//     .then( text => poemDisplay.textContent = text )
//     .catch( error => poemDisplay.textContent = `Could not fetch verse: ${error}`);

// fetch ----------------------------------------------------
// fetch('products.json')
//     .then( response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then( json => initialize(json) )
//     .catch( err => console.error(`Fetch problem: ${err.message}`) );
