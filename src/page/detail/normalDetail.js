/**
 * Created by Fakin on 2018/11/9.
 */
export default function (Array) {
    let html = '';
    Array.forEach((item) => {
        if (item.type === 'text') {
            if (item.data) {
                html += `<p class="article-text">${item.data}</p>`;
            } else {
                html += `<p class="article-text">${item.data_rtf}</p>`;//这里是为了奇葩的百度新闻源，返回两种不同的格式做防错处理
            }

        }
        if (item.type === 'image') {
            html += `<img src="${item.data.original.url}" class="article-img"/>`
        }

    });
    return html
}