package com.icss.bean;

public class Menu {
    private Integer id;

    private String text;

    private String url;

    private Integer level;

    private Boolean havanextlevel;

    private Integer upperid;

    private String quote;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text == null ? null : text.trim();
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url == null ? null : url.trim();
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Boolean getHavanextlevel() {
        return havanextlevel;
    }

    public void setHavanextlevel(Boolean havanextlevel) {
        this.havanextlevel = havanextlevel;
    }

    public Integer getUpperid() {
        return upperid;
    }

    public void setUpperid(Integer upperid) {
        this.upperid = upperid;
    }

    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote == null ? null : quote.trim();
    }
}