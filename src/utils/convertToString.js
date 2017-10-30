/**
 * Created by Rui on 15/9/17.
 */
export default (...args) => args.reduce((sum, x) => sum + String(x), "")