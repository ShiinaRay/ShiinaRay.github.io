const fetchPromise = fetch('bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise
    .then( response => {
        if (!response.ok) {
            throw new Error(`HTTP 请求错误：${response.status}`);
        }
        return response.json();
    })
    .then( json => {
        console.log(json[0].name);
    })
    .catch( error => {
        console.error(`无法获取产品列表：${error}`);
    });


//--------------------------------------------------------------------------------

const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then( responses => {
        for (const response of responses) {
            console.log(`${response.url}：${response.status}`);
        }
    })
    .catch( error => {
        console.error(`获取失败：${error}`)
    });

//--------------------------------------------------------------------------------

const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
const fetchPromise3 = fetch('bad-scheme://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then( responses => {
        for (const response of responses) {
            console.log(`${response.url}：${response.status}`);
        }
    })
    .catch( error => {
        console.error(`获取失败：${error}`)
    });


//--------------------------------------------------------------------------------

async function fetchProducts() {
    try {
        // 在这一行之后，我们的函数将等待 `fetch()` 调用完成
        // 调用 `fetch()` 将返回一个“响应”或抛出一个错误
        const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
        if (!response.ok) {
            throw new Error(`HTTP 请求错误：${response.status}`);
        }
        // 在这一行之后，我们的函数将等待 `response.json()` 的调用完成
        // `response.json()` 调用将返回 JSON 对象或抛出一个错误
        const json = await response.json();
        console.log(json[0].name);
    }
    catch(error) {
        console.error(`无法获取产品列表：${error}`);
    }
}

fetchProducts();

//--------------------------------------------------------------------------------


async function fetchProducts() {
    try {
        const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
        if (!response.ok) {
            throw new Error(`HTTP 请求错误：${response.status}`);
        }
        const json = await response.json();
        return json;
    }
    catch(error) {
        console.error(`无法获取产品列表：${error}`);
    }
}

const jsonPromise = fetchProducts();
jsonPromise.then((json) => console.log(json[0].name));



// alarm() API
//--------------------------------------------------------------------------------

const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) {
    return new Promise((resolve, reject) => {
        if (delay < 0) {
            throw new Error('Alarm delay must not be negative');
        }
        window.setTimeout(() => {
            resolve(`Wake up, ${person}!`);
        }, delay);
    });
}

button.addEventListener('click', () => {
    alarm(name.value, delay.value)
        .then(message => output.textContent = message)
        .catch(error => output.textContent = `Couldn't set alarm: ${error}`);
});


//--------------------------------------------------------------------------------


const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) {
    return new Promise((resolve, reject) => {
        if (delay < 0) {
            throw new Error('Alarm delay must not be negative');
        }
        window.setTimeout(() => {
            resolve(`Wake up, ${person}!`);
        }, delay);
    });
}

button.addEventListener('click', async () => {
    try {
        const message = await alarm(name.value, delay.value);
        output.textContent = message;
    }
    catch (error) {
        output.textContent = `Couldn't set alarm: ${error}`;
    }
});
