(function(){
    let content = $("#main_content");
    let fetcher = new DataFetcher();
    let jq_diag_mask = $("#diag_mask");

    let servers = new Map();
    let server_id = [];
    let server_list = [];

    let clients = new Map();
    let client_id = [];
    let client_list = [];

    function show_diag(isShow) {
        if (isShow) {
            jq_diag_mask.css("display", "grid");
        } else {
            jq_diag_mask.hide();
        }
    }

    function get_server() {
        if (server_id.length == 0) {
            console.log("get_server done");
            server_list = [];
            servers.forEach((val)=>{
                server_list.push(val);
            });
            render_server();
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
        fetcher.list_server((data)=>{
            if (data.error != 0) {
                console.error(data);
                return;
            }
            servers = new Map();
            server_id = [];
            data.data.forEach((d)=>{
                servers.set(d.id, null);
                server_id.push(d.id);
            });
            if (data.data.length != 0) {
                get_server();
            } else {
                console.log("no servers, done");
            }
        });
    }

    function get_client(sid) {
        if (client_id.length == 0) {
            console.log("get client done");
            client_list = [];
            clients.forEach((val)=>{
                client_list.push(val);
            });
            render_client(sid);
            return;
        }
        let cid = client_id.pop();
        fetcher.get_client(sid, cid, (data)=>{
            if (data.error != 0) {
                console.error(data);
            } else {
                clients.set(cid, data.data);
            }
            get_client(sid);
        });
    }

    function list_client(sid) {
        console.log("list client of server", sid);
        fetcher.list_client(sid, (data)=>{
            if (data.error != 0) {
                console.error(data);
                return;
            }
            clients = new Map();
            client_id = [];
            data.data.forEach((d)=>{
                clients.set(d.id, null);
                client_id.push(d.id);
            })
            if (data.data.length != 0) {
                get_client(sid);
            } else {
                console.log("no clients");
            }
        });
    }

    function render_server() {
        let html = template("template_main_server", {format:format_number, data: server_list});
        content.html(html);
        let cli = $("#main_servers a[_server_id]");
        cli.unbind('click').click((e)=>{
            list_client($(e.target).attr("_server_id"));
        });
    }

    function render_client(sid) {
        let html = template("template_main_client", {format:format_number, data: client_list});
        content.html(html);
        let streams = $("#main_clients a[_client_id]");
        streams.unbind('click').click((e)=>{
            let cid = $(e.target).attr("_client_id");
            cid = Number.parseInt(cid);
            if (clients.has(cid) && clients.get(cid)) {
                render_stream(clients.get(cid).streams);
            }
        });
    }

    function render_stream(data) {
        let html = template("template_main_stream", {format_idgroup:format_idgroup, stream: data});
        jq_diag_mask.html(html);
        jq_diag_mask.css("display", "grid");
        jq_diag_mask.unbind('click').click(()=>{
            jq_diag_mask.hide();
        });
        $("#diag_mask>*").unbind('click').click(()=>{
            return false;
        });
    }

    event_bus.on("server.list", list_server);
})();
