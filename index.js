const url = new URL(window.location.href);
const params = url.searchParams;
let storage = [];
if (localStorage.getItem("obtainedStamps")) {
    storage = JSON.parse(localStorage.getItem("obtainedStamps"));
}

const getStampCountsSafe = () => {
    if (!storage) {
        return 0;
    }
    return storage.length;
}

const obtainStamp = (id) => {
    if (storage.every(elem => {return elem != id})) {
        storage.push(id);
        localStorage.setItem("obtainedStamps", JSON.stringify(storage));
        return true;
    }
    return false;
}

const renderArtworkPage = async (res) => {
    const rj = await res.json();

    const aw = document.getElementsByClassName("artwork")[0];

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

const artwork_page = () => {
    let id = params.get("artwork");
    if(id && RegExp(/[sd][0-9]{5}/).test(id)) {
        // 作品ページにアクセスした場合の処理
        fetch(`https://digicre.shibalab.com/event/2023-omiya/?artwork=${params.get("artwork")}`, {mode: "cors"})
        .then(res => renderArtworkPage(res))

        let obtained_flag;
        obtained_flag = obtainStamp(id);

        if (obtained_flag) {
            // 初回アクセス(スタンプ新規獲得)時のみここが実行される

        }
    }

    if (id && !RegExp(/[sd][0-9]{5}/).test(id))
        (async () => renderArtworkPage(new Object({json: () => {return false}})))();
}

const refresh_counts = () => {
    const stamps_num = document.getElementsByClassName("stamps-num")[0];
    stamps_num.innerText = getStampCountsSafe();
}

artwork_page();
refresh_counts();
