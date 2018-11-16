/**
 * Created by Fakin on 2018/11/8.
 */
const config = {
    CateData(id, name){
        return {
            from: 'news_webapp',
            pd: 'webapp',
            os: 'iphone',
            mid: id,
            ver: 6,
            category_id: 101,
            category_name: name || '',
            action: 1,
            display_time: new Date().getTime(),
            wf: 0
        }

    },
    DetailData(id){
        return {
            cuid: '',
            nids: id,
            wf: '1',
            remote_device_type: '1',
            os_type: "2",
            screen_size_width: document.documentElement.clientWidth,
            screen_size_height: document.documentElement.clientHeight
        }
    },
    Related(id){
        return {
            nid: id,
            from: 'info',
            pd: 'webapp',
            ver: 5
        }
    },
    Comments(id){
        return {
            nid: id,
            from: 'info',
            pd: 'webapp',
            comment_id: 0,
            order: 'time',
            ver: 3,
            pn: 10,
            ts: new Date().getTime(),
        }
    },
    normalTime(time){
        // console.log(time)
        function Supplement(s) {
            return (s < 10) ? '0' + s : s
        }

        //格式化时间
        let _time = parseInt(time);
        const date = new Date(_time);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return year + '年' + month + "月" + day + "日" + Supplement(hours) + ":" + Supplement(minutes) + ":" + Supplement(seconds)

    },
    normalTimer(_date){
        let _time = new Date(parseInt(_date)) / 1000;
        let nowTime = Math.floor(new Date().getTime() / 1000);
        const time = Math.floor((nowTime - _time));
        const dTime = Math.floor(time / 3600);
        //格式化时间
        const date = new Date(_time * 1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        let str = "";
        if (dTime < 1) {
            if (Math.ceil(time / 60) < 3) {
                str = "刚刚"
            } else {
                str = Math.ceil(time / 60) + "分钟前"
            }

        } else if (dTime < 24) {
            str = dTime + "小时前";
        } else if (dTime < 48) {
            str = "一天前";
        } else if (dTime < 72) {
            str = "两天前";
        } else if (dTime > 72) {
            str = year + "年" + month + "月" + day + "日"
        }

        return str
    }
};
export default config