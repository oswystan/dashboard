(function(){
    let fetcher = new DataFetcher();
    let jq_main_server = $("#main_servers");
    let jq_client = $(".server-stat a");
    let jq_main_client = $("#main_clients");
    let jq_stream = $("#main_clients a");
    let jq_diag_mask = $("#diag_mask");
    let jq_diag = $("#diag_mask>*");

    let servers = new Map();
    let server_id = [];

    function show_diag(isShow) {
        if (isShow) {
            jq_diag_mask.css("display", "grid");
        } else {
            jq_diag_mask.hide();
        }
    }

    function get_server() {
        if (server_id.length == 0) {
            event_bus.emit("process.done");
            console.log("get_server done");
            return;
        }
        let sid = server_id.pop();
        fetcher.get_server(sid, (data)=>{
            if (data.error != 0) {
                console.error(data);
            } else {
                servers.set(sid, data.data);
            }
            get_server();
        });
    }

    function list_server() {
        console.log("list server");
        event_bus.emit("process.start", "start get servers...");
        fetcher.list_server((data)=>{
            if (data.error != 0) {
                event_bus.emit("process.done", "error: "+data.desc);
                console.error(data);
                return;
            }
            servers = new Map();
            data.data.forEach((d)=>{
                servers.set(d.id, null);
                server_id.push(d.id);
            });
            if (data.data.length != 0) {
                get_server();
            } else {
                console.log("no servers, done");
                event_bus.aemit("process.done");
            }
        });
    }

    // jq_stream.unbind('click').click(()=>{
    //     show_diag(true);
    // });
    // jq_diag_mask.unbind('click').click(()=>{
    //     show_diag(false);
    // });
    // jq_diag.unbind('click').click(()=>{
    //     return false;
    // });

    // $(document).keyup(function(e){
    //     if (e.which == 27) {
    //         show_diag(false);
    //     }
    // });

    // jq_client.unbind("click").click(function(){
    //     console.log("show client detail");
    //     jq_main_server.hide();
    //     jq_main_client.show();
    // });

    event_bus.on("server.list", list_server);
})();
