export function Timer(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  })
}
