/**
 * Created by Fakin on 2018/11/9.
 */
class List {
    constructor({url, title, time, image, site}) {
        this.url = url;
        this.title = title;
        this.time = time;
        this.image = image;
        this.site = site;
    }
}
function normalList(list) {
    let arr = [];
    list.forEach((item) => {
        let article = new List({
            url: item.url,
            title: item.title,
            time: item.publicTime,
            image: item.imgUrl ? item.imgUrl : 'http://iph.href.lu/160x100',
            site: item.author,
        });
        arr.push(article)
    });
    return arr
}

export default normalList