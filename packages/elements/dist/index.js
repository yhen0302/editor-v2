import * as echarts from 'echarts';
import { computed, resolveDirective, withDirectives, openBlock, createElementBlock, withModifiers, normalizeStyle, pushScopeId, popScopeId, createElementVNode, ref, watch, normalizeClass, toDisplayString, vShow, getCurrentInstance, Fragment, reactive, onMounted, onUpdated, onUnmounted, createVNode, renderList, createBlock, resolveDynamicComponent, createCommentVNode, renderSlot, useCssModule, resolveComponent, withCtx } from 'vue';
import _imports_0 from '@/assets/icon/clip-1406.svg';

function toPx(target) {
    const cssUnitRE = /^\d+(px|rem|em|vh|vw|%|cm|mm)$/;
    if (typeof target === 'number') {
        return target + 'px';
    }
    else if (typeof target === 'object') {
        const result = Object.assign({}, target);
        const excludeStyleKey = ['zoom', 'opacity', 'zIndex'];
        for (const key of Object.keys(target)) {
            if (!excludeStyleKey.includes(key)) {
                if (!cssUnitRE.test(target[key].toString())) {
                    result[key] = target[key] + 'px';
                }
            }
        }
        return result;
    }
    else {
        return target;
    }
}
// 防抖
// eslint-disable-next-line @typescript-eslint/ban-types
function debounce(fn, delay, ctx = null) {
    let timer;
    return function (...args) {
        const that = this;
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(function () {
            fn.call(ctx || that, ...args);
        }, delay);
    };
}
// eslint-disable-next-line @typescript-eslint/ban-types
function clone(object, deep = true, cacheMap) {
    if (!cacheMap)
        cacheMap = new WeakMap();
    if (typeof object === 'object' && object !== null) {
        // 引用类型
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const newObj = new object.constructor();
        cacheMap.set(object, newObj);
        for (const key of Object.keys(object)) {
            // 防止重复引用导致的死循环
            if (cacheMap.has(object[key])) {
                newObj[key] = cacheMap.get(object[key]);
                continue;
            }
            newObj[key] = deep ? clone(object[key], deep, cacheMap) : object[key];
        }
        return newObj;
    }
    else
        return object; // 基本数据类型
}
function hexColorToRgba(hexColor, opacity) {
    const hexColorReg = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/g;
    const matchRes = hexColorReg.exec(hexColor);
    if (!matchRes)
        return 'transparent';
    return `rgba(${Number('0x' + matchRes[1])},${Number('0x' + matchRes[2])},${Number('0x' + matchRes[3])},${(opacity / 100).toFixed(2)})`;
}
// eslint-disable-next-line @typescript-eslint/ban-types
// xxx.xxx[0] 变量访问语法解析
function valueHandle(obj, path) {
    let i = 0, subPath = '', resolveRes = null;
    const cpPath = path;
    let res = clone(obj);
    while (res && i < cpPath.length) {
        const str = cpPath[i];
        if (str === '.' || str === ']') {
            i++;
            continue;
        }
        else if (str === '[') {
            resolveRes = resolvePath(cpPath.substring(++i), ['[\\]]']);
        }
        else {
            resolveRes = resolvePath(cpPath.substring(i), ['[\\.\\[]']);
            resolveRes = resolveRes || /(.*$)/.exec(cpPath.substring(i));
        }
        if (resolveRes) {
            subPath = resolveRes[1];
            res = res[subPath];
            i += subPath.length;
            resolveRes = null;
        }
    }
    function resolvePath(path, terminators) {
        return new RegExp(`(.*?)${terminators.join()}`).exec(path);
    }
    return res;
}

//@ts-nocheck
var matrixMixin = {
    methods: {
        onMouseDown(ev) {
            // @ts-ignore
            if (this.node.select)
                return;
            if (ev.shiftKey) {
                // @ts-ignore
                this.$emit('append');
                return;
            }
            // @ts-ignore
            this.$emit('select');
        }
    },
    computed: {
        left() {
            return toPx(this.node.option.matrixOption.left);
        },
        width() {
            return toPx(this.node.option.matrixOption.width);
        },
        height() {
            return toPx(this.node.option.matrixOption.height);
        },
        top() {
            return toPx(this.node.option.matrixOption.top);
        }
    }
};

var script$h = {
    name: 'RectShape',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup: function setup(props) {
        var color = computed(function () {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        var opacity = computed(function () {
            return (props.node.option.transparency / 100).toFixed(2);
        });
        return {
            color: color,
            opacity: opacity
        };
    }
};

function render$h(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "rect-shape absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(function () {}, ["stop"])),
    draggable: "false",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top,
      backgroundColor: $setup.color,
      opacity: $setup.opacity
    }),
    onMousedown: _cache[1] || (_cache[1] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    }),
    ref: "el"
  }, null, 36
  /* STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select
  }]]);
}

script$h.render = render$h;
script$h.__file = "src/components/shape/RectShape.vue";

var script$g = {
    name: 'RoundedRectShape',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup: function setup(props) {
        var color = computed(function () {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        var opacity = computed(function () {
            return (props.node.option.transparency / 100).toFixed(2);
        });
        return {
            color: color,
            opacity: opacity
        };
    }
};

function render$g(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "rounded-rect-shape absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(function () {}, ["stop"])),
    draggable: "false",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top,
      backgroundColor: $setup.color,
      opacity: $setup.opacity
    }),
    onMousedown: _cache[1] || (_cache[1] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    }),
    ref: "el"
  }, null, 36
  /* STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select
  }]]);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$b = "\n.rounded-rect-shape[data-v-c59a2864]{\r\n  border-radius: 10%;\n}\r\n";
styleInject(css_248z$b);

script$g.render = render$g;
script$g.__scopeId = "data-v-c59a2864";
script$g.__file = "src/components/shape/RoundedRectShape.vue";

var script$f = {
    name: 'CircleShape',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup: function setup(props) {
        var color = computed(function () {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        var opacity = computed(function () {
            return (props.node.option.transparency / 100).toFixed(2);
        });
        return {
            color: color,
            opacity: opacity
        };
    }
};

function render$f(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "circle-rect-shape absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(function () {}, ["stop"])),
    draggable: "false",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top,
      backgroundColor: $setup.color,
      opacity: $setup.opacity
    }),
    onMousedown: _cache[1] || (_cache[1] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    }),
    ref: "el"
  }, null, 36
  /* STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select
  }]]);
}

var css_248z$a = "\n.circle-rect-shape[data-v-d550f47a]{\r\n  border-radius: 50%;\n}\r\n";
styleInject(css_248z$a);

script$f.render = render$f;
script$f.__scopeId = "data-v-d550f47a";
script$f.__file = "src/components/shape/CircleShape.vue";

var script$e = {
    name: 'TriangleShape',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup: function setup(props) {
        // exterior
        var color = computed(function () {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        var opacity = computed(function () {
            return (props.node.option.transparency / 100).toFixed(2);
        });
        return {
            color: color,
            opacity: opacity
        };
    }
};

function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "triangle-shape absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(function () {}, ["stop"])),
    draggable: "false",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top,
      backgroundColor: $setup.color,
      opacity: $setup.opacity
    }),
    onMousedown: _cache[1] || (_cache[1] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    })
  }, null, 36
  /* STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select
  }]]);
}

var css_248z$9 = "\n.triangle-shape[data-v-54d47dea] {\r\n  clip-path: polygon(0 0, 0% 100%, 100% 100%);\n}\r\n";
styleInject(css_248z$9);

script$e.render = render$e;
script$e.__scopeId = "data-v-54d47dea";
script$e.__file = "src/components/shape/TriangleShape.vue";

var script$d = {
    name: 'ImageMedia',
    props: ['node'],
    mixins: [matrixMixin],
    emits: ['select', 'append'],
    setup: function setup(props) {
        var src = computed(function () {
            return props.node.option.src;
        });
        return {
            src: src
        };
    }
};

var _withScopeId$1 = function _withScopeId(n) {
  return pushScopeId("data-v-dcb9cef8"), n = n(), popScopeId(), n;
};

var _hoisted_1$3 = ["src"];
var _hoisted_2$3 = {
  key: 1,
  class: "img-placeholder-box"
};

var _hoisted_3$2 = /*#__PURE__*/_withScopeId$1(function () {
  return /*#__PURE__*/createElementVNode("img", {
    class: "i-p",
    src: _imports_0,
    draggable: "false"
  }, null, -1
  /* HOISTED */
  );
});

