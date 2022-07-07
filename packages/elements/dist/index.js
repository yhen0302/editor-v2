import * as echarts from 'echarts';
import { computed, resolveDirective, withDirectives, openBlock, createElementBlock, withModifiers, normalizeStyle, ref, watch, createElementVNode, normalizeClass, toDisplayString, vShow, getCurrentInstance } from 'vue';
import _imports_0 from '@/assets/images/lightning.png';

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
function clone(object, deep = true) {
    if (typeof object === 'object' && object !== null) {
        // 引用类型
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const newObj = new object.constructor();
        for (const key of Object.keys(object)) {
            newObj[key] = deep
                ? clone(object[key], deep)
                : object[key];
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
        left() { return toPx(this.node.option.matrixOption.left); },
        width() { return toPx(this.node.option.matrixOption.width); },
        height() { return toPx(this.node.option.matrixOption.height); },
        top() { return toPx(this.node.option.matrixOption.top); },
    }
};

var script$e = {
    name: 'RectShape',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup(props) {
        const color = computed(() => {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        const opacity = computed(() => {
            return (props.node.option.transparency / 100).toFixed(2);
        });
        return {
            color,
            opacity
        };
    },
};

function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "rect-shape pointer-events-auto absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"])),
    draggable: "false",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top,
      backgroundColor: $setup.color,
      opacity: $setup.opacity
    }),
    onMousedown: _cache[1] || (_cache[1] = (...args) => (_ctx.onMouseDown && _ctx.onMouseDown(...args))),
    ref: "el"
  }, null, 36)), [
    [_directive_drag, { rect: $props.node.option.matrixOption, select: $props.node.select }]
  ])
}

script$e.render = render$e;

var script$d = {
    name: 'RoundedRectShape',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup(props) {
        const color = computed(() => {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        const opacity = computed(() => {
            return (props.node.option.transparency / 100).toFixed(2);
        });
        return {
            color,
            opacity
        };
    },
};

function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "rounded-rect-shape pointer-events-auto absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"])),
    draggable: "false",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top,
      backgroundColor: $setup.color,
      opacity: $setup.opacity
    }),
    onMousedown: _cache[1] || (_cache[1] = (...args) => (_ctx.onMouseDown && _ctx.onMouseDown(...args))),
    ref: "el"
  }, null, 36)), [
    [_directive_drag, { rect: $props.node.option.matrixOption, select: $props.node.select }]
  ])
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

var css_248z$8 = "\n.rounded-rect-shape[data-v-d17e9bb4]{\r\n  border-radius: 10%;\n}\r\n";
styleInject(css_248z$8);

script$d.render = render$d;
script$d.__scopeId = "data-v-d17e9bb4";

var script$c = {
    name: 'CircleShape',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup(props) {
        const color = computed(() => {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        const opacity = computed(() => {
            return (props.node.option.transparency / 100).toFixed(2);
        });
        return {
            color,
            opacity
        };
    },
};

function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "circle-rect-shape pointer-events-auto absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"])),
    draggable: "false",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top,
      backgroundColor: $setup.color,
      opacity: $setup.opacity
    }),
    onMousedown: _cache[1] || (_cache[1] = (...args) => (_ctx.onMouseDown && _ctx.onMouseDown(...args))),
    ref: "el"
  }, null, 36)), [
    [_directive_drag, { rect: $props.node.option.matrixOption, select: $props.node.select }]
  ])
}

var css_248z$7 = "\n.circle-rect-shape[data-v-8dbf2970]{\r\n  border-radius: 50%;\n}\r\n";
styleInject(css_248z$7);

script$c.render = render$c;
script$c.__scopeId = "data-v-8dbf2970";

var script$b = {
    name: 'TriangleShape',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup(props) {
        // exterior
        const color = computed(() => {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        const opacity = computed(() => {
            return (props.node.option.transparency / 100).toFixed(2);
        });
        return {
            color,
            opacity
        };
    },
};

function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "triangle-shape pointer-events-auto absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"])),
    draggable: "false",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top,
      backgroundColor: $setup.color,
      opacity: $setup.opacity
    }),
    onMousedown: _cache[1] || (_cache[1] = (...args) => (_ctx.onMouseDown && _ctx.onMouseDown(...args)))
  }, null, 36)), [
    [_directive_drag, { rect: $props.node.option.matrixOption, select: $props.node.select }]
  ])
}

var css_248z$6 = "\n.triangle-shape[data-v-6f660eaf] {\r\n  clip-path: polygon(0 0, 0% 100%, 100% 100%);\n}\r\n";
styleInject(css_248z$6);

