export class Item {
  #name = ""
  #parent = null

  constructor(name) {
    // Items cannot directly be created. Make a File or Directory instead.
    if (this.constructor.name === "Item") {
      throw new Error("Item class is Abstract. It can only be extended.")
    }

    this.name = name
  }

  get path() {
    if (this.parent) {
      return `${this.parent.path}/${this.name}`
    }

    return this.name
  }

  get name() {
    return this.#name
  }

  set name(newName) {
    if (newName.includes("/")) {
      throw new Error("Item name contains invalid symbol. (/) -> " + newName)
    }

    if (this.parent && this.parent.hasItem(newName)) {
      throw new Error(
        `Item with name ${newName} already exists in this directory.`
      )
    }

    if (!newName || typeof newName !== "string" || !newName.trim().length) {
      throw new Error("Item name must be a non-empty string")
    }

    this.#name = newName.trim()
  }

  get parent() {
    return this.#parent
  }

  set parent(newParent) {
    if (newParent !== this.#parent) {
      const prevParent = this.#parent
      this.#parent = newParent

      if (prevParent) {
        prevParent.removeItem(this.name)
      }

      if (newParent) {
        newParent.insertItem(this)
      }
    }
  }
}

export const FILE_TYPE = {
  text: "text",
  executable: "executable",
  note: "note",
  internet: "internet",
  dos: "dos",
}

export class File extends Item {
  #type = "text"
  #mimeType = "txt"
  #textContent = ""
  #source = null

  constructor(
    name = "",
    type = FILE_TYPE.TEXT,
    textContent = "",
    source = null
  ) {
    super(name || "un-named file")
    this.#type = FILE_TYPE[type] ? type : FILE_TYPE.TEXT
    this.#textContent = textContent
    this.#source = source
  }

  get textContent() {
    return this.#textContent
  }

  set textContent(content) {
    this.#textContent = `${content || ""}`
  }

  get source() {
    return this.#source
  }

  set source(newSource) {
    this.#source = newSource

    if (newSource && newSource.type) {
      let [type, mime] = newSource.type.split("/")
      mime = mime.match(/[\w-]+/g)

      this.#type = type || "text"
      this.#mimeType = !mime || mime[0] === "plain" ? "txt" : mime[0]
    }
  }

  get type() {
    return this.#type
  }

  get mimeType() {
    return this.#mimeType
  }

  get copy() {
    return new File(`${this.name} copy`, this.textContent, this.source)
  }
}

export const DIRECTORY_TYPE = {
  folder: "folder",
  drive: "drive",
  documents: "documents",
  bookmarks: "bookmarks",
}

export class Directory extends Item {
  #type = DIRECTORY_TYPE.DEFAULT
  #children = new Map()

  constructor(name = "", type) {
    super(name || "un-named directory")
    this.#type = DIRECTORY_TYPE[type] ? type : DIRECTORY_TYPE.folder
  }

  get content() {
    return Array.from(this.#children.values())
  }

  get type() {
    return this.#type
  }

  get copy() {
    const dirCopy = new Directory(`${this.name} copy`, this.type)

    this.content.forEach((item) => {
      const itemCopy = item.copy
      itemCopy.name = item.name
      dirCopy.insertItem(itemCopy)
    })

    return dirCopy
  }

  hasItem(itemName) {
    return this.#children.has(itemName)
  }

  insertItem(item) {
    if (this.hasItem(item.name)) return true

    if (item === this) throw new Error("Directory cannot contain itself")

    let parent = this.parent

    while (parent !== null) {
      if (parent === item) {
        throw new Error("Directory cannot contain one of its ancestors")
      }
      parent = parent.parent
    }

    this.#children.set(item.name, item)
    item.parent = this

    return this.hasItem(item.name)
  }

  getItem(itemName) {
    return this.#children.get(itemName) || null
  }

  removeItem(itemName) {
    const item = this.getItem(itemName)

    if (item) {
      this.#children.delete(itemName)
      item.parent = null
    }

    return !this.hasItem(itemName)
  }
}

export class FileSystem {
  #self = new Directory("root")
  #currentDirectory = this.#self
  // An array of directories
  #currentDirectoryPath = [this.#currentDirectory]

