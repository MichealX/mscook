/**
* Created with JetBrains WebStorm.
* User: basil
* Date: 13-8-17
* Time: 下午6:02
* To change this template use File | Settings | File Templates.
*/
(function (_kissy, _window) {
    var _dom = _kissy.DOM;
    var _event = _kissy.Event;
    var _document = document;
    var _config = _window.g_config = _window.g_config || {};
    _window.g_config.view = _kissy.DOM.viewportWidth() < 1210 ? 990 : 1190;
    var _timestamp = _config.t || "20130819";
    var _version = _kissy.version == "1.30" ? "1.3.0" : "1.2.0";
    _kissy.config(
        { map:
            [
            //[/(.+cook\/.+)-min.js(\?[^?]+)?$/, "$1.js$2"]
            //[/(.+tmall\/fp\/.+)-min.css(\?[^?]+)?$/, "$1.css$2"]
            ],
            packages: [{ name: "cook", charset: "utf-8", path: "./apps/", tag: _timestamp}]
        }
    );
    _kissy.config({
        packages: [
			{
			    name: "gallery",
			    path: "./apps/",
			    charset: "utf-8",
			    combine: false,
			    tag: _kissy.now(),
			    ignorePackageNameInUri: false,
			    debug: true
			}
		]
    });
    var _scroll_fn = function () {
        if (_dom.scrollTop(_document) > 400) {
            _kissy.use('cook/backtop/backtopv2', function () {
                arguments[1].init();
            });
            _event.detach(_window, "scroll", _scroll_fn)
        }
    };
    _event.on(_window, "scroll", _scroll_fn);


   
})(KISSY, window);