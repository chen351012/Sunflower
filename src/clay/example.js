import clay from './index';

clay.component("example", ["$browser", function ($browser) {
    return {
        "beforeCreate": function (element) {
            console.log("beforeCreate...", element, this);
        },
        "beforeDestory": function (element) {
            console.log("beforeDestory...", element, this);
        },
        "link": function (element, $scope) {

            console.log(this);

            // 设置画布大小
            element.attr('width', '900').attr('height', '100');

            // 配置画笔
            var layerManger = clay('canvas').layer();
            clay.canvas.text(layerManger.painter("title")).setColor('red')(450, 20, $scope.title);

            var rect = clay.canvas.rect(layerManger.painter("rect"), {
                "fillStyle": "blue"
            })
                .setSize(40)
                .setType("LR");

            var drawLine = function (od, nd) {
                clay.animation(function (deep) {
                    layerManger.clean("rect");
                    rect(50, 65, ((nd - od) * deep + od) * 80).fill();
                    layerManger.update();
                }, 900);
            };

            drawLine(0, $scope.value);

            // 监听数据改变
            $scope.$watch("value", function (newdata, olddata) {
                drawLine(olddata, newdata);
            });
        }
    };
}]);

export default (node, config) => clay(node).use('example', config);
