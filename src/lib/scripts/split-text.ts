const createSpan = (text: string, className: string) => {
  const span = document.createElement('span')
  span.className = className
  if (text === ' ') {
    span.innerHTML = '&nbsp;'
    span.className = `${className} space`
  } else {
    span.textContent = text
  }
  return span
}

export const splitText = ({
  elements,
  className = 'split-text',
  visibleCharClassName = 'split-text__visible',
  invisibleCharClassName = 'split-text__invisible',
  charContainerClassName = 'split-text__char-container',
  isWord = false,
}: {
  elements: NodeListOf<HTMLElement>,
  className?: string,
  visibleCharClassName?: string,
  invisibleCharClassName?: string,
  charContainerClassName?: string,
  isWord?: boolean,
}) => {
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i]
    const text = element.textContent
    element.classList.add(className)
    let chars = (text ?? '').split(isWord ? /\s+/ : '')
    if (isWord) {
      chars = chars.map(word => [word, ' ']).flat();
    }
    const spans = chars.map((char) => {
      const visible = createSpan(char, visibleCharClassName)
      const invisible = createSpan(char, invisibleCharClassName)
      const charContainer = createSpan('', charContainerClassName)
      charContainer.appendChild(visible)
      charContainer.appendChild(invisible)
      return charContainer
    }).reduce((acc, container) => {
      acc.appendChild(container)
      return acc
    }, document.createDocumentFragment())
    element.textContent = ''
    element.appendChild(spans)
  }
}
