(function(){
    let content = $("#main_content");
    class Overview {
        constructor(servers = 0, clients = 0, requests = 0) {
            this.servers = servers;
            this.clients = clients;
            this.requests = requests;
        };

        format(num) {
            let ret = "";
            while(num > 0) {
                if (ret.length > 0) {
                    ret = num % 1000 + "," + ret;
                } else {
                    ret = num % 1000 + "";
                }
                num = Math.floor(num/1000);
            }
            return ret;
        };
    };

    let overview = new Overview(3, 2, 1234);

    function render(data) {
        let html = template("template_main_overview", overview);
        content.html(html);
    }

    event_bus.on("overview.show", render);
})();
