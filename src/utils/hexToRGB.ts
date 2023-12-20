//https://convertingcolors.com/blog/article/convert_hex_to_rgb_with_javascript.html

export const hextoRGB = (val: string) => {
    console.log(val)
    if (val.length != 6) {
        // throw "Only six-digit hex colors are allowed.";
        val += val
    }

    var aRgbHex = val.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
}