script$b.render = render$b;
script$b.__scopeId = "data-v-6f660eaf";

var script$a = {
    name: 'ImageMedia',
    props: ['node'],
    mixins: [matrixMixin],
    emits: ['select', 'append'],
    setup(props) {
        const src = computed(() => props.node.option.src);
        return {
            src
        };
    },
};

const _hoisted_1$1 = ["src"];
const _hoisted_2$1 = {
  key: 1,
  class: "img-placeholder"
};

function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "image-media-wrap",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top
    }),
    ref: "el",
    onMousedown: _cache[0] || (_cache[0] = (...args) => (_ctx.onMouseDown && _ctx.onMouseDown(...args))),
    onClick: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"])),
    draggable: "false"
  }, [
    ($setup.src)
      ? (openBlock(), createElementBlock("img", {
          key: 0,
          class: "image-media pointer-events-auto absolute",
          draggable: "false",
          src: $setup.src
        }, null, 8, _hoisted_1$1))
      : (openBlock(), createElementBlock("div", _hoisted_2$1))
  ], 36)), [
    [_directive_drag, { rect: $props.node.option.matrixOption, select: $props.node.select }]
  ])
}

var css_248z$5 = "\n.image-media-wrap[data-v-a2e0ea0a] {\r\n  position: absolute;\r\n  pointer-events: auto;\n}\n.image-media[data-v-a2e0ea0a]{\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: fill;\n}\n.img-placeholder[data-v-a2e0ea0a] {\r\n  width: 100%;\r\n  height: 100%;\r\n  background: url(~@/assets/images/clip-1406.png) center/100% 100% no-repeat;\n}\r\n";
styleInject(css_248z$5);

script$a.render = render$a;
script$a.__scopeId = "data-v-a2e0ea0a";

var script$9 = {
    name: 'VideoMedia',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup(props) {
        const src = computed(() => props.node.option.src);
        return {
            src
        };
    }
};

const _hoisted_1 = ["src"];
const _hoisted_2 = {
  key: 1,
  class: "img-placeholder"
};

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "video-media-wrap",
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top
    }),
    ref: "el",
    onMousedown: _cache[0] || (_cache[0] = (...args) => (_ctx.onMouseDown && _ctx.onMouseDown(...args))),
    onClick: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"])),
    draggable: "false"
  }, [
    ($setup.src)
      ? (openBlock(), createElementBlock("video", {
          key: 0,
          class: "video-media pointer-events-auto absolute",
          draggable: "false",
          autoplay: "",
          loop: "",
          src: $setup.src
        }, null, 8, _hoisted_1))
      : (openBlock(), createElementBlock("div", _hoisted_2))
  ], 36)), [
    [_directive_drag, { rect: $props.node.option.matrixOption, select: $props.node.select }]
  ])
}

var css_248z$4 = "\n.video-media-wrap[data-v-9b14e932] {\r\n  position: absolute;\r\n  pointer-events: auto;\n}\n.video-media[data-v-9b14e932] {\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: fill;\n}\n.img-placeholder[data-v-9b14e932] {\r\n  width: 100%;\r\n  height: 100%;\r\n  background: url(~@/assets/images/clip-1406.png) center/100% 100% no-repeat;\n}\r\n";
styleInject(css_248z$4);

script$9.render = render$9;
script$9.__scopeId = "data-v-9b14e932";

