var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 70));
var $U = require("url");
var open = require("open");

var action_back = ui("action_back");
var action_exit = ui("action_exit");

app.backPage = function(){
    if (wv_detail.canBack()) {
        wv_detail.back();
    } else {
        app.closePage();
    }
};

page.on("back", function(){
    app.backPage();
});

action_back.on("touch", function(){
    app.backPage();
});

action_exit.on("touch", function(){
    app.closePage();
});

var pagedata = page.getData();
var label_title = ui("label_title");
label_title.text = pagedata.title;

var action_comment = ui("action_comment");
action_comment.visible = pagedata.isComment;
action_comment.on("touch", function(){
    open.start("source://view/inform/comment.ui", pagedata);
});

var wv_detail = ui("wv_detail");
wv_detail.on("start", function(){
    pbar.visible = true;
}).on("loaded", function(){
    pbar.visible = false;
    action_exit.visible = wv_detail.canBack();
    wv_detail.rebound();
}).on("pull", function(data){
    if (data.state != 2) return;
    wv_detail.reload();
}).url = pagedata.htmlPath ? $U.prefix + pagedata.htmlPath : "source://view/inform/detail.do.html";
