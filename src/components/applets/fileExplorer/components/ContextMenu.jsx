import { useContextMenu } from "../hooks/useContextMenu"

const ContextMenu = ({ menu }) => {
  const { xPos, yPos, showMenu } = useContextMenu()

  return (
    showMenu && (
      <div
        className="menu-container"
        style={{
          position: "absolute",
          top: yPos,
          left: xPos,
        }}
      >
        {menu}
      </div>
    )
  )
}

export default ContextMenu