var _hoisted_4$2 = [_hoisted_3$2];
function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "image-media-wrap",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top
    }),
    ref: "el",
    onMousedown: _cache[0] || (_cache[0] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    }),
    onClick: _cache[1] || (_cache[1] = withModifiers(function () {}, ["stop"])),
    draggable: "false"
  }, [$setup.src ? (openBlock(), createElementBlock("img", {
    key: 0,
    class: "image-media absolute",
    draggable: "false",
    src: $setup.src
  }, null, 8
  /* PROPS */
  , _hoisted_1$3)) : (openBlock(), createElementBlock("div", _hoisted_2$3, _hoisted_4$2))], 36
  /* STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select
  }]]);
}

var css_248z$8 = "\n.image-media-wrap[data-v-dcb9cef8] {\r\n  position: absolute;\n}\n.image-media[data-v-dcb9cef8]{\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: fill;\n}\n.img-placeholder-box[data-v-dcb9cef8] {\r\n  width: 100%;\r\n  height: 100%;\r\n  /*background: url(~@/assets/images/clip-1406.png) center/100% 100% no-repeat;*/\n}\n.i-p[data-v-dcb9cef8]{\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: fill;\n}\r\n";
styleInject(css_248z$8);

script$d.render = render$d;
script$d.__scopeId = "data-v-dcb9cef8";
script$d.__file = "src/components/media/ImageMedia.vue";

var script$c = {
    name: 'VideoMedia',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup: function setup(props) {
        var src = computed(function () {
            return props.node.option.src;
        });
        return {
            src: src
        };
    }
};

var _withScopeId = function _withScopeId(n) {
  return pushScopeId("data-v-6ff79d38"), n = n(), popScopeId(), n;
};

var _hoisted_1$2 = ["src"];
var _hoisted_2$2 = {
  key: 1,
  class: "img-placeholder"
};

var _hoisted_3$1 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/createElementVNode("img", {
    class: "i-p",
    src: _imports_0,
    draggable: "false"
  }, null, -1
  /* HOISTED */
  );
});

var _hoisted_4$1 = [_hoisted_3$1];
function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "video-media-wrap",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top
    }),
    ref: "el",
    onMousedown: _cache[0] || (_cache[0] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    }),
    onClick: _cache[1] || (_cache[1] = withModifiers(function () {}, ["stop"])),
    draggable: "false"
  }, [$setup.src ? (openBlock(), createElementBlock("video", {
    key: 0,
    class: "video-media absolute",
    draggable: "false",
    autoplay: "",
    loop: "",
    src: $setup.src
  }, null, 8
  /* PROPS */
  , _hoisted_1$2)) : (openBlock(), createElementBlock("div", _hoisted_2$2, _hoisted_4$1))], 36
  /* STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select
  }]]);
}

var css_248z$7 = "\n.video-media-wrap[data-v-6ff79d38] {\r\n  position: absolute;\n}\n.video-media[data-v-6ff79d38] {\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: fill;\n}\n.img-placeholder[data-v-6ff79d38] {\r\n  width: 100%;\r\n  height: 100%;\r\n  /*background: url(~@/assets/images/clip-1406.png) center/100% 100% no-repeat;*/\n}\n.i-p[data-v-6ff79d38]{\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: fill;\n}\r\n";
styleInject(css_248z$7);

script$c.render = render$c;
script$c.__scopeId = "data-v-6ff79d38";
script$c.__file = "src/components/media/VideoMedia.vue";

