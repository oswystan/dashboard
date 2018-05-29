
function format_number(num) {
    if (num <= 0) {
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
