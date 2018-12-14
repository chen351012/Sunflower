import render from 'clay-core';
import Sizzle from 'sizzle';

// 启动clay
let clay = render(window);

// 配置http请求
clay.config("$httpProvider", ["$browser", $browser =>
    ({
        "headers": {},
        "timeout": 7000,
        "context": "http://localhost:30000/database/",
        "request": config => config,
        "success": (data, doback) => doback(data),
        "error": (error, doback) => doback(error)
    })
]);

// 加强选择器
clay.config("$sizzleProvider", () => (selector, context) => Sizzle(selector, context));

export default clay;