/*--------------------------------------------------------------------------*
* jQuery.slidermessage.js   ver 1.3
* jQuery required (tested on version 1.4.2 or later)
*
* encoding UTF-8
* Licensed under the MIT
* Copyright (c) 2010 Tomoya Tanaka(tiny-studio)
*                    Minoru Hayakawa (E-riverstyle Design)
* Tomoya Tanaka(tiny-studio) - http://twitter.com/tiny_studio
*                            - http://blog.tiny-studio.com/
* Minoru Hayakawa (E-riverstyle Design) - http://twitter.com/eriver
*                                       - http://www.e-riverstyle.com/
* 
* For details, see the web site:
* http://www.e-riverstyle.com/dev/js/slidermessage.html
* 
* Date: 2011-01-14
* 
---------------------------------------------------------------------------*/
 
(function ($) {
    $.fn.sliderMessage = function (properties, speed) {
        var defaults = {
            css: {
                backgroundColor : "#000000",
                opacity : 0.8,
                color : "#ffffff",
                fontSize : "12px",
                padding : "5px",
                margin : 0,
                borderWidth : 0,
                overflow : "hidden"
            },
            speed : 'fast'
        };

        var options = {};
        if (arguments.length == 1 &&( typeof properties == 'number' || typeof properties == 'string')) {
            options.speed = properties;
        } else {
            options.css = properties;
        }

        if (arguments.length >= 2) {
            options.speed = speed;
        }

        var settings = {};
        settings = $.extend(true, settings, defaults, options);

        $(this).each(function () {
            var img = this;
            var text = $(img).attr('title');
            var wrapper = $('<div>');
            var div = $('<div>').html(text);
            var fxAttrs = ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth"];
            var originalProperties = {};
            var hiddenProperties = {};
            $(wrapper).append(div).css({
                position: 'absolute',
                margin: 0,
                padding: 0,
                backgroundImage:"url("+img.src+")"
            });
            $("body").append(wrapper);
            $(div).css(settings.css);

            $(window).load(function () {
                $(wrapper).offset($(img).offset()).width($(img).width()).height($(img).height());

                $(div).width($(img).width());
                var padding = $(div).outerWidth() - $(img).width();
                var widthExcludingPadding = $(img).width() - padding;
                $(div).width(widthExcludingPadding);

                for (var i = 0, length = fxAttrs.length; i < length; i++) {
                    originalProperties[fxAttrs[i]] = $(div).css(fxAttrs[i]);
                    hiddenProperties[fxAttrs[i]] = 0;
                }
                $(div).css(hiddenProperties);
            });

            $(window).resize(function () {
                $(wrapper).offset($(img).offset());
            });
            
            $(wrapper).mouseover(function () {
                $(div).stop().animate(originalProperties, settings.speed);
            });

            $(wrapper).mouseout(function () {
                $(div).stop().animate(hiddenProperties, settings.speed);
            });
        });
    }
})(jQuery);
