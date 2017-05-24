var io = "undefined" == typeof module ? {} : module.exports;
if (function() {
		if (function(a, b) {
				var c = a;
				c.version = "0.9.16", c.protocol = 1, c.transports = [], c.j = [], c.sockets = {}, c.connect = function(a, d) {
					var e,
						f,
						g = c.util.parseUri(a);
					b && b.location && (g.protocol = g.protocol || b.location.protocol.slice(0, -1), g.host = g.host || (b.document ? b.document.domain : b.location.hostname), g.port = g.port || b.location.port), e = c.util.uniqueUri(g);
					var h = {
						host : g.host,
						secure : "https" == g.protocol,
						port : g.port || ("https" == g.protocol ? 443 : 80),
						query : g.query || ""
					};
					return c.util.merge(h, d), (h["force new connection"] || !c.sockets[e]) && (f = new c.Socket(h)), !h["force new connection"] && f && (c.sockets[e] = f), f = f || c.sockets[e], f.of(g.path.length > 1 ? g.path : "")
				}
			}("object" == typeof module ? module.exports : this.io = {}, this), function(a, b) {
				var c = a.util = {},
					d = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
					e = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ];
				c.parseUri = function(a) {
					for (var b = d.exec(a || ""), c = {}, f = 14; f--;) c[e[f]] = b[f] || "";
					return c
				}, c.uniqueUri = function(a) {
					var c = a.protocol,
						d = a.host,
						e = a.port;
					return "document" in b ? (d = d || document.domain, e = e || ("https" == c && "https:" !== document.location.protocol ? 443 : document.location.port)) : (d = d || "localhost", e || "https" != c || (e = 443)), (c || "http") + "://" + d + ":" + (e || 80)
				}, c.query = function(a, b) {
					var d = c.chunkQuery(a || ""),
						e = [];
					c.merge(d, c.chunkQuery(b || ""));
					for (var f in d) d.hasOwnProperty(f) && e.push(f + "=" + d[f]);
					return e.length ? "?" + e.join("&") : ""
				}, c.chunkQuery = function(a) {
					for (var b, c = {}, d = a.split("&"), e = 0, f = d.length; f > e; ++e) b = d[e].split("="), b[0] && (c[b[0]] = b[1]);
					return c
				};
				var f = !1;
				c.load = function(a) {
					return "document" in b && "complete" === document.readyState || f ? a() : void c.on(b, "load", a, !1)
				}, c.on = function(a, b, c, d) {
					a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, d)
				}, c.request = function(a) {
					if (a && "undefined" != typeof XDomainRequest && !c.ua.hasCORS) return new XDomainRequest;
					if ("undefined" != typeof XMLHttpRequest && (!a || c.ua.hasCORS)) return new XMLHttpRequest;
					if (!a) try {
							return new (window[[ "Active" ].concat("Object").join("X")])("Microsoft.XMLHTTP")
						} catch (b) {} return null
				}, "undefined" != typeof window && c.load(function() {
					f = !0
				}), c.defer = function(a) {
					return c.ua.webkit && "undefined" == typeof importScripts ? void c.load(function() {
						setTimeout(a, 100)
					}) : a()
				}, c.merge = function(a, b, d, e) {
					var f,
						g = e || [],
						h = "undefined" == typeof d ? 2 : d;
					for (f in b) b.hasOwnProperty(f) && c.indexOf(g, f) < 0 && ("object" == typeof a[f] && h ? c.merge(a[f], b[f], h - 1, g) : (a[f] = b[f], g.push(b[f])));
					return a
				}, c.mixin = function(a, b) {
					c.merge(a.prototype, b.prototype)
				}, c.inherit = function(a, b) {
					function c() {
					}
					c.prototype = b.prototype, a.prototype = new c
				}, c.isArray = Array.isArray || function(a) {
					return "[object Array]" === Object.prototype.toString.call(a)
				}, c.intersect = function(a, b) {
					for (var d = [], e = a.length > b.length ? a : b, f = a.length > b.length ? b : a, g = 0, h = f.length; h > g; g++) ~c.indexOf(e, f[g]) && d.push(f[g]);
					return d
				}, c.indexOf = function(a, b, c) {
					for (var d = a.length, c = 0 > c ? 0 > c + d ? 0 : c + d : c || 0; d > c && a[c] !== b; c++)
						;
					return c >= d ? -1 : c
				}, c.toArray = function(a) {
					for (var b = [], c = 0, d = a.length; d > c; c++) b.push(a[c]);
					return b
				}, c.ua = {}, c.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function() {
					try {
						var a = new XMLHttpRequest
					} catch (b) {
						return !1
					} return void 0 != a.withCredentials
				}(), c.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent), c.ua.iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)
			}("undefined" != typeof io ? io : module.exports, this), function(a, b) {
				function c() {
				}
				a.EventEmitter = c, c.prototype.on = function(a, c) {
					return this.$events || (this.$events = {}), this.$events[a] ? b.util.isArray(this.$events[a]) ? this.$events[a].push(c) : this.$events[a] = [ this.$events[a], c ] : this.$events[a] = c, this
				}, c.prototype.addListener = c.prototype.on, c.prototype.once = function(a, b) {
					function c() {
						d.removeListener(a, c), b.apply(this, arguments)
					}
					var d = this;
					return c.listener = b, this.on(a, c), this
				}, c.prototype.removeListener = function(a, c) {
					if (this.$events && this.$events[a]) {
						var d = this.$events[a];
						if (b.util.isArray(d)) {
							for (var e = -1, f = 0, g = d.length; g > f; f++)
								if (d[f] === c || d[f].listener && d[f].listener === c) {
									e = f;break
							}
							if (0 > e) return this;
							d.splice(e, 1), d.length ||
							delete this.$events[a]
						} else (d === c || d.listener && d.listener === c) &&
							delete this.$events[a]
					}
					return this
				}, c.prototype.removeAllListeners = function(a) {
					return void 0 === a ? (this.$events = {}, this) : (this.$events && this.$events[a] && (this.$events[a] = null), this)
				}, c.prototype.listeners = function(a) {
					return this.$events || (this.$events = {}), this.$events[a] || (this.$events[a] = []), b.util.isArray(this.$events[a]) || (this.$events[a] = [ this.$events[a] ]), this.$events[a]
				}, c.prototype.emit = function(a) {
					if (!this.$events) return !1;
					var c = this.$events[a];
					if (!c) return !1;
					var d = Array.prototype.slice.call(arguments, 1);
					if ("function" == typeof c) c.apply(this, d);else {
						if (!b.util.isArray(c)) return !1;
						for (var e = c.slice(), f = 0, g = e.length; g > f; f++) e[f].apply(this, d)
					}
					return !0
				}
			}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(exports, nativeJSON) {
				"use strict";
				function f(a) {
					return 10 > a ? "0" + a : a
				}
				function date(a) {
					return isFinite(a.valueOf()) ? a.getUTCFullYear() + "-" + f(a.getUTCMonth() + 1) + "-" + f(a.getUTCDate()) + "T" + f(a.getUTCHours()) + ":" + f(a.getUTCMinutes()) + ":" + f(a.getUTCSeconds()) + "Z" : null
				}
				function quote(a) {
					return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function(a) {
							var b = meta[a];
							return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
						}) + '"' : '"' + a + '"'
				}
				function str(a, b) {
					var c,
						d,
						e,
						f,
						g,
						h = gap,
						i = b[a];
					switch (i instanceof Date && (i = date(a)), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i) {
					case "string":
						return quote(i);case "number":
						return isFinite(i) ? String(i) : "null";case "boolean":
					case "null":
						return String(i);case "object":
						if (!i) return "null";
						if (gap += indent, g = [], "[object Array]" === Object.prototype.toString.apply(i)) {
							for (f = i.length, c = 0; f > c; c += 1) g[c] = str(c, i) || "null";
							return e = 0 === g.length ? "[]" : gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]" : "[" + g.join(",") + "]", gap = h, e
						}
						if (rep && "object" == typeof rep)
							for (f = rep.length, c = 0; f > c; c += 1) "string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
						else
							for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
						return e = 0 === g.length ? "{}" : gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}" : "{" + g.join(",") + "}", gap = h, e
					}
				}
				if (nativeJSON && nativeJSON.parse) return exports.JSON = {
						parse : nativeJSON.parse,
						stringify : nativeJSON.stringify
					};
				var JSON = exports.JSON = {},
					cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
					escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
					gap,
					indent,
					meta = {
						"\b" : "\\b",
						"	" : "\\t",
						"\n" : "\\n",
						"\f" : "\\f",
						"\r" : "\\r",
						'"' : '\\"',
						"\\" : "\\\\"
					},
					rep;
				JSON.stringify = function(a, b, c) {
					var d;
					if (gap = "", indent = "", "number" == typeof c)
						for (d = 0; c > d; d += 1) indent += " ";
					else "string" == typeof c && (indent = c);
					if (rep = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length))
						throw new Error("JSON.stringify");
					return str("", {
						"" : a
					})
				}, JSON.parse = function(text, reviver) {
					function walk(a, b) {
						var c,
							d,
							e = a[b];
						if (e && "object" == typeof e)
							for (c in e) Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d :
									delete e[c]
								);
						return reviver.call(a, b, e)
					}
					var j;
					if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
							return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
						})), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
								"" : j
							}, "") : j;
					throw new SyntaxError("JSON.parse")
				}
			}("undefined" != typeof io ? io : module.exports, "undefined" != typeof JSON ? JSON : void 0), function(a, b) {
				var c = a.parser = {},
					d = c.packets = [ "disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop" ],
					e = c.reasons = [ "transport not supported", "client not handshaken", "unauthorized" ],
					f = c.advice = [ "reconnect" ],
					g = b.JSON,
					h = b.util.indexOf;
				c.encodePacket = function(a) {
					var b = h(d, a.type),
						c = a.id || "",
						i = a.endpoint || "",
						j = a.ack,
						k = null;
					switch (a.type) {
					case "error":
						var l = a.reason ? h(e, a.reason) : "",
							m = a.advice ? h(f, a.advice) : "";
						("" !== l || "" !== m) && (k = l + ("" !== m ? "+" + m : ""));
						break;case "message":
						"" !== a.data && (k = a.data);
						break;case "event":
						var n = {
							name : a.name
						};
						a.args && a.args.length && (n.args = a.args), k = g.stringify(n);
						break;case "json":
						k = g.stringify(a.data);
						break;case "connect":
						a.qs && (k = a.qs);
						break;case "ack":
						k = a.ackId + (a.args && a.args.length ? "+" + g.stringify(a.args) : "")
					}
					var o = [ b, c + ("data" == j ? "+" : ""), i ];
					return null !== k && void 0 !== k && o.push(k), o.join(":")
				}, c.encodePayload = function(a) {
					var b = "";
					if (1 == a.length) return a[0];
					for (var c = 0, d = a.length; d > c; c++) {
						var e = a[c];
						b += "�" + e.length + "�" + a[c]
					}
					return b
				};
				var i = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
				c.decodePacket = function(a) {
					var b = a.match(i);
					if (!b) return {};
					var c = b[2] || "",
						a = b[5] || "",
						h = {
							type : d[b[1]],
							endpoint : b[4] || ""
						};
					switch (c && (h.id = c, h.ack = b[3] ? "data" : !0), h.type) {
					case "error":
						var b = a.split("+");
						h.reason = e[b[0]] || "", h.advice = f[b[1]] || "";
						break;case "message":
						h.data = a || "";
						break;case "event":
						try {
							var j = g.parse(a);
							h.name = j.name, h.args = j.args
						} catch (k) {} h.args = h.args || [];
						break;case "json":
						try {
							h.data = g.parse(a)
						} catch (k) {}
						break;case "connect":
						h.qs = a || "";
						break;case "ack":
						var b = a.match(/^([0-9]+)(\+)?(.*)/);
						if (b && (h.ackId = b[1], h.args = [], b[3])) try {
								h.args = b[3] ? g.parse(b[3]) : []
							} catch (k) {}
						break;case "disconnect":
					case "heartbeat":
					}
					return h
				}, c.decodePayload = function(a) {
					if ("�" == a.charAt(0)) {
						for (var b = [], d = 1, e = ""; d < a.length; d++) "�" == a.charAt(d) ? (b.push(c.decodePacket(a.substr(d + 1).substr(0, e))), d += Number(e) + 1, e = "") : e += a.charAt(d);
						return b
					}
					return [ c.decodePacket(a) ]
				}
			}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(a, b) {
				function c(a, b) {
					this.socket = a, this.sessid = b
				}
				a.Transport = c, b.util.mixin(c, b.EventEmitter), c.prototype.heartbeats = function() {
					return !0
				}, c.prototype.onData = function(a) {
					if (this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout(), "" !== a) {
						var c = b.parser.decodePayload(a);
						if (c && c.length)
							for (var d = 0, e = c.length; e > d; d++) this.onPacket(c[d])
					}
					return this
				}, c.prototype.onPacket = function(a) {
					return this.socket.setHeartbeatTimeout(), "heartbeat" == a.type ? this.onHeartbeat() : ("connect" == a.type && "" == a.endpoint && this.onConnect(), "error" == a.type && "reconnect" == a.advice && (this.isOpen = !1), this.socket.onPacket(a), this)
				}, c.prototype.setCloseTimeout = function() {
					if (!this.closeTimeout) {
						var a = this;
						this.closeTimeout = setTimeout(function() {
							a.onDisconnect()
						}, this.socket.closeTimeout)
					}
				}, c.prototype.onDisconnect = function() {
					return this.isOpen && this.close(), this.clearTimeouts(), this.socket.onDisconnect(), this
				}, c.prototype.onConnect = function() {
					return this.socket.onConnect(), this
				}, c.prototype.clearCloseTimeout = function() {
					this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null)
				}, c.prototype.clearTimeouts = function() {
					this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout)
				}, c.prototype.packet = function(a) {
					this.send(b.parser.encodePacket(a))
				}, c.prototype.onHeartbeat = function() {
					this.packet({
						type : "heartbeat"
					})
				}, c.prototype.onOpen = function() {
					this.isOpen = !0, this.clearCloseTimeout(), this.socket.onOpen()
				}, c.prototype.onClose = function() {
					this.isOpen = !1, this.socket.onClose(), this.onDisconnect()
				}, c.prototype.prepareUrl = function() {
					var a = this.socket.options;
					return this.scheme() + "://" + a.host + ":" + a.port + "/" + a.resource + "/" + b.protocol + "/" + this.name + "/" + this.sessid
				}, c.prototype.ready = function(a, b) {
					b.call(this)
				}
			}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(a, b, c) {
				function d(a) {
					if (this.options = {
							port : 80,
							secure : !1,
							document : "document" in c ? document : !1,
							resource : "socket.io",
							transports : b.transports,
							"connect timeout" : 1e4,
							"try multiple transports" : !0,
							reconnect : !0,
							"reconnection delay" : 500,
							"reconnection limit" : 1 / 0,
							"reopen delay" : 3e3,
							"max reconnection attempts" : 10,
							"sync disconnect on unload" : !1,
							"auto connect" : !0,
							"flash policy port" : 10843,
							manualFlush : !1
						}, b.util.merge(this.options, a), this.connected = !1, this.open = !1, this.connecting = !1, this.reconnecting = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1, this.options["sync disconnect on unload"] && (!this.isXDomain() || b.util.ua.hasCORS)) {
						var d = this;
						b.util.on(c, "beforeunload", function() {
							d.disconnectSync()
						}, !1)
					}
					this.options["auto connect"] && this.connect()
				}
				function e() {
				}
				a.Socket = d, b.util.mixin(d, b.EventEmitter), d.prototype.of = function(a) {
					return this.namespaces[a] || (this.namespaces[a] = new b.SocketNamespace(this, a), "" !== a && this.namespaces[a].packet({
							type : "connect"
						})), this.namespaces[a]
				}, d.prototype.publish = function() {
					this.emit.apply(this, arguments);
					var a;
					for (var b in this.namespaces) this.namespaces.hasOwnProperty(b) && (a = this.of(b), a.$emit.apply(a, arguments))
				}, d.prototype.handshake = function(a) {
					function c(b) {
						b instanceof Error ? (d.connecting = !1, d.onError(b.message)) : a.apply(null, b.split(":"))
					}
					var d = this,
						f = this.options,
						g = [ "http" + (f.secure ? "s" : "") + ":/", f.host + ":" + f.port, f.resource, b.protocol, b.util.query(this.options.query, "t=" + +new Date) ].join("/");
					if (this.isXDomain() && !b.util.ua.hasCORS) {
						var h = document.getElementsByTagName("script")[0],
							i = document.createElement("script");
						i.src = g + "&jsonp=" + b.j.length, h.parentNode.insertBefore(i, h), b.j.push(function(a) {
							c(a), i.parentNode.removeChild(i)
						})
					} else {
						var j = b.util.request();
						j.open("GET", g, !0), this.isXDomain() && (j.withCredentials = !0), j.onreadystatechange = function() {
							4 == j.readyState && (j.onreadystatechange = e, 200 == j.status ? c(j.responseText) : 403 == j.status ? d.onError(j.responseText) : (d.connecting = !1, !d.reconnecting && d.onError(j.responseText)))
						}, j.send(null)
					}
				}, d.prototype.getTransport = function(a) {
					for (var c, d = a || this.transports, e = 0; c = d[e]; e++)
						if (b.Transport[c] && b.Transport[c].check(this) && (!this.isXDomain() || b.Transport[c].xdomainCheck(this))) return new b.Transport[c](this, this.sessionid);
					return null
				}, d.prototype.connect = function(a) {
					if (this.connecting) return this;
					var c = this;
					return c.connecting = !0, this.handshake(function(d, e, f, g) {
							function h(a) {
								return c.transport && c.transport.clearTimeouts(), c.transport = c.getTransport(a), c.transport ? void c.transport.ready(c, function() {
										c.connecting = !0, c.publish("connecting", c.transport.name), c.transport.open(), c.options["connect timeout"] && (c.connectTimeoutTimer = setTimeout(function() {
											if (!c.connected && (c.connecting = !1, c.options["try multiple transports"])) {
												for (var a = c.transports; a.length > 0 && a.splice(0, 1)[0] != c.transport.name;)
													;
												a.length ? h(a) : c.publish("connect_failed")
											}
										}, c.options["connect timeout"]))
									}) : c.publish("connect_failed")
							}
							c.sessionid = d, c.closeTimeout = 1e3 * f, c.heartbeatTimeout = 1e3 * e, c.transports || (c.transports = c.origTransports = g ? b.util.intersect(g.split(","), c.options.transports) : c.options.transports), c.setHeartbeatTimeout(), h(c.transports), c.once("connect", function() {
								clearTimeout(c.connectTimeoutTimer), a && "function" == typeof a && a()
							})
						}), this
				}, d.prototype.setHeartbeatTimeout = function() {
					if (clearTimeout(this.heartbeatTimeoutTimer), !this.transport || this.transport.heartbeats()) {
						var a = this;
						this.heartbeatTimeoutTimer = setTimeout(function() {
							a.transport.onClose()
						}, this.heartbeatTimeout)
					}
				}, d.prototype.packet = function(a) {
					return this.connected && !this.doBuffer ? this.transport.packet(a) : this.buffer.push(a), this
				}, d.prototype.setBuffer = function(a) {
					this.doBuffer = a, !a && this.connected && this.buffer.length && (this.options.manualFlush || this.flushBuffer())
				}, d.prototype.flushBuffer = function() {
					this.transport.payload(this.buffer), this.buffer = []
				}, d.prototype.disconnect = function() {
					return (this.connected || this.connecting) && (this.open && this.of("").packet({
						type : "disconnect"
					}), this.onDisconnect("booted")), this
				}, d.prototype.disconnectSync = function() {
					var a = b.util.request(),
						c = [ "http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options.port, this.options.resource, b.protocol, "", this.sessionid ].join("/") + "/?disconnect=1";
					a.open("GET", c, !1), a.send(null), this.onDisconnect("booted")
				}, d.prototype.isXDomain = function() {
					var a = c.location.port || ("https:" == c.location.protocol ? 443 : 80);
					return this.options.host !== c.location.hostname || this.options.port != a
				}, d.prototype.onConnect = function() {
					this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"))
				}, d.prototype.onOpen = function() {
					this.open = !0
				}, d.prototype.onClose = function() {
					this.open = !1, clearTimeout(this.heartbeatTimeoutTimer)
				}, d.prototype.onPacket = function(a) {
					this.of(a.endpoint).onPacket(a)
				}, d.prototype.onError = function(a) {
					a && a.advice && "reconnect" === a.advice && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()), this.publish("error", a && a.reason ? a.reason : a)
				}, d.prototype.onDisconnect = function(a) {
					var b = this.connected,
						c = this.connecting;
					this.connected = !1, this.connecting = !1, this.open = !1, (b || c) && (this.transport.close(), this.transport.clearTimeouts(), b && (this.publish("disconnect", a), "booted" != a && this.options.reconnect && !this.reconnecting && this.reconnect()))
				}, d.prototype.reconnect = function() {
					function a() {
						if (c.connected) {
							for (var a in c.namespaces) c.namespaces.hasOwnProperty(a) && "" !== a && c.namespaces[a].packet({
									type : "connect"
								});
							c.publish("reconnect", c.transport.name, c.reconnectionAttempts)
						}
						clearTimeout(c.reconnectionTimer), c.removeListener("connect_failed", b), c.removeListener("connect", b), c.reconnecting = !1,
						delete c.reconnectionAttempts
						,
						delete c.reconnectionDelay
						,
						delete c.reconnectionTimer
						,
						delete c.redoTransports
						, c.options["try multiple transports"] = e
					}
					function b() {
						return c.reconnecting ? c.connected ? a() : c.connecting && c.reconnecting ? c.reconnectionTimer = setTimeout(b, 1e3) : void (c.reconnectionAttempts++ >= d ? c.redoTransports ? (c.publish("reconnect_failed"), a()) : (c.on("connect_failed", b), c.options["try multiple transports"] = !0, c.transports = c.origTransports, c.transport = c.getTransport(), c.redoTransports = !0, c.connect()) : (c.reconnectionDelay < f && (c.reconnectionDelay *= 2), c.connect(), c.publish("reconnecting", c.reconnectionDelay, c.reconnectionAttempts), c.reconnectionTimer = setTimeout(b, c.reconnectionDelay))) : void 0
					}
					this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options["reconnection delay"];
					var c = this,
						d = this.options["max reconnection attempts"],
						e = this.options["try multiple transports"],
						f = this.options["reconnection limit"];
					this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(b, this.reconnectionDelay), this.on("connect", b)
				}
			}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(a, b) {
				function c(a, b) {
					this.socket = a, this.name = b || "", this.flags = {}, this.json = new d(this, "json"), this.ackPackets = 0, this.acks = {}
				}
				function d(a, b) {
					this.namespace = a, this.name = b
				}
				a.SocketNamespace = c, b.util.mixin(c, b.EventEmitter), c.prototype.$emit = b.EventEmitter.prototype.emit, c.prototype.of = function() {
					return this.socket.of.apply(this.socket, arguments)
				}, c.prototype.packet = function(a) {
					return a.endpoint = this.name, this.socket.packet(a), this.flags = {}, this
				}, c.prototype.send = function(a, b) {
					var c = {
						type : this.flags.json ? "json" : "message",
						data : a
					};
					return "function" == typeof b && (c.id = ++this.ackPackets, c.ack = !0, this.acks[c.id] = b), this.packet(c)
				}, c.prototype.emit = function(a) {
					var b = Array.prototype.slice.call(arguments, 1),
						c = b[b.length - 1],
						d = {
							type : "event",
							name : a
						};
					return "function" == typeof c && (d.id = ++this.ackPackets, d.ack = "data", this.acks[d.id] = c, b = b.slice(0, b.length - 1)), d.args = b, this.packet(d)
				}, c.prototype.disconnect = function() {
					return "" === this.name ? this.socket.disconnect() : (this.packet({
							type : "disconnect"
						}), this.$emit("disconnect")), this
				}, c.prototype.onPacket = function(a) {
					function c() {
						d.packet({
							type : "ack",
							args : b.util.toArray(arguments),
							ackId : a.id
						})
					}
					var d = this;
					switch (a.type) {
					case "connect":
						this.$emit("connect");
						break;case "disconnect":
						"" === this.name ? this.socket.onDisconnect(a.reason || "booted") : this.$emit("disconnect", a.reason);
						break;case "message":
					case "json":
						var e = [ "message", a.data ];
						"data" == a.ack ? e.push(c) : a.ack && this.packet({
							type : "ack",
							ackId : a.id
						}), this.$emit.apply(this, e);
						break;case "event":
						var e = [ a.name ].concat(a.args);
						"data" == a.ack && e.push(c), this.$emit.apply(this, e);
						break;case "ack":
						this.acks[a.ackId] && (this.acks[a.ackId].apply(this, a.args),
						delete this.acks[a.ackId]
						);
						break;case "error":
						a.advice ? this.socket.onError(a) : "unauthorized" == a.reason ? this.$emit("connect_failed", a.reason) : this.$emit("error", a.reason)
					}
				}, d.prototype.send = function() {
					this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments)
				}, d.prototype.emit = function() {
					this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments)
				}
			}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(a, b, c) {
				function d() {
					b.Transport.apply(this, arguments)
				}
				a.websocket = d, b.util.inherit(d, b.Transport), d.prototype.name = "websocket", d.prototype.open = function() {
					var a,
						d = b.util.query(this.socket.options.query),
						e = this;
					return a || (a = c.MozWebSocket || c.WebSocket), this.websocket = new a(this.prepareUrl() + d), this.websocket.onopen = function() {
							e.onOpen(), e.socket.setBuffer(!1)
						}, this.websocket.onmessage = function(a) {
							e.onData(a.data)
						}, this.websocket.onclose = function() {
							e.onClose(), e.socket.setBuffer(!0)
						}, this.websocket.onerror = function(a) {
							e.onError(a)
						}, this
				}, d.prototype.send = b.util.ua.iDevice ? function(a) {
					var b = this;
					return setTimeout(function() {
							b.websocket.send(a)
						}, 0), this
				} : function(a) {
					return this.websocket.send(a), this
				}, d.prototype.payload = function(a) {
					for (var b = 0, c = a.length; c > b; b++) this.packet(a[b]);
					return this
				}, d.prototype.close = function() {
					return this.websocket.close(), this
				}, d.prototype.onError = function(a) {
					this.socket.onError(a)
				}, d.prototype.scheme = function() {
					return this.socket.options.secure ? "wss" : "ws"
				}, d.check = function() {
					return "WebSocket" in c && !("__addTask" in WebSocket) || "MozWebSocket" in c
				}, d.xdomainCheck = function() {
					return !0
				}, b.transports.push("websocket")
			}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(a, b) {
				function c() {
					b.Transport.websocket.apply(this, arguments)
				}
				a.flashsocket = c, b.util.inherit(c, b.Transport.websocket), c.prototype.name = "flashsocket", c.prototype.open = function() {
					var a = this,
						c = arguments;
					return WebSocket.__addTask(function() {
							b.Transport.websocket.prototype.open.apply(a, c)
						}), this
				}, c.prototype.send = function() {
					var a = this,
						c = arguments;
					return WebSocket.__addTask(function() {
							b.Transport.websocket.prototype.send.apply(a, c)
						}), this
				}, c.prototype.close = function() {
					return WebSocket.__tasks.length = 0, b.Transport.websocket.prototype.close.call(this), this
				}, c.prototype.ready = function(a, d) {
					function e() {
						var b = a.options,
							e = b["flash policy port"],
							g = [ "http" + (b.secure ? "s" : "") + ":/", b.host + ":" + b.port, b.resource, "static/flashsocket", "WebSocketMain" + (a.isXDomain() ? "Insecure" : "") + ".swf" ];
						c.loaded || ("undefined" == typeof WEB_SOCKET_SWF_LOCATION && (WEB_SOCKET_SWF_LOCATION = g.join("/")), 843 !== e && WebSocket.loadFlashPolicyFile("xmlsocket://" + b.host + ":" + e), WebSocket.__initialize(), c.loaded = !0), d.call(f)
					}
					var f = this;
					return document.body ? e() : void b.util.load(e)
				}, c.check = function() {
					return "undefined" != typeof WebSocket && "__initialize" in WebSocket && swfobject ? swfobject.getFlashPlayerVersion().major >= 10 : !1
				}, c.xdomainCheck = function() {
					return !0
				}, "undefined" != typeof window && (WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0), b.transports.push("flashsocket")
			}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), "undefined" != typeof window) var swfobject = function() {
				function a() {
					if (!R) {
						try {
							var a = K.getElementsByTagName("body")[0].appendChild(q("span"));
							a.parentNode.removeChild(a)
						} catch (b) {
							return
						}
						R = !0;
						for (var c = N.length, d = 0; c > d; d++) N[d]()
					}
				}
				function b(a) {
					R ? a() : N[N.length] = a
				}
				function c(a) {
					if (typeof J.addEventListener != C) J.addEventListener("load", a, !1);
					else if (typeof K.addEventListener != C) K.addEventListener("load", a, !1);
					else if (typeof J.attachEvent != C) r(J, "onload", a);
					else if ("function" == typeof J.onload) {
						var b = J.onload;
						J.onload = function() {
							b(), a()
						}
					} else
						J.onload = a
				}
				function d() {
					M ? e() : f()
				}
				function e() {
					var a = K.getElementsByTagName("body")[0],
						b = q(D);
					b.setAttribute("type", G);var c = a.appendChild(b);
					if (c) {
						var d = 0;
						!function() {
							if (typeof c.GetVariable != C) {
								var e = c.GetVariable("$version");
								e && (e = e.split(" ")[1].split(","), U.pv = [ parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10) ])
							} else if (10 > d) return d++, void setTimeout(arguments.callee, 10);
							a.removeChild(b), c = null, f()
						}()
					} else f()
				}
				function f() {
					var a = O.length;
					if (a > 0)
						for (var b = 0; a > b; b++) {
							var c = O[b].id,
								d = O[b].callbackFn,
								e = {
									success : !1,
									id : c
								};
							if (U.pv[0] > 0) {
								var f = p(c);
								if (f)
									if (!s(O[b].swfVersion) || U.wk && U.wk < 312)
										if (O[b].expressInstall && h()) {
											var k = {};
											k.data = O[b].expressInstall, k.width = f.getAttribute("width") || "0", k.height = f.getAttribute("height") || "0", f.getAttribute("class") && (k.styleclass = f.getAttribute("class")), f.getAttribute("align") && (k.align = f.getAttribute("align"));
											for (var l = {}, m = f.getElementsByTagName("param"), n = m.length, o = 0; n > o; o++) "movie" != m[o].getAttribute("name").toLowerCase() && (l[m[o].getAttribute("name")] = m[o].getAttribute("value"));
											i(k, l, c, d)
										} else j(f), d && d(e);
									else u(c, !0), d && (e.success = !0, e.ref = g(c), d(e))
							} else if (u(c, !0), d) {
								var q = g(c);
								q && typeof q.SetVariable != C && (e.success = !0, e.ref = q), d(e)
							}
					}
				}
				function g(a) {
					var b = null,
						c = p(a);
					if (c && "OBJECT" == c.nodeName)
						if (typeof c.SetVariable != C)
							b = c;else {
							var d = c.getElementsByTagName(D)[0];
							d && (b = d)
					}
					return b
				}
				function h() {
					return !S && s("6.0.65") && (U.win || U.mac) && !(U.wk && U.wk < 312)
				}
				function i(a, b, c, d) {
					S = !0, y = d || null, z = {
						success : !1,
						id : c
					};var e = p(c);
					if (e) {
						"OBJECT" == e.nodeName ? (w = k(e), x = null) : (w = e, x = c), a.id = H, (typeof a.width == C || !/%$/.test(a.width) && parseInt(a.width, 10) < 310) && (a.width = "310"), (typeof a.height == C || !/%$/.test(a.height) && parseInt(a.height, 10) < 137) && (a.height = "137"), K.title = K.title.slice(0, 47) + " - Flash Player Installation";
						var f = U.ie && U.win ? [ "Active" ].concat("").join("X") : "PlugIn",
							g = "MMredirectURL=" + J.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + f + "&MMdoctitle=" + K.title;
						if (typeof b.flashvars != C ? b.flashvars += "&" + g : b.flashvars = g, U.ie && U.win && 4 != e.readyState) {
							var h = q("div");
							c += "SWFObjectNew", h.setAttribute("id", c), e.parentNode.insertBefore(h, e), e.style.display = "none", function() {
								4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
							}()
						}
						l(a, b, c)
					}
				}
				function j(a) {
					if (U.ie && U.win && 4 != a.readyState) {
						var b = q("div");
						a.parentNode.insertBefore(b, a), b.parentNode.replaceChild(k(a), b), a.style.display = "none", function() {
							4 == a.readyState ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
						}()
					} else a.parentNode.replaceChild(k(a), a)
				}
				function k(a) {
					var b = q("div");
					if (U.win && U.ie)
						b.innerHTML = a.innerHTML;else {
						var c = a.getElementsByTagName(D)[0];
						if (c) {
							var d = c.childNodes;
							if (d)
								for (var e = d.length, f = 0; e > f; f++) 1 == d[f].nodeType && "PARAM" == d[f].nodeName || 8 == d[f].nodeType || b.appendChild(d[f].cloneNode(!0))
						}
					}
					return b
				}
				function l(a, b, c) {
					var d,
						e = p(c);
					if (U.wk && U.wk < 312) return d;
					if (e)
						if (typeof a.id == C && (a.id = c), U.ie && U.win) {
							var f = "";
							for (var g in a) a[g] != Object.prototype[g] && ("data" == g.toLowerCase() ? b.movie = a[g] : "styleclass" == g.toLowerCase() ? f += ' class="' + a[g] + '"' : "classid" != g.toLowerCase() && (f += " " + g + '="' + a[g] + '"'));
							var h = "";
							for (var i in b) b[i] != Object.prototype[i] && (h += '<param name="' + i + '" value="' + b[i] + '" />');
							e.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + f + ">" + h + "</object>", P[P.length] = a.id, d = p(a.id)
						} else {
							var j = q(D);
							j.setAttribute("type", G);
							for (var k in a) a[k] != Object.prototype[k] && ("styleclass" == k.toLowerCase() ? j.setAttribute("class", a[k]) : "classid" != k.toLowerCase() && j.setAttribute(k, a[k]));
							for (var l in b) b[l] != Object.prototype[l] && "movie" != l.toLowerCase() && m(j, l, b[l]);
							e.parentNode.replaceChild(j, e), d = j
					}
					return d
				}
				function m(a, b, c) {
					var d = q("param");
					d.setAttribute("name", b), d.setAttribute("value", c), a.appendChild(d)
				}
				function n(a) {
					var b = p(a);
					b && "OBJECT" == b.nodeName && (U.ie && U.win ? (b.style.display = "none", function() {
						4 == b.readyState ? o(a) : setTimeout(arguments.callee, 10)
					}()) : b.parentNode.removeChild(b))
				}
				function o(a) {
					var b = p(a);
					if (b) {
						for (var c in b) "function" == typeof b[c] && (b[c] = null);
						b.parentNode.removeChild(b)
					}
				}
				function p(a) {
					var b = null;
					try {
						b = K.getElementById(a)
					} catch (c) {} return b
				}
				function q(a) {
					return K.createElement(a)
				}
				function r(a, b, c) {
					a.attachEvent(b, c), Q[Q.length] = [ a, b, c ]
				}
				function s(a) {
					var b = U.pv,
						c = a.split(".");
					return c[0] = parseInt(c[0], 10), c[1] = parseInt(c[1], 10) || 0, c[2] = parseInt(c[2], 10) || 0, b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1
				}
				function t(a, b, c, d) {
					if (!U.ie || !U.mac) {
						var e = K.getElementsByTagName("head")[0];
						if (e) {
							var f = c && "string" == typeof c ? c : "screen";
							if (d && (A = null, B = null), !A || B != f) {
								var g = q("style");
								g.setAttribute("type", "text/css"), g.setAttribute("media", f), A = e.appendChild(g), U.ie && U.win && typeof K.styleSheets != C && K.styleSheets.length > 0 && (A = K.styleSheets[K.styleSheets.length - 1]), B = f
							}
							U.ie && U.win ? A && typeof A.addRule == D && A.addRule(a, b) : A && typeof K.createTextNode != C && A.appendChild(K.createTextNode(a + " {" + b + "}"))
						}
					}
				}
				function u(a, b) {
					if (T) {
						var c = b ? "visible" : "hidden";
						R && p(a) ? p(a).style.visibility = c : t("#" + a, "visibility:" + c)
					}
				}
				function v(a) {
					var b = /[\\\"<>\.;]/,
						c = null != b.exec(a);
					return c && typeof encodeURIComponent != C ? encodeURIComponent(a) : a
				}
				{
					var w,
						x,
						y,
						z,
						A,
						B,
						C = "undefined",
						D = "object",
						E = "Shockwave Flash",
						F = "ShockwaveFlash.ShockwaveFlash",
						G = "application/x-shockwave-flash",
						H = "SWFObjectExprInst",
						I = "onreadystatechange",
						J = window,
						K = document,
						L = navigator,
						M = !1,
						N = [ d ],
						O = [],
						P = [],
						Q = [],
						R = !1,
						S = !1,
						T = !0,
						U = function() {
							var a = typeof K.getElementById != C && typeof K.getElementsByTagName != C && typeof K.createElement != C,
								b = L.userAgent.toLowerCase(),
								c = L.platform.toLowerCase(),
								d = /win/.test(c ? c : b),
								e = /mac/.test(c ? c : b),
								f = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
								g = !1,
								h = [ 0, 0, 0 ],
								i = null;
							if (typeof L.plugins != C && typeof L.plugins[E] == D) i = L.plugins[E].description, !i || typeof L.mimeTypes != C && L.mimeTypes[G] && !L.mimeTypes[G].enabledPlugin || (M = !0, g = !1, i = i.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), h[0] = parseInt(i.replace(/^(.*)\..*$/, "$1"), 10), h[1] = parseInt(i.replace(/^.*\.(.*)\s.*$/, "$1"), 10), h[2] = /[a-zA-Z]/.test(i) ? parseInt(i.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
							else if (typeof J[[ "Active" ].concat("Object").join("X")] != C) try {
									var j = new (window[[ "Active" ].concat("Object").join("X")])(F);
									j && (i = j.GetVariable("$version"), i && (g = !0, i = i.split(" ")[1].split(","), h = [ parseInt(i[0], 10), parseInt(i[1], 10), parseInt(i[2], 10) ]))
								} catch (k) {}
							return {
								w3 : a,
								pv : h,
								wk : f,
								ie : g,
								win : d,
								mac : e
							}
						}();
					!function() {
						U.w3 && ((typeof K.readyState != C && "complete" == K.readyState || typeof K.readyState == C && (K.getElementsByTagName("body")[0] || K.body)) && a(), R || (typeof K.addEventListener != C && K.addEventListener("DOMContentLoaded", a, !1), U.ie && U.win && (K.attachEvent(I, function() {
							"complete" == K.readyState && (K.detachEvent(I, arguments.callee), a())
						}), J == top && !function() {
							if (!R) {
								try {
									K.documentElement.doScroll("left")
								} catch (b) {
									return void setTimeout(arguments.callee, 0)
								} a()
							}
						}()), U.wk && !function() {
							return R ? void 0 : /loaded|complete/.test(K.readyState) ? void a() : void setTimeout(arguments.callee, 0)
						}(), c(a)))
					}(), function() {
						U.ie && U.win && window.attachEvent("onunload", function() {
							for (var a = Q.length, b = 0; a > b; b++) Q[b][0].detachEvent(Q[b][1], Q[b][2]);
							for (var c = P.length, d = 0; c > d; d++) n(P[d]);
							for (var e in U) U[e] = null;
							U = null;
							for (var f in swfobject) swfobject[f] = null;
							swfobject = null
						})
					}()
				}
				return {
					registerObject : function(a, b, c, d) {
						if (U.w3 && a && b) {
							var e = {};
							e.id = a, e.swfVersion = b, e.expressInstall = c, e.callbackFn = d, O[O.length] = e, u(a, !1)
						} else d && d({
								success : !1,
								id : a
							})
					},
					getObjectById : function(a) {
						return U.w3 ? g(a) : void 0
					},
					embedSWF : function(a, c, d, e, f, g, j, k, m, n) {
						var o = {
							success : !1,
							id : c
						};
						U.w3 && !(U.wk && U.wk < 312) && a && c && d && e && f ? (u(c, !1), b(function() {
							d += "", e += "";
							var b = {};
							if (m && typeof m === D)
								for (var p in m) b[p] = m[p];
							b.data = a, b.width = d, b.height = e;
							var q = {};
							if (k && typeof k === D)
								for (var r in k) q[r] = k[r];
							if (j && typeof j === D)
								for (var t in j) typeof q.flashvars != C ? q.flashvars += "&" + t + "=" + j[t] : q.flashvars = t + "=" + j[t];
							if (s(f)) {
								var v = l(b, q, c);
								b.id == c && u(c, !0), o.success = !0, o.ref = v
							} else {
								if (g && h()) return b.data = g, void i(b, q, c, n);
								u(c, !0)
							}
							n && n(o)
						})) : n && n(o)
					},
					switchOffAutoHideShow : function() {
						T = !1
					},
					ua : U,
					getFlashPlayerVersion : function() {
						return {
							major : U.pv[0],
							minor : U.pv[1],
							release : U.pv[2]
						}
					},
					hasFlashPlayerVersion : s,
					createSWF : function(a, b, c) {
						return U.w3 ? l(a, b, c) : void 0
					},
					showExpressInstall : function(a, b, c, d) {
						U.w3 && h() && i(a, b, c, d)
					},
					removeSWF : function(a) {
						U.w3 && n(a)
					},
					createCSS : function(a, b, c, d) {
						U.w3 && t(a, b, c, d)
					},
					addDomLoadEvent : b,
					addLoadEvent : c,
					getQueryParamValue : function(a) {
						var b = K.location.search || K.location.hash;
						if (b) {
							if (/\?/.test(b) && (b = b.split("?")[1]), null == a) return v(b);
							for (var c = b.split("&"), d = 0; d < c.length; d++)
								if (c[d].substring(0, c[d].indexOf("=")) == a) return v(c[d].substring(c[d].indexOf("=") + 1))
						}
						return ""
					},
					expressInstallCallback : function() {
						if (S) {
							var a = p(H);
							a && w && (a.parentNode.replaceChild(w, a), x && (u(x, !0), U.ie && U.win && (w.style.display = "block")), y && y(z)), S = !1
						}
					}
				}
			}();
		!function() {
			if ("undefined" != typeof window && !window.WebSocket) {
				var a = window.console;
				if (a && a.log && a.error || (a = {
						log : function() {},
						error : function() {}
					}), !swfobject.hasFlashPlayerVersion("10.0.0")) return void a.error("Flash Player >= 10.0.0 is required.");
				"file:" == location.protocol && a.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), WebSocket = function(a, b, c, d, e) {
					var f = this;
					f.__id = WebSocket.__nextId++, WebSocket.__instances[f.__id] = f, f.readyState = WebSocket.CONNECTING, f.bufferedAmount = 0, f.__events = {}, b ? "string" == typeof b && (b = [ b ]) : b = [], setTimeout(function() {
						WebSocket.__addTask(function() {
							WebSocket.__flash.create(f.__id, a, b, c || null, d || 0, e || null)
						})
					}, 0)
				}, WebSocket.prototype.send = function(a) {
					if (this.readyState == WebSocket.CONNECTING)
						throw "INVALID_STATE_ERR: Web Socket connection has not been established";
					var b = WebSocket.__flash.send(this.__id, encodeURIComponent(a));
					return 0 > b ? !0 : (this.bufferedAmount += b, !1)
				}, WebSocket.prototype.close = function() {
					this.readyState != WebSocket.CLOSED && this.readyState != WebSocket.CLOSING && (this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id))
				}, WebSocket.prototype.addEventListener = function(a, b) {
					a in this.__events || (this.__events[a] = []), this.__events[a].push(b)
				}, WebSocket.prototype.removeEventListener = function(a, b) {
					if (a in this.__events)
						for (var c = this.__events[a], d = c.length - 1; d >= 0; --d)
							if (c[d] === b) {
								c.splice(d, 1);break
					}
				}, WebSocket.prototype.dispatchEvent = function(a) {
					for (var b = this.__events[a.type] || [], c = 0; c < b.length; ++c) b[c](a);
					var d = this["on" + a.type];
					d && d(a)
				}, WebSocket.prototype.__handleEvent = function(a) {
					"readyState" in a && (this.readyState = a.readyState), "protocol" in a && (this.protocol = a.protocol);
					var b;
					if ("open" == a.type || "error" == a.type)
						b = this.__createSimpleEvent(a.type);
					else if ("close" == a.type)
						b = this.__createSimpleEvent("close");else {
						if ("message" != a.type)
							throw "unknown event type: " + a.type;
						var c = decodeURIComponent(a.message);
						b = this.__createMessageEvent("message", c)
					}
					this.dispatchEvent(b)
				}, WebSocket.prototype.__createSimpleEvent = function(a) {
					if (document.createEvent && window.Event) {
						var b = document.createEvent("Event");
						return b.initEvent(a, !1, !1), b
					}
					return {
						type : a,
						bubbles : !1,
						cancelable : !1
					}
				}, WebSocket.prototype.__createMessageEvent = function(a, b) {
					if (document.createEvent && window.MessageEvent && !window.opera) {
						var c = document.createEvent("MessageEvent");
						return c.initMessageEvent("message", !1, !1, b, null, null, window, null), c
					}
					return {
						type : a,
						data : b,
						bubbles : !1,
						cancelable : !1
					}
				}, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function(a) {
					WebSocket.__addTask(function() {
						WebSocket.__flash.loadManualPolicyFile(a)
					})
				}, WebSocket.__initialize = function() {
					if (!WebSocket.__flash) {
						if (WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation), !window.WEB_SOCKET_SWF_LOCATION) return void a.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
						var b = document.createElement("div");
						b.id = "webSocketContainer", b.style.position = "absolute", WebSocket.__isFlashLite() ? (b.style.left = "0px", b.style.top = "0px") : (b.style.left = "-100px", b.style.top = "-100px");
						var c = document.createElement("div");
						c.id = "webSocketFlash", b.appendChild(c), document.body.appendChild(b), swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
							hasPriority : !0,
							swliveconnect : !0,
							allowScriptAccess : "always"
						}, null, function(b) {
							b.success || a.error("[WebSocket] swfobject.embedSWF failed")
						})
					}
				}, WebSocket.__onFlashInitialized = function() {
					setTimeout(function() {
						WebSocket.__flash = document.getElementById("webSocketFlash"), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
						for (var a = 0; a < WebSocket.__tasks.length; ++a) WebSocket.__tasks[a]();
						WebSocket.__tasks = []
					}, 0)
				}, WebSocket.__onFlashEvent = function() {
					return setTimeout(function() {
							try {
								for (var b = WebSocket.__flash.receiveEvents(), c = 0; c < b.length; ++c) WebSocket.__instances[b[c].webSocketId].__handleEvent(b[c])
							} catch (d) {
								a.error(d)
							}
						}, 0), !0
				}, WebSocket.__log = function(b) {
					a.log(decodeURIComponent(b))
				}, WebSocket.__error = function(b) {
					a.error(decodeURIComponent(b))
				}, WebSocket.__addTask = function(a) {
					WebSocket.__flash ? a() : WebSocket.__tasks.push(a)
				}, WebSocket.__isFlashLite = function() {
					if (!window.navigator || !window.navigator.mimeTypes) return !1;
					var a = window.navigator.mimeTypes["application/x-shockwave-flash"];
					return a && a.enabledPlugin && a.enabledPlugin.filename && a.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1
				}, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function() {
					WebSocket.__initialize()
				}, !1) : window.attachEvent("onload", function() {
					WebSocket.__initialize()
				}))
			}
		}(), function(a, b, c) {
			function d(a) {
				a && (b.Transport.apply(this, arguments), this.sendBuffer = [])
			}
			function e() {
			}
			a.XHR = d, b.util.inherit(d, b.Transport), d.prototype.open = function() {
				return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this
			}, d.prototype.payload = function(a) {
				for (var c = [], d = 0, e = a.length; e > d; d++) c.push(b.parser.encodePacket(a[d]));
				this.send(b.parser.encodePayload(c))
			}, d.prototype.send = function(a) {
				return this.post(a), this
			}, d.prototype.post = function(a) {
				function b() {
					4 == this.readyState && (this.onreadystatechange = e, f.posting = !1, 200 == this.status ? f.socket.setBuffer(!1) : f.onClose())
				}
				function d() {
					this.onload = e, f.socket.setBuffer(!1)
				}
				var f = this;
				this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), c.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = d : this.sendXHR.onreadystatechange = b, this.sendXHR.send(a)
			}, d.prototype.close = function() {
				return this.onClose(), this
			}, d.prototype.request = function(a) {
				var c = b.util.request(this.socket.isXDomain()),
					d = b.util.query(this.socket.options.query, "t=" + +new Date);
				if (c.open(a || "GET", this.prepareUrl() + d, !0), "POST" == a) try {
						c.setRequestHeader ? c.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : c.contentType = "text/plain"
					} catch (e) {} return c
			}, d.prototype.scheme = function() {
				return this.socket.options.secure ? "https" : "http"
			}, d.check = function(a, d) {
				try {
					var e = b.util.request(d),
						f = c.XDomainRequest && e instanceof XDomainRequest,
						g = a && a.options && a.options.secure ? "https:" : "http:",
						h = c.location && g != c.location.protocol;
					if (e && (!f || !h)) return !0
				} catch (i) {} return !1
			}, d.xdomainCheck = function(a) {
				return d.check(a, !0)
			}
		}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(a, b) {
			function c() {
				b.Transport.XHR.apply(this, arguments)
			}
			a.htmlfile = c, b.util.inherit(c, b.Transport.XHR), c.prototype.name = "htmlfile", c.prototype.get = function() {
				this.doc = new (window[[ "Active" ].concat("Object").join("X")])("htmlfile"), this.doc.open(), this.doc.write("<html></html>"), this.doc.close(), this.doc.parentWindow.s = this;
				var a = this.doc.createElement("div");
				a.className = "socketio", this.doc.body.appendChild(a), this.iframe = this.doc.createElement("iframe"), a.appendChild(this.iframe);
				var c = this,
					d = b.util.query(this.socket.options.query, "t=" + +new Date);
				this.iframe.src = this.prepareUrl() + d, b.util.on(window, "unload", function() {
					c.destroy()
				})
			}, c.prototype._ = function(a, b) {
				a = a.replace(/\\\//g, "/"), this.onData(a);try {
					var c = b.getElementsByTagName("script")[0];
					c.parentNode.removeChild(c)
				} catch (d) {}
			}, c.prototype.destroy = function() {
				if (this.iframe) {
					try {
						this.iframe.src = "about:blank"
					} catch (a) {} this.doc = null, this.iframe.parentNode.removeChild(this.iframe), this.iframe = null, CollectGarbage()
				}
			}, c.prototype.close = function() {
				return this.destroy(), b.Transport.XHR.prototype.close.call(this)
			}, c.check = function(a) {
				if ("undefined" != typeof window && [ "Active" ].concat("Object").join("X") in window) try {
						var c = new (window[[ "Active" ].concat("Object").join("X")])("htmlfile");
						return c && b.Transport.XHR.check(a)
					} catch (d) {} return !1
			}, c.xdomainCheck = function() {
				return !1
			}, b.transports.push("htmlfile")
		}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(a, b, c) {
			function d() {
				b.Transport.XHR.apply(this, arguments)
			}
			function e() {
			}
			a["xhr-polling"] = d, b.util.inherit(d, b.Transport.XHR), b.util.merge(d, b.Transport.XHR), d.prototype.name = "xhr-polling", d.prototype.heartbeats = function() {
				return !1
			}, d.prototype.open = function() {
				var a = this;
				return b.Transport.XHR.prototype.open.call(a), !1
			}, d.prototype.get = function() {
				function a() {
					4 == this.readyState && (this.onreadystatechange = e, 200 == this.status ? (f.onData(this.responseText), f.get()) : f.onClose())
				}
				function b() {
					this.onload = e, this.onerror = e, f.retryCounter = 1, f.onData(this.responseText), f.get()
				}
				function d() {
					f.retryCounter++, !f.retryCounter || f.retryCounter > 3 ? f.onClose() : f.get()
				}
				if (this.isOpen) {
					var f = this;
					this.xhr = this.request(), c.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = b, this.xhr.onerror = d) : this.xhr.onreadystatechange = a, this.xhr.send(null)
				}
			}, d.prototype.onClose = function() {
				if (b.Transport.XHR.prototype.onClose.call(this), this.xhr) {
					this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = e;try {
						this.xhr.abort()
					} catch (a) {}
					this.xhr = null
				}
			}, d.prototype.ready = function(a, c) {
				var d = this;
				b.util.defer(function() {
					c.call(d)
				})
			}, b.transports.push("xhr-polling")
		}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(a, b, c) {
			function d() {
				b.Transport["xhr-polling"].apply(this, arguments), this.index = b.j.length;var a = this;
				b.j.push(function(b) {
					a._(b)
				})
			}
			var e = c.document && "MozAppearance" in c.document.documentElement.style;
			a["jsonp-polling"] = d, b.util.inherit(d, b.Transport["xhr-polling"]), d.prototype.name = "jsonp-polling", d.prototype.post = function(a) {
				function c() {
					d(), e.socket.setBuffer(!1)
				}
				function d() {
					e.iframe && e.form.removeChild(e.iframe);try {
						g = document.createElement('<iframe name="' + e.iframeId + '">')
					} catch (a) {
						g = document.createElement("iframe"), g.name = e.iframeId
					} g.id = e.iframeId, e.form.appendChild(g), e.iframe = g
				}
				var e = this,
					f = b.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
				if (!this.form) {
					var g,
						h = document.createElement("form"),
						i = document.createElement("textarea"),
						j = this.iframeId = "socketio_iframe_" + this.index;
					h.className = "socketio", h.style.position = "absolute", h.style.top = "0px", h.style.left = "0px", h.style.display = "none", h.target = j, h.method = "POST", h.setAttribute("accept-charset", "utf-8"), i.name = "d", h.appendChild(i), document.body.appendChild(h), this.form = h, this.area = i
				}
				this.form.action = this.prepareUrl() + f, d(), this.area.value = b.JSON.stringify(a);try {
					this.form.submit()
				} catch (k) {} this.iframe.attachEvent ? g.onreadystatechange = function() {
					"complete" == e.iframe.readyState && c()
				} : this.iframe.onload = c, this.socket.setBuffer(!0)
			}, d.prototype.get = function() {
				var a = this,
					c = document.createElement("script"),
					d = b.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
				this.script && (this.script.parentNode.removeChild(this.script), this.script = null), c.async = !0, c.src = this.prepareUrl() + d, c.onerror = function() {
					a.onClose()
				};
				var f = document.getElementsByTagName("script")[0];
				f.parentNode.insertBefore(c, f), this.script = c, e && setTimeout(function() {
					var a = document.createElement("iframe");
					document.body.appendChild(a), document.body.removeChild(a)
				}, 100)
			}, d.prototype._ = function(a) {
				return this.onData(a), this.isOpen && this.get(), this
			}, d.prototype.ready = function(a, c) {
				var d = this;
				return e ? void b.util.load(function() {
					c.call(d)
				}) : c.call(this)
			}, d.check = function() {
				return "document" in c
			}, d.xdomainCheck = function() {
				return !0
			}, b.transports.push("jsonp-polling")
		}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), "function" == typeof define && define.amd && define([], function() {
			return io
		})
	}(), function(a, b) {
		"object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
			if (!a.document)
				throw new Error("jQuery requires a window with a document");
			return b(a)
		} : b(a)
	}("undefined" != typeof window ? window : this, function(a, b) {
		function c(a) {
			var b = a.length,
				c = fb.type(a);
			return "function" === c || fb.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
		}
		function d(a, b, c) {
			if (fb.isFunction(b)) return fb.grep(a, function(a, d) {
					return !!b.call(a, d, a) !== c
				});
			if (b.nodeType) return fb.grep(a, function(a) {
					return a === b !== c
				});
			if ("string" == typeof b) {
				if (nb.test(b)) return fb.filter(b, a, c);
				b = fb.filter(b, a)
			}
			return fb.grep(a, function(a) {
				return fb.inArray(a, b) >= 0 !== c
			})
		}
		function e(a, b) {
			do a = a[b]; while (a && 1 !== a.nodeType);
			return a
		}
		function f(a) {
			var b = vb[a] = {};
			return fb.each(a.match(ub) || [], function(a, c) {
					b[c] = !0
				}), b
		}
		function g() {
			pb.addEventListener ? (pb.removeEventListener("DOMContentLoaded", h, !1), a.removeEventListener("load", h, !1)) : (pb.detachEvent("onreadystatechange", h), a.detachEvent("onload", h))
		}
		function h() {
			(pb.addEventListener || "load" === event.type || "complete" === pb.readyState) && (g(), fb.ready())
		}
		function i(a, b, c) {
			if (void 0 === c && 1 === a.nodeType) {
				var d = "data-" + b.replace(Ab, "-$1").toLowerCase();
				if (c = a.getAttribute(d), "string" == typeof c) {
					try {
						c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : zb.test(c) ? fb.parseJSON(c) : c
					} catch (e) {} fb.data(a, b, c)
				} else
					c = void 0
			}
			return c
		}
		function j(a) {
			var b;
			for (b in a)
				if (("data" !== b || !fb.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
			return !0
		}
		function k(a, b, c, d) {
			if (fb.acceptData(a)) {
				var e,
					f,
					g = fb.expando,
					h = a.nodeType,
					i = h ? fb.cache : a,
					j = h ? a[g] : a[g] && g;
				if (j && i[j] && (d || i[j].data) || void 0 !== c || "string" != typeof b) return j || (j = h ? a[g] = W.pop() || fb.guid++ : g), i[j] || (i[j] = h ? {} : {
							toJSON : fb.noop
						}), ("object" == typeof b || "function" == typeof b) && (d ? i[j] = fb.extend(i[j], b) : i[j].data = fb.extend(i[j].data, b)), f = i[j], d || (f.data || (f.data = {}), f = f.data), void 0 !== c && (f[fb.camelCase(b)] = c), "string" == typeof b ? (e = f[b], null == e && (e = f[fb.camelCase(b)])) : e = f, e
			}
		}
		function l(a, b, c) {
			if (fb.acceptData(a)) {
				var d,
					e,
					f = a.nodeType,
					g = f ? fb.cache : a,
					h = f ? a[fb.expando] : fb.expando;
				if (g[h]) {
					if (b && (d = c ? g[h] : g[h].data)) {
						fb.isArray(b) ? b = b.concat(fb.map(b, fb.camelCase)) : b in d ? b = [ b ] : (b = fb.camelCase(b), b = b in d ? [ b ] : b.split(" ")), e = b.length;
						for (; e--;)
							delete d[b[e]];
						if (c ? !j(d) : !fb.isEmptyObject(d)) return
					}
					(c || (
					delete g[h].data
					, j(g[h]))) && (f ? fb.cleanData([ a ], !0) : db.deleteExpando || g != g.window ?
						delete g[h]
						: g[h] = null)
				}
			}
		}
		function m() {
			return !0
		}
		function n() {
			return !1
		}
		function o() {
			try {
				return pb.activeElement
			} catch (a) {}
		}
		function p(a) {
			var b = Lb.split("|"),
				c = a.createDocumentFragment();
			if (c.createElement)
				for (; b.length;) c.createElement(b.pop());
			return c
		}
		function q(a, b) {
			var c,
				d,
				e = 0,
				f = typeof a.getElementsByTagName !== yb ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== yb ? a.querySelectorAll(b || "*") : void 0;
			if (!f)
				for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || fb.nodeName(d, b) ? f.push(d) : fb.merge(f, q(d, b));
			return void 0 === b || b && fb.nodeName(a, b) ? fb.merge([ a ], f) : f
		}
		function r(a) {
			Fb.test(a.type) && (a.defaultChecked = a.checked)
		}
		function s(a, b) {
			return fb.nodeName(a, "table") && fb.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
		}
		function t(a) {
			return a.type = (null !== fb.find.attr(a, "type")) + "/" + a.type, a
		}
		function u(a) {
			var b = Wb.exec(a.type);
			return b ? a.type = b[1] : a.removeAttribute("type"), a
		}
		function v(a, b) {
			for (var c, d = 0; null != (c = a[d]); d++) fb._data(c, "globalEval", !b || fb._data(b[d], "globalEval"))
		}
		function w(a, b) {
			if (1 === b.nodeType && fb.hasData(a)) {
				var c,
					d,
					e,
					f = fb._data(a),
					g = fb._data(b, f),
					h = f.events;
				if (h) {
					delete g.handle
					, g.events = {};
					for (c in h)
						for (d = 0, e = h[c].length; e > d; d++) fb.event.add(b, c, h[c][d])
				}
				g.data && (g.data = fb.extend({}, g.data))
			}
		}
		function x(a, b) {
			var c,
				d,
				e;
			if (1 === b.nodeType) {
				if (c = b.nodeName.toLowerCase(), !db.noCloneEvent && b[fb.expando]) {
					e = fb._data(b);
					for (d in e.events) fb.removeEvent(b, d, e.handle);
					b.removeAttribute(fb.expando)
				}
				"script" === c && b.text !== a.text ? (t(b).text = a.text, u(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), db.html5Clone && a.innerHTML && !fb.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Fb.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
			}
		}
		function y(b, c) {
			var d = fb(c.createElement(b)).appendTo(c.body),
				e = a.getDefaultComputedStyle ? a.getDefaultComputedStyle(d[0]).display : fb.css(d[0], "display");
			return d.detach(), e
		}
		function z(a) {
			var b = pb,
				c = ac[a];
			return c || (c = y(a, b), "none" !== c && c || (_b = (_b || fb("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (_b[0].contentWindow || _b[0].contentDocument).document, b.write(), b.close(), c = y(a, b), _b.detach()), ac[a] = c), c
		}
		function A(a, b) {
			return {
				get : function() {
					var c = a();
					if (null != c) return c ? void
						delete this.get
							: (this.get = b).apply(this, arguments)
				}
			}
		}
		function B(a, b) {
			if (b in a) return b;
			for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = nc.length; e--;)
				if (b = nc[e] + c, b in a) return b;
			return d
		}
		function C(a, b) {
			for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = fb._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && Db(d) && (f[g] = fb._data(d, "olddisplay", z(d.nodeName)))) : f[g] || (e = Db(d), (c && "none" !== c || !e) && fb._data(d, "olddisplay", e ? c : fb.css(d, "display"))));
			for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
			return a
		}
		function D(a, b, c) {
			var d = jc.exec(b);
			return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
		}
		function E(a, b, c, d, e) {
			for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += fb.css(a, c + Cb[f], !0, e)), d ? ("content" === c && (g -= fb.css(a, "padding" + Cb[f], !0, e)), "margin" !== c && (g -= fb.css(a, "border" + Cb[f] + "Width", !0, e))) : (g += fb.css(a, "padding" + Cb[f], !0, e), "padding" !== c && (g += fb.css(a, "border" + Cb[f] + "Width", !0, e)));
			return g
		}
		function F(a, b, c) {
			var d = !0,
				e = "width" === b ? a.offsetWidth : a.offsetHeight,
				f = bc(a),
				g = db.boxSizing() && "border-box" === fb.css(a, "boxSizing", !1, f);
			if (0 >= e || null == e) {
				if (e = cc(a, b, f), (0 > e || null == e) && (e = a.style[b]), ec.test(e)) return e;
				d = g && (db.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
			}
			return e + E(a, b, c || (g ? "border" : "content"), d, f) + "px"
		}
		function G(a, b, c, d, e) {
			return new G.prototype.init(a, b, c, d, e)
		}
		function H() {
			return setTimeout(function() {
					oc = void 0
				}), oc = fb.now()
		}
		function I(a, b) {
			var c,
				d = {
					height : a
				},
				e = 0;
			for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = Cb[e], d["margin" + c] = d["padding" + c] = a;
			return b && (d.opacity = d.width = a), d
		}
		function J(a, b, c) {
			for (var d, e = (uc[b] || []).concat(uc["*"]), f = 0, g = e.length; g > f; f++)
				if (d = e[f].call(c, b, a)) return d
		}
		function K(a, b, c) {
			var d,
				e,
				f,
				g,
				h,
				i,
				j,
				k,
				l = this,
				m = {},
				n = a.style,
				o = a.nodeType && Db(a),
				p = fb._data(a, "fxshow");
			c.queue || (h = fb._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
				h.unqueued || i()
			}), h.unqueued++, l.always(function() {
				l.always(function() {
					h.unqueued--, fb.queue(a, "fx").length || h.empty.fire()
				})
			})), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [ n.overflow, n.overflowX, n.overflowY ], j = fb.css(a, "display"), k = z(a.nodeName), "none" === j && (j = k), "inline" === j && "none" === fb.css(a, "float") && (db.inlineBlockNeedsLayout && "inline" !== k ? n.zoom = 1 : n.display = "inline-block")), c.overflow && (n.overflow = "hidden", db.shrinkWrapBlocks() || l.always(function() {
				n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
			}));
			for (d in b)
				if (e = b[d], qc.exec(e)) {
					if (
						delete b[d]
						, f = f || "toggle" === e, e === (o ? "hide" : "show")) {
						if ("show" !== e || !p || void 0 === p[d]) continue;
						o = !0
					}
					m[d] = p && p[d] || fb.style(a, d)
			}
			if (!fb.isEmptyObject(m)) {
				p ? "hidden" in p && (o = p.hidden) : p = fb._data(a, "fxshow", {}), f && (p.hidden = !o), o ? fb(a).show() : l.done(function() {
					fb(a).hide()
				}), l.done(function() {
					var b;
					fb._removeData(a, "fxshow");
					for (b in m) fb.style(a, b, m[b])
				});
				for (d in m) g = J(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
			}
		}
		function L(a, b) {
			var c,
				d,
				e,
				f,
				g;
			for (c in a)
				if (d = fb.camelCase(c), e = b[d], f = a[c], fb.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f,
					delete a[c]
					), g = fb.cssHooks[d], g && "expand" in g) {
					f = g.expand(f),
					delete a[d];
					for (c in f) c in a || (a[c] = f[c], b[c] = e)
				} else
					b[d] = e
		}
		function M(a, b, c) {
			var d,
				e,
				f = 0,
				g = tc.length,
				h = fb.Deferred().always(function() {
					delete i.elem
				}),
				i = function() {
					if (e) return !1;
					for (var b = oc || H(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
					return h.notifyWith(a, [ j, f, c ]), 1 > f && i ? c : (h.resolveWith(a, [ j ]), !1)
				},
				j = h.promise({
					elem : a,
					props : fb.extend({}, b),
					opts : fb.extend(!0, {
						specialEasing : {}
					}, c),
					originalProperties : b,
					originalOptions : c,
					startTime : oc || H(),
					duration : c.duration,
					tweens : [],
					createTween : function(b, c) {
						var d = fb.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
						return j.tweens.push(d), d
					},
					stop : function(b) {
						var c = 0,
							d = b ? j.tweens.length : 0;
						if (e) return this;
						for (e = !0; d > c; c++) j.tweens[c].run(1);
						return b ? h.resolveWith(a, [ j, b ]) : h.rejectWith(a, [ j, b ]), this
					}
				}),
				k = j.props;
			for (L(k, j.opts.specialEasing); g > f; f++)
				if (d = tc[f].call(j, a, k, j.opts)) return d;
			return fb.map(k, J, j), fb.isFunction(j.opts.start) && j.opts.start.call(a, j), fb.fx.timer(fb.extend(i, {
					elem : a,
					anim : j,
					queue : j.opts.queue
				})), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
		}
		function N(a) {
			return function(b, c) {
				"string" != typeof b && (c = b, b = "*");
				var d,
					e = 0,
					f = b.toLowerCase().match(ub) || [];
				if (fb.isFunction(c))
					for (; d = f[e++];) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
			}
		}
		function O(a, b, c, d) {
			function e(h) {
				var i;
				return f[h] = !0, fb.each(a[h] || [], function(a, h) {
						var j = h(b, c, d);
						return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
					}), i
			}
			var f = {},
				g = a === Sc;
			return e(b.dataTypes[0]) || !f["*"] && e("*")
		}
		function P(a, b) {
			var c,
				d,
				e = fb.ajaxSettings.flatOptions || {};
			for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
			return c && fb.extend(!0, a, c), a
		}
		function Q(a, b, c) {
			for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0];) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
			if (e)
				for (g in h)
					if (h[g] && h[g].test(e)) {
						i.unshift(g);break
			}
			if (i[0] in c)
				f = i[0];else {
				for (g in c) {
					if (!i[0] || a.converters[g + " " + i[0]]) {
						f = g;break
					}
					d || (d = g)
				}
				f = f || d
			}
			return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
		}
		function R(a, b, c, d) {
			var e,
				f,
				g,
				h,
				i,
				j = {},
				k = a.dataTypes.slice();
			if (k[1])
				for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
			for (f = k.shift(); f;)
				if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
					if ("*" === f)
						f = i;
					else if ("*" !== i && i !== f) {
						if (g = j[i + " " + f] || j["* " + f], !g)
							for (e in j)
								if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
									g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));break
						}
						if (g !== !0)
							if (g && a["throws"])
								b = g(b);else try {
									b = g(b)
								} catch (l) {
									return {
										state : "parsererror",
										error : g ? l : "No conversion from " + i + " to " + f
									}
						}
			}
			return {
				state : "success",
				data : b
			}
		}
		function S(a, b, c, d) {
			var e;
			if (fb.isArray(b)) fb.each(b, function(b, e) {
					c || Wc.test(a) ? d(a, e) : S(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
				});
			else if (c || "object" !== fb.type(b)) d(a, b);else
				for (e in b) S(a + "[" + e + "]", b[e], c, d)
		}
		function T() {
			try {
				return new a.XMLHttpRequest
			} catch (b) {}
		}
		function U() {
			try {
				return new a.ActiveXObject("Microsoft.XMLHTTP")
			} catch (b) {}
		}
		function V(a) {
			return fb.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
		}
		var W = [],
			X = W.slice,
			Y = W.concat,
			Z = W.push,
			$ = W.indexOf,
			_ = {},
			ab = _.toString,
			bb = _.hasOwnProperty,
			cb = "".trim,
			db = {},
			eb = "1.11.0",
			fb = function(a, b) {
				return new fb.fn.init(a, b)
			},
			gb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
			hb = /^-ms-/,
			ib = /-([\da-z])/gi,
			jb = function(a, b) {
				return b.toUpperCase()
			};
		fb.fn = fb.prototype = {
			jquery : eb,
			constructor : fb,
			selector : "",
			length : 0,
			toArray : function() {
				return X.call(this)
			},
			get : function(a) {
				return null != a ? 0 > a ? this[a + this.length] : this[a] : X.call(this)
			},
			pushStack : function(a) {
				var b = fb.merge(this.constructor(), a);
				return b.prevObject = this, b.context = this.context, b
			},
			each : function(a, b) {
				return fb.each(this, a, b)
			},
			map : function(a) {
				return this.pushStack(fb.map(this, function(b, c) {
					return a.call(b, c, b)
				}))
			},
			slice : function() {
				return this.pushStack(X.apply(this, arguments))
			},
			first : function() {
				return this.eq(0)
			},
			last : function() {
				return this.eq(-1)
			},
			eq : function(a) {
				var b = this.length,
					c = +a + (0 > a ? b : 0);
				return this.pushStack(c >= 0 && b > c ? [ this[c] ] : [])
			},
			end : function() {
				return this.prevObject || this.constructor(null)
			},
			push : Z,
			sort : W.sort,
			splice : W.splice
		}, fb.extend = fb.fn.extend = function() {
			var a,
				b,
				c,
				d,
				e,
				f,
				g = arguments[0] || {},
				h = 1,
				i = arguments.length,
				j = !1;
			for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || fb.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
				if (null != (e = arguments[h]))
					for (d in e) a = g[d], c = e[d], g !== c && (j && c && (fb.isPlainObject(c) || (b = fb.isArray(c))) ? (b ? (b = !1, f = a && fb.isArray(a) ? a : []) : f = a && fb.isPlainObject(a) ? a : {}, g[d] = fb.extend(j, f, c)) : void 0 !== c && (g[d] = c));
			return g
		}, fb.extend({
			expando : "jQuery" + (eb + Math.random()).replace(/\D/g, ""),
			isReady : !0,
			error : function(a) {
				throw new Error(a)
			},
			noop : function() {},
			isFunction : function(a) {
				return "function" === fb.type(a)
			},
			isArray : Array.isArray || function(a) {
					return "array" === fb.type(a)
			},
			isWindow : function(a) {
				return null != a && a == a.window
			},
			isNumeric : function(a) {
				return a - parseFloat(a) >= 0
			},
			isEmptyObject : function(a) {
				var b;
				for (b in a) return !1;
				return !0
			},
			isPlainObject : function(a) {
				var b;
				if (!a || "object" !== fb.type(a) || a.nodeType || fb.isWindow(a)) return !1;
				try {
					if (a.constructor && !bb.call(a, "constructor") && !bb.call(a.constructor.prototype, "isPrototypeOf")) return !1
				} catch (c) {
					return !1
				}
				if (db.ownLast)
					for (b in a) return bb.call(a, b);
				for (b in a)
					;
				return void 0 === b || bb.call(a, b)
			},
			type : function(a) {
				return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? _[ab.call(a)] || "object" : typeof a
			},
			globalEval : function(b) {
				b && fb.trim(b) && (a.execScript || function(b) {
					a.eval.call(a, b)
				})(b)
			},
			camelCase : function(a) {
				return a.replace(hb, "ms-").replace(ib, jb)
			},
			nodeName : function(a, b) {
				return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
			},
			each : function(a, b, d) {
				var e,
					f = 0,
					g = a.length,
					h = c(a);
				if (d) {
					if (h)
						for (; g > f && (e = b.apply(a[f], d), e !== !1); f++)
							;
					else
						for (f in a)
							if (e = b.apply(a[f], d), e === !1) break
				} else if (h)
					for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++)
						;
				else
					for (f in a)
						if (e = b.call(a[f], f, a[f]), e === !1) break;
				return a
			},
			trim : cb && !cb.call("﻿ ") ? function(a) {
				return null == a ? "" : cb.call(a)
			} : function(a) {
				return null == a ? "" : (a + "").replace(gb, "")
			},
			makeArray : function(a, b) {
				var d = b || [];
				return null != a && (c(Object(a)) ? fb.merge(d, "string" == typeof a ? [ a ] : a) : Z.call(d, a)), d
			},
			inArray : function(a, b, c) {
				var d;
				if (b) {
					if ($) return $.call(b, a, c);
					for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
						if (c in b && b[c] === a) return c
				}
				return -1
			},
			merge : function(a, b) {
				for (var c = +b.length, d = 0, e = a.length; c > d;) a[e++] = b[d++];
				if (c !== c)
					for (; void 0 !== b[d];) a[e++] = b[d++];
				return a.length = e, a
			},
			grep : function(a, b, c) {
				for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
				return e
			},
			map : function(a, b, d) {
				var e,
					f = 0,
					g = a.length,
					h = c(a),
					i = [];
				if (h)
					for (; g > f; f++) e = b(a[f], f, d), null != e && i.push(e);
				else
					for (f in a) e = b(a[f], f, d), null != e && i.push(e);
				return Y.apply([], i)
			},
			guid : 1,
			proxy : function(a, b) {
				var c,
					d,
					e;
				return "string" == typeof b && (e = a[b], b = a, a = e), fb.isFunction(a) ? (c = X.call(arguments, 2), d = function() {
						return a.apply(b || this, c.concat(X.call(arguments)))
					}, d.guid = a.guid = a.guid || fb.guid++, d) : void 0
			},
			now : function() {
				return +new Date
			},
			support : db
		}), fb.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
			_["[object " + b + "]"] = b.toLowerCase()
		});
		var kb = function(a) {
			function b(a, b, c, d) {
				var e,
					f,
					g,
					h,
					i,
					j,
					l,
					o,
					p,
					q;
				if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], !a || "string" != typeof a) return c;
				if (1 !== (h = b.nodeType) && 9 !== h) return [];
				if (I && !d) {
					if (e = sb.exec(a))
						if (g = e[1]) {
							if (9 === h) {
								if (f = b.getElementById(g), !f || !f.parentNode) return c;
								if (f.id === g) return c.push(f), c
							} else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c
						} else {
							if (e[2]) return _.apply(c, b.getElementsByTagName(a)), c;
							if ((g = e[3]) && x.getElementsByClassName && b.getElementsByClassName) return _.apply(c, b.getElementsByClassName(g)), c
					}
					if (x.qsa && (!J || !J.test(a))) {
						if (o = l = N, p = b, q = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
							for (j = m(a), (l = b.getAttribute("id")) ? o = l.replace(ub, "\\$&") : b.setAttribute("id", o), o = "[id='" + o + "'] ", i = j.length; i--;) j[i] = o + n(j[i]);
							p = tb.test(a) && k(b.parentNode) || b, q = j.join(",")
						}
						if (q) try {
								return _.apply(c, p.querySelectorAll(q)), c
							} catch (r) {} finally {
								l || b.removeAttribute("id")
						}
					}
				}
				return v(a.replace(ib, "$1"), b, c, d)
			}
			function c() {
				function a(c, d) {
					return b.push(c + " ") > y.cacheLength &&
						delete a[b.shift()]
						, a[c + " "] = d
				}
				var b = [];
				return a
			}
			function d(a) {
				return a[N] = !0, a
			}
			function e(a) {
				var b = G.createElement("div");
				try {
					return !!a(b)
				} catch (c) {
					return !1
				} finally {
					b.parentNode && b.parentNode.removeChild(b), b = null
				}
			}
			function f(a, b) {
				for (var c = a.split("|"), d = a.length; d--;) y.attrHandle[c[d]] = b
			}
			function g(a, b) {
				var c = b && a,
					d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || W) - (~a.sourceIndex || W);
				if (d) return d;
				if (c)
					for (; c = c.nextSibling;)
						if (c === b) return -1;
				return a ? 1 : -1
			}
			function h(a) {
				return function(b) {
					var c = b.nodeName.toLowerCase();
					return "input" === c && b.type === a
				}
			}
			function i(a) {
				return function(b) {
					var c = b.nodeName.toLowerCase();
					return ("input" === c || "button" === c) && b.type === a
				}
			}
			function j(a) {
				return d(function(b) {
					return b = +b, d(function(c, d) {
							for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
						})
				})
			}
			function k(a) {
				return a && typeof a.getElementsByTagName !== V && a
			}
			function l() {
			}
			function m(a, c) {
				var d,
					e,
					f,
					g,
					h,
					i,
					j,
					k = S[a + " "];
				if (k) return c ? 0 : k.slice(0);
				for (h = a, i = [], j = y.preFilter; h;) {
					(!d || (e = jb.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = kb.exec(h)) && (d = e.shift(), f.push({
						value : d,
						type : e[0].replace(ib, " ")
					}), h = h.slice(d.length));
					for (g in y.filter) !(e = ob[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
							value : d,
							type : g,
							matches : e
						}), h = h.slice(d.length));
					if (!d) break
				}
				return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
			}
			function n(a) {
				for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
				return d
			}
			function o(a, b, c) {
				var d = b.dir,
					e = c && "parentNode" === d,
					f = Q++;
				return b.first ? function(b, c, f) {
					for (; b = b[d];)
						if (1 === b.nodeType || e) return a(b, c, f)
				} : function(b, c, g) {
					var h,
						i,
						j = [ P, f ];
					if (g) {
						for (; b = b[d];)
							if ((1 === b.nodeType || e) && a(b, c, g)) return !0
					} else
						for (; b = b[d];)
							if (1 === b.nodeType || e) {
								if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
								if (i[d] = j, j[2] = a(b, c, g)) return !0
					}
				}
			}
			function p(a) {
				return a.length > 1 ? function(b, c, d) {
					for (var e = a.length; e--;)
						if (!a[e](b, c, d)) return !1;
					return !0
				} : a[0]
			}
			function q(a, b, c, d, e) {
				for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
				return g
			}
			function r(a, b, c, e, f, g) {
				return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function(d, g, h, i) {
						var j,
							k,
							l,
							m = [],
							n = [],
							o = g.length,
							p = d || u(b || "*", h.nodeType ? [ h ] : h, []),
							r = !a || !d && b ? p : q(p, m, a, h, i),
							s = c ? f || (d ? a : o || e) ? [] : g : r;
						if (c && c(r, s, h, i), e)
							for (j = q(s, n), e(j, [], h, i), k = j.length; k--;) (l = j[k]) && (s[n[k]] = !(r[n[k]] = l));
						if (d) {
							if (f || a) {
								if (f) {
									for (j = [], k = s.length; k--;) (l = s[k]) && j.push(r[k] = l);
									f(null, s = [], j, i)
								}
								for (k = s.length; k--;) (l = s[k]) && (j = f ? bb.call(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
							}
						} else s = q(s === g ? s.splice(o, s.length) : s), f ? f(null, g, s, i) : _.apply(g, s)
					})
			}
			function s(a) {
				for (var b, c, d, e = a.length, f = y.relative[a[0].type], g = f || y.relative[" "], h = f ? 1 : 0, i = o(function(a) {
							return a === b
						}, g, !0), j = o(function(a) {
							return bb.call(b, a) > -1
						}, g, !0), k = [ function(a, c, d) {
							return !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
						} ]; e > h; h++)
					if (c = y.relative[a[h].type])
						k = [ o(p(k), c) ];else {
						if (c = y.filter[a[h].type].apply(null, a[h].matches), c[N]) {
							for (d = ++h; e > d && !y.relative[a[d].type]; d++)
								;
							return r(h > 1 && p(k), h > 1 && n(a.slice(0, h - 1).concat({
									value : " " === a[h - 2].type ? "*" : ""
								})).replace(ib, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && n(a))
						}
						k.push(c)
				}
				return p(k)
			}
			function t(a, c) {
				var e = c.length > 0,
					f = a.length > 0,
					g = function(d, g, h, i, j) {
						var k,
							l,
							m,
							n = 0,
							o = "0",
							p = d && [],
							r = [],
							s = C,
							t = d || f && y.find.TAG("*", j),
							u = P += null == s ? 1 : Math.random() || .1,
							v = t.length;
						for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
							if (f && k) {
								for (l = 0; m = a[l++];)
									if (m(k, g, h)) {
										i.push(k);break
								}
								j && (P = u)
							}
							e && ((k = !m && k) && n--, d && p.push(k))
						}
						if (n += o, e && o !== n) {
							for (l = 0; m = c[l++];) m(p, r, g, h);
							if (d) {
								if (n > 0)
									for (; o--;) p[o] || r[o] || (r[o] = Z.call(i));
								r = q(r)
							}
							_.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
						}
						return j && (P = u, C = s), p
					};
				return e ? d(g) : g
			}
			function u(a, c, d) {
				for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
				return d
			}
			function v(a, b, c, d) {
				var e,
					f,
					g,
					h,
					i,
					j = m(a);
				if (!d && 1 === j.length) {
					if (f = j[0] = j[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && x.getById && 9 === b.nodeType && I && y.relative[f[1].type]) {
						if (b = (y.find.ID(g.matches[0].replace(vb, wb), b) || [])[0], !b) return c;
						a = a.slice(f.shift().value.length)
					}
					for (e = ob.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !y.relative[h = g.type]);)
						if ((i = y.find[h]) && (d = i(g.matches[0].replace(vb, wb), tb.test(f[0].type) && k(b.parentNode) || b))) {
							if (f.splice(e, 1), a = d.length && n(f), !a) return _.apply(c, d), c;
							break
					}
				}
				return B(a, j)(d, b, !I, c, tb.test(a) && k(b.parentNode) || b), c
			}
			var w,
				x,
				y,
				z,
				A,
				B,
				C,
				D,
				E,
				F,
				G,
				H,
				I,
				J,
				K,
				L,
				M,
				N = "sizzle" + -new Date,
				O = a.document,
				P = 0,
				Q = 0,
				R = c(),
				S = c(),
				T = c(),
				U = function(a, b) {
					return a === b && (E = !0), 0
				},
				V = "undefined",
				W = 1 << 31,
				X = {}.hasOwnProperty,
				Y = [],
				Z = Y.pop,
				$ = Y.push,
				_ = Y.push,
				ab = Y.slice,
				bb = Y.indexOf || function(a) {
					for (var b = 0, c = this.length; c > b; b++)
						if (this[b] === a) return b;
					return -1
				},
				cb = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
				db = "[\\x20\\t\\r\\n\\f]",
				eb = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
				fb = eb.replace("w", "w#"),
				gb = "\\[" + db + "*(" + eb + ")" + db + "*(?:([*^$|!~]?=)" + db + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + fb + ")|)|)" + db + "*\\]",
				hb = ":(" + eb + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + gb.replace(3, 8) + ")*)|.*)\\)|)",
				ib = new RegExp("^" + db + "+|((?:^|[^\\\\])(?:\\\\.)*)" + db + "+$", "g"),
				jb = new RegExp("^" + db + "*," + db + "*"),
				kb = new RegExp("^" + db + "*([>+~]|" + db + ")" + db + "*"),
				lb = new RegExp("=" + db + "*([^\\]'\"]*?)" + db + "*\\]", "g"),
				mb = new RegExp(hb),
				nb = new RegExp("^" + fb + "$"),
				ob = {
					ID : new RegExp("^#(" + eb + ")"),
					CLASS : new RegExp("^\\.(" + eb + ")"),
					TAG : new RegExp("^(" + eb.replace("w", "w*") + ")"),
					ATTR : new RegExp("^" + gb),
					PSEUDO : new RegExp("^" + hb),
					CHILD : new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + db + "*(even|odd|(([+-]|)(\\d*)n|)" + db + "*(?:([+-]|)" + db + "*(\\d+)|))" + db + "*\\)|)", "i"),
					bool : new RegExp("^(?:" + cb + ")$", "i"),
					needsContext : new RegExp("^" + db + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + db + "*((?:-\\d)?\\d*)" + db + "*\\)|)(?=[^-]|$)", "i")
				},
				pb = /^(?:input|select|textarea|button)$/i,
				qb = /^h\d$/i,
				rb = /^[^{]+\{\s*\[native \w/,
				sb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
				tb = /[+~]/,
				ub = /'|\\/g,
				vb = new RegExp("\\\\([\\da-f]{1,6}" + db + "?|(" + db + ")|.)", "ig"),
				wb = function(a, b, c) {
					var d = "0x" + b - 65536;
					return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
				};
			try {
				_.apply(Y = ab.call(O.childNodes), O.childNodes), Y[O.childNodes.length].nodeType
			} catch (xb) {
				_ = {
					apply : Y.length ? function(a, b) {
						$.apply(a, ab.call(b))
					} : function(a, b) {
						for (var c = a.length, d = 0; a[c++] = b[d++];)
							;
						a.length = c - 1
					}
				}
			} x = b.support = {}, A = b.isXML = function(a) {
				var b = a && (a.ownerDocument || a).documentElement;
				return b ? "HTML" !== b.nodeName : !1
			}, F = b.setDocument = function(a) {
				var b,
					c = a ? a.ownerDocument || a : O,
					d = c.defaultView;
				return c !== G && 9 === c.nodeType && c.documentElement ? (G = c, H = c.documentElement, I = !A(c), d && d !== d.top && (d.addEventListener ? d.addEventListener("unload", function() {
					F()
				}, !1) : d.attachEvent && d.attachEvent("onunload", function() {
					F()
				})), x.attributes = e(function(a) {
					return a.className = "i", !a.getAttribute("className")
				}), x.getElementsByTagName = e(function(a) {
					return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length
				}), x.getElementsByClassName = rb.test(c.getElementsByClassName) && e(function(a) {
					return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
				}), x.getById = e(function(a) {
					return H.appendChild(a).id = N, !c.getElementsByName || !c.getElementsByName(N).length
				}), x.getById ? (y.find.ID = function(a, b) {
					if (typeof b.getElementById !== V && I) {
						var c = b.getElementById(a);
						return c && c.parentNode ? [ c ] : []
					}
				}, y.filter.ID = function(a) {
					var b = a.replace(vb, wb);
					return function(a) {
						return a.getAttribute("id") === b
					}
				}) : (
					delete y.find.ID
					, y.filter.ID = function(a) {
						var b = a.replace(vb, wb);
						return function(a) {
							var c = typeof a.getAttributeNode !== V && a.getAttributeNode("id");
							return c && c.value === b
						}
					}), y.find.TAG = x.getElementsByTagName ? function(a, b) {
					return typeof b.getElementsByTagName !== V ? b.getElementsByTagName(a) : void 0
				} : function(a, b) {
					var c,
						d = [],
						e = 0,
						f = b.getElementsByTagName(a);
					if ("*" === a) {
						for (; c = f[e++];) 1 === c.nodeType && d.push(c);
						return d
					}
					return f
				}, y.find.CLASS = x.getElementsByClassName && function(a, b) {
					return typeof b.getElementsByClassName !== V && I ? b.getElementsByClassName(a) : void 0
				}, K = [], J = [], (x.qsa = rb.test(c.querySelectorAll)) && (e(function(a) {
					a.innerHTML = "<select t=''><option selected=''></option></select>", a.querySelectorAll("[t^='']").length && J.push("[*^$]=" + db + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + db + "*(?:value|" + cb + ")"), a.querySelectorAll(":checked").length || J.push(":checked")
				}), e(function(a) {
					var b = c.createElement("input");
					b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + db + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
				})), (x.matchesSelector = rb.test(L = H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
					x.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", hb)
				}), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = rb.test(H.compareDocumentPosition), M = b || rb.test(H.contains) ? function(a, b) {
					var c = 9 === a.nodeType ? a.documentElement : a,
						d = b && b.parentNode;
					return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
				} : function(a, b) {
					if (b)
						for (; b = b.parentNode;)
							if (b === a) return !0;
					return !1
				}, U = b ? function(a, b) {
					if (a === b) return E = !0, 0;
					var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
					return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !x.sortDetached && b.compareDocumentPosition(a) === d ? a === c || a.ownerDocument === O && M(O, a) ? -1 : b === c || b.ownerDocument === O && M(O, b) ? 1 : D ? bb.call(D, a) - bb.call(D, b) : 0 : 4 & d ? -1 : 1)
				} : function(a, b) {
					if (a === b) return E = !0, 0;
					var d,
						e = 0,
						f = a.parentNode,
						h = b.parentNode,
						i = [ a ],
						j = [ b ];
					if (!f || !h) return a === c ? -1 : b === c ? 1 : f ? -1 : h ? 1 : D ? bb.call(D, a) - bb.call(D, b) : 0;
					if (f === h) return g(a, b);
					for (d = a; d = d.parentNode;) i.unshift(d);
					for (d = b; d = d.parentNode;) j.unshift(d);
					for (; i[e] === j[e];) e++;
					return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
				}, c) : G
			}, b.matches = function(a, c) {
				return b(a, null, null, c)
			}, b.matchesSelector = function(a, c) {
				if ((a.ownerDocument || a) !== G && F(a), c = c.replace(lb, "='$1']"), !(!x.matchesSelector || !I || K && K.test(c) || J && J.test(c))) try {
						var d = L.call(a, c);
						if (d || x.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
					} catch (e) {} return b(c, G, null, [ a ]).length > 0
			}, b.contains = function(a, b) {
				return (a.ownerDocument || a) !== G && F(a), M(a, b)
			}, b.attr = function(a, b) {
				(a.ownerDocument || a) !== G && F(a);
				var c = y.attrHandle[b.toLowerCase()],
					d = c && X.call(y.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
				return void 0 !== d ? d : x.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
			}, b.error = function(a) {
				throw new Error("Syntax error, unrecognized expression: " + a)
			}, b.uniqueSort = function(a) {
				var b,
					c = [],
					d = 0,
					e = 0;
				if (E = !x.detectDuplicates, D = !x.sortStable && a.slice(0), a.sort(U), E) {
					for (; b = a[e++];) b === a[e] && (d = c.push(e));
					for (; d--;) a.splice(c[d], 1)
				}
				return D = null, a
			}, z = b.getText = function(a) {
				var b,
					c = "",
					d = 0,
					e = a.nodeType;
				if (e) {
					if (1 === e || 9 === e || 11 === e) {
						if ("string" == typeof a.textContent) return a.textContent;
						for (a = a.firstChild; a; a = a.nextSibling) c += z(a)
					} else if (3 === e || 4 === e) return a.nodeValue
				} else
					for (; b = a[d++];) c += z(b);
				return c
			}, y = b.selectors = {
				cacheLength : 50,
				createPseudo : d,
				match : ob,
				attrHandle : {},
				find : {},
				relative : {
					">" : {
						dir : "parentNode",
						first : !0
					},
					" " : {
						dir : "parentNode"
					},
					"+" : {
						dir : "previousSibling",
						first : !0
					},
					"~" : {
						dir : "previousSibling"
					}
				},
				preFilter : {
					ATTR : function(a) {
						return a[1] = a[1].replace(vb, wb), a[3] = (a[4] || a[5] || "").replace(vb, wb), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
					},
					CHILD : function(a) {
						return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
					},
					PSEUDO : function(a) {
						var b,
							c = !a[5] && a[2];
						return ob.CHILD.test(a[0]) ? null : (a[3] && void 0 !== a[4] ? a[2] = a[4] : c && mb.test(c) && (b = m(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
					}
				},
				filter : {
					TAG : function(a) {
						var b = a.replace(vb, wb).toLowerCase();
						return "*" === a ? function() {
							return !0
						} : function(a) {
							return a.nodeName && a.nodeName.toLowerCase() === b
						}
					},
					CLASS : function(a) {
						var b = R[a + " "];
						return b || (b = new RegExp("(^|" + db + ")" + a + "(" + db + "|$)")) && R(a, function(a) {
								return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== V && a.getAttribute("class") || "")
							})
					},
					ATTR : function(a, c, d) {
						return function(e) {
							var f = b.attr(e, a);
							return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
						}
					},
					CHILD : function(a, b, c, d, e) {
						var f = "nth" !== a.slice(0, 3),
							g = "last" !== a.slice(-4),
							h = "of-type" === b;
						return 1 === d && 0 === e ? function(a) {
							return !!a.parentNode
						} : function(b, c, i) {
							var j,
								k,
								l,
								m,
								n,
								o,
								p = f !== g ? "nextSibling" : "previousSibling",
								q = b.parentNode,
								r = h && b.nodeName.toLowerCase(),
								s = !i && !h;
							if (q) {
								if (f) {
									for (; p;) {
										for (l = b; l = l[p];)
											if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
										o = p = "only" === a && !o && "nextSibling"
									}
									return !0
								}
								if (o = [ g ? q.firstChild : q.lastChild ], g && s) {
									for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
										if (1 === l.nodeType && ++m && l === b) {
											k[a] = [ P, n, m ];break
									}
								} else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P)
									m = j[1];else
									for (; (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [ P, m ]), l !== b));)
										;
								return m -= e, m === d || m % d === 0 && m / d >= 0
							}
						}
					},
					PSEUDO : function(a, c) {
						var e,
							f = y.pseudos[a] || y.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
						return f[N] ? f(c) : f.length > 1 ? (e = [ a, a, "", c ], y.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
							for (var d, e = f(a, c), g = e.length; g--;) d = bb.call(a, e[g]), a[d] = !(b[d] = e[g])
						}) : function(a) {
							return f(a, 0, e)
						}) : f
					}
				},
				pseudos : {
					not : d(function(a) {
						var b = [],
							c = [],
							e = B(a.replace(ib, "$1"));
						return e[N] ? d(function(a, b, c, d) {
							for (var f, g = e(a, null, d, []), h = a.length; h--;) (f = g[h]) && (a[h] = !(b[h] = f))
						}) : function(a, d, f) {
							return b[0] = a, e(b, null, f, c), !c.pop()
						}
					}),
					has : d(function(a) {
						return function(c) {
							return b(a, c).length > 0
						}
					}),
					contains : d(function(a) {
						return function(b) {
							return (b.textContent || b.innerText || z(b)).indexOf(a) > -1
						}
					}),
					lang : d(function(a) {
						return nb.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(vb, wb).toLowerCase(), function(b) {
								var c;
								do
									if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
								while ((b = b.parentNode) && 1 === b.nodeType);
								return !1
						}
					}),
					target : function(b) {
						var c = a.location && a.location.hash;
						return c && c.slice(1) === b.id
					},
					root : function(a) {
						return a === H
					},
					focus : function(a) {
						return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
					},
					enabled : function(a) {
						return a.disabled === !1
					},
					disabled : function(a) {
						return a.disabled === !0
					},
					checked : function(a) {
						var b = a.nodeName.toLowerCase();
						return "input" === b && !!a.checked || "option" === b && !!a.selected
					},
					selected : function(a) {
						return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
					},
					empty : function(a) {
						for (a = a.firstChild; a; a = a.nextSibling)
							if (a.nodeType < 6) return !1;
						return !0
					},
					parent : function(a) {
						return !y.pseudos.empty(a)
					},
					header : function(a) {
						return qb.test(a.nodeName)
					},
					input : function(a) {
						return pb.test(a.nodeName)
					},
					button : function(a) {
						var b = a.nodeName.toLowerCase();
						return "input" === b && "button" === a.type || "button" === b
					},
					text : function(a) {
						var b;
						return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
					},
					first : j(function() {
						return [ 0 ]
					}),
					last : j(function(a, b) {
						return [ b - 1 ]
					}),
					eq : j(function(a, b, c) {
						return [ 0 > c ? c + b : c ]
					}),
					even : j(function(a, b) {
						for (var c = 0; b > c; c += 2) a.push(c);
						return a
					}),
					odd : j(function(a, b) {
						for (var c = 1; b > c; c += 2) a.push(c);
						return a
					}),
					lt : j(function(a, b, c) {
						for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
						return a
					}),
					gt : j(function(a, b, c) {
						for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
						return a
					})
				}
			}, y.pseudos.nth = y.pseudos.eq;
			for (w in {radio : !0, checkbox : !0, file : !0, password : !0, image : !0}) y.pseudos[w] = h(w);
			for (w in {submit : !0, reset : !0}) y.pseudos[w] = i(w);
			return l.prototype = y.filters = y.pseudos, y.setFilters = new l, B = b.compile = function(a, b) {
					var c,
						d = [],
						e = [],
						f = T[a + " "];
					if (!f) {
						for (b || (b = m(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
						f = T(a, t(e, d))
					}
					return f
				}, x.sortStable = N.split("").sort(U).join("") === N, x.detectDuplicates = !!E, F(), x.sortDetached = e(function(a) {
					return 1 & a.compareDocumentPosition(G.createElement("div"))
				}), e(function(a) {
					return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
				}) || f("type|href|height|width", function(a, b, c) {
					return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
				}), x.attributes && e(function(a) {
					return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
				}) || f("value", function(a, b, c) {
					return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
				}), e(function(a) {
					return null == a.getAttribute("disabled")
				}) || f(cb, function(a, b, c) {
					var d;
					return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
				}), b
		}(a);
		fb.find = kb, fb.expr = kb.selectors, fb.expr[":"] = fb.expr.pseudos, fb.unique = kb.uniqueSort, fb.text = kb.getText, fb.isXMLDoc = kb.isXML, fb.contains = kb.contains;
		var lb = fb.expr.match.needsContext,
			mb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
			nb = /^.[^:#\[\.,]*$/;
		fb.filter = function(a, b, c) {
			var d = b[0];
			return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? fb.find.matchesSelector(d, a) ? [ d ] : [] : fb.find.matches(a, fb.grep(b, function(a) {
					return 1 === a.nodeType
				}))
		}, fb.fn.extend({
			find : function(a) {
				var b,
					c = [],
					d = this,
					e = d.length;
				if ("string" != typeof a) return this.pushStack(fb(a).filter(function() {
						for (b = 0; e > b; b++)
							if (fb.contains(d[b], this)) return !0
					}));
				for (b = 0; e > b; b++) fb.find(a, d[b], c);
				return c = this.pushStack(e > 1 ? fb.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
			},
			filter : function(a) {
				return this.pushStack(d(this, a || [], !1))
			},
			not : function(a) {
				return this.pushStack(d(this, a || [], !0))
			},
			is : function(a) {
				return !!d(this, "string" == typeof a && lb.test(a) ? fb(a) : a || [], !1).length
			}
		});
		var ob,
			pb = a.document,
			qb = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
			rb = fb.fn.init = function(a, b) {
				var c,
					d;
				if (!a) return this;
				if ("string" == typeof a) {
					if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [ null, a, null ] : qb.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || ob).find(a) : this.constructor(b).find(a);
					if (c[1]) {
						if (b = b instanceof fb ? b[0] : b, fb.merge(this, fb.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : pb, !0)), mb.test(c[1]) && fb.isPlainObject(b))
							for (c in b) fb.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
						return this
					}
					if (d = pb.getElementById(c[2]), d && d.parentNode) {
						if (d.id !== c[2]) return ob.find(a);
						this.length = 1, this[0] = d
					}
					return this.context = pb, this.selector = a, this
				}
				return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : fb.isFunction(a) ? "undefined" != typeof ob.ready ? ob.ready(a) : a(fb) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), fb.makeArray(a, this))
			};
		rb.prototype = fb.fn, ob = fb(pb);
		var sb = /^(?:parents|prev(?:Until|All))/,
			tb = {
				children : !0,
				contents : !0,
				next : !0,
				prev : !0
			};
		fb.extend({
			dir : function(a, b, c) {
				for (var d = [], e = a[b]; e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !fb(e).is(c));) 1 === e.nodeType && d.push(e), e = e[b];
				return d
			},
			sibling : function(a, b) {
				for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
				return c
			}
		}), fb.fn.extend({
			has : function(a) {
				var b,
					c = fb(a, this),
					d = c.length;
				return this.filter(function() {
					for (b = 0; d > b; b++)
						if (fb.contains(this, c[b])) return !0
				})
			},
			closest : function(a, b) {
				for (var c, d = 0, e = this.length, f = [], g = lb.test(a) || "string" != typeof a ? fb(a, b || this.context) : 0; e > d; d++)
					for (c = this[d]; c && c !== b; c = c.parentNode)
						if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && fb.find.matchesSelector(c, a))) {
							f.push(c);break
				}
				return this.pushStack(f.length > 1 ? fb.unique(f) : f)
			},
			index : function(a) {
				return a ? "string" == typeof a ? fb.inArray(this[0], fb(a)) : fb.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
			},
			add : function(a, b) {
				return this.pushStack(fb.unique(fb.merge(this.get(), fb(a, b))))
			},
			addBack : function(a) {
				return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
			}
		}), fb.each({
			parent : function(a) {
				var b = a.parentNode;
				return b && 11 !== b.nodeType ? b : null
			},
			parents : function(a) {
				return fb.dir(a, "parentNode")
			},
			parentsUntil : function(a, b, c) {
				return fb.dir(a, "parentNode", c)
			},
			next : function(a) {
				return e(a, "nextSibling")
			},
			prev : function(a) {
				return e(a, "previousSibling")
			},
			nextAll : function(a) {
				return fb.dir(a, "nextSibling")
			},
			prevAll : function(a) {
				return fb.dir(a, "previousSibling")
			},
			nextUntil : function(a, b, c) {
				return fb.dir(a, "nextSibling", c)
			},
			prevUntil : function(a, b, c) {
				return fb.dir(a, "previousSibling", c)
			},
			siblings : function(a) {
				return fb.sibling((a.parentNode || {}).firstChild, a)
			},
			children : function(a) {
				return fb.sibling(a.firstChild)
			},
			contents : function(a) {
				return fb.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : fb.merge([], a.childNodes)
			}
		}, function(a, b) {
			fb.fn[a] = function(c, d) {
				var e = fb.map(this, b, c);
				return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = fb.filter(d, e)), this.length > 1 && (tb[a] || (e = fb.unique(e)), sb.test(a) && (e = e.reverse())), this.pushStack(e)
			}
		});
		var ub = /\S+/g,
			vb = {};
		fb.Callbacks = function(a) {
			a = "string" == typeof a ? vb[a] || f(a) : fb.extend({}, a);
			var b,
				c,
				d,
				e,
				g,
				h,
				i = [],
				j = !a.once && [],
				k = function(f) {
					for (c = a.memory && f, d = !0, g = h || 0, h = 0, e = i.length, b = !0; i && e > g; g++)
						if (i[g].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
							c = !1;break
					}
					b = !1, i && (j ? j.length && k(j.shift()) : c ? i = [] : l.disable())
				},
				l = {
					add : function() {
						if (i) {
							var d = i.length;
							!function f(b) {
								fb.each(b, function(b, c) {
									var d = fb.type(c);
									"function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c)
								})
							}(arguments), b ? e = i.length : c && (h = d, k(c))
						}
						return this
					},
					remove : function() {
						return i && fb.each(arguments, function(a, c) {
								for (var d; (d = fb.inArray(c, i, d)) > -1;) i.splice(d, 1), b && (e >= d && e--, g >= d && g--)
							}), this
					},
					has : function(a) {
						return a ? fb.inArray(a, i) > -1 : !(!i || !i.length)
					},
					empty : function() {
						return i = [], e = 0, this
					},
					disable : function() {
						return i = j = c = void 0, this
					},
					disabled : function() {
						return !i
					},
					lock : function() {
						return j = void 0, c || l.disable(), this
					},
					locked : function() {
						return !j
					},
					fireWith : function(a, c) {
						return !i || d && !j || (c = c || [], c = [ a, c.slice ? c.slice() : c ], b ? j.push(c) : k(c)), this
					},
					fire : function() {
						return l.fireWith(this, arguments), this
					},
					fired : function() {
						return !!d
					}
				};
			return l
		}, fb.extend({
			Deferred : function(a) {
				var b = [ [ "resolve", "done", fb.Callbacks("once memory"), "resolved" ], [ "reject", "fail", fb.Callbacks("once memory"), "rejected" ], [ "notify", "progress", fb.Callbacks("memory") ] ],
					c = "pending",
					d = {
						state : function() {
							return c
						},
						always : function() {
							return e.done(arguments).fail(arguments), this
						},
						then : function() {
							var a = arguments;
							return fb.Deferred(function(c) {
								fb.each(b, function(b, f) {
									var g = fb.isFunction(a[b]) && a[b];
									e[f[1]](function() {
										var a = g && g.apply(this, arguments);
										a && fb.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [ a ] : arguments)
									})
								}), a = null
							}).promise()
						},
						promise : function(a) {
							return null != a ? fb.extend(a, d) : d
						}
					},
					e = {};
				return d.pipe = d.then, fb.each(b, function(a, f) {
						var g = f[2],
							h = f[3];
						d[f[1]] = g.add, h && g.add(function() {
							c = h
						}, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
							return e[f[0] + "With"](this === e ? d : this, arguments), this
						}, e[f[0] + "With"] = g.fireWith
					}), d.promise(e), a && a.call(e, e), e
			},
			when : function(a) {
				var b,
					c,
					d,
					e = 0,
					f = X.call(arguments),
					g = f.length,
					h = 1 !== g || a && fb.isFunction(a.promise) ? g : 0,
					i = 1 === h ? a : fb.Deferred(),
					j = function(a, c, d) {
						return function(e) {
							c[a] = this, d[a] = arguments.length > 1 ? X.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
						}
					};
				if (g > 1)
					for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && fb.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
				return h || i.resolveWith(d, f), i.promise()
			}
		});
		var wb;
		fb.fn.ready = function(a) {
			return fb.ready.promise().done(a), this
		}, fb.extend({
			isReady : !1,
			readyWait : 1,
			holdReady : function(a) {
				a ? fb.readyWait++ : fb.ready(!0)
			},
			ready : function(a) {
				if (a === !0 ? !--fb.readyWait : !fb.isReady) {
					if (!pb.body) return setTimeout(fb.ready);
					fb.isReady = !0, a !== !0 && --fb.readyWait > 0 || (wb.resolveWith(pb, [ fb ]), fb.fn.trigger && fb(pb).trigger("ready").off("ready"))
				}
			}
		}), fb.ready.promise = function(b) {
			if (!wb)
				if (wb = fb.Deferred(), "complete" === pb.readyState) setTimeout(fb.ready);
				else if (pb.addEventListener) pb.addEventListener("DOMContentLoaded", h, !1), a.addEventListener("load", h, !1);else {
					pb.attachEvent("onreadystatechange", h), a.attachEvent("onload", h);
					var c = !1;
					try {
						c = null == a.frameElement && pb.documentElement
					} catch (d) {} c && c.doScroll && !function e() {
						if (!fb.isReady) {
							try {
								c.doScroll("left")
							} catch (a) {
								return setTimeout(e, 50)
							} g(), fb.ready()
						}
					}()
			}
			return wb.promise(b)
		};
		var xb,
			yb = "undefined";
		for (xb in fb(db)) break;
		db.ownLast = "0" !== xb, db.inlineBlockNeedsLayout = !1, fb(function() {
			var a,
				b,
				c = pb.getElementsByTagName("body")[0];
			c && (a = pb.createElement("div"), a.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", b = pb.createElement("div"), c.appendChild(a).appendChild(b), typeof b.style.zoom !== yb && (b.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1", (db.inlineBlockNeedsLayout = 3 === b.offsetWidth) && (c.style.zoom = 1)), c.removeChild(a), a = b = null)
		}), function() {
			var a = pb.createElement("div");
			if (null == db.deleteExpando) {
				db.deleteExpando = !0;try {
					delete a.test
				} catch (b) {
					db.deleteExpando = !1
				}
			}
			a = null
		}(), fb.acceptData = function(a) {
			var b = fb.noData[(a.nodeName + " ").toLowerCase()],
				c = +a.nodeType || 1;
			return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
		};
		var zb = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
			Ab = /([A-Z])/g;
		fb.extend({
			cache : {},
			noData : {
				"applet " : !0,
				"embed " : !0,
				"object " : "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
			},
			hasData : function(a) {
				return a = a.nodeType ? fb.cache[a[fb.expando]] : a[fb.expando], !!a && !j(a)
			},
			data : function(a, b, c) {
				return k(a, b, c)
			},
			removeData : function(a, b) {
				return l(a, b)
			},
			_data : function(a, b, c) {
				return k(a, b, c, !0)
			},
			_removeData : function(a, b) {
				return l(a, b, !0)
			}
		}), fb.fn.extend({
			data : function(a, b) {
				var c,
					d,
					e,
					f = this[0],
					g = f && f.attributes;
				if (void 0 === a) {
					if (this.length && (e = fb.data(f), 1 === f.nodeType && !fb._data(f, "parsedAttrs"))) {
						for (c = g.length; c--;) d = g[c].name, 0 === d.indexOf("data-") && (d = fb.camelCase(d.slice(5)), i(f, d, e[d]));
						fb._data(f, "parsedAttrs", !0)
					}
					return e
				}
				return "object" == typeof a ? this.each(function() {
					fb.data(this, a)
				}) : arguments.length > 1 ? this.each(function() {
					fb.data(this, a, b)
				}) : f ? i(f, a, fb.data(f, a)) : void 0
			},
			removeData : function(a) {
				return this.each(function() {
					fb.removeData(this, a)
				})
			}
		}), fb.extend({
			queue : function(a, b, c) {
				var d;
				return a ? (b = (b || "fx") + "queue", d = fb._data(a, b), c && (!d || fb.isArray(c) ? d = fb._data(a, b, fb.makeArray(c)) : d.push(c)), d || []) : void 0
			},
			dequeue : function(a, b) {
				b = b || "fx";
				var c = fb.queue(a, b),
					d = c.length,
					e = c.shift(),
					f = fb._queueHooks(a, b),
					g = function() {
						fb.dequeue(a, b)
					};
				"inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"),
				delete f.stop
				, e.call(a, g, f)), !d && f && f.empty.fire()
			},
			_queueHooks : function(a, b) {
				var c = b + "queueHooks";
				return fb._data(a, c) || fb._data(a, c, {
						empty : fb.Callbacks("once memory").add(function() {
							fb._removeData(a, b + "queue"), fb._removeData(a, c)
						})
					})
			}
		}), fb.fn.extend({
			queue : function(a, b) {
				var c = 2;
				return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? fb.queue(this[0], a) : void 0 === b ? this : this.each(function() {
						var c = fb.queue(this, a, b);
						fb._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && fb.dequeue(this, a)
					})
			},
			dequeue : function(a) {
				return this.each(function() {
					fb.dequeue(this, a)
				})
			},
			clearQueue : function(a) {
				return this.queue(a || "fx", [])
			},
			promise : function(a, b) {
				var c,
					d = 1,
					e = fb.Deferred(),
					f = this,
					g = this.length,
					h = function() {
						--d || e.resolveWith(f, [ f ])
					};
				for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = fb._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
				return h(), e.promise(b)
			}
		});
		var Bb = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
			Cb = [ "Top", "Right", "Bottom", "Left" ],
			Db = function(a, b) {
				return a = b || a, "none" === fb.css(a, "display") || !fb.contains(a.ownerDocument, a)
			},
			Eb = fb.access = function(a, b, c, d, e, f, g) {
				var h = 0,
					i = a.length,
					j = null == c;
				if ("object" === fb.type(c)) {
					e = !0;
					for (h in c) fb.access(a, b, h, c[h], !0, f, g)
				} else if (void 0 !== d && (e = !0, fb.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
						return j.call(fb(a), c)
					})), b))
					for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
				return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
			},
			Fb = /^(?:checkbox|radio)$/i;
		!function() {
			var a = pb.createDocumentFragment(),
				b = pb.createElement("div"),
				c = pb.createElement("input");
			if (b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a>", db.leadingWhitespace = 3 === b.firstChild.nodeType, db.tbody = !b.getElementsByTagName("tbody").length, db.htmlSerialize = !!b.getElementsByTagName("link").length, db.html5Clone = "<:nav></:nav>" !== pb.createElement("nav").cloneNode(!0).outerHTML, c.type = "checkbox", c.checked = !0, a.appendChild(c), db.appendChecked = c.checked, b.innerHTML = "<textarea>x</textarea>", db.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, a.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", db.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, db.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function() {
					db.noCloneEvent = !1
				}), b.cloneNode(!0).click()), null == db.deleteExpando) {
				db.deleteExpando = !0;try {
					delete b.test
				} catch (d) {
					db.deleteExpando = !1
				}
			}
			a = b = c = null
		}(), function() {
			var b,
				c,
				d = pb.createElement("div");
			for (b in {submit : !0, change : !0, focusin : !0}) c = "on" + b, (db[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), db[b + "Bubbles"] = d.attributes[c].expando === !1);
			d = null
		}();
		var Gb = /^(?:input|select|textarea)$/i,
			Hb = /^key/,
			Ib = /^(?:mouse|contextmenu)|click/,
			Jb = /^(?:focusinfocus|focusoutblur)$/,
			Kb = /^([^.]*)(?:\.(.+)|)$/;
		fb.event = {
			global : {},
			add : function(a, b, c, d, e) {
				var f,
					g,
					h,
					i,
					j,
					k,
					l,
					m,
					n,
					o,
					p,
					q = fb._data(a);
				if (q) {
					for (c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = fb.guid++), (g = q.events) || (g = q.events = {}), (k = q.handle) || (k = q.handle = function(a) {
							return typeof fb === yb || a && fb.event.triggered === a.type ? void 0 : fb.event.dispatch.apply(k.elem, arguments)
						}, k.elem = a), b = (b || "").match(ub) || [ "" ], h = b.length; h--;) f = Kb.exec(b[h]) || [], n = p = f[1], o = (f[2] || "").split(".").sort(), n && (j = fb.event.special[n] || {}, n = (e ? j.delegateType : j.bindType) || n, j = fb.event.special[n] || {}, l = fb.extend({
							type : n,
							origType : p,
							data : d,
							handler : c,
							guid : c.guid,
							selector : e,
							needsContext : e && fb.expr.match.needsContext.test(e),
							namespace : o.join(".")
						}, i), (m = g[n]) || (m = g[n] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, o, k) !== !1 || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), fb.event.global[n] = !0);
					a = null
				}
			},
			remove : function(a, b, c, d, e) {
				var f,
					g,
					h,
					i,
					j,
					k,
					l,
					m,
					n,
					o,
					p,
					q = fb.hasData(a) && fb._data(a);
				if (q && (k = q.events)) {
					for (b = (b || "").match(ub) || [ "" ], j = b.length; j--;)
						if (h = Kb.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
							for (l = fb.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--;) g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
							i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || fb.removeEvent(a, n, q.handle),
							delete k[n]
							)
						} else
							for (n in k) fb.event.remove(a, n + b[j], c, d, !0);
					fb.isEmptyObject(k) && (
					delete q.handle
					, fb._removeData(a, "events"))
				}
			},
			trigger : function(b, c, d, e) {
				var f,
					g,
					h,
					i,
					j,
					k,
					l,
					m = [ d || pb ],
					n = bb.call(b, "type") ? b.type : b,
					o = bb.call(b, "namespace") ? b.namespace.split(".") : [];
				if (h = k = d = d || pb, 3 !== d.nodeType && 8 !== d.nodeType && !Jb.test(n + fb.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), g = n.indexOf(":") < 0 && "on" + n, b = b[fb.expando] ? b : new fb.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [ b ] : fb.makeArray(c, [ b ]), j = fb.event.special[n] || {}, e || !j.trigger || j.trigger.apply(d, c) !== !1)) {
					if (!e && !j.noBubble && !fb.isWindow(d)) {
						for (i = j.delegateType || n, Jb.test(i + n) || (h = h.parentNode); h; h = h.parentNode) m.push(h), k = h;
						k === (d.ownerDocument || pb) && m.push(k.defaultView || k.parentWindow || a)
					}
					for (l = 0; (h = m[l++]) && !b.isPropagationStopped();) b.type = l > 1 ? i : j.bindType || n, f = (fb._data(h, "events") || {})[b.type] && fb._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && fb.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
					if (b.type = n, !e && !b.isDefaultPrevented() && (!j._default || j._default.apply(m.pop(), c) === !1) && fb.acceptData(d) && g && d[n] && !fb.isWindow(d)) {
						k = d[g], k && (d[g] = null), fb.event.triggered = n;try {
							d[n]()
						} catch (p) {} fb.event.triggered = void 0, k && (d[g] = k)
					}
					return b.result
				}
			},
			dispatch : function(a) {
				a = fb.event.fix(a);
				var b,
					c,
					d,
					e,
					f,
					g = [],
					h = X.call(arguments),
					i = (fb._data(this, "events") || {})[a.type] || [],
					j = fb.event.special[a.type] || {};
				if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
					for (g = fb.event.handlers.call(this, a, i), b = 0; (e = g[b++]) && !a.isPropagationStopped();)
						for (a.currentTarget = e.elem, f = 0; (d = e.handlers[f++]) && !a.isImmediatePropagationStopped();) (!a.namespace_re || a.namespace_re.test(d.namespace)) && (a.handleObj = d, a.data = d.data, c = ((fb.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, h), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()));
					return j.postDispatch && j.postDispatch.call(this, a), a.result
				}
			},
			handlers : function(a, b) {
				var c,
					d,
					e,
					f,
					g = [],
					h = b.delegateCount,
					i = a.target;
				if (h && i.nodeType && (!a.button || "click" !== a.type))
					for (; i != this; i = i.parentNode || this)
						if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
							for (e = [], f = 0; h > f; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? fb(c, this).index(i) >= 0 : fb.find(c, this, null, [ i ]).length), e[c] && e.push(d);
							e.length && g.push({
								elem : i,
								handlers : e
							})
				}
				return h < b.length && g.push({
						elem : this,
						handlers : b.slice(h)
					}), g
			},
			fix : function(a) {
				if (a[fb.expando]) return a;
				var b,
					c,
					d,
					e = a.type,
					f = a,
					g = this.fixHooks[e];
				for (g || (this.fixHooks[e] = g = Ib.test(e) ? this.mouseHooks : Hb.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new fb.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
				return a.target || (a.target = f.srcElement || pb), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
			},
			props : "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
			fixHooks : {},
			keyHooks : {
				props : "char charCode key keyCode".split(" "),
				filter : function(a, b) {
					return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
				}
			},
			mouseHooks : {
				props : "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
				filter : function(a, b) {
					var c,
						d,
						e,
						f = b.button,
						g = b.fromElement;
					return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || pb, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
				}
			},
			special : {
				load : {
					noBubble : !0
				},
				focus : {
					trigger : function() {
						if (this !== o() && this.focus) try {
								return this.focus(), !1
							} catch (a) {}
					},
					delegateType : "focusin"
				},
				blur : {
					trigger : function() {
						return this === o() && this.blur ? (this.blur(), !1) : void 0
					},
					delegateType : "focusout"
				},
				click : {
					trigger : function() {
						return fb.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
					},
					_default : function(a) {
						return fb.nodeName(a.target, "a")
					}
				},
				beforeunload : {
					postDispatch : function(a) {
						void 0 !== a.result && (a.originalEvent.returnValue = a.result)
					}
				}
			},
			simulate : function(a, b, c, d) {
				var e = fb.extend(new fb.Event, c, {
					type : a,
					isSimulated : !0,
					originalEvent : {}
				});
				d ? fb.event.trigger(e, null, b) : fb.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
			}
		}, fb.removeEvent = pb.removeEventListener ? function(a, b, c) {
			a.removeEventListener && a.removeEventListener(b, c, !1)
		} : function(a, b, c) {
			var d = "on" + b;
			a.detachEvent && (typeof a[d] === yb && (a[d] = null), a.detachEvent(d, c))
		}, fb.Event = function(a, b) {
			return this instanceof fb.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && (a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault()) ? m : n) : this.type = a, b && fb.extend(this, b), this.timeStamp = a && a.timeStamp || fb.now(), void (this[fb.expando] = !0)) : new fb.Event(a, b)
		}, fb.Event.prototype = {
			isDefaultPrevented : n,
			isPropagationStopped : n,
			isImmediatePropagationStopped : n,
			preventDefault : function() {
				var a = this.originalEvent;
				this.isDefaultPrevented = m, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
			},
			stopPropagation : function() {
				var a = this.originalEvent;
				this.isPropagationStopped = m, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
			},
			stopImmediatePropagation : function() {
				this.isImmediatePropagationStopped = m, this.stopPropagation()
			}
		}, fb.each({
			mouseenter : "mouseover",
			mouseleave : "mouseout"
		}, function(a, b) {
			fb.event.special[a] = {
				delegateType : b,
				bindType : b,
				handle : function(a) {
					var c,
						d = this,
						e = a.relatedTarget,
						f = a.handleObj;
					return (!e || e !== d && !fb.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
				}
			}
		}), db.submitBubbles || (fb.event.special.submit = {
			setup : function() {
				return fb.nodeName(this, "form") ? !1 : void fb.event.add(this, "click._submit keypress._submit", function(a) {
					var b = a.target,
						c = fb.nodeName(b, "input") || fb.nodeName(b, "button") ? b.form : void 0;
					c && !fb._data(c, "submitBubbles") && (fb.event.add(c, "submit._submit", function(a) {
						a._submit_bubble = !0
					}), fb._data(c, "submitBubbles", !0))
				})
			},
			postDispatch : function(a) {
				a._submit_bubble && (
				delete a._submit_bubble
				, this.parentNode && !a.isTrigger && fb.event.simulate("submit", this.parentNode, a, !0))
			},
			teardown : function() {
				return fb.nodeName(this, "form") ? !1 : void fb.event.remove(this, "._submit")
			}
		}), db.changeBubbles || (fb.event.special.change = {
			setup : function() {
				return Gb.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (fb.event.add(this, "propertychange._change", function(a) {
					"checked" === a.originalEvent.propertyName && (this._just_changed = !0)
				}), fb.event.add(this, "click._change", function(a) {
					this._just_changed && !a.isTrigger && (this._just_changed = !1), fb.event.simulate("change", this, a, !0)
				})), !1) : void fb.event.add(this, "beforeactivate._change", function(a) {
					var b = a.target;
					Gb.test(b.nodeName) && !fb._data(b, "changeBubbles") && (fb.event.add(b, "change._change", function(a) {
						!this.parentNode || a.isSimulated || a.isTrigger || fb.event.simulate("change", this.parentNode, a, !0)
					}), fb._data(b, "changeBubbles", !0))
				})
			},
			handle : function(a) {
				var b = a.target;
				return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
			},
			teardown : function() {
				return fb.event.remove(this, "._change"), !Gb.test(this.nodeName)
			}
		}), db.focusinBubbles || fb.each({
			focus : "focusin",
			blur : "focusout"
		}, function(a, b) {
			var c = function(a) {
				fb.event.simulate(b, a.target, fb.event.fix(a), !0)
			};
			fb.event.special[b] = {
				setup : function() {
					var d = this.ownerDocument || this,
						e = fb._data(d, b);
					e || d.addEventListener(a, c, !0), fb._data(d, b, (e || 0) + 1)
				},
				teardown : function() {
					var d = this.ownerDocument || this,
						e = fb._data(d, b) - 1;
					e ? fb._data(d, b, e) : (d.removeEventListener(a, c, !0), fb._removeData(d, b))
				}
			}
		}), fb.fn.extend({
			on : function(a, b, c, d, e) {
				var f,
					g;
				if ("object" == typeof a) {
					"string" != typeof b && (c = c || b, b = void 0);
					for (f in a) this.on(f, b, c, a[f], e);
					return this
				}
				if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1)
					d = n;
				else if (!d) return this;
				return 1 === e && (g = d, d = function(a) {
						return fb().off(a), g.apply(this, arguments)
					}, d.guid = g.guid || (g.guid = fb.guid++)), this.each(function() {
						fb.event.add(this, a, d, c, b)
					})
			},
			one : function(a, b, c, d) {
				return this.on(a, b, c, d, 1)
			},
			off : function(a, b, c) {
				var d,
					e;
				if (a && a.preventDefault && a.handleObj) return d = a.handleObj, fb(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
				if ("object" == typeof a) {
					for (e in a) this.off(e, b, a[e]);
					return this
				}
				return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = n), this.each(function() {
					fb.event.remove(this, a, c, b)
				})
			},
			trigger : function(a, b) {
				return this.each(function() {
					fb.event.trigger(a, b, this)
				})
			},
			triggerHandler : function(a, b) {
				var c = this[0];
				return c ? fb.event.trigger(a, b, c, !0) : void 0
			}
		});
		var Lb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
			Mb = / jQuery\d+="(?:null|\d+)"/g,
			Nb = new RegExp("<(?:" + Lb + ")[\\s/>]", "i"),
			Ob = /^\s+/,
			Pb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
			Qb = /<([\w:]+)/,
			Rb = /<tbody/i,
			Sb = /<|&#?\w+;/,
			Tb = /<(?:script|style|link)/i,
			Ub = /checked\s*(?:[^=]|=\s*.checked.)/i,
			Vb = /^$|\/(?:java|ecma)script/i,
			Wb = /^true\/(.*)/,
			Xb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
			Yb = {
				option : [ 1, "<select multiple='multiple'>", "</select>" ],
				legend : [ 1, "<fieldset>", "</fieldset>" ],
				area : [ 1, "<map>", "</map>" ],
				param : [ 1, "<object>", "</object>" ],
				thead : [ 1, "<table>", "</table>" ],
				tr : [ 2, "<table><tbody>", "</tbody></table>" ],
				col : [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
				td : [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
				_default : db.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
			},
			Zb = p(pb),
			$b = Zb.appendChild(pb.createElement("div"));
		Yb.optgroup = Yb.option, Yb.tbody = Yb.tfoot = Yb.colgroup = Yb.caption = Yb.thead, Yb.th = Yb.td, fb.extend({
			clone : function(a, b, c) {
				var d,
					e,
					f,
					g,
					h,
					i = fb.contains(a.ownerDocument, a);
				if (db.html5Clone || fb.isXMLDoc(a) || !Nb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : ($b.innerHTML = a.outerHTML, $b.removeChild(f = $b.firstChild)), !(db.noCloneEvent && db.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || fb.isXMLDoc(a)))
					for (d = q(f), h = q(a), g = 0; null != (e = h[g]); ++g) d[g] && x(e, d[g]);
				if (b)
					if (c)
						for (h = h || q(a), d = d || q(f), g = 0; null != (e = h[g]); g++) w(e, d[g]);
					else w(a, f);
				return d = q(f, "script"), d.length > 0 && v(d, !i && q(a, "script")), d = h = e = null, f
			},
			buildFragment : function(a, b, c, d) {
				for (var e, f, g, h, i, j, k, l = a.length, m = p(b), n = [], o = 0; l > o; o++)
					if (f = a[o], f || 0 === f)
						if ("object" === fb.type(f)) fb.merge(n, f.nodeType ? [ f ] : f);
						else if (Sb.test(f)) {
							for (h = h || m.appendChild(b.createElement("div")), i = (Qb.exec(f) || [ "", "" ])[1].toLowerCase(), k = Yb[i] || Yb._default, h.innerHTML = k[1] + f.replace(Pb, "<$1></$2>") + k[2], e = k[0]; e--;) h = h.lastChild;
							if (!db.leadingWhitespace && Ob.test(f) && n.push(b.createTextNode(Ob.exec(f)[0])), !db.tbody)
								for (f = "table" !== i || Rb.test(f) ? "<table>" !== k[1] || Rb.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length; e--;) fb.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
							for (fb.merge(n, h.childNodes), h.textContent = ""; h.firstChild;) h.removeChild(h.firstChild);
							h = m.lastChild
						} else n.push(b.createTextNode(f));
				for (h && m.removeChild(h), db.appendChecked || fb.grep(q(n, "input"), r), o = 0; f = n[o++];)
					if ((!d || -1 === fb.inArray(f, d)) && (g = fb.contains(f.ownerDocument, f), h = q(m.appendChild(f), "script"), g && v(h), c))
						for (e = 0; f = h[e++];) Vb.test(f.type || "") && c.push(f);
				return h = null, m
			},
			cleanData : function(a, b) {
				for (var c, d, e, f, g = 0, h = fb.expando, i = fb.cache, j = db.deleteExpando, k = fb.event.special; null != (c = a[g]); g++)
					if ((b || fb.acceptData(c)) && (e = c[h], f = e && i[e])) {
						if (f.events)
							for (d in f.events) k[d] ? fb.event.remove(c, d) : fb.removeEvent(c, d, f.handle);
						i[e] && (
						delete i[e]
						, j ?
							delete c[h]
							: typeof c.removeAttribute !== yb ? c.removeAttribute(h) : c[h] = null, W.push(e))
				}
			}
		}), fb.fn.extend({
			text : function(a) {
				return Eb(this, function(a) {
					return void 0 === a ? fb.text(this) : this.empty().append((this[0] && this[0].ownerDocument || pb).createTextNode(a))
				}, null, a, arguments.length)
			},
			append : function() {
				return this.domManip(arguments, function(a) {
					if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
						var b = s(this, a);
						b.appendChild(a)
					}
				})
			},
			prepend : function() {
				return this.domManip(arguments, function(a) {
					if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
						var b = s(this, a);
						b.insertBefore(a, b.firstChild)
					}
				})
			},
			before : function() {
				return this.domManip(arguments, function(a) {
					this.parentNode && this.parentNode.insertBefore(a, this)
				})
			},
			after : function() {
				return this.domManip(arguments, function(a) {
					this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
				})
			},
			remove : function(a, b) {
				for (var c, d = a ? fb.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || fb.cleanData(q(c)), c.parentNode && (b && fb.contains(c.ownerDocument, c) && v(q(c, "script")), c.parentNode.removeChild(c));
				return this
			},
			empty : function() {
				for (var a, b = 0; null != (a = this[b]); b++) {
					for (1 === a.nodeType && fb.cleanData(q(a, !1)); a.firstChild;) a.removeChild(a.firstChild);
					a.options && fb.nodeName(a, "select") && (a.options.length = 0)
				}
				return this
			},
			clone : function(a, b) {
				return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
						return fb.clone(this, a, b)
					})
			},
			html : function(a) {
				return Eb(this, function(a) {
					var b = this[0] || {},
						c = 0,
						d = this.length;
					if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(Mb, "") : void 0;
					if (!("string" != typeof a || Tb.test(a) || !db.htmlSerialize && Nb.test(a) || !db.leadingWhitespace && Ob.test(a) || Yb[(Qb.exec(a) || [ "", "" ])[1].toLowerCase()])) {
						a = a.replace(Pb, "<$1></$2>");try {
							for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (fb.cleanData(q(b, !1)), b.innerHTML = a);
							b = 0
						} catch (e) {}
					}
					b && this.empty().append(a)
				}, null, a, arguments.length)
			},
			replaceWith : function() {
				var a = arguments[0];
				return this.domManip(arguments, function(b) {
						a = this.parentNode, fb.cleanData(q(this)), a && a.replaceChild(b, this)
					}), a && (a.length || a.nodeType) ? this : this.remove()
			},
			detach : function(a) {
				return this.remove(a, !0)
			},
			domManip : function(a, b) {
				a = Y.apply([], a);
				var c,
					d,
					e,
					f,
					g,
					h,
					i = 0,
					j = this.length,
					k = this,
					l = j - 1,
					m = a[0],
					n = fb.isFunction(m);
				if (n || j > 1 && "string" == typeof m && !db.checkClone && Ub.test(m)) return this.each(function(c) {
						var d = k.eq(c);
						n && (a[0] = m.call(this, c, d.html())), d.domManip(a, b)
					});
				if (j && (h = fb.buildFragment(a, this[0].ownerDocument, !1, this), c = h.firstChild, 1 === h.childNodes.length && (h = c), c)) {
					for (f = fb.map(q(h, "script"), t), e = f.length; j > i; i++) d = h, i !== l && (d = fb.clone(d, !0, !0), e && fb.merge(f, q(d, "script"))), b.call(this[i], d, i);
					if (e)
						for (g = f[f.length - 1].ownerDocument, fb.map(f, u), i = 0; e > i; i++) d = f[i], Vb.test(d.type || "") && !fb._data(d, "globalEval") && fb.contains(g, d) && (d.src ? fb._evalUrl && fb._evalUrl(d.src) : fb.globalEval((d.text || d.textContent || d.innerHTML || "").replace(Xb, "")));
					h = c = null
				}
				return this
			}
		}), fb.each({
			appendTo : "append",
			prependTo : "prepend",
			insertBefore : "before",
			insertAfter : "after",
			replaceAll : "replaceWith"
		}, function(a, b) {
			fb.fn[a] = function(a) {
				for (var c, d = 0, e = [], f = fb(a), g = f.length - 1; g >= d; d++) c = d === g ? this : this.clone(!0), fb(f[d])[b](c), Z.apply(e, c.get());
				return this.pushStack(e)
			}
		});
		var _b,
			ac = {};
		!function() {
			var a,
				b,
				c = pb.createElement("div"),
				d = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
			c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = c.getElementsByTagName("a")[0], a.style.cssText = "float:left;opacity:.5", db.opacity = /^0.5/.test(a.style.opacity), db.cssFloat = !!a.style.cssFloat, c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", db.clearCloneStyle = "content-box" === c.style.backgroundClip, a = c = null, db.shrinkWrapBlocks = function() {
				var a,
					c,
					e,
					f;
				if (null == b) {
					if (a = pb.getElementsByTagName("body")[0], !a) return;
					f = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px", c = pb.createElement("div"), e = pb.createElement("div"), a.appendChild(c).appendChild(e), b = !1, typeof e.style.zoom !== yb && (e.style.cssText = d + ";width:1px;padding:1px;zoom:1", e.innerHTML = "<div></div>", e.firstChild.style.width = "5px", b = 3 !== e.offsetWidth), a.removeChild(c), a = c = e = null
				}
				return b
			}
		}();
		var bc,
			cc,
			dc = /^margin/,
			ec = new RegExp("^(" + Bb + ")(?!px)[a-z%]+$", "i"),
			fc = /^(top|right|bottom|left)$/;
		a.getComputedStyle ? (bc = function(a) {
			return a.ownerDocument.defaultView.getComputedStyle(a, null)
		}, cc = function(a, b, c) {
			var d,
				e,
				f,
				g,
				h = a.style;
			return c = c || bc(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || fb.contains(a.ownerDocument, a) || (g = fb.style(a, b)), ec.test(g) && dc.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
		}) : pb.documentElement.currentStyle && (bc = function(a) {
			return a.currentStyle
		}, cc = function(a, b, c) {
			var d,
				e,
				f,
				g,
				h = a.style;
			return c = c || bc(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), ec.test(g) && !fc.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
		}), function() {
			function b() {
				var b,
					c,
					d = pb.getElementsByTagName("body")[0];
				d && (b = pb.createElement("div"), c = pb.createElement("div"), b.style.cssText = j, d.appendChild(b).appendChild(c), c.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%", fb.swap(d, null != d.style.zoom ? {
					zoom : 1
				} : {}, function() {
					e = 4 === c.offsetWidth
				}), f = !0, g = !1, h = !0, a.getComputedStyle && (g = "1%" !== (a.getComputedStyle(c, null) || {}).top, f = "4px" === (a.getComputedStyle(c, null) || {
					width : "4px"
				}).width), d.removeChild(b), c = d = null)
			}
			var c,
				d,
				e,
				f,
				g,
				h,
				i = pb.createElement("div"),
				j = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
				k = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
			i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = i.getElementsByTagName("a")[0], c.style.cssText = "float:left;opacity:.5", db.opacity = /^0.5/.test(c.style.opacity), db.cssFloat = !!c.style.cssFloat, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", db.clearCloneStyle = "content-box" === i.style.backgroundClip, c = i = null, fb.extend(db, {
				reliableHiddenOffsets : function() {
					if (null != d) return d;
					var a,
						b,
						c,
						e = pb.createElement("div"),
						f = pb.getElementsByTagName("body")[0];
					if (f) return e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = pb.createElement("div"), a.style.cssText = j, f.appendChild(a).appendChild(e), e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", b = e.getElementsByTagName("td"), b[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === b[0].offsetHeight, b[0].style.display = "", b[1].style.display = "none", d = c && 0 === b[0].offsetHeight, f.removeChild(a), e = f = null, d
				},
				boxSizing : function() {
					return null == e && b(), e
				},
				boxSizingReliable : function() {
					return null == f && b(), f
				},
				pixelPosition : function() {
					return null == g && b(), g
				},
				reliableMarginRight : function() {
					var b,
						c,
						d,
						e;
					if (null == h && a.getComputedStyle) {
						if (b = pb.getElementsByTagName("body")[0], !b) return;
						c = pb.createElement("div"), d = pb.createElement("div"), c.style.cssText = j, b.appendChild(c).appendChild(d), e = d.appendChild(pb.createElement("div")), e.style.cssText = d.style.cssText = k, e.style.marginRight = e.style.width = "0", d.style.width = "1px", h = !parseFloat((a.getComputedStyle(e, null) || {}).marginRight), b.removeChild(c)
					}
					return h
				}
			})
		}(), fb.swap = function(a, b, c, d) {
			var e,
				f,
				g = {};
			for (f in b) g[f] = a.style[f], a.style[f] = b[f];
			e = c.apply(a, d || []);
			for (f in b) a.style[f] = g[f];
			return e
		};
		var gc = /alpha\([^)]*\)/i,
			hc = /opacity\s*=\s*([^)]*)/,
			ic = /^(none|table(?!-c[ea]).+)/,
			jc = new RegExp("^(" + Bb + ")(.*)$", "i"),
			kc = new RegExp("^([+-])=(" + Bb + ")", "i"),
			lc = {
				position : "absolute",
				visibility : "hidden",
				display : "block"
			},
			mc = {
				letterSpacing : 0,
				fontWeight : 400
			},
			nc = [ "Webkit", "O", "Moz", "ms" ];
		fb.extend({
			cssHooks : {
				opacity : {
					get : function(a, b) {
						if (b) {
							var c = cc(a, "opacity");
							return "" === c ? "1" : c
						}
					}
				}
			},
			cssNumber : {
				columnCount : !0,
				fillOpacity : !0,
				fontWeight : !0,
				lineHeight : !0,
				opacity : !0,
				order : !0,
				orphans : !0,
				widows : !0,
				zIndex : !0,
				zoom : !0
			},
			cssProps : {
				"float" : db.cssFloat ? "cssFloat" : "styleFloat"
			},
			style : function(a, b, c, d) {
				if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
					var e,
						f,
						g,
						h = fb.camelCase(b),
						i = a.style;
					if (b = fb.cssProps[h] || (fb.cssProps[h] = B(i, h)), g = fb.cssHooks[b] || fb.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
					if (f = typeof c, "string" === f && (e = kc.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(fb.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || fb.cssNumber[h] || (c += "px"), db.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
							i[b] = "", i[b] = c
						} catch (j) {}
				}
			},
			css : function(a, b, c, d) {
				var e,
					f,
					g,
					h = fb.camelCase(b);
				return b = fb.cssProps[h] || (fb.cssProps[h] = B(a.style, h)), g = fb.cssHooks[b] || fb.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = cc(a, b, d)), "normal" === f && b in mc && (f = mc[b]), "" === c || c ? (e = parseFloat(f), c === !0 || fb.isNumeric(e) ? e || 0 : f) : f
			}
		}), fb.each([ "height", "width" ], function(a, b) {
			fb.cssHooks[b] = {
				get : function(a, c, d) {
					return c ? 0 === a.offsetWidth && ic.test(fb.css(a, "display")) ? fb.swap(a, lc, function() {
						return F(a, b, d)
					}) : F(a, b, d) : void 0
				},
				set : function(a, c, d) {
					var e = d && bc(a);
					return D(a, c, d ? E(a, b, d, db.boxSizing() && "border-box" === fb.css(a, "boxSizing", !1, e), e) : 0)
				}
			}
		}), db.opacity || (fb.cssHooks.opacity = {
			get : function(a, b) {
				return hc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
			},
			set : function(a, b) {
				var c = a.style,
					d = a.currentStyle,
					e = fb.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
					f = d && d.filter || c.filter || "";
				c.zoom = 1, (b >= 1 || "" === b) && "" === fb.trim(f.replace(gc, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = gc.test(f) ? f.replace(gc, e) : f + " " + e)
			}
		}), fb.cssHooks.marginRight = A(db.reliableMarginRight, function(a, b) {
			return b ? fb.swap(a, {
				display : "inline-block"
			}, cc, [ a, "marginRight" ]) : void 0
		}), fb.each({
			margin : "",
			padding : "",
			border : "Width"
		}, function(a, b) {
			fb.cssHooks[a + b] = {
				expand : function(c) {
					for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [ c ]; 4 > d; d++) e[a + Cb[d] + b] = f[d] || f[d - 2] || f[0];
					return e
				}
			}, dc.test(a) || (fb.cssHooks[a + b].set = D)
		}), fb.fn.extend({
			css : function(a, b) {
				return Eb(this, function(a, b, c) {
					var d,
						e,
						f = {},
						g = 0;
					if (fb.isArray(b)) {
						for (d = bc(a), e = b.length; e > g; g++) f[b[g]] = fb.css(a, b[g], !1, d);
						return f
					}
					return void 0 !== c ? fb.style(a, b, c) : fb.css(a, b)
				}, a, b, arguments.length > 1)
			},
			show : function() {
				return C(this, !0)
			},
			hide : function() {
				return C(this)
			},
			toggle : function(a) {
				return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
					Db(this) ? fb(this).show() : fb(this).hide()
				})
			}
		}), fb.Tween = G, G.prototype = {
			constructor : G,
			init : function(a, b, c, d, e, f) {
				this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (fb.cssNumber[c] ? "" : "px")
			},
			cur : function() {
				var a = G.propHooks[this.prop];
				return a && a.get ? a.get(this) : G.propHooks._default.get(this)
			},
			run : function(a) {
				var b,
					c = G.propHooks[this.prop];
				return this.pos = b = this.options.duration ? fb.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : G.propHooks._default.set(this), this
			}
		}, G.prototype.init.prototype = G.prototype, G.propHooks = {
			_default : {
				get : function(a) {
					var b;
					return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = fb.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
				},
				set : function(a) {
					fb.fx.step[a.prop] ? fb.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[fb.cssProps[a.prop]] || fb.cssHooks[a.prop]) ? fb.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
				}
			}
		}, G.propHooks.scrollTop = G.propHooks.scrollLeft = {
			set : function(a) {
				a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
			}
		}, fb.easing = {
			linear : function(a) {
				return a
			},
			swing : function(a) {
				return .5 - Math.cos(a * Math.PI) / 2
			}
		}, fb.fx = G.prototype.init, fb.fx.step = {};
		var oc,
			pc,
			qc = /^(?:toggle|show|hide)$/,
			rc = new RegExp("^(?:([+-])=|)(" + Bb + ")([a-z%]*)$", "i"),
			sc = /queueHooks$/,
			tc = [ K ],
			uc = {
				"*" : [ function(a, b) {
					var c = this.createTween(a, b),
						d = c.cur(),
						e = rc.exec(b),
						f = e && e[3] || (fb.cssNumber[a] ? "" : "px"),
						g = (fb.cssNumber[a] || "px" !== f && +d) && rc.exec(fb.css(c.elem, a)),
						h = 1,
						i = 20;
					if (g && g[3] !== f) {
						f = f || g[3], e = e || [], g = +d || 1;
						do h = h || ".5", g /= h, fb.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
					}
					return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
				} ]
			};
		fb.Animation = fb.extend(M, {
			tweener : function(a, b) {
				fb.isFunction(a) ? (b = a, a = [ "*" ]) : a = a.split(" ");
				for (var c, d = 0, e = a.length; e > d; d++) c = a[d], uc[c] = uc[c] || [], uc[c].unshift(b)
			},
			prefilter : function(a, b) {
				b ? tc.unshift(a) : tc.push(a)
			}
		}), fb.speed = function(a, b, c) {
			var d = a && "object" == typeof a ? fb.extend({}, a) : {
				complete : c || !c && b || fb.isFunction(a) && a,
				duration : a,
				easing : c && b || b && !fb.isFunction(b) && b
			};
			return d.duration = fb.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in fb.fx.speeds ? fb.fx.speeds[d.duration] : fb.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
					fb.isFunction(d.old) && d.old.call(this), d.queue && fb.dequeue(this, d.queue)
				}, d
		}, fb.fn.extend({
			fadeTo : function(a, b, c, d) {
				return this.filter(Db).css("opacity", 0).show().end().animate({
					opacity : b
				}, a, c, d)
			},
			animate : function(a, b, c, d) {
				var e = fb.isEmptyObject(a),
					f = fb.speed(b, c, d),
					g = function() {
						var b = M(this, fb.extend({}, a), f);
						(e || fb._data(this, "finish")) && b.stop(!0)
					};
				return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
			},
			stop : function(a, b, c) {
				var d = function(a) {
					var b = a.stop;
					delete a.stop
					, b(c)
				};
				return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
						var b = !0,
							e = null != a && a + "queueHooks",
							f = fb.timers,
							g = fb._data(this);
						if (e) g[e] && g[e].stop && d(g[e]);else
							for (e in g) g[e] && g[e].stop && sc.test(e) && d(g[e]);
						for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
						(b || !c) && fb.dequeue(this, a)
					})
			},
			finish : function(a) {
				return a !== !1 && (a = a || "fx"), this.each(function() {
						var b,
							c = fb._data(this),
							d = c[a + "queue"],
							e = c[a + "queueHooks"],
							f = fb.timers,
							g = d ? d.length : 0;
						for (c.finish = !0, fb.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
						for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
						delete c.finish
					})
			}
		}), fb.each([ "toggle", "show", "hide" ], function(a, b) {
			var c = fb.fn[b];
			fb.fn[b] = function(a, d, e) {
				return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(I(b, !0), a, d, e)
			}
		}), fb.each({
			slideDown : I("show"),
			slideUp : I("hide"),
			slideToggle : I("toggle"),
			fadeIn : {
				opacity : "show"
			},
			fadeOut : {
				opacity : "hide"
			},
			fadeToggle : {
				opacity : "toggle"
			}
		}, function(a, b) {
			fb.fn[a] = function(a, c, d) {
				return this.animate(b, a, c, d)
			}
		}), fb.timers = [], fb.fx.tick = function() {
			var a,
				b = fb.timers,
				c = 0;
			for (oc = fb.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
			b.length || fb.fx.stop(), oc = void 0
		}, fb.fx.timer = function(a) {
			fb.timers.push(a), a() ? fb.fx.start() : fb.timers.pop()
		}, fb.fx.interval = 13, fb.fx.start = function() {
			pc || (pc = setInterval(fb.fx.tick, fb.fx.interval))
		}, fb.fx.stop = function() {
			clearInterval(pc), pc = null
		}, fb.fx.speeds = {
			slow : 600,
			fast : 200,
			_default : 400
		}, fb.fn.delay = function(a, b) {
			return a = fb.fx ? fb.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
					var d = setTimeout(b, a);
					c.stop = function() {
						clearTimeout(d)
					}
				})
		}, function() {
			var a,
				b,
				c,
				d,
				e = pb.createElement("div");
			e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = e.getElementsByTagName("a")[0], c = pb.createElement("select"), d = c.appendChild(pb.createElement("option")), b = e.getElementsByTagName("input")[0], a.style.cssText = "top:1px", db.getSetAttribute = "t" !== e.className, db.style = /top/.test(a.getAttribute("style")), db.hrefNormalized = "/a" === a.getAttribute("href"), db.checkOn = !!b.value, db.optSelected = d.selected, db.enctype = !!pb.createElement("form").enctype, c.disabled = !0, db.optDisabled = !d.disabled, b = pb.createElement("input"), b.setAttribute("value", ""), db.input = "" === b.getAttribute("value"), b.value = "t", b.setAttribute("type", "radio"), db.radioValue = "t" === b.value, a = b = c = d = e = null
		}();
		var vc = /\r/g;
		fb.fn.extend({
			val : function(a) {
				var b,
					c,
					d,
					e = this[0];
				{
					if (arguments.length) return d = fb.isFunction(a), this.each(function(c) {
								var e;
								1 === this.nodeType && (e = d ? a.call(this, c, fb(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : fb.isArray(e) && (e = fb.map(e, function(a) {
									return null == a ? "" : a + ""
								})), b = fb.valHooks[this.type] || fb.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
							});
					if (e) return b = fb.valHooks[e.type] || fb.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(vc, "") : null == c ? "" : c)
				}
			}
		}), fb.extend({
			valHooks : {
				option : {
					get : function(a) {
						var b = fb.find.attr(a, "value");
						return null != b ? b : fb.text(a)
					}
				},
				select : {
					get : function(a) {
						for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
							if (c = d[i], !(!c.selected && i !== e || (db.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && fb.nodeName(c.parentNode, "optgroup"))) {
								if (b = fb(c).val(), f) return b;
								g.push(b)
						}
						return g
					},
					set : function(a, b) {
						for (var c, d, e = a.options, f = fb.makeArray(b), g = e.length; g--;)
							if (d = e[g], fb.inArray(fb.valHooks.option.get(d), f) >= 0) try {
									d.selected = c = !0
								} catch (h) {
									d.scrollHeight
							} else
								d.selected = !1;
						return c || (a.selectedIndex = -1), e
					}
				}
			}
		}), fb.each([ "radio", "checkbox" ], function() {
			fb.valHooks[this] = {
				set : function(a, b) {
					return fb.isArray(b) ? a.checked = fb.inArray(fb(a).val(), b) >= 0 : void 0
				}
			}, db.checkOn || (fb.valHooks[this].get = function(a) {
				return null === a.getAttribute("value") ? "on" : a.value
			})
		});
		var wc,
			xc,
			yc = fb.expr.attrHandle,
			zc = /^(?:checked|selected)$/i,
			Ac = db.getSetAttribute,
			Bc = db.input;
		fb.fn.extend({
			attr : function(a, b) {
				return Eb(this, fb.attr, a, b, arguments.length > 1)
			},
			removeAttr : function(a) {
				return this.each(function() {
					fb.removeAttr(this, a)
				})
			}
		}), fb.extend({
			attr : function(a, b, c) {
				var d,
					e,
					f = a.nodeType;
				if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === yb ? fb.prop(a, b, c) : (1 === f && fb.isXMLDoc(a) || (b = b.toLowerCase(), d = fb.attrHooks[b] || (fb.expr.match.bool.test(b) ? xc : wc)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = fb.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void fb.removeAttr(a, b))
			},
			removeAttr : function(a, b) {
				var c,
					d,
					e = 0,
					f = b && b.match(ub);
				if (f && 1 === a.nodeType)
					for (; c = f[e++];) d = fb.propFix[c] || c, fb.expr.match.bool.test(c) ? Bc && Ac || !zc.test(c) ? a[d] = !1 : a[fb.camelCase("default-" + c)] = a[d] = !1 : fb.attr(a, c, ""), a.removeAttribute(Ac ? c : d)
			},
			attrHooks : {
				type : {
					set : function(a, b) {
						if (!db.radioValue && "radio" === b && fb.nodeName(a, "input")) {
							var c = a.value;
							return a.setAttribute("type", b), c && (a.value = c), b
						}
					}
				}
			}
		}), xc = {
			set : function(a, b, c) {
				return b === !1 ? fb.removeAttr(a, c) : Bc && Ac || !zc.test(c) ? a.setAttribute(!Ac && fb.propFix[c] || c, c) : a[fb.camelCase("default-" + c)] = a[c] = !0, c
			}
		}, fb.each(fb.expr.match.bool.source.match(/\w+/g), function(a, b) {
			var c = yc[b] || fb.find.attr;
			yc[b] = Bc && Ac || !zc.test(b) ? function(a, b, d) {
				var e,
					f;
				return d || (f = yc[b], yc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, yc[b] = f), e
			} : function(a, b, c) {
				return c ? void 0 : a[fb.camelCase("default-" + b)] ? b.toLowerCase() : null
			}
		}), Bc && Ac || (fb.attrHooks.value = {
			set : function(a, b, c) {
				return fb.nodeName(a, "input") ? void (a.defaultValue = b) : wc && wc.set(a, b, c)
			}
		}), Ac || (wc = {
			set : function(a, b, c) {
				var d = a.getAttributeNode(c);
				return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
			}
		}, yc.id = yc.name = yc.coords = function(a, b, c) {
			var d;
			return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
		}, fb.valHooks.button = {
			get : function(a, b) {
				var c = a.getAttributeNode(b);
				return c && c.specified ? c.value : void 0
			},
			set : wc.set
		}, fb.attrHooks.contenteditable = {
			set : function(a, b, c) {
				wc.set(a, "" === b ? !1 : b, c)
			}
		}, fb.each([ "width", "height" ], function(a, b) {
			fb.attrHooks[b] = {
				set : function(a, c) {
					return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
				}
			}
		})), db.style || (fb.attrHooks.style = {
			get : function(a) {
				return a.style.cssText || void 0
			},
			set : function(a, b) {
				return a.style.cssText = b + ""
			}
		});
		var Cc = /^(?:input|select|textarea|button|object)$/i,
			Dc = /^(?:a|area)$/i;
		fb.fn.extend({
			prop : function(a, b) {
				return Eb(this, fb.prop, a, b, arguments.length > 1)
			},
			removeProp : function(a) {
				return a = fb.propFix[a] || a, this.each(function() {
						try {
							this[a] = void 0,
							delete this[a]
						} catch (b) {}
					})
			}
		}), fb.extend({
			propFix : {
				"for" : "htmlFor",
				"class" : "className"
			},
			prop : function(a, b, c) {
				var d,
					e,
					f,
					g = a.nodeType;
				if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !fb.isXMLDoc(a), f && (b = fb.propFix[b] || b, e = fb.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
			},
			propHooks : {
				tabIndex : {
					get : function(a) {
						var b = fb.find.attr(a, "tabindex");
						return b ? parseInt(b, 10) : Cc.test(a.nodeName) || Dc.test(a.nodeName) && a.href ? 0 : -1
					}
				}
			}
		}), db.hrefNormalized || fb.each([ "href", "src" ], function(a, b) {
			fb.propHooks[b] = {
				get : function(a) {
					return a.getAttribute(b, 4)
				}
			}
		}), db.optSelected || (fb.propHooks.selected = {
			get : function(a) {
				var b = a.parentNode;
				return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
			}
		}), fb.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
			fb.propFix[this.toLowerCase()] = this
		}), db.enctype || (fb.propFix.enctype = "encoding");
		var Ec = /[\t\r\n\f]/g;
		fb.fn.extend({
			addClass : function(a) {
				var b,
					c,
					d,
					e,
					f,
					g,
					h = 0,
					i = this.length,
					j = "string" == typeof a && a;
				if (fb.isFunction(a)) return this.each(function(b) {
						fb(this).addClass(a.call(this, b, this.className))
					});
				if (j)
					for (b = (a || "").match(ub) || []; i > h; h++)
						if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ec, " ") : " ")) {
							for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
							g = fb.trim(d), c.className !== g && (c.className = g)
				}
				return this
			},
			removeClass : function(a) {
				var b,
					c,
					d,
					e,
					f,
					g,
					h = 0,
					i = this.length,
					j = 0 === arguments.length || "string" == typeof a && a;
				if (fb.isFunction(a)) return this.each(function(b) {
						fb(this).removeClass(a.call(this, b, this.className))
					});
				if (j)
					for (b = (a || "").match(ub) || []; i > h; h++)
						if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ec, " ") : "")) {
							for (f = 0; e = b[f++];)
								for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
							g = a ? fb.trim(d) : "", c.className !== g && (c.className = g)
				}
				return this
			},
			toggleClass : function(a, b) {
				var c = typeof a;
				return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(fb.isFunction(a) ? function(c) {
					fb(this).toggleClass(a.call(this, c, this.className, b), b)
				} : function() {
					if ("string" === c)
						for (var b, d = 0, e = fb(this), f = a.match(ub) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
					else (c === yb || "boolean" === c) && (this.className && fb._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : fb._data(this, "__className__") || "")
				})
			},
			hasClass : function(a) {
				for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
					if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Ec, " ").indexOf(b) >= 0) return !0;
				return !1
			}
		}), fb.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
			fb.fn[b] = function(a, c) {
				return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
			}
		}), fb.fn.extend({
			hover : function(a, b) {
				return this.mouseenter(a).mouseleave(b || a)
			},
			bind : function(a, b, c) {
				return this.on(a, null, b, c)
			},
			unbind : function(a, b) {
				return this.off(a, null, b)
			},
			delegate : function(a, b, c, d) {
				return this.on(b, a, c, d)
			},
			undelegate : function(a, b, c) {
				return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
			}
		});
		var Fc = fb.now(),
			Gc = /\?/,
			Hc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
		fb.parseJSON = function(b) {
			if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
			var c,
				d = null,
				e = fb.trim(b + "");
			return e && !fb.trim(e.replace(Hc, function(a, b, e, f) {
				return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
			})) ? Function("return " + e)() : fb.error("Invalid JSON: " + b)
		}, fb.parseXML = function(b) {
			var c,
				d;
			if (!b || "string" != typeof b) return null;
			try {
				a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
			} catch (e) {
				c = void 0
			} return c && c.documentElement && !c.getElementsByTagName("parsererror").length || fb.error("Invalid XML: " + b), c
		};
		var Ic,
			Jc,
			Kc = /#.*$/,
			Lc = /([?&])_=[^&]*/,
			Mc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
			Nc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
			Oc = /^(?:GET|HEAD)$/,
			Pc = /^\/\//,
			Qc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
			Rc = {},
			Sc = {},
			Tc = "*/".concat("*");
		try {
			Jc = location.href
		} catch (Uc) {
			Jc = pb.createElement("a"), Jc.href = "", Jc = Jc.href
		} Ic = Qc.exec(Jc.toLowerCase()) || [], fb.extend({
			active : 0,
			lastModified : {},
			etag : {},
			ajaxSettings : {
				url : Jc,
				type : "GET",
				isLocal : Nc.test(Ic[1]),
				global : !0,
				processData : !0,
				async : !0,
				contentType : "application/x-www-form-urlencoded; charset=UTF-8",
				accepts : {
					"*" : Tc,
					text : "text/plain",
					html : "text/html",
					xml : "application/xml, text/xml",
					json : "application/json, text/javascript"
				},
				contents : {
					xml : /xml/,
					html : /html/,
					json : /json/
				},
				responseFields : {
					xml : "responseXML",
					text : "responseText",
					json : "responseJSON"
				},
				converters : {
					"* text" : String,
					"text html" : !0,
					"text json" : fb.parseJSON,
					"text xml" : fb.parseXML
				},
				flatOptions : {
					url : !0,
					context : !0
				}
			},
			ajaxSetup : function(a, b) {
				return b ? P(P(a, fb.ajaxSettings), b) : P(fb.ajaxSettings, a)
			},
			ajaxPrefilter : N(Rc),
			ajaxTransport : N(Sc),
			ajax : function(a, b) {
				function c(a, b, c, d) {
					var e,
						k,
						r,
						s,
						u,
						w = b;
					2 !== t && (t = 2, h && clearTimeout(h), j = void 0, g = d || "", v.readyState = a > 0 ? 4 : 0, e = a >= 200 && 300 > a || 304 === a, c && (s = Q(l, v, c)), s = R(l, s, v, e), e ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (fb.lastModified[f] = u), u = v.getResponseHeader("etag"), u && (fb.etag[f] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, k = s.data, r = s.error, e = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || w) + "", e ? o.resolveWith(m, [ k, w, v ]) : o.rejectWith(m, [ v, w, r ]), v.statusCode(q), q = void 0, i && n.trigger(e ? "ajaxSuccess" : "ajaxError", [ v, l, e ? k : r ]), p.fireWith(m, [ v, w ]), i && (n.trigger("ajaxComplete", [ v, l ]), --fb.active || fb.event.trigger("ajaxStop")))
				}
				"object" == typeof a && (b = a, a = void 0), b = b || {};
				var d,
					e,
					f,
					g,
					h,
					i,
					j,
					k,
					l = fb.ajaxSetup({}, b),
					m = l.context || l,
					n = l.context && (m.nodeType || m.jquery) ? fb(m) : fb.event,
					o = fb.Deferred(),
					p = fb.Callbacks("once memory"),
					q = l.statusCode || {},
					r = {},
					s = {},
					t = 0,
					u = "canceled",
					v = {
						readyState : 0,
						getResponseHeader : function(a) {
							var b;
							if (2 === t) {
								if (!k)
									for (k = {}; b = Mc.exec(g);) k[b[1].toLowerCase()] = b[2];
								b = k[a.toLowerCase()]
							}
							return null == b ? null : b
						},
						getAllResponseHeaders : function() {
							return 2 === t ? g : null
						},
						setRequestHeader : function(a, b) {
							var c = a.toLowerCase();
							return t || (a = s[c] = s[c] || a, r[a] = b), this
						},
						overrideMimeType : function(a) {
							return t || (l.mimeType = a), this
						},
						statusCode : function(a) {
							var b;
							if (a)
								if (2 > t)
									for (b in a) q[b] = [ q[b], a[b] ];
								else v.always(a[v.status]);
							return this
						},
						abort : function(a) {
							var b = a || u;
							return j && j.abort(b), c(0, b), this
						}
					};
				if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || Jc) + "").replace(Kc, "").replace(Pc, Ic[1] + "//"), l.type = b.method || b.type || l.method || l.type, l.dataTypes = fb.trim(l.dataType || "*").toLowerCase().match(ub) || [ "" ], null == l.crossDomain && (d = Qc.exec(l.url.toLowerCase()), l.crossDomain = !(!d || d[1] === Ic[1] && d[2] === Ic[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Ic[3] || ("http:" === Ic[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = fb.param(l.data, l.traditional)), O(Rc, l, b, v), 2 === t) return v;
				i = l.global, i && 0 === fb.active++ && fb.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !Oc.test(l.type), f = l.url, l.hasContent || (l.data && (f = l.url += (Gc.test(f) ? "&" : "?") + l.data,
				delete l.data
				), l.cache === !1 && (l.url = Lc.test(f) ? f.replace(Lc, "$1_=" + Fc++) : f + (Gc.test(f) ? "&" : "?") + "_=" + Fc++)), l.ifModified && (fb.lastModified[f] && v.setRequestHeader("If-Modified-Since", fb.lastModified[f]), fb.etag[f] && v.setRequestHeader("If-None-Match", fb.etag[f])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Tc + "; q=0.01" : "") : l.accepts["*"]);
				for (e in l.headers) v.setRequestHeader(e, l.headers[e]);
				if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t)) return v.abort();
				u = "abort";
				for (e in {success : 1, error : 1, complete : 1}) v[e](l[e]);
				if (j = O(Sc, l, b, v)) {
					v.readyState = 1, i && n.trigger("ajaxSend", [ v, l ]), l.async && l.timeout > 0 && (h = setTimeout(function() {
						v.abort("timeout")
					}, l.timeout));try {
						t = 1, j.send(r, c)
					} catch (w) {
						if (!(2 > t))
							throw w;
						c(-1, w)
					}
				} else c(-1, "No Transport");
				return v
			},
			getJSON : function(a, b, c) {
				return fb.get(a, b, c, "json")
			},
			getScript : function(a, b) {
				return fb.get(a, void 0, b, "script")
			}
		}), fb.each([ "get", "post" ], function(a, b) {
			fb[b] = function(a, c, d, e) {
				return fb.isFunction(c) && (e = e || d, d = c, c = void 0), fb.ajax({
						url : a,
						type : b,
						dataType : e,
						data : c,
						success : d
					})
			}
		}), fb.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(a, b) {
			fb.fn[b] = function(a) {
				return this.on(b, a)
			}
		}), fb._evalUrl = function(a) {
			return fb.ajax({
				url : a,
				type : "GET",
				dataType : "script",
				async : !1,
				global : !1,
				"throws" : !0
			})
		}, fb.fn.extend({
			wrapAll : function(a) {
				if (fb.isFunction(a)) return this.each(function(b) {
						fb(this).wrapAll(a.call(this, b))
					});
				if (this[0]) {
					var b = fb(a, this[0].ownerDocument).eq(0).clone(!0);
					this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
						for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
						return a
					}).append(this)
				}
				return this
			},
			wrapInner : function(a) {
				return this.each(fb.isFunction(a) ? function(b) {
					fb(this).wrapInner(a.call(this, b))
				} : function() {
					var b = fb(this),
						c = b.contents();
					c.length ? c.wrapAll(a) : b.append(a)
				})
			},
			wrap : function(a) {
				var b = fb.isFunction(a);
				return this.each(function(c) {
					fb(this).wrapAll(b ? a.call(this, c) : a)
				})
			},
			unwrap : function() {
				return this.parent().each(function() {
					fb.nodeName(this, "body") || fb(this).replaceWith(this.childNodes)
				}).end()
			}
		}), fb.expr.filters.hidden = function(a) {
			return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !db.reliableHiddenOffsets() && "none" === (a.style && a.style.display || fb.css(a, "display"))
		}, fb.expr.filters.visible = function(a) {
			return !fb.expr.filters.hidden(a)
		};
		var Vc = /%20/g,
			Wc = /\[\]$/,
			Xc = /\r?\n/g,
			Yc = /^(?:submit|button|image|reset|file)$/i,
			Zc = /^(?:input|select|textarea|keygen)/i;
		fb.param = function(a, b) {
			var c,
				d = [],
				e = function(a, b) {
					b = fb.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
				};
			if (void 0 === b && (b = fb.ajaxSettings && fb.ajaxSettings.traditional), fb.isArray(a) || a.jquery && !fb.isPlainObject(a)) fb.each(a, function() {
					e(this.name, this.value)
				});else
				for (c in a) S(c, a[c], b, e);
			return d.join("&").replace(Vc, "+")
		}, fb.fn.extend({
			serialize : function() {
				return fb.param(this.serializeArray())
			},
			serializeArray : function() {
				return this.map(function() {
					var a = fb.prop(this, "elements");
					return a ? fb.makeArray(a) : this
				}).filter(function() {
					var a = this.type;
					return this.name && !fb(this).is(":disabled") && Zc.test(this.nodeName) && !Yc.test(a) && (this.checked || !Fb.test(a))
				}).map(function(a, b) {
					var c = fb(this).val();
					return null == c ? null : fb.isArray(c) ? fb.map(c, function(a) {
						return {
							name : b.name,
							value : a.replace(Xc, "\r\n")
						}
					}) : {
						name : b.name,
						value : c.replace(Xc, "\r\n")
					}
				}).get()
			}
		}), fb.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
			return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && T() || U()
		} : T;
		var $c = 0,
			_c = {},
			ad = fb.ajaxSettings.xhr();
		a.ActiveXObject && fb(a).on("unload", function() {
			for (var a in _c) _c[a](void 0, !0)
		}), db.cors = !!ad && "withCredentials" in ad, ad = db.ajax = !!ad, ad && fb.ajaxTransport(function(a) {
			if (!a.crossDomain || db.cors) {
				var b;
				return {
					send : function(c, d) {
						var e,
							f = a.xhr(),
							g = ++$c;
						if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
							for (e in a.xhrFields) f[e] = a.xhrFields[e];
						a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
						for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
						f.send(a.hasContent && a.data || null), b = function(c, e) {
							var h,
								i,
								j;
							if (b && (e || 4 === f.readyState))
								if (
									delete _c[g]
									, b = void 0, f.onreadystatechange = fb.noop, e) 4 !== f.readyState && f.abort();else {
									j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);try {
										i = f.statusText
									} catch (k) {
										i = ""
									}
									h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
							}
							j && d(h, i, j, f.getAllResponseHeaders())
						}, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = _c[g] = b : b()
					},
					abort : function() {
						b && b(void 0, !0)
					}
				}
			}
		}), fb.ajaxSetup({
			accepts : {
				script : "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
			},
			contents : {
				script : /(?:java|ecma)script/
			},
			converters : {
				"text script" : function(a) {
					return fb.globalEval(a), a
				}
			}
		}), fb.ajaxPrefilter("script", function(a) {
			void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
		}), fb.ajaxTransport("script", function(a) {
			if (a.crossDomain) {
				var b,
					c = pb.head || fb("head")[0] || pb.documentElement;
				return {
					send : function(d, e) {
						b = pb.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
							(c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
						}, c.insertBefore(b, c.firstChild)
					},
					abort : function() {
						b && b.onload(void 0, !0)
					}
				}
			}
		});
		var bd = [],
			cd = /(=)\?(?=&|$)|\?\?/;
		fb.ajaxSetup({
			jsonp : "callback",
			jsonpCallback : function() {
				var a = bd.pop() || fb.expando + "_" + Fc++;
				return this[a] = !0, a
			}
		}), fb.ajaxPrefilter("json jsonp", function(b, c, d) {
			var e,
				f,
				g,
				h = b.jsonp !== !1 && (cd.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && cd.test(b.data) && "data");
			return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = fb.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(cd, "$1" + e) : b.jsonp !== !1 && (b.url += (Gc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
				return g || fb.error(e + " was not called"), g[0]
			}, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
				g = arguments
			}, d.always(function() {
				a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, bd.push(e)), g && fb.isFunction(f) && f(g[0]), g = f = void 0
			}), "script") : void 0
		}), fb.parseHTML = function(a, b, c) {
			if (!a || "string" != typeof a) return null;
			"boolean" == typeof b && (c = b, b = !1), b = b || pb;
			var d = mb.exec(a),
				e = !c && [];
			return d ? [ b.createElement(d[1]) ] : (d = fb.buildFragment([ a ], b, e), e && e.length && fb(e).remove(), fb.merge([], d.childNodes))
		};
		var dd = fb.fn.load;
		fb.fn.load = function(a, b, c) {
			if ("string" != typeof a && dd) return dd.apply(this, arguments);
			var d,
				e,
				f,
				g = this,
				h = a.indexOf(" ");
			return h >= 0 && (d = a.slice(h, a.length), a = a.slice(0, h)), fb.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && fb.ajax({
					url : a,
					type : f,
					dataType : "html",
					data : b
				}).done(function(a) {
					e = arguments, g.html(d ? fb("<div>").append(fb.parseHTML(a)).find(d) : a)
				}).complete(c && function(a, b) {
						g.each(c, e || [ a.responseText, b, a ])
					}), this
		}, fb.expr.filters.animated = function(a) {
			return fb.grep(fb.timers, function(b) {
				return a === b.elem
			}).length
		};
		var ed = a.document.documentElement;
		fb.offset = {
			setOffset : function(a, b, c) {
				var d,
					e,
					f,
					g,
					h,
					i,
					j,
					k = fb.css(a, "position"),
					l = fb(a),
					m = {};
				"static" === k && (a.style.position = "relative"), h = l.offset(), f = fb.css(a, "top"), i = fb.css(a, "left"), j = ("absolute" === k || "fixed" === k) && fb.inArray("auto", [ f, i ]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), fb.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
			}
		}, fb.fn.extend({
			offset : function(a) {
				if (arguments.length) return void 0 === a ? this : this.each(function(b) {
						fb.offset.setOffset(this, a, b)
					});
				var b,
					c,
					d = {
						top : 0,
						left : 0
					},
					e = this[0],
					f = e && e.ownerDocument;
				if (f) return b = f.documentElement, fb.contains(b, e) ? (typeof e.getBoundingClientRect !== yb && (d = e.getBoundingClientRect()), c = V(f), {
							top : d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
							left : d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
						}) : d
			},
			position : function() {
				if (this[0]) {
					var a,
						b,
						c = {
							top : 0,
							left : 0
						},
						d = this[0];
					return "fixed" === fb.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), fb.nodeName(a[0], "html") || (c = a.offset()), c.top += fb.css(a[0], "borderTopWidth", !0), c.left += fb.css(a[0], "borderLeftWidth", !0)), {
							top : b.top - c.top - fb.css(d, "marginTop", !0),
							left : b.left - c.left - fb.css(d, "marginLeft", !0)
					}
				}
			},
			offsetParent : function() {
				return this.map(function() {
					for (var a = this.offsetParent || ed; a && !fb.nodeName(a, "html") && "static" === fb.css(a, "position");) a = a.offsetParent;
					return a || ed
				})
			}
		}), fb.each({
			scrollLeft : "pageXOffset",
			scrollTop : "pageYOffset"
		}, function(a, b) {
			var c = /Y/.test(b);
			fb.fn[a] = function(d) {
				return Eb(this, function(a, d, e) {
					var f = V(a);
					return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? fb(f).scrollLeft() : e, c ? e : fb(f).scrollTop()) : a[d] = e)
				}, a, d, arguments.length, null)
			}
		}), fb.each([ "top", "left" ], function(a, b) {
			fb.cssHooks[b] = A(db.pixelPosition, function(a, c) {
				return c ? (c = cc(a, b), ec.test(c) ? fb(a).position()[b] + "px" : c) : void 0
			})
		}), fb.each({
			Height : "height",
			Width : "width"
		}, function(a, b) {
			fb.each({
				padding : "inner" + a,
				content : b,
				"" : "outer" + a
			}, function(c, d) {
				fb.fn[d] = function(d, e) {
					var f = arguments.length && (c || "boolean" != typeof d),
						g = c || (d === !0 || e === !0 ? "margin" : "border");
					return Eb(this, function(b, c, d) {
						var e;
						return fb.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? fb.css(b, c, g) : fb.style(b, c, d, g)
					}, b, f ? d : void 0, f, null)
				}
			})
		}), fb.fn.size = function() {
			return this.length
		}, fb.fn.andSelf = fb.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
			return fb
		});
		var fd = a.jQuery,
			gd = a.$;
		return fb.noConflict = function(b) {
				return a.$ === fb && (a.$ = gd), b && a.jQuery === fb && (a.jQuery = fd), fb
			}, typeof b === yb && (a.jQuery = a.$ = fb), fb
	}), function(a) {
		"function" == typeof define ? define(a) : "function" == typeof YUI ? YUI.add("es5", a) : a()
	}(function() {
		function a() {
		}
		function b(a) {
			return a = +a, a !== a ? a = 0 : 0 !== a && a !== 1 / 0 && a !== -(1 / 0) && (a = (a > 0 || -1) * Math.floor(Math.abs(a))), a
		}
		function c(a) {
			var b = typeof a;
			return null === a || "undefined" === b || "boolean" === b || "number" === b || "string" === b
		}
		function d(a) {
			var b,
				d,
				e;
			if (c(a)) return a;
			if (d = a.valueOf, "function" == typeof d && (b = d.call(a), c(b))) return b;
			if (e = a.toString, "function" == typeof e && (b = e.call(a), c(b))) return b;
			throw new TypeError
		}
		Function.prototype.bind || (Function.prototype.bind = function(b) {
			var c = this;
			if ("function" != typeof c)
				throw new TypeError("Function.prototype.bind called on incompatible " + c);
			var d = m.call(arguments, 1),
				e = function() {
					if (this instanceof e) {
						var a = c.apply(this, d.concat(m.call(arguments)));
						return Object(a) === a ? a : this
					}
					return c.apply(b, d.concat(m.call(arguments)))
				};
			return c.prototype && (a.prototype = c.prototype, e.prototype = new a, a.prototype = null), e
		});
		var e,
			f,
			g,
			h,
			i,
			j = Function.prototype.call,
			k = Array.prototype,
			l = Object.prototype,
			m = k.slice,
			n = j.bind(l.toString),
			o = j.bind(l.hasOwnProperty);
		if ((i = o(l, "__defineGetter__")) && (e = j.bind(l.__defineGetter__), f = j.bind(l.__defineSetter__), g = j.bind(l.__lookupGetter__), h = j.bind(l.__lookupSetter__)), 2 != [ 1, 2 ].splice(0).length) {
			var p = Array.prototype.splice;
			Array.prototype.splice = function() {
				function a(a) {
					for (var b = []; a--;) b.unshift(a);
					return b
				}
				var b,
					c = [];
				return c.splice.bind(c, 0, 0).apply(null, a(20)), c.splice.bind(c, 0, 0).apply(null, a(26)), b = c.length, c.splice(5, 0, "XXX"), b + 1 == c.length ? !0 : void 0
			}() ? function(a, b) {
				return arguments.length ? p.apply(this, [ void 0 === a ? 0 : a, void 0 === b ? this.length - a : b ].concat(m.call(arguments, 2))) : []
			} : function(a, b) {
				var c,
					d = m.call(arguments, 2),
					e = d.length;
				if (!arguments.length) return [];
				if (void 0 === a && (a = 0), void 0 === b && (b = this.length - a), e > 0) {
					if (0 >= b) {
						if (a == this.length) return this.push.apply(this, d), [];
						if (0 == a) return this.unshift.apply(this, d), []
					}
					return c = m.call(this, a, a + b), d.push.apply(d, m.call(this, a + b, this.length)), d.unshift.apply(d, m.call(this, 0, a)), d.unshift(0, this.length), p.apply(this, d), c
				}
				return p.call(this, a, b)
			}
		}
		if (1 != [].unshift(0)) {
			var q = Array.prototype.unshift;
			Array.prototype.unshift = function() {
				return q.apply(this, arguments), this.length
			}
		}
		Array.isArray || (Array.isArray = function(a) {
			return "[object Array]" == n(a)
		});
		var r = Object("a"),
			s = "a" != r[0] || !(0 in r);
		if (Array.prototype.forEach || (Array.prototype.forEach = function(a) {
				var b = G(this),
					c = s && "[object String]" == n(this) ? this.split("") : b,
					d = arguments[1],
					e = -1,
					f = c.length >>> 0;
				if ("[object Function]" != n(a))
					throw new TypeError;
				for (; ++e < f;) e in c && a.call(d, c[e], e, b)
			}), Array.prototype.map || (Array.prototype.map = function(a) {
				var b = G(this),
					c = s && "[object String]" == n(this) ? this.split("") : b,
					d = c.length >>> 0,
					e = Array(d),
					f = arguments[1];
				if ("[object Function]" != n(a))
					throw new TypeError(a + " is not a function");
				for (var g = 0; d > g; g++) g in c && (e[g] = a.call(f, c[g], g, b));
				return e
			}), Array.prototype.filter || (Array.prototype.filter = function(a) {
				var b,
					c = G(this),
					d = s && "[object String]" == n(this) ? this.split("") : c,
					e = d.length >>> 0,
					f = [],
					g = arguments[1];
				if ("[object Function]" != n(a))
					throw new TypeError(a + " is not a function");
				for (var h = 0; e > h; h++) h in d && (b = d[h], a.call(g, b, h, c) && f.push(b));
				return f
			}), Array.prototype.every || (Array.prototype.every = function(a) {
				var b = G(this),
					c = s && "[object String]" == n(this) ? this.split("") : b,
					d = c.length >>> 0,
					e = arguments[1];
				if ("[object Function]" != n(a))
					throw new TypeError(a + " is not a function");
				for (var f = 0; d > f; f++)
					if (f in c && !a.call(e, c[f], f, b)) return !1;
				return !0
			}), Array.prototype.some || (Array.prototype.some = function(a) {
				var b = G(this),
					c = s && "[object String]" == n(this) ? this.split("") : b,
					d = c.length >>> 0,
					e = arguments[1];
				if ("[object Function]" != n(a))
					throw new TypeError(a + " is not a function");
				for (var f = 0; d > f; f++)
					if (f in c && a.call(e, c[f], f, b)) return !0;
				return !1
			}), Array.prototype.reduce || (Array.prototype.reduce = function(a) {
				var b = G(this),
					c = s && "[object String]" == n(this) ? this.split("") : b,
					d = c.length >>> 0;
				if ("[object Function]" != n(a))
					throw new TypeError(a + " is not a function");
				if (!d && 1 == arguments.length)
					throw new TypeError("reduce of empty array with no initial value");
				var e,
					f = 0;
				if (arguments.length >= 2)
					e = arguments[1];else
					for (;;) {
						if (f in c) {
							e = c[f++];break
						}
						if (++f >= d)
							throw new TypeError("reduce of empty array with no initial value")
				}
				for (; d > f; f++) f in c && (e = a.call(void 0, e, c[f], f, b));
				return e
			}), Array.prototype.reduceRight || (Array.prototype.reduceRight = function(a) {
				var b = G(this),
					c = s && "[object String]" == n(this) ? this.split("") : b,
					d = c.length >>> 0;
				if ("[object Function]" != n(a))
					throw new TypeError(a + " is not a function");
				if (!d && 1 == arguments.length)
					throw new TypeError("reduceRight of empty array with no initial value");
				var e,
					f = d - 1;
				if (arguments.length >= 2)
					e = arguments[1];else
					for (;;) {
						if (f in c) {
							e = c[f--];break
						}
						if (--f < 0)
							throw new TypeError("reduceRight of empty array with no initial value")
				}
				if (0 > f) return e;
				do f in this && (e = a.call(void 0, e, c[f], f, b)); while (f--);
				return e
			}), Array.prototype.indexOf && -1 == [ 0, 1 ].indexOf(1, 2) || (Array.prototype.indexOf = function(a) {
				var c = s && "[object String]" == n(this) ? this.split("") : G(this),
					d = c.length >>> 0;
				if (!d) return -1;
				var e = 0;
				for (arguments.length > 1 && (e = b(arguments[1])), e = e >= 0 ? e : Math.max(0, d + e); d > e; e++)
					if (e in c && c[e] === a) return e;
				return -1
			}), Array.prototype.lastIndexOf && -1 == [ 0, 1 ].lastIndexOf(0, -3) || (Array.prototype.lastIndexOf = function(a) {
				var c = s && "[object String]" == n(this) ? this.split("") : G(this),
					d = c.length >>> 0;
				if (!d) return -1;
				var e = d - 1;
				for (arguments.length > 1 && (e = Math.min(e, b(arguments[1]))), e = e >= 0 ? e : d - Math.abs(e); e >= 0; e--)
					if (e in c && a === c[e]) return e;
				return -1
			}), !Object.keys) {
			var t = !0,
				u = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ],
				v = u.length;
			for (var w in {toString : null}) t = !1;
			Object.keys = function H(a) {
				if ("object" != typeof a && "function" != typeof a || null === a)
					throw new TypeError("Object.keys called on a non-object");
				var H = [];
				for (var b in a) o(a, b) && H.push(b);
				if (t)
					for (var c = 0, d = v; d > c; c++) {
						var e = u[c];
						o(a, e) && H.push(e)
				}
				return H
			}
		}
		var x = -621987552e5,
			y = "-000001";
		Date.prototype.toISOString && -1 !== new Date(x).toISOString().indexOf(y) || (Date.prototype.toISOString = function() {
			var a,
				b,
				c,
				d,
				e;
			if (!isFinite(this))
				throw new RangeError("Date.prototype.toISOString called on non-finite value.");
			for (d = this.getUTCFullYear(), e = this.getUTCMonth(), d += Math.floor(e / 12), e = (e % 12 + 12) % 12, a = [ e + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds() ], d = (0 > d ? "-" : d > 9999 ? "+" : "") + ("00000" + Math.abs(d)).slice(d >= 0 && 9999 >= d ? -4 : -6), b = a.length; b--;) c = a[b], 10 > c && (a[b] = "0" + c);
			return d + "-" + a.slice(0, 2).join("-") + "T" + a.slice(2).join(":") + "." + ("000" + this.getUTCMilliseconds()).slice(-3) + "Z"
		});
		var z = !1;
		try {
			z = Date.prototype.toJSON && null === new Date(0 / 0).toJSON() && -1 !== new Date(x).toJSON().indexOf(y) && Date.prototype.toJSON.call({
				toISOString : function() {
					return !0
				}
			})
		} catch (A) {} z || (Date.prototype.toJSON = function() {
			var a,
				b = Object(this),
				c = d(b);
			if ("number" == typeof c && !isFinite(c)) return null;
			if (a = b.toISOString, "function" != typeof a)
				throw new TypeError("toISOString property is not callable");
			return a.call(b)
		}), Date = function(a) {
			function b(c, d, e, f, g, h, i) {
				var j = arguments.length;
				if (this instanceof a) {
					var k = 1 == j && String(c) === c ? new a(b.parse(c)) : j >= 7 ? new a(c, d, e, f, g, h, i) : j >= 6 ? new a(c, d, e, f, g, h) : j >= 5 ? new a(c, d, e, f, g) : j >= 4 ? new a(c, d, e, f) : j >= 3 ? new a(c, d, e) : j >= 2 ? new a(c, d) : j >= 1 ? new a(c) : new a;
					return k.constructor = b, k
				}
				return a.apply(this, arguments)
			}
			function c(a, b) {
				var c = b > 1 ? 1 : 0;
				return e[b] + Math.floor((a - 1969 + c) / 4) - Math.floor((a - 1901 + c) / 100) + Math.floor((a - 1601 + c) / 400) + 365 * (a - 1970)
			}
			var d = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),
				e = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365 ];
			for (var f in a) b[f] = a[f];
			return b.now = a.now, b.UTC = a.UTC, b.prototype = a.prototype, b.prototype.constructor = b, b.parse = function(b) {
					var e = d.exec(b);
					if (e) {
						var f,
							g = Number(e[1]),
							h = Number(e[2] || 1) - 1,
							i = Number(e[3] || 1) - 1,
							j = Number(e[4] || 0),
							k = Number(e[5] || 0),
							l = Number(e[6] || 0),
							m = Math.floor(1e3 * Number(e[7] || 0)),
							n = !e[4] || e[8] ? 0 : Number(new a(1970, 0)),
							o = "-" === e[9] ? 1 : -1,
							p = Number(e[10] || 0),
							q = Number(e[11] || 0);
						return (k > 0 || l > 0 || m > 0 ? 24 : 25) > j && 60 > k && 60 > l && 1e3 > m && h > -1 && 12 > h && 24 > p && 60 > q && i > -1 && i < c(g, h + 1) - c(g, h) && (f = 60 * (24 * (c(g, h) + i) + j + p * o), f = 1e3 * (60 * (f + k + q * o) + l) + m + n, f >= -864e13 && 864e13 >= f) ? f : 0 / 0
					}
					return a.parse.apply(this, arguments)
				}, b
		}(Date), Date.now || (Date.now = function() {
			return (new Date).getTime()
		}), Number.prototype.toFixed && "0.000" === 8e-5.toFixed(3) && "0" !== .9.toFixed(0) && "1.25" === 1.255.toFixed(2) && "1000000000000000128" === 0xde0b6b3a7640080.toFixed(0) || !function() {
			function a(a, b) {
				for (var c = -1; ++c < g;) b += a * h[c], h[c] = b % f, b = Math.floor(b / f)
			}
			function b(a) {
				for (var b = g, c = 0; --b >= 0;) c += h[b], h[b] = Math.floor(c / a), c = c % a * f
			}
			function c() {
				for (var a = g, b = ""; --a >= 0;)
					if ("" !== b || 0 === a || 0 !== h[a]) {
						var c = String(h[a]);
						"" === b ? b = c : b += "0000000".slice(0, 7 - c.length) + c
				}
				return b
			}
			function d(a, b, c) {
				return 0 === b ? c : b % 2 === 1 ? d(a, b - 1, c * a) : d(a * a, b / 2, c)
			}
			function e(a) {
				for (var b = 0; a >= 4096;) b += 12, a /= 4096;
				for (; a >= 2;) b += 1, a /= 2;
				return b
			}
			var f,
				g,
				h;
			f = 1e7, g = 6, h = [ 0, 0, 0, 0, 0, 0 ], Number.prototype.toFixed = function(f) {
				var g,
					h,
					i,
					j,
					k,
					l,
					m,
					n;
				if (g = Number(f), g = g !== g ? 0 : Math.floor(g), 0 > g || g > 20)
					throw new RangeError("Number.toFixed called with invalid number of decimals");
				if (h = Number(this), h !== h) return "NaN";
				if (-1e21 >= h || h >= 1e21) return String(h);
				if (i = "", 0 > h && (i = "-", h = -h), j = "0", h > 1e-21)
					if (k = e(h * d(2, 69, 1)) - 69, l = 0 > k ? h * d(2, -k, 1) : h / d(2, k, 1), l *= 4503599627370496, k = 52 - k, k > 0) {
						for (a(0, l), m = g; m >= 7;) a(1e7, 0), m -= 7;
						for (a(d(10, m, 1), 0), m = k - 1; m >= 23;) b(1 << 23), m -= 23;
						b(1 << m), a(1, 1), b(2), j = c()
					} else a(0, l), a(1 << -k, 0), j = c() + "0.00000000000000000000".slice(2, 2 + g);
				return g > 0 ? (n = j.length, j = g >= n ? i + "0.0000000000000000000".slice(0, g - n + 2) + j : i + j.slice(0, n - g) + "." + j.slice(n - g)) : j = i + j, j
			}
		}();
		var B = String.prototype.split;
		if (2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 0 === "".split(/.?/).length || ".".split(/()()/).length > 1 ? !function() {
				var a = void 0 === /()??/.exec("")[1];
				String.prototype.split = function(b, c) {
					var d = this;
					if (void 0 === b && 0 === c) return [];
					if ("[object RegExp]" !== Object.prototype.toString.call(b)) return B.apply(this, arguments);
					var e,
						f,
						g,
						h,
						i = [],
						j = (b.ignoreCase ? "i" : "") + (b.multiline ? "m" : "") + (b.extended ? "x" : "") + (b.sticky ? "y" : ""),
						k = 0,
						b = new RegExp(b.source, j + "g");
					for (d += "", a || (e = new RegExp("^" + b.source + "$(?!\\s)", j)), c = void 0 === c ? -1 >>> 0 : c >>> 0; (f = b.exec(d)) && (g = f.index + f[0].length, !(g > k && (i.push(d.slice(k, f.index)), !a && f.length > 1 && f[0].replace(e, function() {
							for (var a = 1; a < arguments.length - 2; a++) void 0 === arguments[a] && (f[a] = void 0)
						}), f.length > 1 && f.index < d.length && Array.prototype.push.apply(i, f.slice(1)), h = f[0].length, k = g, i.length >= c)));) b.lastIndex === f.index && b.lastIndex++;
					return k === d.length ? (h || !b.test("")) && i.push("") : i.push(d.slice(k)), i.length > c ? i.slice(0, c) : i
				}
			}() : "0".split(void 0, 0).length && (String.prototype.split = function(a, b) {
				return void 0 === a && 0 === b ? [] : B.apply(this, arguments)
			}), "".substr && "b" !== "0b".substr(-1)) {
			var C = String.prototype.substr;
			String.prototype.substr = function(a, b) {
				return C.call(this, 0 > a && (a = this.length + a) < 0 ? 0 : a, b)
			}
		}
		var D = "	\n\f\r   ᠎             　\u2028\u2029﻿";
		if (!String.prototype.trim || D.trim()) {
			D = "[" + D + "]";
			var E = new RegExp("^" + D + D + "*"),
				F = new RegExp(D + D + "*$");
			String.prototype.trim = function() {
				if (void 0 === this || null === this)
					throw new TypeError("can't convert " + this + " to object");
				return String(this).replace(E, "").replace(F, "")
			}
		}
		var G = function(a) {
			if (null == a)
				throw new TypeError("can't convert " + a + " to object");
			return Object(a)
		}
	}), function(a, b, c) {
		"use strict";
		function d(a) {
			return function() {
				var b,
					c,
					d = arguments[0],
					e = "[" + (a ? a + ":" : "") + d + "] ",
					f = arguments[1],
					g = arguments,
					h = function(a) {
						return "function" == typeof a ? a.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof a ? "undefined" : "string" != typeof a ? JSON.stringify(a) : a
					};
				for (b = e + f.replace(/\{\d+\}/g, function(a) {
						var b,
							c = +a.slice(1, -1);
						return c + 2 < g.length ? (b = g[c + 2], "function" == typeof b ? b.toString().replace(/ ?\{[\s\S]*$/, "") : "undefined" == typeof b ? "undefined" : "string" != typeof b ? R(b) : b) : a
					}), b = b + "\nhttp://errors.angularjs.org/1.2.15/" + (a ? a + "/" : "") + d, c = 2;c < arguments.length; c++) b = b + (2 == c ? "?" : "&") + "p" + (c - 2) + "=" + encodeURIComponent(h(arguments[c]));
				return new Error(b)
			}
		}
		function e(a) {
			if (null == a || A(a)) return !1;
			var b = a.length;
			return 1 === a.nodeType && b ? !0 : u(a) || x(a) || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
		}
		function f(a, b, c) {
			var d;
			if (a)
				if (y(a))
					for (d in a) "prototype" == d || "length" == d || "name" == d || a.hasOwnProperty && !a.hasOwnProperty(d) || b.call(c, a[d], d);
				else if (a.forEach && a.forEach !== f) a.forEach(b, c);
				else if (e(a))
					for (d = 0; d < a.length; d++) b.call(c, a[d], d);
				else
					for (d in a) a.hasOwnProperty(d) && b.call(c, a[d], d);
			return a
		}
		function g(a) {
			var b = [];
			for (var c in a) a.hasOwnProperty(c) && b.push(c);
			return b.sort()
		}
		function h(a, b, c) {
			for (var d = g(a), e = 0; e < d.length; e++) b.call(c, a[d[e]], d[e]);
			return d
		}
		function i(a) {
			return function(b, c) {
				a(c, b)
			}
		}
		function j() {
			for (var a, b = yd.length; b;) {
				if (b--, a = yd[b].charCodeAt(0), 57 == a) return yd[b] = "A", yd.join("");
				if (90 != a) return yd[b] = String.fromCharCode(a + 1), yd.join("");
				yd[b] = "0"
			}
			return yd.unshift("0"), yd.join("")
		}
		function k(a, b) {
			b ? a.$$hashKey = b :
				delete a.$$hashKey
		}
		function l(a) {
			var b = a.$$hashKey;
			return f(arguments, function(b) {
					b !== a && f(b, function(b, c) {
						a[c] = b
					})
				}), k(a, b), a
		}
		function m(a) {
			return parseInt(a, 10)
		}
		function n(a, b) {
			return l(new (l(function() {}, {
				prototype : a
			})), b)
		}
		function o() {
		}
		function p(a) {
			return a
		}
		function q(a) {
			return function() {
				return a
			}
		}
		function r(a) {
			return "undefined" == typeof a
		}
		function s(a) {
			return "undefined" != typeof a
		}
		function t(a) {
			return null != a && "object" == typeof a
		}
		function u(a) {
			return "string" == typeof a
		}
		function v(a) {
			return "number" == typeof a
		}
		function w(a) {
			return "[object Date]" === vd.call(a)
		}
		function x(a) {
			return "[object Array]" === vd.call(a)
		}
		function y(a) {
			return "function" == typeof a
		}
		function z(a) {
			return "[object RegExp]" === vd.call(a)
		}
		function A(a) {
			return a && a.document && a.location && a.alert && a.setInterval
		}
		function B(a) {
			return a && a.$evalAsync && a.$watch
		}
		function C(a) {
			return "[object File]" === vd.call(a)
		}
		function D(a) {
			return "[object Blob]" === vd.call(a)
		}
		function E(a) {
			return !(!a || !(a.nodeName || a.prop && a.attr && a.find))
		}
		function F(a, b, c) {
			var d = [];
			return f(a, function(a, e, f) {
					d.push(b.call(c, a, e, f))
				}), d
		}
		function G(a, b) {
			return -1 != H(a, b)
		}
		function H(a, b) {
			if (a.indexOf) return a.indexOf(b);
			for (var c = 0; c < a.length; c++)
				if (b === a[c]) return c;
			return -1
		}
		function I(a, b) {
			var c = H(a, b);
			return c >= 0 && a.splice(c, 1), b
		}
		function J(a, b) {
			if (A(a) || B(a))
				throw wd("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
			if (b) {
				if (a === b)
					throw wd("cpi", "Can't copy! Source and destination are identical.");
				if (x(a)) {
					b.length = 0;
					for (var c = 0; c < a.length; c++) b.push(J(a[c]))
				} else {
					var d = b.$$hashKey;
					f(b, function(a, c) {
						delete b[c]
					});
					for (var e in a) b[e] = J(a[e]);
					k(b, d)
				}
			} else b = a, a && (x(a) ? b = J(a, []) : w(a) ? b = new Date(a.getTime()) : z(a) ? b = new RegExp(a.source) : t(a) && (b = J(a, {})));
			return b
		}
		function K(a, b) {
			b = b || {};
			for (var c in a) !a.hasOwnProperty(c) || "$" === c.charAt(0) && "$" === c.charAt(1) || (b[c] = a[c]);
			return b
		}
		function L(a, b) {
			if (a === b) return !0;
			if (null === a || null === b) return !1;
			if (a !== a && b !== b) return !0;
			var d,
				e,
				f,
				g = typeof a,
				h = typeof b;
			if (g == h && "object" == g) {
				if (!x(a)) {
					if (w(a)) return w(b) && a.getTime() == b.getTime();
					if (z(a) && z(b)) return a.toString() == b.toString();
					if (B(a) || B(b) || A(a) || A(b) || x(b)) return !1;
					f = {};
					for (e in a)
						if ("$" !== e.charAt(0) && !y(a[e])) {
							if (!L(a[e], b[e])) return !1;
							f[e] = !0
					}
					for (e in b)
						if (!f.hasOwnProperty(e) && "$" !== e.charAt(0) && b[e] !== c && !y(b[e])) return !1;
					return !0
				}
				if (!x(b)) return !1;
				if ((d = a.length) == b.length) {
					for (e = 0; d > e; e++)
						if (!L(a[e], b[e])) return !1;
					return !0
				}
			}
			return !1
		}
		function M() {
			return b.securityPolicy && b.securityPolicy.isActive || b.querySelector && !(!b.querySelector("[ng-csp]") && !b.querySelector("[data-ng-csp]"))
		}
		function N(a, b, c) {
			return a.concat(td.call(b, c))
		}
		function O(a, b) {
			return td.call(a, b || 0)
		}
		function P(a, b) {
			var c = arguments.length > 2 ? O(arguments, 2) : [];
			return !y(b) || b instanceof RegExp ? b : c.length ? function() {
				return arguments.length ? b.apply(a, c.concat(td.call(arguments, 0))) : b.apply(a, c)
			} : function() {
				return arguments.length ? b.apply(a, arguments) : b.call(a)
			}
		}
		function Q(a, d) {
			var e = d;
			return "string" == typeof a && "$" === a.charAt(0) ? e = c : A(d) ? e = "$WINDOW" : d && b === d ? e = "$DOCUMENT" : B(d) && (e = "$SCOPE"), e
		}
		function R(a, b) {
			return "undefined" == typeof a ? c : JSON.stringify(a, Q, b ? "  " : null)
		}
		function S(a) {
			return u(a) ? JSON.parse(a) : a
		}
		function T(a) {
			if ("function" == typeof a)
				a = !0;
			else if (a && 0 !== a.length) {
				var b = jd("" + a);
				a = !("f" == b || "0" == b || "false" == b || "no" == b || "n" == b || "[]" == b)
			} else
				a = !1;
			return a
		}
		function U(a) {
			a = pd(a).clone();try {
				a.empty()
			} catch (b) {} var c = 3,
				d = pd("<div>").append(a).html();
			try {
				return a[0].nodeType === c ? jd(d) : d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
					return "<" + jd(b)
				})
			} catch (b) {
				return jd(d)
			}
		}
		function V(a) {
			try {
				return decodeURIComponent(a)
			} catch (b) {}
		}
		function W(a) {
			var b,
				c,
				d = {};
			return f((a || "").split("&"), function(a) {
					if (a && (b = a.split("="), c = V(b[0]), s(c))) {
						var e = s(b[1]) ? V(b[1]) : !0;
						d[c] ? x(d[c]) ? d[c].push(e) : d[c] = [ d[c], e ] : d[c] = e
					}
				}), d
		}
		function X(a) {
			var b = [];
			return f(a, function(a, c) {
					x(a) ? f(a, function(a) {
						b.push(Z(c, !0) + (a === !0 ? "" : "=" + Z(a, !0)))
					}) : b.push(Z(c, !0) + (a === !0 ? "" : "=" + Z(a, !0)))
				}), b.length ? b.join("&") : ""
		}
		function Y(a) {
			return Z(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
		}
		function Z(a, b) {
			return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, b ? "%20" : "+")
		}
		function $(a, c) {
			function d(a) {
				a && h.push(a)
			}
			var e,
				g,
				h = [ a ],
				i = [ "ng:app", "ng-app", "x-ng-app", "data-ng-app" ],
				j = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
			f(i, function(c) {
				i[c] = !0, d(b.getElementById(c)), c = c.replace(":", "\\:"), a.querySelectorAll && (f(a.querySelectorAll("." + c), d), f(a.querySelectorAll("." + c + "\\:"), d), f(a.querySelectorAll("[" + c + "]"), d))
			}), f(h, function(a) {
				if (!e) {
					var b = " " + a.className + " ",
						c = j.exec(b);
					c ? (e = a, g = (c[2] || "").replace(/\s+/g, ",")) : f(a.attributes, function(b) {
						!e && i[b.name] && (e = a, g = b.value)
					})
				}
			}), e && c(e, g ? [ g ] : [])
		}
		function _(c, d) {
			var e = function() {
					if (c = pd(c), c.injector()) {
						var a = c[0] === b ? "document" : U(c);
						throw wd("btstrpd", "App Already Bootstrapped with this Element '{0}'", a)
					}
					d = d || [], d.unshift([ "$provide", function(a) {
						a.value("$rootElement", c)
					} ]), d.unshift("ng");
					var e = Fb(d);
					return e.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", "$animate", function(a, b, c, d) {
							a.$apply(function() {
								b.data("$injector", d), c(b)(a)
							})
						} ]), e
				},
				g = /^NG_DEFER_BOOTSTRAP!/;
			return a && !g.test(a.name) ? e() : (a.name = a.name.replace(g, ""), void (xd.resumeBootstrap = function(a) {
				f(a, function(a) {
					d.push(a)
				}), e()
			}))
		}
		function ab(a, b) {
			return b = b || "_", a.replace(Ad, function(a, c) {
					return (c ? b : "") + a.toLowerCase()
				})
		}
		function bb() {
			qd = a.jQuery, qd ? (pd = qd, l(qd.fn, {
				scope : Kd.scope,
				isolateScope : Kd.isolateScope,
				controller : Kd.controller,
				injector : Kd.injector,
				inheritedData : Kd.inheritedData
			}), lb("remove", !0, !0, !1), lb("empty", !1, !1, !1), lb("html", !1, !1, !0)) : pd = mb, xd.element = pd
		}
		function cb(a, b, c) {
			if (!a)
				throw wd("areq", "Argument '{0}' is {1}", b || "?", c || "required");
			return a
		}
		function db(a, b, c) {
			return c && x(a) && (a = a[a.length - 1]), cb(y(a), b, "not a function, got " + (a && "object" == typeof a ? a.constructor.name || "Object" : typeof a)), a
		}
		function eb(a, b) {
			if ("hasOwnProperty" === a)
				throw wd("badname", "hasOwnProperty is not a valid {0} name", b)
		}
		function fb(a, b, c) {
			if (!b) return a;
			for (var d, e = b.split("."), f = a, g = e.length, h = 0; g > h; h++) d = e[h], a && (a = (f = a)[d]);
			return !c && y(a) ? P(f, a) : a
		}
		function gb(a) {
			var b = a[0],
				c = a[a.length - 1];
			if (b === c) return pd(b);
			var d = b,
				e = [ d ];
			do {
				if (d = d.nextSibling, !d) break;
				e.push(d)
			} while (d !== c);
			return pd(e)
		}
		function hb(a) {
			function b(a, b, c) {
				return a[b] || (a[b] = c())
			}
			var c = d("$injector"),
				e = d("ng"),
				f = b(a, "angular", Object);
			return f.$$minErr = f.$$minErr || d, b(f, "module", function() {
					var a = {};
					return function(d, f, g) {
						var h = function(a, b) {
							if ("hasOwnProperty" === a)
								throw e("badname", "hasOwnProperty is not a valid {0} name", b)
						};
						return h(d, "module"), f && a.hasOwnProperty(d) && (a[d] = null), b(a, d, function() {
								function a(a, c, d) {
									return function() {
										return b[d || "push"]([ a, c, arguments ]), i
									}
								}
								if (!f)
									throw c("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", d);
								var b = [],
									e = [],
									h = a("$injector", "invoke"),
									i = {
										_invokeQueue : b,
										_runBlocks : e,
										requires : f,
										name : d,
										provider : a("$provide", "provider"),
										factory : a("$provide", "factory"),
										service : a("$provide", "service"),
										value : a("$provide", "value"),
										constant : a("$provide", "constant", "unshift"),
										animation : a("$animateProvider", "register"),
										filter : a("$filterProvider", "register"),
										controller : a("$controllerProvider", "register"),
										directive : a("$compileProvider", "directive"),
										config : h,
										run : function(a) {
											return e.push(a), this
										}
									};
								return g && h(g), i
							})
					}
				})
		}
		function ib(b) {
			l(b, {
				bootstrap : _,
				copy : J,
				extend : l,
				equals : L,
				element : pd,
				forEach : f,
				injector : Fb,
				noop : o,
				bind : P,
				toJson : R,
				fromJson : S,
				identity : p,
				isUndefined : r,
				isDefined : s,
				isString : u,
				isFunction : y,
				isObject : t,
				isNumber : v,
				isElement : E,
				isArray : x,
				version : Bd,
				isDate : w,
				lowercase : jd,
				uppercase : ld,
				callbacks : {
					counter : 0
				},
				$$minErr : d,
				$$csp : M
			}), rd = hb(a);try {
				rd("ngLocale")
			} catch (c) {
				rd("ngLocale", []).provider("$locale", ac)
			} rd("ng", [ "ngLocale" ], [ "$provide", function(a) {
				a.provider({
					$$sanitizeUri : Bc
				}), a.provider("$compile", Mb).directive({
					a : qe,
					input : Ae,
					textarea : Ae,
					form : ue,
					script : hf,
					select : lf,
					style : nf,
					option : mf,
					ngBind : Me,
					ngBindHtml : Oe,
					ngBindTemplate : Ne,
					ngClass : Pe,
					ngClassEven : Re,
					ngClassOdd : Qe,
					ngCloak : Se,
					ngController : Te,
					ngForm : ve,
					ngHide : bf,
					ngIf : Ve,
					ngInclude : We,
					ngInit : Ye,
					ngNonBindable : Ze,
					ngPluralize : $e,
					ngRepeat : _e,
					ngShow : af,
					ngStyle : cf,
					ngSwitch : df,
					ngSwitchWhen : ef,
					ngSwitchDefault : ff,
					ngOptions : kf,
					ngTransclude : gf,
					ngModel : Ge,
					ngList : Je,
					ngChange : He,
					required : Ie,
					ngRequired : Ie,
					ngValue : Le
				}).directive({
					ngInclude : Xe
				}).directive(re).directive(Ue), a.provider({
					$anchorScroll : Gb,
					$animate : Td,
					$browser : Jb,
					$cacheFactory : Kb,
					$controller : Pb,
					$document : Qb,
					$exceptionHandler : Rb,
					$filter : Mc,
					$interpolate : $b,
					$interval : _b,
					$http : Wb,
					$httpBackend : Yb,
					$location : nc,
					$log : oc,
					$parse : wc,
					$rootScope : Ac,
					$q : xc,
					$sce : Gc,
					$sceDelegate : Fc,
					$sniffer : Hc,
					$templateCache : Lb,
					$timeout : Ic,
					$window : Lc,
					$$rAF : zc,
					$$asyncCallback : Hb
				})
			} ])
		}
		function jb() {
			return ++Ed
		}
		function kb(a) {
			return a.replace(Hd, function(a, b, c, d) {
				return d ? c.toUpperCase() : c
			}).replace(Id, "Moz$1")
		}
		function lb(a, b, c, d) {
			function e(a) {
				var e,
					g,
					h,
					i,
					j,
					k,
					l,
					m = c && a ? [ this.filter(a) ] : [ this ],
					n = b;
				if (!d || null != a)
					for (; m.length;)
						for (e = m.shift(), g = 0, h = e.length; h > g; g++)
							for (i = pd(e[g]), n ? i.triggerHandler("$destroy") : n = !n, j = 0, k = (l = i.children()).length; k > j; j++) m.push(qd(l[j]));
				return f.apply(this, arguments)
			}
			var f = qd.fn[a];
			f = f.$original || f, e.$original = f, qd.fn[a] = e
		}
		function mb(a) {
			if (a instanceof mb) return a;
			if (u(a) && (a = zd(a)), !(this instanceof mb)) {
				if (u(a) && "<" != a.charAt(0))
					throw Jd("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
				return new mb(a)
			}
			if (u(a)) {
				var c = b.createElement("div");
				c.innerHTML = "<div>&#160;</div>" + a, c.removeChild(c.firstChild), wb(this, c.childNodes);
				var d = pd(b.createDocumentFragment());
				d.append(this)
			} else wb(this, a)
		}
		function nb(a) {
			return a.cloneNode(!0)
		}
		function ob(a) {
			qb(a);
			for (var b = 0, c = a.childNodes || []; b < c.length; b++) ob(c[b])
		}
		function pb(a, b, c, d) {
			if (s(d))
				throw Jd("offargs", "jqLite#off() does not support the `selector` argument");
			var e = rb(a, "events"),
				g = rb(a, "handle");
			g && (r(b) ? f(e, function(b, c) {
				Gd(a, c, b),
				delete e[c]
			}) : f(b.split(" "), function(b) {
				r(c) ? (Gd(a, b, e[b]),
				delete e[b]
					) : I(e[b] || [], c)
			}))
		}
		function qb(a, b) {
			var d = a[Dd],
				e = Cd[d];
			if (e) {
				if (b) return void
					delete Cd[d].data[b];
				e.handle && (e.events.$destroy && e.handle({}, "$destroy"), pb(a)),
				delete Cd[d]
				, a[Dd] = c
			}
		}
		function rb(a, b, c) {
			var d = a[Dd],
				e = Cd[d || -1];
			return s(c) ? (e || (a[Dd] = d = jb(), e = Cd[d] = {}), void (e[b] = c)) : e && e[b]
		}
		function sb(a, b, c) {
			var d = rb(a, "data"),
				e = s(c),
				f = !e && s(b),
				g = f && !t(b);
			if (d || g || rb(a, "data", d = {}), e)
				d[b] = c;else {
				if (!f) return d;
				if (g) return d && d[b];
				l(d, b)
			}
		}
		function tb(a, b) {
			return a.getAttribute ? (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") > -1 : !1
		}
		function ub(a, b) {
			b && a.setAttribute && f(b.split(" "), function(b) {
				a.setAttribute("class", zd((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + zd(b) + " ", " ")))
			})
		}
		function vb(a, b) {
			if (b && a.setAttribute) {
				var c = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
				f(b.split(" "), function(a) {
					a = zd(a), -1 === c.indexOf(" " + a + " ") && (c += a + " ")
				}), a.setAttribute("class", zd(c))
			}
		}
		function wb(a, b) {
			if (b) {
				b = b.nodeName || !s(b.length) || A(b) ? [ b ] : b;
				for (var c = 0; c < b.length; c++) a.push(b[c])
			}
		}
		function xb(a, b) {
			return yb(a, "$" + (b || "ngController") + "Controller")
		}
		function yb(a, b, d) {
			a = pd(a), 9 == a[0].nodeType && (a = a.find("html"));
			for (var e = x(b) ? b : [ b ]; a.length;) {
				for (var f = a[0], g = 0, h = e.length; h > g; g++)
					if ((d = a.data(e[g])) !== c) return d;
				a = pd(f.parentNode || 11 === f.nodeType && f.host)
			}
		}
		function zb(a) {
			for (var b = 0, c = a.childNodes; b < c.length; b++) ob(c[b]);
			for (; a.firstChild;) a.removeChild(a.firstChild)
		}
		function Ab(a, b) {
			var c = Ld[b.toLowerCase()];
			return c && Md[a.nodeName] && c
		}
		function Bb(a, c) {
			var d = function(d, e) {
				if (d.preventDefault || (d.preventDefault = function() {
						d.returnValue = !1
					}), d.stopPropagation || (d.stopPropagation = function() {
						d.cancelBubble = !0
					}), d.target || (d.target = d.srcElement || b), r(d.defaultPrevented)) {
					var g = d.preventDefault;
					d.preventDefault = function() {
						d.defaultPrevented = !0, g.call(d)
					}, d.defaultPrevented = !1
				}
				d.isDefaultPrevented = function() {
					return d.defaultPrevented || d.returnValue === !1
				};
				var h = K(c[e || d.type] || []);
				f(h, function(b) {
					b.call(a, d)
				}), 8 >= od ? (d.preventDefault = null, d.stopPropagation = null, d.isDefaultPrevented = null) : (
					delete d.preventDefault
					,
					delete d.stopPropagation
					,
					delete d.isDefaultPrevented
					)
			};
			return d.elem = a, d
		}
		function Cb(a) {
			var b,
				d = typeof a;
			return "object" == d && null !== a ? "function" == typeof (b = a.$$hashKey) ? b = a.$$hashKey() : b === c && (b = a.$$hashKey = j()) : b = a, d + ":" + b
		}
		function Db(a) {
			f(a, this.put, this)
		}
		function Eb(a) {
			var b,
				c,
				d,
				e;
			return "function" == typeof a ? (b = a.$inject) || (b = [], a.length && (c = a.toString().replace(Qd, ""), d = c.match(Nd), f(d[1].split(Od), function(a) {
					a.replace(Pd, function(a, c, d) {
						b.push(d)
					})
				})), a.$inject = b) : x(a) ? (e = a.length - 1, db(a[e], "fn"), b = a.slice(0, e)) : db(a, "fn", !0), b
		}
		function Fb(a) {
			function b(a) {
				return function(b, c) {
					return t(b) ? void f(b, i(a)) : a(b, c)
				}
			}
			function c(a, b) {
				if (eb(a, "service"), (y(b) || x(b)) && (b = v.instantiate(b)), !b.$get)
					throw Rd("pget", "Provider '{0}' must define $get factory method.", a);
				return s[a + n] = b
			}
			function d(a, b) {
				return c(a, {
					$get : b
				})
			}
			function e(a, b) {
				return d(a, [ "$injector", function(a) {
					return a.instantiate(b)
				} ])
			}
			function g(a, b) {
				return d(a, q(b))
			}
			function h(a, b) {
				eb(a, "constant"), s[a] = b, w[a] = b
			}
			function j(a, b) {
				var c = v.get(a + n),
					d = c.$get;
				c.$get = function() {
					var a = z.invoke(d, c);
					return z.invoke(b, null, {
						$delegate : a
					})
				}
			}
			function k(a) {
				var b,
					c,
					d,
					e,
					g = [];
				return f(a, function(a) {
						if (!r.get(a)) {
							r.put(a, !0);try {
								if (u(a))
									for (b = rd(a), g = g.concat(k(b.requires)).concat(b._runBlocks), c = b._invokeQueue, d = 0, e = c.length; e > d; d++) {
										var f = c[d],
											h = v.get(f[0]);
										h[f[1]].apply(h, f[2])
								}
								else
									y(a) ? g.push(v.invoke(a)) : x(a) ? g.push(v.invoke(a)) : db(a, "module")
							} catch (i) {
								throw x(a) && (a = a[a.length - 1]), i.message && i.stack && -1 == i.stack.indexOf(i.message) && (i = i.message + "\n" + i.stack), Rd("modulerr", "Failed to instantiate module {0} due to:\n{1}", a, i.stack || i.message || i)
							}
						}
					}), g
			}
			function l(a, b) {
				function c(c) {
					if (a.hasOwnProperty(c)) {
						if (a[c] === m)
							throw Rd("cdep", "Circular dependency found: {0}", p.join(" <- "));
						return a[c]
					}
					try {
						return p.unshift(c), a[c] = m, a[c] = b(c)
					} catch (d) {
						throw a[c] === m &&
						delete a[c]
						, d
					} finally {
						p.shift()
					}
				}
				function d(a, b, d) {
					var e,
						f,
						g,
						h = [],
						i = Eb(a);
					for (f = 0, e = i.length; e > f; f++) {
						if (g = i[f], "string" != typeof g)
							throw Rd("itkn", "Incorrect injection token! Expected service name as string, got {0}", g);
						h.push(d && d.hasOwnProperty(g) ? d[g] : c(g))
					}
					return a.$inject || (a = a[e]), a.apply(b, h)
				}
				function e(a, b) {
					var c,
						e,
						f = function() {};
					return f.prototype = (x(a) ? a[a.length - 1] : a).prototype, c = new f, e = d(a, c, b), t(e) || y(e) ? e : c
				}
				return {
					invoke : d,
					instantiate : e,
					get : c,
					annotate : Eb,
					has : function(b) {
						return s.hasOwnProperty(b + n) || a.hasOwnProperty(b)
					}
				}
			}
			var m = {},
				n = "Provider",
				p = [],
				r = new Db,
				s = {
					$provide : {
						provider : b(c),
						factory : b(d),
						service : b(e),
						value : b(g),
						constant : b(h),
						decorator : j
					}
				},
				v = s.$injector = l(s, function() {
					throw Rd("unpr", "Unknown provider: {0}", p.join(" <- "))
				}),
				w = {},
				z = w.$injector = l(w, function(a) {
					var b = v.get(a + n);
					return z.invoke(b.$get, b)
				});
			return f(k(a), function(a) {
					z.invoke(a || o)
				}), z
		}
		function Gb() {
			var a = !0;
			this.disableAutoScrolling = function() {
				a = !1
			}, this.$get = [ "$window", "$location", "$rootScope", function(b, c, d) {
				function e(a) {
					var b = null;
					return f(a, function(a) {
							b || "a" !== jd(a.nodeName) || (b = a)
						}), b
				}
				function g() {
					var a,
						d = c.hash();
					d ? (a = h.getElementById(d)) ? a.scrollIntoView() : (a = e(h.getElementsByName(d))) ? a.scrollIntoView() : "top" === d && b.scrollTo(0, 0) : b.scrollTo(0, 0)
				}
				var h = b.document;
				return a && d.$watch(function() {
						return c.hash()
					}, function() {
						d.$evalAsync(g)
					}), g
			} ]
		}
		function Hb() {
			this.$get = [ "$$rAF", "$timeout", function(a, b) {
				return a.supported ? function(b) {
					return a(b)
				} : function(a) {
					return b(a, 0, !1)
				}
			} ]
		}
		function Ib(a, b, d, e) {
			function g(a) {
				try {
					a.apply(null, O(arguments, 1))
				} finally {
					if (s--, 0 === s)
						for (; t.length;) try {
								t.pop()()
							} catch (b) {
								d.error(b)
					}
				}
			}
			function h(a, b) {
				!function c() {
					f(w, function(a) {
						a()
					}), v = b(c, a)
				}()
			}
			function i() {
				z = null, x != j.url() && (x = j.url(), f(A, function(a) {
					a(j.url())
				}))
			}
			var j = this,
				k = b[0],
				l = a.location,
				m = a.history,
				n = a.setTimeout,
				p = a.clearTimeout,
				q = {};
			j.isMock = !1;var s = 0,
				t = [];
			j.$$completeOutstandingRequest = g, j.$$incOutstandingRequestCount = function() {
				s++
			}, j.notifyWhenNoOutstandingRequests = function(a) {
				f(w, function(a) {
					a()
				}), 0 === s ? a() : t.push(a)
			};var v,
				w = [];
			j.addPollFn = function(a) {
				return r(v) && h(100, n), w.push(a), a
			};var x = l.href,
				y = b.find("base"),
				z = null;
			j.url = function(b, c) {
				if (l !== a.location && (l = a.location), m !== a.history && (m = a.history), b) {
					if (x == b) return;
					return x = b, e.history ? c ? m.replaceState(null, "", b) : (m.pushState(null, "", b), y.attr("href", y.attr("href"))) : (z = b, c ? l.replace(b) : l.href = b), j
				}
				return z || l.href.replace(/%27/g, "'")
			};var A = [],
				B = !1;
			j.onUrlChange = function(b) {
				return B || (e.history && pd(a).on("popstate", i), e.hashchange ? pd(a).on("hashchange", i) : j.addPollFn(i), B = !0), A.push(b), b
			}, j.baseHref = function() {
				var a = y.attr("href");
				return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
			};var C = {},
				D = "",
				E = j.baseHref();
			j.cookies = function(a, b) {
				var e,
					f,
					g,
					h,
					i;
				if (!a) {
					if (k.cookie !== D)
						for (D = k.cookie, f = D.split("; "), C = {}, h = 0; h < f.length; h++) g = f[h], i = g.indexOf("="), i > 0 && (a = unescape(g.substring(0, i)), C[a] === c && (C[a] = unescape(g.substring(i + 1))));
					return C
				}
				b === c ? k.cookie = escape(a) + "=;path=" + E + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : u(b) && (e = (k.cookie = escape(a) + "=" + escape(b) + ";path=" + E).length + 1, e > 4096 && d.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + e + " > 4096 bytes)!"))
			}, j.defer = function(a, b) {
				var c;
				return s++, c = n(function() {
						delete q[c]
						, g(a)
					}, b || 0), q[c] = !0, c
			}, j.defer.cancel = function(a) {
				return q[a] ? (
					delete q[a]
					, p(a), g(o), !0) : !1
			}
		}
		function Jb() {
			this.$get = [ "$window", "$log", "$sniffer", "$document", function(a, b, c, d) {
				return new Ib(a, d, b, c)
			} ]
		}
		function Kb() {
			this.$get = function() {
				function a(a, c) {
					function e(a) {
						a != m && (n ? n == a && (n = a.n) : n = a, f(a.n, a.p), f(a, m), m = a, m.n = null)
					}
					function f(a, b) {
						a != b && (a && (a.p = b), b && (b.n = a))
					}
					if (a in b)
						throw d("$cacheFactory")("iid", "CacheId '{0}' is already taken!", a);
					var g = 0,
						h = l({}, c, {
							id : a
						}),
						i = {},
						j = c && c.capacity || Number.MAX_VALUE,
						k = {},
						m = null,
						n = null;
					return b[a] = {
						put : function(a, b) {
							if (j < Number.MAX_VALUE) {
								var c = k[a] || (k[a] = {
									key : a
								});
								e(c)
							}
							if (!r(b)) return a in i || g++, i[a] = b, g > j && this.remove(n.key), b
						},
						get : function(a) {
							if (j < Number.MAX_VALUE) {
								var b = k[a];
								if (!b) return;
								e(b)
							}
							return i[a]
						},
						remove : function(a) {
							if (j < Number.MAX_VALUE) {
								var b = k[a];
								if (!b) return;
								b == m && (m = b.p), b == n && (n = b.n), f(b.n, b.p),
								delete k[a]
							}
							delete i[a]
							, g--
						},
						removeAll : function() {
							i = {}, g = 0, k = {}, m = n = null
						},
						destroy : function() {
							i = null, h = null, k = null,
							delete b[a]
						},
						info : function() {
							return l({}, h, {
								size : g
							})
						}
					}
				}
				var b = {};
				return a.info = function() {
						var a = {};
						return f(b, function(b, c) {
								a[c] = b.info()
							}), a
					}, a.get = function(a) {
						return b[a]
					}, a
			}
		}
		function Lb() {
			this.$get = [ "$cacheFactory", function(a) {
				return a("templates")
			} ]
		}
		function Mb(a, d) {
			var e = {},
				g = "Directive",
				h = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,
				j = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/,
				k = /^<\s*(tr|th|td|thead|tbody|tfoot)(\s+[^>]*)?>/i,
				m = /^(on[a-z]+|formaction)$/;
			this.directive = function o(b, c) {
				return eb(b, "directive"), u(b) ? (cb(c, "directiveFactory"), e.hasOwnProperty(b) || (e[b] = [], a.factory(b + g, [ "$injector", "$exceptionHandler", function(a, c) {
						var d = [];
						return f(e[b], function(e, f) {
								try {
									var g = a.invoke(e);
									y(g) ? g = {
										compile : q(g)
									} : !g.compile && g.link && (g.compile = q(g.link)), g.priority = g.priority || 0, g.index = f, g.name = g.name || b, g.require = g.require || g.controller && g.name, g.restrict = g.restrict || "A", d.push(g)
								} catch (h) {
									c(h)
								}
							}), d
					} ])), e[b].push(c)) : f(b, i(o)), this
			}, this.aHrefSanitizationWhitelist = function(a) {
				return s(a) ? (d.aHrefSanitizationWhitelist(a), this) : d.aHrefSanitizationWhitelist()
			}, this.imgSrcSanitizationWhitelist = function(a) {
				return s(a) ? (d.imgSrcSanitizationWhitelist(a), this) : d.imgSrcSanitizationWhitelist()
			}, this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(a, d, i, o, r, s, v, w, z, A, B, C) {
				function D(a, b, c, d, e) {
					a instanceof pd || (a = pd(a)), f(a, function(b, c) {
						3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = b = pd(b).wrap("<span></span>").parent()[0])
					});var g = F(a, b, a, c, d, e);
					return E(a, "ng-scope"), function(b, c, d) {
							cb(b, "scope");
							var e = c ? Kd.clone.call(a) : a;
							f(d, function(a, b) {
								e.data("$" + b + "Controller", a)
							});
							for (var h = 0, i = e.length; i > h; h++) {
								var j = e[h],
									k = j.nodeType;
								(1 === k || 9 === k) && e.eq(h).data("$scope", b)
							}
							return c && c(e, b), g && g(b, e, e), e
					}
				}
				function E(a, b) {
					try {
						a.addClass(b)
					} catch (c) {}
				}
				function F(a, b, d, e, f, g) {
					function h(a, d, e, f) {
						var g,
							h,
							i,
							j,
							k,
							l,
							m,
							n,
							p,
							q = d.length,
							r = new Array(q);
						for (m = 0; q > m; m++) r[m] = d[m];
						for (m = 0, p = 0, n = o.length; n > m; p++) i = r[p], g = o[m++], h = o[m++], j = pd(i), g ? (g.scope ? (k = a.$new(), j.data("$scope", k)) : k = a, l = g.transclude, l || !f && b ? g(h, k, i, e, G(a, l || b)) : g(h, k, i, e, f)) : h && h(a, i.childNodes, c, f)
					}
					for (var i, j, k, l, m, n, o = [], p = 0; p < a.length; p++) i = new bb, j = H(a[p], [], i, 0 === p ? e : c, f), k = j.length ? M(j, a[p], i, b, d, null, [], [], g) : null, k && k.scope && E(pd(a[p]), "ng-scope"), m = k && k.terminal || !(l = a[p].childNodes) || !l.length ? null : F(l, k ? k.transclude : b), o.push(k, m), n = n || k || m, g = null;
					return n ? h : null
				}
				function G(a, b) {
					return function(c, d, e) {
						var f = !1;
						c || (c = a.$new(), c.$$transcluded = !0, f = !0);
						var g = b(c, d, e);
						return f && g.on("$destroy", P(c, c.$destroy)), g
					}
				}
				function H(a, b, c, d, e) {
					var f,
						g,
						i = a.nodeType,
						k = c.$attr;
					switch (i) {
					case 1:
						Q(b, Nb(sd(a).toLowerCase()), "E", d, e);
						for (var l, m, n, o, p, q = a.attributes, r = 0, s = q && q.length; s > r; r++) {
							var t = !1,
								v = !1;
							if (l = q[r], !od || od >= 8 || l.specified) {
								m = l.name, o = Nb(m), gb.test(o) && (m = ab(o.substr(6), "-"));
								var w = o.replace(/(Start|End)$/, "");
								o === w + "Start" && (t = m, v = m.substr(0, m.length - 5) + "end", m = m.substr(0, m.length - 6)), n = Nb(m.toLowerCase()), k[n] = m, c[n] = p = zd(l.value), Ab(a, n) && (c[n] = !0), Z(a, b, p, n), Q(b, n, "A", d, e, t, v)
							}
						}
						if (g = a.className, u(g) && "" !== g)
							for (; f = j.exec(g);) n = Nb(f[2]), Q(b, n, "C", d, e) && (c[n] = zd(f[3])), g = g.substr(f.index + f[0].length);
						break;case 3:
						X(b, a.nodeValue);
						break;case 8:
						try {
							f = h.exec(a.nodeValue), f && (n = Nb(f[1]), Q(b, n, "M", d, e) && (c[n] = zd(f[2])))
						} catch (x) {}
					}
					return b.sort(V), b
				}
				function I(a, b, c) {
					var d = [],
						e = 0;
					if (b && a.hasAttribute && a.hasAttribute(b)) {
						do {
							if (!a)
								throw Ud("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", b, c);
							1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--), d.push(a), a = a.nextSibling
						} while (e > 0)
					} else d.push(a);
					return pd(d)
				}
				function J(a, b, c) {
					return function(d, e, f, g, h) {
						return e = I(e[0], b, c), a(d, e, f, g, h)
					}
				}
				function M(a, e, g, h, j, k, l, m, n) {
					function o(a, b, c, d) {
						a && (c && (a = J(a, c, d)), a.require = w.require, (M === w || w.$$isolateScope) && (a = _(a, {
							isolateScope : !0
						})), l.push(a)), b && (c && (b = J(b, c, d)), b.require = w.require, (M === w || w.$$isolateScope) && (b = _(b, {
							isolateScope : !0
						})), m.push(b))
					}
					function p(a, b, c) {
						var d,
							e = "data",
							g = !1;
						if (u(a)) {
							for (; "^" == (d = a.charAt(0)) || "?" == d;) a = a.substr(1), "^" == d && (e = "inheritedData"), g = g || "?" == d;
							if (d = null, c && "data" === e && (d = c[a]), d = d || b[e]("$" + a + "Controller"), !d && !g)
								throw Ud("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", a, z);
							return d
						}
						return x(a) && (d = [], f(a, function(a) {
								d.push(p(a, b, c))
							})), d
					}
					function q(a, b, h, j, k) {
						function n(a, b) {
							var d;
							return arguments.length < 2 && (b = a, a = c), X && (d = z), k(a, b, d)
						}
						var o,
							q,
							r,
							t,
							u,
							w,
							x,
							y,
							z = {};
						if (o = e === h ? g : K(g, new bb(pd(h), g.$attr)), q = o.$$element, M) {
							var A = /^\s*([@=&])(\??)\s*(\w*)\s*$/,
								B = pd(h);
							x = b.$new(!0), P && P === M.$$originalDirective ? B.data("$isolateScope", x) : B.data("$isolateScopeNoTemplate", x), E(B, "ng-isolate-scope"), f(M.scope, function(a, c) {
								var e,
									f,
									g,
									h,
									i = a.match(A) || [],
									j = i[3] || c,
									k = "?" == i[2],
									l = i[1];
								switch (x.$$isolateBindings[c] = l + j, l) {
								case "@":
									o.$observe(j, function(a) {
										x[c] = a
									}), o.$$observers[j].$$scope = b, o[j] && (x[c] = d(o[j])(b));
									break;case "=":
									if (k && !o[j]) return;
									f = s(o[j]), h = f.literal ? L : function(a, b) {
										return a === b
									}, g = f.assign || function() {
										throw e = x[c] = f(b), Ud("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", o[j], M.name)
									}, e = x[c] = f(b), x.$watch(function() {
										var a = f(b);
										return h(a, x[c]) || (h(a, e) ? g(b, a = x[c]) : x[c] = a), e = a
									}, null, f.literal);
									break;case "&":
									f = s(o[j]), x[c] = function(a) {
										return f(b, a)
									};
									break;default:
									throw Ud("iscp", "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}", M.name, c, a)
								}
							})
						}
						for (y = k && n, G && f(G, function(a) {
								var c,
									d = {
										$scope : a === M || a.$$isolateScope ? x : b,
										$element : q,
										$attrs : o,
										$transclude : y
									};
								w = a.controller, "@" == w && (w = o[a.name]), c = v(w, d), z[a.name] = c, X || q.data("$" + a.name + "Controller", c), a.controllerAs && (d.$scope[a.controllerAs] = c)
							}), r = 0, t = l.length;t > r; r++) try {
								u = l[r], u(u.isolateScope ? x : b, q, o, u.require && p(u.require, q, z), y)
							} catch (C) {
								i(C, U(q))
						} var D = b;
						for (M && (M.template || null === M.templateUrl) && (D = x), a && a(D, h.childNodes, c, k), r = m.length - 1; r >= 0; r--) try {
								u = m[r], u(u.isolateScope ? x : b, q, o, u.require && p(u.require, q, z), y)
							} catch (C) {
								i(C, U(q))
						}
					}
					n = n || {};
					for (var r, w, z, A, B, C, F = -Number.MAX_VALUE, G = n.controllerDirectives, M = n.newIsolateScopeDirective, P = n.templateDirective, Q = n.nonTlbTranscludeDirective, V = !1, X = n.hasElementTranscludeDirective, Y = g.$$element = pd(e), Z = k, ab = h, cb = 0, db = a.length; db > cb; cb++) {
						w = a[cb];var eb = w.$$start,
							gb = w.$$end;
						if (eb && (Y = I(e, eb, gb)), A = c, F > w.priority) break;
						if ((C = w.scope) && (r = r || w, w.templateUrl || (W("new/isolated scope", M, w, Y), t(C) && (M = w))), z = w.name, !w.templateUrl && w.controller && (C = w.controller, G = G || {}, W("'" + z + "' controller", G[z], w, Y), G[z] = w), (C = w.transclude) && (V = !0, w.$$tlb || (W("transclusion", Q, w, Y), Q = w), "element" == C ? (X = !0, F = w.priority, A = I(e, eb, gb), Y = g.$$element = pd(b.createComment(" " + z + ": " + g[z] + " ")), e = Y[0], $(j, pd(O(A)), e), ab = D(A, h, F, Z && Z.name, {
								nonTlbTranscludeDirective : Q
							})) : (A = pd(nb(e)).contents(), Y.empty(), ab = D(A, h))), w.template)
							if (W("template", P, w, Y), P = w, C = y(w.template) ? w.template(Y, g) : w.template, C = fb(C), w.replace) {
								if (Z = w, A = S(C), e = A[0], 1 != A.length || 1 !== e.nodeType)
									throw Ud("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", z, "");
								$(j, Y, e);
								var hb = {
										$attr : {}
									},
									ib = H(e, [], hb),
									jb = a.splice(cb + 1, a.length - (cb + 1));
								M && N(ib), a = a.concat(ib).concat(jb), R(g, hb), db = a.length
							} else Y.html(C);
						if (w.templateUrl) W("template", P, w, Y), P = w, w.replace && (Z = w), q = T(a.splice(cb, a.length - cb), Y, g, j, ab, l, m, {
								controllerDirectives : G,
								newIsolateScopeDirective : M,
								templateDirective : P,
								nonTlbTranscludeDirective : Q
							}), db = a.length;
						else if (w.compile) try {
								B = w.compile(Y, g, ab), y(B) ? o(null, B, eb, gb) : B && o(B.pre, B.post, eb, gb)
							} catch (kb) {
								i(kb, U(Y))
						}
						w.terminal && (q.terminal = !0, F = Math.max(F, w.priority))
					}
					return q.scope = r && r.scope === !0, q.transclude = V && ab, n.hasElementTranscludeDirective = X, q
				}
				function N(a) {
					for (var b = 0, c = a.length; c > b; b++) a[b] = n(a[b], {
							$$isolateScope : !0
						})
				}
				function Q(b, d, f, h, j, k, l) {
					if (d === j) return null;
					var m = null;
					if (e.hasOwnProperty(d))
						for (var o, p = a.get(d + g), q = 0, r = p.length; r > q; q++) try {
								o = p[q], (h === c || h > o.priority) && -1 != o.restrict.indexOf(f) && (k && (o = n(o, {
									$$start : k,
									$$end : l
								})), b.push(o), m = o)
							} catch (s) {
								i(s)
					} return m
				}
				function R(a, b) {
					var c = b.$attr,
						d = a.$attr,
						e = a.$$element;
					f(a, function(d, e) {
						"$" != e.charAt(0) && (b[e] && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]))
					}), f(b, function(b, f) {
						"class" == f ? (E(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f])
					})
				}
				function S(a) {
					var b;
					if (a = zd(a), b = k.exec(a)) {
						b = b[1].toLowerCase();
						var c = pd("<table>" + a + "</table>");
						return /(thead|tbody|tfoot)/.test(b) ? c.children(b) : (c = c.children("tbody"), "tr" === b ? c.children("tr") : c.children("tr").contents())
					}
					return pd("<div>" + a + "</div>").contents()
				}
				function T(a, b, c, d, e, g, h, i) {
					var j,
						k,
						m = [],
						n = b[0],
						p = a.shift(),
						q = l({}, p, {
							templateUrl : null,
							transclude : null,
							replace : null,
							$$originalDirective : p
						}),
						s = y(p.templateUrl) ? p.templateUrl(b, c) : p.templateUrl;
					return b.empty(), o.get(A.getTrustedResourceUrl(s), {
							cache : r
						}).success(function(l) {
							var o,
								r,
								u,
								v;
							if (l = fb(l), p.replace) {
								if (u = S(l), o = u[0], 1 != u.length || 1 !== o.nodeType)
									throw Ud("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", p.name, s);
								r = {
									$attr : {}
								}, $(d, b, o);
								var w = H(o, [], r);
								t(p.scope) && N(w), a = w.concat(a), R(c, r)
							} else o = n, b.html(l);
							for (a.unshift(q), j = M(a, o, c, e, b, p, g, h, i), f(d, function(a, c) {
									a == o && (d[c] = b[0])
								}), k = F(b[0].childNodes, e); m.length;) {
								var x = m.shift(),
									y = m.shift(),
									z = m.shift(),
									A = m.shift(),
									B = b[0];
								if (y !== n) {
									var C = y.className;
									i.hasElementTranscludeDirective && p.replace || (B = nb(o)), $(z, pd(y), B), E(pd(B), C)
								}
								v = j.transclude ? G(x, j.transclude) : A, j(k, x, B, d, v)
							}
							m = null
						}).error(function(a, b, c, d) {
							throw Ud("tpload", "Failed to load template: {0}", d.url)
						}), function(a, b, c, d, e) {
							m ? (m.push(b), m.push(c), m.push(d), m.push(e)) : j(k, b, c, d, e)
					}
				}
				function V(a, b) {
					var c = b.priority - a.priority;
					return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
				}
				function W(a, b, c, d) {
					if (b)
						throw Ud("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", b.name, c.name, a, U(d))
				}
				function X(a, b) {
					var c = d(b, !0);
					c && a.push({
						priority : 0,
						compile : q(function(a, b) {
							var d = b.parent(),
								e = d.data("$binding") || [];
							e.push(c), E(d.data("$binding", e), "ng-binding"), a.$watch(c, function(a) {
								b[0].nodeValue = a
							})
						})
					})
				}
				function Y(a, b) {
					if ("srcdoc" == b) return A.HTML;
					var c = sd(a);
					return "xlinkHref" == b || "FORM" == c && "action" == b || "IMG" != c && ("src" == b || "ngSrc" == b) ? A.RESOURCE_URL : void 0
				}
				function Z(a, b, c, e) {
					var f = d(c, !0);
					if (f) {
						if ("multiple" === e && "SELECT" === sd(a))
							throw Ud("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", U(a));
						b.push({
							priority : 100,
							compile : function() {
								return {
									pre : function(b, c, g) {
										var h = g.$$observers || (g.$$observers = {});
										if (m.test(e))
											throw Ud("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
										f = d(g[e], !0, Y(a, e)), f && (g[e] = f(b), (h[e] || (h[e] = [])).$$inter = !0, (g.$$observers && g.$$observers[e].$$scope || b).$watch(f, function(a, b) {
											"class" === e && a != b ? g.$updateClass(a, b) : g.$set(e, a)
										}))
									}
								}
							}
						})
					}
				}
				function $(a, c, d) {
					var e,
						f,
						g = c[0],
						h = c.length,
						i = g.parentNode;
					if (a)
						for (e = 0, f = a.length; f > e; e++)
							if (a[e] == g) {
								a[e++] = d;
								for (var j = e, k = j + h - 1, l = a.length; l > j; j++, k++) l > k ? a[j] = a[k] :
										delete a[j];
								a.length -= h - 1;break
					}
					i && i.replaceChild(d, g);var m = b.createDocumentFragment();
					m.appendChild(g), d[pd.expando] = g[pd.expando];
					for (var n = 1, o = c.length; o > n; n++) {
						var p = c[n];
						pd(p).remove(), m.appendChild(p),
						delete c[n]
					}
					c[0] = d, c.length = 1
				}
				function _(a, b) {
					return l(function() {
						return a.apply(null, arguments)
					}, a, b)
				}
				var bb = function(a, b) {
					this.$$element = a, this.$attr = b || {}
				};
				bb.prototype = {
					$normalize : Nb,
					$addClass : function(a) {
						a && a.length > 0 && B.addClass(this.$$element, a)
					},
					$removeClass : function(a) {
						a && a.length > 0 && B.removeClass(this.$$element, a)
					},
					$updateClass : function(a, b) {
						var c = Ob(a, b),
							d = Ob(b, a);
						0 === c.length ? B.removeClass(this.$$element, d) : 0 === d.length ? B.addClass(this.$$element, c) : B.setClass(this.$$element, c, d)
					},
					$set : function(a, b, d, e) {
						var g,
							h = Ab(this.$$element[0], a);
						h && (this.$$element.prop(a, b), e = h), this[a] = b, e ? this.$attr[a] = e : (e = this.$attr[a], e || (this.$attr[a] = e = ab(a, "-"))), g = sd(this.$$element), ("A" === g && "href" === a || "IMG" === g && "src" === a) && (this[a] = b = C(b, "src" === a)), d !== !1 && (null === b || b === c ? this.$$element.removeAttr(e) : this.$$element.attr(e, b));
						var j = this.$$observers;
						j && f(j[a], function(a) {
							try {
								a(b)
							} catch (c) {
								i(c)
							}
						})
					},
					$observe : function(a, b) {
						var c = this,
							d = c.$$observers || (c.$$observers = {}),
							e = d[a] || (d[a] = []);
						return e.push(b), w.$evalAsync(function() {
								e.$$inter || b(c[a])
							}), b
					}
				};
				var db = d.startSymbol(),
					eb = d.endSymbol(),
					fb = "{{" == db || "}}" == eb ? p : function(a) {
						return a.replace(/\{\{/g, db).replace(/}}/g, eb)
					},
					gb = /^ngAttr[A-Z]/;
				return D
			} ]
		}
		function Nb(a) {
			return kb(a.replace(Vd, ""))
		}
		function Ob(a, b) {
			var c = "",
				d = a.split(/\s+/),
				e = b.split(/\s+/);
			a:
			for (var f = 0; f < d.length; f++) {
				for (var g = d[f], h = 0; h < e.length; h++)
					if (g == e[h]) continue a;
				c += (c.length > 0 ? " " : "") + g
			}
			return c
		}
		function Pb() {
			var a = {},
				b = /^(\S+)(\s+as\s+(\w+))?$/;
			this.register = function(b, c) {
				eb(b, "controller"), t(b) ? l(a, b) : a[b] = c
			}, this.$get = [ "$injector", "$window", function(c, e) {
				return function(f, g) {
					var h,
						i,
						j,
						k;
					if (u(f) && (i = f.match(b), j = i[1], k = i[3], f = a.hasOwnProperty(j) ? a[j] : fb(g.$scope, j, !0) || fb(e, j, !0), db(f, j, !0)), h = c.instantiate(f, g), k) {
						if (!g || "object" != typeof g.$scope)
							throw d("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", j || f.name, k);
						g.$scope[k] = h
					}
					return h
				}
			} ]
		}
		function Qb() {
			this.$get = [ "$window", function(a) {
				return pd(a.document)
			} ]
		}
		function Rb() {
			this.$get = [ "$log", function(a) {
				return function() {
					a.error.apply(a, arguments)
				}
			} ]
		}
		function Sb(a) {
			var b,
				c,
				d,
				e = {};
			return a ? (f(a.split("\n"), function(a) {
				d = a.indexOf(":"), b = jd(zd(a.substr(0, d))), c = zd(a.substr(d + 1)), b && (e[b] ? e[b] += ", " + c : e[b] = c)
			}), e) : e
		}
		function Tb(a) {
			var b = t(a) ? a : c;
			return function(c) {
				return b || (b = Sb(a)), c ? b[jd(c)] || null : b
			}
		}
		function Ub(a, b, c) {
			return y(c) ? c(a, b) : (f(c, function(c) {
				a = c(a, b)
			}), a)
		}
		function Vb(a) {
			return a >= 200 && 300 > a
		}
		function Wb() {
			var a = /^\s*(\[|\{[^\{])/,
				b = /[\}\]]\s*$/,
				d = /^\)\]\}',?\n/,
				e = {
					"Content-Type" : "application/json;charset=utf-8"
				},
				g = this.defaults = {
					transformResponse : [ function(c) {
						return u(c) && (c = c.replace(d, ""), a.test(c) && b.test(c) && (c = S(c))), c
					} ],
					transformRequest : [ function(a) {
						return !t(a) || C(a) || D(a) ? a : R(a)
					} ],
					headers : {
						common : {
							Accept : "application/json, text/plain, */*"
						},
						post : J(e),
						put : J(e),
						patch : J(e)
					},
					xsrfCookieName : "XSRF-TOKEN",
					xsrfHeaderName : "X-XSRF-TOKEN"
				},
				i = this.interceptors = [],
				j = this.responseInterceptors = [];
			this.$get = [ "$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(a, b, d, e, k, m) {
				function n(a) {
					function d(a) {
						var b = l({}, a, {
							data : Ub(a.data, a.headers, h.transformResponse)
						});
						return Vb(a.status) ? b : k.reject(b)
					}
					function e(a) {
						function b(a) {
							var b;
							f(a, function(c, d) {
								y(c) && (b = c(), null != b ? a[d] = b :
									delete a[d]
								)
							})
						}
						var c,
							d,
							e,
							h = g.headers,
							i = l({}, a.headers);
						h = l({}, h.common, h[jd(a.method)]), b(h), b(i);a:
						for (c in h) {
							d = jd(c);
							for (e in i)
								if (jd(e) === d) continue a;
							i[c] = h[c]
						}
						return i
					}
					var h = {
							method : "get",
							transformRequest : g.transformRequest,
							transformResponse : g.transformResponse
						},
						i = e(a);
					l(h, a), h.headers = i, h.method = ld(h.method);var j = Kc(h.url) ? b.cookies()[h.xsrfCookieName || g.xsrfCookieName] : c;
					j && (i[h.xsrfHeaderName || g.xsrfHeaderName] = j);var m = function(a) {
							i = a.headers;
							var b = Ub(a.data, Tb(i), a.transformRequest);
							return r(a.data) && f(i, function(a, b) {
									"content-type" === jd(b) &&
									delete i[b]
								}), r(a.withCredentials) && !r(g.withCredentials) && (a.withCredentials = g.withCredentials), q(a, b, i).then(d, d)
						},
						n = [ m, c ],
						o = k.when(h);
					for (f(z, function(a) {
							(a.request || a.requestError) && n.unshift(a.request, a.requestError), (a.response || a.responseError) && n.push(a.response, a.responseError)
						}); n.length;) {
						var p = n.shift(),
							s = n.shift();
						o = o.then(p, s)
					}
					return o.success = function(a) {
							return o.then(function(b) {
									a(b.data, b.status, b.headers, h)
								}), o
						}, o.error = function(a) {
							return o.then(null, function(b) {
									a(b.data, b.status, b.headers, h)
								}), o
						}, o
				}
				function o() {
					f(arguments, function(a) {
						n[a] = function(b, c) {
							return n(l(c || {}, {
								method : a,
								url : b
							}))
						}
					})
				}
				function p() {
					f(arguments, function(a) {
						n[a] = function(b, c, d) {
							return n(l(d || {}, {
								method : a,
								url : b,
								data : c
							}))
						}
					})
				}
				function q(b, c, d) {
					function f(a, b, c) {
						j && (Vb(a) ? j.put(p, [ a, b, Sb(c) ]) : j.remove(p)), h(b, a, c), e.$$phase || e.$apply()
					}
					function h(a, c, d) {
						c = Math.max(c, 0), (Vb(c) ? m.resolve : m.reject)({
							data : a,
							status : c,
							headers : Tb(d),
							config : b
						})
					}
					function i() {
						var a = H(n.pendingRequests, b);
						-1 !== a && n.pendingRequests.splice(a, 1)
					}
					var j,
						l,
						m = k.defer(),
						o = m.promise,
						p = v(b.url, b.params);
					if (n.pendingRequests.push(b), o.then(i, i), (b.cache || g.cache) && b.cache !== !1 && "GET" == b.method && (j = t(b.cache) ? b.cache : t(g.cache) ? g.cache : w), j)
						if (l = j.get(p), s(l)) {
							if (l.then) return l.then(i, i), l;
							x(l) ? h(l[1], l[0], J(l[2])) : h(l, 200, {})
						} else j.put(p, o);
					return r(l) && a(b.method, p, c, f, d, b.timeout, b.withCredentials, b.responseType), o
				}
				function v(a, b) {
					if (!b) return a;
					var c = [];
					return h(b, function(a, b) {
							null === a || r(a) || (x(a) || (a = [ a ]), f(a, function(a) {
								t(a) && (a = R(a)), c.push(Z(b) + "=" + Z(a))
							}))
						}), c.length > 0 && (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&")), a
				}
				var w = d("$http"),
					z = [];
				return f(i, function(a) {
						z.unshift(u(a) ? m.get(a) : m.invoke(a))
					}), f(j, function(a, b) {
						var c = u(a) ? m.get(a) : m.invoke(a);
						z.splice(b, 0, {
							response : function(a) {
								return c(k.when(a))
							},
							responseError : function(a) {
								return c(k.reject(a))
							}
						})
					}), n.pendingRequests = [], o("get", "delete", "head", "jsonp"), p("post", "put"), n.defaults = g, n
			} ]
		}
		function Xb(b) {
			if (8 >= od && (!b.match(/^(get|post|head|put|delete|options)$/i) || !a.XMLHttpRequest)) return new a.ActiveXObject("Microsoft.XMLHTTP");
			if (a.XMLHttpRequest) return new a.XMLHttpRequest;
			throw d("$httpBackend")("noxhr", "This browser does not support XMLHttpRequest.")
		}
		function Yb() {
			this.$get = [ "$browser", "$window", "$document", function(a, b, c) {
				return Zb(a, Xb, a.defer, b.angular.callbacks, c[0])
			} ]
		}
		function Zb(a, b, c, d, e) {
			function g(a, b) {
				var c = e.createElement("script"),
					d = function() {
						c.onreadystatechange = c.onload = c.onerror = null, e.body.removeChild(c), b && b()
					};
				return c.type = "text/javascript", c.src = a, od && 8 >= od ? c.onreadystatechange = function() {
						/loaded|complete/.test(c.readyState) && d()
					} : c.onload = c.onerror = function() {
						d()
					}, e.body.appendChild(c), d
			}
			var h = -1;
			return function(e, i, j, k, l, m, n, p) {
				function q() {
					t = h, v && v(), w && w.abort()
				}
				function r(b, d, e, f) {
					y && c.cancel(y), v = w = null, 0 === d && (d = e ? 200 : "file" == Jc(i).protocol ? 404 : 0), d = 1223 == d ? 204 : d, b(d, e, f), a.$$completeOutstandingRequest(o)
				}
				var t;
				if (a.$$incOutstandingRequestCount(), i = i || a.url(), "jsonp" == jd(e)) {
					var u = "_" + (d.counter++).toString(36);
					d[u] = function(a) {
						d[u].data = a
					};
					var v = g(i.replace("JSON_CALLBACK", "angular.callbacks." + u), function() {
						d[u].data ? r(k, 200, d[u].data) : r(k, t || -2), d[u] = xd.noop
					})
				} else {
					var w = b(e);
					if (w.open(e, i, !0), f(l, function(a, b) {
							s(a) && w.setRequestHeader(b, a)
						}), w.onreadystatechange = function() {
							if (w && 4 == w.readyState) {
								var a = null,
									b = null;
								t !== h && (a = w.getAllResponseHeaders(), b = "response" in w ? w.response : w.responseText), r(k, t || w.status, b, a)
							}
						}, n && (w.withCredentials = !0), p) try {
							w.responseType = p
						} catch (x) {
							if ("json" !== p)
								throw x
					} w.send(j || null)
				}
				if (m > 0) var y = c(q, m);
				else m && m.then && m.then(q)
			}
		}
		function $b() {
			var a = "{{",
				b = "}}";
			this.startSymbol = function(b) {
				return b ? (a = b, this) : a
			}, this.endSymbol = function(a) {
				return a ? (b = a, this) : b
			}, this.$get = [ "$parse", "$exceptionHandler", "$sce", function(c, d, e) {
				function f(f, i, j) {
					for (var k, l, m, n, o = 0, p = [], q = f.length, s = !1, t = []; q > o;) -1 != (k = f.indexOf(a, o)) && -1 != (l = f.indexOf(b, k + g)) ? (o != k && p.push(f.substring(o, k)), p.push(m = c(n = f.substring(k + g, l))), m.exp = n, o = l + h, s = !0) : (o != q && p.push(f.substring(o)), o = q);
					if ((q = p.length) || (p.push(""), q = 1), j && p.length > 1)
						throw Wd("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", f);
					return !i || s ? (t.length = q, m = function(a) {
						try {
							for (var b, c = 0, g = q; g > c; c++) "function" == typeof (b = p[c]) && (b = b(a), b = j ? e.getTrusted(j, b) : e.valueOf(b), null === b || r(b) ? b = "" : "string" != typeof b && (b = R(b))), t[c] = b;
							return t.join("")
						} catch (h) {
							var i = Wd("interr", "Can't interpolate: {0}\n{1}", f, h.toString());
							d(i)
						}
					}, m.exp = f, m.parts = p, m) : void 0
				}
				var g = a.length,
					h = b.length;
				return f.startSymbol = function() {
						return a
					}, f.endSymbol = function() {
						return b
					}, f
			} ]
		}
		function _b() {
			this.$get = [ "$rootScope", "$window", "$q", function(a, b, c) {
				function d(d, f, g, h) {
					var i = b.setInterval,
						j = b.clearInterval,
						k = c.defer(),
						l = k.promise,
						m = 0,
						n = s(h) && !h;
					return g = s(g) ? g : 0, l.then(null, null, d), l.$$intervalId = i(function() {
							k.notify(m++), g > 0 && m >= g && (k.resolve(m), j(l.$$intervalId),
							delete e[l.$$intervalId]
							), n || a.$apply()
						}, f), e[l.$$intervalId] = k, l
				}
				var e = {};
				return d.cancel = function(a) {
						return a && a.$$intervalId in e ? (e[a.$$intervalId].reject("canceled"), clearInterval(a.$$intervalId),
						delete e[a.$$intervalId]
						, !0) : !1
					}, d
			} ]
		}
		function ac() {
			this.$get = function() {
				return {
					id : "en-us",
					NUMBER_FORMATS : {
						DECIMAL_SEP : ".",
						GROUP_SEP : ",",
						PATTERNS : [ {
							minInt : 1,
							minFrac : 0,
							maxFrac : 3,
							posPre : "",
							posSuf : "",
							negPre : "-",
							negSuf : "",
							gSize : 3,
							lgSize : 3
						}, {
							minInt : 1,
							minFrac : 2,
							maxFrac : 2,
							posPre : "¤",
							posSuf : "",
							negPre : "(¤",
							negSuf : ")",
							gSize : 3,
							lgSize : 3
						} ],
						CURRENCY_SYM : "$"
					},
					DATETIME_FORMATS : {
						MONTH : "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
						SHORTMONTH : "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
						DAY : "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
						SHORTDAY : "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
						AMPMS : [ "AM", "PM" ],
						medium : "MMM d, y h:mm:ss a",
						"short" : "M/d/yy h:mm a",
						fullDate : "EEEE, MMMM d, y",
						longDate : "MMMM d, y",
						mediumDate : "MMM d, y",
						shortDate : "M/d/yy",
						mediumTime : "h:mm:ss a",
						shortTime : "h:mm a"
					},
					pluralCat : function(a) {
						return 1 === a ? "one" : "other"
					}
				}
			}
		}
		function bc(a) {
			for (var b = a.split("/"), c = b.length; c--;) b[c] = Y(b[c]);
			return b.join("/")
		}
		function cc(a, b, c) {
			var d = Jc(a, c);
			b.$$protocol = d.protocol, b.$$host = d.hostname, b.$$port = m(d.port) || Yd[d.protocol] || null
		}
		function dc(a, b, c) {
			var d = "/" !== a.charAt(0);
			d && (a = "/" + a);var e = Jc(a, c);
			b.$$path = decodeURIComponent(d && "/" === e.pathname.charAt(0) ? e.pathname.substring(1) : e.pathname), b.$$search = W(e.search), b.$$hash = decodeURIComponent(e.hash), b.$$path && "/" != b.$$path.charAt(0) && (b.$$path = "/" + b.$$path)
		}
		function ec(a, b) {
			return 0 === b.indexOf(a) ? b.substr(a.length) : void 0
		}
		function fc(a) {
			var b = a.indexOf("#");
			return -1 == b ? a : a.substr(0, b)
		}
		function gc(a) {
			return a.substr(0, fc(a).lastIndexOf("/") + 1)
		}
		function hc(a) {
			return a.substring(0, a.indexOf("/", a.indexOf("//") + 2))
		}
		function ic(a, b) {
			this.$$html5 = !0, b = b || "";var d = gc(a);
			cc(a, this, a), this.$$parse = function(b) {
				var c = ec(d, b);
				if (!u(c))
					throw Zd("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', b, d);
				dc(c, this, a), this.$$path || (this.$$path = "/"), this.$$compose()
			}, this.$$compose = function() {
				var a = X(this.$$search),
					b = this.$$hash ? "#" + Y(this.$$hash) : "";
				this.$$url = bc(this.$$path) + (a ? "?" + a : "") + b, this.$$absUrl = d + this.$$url.substr(1)
			}, this.$$rewrite = function(e) {
				var f,
					g;
				return (f = ec(a, e)) !== c ? (g = f, (f = ec(b, f)) !== c ? d + (ec("/", f) || f) : a + g) : (f = ec(d, e)) !== c ? d + f : d == e + "/" ? d : void 0
			}
		}
		function jc(a, b) {
			var c = gc(a);
			cc(a, this, a), this.$$parse = function(d) {
				function e(a, b, c) {
					var d,
						e = /^\/?.*?:(\/.*)/;
					return 0 === b.indexOf(c) && (b = b.replace(c, "")), e.exec(b) ? a : (d = e.exec(a), d ? d[1] : a)
				}
				var f = ec(a, d) || ec(c, d),
					g = "#" == f.charAt(0) ? ec(b, f) : this.$$html5 ? f : "";
				if (!u(g))
					throw Zd("ihshprfx", 'Invalid url "{0}", missing hash prefix "{1}".', d, b);
				dc(g, this, a), this.$$path = e(this.$$path, g, a), this.$$compose()
			}, this.$$compose = function() {
				var c = X(this.$$search),
					d = this.$$hash ? "#" + Y(this.$$hash) : "";
				this.$$url = bc(this.$$path) + (c ? "?" + c : "") + d, this.$$absUrl = a + (this.$$url ? b + this.$$url : "")
			}, this.$$rewrite = function(b) {
				return fc(a) == fc(b) ? b : void 0
			}
		}
		function kc(a, b) {
			this.$$html5 = !0, jc.apply(this, arguments);var c = gc(a);
			this.$$rewrite = function(d) {
				var e;
				return a == fc(d) ? d : (e = ec(c, d)) ? a + b + e : c === d + "/" ? c : void 0
			}
		}
		function lc(a) {
			return function() {
				return this[a]
			}
		}
		function mc(a, b) {
			return function(c) {
				return r(c) ? this[a] : (this[a] = b(c), this.$$compose(), this)
			}
		}
		function nc() {
			var b = "",
				c = !1;
			this.hashPrefix = function(a) {
				return s(a) ? (b = a, this) : b
			}, this.html5Mode = function(a) {
				return s(a) ? (c = a, this) : c
			}, this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", function(d, e, f, g) {
				function h(a) {
					d.$broadcast("$locationChangeSuccess", i.absUrl(), a)
				}
				var i,
					j,
					k,
					l = e.baseHref(),
					m = e.url();
				c ? (k = hc(m) + (l || "/"), j = f.history ? ic : kc) : (k = fc(m), j = jc), i = new j(k, "#" + b), i.$$parse(i.$$rewrite(m)), g.on("click", function(b) {
					if (!b.ctrlKey && !b.metaKey && 2 != b.which) {
						for (var c = pd(b.target); "a" !== jd(c[0].nodeName);)
							if (c[0] === g[0] || !(c = c.parent())[0]) return;
						var f = c.prop("href");
						t(f) && "[object SVGAnimatedString]" === f.toString() && (f = Jc(f.animVal).href);
						var h = i.$$rewrite(f);
						f && !c.attr("target") && h && !b.isDefaultPrevented() && (b.preventDefault(), h != e.url() && (i.$$parse(h), d.$apply(), a.angular["ff-684208-preventDefault"] = !0))
					}
				}), i.absUrl() != m && e.url(i.absUrl(), !0), e.onUrlChange(function(a) {
					i.absUrl() != a && (d.$evalAsync(function() {
						var b = i.absUrl();
						i.$$parse(a), d.$broadcast("$locationChangeStart", a, b).defaultPrevented ? (i.$$parse(b), e.url(b)) : h(b)
					}), d.$$phase || d.$digest())
				});
				var n = 0;
				return d.$watch(function() {
						var a = e.url(),
							b = i.$$replace;
						return n && a == i.absUrl() || (n++, d.$evalAsync(function() {
								d.$broadcast("$locationChangeStart", i.absUrl(), a).defaultPrevented ? i.$$parse(a) : (e.url(i.absUrl(), b), h(a))
							})), i.$$replace = !1, n
					}), i
			} ]
		}
		function oc() {
			var a = !0,
				b = this;
			this.debugEnabled = function(b) {
				return s(b) ? (a = b, this) : a
			}, this.$get = [ "$window", function(c) {
				function d(a) {
					return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)), a
				}
				function e(a) {
					var b = c.console || {},
						e = b[a] || b.log || o,
						g = !1;
					try {
						g = !!e.apply
					} catch (h) {} return g ? function() {
						var a = [];
						return f(arguments, function(b) {
								a.push(d(b))
							}), e.apply(b, a)
					} : function(a, b) {
						e(a, null == b ? "" : b)
					}
				}
				return {
					log : e("log"),
					info : e("info"),
					warn : e("warn"),
					error : e("error"),
					debug : function() {
						var c = e("debug");
						return function() {
							a && c.apply(b, arguments)
						}
					}()
				}
			} ]
		}
		function pc(a, b) {
			if ("constructor" === a)
				throw _d("isecfld", 'Referencing "constructor" field in Angular expressions is disallowed! Expression: {0}', b);
			return a
		}
		function qc(a, b) {
			if (a) {
				if (a.constructor === a)
					throw _d("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", b);
				if (a.document && a.location && a.alert && a.setInterval)
					throw _d("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", b);
				if (a.children && (a.nodeName || a.prop && a.attr && a.find))
					throw _d("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", b)
			}
			return a
		}
		function rc(a, b, d, e, f) {
			f = f || {};
			for (var g, h = b.split("."), i = 0; h.length > 1; i++) {
				g = pc(h.shift(), e);var j = a[g];
				j || (j = {}, a[g] = j), a = j, a.then && f.unwrapPromises && ($d(e), "$$v" in a || !function(a) {
					a.then(function(b) {
						a.$$v = b
					})
				}(a), a.$$v === c && (a.$$v = {}), a = a.$$v)
			}
			return g = pc(h.shift(), e), a[g] = d, d
		}
		function sc(a, b, d, e, f, g, h) {
			return pc(a, g), pc(b, g), pc(d, g), pc(e, g), pc(f, g), h.unwrapPromises ? function(h, i) {
					var j,
						k = i && i.hasOwnProperty(a) ? i : h;
					return null == k ? k : (k = k[a], k && k.then && ($d(g), "$$v" in k || (j = k, j.$$v = c, j.then(function(a) {
						j.$$v = a
					})), k = k.$$v), b ? null == k ? c : (k = k[b], k && k.then && ($d(g), "$$v" in k || (j = k, j.$$v = c, j.then(function(a) {
						j.$$v = a
					})), k = k.$$v), d ? null == k ? c : (k = k[d], k && k.then && ($d(g), "$$v" in k || (j = k, j.$$v = c, j.then(function(a) {
						j.$$v = a
					})), k = k.$$v), e ? null == k ? c : (k = k[e], k && k.then && ($d(g), "$$v" in k || (j = k, j.$$v = c, j.then(function(a) {
						j.$$v = a
					})), k = k.$$v), f ? null == k ? c : (k = k[f], k && k.then && ($d(g), "$$v" in k || (j = k, j.$$v = c, j.then(function(a) {
						j.$$v = a
					})), k = k.$$v), k) : k) : k) : k) : k)
				} : function(g, h) {
					var i = h && h.hasOwnProperty(a) ? h : g;
					return null == i ? i : (i = i[a], b ? null == i ? c : (i = i[b], d ? null == i ? c : (i = i[d], e ? null == i ? c : (i = i[e], f ? null == i ? c : i = i[f] : i) : i) : i) : i)
			}
		}
		function tc(a, b) {
			return pc(a, b), function(b, d) {
					return null == b ? c : (d && d.hasOwnProperty(a) ? d : b)[a]
			}
		}
		function uc(a, b, d) {
			return pc(a, d), pc(b, d), function(d, e) {
					return null == d ? c : (d = (e && e.hasOwnProperty(a) ? e : d)[a], null == d ? c : d[b])
			}
		}
		function vc(a, b, d) {
			if (fe.hasOwnProperty(a)) return fe[a];
			var e,
				g = a.split("."),
				h = g.length;
			if (b.unwrapPromises || 1 !== h)
				if (b.unwrapPromises || 2 !== h)
					if (b.csp)
						e = 6 > h ? sc(g[0], g[1], g[2], g[3], g[4], d, b) : function(a, e) {
							var f,
								i = 0;
							do f = sc(g[i++], g[i++], g[i++], g[i++], g[i++], d, b)(a, e), e = c, a = f; while (h > i);
							return f
						};else {
						var i = "var p;\n";
						f(g, function(a, c) {
							pc(a, d), i += "if(s == null) return undefined;\ns=" + (c ? "s" : '((k&&k.hasOwnProperty("' + a + '"))?k:s)') + '["' + a + '"];\n' + (b.unwrapPromises ? 'if (s && s.then) {\n pw("' + d.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n' : "")
						}), i += "return s;";
						var j = new Function("s", "k", "pw", i);
						j.toString = q(i), e = b.unwrapPromises ? function(a, b) {
							return j(a, b, $d)
						} : j
				}
				else
					e = uc(g[0], g[1], d);
			else
				e = tc(g[0], d);
			return "hasOwnProperty" !== a && (fe[a] = e), e
		}
		function wc() {
			var a = {},
				b = {
					csp : !1,
					unwrapPromises : !1,
					logPromiseWarnings : !0
				};
			this.unwrapPromises = function(a) {
				return s(a) ? (b.unwrapPromises = !!a, this) : b.unwrapPromises
			}, this.logPromiseWarnings = function(a) {
				return s(a) ? (b.logPromiseWarnings = a, this) : b.logPromiseWarnings
			}, this.$get = [ "$filter", "$sniffer", "$log", function(c, d, e) {
				return b.csp = d.csp, $d = function(a) {
						b.logPromiseWarnings && !ae.hasOwnProperty(a) && (ae[a] = !0, e.warn("[$parse] Promise found in the expression `" + a + "`. Automatic unwrapping of promises in Angular expressions is deprecated."))
					}, function(d) {
						var e;
						switch (typeof d) {
						case "string":
							if (a.hasOwnProperty(d)) return a[d];
							var f = new de(b),
								g = new ee(f, c, b);
							return e = g.parse(d, !1), "hasOwnProperty" !== d && (a[d] = e), e;case "function":
							return d;default:
							return o
						}
				}
			} ]
		}
		function xc() {
			this.$get = [ "$rootScope", "$exceptionHandler", function(a, b) {
				return yc(function(b) {
					a.$evalAsync(b)
				}, b)
			} ]
		}
		function yc(a, b) {
			function d(a) {
				return a
			}
			function e(a) {
				return j(a)
			}
			function g(a) {
				var b = h(),
					c = 0,
					d = x(a) ? [] : {};
				return f(a, function(a, e) {
						c++, i(a).then(function(a) {
							d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d))
						}, function(a) {
							d.hasOwnProperty(e) || b.reject(a)
						})
					}), 0 === c && b.resolve(d), b.promise
			}
			var h = function() {
					var f,
						g,
						j = [];
					return g = {
						resolve : function(b) {
							if (j) {
								var d = j;
								j = c, f = i(b), d.length && a(function() {
									for (var a, b = 0, c = d.length; c > b; b++) a = d[b], f.then(a[0], a[1], a[2])
								})
							}
						},
						reject : function(a) {
							g.resolve(k(a))
						},
						notify : function(b) {
							if (j) {
								var c = j;
								j.length && a(function() {
									for (var a, d = 0, e = c.length; e > d; d++) a = c[d], a[2](b)
								})
							}
						},
						promise : {
							then : function(a, c, g) {
								var i = h(),
									k = function(c) {
										try {
											i.resolve((y(a) ? a : d)(c))
										} catch (e) {
											i.reject(e), b(e)
										}
									},
									l = function(a) {
										try {
											i.resolve((y(c) ? c : e)(a))
										} catch (d) {
											i.reject(d), b(d)
										}
									},
									m = function(a) {
										try {
											i.notify((y(g) ? g : d)(a))
										} catch (c) {
											b(c)
										}
									};
								return j ? j.push([ k, l, m ]) : f.then(k, l, m), i.promise
							},
							"catch" : function(a) {
								return this.then(null, a)
							},
							"finally" : function(a) {
								function b(a, b) {
									var c = h();
									return b ? c.resolve(a) : c.reject(a), c.promise
								}
								function c(c, e) {
									var f = null;
									try {
										f = (a || d)()
									} catch (g) {
										return b(g, !1)
									} return f && y(f.then) ? f.then(function() {
										return b(c, e)
									}, function(a) {
										return b(a, !1)
									}) : b(c, e)
								}
								return this.then(function(a) {
									return c(a, !0)
								}, function(a) {
									return c(a, !1)
								})
							}
						}
					}
				},
				i = function(b) {
					return b && y(b.then) ? b : {
						then : function(c) {
							var d = h();
							return a(function() {
									d.resolve(c(b))
								}), d.promise
						}
					}
				},
				j = function(a) {
					var b = h();
					return b.reject(a), b.promise
				},
				k = function(c) {
					return {
						then : function(d, f) {
							var g = h();
							return a(function() {
									try {
										g.resolve((y(f) ? f : e)(c))
									} catch (a) {
										g.reject(a), b(a)
									}
								}), g.promise
						}
					}
				},
				l = function(c, f, g, k) {
					var l,
						m = h(),
						n = function(a) {
							try {
								return (y(f) ? f : d)(a)
							} catch (c) {
								return b(c), j(c)
							}
						},
						o = function(a) {
							try {
								return (y(g) ? g : e)(a)
							} catch (c) {
								return b(c), j(c)
							}
						},
						p = function(a) {
							try {
								return (y(k) ? k : d)(a)
							} catch (c) {
								b(c)
							}
						};
					return a(function() {
							i(c).then(function(a) {
								l || (l = !0, m.resolve(i(a).then(n, o, p)))
							}, function(a) {
								l || (l = !0, m.resolve(o(a)))
							}, function(a) {
								l || m.notify(p(a))
							})
						}), m.promise
				};
			return {
				defer : h,
				reject : j,
				when : l,
				all : g
			}
		}
		function zc() {
			this.$get = [ "$window", "$timeout", function(a, b) {
				var c = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame,
					d = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || a.webkitCancelRequestAnimationFrame,
					e = !!c,
					f = e ? function(a) {
						var b = c(a);
						return function() {
							d(b)
						}
					} : function(a) {
						var c = b(a, 16.66, !1);
						return function() {
							b.cancel(c)
						}
					};
				return f.supported = e, f
			} ]
		}
		function Ac() {
			var a = 10,
				b = d("$rootScope"),
				c = null;
			this.digestTtl = function(b) {
				return arguments.length && (a = b), a
			}, this.$get = [ "$injector", "$exceptionHandler", "$parse", "$browser", function(d, g, h, i) {
				function k() {
					this.$id = j(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this["this"] = this.$root = this, this.$$destroyed = !1, this.$$asyncQueue = [], this.$$postDigestQueue = [], this.$$listeners = {}, this.$$listenerCount = {}, this.$$isolateBindings = {}
				}
				function l(a) {
					if (r.$$phase)
						throw b("inprog", "{0} already in progress", r.$$phase);
					r.$$phase = a
				}
				function m() {
					r.$$phase = null
				}
				function n(a, b) {
					var c = h(a);
					return db(c, b), c
				}
				function p(a, b, c) {
					do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] &&
						delete a.$$listenerCount[c];
					while (a = a.$parent)
				}
				function q() {
				}
				k.prototype = {
					constructor : k,
					$new : function(a) {
						var b,
							c;
						return a ? (c = new k, c.$root = this.$root, c.$$asyncQueue = this.$$asyncQueue, c.$$postDigestQueue = this.$$postDigestQueue) : (b = function() {}, b.prototype = this, c = new b, c.$id = j()), c["this"] = c, c.$$listeners = {}, c.$$listenerCount = {}, c.$parent = this, c.$$watchers = c.$$nextSibling = c.$$childHead = c.$$childTail = null, c.$$prevSibling = this.$$childTail, this.$$childHead ? (this.$$childTail.$$nextSibling = c, this.$$childTail = c) : this.$$childHead = this.$$childTail = c, c
					},
					$watch : function(a, b, d) {
						var e = this,
							f = n(a, "watch"),
							g = e.$$watchers,
							h = {
								fn : b,
								last : q,
								get : f,
								exp : a,
								eq : !!d
							};
						if (c = null, !y(b)) {
							var i = n(b || o, "listener");
							h.fn = function(a, b, c) {
								i(c)
							}
						}
						if ("string" == typeof a && f.constant) {
							var j = h.fn;
							h.fn = function(a, b, c) {
								j.call(this, a, b, c), I(g, h)
							}
						}
						return g || (g = e.$$watchers = []), g.unshift(h), function() {
								I(g, h), c = null
						}
					},
					$watchCollection : function(a, b) {
						function c() {
							f = m(j);var a,
								b;
							if (t(f))
								if (e(f)) {
									g !== n && (g = n, q = g.length = 0, l++), a = f.length, q !== a && (l++, g.length = q = a);
									for (var c = 0; a > c; c++) {
										var d = g[c] !== g[c] && f[c] !== f[c];
										d || g[c] === f[c] || (l++, g[c] = f[c])
									}
								} else {
									g !== o && (g = o = {}, q = 0, l++), a = 0;
									for (b in f) f.hasOwnProperty(b) && (a++, g.hasOwnProperty(b) ? g[b] !== f[b] && (l++, g[b] = f[b]) : (q++, g[b] = f[b], l++));
									if (q > a) {
										l++;
										for (b in g) g.hasOwnProperty(b) && !f.hasOwnProperty(b) && (q--,
											delete g[b]
										)
									}
							}
							else g !== f && (g = f, l++);
							return l
						}
						function d() {
							if (p ? (p = !1, b(f, f, j)) : b(f, i, j), k)
								if (t(f))
									if (e(f)) {
										i = new Array(f.length);
										for (var a = 0; a < f.length; a++) i[a] = f[a]
									} else {
										i = {};
										for (var c in f) kd.call(f, c) && (i[c] = f[c])
								}
								else
									i = f
						}
						var f,
							g,
							i,
							j = this,
							k = b.length > 1,
							l = 0,
							m = h(a),
							n = [],
							o = {},
							p = !0,
							q = 0;
						return this.$watch(c, d)
					},
					$digest : function() {
						var d,
							e,
							f,
							h,
							i,
							j,
							k,
							n,
							o,
							p,
							r,
							s = this.$$asyncQueue,
							t = this.$$postDigestQueue,
							u = a,
							v = this,
							w = [];
						l("$digest"), c = null;
						do {
							for (j = !1, n = v; s.length;) {
								try {
									r = s.shift(), r.scope.$eval(r.expression)
								} catch (x) {
									m(), g(x)
								}
								c = null
							}
							a:
							do {
								if (h = n.$$watchers)
									for (i = h.length; i--;) try {
											if (d = h[i])
												if ((e = d.get(n)) === (f = d.last) || (d.eq ? L(e, f) : "number" == typeof e && "number" == typeof f && isNaN(e) && isNaN(f))) {
													if (d === c) {
														j = !1;break a
													}
												} else j = !0, c = d, d.last = d.eq ? J(e) : e, d.fn(e, f === q ? e : f, n), 5 > u && (o = 4 - u, w[o] || (w[o] = []), p = y(d.exp) ? "fn: " + (d.exp.name || d.exp.toString()) : d.exp, p += "; newVal: " + R(e) + "; oldVal: " + R(f), w[o].push(p))
										} catch (x) {
											m(), g(x)
								}
								if (!(k = n.$$childHead || n !== v && n.$$nextSibling))
									for (; n !== v && !(k = n.$$nextSibling);) n = n.$parent
							} while (n = k);
							if ((j || s.length) && !u--)
								throw m(), b("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", a, R(w))
						} while (j || s.length);
						for (m(); t.length;) try {
								t.shift()()
							} catch (x) {
								g(x)
						}
					},
					$destroy : function() {
						if (!this.$$destroyed) {
							var a = this.$parent;
							this.$broadcast("$destroy"), this.$$destroyed = !0, this !== r && (f(this.$$listenerCount, P(null, p, this)), a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null)
						}
					},
					$eval : function(a, b) {
						return h(a)(this, b)
					},
					$evalAsync : function(a) {
						r.$$phase || r.$$asyncQueue.length || i.defer(function() {
							r.$$asyncQueue.length && r.$digest()
						}), this.$$asyncQueue.push({
							scope : this,
							expression : a
						})
					},
					$$postDigest : function(a) {
						this.$$postDigestQueue.push(a)
					},
					$apply : function(a) {
						try {
							return l("$apply"), this.$eval(a)
						} catch (b) {
							g(b)
						} finally {
							m();try {
								r.$digest()
							} catch (b) {
								throw g(b), b
							}
						}
					},
					$on : function(a, b) {
						var c = this.$$listeners[a];
						c || (this.$$listeners[a] = c = []), c.push(b);
						var d = this;
						do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++; while (d = d.$parent);
						var e = this;
						return function() {
							c[H(c, b)] = null, p(e, 1, a)
						}
					},
					$emit : function(a) {
						var b,
							c,
							d,
							e = [],
							f = this,
							h = !1,
							i = {
								name : a,
								targetScope : f,
								stopPropagation : function() {
									h = !0
								},
								preventDefault : function() {
									i.defaultPrevented = !0
								},
								defaultPrevented : !1
							},
							j = N([ i ], arguments, 1);
						do {
							for (b = f.$$listeners[a] || e, i.currentScope = f, c = 0, d = b.length; d > c; c++)
								if (b[c]) try {
										b[c].apply(null, j)
									} catch (k) {
										g(k)
								} else b.splice(c, 1), c--, d--;
							if (h) return i;
							f = f.$parent
						} while (f);
						return i
					},
					$broadcast : function(a) {
						for (var b, c, d, e = this, f = e, h = e, i = {
									name : a,
									targetScope : e,
									preventDefault : function() {
										i.defaultPrevented = !0
									},
									defaultPrevented : !1
								}, j = N([ i ], arguments, 1); f = h;) {
							for (i.currentScope = f, b = f.$$listeners[a] || [], c = 0, d = b.length; d > c; c++)
								if (b[c]) try {
										b[c].apply(null, j)
									} catch (k) {
										g(k)
								} else b.splice(c, 1), c--, d--;
							if (!(h = f.$$listenerCount[a] && f.$$childHead || f !== e && f.$$nextSibling))
								for (; f !== e && !(h = f.$$nextSibling);) f = f.$parent
						}
						return i
					}
				};
				var r = new k;
				return r
			} ]
		}
		function Bc() {
			var a = /^\s*(https?|ftp|mailto|tel|file):/,
				b = /^\s*(https?|ftp|file):|data:image\//;
			this.aHrefSanitizationWhitelist = function(b) {
				return s(b) ? (a = b, this) : a
			}, this.imgSrcSanitizationWhitelist = function(a) {
				return s(a) ? (b = a, this) : b
			}, this.$get = function() {
				return function(c, d) {
					var e,
						f = d ? b : a;
					return od && !(od >= 8) || (e = Jc(c).href, "" === e || e.match(f)) ? c : "unsafe:" + e
				}
			}
		}
		function Cc(a) {
			return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
		}
		function Dc(a) {
			if ("self" === a) return a;
			if (u(a)) {
				if (a.indexOf("***") > -1)
					throw ge("iwcard", "Illegal sequence *** in string matcher.  String: {0}", a);
				return a = Cc(a).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + a + "$")
			}
			if (z(a)) return new RegExp("^" + a.source + "$");
			throw ge("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
		}
		function Ec(a) {
			var b = [];
			return s(a) && f(a, function(a) {
					b.push(Dc(a))
				}), b
		}
		function Fc() {
			this.SCE_CONTEXTS = he;var a = [ "self" ],
				b = [];
			this.resourceUrlWhitelist = function(b) {
				return arguments.length && (a = Ec(b)), a
			}, this.resourceUrlBlacklist = function(a) {
				return arguments.length && (b = Ec(a)), b
			}, this.$get = [ "$injector", function(d) {
				function e(a, b) {
					return "self" === a ? Kc(b) : !!a.exec(b.href)
				}
				function f(c) {
					var d,
						f,
						g = Jc(c.toString()),
						h = !1;
					for (d = 0, f = a.length; f > d; d++)
						if (e(a[d], g)) {
							h = !0;break
					}
					if (h)
						for (d = 0, f = b.length; f > d; d++)
							if (e(b[d], g)) {
								h = !1;break
					}
					return h
				}
				function g(a) {
					var b = function(a) {
						this.$$unwrapTrustedValue = function() {
							return a
						}
					};
					return a && (b.prototype = new a), b.prototype.valueOf = function() {
							return this.$$unwrapTrustedValue()
						}, b.prototype.toString = function() {
							return this.$$unwrapTrustedValue().toString()
						}, b
				}
				function h(a, b) {
					var d = m.hasOwnProperty(a) ? m[a] : null;
					if (!d)
						throw ge("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", a, b);
					if (null === b || b === c || "" === b) return b;
					if ("string" != typeof b)
						throw ge("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", a);
					return new d(b)
				}
				function i(a) {
					return a instanceof l ? a.$$unwrapTrustedValue() : a
				}
				function j(a, b) {
					if (null === b || b === c || "" === b) return b;
					var d = m.hasOwnProperty(a) ? m[a] : null;
					if (d && b instanceof d) return b.$$unwrapTrustedValue();
					if (a === he.RESOURCE_URL) {
						if (f(b)) return b;
						throw ge("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", b.toString())
					}
					if (a === he.HTML) return k(b);
					throw ge("unsafe", "Attempting to use an unsafe value in a safe context.")
				}
				var k = function() {
					throw ge("unsafe", "Attempting to use an unsafe value in a safe context.")
				};
				d.has("$sanitize") && (k = d.get("$sanitize"));
				var l = g(),
					m = {};
				return m[he.HTML] = g(l), m[he.CSS] = g(l), m[he.URL] = g(l), m[he.JS] = g(l), m[he.RESOURCE_URL] = g(m[he.URL]), {
						trustAs : h,
						getTrusted : j,
						valueOf : i
				}
			} ]
		}
		function Gc() {
			var a = !0;
			this.enabled = function(b) {
				return arguments.length && (a = !!b), a
			}, this.$get = [ "$parse", "$sniffer", "$sceDelegate", function(b, c, d) {
				if (a && c.msie && c.msieDocumentMode < 8)
					throw ge("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 9 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
				var e = J(he);
				e.isEnabled = function() {
					return a
				}, e.trustAs = d.trustAs, e.getTrusted = d.getTrusted, e.valueOf = d.valueOf, a || (e.trustAs = e.getTrusted = function(a, b) {
					return b
				}, e.valueOf = p), e.parseAs = function(a, c) {
					var d = b(c);
					return d.literal && d.constant ? d : function(b, c) {
						return e.getTrusted(a, d(b, c))
					}
				};
				var g = e.parseAs,
					h = e.getTrusted,
					i = e.trustAs;
				return f(he, function(a, b) {
						var c = jd(b);
						e[kb("parse_as_" + c)] = function(b) {
							return g(a, b)
						}, e[kb("get_trusted_" + c)] = function(b) {
							return h(a, b)
						}, e[kb("trust_as_" + c)] = function(b) {
							return i(a, b)
						}
					}), e
			} ]
		}
		function Hc() {
			this.$get = [ "$window", "$document", function(a, b) {
				var c,
					d,
					e = {},
					f = m((/android (\d+)/.exec(jd((a.navigator || {}).userAgent)) || [])[1]),
					g = /Boxee/i.test((a.navigator || {}).userAgent),
					h = b[0] || {},
					i = h.documentMode,
					j = /^(Moz|webkit|O|ms)(?=[A-Z])/,
					k = h.body && h.body.style,
					l = !1,
					n = !1;
				if (k) {
					for (var o in k)
						if (d = j.exec(o)) {
							c = d[0], c = c.substr(0, 1).toUpperCase() + c.substr(1);break
					}
					c || (c = "WebkitOpacity" in k && "webkit"), l = !!("transition" in k || c + "Transition" in k), n = !!("animation" in k || c + "Animation" in k), !f || l && n || (l = u(h.body.style.webkitTransition), n = u(h.body.style.webkitAnimation))
				}
				return {
					history : !(!a.history || !a.history.pushState || 4 > f || g),
					hashchange : "onhashchange" in a && (!i || i > 7),
					hasEvent : function(a) {
						if ("input" == a && 9 == od) return !1;
						if (r(e[a])) {
							var b = h.createElement("div");
							e[a] = "on" + a in b
						}
						return e[a]
					},
					csp : M(),
					vendorPrefix : c,
					transitions : l,
					animations : n,
					android : f,
					msie : od,
					msieDocumentMode : i
				}
			} ]
		}
		function Ic() {
			this.$get = [ "$rootScope", "$browser", "$q", "$exceptionHandler", function(a, b, c, d) {
				function e(e, g, h) {
					var i,
						j = c.defer(),
						k = j.promise,
						l = s(h) && !h;
					return i = b.defer(function() {
							try {
								j.resolve(e())
							} catch (b) {
								j.reject(b), d(b)
							} finally {
								delete f[k.$$timeoutId]
							}
							l || a.$apply()
						}, g), k.$$timeoutId = i, f[i] = j, k
				}
				var f = {};
				return e.cancel = function(a) {
						return a && a.$$timeoutId in f ? (f[a.$$timeoutId].reject("canceled"),
						delete f[a.$$timeoutId]
						, b.defer.cancel(a.$$timeoutId)) : !1
					}, e
			} ]
		}
		function Jc(a) {
			var b = a;
			return od && (ie.setAttribute("href", b), b = ie.href), ie.setAttribute("href", b), {
					href : ie.href,
					protocol : ie.protocol ? ie.protocol.replace(/:$/, "") : "",
					host : ie.host,
					search : ie.search ? ie.search.replace(/^\?/, "") : "",
					hash : ie.hash ? ie.hash.replace(/^#/, "") : "",
					hostname : ie.hostname,
					port : ie.port,
					pathname : "/" === ie.pathname.charAt(0) ? ie.pathname : "/" + ie.pathname
			}
		}
		function Kc(a) {
			var b = u(a) ? Jc(a) : a;
			return b.protocol === je.protocol && b.host === je.host
		}
		function Lc() {
			this.$get = q(a)
		}
		function Mc(a) {
			function b(d, e) {
				if (t(d)) {
					var g = {};
					return f(d, function(a, c) {
							g[c] = b(c, a)
						}), g
				}
				return a.factory(d + c, e)
			}
			var c = "Filter";
			this.register = b, this.$get = [ "$injector", function(a) {
				return function(b) {
					return a.get(b + c)
				}
			} ], b("currency", Oc), b("date", Wc), b("filter", Nc), b("json", Xc), b("limitTo", Yc), b("lowercase", oe), b("number", Pc), b("orderBy", Zc), b("uppercase", pe)
		}
		function Nc() {
			return function(a, b, c) {
				if (!x(a)) return a;
				var d = typeof c,
					e = [];
				e.check = function(a) {
					for (var b = 0; b < e.length; b++)
						if (!e[b](a)) return !1;
					return !0
				}, "function" !== d && (c = "boolean" === d && c ? function(a, b) {
					return xd.equals(a, b)
				} : function(a, b) {
					if (a && b && "object" == typeof a && "object" == typeof b) {
						for (var d in a)
							if ("$" !== d.charAt(0) && kd.call(a, d) && c(a[d], b[d])) return !0;
						return !1
					}
					return b = ("" + b).toLowerCase(), ("" + a).toLowerCase().indexOf(b) > -1
				});
				var f = function(a, b) {
					if ("string" == typeof b && "!" === b.charAt(0)) return !f(a, b.substr(1));
					switch (typeof a) {
					case "boolean":
					case "number":
					case "string":
						return c(a, b);case "object":
						switch (typeof b) {
						case "object":
							return c(a, b);default:
							for (var d in a)
								if ("$" !== d.charAt(0) && f(a[d], b)) return !0
						}
						return !1;case "array":
						for (var e = 0; e < a.length; e++)
							if (f(a[e], b)) return !0;
						return !1;default:
						return !1
					}
				};
				switch (typeof b) {
				case "boolean":
				case "number":
				case "string":
					b = {
						$ : b
					};case "object":
					for (var g in b) !function(a) {
							"undefined" != typeof b[a] && e.push(function(c) {
								return f("$" == a ? c : c && c[a], b[a])
							})
						}(g);
					break;case "function":
					e.push(b);
					break;default:
					return a
				}
				for (var h = [], i = 0; i < a.length; i++) {
					var j = a[i];
					e.check(j) && h.push(j)
				}
				return h
			}
		}
		function Oc(a) {
			var b = a.NUMBER_FORMATS;
			return function(a, c) {
				return r(c) && (c = b.CURRENCY_SYM), Qc(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, 2).replace(/\u00A4/g, c)
			}
		}
		function Pc(a) {
			var b = a.NUMBER_FORMATS;
			return function(a, c) {
				return Qc(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c)
			}
		}
		function Qc(a, b, c, d, e) {
			if (null == a || !isFinite(a) || t(a)) return "";
			var f = 0 > a;
			a = Math.abs(a);var g = a + "",
				h = "",
				i = [],
				j = !1;
			if (-1 !== g.indexOf("e")) {
				var k = g.match(/([\d\.]+)e(-?)(\d+)/);
				k && "-" == k[2] && k[3] > e + 1 ? g = "0" : (h = g, j = !0)
			}
			if (j) e > 0 && a > -1 && 1 > a && (h = a.toFixed(e));else {
				var l = (g.split(ke)[1] || "").length;
				r(e) && (e = Math.min(Math.max(b.minFrac, l), b.maxFrac));
				var m = Math.pow(10, e);
				a = Math.round(a * m) / m;
				var n = ("" + a).split(ke),
					o = n[0];
				n = n[1] || "";
				var p,
					q = 0,
					s = b.lgSize,
					u = b.gSize;
				if (o.length >= s + u)
					for (q = o.length - s, p = 0; q > p; p++) (q - p) % u === 0 && 0 !== p && (h += c), h += o.charAt(p);
				for (p = q; p < o.length; p++) (o.length - p) % s === 0 && 0 !== p && (h += c), h += o.charAt(p);
				for (; n.length < e;) n += "0";
				e && "0" !== e && (h += d + n.substr(0, e))
			}
			return i.push(f ? b.negPre : b.posPre), i.push(h), i.push(f ? b.negSuf : b.posSuf), i.join("")
		}
		function Rc(a, b, c) {
			var d = "";
			for (0 > a && (d = "-", a = -a), a = "" + a; a.length < b;) a = "0" + a;
			return c && (a = a.substr(a.length - b)), d + a
		}
		function Sc(a, b, c, d) {
			return c = c || 0, function(e) {
					var f = e["get" + a]();
					return (c > 0 || f > -c) && (f += c), 0 === f && -12 == c && (f = 12), Rc(f, b, d)
			}
		}
		function Tc(a, b) {
			return function(c, d) {
				var e = c["get" + a](),
					f = ld(b ? "SHORT" + a : a);
				return d[f][e]
			}
		}
		function Uc(a) {
			var b = -1 * a.getTimezoneOffset(),
				c = b >= 0 ? "+" : "";
			return c += Rc(Math[b > 0 ? "floor" : "ceil"](b / 60), 2) + Rc(Math.abs(b % 60), 2)
		}
		function Vc(a, b) {
			return a.getHours() < 12 ? b.AMPMS[0] : b.AMPMS[1]
		}
		function Wc(a) {
			function b(a) {
				var b;
				if (b = a.match(c)) {
					var d = new Date(0),
						e = 0,
						f = 0,
						g = b[8] ? d.setUTCFullYear : d.setFullYear,
						h = b[8] ? d.setUTCHours : d.setHours;
					b[9] && (e = m(b[9] + b[10]), f = m(b[9] + b[11])), g.call(d, m(b[1]), m(b[2]) - 1, m(b[3]));
					var i = m(b[4] || 0) - e,
						j = m(b[5] || 0) - f,
						k = m(b[6] || 0),
						l = Math.round(1e3 * parseFloat("0." + (b[7] || 0)));
					return h.call(d, i, j, k, l), d
				}
				return a
			}
			var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
			return function(c, d) {
				var e,
					g,
					h = "",
					i = [];
				if (d = d || "mediumDate", d = a.DATETIME_FORMATS[d] || d, u(c) && (c = ne.test(c) ? m(c) : b(c)), v(c) && (c = new Date(c)), !w(c)) return c;
				for (; d;) g = me.exec(d), g ? (i = N(i, g, 1), d = i.pop()) : (i.push(d), d = null);
				return f(i, function(b) {
						e = le[b], h += e ? e(c, a.DATETIME_FORMATS) : b.replace(/(^'|'$)/g, "").replace(/''/g, "'")
					}), h
			}
		}
		function Xc() {
			return function(a) {
				return R(a, !0)
			}
		}
		function Yc() {
			return function(a, b) {
				if (!x(a) && !u(a)) return a;
				if (b = m(b), u(a)) return b ? b >= 0 ? a.slice(0, b) : a.slice(b, a.length) : "";
				var c,
					d,
					e = [];
				for (b > a.length ? b = a.length : b < -a.length && (b = -a.length), b > 0 ? (c = 0, d = b) : (c = a.length + b, d = a.length); d > c; c++) e.push(a[c]);
				return e
			}
		}
		function Zc(a) {
			return function(b, c, d) {
				function e(a, b) {
					for (var d = 0; d < c.length; d++) {
						var e = c[d](a, b);
						if (0 !== e) return e
					}
					return 0
				}
				function f(a, b) {
					return T(b) ? function(b, c) {
						return a(c, b)
					} : a
				}
				function g(a, b) {
					var c = typeof a,
						d = typeof b;
					return c == d ? ("string" == c && (a = a.toLowerCase(), b = b.toLowerCase()), a === b ? 0 : b > a ? -1 : 1) : d > c ? -1 : 1
				}
				if (!x(b)) return b;
				if (!c) return b;
				c = x(c) ? c : [ c ], c = F(c, function(b) {
					var c = !1,
						d = b || p;
					if (u(b) && (("+" == b.charAt(0) || "-" == b.charAt(0)) && (c = "-" == b.charAt(0), b = b.substring(1)), d = a(b), d.constant)) {
						var e = d();
						return f(function(a, b) {
							return g(a[e], b[e])
						}, c)
					}
					return f(function(a, b) {
						return g(d(a), d(b))
					}, c)
				});
				for (var h = [], i = 0; i < b.length; i++) h.push(b[i]);
				return h.sort(f(e, d))
			}
		}
		function $c(a) {
			return y(a) && (a = {
					link : a
				}), a.restrict = a.restrict || "AC", q(a)
		}
		function _c(a, b, c, d) {
			function e(b, c) {
				c = c ? "-" + ab(c, "-") : "", d.removeClass(a, (b ? Ce : Be) + c), d.addClass(a, (b ? Be : Ce) + c)
			}
			var g = this,
				h = a.parent().controller("form") || se,
				i = 0,
				j = g.$error = {},
				k = [];
			g.$name = b.name || b.ngForm, g.$dirty = !1, g.$pristine = !0, g.$valid = !0, g.$invalid = !1, h.$addControl(g), a.addClass(De), e(!0), g.$addControl = function(a) {
				eb(a.$name, "input"), k.push(a), a.$name && (g[a.$name] = a)
			}, g.$removeControl = function(a) {
				a.$name && g[a.$name] === a &&
				delete g[a.$name]
				, f(j, function(b, c) {
					g.$setValidity(c, !0, a)
				}), I(k, a)
			}, g.$setValidity = function(a, b, c) {
				var d = j[a];
				if (b) d && (I(d, c), d.length || (i--, i || (e(b), g.$valid = !0, g.$invalid = !1), j[a] = !1, e(!0, a), h.$setValidity(a, !0, g)));else {
					if (i || e(b), d) {
						if (G(d, c)) return
					} else j[a] = d = [], i++, e(!1, a), h.$setValidity(a, !1, g);
					d.push(c), g.$valid = !1, g.$invalid = !0
				}
			}, g.$setDirty = function() {
				d.removeClass(a, De), d.addClass(a, Ee), g.$dirty = !0, g.$pristine = !1, h.$setDirty()
			}, g.$setPristine = function() {
				d.removeClass(a, Ee), d.addClass(a, De), g.$dirty = !1, g.$pristine = !0, f(k, function(a) {
					a.$setPristine()
				})
			}
		}
		function ad(a, b, d, e) {
			return a.$setValidity(b, d), d ? e : c
		}
		function bd(a, b, c) {
			var d = c.prop("validity");
			if (t(d)) {
				var e = function(c) {
					return a.$error[b] || !(d.badInput || d.customError || d.typeMismatch) || d.valueMissing ? c : void a.$setValidity(b, !1)
				};
				a.$parsers.push(e), a.$formatters.push(e)
			}
		}
		function cd(a, b, c, e, f, g) {
			var h = b.prop("validity");
			if (!f.android) {
				var i = !1;
				b.on("compositionstart", function() {
					i = !0
				}), b.on("compositionend", function() {
					i = !1, j()
				})
			}
			var j = function() {
				if (!i) {
					var d = b.val();
					T(c.ngTrim || "T") && (d = zd(d)), (e.$viewValue !== d || h && "" === d && !h.valueMissing) && (a.$$phase ? e.$setViewValue(d) : a.$apply(function() {
						e.$setViewValue(d)
					}))
				}
			};
			if (f.hasEvent("input")) b.on("input", j);else {
				var k,
					l = function() {
						k || (k = g.defer(function() {
							j(), k = null
						}))
					};
				b.on("keydown", function(a) {
					var b = a.keyCode;
					91 === b || b > 15 && 19 > b || b >= 37 && 40 >= b || l()
				}), f.hasEvent("paste") && b.on("paste cut", l)
			}
			b.on("change", j), e.$render = function() {
				b.val(e.$isEmpty(e.$viewValue) ? "" : e.$viewValue)
			};var n,
				o,
				p = c.ngPattern;
			if (p) {
				var q = function(a, b) {
					return ad(e, "pattern", e.$isEmpty(b) || a.test(b), b)
				};
				o = p.match(/^\/(.*)\/([gim]*)$/), o ? (p = new RegExp(o[1], o[2]), n = function(a) {
					return q(p, a)
				}) : n = function(c) {
					var e = a.$eval(p);
					if (!e || !e.test)
						throw d("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", p, e, U(b));
					return q(e, c)
				}, e.$formatters.push(n), e.$parsers.push(n)
			}
			if (c.ngMinlength) {
				var r = m(c.ngMinlength),
					s = function(a) {
						return ad(e, "minlength", e.$isEmpty(a) || a.length >= r, a)
					};
				e.$parsers.push(s), e.$formatters.push(s)
			}
			if (c.ngMaxlength) {
				var t = m(c.ngMaxlength),
					u = function(a) {
						return ad(e, "maxlength", e.$isEmpty(a) || a.length <= t, a)
					};
				e.$parsers.push(u), e.$formatters.push(u)
			}
		}
		function dd(a, b, d, e, f, g) {
			if (cd(a, b, d, e, f, g), e.$parsers.push(function(a) {
					var b = e.$isEmpty(a);
					return b || ye.test(a) ? (e.$setValidity("number", !0), "" === a ? null : b ? a : parseFloat(a)) : (e.$setValidity("number", !1), c)
				}), bd(e, "number", b), e.$formatters.push(function(a) {
					return e.$isEmpty(a) ? "" : "" + a
				}), d.min) {
				var h = function(a) {
					var b = parseFloat(d.min);
					return ad(e, "min", e.$isEmpty(a) || a >= b, a)
				};
				e.$parsers.push(h), e.$formatters.push(h)
			}
			if (d.max) {
				var i = function(a) {
					var b = parseFloat(d.max);
					return ad(e, "max", e.$isEmpty(a) || b >= a, a)
				};
				e.$parsers.push(i), e.$formatters.push(i)
			}
			e.$formatters.push(function(a) {
				return ad(e, "number", e.$isEmpty(a) || v(a), a)
			})
		}
		function ed(a, b, c, d, e, f) {
			cd(a, b, c, d, e, f);var g = function(a) {
				return ad(d, "url", d.$isEmpty(a) || we.test(a), a)
			};
			d.$formatters.push(g), d.$parsers.push(g)
		}
		function fd(a, b, c, d, e, f) {
			cd(a, b, c, d, e, f);var g = function(a) {
				return ad(d, "email", d.$isEmpty(a) || xe.test(a), a)
			};
			d.$formatters.push(g), d.$parsers.push(g)
		}
		function gd(a, b, c, d) {
			r(c.name) && b.attr("name", j()), b.on("click", function() {
				b[0].checked && a.$apply(function() {
					d.$setViewValue(c.value)
				})
			}), d.$render = function() {
				var a = c.value;
				b[0].checked = a == d.$viewValue
			}, c.$observe("value", d.$render)
		}
		function hd(a, b, c, d) {
			var e = c.ngTrueValue,
				f = c.ngFalseValue;
			u(e) || (e = !0), u(f) || (f = !1), b.on("click", function() {
				a.$apply(function() {
					d.$setViewValue(b[0].checked)
				})
			}), d.$render = function() {
				b[0].checked = d.$viewValue
			}, d.$isEmpty = function(a) {
				return a !== e
			}, d.$formatters.push(function(a) {
				return a === e
			}), d.$parsers.push(function(a) {
				return a ? e : f
			})
		}
		function id(a, b) {
			return a = "ngClass" + a, function() {
					return {
						restrict : "AC",
						link : function(c, d, e) {
							function g(a) {
								if (b === !0 || c.$index % 2 === b) {
									var d = h(a || "");
									i ? L(a, i) || e.$updateClass(d, h(i)) : e.$addClass(d)
								}
								i = J(a)
							}
							function h(a) {
								if (x(a)) return a.join(" ");
								if (t(a)) {
									var b = [];
									return f(a, function(a, c) {
											a && b.push(c)
										}), b.join(" ")
								}
								return a
							}
							var i;
							c.$watch(e[a], g, !0), e.$observe("class", function() {
								g(c.$eval(e[a]))
							}), "ngClass" !== a && c.$watch("$index", function(d, f) {
								var g = 1 & d;
								if (g !== f & 1) {
									var i = h(c.$eval(e[a]));
									g === b ? e.$addClass(i) : e.$removeClass(i)
								}
							})
						}
					}
			}
		}
		var jd = function(a) {
				return u(a) ? a.toLowerCase() : a
			},
			kd = Object.prototype.hasOwnProperty,
			ld = function(a) {
				return u(a) ? a.toUpperCase() : a
			},
			md = function(a) {
				return u(a) ? a.replace(/[A-Z]/g, function(a) {
					return String.fromCharCode(32 | a.charCodeAt(0))
				}) : a
			},
			nd = function(a) {
				return u(a) ? a.replace(/[a-z]/g, function(a) {
					return String.fromCharCode(-33 & a.charCodeAt(0))
				}) : a
			};
		"i" !== "I".toLowerCase() && (jd = md, ld = nd);
		var od,
			pd,
			qd,
			rd,
			sd,
			td = [].slice,
			ud = [].push,
			vd = Object.prototype.toString,
			wd = d("ng"),
			xd = (a.angular, a.angular || (a.angular = {})),
			yd = [ "0", "0", "0" ];
		od = m((/msie (\d+)/.exec(jd(navigator.userAgent)) || [])[1]), isNaN(od) && (od = m((/trident\/.*; rv:(\d+)/.exec(jd(navigator.userAgent)) || [])[1])), o.$inject = [], p.$inject = [];
		var zd = function() {
			return String.prototype.trim ? function(a) {
				return u(a) ? a.trim() : a
			} : function(a) {
				return u(a) ? a.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : a
			}
		}();
		sd = 9 > od ? function(a) {
			return a = a.nodeName ? a : a[0], a.scopeName && "HTML" != a.scopeName ? ld(a.scopeName + ":" + a.nodeName) : a.nodeName
		} : function(a) {
			return a.nodeName ? a.nodeName : a[0].nodeName
		};
		var Ad = /[A-Z]/g,
			Bd = {
				full : "1.2.15",
				major : 1,
				minor : 2,
				dot : 15,
				codeName : "beer-underestimating"
			},
			Cd = mb.cache = {},
			Dd = mb.expando = "ng-" + (new Date).getTime(),
			Ed = 1,
			Fd = a.document.addEventListener ? function(a, b, c) {
				a.addEventListener(b, c, !1)
			} : function(a, b, c) {
				a.attachEvent("on" + b, c)
			},
			Gd = a.document.removeEventListener ? function(a, b, c) {
				a.removeEventListener(b, c, !1)
			} : function(a, b, c) {
				a.detachEvent("on" + b, c)
			},
			Hd = (mb._data = function(a) {
				return this.cache[a[this.expando]] || {}
			}, /([\:\-\_]+(.))/g),
			Id = /^moz([A-Z])/,
			Jd = d("jqLite"),
			Kd = mb.prototype = {
				ready : function(c) {
					function d() {
						e || (e = !0, c())
					}
					var e = !1;
					"complete" === b.readyState ? setTimeout(d) : (this.on("DOMContentLoaded", d), mb(a).on("load", d))
				},
				toString : function() {
					var a = [];
					return f(this, function(b) {
							a.push("" + b)
						}), "[" + a.join(", ") + "]"
				},
				eq : function(a) {
					return pd(a >= 0 ? this[a] : this[this.length + a])
				},
				length : 0,
				push : ud,
				sort : [].sort,
				splice : [].splice
			},
			Ld = {};
		f("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(a) {
			Ld[jd(a)] = a
		});
		var Md = {};
		f("input,select,option,textarea,button,form,details".split(","), function(a) {
			Md[ld(a)] = !0
		}), f({
			data : sb,
			inheritedData : yb,
			scope : function(a) {
				return pd(a).data("$scope") || yb(a.parentNode || a, [ "$isolateScope", "$scope" ])
			},
			isolateScope : function(a) {
				return pd(a).data("$isolateScope") || pd(a).data("$isolateScopeNoTemplate")
			},
			controller : xb,
			injector : function(a) {
				return yb(a, "$injector")
			},
			removeAttr : function(a, b) {
				a.removeAttribute(b)
			},
			hasClass : tb,
			css : function(a, b, d) {
				if (b = kb(b), !s(d)) {
					var e;
					return 8 >= od && (e = a.currentStyle && a.currentStyle[b], "" === e && (e = "auto")), e = e || a.style[b], 8 >= od && (e = "" === e ? c : e), e
				}
				a.style[b] = d
			},
			attr : function(a, b, d) {
				var e = jd(b);
				if (Ld[e]) {
					if (!s(d)) return a[b] || (a.attributes.getNamedItem(b) || o).specified ? e : c;
					d ? (a[b] = !0, a.setAttribute(b, e)) : (a[b] = !1, a.removeAttribute(e))
				} else if (s(d)) a.setAttribute(b, d);
				else if (a.getAttribute) {
					var f = a.getAttribute(b, 2);
					return null === f ? c : f
				}
			},
			prop : function(a, b, c) {
				return s(c) ? void (a[b] = c) : a[b]
			},
			text : function() {
				function a(a, c) {
					var d = b[a.nodeType];
					return r(c) ? d ? a[d] : "" : void (a[d] = c)
				}
				var b = [];
				return 9 > od ? (b[1] = "innerText", b[3] = "nodeValue") : b[1] = b[3] = "textContent", a.$dv = "", a
			}(),
			val : function(a, b) {
				if (r(b)) {
					if ("SELECT" === sd(a) && a.multiple) {
						var c = [];
						return f(a.options, function(a) {
								a.selected && c.push(a.value || a.text)
							}), 0 === c.length ? null : c
					}
					return a.value
				}
				a.value = b
			},
			html : function(a, b) {
				if (r(b)) return a.innerHTML;
				for (var c = 0, d = a.childNodes; c < d.length; c++) ob(d[c]);
				a.innerHTML = b
			},
			empty : zb
		}, function(a, b) {
			mb.prototype[b] = function(b, d) {
				var e,
					f;
				if (a !== zb && (2 == a.length && a !== tb && a !== xb ? b : d) === c) {
					if (t(b)) {
						for (e = 0; e < this.length; e++)
							if (a === sb) a(this[e], b);else
								for (f in b) a(this[e], f, b[f]);
						return this
					}
					for (var g = a.$dv, h = g === c ? Math.min(this.length, 1) : this.length, i = 0; h > i; i++) {
						var j = a(this[i], b, d);
						g = g ? g + j : j
					}
					return g
				}
				for (e = 0; e < this.length; e++) a(this[e], b, d);
				return this
			}
		}), f({
			removeData : qb,
			dealoc : ob,
			on : function of(a, c, d, e) {
				if (s(e))
					throw Jd("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
				var g = rb(a, "events"),
					h = rb(a, "handle");
				g || rb(a, "events", g = {}), h || rb(a, "handle", h = Bb(a, g)), f(c.split(" "), function(c) {
					var e = g[c];
					if (!e) {
						if ("mouseenter" == c || "mouseleave" == c) {
							var f = b.body.contains || b.body.compareDocumentPosition ? function(a, b) {
								var c = 9 === a.nodeType ? a.documentElement : a,
									d = b && b.parentNode;
								return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
							} : function(a, b) {
								if (b)
									for (; b = b.parentNode;)
										if (b === a) return !0;
								return !1
							};
							g[c] = [];
							var i = {
								mouseleave : "mouseout",
								mouseenter : "mouseover"
							};
							of(a, i[c], function(a) {
								var b = this,
									d = a.relatedTarget;
								(!d || d !== b && !f(b, d)) && h(a, c)
							})
						} else Fd(a, c, h), g[c] = [];
						e = g[c]
					}
					e.push(d)
				})
			},
			off : pb,
			one : function(a, b, c) {
				a = pd(a), a.on(b, function d() {
					a.off(b, c), a.off(b, d)
				}), a.on(b, c)
			},
			replaceWith : function(a, b) {
				var c,
					d = a.parentNode;
				ob(a), f(new mb(b), function(b) {
					c ? d.insertBefore(b, c.nextSibling) : d.replaceChild(b, a), c = b
				})
			},
			children : function(a) {
				var b = [];
				return f(a.childNodes, function(a) {
						1 === a.nodeType && b.push(a)
					}), b
			},
			contents : function(a) {
				return a.contentDocument || a.childNodes || []
			},
			append : function(a, b) {
				f(new mb(b), function(b) {
					(1 === a.nodeType || 11 === a.nodeType) && a.appendChild(b)
				})
			},
			prepend : function(a, b) {
				if (1 === a.nodeType) {
					var c = a.firstChild;
					f(new mb(b), function(b) {
						a.insertBefore(b, c)
					})
				}
			},
			wrap : function(a, b) {
				b = pd(b)[0];
				var c = a.parentNode;
				c && c.replaceChild(b, a), b.appendChild(a)
			},
			remove : function(a) {
				ob(a);
				var b = a.parentNode;
				b && b.removeChild(a)
			},
			after : function(a, b) {
				var c = a,
					d = a.parentNode;
				f(new mb(b), function(a) {
					d.insertBefore(a, c.nextSibling), c = a
				})
			},
			addClass : vb,
			removeClass : ub,
			toggleClass : function(a, b, c) {
				b && f(b.split(" "), function(b) {
					var d = c;
					r(d) && (d = !tb(a, b)), (d ? vb : ub)(a, b)
				})
			},
			parent : function(a) {
				var b = a.parentNode;
				return b && 11 !== b.nodeType ? b : null
			},
			next : function(a) {
				if (a.nextElementSibling) return a.nextElementSibling;
				for (var b = a.nextSibling; null != b && 1 !== b.nodeType;) b = b.nextSibling;
				return b
			},
			find : function(a, b) {
				return a.getElementsByTagName ? a.getElementsByTagName(b) : []
			},
			clone : nb,
			triggerHandler : function(a, b, c) {
				var d = (rb(a, "events") || {})[b];
				c = c || [];
				var e = [ {
					preventDefault : o,
					stopPropagation : o
				} ];
				f(d, function(b) {
					b.apply(a, e.concat(c))
				})
			}
		}, function(a, b) {
			mb.prototype[b] = function(b, c, d) {
				for (var e, f = 0; f < this.length; f++) r(e) ? (e = a(this[f], b, c, d), s(e) && (e = pd(e))) : wb(e, a(this[f], b, c, d));
				return s(e) ? e : this
			}, mb.prototype.bind = mb.prototype.on, mb.prototype.unbind = mb.prototype.off
		}), Db.prototype = {
			put : function(a, b) {
				this[Cb(a)] = b
			},
			get : function(a) {
				return this[Cb(a)]
			},
			remove : function(a) {
				var b = this[a = Cb(a)];
				return delete this[a]
					, b
			}
		};
		var Nd = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
			Od = /,/,
			Pd = /^\s*(_?)(\S+?)\1\s*$/,
			Qd = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
			Rd = d("$injector"),
			Sd = d("$animate"),
			Td = [ "$provide", function(a) {
				this.$$selectors = {}, this.register = function(b, c) {
					var d = b + "-animation";
					if (b && "." != b.charAt(0))
						throw Sd("notcsel", "Expecting class selector starting with '.' got '{0}'.", b);
					this.$$selectors[b.substr(1)] = d, a.factory(d, c)
				}, this.classNameFilter = function(a) {
					return 1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null), this.$$classNameFilter
				}, this.$get = [ "$timeout", "$$asyncCallback", function(a, b) {
					function c(a) {
						a && b(a)
					}
					return {
						enter : function(a, b, d, e) {
							d ? d.after(a) : (b && b[0] || (b = d.parent()), b.append(a)), c(e)
						},
						leave : function(a, b) {
							a.remove(), c(b)
						},
						move : function(a, b, c, d) {
							this.enter(a, b, c, d)
						},
						addClass : function(a, b, d) {
							b = u(b) ? b : x(b) ? b.join(" ") : "", f(a, function(a) {
								vb(a, b)
							}), c(d)
						},
						removeClass : function(a, b, d) {
							b = u(b) ? b : x(b) ? b.join(" ") : "", f(a, function(a) {
								ub(a, b)
							}), c(d)
						},
						setClass : function(a, b, d, e) {
							f(a, function(a) {
								vb(a, b), ub(a, d)
							}), c(e)
						},
						enabled : o
					}
				} ]
			} ],
			Ud = d("$compile");
		Mb.$inject = [ "$provide", "$$sanitizeUriProvider" ];
		var Vd = /^(x[\:\-_]|data[\:\-_])/i,
			Wd = d("$interpolate"),
			Xd = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
			Yd = {
				http : 80,
				https : 443,
				ftp : 21
			},
			Zd = d("$location");
		kc.prototype = jc.prototype = ic.prototype = {
			$$html5 : !1,
			$$replace : !1,
			absUrl : lc("$$absUrl"),
			url : function(a, b) {
				if (r(a)) return this.$$url;
				var c = Xd.exec(a);
				return c[1] && this.path(decodeURIComponent(c[1])), (c[2] || c[1]) && this.search(c[3] || ""), this.hash(c[5] || "", b), this
			},
			protocol : lc("$$protocol"),
			host : lc("$$host"),
			port : lc("$$port"),
			path : mc("$$path", function(a) {
				return "/" == a.charAt(0) ? a : "/" + a
			}),
			search : function(a, b) {
				switch (arguments.length) {
				case 0:
					return this.$$search;case 1:
					if (u(a))
						this.$$search = W(a);else {
						if (!t(a))
							throw Zd("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
						this.$$search = a
					}
					break;default:
					r(b) || null === b ?
						delete this.$$search[a]
						: this.$$search[a] = b
				}
				return this.$$compose(), this
			},
			hash : mc("$$hash", p),
			replace : function() {
				return this.$$replace = !0, this
			}
		};
		var $d,
			_d = d("$parse"),
			ae = {},
			be = {
				"null" : function() {
					return null
				},
				"true" : function() {
					return !0
				},
				"false" : function() {
					return !1
				},
				undefined : o,
				"+" : function(a, b, d, e) {
					return d = d(a, b), e = e(a, b), s(d) ? s(e) ? d + e : d : s(e) ? e : c
				},
				"-" : function(a, b, c, d) {
					return c = c(a, b), d = d(a, b), (s(c) ? c : 0) - (s(d) ? d : 0)
				},
				"*" : function(a, b, c, d) {
					return c(a, b) * d(a, b)
				},
				"/" : function(a, b, c, d) {
					return c(a, b) / d(a, b)
				},
				"%" : function(a, b, c, d) {
					return c(a, b) % d(a, b)
				},
				"^" : function(a, b, c, d) {
					return c(a, b) ^ d(a, b)
				},
				"=" : o,
				"===" : function(a, b, c, d) {
					return c(a, b) === d(a, b)
				},
				"!==" : function(a, b, c, d) {
					return c(a, b) !== d(a, b)
				},
				"==" : function(a, b, c, d) {
					return c(a, b) == d(a, b)
				},
				"!=" : function(a, b, c, d) {
					return c(a, b) != d(a, b)
				},
				"<" : function(a, b, c, d) {
					return c(a, b) < d(a, b)
				},
				">" : function(a, b, c, d) {
					return c(a, b) > d(a, b)
				},
				"<=" : function(a, b, c, d) {
					return c(a, b) <= d(a, b)
				},
				">=" : function(a, b, c, d) {
					return c(a, b) >= d(a, b)
				},
				"&&" : function(a, b, c, d) {
					return c(a, b) && d(a, b)
				},
				"||" : function(a, b, c, d) {
					return c(a, b) || d(a, b)
				},
				"&" : function(a, b, c, d) {
					return c(a, b) & d(a, b)
				},
				"|" : function(a, b, c, d) {
					return d(a, b)(a, b, c(a, b))
				},
				"!" : function(a, b, c) {
					return !c(a, b)
				}
			},
			ce = {
				n : "\n",
				f : "\f",
				r : "\r",
				t : "	",
				v : "",
				"'" : "'",
				'"' : '"'
			},
			de = function(a) {
				this.options = a
			};
		de.prototype = {
			constructor : de,
			lex : function(a) {
				this.text = a, this.index = 0, this.ch = c, this.lastCh = ":", this.tokens = [];
				for (var b, d = []; this.index < this.text.length;) {
					if (this.ch = this.text.charAt(this.index), this.is("\"'")) this.readString(this.ch);
					else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) this.readNumber();
					else if (this.isIdent(this.ch)) this.readIdent(), this.was("{,") && "{" === d[0] && (b = this.tokens[this.tokens.length - 1]) && (b.json = -1 === b.text.indexOf("."));
					else if (this.is("(){}[].,;:?")) this.tokens.push({
							index : this.index,
							text : this.ch,
							json : this.was(":[,") && this.is("{[") || this.is("}]:,")
						}), this.is("{[") && d.unshift(this.ch), this.is("}]") && d.shift(), this.index++;else {
						if (this.isWhitespace(this.ch)) {
							this.index++;continue
						}
						var e = this.ch + this.peek(),
							f = e + this.peek(2),
							g = be[this.ch],
							h = be[e],
							i = be[f];
						i ? (this.tokens.push({
							index : this.index,
							text : f,
							fn : i
						}), this.index += 3) : h ? (this.tokens.push({
							index : this.index,
							text : e,
							fn : h
						}), this.index += 2) : g ? (this.tokens.push({
							index : this.index,
							text : this.ch,
							fn : g,
							json : this.was("[,:") && this.is("+-")
						}), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
					}
					this.lastCh = this.ch
				}
				return this.tokens
			},
			is : function(a) {
				return -1 !== a.indexOf(this.ch)
			},
			was : function(a) {
				return -1 !== a.indexOf(this.lastCh)
			},
			peek : function(a) {
				var b = a || 1;
				return this.index + b < this.text.length ? this.text.charAt(this.index + b) : !1
			},
			isNumber : function(a) {
				return a >= "0" && "9" >= a
			},
			isWhitespace : function(a) {
				return " " === a || "\r" === a || "	" === a || "\n" === a || "" === a || " " === a
			},
			isIdent : function(a) {
				return a >= "a" && "z" >= a || a >= "A" && "Z" >= a || "_" === a || "$" === a
			},
			isExpOperator : function(a) {
				return "-" === a || "+" === a || this.isNumber(a)
			},
			throwError : function(a, b, c) {
				c = c || this.index;
				var d = s(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, c) + "]" : " " + c;
				throw _d("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", a, d, this.text)
			},
			readNumber : function() {
				for (var a = "", b = this.index; this.index < this.text.length;) {
					var c = jd(this.text.charAt(this.index));
					if ("." == c || this.isNumber(c))
						a += c;else {
						var d = this.peek();
						if ("e" == c && this.isExpOperator(d))
							a += c;
						else if (this.isExpOperator(c) && d && this.isNumber(d) && "e" == a.charAt(a.length - 1))
							a += c;else {
							if (!this.isExpOperator(c) || d && this.isNumber(d) || "e" != a.charAt(a.length - 1)) break;
							this.throwError("Invalid exponent")
						}
					}
					this.index++
				}
				a = 1 * a, this.tokens.push({
					index : b,
					text : a,
					json : !0,
					fn : function() {
						return a
					}
				})
			},
			readIdent : function() {
				for (var a, b, c, d, e = this, f = "", g = this.index; this.index < this.text.length && (d = this.text.charAt(this.index), "." === d || this.isIdent(d) || this.isNumber(d));) "." === d && (a = this.index), f += d, this.index++;
				if (a)
					for (b = this.index; b < this.text.length;) {
						if (d = this.text.charAt(b), "(" === d) {
							c = f.substr(a - g + 1), f = f.substr(0, a - g), this.index = b;break
						}
						if (!this.isWhitespace(d)) break;
						b++
				}
				var h = {
					index : g,
					text : f
				};
				if (be.hasOwnProperty(f)) h.fn = be[f], h.json = be[f];else {
					var i = vc(f, this.options, this.text);
					h.fn = l(function(a, b) {
						return i(a, b)
					}, {
						assign : function(a, b) {
							return rc(a, f, b, e.text, e.options)
						}
					})
				}
				this.tokens.push(h), c && (this.tokens.push({
					index : a,
					text : ".",
					json : !1
				}), this.tokens.push({
					index : a + 1,
					text : c,
					json : !1
				}))
			},
			readString : function(a) {
				var b = this.index;
				this.index++;
				for (var c = "", d = a, e = !1; this.index < this.text.length;) {
					var f = this.text.charAt(this.index);
					if (d += f, e) {
						if ("u" === f) {
							var g = this.text.substring(this.index + 1, this.index + 5);
							g.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + g + "]"), this.index += 4, c += String.fromCharCode(parseInt(g, 16))
						} else {
							var h = ce[f];
							c += h ? h : f
						}
						e = !1
					} else if ("\\" === f)
						e = !0;else {
						if (f === a) return this.index++, void this.tokens.push({
									index : b,
									text : d,
									string : c,
									json : !0,
									fn : function() {
										return c
									}
								});
						c += f
					}
					this.index++
				}
				this.throwError("Unterminated quote", b)
			}
		};
		var ee = function(a, b, c) {
			this.lexer = a, this.$filter = b, this.options = c
		};
		ee.ZERO = function() {
			return 0
		}, ee.prototype = {
			constructor : ee,
			parse : function(a, b) {
				this.text = a, this.json = b, this.tokens = this.lexer.lex(a), b && (this.assignment = this.logicalOR, this.functionCall = this.fieldAccess = this.objectIndex = this.filterChain = function() {
					this.throwError("is not valid json", {
						text : a,
						index : 0
					})
				});
				var c = b ? this.primary() : this.statements();
				return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), c.literal = !!c.literal, c.constant = !!c.constant, c
			},
			primary : function() {
				var a;
				if (this.expect("(")) a = this.filterChain(), this.consume(")");
				else if (this.expect("["))
					a = this.arrayDeclaration();
				else if (this.expect("{"))
					a = this.object();else {
					var b = this.expect();
					a = b.fn, a || this.throwError("not a primary expression", b), b.json && (a.constant = !0, a.literal = !0)
				}
				for (var c, d; c = this.expect("(", "[", ".");) "(" === c.text ? (a = this.functionCall(a, d), d = null) : "[" === c.text ? (d = a, a = this.objectIndex(a)) : "." === c.text ? (d = a, a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
				return a
			},
			throwError : function(a, b) {
				throw _d("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", b.text, a, b.index + 1, this.text, this.text.substring(b.index))
			},
			peekToken : function() {
				if (0 === this.tokens.length)
					throw _d("ueoe", "Unexpected end of expression: {0}", this.text);
				return this.tokens[0]
			},
			peek : function(a, b, c, d) {
				if (this.tokens.length > 0) {
					var e = this.tokens[0],
						f = e.text;
					if (f === a || f === b || f === c || f === d || !a && !b && !c && !d) return e
				}
				return !1
			},
			expect : function(a, b, c, d) {
				var e = this.peek(a, b, c, d);
				return e ? (this.json && !e.json && this.throwError("is not valid json", e), this.tokens.shift(), e) : !1
			},
			consume : function(a) {
				this.expect(a) || this.throwError("is unexpected, expecting [" + a + "]", this.peek())
			},
			unaryFn : function(a, b) {
				return l(function(c, d) {
					return a(c, d, b)
				}, {
					constant : b.constant
				})
			},
			ternaryFn : function(a, b, c) {
				return l(function(d, e) {
					return a(d, e) ? b(d, e) : c(d, e)
				}, {
					constant : a.constant && b.constant && c.constant
				})
			},
			binaryFn : function(a, b, c) {
				return l(function(d, e) {
					return b(d, e, a, c)
				}, {
					constant : a.constant && c.constant
				})
			},
			statements : function() {
				for (var a = [];;)
					if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), !this.expect(";")) return 1 === a.length ? a[0] : function(b, c) {
							for (var d, e = 0; e < a.length; e++) {
								var f = a[e];
								f && (d = f(b, c))
							}
							return d
				}
			},
			filterChain : function() {
				for (var a, b = this.expression();;) {
					if (!(a = this.expect("|"))) return b;
					b = this.binaryFn(b, a.fn, this.filter())
				}
			},
			filter : function() {
				for (var a = this.expect(), b = this.$filter(a.text), c = [];;) {
					if (!(a = this.expect(":"))) {
						var d = function(a, d, e) {
							for (var f = [ e ], g = 0; g < c.length; g++) f.push(c[g](a, d));
							return b.apply(a, f)
						};
						return function() {
							return d
						}
					}
					c.push(this.expression())
				}
			},
			expression : function() {
				return this.assignment()
			},
			assignment : function() {
				var a,
					b,
					c = this.ternary();
				return (b = this.expect("=")) ? (c.assign || this.throwError("implies assignment but [" + this.text.substring(0, b.index) + "] can not be assigned to", b), a = this.ternary(), function(b, d) {
					return c.assign(b, a(b, d), d)
				}) : c
			},
			ternary : function() {
				var a,
					b,
					c = this.logicalOR();
				return (b = this.expect("?")) ? (a = this.ternary(), (b = this.expect(":")) ? this.ternaryFn(c, a, this.ternary()) : void this.throwError("expected :", b)) : c
			},
			logicalOR : function() {
				for (var a, b = this.logicalAND();;) {
					if (!(a = this.expect("||"))) return b;
					b = this.binaryFn(b, a.fn, this.logicalAND())
				}
			},
			logicalAND : function() {
				var a,
					b = this.equality();
				return (a = this.expect("&&")) && (b = this.binaryFn(b, a.fn, this.logicalAND())), b
			},
			equality : function() {
				var a,
					b = this.relational();
				return (a = this.expect("==", "!=", "===", "!==")) && (b = this.binaryFn(b, a.fn, this.equality())), b
			},
			relational : function() {
				var a,
					b = this.additive();
				return (a = this.expect("<", ">", "<=", ">=")) && (b = this.binaryFn(b, a.fn, this.relational())), b
			},
			additive : function() {
				for (var a, b = this.multiplicative(); a = this.expect("+", "-");) b = this.binaryFn(b, a.fn, this.multiplicative());
				return b
			},
			multiplicative : function() {
				for (var a, b = this.unary(); a = this.expect("*", "/", "%");) b = this.binaryFn(b, a.fn, this.unary());
				return b
			},
			unary : function() {
				var a;
				return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn(ee.ZERO, a.fn, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.fn, this.unary()) : this.primary()
			},
			fieldAccess : function(a) {
				var b = this,
					c = this.expect().text,
					d = vc(c, this.options, this.text);
				return l(function(b, c, e) {
					return d(e || a(b, c))
				}, {
					assign : function(d, e, f) {
						return rc(a(d, f), c, e, b.text, b.options)
					}
				})
			},
			objectIndex : function(a) {
				var b = this,
					d = this.expression();
				return this.consume("]"), l(function(e, f) {
						var g,
							h,
							i = a(e, f),
							j = d(e, f);
						return i ? (g = qc(i[j], b.text), g && g.then && b.options.unwrapPromises && (h = g, "$$v" in g || (h.$$v = c, h.then(function(a) {
							h.$$v = a
						})), g = g.$$v), g) : c
					}, {
						assign : function(c, e, f) {
							var g = d(c, f),
								h = qc(a(c, f), b.text);
							return h[g] = e
						}
					})
			},
			functionCall : function(a, b) {
				var c = [];
				if (")" !== this.peekToken().text)
					do c.push(this.expression()); while (this.expect(","));
				this.consume(")");
				var d = this;
				return function(e, f) {
					for (var g = [], h = b ? b(e, f) : e, i = 0; i < c.length; i++) g.push(c[i](e, f));
					var j = a(e, f, h) || o;
					qc(h, d.text), qc(j, d.text);
					var k = j.apply ? j.apply(h, g) : j(g[0], g[1], g[2], g[3], g[4]);
					return qc(k, d.text)
				}
			},
			arrayDeclaration : function() {
				var a = [],
					b = !0;
				if ("]" !== this.peekToken().text)
					do {
						if (this.peek("]")) break;
						var c = this.expression();
						a.push(c), c.constant || (b = !1)
					} while (this.expect(","));
				return this.consume("]"), l(function(b, c) {
						for (var d = [], e = 0; e < a.length; e++) d.push(a[e](b, c));
						return d
					}, {
						literal : !0,
						constant : b
					})
			},
			object : function() {
				var a = [],
					b = !0;
				if ("}" !== this.peekToken().text)
					do {
						if (this.peek("}")) break;
						var c = this.expect(),
							d = c.string || c.text;
						this.consume(":");var e = this.expression();
						a.push({
							key : d,
							value : e
						}), e.constant || (b = !1)
					} while (this.expect(","));
				return this.consume("}"), l(function(b, c) {
						for (var d = {}, e = 0; e < a.length; e++) {
							var f = a[e];
							d[f.key] = f.value(b, c)
						}
						return d
					}, {
						literal : !0,
						constant : b
					})
			}
		};
		var fe = {},
			ge = d("$sce"),
			he = {
				HTML : "html",
				CSS : "css",
				URL : "url",
				RESOURCE_URL : "resourceUrl",
				JS : "js"
			},
			ie = b.createElement("a"),
			je = Jc(a.location.href, !0);
		Mc.$inject = [ "$provide" ], Oc.$inject = [ "$locale" ], Pc.$inject = [ "$locale" ];
		var ke = ".",
			le = {
				yyyy : Sc("FullYear", 4),
				yy : Sc("FullYear", 2, 0, !0),
				y : Sc("FullYear", 1),
				MMMM : Tc("Month"),
				MMM : Tc("Month", !0),
				MM : Sc("Month", 2, 1),
				M : Sc("Month", 1, 1),
				dd : Sc("Date", 2),
				d : Sc("Date", 1),
				HH : Sc("Hours", 2),
				H : Sc("Hours", 1),
				hh : Sc("Hours", 2, -12),
				h : Sc("Hours", 1, -12),
				mm : Sc("Minutes", 2),
				m : Sc("Minutes", 1),
				ss : Sc("Seconds", 2),
				s : Sc("Seconds", 1),
				sss : Sc("Milliseconds", 3),
				EEEE : Tc("Day"),
				EEE : Tc("Day", !0),
				a : Vc,
				Z : Uc
			},
			me = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
			ne = /^\-?\d+$/;
		Wc.$inject = [ "$locale" ];
		var oe = q(jd),
			pe = q(ld);
		Zc.$inject = [ "$parse" ];
		var qe = q({
				restrict : "E",
				compile : function(a, c) {
					return 8 >= od && (c.href || c.name || c.$set("href", ""), a.append(b.createComment("IE fix"))), c.href || c.xlinkHref || c.name ? void 0 : function(a, b) {
							var c = "[object SVGAnimatedString]" === vd.call(b.prop("href")) ? "xlink:href" : "href";
							b.on("click", function(a) {
								b.attr(c) || a.preventDefault()
							})
					}
				}
			}),
			re = {};
		f(Ld, function(a, b) {
			if ("multiple" != a) {
				var c = Nb("ng-" + b);
				re[c] = function() {
					return {
						priority : 100,
						link : function(a, d, e) {
							a.$watch(e[c], function(a) {
								e.$set(b, !!a)
							})
						}
					}
				}
			}
		}), f([ "src", "srcset", "href" ], function(a) {
			var b = Nb("ng-" + a);
			re[b] = function() {
				return {
					priority : 99,
					link : function(c, d, e) {
						var f = a,
							g = a;
						"href" === a && "[object SVGAnimatedString]" === vd.call(d.prop("href")) && (g = "xlinkHref", e.$attr[g] = "xlink:href", f = null), e.$observe(b, function(a) {
							a && (e.$set(g, a), od && f && d.prop(f, e[g]))
						})
					}
				}
			}
		});
		var se = {
			$addControl : o,
			$removeControl : o,
			$setValidity : o,
			$setDirty : o,
			$setPristine : o
		};
		_c.$inject = [ "$element", "$attrs", "$scope", "$animate" ];
		var te = function(a) {
				return [ "$timeout", function(b) {
					var d = {
						name : "form",
						restrict : a ? "EAC" : "E",
						controller : _c,
						compile : function() {
							return {
								pre : function(a, d, e, f) {
									if (!e.action) {
										var g = function(a) {
											a.preventDefault ? a.preventDefault() : a.returnValue = !1
										};
										Fd(d[0], "submit", g), d.on("$destroy", function() {
											b(function() {
												Gd(d[0], "submit", g)
											}, 0, !1)
										})
									}
									var h = d.parent().controller("form"),
										i = e.name || e.ngForm;
									i && rc(a, i, f, i), h && d.on("$destroy", function() {
										h.$removeControl(f), i && rc(a, i, c, i), l(f, se)
									})
								}
							}
						}
					};
					return d
				} ]
			},
			ue = te(),
			ve = te(!0),
			we = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
			xe = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
			ye = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
			ze = {
				text : cd,
				number : dd,
				url : ed,
				email : fd,
				radio : gd,
				checkbox : hd,
				hidden : o,
				button : o,
				submit : o,
				reset : o,
				file : o
			},
			Ae = [ "$browser", "$sniffer", function(a, b) {
				return {
					restrict : "E",
					require : "?ngModel",
					link : function(c, d, e, f) {
						f && (ze[jd(e.type)] || ze.text)(c, d, e, f, b, a)
					}
				}
			} ],
			Be = "ng-valid",
			Ce = "ng-invalid",
			De = "ng-pristine",
			Ee = "ng-dirty",
			Fe = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", function(a, b, c, e, g, h) {
				function i(a, b) {
					b = b ? "-" + ab(b, "-") : "", h.removeClass(e, (a ? Ce : Be) + b), h.addClass(e, (a ? Be : Ce) + b)
				}
				this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$name = c.name;
				var j = g(c.ngModel),
					k = j.assign;
				if (!k)
					throw d("ngModel")("nonassign", "Expression '{0}' is non-assignable. Element: {1}", c.ngModel, U(e));
				this.$render = o, this.$isEmpty = function(a) {
					return r(a) || "" === a || null === a || a !== a
				};
				var l = e.inheritedData("$formController") || se,
					m = 0,
					n = this.$error = {};
				e.addClass(De), i(!0), this.$setValidity = function(a, b) {
					n[a] !== !b && (b ? (n[a] && m--, m || (i(!0), this.$valid = !0, this.$invalid = !1)) : (i(!1), this.$invalid = !0, this.$valid = !1, m++), n[a] = !b, i(b, a), l.$setValidity(a, b, this))
				}, this.$setPristine = function() {
					this.$dirty = !1, this.$pristine = !0, h.removeClass(e, Ee), h.addClass(e, De)
				}, this.$setViewValue = function(c) {
					this.$viewValue = c, this.$pristine && (this.$dirty = !0, this.$pristine = !1, h.removeClass(e, De), h.addClass(e, Ee), l.$setDirty()), f(this.$parsers, function(a) {
						c = a(c)
					}), this.$modelValue !== c && (this.$modelValue = c, k(a, c), f(this.$viewChangeListeners, function(a) {
						try {
							a()
						} catch (c) {
							b(c)
						}
					}))
				};
				var p = this;
				a.$watch(function() {
					var b = j(a);
					if (p.$modelValue !== b) {
						var c = p.$formatters,
							d = c.length;
						for (p.$modelValue = b; d--;) b = c[d](b);
						p.$viewValue !== b && (p.$viewValue = b, p.$render())
					}
					return b
				})
			} ],
			Ge = function() {
				return {
					require : [ "ngModel", "^?form" ],
					controller : Fe,
					link : function(a, b, c, d) {
						var e = d[0],
							f = d[1] || se;
						f.$addControl(e), a.$on("$destroy", function() {
							f.$removeControl(e)
						})
					}
				}
			},
			He = q({
				require : "ngModel",
				link : function(a, b, c, d) {
					d.$viewChangeListeners.push(function() {
						a.$eval(c.ngChange)
					})
				}
			}),
			Ie = function() {
				return {
					require : "?ngModel",
					link : function(a, b, c, d) {
						if (d) {
							c.required = !0;
							var e = function(a) {
								return c.required && d.$isEmpty(a) ? void d.$setValidity("required", !1) : (d.$setValidity("required", !0), a)
							};
							d.$formatters.push(e), d.$parsers.unshift(e), c.$observe("required", function() {
								e(d.$viewValue)
							})
						}
					}
				}
			},
			Je = function() {
				return {
					require : "ngModel",
					link : function(a, b, d, e) {
						var g = /\/(.*)\//.exec(d.ngList),
							h = g && new RegExp(g[1]) || d.ngList || ",",
							i = function(a) {
								if (!r(a)) {
									var b = [];
									return a && f(a.split(h), function(a) {
											a && b.push(zd(a))
										}), b
								}
							};
						e.$parsers.push(i), e.$formatters.push(function(a) {
							return x(a) ? a.join(", ") : c
						}), e.$isEmpty = function(a) {
							return !a || !a.length
						}
					}
				}
			},
			Ke = /^(true|false|\d+)$/,
			Le = function() {
				return {
					priority : 100,
					compile : function(a, b) {
						return Ke.test(b.ngValue) ? function(a, b, c) {
							c.$set("value", a.$eval(c.ngValue))
						} : function(a, b, c) {
							a.$watch(c.ngValue, function(a) {
								c.$set("value", a)
							})
						}
					}
				}
			},
			Me = $c(function(a, b, d) {
				b.addClass("ng-binding").data("$binding", d.ngBind), a.$watch(d.ngBind, function(a) {
					b.text(a == c ? "" : a)
				})
			}),
			Ne = [ "$interpolate", function(a) {
				return function(b, c, d) {
					var e = a(c.attr(d.$attr.ngBindTemplate));
					c.addClass("ng-binding").data("$binding", e), d.$observe("ngBindTemplate", function(a) {
						c.text(a)
					})
				}
			} ],
			Oe = [ "$sce", "$parse", function(a, b) {
				return function(c, d, e) {
					function f() {
						return (g(c) || "").toString()
					}
					d.addClass("ng-binding").data("$binding", e.ngBindHtml);
					var g = b(e.ngBindHtml);
					c.$watch(f, function() {
						d.html(a.getTrustedHtml(g(c)) || "")
					})
				}
			} ],
			Pe = id("", !0),
			Qe = id("Odd", 0),
			Re = id("Even", 1),
			Se = $c({
				compile : function(a, b) {
					b.$set("ngCloak", c), a.removeClass("ng-cloak")
				}
			}),
			Te = [ function() {
				return {
					scope : !0,
					controller : "@",
					priority : 500
				}
			} ],
			Ue = {};
		f("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(a) {
			var b = Nb("ng-" + a);
			Ue[b] = [ "$parse", function(c) {
				return {
					compile : function(d, e) {
						var f = c(e[b]);
						return function(b, c) {
							c.on(jd(a), function(a) {
								b.$apply(function() {
									f(b, {
										$event : a
									})
								})
							})
						}
					}
				}
			} ]
		});
		var Ve = [ "$animate", function(a) {
				return {
					transclude : "element",
					priority : 600,
					terminal : !0,
					restrict : "A",
					$$tlb : !0,
					link : function(c, d, e, f, g) {
						var h,
							i,
							j;
						c.$watch(e.ngIf, function(f) {
							T(f) ? i || (i = c.$new(), g(i, function(c) {
								c[c.length++] = b.createComment(" end ngIf: " + e.ngIf + " "), h = {
									clone : c
								}, a.enter(c, d.parent(), d)
							})) : (j && (j.remove(), j = null), i && (i.$destroy(), i = null), h && (j = gb(h.clone), a.leave(j, function() {
								j = null
							}), h = null))
						})
					}
				}
			} ],
			We = [ "$http", "$templateCache", "$anchorScroll", "$animate", "$sce", function(a, b, c, d, e) {
				return {
					restrict : "ECA",
					priority : 400,
					terminal : !0,
					transclude : "element",
					controller : xd.noop,
					compile : function(f, g) {
						var h = g.ngInclude || g.src,
							i = g.onload || "",
							j = g.autoscroll;
						return function(f, g, k, l, m) {
							var n,
								o,
								p,
								q = 0,
								r = function() {
									o && (o.remove(), o = null), n && (n.$destroy(), n = null), p && (d.leave(p, function() {
										o = null
									}), o = p, p = null)
								};
							f.$watch(e.parseAsResourceUrl(h), function(e) {
								var h = function() {
										!s(j) || j && !f.$eval(j) || c()
									},
									k = ++q;
								e ? (a.get(e, {
									cache : b
								}).success(function(a) {
									if (k === q) {
										var b = f.$new();
										l.template = a;
										var c = m(b, function(a) {
											r(), d.enter(a, null, g, h)
										});
										n = b, p = c, n.$emit("$includeContentLoaded"), f.$eval(i)
									}
								}).error(function() {
									k === q && r()
								}), f.$emit("$includeContentRequested")) : (r(), l.template = null)
							})
						}
					}
				}
			} ],
			Xe = [ "$compile", function(a) {
				return {
					restrict : "ECA",
					priority : -400,
					require : "ngInclude",
					link : function(b, c, d, e) {
						c.html(e.template), a(c.contents())(b)
					}
				}
			} ],
			Ye = $c({
				priority : 450,
				compile : function() {
					return {
						pre : function(a, b, c) {
							a.$eval(c.ngInit)
						}
					}
				}
			}),
			Ze = $c({
				terminal : !0,
				priority : 1e3
			}),
			$e = [ "$locale", "$interpolate", function(a, b) {
				var c = /{}/g;
				return {
					restrict : "EA",
					link : function(d, e, g) {
						var h = g.count,
							i = g.$attr.when && e.attr(g.$attr.when),
							j = g.offset || 0,
							k = d.$eval(i) || {},
							l = {},
							m = b.startSymbol(),
							n = b.endSymbol(),
							o = /^when(Minus)?(.+)$/;
						f(g, function(a, b) {
							o.test(b) && (k[jd(b.replace("when", "").replace("Minus", "-"))] = e.attr(g.$attr[b]))
						}), f(k, function(a, d) {
							l[d] = b(a.replace(c, m + h + "-" + j + n))
						}), d.$watch(function() {
							var b = parseFloat(d.$eval(h));
							return isNaN(b) ? "" : (b in k || (b = a.pluralCat(b - j)), l[b](d, e, !0))
						}, function(a) {
							e.text(a)
						})
					}
				}
			} ],
			_e = [ "$parse", "$animate", function(a, c) {
				function g(a) {
					return a.clone[0]
				}
				function h(a) {
					return a.clone[a.clone.length - 1]
				}
				var i = "$$NG_REMOVED",
					j = d("ngRepeat");
				return {
					transclude : "element",
					priority : 1e3,
					terminal : !0,
					$$tlb : !0,
					link : function(d, k, l, m, n) {
						var o,
							p,
							q,
							r,
							s,
							t,
							u,
							v,
							w,
							x = l.ngRepeat,
							y = x.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),
							z = {
								$id : Cb
							};
						if (!y)
							throw j("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", x);
						if (t = y[1], u = y[2], o = y[3], o ? (p = a(o), q = function(a, b, c) {
								return w && (z[w] = a), z[v] = b, z.$index = c, p(d, z)
							}) : (r = function(a, b) {
								return Cb(b)
							}, s = function(a) {
								return a
							}), y = t.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !y)
							throw j("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", t);
						v = y[3] || y[1], w = y[2];
						var A = {};
						d.$watchCollection(u, function(a) {
							var l,
								m,
								o,
								p,
								t,
								u,
								y,
								z,
								B,
								C,
								D,
								E,
								F = k[0],
								G = {},
								H = [];
							if (e(a)) C = a, B = q || r;else {
								B = q || s, C = [];
								for (u in a) a.hasOwnProperty(u) && "$" != u.charAt(0) && C.push(u);
								C.sort()
							}
							for (p = C.length, m = H.length = C.length, l = 0; m > l; l++)
								if (u = a === C ? l : C[l], y = a[u], z = B(u, y, l), eb(z, "`track by` id"), A.hasOwnProperty(z)) D = A[z],
									delete A[z]
									, G[z] = D, H[l] = D;else {
									if (G.hasOwnProperty(z))
										throw f(H, function(a) {
											a && a.scope && (A[a.id] = a)
										}), j("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}", x, z);
									H[l] = {
										id : z
									}, G[z] = !1
							}
							for (u in A) A.hasOwnProperty(u) && (D = A[u], E = gb(D.clone), c.leave(E), f(E, function(a) {
									a[i] = !0
								}), D.scope.$destroy());
							for (l = 0, m = C.length; m > l; l++) {
								if (u = a === C ? l : C[l], y = a[u], D = H[l], H[l - 1] && (F = h(H[l - 1])), D.scope) {
									t = D.scope, o = F;
									do o = o.nextSibling; while (o && o[i]);
									g(D) != o && c.move(gb(D.clone), null, pd(F)), F = h(D)
								} else
									t = d.$new();
								t[v] = y, w && (t[w] = u), t.$index = l, t.$first = 0 === l, t.$last = l === p - 1, t.$middle = !(t.$first || t.$last), t.$odd = !(t.$even = 0 === (1 & l)), D.scope || n(t, function(a) {
									a[a.length++] = b.createComment(" end ngRepeat: " + x + " "), c.enter(a, null, pd(F)), F = a, D.scope = t, D.clone = a, G[D.id] = D
								})
							}
							A = G
						})
					}
				}
			} ],
			af = [ "$animate", function(a) {
				return function(b, c, d) {
					b.$watch(d.ngShow, function(b) {
						a[T(b) ? "removeClass" : "addClass"](c, "ng-hide")
					})
				}
			} ],
			bf = [ "$animate", function(a) {
				return function(b, c, d) {
					b.$watch(d.ngHide, function(b) {
						a[T(b) ? "addClass" : "removeClass"](c, "ng-hide")
					})
				}
			} ],
			cf = $c(function(a, b, c) {
				a.$watch(c.ngStyle, function(a, c) {
					c && a !== c && f(c, function(a, c) {
						b.css(c, "")
					}), a && b.css(a)
				}, !0)
			}),
			df = [ "$animate", function(a) {
				return {
					restrict : "EA",
					require : "ngSwitch",
					controller : [ "$scope", function() {
						this.cases = {}
					} ],
					link : function(b, c, d, e) {
						var g,
							h,
							i,
							j = d.ngSwitch || d.on,
							k = [];
						b.$watch(j, function(c) {
							var j,
								l = k.length;
							if (l > 0) {
								if (i) {
									for (j = 0; l > j; j++) i[j].remove();
									i = null
								}
								for (i = [], j = 0; l > j; j++) {
									var m = h[j];
									k[j].$destroy(), i[j] = m, a.leave(m, function() {
										i.splice(j, 1), 0 === i.length && (i = null)
									})
								}
							}
							h = [], k = [], (g = e.cases["!" + c] || e.cases["?"]) && (b.$eval(d.change), f(g, function(c) {
								var d = b.$new();
								k.push(d), c.transclude(d, function(b) {
									var d = c.element;
									h.push(b), a.enter(b, d.parent(), d)
								})
							}))
						})
					}
				}
			} ],
			ef = $c({
				transclude : "element",
				priority : 800,
				require : "^ngSwitch",
				link : function(a, b, c, d, e) {
					d.cases["!" + c.ngSwitchWhen] = d.cases["!" + c.ngSwitchWhen] || [], d.cases["!" + c.ngSwitchWhen].push({
						transclude : e,
						element : b
					})
				}
			}),
			ff = $c({
				transclude : "element",
				priority : 800,
				require : "^ngSwitch",
				link : function(a, b, c, d, e) {
					d.cases["?"] = d.cases["?"] || [], d.cases["?"].push({
						transclude : e,
						element : b
					})
				}
			}),
			gf = $c({
				link : function(a, b, c, e, f) {
					if (!f)
						throw d("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", U(b));
					f(function(a) {
						b.empty(), b.append(a)
					})
				}
			}),
			hf = [ "$templateCache", function(a) {
				return {
					restrict : "E",
					terminal : !0,
					compile : function(b, c) {
						if ("text/ng-template" == c.type) {
							var d = c.id,
								e = b[0].text;
							a.put(d, e)
						}
					}
				}
			} ],
			jf = d("ngOptions"),
			kf = q({
				terminal : !0
			}),
			lf = [ "$compile", "$parse", function(a, d) {
				var e = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
					h = {
						$setViewValue : o
					};
				return {
					restrict : "E",
					require : [ "select", "?ngModel" ],
					controller : [ "$element", "$scope", "$attrs", function(a, b, c) {
						var d,
							e,
							f = this,
							g = {},
							i = h;
						f.databound = c.ngModel, f.init = function(a, b, c) {
							i = a, d = b, e = c
						}, f.addOption = function(b) {
							eb(b, '"option value"'), g[b] = !0, i.$viewValue == b && (a.val(b), e.parent() && e.remove())
						}, f.removeOption = function(a) {
							this.hasOption(a) && (
							delete g[a]
							, i.$viewValue == a && this.renderUnknownOption(a))
						}, f.renderUnknownOption = function(b) {
							var c = "? " + Cb(b) + " ?";
							e.val(c), a.prepend(e), a.val(c), e.prop("selected", !0)
						}, f.hasOption = function(a) {
							return g.hasOwnProperty(a)
						}, b.$on("$destroy", function() {
							f.renderUnknownOption = o
						})
					} ],
					link : function(h, i, j, k) {
						function l(a, b, c, d) {
							c.$render = function() {
								var a = c.$viewValue;
								d.hasOption(a) ? (z.parent() && z.remove(), b.val(a), "" === a && o.prop("selected", !0)) : r(a) && o ? b.val("") : d.renderUnknownOption(a)
							}, b.on("change", function() {
								a.$apply(function() {
									z.parent() && z.remove(), c.$setViewValue(b.val())
								})
							})
						}
						function m(a, b, c) {
							var d;
							c.$render = function() {
								var a = new Db(c.$viewValue);
								f(b.find("option"), function(b) {
									b.selected = s(a.get(b.value))
								})
							}, a.$watch(function() {
								L(d, c.$viewValue) || (d = J(c.$viewValue), c.$render())
							}), b.on("change", function() {
								a.$apply(function() {
									var a = [];
									f(b.find("option"), function(b) {
										b.selected && a.push(b.value)
									}), c.$setViewValue(a)
								})
							})
						}
						function n(b, f, h) {
							function i() {
								var a,
									c,
									d,
									e,
									i,
									j,
									q,
									u,
									A,
									B,
									C,
									D,
									E,
									F,
									G,
									H = {
										"" : []
									},
									I = [ "" ],
									J = h.$modelValue,
									K = p(b) || [],
									L = m ? g(K) : K,
									M = {},
									N = !1;
								if (t)
									if (r && x(J)) {
										N = new Db([]);
										for (var O = 0; O < J.length; O++) M[l] = J[O], N.put(r(b, M), J[O])
									} else
										N = new Db(J);
								for (C = 0; A = L.length, A > C; C++) {
									if (q = C, m) {
										if (q = L[C], "$" === q.charAt(0)) continue;
										M[m] = q
									}
									if (M[l] = K[q], a = n(b, M) || "", (c = H[a]) || (c = H[a] = [], I.push(a)), t)
										D = s(N.remove(r ? r(b, M) : o(b, M)));else {
										if (r) {
											var P = {};
											P[l] = J, D = r(b, P) === r(b, M)
										} else
											D = J === o(b, M);
										N = N || D
									}
									G = k(b, M), G = s(G) ? G : "", c.push({
										id : r ? r(b, M) : m ? L[C] : C,
										label : G,
										selected : D
									})
								}
								for (t || (v || null === J ? H[""].unshift({
										id : "",
										label : "",
										selected : !N
									}) : N || H[""].unshift({
										id : "?",
										label : "",
										selected : !0
									})), B = 0, u = I.length; u > B; B++) {
									for (a = I[B], c = H[a], z.length <= B ? (e = {
											element : y.clone().attr("label", a),
											label : c.label
										}, i = [ e ], z.push(i), f.append(e.element)) : (i = z[B], e = i[0], e.label != a && e.element.attr("label", e.label = a)), E = null, C = 0, A = c.length; A > C; C++) d = c[C], (j = i[C + 1]) ? (E = j.element, j.label !== d.label && E.text(j.label = d.label), j.id !== d.id && E.val(j.id = d.id), j.selected !== d.selected && E.prop("selected", j.selected = d.selected)) : ("" === d.id && v ? F = v : (F = w.clone()).val(d.id).attr("selected", d.selected).text(d.label), i.push(j = {
											element : F,
											label : d.label,
											id : d.id,
											selected : d.selected
										}), E ? E.after(F) : e.element.append(F), E = F);
									for (C++; i.length > C;) i.pop().element.remove()
								}
								for (; z.length > B;) z.pop()[0].element.remove()
							}
							var j;
							if (!(j = u.match(e)))
								throw jf("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", u, U(f));
							var k = d(j[2] || j[1]),
								l = j[4] || j[6],
								m = j[5],
								n = d(j[3] || ""),
								o = d(j[2] ? j[1] : l),
								p = d(j[7]),
								q = j[8],
								r = q ? d(j[8]) : null,
								z = [ [ {
									element : f,
									label : ""
								} ] ];
							v && (a(v)(b), v.removeClass("ng-scope"), v.remove()), f.empty(), f.on("change", function() {
								b.$apply(function() {
									var a,
										d,
										e,
										g,
										i,
										j,
										k,
										n,
										q,
										s = p(b) || [],
										u = {};
									if (t) {
										for (e = [], j = 0, n = z.length; n > j; j++)
											for (a = z[j], i = 1, k = a.length; k > i; i++)
												if ((g = a[i].element)[0].selected) {
													if (d = g.val(), m && (u[m] = d), r)
														for (q = 0; q < s.length && (u[l] = s[q], r(b, u) != d); q++)
															;
													else
														u[l] = s[d];
													e.push(o(b, u))
										}
									} else {
										if (d = f.val(), "?" == d)
											e = c;
										else if ("" === d)
											e = null;
										else if (r) {
											for (q = 0; q < s.length; q++)
												if (u[l] = s[q], r(b, u) == d) {
													e = o(b, u);break
											}
										} else u[l] = s[d], m && (u[m] = d), e = o(b, u);
										z[0].length > 1 && z[0][1].id !== d && (z[0][1].selected = !1)
									}
									h.$setViewValue(e)
								})
							}), h.$render = i, b.$watch(i)
						}
						if (k[1]) {
							for (var o, p = k[0], q = k[1], t = j.multiple, u = j.ngOptions, v = !1, w = pd(b.createElement("option")), y = pd(b.createElement("optgroup")), z = w.clone(), A = 0, B = i.children(), C = B.length; C > A; A++)
								if ("" === B[A].value) {
									o = v = B.eq(A);break
							}
							p.init(q, v, z), t && (q.$isEmpty = function(a) {
								return !a || 0 === a.length
							}), u ? n(h, i, q) : t ? m(h, i, q) : l(h, i, q, p)
						}
					}
				}
			} ],
			mf = [ "$interpolate", function(a) {
				var b = {
					addOption : o,
					removeOption : o
				};
				return {
					restrict : "E",
					priority : 100,
					compile : function(c, d) {
						if (r(d.value)) {
							var e = a(c.text(), !0);
							e || d.$set("value", c.text())
						}
						return function(a, c, d) {
							var f = "$selectController",
								g = c.parent(),
								h = g.data(f) || g.parent().data(f);
							h && h.databound ? c.prop("selected", !1) : h = b, e ? a.$watch(e, function(a, b) {
								d.$set("value", a), a !== b && h.removeOption(b), h.addOption(a)
							}) : h.addOption(d.value), c.on("$destroy", function() {
								h.removeOption(d.value)
							})
						}
					}
				}
			} ],
			nf = q({
				restrict : "E",
				terminal : !0
			});
		return a.angular.bootstrap ? void console.log("WARNING: Tried to load angular more than once.") : (bb(), ib(xd), void pd(b).ready(function() {
			$(b, _)
		}))
	}(window, document), !angular.$$csp() && angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}</style>'), function() {
		var a = null;
		!function(b) {
			function c(b) {
				if (c[b] !== f) return c[b];
				var d;
				if ("bug-string-char-index" == b)
					d = "a" != "a"[0];
				else if ("json" == b)
					d = c("json-stringify") && c("json-parse");else {
					var e;
					if ("json-stringify" == b) {
						d = j.stringify;
						var h = "function" == typeof d && k;
						if (h) {
							(e = function() {
								return 1
							}).toJSON = e;try {
								h = "0" === d(0) && "0" === d(new Number) && '""' == d(new String) && d(g) === f && d(f) === f && d() === f && "1" === d(e) && "[1]" == d([ e ]) && "[null]" == d([ f ]) && "null" == d(a) && "[null,null,null]" == d([ f, g, a ]) && '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}' == d({
										a : [ e, !0, !1, a, "\x00\b\n\f\r	" ]
									}) && "1" === d(a, e) && "[\n 1,\n 2\n]" == d([ 1, 2 ], a, 1) && '"-271821-04-20T00:00:00.000Z"' == d(new Date(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == d(new Date(864e13)) && '"-000001-01-01T00:00:00.000Z"' == d(new Date(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == d(new Date(-1))
							} catch (i) {
								h = !1
							}
						}
						d = h
					}
					if ("json-parse" == b) {
						if (d = j.parse, "function" == typeof d) try {
								if (0 === d("0") && !d(!1)) {
									e = d('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');
									var l = 5 == e.a.length && 1 === e.a[0];
									if (l) {
										try {
											l = !d('"	"')
										} catch (m) {}
										if (l) try {
												l = 1 !== d("01")
											} catch (n) {}
										if (l) try {
												l = 1 !== d("1.")
											} catch (o) {}
									}
								}
							} catch (p) {
								l = !1
						}
						d = l
					}
				}
				return c[b] = !!d
			}
			var d,
				e,
				f,
				g = {}.toString,
				h = "function" == typeof define && define.amd,
				i = "object" == typeof JSON && JSON,
				j = "object" == typeof exports && exports && !exports.nodeType && exports;
			j && i ? (j.stringify = i.stringify, j.parse = i.parse) : j = b.JSON = i || {};
			var k = new Date(-0xc782b5b800cec);
			try {
				k = -109252 == k.getUTCFullYear() && 0 === k.getUTCMonth() && 1 === k.getUTCDate() && 10 == k.getUTCHours() && 37 == k.getUTCMinutes() && 6 == k.getUTCSeconds() && 708 == k.getUTCMilliseconds()
			} catch (l) {}
			if (!c("json")) {
				var m = c("bug-string-char-index");
				if (!k) var n = Math.floor,
						o = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ],
						p = function(a, b) {
							return o[b] + 365 * (a - 1970) + n((a - 1969 + (b = +(b > 1))) / 4) - n((a - 1901 + b) / 100) + n((a - 1601 + b) / 400)
						};
				(d = {}.hasOwnProperty) || (d = function(b) {
					var c,
						e = {};
					return (e.__proto__ = a, e.__proto__ = {
							toString : 1
						}, e).toString != g ? d = function(b) {
						var c = this.__proto__,
							b = b in (this.__proto__ = a, this);
						return this.__proto__ = c, b
					} : (c = e.constructor, d = function(a) {
						var b = (this.constructor || c).prototype;
						return a in this && !(a in b && this[a] === b[a])
					}), e = a, d.call(this, b)
				});
				var q = {
					"boolean" : 1,
					number : 1,
					string : 1,
					undefined : 1
				};
				if (e = function(b, c) {
						var f,
							h,
							i,
							j = 0;
						(f = function() {
							this.valueOf = 0
						}).prototype.valueOf = 0, h = new f;
						for (i in h) d.call(h, i) && j++;
						return f = h = a, j ? e = 2 == j ? function(a, b) {
								var c,
									e = {},
									f = "[object Function]" == g.call(a);
								for (c in a) !(f && "prototype" == c) && !d.call(e, c) && (e[c] = 1) && d.call(a, c) && b(c)
							} : function(a, b) {
								var c,
									e,
									f = "[object Function]" == g.call(a);
								for (c in a) !(f && "prototype" == c) && d.call(a, c) && !(e = "constructor" === c) && b(c);
								(e || d.call(a, c = "constructor")) && b(c)
							} : (h = [ "valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor" ], e = function(a, b) {
								var c,
									e,
									f = "[object Function]" == g.call(a);
								(e = !f) && (e = "function" != typeof a.constructor) && (e = typeof a.hasOwnProperty, e = "object" == e ? !!a.hasOwnProperty : !q[e]), e = e ? a.hasOwnProperty : d;
								for (c in a) !(f && "prototype" == c) && e.call(a, c) && b(c);
								for (f = h.length; c = h[--f]; e.call(a, c) && b(c))
									;
							}), e(b, c)
					}, !c("json-stringify")) {
					var r = {
							92 : "\\\\",
							34 : '\\"',
							8 : "\\b",
							12 : "\\f",
							10 : "\\n",
							13 : "\\r",
							9 : "\\t"
						},
						s = function(a, b) {
							return ("000000" + (b || 0)).slice(-a)
						},
						t = function(a) {
							var b,
								c = '"',
								d = 0,
								e = a.length,
								f = e > 10 && m;
							for (f && (b = a.split("")); e > d; d++) {
								var g = a.charCodeAt(d);
								switch (g) {
								case 8:
								case 9:
								case 10:
								case 12:
								case 13:
								case 34:
								case 92:
									c += r[g];
									break;default:
									if (32 > g) {
										c += "\\u00" + s(2, g.toString(16));
										break
									}
									c += f ? b[d] : m ? a.charAt(d) : a[d]
								}
							}
							return c + '"'
						},
						u = function(b, c, h, i, j, k, l) {
							var m,
								o,
								q,
								r,
								v,
								w,
								x,
								y,
								z;
							try {
								m = c[b]
							} catch (A) {}
							if ("object" == typeof m && m)
								if (o = g.call(m), "[object Date]" != o || d.call(m, "toJSON")) "function" == typeof m.toJSON && ("[object Number]" != o && "[object String]" != o && "[object Array]" != o || d.call(m, "toJSON")) && (m = m.toJSON(b));
								else if (m > -1 / 0 && 1 / 0 > m) {
									if (p) {
										for (r = n(m / 864e5), o = n(r / 365.2425) + 1970 - 1; p(o + 1, 0) <= r; o++)
											;
										for (q = n((r - p(o, 0)) / 30.42); p(o, q + 1) <= r; q++)
											;
										r = 1 + r - p(o, q), v = (m % 864e5 + 864e5) % 864e5, w = n(v / 36e5) % 24, x = n(v / 6e4) % 60, y = n(v / 1e3) % 60, v %= 1e3
									} else o = m.getUTCFullYear(), q = m.getUTCMonth(), r = m.getUTCDate(), w = m.getUTCHours(), x = m.getUTCMinutes(), y = m.getUTCSeconds(), v = m.getUTCMilliseconds();
									m = (0 >= o || o >= 1e4 ? (0 > o ? "-" : "+") + s(6, 0 > o ? -o : o) : s(4, o)) + "-" + s(2, q + 1) + "-" + s(2, r) + "T" + s(2, w) + ":" + s(2, x) + ":" + s(2, y) + "." + s(3, v) + "Z"
								} else
									m = a;
							if (h && (m = h.call(c, b, m)), m === a) return "null";
							if (o = g.call(m), "[object Boolean]" == o) return "" + m;
							if ("[object Number]" == o) return m > -1 / 0 && 1 / 0 > m ? "" + m : "null";
							if ("[object String]" == o) return t("" + m);
							if ("object" == typeof m) {
								for (b = l.length; b--;)
									if (l[b] === m)
										throw TypeError();
								if (l.push(m), z = [], c = k, k += j, "[object Array]" == o) {
									for (q = 0, b = m.length; b > q; q++) o = u(q, m, h, i, j, k, l), z.push(o === f ? "null" : o);
									b = z.length ? j ? "[\n" + k + z.join(",\n" + k) + "\n" + c + "]" : "[" + z.join(",") + "]" : "[]"
								} else e(i || m, function(a) {
										var b = u(a, m, h, i, j, k, l);
										b !== f && z.push(t(a) + ":" + (j ? " " : "") + b)
									}), b = z.length ? j ? "{\n" + k + z.join(",\n" + k) + "\n" + c + "}" : "{" + z.join(",") + "}" : "{}";
								return l.pop(), b
							}
						};
					j.stringify = function(a, b, c) {
						var d,
							e,
							f,
							h;
						if ("function" == typeof b || "object" == typeof b && b)
							if ("[object Function]" == (h = g.call(b)))
								e = b;
							else if ("[object Array]" == h) {
								f = {};
								for (var i, j = 0, k = b.length; k > j; i = b[j++], h = g.call(i), ("[object String]" == h || "[object Number]" == h) && (f[i] = 1))
									;
						}
						if (c)
							if ("[object Number]" == (h = g.call(c))) {
								if ((c -= c % 1) > 0)
									for (d = "", c > 10 && (c = 10); d.length < c; d += " ")
										;
							} else "[object String]" == h && (d = c.length <= 10 ? c : c.slice(0, 10));
						return u("", (i = {}, i[""] = a, i), e, f, d, "", [])
					}
				}
				if (!c("json-parse")) {
					var v,
						w,
						x = String.fromCharCode,
						y = {
							92 : "\\",
							34 : '"',
							47 : "/",
							98 : "\b",
							116 : "	",
							110 : "\n",
							102 : "\f",
							114 : "\r"
						},
						z = function() {
							throw v = w = a, SyntaxError()
						},
						A = function() {
							for (var b, c, d, e, f, g = w, h = g.length; h > v;) switch (f = g.charCodeAt(v)) {
								case 9:
								case 10:
								case 13:
								case 32:
									v++;
									break;case 123:
								case 125:
								case 91:
								case 93:
								case 58:
								case 44:
									return b = m ? g.charAt(v) : g[v], v++, b;case 34:
									for (b = "@", v++; h > v;)
										if (f = g.charCodeAt(v), 32 > f) z();
										else if (92 == f) switch (
											f = g.charCodeAt(++v)) {
											case 92:
											case 34:
											case 47:
											case 98:
											case 116:
											case 110:
											case 102:
											case 114:
												b += y[f], v++;
												break;case 117:
												for (c = ++v, d = v + 4; d > v; v++) f = g.charCodeAt(v), f >= 48 && 57 >= f || f >= 97 && 102 >= f || f >= 65 && 70 >= f || z();
												b += x("0x" + g.slice(c, v));
												break;default:
												z()
										}else {
											if (34 == f)
												break;
											for (f = g.charCodeAt(v), c = v; f >= 32 && 92 != f && 34 != f;) f = g.charCodeAt(++v);
											b += g.slice(c, v)
									}
									if (34 == g.charCodeAt(v)) return v++, b;
									z();default:
									if (c = v, 45 == f && (e = !0, f = g.charCodeAt(++v)), f >= 48 && 57 >= f) {
										for (48 == f && (f = g.charCodeAt(v + 1), f >= 48 && 57 >= f) && z(); h > v && (f = g.charCodeAt(v), f >= 48 && 57 >= f); v++)
											;
										if (46 == g.charCodeAt(v)) {
											for (d = ++v; h > d && (f = g.charCodeAt(d), f >= 48 && 57 >= f); d++)
												;
											d == v && z(), v = d
										}
										if (f = g.charCodeAt(v), 101 == f || 69 == f) {
											for (f = g.charCodeAt(++v), (43 == f || 45 == f) && v++, d = v; h > d && (f = g.charCodeAt(d), f >= 48 && 57 >= f); d++)
												;
											d == v && z(), v = d
										}
										return +g.slice(c, v)
									}
									if (e && z(), "true" == g.slice(v, v + 4)) return v += 4, !0;
									if ("false" == g.slice(v, v + 5)) return v += 5, !1;
									if ("null" == g.slice(v, v + 4)) return v += 4, a;
									z()
							}
							return "$"
						},
						B = function(a) {
							var b,
								c;
							if ("$" == a && z(), "string" == typeof a) {
								if ("@" == (m ? a.charAt(0) : a[0])) return a.slice(1);
								if ("[" == a) {
									for (b = []; a = A(), "]" != a; c || (c = !0)) c && ("," == a ? (a = A(), "]" == a && z()) : z()), "," == a && z(), b.push(B(a));
									return b
								}
								if ("{" == a) {
									for (b = {}; a = A(), "}" != a; c || (c = !0)) c && ("," == a ? (a = A(), "}" == a && z()) : z()), ("," == a || "string" != typeof a || "@" != (m ? a.charAt(0) : a[0]) || ":" != A()) && z(), b[a.slice(1)] = B(A());
									return b
								}
								z()
							}
							return a
						},
						C = function(a, b, c) {
							c = D(a, b, c), c === f ?
								delete a[b]
								: a[b] = c
						},
						D = function(a, b, c) {
							var d,
								f = a[b];
							if ("object" == typeof f && f)
								if ("[object Array]" == g.call(f))
									for (d = f.length; d--;) C(f, d, c);
								else e(f, function(a) {
										C(f, a, c)
									});
							return c.call(a, b, f)
						};
					j.parse = function(b, c) {
						var d,
							e;
						return v = 0, w = "" + b, d = B(A()), "$" != A() && z(), v = w = a, c && "[object Function]" == g.call(c) ? D((e = {}, e[""] = d, e), "", c) : d
					}
				}
			}
			h && define(function() {
				return j
			})
		}(this)
	}(), "undefined" == typeof jQuery)
	throw new Error("Bootstrap requires jQuery");
+function(a) {
	"use strict";
	function b() {
		var a = document.createElement("bootstrap"),
			b = {
				WebkitTransition : "webkitTransitionEnd",
				MozTransition : "transitionend",
				OTransition : "oTransitionEnd otransitionend",
				transition : "transitionend"
			};
		for (var c in b)
			if (void 0 !== a.style[c]) return {
					end : b[c]
		}
	}
	a.fn.emulateTransitionEnd = function(b) {
		var c = !1,
			d = this;
		a(this).one(a.support.transition.end, function() {
			c = !0
		});
		var e = function() {
			c || a(d).trigger(a.support.transition.end)
		};
		return setTimeout(e, b), this
	}, a(function() {
		a.support.transition = b()
	})
}(jQuery), +function(a) {
	"use strict";
	var b = '[data-dismiss="alert"]',
		c = function(c) {
			a(c).on("click", b, this.close)
		};
	c.prototype.close = function(b) {
		function c() {
			f.trigger("closed.bs.alert").remove()
		}
		var d = a(this),
			e = d.attr("data-target");
		e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
		var f = a(e);
		b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one(a.support.transition.end, c).emulateTransitionEnd(150) : c())
	};
	var d = a.fn.alert;
	a.fn.alert = function(b) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.alert");
			e || d.data("bs.alert", e = new c(this)), "string" == typeof b && e[b].call(d)
		})
	}, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function() {
		return a.fn.alert = d, this
	}, a(document).on("click.bs.alert.data-api", b, c.prototype.close)
}(jQuery), +function(a) {
	"use strict";
	var b = function(c, d) {
		this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d)
	};
	b.DEFAULTS = {
		loadingText : "loading..."
	}, b.prototype.setState = function(a) {
		var b = "disabled",
			c = this.$element,
			d = c.is("input") ? "val" : "html",
			e = c.data();
		a += "Text", e.resetText || c.data("resetText", c[d]()), c[d](e[a] || this.options[a]), setTimeout(function() {
			"loadingText" == a ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b)
		}, 0)
	}, b.prototype.toggle = function() {
		var a = this.$element.closest('[data-toggle="buttons"]'),
			b = !0;
		if (a.length) {
			var c = this.$element.find("input");
			"radio" === c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? b = !1 : a.find(".active").removeClass("active")), b && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
		}
		b && this.$element.toggleClass("active")
	};
	var c = a.fn.button;
	a.fn.button = function(c) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.button"),
				f = "object" == typeof c && c;
			e || d.data("bs.button", e = new b(this, f)), "toggle" == c ? e.toggle() : c && e.setState(c)
		})
	}, a.fn.button.Constructor = b, a.fn.button.noConflict = function() {
		return a.fn.button = c, this
	}, a(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(b) {
		var c = a(b.target);
		c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle"), b.preventDefault()
	})
}(jQuery), +function(a) {
	"use strict";
	var b = function(b, c) {
		this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
	};
	b.DEFAULTS = {
		interval : 5e3,
		pause : "hover",
		wrap : !0
	}, b.prototype.cycle = function(b) {
		return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
	}, b.prototype.getActiveIndex = function() {
		return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
	}, b.prototype.to = function(b) {
		var c = this,
			d = this.getActiveIndex();
		return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
			c.to(b)
		}) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
	}, b.prototype.pause = function(b) {
		return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition.end && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
	}, b.prototype.next = function() {
		return this.sliding ? void 0 : this.slide("next")
	}, b.prototype.prev = function() {
		return this.sliding ? void 0 : this.slide("prev")
	}, b.prototype.slide = function(b, c) {
		var d = this.$element.find(".item.active"),
			e = c || d[b](),
			f = this.interval,
			g = "next" == b ? "left" : "right",
			h = "next" == b ? "first" : "last",
			i = this;
		if (!e.length) {
			if (!this.options.wrap) return;
			e = this.$element.find(".item")[h]()
		}
		this.sliding = !0, f && this.pause();
		var j = a.Event("slide.bs.carousel", {
			relatedTarget : e[0],
			direction : g
		});
		if (!e.hasClass("active")) {
			if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel", function() {
					var b = a(i.$indicators.children()[i.getActiveIndex()]);
					b && b.addClass("active")
				})), a.support.transition && this.$element.hasClass("slide")) {
				if (this.$element.trigger(j), j.isDefaultPrevented()) return;
				e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function() {
					e.removeClass([ b, g ].join(" ")).addClass("active"), d.removeClass([ "active", g ].join(" ")), i.sliding = !1, setTimeout(function() {
						i.$element.trigger("slid.bs.carousel")
					}, 0)
				}).emulateTransitionEnd(600)
			} else {
				if (this.$element.trigger(j), j.isDefaultPrevented()) return;
				d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid.bs.carousel")
			}
			return f && this.cycle(), this
		}
	};
	var c = a.fn.carousel;
	a.fn.carousel = function(c) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.carousel"),
				f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c),
				g = "string" == typeof c ? c : f.slide;
			e || d.data("bs.carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle()
		})
	}, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function() {
		return a.fn.carousel = c, this
	}, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(b) {
		var c,
			d = a(this),
			e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")),
			f = a.extend({}, e.data(), d.data()),
			g = d.attr("data-slide-to");
		g && (f.interval = !1), e.carousel(f), (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g), b.preventDefault()
	}), a(window).on("load", function() {
		a('[data-ride="carousel"]').each(function() {
			var b = a(this);
			b.carousel(b.data())
		})
	})
}(jQuery), +function(a) {
	"use strict";
	var b = function(c, d) {
		this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
	};
	b.DEFAULTS = {
		toggle : !0
	}, b.prototype.dimension = function() {
		var a = this.$element.hasClass("width");
		return a ? "width" : "height"
	}, b.prototype.show = function() {
		if (!this.transitioning && !this.$element.hasClass("in")) {
			var b = a.Event("show.bs.collapse");
			if (this.$element.trigger(b), !b.isDefaultPrevented()) {
				var c = this.$parent && this.$parent.find("> .panel > .in");
				if (c && c.length) {
					var d = c.data("bs.collapse");
					if (d && d.transitioning) return;
					c.collapse("hide"), d || c.data("bs.collapse", null)
				}
				var e = this.dimension();
				this.$element.removeClass("collapse").addClass("collapsing")[e](0), this.transitioning = 1;
				var f = function() {
					this.$element.removeClass("collapsing").addClass("in")[e]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
				};
				if (!a.support.transition) return f.call(this);
				var g = a.camelCase([ "scroll", e ].join("-"));
				this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g])
			}
		}
	}, b.prototype.hide = function() {
		if (!this.transitioning && this.$element.hasClass("in")) {
			var b = a.Event("hide.bs.collapse");
			if (this.$element.trigger(b), !b.isDefaultPrevented()) {
				var c = this.dimension();
				this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
				var d = function() {
					this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
				};
				return a.support.transition ? void this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this)
			}
		}
	}, b.prototype.toggle = function() {
		this[this.$element.hasClass("in") ? "hide" : "show"]()
	};
	var c = a.fn.collapse;
	a.fn.collapse = function(c) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.collapse"),
				f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c);
			e || d.data("bs.collapse", e = new b(this, f)), "string" == typeof c && e[c]()
		})
	}, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function() {
		return a.fn.collapse = c, this
	}, a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(b) {
		var c,
			d = a(this),
			e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""),
			f = a(e),
			g = f.data("bs.collapse"),
			h = g ? "toggle" : d.data(),
			i = d.attr("data-parent"),
			j = i && a(i);
		g && g.transitioning || (j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(d).addClass("collapsed"), d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), f.collapse(h)
	})
}(jQuery), +function(a) {
	"use strict";
	function b() {
		a(d).remove(), a(e).each(function(b) {
			var d = c(a(this));
			d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown")), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown"))
		})
	}
	function c(b) {
		var c = b.attr("data-target");
		c || (c = b.attr("href"), c = c && /#/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));var d = c && a(c);
		return d && d.length ? d : b.parent()
	}
	var d = ".dropdown-backdrop",
		e = "[data-toggle=dropdown]",
		f = function(b) {
			a(b).on("click.bs.dropdown", this.toggle)
		};
	f.prototype.toggle = function(d) {
		var e = a(this);
		if (!e.is(".disabled, :disabled")) {
			var f = c(e),
				g = f.hasClass("open");
			if (b(), !g) {
				if ("ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b), f.trigger(d = a.Event("show.bs.dropdown")), d.isDefaultPrevented()) return;
				f.toggleClass("open").trigger("shown.bs.dropdown"), e.focus()
			}
			return !1
		}
	}, f.prototype.keydown = function(b) {
		if (/(38|40|27)/.test(b.keyCode)) {
			var d = a(this);
			if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
				var f = c(d),
					g = f.hasClass("open");
				if (!g || g && 27 == b.keyCode) return 27 == b.which && f.find(e).focus(), d.click();
				var h = a("[role=menu] li:not(.divider):visible a", f);
				if (h.length) {
					var i = h.index(h.filter(":focus"));
					38 == b.keyCode && i > 0 && i--, 40 == b.keyCode && i < h.length - 1 && i++, ~i || (i = 0), h.eq(i).focus()
				}
			}
		}
	};
	var g = a.fn.dropdown;
	a.fn.dropdown = function(b) {
		return this.each(function() {
			var c = a(this),
				d = c.data("bs.dropdown");
			d || c.data("bs.dropdown", d = new f(this)), "string" == typeof b && d[b].call(c)
		})
	}, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function() {
		return a.fn.dropdown = g, this
	}, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
		a.stopPropagation()
	}).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu]", f.prototype.keydown)
}(jQuery), +function(a) {
	"use strict";
	var b = function(b, c) {
		this.options = c, this.$element = a(b), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote)
	};
	b.DEFAULTS = {
		backdrop : !0,
		keyboard : !0,
		show : !0
	}, b.prototype.toggle = function(a) {
		return this[this.isShown ? "hide" : "show"](a)
	}, b.prototype.show = function(b) {
		var c = this,
			d = a.Event("show.bs.modal", {
				relatedTarget : b
			});
		this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function() {
			var d = a.support.transition && c.$element.hasClass("fade");
			c.$element.parent().length || c.$element.appendTo(document.body), c.$element.show(), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
			var e = a.Event("shown.bs.modal", {
				relatedTarget : b
			});
			d ? c.$element.find(".modal-dialog").one(a.support.transition.end, function() {
				c.$element.focus().trigger(e)
			}).emulateTransitionEnd(300) : c.$element.focus().trigger(e)
		}))
	}, b.prototype.hide = function(b) {
		b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
	}, b.prototype.enforceFocus = function() {
		a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
			this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus()
		}, this))
	}, b.prototype.escape = function() {
		this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function(a) {
			27 == a.which && this.hide()
		}, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
	}, b.prototype.hideModal = function() {
		var a = this;
		this.$element.hide(), this.backdrop(function() {
			a.removeBackdrop(), a.$element.trigger("hidden.bs.modal")
		})
	}, b.prototype.removeBackdrop = function() {
		this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
	}, b.prototype.backdrop = function(b) {
		var c = this.$element.hasClass("fade") ? "fade" : "";
		if (this.isShown && this.options.backdrop) {
			var d = a.support.transition && c;
			if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", a.proxy(function(a) {
					a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
				}, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
			d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()
		} else
			!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
	};
	var c = a.fn.modal;
	a.fn.modal = function(c, d) {
		return this.each(function() {
			var e = a(this),
				f = e.data("bs.modal"),
				g = a.extend({}, b.DEFAULTS, e.data(), "object" == typeof c && c);
			f || e.data("bs.modal", f = new b(this, g)), "string" == typeof c ? f[c](d) : g.show && f.show(d)
		})
	}, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function() {
		return a.fn.modal = c, this
	}, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(b) {
		var c = a(this),
			d = c.attr("href"),
			e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")),
			f = e.data("modal") ? "toggle" : a.extend({
				remote : !/#/.test(d) && d
			}, e.data(), c.data());
		b.preventDefault(), e.modal(f, this).one("hide", function() {
			c.is(":visible") && c.focus()
		})
	}), a(document).on("show.bs.modal", ".modal", function() {
		a(document.body).addClass("modal-open")
	}).on("hidden.bs.modal", ".modal", function() {
		a(document.body).removeClass("modal-open")
	})
}(jQuery), +function(a) {
	"use strict";
	var b = function(a, b) {
		this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
	};
	b.DEFAULTS = {
		animation : !0,
		placement : "top",
		selector : !1,
		template : '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		trigger : "hover focus",
		title : "",
		delay : 0,
		html : !1,
		container : !1
	}, b.prototype.init = function(b, c, d) {
		this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d);
		for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
			var g = e[f];
			if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
			else if ("manual" != g) {
				var h = "hover" == g ? "mouseenter" : "focus",
					i = "hover" == g ? "mouseleave" : "blur";
				this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
			}
		}
		this.options.selector ? this._options = a.extend({}, this.options, {
			trigger : "manual",
			selector : ""
		}) : this.fixTitle()
	}, b.prototype.getDefaults = function() {
		return b.DEFAULTS
	}, b.prototype.getOptions = function(b) {
		return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
				show : b.delay,
				hide : b.delay
			}), b
	}, b.prototype.getDelegateOptions = function() {
		var b = {},
			c = this.getDefaults();
		return this._options && a.each(this._options, function(a, d) {
				c[a] != d && (b[a] = d)
			}), b
	}, b.prototype.enter = function(b) {
		var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
		return clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function() {
				"in" == c.hoverState && c.show()
			}, c.options.delay.show)) : c.show()
	}, b.prototype.leave = function(b) {
		var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
		return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function() {
				"out" == c.hoverState && c.hide()
			}, c.options.delay.hide)) : c.hide()
	}, b.prototype.show = function() {
		var b = a.Event("show.bs." + this.type);
		if (this.hasContent() && this.enabled) {
			if (this.$element.trigger(b), b.isDefaultPrevented()) return;
			var c = this.tip();
			this.setContent(), this.options.animation && c.addClass("fade");
			var d = "function" == typeof this.options.placement ? this.options.placement.call(this, c[0], this.$element[0]) : this.options.placement,
				e = /\s?auto?\s?/i,
				f = e.test(d);
			f && (d = d.replace(e, "") || "top"), c.detach().css({
				top : 0,
				left : 0,
				display : "block"
			}).addClass(d), this.options.container ? c.appendTo(this.options.container) : c.insertAfter(this.$element);
			var g = this.getPosition(),
				h = c[0].offsetWidth,
				i = c[0].offsetHeight;
			if (f) {
				var j = this.$element.parent(),
					k = d,
					l = document.documentElement.scrollTop || document.body.scrollTop,
					m = "body" == this.options.container ? window.innerWidth : j.outerWidth(),
					n = "body" == this.options.container ? window.innerHeight : j.outerHeight(),
					o = "body" == this.options.container ? 0 : j.offset().left;
				d = "bottom" == d && g.top + g.height + i - l > n ? "top" : "top" == d && g.top - l - i < 0 ? "bottom" : "right" == d && g.right + h > m ? "left" : "left" == d && g.left - h < o ? "right" : d, c.removeClass(k).addClass(d)
			}
			var p = this.getCalculatedOffset(d, g, h, i);
			this.applyPlacement(p, d), this.$element.trigger("shown.bs." + this.type)
		}
	}, b.prototype.applyPlacement = function(a, b) {
		var c,
			d = this.tip(),
			e = d[0].offsetWidth,
			f = d[0].offsetHeight,
			g = parseInt(d.css("margin-top"), 10),
			h = parseInt(d.css("margin-left"), 10);
		isNaN(g) && (g = 0), isNaN(h) && (h = 0), a.top = a.top + g, a.left = a.left + h, d.offset(a).addClass("in");
		var i = d[0].offsetWidth,
			j = d[0].offsetHeight;
		if ("top" == b && j != f && (c = !0, a.top = a.top + f - j), /bottom|top/.test(b)) {
			var k = 0;
			a.left < 0 && (k = -2 * a.left, a.left = 0, d.offset(a), i = d[0].offsetWidth, j = d[0].offsetHeight), this.replaceArrow(k - e + i, i, "left")
		} else this.replaceArrow(j - f, j, "top");
		c && d.offset(a)
	}, b.prototype.replaceArrow = function(a, b, c) {
		this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
	}, b.prototype.setContent = function() {
		var a = this.tip(),
			b = this.getTitle();
		a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
	}, b.prototype.hide = function() {
		function b() {
			"in" != c.hoverState && d.detach()
		}
		var c = this,
			d = this.tip(),
			e = a.Event("hide.bs." + this.type);
		return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), this.$element.trigger("hidden.bs." + this.type), this)
	}, b.prototype.fixTitle = function() {
		var a = this.$element;
		(a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
	}, b.prototype.hasContent = function() {
		return this.getTitle()
	}, b.prototype.getPosition = function() {
		var b = this.$element[0];
		return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
			width : b.offsetWidth,
			height : b.offsetHeight
		}, this.$element.offset())
	}, b.prototype.getCalculatedOffset = function(a, b, c, d) {
		return "bottom" == a ? {
			top : b.top + b.height,
			left : b.left + b.width / 2 - c / 2
		} : "top" == a ? {
			top : b.top - d,
			left : b.left + b.width / 2 - c / 2
		} : "left" == a ? {
			top : b.top + b.height / 2 - d / 2,
			left : b.left - c
		} : {
			top : b.top + b.height / 2 - d / 2,
			left : b.left + b.width
		}
	}, b.prototype.getTitle = function() {
		var a,
			b = this.$element,
			c = this.options;
		return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
	}, b.prototype.tip = function() {
		return this.$tip = this.$tip || a(this.options.template)
	}, b.prototype.arrow = function() {
		return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
	}, b.prototype.validate = function() {
		this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
	}, b.prototype.enable = function() {
		this.enabled = !0
	}, b.prototype.disable = function() {
		this.enabled = !1
	}, b.prototype.toggleEnabled = function() {
		this.enabled = !this.enabled
	}, b.prototype.toggle = function(b) {
		var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
		c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
	}, b.prototype.destroy = function() {
		this.hide().$element.off("." + this.type).removeData("bs." + this.type)
	};
	var c = a.fn.tooltip;
	a.fn.tooltip = function(c) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.tooltip"),
				f = "object" == typeof c && c;
			e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]()
		})
	}, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function() {
		return a.fn.tooltip = c, this
	}
}(jQuery), +function(a) {
	"use strict";
	var b = function(a, b) {
		this.init("popover", a, b)
	};
	if (!a.fn.tooltip)
		throw new Error("Popover requires tooltip.js");
	b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
		placement : "right",
		trigger : "click",
		content : "",
		template : '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	}), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, b.prototype.getDefaults = function() {
		return b.DEFAULTS
	}, b.prototype.setContent = function() {
		var a = this.tip(),
			b = this.getTitle(),
			c = this.getContent();
		a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "html" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
	}, b.prototype.hasContent = function() {
		return this.getTitle() || this.getContent()
	}, b.prototype.getContent = function() {
		var a = this.$element,
			b = this.options;
		return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
	}, b.prototype.arrow = function() {
		return this.$arrow = this.$arrow || this.tip().find(".arrow")
	}, b.prototype.tip = function() {
		return this.$tip || (this.$tip = a(this.options.template)), this.$tip
	};
	var c = a.fn.popover;
	a.fn.popover = function(c) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.popover"),
				f = "object" == typeof c && c;
			e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]()
		})
	}, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function() {
		return a.fn.popover = c, this
	}
}(jQuery), +function(a) {
	"use strict";
	function b(c, d) {
		var e,
			f = a.proxy(this.process, this);
		this.$element = a(a(c).is("body") ? window : c), this.$body = a("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = a([]), this.targets = a([]), this.activeTarget = null, this.refresh(), this.process()
	}
	b.DEFAULTS = {
		offset : 10
	}, b.prototype.refresh = function() {
		var b = this.$element[0] == window ? "offset" : "position";
		this.offsets = a([]), this.targets = a([]);
		{
			var c = this;
			this.$body.find(this.selector).map(function() {
				var d = a(this),
					e = d.data("target") || d.attr("href"),
					f = /^#\w/.test(e) && a(e);
				return f && f.length && [ [ f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e ] ] || null
			}).sort(function(a, b) {
				return a[0] - b[0]
			}).each(function() {
				c.offsets.push(this[0]), c.targets.push(this[1])
			})
		}
	}, b.prototype.process = function() {
		var a,
			b = this.$scrollElement.scrollTop() + this.options.offset,
			c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
			d = c - this.$scrollElement.height(),
			e = this.offsets,
			f = this.targets,
			g = this.activeTarget;
		if (b >= d) return g != (a = f.last()[0]) && this.activate(a);
		for (a = e.length; a--;) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
	}, b.prototype.activate = function(b) {
		this.activeTarget = b, a(this.selector).parents(".active").removeClass("active");
		var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
			d = a(c).parents("li").addClass("active");
		d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
	};
	var c = a.fn.scrollspy;
	a.fn.scrollspy = function(c) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.scrollspy"),
				f = "object" == typeof c && c;
			e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
		})
	}, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
		return a.fn.scrollspy = c, this
	}, a(window).on("load", function() {
		a('[data-spy="scroll"]').each(function() {
			var b = a(this);
			b.scrollspy(b.data())
		})
	})
}(jQuery), +function(a) {
	"use strict";
	var b = function(b) {
		this.element = a(b)
	};
	b.prototype.show = function() {
		var b = this.element,
			c = b.closest("ul:not(.dropdown-menu)"),
			d = b.data("target");
		if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
			var e = c.find(".active:last a")[0],
				f = a.Event("show.bs.tab", {
					relatedTarget : e
				});
			if (b.trigger(f), !f.isDefaultPrevented()) {
				var g = a(d);
				this.activate(b.parent("li"), c), this.activate(g, g.parent(), function() {
					b.trigger({
						type : "shown.bs.tab",
						relatedTarget : e
					})
				})
			}
		}
	}, b.prototype.activate = function(b, c, d) {
		function e() {
			f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
		}
		var f = c.find("> .active"),
			g = d && a.support.transition && f.hasClass("fade");
		g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), f.removeClass("in")
	};
	var c = a.fn.tab;
	a.fn.tab = function(c) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.tab");
			e || d.data("bs.tab", e = new b(this)), "string" == typeof c && e[c]()
		})
	}, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function() {
		return a.fn.tab = c, this
	}, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(b) {
		b.preventDefault(), a(this).tab("show")
	})
}(jQuery), +function(a) {
	"use strict";
	var b = function(c, d) {
		this.options = a.extend({}, b.DEFAULTS, d), this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(c), this.affixed = this.unpin = null, this.checkPosition()
	};
	b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = {
		offset : 0
	}, b.prototype.checkPositionWithEventLoop = function() {
		setTimeout(a.proxy(this.checkPosition, this), 1)
	}, b.prototype.checkPosition = function() {
		if (this.$element.is(":visible")) {
			var c = a(document).height(),
				d = this.$window.scrollTop(),
				e = this.$element.offset(),
				f = this.options.offset,
				g = f.top,
				h = f.bottom;
			"object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top()), "function" == typeof h && (h = f.bottom());
			var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1;
			this.affixed !== i && (this.unpin && this.$element.css("top", ""), this.affixed = i, this.unpin = "bottom" == i ? e.top - d : null, this.$element.removeClass(b.RESET).addClass("affix" + (i ? "-" + i : "")), "bottom" == i && this.$element.offset({
				top : document.body.offsetHeight - h - this.$element.height()
			}))
		}
	};
	var c = a.fn.affix;
	a.fn.affix = function(c) {
		return this.each(function() {
			var d = a(this),
				e = d.data("bs.affix"),
				f = "object" == typeof c && c;
			e || d.data("bs.affix", e = new b(this, f)), "string" == typeof c && e[c]()
		})
	}, a.fn.affix.Constructor = b, a.fn.affix.noConflict = function() {
		return a.fn.affix = c, this
	}, a(window).on("load", function() {
		a('[data-spy="affix"]').each(function() {
			var b = a(this),
				c = b.data();
			c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c)
		})
	})
}(jQuery), function(a, b, c) {
	"use strict";
	function d(a) {
		return null != a && "" !== a && "hasOwnProperty" !== a && h.test("." + a)
	}
	function e(a, b) {
		if (!d(b))
			throw g("badmember", 'Dotted member path "@{0}" is invalid.', b);
		for (var e = b.split("."), f = 0, h = e.length; h > f && a !== c; f++) {
			var i = e[f];
			a = null !== a ? a[i] : c
		}
		return a
	}
	function f(a, c) {
		c = c || {}, b.forEach(c, function(a, b) {
			delete c[b]
		});
		for (var d in a) !a.hasOwnProperty(d) || "$" === d.charAt(0) && "$" === d.charAt(1) || (c[d] = a[d]);
		return c
	}
	var g = b.$$minErr("$resource"),
		h = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;
	b.module("ngResource", [ "ng" ]).factory("$resource", [ "$http", "$q", function(a, d) {
		function h(a) {
			return i(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
		}
		function i(a, b) {
			return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, b ? "%20" : "+")
		}
		function j(a, b) {
			this.template = a, this.defaults = b || {}, this.urlParams = {}
		}
		function k(h, i, r) {
			function s(a, b) {
				var c = {};
				return b = o({}, i, b), n(b, function(b, d) {
						q(b) && (b = b()), c[d] = b && b.charAt && "@" == b.charAt(0) ? e(a, b.substr(1)) : b
					}), c
			}
			function t(a) {
				return a.resource
			}
			function u(a) {
				f(a || {}, this)
			}
			var v = new j(h);
			return r = o({}, l, r), n(r, function(e, h) {
					var i = /^(POST|PUT|PATCH)$/i.test(e.method);
					u[h] = function(h, j, k, l) {
						var r,
							w,
							x,
							y = {};
						switch (arguments.length) {
						case 4:
							x = l, w = k;case 3:
						case 2:
							if (!q(j)) {
								y = h, r = j, w = k;break
							}
							if (q(h)) {
								w = h, x = j;
								break
							}
							w = j, x = k;case 1:
							q(h) ? w = h : i ? r = h : y = h;
							break;case 0:
							break;default:
							throw g("badargs", "Expected up to 4 arguments [params, data, success, error], got {0} arguments", arguments.length)
						}
						var z = this instanceof u,
							A = z ? r : e.isArray ? [] : new u(r),
							B = {},
							C = e.interceptor && e.interceptor.response || t,
							D = e.interceptor && e.interceptor.responseError || c;
						n(e, function(a, b) {
							"params" != b && "isArray" != b && "interceptor" != b && (B[b] = p(a))
						}), i && (B.data = r), v.setUrlParams(B, o({}, s(r, e.params || {}), y), e.url);
						var E = a(B).then(function(a) {
							var c = a.data,
								d = A.$promise;
							if (c) {
								if (b.isArray(c) !== !!e.isArray)
									throw g("badcfg", "Error in resource configuration. Expected response to contain an {0} but got an {1}", e.isArray ? "array" : "object", b.isArray(c) ? "array" : "object");
								e.isArray ? (A.length = 0, n(c, function(a) {
									A.push(new u(a))
								})) : (f(c, A), A.$promise = d)
							}
							return A.$resolved = !0, a.resource = A, a
						}, function(a) {
							return A.$resolved = !0, (x || m)(a), d.reject(a)
						});
						return E = E.then(function(a) {
								var b = C(a);
								return (w || m)(b, a.headers), b
							}, D), z ? E : (A.$promise = E, A.$resolved = !1, A)
					}, u.prototype["$" + h] = function(a, b, c) {
						q(a) && (c = b, b = a, a = {});
						var d = u[h].call(this, a, this, b, c);
						return d.$promise || d
					}
				}), u.bind = function(a) {
					return k(h, o({}, i, a), r)
				}, u
		}
		var l = {
				get : {
					method : "GET"
				},
				save : {
					method : "POST"
				},
				query : {
					method : "GET",
					isArray : !0
				},
				remove : {
					method : "DELETE"
				},
				"delete" : {
					method : "DELETE"
				}
			},
			m = b.noop,
			n = b.forEach,
			o = b.extend,
			p = b.copy,
			q = b.isFunction;
		return j.prototype = {
				setUrlParams : function(a, c, d) {
					var e,
						f,
						i = this,
						j = d || i.template,
						k = i.urlParams = {};
					n(j.split(/\W/), function(a) {
						if ("hasOwnProperty" === a)
							throw g("badname", "hasOwnProperty is not a valid parameter name.");
						!new RegExp("^\\d+$").test(a) && a && new RegExp("(^|[^\\\\]):" + a + "(\\W|$)").test(j) && (k[a] = !0)
					}), j = j.replace(/\\:/g, ":"), c = c || {}, n(i.urlParams, function(a, d) {
						e = c.hasOwnProperty(d) ? c[d] : i.defaults[d], b.isDefined(e) && null !== e ? (f = h(e), j = j.replace(new RegExp(":" + d + "(\\W|$)", "g"), function(a, b) {
							return f + b
						})) : j = j.replace(new RegExp("(/?):" + d + "(\\W|$)", "g"), function(a, b, c) {
							return "/" == c.charAt(0) ? c : b + c
						})
					}), j = j.replace(/\/+$/, "") || "/", j = j.replace(/\/\.(?=\w+($|\?))/, "."), a.url = j.replace(/\/\\\./, "/."), n(c, function(b, c) {
						i.urlParams[c] || (a.params = a.params || {}, a.params[c] = b)
					})
				}
			}, k
	} ])
}(window, window.angular), function(a, b, c) {
	"use strict";b.module("ngCookies", [ "ng" ]).factory("$cookies", [ "$rootScope", "$browser", function(a, d) {
		function e() {
			var a,
				e,
				f,
				i;
			for (a in h) k(g[a]) && d.cookies(a, c);
			for (a in g) e = g[a], b.isString(e) || (e = "" + e, g[a] = e), e !== h[a] && (d.cookies(a, e), i = !0);
			if (i) {
				i = !1, f = d.cookies();
				for (a in g) g[a] !== f[a] && (k(f[a]) ?
						delete g[a]
						: g[a] = f[a], i = !0)
			}
		}
		var f,
			g = {},
			h = {},
			i = !1,
			j = b.copy,
			k = b.isUndefined;
		return d.addPollFn(function() {
				var b = d.cookies();
				f != b && (f = b, j(b, h), j(b, g), i && a.$apply())
			})(), i = !0, a.$watch(e), g
	} ]).factory("$cookieStore", [ "$cookies", function(a) {
		return {
			get : function(c) {
				var d = a[c];
				return d ? b.fromJson(d) : d
			},
			put : function(c, d) {
				a[c] = b.toJson(d)
			},
			remove : function(b) {
				delete a[b]
			}
		}
	} ])
}(window, window.angular), function(a, b) {
	"use strict";
	function c() {
		this.$get = [ "$$sanitizeUri", function(a) {
			return function(b) {
				var c = [];
				return f(b, i(c, function(b, c) {
						return !/^unsafe/.test(a(b, c))
					})), c.join("")
			}
		} ]
	}
	function d(a) {
		var c = [],
			d = i(c, b.noop);
		return d.chars(a), c.join("")
	}
	function e(a) {
		var b,
			c = {},
			d = a.split(",");
		for (b = 0; b < d.length; b++) c[d[b]] = !0;
		return c
	}
	function f(a, c) {
		function d(a, d, f, h) {
			if (d = b.lowercase(d), x[d])
				for (; s.last() && y[s.last()];) e("", s.last());
			w[d] && s.last() == d && e("", d), h = t[d] || !!h, h || s.push(d);var i = {};
			f.replace(m, function(a, b, c, d, e) {
				var f = c || d || e || "";
				i[b] = g(f)
			}), c.start && c.start(d, i, h)
		}
		function e(a, d) {
			var e,
				f = 0;
			if (d = b.lowercase(d))
				for (f = s.length - 1; f >= 0 && s[f] != d; f--)
					;
			if (f >= 0) {
				for (e = s.length - 1; e >= f; e--) c.end && c.end(s[e]);
				s.length = f
			}
		}
		var f,
			h,
			i,
			s = [],
			u = a;
		for (s.last = function() {
				return s[s.length - 1]
			}; a;) {
			if (h = !0, s.last() && z[s.last()]) a = a.replace(new RegExp("(.*)<\\s*\\/\\s*" + s.last() + "[^>]*>", "i"), function(a, b) {
					return b = b.replace(p, "$1").replace(r, "$1"), c.chars && c.chars(g(b)), ""
				}), e("", s.last());
			else if (0 === a.indexOf("<!--") ? (f = a.indexOf("--", 4), f >= 0 && a.lastIndexOf("-->", f) === f && (c.comment && c.comment(a.substring(4, f)), a = a.substring(f + 3), h = !1)) : q.test(a) ? (i = a.match(q), i && (a = a.replace(i[0], ""), h = !1)) : o.test(a) ? (i = a.match(l), i && (a = a.substring(i[0].length), i[0].replace(l, e), h = !1)) : n.test(a) && (i = a.match(k), i && (a = a.substring(i[0].length), i[0].replace(k, d), h = !1)), h) {
				f = a.indexOf("<");
				var v = 0 > f ? a : a.substring(0, f);
				a = 0 > f ? "" : a.substring(f), c.chars && c.chars(g(v))
			}
			if (a == u)
				throw j("badparse", "The sanitizer was unable to parse the following block of html: {0}", a);
			u = a
		}
		e()
	}
	function g(a) {
		if (!a) return "";
		var b = E.exec(a),
			c = b[1],
			d = b[3],
			e = b[2];
		return e && (D.innerHTML = e.replace(/</g, "&lt;"), e = "textContent" in D ? D.textContent : D.innerText), c + e + d
	}
	function h(a) {
		return a.replace(/&/g, "&amp;").replace(s, function(a) {
			return "&#" + a.charCodeAt(0) + ";"
		}).replace(/</g, "&lt;").replace(/>/g, "&gt;")
	}
	function i(a, c) {
		var d = !1,
			e = b.bind(a, a.push);
		return {
			start : function(a, f, g) {
				a = b.lowercase(a), !d && z[a] && (d = a), d || A[a] !== !0 || (e("<"), e(a), b.forEach(f, function(d, f) {
					var g = b.lowercase(f),
						i = "img" === a && "src" === g || "background" === g;
					C[g] !== !0 || B[g] === !0 && !c(d, i) || (e(" "), e(f), e('="'), e(h(d)), e('"'))
				}), e(g ? "/>" : ">"))
			},
			end : function(a) {
				a = b.lowercase(a), d || A[a] !== !0 || (e("</"), e(a), e(">")), a == d && (d = !1)
			},
			chars : function(a) {
				d || e(h(a))
			}
		}
	}
	var j = b.$$minErr("$sanitize"),
		k = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,
		l = /^<\s*\/\s*([\w:-]+)[^>]*>/,
		m = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
		n = /^</,
		o = /^<\s*\//,
		p = /<!--(.*?)-->/g,
		q = /<!DOCTYPE([^>]*?)>/i,
		r = /<!\[CDATA\[(.*?)]]>/g,
		s = /([^\#-~| |!])/g,
		t = e("area,br,col,hr,img,wbr"),
		u = e("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
		v = e("rp,rt"),
		w = b.extend({}, v, u),
		x = b.extend({}, u, e("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
		y = b.extend({}, v, e("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
		z = e("script,style"),
		A = b.extend({}, t, x, y, w),
		B = e("background,cite,href,longdesc,src,usemap"),
		C = b.extend({}, B, e("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")),
		D = document.createElement("pre"),
		E = /^(\s*)([\s\S]*?)(\s*)$/;
	b.module("ngSanitize", []).provider("$sanitize", c), b.module("ngSanitize").filter("linky", [ "$sanitize", function(a) {
		var c = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/,
			e = /^mailto:/;
		return function(f, g) {
			function h(a) {
				a && n.push(d(a))
			}
			function i(a, c) {
				n.push("<a "), b.isDefined(g) && (n.push('target="'), n.push(g), n.push('" ')), n.push('href="'), n.push(a), n.push('">'), h(c), n.push("</a>")
			}
			if (!f) return f;
			for (var j, k, l, m = f, n = []; j = m.match(c);) k = j[0], j[2] == j[3] && (k = "mailto:" + k), l = j.index, h(m.substr(0, l)), i(k, j[0].replace(e, "")), m = m.substring(l + j[0].length);
			return h(m), a(n.join(""))
		}
	} ])
}(window, window.angular), function(a, b) {
	"use strict";
	function c() {
		function a(a, c) {
			return b.extend(new (b.extend(function() {}, {
				prototype : a
			})), c)
		}
		function c(a, b) {
			var c = b.caseInsensitiveMatch,
				d = {
					originalPath : a,
					regexp : a
				},
				e = d.keys = [];
			return a = a.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(a, b, c, d) {
					var f = "?" === d ? d : null,
						g = "*" === d ? d : null;
					return e.push({
							name : c,
							optional : !!f
						}), b = b || "", "" + (f ? "" : b) + "(?:" + (f ? b : "") + (g && "(.+?)" || "([^/]+)") + (f || "") + ")" + (f || "")
				}).replace(/([\/$\*])/g, "\\$1"), d.regexp = new RegExp("^" + a + "$", c ? "i" : ""), d
		}
		var d = {};
		this.when = function(a, e) {
			if (d[a] = b.extend({
					reloadOnSearch : !0
				}, e, a && c(a, e)), a) {
				var f = "/" == a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/";
				d[f] = b.extend({
					redirectTo : a
				}, c(f, e))
			}
			return this
		}, this.otherwise = function(a) {
			return this.when(null, a), this
		}, this.$get = [ "$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", "$sce", function(c, e, f, g, h, i, j, k) {
			function l(a, b) {
				var c = b.keys,
					d = {};
				if (!b.regexp) return null;
				var e = b.regexp.exec(a);
				if (!e) return null;
				for (var f = 1, g = e.length; g > f; ++f) {
					var h = c[f - 1],
						i = "string" == typeof e[f] ? decodeURIComponent(e[f]) : e[f];
					h && i && (d[h.name] = i)
				}
				return d
			}
			function m() {
				var a = n(),
					d = q.current;
				a && d && a.$$route === d.$$route && b.equals(a.pathParams, d.pathParams) && !a.reloadOnSearch && !p ? (d.params = a.params, b.copy(d.params, f), c.$broadcast("$routeUpdate", d)) : (a || d) && (p = !1, c.$broadcast("$routeChangeStart", a, d), q.current = a, a && a.redirectTo && (b.isString(a.redirectTo) ? e.path(o(a.redirectTo, a.params)).search(a.params).replace() : e.url(a.redirectTo(a.pathParams, e.path(), e.search())).replace()), g.when(a).then(function() {
					if (a) {
						var c,
							d,
							e = b.extend({}, a.resolve);
						return b.forEach(e, function(a, c) {
								e[c] = b.isString(a) ? h.get(a) : h.invoke(a)
							}), b.isDefined(c = a.template) ? b.isFunction(c) && (c = c(a.params)) : b.isDefined(d = a.templateUrl) && (b.isFunction(d) && (d = d(a.params)), d = k.getTrustedResourceUrl(d), b.isDefined(d) && (a.loadedTemplateUrl = d, c = i.get(d, {
								cache : j
							}).then(function(a) {
								return a.data
							}))), b.isDefined(c) && (e.$template = c), g.all(e)
					}
				}).then(function(e) {
					a == q.current && (a && (a.locals = e, b.copy(a.params, f)), c.$broadcast("$routeChangeSuccess", a, d))
				}, function(b) {
					a == q.current && c.$broadcast("$routeChangeError", a, d, b)
				}))
			}
			function n() {
				var c,
					f;
				return b.forEach(d, function(d) {
						!f && (c = l(e.path(), d)) && (f = a(d, {
							params : b.extend({}, e.search(), c),
							pathParams : c
						}), f.$$route = d)
					}), f || d[null] && a(d[null], {
						params : {},
						pathParams : {}
					})
			}
			function o(a, c) {
				var d = [];
				return b.forEach((a || "").split(":"), function(a, b) {
						if (0 === b) d.push(a);else {
							var e = a.match(/(\w+)(.*)/),
								f = e[1];
							d.push(c[f]), d.push(e[2] || ""),
							delete c[f]
						}
					}), d.join("")
			}
			var p = !1,
				q = {
					routes : d,
					reload : function() {
						p = !0, c.$evalAsync(m)
					}
				};
			return c.$on("$locationChangeSuccess", m), q
		} ]
	}
	function d() {
		this.$get = function() {
			return {}
		}
	}
	function e(a, c, d) {
		return {
			restrict : "ECA",
			terminal : !0,
			priority : 400,
			transclude : "element",
			link : function(e, f, g, h, i) {
				function j() {
					n && (n.remove(), n = null), l && (l.$destroy(), l = null), m && (d.leave(m, function() {
						n = null
					}), n = m, m = null)
				}
				function k() {
					var g = a.current && a.current.locals,
						h = g && g.$template;
					if (b.isDefined(h)) {
						var k = e.$new(),
							n = a.current,
							q = i(k, function(a) {
								d.enter(a, null, m || f, function() {
									!b.isDefined(o) || o && !e.$eval(o) || c()
								}), j()
							});
						m = q, l = n.scope = k, l.$emit("$viewContentLoaded"), l.$eval(p)
					} else j()
				}
				var l,
					m,
					n,
					o = g.autoscroll,
					p = g.onload || "";
				e.$on("$routeChangeSuccess", k), k()
			}
		}
	}
	function f(a, b, c) {
		return {
			restrict : "ECA",
			priority : -400,
			link : function(d, e) {
				var f = c.current,
					g = f.locals;
				e.html(g.$template);
				var h = a(e.contents());
				if (f.controller) {
					g.$scope = d;
					var i = b(f.controller, g);
					f.controllerAs && (d[f.controllerAs] = i), e.data("$ngControllerController", i), e.children().data("$ngControllerController", i)
				}
				h(d)
			}
		}
	}
	var g = b.module("ngRoute", [ "ng" ]).provider("$route", c);
	g.provider("$routeParams", d), g.directive("ngView", e), g.directive("ngView", f), e.$inject = [ "$route", "$anchorScroll", "$animate" ], f.$inject = [ "$compile", "$controller", "$route" ]
}(window, window.angular), angular.module("btford.socket-io", []).provider("socketFactory", function() {
	var a = "socket:";
	this.$get = [ "$rootScope", "$timeout", function(b, c) {
		var d = function(a, b) {
			return b ? function() {
				var d = arguments;
				c(function() {
					b.apply(a, d)
				}, 0)
			} : angular.noop
		};
		return function(c) {
			c = c || {};
			var e = c.ioSocket || io.connect(),
				f = c.prefix || a,
				g = c.scope || b,
				h = function(a, b) {
					e.on(a, b.__ng = d(e, b))
				},
				i = {
					on : h,
					addListener : h,
					emit : function(a, b, c) {
						var f = arguments.length - 1,
							c = arguments[f];
						return "function" == typeof c && (c = d(e, c), arguments[f] = c), e.emit.apply(e, arguments)
					},
					removeListener : function(a, b) {
						return b && b.__ng && (arguments[1] = b.__ng), e.removeListener.apply(e, arguments)
					},
					forward : function(a, b) {
						a instanceof Array == !1 && (a = [ a ]), b || (b = g), a.forEach(function(a) {
							var c = f + a,
								g = d(e, function(a) {
									b.$broadcast(c, a)
								});
							b.$on("$destroy", function() {
								e.removeListener(a, g)
							}), e.on(a, g)
						})
					}
				};
			return i
		}
	} ]
});