var script$8 = {
    name: 'BigTitle',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup(props) {
        const h1 = ref();
        // exterior
        const color = computed(() => {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        const opacity = computed(() => {
            return (props.node.option.transparency / 100).toFixed(2);
        });
        // font
        const fontColor = computed(() => {
            return props.node.option.textOption.color;
        });
        const fontSize = computed(() => {
            return toPx(props.node.option.textOption.fontSize);
        });
        const fontFamily = computed(() => {
            return props.node.option.textOption.fontFamily;
        });
        const fontStyle = computed(() => {
            return props.node.option.textOption.fontStyle;
        });
        const align = computed(() => {
            return props.node.option.textOption.align;
        });
        const verticalAlign = computed(() => {
            return props.node.option.textOption.verticalAlign;
        });
        // value
        const value = computed(() => {
            return props.node.option.value;
        });
        let dbClickText;
        let textElInput;
        // editor
        {
            dbClickText = (ev) => {
                ev.target;
                props.node.contentEditable = true;
            };
            watch(() => props.node.contentEditable, (newVal, oldVal) => {
                h1.value.contentEditable = String(newVal);
                if (newVal)
                    h1.value?.focus();
            });
            textElInput = (ev) => {
                props.node.option.value = ev.target.innerText;
            };
        }
        return {
            color,
            opacity,
            value,
            fontColor,
            fontSize,
            fontFamily,
            fontStyle,
            align,
            verticalAlign,
            dbClickText,
            h1,
            textElInput
        };
    }
};

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "text-wrapper pointer-events-auto absolute flex",
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
    onClick: _cache[5] || (_cache[5] = withModifiers(() => {}, ["stop"])),
    onMousedown: _cache[6] || (_cache[6] = (...args) => (_ctx.onMouseDown && _ctx.onMouseDown(...args))),
    onWheelPassive: _cache[7] || (_cache[7] = withModifiers(() => {}, ["stop"])),
    onScroll: _cache[8] || (_cache[8] = withModifiers(() => {}, ["stop"])),
    ref: "el"
  }, [
    createElementVNode("h1", {
      class: normalizeClass(["big-title flex-1", $setup.fontStyle]),
      style: normalizeStyle({
        color: $setup.fontColor,
        fontSize: $setup.fontSize,
        fontFamily: $setup.fontFamily
      }),
      onDblclick: _cache[0] || (_cache[0] = withModifiers((...args) => ($setup.dbClickText && $setup.dbClickText(...args)), ["stop"])),
      ref: "h1",
      onInput: _cache[1] || (_cache[1] = (...args) => ($setup.textElInput && $setup.textElInput(...args))),
      onKeydown: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
      onKeyup: _cache[3] || (_cache[3] = withModifiers(() => {}, ["stop"])),
      onKeypress: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
    }, toDisplayString($setup.value), 39)
  ], 36)), [
    [_directive_drag, { rect: $props.node.option.matrixOption, select: $props.node.select }]
  ])
}

var css_248z$3 = "\n.text-wrapper[data-v-fa6368d4] {\r\n  overflow-y: scroll;\r\n  overscroll-behavior-y: contain;\n}\n.weight[data-v-fa6368d4] {\r\n  font-weight: bold;\n}\n.underline[data-v-fa6368d4] {\r\n  text-decoration: underline;\n}\n.italic[data-v-fa6368d4] {\r\n  font-style: oblique;\n}\n.big-title[data-v-fa6368d4] {\r\n  outline: none;\r\n  word-break: break-all;\n}\r\n";
styleInject(css_248z$3);

script$8.render = render$8;
script$8.__scopeId = "data-v-fa6368d4";

var script$7 = {
    name: 'SmallTitle',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup(props) {
        const h1 = ref();
        // exterior
        const color = computed(() => {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        const opacity = computed(() => {
            return (props.node.option.transparency / 100).toFixed(2);
        });
        // font
        const fontColor = computed(() => {
            return props.node.option.textOption.color;
        });
        const fontSize = computed(() => {
            return toPx(props.node.option.textOption.fontSize);
        });
        const fontFamily = computed(() => {
            return props.node.option.textOption.fontFamily;
        });
        const fontStyle = computed(() => {
            return props.node.option.textOption.fontStyle;
        });
        const align = computed(() => {
            return props.node.option.textOption.align;
        });
        const verticalAlign = computed(() => {
            return props.node.option.textOption.verticalAlign;
        });
        // value
        const value = computed(() => {
            return props.node.option.value;
        });
        let dbClickText;
        let textElInput;
        // editor
        {
            dbClickText = (ev) => {
                ev.target;
                props.node.contentEditable = true;
            };
            watch(() => props.node.contentEditable, (newVal, oldVal) => {
                h1.value.contentEditable = String(newVal);
                if (newVal)
                    h1.value?.focus();
            });
            textElInput = (ev) => {
                props.node.option.value = ev.target.innerText;
            };
        }
        return {
            color,
            opacity,
            value,
            fontColor,
            fontSize,
            fontFamily,
            fontStyle,
            align,
            verticalAlign,
            dbClickText,
            h1,
            textElInput
        };
    },
};

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "text-wrapper pointer-events-auto absolute flex",
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
    onClick: _cache[5] || (_cache[5] = withModifiers(() => {}, ["stop"])),
    onMousedown: _cache[6] || (_cache[6] = (...args) => (_ctx.onMouseDown && _ctx.onMouseDown(...args))),
    onWheelPassive: _cache[7] || (_cache[7] = withModifiers(() => {}, ["stop"])),
    onScroll: _cache[8] || (_cache[8] = withModifiers(() => {}, ["stop"])),
    ref: "el"
  }, [
    createElementVNode("h6", {
      class: normalizeClass(["big-title flex-1", $setup.fontStyle]),
      style: normalizeStyle({
        color: $setup.fontColor,
        fontSize: $setup.fontSize,
        fontFamily: $setup.fontFamily
      }),
      onDblclick: _cache[0] || (_cache[0] = withModifiers((...args) => ($setup.dbClickText && $setup.dbClickText(...args)), ["stop"])),
      ref: "h1",
      onInput: _cache[1] || (_cache[1] = (...args) => ($setup.textElInput && $setup.textElInput(...args))),
      onKeydown: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
      onKeyup: _cache[3] || (_cache[3] = withModifiers(() => {}, ["stop"])),
      onKeypress: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
    }, toDisplayString($setup.value), 39)
  ], 36)), [
    [_directive_drag, { rect: $props.node.option.matrixOption, select: $props.node.select }]
  ])
}

