document.addEventListener("DOMContentLoaded", function() {
    var pmh_failedImages = JSON.parse(localStorage.getItem('tgh_failedImages')) || [];

    function handleFailedImages() {
        var images = document.querySelectorAll(".markdown-body img");
        images.forEach(function(img) {
            var src = img.src;
            if (pmh_failedImages.includes(src)) {
                img.style.display = 'none'; // 隐藏已知加载失败的图片
            } else {
                (function(img, src) {
                    var testImg = new Image();
                    testImg.onload = function() {
                        // 图片加载成功，保持显示
                    };
                    testImg.onerror = function() {
                        // 图片加载失败，记录失败图片并隐藏
                        pmh_failedImages.push(src); // 添加到失败列表中
                        localStorage.setItem('tgh_failedImages', JSON.stringify(pmh_failedImages));
                        img.style.display = 'none'; // 隐藏失败的图片
                    };
                    testImg.src = src; // 触发加载
                })(img, src);
            }
        });
    }

    setTimeout(function() {
        handleFailedImages();
    }, 1500); // 延迟0.5秒执行处理函数，确保页面加载完成
});







// 写法二
// 立即开始观察 DOM 变化
// var failedImages = JSON.parse(localStorage.getItem('failedImages')) || [];

// function handleImage(img) {
//     var src = img.src;
//     if (failedImages.includes(src)) {
//         img.style.display = 'none'; // 隐藏已知加载失败的图片
//     } else {
//         var testImg = new Image();
//         testImg.onload = function() {
//             // 图片加载成功，保持显示
//         };
//         testImg.onerror = function() {
//             // 图片加载失败，记录失败图片并隐藏
//             failedImages.push(src); // 添加到失败列表中
//             localStorage.setItem('failedImages', JSON.stringify(failedImages));
//             img.style.display = 'none'; // 隐藏失败的图片
//         };
//         testImg.src = src; // 触发加载
//     }
// }

// function handleFailedImages() {
//     var images = document.querySelectorAll(".markdown-body img");
//     images.forEach(function(img) {
//         handleImage(img);
//     });
// }

// // 初始处理现有的图片
// handleFailedImages();

// // 使用 MutationObserver 监视 DOM 变化
// var observer = new MutationObserver(function(mutations) {
//     mutations.forEach(function(mutation) {
//         if (mutation.type === 'childList') {
//             mutation.addedNodes.forEach(function(node) {
//                 if (node.nodeType === 1) { // 确保是元素节点
//                     if (node.tagName === 'IMG') {
//                         handleImage(node);
//                     } else {
//                         var imgs = node.querySelectorAll("img");
//                         imgs.forEach(function(img) {
//                             handleImage(img);
//                         });
//                     }
//                 }
//             });
//         }
//     });
// });

// observer.observe(document.querySelector('.markdown-body'), {
//     childList: true,
//     subtree: true
// });
