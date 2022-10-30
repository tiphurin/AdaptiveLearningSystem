const dayjs = require('dayjs');

const genUserCode = (number) => {
    return "ET" + ('000' + number).slice(-4);
};

const genOrder = (number) => {
    const date = dayjs().format('YYMMDD');
    return `${date}${padLeadingZeros(number, 12)}`;
};

padLeadingZeros = (num, size) => {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

module.exports = {
    genUserCode,
    genOrder
}