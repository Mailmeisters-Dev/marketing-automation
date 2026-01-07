( () => {
    var ie = Object.create;
    var I = Object.defineProperty
      , re = Object.defineProperties
      , se = Object.getOwnPropertyDescriptor
      , ae = Object.getOwnPropertyDescriptors
      , ce = Object.getOwnPropertyNames
      , m = Object.getOwnPropertySymbols
      , de = Object.getPrototypeOf
      , v = Object.prototype.hasOwnProperty
      , T = Object.prototype.propertyIsEnumerable;
    var R = (e, t, n) => t in e ? I(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n
      , p = (e, t) => {
        for (var n in t || (t = {}))
            v.call(t, n) && R(e, n, t[n]);
        if (m)
            for (var n of m(t))
                T.call(t, n) && R(e, n, t[n]);
        return e
    }
      , S = (e, t) => re(e, ae(t));
    var N = (e, t) => {
        var n = {};
        for (var o in e)
            v.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
        if (e != null && m)
            for (var o of m(e))
                t.indexOf(o) < 0 && T.call(e, o) && (n[o] = e[o]);
        return n
    }
    ;
    var u = (e, t) => () => (e && (t = e(e = 0)),
    t);
    var le = (e, t) => () => (t || e((t = {
        exports: {}
    }).exports, t),
    t.exports);
    var pe = (e, t, n, o) => {
        if (t && typeof t == "object" || typeof t == "function")
            for (let i of ce(t))
                !v.call(e, i) && i !== n && I(e, i, {
                    get: () => t[i],
                    enumerable: !(o = se(t, i)) || o.enumerable
                });
        return e
    }
    ;
    var _e = (e, t, n) => (n = e != null ? ie(de(e)) : {},
    pe(t || !e || !e.__esModule ? I(n, "default", {
        value: e,
        enumerable: !0
    }) : n, e));
    var d = (e, t, n) => new Promise( (o, i) => {
        var s = c => {
            try {
                a(n.next(c))
            } catch (l) {
                i(l)
            }
        }
          , r = c => {
            try {
                a(n.throw(c))
            } catch (l) {
                i(l)
            }
        }
          , a = c => c.done ? o(c.value) : Promise.resolve(c.value).then(s, r);
        a((n = n.apply(e, t)).next())
    }
    );
    var P, w = u( () => {
        P = "WebPixel::Render"
    }
    );
    var g, O = u( () => {
        w();
        g = e => shopify.extend(P, e)
    }
    );
    var L = u( () => {
        O()
    }
    );
    var B = u( () => {
        L()
    }
    );
    var V, $, D, U, y, X, Y, K, j, q, G, M, W, h = u( () => {
        V = "https://a.klaviyo.com/client/event-bulk-create",
        $ = "https://a.klaviyo.com/client/events",
        D = "2024-10-15",
        U = "2025-07-15",
        y = "kl-post-identification-sync",
        X = "__kl_key",
        Y = JSON.stringify([]),
        K = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        j = /^\+?[1-9]\d{1,14}$/,
        q = "shopify-checkout-extension",
        G = "shopify-web-pixel",
        M = "shopify-web-pixel",
        W = "9BX3wh"
    }
    );
    function E(e, t, n=0, o, i) {
        return d(this, null, function*() {
            let s = i || 0
              , r = yield e();
            return (o ? o.includes(r.status) : r.status >= 400) && s < t ? (yield ye(n),
            E(e, t, n, o, s + 1)) : r
        })
    }
    var ue, me, ye, Ee, F, fe, Ie, ve, A, ge, he, Ae, J, be, z, xe, H, b = u( () => {
        h();
        ue = e => K.test(e),
        me = e => j.test(e),
        ye = e => new Promise(t => setTimeout(t, e));
        Ee = (e, t) => d(null, null, function*() {
            let n = yield e.getItem(y)
              , o = JSON.parse(n || Y)
              , i = o.slice(0, t)
              , s = o.slice(t);
            return {
                events: i || [],
                deleteCallback: () => e.setItem(y, JSON.stringify(s))
            }
        }),
        F = (e, t=1e3) => Ee(e, t),
        fe = e => d(null, null, function*() {
            return yield e.removeItem(y)
        }),
        Ie = new Set(["$exchange_id", "email", "id", "$email", "$id", "$anonymous", "$phone_number"]),
        ve = e => Set.prototype.has.call(Ie, e),
        A = !1,
        ge = (e, t, n) => ({
            data: {
                type: "event-bulk-create",
                attributes: {
                    profile: {
                        data: {
                            type: "profile",
                            attributes: p({}, t),
                            meta: {
                                identifiers: t
                            }
                        }
                    },
                    events: {
                        data: e.map(o => {
                            let _ = o
                              , {name: i, properties: s} = _
                              , r = N(_, ["name", "properties"])
                              , a = p(p({}, s), n || {})
                              , c = a.service;
                            return delete a.service,
                            {
                                type: "event",
                                attributes: p(p({
                                    metric: {
                                        data: {
                                            type: "metric",
                                            attributes: c === "klaviyo" ? {
                                                name: i,
                                                service: c
                                            } : {
                                                name: i
                                            }
                                        }
                                    }
                                }, r), Object.keys(a).length > 0 ? {
                                    properties: a
                                } : {})
                            }
                        }
                        )
                    }
                }
            }
        }),
        he = (e, t) => fetch(`${V}/?company_id=${e}`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "X-Klaviyo-Onsite": "1",
                "X-Klaviyo-API-Source": q,
                revision: D
            },
            body: JSON.stringify(t)
        }),
        Ae = (e, t, n, o) => {
            let i = ge(e, n, o);
            return E( () => he(t, i), 5, 1e3 + Math.random() * 1e3, [429])
        }
        ,
        J = {
            $exchange_id: "_kx",
            email: "email",
            id: "id",
            $email: "email",
            $id: "id",
            $anonymous: "anonymous_id",
            $phone_number: "phone_number"
        },
        be = e => {
            let t = {};
            return Object.keys(J).forEach(n => {
                if (ve(n)) {
                    let o = e[n];
                    if (o) {
                        let i = (n === "$email" || n === "email") && !ue(o)
                          , s = n === "$phone_number" && !me(o);
                        i || s || (t = S(p({}, t), {
                            [J[n]]: o
                        }))
                    }
                }
            }
            ),
            t
        }
        ,
        z = (e, t, n, o, i) => {
            if (e.events.length !== 0)
                return Ae(e.events, t, n, i).then(s => {
                    if (s.status === 429)
                        throw Error("Saving event cache due to rate limit.");
                    e.deleteCallback && e.deleteCallback()
                }
                ).then( () => F(o).then(s => z(s, t, n, o, i)))
        }
        ,
        xe = (e, t, n, o, i) => {
            let s = e;
            if (!s || A)
                return;
            let r = be(t);
            !r || Object.keys(r).length === 0 || (A = !0,
            F(n).then(a => z(a, s, r, n, o)).catch(a => {
                throw a
            }
            ).then( () => {
                fe(n),
                i && i()
            }
            ).catch( () => {}
            ).finally( () => {
                A = !1
            }
            ))
        }
        ,
        H = (e, t) => d(null, null, function*() {
            let n = yield t.getItem(X);
            if (!n)
                return;
            let o = e.data.checkout.email
              , i = e.data.checkout.phone;
            xe(n, p(p({}, o && {
                $email: o
            }), i && {
                $phone_number: i
            }), t, {
                anonymous_backfill_source: `checkout_pixel_${e.name}`
            })
        })
    }
    );
    var Ce, ke, Z, Q, ee = u( () => {
        b();
        h();
        Ce = (e, t) => fetch(`${$}/?company_id=${e}`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "X-Klaviyo-API-Source": G,
                "X-Klaviyo-User-Agent": M,
                revision: U
            },
            body: JSON.stringify(t)
        }),
        ke = (e, t) => E( () => Ce(e, t), 5, 1e3 + Math.random() * 1e3),
        Z = (e, t, n, o, i=!1) => d(null, null, function*() {
            let s = yield t.sessionStorage.getItem("_kx");
            if (!s) {
                i && console.log("No encoded kx not processing");
                return
            }
            var r = "";
            try {
                r = atob(s)
            } catch (oe) {
                console.warn("Error while parsing exchange id.", oe.message);
                return
            }
            if (!r.includes(".")) {
                i && console.log("Invalid kx not processing");
                return
            }
            let a = r.split(".")[1];
            if (!a || a === W) {
                i && console.log("Invalid cid not processing");
                return
            }
            let c = e.data.cartLine;
            if (!c) {
                i && console.log("Invalid cartLine not processing");
                return
            }
            let l = c.merchandise
              , _ = l.product
              , x = _.id
              , C = l.id;
            if (!x) {
                console.log("Shopify product_added_to_cart web pixel event missing product id");
                return
            }
            if (!C) {
                console.log("Shopify product_added_to_cart web pixel event missing merchandise id");
                return
            }
            let k = {
                $use_ip: !0,
                _kx: r,
                my_shopify_domain: o.data.shop.myshopifyDomain,
                detail: {
                    metadata: {},
                    payload: {
                        event_id: e.id,
                        event_date_time: e.timestamp,
                        event_type: "product_added_to_cart",
                        user_agent: o.context.navigator.userAgent,
                        client_id: e.clientId,
                        page_url: o.context.window.location.href,
                        currency: l.price.currencyCode,
                        product: {
                            product_id: x,
                            product_title: _.title,
                            variant_id: C,
                            variant_title: l.title || _.title,
                            quantity: c.quantity,
                            variant_price: l.price.amount,
                            product_vendor: _.vendor
                        }
                    }
                }
            }
              , ne = {
                data: {
                    type: "event",
                    attributes: {
                        metric: {
                            data: {
                                type: "metric",
                                attributes: {
                                    name: "Added to Cart",
                                    service: "shopify"
                                }
                            }
                        },
                        profile: {
                            data: {
                                type: "profile",
                                attributes: {
                                    _kx: r
                                }
                            }
                        },
                        properties: k
                    }
                }
            };
            i && console.log("Sending pixel event:", k),
            ke(a, ne)
        }),
        Q = function(e, t, n=!1) {
            return d(this, null, function*() {
                if (e.clientId) {
                    let i = yield t.cookie.get("shopify_client_id");
                    if (!i || i !== e.clientId) {
                        let r = new Date;
                        r.setFullYear(r.getFullYear() + 1);
                        let a = e.clientId;
                        yield t.cookie.set("shopify_client_id", `${a}; expires=${r.toUTCString()}; Path=/`),
                        n && console.log("[Klaviyo Web Pixel] Set shopify_client_id cookie", {
                            clientId: e.clientId,
                            previousValue: i || "none",
                            action: i ? "updated" : "new"
                        })
                    } else
                        n && console.log("[Klaviyo Web Pixel] Skipped setting shopify_client_id cookie (unchanged)", {
                            clientId: e.clientId
                        })
                }
            })
        }
    }
    );
    var te = le(f => {
        B();
        b();
        ee();
        var Re = ["checkout_completed", "payment_info_submitted", "checkout_contact_info_submitted", "checkout_shipping_info_submitted"];
        g( ({analytics: e, browser: t, settings: n, init: o}) => {
            console.info("k-web-pixel-version", 1),
            Re.map(r => {
                e.subscribe(r, a => d(null, null, function*() {
                    return H(a, t.localStorage)
                }))
            }
            );
            var i = !1
              , s = !1;
            if (n && n.webPixelConfig)
                try {
                    let r = atob(n.webPixelConfig)
                      , a = JSON.parse(r);
                    i = a.enableAddedToCartEvents === !0,
                    s = a.debugging === !0
                } catch (r) {
                    console.error("Error while parsing web pixel config data", r.message)
                }
            e.subscribe("page_viewed", r => d(null, null, function*() {
                Q(r, t, s)
            })),
            i && e.subscribe("product_added_to_cart", r => d(null, null, function*() {
                Z(r, t, n, o, s)
            }))
        }
        )
    }
    );
    var Fe = _e(te());
}
)();
