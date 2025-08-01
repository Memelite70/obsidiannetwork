/*! howler.js v2.2.3 | (c) 2013-2020, James Simpson of GoldFire Studios | MIT License | howlerjs.com */ !(function() {
    "use strict";
    var e = function() {
        this.init();
    };
    e.prototype = {
        init: function() {
            var e = this || n;
            return (
                (e._counter = 1e3),
                (e._html5AudioPool = []),
                (e.html5PoolSize = 10),
                (e._codecs = {}),
                (e._howls = []),
                (e._muted = !1),
                (e._volume = 1),
                (e._canPlayEvent = "canplaythrough"),
                (e._navigator =
                    "undefined" != typeof window && window.navigator ?
                    window.navigator :
                    null),
                (e.masterGain = null),
                (e.noAudio = !1),
                (e.usingWebAudio = !0),
                (e.autoSuspend = !0),
                (e.ctx = null),
                (e.autoUnlock = !0),
                e._setup(),
                e
            );
        },
        volume: function(e) {
            var o = this || n;
            if (
                ((e = parseFloat(e)), o.ctx || _(), void 0 !== e && e >= 0 && e <= 1)
            ) {
                if (((o._volume = e), o._muted)) return o;
                o.usingWebAudio &&
                    o.masterGain.gain.setValueAtTime(e, n.ctx.currentTime);
                for (var t = 0; t < o._howls.length; t++)
                    if (!o._howls[t]._webAudio)
                        for (var r = o._howls[t]._getSoundIds(), a = 0; a < r.length; a++) {
                            var u = o._howls[t]._soundById(r[a]);
                            u && u._node && (u._node.volume = u._volume * e);
                        }
                return o;
            }
            return o._volume;
        },
        mute: function(e) {
            var o = this || n;
            o.ctx || _(),
                (o._muted = e),
                o.usingWebAudio &&
                o.masterGain.gain.setValueAtTime(
                    e ? 0 : o._volume,
                    n.ctx.currentTime
                );
            for (var t = 0; t < o._howls.length; t++)
                if (!o._howls[t]._webAudio)
                    for (var r = o._howls[t]._getSoundIds(), a = 0; a < r.length; a++) {
                        var u = o._howls[t]._soundById(r[a]);
                        u && u._node && (u._node.muted = !!e || u._muted);
                    }
            return o;
        },
        stop: function() {
            for (var e = this || n, o = 0; o < e._howls.length; o++)
                e._howls[o].stop();
            return e;
        },
        unload: function() {
            for (var e = this || n, o = e._howls.length - 1; o >= 0; o--)
                e._howls[o].unload();
            return (
                e.usingWebAudio &&
                e.ctx &&
                void 0 !== e.ctx.close &&
                (e.ctx.close(), (e.ctx = null), _()),
                e
            );
        },
        codecs: function(e) {
            return (this || n)._codecs[e.replace(/^x-/, "")];
        },
        _setup: function() {
            var e = this || n;
            if (
                ((e.state = e.ctx ? e.ctx.state || "suspended" : "suspended"),
                    e._autoSuspend(), !e.usingWebAudio)
            )
                if ("undefined" != typeof Audio)
                    try {
                        var o = new Audio();
                        void 0 === o.oncanplaythrough && (e._canPlayEvent = "canplay");
                    } catch (n) {
                        e.noAudio = !0;
                    }
            else e.noAudio = !0;
            try {
                var o = new Audio();
                o.muted && (e.noAudio = !0);
            } catch (e) {}
            return e.noAudio || e._setupCodecs(), e;
        },
        _setupCodecs: function() {
            var e = this || n,
                o = null;
            try {
                o = "undefined" != typeof Audio ? new Audio() : null;
            } catch (n) {
                return e;
            }
            if (!o || "function" != typeof o.canPlayType) return e;
            var t = o.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                r = e._navigator ? e._navigator.userAgent : "",
                a = r.match(/OPR\/([0-6].)/g),
                u = a && parseInt(a[0].split("/")[1], 10) < 33,
                d = -1 !== r.indexOf("Safari") && -1 === r.indexOf("Chrome"),
                i = r.match(/Version\/(.*?) /),
                _ = d && i && parseInt(i[1], 10) < 15;
            return (
                (e._codecs = {
                    mp3: !(u || (!t && !o.canPlayType("audio/mp3;").replace(/^no$/, ""))),
                    mpeg: !!t,
                    opus: !!o.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                    ogg: !!o
                        .canPlayType('audio/ogg; codecs="vorbis"')
                        .replace(/^no$/, ""),
                    oga: !!o
                        .canPlayType('audio/ogg; codecs="vorbis"')
                        .replace(/^no$/, ""),
                    wav: !!(
                        o.canPlayType('audio/wav; codecs="1"') || o.canPlayType("audio/wav")
                    ).replace(/^no$/, ""),
                    aac: !!o.canPlayType("audio/aac;").replace(/^no$/, ""),
                    caf: !!o.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                    m4a: !!(
                        o.canPlayType("audio/x-m4a;") ||
                        o.canPlayType("audio/m4a;") ||
                        o.canPlayType("audio/aac;")
                    ).replace(/^no$/, ""),
                    m4b: !!(
                        o.canPlayType("audio/x-m4b;") ||
                        o.canPlayType("audio/m4b;") ||
                        o.canPlayType("audio/aac;")
                    ).replace(/^no$/, ""),
                    mp4: !!(
                        o.canPlayType("audio/x-mp4;") ||
                        o.canPlayType("audio/mp4;") ||
                        o.canPlayType("audio/aac;")
                    ).replace(/^no$/, ""),
                    weba: !(
                        _ ||
                        !o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
                    ),
                    webm: !(
                        _ ||
                        !o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
                    ),
                    dolby: !!o
                        .canPlayType('audio/mp4; codecs="ec-3"')
                        .replace(/^no$/, ""),
                    flac: !!(
                        o.canPlayType("audio/x-flac;") || o.canPlayType("audio/flac;")
                    ).replace(/^no$/, ""),
                }),
                e
            );
        },
        _unlockAudio: function() {
            var e = this || n;
            if (!e._audioUnlocked && e.ctx) {
                (e._audioUnlocked = !1),
                (e.autoUnlock = !1),
                e._mobileUnloaded ||
                    44100 === e.ctx.sampleRate ||
                    ((e._mobileUnloaded = !0), e.unload()),
                    (e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050));
                var o = function(n) {
                    for (; e._html5AudioPool.length < e.html5PoolSize;)
                        try {
                            var t = new Audio();
                            (t._unlocked = !0), e._releaseHtml5Audio(t);
                        } catch (n) {
                            e.noAudio = !0;
                            break;
                        }
                    for (var r = 0; r < e._howls.length; r++)
                        if (!e._howls[r]._webAudio)
                            for (
                                var a = e._howls[r]._getSoundIds(), u = 0; u < a.length; u++
                            ) {
                                var d = e._howls[r]._soundById(a[u]);
                                d &&
                                    d._node &&
                                    !d._node._unlocked &&
                                    ((d._node._unlocked = !0), d._node.load());
                            }
                    e._autoResume();
                    var i = e.ctx.createBufferSource();
                    (i.buffer = e._scratchBuffer),
                    i.connect(e.ctx.destination),
                        void 0 === i.start ? i.noteOn(0) : i.start(0),
                        "function" == typeof e.ctx.resume && e.ctx.resume(),
                        (i.onended = function() {
                            i.disconnect(0),
                                (e._audioUnlocked = !0),
                                document.removeEventListener("touchstart", o, !0),
                                document.removeEventListener("touchend", o, !0),
                                document.removeEventListener("click", o, !0),
                                document.removeEventListener("keydown", o, !0);
                            for (var n = 0; n < e._howls.length; n++)
                                e._howls[n]._emit("unlock");
                        });
                };
                return (
                    document.addEventListener("touchstart", o, !0),
                    document.addEventListener("touchend", o, !0),
                    document.addEventListener("click", o, !0),
                    document.addEventListener("keydown", o, !0),
                    e
                );
            }
        },
        _obtainHtml5Audio: function() {
            var e = this || n;
            if (e._html5AudioPool.length) return e._html5AudioPool.pop();
            var o = new Audio().play();
            return (
                o &&
                "undefined" != typeof Promise &&
                (o instanceof Promise || "function" == typeof o.then) &&
                o.catch(function() {
                    console.warn(
                        "HTML5 Audio pool exhausted, returning potentially locked audio object."
                    );
                }),
                new Audio()
            );
        },
        _releaseHtml5Audio: function(e) {
            var o = this || n;
            return e._unlocked && o._html5AudioPool.push(e), o;
        },
        _autoSuspend: function() {
            var e = this;
            if (
                e.autoSuspend &&
                e.ctx &&
                void 0 !== e.ctx.suspend &&
                n.usingWebAudio
            ) {
                for (var o = 0; o < e._howls.length; o++)
                    if (e._howls[o]._webAudio)
                        for (var t = 0; t < e._howls[o]._sounds.length; t++)
                            if (!e._howls[o]._sounds[t]._paused) return e;
                return (
                    e._suspendTimer && clearTimeout(e._suspendTimer),
                    (e._suspendTimer = setTimeout(function() {
                        if (e.autoSuspend) {
                            (e._suspendTimer = null), (e.state = "suspending");
                            var n = function() {
                                (e.state = "suspended"),
                                e._resumeAfterSuspend &&
                                    (delete e._resumeAfterSuspend, e._autoResume());
                            };
                            e.ctx.suspend().then(n, n);
                        }
                    }, 3e4)),
                    e
                );
            }
        },
        _autoResume: function() {
            var e = this;
            if (e.ctx && void 0 !== e.ctx.resume && n.usingWebAudio)
                return (
                    "running" === e.state &&
                    "interrupted" !== e.ctx.state &&
                    e._suspendTimer ?
                    (clearTimeout(e._suspendTimer), (e._suspendTimer = null)) :
                    "suspended" === e.state ||
                    ("running" === e.state && "interrupted" === e.ctx.state) ?
                    (e.ctx.resume().then(function() {
                            e.state = "running";
                            for (var n = 0; n < e._howls.length; n++)
                                e._howls[n]._emit("resume");
                        }),
                        e._suspendTimer &&
                        (clearTimeout(e._suspendTimer), (e._suspendTimer = null))) :
                    "suspending" === e.state && (e._resumeAfterSuspend = !0),
                    e
                );
        },
    };
    var n = new e(),
        o = function(e) {
            var n = this;
            if (!e.src || 0 === e.src.length)
                return void console.error(
                    "An array of source files must be passed with any new Howl."
                );
            n.init(e);
        };
    o.prototype = {
        init: function(e) {
            var o = this;
            return (
                n.ctx || _(),
                (o._autoplay = e.autoplay || !1),
                (o._format = "string" != typeof e.format ? e.format : [e.format]),
                (o._html5 = e.html5 || !1),
                (o._muted = e.mute || !1),
                (o._loop = e.loop || !1),
                (o._pool = e.pool || 5),
                (o._preload =
                    ("boolean" != typeof e.preload && "metadata" !== e.preload) ||
                    e.preload),
                (o._rate = e.rate || 1),
                (o._sprite = e.sprite || {}),
                (o._src = "string" != typeof e.src ? e.src : [e.src]),
                (o._volume = void 0 !== e.volume ? e.volume : 1),
                (o._xhr = {
                    method: e.xhr && e.xhr.method ? e.xhr.method : "GET",
                    headers: e.xhr && e.xhr.headers ? e.xhr.headers : null,
                    withCredentials:
                        !(!e.xhr || !e.xhr.withCredentials) && e.xhr.withCredentials,
                }),
                (o._duration = 0),
                (o._state = "unloaded"),
                (o._sounds = []),
                (o._endTimers = {}),
                (o._queue = []),
                (o._playLock = !1),
                (o._onend = e.onend ? [{
                    fn: e.onend
                }] : []),
                (o._onfade = e.onfade ? [{
                    fn: e.onfade
                }] : []),
                (o._onload = e.onload ? [{
                    fn: e.onload
                }] : []),
                (o._onloaderror = e.onloaderror ? [{
                    fn: e.onloaderror
                }] : []),
                (o._onplayerror = e.onplayerror ? [{
                    fn: e.onplayerror
                }] : []),
                (o._onpause = e.onpause ? [{
                    fn: e.onpause
                }] : []),
                (o._onplay = e.onplay ? [{
                    fn: e.onplay
                }] : []),
                (o._onstop = e.onstop ? [{
                    fn: e.onstop
                }] : []),
                (o._onmute = e.onmute ? [{
                    fn: e.onmute
                }] : []),
                (o._onvolume = e.onvolume ? [{
                    fn: e.onvolume
                }] : []),
                (o._onrate = e.onrate ? [{
                    fn: e.onrate
                }] : []),
                (o._onseek = e.onseek ? [{
                    fn: e.onseek
                }] : []),
                (o._onunlock = e.onunlock ? [{
                    fn: e.onunlock
                }] : []),
                (o._onresume = []),
                (o._webAudio = n.usingWebAudio && !o._html5),
                void 0 !== n.ctx && n.ctx && n.autoUnlock && n._unlockAudio(),
                n._howls.push(o),
                o._autoplay &&
                o._queue.push({
                    event: "play",
                    action: function() {
                        o.play();
                    },
                }),
                o._preload && "none" !== o._preload && o.load(),
                o
            );
        },
        load: function() {
            var e = this,
                o = null;
            if (n.noAudio)
                return void e._emit("loaderror", null, "No audio support.");
            "string" == typeof e._src && (e._src = [e._src]);
            for (var r = 0; r < e._src.length; r++) {
                var u, d;
                if (e._format && e._format[r]) u = e._format[r];
                else {
                    if ("string" != typeof(d = e._src[r])) {
                        e._emit(
                            "loaderror",
                            null,
                            "Non-string found in selected audio sources - ignoring."
                        );
                        continue;
                    }
                    (u = /^data:audio\/([^;,]+);/i.exec(d)),
                    u || (u = /\.([^.]+)$/.exec(d.split("?", 1)[0])),
                        u && (u = u[1].toLowerCase());
                }
                if (
                    (u ||
                        console.warn(
                            'No file extension was found. Consider using the "format" property or specify an extension.'
                        ),
                        u && n.codecs(u))
                ) {
                    o = e._src[r];
                    break;
                }
            }
            return o ?
                ((e._src = o),
                    (e._state = "loading"),
                    "https:" === window.location.protocol &&
                    "http:" === o.slice(0, 5) &&
                    ((e._html5 = !0), (e._webAudio = !1)),
                    new t(e),
                    e._webAudio && a(e),
                    e) :
                void e._emit(
                    "loaderror",
                    null,
                    "No codec support for selected audio sources."
                );
        },
        play: function(e, o) {
            var t = this,
                r = null;
            if ("number" == typeof e)(r = e), (e = null);
            else {
                if ("string" == typeof e && "loaded" === t._state && !t._sprite[e])
                    return null;
                if (void 0 === e && ((e = "__default"), !t._playLock)) {
                    for (var a = 0, u = 0; u < t._sounds.length; u++)
                        t._sounds[u]._paused &&
                        !t._sounds[u]._ended &&
                        (a++, (r = t._sounds[u]._id));
                    1 === a ? (e = null) : (r = null);
                }
            }
            var d = r ? t._soundById(r) : t._inactiveSound();
            if (!d) return null;
            if ((r && !e && (e = d._sprite || "__default"), "loaded" !== t._state)) {
                (d._sprite = e), (d._ended = !1);
                var i = d._id;
                return (
                    t._queue.push({
                        event: "play",
                        action: function() {
                            t.play(i);
                        },
                    }),
                    i
                );
            }
            if (r && !d._paused) return o || t._loadQueue("play"), d._id;
            t._webAudio && n._autoResume();
            var _ = Math.max(0, d._seek > 0 ? d._seek : t._sprite[e][0] / 1e3),
                s = Math.max(0, (t._sprite[e][0] + t._sprite[e][1]) / 1e3 - _),
                l = (1e3 * s) / Math.abs(d._rate),
                c = t._sprite[e][0] / 1e3,
                f = (t._sprite[e][0] + t._sprite[e][1]) / 1e3;
            (d._sprite = e), (d._ended = !1);
            var p = function() {
                (d._paused = !1),
                (d._seek = _),
                (d._start = c),
                (d._stop = f),
                (d._loop = !(!d._loop && !t._sprite[e][2]));
            };
            if (_ >= f) return void t._ended(d);
            var m = d._node;
            if (t._webAudio) {
                var v = function() {
                    (t._playLock = !1), p(), t._refreshBuffer(d);
                    var e = d._muted || t._muted ? 0 : d._volume;
                    m.gain.setValueAtTime(e, n.ctx.currentTime),
                        (d._playStart = n.ctx.currentTime),
                        void 0 === m.bufferSource.start ?
                        d._loop ?
                        m.bufferSource.noteGrainOn(0, _, 86400) :
                        m.bufferSource.noteGrainOn(0, _, s) :
                        d._loop ?
                        m.bufferSource.start(0, _, 86400) :
                        m.bufferSource.start(0, _, s),
                        l !== 1 / 0 &&
                        (t._endTimers[d._id] = setTimeout(t._ended.bind(t, d), l)),
                        o ||
                        setTimeout(function() {
                            t._emit("play", d._id), t._loadQueue();
                        }, 0);
                };
                "running" === n.state && "interrupted" !== n.ctx.state ?
                    v() :
                    ((t._playLock = !0), t.once("resume", v), t._clearTimer(d._id));
            } else {
                var h = function() {
                    (m.currentTime = _),
                    (m.muted = d._muted || t._muted || n._muted || m.muted),
                    (m.volume = d._volume * n.volume()),
                    (m.playbackRate = d._rate);
                    try {
                        var r = m.play();
                        if (
                            (r &&
                                "undefined" != typeof Promise &&
                                (r instanceof Promise || "function" == typeof r.then) ?
                                ((t._playLock = !0),
                                    p(),
                                    r
                                    .then(function() {
                                        (t._playLock = !1),
                                        (m._unlocked = !0),
                                        o ? t._loadQueue() : t._emit("play", d._id);
                                    })
                                    .catch(function() {
                                        (t._playLock = !1),
                                        t._emit(
                                                "playerror",
                                                d._id,
                                                "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."
                                            ),
                                            (d._ended = !0),
                                            (d._paused = !0);
                                    })) :
                                o || ((t._playLock = !1), p(), t._emit("play", d._id)),
                                (m.playbackRate = d._rate),
                                m.paused)
                        )
                            return void t._emit(
                                "playerror",
                                d._id,
                                "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."
                            );
                        "__default" !== e || d._loop ?
                            (t._endTimers[d._id] = setTimeout(t._ended.bind(t, d), l)) :
                            ((t._endTimers[d._id] = function() {
                                    t._ended(d),
                                        m.removeEventListener("ended", t._endTimers[d._id], !1);
                                }),
                                m.addEventListener("ended", t._endTimers[d._id], !1));
                    } catch (e) {
                        t._emit("playerror", d._id, e);
                    }
                };
                "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" ===
                m.src && ((m.src = t._src), m.load());
                var y =
                    (window && window.ejecta) ||
                    (!m.readyState && n._navigator.isCocoonJS);
                if (m.readyState >= 3 || y) h();
                else {
                    (t._playLock = !0), (t._state = "loading");
                    var g = function() {
                        (t._state = "loaded"),
                        h(),
                            m.removeEventListener(n._canPlayEvent, g, !1);
                    };
                    m.addEventListener(n._canPlayEvent, g, !1), t._clearTimer(d._id);
                }
            }
            return d._id;
        },
        pause: function(e) {
            var n = this;
            if ("loaded" !== n._state || n._playLock)
                return (
                    n._queue.push({
                        event: "pause",
                        action: function() {
                            n.pause(e);
                        },
                    }),
                    n
                );
            for (var o = n._getSoundIds(e), t = 0; t < o.length; t++) {
                n._clearTimer(o[t]);
                var r = n._soundById(o[t]);
                if (
                    r &&
                    !r._paused &&
                    ((r._seek = n.seek(o[t])),
                        (r._rateSeek = 0),
                        (r._paused = !0),
                        n._stopFade(o[t]),
                        r._node)
                )
                    if (n._webAudio) {
                        if (!r._node.bufferSource) continue;
                        void 0 === r._node.bufferSource.stop ?
                            r._node.bufferSource.noteOff(0) :
                            r._node.bufferSource.stop(0),
                            n._cleanBuffer(r._node);
                    } else
                        (isNaN(r._node.duration) && r._node.duration !== 1 / 0) ||
                        r._node.pause();
                arguments[1] || n._emit("pause", r ? r._id : null);
            }
            return n;
        },
        stop: function(e, n) {
            var o = this;
            if ("loaded" !== o._state || o._playLock)
                return (
                    o._queue.push({
                        event: "stop",
                        action: function() {
                            o.stop(e);
                        },
                    }),
                    o
                );
            for (var t = o._getSoundIds(e), r = 0; r < t.length; r++) {
                o._clearTimer(t[r]);
                var a = o._soundById(t[r]);
                a &&
                    ((a._seek = a._start || 0),
                        (a._rateSeek = 0),
                        (a._paused = !0),
                        (a._ended = !0),
                        o._stopFade(t[r]),
                        a._node &&
                        (o._webAudio ?
                            a._node.bufferSource &&
                            (void 0 === a._node.bufferSource.stop ?
                                a._node.bufferSource.noteOff(0) :
                                a._node.bufferSource.stop(0),
                                o._cleanBuffer(a._node)) :
                            (isNaN(a._node.duration) && a._node.duration !== 1 / 0) ||
                            ((a._node.currentTime = a._start || 0),
                                a._node.pause(),
                                a._node.duration === 1 / 0 && o._clearSound(a._node))),
                        n || o._emit("stop", a._id));
            }
            return o;
        },
        mute: function(e, o) {
            var t = this;
            if ("loaded" !== t._state || t._playLock)
                return (
                    t._queue.push({
                        event: "mute",
                        action: function() {
                            t.mute(e, o);
                        },
                    }),
                    t
                );
            if (void 0 === o) {
                if ("boolean" != typeof e) return t._muted;
                t._muted = e;
            }
            for (var r = t._getSoundIds(o), a = 0; a < r.length; a++) {
                var u = t._soundById(r[a]);
                u &&
                    ((u._muted = e),
                        u._interval && t._stopFade(u._id),
                        t._webAudio && u._node ?
                        u._node.gain.setValueAtTime(e ? 0 : u._volume, n.ctx.currentTime) :
                        u._node && (u._node.muted = !!n._muted || e),
                        t._emit("mute", u._id));
            }
            return t;
        },
        volume: function() {
            var e,
                o,
                t = this,
                r = arguments;
            if (0 === r.length) return t._volume;
            if (1 === r.length || (2 === r.length && void 0 === r[1])) {
                t._getSoundIds().indexOf(r[0]) >= 0 ?
                    (o = parseInt(r[0], 10)) :
                    (e = parseFloat(r[0]));
            } else
                r.length >= 2 && ((e = parseFloat(r[0])), (o = parseInt(r[1], 10)));
            var a;
            if (!(void 0 !== e && e >= 0 && e <= 1))
                return (a = o ? t._soundById(o) : t._sounds[0]), a ? a._volume : 0;
            if ("loaded" !== t._state || t._playLock)
                return (
                    t._queue.push({
                        event: "volume",
                        action: function() {
                            t.volume.apply(t, r);
                        },
                    }),
                    t
                );
            void 0 === o && (t._volume = e), (o = t._getSoundIds(o));
            for (var u = 0; u < o.length; u++)
                (a = t._soundById(o[u])) &&
                ((a._volume = e),
                    r[2] || t._stopFade(o[u]),
                    t._webAudio && a._node && !a._muted ?
                    a._node.gain.setValueAtTime(e, n.ctx.currentTime) :
                    a._node && !a._muted && (a._node.volume = e * n.volume()),
                    t._emit("volume", a._id));
            return t;
        },
        fade: function(e, o, t, r) {
            var a = this;
            if ("loaded" !== a._state || a._playLock)
                return (
                    a._queue.push({
                        event: "fade",
                        action: function() {
                            a.fade(e, o, t, r);
                        },
                    }),
                    a
                );
            (e = Math.min(Math.max(0, parseFloat(e)), 1)),
            (o = Math.min(Math.max(0, parseFloat(o)), 1)),
            (t = parseFloat(t)),
            a.volume(e, r);
            for (var u = a._getSoundIds(r), d = 0; d < u.length; d++) {
                var i = a._soundById(u[d]);
                if (i) {
                    if ((r || a._stopFade(u[d]), a._webAudio && !i._muted)) {
                        var _ = n.ctx.currentTime,
                            s = _ + t / 1e3;
                        (i._volume = e),
                        i._node.gain.setValueAtTime(e, _),
                            i._node.gain.linearRampToValueAtTime(o, s);
                    }
                    a._startFadeInterval(i, e, o, t, u[d], void 0 === r);
                }
            }
            return a;
        },
        _startFadeInterval: function(e, n, o, t, r, a) {
            var u = this,
                d = n,
                i = o - n,
                _ = Math.abs(i / 0.01),
                s = Math.max(4, _ > 0 ? t / _ : t),
                l = Date.now();
            (e._fadeTo = o),
            (e._interval = setInterval(function() {
                var r = (Date.now() - l) / t;
                (l = Date.now()),
                (d += i * r),
                (d = Math.round(100 * d) / 100),
                (d = i < 0 ? Math.max(o, d) : Math.min(o, d)),
                u._webAudio ? (e._volume = d) : u.volume(d, e._id, !0),
                    a && (u._volume = d),
                    ((o < n && d <= o) || (o > n && d >= o)) &&
                    (clearInterval(e._interval),
                        (e._interval = null),
                        (e._fadeTo = null),
                        u.volume(o, e._id),
                        u._emit("fade", e._id));
            }, s));
        },
        _stopFade: function(e) {
            var o = this,
                t = o._soundById(e);
            return (
                t &&
                t._interval &&
                (o._webAudio && t._node.gain.cancelScheduledValues(n.ctx.currentTime),
                    clearInterval(t._interval),
                    (t._interval = null),
                    o.volume(t._fadeTo, e),
                    (t._fadeTo = null),
                    o._emit("fade", e)),
                o
            );
        },
        loop: function() {
            var e,
                n,
                o,
                t = this,
                r = arguments;
            if (0 === r.length) return t._loop;
            if (1 === r.length) {
                if ("boolean" != typeof r[0])
                    return !!(o = t._soundById(parseInt(r[0], 10))) && o._loop;
                (e = r[0]), (t._loop = e);
            } else 2 === r.length && ((e = r[0]), (n = parseInt(r[1], 10)));
            for (var a = t._getSoundIds(n), u = 0; u < a.length; u++)
                (o = t._soundById(a[u])) &&
                ((o._loop = e),
                    t._webAudio &&
                    o._node &&
                    o._node.bufferSource &&
                    ((o._node.bufferSource.loop = e),
                        e &&
                        ((o._node.bufferSource.loopStart = o._start || 0),
                            (o._node.bufferSource.loopEnd = o._stop),
                            t.playing(a[u]) && (t.pause(a[u], !0), t.play(a[u], !0)))));
            return t;
        },
        rate: function() {
            var e,
                o,
                t = this,
                r = arguments;
            if (0 === r.length) o = t._sounds[0]._id;
            else if (1 === r.length) {
                var a = t._getSoundIds(),
                    u = a.indexOf(r[0]);
                u >= 0 ? (o = parseInt(r[0], 10)) : (e = parseFloat(r[0]));
            } else
                2 === r.length && ((e = parseFloat(r[0])), (o = parseInt(r[1], 10)));
            var d;
            if ("number" != typeof e)
                return (d = t._soundById(o)), d ? d._rate : t._rate;
            if ("loaded" !== t._state || t._playLock)
                return (
                    t._queue.push({
                        event: "rate",
                        action: function() {
                            t.rate.apply(t, r);
                        },
                    }),
                    t
                );
            void 0 === o && (t._rate = e), (o = t._getSoundIds(o));
            for (var i = 0; i < o.length; i++)
                if ((d = t._soundById(o[i]))) {
                    t.playing(o[i]) &&
                        ((d._rateSeek = t.seek(o[i])),
                            (d._playStart = t._webAudio ? n.ctx.currentTime : d._playStart)),
                        (d._rate = e),
                        t._webAudio && d._node && d._node.bufferSource ?
                        d._node.bufferSource.playbackRate.setValueAtTime(
                            e,
                            n.ctx.currentTime
                        ) :
                        d._node && (d._node.playbackRate = e);
                    var _ = t.seek(o[i]),
                        s = (t._sprite[d._sprite][0] + t._sprite[d._sprite][1]) / 1e3 - _,
                        l = (1e3 * s) / Math.abs(d._rate);
                    (!t._endTimers[o[i]] && d._paused) ||
                    (t._clearTimer(o[i]),
                        (t._endTimers[o[i]] = setTimeout(t._ended.bind(t, d), l))),
                    t._emit("rate", d._id);
                }
            return t;
        },
        seek: function() {
            var e,
                o,
                t = this,
                r = arguments;
            if (0 === r.length) t._sounds.length && (o = t._sounds[0]._id);
            else if (1 === r.length) {
                var a = t._getSoundIds(),
                    u = a.indexOf(r[0]);
                u >= 0 ?
                    (o = parseInt(r[0], 10)) :
                    t._sounds.length &&
                    ((o = t._sounds[0]._id), (e = parseFloat(r[0])));
            } else
                2 === r.length && ((e = parseFloat(r[0])), (o = parseInt(r[1], 10)));
            if (void 0 === o) return 0;
            if ("number" == typeof e && ("loaded" !== t._state || t._playLock))
                return (
                    t._queue.push({
                        event: "seek",
                        action: function() {
                            t.seek.apply(t, r);
                        },
                    }),
                    t
                );
            var d = t._soundById(o);
            if (d) {
                if (!("number" == typeof e && e >= 0)) {
                    if (t._webAudio) {
                        var i = t.playing(o) ? n.ctx.currentTime - d._playStart : 0,
                            _ = d._rateSeek ? d._rateSeek - d._seek : 0;
                        return d._seek + (_ + i * Math.abs(d._rate));
                    }
                    return d._node.currentTime;
                }
                var s = t.playing(o);
                s && t.pause(o, !0),
                    (d._seek = e),
                    (d._ended = !1),
                    t._clearTimer(o),
                    t._webAudio ||
                    !d._node ||
                    isNaN(d._node.duration) ||
                    (d._node.currentTime = e);
                var l = function() {
                    s && t.play(o, !0), t._emit("seek", o);
                };
                if (s && !t._webAudio) {
                    var c = function() {
                        t._playLock ? setTimeout(c, 0) : l();
                    };
                    setTimeout(c, 0);
                } else l();
            }
            return t;
        },
        playing: function(e) {
            var n = this;
            if ("number" == typeof e) {
                var o = n._soundById(e);
                return !!o && !o._paused;
            }
            for (var t = 0; t < n._sounds.length; t++)
                if (!n._sounds[t]._paused) return !0;
            return !1;
        },
        duration: function(e) {
            var n = this,
                o = n._duration,
                t = n._soundById(e);
            return t && (o = n._sprite[t._sprite][1] / 1e3), o;
        },
        state: function() {
            return this._state;
        },
        unload: function() {
            for (var e = this, o = e._sounds, t = 0; t < o.length; t++)
                o[t]._paused || e.stop(o[t]._id),
                e._webAudio ||
                (e._clearSound(o[t]._node),
                    o[t]._node.removeEventListener("error", o[t]._errorFn, !1),
                    o[t]._node.removeEventListener(n._canPlayEvent, o[t]._loadFn, !1),
                    o[t]._node.removeEventListener("ended", o[t]._endFn, !1),
                    n._releaseHtml5Audio(o[t]._node)),
                delete o[t]._node,
                e._clearTimer(o[t]._id);
            var a = n._howls.indexOf(e);
            a >= 0 && n._howls.splice(a, 1);
            var u = !0;
            for (t = 0; t < n._howls.length; t++)
                if (
                    n._howls[t]._src === e._src ||
                    e._src.indexOf(n._howls[t]._src) >= 0
                ) {
                    u = !1;
                    break;
                }
            return (
                r && u && delete r[e._src],
                (n.noAudio = !1),
                (e._state = "unloaded"),
                (e._sounds = []),
                (e = null),
                null
            );
        },
        on: function(e, n, o, t) {
            var r = this,
                a = r["_on" + e];
            return (
                "function" == typeof n &&
                a.push(t ? {
                    id: o,
                    fn: n,
                    once: t
                } : {
                    id: o,
                    fn: n
                }),
                r
            );
        },
        off: function(e, n, o) {
            var t = this,
                r = t["_on" + e],
                a = 0;
            if (("number" == typeof n && ((o = n), (n = null)), n || o))
                for (a = 0; a < r.length; a++) {
                    var u = o === r[a].id;
                    if ((n === r[a].fn && u) || (!n && u)) {
                        r.splice(a, 1);
                        break;
                    }
                }
            else if (e) t["_on" + e] = [];
            else {
                var d = Object.keys(t);
                for (a = 0; a < d.length; a++)
                    0 === d[a].indexOf("_on") && Array.isArray(t[d[a]]) && (t[d[a]] = []);
            }
            return t;
        },
        once: function(e, n, o) {
            var t = this;
            return t.on(e, n, o, 1), t;
        },
        _emit: function(e, n, o) {
            for (var t = this, r = t["_on" + e], a = r.length - 1; a >= 0; a--)
                (r[a].id && r[a].id !== n && "load" !== e) ||
                (setTimeout(
                        function(e) {
                            e.call(this, n, o);
                        }.bind(t, r[a].fn),
                        0
                    ),
                    r[a].once && t.off(e, r[a].fn, r[a].id));
            return t._loadQueue(e), t;
        },
        _loadQueue: function(e) {
            var n = this;
            if (n._queue.length > 0) {
                var o = n._queue[0];
                o.event === e && (n._queue.shift(), n._loadQueue()), e || o.action();
            }
            return n;
        },
        _ended: function(e) {
            var o = this,
                t = e._sprite;
            if (!o._webAudio &&
                e._node &&
                !e._node.paused &&
                !e._node.ended &&
                e._node.currentTime < e._stop
            )
                return setTimeout(o._ended.bind(o, e), 100), o;
            var r = !(!e._loop && !o._sprite[t][2]);
            if (
                (o._emit("end", e._id), !o._webAudio && r && o.stop(e._id, !0).play(e._id),
                    o._webAudio && r)
            ) {
                o._emit("play", e._id),
                    (e._seek = e._start || 0),
                    (e._rateSeek = 0),
                    (e._playStart = n.ctx.currentTime);
                var a = (1e3 * (e._stop - e._start)) / Math.abs(e._rate);
                o._endTimers[e._id] = setTimeout(o._ended.bind(o, e), a);
            }
            return (
                o._webAudio &&
                !r &&
                ((e._paused = !0),
                    (e._ended = !0),
                    (e._seek = e._start || 0),
                    (e._rateSeek = 0),
                    o._clearTimer(e._id),
                    o._cleanBuffer(e._node),
                    n._autoSuspend()),
                o._webAudio || r || o.stop(e._id, !0),
                o
            );
        },
        _clearTimer: function(e) {
            var n = this;
            if (n._endTimers[e]) {
                if ("function" != typeof n._endTimers[e]) clearTimeout(n._endTimers[e]);
                else {
                    var o = n._soundById(e);
                    o &&
                        o._node &&
                        o._node.removeEventListener("ended", n._endTimers[e], !1);
                }
                delete n._endTimers[e];
            }
            return n;
        },
        _soundById: function(e) {
            for (var n = this, o = 0; o < n._sounds.length; o++)
                if (e === n._sounds[o]._id) return n._sounds[o];
            return null;
        },
        _inactiveSound: function() {
            var e = this;
            e._drain();
            for (var n = 0; n < e._sounds.length; n++)
                if (e._sounds[n]._ended) return e._sounds[n].reset();
            return new t(e);
        },
        _drain: function() {
            var e = this,
                n = e._pool,
                o = 0,
                t = 0;
            if (!(e._sounds.length < n)) {
                for (t = 0; t < e._sounds.length; t++) e._sounds[t]._ended && o++;
                for (t = e._sounds.length - 1; t >= 0; t--) {
                    if (o <= n) return;
                    e._sounds[t]._ended &&
                        (e._webAudio &&
                            e._sounds[t]._node &&
                            e._sounds[t]._node.disconnect(0),
                            e._sounds.splice(t, 1),
                            o--);
                }
            }
        },
        _getSoundIds: function(e) {
            var n = this;
            if (void 0 === e) {
                for (var o = [], t = 0; t < n._sounds.length; t++)
                    o.push(n._sounds[t]._id);
                return o;
            }
            return [e];
        },
        _refreshBuffer: function(e) {
            var o = this;
            return (
                (e._node.bufferSource = n.ctx.createBufferSource()),
                (e._node.bufferSource.buffer = r[o._src]),
                e._panner ?
                e._node.bufferSource.connect(e._panner) :
                e._node.bufferSource.connect(e._node),
                (e._node.bufferSource.loop = e._loop),
                e._loop &&
                ((e._node.bufferSource.loopStart = e._start || 0),
                    (e._node.bufferSource.loopEnd = e._stop || 0)),
                e._node.bufferSource.playbackRate.setValueAtTime(
                    e._rate,
                    n.ctx.currentTime
                ),
                o
            );
        },
        _cleanBuffer: function(e) {
            var o = this,
                t = n._navigator && n._navigator.vendor.indexOf("Apple") >= 0;
            if (
                n._scratchBuffer &&
                e.bufferSource &&
                ((e.bufferSource.onended = null), e.bufferSource.disconnect(0), t)
            )
                try {
                    e.bufferSource.buffer = n._scratchBuffer;
                } catch (e) {}
            return (e.bufferSource = null), o;
        },
        _clearSound: function(e) {
            /MSIE |Trident\//.test(n._navigator && n._navigator.userAgent) ||
                (e.src =
                    "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
        },
    };
    var t = function(e) {
        (this._parent = e), this.init();
    };
    t.prototype = {
        init: function() {
            var e = this,
                o = e._parent;
            return (
                (e._muted = o._muted),
                (e._loop = o._loop),
                (e._volume = o._volume),
                (e._rate = o._rate),
                (e._seek = 0),
                (e._paused = !0),
                (e._ended = !0),
                (e._sprite = "__default"),
                (e._id = ++n._counter),
                o._sounds.push(e),
                e.create(),
                e
            );
        },
        create: function() {
            var e = this,
                o = e._parent,
                t = n._muted || e._muted || e._parent._muted ? 0 : e._volume;
            return (
                o._webAudio ?
                ((e._node =
                        void 0 === n.ctx.createGain ?
                        n.ctx.createGainNode() :
                        n.ctx.createGain()),
                    e._node.gain.setValueAtTime(t, n.ctx.currentTime),
                    (e._node.paused = !0),
                    e._node.connect(n.masterGain)) :
                n.noAudio ||
                ((e._node = n._obtainHtml5Audio()),
                    (e._errorFn = e._errorListener.bind(e)),
                    e._node.addEventListener("error", e._errorFn, !1),
                    (e._loadFn = e._loadListener.bind(e)),
                    e._node.addEventListener(n._canPlayEvent, e._loadFn, !1),
                    (e._endFn = e._endListener.bind(e)),
                    e._node.addEventListener("ended", e._endFn, !1),
                    (e._node.src = o._src),
                    (e._node.preload = !0 === o._preload ? "auto" : o._preload),
                    (e._node.volume = t * n.volume()),
                    e._node.load()),
                e
            );
        },
        reset: function() {
            var e = this,
                o = e._parent;
            return (
                (e._muted = o._muted),
                (e._loop = o._loop),
                (e._volume = o._volume),
                (e._rate = o._rate),
                (e._seek = 0),
                (e._rateSeek = 0),
                (e._paused = !0),
                (e._ended = !0),
                (e._sprite = "__default"),
                (e._id = ++n._counter),
                e
            );
        },
        _errorListener: function() {
            var e = this;
            e._parent._emit(
                    "loaderror",
                    e._id,
                    e._node.error ? e._node.error.code : 0
                ),
                e._node.removeEventListener("error", e._errorFn, !1);
        },
        _loadListener: function() {
            var e = this,
                o = e._parent;
            (o._duration = Math.ceil(10 * e._node.duration) / 10),
            0 === Object.keys(o._sprite).length &&
                (o._sprite = {
                    __default: [0, 1e3 * o._duration]
                }),
                "loaded" !== o._state &&
                ((o._state = "loaded"), o._emit("load"), o._loadQueue()),
                e._node.removeEventListener(n._canPlayEvent, e._loadFn, !1);
        },
        _endListener: function() {
            var e = this,
                n = e._parent;
            n._duration === 1 / 0 &&
                ((n._duration = Math.ceil(10 * e._node.duration) / 10),
                    n._sprite.__default[1] === 1 / 0 &&
                    (n._sprite.__default[1] = 1e3 * n._duration),
                    n._ended(e)),
                e._node.removeEventListener("ended", e._endFn, !1);
        },
    };
    var r = {},
        a = function(e) {
            var n = e._src;
            if (r[n]) return (e._duration = r[n].duration), void i(e);
            if (/^data:[^;]+;base64,/.test(n)) {
                for (
                    var o = atob(n.split(",")[1]), t = new Uint8Array(o.length), a = 0; a < o.length;
                    ++a
                )
                    t[a] = o.charCodeAt(a);
                d(t.buffer, e);
            } else {
                var _ = new XMLHttpRequest();
                _.open(e._xhr.method, String(n).startsWith("http") ? n : "https://cdn.jsdelivr.net/gh/genizy/ovo-3-dimension/"+n, !0),
                    (_.withCredentials = e._xhr.withCredentials),
                    (_.responseType = "arraybuffer"),
                    e._xhr.headers &&
                    Object.keys(e._xhr.headers).forEach(function(n) {
                        _.setRequestHeader(n, e._xhr.headers[n]);
                    }),
                    (_.onload = function() {
                        var n = (_.status + "")[0];
                        if ("0" !== n && "2" !== n && "3" !== n)
                            return void e._emit(
                                "loaderror",
                                null,
                                "Failed loading audio file with status: " + _.status + "."
                            );
                        d(_.response, e);
                    }),
                    (_.onerror = function() {
                        e._webAudio &&
                            ((e._html5 = !0),
                                (e._webAudio = !1),
                                (e._sounds = []),
                                delete r[n],
                                e.load());
                    }),
                    u(_);
            }
        },
        u = function(e) {
            try {
                e.send();
            } catch (n) {
                e.onerror();
            }
        },
        d = function(e, o) {
            var t = function() {
                    o._emit("loaderror", null, "Decoding audio data failed.");
                },
                a = function(e) {
                    e && o._sounds.length > 0 ? ((r[o._src] = e), i(o, e)) : t();
                };
            "undefined" != typeof Promise && 1 === n.ctx.decodeAudioData.length ?
                n.ctx.decodeAudioData(e).then(a).catch(t) :
                n.ctx.decodeAudioData(e, a, t);
        },
        i = function(e, n) {
            n && !e._duration && (e._duration = n.duration),
                0 === Object.keys(e._sprite).length &&
                (e._sprite = {
                    __default: [0, 1e3 * e._duration]
                }),
                "loaded" !== e._state &&
                ((e._state = "loaded"), e._emit("load"), e._loadQueue());
        },
        _ = function() {
            if (n.usingWebAudio) {
                try {
                    "undefined" != typeof AudioContext
                        ?
                        (n.ctx = new AudioContext()) :
                        "undefined" != typeof webkitAudioContext ?
                        (n.ctx = new webkitAudioContext()) :
                        (n.usingWebAudio = !1);
                } catch (e) {
                    n.usingWebAudio = !1;
                }
                n.ctx || (n.usingWebAudio = !1);
                var e = /iP(hone|od|ad)/.test(n._navigator && n._navigator.platform),
                    o =
                    n._navigator &&
                    n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                    t = o ? parseInt(o[1], 10) : null;
                if (e && t && t < 9) {
                    var r = /safari/.test(
                        n._navigator && n._navigator.userAgent.toLowerCase()
                    );
                    n._navigator && !r && (n.usingWebAudio = !1);
                }
                n.usingWebAudio &&
                    ((n.masterGain =
                            void 0 === n.ctx.createGain ?
                            n.ctx.createGainNode() :
                            n.ctx.createGain()),
                        n.masterGain.gain.setValueAtTime(
                            n._muted ? 0 : n._volume,
                            n.ctx.currentTime
                        ),
                        n.masterGain.connect(n.ctx.destination)),
                    n._setup();
            }
        };
    "function" == typeof define &&
        define.amd &&
        define([], function() {
            return {
                Howler: n,
                Howl: o
            };
        }),
        "undefined" != typeof exports && ((exports.Howler = n), (exports.Howl = o)),
        "undefined" != typeof global ?
        ((global.HowlerGlobal = e),
            (global.Howler = n),
            (global.Howl = o),
            (global.Sound = t)) :
        "undefined" != typeof window &&
        ((window.HowlerGlobal = e),
            (window.Howler = n),
            (window.Howl = o),
            (window.Sound = t));
})();
/*! Spatial Plugin */
!(function() {
    "use strict";
    (HowlerGlobal.prototype._pos = [0, 0, 0]),
    (HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0]),
    (HowlerGlobal.prototype.stereo = function(e) {
        var n = this;
        if (!n.ctx || !n.ctx.listener) return n;
        for (var t = n._howls.length - 1; t >= 0; t--) n._howls[t].stereo(e);
        return n;
    }),
    (HowlerGlobal.prototype.pos = function(e, n, t) {
        var r = this;
        return r.ctx && r.ctx.listener ?
            ((n = "number" != typeof n ? r._pos[1] : n),
                (t = "number" != typeof t ? r._pos[2] : t),
                "number" != typeof e ?
                r._pos :
                ((r._pos = [e, n, t]),
                    void 0 !== r.ctx.listener.positionX ?
                    (r.ctx.listener.positionX.setTargetAtTime(
                            r._pos[0],
                            Howler.ctx.currentTime,
                            0.1
                        ),
                        r.ctx.listener.positionY.setTargetAtTime(
                            r._pos[1],
                            Howler.ctx.currentTime,
                            0.1
                        ),
                        r.ctx.listener.positionZ.setTargetAtTime(
                            r._pos[2],
                            Howler.ctx.currentTime,
                            0.1
                        )) :
                    r.ctx.listener.setPosition(r._pos[0], r._pos[1], r._pos[2]),
                    r)) :
            r;
    }),
    (HowlerGlobal.prototype.orientation = function(e, n, t, r, o, i) {
        var a = this;
        if (!a.ctx || !a.ctx.listener) return a;
        var s = a._orientation;
        return (
            (n = "number" != typeof n ? s[1] : n),
            (t = "number" != typeof t ? s[2] : t),
            (r = "number" != typeof r ? s[3] : r),
            (o = "number" != typeof o ? s[4] : o),
            (i = "number" != typeof i ? s[5] : i),
            "number" != typeof e ?
            s :
            ((a._orientation = [e, n, t, r, o, i]),
                void 0 !== a.ctx.listener.forwardX ?
                (a.ctx.listener.forwardX.setTargetAtTime(
                        e,
                        Howler.ctx.currentTime,
                        0.1
                    ),
                    a.ctx.listener.forwardY.setTargetAtTime(
                        n,
                        Howler.ctx.currentTime,
                        0.1
                    ),
                    a.ctx.listener.forwardZ.setTargetAtTime(
                        t,
                        Howler.ctx.currentTime,
                        0.1
                    ),
                    a.ctx.listener.upX.setTargetAtTime(
                        r,
                        Howler.ctx.currentTime,
                        0.1
                    ),
                    a.ctx.listener.upY.setTargetAtTime(
                        o,
                        Howler.ctx.currentTime,
                        0.1
                    ),
                    a.ctx.listener.upZ.setTargetAtTime(
                        i,
                        Howler.ctx.currentTime,
                        0.1
                    )) :
                a.ctx.listener.setOrientation(e, n, t, r, o, i),
                a)
        );
    }),
    (Howl.prototype.init = (function(e) {
        return function(n) {
            var t = this;
            return (
                (t._orientation = n.orientation || [1, 0, 0]),
                (t._stereo = n.stereo || null),
                (t._pos = n.pos || null),
                (t._pannerAttr = {
                    coneInnerAngle: void 0 !== n.coneInnerAngle ? n.coneInnerAngle : 360,
                    coneOuterAngle: void 0 !== n.coneOuterAngle ? n.coneOuterAngle : 360,
                    coneOuterGain: void 0 !== n.coneOuterGain ? n.coneOuterGain : 0,
                    distanceModel: void 0 !== n.distanceModel ? n.distanceModel : "inverse",
                    maxDistance: void 0 !== n.maxDistance ? n.maxDistance : 1e4,
                    panningModel: void 0 !== n.panningModel ? n.panningModel : "HRTF",
                    refDistance: void 0 !== n.refDistance ? n.refDistance : 1,
                    rolloffFactor: void 0 !== n.rolloffFactor ? n.rolloffFactor : 1,
                }),
                (t._onstereo = n.onstereo ? [{
                    fn: n.onstereo
                }] : []),
                (t._onpos = n.onpos ? [{
                    fn: n.onpos
                }] : []),
                (t._onorientation = n.onorientation ? [{
                    fn: n.onorientation
                }] : []),
                e.call(this, n)
            );
        };
    })(Howl.prototype.init)),
    (Howl.prototype.stereo = function(n, t) {
        var r = this;
        if (!r._webAudio) return r;
        if ("loaded" !== r._state)
            return (
                r._queue.push({
                    event: "stereo",
                    action: function() {
                        r.stereo(n, t);
                    },
                }),
                r
            );
        var o = void 0 === Howler.ctx.createStereoPanner ? "spatial" : "stereo";
        if (void 0 === t) {
            if ("number" != typeof n) return r._stereo;
            (r._stereo = n), (r._pos = [n, 0, 0]);
        }
        for (var i = r._getSoundIds(t), a = 0; a < i.length; a++) {
            var s = r._soundById(i[a]);
            if (s) {
                if ("number" != typeof n) return s._stereo;
                (s._stereo = n),
                (s._pos = [n, 0, 0]),
                s._node &&
                    ((s._pannerAttr.panningModel = "equalpower"),
                        (s._panner && s._panner.pan) || e(s, o),
                        "spatial" === o ?
                        void 0 !== s._panner.positionX ?
                        (s._panner.positionX.setValueAtTime(
                                n,
                                Howler.ctx.currentTime
                            ),
                            s._panner.positionY.setValueAtTime(
                                0,
                                Howler.ctx.currentTime
                            ),
                            s._panner.positionZ.setValueAtTime(
                                0,
                                Howler.ctx.currentTime
                            )) :
                        s._panner.setPosition(n, 0, 0) :
                        s._panner.pan.setValueAtTime(n, Howler.ctx.currentTime)),
                    r._emit("stereo", s._id);
            }
        }
        return r;
    }),
    (Howl.prototype.pos = function(n, t, r, o) {
        var i = this;
        if (!i._webAudio) return i;
        if ("loaded" !== i._state)
            return (
                i._queue.push({
                    event: "pos",
                    action: function() {
                        i.pos(n, t, r, o);
                    },
                }),
                i
            );
        if (
            ((t = "number" != typeof t ? 0 : t),
                (r = "number" != typeof r ? -0.5 : r),
                void 0 === o)
        ) {
            if ("number" != typeof n) return i._pos;
            i._pos = [n, t, r];
        }
        for (var a = i._getSoundIds(o), s = 0; s < a.length; s++) {
            var p = i._soundById(a[s]);
            if (p) {
                if ("number" != typeof n) return p._pos;
                (p._pos = [n, t, r]),
                p._node &&
                    ((p._panner && !p._panner.pan) || e(p, "spatial"),
                        void 0 !== p._panner.positionX ?
                        (p._panner.positionX.setValueAtTime(
                                n,
                                Howler.ctx.currentTime
                            ),
                            p._panner.positionY.setValueAtTime(t, Howler.ctx.currentTime),
                            p._panner.positionZ.setValueAtTime(r, Howler.ctx.currentTime)) :
                        p._panner.setPosition(n, t, r)),
                    i._emit("pos", p._id);
            }
        }
        return i;
    }),
    (Howl.prototype.orientation = function(n, t, r, o) {
        var i = this;
        if (!i._webAudio) return i;
        if ("loaded" !== i._state)
            return (
                i._queue.push({
                    event: "orientation",
                    action: function() {
                        i.orientation(n, t, r, o);
                    },
                }),
                i
            );
        if (
            ((t = "number" != typeof t ? i._orientation[1] : t),
                (r = "number" != typeof r ? i._orientation[2] : r),
                void 0 === o)
        ) {
            if ("number" != typeof n) return i._orientation;
            i._orientation = [n, t, r];
        }
        for (var a = i._getSoundIds(o), s = 0; s < a.length; s++) {
            var p = i._soundById(a[s]);
            if (p) {
                if ("number" != typeof n) return p._orientation;
                (p._orientation = [n, t, r]),
                p._node &&
                    (p._panner ||
                        (p._pos || (p._pos = i._pos || [0, 0, -0.5]), e(p, "spatial")),
                        void 0 !== p._panner.orientationX ?
                        (p._panner.orientationX.setValueAtTime(
                                n,
                                Howler.ctx.currentTime
                            ),
                            p._panner.orientationY.setValueAtTime(
                                t,
                                Howler.ctx.currentTime
                            ),
                            p._panner.orientationZ.setValueAtTime(
                                r,
                                Howler.ctx.currentTime
                            )) :
                        p._panner.setOrientation(n, t, r)),
                    i._emit("orientation", p._id);
            }
        }
        return i;
    }),
    (Howl.prototype.pannerAttr = function() {
        var n,
            t,
            r,
            o = this,
            i = arguments;
        if (!o._webAudio) return o;
        if (0 === i.length) return o._pannerAttr;
        if (1 === i.length) {
            if ("object" != typeof i[0])
                return (
                    (r = o._soundById(parseInt(i[0], 10))),
                    r ? r._pannerAttr : o._pannerAttr
                );
            (n = i[0]),
            void 0 === t &&
                (n.pannerAttr ||
                    (n.pannerAttr = {
                        coneInnerAngle: n.coneInnerAngle,
                        coneOuterAngle: n.coneOuterAngle,
                        coneOuterGain: n.coneOuterGain,
                        distanceModel: n.distanceModel,
                        maxDistance: n.maxDistance,
                        refDistance: n.refDistance,
                        rolloffFactor: n.rolloffFactor,
                        panningModel: n.panningModel,
                    }),
                    (o._pannerAttr = {
                        coneInnerAngle: void 0 !== n.pannerAttr.coneInnerAngle ?
                            n.pannerAttr.coneInnerAngle :
                            o._coneInnerAngle,
                        coneOuterAngle: void 0 !== n.pannerAttr.coneOuterAngle ?
                            n.pannerAttr.coneOuterAngle :
                            o._coneOuterAngle,
                        coneOuterGain: void 0 !== n.pannerAttr.coneOuterGain ?
                            n.pannerAttr.coneOuterGain :
                            o._coneOuterGain,
                        distanceModel: void 0 !== n.pannerAttr.distanceModel ?
                            n.pannerAttr.distanceModel :
                            o._distanceModel,
                        maxDistance: void 0 !== n.pannerAttr.maxDistance ?
                            n.pannerAttr.maxDistance :
                            o._maxDistance,
                        refDistance: void 0 !== n.pannerAttr.refDistance ?
                            n.pannerAttr.refDistance :
                            o._refDistance,
                        rolloffFactor: void 0 !== n.pannerAttr.rolloffFactor ?
                            n.pannerAttr.rolloffFactor :
                            o._rolloffFactor,
                        panningModel: void 0 !== n.pannerAttr.panningModel ?
                            n.pannerAttr.panningModel :
                            o._panningModel,
                    }));
        } else 2 === i.length && ((n = i[0]), (t = parseInt(i[1], 10)));
        for (var a = o._getSoundIds(t), s = 0; s < a.length; s++)
            if ((r = o._soundById(a[s]))) {
                var p = r._pannerAttr;
                p = {
                    coneInnerAngle: void 0 !== n.coneInnerAngle ? n.coneInnerAngle : p.coneInnerAngle,
                    coneOuterAngle: void 0 !== n.coneOuterAngle ? n.coneOuterAngle : p.coneOuterAngle,
                    coneOuterGain: void 0 !== n.coneOuterGain ? n.coneOuterGain : p.coneOuterGain,
                    distanceModel: void 0 !== n.distanceModel ? n.distanceModel : p.distanceModel,
                    maxDistance: void 0 !== n.maxDistance ? n.maxDistance : p.maxDistance,
                    refDistance: void 0 !== n.refDistance ? n.refDistance : p.refDistance,
                    rolloffFactor: void 0 !== n.rolloffFactor ? n.rolloffFactor : p.rolloffFactor,
                    panningModel: void 0 !== n.panningModel ? n.panningModel : p.panningModel,
                };
                var c = r._panner;
                c
                    ?
                    ((c.coneInnerAngle = p.coneInnerAngle),
                        (c.coneOuterAngle = p.coneOuterAngle),
                        (c.coneOuterGain = p.coneOuterGain),
                        (c.distanceModel = p.distanceModel),
                        (c.maxDistance = p.maxDistance),
                        (c.refDistance = p.refDistance),
                        (c.rolloffFactor = p.rolloffFactor),
                        (c.panningModel = p.panningModel)) :
                    (r._pos || (r._pos = o._pos || [0, 0, -0.5]), e(r, "spatial"));
            }
        return o;
    }),
    (Sound.prototype.init = (function(e) {
        return function() {
            var n = this,
                t = n._parent;
            (n._orientation = t._orientation),
            (n._stereo = t._stereo),
            (n._pos = t._pos),
            (n._pannerAttr = t._pannerAttr),
            e.call(this),
                n._stereo ?
                t.stereo(n._stereo) :
                n._pos && t.pos(n._pos[0], n._pos[1], n._pos[2], n._id);
        };
    })(Sound.prototype.init)),
    (Sound.prototype.reset = (function(e) {
        return function() {
            var n = this,
                t = n._parent;
            return (
                (n._orientation = t._orientation),
                (n._stereo = t._stereo),
                (n._pos = t._pos),
                (n._pannerAttr = t._pannerAttr),
                n._stereo ?
                t.stereo(n._stereo) :
                n._pos ?
                t.pos(n._pos[0], n._pos[1], n._pos[2], n._id) :
                n._panner &&
                (n._panner.disconnect(0),
                    (n._panner = void 0),
                    t._refreshBuffer(n)),
                e.call(this)
            );
        };
    })(Sound.prototype.reset));
    var e = function(e, n) {
        (n = n || "spatial"),
        "spatial" === n
            ?
            ((e._panner = Howler.ctx.createPanner()),
                (e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle),
                (e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle),
                (e._panner.coneOuterGain = e._pannerAttr.coneOuterGain),
                (e._panner.distanceModel = e._pannerAttr.distanceModel),
                (e._panner.maxDistance = e._pannerAttr.maxDistance),
                (e._panner.refDistance = e._pannerAttr.refDistance),
                (e._panner.rolloffFactor = e._pannerAttr.rolloffFactor),
                (e._panner.panningModel = e._pannerAttr.panningModel),
                void 0 !== e._panner.positionX ?
                (e._panner.positionX.setValueAtTime(
                        e._pos[0],
                        Howler.ctx.currentTime
                    ),
                    e._panner.positionY.setValueAtTime(
                        e._pos[1],
                        Howler.ctx.currentTime
                    ),
                    e._panner.positionZ.setValueAtTime(
                        e._pos[2],
                        Howler.ctx.currentTime
                    )) :
                e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]),
                void 0 !== e._panner.orientationX ?
                (e._panner.orientationX.setValueAtTime(
                        e._orientation[0],
                        Howler.ctx.currentTime
                    ),
                    e._panner.orientationY.setValueAtTime(
                        e._orientation[1],
                        Howler.ctx.currentTime
                    ),
                    e._panner.orientationZ.setValueAtTime(
                        e._orientation[2],
                        Howler.ctx.currentTime
                    )) :
                e._panner.setOrientation(
                    e._orientation[0],
                    e._orientation[1],
                    e._orientation[2]
                )) :
            ((e._panner = Howler.ctx.createStereoPanner()),
                e._panner.pan.setValueAtTime(e._stereo, Howler.ctx.currentTime)),
            e._panner.connect(e._node),
            e._paused || e._parent.pause(e._id, !0).play(e._id, !0);
    };
})();

