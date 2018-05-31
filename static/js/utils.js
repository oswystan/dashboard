
function format_number(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function format_idgroup(idg) {
    return idg.appId + ":" + idg.userId + ":" + idg.confId + ":" + idg.liveId;
}

class Threshold {
    constructor(min = 0, max = 0) {
        this.min = min;
        this.max = max;
    }
    reset(min = 0, max = 0) {
        this.min = min;
        this.max = max;
    }
};
