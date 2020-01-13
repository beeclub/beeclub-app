!(function(w, $) {
  /**
   * {
   *  data:[{url:,img:,name:"",color:""}]
   * }
   */
  $.fn.banner = function(options) {
    var wrapper = this;
    var content = wrapper.find(".banner-slide"),
      dots = wrapper.find(".banner-slide-dots"),
      data = options.data || [],
      defaultActive = options.defaultActive || 0,
      period = options.period || 5000,
      isLoop = options.isLoop || true;
    var fn = {
      init: function() {
        fn.initDom();
        fn.initEvent();
      },
      initDom: function() {
        content.empty();
        dots.empty();
        for (var i in data) {
          var activeClass = "";
          if (defaultActive == i) {
            activeClass = "active";
            wrapper.css({ backgroundColor: "#FCD6AE" });
          }
          content.append(
            $(
              '<li style="background-color:'+ data[i].backgroundColor +';" class="' +
                activeClass +
                '"><a target="_blank" href="' +
                data[i].url +
                '"><div><div> <img src="' +
                data[i].img +
                '" alt="' +
                data[i].name +
                '"></div></div></a></li>'
            )
          );
          dots.append($('<span class="' + activeClass + '"></span>'));
        }
      },
      switchActive: function(index) {
        content.find("li.active").removeClass("active");
        $(content.children().get(index)).addClass("active");
        dots.find("span.active").removeClass("active");
        $(dots.children().get(index)).addClass("active");
        wrapper.css({ backgroundColor: data[index].backgroundColor });
      },
      prevOrNext: function(offset) {
        var index = dots.children().index(dots.find("span.active")) + offset;
        if (index >= data.length) {
          index = 0;
        }
        if (index < 0) {
          index = data.length - 1;
        }
        fn.switchActive(index);
      },
      initEvent: function() {
        dots.on("click", "span", function() {
            var el = $(this);
                fn.switchActive(dots.children().index(el));
        });
        wrapper.on('click','.banner-slide-btn-pre', function(){
            fn.prevOrNext(-1);
        }).on('click', '.banner-slide-btn-next', function(){
            fn.prevOrNext(1);
        });
        if(!isLoop){
            return;
        }   
        var timer = setInterval(() => {
            fn.prevOrNext(1);
        }, period);
        wrapper.mouseenter(function() {
            window.clearInterval(timer);
        }).mouseleave(function() {
            timer = window.setInterval(() => {
                fn.prevOrNext(1);
            }, period);
        });
      }
    };

    return this.each(function(i, _this) {
      fn.init.apply(_this, options);
    });
  };
})(window, jQuery);
