// 待搜索的字符串
var text = "1/2//3// 0d 1dd 2ddd 3 4d 5ddddd 6 7ddddd8 1dd/2dd//3dd// 1u/2u//3u// 1,1,1   4,1,-2";

// 使用正则表达式匹配一个0到7之间的数字，后面跟着零个或多个小写字母d
var pattern1 = /[0-7][du]*\/[0-7][du]*\/\/[0-7][du]*\/\//g;  //   1/2//3//
var pattern2 = /[0-7],[1,2,3,4,0.5,0.25],[-1,-2,1,2,0]/g;  //   1,1,1,  note(0-7),time[1,2,3,4,0.5,0.25],tone(1,2,-1,-2,0)

var matches = text.match(pattern1);

// 输出匹配结果
if (matches) {
    matches.forEach(function(match) {
        console.log("找到了匹配项:", match);
    });
}

// 如果你想要过滤出那些至少有一个d的匹配项（除了数字本身）
var filteredMatches = matches.filter(function(match) {
    return match.length > 1 || (match.length === 1 && !isNaN(parseInt(match))); // 保留数字本身和至少有一个d的匹配项
});

// 输出至少有一个d的匹配项（