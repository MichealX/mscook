// JScript source code
KISSY.add("cook/slide2/slide2", function (_kissy, _switchable) {
    var _dom = _kissy.DOM, _event = _kissy.Event; var _window = window;
    var _is_ie6 = _kissy.UA.ie == 6;
    var _is_under_ie9 = _kissy.UA.ie && _kissy.UA.ie < 9;
    var _closeSlideAutoPlay = !_window.g_config.closeSlideAutoPlay;
    var _closeTriggerAnim = _window.g_config.closeTriggerAnim;
    var _str_J_MfpSlide = "J_MfpSlide";
    var _str_j_MaskBanner = "j_MaskBanner";
    var _str_data_text_src = "data-text-src";
    var _str_data_image = "data-image";
    var _config = {
        contentCls: "mfpSlide-con",
        navCls: "mfpSlide-nav",
        activeTriggerCls: "selected",
        effect: "fade",
        easing: "easeOut",
        lazyDataType: "img-src",
        duration: 0.5,
        triggerType: "mouse",
        autoplay: _closeSlideAutoPlay,
        pauseOnScroll: true,
        delay: 0.2
    };
    function Slide2() {
        var _slide2 = this;
        _slide2.mfpSlide = null;
        if (!(this instanceof Slide2))
        { return new Slide2() }
        _slide2._init()
    }
    _kissy.augment(Slide2, _kissy.EventTarget,
            { _init: function () {
                var _slide2 = this;
                if (!_kissy.get("#" + _str_J_MfpSlide))
                { return }
                var _slide = _slide2.slide = new _switchable.Slide("#" + _str_J_MfpSlide, _config);
                _window.g_config.Slide = _slide;
                _is_ie6 && _kissy.ready(function () { _slide2._fixPng24() });
                _slide.on("beforeSwitch", function(_op){
                    _slide2._textAnim(_op);
                    _slide2._lazyLoad(_op)
                });
                //2013-02-19 basilwang don't use direct-promo
                //_mfp.on("directSuccess", function (_event) { _slide2._directImg(_event.data) });
                _dom.show(_slide.nav);
                _slide2._lazyLoad({toIndex:0});
                //2013-02-19 basilwang remove tanx
                //E.ready(function () { Z._tanxAd() });
                ; _slide2._hoverMask();
                !_closeSlideAutoPlay && _slide.switchTo(parseInt(Math.random() * _slide.triggers.length))
            }, _lazyLoad: function (_op /*_op includes fromIndex and toIndex*/) {
                var _slide = this.slide;
                var _panel_to_Index = _slide.panels[_op.toIndex];
                var _b_on_panel_to_Index = _kissy.get("b", _panel_to_Index);
                var _img_on_panel_to_Index = _kissy.get("img", _b_on_panel_to_Index);
                if (_dom.hasAttr(_panel_to_Index, _str_data_image) && _img_on_panel_to_Index) {
                    _dom.css(_panel_to_Index, "background-image", "url(" + _dom.attr(_panel_to_Index, _str_data_image) + ")");
                    !_is_ie6 && _dom.attr(_img_on_panel_to_Index, "src", _dom.attr(_img_on_panel_to_Index, _str_data_text_src));
                    _dom.removeAttr(_panel_to_Index, _str_data_image);
                    _dom.removeAttr(_img_on_panel_to_Index, _str_data_text_src)
                }
            },
                _textAnim: function (_op /*_op includes fromIndex and toIndex*/) {
                    var _slide = this.slide;
                    var _panel_activeIndex = _slide.panels[_slide.activeIndex];
                    var _panel_to_Index = _slide.panels[_op.toIndex];
                    var _b_on_panel_activeIndex = _kissy.get("b", _panel_activeIndex);
                    var _b_on_panel_to_Index = _kissy.get("b", _panel_to_Index);
                    var _img_on_panel_to_Index = _kissy.get("img", _b_on_panel_to_Index);
                    !!_b_on_panel_activeIndex && new _kissy.Anim(_b_on_panel_activeIndex, { top: "-40px", opacity: _is_under_ie9 ? 1 : 0 }, 0.8, "easeOutStrong").run();
                    !!_b_on_panel_to_Index && new _kissy.Anim(_b_on_panel_to_Index, { top: "-10px", opacity: 1 }, 0.8, "easeOutStrong").run()
                },
                _hoverMask: function () {
                    var _slide2 = this;
                    var _node_ul_class_j_MaskBanner = _kissy.all("." + _str_j_MaskBanner, _slide2.slide.container);
                    _kissy.each(_node_ul_class_j_MaskBanner, function (_node) {
                        var _lis = _kissy.query("li", _node);
                        _event.on(_lis, "mouseenter mouseleave", function (f) {
                            var _li_mouse_related = this;
                            var _opacity = f.type === "mouseenter" ? 0.3 : 0;
                            _kissy.each(_lis, function (_li) {
                                var _dom_i_on_a, _dom_a_on_li = _kissy.get("a", _li);
                                if (!(_dom_i_on_a = _kissy.get("i", _dom_a_on_li))) {
                                    _dom_i_on_a = _dom.create("<i>");
                                    _dom.append(_dom_i_on_a, _dom_a_on_li)
                                }
                                if (_li_mouse_related === _li) { _dom.css(_dom_i_on_a, "opacity", 0) }
                                else {
                                    if (_dom_i_on_a.timer)
                                    { clearTimeout(_dom_i_on_a.timer) }
                                    _dom_i_on_a.timer = setTimeout(function ()
                                    { new _kissy.Anim(_dom_i_on_a, { opacity: _opacity }, 0.5, "easeOutStrong").run() }, 200)
                                }
                            })
                        })
                    })
                },
                _fixPng24: function (_dom_img, _img_url) {
                    var _slide = this.slide;
                    var _set_filter_and_spaceball = function (_dom_img_t) {
                        _dom.css(_dom_img_t, { filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + (_img_url || _dom.attr(_dom_img_t, _str_data_text_src) || _dom_img_t.src) + '",enabled="true", sizinMethod="scale");' });
                        _dom_img_t.src = "http://www.linjuzaixian.com/Images/spaceball.gif";
                        _dom.show(_dom_img_t)
                    };
                    _dom_img ? _set_filter_and_spaceball(_dom_img) : _kissy.each(_slide.panels, function (_panel) {
                        var _dom_b = _kissy.get("b", _panel), _dom_img;
                        if (_dom_b)
                         {
                            if (_dom_img = _kissy.get("img", _dom_b))
                            {
                                _set_filter_and_spaceball(_dom_img)
                            }
                            _dom.show(_dom_b)
                         }
                    })
                },
                _optimizeImg: function (_img_url) {
                    var _postfix = "_q90.jpg";
                    if (!g_config.closeOptSlideImg) { _img_url += _postfix } return _img_url
                },
                 _triggerAnim: function () {
                     var slide = this.slide;
                     var timer;
                     var gray;
                     var rotator;
                     var mask;
                     var clock, clockTimer;
                     var degrees = 0;
                     var isHover;
                     function setDegree(degrees) {
                         var degreeCSS = "rotate(" + degrees + "deg)";
                         rotator.css({"-webkit-transform": degreeCSS,"-moz-transform": degreeCSS,"-o-transform": degreeCSS})
                     }
                     function startClock(interval) {
                         if (isHover)
                             return;
                         var intervalTime = interval || 5e3 / 180;
                         clearInterval(clock);
                         clock = setInterval(function(e) {
                             if (degrees < 360) {
                                 degrees += 2;
                                 setDegree(degrees)
                             }
                             if (degrees > 180) {
                                 gray.addClass("move");
                                 rotator.addClass("move");
                                 mask.addClass("move")
                             }
                             if (degrees > 359) {
                                 pauseClock()
                             }
                         }, intervalTime)
                     }
                     function pauseClock() {
                         clearInterval(clock)
                     }
                     function stopClock() {
                         gray.removeClass("move");
                         rotator.removeClass("move");
                         mask.removeClass("move");
                         clearInterval(clock);
                         degrees = 0;
                         setDegree(degrees)
                     }
                     function shiftClock(index) {
                         var marginLeft = -336 + (14 + 8) * index;
                         DOM.css(timer, {"margin-left": marginLeft + "px"})
                     }
                     function triggerAnim() {
                         if (!timer) {
                             var timerTPL = '<div class="timer"><span class="gray"></span><span class="mask"><span class="rotator"></span></span></div>';
                             timer = DOM.create(timerTPL);
                             DOM.append(timer, slide.container);
                             timer = S.one(".timer");
                             gray = S.one(".gray");
                             rotator = S.one(".rotator");
                             mask = S.one(".mask")
                         }
                         startClock();
                         slide.on("beforeSwitch", function(ev) {
                             stopClock();
                             shiftClock(ev.toIndex);
                             startClock()
                         });
                         Event.on(slide.container, "mouseenter", function() {
                             isHover = true;
                             pauseClock()
                         });
                         Event.on(slide.container, "mouseleave", function() {
                             isHover = false;
                             if (clockTimer)
                                 clearTimeout(clockTimer);
                             clockTimer = setTimeout(function() {
                                 startClock(1e4 / (360 - degrees))
                             }, 200)
                         })
                     }
                     triggerAnim()
                }

            }); return Slide2
}, { requires: ["switchable","./slide2.css"] });