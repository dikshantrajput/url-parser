const textboxNode = document.getElementsByName("url-textbox")[0]
const textNode = document.getElementsByTagName("p")[0]

const form = document.forms[0]

form.addEventListener("submit",(e)=>testURL(e))

function testURL(e){
    e.preventDefault()
    let regex = new RegExp("(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])","i")
    let textboxValue = textboxNode.value
    const flag = regex.test(textboxValue)
    if(flag){
        let parsedText = convertToAnchors(textboxValue, regex)
        textNode.innerHTML = parsedText
    }else{
        alert("Not a valid URL")
    }
}

function convertToAnchors(value, regex){
    let splittingRegex = new RegExp("[\n\r]+")
    let httpRegex = new RegExp("[http|https|ftp]")
    return value.split(splittingRegex).map(i=>{
        if(regex.test(i)){
            let url = regex.exec(i)[0]
            if(httpRegex.test(url)){
            }else{
                url = "https://" + url
            }
            return i.replace(regex,`<a href="${url}" target="blank">${url}</a>`)
        }else{
            return i
        }
    }).join(" ")
}