export const config = {
  svgs: []
}

export const composeIconList = (app) => {
  const svgDir = import.meta.glob('@/icons/**/*.svg')
  for (const svg in svgDir) {
    const svgName = svg
      .split('/')
      .pop()
      .replace(/\.svg$/, '')
    if (svgName.indexOf(' ') !== -1) {
      console.error(`svg ${svgName}.svg includes whitespace`)
      continue
    }
    config.svgs.push({
      key: svgName,
      label: svgName
    })
  }
}
