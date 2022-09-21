//@ts-nocheck
export default {
  methods: {
    emitterEffect(ev) {
      for (const key of Object.keys(this.node.option.emitters)) {
        const s = key.split(':')
        const eventType = s[0]
        const eventAction = s[1]
        const effect = this.node.option.emitters[key]
        // console.log(ev.type, eventType, eventAction, effect)
      }
    }
  }
}
