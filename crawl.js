const {JSDOM} = require('jsdom')

function getUrlsFromHtml(htmlBody,baseUrl){
    const urls=[];
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a');
    for(const linkElement of linkElements){
        if(linkElement.href.slice(0,1) === '/'){
            //relative
            try{
                const urlObj = new URL(`${baseUrl}${linkElement.href}`)
                urls.push(urlObj.href)
            }
            catch(err){
                console.log(`error with relative urls: ${err.message}`)
            }
        }
        else{//absolute
            try{
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            }
            catch(err){
                console.log(`error with absolute urls: ${err.message}`)
            }
        }
       
    }
    return urls;
}

function normaliseURL(urlString){
    const urlObj = new URL(urlString);
    const hostPath =  `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1);
    }
    return hostPath;
}

module.exports = {
    normaliseURL,
    getUrlsFromHtml
}