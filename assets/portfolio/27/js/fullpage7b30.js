/*!
 * fullPage 3.0.4
 * https://github.com/alvarotrigo/fullPage.js
 *
 * @license GPLv3 for open source use only
 * or Fullpage Commercial License for commercial use
 * http://alvarotrigo.com/fullPage/pricing/
 *
 * Copyright (C) 2018 http://alvarotrigo.com/fullPage - A project by Alvaro Trigo
 */
! function (e, t, n, o, r) {
    "function" == typeof define && define.amd ? define(function () {
        return e.fullpage = o(t, n), e.fullpage
    }) : "object" == typeof exports ? module.exports = o(t, n) : t.fullpage = o(t, n)
}(this, window, document, function (wt, yt) {
    "use strict";
    var Et = "fullpage-wrapper",
        Lt = "." + Et,
        xt = "fp-responsive",
        At = "fp-notransition",
        Tt = "fp-destroyed",
        kt = "fp-enabled",
        Mt = "fp-viewing",
        Ot = "active",
        Ct = "." + Ot,
        It = "fp-completely",
        Ht = "fp-section",
        Bt = "." + Ht,
        Rt = Bt + Ct,
        zt = "fp-tableCell",
        jt = "." + zt,
        Nt = "fp-auto-height",
        Pt = "fp-normal-scroll",
        Dt = "fp-nav",
        Vt = "#" + Dt,
        Yt = "fp-tooltip",
        Ft = "fp-slide",
        Ut = "." + Ft,
        Wt = Ut + Ct,
        Xt = "fp-slides",
        _t = "." + Xt,
        Kt = "fp-slidesContainer",
        qt = "." + Kt,
        $t = "fp-table",
        Qt = "fp-slidesNav",
        Gt = "." + Qt,
        Jt = Gt + " a",
        e = "fp-controlArrow",
        Zt = "." + e,
        en = "fp-prev",
        tn = Zt + ".fp-prev",
        nn = Zt + ".fp-next";

    function on(e, t) {
        wt.console && wt.console[e] && wt.console[e]("fullPage: " + t)
    }

    function rn(e, t) {
        return (t = 1 < arguments.length ? t : yt) ? t.querySelectorAll(e) : null
    }

    function ln(e) {
        e = e || {};
        for (var t = 1, n = arguments.length; t < n; ++t) {
            var o = arguments[t];
            if (o)
                for (var r in o) o.hasOwnProperty(r) && ("[object Object]" !== Object.prototype.toString.call(o[r]) ? e[r] = o[r] : e[r] = ln(e[r], o[r]))
        }
        return e
    }

    function an(e, t) {
        return null != e && (e.classList ? e.classList.contains(t) : new RegExp("(^| )" + t + "( |$)", "gi").test(e.className))
    }

    function sn() {
        return "innerHeight" in wt ? wt.innerHeight : yt.documentElement.offsetHeight
    }

    function cn(e, t) {
        var n;
        for (n in e = l(e), t)
            if (t.hasOwnProperty(n) && null !== n)
                for (var o = 0; o < e.length; o++) {
                    e[o].style[n] = t[n]
                }
        return e
    }

    function n(e, t, n) {
        for (var o = e[n]; o && !Hn(o, t);) o = o[n];
        return o
    }

    function un(e, t) {
        return n(e, t, "previousElementSibling")
    }

    function fn(e, t) {
        return n(e, t, "nextElementSibling")
    }

    function dn(e) {
        return e.previousElementSibling
    }

    function vn(e) {
        return e.nextElementSibling
    }

    function pn(e) {
        return e[e.length - 1]
    }

    function hn(e, t) {
        e = i(e) ? e[0] : e;
        for (var n = null != t ? rn(t, e.parentNode) : e.parentNode.childNodes, o = 0, r = 0; r < n.length; r++) {
            if (n[r] == e) return o;
            1 == n[r].nodeType && o++
        }
        return -1
    }

    function l(e) {
        return i(e) ? e : [e]
    }

    function gn(e) {
        e = l(e);
        for (var t = 0; t < e.length; t++) e[t].style.display = "none";
        return e
    }

    function mn(e) {
        e = l(e);
        for (var t = 0; t < e.length; t++) e[t].style.display = "block";
        return e
    }

    function i(e) {
        return "[object Array]" === Object.prototype.toString.call(e) || "[object NodeList]" === Object.prototype.toString.call(e)
    }

    function Sn(e, t) {
        e = l(e);
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.classList ? o.classList.add(t) : o.className += " " + t
        }
        return e
    }

    function bn(e, t) {
        e = l(e);
        for (var n = t.split(" "), o = 0; o < n.length; o++) {
            t = n[o];
            for (var r = 0; r < e.length; r++) {
                var i = e[r];
                i.classList ? i.classList.remove(t) : i.className = i.className.replace(new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " ")
            }
        }
        return e
    }

    function wn(e, t) {
        t.appendChild(e)
    }

    function o(e, t, n) {
        var o;
        t = t || yt.createElement("div");
        for (var r = 0; r < e.length; r++) {
            var i = e[r];
            (n && !r || !n) && (o = t.cloneNode(!0), i.parentNode.insertBefore(o, i)), o.appendChild(i)
        }
        return e
    }

    function yn(e, t) {
        o(e, t, !0)
    }

    function En(e, t) {
        for ("string" == typeof t && (t = Rn(t)), e.appendChild(t); e.firstChild !== t;) t.appendChild(e.firstChild)
    }

    function Ln(e) {
        for (var t = yt.createDocumentFragment(); e.firstChild;) t.appendChild(e.firstChild);
        e.parentNode.replaceChild(t, e)
    }

    function xn(e, t) {
        return e && 1 === e.nodeType ? Hn(e, t) ? e : xn(e.parentNode, t) : null
    }

    function An(e, t) {
        r(e, e.nextSibling, t)
    }

    function Tn(e, t) {
        r(e, e, t)
    }

    function r(e, t, n) {
        i(n) || ("string" == typeof n && (n = Rn(n)), n = [n]);
        for (var o = 0; o < n.length; o++) e.parentNode.insertBefore(n[o], t)
    }

    function kn() {
        var e = yt.documentElement;
        return (wt.pageYOffset || e.scrollTop) - (e.clientTop || 0)
    }

    function Mn(t) {
        return Array.prototype.filter.call(t.parentNode.children, function (e) {
            return e !== t
        })
    }

    function On(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }

    function Cn(e) {
        if ("function" == typeof e) return !0;
        var t = Object.prototype.toString(e);
        return "[object Function]" === t || "[object GeneratorFunction]" === t
    }

    function In(e, t, n) {
        var o;
        n = void 0 === n ? {} : n, "function" == typeof wt.CustomEvent ? o = new CustomEvent(t, {
            detail: n
        }) : (o = yt.createEvent("CustomEvent")).initCustomEvent(t, !0, !0, n), e.dispatchEvent(o)
    }

    function Hn(e, t) {
        return (e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector).call(e, t)
    }

    function Bn(e, t) {
        if ("boolean" == typeof t)
            for (var n = 0; n < e.length; n++) e[n].style.display = t ? "block" : "none";
        return e
    }

    function Rn(e) {
        var t = yt.createElement("div");
        return t.innerHTML = e.trim(), t.firstChild
    }

    function zn(e) {
        e = l(e);
        for (var t = 0; t < e.length; t++) {
            var n = e[t];
            n && n.parentElement && n.parentNode.removeChild(n)
        }
    }

    function a(e, t, n) {
        for (var o = e[n], r = []; o;)(Hn(o, t) || null == t) && r.push(o), o = o[n];
        return r
    }

    function jn(e, t) {
        return a(e, t, "nextElementSibling")
    }

    function Nn(e, t) {
        return a(e, t, "previousElementSibling")
    }
    return wt.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = function (e, t) {
            t = t || wt;
            for (var n = 0; n < this.length; n++) e.call(t, this[n], n, this)
        }), wt.fp_utils = {
            $: rn,
            deepExtend: ln,
            hasClass: an,
            getWindowHeight: sn,
            css: cn,
            until: n,
            prevUntil: un,
            nextUntil: fn,
            prev: dn,
            next: vn,
            last: pn,
            index: hn,
            getList: l,
            hide: gn,
            show: mn,
            isArrayOrList: i,
            addClass: Sn,
            removeClass: bn,
            appendTo: wn,
            wrap: o,
            wrapAll: yn,
            wrapInner: En,
            unwrap: Ln,
            closest: xn,
            after: An,
            before: Tn,
            insertBefore: r,
            getScrollTop: kn,
            siblings: Mn,
            preventDefault: On,
            isFunction: Cn,
            trigger: In,
            matches: Hn,
            toggle: Bn,
            createElementFromHTML: Rn,
            remove: zn,
            filter: function (e, t) {
                Array.prototype.filter.call(e, t)
            },
            untilAll: a,
            nextAll: jn,
            prevAll: Nn,
            showError: on
        },
        function (e, E) {
            var t = E && new RegExp("([\\d\\w]{8}-){3}[\\d\\w]{8}|^(?=.*?[A-Y])(?=.*?[a-y])(?=.*?[0-8])(?=.*?[#?!@$%^&*-]).{8,}$").test(E.licenseKey) || -1 < yt.domain.indexOf("alvarotrigo.com");
            if (!an(rn("html"), kt)) {
                var r = rn("html, body"),
                    L = rn("body")[0],
                    h = {};
                E = ln({
                    menu: !1,
                    anchors: [],
                    lockAnchors: !1,
                    navigation: !1,
                    navigationPosition: "right",
                    navigationTooltips: [],
                    showActiveTooltip: !1,
                    slidesNavigation: !1,
                    slidesNavPosition: "bottom",
                    scrollBar: !1,
                    hybrid: !1,
                    css3: !0,
                    scrollingSpeed: 700,
                    autoScrolling: !0,
                    fitToSection: !0,
                    fitToSectionDelay: 1e3,
                    easing: "easeInOutCubic",
                    easingcss3: "ease",
                    loopBottom: !1,
                    loopTop: !1,
                    loopHorizontal: !0,
                    continuousVertical: !1,
                    continuousHorizontal: !1,
                    scrollHorizontally: !1,
                    interlockedSlides: !1,
                    dragAndMove: !1,
                    offsetSections: !1,
                    resetSliders: !1,
                    fadingEffect: !1,
                    normalScrollElements: null,
                    scrollOverflow: !1,
                    scrollOverflowReset: !1,
                    scrollOverflowHandler: wt.fp_scrolloverflow ? wt.fp_scrolloverflow.iscrollHandler : null,
                    scrollOverflowOptions: null,
                    touchSensitivity: 5,
                    normalScrollElementTouchThreshold: 5,
                    bigSectionsDestination: null,
                    keyboardScrolling: !0,
                    animateAnchor: !0,
                    recordHistory: !0,
                    controlArrows: !0,
                    controlArrowColor: "#fff",
                    verticalCentered: !0,
                    sectionsColor: [],
                    paddingTop: 0,
                    paddingBottom: 0,
                    fixedElements: null,
                    responsive: 0,
                    responsiveWidth: 0,
                    responsiveHeight: 0,
                    responsiveSlides: !1,
                    parallax: !1,
                    parallaxOptions: {
                        type: "reveal",
                        percentage: 62,
                        property: "translate"
                    },
                    sectionSelector: ".section",
                    slideSelector: ".slide",
                    v2compatible: !1,
                    afterLoad: null,
                    onLeave: null,
                    afterRender: null,
                    afterResize: null,
                    afterReBuild: null,
                    afterSlideLoad: null,
                    onSlideLeave: null,
                    afterResponsive: null,
                    lazyLoading: !0
                }, E);
                var x, i, c, u, a = !1,
                    n = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
                    o = "ontouchstart" in wt || 0 < navigator.msMaxTouchPoints || navigator.maxTouchPoints,
                    f = "string" == typeof e ? rn(e)[0] : e,
                    A = sn(),
                    g = !1,
                    l = !0,
                    T = !0,
                    d = [],
                    v = {
                        m: {
                            up: !0,
                            down: !0,
                            left: !0,
                            right: !0
                        }
                    };
                v.k = ln({}, v.m);
                var p, s, m, S, k, M, b, w, y = wt.PointerEvent ? {
                        down: "pointerdown",
                        move: "pointermove"
                    } : {
                        down: "MSPointerDown",
                        move: "MSPointerMove"
                    },
                    O = {
                        touchmove: "ontouchmove" in wt ? "touchmove" : y.move,
                        touchstart: "ontouchstart" in wt ? "touchstart" : y.down
                    },
                    C = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]',
                    I = ln({}, E),
                    H = !1;
                pt(), wt.fp_easings = ln(wt.fp_easings, {
                    easeInOutCubic: function (e, t, n, o) {
                        return (e /= o / 2) < 1 ? n / 2 * e * e * e + t : n / 2 * ((e -= 2) * e * e + 2) + t
                    }
                }), f && (h.version = "3.0.2", h.setAutoScrolling = U, h.setRecordHistory = W, h.setScrollingSpeed = X, h.setFitToSection = _, h.setLockAnchors = function (e) {
                    E.lockAnchors = e
                }, h.setMouseWheelScrolling = K, h.setAllowScrolling = q, h.setKeyboardScrolling = Q, h.moveSectionUp = G, h.moveSectionDown = J, h.silentMoveTo = Z, h.moveTo = ee, h.moveSlideRight = te, h.moveSlideLeft = ne, h.fitToSection = de, h.reBuild = oe, h.setResponsive = re, h.getFullpageData = E, h.destroy = function (e) {
                    U(!1, "internal"), q(!0), $(!1), Q(!1), Sn(f, Tt), clearTimeout(S), clearTimeout(m), clearTimeout(s), clearTimeout(k), clearTimeout(M), wt.removeEventListener("scroll", fe), wt.removeEventListener("hashchange", ze), wt.removeEventListener("resize", _e), yt.removeEventListener("keydown", Ne), yt.removeEventListener("keyup", Pe), ["click", "touchstart"].forEach(function (e) {
                        yt.removeEventListener(e, ie)
                    }), ["mouseenter", "touchstart", "mouseleave", "touchend"].forEach(function (e) {
                        yt.removeEventListener(e, ae, !0)
                    }), clearTimeout(S), clearTimeout(m), e && (ut(0), rn("img[data-src], source[data-src], audio[data-src], iframe[data-src]", f).forEach(function (e) {
                        Me(e, "src")
                    }), rn("img[data-srcset]").forEach(function (e) {
                        Me(e, "srcset")
                    }), zn(rn(Vt + ", " + Gt + ", " + Zt)), cn(rn(Bt), {
                        height: "",
                        "background-color": "",
                        padding: ""
                    }), cn(rn(Ut), {
                        width: ""
                    }), cn(f, {
                        height: "",
                        position: "",
                        "-ms-touch-action": "",
                        "touch-action": ""
                    }), cn(r, {
                        overflow: "",
                        height: ""
                    }), bn(rn("html"), kt), bn(L, xt), L.className.split(/\s+/).forEach(function (e) {
                        0 === e.indexOf(Mt) && bn(L, e)
                    }), rn(Bt + ", " + Ut).forEach(function (e) {
                        E.scrollOverflowHandler && E.scrollOverflow && E.scrollOverflowHandler.remove(e), bn(e, $t + " " + Ot + " " + It);
                        var t = e.getAttribute("data-fp-styles");
                        t && e.setAttribute("style", e.getAttribute("data-fp-styles")), an(e, Ht) && !H && e.removeAttribute("data-anchor")
                    }), $e(f), [jt, qt, _t].forEach(function (e) {
                        rn(e, f).forEach(function (e) {
                            Ln(e)
                        })
                    }), cn(f, {
                        "-webkit-transition": "none",
                        transition: "none"
                    }), wt.scrollTo(0, 0), [Ht, Ft, Kt].forEach(function (e) {
                        bn(rn("." + e), e)
                    }))
                }, h.getActiveSection = function () {
                    return new St(rn(Rt)[0])
                }, h.getActiveSlide = function () {
                    return Ae(rn(Wt, rn(Rt)[0])[0])
                }, h.test = {
                    top: "0px",
                    translate3d: "translate3d(0px, 0px, 0px)",
                    translate3dH: function () {
                        for (var e = [], t = 0; t < rn(E.sectionSelector, f).length; t++) e.push("translate3d(0px, 0px, 0px)");
                        return e
                    }(),
                    left: function () {
                        for (var e = [], t = 0; t < rn(E.sectionSelector, f).length; t++) e.push(0);
                        return e
                    }(),
                    options: E,
                    setAutoScrolling: U
                }, h.shared = {
                    afterRenderActions: ue
                }, wt.fullpage_api = h, E.css3 && (E.css3 = function () {
                    var e, t = yt.createElement("p"),
                        n = {
                            webkitTransform: "-webkit-transform",
                            OTransform: "-o-transform",
                            msTransform: "-ms-transform",
                            MozTransform: "-moz-transform",
                            transform: "transform"
                        };
                    for (var o in t.style.display = "block", yt.body.insertBefore(t, null), n) void 0 !== t.style[o] && (t.style[o] = "translate3d(1px,1px,1px)", e = wt.getComputedStyle(t).getPropertyValue(n[o]));
                    return yt.body.removeChild(t), void 0 !== e && 0 < e.length && "none" !== e
                }()), E.scrollBar = E.scrollBar || E.hybrid, function () {
                    if (!E.anchors.length) {
                        var e = "[data-anchor]",
                            t = rn(E.sectionSelector.split(",").join(e + ",") + e, f);
                        t.length && (H = !0, t.forEach(function (e) {
                            E.anchors.push(e.getAttribute("data-anchor").toString())
                        }))
                    }
                    if (!E.navigationTooltips.length) {
                        var e = "[data-tooltip]",
                            n = rn(E.sectionSelector.split(",").join(e + ",") + e, f);
                        n.length && n.forEach(function (e) {
                            E.navigationTooltips.push(e.getAttribute("data-tooltip").toString())
                        })
                    }
                }(), function () {
                    cn(f, {
                        height: "100%",
                        position: "relative"
                    }), Sn(f, Et), Sn(rn("html"), kt), A = sn(), bn(f, Tt), Sn(rn(E.sectionSelector, f), Ht), Sn(rn(E.slideSelector, f), Ft);
                    for (var e = rn(Bt), t = 0; t < e.length; t++) {
                        var n = t,
                            o = e[t],
                            r = rn(Ut, o),
                            i = r.length;
                        o.setAttribute("data-fp-styles", o.getAttribute("style")), s = o, (c = n) || null != rn(Rt)[0] || Sn(s, Ot), u = rn(Rt)[0], cn(s, {
                            height: A + "px"
                        }), E.paddingTop && cn(s, {
                            "padding-top": E.paddingTop
                        }), E.paddingBottom && cn(s, {
                            "padding-bottom": E.paddingBottom
                        }), void 0 !== E.sectionsColor[c] && cn(s, {
                            "background-color": E.sectionsColor[c]
                        }), void 0 !== E.anchors[c] && s.setAttribute("data-anchor", E.anchors[c]), l = o, a = n, void 0 !== E.anchors[a] && an(l, Ot) && Qe(E.anchors[a], a), E.menu && E.css3 && null != xn(rn(E.menu)[0], Lt) && L.appendChild(rn(E.menu)[0]), 0 < i ? se(o, r, i) : E.verticalCentered && Je(o)
                    }
                    var l, a, s, c;
                    E.fixedElements && E.css3 && rn(E.fixedElements).forEach(function (e) {
                        L.appendChild(e)
                    }), E.navigation && function () {
                        var e = yt.createElement("div");
                        e.setAttribute("id", Dt);
                        var t = yt.createElement("ul");
                        e.appendChild(t), wn(e, L);
                        var n = rn(Vt)[0];
                        Sn(n, "fp-" + E.navigationPosition), E.showActiveTooltip && Sn(n, "fp-show-active");
                        for (var o = "", r = 0; r < rn(Bt).length; r++) {
                            var i = "";
                            E.anchors.length && (i = E.anchors[r]), o += '<li><a href="#' + i + '"><span class="fp-sr-only">' + ce(r, "Section") + "</span><span></span></a>";
                            var l = E.navigationTooltips[r];
                            void 0 !== l && "" !== l && (o += '<div class="' + Yt + " fp-" + E.navigationPosition + '">' + l + "</div>"), o += "</li>"
                        }
                        rn("ul", n)[0].innerHTML = o, cn(rn(Vt), {
                            "margin-top": "-" + rn(Vt)[0].offsetHeight / 2 + "px"
                        }), Sn(rn("a", rn("li", rn(Vt)[0])[hn(rn(Rt)[0], Bt)]), Ot)
                    }(), rn('iframe[src*="youtube.com/embed/"]', f).forEach(function (e) {
                        var t, n, o;
                        n = "enablejsapi=1", o = (t = e).getAttribute("src"), t.setAttribute("src", o + (/\?/.test(o) ? "&" : "?") + n)
                    }), E.scrollOverflow && (p = E.scrollOverflowHandler.init(E))
                }(), q(!0), $(!0), U(E.autoScrolling, "internal"), Ke(), at(), "complete" === yt.readyState && Re(), wt.addEventListener("load", Re), E.scrollOverflow || ue(), wt.addEventListener("scroll", fe), wt.addEventListener("hashchange", ze), wt.addEventListener("blur", Fe), wt.addEventListener("resize", _e), yt.addEventListener("keydown", Ne), yt.addEventListener("keyup", Pe), ["click", "touchstart"].forEach(function (e) {
                    yt.addEventListener(e, ie)
                }), E.normalScrollElements && (["mouseenter", "touchstart"].forEach(function (e) {
                    le(e, !1)
                }), ["mouseleave", "touchend"].forEach(function (e) {
                    le(e, !0)
                })));
                var B = !1,
                    R = 0,
                    z = 0,
                    j = 0,
                    N = 0,
                    P = 0,
                    D = (new Date).getTime(),
                    V = 0,
                    Y = 0,
                    F = A;
                return h
            }

            function U(e, t) {
                e || ut(0), vt("autoScrolling", e, t);
                var n = rn(Rt)[0];
                if (E.autoScrolling && !E.scrollBar) cn(r, {
                    overflow: "hidden",
                    height: "100%"
                }), W(I.recordHistory, "internal"), cn(f, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                }), null != n && ut(n.offsetTop);
                else if (cn(r, {
                        overflow: "visible",
                        height: "initial"
                    }), W(!1, "internal"), cn(f, {
                        "-ms-touch-action": "",
                        "touch-action": ""
                    }), null != n) {
                    var o = Te(n.offsetTop);
                    o.element.scrollTo(0, o.options)
                }
            }

            function W(e, t) {
                vt("recordHistory", e, t)
            }

            function X(e, t) {
                vt("scrollingSpeed", e, t)
            }

            function _(e, t) {
                vt("fitToSection", e, t)
            }

            function K(e) {
                e ? (function () {
                    var e, t = "";
                    wt.addEventListener ? e = "addEventListener" : (e = "attachEvent", t = "on");
                    var n = "onwheel" in yt.createElement("div") ? "wheel" : void 0 !== yt.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                    "DOMMouseScroll" == n ? yt[e](t + "MozMousePixelScroll", be, !1) : yt[e](t + n, be, !1)
                }(), f.addEventListener("mousedown", De), f.addEventListener("mouseup", Ve)) : (yt.addEventListener ? (yt.removeEventListener("mousewheel", be, !1), yt.removeEventListener("wheel", be, !1), yt.removeEventListener("MozMousePixelScroll", be, !1)) : yt.detachEvent("onmousewheel", be), f.removeEventListener("mousedown", De), f.removeEventListener("mouseup", Ve))
            }

            function q(t, e) {
                void 0 !== e ? (e = e.replace(/ /g, "").split(",")).forEach(function (e) {
                    dt(t, e, "m")
                }) : dt(t, "all", "m")
            }

            function $(e) {
                e ? (K(!0), function () {
                    if (n || o) {
                        E.autoScrolling && (L.removeEventListener(O.touchmove, pe, {
                            passive: !1
                        }), L.addEventListener(O.touchmove, pe, {
                            passive: !1
                        }));
                        var e = rn(Lt)[0];
                        e && (e.removeEventListener(O.touchstart, me), e.removeEventListener(O.touchmove, he, {
                            passive: !1
                        }), e.addEventListener(O.touchstart, me), e.addEventListener(O.touchmove, he, {
                            passive: !1
                        }))
                    }
                }()) : (K(!1), function () {
                    if (n || o) {
                        E.autoScrolling && (L.removeEventListener(O.touchmove, he, {
                            passive: !1
                        }), L.removeEventListener(O.touchmove, pe, {
                            passive: !1
                        }));
                        var e = rn(Lt)[0];
                        e && (e.removeEventListener(O.touchstart, me), e.removeEventListener(O.touchmove, he, {
                            passive: !1
                        }))
                    }
                }())
            }

            function Q(t, e) {
                void 0 !== e ? (e = e.replace(/ /g, "").split(",")).forEach(function (e) {
                    dt(t, e, "k")
                }) : (dt(t, "all", "k"), E.keyboardScrolling = t)
            }

            function G() {
                var e = un(rn(Rt)[0], Bt);
                e || !E.loopTop && !E.continuousVertical || (e = pn(rn(Bt))), null != e && Ee(e, null, !0)
            }

            function J() {
                var e = fn(rn(Rt)[0], Bt);
                e || !E.loopBottom && !E.continuousVertical || (e = rn(Bt)[0]), null != e && Ee(e, null, !1)
            }

            function Z(e, t) {
                X(0, "internal"), ee(e, t), X(I.scrollingSpeed, "internal")
            }

            function ee(e, t) {
                var n = tt(e);
                void 0 !== t ? nt(e, t) : null != n && Ee(n)
            }

            function te(e) {
                we("right", e)
            }

            function ne(e) {
                we("left", e)
            }

            function oe(e) {
                if (!an(f, Tt)) {
                    g = !0, A = sn();
                    for (var t = rn(Bt), n = 0; n < t.length; ++n) {
                        var o = t[n],
                            r = rn(_t, o)[0],
                            i = rn(Ut, o);
                        E.verticalCentered && cn(rn(jt, o), {
                            height: Ze(o) + "px"
                        }), cn(o, {
                            height: A + "px"
                        }), 1 < i.length && We(r, rn(Wt, r)[0])
                    }
                    E.scrollOverflow && p.createScrollBarForAll();
                    var l = hn(rn(Rt)[0], Bt);
                    l && Z(l + 1), g = !1, Cn(E.afterResize) && e && E.afterResize.call(f, wt.innerWidth, wt.innerHeight), Cn(E.afterReBuild) && !e && E.afterReBuild.call(f)
                }
            }

            function re(e) {
                var t = an(L, xt);
                e ? t || (U(!1, "internal"), _(!1, "internal"), gn(rn(Vt)), Sn(L, xt), Cn(E.afterResponsive) && E.afterResponsive.call(f, e)) : t && (U(I.autoScrolling, "internal"), _(I.autoScrolling, "internal"), mn(rn(Vt)), bn(L, xt), Cn(E.afterResponsive) && E.afterResponsive.call(f, e))
            }

            function ie(e) {
                var t = e.target;
                t && xn(t, Vt + " a") ? function (e) {
                    On(e);
                    var t = hn(xn(this, Vt + " li"));
                    Ee(rn(Bt)[t])
                }.call(t, e) : Hn(t, ".fp-tooltip") ? function () {
                    In(dn(this), "click")
                }.call(t) : Hn(t, Zt) ? function () {
                    var e = xn(this, Bt);
                    an(this, en) ? v.m.left && ne(e) : v.m.right && te(e)
                }.call(t, e) : Hn(t, Jt) || null != xn(t, Jt) ? function (e) {
                    On(e);
                    var t = rn(_t, xn(this, Bt))[0],
                        n = rn(Ut, t)[hn(xn(this, "li"))];
                    We(t, n)
                }.call(t, e) : xn(t, E.menu + " [data-menuanchor]") && function (e) {
                    !rn(E.menu)[0] || !E.lockAnchors && E.anchors.length || (On(e), ee(this.getAttribute("data-menuanchor")))
                }.call(t, e)
            }

            function le(e, t) {
                yt["fp_" + e] = t, yt.addEventListener(e, ae, !0)
            }

            function ae(t) {
                t.target != yt && E.normalScrollElements.split(",").forEach(function (e) {
                    null != xn(t.target, e) && $(yt["fp_" + t.type])
                })
            }

            function se(e, t, n) {
                var o = 100 * n,
                    r = 100 / n,
                    i = yt.createElement("div");
                i.className = Xt, yn(t, i);
                var l, a, s = yt.createElement("div");
                s.className = Kt, yn(t, s), cn(rn(qt, e), {
                    width: o + "%"
                }), 1 < n && (E.controlArrows && (l = e, a = [Rn('<div class="fp-controlArrow fp-prev"></div>'), Rn('<div class="fp-controlArrow fp-next"></div>')], An(rn(_t, l)[0], a), "#fff" !== E.controlArrowColor && (cn(rn(nn, l), {
                    "border-color": "transparent transparent transparent " + E.controlArrowColor
                }), cn(rn(tn, l), {
                    "border-color": "transparent " + E.controlArrowColor + " transparent transparent"
                })), E.loopHorizontal || gn(rn(tn, l))), E.slidesNavigation && function (e, t) {
                    wn(Rn('<div class="' + Qt + '"><ul></ul></div>'), e);
                    var n = rn(Gt, e)[0];
                    Sn(n, "fp-" + E.slidesNavPosition);
                    for (var o = 0; o < t; o++) wn(Rn('<li><a href="#"><span class="fp-sr-only">' + ce(o, "Slide") + "</span><span></span></a></li>"), rn("ul", n)[0]);
                    cn(n, {
                        "margin-left": "-" + n.innerWidth / 2 + "px"
                    }), Sn(rn("a", rn("li", n)[0]), Ot)
                }(e, n)), t.forEach(function (e) {
                    cn(e, {
                        width: r + "%"
                    }), E.verticalCentered && Je(e)
                });
                var c = rn(Wt, e)[0];
                null != c && (0 !== hn(rn(Rt), Bt) || 0 === hn(rn(Rt), Bt) && 0 !== hn(c)) ? ct(c, "internal") : Sn(t[0], Ot)
            }

            function ce(e, t) {
                return E.navigationTooltips[e] || E.anchors[e] || t + " " + (e + 1)
            }

            function ue() {
                var e, t = rn(Rt)[0];
                Sn(t, It), Oe(t), Ce(t), E.scrollOverflow && E.scrollOverflowHandler.afterLoad(), (!(e = tt(je().section)) || void 0 !== e && hn(e) === hn(u)) && Cn(E.afterLoad) && Le("afterLoad", {
                    activeSection: null,
                    element: t,
                    direction: null,
                    anchorLink: t.getAttribute("data-anchor"),
                    sectionIndex: hn(t, Bt)
                }), Cn(E.afterRender) && Le("afterRender")
            }

            function fe() {
                var e, t, n, o, r, i;
                if (!E.autoScrolling || E.scrollBar) {
                    var l = kn(),
                        a = (i = R < (r = l) ? "down" : "up", V = R = r, i),
                        s = 0,
                        c = l + sn() / 2,
                        u = L.offsetHeight - sn() === l,
                        f = rn(Bt);
                    if (u) s = f.length - 1;
                    else if (l)
                        for (var d = 0; d < f.length; ++d) f[d].offsetTop <= c && (s = d);
                    else s = 0;
                    if (t = a, n = rn(Rt)[0].offsetTop, o = n + sn(), ("up" != t ? n <= kn() : o >= kn() + sn()) && (an(rn(Rt)[0], It) || (Sn(rn(Rt)[0], It), bn(Mn(rn(Rt)[0]), It))), !an(e = f[s], Ot)) {
                        B = !0;
                        var v, p, h = rn(Rt)[0],
                            g = hn(h, Bt) + 1,
                            m = Ge(e),
                            S = e.getAttribute("data-anchor"),
                            b = hn(e, Bt) + 1,
                            w = rn(Wt, e)[0],
                            y = {
                                activeSection: h,
                                sectionIndex: b - 1,
                                anchorLink: S,
                                element: e,
                                leavingSection: g,
                                direction: m
                            };
                        w && (p = w.getAttribute("data-anchor"), v = hn(w)), T && (Sn(e, Ot), bn(Mn(e), Ot), Cn(E.onLeave) && Le("onLeave", y), Cn(E.afterLoad) && Le("afterLoad", y), He(h), Oe(e), Ce(e), Qe(S, b - 1), E.anchors.length && (x = S), rt(v, p, S)), clearTimeout(k), k = setTimeout(function () {
                            B = !1
                        }, 100)
                    }
                    E.fitToSection && (clearTimeout(M), M = setTimeout(function () {
                        E.fitToSection && rn(Rt)[0].offsetHeight <= A && de()
                    }, E.fitToSectionDelay))
                }
            }

            function de() {
                T && (g = !0, Ee(rn(Rt)[0]), g = !1)
            }

            function ve(e) {
                if (v.m[e]) {
                    var t = "down" === e ? J : G;
                    if (E.scrollOverflow) {
                        var n = E.scrollOverflowHandler.scrollable(rn(Rt)[0]),
                            o = "down" === e ? "bottom" : "top";
                        if (null != n) {
                            if (!E.scrollOverflowHandler.isScrolled(o, n)) return !0;
                            t()
                        } else t()
                    } else t()
                }
            }

            function pe(e) {
                E.autoScrolling && ge(e) && On(e)
            }

            function he(e) {
                var t = xn(e.target, Bt);
                if (ge(e)) {
                    E.autoScrolling && On(e);
                    var n = st(e);
                    N = n.y, P = n.x, rn(_t, t).length && Math.abs(j - P) > Math.abs(z - N) ? !a && Math.abs(j - P) > wt.innerWidth / 100 * E.touchSensitivity && (P < j ? v.m.right && te(t) : v.m.left && ne(t)) : E.autoScrolling && T && Math.abs(z - N) > wt.innerHeight / 100 * E.touchSensitivity && (N < z ? ve("down") : z < N && ve("up"))
                }
            }

            function ge(e) {
                return void 0 === e.pointerType || "mouse" != e.pointerType
            }

            function me(e) {
                if (E.fitToSection && (w = !1), ge(e)) {
                    var t = st(e);
                    z = t.y, j = t.x
                }
            }

            function Se(e, t) {
                for (var n = 0, o = e.slice(Math.max(e.length - t, 1)), r = 0; r < o.length; r++) n += o[r];
                return Math.ceil(n / t)
            }

            function be(e) {
                var t = (new Date).getTime(),
                    n = an(rn(".fp-completely")[0], Pt);
                if (!v.m.down && !v.m.up) return On(e), !1;
                if (E.autoScrolling && !c && !n) {
                    var o = (e = e || wt.event).wheelDelta || -e.deltaY || -e.detail,
                        r = Math.max(-1, Math.min(1, o)),
                        i = void 0 !== e.wheelDeltaX || void 0 !== e.deltaX,
                        l = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) || Math.abs(e.deltaX) < Math.abs(e.deltaY) || !i;
                    149 < d.length && d.shift(), d.push(Math.abs(o)), E.scrollBar && On(e);
                    var a = t - D;
                    if (D = t, 200 < a && (d = []), T) {
                        var s = Se(d, 10);
                        Se(d, 70) <= s && l && ve(r < 0 ? "down" : "up")
                    }
                    return !1
                }
                E.fitToSection && (w = !1)
            }

            function we(e, t) {
                var n = null == t ? rn(Rt)[0] : t,
                    o = rn(_t, n)[0];
                if (!(null == o || a || rn(Ut, o).length < 2)) {
                    var r = rn(Wt, o)[0],
                        i = null;
                    if (null == (i = "left" === e ? un(r, Ut) : fn(r, Ut))) {
                        if (!E.loopHorizontal) return;
                        var l = Mn(r);
                        i = "left" === e ? l[l.length - 1] : l[0]
                    }
                    a = !h.test.isTesting, We(o, i, e)
                }
            }

            function ye() {
                for (var e = rn(Wt), t = 0; t < e.length; t++) ct(e[t], "internal")
            }

            function Ee(e, t, n) {
                if (null != e) {
                    var o, r, i, l, a, s, c, u, f, d = {
                        element: e,
                        callback: t,
                        isMovementUp: n,
                        dtop: (r = (o = e).offsetHeight, i = o.offsetTop, a = V < (l = i), s = l - A + r, c = E.bigSectionsDestination, A < r ? (a || c) && "bottom" !== c || (l = s) : (a || g && null == vn(o)) && (l = s), V = l),
                        yMovement: Ge(e),
                        anchorLink: e.getAttribute("data-anchor"),
                        sectionIndex: hn(e, Bt),
                        activeSlide: rn(Wt, e)[0],
                        activeSection: rn(Rt)[0],
                        leavingSection: hn(rn(Rt), Bt) + 1,
                        localIsResizing: g
                    };
                    if (!(d.activeSection == e && !g || E.scrollBar && kn() === d.dtop && !an(e, Nt))) {
                        if (null != d.activeSlide && (u = d.activeSlide.getAttribute("data-anchor"), f = hn(d.activeSlide)), !d.localIsResizing) {
                            var v = d.yMovement;
                            if (void 0 !== n && (v = n ? "up" : "down"), d.direction = v, Cn(E.onLeave) && !1 === Le("onLeave", d)) return
                        }
                        E.autoScrolling && E.continuousVertical && void 0 !== d.isMovementUp && (!d.isMovementUp && "up" == d.yMovement || d.isMovementUp && "down" == d.yMovement) && ((p = d).isMovementUp ? Tn(rn(Rt)[0], jn(p.activeSection, Bt)) : An(rn(Rt)[0], Nn(p.activeSection, Bt).reverse()), ut(rn(Rt)[0].offsetTop), ye(), p.wrapAroundElements = p.activeSection, p.dtop = p.element.offsetTop, p.yMovement = Ge(p.element), p.leavingSection = hn(p.activeSection, Bt) + 1, p.sectionIndex = hn(p.element, Bt), d = p), d.localIsResizing || He(d.activeSection), E.scrollOverflow && E.scrollOverflowHandler.beforeLeave(), Sn(e, Ot), bn(Mn(e), Ot), Oe(e), E.scrollOverflow && E.scrollOverflowHandler.onLeave(), T = h.test.isTesting, rt(f, u, d.anchorLink, d.sectionIndex),
                            function (e) {
                                if (E.css3 && E.autoScrolling && !E.scrollBar) {
                                    var t = "translate3d(0px, -" + Math.round(e.dtop) + "px, 0px)";
                                    et(t, !0), E.scrollingSpeed ? (clearTimeout(m), m = setTimeout(function () {
                                        ke(e)
                                    }, E.scrollingSpeed)) : ke(e)
                                } else {
                                    var n = Te(e.dtop);
                                    h.test.top = -e.dtop + "px", ht(n.element, n.options, E.scrollingSpeed, function () {
                                        E.scrollBar ? setTimeout(function () {
                                            ke(e)
                                        }, 30) : ke(e)
                                    })
                                }
                            }(d), x = d.anchorLink, Qe(d.anchorLink, d.sectionIndex)
                    }
                }
                var p
            }

            function Le(e, t) {
                var n, o, r, i, l = (o = e, r = t, (i = E.v2compatible ? {
                    afterRender: function () {
                        return [f]
                    },
                    onLeave: function () {
                        return [r.activeSection, r.leavingSection, r.sectionIndex + 1, r.direction]
                    },
                    afterLoad: function () {
                        return [r.element, r.anchorLink, r.sectionIndex + 1]
                    },
                    afterSlideLoad: function () {
                        return [r.destiny, r.anchorLink, r.sectionIndex + 1, r.slideAnchor, r.slideIndex]
                    },
                    onSlideLeave: function () {
                        return [r.prevSlide, r.anchorLink, r.sectionIndex + 1, r.prevSlideIndex, r.direction, r.slideIndex]
                    }
                } : {
                    afterRender: function () {
                        return {
                            section: xe(rn(Rt)[0]),
                            slide: Ae(rn(Wt, rn(Rt)[0])[0])
                        }
                    },
                    onLeave: function () {
                        return {
                            origin: xe(r.activeSection),
                            destination: xe(r.element),
                            direction: r.direction
                        }
                    },
                    afterLoad: function () {
                        return i.onLeave()
                    },
                    afterSlideLoad: function () {
                        return {
                            section: xe(r.section),
                            origin: Ae(r.prevSlide),
                            destination: Ae(r.destiny),
                            direction: r.direction
                        }
                    },
                    onSlideLeave: function () {
                        return i.afterSlideLoad()
                    }
                })[o]());
                if (E.v2compatible) {
                    if (!1 === E[e].apply(l[0], l.slice(1))) return !1
                } else if (In(f, e, l), !1 === E[e].apply(l[Object.keys(l)[0]], (n = l, Object.keys(n).map(function (e) {
                        return n[e]
                    })))) return !1;
                return !0
            }

            function xe(e) {
                return e ? new St(e) : null
            }

            function Ae(e) {
                return e ? new bt(e) : null
            }

            function Te(e) {
                var t = {};
                return E.autoScrolling && !E.scrollBar ? (t.options = -e, t.element = rn(Lt)[0]) : (t.options = e, t.element = wt), t
            }

            function ke(e) {
                var t;
                null != (t = e).wrapAroundElements && (t.isMovementUp ? Tn(rn(Bt)[0], t.wrapAroundElements) : An(rn(Bt)[rn(Bt).length - 1], t.wrapAroundElements), ut(rn(Rt)[0].offsetTop), ye()), Cn(E.afterLoad) && !e.localIsResizing && Le("afterLoad", e), E.scrollOverflow && E.scrollOverflowHandler.afterLoad(), e.localIsResizing || Ce(e.element), Sn(e.element, It), bn(Mn(e.element), It), T = !0, Cn(e.callback) && e.callback()
            }

            function Me(e, t) {
                e.setAttribute(t, e.getAttribute("data-" + t)), e.removeAttribute("data-" + t)
            }

            function Oe(e) {
                E.lazyLoading && rn("img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]", Be(e)).forEach(function (n) {
                    if (["src", "srcset"].forEach(function (e) {
                            var t = n.getAttribute("data-" + e);
                            null != t && t && Me(n, e)
                        }), Hn(n, "source")) {
                        var e = xn(n, "video, audio");
                        e && e.load()
                    }
                })
            }

            function Ce(e) {
                var t = Be(e);
                rn("video, audio", t).forEach(function (e) {
                    e.hasAttribute("data-autoplay") && "function" == typeof e.play && e.play()
                }), rn('iframe[src*="youtube.com/embed/"]', t).forEach(function (e) {
                    e.hasAttribute("data-autoplay") && Ie(e), e.onload = function () {
                        e.hasAttribute("data-autoplay") && Ie(e)
                    }
                })
            }

            function Ie(e) {
                e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
            }

            function He(e) {
                var t = Be(e);
                rn("video, audio", t).forEach(function (e) {
                    e.hasAttribute("data-keepplaying") || "function" != typeof e.pause || e.pause()
                }), rn('iframe[src*="youtube.com/embed/"]', t).forEach(function (e) {
                    /youtube\.com\/embed\//.test(e.getAttribute("src")) && !e.hasAttribute("data-keepplaying") && e.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
                })
            }

            function Be(e) {
                var t = rn(Wt, e);
                return t.length && (e = t[0]), e
            }

            function Re() {
                var e = je(),
                    t = e.section,
                    n = e.slide;
                t && (E.animateAnchor ? nt(t, n) : Z(t, n))
            }

            function ze() {
                if (!B && !E.lockAnchors) {
                    var e = je(),
                        t = e.section,
                        n = e.slide,
                        o = void 0 === x,
                        r = void 0 === x && void 0 === n && !a;
                    t && t.length && (t && t !== x && !o || r || !a && i != n) && nt(t, n)
                }
            }

            function je() {
                var e, t, n = wt.location.hash;
                if (n.length) {
                    var o = n.replace("#", "").split("/"),
                        r = -1 < n.indexOf("#/");
                    e = r ? "/" + o[1] : decodeURIComponent(o[0]);
                    var i = r ? o[2] : o[1];
                    i && i.length && (t = decodeURIComponent(i))
                }
                return {
                    section: e,
                    slide: t
                }
            }

            function Ne(e) {
                clearTimeout(b);
                var t = yt.activeElement,
                    n = e.keyCode;
                9 === n ? function (e) {
                    var t, n, o, r, i, l, a, s = e.shiftKey,
                        c = yt.activeElement,
                        u = Ye(Be(rn(Rt)[0]));

                    function f(e) {
                        return On(e), u[0] ? u[0].focus() : null
                    }(t = e, n = Ye(yt), o = n.indexOf(yt.activeElement), r = t.shiftKey ? o - 1 : o + 1, i = n[r], l = Ae(xn(i, Ut)), a = xe(xn(i, Bt)), l || a) && (c ? null == xn(c, Rt + "," + Rt + " " + Wt) && (c = f(e)) : f(e), (!s && c == u[u.length - 1] || s && c == u[0]) && On(e))
                }(e) : Hn(t, "textarea") || Hn(t, "input") || Hn(t, "select") || "true" === t.getAttribute("contentEditable") || "" === t.getAttribute("contentEditable") || !E.keyboardScrolling || !E.autoScrolling || (-1 < [40, 38, 32, 33, 34].indexOf(n) && On(e), c = e.ctrlKey, b = setTimeout(function () {
                    ! function (e) {
                        var t = e.shiftKey;
                        if (T || !([37, 39].indexOf(e.keyCode) < 0)) switch (e.keyCode) {
                            case 38:
                            case 33:
                                v.k.up && G();
                                break;
                            case 32:
                                if (t && v.k.up) {
                                    G();
                                    break
                                }
                                case 40:
                                case 34:
                                    v.k.down && J();
                                    break;
                                case 36:
                                    v.k.up && ee(1);
                                    break;
                                case 35:
                                    v.k.down && ee(rn(Bt).length);
                                    break;
                                case 37:
                                    v.k.left && ne();
                                    break;
                                case 39:
                                    v.k.right && te()
                        }
                    }(e)
                }, 150))
            }

            function Pe(e) {
                l && (c = e.ctrlKey)
            }

            function De(e) {
                2 == e.which && (Y = e.pageY, f.addEventListener("mousemove", Ue))
            }

            function Ve(e) {
                2 == e.which && f.removeEventListener("mousemove", Ue)
            }

            function Ye(e) {
                return [].slice.call(rn(C, e)).filter(function (e) {
                    return "-1" !== e.getAttribute("tabindex") && null !== e.offsetParent
                })
            }

            function Fe() {
                c = l = !1
            }

            function Ue(e) {
                T && (e.pageY < Y && v.m.up ? G() : e.pageY > Y && v.m.down && J()), Y = e.pageY
            }

            function We(e, t, n) {
                var o, r, i = xn(e, Bt),
                    l = {
                        slides: e,
                        destiny: t,
                        direction: n,
                        destinyPos: {
                            left: t.offsetLeft
                        },
                        slideIndex: hn(t),
                        section: i,
                        sectionIndex: hn(i, Bt),
                        anchorLink: i.getAttribute("data-anchor"),
                        slidesNav: rn(Gt, i)[0],
                        slideAnchor: lt(t),
                        prevSlide: rn(Wt, i)[0],
                        prevSlideIndex: hn(rn(Wt, i)[0]),
                        localIsResizing: g
                    };
                l.xMovement = (o = l.prevSlideIndex, r = l.slideIndex, o == r ? "none" : r < o ? "left" : "right"), l.localIsResizing || (T = !1), E.onSlideLeave && !l.localIsResizing && "none" !== l.xMovement && Cn(E.onSlideLeave) && !1 === Le("onSlideLeave", l) ? a = !1 : (Sn(t, Ot), bn(Mn(t), Ot), l.localIsResizing || (He(l.prevSlide), Oe(t)), !E.loopHorizontal && E.controlArrows && (Bn(rn(tn, i), 0 !== l.slideIndex), Bn(rn(nn, i), null != vn(t))), an(i, Ot) && !l.localIsResizing && rt(l.slideIndex, l.slideAnchor, l.anchorLink, l.sectionIndex), function (e, t, n) {
                    var o = t.destinyPos;
                    if (E.css3) {
                        var r = "translate3d(-" + Math.round(o.left) + "px, 0px, 0px)";
                        h.test.translate3dH[t.sectionIndex] = r, cn(qe(rn(qt, e)), ft(r)), S = setTimeout(function () {
                            n && Xe(t)
                        }, E.scrollingSpeed)
                    } else h.test.left[t.sectionIndex] = Math.round(o.left), ht(e, Math.round(o.left), E.scrollingSpeed, function () {
                        n && Xe(t)
                    })
                }(e, l, !0))
            }

            function Xe(e) {
                var t, n;
                t = e.slidesNav, n = e.slideIndex, E.slidesNavigation && null != t && (bn(rn(Ct, t), Ot), Sn(rn("a", rn("li", t)[n]), Ot)), e.localIsResizing || (Cn(E.afterSlideLoad) && Le("afterSlideLoad", e), T = !0, Ce(e.destiny)), a = !1
            }

            function _e() {
                if (Ke(), n) {
                    var e = yt.activeElement;
                    if (!Hn(e, "textarea") && !Hn(e, "input") && !Hn(e, "select")) {
                        var t = sn();
                        Math.abs(t - F) > 20 * Math.max(F, t) / 100 && (s = setTimeout(function () {
                            oe(!0), F = t
                        }, navigator.userAgent.match("CriOS") ? 50 : 0))
                    }
                } else clearTimeout(s), s = setTimeout(function () {
                    oe(!0)
                }, 350)
            }

            function Ke() {
                var e = E.responsive || E.responsiveWidth,
                    t = E.responsiveHeight,
                    n = e && wt.innerWidth < e,
                    o = t && wt.innerHeight < t;
                e && t ? re(n || o) : e ? re(n) : t && re(o)
            }

            function qe(e) {
                var t = "all " + E.scrollingSpeed + "ms " + E.easingcss3;
                return bn(e, At), cn(e, {
                    "-webkit-transition": t,
                    transition: t
                })
            }

            function $e(e) {
                return Sn(e, At)
            }

            function Qe(e, t) {
                var n, o, r, i;
                n = e, o = rn(E.menu)[0], E.menu && null != o && (bn(rn(Ct, o), Ot), Sn(rn('[data-menuanchor="' + n + '"]', o), Ot)), r = e, i = t, E.navigation && null != rn(Vt)[0] && (bn(rn(Ct, rn(Vt)[0]), Ot), Sn(r ? rn('a[href="#' + r + '"]', rn(Vt)[0]) : rn("a", rn("li", rn(Vt)[0])[i]), Ot))
            }

            function Ge(e) {
                var t = hn(rn(Rt)[0], Bt),
                    n = hn(e, Bt);
                return t == n ? "none" : n < t ? "up" : "down"
            }

            function Je(e) {
                if (!an(e, $t)) {
                    var t = yt.createElement("div");
                    t.className = zt, t.style.height = Ze(e) + "px", Sn(e, $t), En(e, t)
                }
            }

            function Ze(e) {
                var t = A;
                if (E.paddingTop || E.paddingBottom) {
                    var n = e;
                    an(n, Ht) || (n = xn(e, Bt));
                    var o = parseInt(getComputedStyle(n)["padding-top"]) + parseInt(getComputedStyle(n)["padding-bottom"]);
                    t = A - o
                }
                return t
            }

            function et(e, t) {
                t ? qe(f) : $e(f), cn(f, ft(e)), h.test.translate3d = e, setTimeout(function () {
                    bn(f, At)
                }, 10)
            }

            function tt(e) {
                var t = rn(Bt + '[data-anchor="' + e + '"]', f)[0];
                if (!t) {
                    var n = void 0 !== e ? e - 1 : 0;
                    t = rn(Bt)[n]
                }
                return t
            }

            function nt(e, t) {
                var n = tt(e);
                if (null != n) {
                    var o, r, i, l = (null == (i = rn(Ut + '[data-anchor="' + (o = t) + '"]', r = n)[0]) && (o = void 0 !== o ? o : 0, i = rn(Ut, r)[o]), i);
                    lt(n) === x || an(n, Ot) ? ot(l) : Ee(n, function () {
                        ot(l)
                    })
                }
            }

            function ot(e) {
                null != e && We(xn(e, _t), e)
            }

            function rt(e, t, n, o) {
                var r = "";
                E.anchors.length && !E.lockAnchors && (e ? (null != n && (r = n), null == t && (t = e), it(r + "/" + (i = t))) : (null != e && (i = t), it(n))), at()
            }

            function it(e) {
                if (E.recordHistory) location.hash = e;
                else if (n || o) wt.history.replaceState(void 0, void 0, "#" + e);
                else {
                    var t = wt.location.href.split("#")[0];
                    wt.location.replace(t + "#" + e)
                }
            }

            function lt(e) {
                if (!e) return null;
                var t = e.getAttribute("data-anchor"),
                    n = hn(e);
                return null == t && (t = n), t
            }

            function at() {
                var e = rn(Rt)[0],
                    t = rn(Wt, e)[0],
                    n = lt(e),
                    o = lt(t),
                    r = String(n);
                t && (r = r + "-" + o), r = r.replace("/", "-").replace("#", "");
                var i = new RegExp("\\b\\s?" + Mt + "-[^\\s]+\\b", "g");
                L.className = L.className.replace(i, ""), Sn(L, Mt + "-" + r)
            }

            function st(e) {
                var t = [];
                return t.y = void 0 !== e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, t.x = void 0 !== e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, o && ge(e) && E.scrollBar && void 0 !== e.touches && (t.y = e.touches[0].pageY, t.x = e.touches[0].pageX), t
            }

            function ct(e, t) {
                X(0, "internal"), void 0 !== t && (g = !0), We(xn(e, _t), e), void 0 !== t && (g = !1), X(I.scrollingSpeed, "internal")
            }

            function ut(e) {
                var t = Math.round(e);
                if (E.css3 && E.autoScrolling && !E.scrollBar) et("translate3d(0px, -" + t + "px, 0px)", !1);
                else if (E.autoScrolling && !E.scrollBar) cn(f, {
                    top: -t + "px"
                }), h.test.top = -t + "px";
                else {
                    var n = Te(t);
                    gt(n.element, n.options)
                }
            }

            function ft(e) {
                return {
                    "-webkit-transform": e,
                    "-moz-transform": e,
                    "-ms-transform": e,
                    transform: e
                }
            }

            function dt(t, e, n) {
                "all" !== e ? v[n][e] = t : Object.keys(v[n]).forEach(function (e) {
                    v[n][e] = t
                })
            }

            function vt(e, t, n) {
                E[e] = t, "internal" !== n && (I[e] = t)
            }

            function pt() {
                t || (on("error", "Fullpage.js version 3 has changed its license to GPLv3 and it requires a `licenseKey` option. Read about it here:"), on("error", "https://github.com/alvarotrigo/fullPage.js#options.")), an(rn("html"), kt) ? on("error", "Fullpage.js can only be initialized once and you are doing it multiple times!") : (E.continuousVertical && (E.loopTop || E.loopBottom) && (E.continuousVertical = !1, on("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), !E.scrollOverflow || !E.scrollBar && E.autoScrolling || on("warn", "Options scrollBar:true and autoScrolling:false are mutually exclusive with scrollOverflow:true. Sections with scrollOverflow might not work well in Firefox"), !E.continuousVertical || !E.scrollBar && E.autoScrolling || (E.continuousVertical = !1, on("warn", "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), E.scrollOverflow && null == E.scrollOverflowHandler && (E.scrollOverflow = !1, on("error", "The option `scrollOverflow:true` requires the file `scrolloverflow.min.js`. Please include it before fullPage.js.")), ["fadingEffect", "continuousHorizontal", "scrollHorizontally", "interlockedSlides", "resetSliders", "responsiveSlides", "offsetSections", "dragAndMove", "scrollOverflowReset", "parallax"].forEach(function (e) {
                    E[e] && on("warn", "fullpage.js extensions require fullpage.extensions.min.js file instead of the usual fullpage.js. Requested: " + e)
                }), E.anchors.forEach(function (t) {
                    var e = [].slice.call(rn("[name]")).filter(function (e) {
                            return e.getAttribute("name") && e.getAttribute("name").toLowerCase() == t.toLowerCase()
                        }),
                        n = [].slice.call(rn("[id]")).filter(function (e) {
                            return e.getAttribute("id") && e.getAttribute("id").toLowerCase() == t.toLowerCase()
                        });
                    (n.length || e.length) && (on("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."), n.length && on("error", '"' + t + '" is is being used by another element `id` property'), e.length && on("error", '"' + t + '" is is being used by another element `name` property'))
                }))
            }

            function ht(t, n, o, r) {
                var e, i = (e = t).self != wt && an(e, Xt) ? e.scrollLeft : !E.autoScrolling || E.scrollBar ? kn() : e.offsetTop,
                    l = n - i,
                    a = 0;
                w = !0;
                var s = function () {
                    if (w) {
                        var e = n;
                        a += 20, o && (e = wt.fp_easings[E.easing](a, i, l, o)), gt(t, e), a < o ? setTimeout(s, 20) : void 0 !== r && r()
                    } else a < o && r()
                };
                s()
            }

            function gt(e, t) {
                !E.autoScrolling || E.scrollBar || e.self != wt && an(e, Xt) ? e.self != wt && an(e, Xt) ? e.scrollLeft = t : e.scrollTo(0, t) : e.style.top = t + "px"
            }

            function mt(e, t) {
                this.anchor = e.getAttribute("data-anchor"), this.item = e, this.index = hn(e, t), this.isLast = this.index === e.parentElement.querySelectorAll(t).length - 1, this.isFirst = !this.index
            }

            function St(e) {
                mt.call(this, e, Bt)
            }

            function bt(e) {
                mt.call(this, e, Ut)
            }
            pt()
        }
}), window.jQuery && window.fullpage && function (n, o) {
    "use strict";
    n && o ? n.fn.fullpage = function (e) {
        var t = new o(this[0], e);
        Object.keys(t).forEach(function (e) {
            n.fn.fullpage[e] = t[e]
        })
    } : window.fp_utils.showError("error", "jQuery is required to use the jQuery fullpage adapter!")
}(window.jQuery, window.fullpage);
//# sourceMappingURL=fullpage.min.js.map