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


<!--cors problem to be solved-->
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
// }
// fansQuery();


// Axios---------------------------------------------------- // const axios = require('axios');

// 向给定ID的用户发起请求
// axios.get("https://api.bilibili.com/x/relation/stat?vmid=796556&jsonp=jsonp")
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

// fetch('products.json')
//     .then( response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then( json => initialize(json) )
//     .catch( err => console.error(`Fetch problem: ${err.message}`) );



