class DataFetcher {
    constructor(url = location.host + "/api") {
        this.url = url;
        this.requests = 0;
    }

    get_summary(callback) {
        let url = this.url + "/status";
        this.requests += Math.floor(Math.random()*1000);

        let data =
        {
            "error" : 0,
            "desc"  : "",
            "data"  : {
                "servers"  : Math.floor(Math.random()*10+1),
                "clients"  : Math.floor(Math.random()*100),
                "requests" : this.requests
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
                { "id" : "e54573302cf29ab577fc7c09963673a0" }
            ]
        };

        setTimeout(()=>{
            callback(data);
        }, 50);
    }

    get_server(sid, callback) {
        let data =
        {
            "error" : 0,
            "desc"  : "",
            "data"  :
            {
                "id"            : sid,
                "host"          : "aliyun-bj-server-1",
                "os"            : "CentOS release 6.9",
                "kernel"        : "2.6.32-642.el6.x86_64",
                "memory"        : 24446604,
                "cpu_cores"     : Math.floor(Math.random()*8)+1,
                "start_time"    : "2018-04-23T07:24:17.948Z",
                "total_client"  : Math.floor(Math.random()*100),
                "total_request" : Math.floor(Math.random()*10000),
                "server_ip"     : "10.1.1.1",
                "server_port"   : Math.floor(Math.random()*10000)
            }
        };

        setTimeout(()=>{
            callback(data);
        }, 50);
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
                "id"            : cid,
                "sdk_version"   : "v1.0",
                "user_agent"    : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
                "start_time"    : "2018-04-23T07:24:17.948Z",
                "last_msg_time" : "2018-04-23T07:25:17.948Z",
                "total_request" : Math.floor(Math.random()*10000)+1,
                "app_id"        : "whatapp",
                "user_id"       : "user-" + Math.floor(Math.random()*100),
                "streams"       :
                [
                    {
                        "type"        : "publish",
                        "client_ip"   : "10.1.1.1",
                        "client_port" : 9999,
                        "server_ip"   : "10.1.1.2",
                        "server_port" : 8888,
                        "audio_codec" : "isac/16000",
                        "video_codec" : "H.264",
                        "id_group"    :
                        {
                            "appId"  : "whatapp",
                            "userId" : "user",
                            "confId" : "conf",
                            "liveId" : "live",
                        }
                    },{
                        "type"        : "subscribe",
                        "client_ip"   : "10.1.1.1",
                        "client_port" : 9999,
                        "server_ip"   : "10.1.1.2",
                        "server_port" : 8888,
                        "audio_codec" : "isac/16000",
                        "video_codec" : "H.264",
                        "id_group"    :
                        {
                            "appId"  : "whatapp",
                            "userId" : "user1",
                            "confId" : "conf",
                            "liveId" : "live-02",
                        }
                    },{
                        "type"        : "subscribe",
                        "client_ip"   : "10.1.1.1",
                        "client_port" : 9999,
                        "server_ip"   : "10.1.1.2",
                        "server_port" : 8888,
                        "audio_codec" : "isac/16000",
                        "video_codec" : "H.264",
                        "id_group"    :
                        {
                            "appId"  : "whatapp",
                            "userId" : "user1",
                            "confId" : "conf",
                            "liveId" : "live-02",
                        }
                    }
                ]
            }
        };

        setTimeout(()=>{
            callback(data);
        }, 10);
    }
};