var script$b = {
    name: 'BigTitle',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup: function setup(props) {
        var h1 = ref(); // exterior
        var color = computed(function () {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        var opacity = computed(function () {
            return (props.node.option.transparency / 100).toFixed(2);
        }); // font
        var fontColor = computed(function () {
            return props.node.option.textOption.color;
        });
        var fontSize = computed(function () {
            return toPx(props.node.option.textOption.fontSize);
        });
        var fontFamily = computed(function () {
            return props.node.option.textOption.fontFamily;
        });
        var fontStyle = computed(function () {
            return props.node.option.textOption.fontStyle;
        });
        var align = computed(function () {
            return props.node.option.textOption.align;
        });
        var verticalAlign = computed(function () {
            return props.node.option.textOption.verticalAlign;
        }); // value
        var value = computed(function () {
            return props.node.option.value;
        });
        var dbClickText;
        var textElInput; // editor
        {
            dbClickText = function dbClickText(ev) {
                ev.target;
                props.node.contentEditable = true;
            };
            watch(function () {
                return props.node.contentEditable;
            }, function (newVal, oldVal) {
                var _h1$value;
                h1.value.contentEditable = String(newVal);
                if (newVal)
                    (_h1$value = h1.value) === null || _h1$value === void 0 ? void 0 : _h1$value.focus();
            });
            textElInput = function textElInput(ev) {
                props.node.option.value = ev.target.innerText;
            };
        }
        return {
            color: color,
            opacity: opacity,
            value: value,
            fontColor: fontColor,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fontStyle: fontStyle,
            align: align,
            verticalAlign: verticalAlign,
            dbClickText: dbClickText,
            h1: h1,
            textElInput: textElInput
        };
    }
};

function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "text-wrapper absolute flex",
    draggable: "false",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top,
      backgroundColor: $setup.color,
      opacity: $setup.opacity,
      textAlign: $setup.align,
      alignItems: $setup.verticalAlign
    }),
    onClick: _cache[5] || (_cache[5] = withModifiers(function () {}, ["stop"])),
    onMousedown: _cache[6] || (_cache[6] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    }),
    onWheelPassive: _cache[7] || (_cache[7] = withModifiers(function () {}, ["stop"])),
    onScroll: _cache[8] || (_cache[8] = withModifiers(function () {}, ["stop"])),
    ref: "el"
  }, [createElementVNode("h1", {
    class: normalizeClass(["big-title flex-1", $setup.fontStyle]),
    style: normalizeStyle({
      color: $setup.fontColor,
      fontSize: $setup.fontSize,
      fontFamily: $setup.fontFamily
    }),
    onDblclick: _cache[0] || (_cache[0] = withModifiers(function () {
      return $setup.dbClickText && $setup.dbClickText.apply($setup, arguments);
    }, ["stop"])),
    ref: "h1",
    onInput: _cache[1] || (_cache[1] = function () {
      return $setup.textElInput && $setup.textElInput.apply($setup, arguments);
    }),
    onKeydown: _cache[2] || (_cache[2] = withModifiers(function () {}, ["stop"])),
    onKeyup: _cache[3] || (_cache[3] = withModifiers(function () {}, ["stop"])),
    onKeypress: _cache[4] || (_cache[4] = withModifiers(function () {}, ["stop"]))
  }, toDisplayString($setup.value), 39
  /* TEXT, CLASS, STYLE, HYDRATE_EVENTS */
  )], 36
  /* STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select
  }]]);
}

var css_248z$6 = "\n.text-wrapper[data-v-5c83e1cc] {\r\n  overflow-y: scroll;\r\n  overscroll-behavior-y: contain;\n}\n.weight[data-v-5c83e1cc] {\r\n  font-weight: bold;\n}\n.underline[data-v-5c83e1cc] {\r\n  text-decoration: underline;\n}\n.italic[data-v-5c83e1cc] {\r\n  font-style: oblique;\n}\n.big-title[data-v-5c83e1cc] {\r\n  outline: none;\r\n  word-break: break-all;\n}\r\n";
styleInject(css_248z$6);

script$b.render = render$b;
script$b.__scopeId = "data-v-5c83e1cc";
script$b.__file = "src/components/text/BigTitle.vue";

var script$a = {
    name: 'SmallTitle',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup: function setup(props) {
        var h1 = ref(); // exterior
        var color = computed(function () {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        var opacity = computed(function () {
            return (props.node.option.transparency / 100).toFixed(2);
        }); // font
        var fontColor = computed(function () {
            return props.node.option.textOption.color;
        });
        var fontSize = computed(function () {
            return toPx(props.node.option.textOption.fontSize);
        });
        var fontFamily = computed(function () {
            return props.node.option.textOption.fontFamily;
        });
        var fontStyle = computed(function () {
            return props.node.option.textOption.fontStyle;
        });
        var align = computed(function () {
            return props.node.option.textOption.align;
        });
        var verticalAlign = computed(function () {
            return props.node.option.textOption.verticalAlign;
        }); // value
        var value = computed(function () {
            return props.node.option.value;
        });
        var dbClickText;
        var textElInput; // editor
        {
            dbClickText = function dbClickText(ev) {
                ev.target;
                props.node.contentEditable = true;
            };
            watch(function () {
                return props.node.contentEditable;
            }, function (newVal, oldVal) {
                var _h1$value;
                h1.value.contentEditable = String(newVal);
                if (newVal)
                    (_h1$value = h1.value) === null || _h1$value === void 0 ? void 0 : _h1$value.focus();
            });
            textElInput = function textElInput(ev) {
                props.node.option.value = ev.target.innerText;
            };
        }
        return {
            color: color,
            opacity: opacity,
            value: value,
            fontColor: fontColor,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fontStyle: fontStyle,
            align: align,
            verticalAlign: verticalAlign,
            dbClickText: dbClickText,
            h1: h1,
            textElInput: textElInput
        };
    }
};

function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "text-wrapper absolute flex",
    draggable: "false",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top,
      backgroundColor: $setup.color,
      opacity: $setup.opacity,
      textAlign: $setup.align,
      alignItems: $setup.verticalAlign
    }),
    onClick: _cache[5] || (_cache[5] = withModifiers(function () {}, ["stop"])),
    onMousedown: _cache[6] || (_cache[6] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    }),
    onWheelPassive: _cache[7] || (_cache[7] = withModifiers(function () {}, ["stop"])),
    onScroll: _cache[8] || (_cache[8] = withModifiers(function () {}, ["stop"])),
    ref: "el"
  }, [createElementVNode("h6", {
    class: normalizeClass(["big-title flex-1", $setup.fontStyle]),
    style: normalizeStyle({
      color: $setup.fontColor,
      fontSize: $setup.fontSize,
      fontFamily: $setup.fontFamily
    }),
    onDblclick: _cache[0] || (_cache[0] = withModifiers(function () {
      return $setup.dbClickText && $setup.dbClickText.apply($setup, arguments);
    }, ["stop"])),
    ref: "h1",
    onInput: _cache[1] || (_cache[1] = function () {
      return $setup.textElInput && $setup.textElInput.apply($setup, arguments);
    }),
    onKeydown: _cache[2] || (_cache[2] = withModifiers(function () {}, ["stop"])),
    onKeyup: _cache[3] || (_cache[3] = withModifiers(function () {}, ["stop"])),
    onKeypress: _cache[4] || (_cache[4] = withModifiers(function () {}, ["stop"]))
  }, toDisplayString($setup.value), 39
  /* TEXT, CLASS, STYLE, HYDRATE_EVENTS */
  )], 36
  /* STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select
  }]]);
}

var css_248z$5 = "\n.text-wrapper[data-v-7a696473]{\r\n  overflow-y: scroll;\r\n  overscroll-behavior-y:contain;\n}\n.weight[data-v-7a696473] {\r\n  font-weight: bold;\n}\n.underline[data-v-7a696473] {\r\n  text-decoration: underline;\n}\n.italic[data-v-7a696473] {\r\n  font-style: oblique;\n}\n.big-title[data-v-7a696473] {\r\n  outline: none;\r\n  word-break: break-all;\n}\r\n";
styleInject(css_248z$5);

script$a.render = render$a;
script$a.__scopeId = "data-v-7a696473";
script$a.__file = "src/components/text/SmallTitle.vue";

//@ts-nocheck
var emitterMixin = {
    methods: {
        emitterEffect(ev) {
            for (const key of Object.keys(this.node.option.emitters)) {
                const s = key.split(':');
                const eventType = s[0];
                const eventAction = s[1];
                const effect = this.node.option.emitters[key];
                console.log(ev.type, eventType, eventAction, effect);
            }
        }
    }
};

var script$9 = {
    name: 'BaseTitle',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin, emitterMixin],
    setup: function setup(props) {
        var h1 = ref(); // exterior
        var color = computed(function () {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        var opacity = computed(function () {
            return (props.node.option.transparency / 100).toFixed(2);
        }); // font
        var fontColor = computed(function () {
            return props.node.option.textOption.color;
        });
        var fontSize = computed(function () {
            return toPx(props.node.option.textOption.fontSize);
        });
        var fontFamily = computed(function () {
            return props.node.option.textOption.fontFamily;
        });
        var fontStyle = computed(function () {
            return props.node.option.textOption.fontStyle;
        });
        var align = computed(function () {
            return props.node.option.textOption.align;
        });
        var verticalAlign = computed(function () {
            return props.node.option.textOption.verticalAlign;
        }); // value
        var value = computed(function () {
            return props.node.option.value;
        });
        var dbClickText;
        var textElInput; // editor
        {
            dbClickText = function dbClickText(ev) {
                ev.target;
                props.node.contentEditable = true;
            };
            watch(function () {
                return props.node.contentEditable;
            }, function (newVal, oldVal) {
                var _h1$value;
                h1.value.contentEditable = String(newVal);
                if (newVal)
                    (_h1$value = h1.value) === null || _h1$value === void 0 ? void 0 : _h1$value.focus();
            });
            textElInput = function textElInput(ev) {
                props.node.option.value = ev.target.innerText;
            };
        }
        return {
            color: color,
            opacity: opacity,
            value: value,
            fontColor: fontColor,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fontStyle: fontStyle,
            align: align,
            verticalAlign: verticalAlign,
            dbClickText: dbClickText,
            h1: h1,
            textElInput: textElInput
        };
    }
};

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "text-wrapper absolute flex",
    draggable: "false",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top,
      backgroundColor: $setup.color,
      opacity: $setup.opacity,
      textAlign: $setup.align,
      alignItems: $setup.verticalAlign
    }),
    onClick: _cache[6] || (_cache[6] = withModifiers(function () {}, ["stop"])),
    onMousedown: _cache[7] || (_cache[7] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    }),
    onWheelPassive: _cache[8] || (_cache[8] = withModifiers(function () {}, ["stop"])),
    onScroll: _cache[9] || (_cache[9] = withModifiers(function () {}, ["stop"])),
    ref: "el"
  }, [withDirectives(createElementVNode("img", {
    src: "",
    class: "emitter-icon absolute",
    draggable: "false",
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.emitterEffect && _ctx.emitterEffect.apply(_ctx, arguments);
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vShow, Object.keys($props.node.option.emitters).length > 0]]), createElementVNode("h3", {
    class: normalizeClass(["big-title flex-1", $setup.fontStyle]),
    style: normalizeStyle({
      color: $setup.fontColor,
      fontSize: $setup.fontSize,
      fontFamily: $setup.fontFamily
    }),
    onDblclick: _cache[1] || (_cache[1] = withModifiers(function () {
      return $setup.dbClickText && $setup.dbClickText.apply($setup, arguments);
    }, ["stop"])),
    ref: "h1",
    onInput: _cache[2] || (_cache[2] = function () {
      return $setup.textElInput && $setup.textElInput.apply($setup, arguments);
    }),
    onKeydown: _cache[3] || (_cache[3] = withModifiers(function () {}, ["stop"])),
    onKeyup: _cache[4] || (_cache[4] = withModifiers(function () {}, ["stop"])),
    onKeypress: _cache[5] || (_cache[5] = withModifiers(function () {}, ["stop"]))
  }, toDisplayString($setup.value), 39
  /* TEXT, CLASS, STYLE, HYDRATE_EVENTS */
  )], 36
  /* STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select
  }]]);
}

var css_248z$4 = "\n.text-wrapper[data-v-71cfa315]{\r\n  overflow-y: scroll;\r\n  overscroll-behavior-y:contain;\n}\n.weight[data-v-71cfa315] {\r\n  font-weight: bold;\n}\n.underline[data-v-71cfa315] {\r\n  text-decoration: underline;\n}\n.italic[data-v-71cfa315] {\r\n  font-style: oblique;\n}\n.big-title[data-v-71cfa315] {\r\n  outline: none;\r\n  word-break: break-all;\n}\n.emitter-icon[data-v-71cfa315]{\r\n  right: 0;\r\n  top: 0;\r\n  width: 50px;\n}\r\n";
styleInject(css_248z$4);

script$9.render = render$9;
script$9.__scopeId = "data-v-71cfa315";
script$9.__file = "src/components/text/BaseTitle.vue";

var script$8 = {
    name: 'TextContent',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup: function setup(props) {
        var h1 = ref(); // exterior
        var color = computed(function () {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        var opacity = computed(function () {
            return (props.node.option.transparency / 100).toFixed(2);
        }); // font
        var fontColor = computed(function () {
            return props.node.option.textOption.color;
        });
        var fontSize = computed(function () {
            return toPx(props.node.option.textOption.fontSize);
        });
        var fontFamily = computed(function () {
            return props.node.option.textOption.fontFamily;
        });
        var fontStyle = computed(function () {
            return props.node.option.textOption.fontStyle;
        });
        var align = computed(function () {
            return props.node.option.textOption.align;
        });
        var verticalAlign = computed(function () {
            return props.node.option.textOption.verticalAlign;
        }); // value
        var value = computed(function () {
            return props.node.option.value;
        });
        var dbClickText;
        var textElInput; // editor
        {
            dbClickText = function dbClickText(ev) {
                ev.target;
                props.node.contentEditable = true;
            };
            watch(function () {
                return props.node.contentEditable;
            }, function (newVal, oldVal) {
                var _h1$value;
                h1.value.contentEditable = String(newVal);
                if (newVal)
                    (_h1$value = h1.value) === null || _h1$value === void 0 ? void 0 : _h1$value.focus();
            });
            textElInput = function textElInput(ev) {
                props.node.option.value = ev.target.innerText;
            };
        }
        return {
            color: color,
            opacity: opacity,
            value: value,
            fontColor: fontColor,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fontStyle: fontStyle,
            align: align,
            verticalAlign: verticalAlign,
            dbClickText: dbClickText,
            h1: h1,
            textElInput: textElInput
        };
    }
};

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "text-wrapper absolute flex",
    draggable: "false",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top,
      backgroundColor: $setup.color,
      opacity: $setup.opacity,
      textAlign: $setup.align,
      alignItems: $setup.verticalAlign
    }),
    onClick: _cache[5] || (_cache[5] = withModifiers(function () {}, ["stop"])),
    onMousedown: _cache[6] || (_cache[6] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    }),
    onWheelPassive: _cache[7] || (_cache[7] = withModifiers(function () {}, ["stop"])),
    onScroll: _cache[8] || (_cache[8] = withModifiers(function () {}, ["stop"])),
    ref: "el"
  }, [createElementVNode("p", {
    class: normalizeClass(["big-title flex-1", $setup.fontStyle]),
    style: normalizeStyle({
      color: $setup.fontColor,
      fontSize: $setup.fontSize,
      fontFamily: $setup.fontFamily
    }),
    onDblclick: _cache[0] || (_cache[0] = withModifiers(function () {
      return $setup.dbClickText && $setup.dbClickText.apply($setup, arguments);
    }, ["stop"])),
    ref: "h1",
    onInput: _cache[1] || (_cache[1] = function () {
      return $setup.textElInput && $setup.textElInput.apply($setup, arguments);
    }),
    onKeydown: _cache[2] || (_cache[2] = withModifiers(function () {}, ["stop"])),
    onKeyup: _cache[3] || (_cache[3] = withModifiers(function () {}, ["stop"])),
    onKeypress: _cache[4] || (_cache[4] = withModifiers(function () {}, ["stop"]))
  }, toDisplayString($setup.value), 39
  /* TEXT, CLASS, STYLE, HYDRATE_EVENTS */
  )], 36
  /* STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select
  }]]);
}

var css_248z$3 = "\n.text-wrapper[data-v-3a41379a]{\r\n  overflow-y: scroll;\r\n  overscroll-behavior-y:contain;\n}\n.weight[data-v-3a41379a] {\r\n  font-weight: bold;\n}\n.underline[data-v-3a41379a] {\r\n  text-decoration: underline;\n}\n.italic[data-v-3a41379a] {\r\n  font-style: oblique;\n}\n.big-title[data-v-3a41379a] {\r\n  outline: none;\r\n  word-break: break-all;\n}\r\n";
styleInject(css_248z$3);

script$8.render = render$8;
script$8.__scopeId = "data-v-3a41379a";
script$8.__file = "src/components/text/TextContent.vue";

var chartMixin = {
  methods: {
    updateEchartsSize() {
      this.myChart.resize();
    },
    updateEchartsOption(notMerge) {
      if (this.node.option.dataType === 'api' && this.node.option.apiUrl) {
        const echartsOpt = clone(this.node.option.echartsOption);
        const tempSeries = echartsOpt.series[0];
        echartsOpt.series = [];
        fetch(this.node.option.apiUrl)
          .then((res) => res.json())
          .then((data) => {
            this.node.option.apiMapping.forEach((item) => {
              if (item.target === 'x') {
                echartsOpt.xAxis.data = valueHandle(data, item.path);
              } else {
                let series = clone(tempSeries);
                series.data = valueHandle(data, item.path);
                series.name = valueHandle(data, item.name) || item.name;
                echartsOpt.series.push(series);
              }
            });

            this.myChart.setOption(echartsOpt, notMerge);

          });

      } else {
        this.myChart.setOption(this.node.option.echartsOption, notMerge);
      }
      this.computedTop(this.node.option.echartsOption);
    },
    computedTop(option) {
      let top = 50;
      if (option.unit.show) {
        top += option.unit.textStyle.fontSize;
      }
      if (option.title.show) {
        top += option.title.textStyle.fontSize;
      }
      option.grid.top = top;
    }
  }
};

var script$7 = {
  name: 'ChartBar',
  mixins: [matrixMixin, chartMixin],
  props: ['node'],
  mounted: function mounted() {
    this.myChart = echarts.init(this.$refs.chartWrap);
    this.myChart.setOption(this.node.option.echartsOption);
  },
  methods: {
    debounceSetOption: debounce(function () {
      this.updateEchartsOption.apply(this, arguments);
    }, 300)
  },
  setup: function setup(props) {
    var instance = getCurrentInstance(); // title watcher

    watch(function () {
      return props.node.option.echartsOption.title;
    }, function (newVal, oldVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.unit;
    }, function (newVal, oldVal) {
      if (newVal.show) {
        var unit = props.node.option.echartsOption.unit; // eslint-disable-next-line vue/no-mutating-props

        props.node.option.echartsOption.graphic = {
          elements: [{
            type: 'text',
            left: unit.left,
            right: unit.right,
            top: unit.top,
            style: {
              text: unit.text,
              fill: unit.textStyle.color,
              font: "".concat(unit.textStyle.fontStyle, " ").concat(unit.textStyle.fontWeight, " ").concat(unit.textStyle.fontSize, "px ").concat(unit.textStyle.fontFamily)
            }
          }]
        };
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        delete props.node.option.echartsOption.graphic;
      }

      instance.ctx.debounceSetOption(true);
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.series;
    }, function (newVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.yAxis;
    }, function (newVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.legend;
    }, function (newVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.apiMapping;
    }, function () {
      instance.ctx.debounceSetOption();
    });
  },
  watch: {
    'node.option.echartsOption.color': {
      handler: function handler(newVal, oldVal) {
        this.debounceSetOption();
      },
      deep: true
    }
  }
};

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "chart-bar absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(function () {}, ["stop"])),
    draggable: "false",
    onMousedown: _cache[1] || (_cache[1] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    }),
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top
    }),
    ref: "chartWrap"
  }, null, 36
  /* STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select,
    change: _ctx.updateEchartsSize
  }]]);
}

script$7.render = render$7;
script$7.__file = "src/components/chart/ChartBar.vue";

var script$6 = {
  name: 'ChartLine',
  mixins: [matrixMixin, chartMixin],
  props: ['node'],
  mounted: function mounted() {
    this.myChart = echarts.init(this.$refs.chartWrap);
    this.myChart.setOption(this.node.option.echartsOption);
  },
  methods: {
    debounceSetOption: debounce(function () {
      this.updateEchartsOption.apply(this, arguments);
    }, 300)
  },
  setup: function setup(props) {
    var instance = getCurrentInstance(); // title watcher

    watch(function () {
      return props.node.option.echartsOption.title;
    }, function (newVal, oldVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.unit;
    }, function (newVal, oldVal) {
      if (newVal.show) {
        var unit = props.node.option.echartsOption.unit; // eslint-disable-next-line vue/no-mutating-props

        props.node.option.echartsOption.graphic = {
          elements: [{
            type: 'text',
            left: unit.left,
            right: unit.right,
            top: unit.top,
            style: {
              text: unit.text,
              fill: unit.textStyle.color,
              font: "".concat(unit.textStyle.fontStyle, " ").concat(unit.textStyle.fontWeight, " ").concat(unit.textStyle.fontSize, "px ").concat(unit.textStyle.fontFamily)
            }
          }]
        };
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        delete props.node.option.echartsOption.graphic;
      }

      instance.ctx.debounceSetOption(true);
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.series;
    }, function (newVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.yAxis;
    }, function (newVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.legend;
    }, function (newVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.apiMapping;
    }, function () {
      instance.ctx.debounceSetOption();
    });
  },
  watch: {
    'node.option.echartsOption.color': {
      handler: function handler(newVal, oldVal) {
        this.debounceSetOption();
      },
      deep: true
    }
  }
};

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "chart-bar absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(function () {}, ["stop"])),
    draggable: "false",
    onMousedown: _cache[1] || (_cache[1] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    }),
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top
    }),
    ref: "chartWrap"
  }, null, 36
  /* STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select,
    change: _ctx.updateEchartsSize
  }]]);
}

script$6.render = render$6;
script$6.__file = "src/components/chart/ChartLine.vue";

var script$5 = {
  name: 'ChartPie',
  mixins: [matrixMixin, chartMixin],
  props: ['node'],
  mounted: function mounted() {
    this.myChart = echarts.init(this.$refs.chartWrap);
    this.myChart.setOption(this.node.option.echartsOption);
  },
  methods: {
    debounceSetOption: debounce(function () {
      this.updateEchartsOption.apply(this, arguments);
    }, 300)
  },
  setup: function setup(props) {
    var instance = getCurrentInstance(); // title watcher

    watch(function () {
      return props.node.option.echartsOption.title;
    }, function (newVal, oldVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.unit;
    }, function (newVal, oldVal) {
      if (newVal.show) {
        var unit = props.node.option.echartsOption.unit; // eslint-disable-next-line vue/no-mutating-props

        props.node.option.echartsOption.graphic = {
          elements: [{
            type: 'text',
            left: unit.left,
            right: unit.right,
            top: unit.top,
            style: {
              text: unit.text,
              fill: unit.textStyle.color,
              font: "".concat(unit.textStyle.fontStyle, " ").concat(unit.textStyle.fontWeight, " ").concat(unit.textStyle.fontSize, "px ").concat(unit.textStyle.fontFamily)
            }
          }]
        };
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        delete props.node.option.echartsOption.graphic;
      }

      instance.ctx.debounceSetOption(true);
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.series;
    }, function (newVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.legend;
    }, function (newVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.apiMapping;
    }, function () {
      instance.ctx.debounceSetOption();
    });
  },
  watch: {
    'node.option.echartsOption.color': {
      handler: function handler(newVal, oldVal) {
        this.debounceSetOption();
      },
      deep: true
    }
  }
};

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "chart-bar absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(function () {}, ["stop"])),
    draggable: "false",
    onMousedown: _cache[1] || (_cache[1] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    }),
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top
    }),
    ref: "chartWrap"
  }, null, 36
  /* STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select,
    change: _ctx.updateEchartsSize
  }]]);
}

script$5.render = render$5;
script$5.__file = "src/components/chart/ChartPie.vue";

var script$4 = {
  name: 'ChartGauge',
  mixins: [matrixMixin, chartMixin],
  props: ['node'],
  mounted: function mounted() {
    this.myChart = echarts.init(this.$refs.chartWrap);
    this.myChart.setOption(this.node.option.echartsOption);
  },
  methods: {
    debounceSetOption: debounce(function () {
      this.updateEchartsOption.apply(this, arguments);
    }, 300)
  },
  setup: function setup(props) {
    var instance = getCurrentInstance(); // title watcher

    watch(function () {
      return props.node.option.echartsOption.title;
    }, function (newVal, oldVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.unit;
    }, function (newVal, oldVal) {
      if (newVal.show) {
        var unit = props.node.option.echartsOption.unit; // eslint-disable-next-line vue/no-mutating-props

        props.node.option.echartsOption.graphic = {
          elements: [{
            type: 'text',
            left: unit.left,
            right: unit.right,
            top: unit.top,
            style: {
              text: unit.text,
              fill: unit.textStyle.color,
              font: "".concat(unit.textStyle.fontStyle, " ").concat(unit.textStyle.fontWeight, " ").concat(unit.textStyle.fontSize, "px ").concat(unit.textStyle.fontFamily)
            }
          }]
        };
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        delete props.node.option.echartsOption.graphic;
      }

      instance.ctx.debounceSetOption(true);
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.series;
    }, function (newVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.legend;
    }, function (newVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.apiMapping;
    }, function () {
      instance.ctx.debounceSetOption();
    });
  },
  watch: {
    'node.option.echartsOption.color': {
      handler: function handler(newVal, oldVal) {
        this.debounceSetOption();
      },
      deep: true
    }
  }
};

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "chart-bar absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(function () {}, ["stop"])),
    draggable: "false",
    onMousedown: _cache[1] || (_cache[1] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    }),
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top
    }),
    ref: "chartWrap"
  }, null, 36
  /* STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select,
    change: _ctx.updateEchartsSize
  }]]);
}

script$4.render = render$4;
script$4.__file = "src/components/chart/ChartGauge.vue";

var script$3 = {
  name: 'ChartCurve',
  mixins: [matrixMixin, chartMixin],
  props: ['node'],
  mounted: function mounted() {
    this.myChart = echarts.init(this.$refs.chartWrap);
    this.myChart.setOption(this.node.option.echartsOption);
  },
  methods: {
    debounceSetOption: debounce(function () {
      this.updateEchartsOption.apply(this, arguments);
    }, 300)
  },
  setup: function setup(props) {
    var instance = getCurrentInstance(); // title watcher

    watch(function () {
      return props.node.option.echartsOption.title;
    }, function (newVal, oldVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.unit;
    }, function (newVal, oldVal) {
      if (newVal.show) {
        var unit = props.node.option.echartsOption.unit; // eslint-disable-next-line vue/no-mutating-props

        props.node.option.echartsOption.graphic = {
          elements: [{
            type: 'text',
            left: unit.left,
            right: unit.right,
            top: unit.top,
            style: {
              text: unit.text,
              fill: unit.textStyle.color,
              font: "".concat(unit.textStyle.fontStyle, " ").concat(unit.textStyle.fontWeight, " ").concat(unit.textStyle.fontSize, "px ").concat(unit.textStyle.fontFamily)
            }
          }]
        };
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        delete props.node.option.echartsOption.graphic;
      }

      instance.ctx.debounceSetOption(true);
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.series;
    }, function (newVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.yAxis;
    }, function (newVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.echartsOption.legend;
    }, function (newVal) {
      instance.ctx.debounceSetOption();
    }, {
      deep: true
    });
    watch(function () {
      return props.node.option.apiMapping;
    }, function () {
      instance.ctx.debounceSetOption();
    });
  },
  watch: {
    'node.option.echartsOption.color': {
      handler: function handler(newVal, oldVal) {
        this.debounceSetOption();
      },
      deep: true
    }
  }
};

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "chart-bar absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(function () {}, ["stop"])),
    draggable: "false",
    onMousedown: _cache[1] || (_cache[1] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    }),
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top
    }),
    ref: "chartWrap"
  }, null, 36
  /* STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select,
    change: _ctx.updateEchartsSize
  }]]);
}

script$3.render = render$3;
script$3.__file = "src/components/chart/ChartCurve.vue";

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var script$2 = {
  name: 'TableEl',
  props: ['data', 'bodyClass', 'headerClass'],
  setup: function setup(props, context) {
    var instance = getCurrentInstance();
    var tableEl = ref(null);
    var fixedWidth = 0;
    var columnVnodes = computed(function () {
      var list = [];
      var clsDefault = context.slots.default();
      clsDefault.forEach(function (item) {
        // v-for
        if (item.type === Fragment) list.push.apply(list, _toConsumableArray(item.children));else list.push(item);
      });
      return list;
    });
    var columnsProps = reactive(columnVnodes.value.map(function (item) {
      var res = clone(item.props);
      !isNaN(item.props.width) && (fixedWidth += res.realWidth = Number(item.props.width));
      return res;
    })); // 记录自动适应宽度的列

    var flexColumn = columnsProps.filter(function (item) {
      return !item.realWidth;
    });
    var bodyWidth = ref(0);
    var observer = new IntersectionObserver(function (mutations) {
      if (mutations[0].isIntersecting) {
        computedWidth();
      }
    }); // 计算列宽度

    var computedWidth = function computedWidth() {
      if (bodyWidth.value === instance.vnode.el.clientWidth) return;
      bodyWidth.value = instance.vnode.el.clientWidth;
      var diffWidth = bodyWidth.value - fixedWidth;
      flexColumn.forEach(function (item) {
        item.realWidth = diffWidth / flexColumn.length;
      });
    };

    var _loop;

    onMounted(function () {
      observer.observe(instance.vnode.el);

      _loop = function loop() {
        computedWidth();
        requestAnimationFrame(_loop || new Function());
      };

      _loop();
    });
    onUpdated(function () {
      requestAnimationFrame(computedWidth);
    });
    onUnmounted(function () {
      observer.disconnect();
      _loop = null;
    });

    var tableBody = function tableBody() {
      return createVNode("tbody", null, _toConsumableArray(props.data.map(function (item, rowI) {
        return createVNode("tr", null, _toConsumableArray(columnVnodes.value.map(function (col) {
          var _col$children;

          return createVNode("td", null, [col !== null && col !== void 0 && (_col$children = col.children) !== null && _col$children !== void 0 && _col$children.default ? col.children.default(clone({
            row: item,
            $index: rowI,
            column: item[col.props.prop]
          })) : item[col.props.prop]]);
        })));
      })));
    };

    var tableHead = function tableHead() {
      return createVNode("thead", null, [createVNode("tr", null, [columnVnodes.value.map(function (col, i) {
        var _col$children2;

        return createVNode("th", null, [' ', col !== null && col !== void 0 && (_col$children2 = col.children) !== null && _col$children2 !== void 0 && _col$children2.header ? col.children.header(clone({
          column: col.props.label,
          $index: i
        })) : col.props.label]);
      })])]);
    };

    return {
      toPx: toPx,
      columnsProps: columnsProps,
      bodyWidth: bodyWidth,
      tableBody: tableBody,
      tableHead: tableHead,
      tableEl: tableEl
    };
  }
};

var _hoisted_1$1 = {
  class: "table-el",
  ref: "tableEl"
};
var _hoisted_2$1 = {
  class: "table"
};
var _hoisted_3 = ["width"];
var _hoisted_4 = {
  class: "table"
};
var _hoisted_5 = ["width"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", _hoisted_1$1, [createElementVNode("div", {
    class: normalizeClass(["table-header", $props.headerClass]),
    style: normalizeStyle({
      width: _ctx.toPx(_ctx.bodyWidth)
    })
  }, [createElementVNode("table", _hoisted_2$1, [createElementVNode("colgroup", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.columnsProps, function (item) {
    return openBlock(), createElementBlock("col", {
      span: "1",
      width: item.realWidth,
      key: item.prop
    }, null, 8
    /* PROPS */
    , _hoisted_3);
  }), 128
  /* KEYED_FRAGMENT */
  ))]), (openBlock(), createBlock(resolveDynamicComponent(_ctx.tableHead)))])], 6
  /* CLASS, STYLE */
  ), createElementVNode("div", {
    class: normalizeClass(["table-body", $props.bodyClass]),
    style: normalizeStyle({
      width: _ctx.toPx(_ctx.bodyWidth)
    })
  }, [createElementVNode("table", _hoisted_4, [createElementVNode("colgroup", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.columnsProps, function (item) {
    return openBlock(), createElementBlock("col", {
      span: "1",
      width: item.realWidth,
      key: item.prop
    }, null, 8
    /* PROPS */
    , _hoisted_5);
  }), 128
  /* KEYED_FRAGMENT */
  ))]), createCommentVNode("        <tbody>\r\n               <tr v-for=\"item in data\" :key=\"item\">\r\n            <td v-for=\"col in columnsProps\" :key=\"col.prop\">{{ item[col.prop] }}</td>\r\n          </tr>\r\n        </tbody>"), (openBlock(), createBlock(resolveDynamicComponent(_ctx.tableBody), {
    class: "tbody"
  }))])], 6
  /* CLASS, STYLE */
  )], 512
  /* NEED_PATCH */
  );
}

