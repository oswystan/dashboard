(function(){
    let content = $("#main_content");

    function render(data) {
        console.log("done.");
        if (data.error != 0) {
            console.error(data);
            return;
        }
        data.data.format = format_number;
        let html = template("template_main_overview", data.data);
        content.html(html);
    }

    function format_number(num) {
        if (num == 0) {
            return "0";
        }

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

    function get_summary() {
        let fetcher = new DataFetcher();
        console.log("start fetch...");
        fetcher.get_summary(render);
    }

    event_bus.on("overview.show", get_summary);
})();