  get currentDirectory() {
    return this.#currentDirectory
  }

  get currentDirectoryPath() {
    return this.#currentDirectoryPath.map((dir) => `${dir.name}`)
  }

  get root() {
    return this.#self
  }

  get parent() {
    return null
  }

  get name() {
    return this.root.name
  }

  get copy() {
    const fsCopy = new FileSystem()

    this.root.content.forEach((item) => {
      const itemCopy = item.copy
      itemCopy.name = item.name
      fsCopy.insertItem(itemCopy)
    })

    return fsCopy
  }

  get content() {
    return this.currentDirectory.content
  }

  createFile(fileName, ...options) {
    const newFile = new File(fileName, ...options)

    this.insertItem(newFile)

    return newFile
  }

  createDirectory(fileName, type = DIRECTORY_TYPE.DEFAULT) {
    const newDir = new Directory(fileName, type)

    this.currentDirectory.insertItem(newDir)

    return newDir
  }

  insertItem(item) {
    return this.currentDirectory.insertItem(item)
  }

  getItem(itemName) {
    return this.currentDirectory.getItem(itemName)
  }

  hasItem(itemName) {
    return this.currentDirectory.hasItem(itemName)
  }

  removeItem(itemName) {
    return this.currentDirectory.removeItem(itemName)
  }

  renameItem(currentName, newName) {
    const item = this.getItem(currentName)

    if (item) {
      item.name = newName
      this.removeItem(currentName)
      this.insertItem(item)
      return item
    }

    return null
  }

  copyItem(itemName) {
    const item = this.getItem(itemName)

    if (item) {
      const itemCopy = item.copy
      this.insertItem(itemCopy)
      return itemCopy
    }

    return null
  }

  printCurrentDirectory() {
    console.log(
      `\n[${this.currentDirectoryPath.join("/")}]` +
        (this.currentDirectory.content
          .map(
            (item) =>
              `\n[${item.constructor.name.substring(0, 1)}]-> ${item.name}`
          )
          .join("") || "\n(empty)")
    )
  }

  openDirectory(path) {
    if (!path) return

    const dir = this.#getDirectoryFromPath(path)

    if (!(dir && dir instanceof Directory)) return null

    const dirPath = [dir]
    let parent = dir.parent

    while (parent) {
      dirPath.unshift(parent)
      parent = parent.parent
    }

    this.#currentDirectory = dir
    this.#currentDirectoryPath = dirPath

    return dir
  }

  goBack(steps = 1) {
    if (isNaN(steps) || steps <= 0 || steps >= this.currentDirectoryPath.length)
      return

    let dir = this.currentDirectory
    let stepsMoved = steps

    while (dir && stepsMoved > 0) {
      dir = dir.parent
      stepsMoved--
    }

    if (dir && dir !== this.currentDirectory) {
      this.#currentDirectory = dir
      this.#currentDirectoryPath = this.#currentDirectoryPath.slice(
        0,
        this.#currentDirectoryPath.length - (steps - stepsMoved)
      )
    }

    return dir
  }

  goBackToDirectory(dirName) {
    // search the array of dirs starting with parent dir for a match of dirName. That's the dirIndex.
    const dirIndex = this.currentDirectoryPath.lastIndexOf(
      dirName,
      this.currentDirectoryPath.length - 2
    )

    // "lastIndexOf()" returns -1 if dirName not found
    // Return early if dirName not found in path
    if (dirIndex < 0) return

    // Set dir to root or dir indicated by dirIndex.
    const dir =
      dirIndex === 0 ? this.root : this.#currentDirectoryPath[dirIndex]

    // Set 'this' to reflect new directory/path
    this.#currentDirectory = dir
    this.#currentDirectoryPath = this.#currentDirectoryPath.slice(
      0,
      dirIndex + 1
    )