var css_248z$2 = "\n.text-wrapper[data-v-8b11ac22]{\r\n  overflow-y: scroll;\r\n  overscroll-behavior-y:contain;\n}\n.weight[data-v-8b11ac22] {\r\n  font-weight: bold;\n}\n.underline[data-v-8b11ac22] {\r\n  text-decoration: underline;\n}\n.italic[data-v-8b11ac22] {\r\n  font-style: oblique;\n}\n.big-title[data-v-8b11ac22] {\r\n  outline: none;\r\n  word-break: break-all;\n}\r\n";
styleInject(css_248z$2);

script$7.render = render$7;
script$7.__scopeId = "data-v-8b11ac22";

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

var script$6 = {
    name: 'BaseTitle',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin, emitterMixin],
    setup(props) {
        const h1 = ref();
        // exterior
        const color = computed(() => {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        const opacity = computed(() => {
            return (props.node.option.transparency / 100).toFixed(2);
        });
        // font
        const fontColor = computed(() => {
            return props.node.option.textOption.color;
        });
        const fontSize = computed(() => {
            return toPx(props.node.option.textOption.fontSize);
        });
        const fontFamily = computed(() => {
            return props.node.option.textOption.fontFamily;
        });
        const fontStyle = computed(() => {
            return props.node.option.textOption.fontStyle;
        });
        const align = computed(() => {
            return props.node.option.textOption.align;
        });
        const verticalAlign = computed(() => {
            return props.node.option.textOption.verticalAlign;
        });
        // value
        const value = computed(() => {
            return props.node.option.value;
        });
        let dbClickText;
        let textElInput;
        // editor
        {
            dbClickText = (ev) => {
                ev.target;
                props.node.contentEditable = true;
            };
            watch(() => props.node.contentEditable, (newVal, oldVal) => {
                h1.value.contentEditable = String(newVal);
                if (newVal)
                    h1.value?.focus();
            });
            textElInput = (ev) => {
                props.node.option.value = ev.target.innerText;
            };
        }
        return {
            color,
            opacity,
            value,
            fontColor,
            fontSize,
            fontFamily,
            fontStyle,
            align,
            verticalAlign,
            dbClickText,
            h1,
            textElInput
        };
    },
};

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "text-wrapper pointer-events-auto absolute flex",
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
    onClick: _cache[6] || (_cache[6] = withModifiers(() => {}, ["stop"])),
    onMousedown: _cache[7] || (_cache[7] = (...args) => (_ctx.onMouseDown && _ctx.onMouseDown(...args))),
    onWheelPassive: _cache[8] || (_cache[8] = withModifiers(() => {}, ["stop"])),
    onScroll: _cache[9] || (_cache[9] = withModifiers(() => {}, ["stop"])),
    ref: "el"
  }, [
    withDirectives(createElementVNode("img", {
      src: _imports_0,
      class: "emitter-icon absolute",
      draggable: "false",
      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.emitterEffect && _ctx.emitterEffect(...args)))
    }, null, 512), [
      [vShow, Object.keys($props.node.option.emitters).length>0]
    ]),
    createElementVNode("h3", {
      class: normalizeClass(["big-title flex-1", $setup.fontStyle]),
      style: normalizeStyle({
        color: $setup.fontColor,
        fontSize: $setup.fontSize,
        fontFamily: $setup.fontFamily
      }),
      onDblclick: _cache[1] || (_cache[1] = withModifiers((...args) => ($setup.dbClickText && $setup.dbClickText(...args)), ["stop"])),
      ref: "h1",
      onInput: _cache[2] || (_cache[2] = (...args) => ($setup.textElInput && $setup.textElInput(...args))),
      onKeydown: _cache[3] || (_cache[3] = withModifiers(() => {}, ["stop"])),
      onKeyup: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"])),
      onKeypress: _cache[5] || (_cache[5] = withModifiers(() => {}, ["stop"]))
    }, toDisplayString($setup.value), 39)
  ], 36)), [
    [_directive_drag, { rect: $props.node.option.matrixOption, select: $props.node.select }]
  ])
}

