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


// website dynamic title
document.addEventListener('visibilitychange', function () {
    var isHidden = document.hidden;
    if (isHidden) {
        setTimeout(() => {
            document.title = '⌓‿⌓ 你看不见我。';
        }, 3000)
        ;
    } else {
        document.title = '（ ᗜ ‸ ᗜ ）被你发现了!';
        setTimeout(() => {
            document.title = 'Hi! I am ShiinaRay!';
        }, 3000)
    }
});