    return dir
  }

  findItem(itemNameOrValidatorFunc, fromDirectory = this.root) {
    return this.#setupAndFind(itemNameOrValidatorFunc, fromDirectory)
  }

  findAllItems(itemNameOrValidatorFunc, fromDirectory = this.root) {
    return this.#setupAndFind(itemNameOrValidatorFunc, fromDirectory, true)
  }

  moveItemTo(itemName, dirPath) {
    const item = this.getItem(itemName)

    if (item) {
      const dir = this.#getDirectoryFromPath(dirPath)

      if (dir && dir instanceof Directory) {
        dir.insertItem(item)
        return dir
      }
    }

    return null
  }

  #setupAndFind = (itemNameOrValidatorFunc, fromDirectory, multiple) => {
    if (typeof itemNameOrValidatorFunc === "function") {
      return this.#findItem(itemNameOrValidatorFunc, fromDirectory, multiple)
    }

    const func = (item) => item.name === itemNameOrValidatorFunc
    return this.#findItem(func, fromDirectory, multiple)
  }

  #findItem = (isItem, dir, multiple = false) => {
    let match = multiple ? [] : null
    let directories = []

    for (const item of dir.content) {
      if (isItem(item)) {
        if (multiple) {
          match.push(item)
        } else {
          match = item
          break
        }
      }

      if (item instanceof Directory) {
        directories.push(item)
      }
    }

    if ((match === null || multiple) && directories.length) {
      for (const subDir of directories) {
        const found = this.#findItem(isItem, subDir, multiple)
        // If we're searching for all items, push to an array of matches
        if (multiple) {
          match.push(...found)

          // Otherwise, return the matched item
        } else if (found) {
          match = found
          break
        }
      }
    }

    return match
  }

  #getDirectoryFromPath = (dirPath) => {
    if (dirPath.match(/^(root\/?|\/)$/g)) {
      return this.root
    }

    if (dirPath.match(/^\.\/?$/g)) {
      return this.currentDirectory
    }

    let dir = dirPath.match(/^(root\/?|\/)/g)
      ? this.root
      : this.currentDirectory
    const paths = dirPath.replace(/^(root\/|\.\/|\/)/g, "").split("/")

    while (paths.length) {
      dir = dir.getItem(paths.shift())

      if (!dir || !(dir instanceof Directory)) {
        return null
      }
    }

    if (paths.length === 0) {
      return dir
    }

    return null
  }
}

export const fs = new FileSystem()

fs.createDirectory("C:", "drive")
fs.openDirectory("C:")
fs.createDirectory("Documents", "documents")
fs.openDirectory("Documents")
fs.createFile("Oh wow!", "text")
fs.createFile("Look at that", "text")
fs.createFile("Isn't that something?", "text")
fs.createFile("Sure is", "text")
fs.goBack()
fs.createDirectory("Programs", "programs")
fs.createDirectory("Bookmarks", "bookmarks")
fs.openDirectory("Bookmarks")
fs.createFile("AOL", "internet")
fs.createFile("Yahoo", "internet")
fs.createFile("Tim Tang", "internet")
fs.createFile("Ask Jeeves", "internet")
fs.createFile("Geocities", "internet")
fs.createFile("eBay", "internet")
fs.createFile("IMDb", "internet")
fs.createFile("Chit Chat", "internet")
fs.createFile("ReDirector", "internet")
fs.goBack()
fs.createFile("Hello World", "text", "Hello World!")
fs.createFile(
  "README",
  "note",
  `98ish:

A simulated operating system in a nostalgic style.
by Brandon Taylor and Cameron De Robertis.

Tech Stack:
- React,
- Bootstrap,
- 98.css`
)
fs.createFile("Cover Letter", "text")

// fs.goBack()
// fs.goBackToDirectory("one")
// fs.openDirectory("one")

// move file named "file1" to directory of path "/one/one/four"
// const dir = fs.moveItemTo("file1", "/one/one/four")

// open that directory
// fs.openDirectory(dir.path)

// // Name of parent of item named "one" within directory named "one"
// console.log(fs.findItem("one", fs.findItem("one")).parent.name)

// // Path of all items named "one"
// console.log(fs.findAllItems("one").map((item) => item.path))

// // Array of all non-empty directory names
// console.log(
//   fs
//     .findAllItems((item) => item instanceof Directory && item.content.length)
//     .map((item) => item.name)
// )

// // Path to current directory and list of contents (labeled directory [D] or file [F])
// fs.printCurrentDirectory()
