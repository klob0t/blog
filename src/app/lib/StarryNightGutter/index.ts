import type { Root, Element, ElementContent, RootContent } from 'hast'

export function starryNightGutter(tree: Root) {
  const replacement: Array<RootContent> = []
  const search = /\r?\n|\r/g
  let index = -1
  let start = 0
  let startTextRemainder = ''
  let lineNumber = 0

  while (++index < tree.children.length) {
    const child = tree.children[index]

    if (child.type === 'text') {
      let textStart = 0
      let match = search.exec(child.value)

      while (match) {
        const line = tree.children.slice(start, index) as Array<ElementContent>

        if (startTextRemainder) {
          line.unshift({ type: 'text', value: startTextRemainder })
          startTextRemainder = ''
        }

        if (match.index > textStart) {
          line.push({
            type: 'text',
            value: child.value.slice(textStart, match.index)
          })
        }

        lineNumber += 1
        replacement.push(createLine(line, lineNumber), {
          type: 'text',
          value: match[0]
        })

        start = index + 1
        textStart = match.index + match[0].length
        match = search.exec(child.value)
      }

      if (start === index + 1) {
        startTextRemainder = child.value.slice(textStart)
      }
    }
  } // <-- The `while` loop ends here

  // This block of code is now OUTSIDE and AFTER the loop
  const line = tree.children.slice(start) as Array<ElementContent>

  if (startTextRemainder) {
    line.unshift({ type: 'text', value: startTextRemainder })
  }

  if (line.length > 0) {
    lineNumber += 1
    replacement.push(createLine(line, lineNumber))
  }

  // The assignment now happens only once, at the very end.
  tree.children = replacement
}

function createLine(children: Array<ElementContent>, line: number): Element {
  return {
    type: 'element',
    tagName: 'span',
    properties: {
      className: ['line'],
      dataLineNumber: String(line)
    },
    children
  }
}