var css_248z$2 = "\n.table-el[data-v-872d8798] {\r\n  width: 100%;\r\n  text-align: center;\r\n  color: #fff;\n}\n.table-header[data-v-872d8798] {\r\n  background: #1d1d1d;\n}\n.table-body[data-v-872d8798] {\r\n  background: #141414;\n}\n.table[data-v-872d8798] {\r\n  border-collapse: collapse;\n}\n.table-header[data-v-872d8798] th {\r\n  height: 30px;\r\n  border: 1px solid #313131;\r\n  border-bottom: none;\r\n  vertical-align: middle;\n}\n.table-body[data-v-872d8798] td {\r\n  height: 50px;\r\n  vertical-align: middle;\r\n  border: 1px solid #313131;\n}\r\n";
styleInject(css_248z$2);

script$2.render = render$2;
script$2.__scopeId = "data-v-872d8798";
script$2.__file = "src/components/2d/common/tableEl/TableEl.vue";

var script$1 = {
  name: "ColumnEl",
  props: ['prop', 'label', 'width'],
  setup: function setup() {}
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [renderSlot(_ctx.$slots, "header"), renderSlot(_ctx.$slots, "default")], 64
  /* STABLE_FRAGMENT */
  );
}

script$1.render = render$1;
script$1.__file = "src/components/2d/common/tableEl/ColumnEl.vue";

