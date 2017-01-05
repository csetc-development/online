package com.icss.bean;

import java.util.Date;

public class Followup {
    private Integer fid;

    private String fcontent;

    private String fremind;

    private String fpeople;

    private Date ftime;

    private Date fnexttime;

    private Integer cid;

    public Integer getFid() {
        return fid;
    }

    public void setFid(Integer fid) {
        this.fid = fid;
    }

    public String getFcontent() {
        return fcontent;
    }

    public void setFcontent(String fcontent) {
        this.fcontent = fcontent == null ? null : fcontent.trim();
    }

    public String getFremind() {
        return fremind;
    }

    public void setFremind(String fremind) {
        this.fremind = fremind == null ? null : fremind.trim();
    }

    public String getFpeople() {
        return fpeople;
    }

    public void setFpeople(String fpeople) {
        this.fpeople = fpeople == null ? null : fpeople.trim();
    }

    public Date getFtime() {
        return ftime;
    }

    public void setFtime(Date ftime) {
        this.ftime = ftime;
    }

    public Date getFnexttime() {
        return fnexttime;
    }

    public void setFnexttime(Date fnexttime) {
        this.fnexttime = fnexttime;
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }
}