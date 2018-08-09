export default {
  name: 'focus',

  inserted: function(el, binding) {
    if (binding.value) {
      el.focus()
    } else {
      el.blur()
    }
  },

  componentUpdated: function(el, binding) {
    if (binding.modifiers.lazy) {
      if (Boolean(binding.value) === Boolean(binding.oldValue)) {
        return
      }
    }

    if (binding.value) el.focus()
    else el.blur()
  }
}
