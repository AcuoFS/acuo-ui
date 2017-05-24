export const checkServerConnectivity = () => {
  return fetch('http://localhost:8081/common/check-connectivity').then(response => {
    return 'passed'
  }, error => {
    return 'failed'
  })
}