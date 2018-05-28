(function(){

    let _max_val = 0;
    let _min_val = Number.MAX_VALUE;
    function draw(eleID, data) {
        let max_date = d3.max(data, function(d) { return d.date; });
        let min_date = d3.min(data, function(d) { return d.date; });
        let max_val = d3.max(data, function(d) { return d.val; });
        let min_val = d3.min(data, function(d) { return d.val; });

        //adjust with history value
        _max_val  = max_val  = d3.max([max_val, _max_val]);
        _min_val  = min_val  = d3.min([min_val, _min_val]);

        let svg = d3.select(eleID);
        let width = 800;
        let height = 300;
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

    let data = [];
    setInterval(function() {
        data.push({date: new Date(), val: Math.floor(Math.random()*300) });
        if (data.length > 100) {
            data.splice(0, 1);
        }
        draw("#monitor_server", data);
        draw("#monitor_client", data);
        draw("#monitor_request", data);
    }, 1000);

})();
