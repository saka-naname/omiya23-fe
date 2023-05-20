let url = new URL(window.location.href);
let params = url.searchParams;

const renderArtworkPage = async (res) => {
    const rj = await res.json();

    const aw = document.getElementById("artwork");

    if (rj == false) {
        const errText = document.createElement("span");
        errText.innerText = "お探しのコンテンツは見つかりませんでした．";
        aw.appendChild(errText);
        return;
    }

    const title = document.createElement("h1");
    title.innerText = rj.title;
    title.classList = "title";

    const introduction = document.createElement("p");
    introduction.innerText = rj.introduction;
    introduction.classList = "introduction";

    const img = document.createElement("img");
    img.src = rj.image_url;
    img.classList = "image";

    aw.appendChild(img);
    aw.appendChild(title);
    aw.appendChild(introduction);
}

// if (params.get("artwork")) {
//     let id = params.get("artwork");
//     // if (RegExp(/[sd][0-9]{5}/).test(id)) {
//         (async () => renderArtworkPage(id));
        
//     // }
// }

let id = params.get("artwork");

if(id && RegExp(/[sd][0-9]{5}/).test(id))
    fetch(`https://digicre.shibalab.com/event/2023-omiya/?artwork=${params.get("artwork")}`, {mode: "cors"})
    .then(res => renderArtworkPage(res))
if (id && !RegExp(/[sd][0-9]{5}/).test(id))
    (async () => renderArtworkPage(new Object({json: () => {return false}})))();
