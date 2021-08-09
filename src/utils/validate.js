/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 手机号码格式校验
 * @param {string} str
 * @returns {Boolean}
 */
export const validMobile = (str) => /^1[3|5|6|7|8|9]\d{9}$/.test(str)
