const kDefaultUrl = location.host + "/api";

class DataFetcher {
    constructor(url = kDefaultUrl) {
        this.url = url;
        this.requests = 0;
    }

    data_get(url, callback) {
        url = this.url + url;
        $.get({
            url: url,
            data: null,
            success: function(res, status, xhr) {
                callback(res);
            },
        }).fail((xhr, status, err) => {
            callback({error: -1, desc: ""});
        });
    }

    get_summary(callback) {
        this.data_get("/status", callback);
    }

    list_server(callback) {
        this.data_get("/servers", callback);
    }

    get_server(sid, callback) {
        this.data_get("/servers/"+sid+"/status", callback);
    }
    list_client(sid, callback) {
        this.data_get("/servers/"+sid+"/clients", callback);
    }
    get_client(sid, cid, callback) {
        this.data_get("/servers/"+sid+"/clients/"+cid, callback);
    }
};

