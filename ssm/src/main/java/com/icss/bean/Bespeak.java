package com.icss.bean;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class Bespeak {
    private Integer bid;

    private String bintent;

    private String baddress;

    private String bteacher;

    private String bcontents;

    private Integer bvisit;

    private Date bappotime;
    
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss") 
    private Date barritime;

    private Date bactualtime;
    
    private String bperson;

    private Integer cid;

    public Integer getBid() {
        return bid;
    }

    public void setBid(Integer bid) {
        this.bid = bid;
    }

    public String getBintent() {
        return bintent;
    }

    public void setBintent(String bintent) {
        this.bintent = bintent == null ? null : bintent.trim();
    }

    public String getBaddress() {
        return baddress;
    }

    public void setBaddress(String baddress) {
        this.baddress = baddress == null ? null : baddress.trim();
    }

    public String getBteacher() {
        return bteacher;
    }

    public void setBteacher(String bteacher) {
        this.bteacher = bteacher == null ? null : bteacher.trim();
    }

    public String getBcontents() {
        return bcontents;
    }

    public void setBcontents(String bcontents) {
        this.bcontents = bcontents == null ? null : bcontents.trim();
    }

    public Integer getBvisit() {
        return bvisit;
    }

    public void setBvisit(Integer bvisit) {
        this.bvisit = bvisit;
    }

    public Date getBappotime() {
        return bappotime;
    }

    public void setBappotime(Date bappotime) {
        this.bappotime = bappotime;
    }

    public Date getBarritime() {
        return barritime;
    }

    public void setBarritime(Date barritime) {
        this.barritime = barritime;
    }

    public Date getBactualtime() {
        return bactualtime;
    }

    public void setBactualtime(Date bactualtime) {
        this.bactualtime = bactualtime;
    }

    public String getBperson() {
		return bperson;
	}

	public void setBperson(String bperson) {
		this.bperson = bperson;
	}

	public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }
}