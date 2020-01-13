!function(window, $){

    console.log("bee jquery js")
    $.fn.tabs = function(){
        var context = this;

        var fn = {
            init: function(){
                initEvent();
            },
            initEvent: function(){
                var titles = context.find('.bee-tab-title-item'), contents = context.find('.bee-tab-content-item');
                context.on('click', '.bee-tab-title-item', function(){
                    var el = $(this);
                    if(el.is('.active')){
                        return;
                    }
                    var activeTile = context.find('.bee-tab-title-item.active');
                    activeTile.removeClass('active');
                    context.find('.bee-tab-content-item.active').removeClass('active');
                    var index = titles.index(activeTile);
                    titles.get(index).addClass('active');
                    contents.get(index).addClass('active');
                });
            }
        };
        fn.init();
        return this;
    }

}(window, jQuery);