var script = {
  name: 'BaseTable',
  mixins: [matrixMixin],
  props: ['node'],
  components: {
    TableEl: script$2,
    ColumnEl: script$1
  },
  setup: function setup(props) {
    console.log(props.node);
    var tableData = computed(function () {
      return props.node.option.tableData;
    });
    var _enableEdit = false;
    computed({
      get: function get() {
        return _enableEdit;
      },
      set: function set(val) {
        _enableEdit = val;
      }
    });

    function editTableData(ev, payload) {
      var target = ev.target;
      target.setAttribute('contenteditable', true);
      target.focus();
    } // 双向绑定


    function editTableContentBlur(ev, payload, key) {
      // eslint-disable-next-line vue/no-mutating-props
      props.node.option.tableData[payload.$index][key] = ev.target.innerText;
      ev.target.setAttribute('contenteditable', false);
    }

    function editTableHeaderBlur(ev, payload, key) {
      // eslint-disable-next-line vue/no-mutating-props
      props.node.option.tableMap[key] = ev.target.innerText;
      ev.target.setAttribute('contenteditable', false);
    }

    var cssModule = useCssModule('table-1');
    console.log(cssModule);
    return {
      tableData: tableData,
      editTableData: editTableData,
      editTableContentBlur: editTableContentBlur,
      editTableHeaderBlur: editTableHeaderBlur,
      cssModule: cssModule
    };
  }
};

