package com.pbz.demo.hello.model;

public class SubtitleModel {
    public int num;
    public int star;
    public int end;
    public String contextEng = "";
    public String contextCh = "";

    public String lastText = ""; // 上一句
    public String nextText = ""; // 下一句

    public String toString() {
        StringBuilder out = new StringBuilder();
        out.append(num).append(":").append("(").append(star).append(",").append(end).append(") ").append(contextEng)
                .append(contextCh);
        return out.toString();
    }
}
