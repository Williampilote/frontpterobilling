function CodeToCopy() {
    let CodeToCopy = document.querySelector("#CodeToCopy");
    CodeToCopy.setAttribute("type", "text");
    CodeToCopy.select();

    try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        alert("IP was copied " + msg);
    } catch (err) {
        alert("Oops, unable to copy");
    }

    /* unselect the range */
    CodeToCopy.setAttribute("type", "hidden");
    window.getSelection().removeAllRanges();
}
export { CodeToCopy };