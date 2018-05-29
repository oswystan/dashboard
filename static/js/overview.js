(function(){
    let content = $("#main_content");
    let fetcher = new DataFetcher();

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

    function get_summary() {
        console.log("start fetch...");
        fetcher.get_summary(render);
    }

    event_bus.on("overview.show", get_summary);
})();
