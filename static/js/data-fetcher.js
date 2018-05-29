class DataFetcher {
    constructor(url = location.host + "/api") {
        this.url = url;
    }

    get_summary(callback) {
        let url = this.url + "/status";

        let data =
        {
            "error" : 0,
            "desc"  : "",
            "data"  : {
                "servers"  : 2,
                "clients"  : 20,
                "requests" : 5456
            }
        }

        setTimeout(()=>{
            callback(data);
        }, 500);
    }

    list_server(callback) {
        let data =
        {
            "error" : 0,
            "desc"  : "",
            "data"  :
            [
                { "id" : "cae826838a478ae7b7d50be40cb0c31a" },
                { "id" : "e54573302cf29ab577fc7c09963673a0" },
            ]
        };

        setTimeout(()=>{
            callback(data);
        }, 500);
    }

    get_server(sid, callback) {
        let data =
        {
            "error" : 0,
            "desc"  : "",
            "data"  :
            {
                "os"            : "CentOS release 6.9 (Final)",
                "kernel"        : "2.6.32-642.el6.x86_64",
                "memory"        : 24446604,
                "cpu_cores"     : 8,
                "start_time"    : "2018-04-23T07:24:17.948Z",
                "total_client"  : 23,
                "total_request" : 334455,
                "server_ip"     : "10.1.1.1",
                "server_port"   : 7788
            }
        };

        setTimeout(()=>{
            callback(data);
        }, 500);
    }
    list_client(sid, callback) {
        let data =
        {
            "error" : 0,
            "desc"  : "",
            "data"  :
            [
                { "id" : 892381 },
                { "id" : 298491 },
                { "id" : 394841 },
                { "id" : 278494 },
                { "id" : 209384 },
                { "id" : 485733 },
                { "id" : 103845 },
                { "id" : 193848 }
            ]
        };

        setTimeout(()=>{
            callback(data);
        }, 500);
    }
    get_client(sid, cid, callback) {
        let data =
        {
            "error" : 0,
            "desc"  : "",
            "data"  :
            {
                "id"            : 9449239,
                "sdk_version"   : "v1.0",
                "user_agent"    : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
                "start_time"    : "2018-04-23T07:24:17.948Z",
                "last_msg_time" : "2018-04-23T07:25:17.948Z",
                "total_request" : 100,
                "app_id"        : "",
                "user_id"       : "",
                "streams"       :
                [
                    {
                        "type"        : "publish",
                        "client_ip"   : "",
                        "client_port" : 9999,
                        "server_ip"   : "",
                        "server_port" : 8888,
                        "audio_codec" : "",
                        "video_codec" : "",
                        "id_group"    :
                        {
                            "appId"  : "",
                            "userId" : "",
                            "confId" : "",
                            "liveId" : "",
                        }
                    },{
                        "type"        : "subscribe",
                        "client_ip"   : "",
                        "client_port" : 9999,
                        "server_ip"   : "",
                        "server_port" : 8888,
                        "audio_codec" : "",
                        "video_codec" : "",
                        "id_group"    :
                        {
                            "appId"  : "",
                            "userId" : "",
                            "confId" : "",
                            "liveId" : "",
                        }
                    }
                ]
            }
        };

        setTimeout(()=>{
            callback(data);
        }, 500);
    }
};

