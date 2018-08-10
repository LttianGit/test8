require(['jquery', 'hand', 'bscroll', 'index'], function($, hand, bscroll) {
    var myscroll = new bscroll('.content', {
        scrollX: true
    });
    var myscroll = new bscroll('.imgs', {
        scrollX: true
    });
    $.ajax({
        url: "/api/img",
        success: function(data) {
            var obj = JSON.parse(data).data;
            var source = document.querySelector('#tpl').innerHTML;
            var template = hand.compile(source);
            var html = template(obj);
            $('.list_imgs').html(html);
        }
    })
})