export const mineColor = () => {
  let colors = ["orange", "darkgreen", "cyan", "violet", "yellow"]
  return colors[Math.floor(Math.random() * colors.length)]
}
