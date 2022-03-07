/* © Yurii Shuvalov 2016. https://github.com/Insomna
The code is distributed under the MIT license */
! function (l) {
    l.fn.fastmark = function (s) {
        var e = l.extend({
            self: !0,
            selfclass: "active",
            controlledclass: "open",
            event: "click",
            preventdefault: !0
        }, s);
        return this.bind(e.event, function (s) {
            var t = l(this).data();
            if ("self" in t || (t.self = e.self), "preventdefault" in t || (t.preventdefault = e.preventdefault), t.selfclass || (t.selfclass = e.selfclass), t.controlledclass || (t.controlledclass = e.controlledclass), t.self && (l(this).hasClass(t.selfclass) ? l(this).removeClass(t.selfclass) : l(this).addClass(t.selfclass)), t.controlled && (l(t.controlled).hasClass(t.controlledclass) ? l(t.controlled).removeClass(t.controlledclass) : l(t.controlled).addClass(t.controlledclass)), t.selfreplace) {
                var a = l(this).html();
                l(this).html(t.selfreplace), t.selfreplace = a
            }
            t.preventdefault && s.preventDefault()
        }), this
    }
}(jQuery);