var css_248z$1 = "\n.text-wrapper[data-v-15f09f52]{\r\n  overflow-y: scroll;\r\n  overscroll-behavior-y:contain;\n}\n.weight[data-v-15f09f52] {\r\n  font-weight: bold;\n}\n.underline[data-v-15f09f52] {\r\n  text-decoration: underline;\n}\n.italic[data-v-15f09f52] {\r\n  font-style: oblique;\n}\n.big-title[data-v-15f09f52] {\r\n  outline: none;\r\n  word-break: break-all;\n}\n.emitter-icon[data-v-15f09f52]{\r\n  right: 0;\r\n  top: 0;\r\n  width: 50px;\n}\r\n";
styleInject(css_248z$1);

script$6.render = render$6;
script$6.__scopeId = "data-v-15f09f52";

var script$5 = {
    name: 'TextContent',
    props: ['node'],
    emits: ['select', 'append'],
    mixins: [matrixMixin],
    setup(props) {
        const h1 = ref();
        // exterior
        const color = computed(() => {
            return hexColorToRgba(props.node.option.transparencyColor.color, props.node.option.transparencyColor.transparency);
        });
        const opacity = computed(() => {
            return (props.node.option.transparency / 100).toFixed(2);
        });
        // font
        const fontColor = computed(() => {
            return props.node.option.textOption.color;
        });
        const fontSize = computed(() => {
            return toPx(props.node.option.textOption.fontSize);
        });
        const fontFamily = computed(() => {
            return props.node.option.textOption.fontFamily;
        });
        const fontStyle = computed(() => {
            return props.node.option.textOption.fontStyle;
        });
        const align = computed(() => {
            return props.node.option.textOption.align;
        });
        const verticalAlign = computed(() => {
            return props.node.option.textOption.verticalAlign;
        });
        // value
        const value = computed(() => {
            return props.node.option.value;
        });
        let dbClickText;
        let textElInput;
        // editor
        {
            dbClickText = (ev) => {
                ev.target;
                props.node.contentEditable = true;
            };
            watch(() => props.node.contentEditable, (newVal, oldVal) => {
                h1.value.contentEditable = String(newVal);
                if (newVal)
                    h1.value?.focus();
            });
            textElInput = (ev) => {
                props.node.option.value = ev.target.innerText;
            };
        }
        return {
            color,
            opacity,
            value,
            fontColor,
            fontSize,
            fontFamily,
            fontStyle,
            align,
            verticalAlign,
            dbClickText,
            h1,
            textElInput
        };
    },
};

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "text-wrapper pointer-events-auto absolute flex",
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
    onClick: _cache[5] || (_cache[5] = withModifiers(() => {}, ["stop"])),
    onMousedown: _cache[6] || (_cache[6] = (...args) => (_ctx.onMouseDown && _ctx.onMouseDown(...args))),
    onWheelPassive: _cache[7] || (_cache[7] = withModifiers(() => {}, ["stop"])),
    onScroll: _cache[8] || (_cache[8] = withModifiers(() => {}, ["stop"])),
    ref: "el"
  }, [
    createElementVNode("p", {
      class: normalizeClass(["big-title flex-1", $setup.fontStyle]),
      style: normalizeStyle({
        color: $setup.fontColor,
        fontSize: $setup.fontSize,
        fontFamily: $setup.fontFamily
      }),
      onDblclick: _cache[0] || (_cache[0] = withModifiers((...args) => ($setup.dbClickText && $setup.dbClickText(...args)), ["stop"])),
      ref: "h1",
      onInput: _cache[1] || (_cache[1] = (...args) => ($setup.textElInput && $setup.textElInput(...args))),
      onKeydown: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
      onKeyup: _cache[3] || (_cache[3] = withModifiers(() => {}, ["stop"])),
      onKeypress: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
    }, toDisplayString($setup.value), 39)
  ], 36)), [
    [_directive_drag, { rect: $props.node.option.matrixOption, select: $props.node.select }]
  ])
}

