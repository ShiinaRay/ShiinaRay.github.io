var num1 = document.getElementById("num1");
var num2 = document.getElementById("num2");
var sum = document.getElementById("sum");

num1.addEventListener("input", add);
num2.addEventListener("input", add);

function add () {
    var one = parseFloat(num1.value) || 0;
    var two = parseFloat(num2.value) || 0;

    sum.innerHTML = "your sum is:" + (one + two);
}