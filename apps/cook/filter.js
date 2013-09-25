KISSY.add("cook/filter", function (_kissy_J) {
    var _dom = _kissy_J.DOM,
		_event = _kissy_J.Event,
		_document = document,
		_window = window,
		_is_ie6 = _kissy_J.UA.ie == 6,
        _dom_class_main = _kissy_J.get(".main"),
		_dom_id_J_Filter = _kissy_J.get("#J_Filter"),
		_STR_FILTER_FIX = "filter-fix";


    function Mods_Filter() {
        if (!(this instanceof Mods_Filter)) {
            return new Mods_Filter()
        }
        this._init()
    }
    _kissy_J.augment(Mods_Filter, _kissy_J.EventTarget, {
        _init: function () {
            if (!_dom_id_J_Filter) {
                return
            }
            this._fix();

        },
        _fix: function () {
            var _filter_placeholder = _dom.create('<div id="J_FilterPlaceholder" />', {
                css: {
                    height: _dom.outerHeight(_dom_id_J_Filter, true),
                    display: "none"
                }
            });
            _dom.insertAfter(_filter_placeholder, _dom_id_J_Filter);
            this.needFixTop = true;
            var _fix_top_threshold = Math.max(_dom.offset(_dom_id_J_Filter).top, 130),
				_fix_core_fn = function () {
				    var _window_scrollTop = _dom.scrollTop(_window);
				    if (_window_scrollTop > _fix_top_threshold) {
				        if (!_dom.hasClass(_dom_id_J_Filter, _STR_FILTER_FIX)) {
				            _dom.addClass(_dom_id_J_Filter, _STR_FILTER_FIX);
				            _dom.show(_filter_placeholder)
				        }
				        if (_is_ie6) {
                            //2013-05-22 basilwang 为什么不用_dom.offset(_dom_id_J_Filter,{top:value})设置？
				            _dom.css(_dom_id_J_Filter, "top", _window_scrollTop - 10)
				        }
				    } else {
				        _dom.removeClass(_dom_id_J_Filter, _STR_FILTER_FIX);
				        _dom.hide(_filter_placeholder);
				        _fix_top_threshold = Math.max(_dom.offset(_dom_id_J_Filter).top, 130)
				    }
				};
            _fix_core_fn();
            _event.on(_window, "scroll", _fix_core_fn)
        }

    });
    return {
        init: function () {
            new Mods_Filter()
        }
    }
}, {  requires: ["./filter.css"]
});