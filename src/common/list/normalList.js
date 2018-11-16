/**
 * Created by Fakin on 2018/11/9.
 */
class List {
    constructor({id, title, time, comment_count, image, site}) {
        this.id = id;
        this.title = title;
        this.time = time;
        this.comment_count = comment_count;
        this.image = image;
        this.site = site;
    }
}
function normalList(list) {
    let arr = [];
    list.forEach((item) => {
        let article = new List({
            id: item.nid,
            title: item.title,
            time: item.ts,
            comment_count: item.comment_count,
            image: item.imageurls.length ? item.imageurls[0].url_webp : 'http://iph.href.lu/160x100',
            site: item.site
        });
        arr.push(article)
    });
    return arr
}

export default normalList