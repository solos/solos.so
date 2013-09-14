var holder;

function loadLastFMTracks(username,holder_id){
    holder=holder_id;
    if (typeof holder=='undefined') holder='last_fm_tracks';
    loadJS('http://pipes.yahoo.com/pipes/pipe.run?_id=dee4ce450c3cbdcfce7ea7d0c4564120&_render=json&user='+username+'&_callback=processLast',false);
}

function loadJS(url,cache){
    //cache is true by default
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src=url;
    if (cache==false) {
        s.src+='&jpt='+ (+new Date());
    }
    document.getElementsByTagName('head')[0].appendChild(s);
}

function relative_time(time_value) {
    var time_lt1min = '不到1分钟之前';
    var time_1min = '1 分钟之前';
    var time_mins = '%1 分钟之前';
    var time_1hour = '1 小时之前';
    var time_hours = '%1 小时之前';
    var time_1day = '1 天之前';
    var time_days = '%1 天之前';
    var parsed_date = Date.parse(time_value);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
    var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
    delta = delta + (relative_to.getTimezoneOffset() * 60);
    if (delta < 60) {
        return time_lt1min;
    } else if(delta < 120) {
        return time_1min;
    } else if(delta < (60*60)) {
        return time_mins.replace('%1', (parseInt(delta / 60)).toString());
    } else if(delta < (120*60)) {
        return time_1hour;
    } else if(delta < (24*60*60)) {
        return time_hours.replace('%1', (parseInt(delta / 3600)).toString());
    } else if(delta < (48*60*60)) {
        return time_1day;
    } else {
        return time_days.replace('%1', (parseInt(delta / 86400)).toString());
    }
}
function processLast(feed){
    var tracks= feed.value.items[0].recenttracks.track;
    console.log(tracks);
    var str='';
    for (var i=0;i<10;i++){
        str += '<li><a href="http://gecimi.com/artist/' + tracks[i].artist.content + '">' + tracks[i].artist.content + '</a> - <a href="http://gecimi.com/search/song/' + tracks[i].name + '">' + tracks[i].name + '</a>';
        if(tracks[i].nowplaying) str+=' 现在在听 <img src="/static/np.gif" alt="">';
        else{
            str += ' ' + relative_time(new Date(tracks[i].date.content));
        }
        str += '</li>'
    }
    document.getElementById(holder).innerHTML=str;
}
