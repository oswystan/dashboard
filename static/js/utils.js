
function format_number(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function format_idgroup(idg) {
    return idg.appId + ":" + idg.userId + ":" + idg.confId + ":" + idg.liveId;
}