var css_248z = "\n.text-wrapper[data-v-5a46c5ba]{\r\n  overflow-y: scroll;\r\n  overscroll-behavior-y:contain;\n}\n.weight[data-v-5a46c5ba] {\r\n  font-weight: bold;\n}\n.underline[data-v-5a46c5ba] {\r\n  text-decoration: underline;\n}\n.italic[data-v-5a46c5ba] {\r\n  font-style: oblique;\n}\n.big-title[data-v-5a46c5ba] {\r\n  outline: none;\r\n  word-break: break-all;\n}\r\n";
styleInject(css_248z);

script$5.render = render$5;
script$5.__scopeId = "data-v-5a46c5ba";

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

var script$4 = {
  name: 'ChartBar',
  mixins: [matrixMixin,chartMixin],
  props: ['node'],
  mounted() {
    this.myChart = echarts.init(this.$refs.chartWrap);
    this.myChart.setOption(this.node.option.echartsOption);
  },

  methods: {
    debounceSetOption: debounce(function (...args) {
      this.updateEchartsOption(...args);
    }, 300)
  },
  setup(props) {
    const instance = getCurrentInstance();
    // title watcher
    watch(
      () => props.node.option.echartsOption.title,
      (newVal, oldVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );

    watch(
      () => props.node.option.echartsOption.unit,
      (newVal, oldVal) => {
        if (newVal.show) {
          const unit = props.node.option.echartsOption.unit;
          // eslint-disable-next-line vue/no-mutating-props
          props.node.option.echartsOption.graphic = {
            elements: [
              {
                type: 'text',
                left: unit.left,
                right: unit.right,
                top: unit.top,
                style: {
                  text: unit.text,
                  fill: unit.textStyle.color,
                  font: `${unit.textStyle.fontStyle} ${unit.textStyle.fontWeight} ${unit.textStyle.fontSize}px ${unit.textStyle.fontFamily}`
                }
              }
            ]
          };
        } else {
          // eslint-disable-next-line vue/no-mutating-props
          delete props.node.option.echartsOption.graphic;
        }
        instance.ctx.debounceSetOption(true);
      },
      { deep: true }
    );

    watch(
      () => props.node.option.echartsOption.series,
      (newVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );
    watch(
      () => props.node.option.echartsOption.yAxis,
      (newVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );
    watch(
      () => props.node.option.echartsOption.legend,
      (newVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );
    watch(()=>props.node.option.apiMapping,()=>{
      instance.ctx.debounceSetOption();
    });
  },
  watch: {
    'node.option.echartsOption.color': {
      handler(newVal, oldVal) {
        this.debounceSetOption();
      },
      deep: true
    }
  }
};

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "chart-bar pointer-events-auto absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"])),
    draggable: "false",
    onMousedown: _cache[1] || (_cache[1] = (...args) => (_ctx.onMouseDown && _ctx.onMouseDown(...args))),
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top
    }),
    ref: "chartWrap"
  }, null, 36)), [
    [_directive_drag, {
      rect: $props.node.option.matrixOption,
      select: $props.node.select,
      change: _ctx.updateEchartsSize
    }]
  ])
}

script$4.render = render$4;

var script$3 = {
  name: 'ChartLine',
  mixins: [matrixMixin,chartMixin],
  props: ['node'],
  mounted() {
    this.myChart = echarts.init(this.$refs.chartWrap);
    this.myChart.setOption(this.node.option.echartsOption);
  },

  methods: {
    debounceSetOption: debounce(function (...args) {
      this.updateEchartsOption(...args);
    }, 300)
  },
  setup(props) {
    const instance = getCurrentInstance();
    // title watcher
    watch(
      () => props.node.option.echartsOption.title,
      (newVal, oldVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );

    watch(
      () => props.node.option.echartsOption.unit,
      (newVal, oldVal) => {
        if (newVal.show) {
          const unit = props.node.option.echartsOption.unit;
          // eslint-disable-next-line vue/no-mutating-props
          props.node.option.echartsOption.graphic = {
            elements: [
              {
                type: 'text',
                left: unit.left,
                right: unit.right,
                top: unit.top,
                style: {
                  text: unit.text,
                  fill: unit.textStyle.color,
                  font: `${unit.textStyle.fontStyle} ${unit.textStyle.fontWeight} ${unit.textStyle.fontSize}px ${unit.textStyle.fontFamily}`
                }
              }
            ]
          };
        } else {
          // eslint-disable-next-line vue/no-mutating-props
          delete props.node.option.echartsOption.graphic;
        }
        instance.ctx.debounceSetOption(true);
      },
      { deep: true }
    );

    watch(
      () => props.node.option.echartsOption.series,
      (newVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );
    watch(
      () => props.node.option.echartsOption.yAxis,
      (newVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );
    watch(
      () => props.node.option.echartsOption.legend,
      (newVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );
    watch(()=>props.node.option.apiMapping,()=>{
      instance.ctx.debounceSetOption();
    });
  },
  watch: {
    'node.option.echartsOption.color': {
      handler(newVal, oldVal) {
        this.debounceSetOption();
      },
      deep: true
    }
  },
};

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "chart-bar pointer-events-auto absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"])),
    draggable: "false",
    onMousedown: _cache[1] || (_cache[1] = (...args) => (_ctx.onMouseDown && _ctx.onMouseDown(...args))),
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top
    }),
    ref: "chartWrap"
  }, null, 36)), [
    [_directive_drag, {
      rect: $props.node.option.matrixOption,
      select: $props.node.select,
      change: _ctx.updateEchartsSize
    }]
  ])
}

