(function(){
    let jq_main_server = $("#main_servers");
    let jq_client = $(".server-stat a");
    let jq_main_client = $("#main_clients");
    let jq_stream = $("#main_clients a");
    let jq_diag_mask = $("#diag_mask");
    let jq_diag = $("#diag_mask>*");

    function show_diag(isShow) {
        if (isShow) {
            jq_diag_mask.css("display", "grid");
        } else {
            jq_diag_mask.hide();
        }
    }

    jq_stream.unbind('click').click(()=>{
        show_diag(true);
    });
    jq_diag_mask.unbind('click').click(()=>{
        show_diag(false);
    });
    jq_diag.unbind('click').click(()=>{
        return false;
    });

    $(document).keyup(function(e){
        if (e.which == 27) {
            show_diag(false);
        }
    });

    jq_client.unbind("click").click(function(){
        console.log("show client detail");
        jq_main_server.hide();
        jq_main_client.show();
    });
})();
