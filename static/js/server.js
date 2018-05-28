(function(){
    let jq_main_server = $("#main_servers");
    let jq_client = $(".server-stat a");
    let jq_main_client = $("#main_clients");
    jq_client.unbind("click").click(function(){
        console.log("show client detail");
        jq_main_server.hide();
        jq_main_client.show();
    });
})();