script$3.render = render$3;

var script$2 = {
  name: 'ChartPie',
  mixins: [matrixMixin, chartMixin],
  props: ['node'],
  mounted() {
    this.myChart = echarts.init(this.$refs.chartWrap);
    this.myChart.setOption(this.node.option.echartsOption);
  },

  methods: {
    debounceSetOption: debounce(function (...args) {
      this.updateEchartsOption(...args);
    }, 300)
  },
  setup(props) {
    const instance = getCurrentInstance();
    // title watcher
    watch(
      () => props.node.option.echartsOption.title,
      (newVal, oldVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );

    watch(
      () => props.node.option.echartsOption.unit,
      (newVal, oldVal) => {
        if (newVal.show) {
          const unit = props.node.option.echartsOption.unit;
          // eslint-disable-next-line vue/no-mutating-props
          props.node.option.echartsOption.graphic = {
            elements: [
              {
                type: 'text',
                left: unit.left,
                right: unit.right,
                top: unit.top,
                style: {
                  text: unit.text,
                  fill: unit.textStyle.color,
                  font: `${unit.textStyle.fontStyle} ${unit.textStyle.fontWeight} ${unit.textStyle.fontSize}px ${unit.textStyle.fontFamily}`
                }
              }
            ]
          };
        } else {
          // eslint-disable-next-line vue/no-mutating-props
          delete props.node.option.echartsOption.graphic;
        }
        instance.ctx.debounceSetOption(true);
      },
      { deep: true }
    );

    watch(
      () => props.node.option.echartsOption.series,
      (newVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );
    watch(
      () => props.node.option.echartsOption.legend,
      (newVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );
    watch(
      () => props.node.option.apiMapping,
      () => {
        instance.ctx.debounceSetOption();
      }
    );
  },
  watch: {
    'node.option.echartsOption.color': {
      handler(newVal, oldVal) {
        this.debounceSetOption();
      },
      deep: true
    }
  }
};

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "chart-bar pointer-events-auto absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"])),
    draggable: "false",
    onMousedown: _cache[1] || (_cache[1] = (...args) => (_ctx.onMouseDown && _ctx.onMouseDown(...args))),
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top
    }),
    ref: "chartWrap"
  }, null, 36)), [
    [_directive_drag, {
      rect: $props.node.option.matrixOption,
      select: $props.node.select,
      change: _ctx.updateEchartsSize
    }]
  ])
}

script$2.render = render$2;

var script$1 = {
  name: 'ChartGauge',
  mixins: [matrixMixin,chartMixin],
  props: ['node'],
  mounted() {
    this.myChart = echarts.init(this.$refs.chartWrap);
    this.myChart.setOption(this.node.option.echartsOption);
  },

  methods: {
    debounceSetOption: debounce(function (...args) {
      this.updateEchartsOption(...args);
    }, 300)
  },
  setup(props) {
    const instance = getCurrentInstance();
    // title watcher
    watch(
      () => props.node.option.echartsOption.title,
      (newVal, oldVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );
    watch(
      () => props.node.option.echartsOption.unit,
      (newVal, oldVal) => {
        if (newVal.show) {
          const unit = props.node.option.echartsOption.unit;
          // eslint-disable-next-line vue/no-mutating-props
          props.node.option.echartsOption.graphic = {
            elements: [
              {
                type: 'text',
                left: unit.left,
                right: unit.right,
                top: unit.top,
                style: {
                  text: unit.text,
                  fill: unit.textStyle.color,
                  font: `${unit.textStyle.fontStyle} ${unit.textStyle.fontWeight} ${unit.textStyle.fontSize}px ${unit.textStyle.fontFamily}`
                }
              }
            ]
          };
        } else {
          // eslint-disable-next-line vue/no-mutating-props
          delete props.node.option.echartsOption.graphic;
        }
        instance.ctx.debounceSetOption(true);
      },
      { deep: true }
    );

    watch(
      () => props.node.option.echartsOption.series,
      (newVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );
    watch(
      () => props.node.option.echartsOption.legend,
      (newVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );
    watch(()=>props.node.option.apiMapping,()=>{
      instance.ctx.debounceSetOption();
    });
  },
  watch: {
    'node.option.echartsOption.color': {
      handler(newVal, oldVal) {
        this.debounceSetOption();
      },
      deep: true
    }
  }
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "chart-bar pointer-events-auto absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"])),
    draggable: "false",
    onMousedown: _cache[1] || (_cache[1] = (...args) => (_ctx.onMouseDown && _ctx.onMouseDown(...args))),
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top
    }),
    ref: "chartWrap"
  }, null, 36)), [
    [_directive_drag, {
      rect: $props.node.option.matrixOption,
      select: $props.node.select,
      change: _ctx.updateEchartsSize
    }]
  ])
}

