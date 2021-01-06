declare module '*.png'
declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.gif' {
  const content: any
  export default content
}

declare module '*.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.mp3' {
  const content: any
  export default content
}
