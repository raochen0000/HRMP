export const imgError = {
  inserted(el, binding) {
    setSrc(el, binding.value)
  },
  componentUpdated(el, binding) {
    // setSrc(el, binding.value)
  }
}

const setSrc = (el, defaultImg) => {
  // 判断图片是否存在
  if (!el.src) {
    el.src = defaultImg
    return
  }
  // 图片加载失败
  el.onerror = function() {
    el.src = defaultImg
  }
}