var _hoisted_1 = ["onBlur", "onDblclick"];
var _hoisted_2 = ["onBlur", "onDblclick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_column_el = resolveComponent("column-el");

  var _component_table_el = resolveComponent("table-el");

  var _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: normalizeClass(["table-wrapper absolute", $setup.cssModule['table-wrapper']]),
    draggable: "false",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top
    }),
    onClick: _cache[0] || (_cache[0] = withModifiers(function () {}, ["stop"])),
    onMousedown: _cache[1] || (_cache[1] = function () {
      return _ctx.onMouseDown && _ctx.onMouseDown.apply(_ctx, arguments);
    }),
    onWheelPassive: _cache[2] || (_cache[2] = withModifiers(function () {}, ["stop"])),
    onScroll: _cache[3] || (_cache[3] = withModifiers(function () {}, ["stop"])),
    ref: "el"
  }, [createVNode(_component_table_el, {
    data: $setup.tableData,
    "body-class": $setup.cssModule['table-body'],
    "header-class": $setup.cssModule['table-header']
  }, {
    default: withCtx(function () {
      return [(openBlock(true), createElementBlock(Fragment, null, renderList($props.node.option.tableMap, function (val, key) {
        return openBlock(), createBlock(_component_column_el, {
          prop: key,
          label: val,
          key: key
        }, {
          default: withCtx(function (data) {
            return [createElementVNode("div", {
              class: "col-content",
              onBlur: function onBlur($event) {
                return $setup.editTableContentBlur($event, data, key);
              },
              onDblclick: function onDblclick($event) {
                return $setup.editTableData($event, data);
              }
            }, toDisplayString(data.row[key]), 41
            /* TEXT, PROPS, HYDRATE_EVENTS */
            , _hoisted_1)];
          }),
          header: withCtx(function (data) {
            return [createElementVNode("div", {
              class: "col-header",
              onBlur: function onBlur($event) {
                return $setup.editTableHeaderBlur($event, data, key);
              },
              onDblclick: function onDblclick($event) {
                return $setup.editTableData($event, data);
              }
            }, toDisplayString(val), 41
            /* TEXT, PROPS, HYDRATE_EVENTS */
            , _hoisted_2)];
          }),
          _: 2
          /* DYNAMIC */

        }, 1032
        /* PROPS, DYNAMIC_SLOTS */
        , ["prop", "label"]);
      }), 128
      /* KEYED_FRAGMENT */
      ))];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["data", "body-class", "header-class"])], 38
  /* CLASS, STYLE, HYDRATE_EVENTS */
  )), [[_directive_drag, {
    rect: $props.node.option.matrixOption,
    select: $props.node.select
  }]]);
}

