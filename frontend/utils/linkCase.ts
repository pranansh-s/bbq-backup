export default function linkCase(str: string) {
    var splitStr = str.replace(/ /g, '-').toLowerCase();
    return splitStr;
}