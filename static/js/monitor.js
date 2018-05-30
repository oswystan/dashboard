(function(){
    let content = $("#main_content");
    let fetcher = new DataFetcher();
    let hide = false;
    let server_data = [];
    let request_data = [];
    let client_data = [];
    let server_threshod = {min: 0, max: 0};
    let client_threshod = {min: 0, max: 0};
    let request_threshod = {min: 0, max: 0};
    let last_req_cnt = 0;

    let _max_val = 0;
    let _min_val = 0;
    function draw(eleID, data, threshold) {
        let max_date = d3.max(data, function(d) { return d.date; });
        let min_date = d3.min(data, function(d) { return d.date; });
        let max_val = d3.max(data, function(d) { return d.val; });
        let min_val = d3.min(data, function(d) { return d.val; });

        //adjust with history value
        threshold.max  = max_val  = d3.max([max_val, threshold.max]);
        threshold.min  = min_val  = d3.min([min_val, threshold.min]);

        let svg = d3.select(eleID);
        let width = 600;
        let height = 200;
        let path = svg.select(".trend");
        let x_aixs = svg.select(".x-aixs");
        let y_aixs = svg.select(".y-aixs");
        let x = d3.scaleTime().range([0, width]).domain([min_date, max_date]);
        let y = d3.scaleLinear().range([height, 0]).domain([min_val, max_val]);

        x_aixs.attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%M:%S")).ticks(10));
        y_aixs.call(d3.axisLeft(y).ticks(10));

        x_aixs.selectAll("text").attr("style", "fill:#00b3b3");
        y_aixs.selectAll("text").attr("style", "fill:#00b3b3");

        let linePath = d3.line()
                        .x(function(d, i) {
                            return x(d.date);
                        })
                        .y(function(d) {
                            return y(d.val);
                        });
        path.attr("d", linePath(data));
    }

    function render() {
        if (hide) return;

        let html = template("template_main_monitor");
        content.html(html);
        setTimeout(get_summary, 5000);
        draw("#monitor_server", server_data, server_threshod);
        draw("#monitor_client", client_data, client_threshod);
        draw("#monitor_request", request_data, request_threshod);
    }

    function reduce_data() {
        if (server_data.length > 50) {
            server_data.splice(0,1);
        }
        if (client_data.length > 50) {
            client_data.splice(0,1);
        }
        if (request_data.length > 50) {
            request_data.splice(0,1);
        }
    }
    function get_summary() {
        if (hide) return;

        fetcher.get_summary((data)=>{
            if (data.error) {
                console.error(data);
                return;
            }
            console.log(data.data);
            server_data.push({date: new Date(), val: data.data.servers});
            client_data.push({date: new Date(), val: data.data.clients});
            let req = {date: new Date()};
            if (request_data.length == 0) {
                req.val = 0;
                last_req_cnt = data.data.requests;
            } else {
                req.val = data.data.requests - last_req_cnt;
                last_req_cnt = data.data.requests;
            }
            if (req.val < 0) {
                req.val = 0;
            }
            console.log(req.val);
            request_data.push(req);
            reduce_data();
            render();
        });
    }

    function start_monitor() {
        hide = false;
        server_data = [];
        client_data = [];
        request_data = [];
        last_req_cnt = 0;
        setTimeout(get_summary, 0);
    }
    function hideall() {
        hide = true;
    }

    event_bus.on("monitor.show", start_monitor);
    event_bus.on("hideall", hideall);
})();