var css_248z$1 = "\n.table-wrapper[data-v-09d5eb08] {\r\n  overflow: hidden;\r\n  box-sizing: border-box;\n}\n.col-content[data-v-09d5eb08] {\r\n  outline: none;\r\n  overflow: auto;\n}\r\n";
styleInject(css_248z$1);

var css_248z = "._table-wrapper_xzvuu_1 {\n  background: rgba(225, 231, 227, 0.6);\n}\n._table-header_xzvuu_4 {\n  background: none !important;\n}\n._table-header_xzvuu_4 th {\n  border: none !important;\n  color: rgba(138, 152, 144, 0.6);\n  font-size: 12px !important;\n}\n._table-body_xzvuu_12 {\n  background: none !important;\n}\n._table-body_xzvuu_12 td {\n  height: auto !important;\n  padding: 8px 0;\n  border: none !important;\n  color: rgba(34, 52, 41, 0.6);\n  font-size: 12px !important;\n}\n";
styleInject(css_248z);

var style1 = {
  "table-wrapper": "_table-wrapper_xzvuu_1",
  "table-header": "_table-header_xzvuu_4",
  "table-body": "_table-body_xzvuu_12"
};

var cssModules = script.__cssModules = {};
cssModules["table-1"] = style1;
script.render = render;
script.__scopeId = "data-v-09d5eb08";
script.__file = "src/components/table/BaseTable.vue";

var index = {
    install(app) {
        app.component(script$h.name, script$h);
        app.component(script$g.name, script$g);
        app.component(script$f.name, script$f);
        app.component(script$e.name, script$e);
        app.component(script$d.name, script$d);
        app.component(script$c.name, script$c);
        app.component(script$b.name, script$b);
        app.component(script$a.name, script$a);
        app.component(script$9.name, script$9);
        app.component(script$8.name, script$8);
        app.component(script$7.name, script$7);
        app.component(script$6.name, script$6);
        app.component(script$5.name, script$5);
        app.component(script$4.name, script$4);
        app.component(script$3.name, script$3);
        app.component(script.name, script);
    }
};

export { script as BaseTable, script$9 as BaseTitle, script$b as BigTitle, script$7 as ChartBar, script$3 as ChartCurve, script$4 as ChartGauge, script$6 as ChartLine, script$5 as ChartPie, script$f as CircleShape, script$d as ImageMedia, script$h as RectShape, script$g as RoundedRectShape, script$a as SmallTitle, script$8 as TextContent, script$e as TriangleShape, script$c as VideoMedia, index as default };