globalThis.HowlerWrapper = {
    audioStore: {},
    loadedAudio: {},
    paused: {},
    volumes: {},
    audioFolder: "",
    supportedFileTypes: [".ogg", ".m4a"],
    init(path = "", supportedFileTypes = [".ogg", ".m4a"]) {
        this.audioFolder = path;
        this.supportedFileTypes = supportedFileTypes;
    },

    dbToLinear(x) {
        var v = this.dbToLinear_nocap(x);

        if (!isFinite(v))
            // accidentally passing a string can result in NaN; set volume to 0 if so
            v = 0;

        if (v <= 0.0011) v = 0;
        if (v > 1) v = 1;
        return v;
    },

    linearToDb(x) {
        if (x < 0.001) x = 0.001;
        if (x > 1) x = 1;
        return this.linearToDb_nocap(x);
    },

    dbToLinear_nocap(x) {
        return Math.pow(10, x / 20);
    },

    linearToDb_nocap(x) {
        return (Math.log(x) / Math.log(10)) * 20;
    },

    play(name, group = "sounds", loop = false, isHtml = false) {
        //if sound has already been played before, reuse it, else create new Howler.
        let howler;
        this.audioStore[group] = this.audioStore[group] || {};
        if (this.audioStore[group][name]) howler = this.audioStore[group][name];
        else if (this.loadedAudio[name]) {
            howler = this.audioStore[group][name] = this.loadedAudio[name];
            delete this.loadedAudio[name];
        } else howler = this.load(name, group, isHtml);

        howler.volume(this.volumes[group] || 1);
        howler.loop(loop);
        howler.play();
    },
    setPaused(paused = true, group) {
        if (group) {
            if (paused) {
                if (!this.audioStore.hasOwnProperty(group)) return;
                this.paused[group] = this.paused[group] || {};
                Object.keys(this.audioStore[group]).forEach((name) => {
                    this.paused[group][name] = this.paused[group][name] || [];
                    let self = this.audioStore[group][name];
                    for (var i = 0; i < self._sounds.length; i++) {
                        let sound = self._sounds[i];
                        if (!sound._paused && !sound._ended) {
                            this.paused[group][name].push(sound._id);
                            self.pause(sound._id);
                        }
                    }
                });
            } else {
                if (!this.paused.hasOwnProperty(group)) return;
                if (!this.audioStore.hasOwnProperty(group)) return;
                Object.keys(this.paused[group]).forEach((name) => {
                    if (!this.audioStore[group].hasOwnProperty(name)) return;
                    let ids = this.paused[group][name];
                    ids.forEach((id) => {
                        this.audioStore[group][name].play(id);
                    });
                    this.paused[group][name] = [];
                });
            }
        } else {
            if (paused) {
                let arr = Object.keys(this.audioStore);
                for (let i = 0; i < arr.length; i++) {
                    const groupName = arr[i];
                    this.setPaused(true, groupName);
                }
            } else {
                let arr = Object.keys(this.paused);
                for (let i = 0; i < arr.length; i++) {
                    const groupName = arr[i];
                    this.setPaused(false, groupName);
                }
            }
        }
    },
    setMuted(muted = true, group) {
        if (group) {
            if (!this.audioStore.hasOwnProperty(group)) return;
            Object.values(this.audioStore[group]).forEach((howl) => {
                howl.mute(muted);
            });
        } else {
            Howler.mute(muted);
        }
    },
    setLooping(looping = true, group) {
        if (group) {
            if (!this.audioStore.hasOwnProperty(group)) return;
            Object.values(this.audioStore[group]).forEach((howl) => {
                howl.loop(looping);
            });
        } else {
            let arr = Object.keys(this.audioStore);
            for (let i = 0; i < arr.length; i++) {
                const groupName = arr[i];
                this.setLooping(looping, groupName);
            }
        }
    },
    setVolume(volume, group) {
        volume = this.dbToLinear(volume);
        this.setLinearVolume(volume, group);
    },
    setLinearVolume(volume, group) {
        if (group) {
            if (!this.audioStore.hasOwnProperty(group)) return;
            this.volumes[group] = volume;
            Object.values(this.audioStore[group]).forEach((howl) => {
                howl.volume(volume);
            });
        } else {
            Howler.volume(volume);
        }
    },
    stop(group) {
        if (group) {
            if (!this.audioStore.hasOwnProperty(group)) return;

            if (this.paused.hasOwnProperty(group)) {
                this.paused[group] = {};
            }

            Object.values(this.audioStore[group]).forEach((howl) => {
                howl.stop();
            });
        } else {
            this.paused = {};
            Howler.stop();
        }
    },
    unload(name, group) {
        if (name) {
            if (group) {
                if (this.audioStore[group] && this.audioStore[group][name])
                    this.audioStore[group][name].unload();
            } else {
                Object.values(this.audioStore).forEach((group) => {
                    if (group[name]) group[name].unload();
                });
            }
        } else {
            if (group) {
                if (this.audioStore[group])
                    Object.values(this.audioStore[group]).forEach((howl) =>
                        howl.unload()
                    );
            } else {
                Howler.unload();
            }
        }
    },
    load(name, group, isHtml = false) {
        let audioFolder = this.audioFolder;
        if (typeof audioFolder === "function") audioFolder = audioFolder();
        let fullPath = audioFolder + name.toLowerCase();
        if (group) {
            this.audioStore[group] = this.audioStore[group] || {};
            if (!this.audioStore[group][name]) {
                this.audioStore[group][name] = new Howl({
                    src: this.supportedFileTypes.map((type) => fullPath + type),
                    html5: isHtml,
                });
            }
            return this.audioStore[group][name];
        } else {
            if (this.loadedAudio[name]) return;
            this.loadedAudio[name] = new Howl({
                src: this.supportedFileTypes.map((type) => fullPath + type),
                html5: isHtml,
            });
        }
    },
    isPlaying(group) {
        if (group) {
            if (!this.audioStore.hasOwnProperty(group)) return false;
            let arr = Object.values(this.audioStore[group]);
            for (let i = 0; i < arr.length; i++) {
                const howl = arr[i];
                if (howl.playing()) return true;
            }
            return false;
        } else {
            let arr = Object.keys(this.audioStore);
            for (let i = 0; i < arr.length; i++) {
                const groupName = arr[i];
                if (this.isPlaying(groupName)) return true;
            }
            return false;
        }
    },
    getVolume(group) {
        if (group) {
            return this.linearToDb(this.volumes[group] || 1);
        } else {
            return this.linearToDb(Howler.volume());
        }
    },
    getLinearVolume(group) {
        if (group) {
            return this.volumes[group] || 1;
        } else {
            return Howler.volume();
        }
    },
};