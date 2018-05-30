(function(){
    let jq_main = $("#main_content>div");
    let jq_menu = $("#main_menu li");
    let jq_main_overview = $("#main_overview");
    let jq_main_server = $("#main_servers");
    let jq_main_monitor = $("#main_monitor");
    let jq_menu_overview = $("#menu_overview");
    let jq_menu_server = $("#menu_servers");
    let jq_menu_monitor = $("#menu_monitor");

    function menu_active(what) {
        jq_menu.removeAttr("active");
        $(what).attr("active", true);
    }

    jq_menu_overview.unbind('click').click(function(){
        console.log("show overview");
        jq_main.hide();
        jq_main_overview.show();
        menu_active(this);

        event_bus.aemit("overview.show");
    });
    jq_menu_server.unbind('click').click(function(){
        console.log("show server");
        // jq_main.hide();
        // jq_main_server.show();
        menu_active(this);
        event_bus.aemit("server.list");
    });
    jq_menu_monitor.unbind('click').click(function(){
        console.log("show monitor");
        jq_main.hide();
        jq_main_monitor.show();
        menu_active(this);
    });

})();