script$1.render = render$1;

var script = {
  name: 'ChartCurve',
  mixins: [matrixMixin,chartMixin],
  props: ['node'],
  mounted() {
    this.myChart = echarts.init(this.$refs.chartWrap);
    this.myChart.setOption(this.node.option.echartsOption);
  },

  methods: {
    debounceSetOption: debounce(function (...args) {
      this.updateEchartsOption(...args);
    }, 300)
  },
  setup(props) {
    const instance = getCurrentInstance();
    // title watcher
    watch(
      () => props.node.option.echartsOption.title,
      (newVal, oldVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );

    watch(
      () => props.node.option.echartsOption.unit,
      (newVal, oldVal) => {
        if (newVal.show) {
          const unit = props.node.option.echartsOption.unit;
          // eslint-disable-next-line vue/no-mutating-props
          props.node.option.echartsOption.graphic = {
            elements: [
              {
                type: 'text',
                left: unit.left,
                right: unit.right,
                top: unit.top,
                style: {
                  text: unit.text,
                  fill: unit.textStyle.color,
                  font: `${unit.textStyle.fontStyle} ${unit.textStyle.fontWeight} ${unit.textStyle.fontSize}px ${unit.textStyle.fontFamily}`
                }
              }
            ]
          };
        } else {
          // eslint-disable-next-line vue/no-mutating-props
          delete props.node.option.echartsOption.graphic;
        }
        instance.ctx.debounceSetOption(true);
      },
      { deep: true }
    );

    watch(
      () => props.node.option.echartsOption.series,
      (newVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );
    watch(
      () => props.node.option.echartsOption.yAxis,
      (newVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );
    watch(
      () => props.node.option.echartsOption.legend,
      (newVal) => {
        instance.ctx.debounceSetOption();
      },
      { deep: true }
    );
    watch(()=>props.node.option.apiMapping,()=>{
      instance.ctx.debounceSetOption();
    });
  },
  watch: {
    'node.option.echartsOption.color': {
      handler(newVal, oldVal) {
        this.debounceSetOption();
      },
      deep: true
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_drag = resolveDirective("drag");

  return withDirectives((openBlock(), createElementBlock("div", {
    class: "chart-bar pointer-events-auto absolute",
    onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"])),
    draggable: "false",
    onMousedown: _cache[1] || (_cache[1] = (...args) => (_ctx.onMouseDown && _ctx.onMouseDown(...args))),
    style: normalizeStyle({
      width: _ctx.width,
      height: _ctx.height,
      left: _ctx.left,
      top: _ctx.top
    }),
    ref: "chartWrap"
  }, null, 36)), [
    [_directive_drag, {
      rect: $props.node.option.matrixOption,
      select: $props.node.select,
      change: _ctx.updateEchartsSize
    }]
  ])
}

script.render = render;

var index = {
    install(app) {
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
        app.component(script$2.name, script$2);
        app.component(script$1.name, script$1);
        app.component(script.name, script);
    }
};

export { script$6 as BaseTitle, script$8 as BigTitle, script$4 as ChartBar, script as ChartCurve, script$1 as ChartGauge, script$3 as ChartLine, script$2 as ChartPie, script$c as CircleShape, script$a as ImageMedia, script$e as RectShape, script$d as RoundedRectShape, script$7 as SmallTitle, script$5 as TextContent, script$b as TriangleShape, script$9 as VideoMedia, index as default };
