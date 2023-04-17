export default function dataURItoBlob(dataURI) {
    // convert
    let byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // seperate out the mim componnet
    let mimString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    
    return new Blob([ia], { type: mimString });
}
