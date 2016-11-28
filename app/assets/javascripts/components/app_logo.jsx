class AppLogo extends React.Component {
  render() {
    return(
      <svg width="220px" height="220px" viewBox="0 0 220 220">
          <title>Group 2</title>
          <desc>Created with Sketch.</desc>
          <defs>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
                  <stop stop-color="#FFFFFF" offset="0%"></stop>
                  <stop stop-color="#F3F2F2" offset="100%"></stop>
              </linearGradient>
              <linearGradient x1="50%" y1="100%" x2="50%" y2="3.061617e-15%" id="linearGradient-2">
                  <stop stop-color="#3494E6" offset="0%"></stop>
                  <stop stop-color="#EC6EAD" offset="100%"></stop>
              </linearGradient>
              <path d="M207.040365,103.520182 C207.040365,160.693021 160.693021,207.040365 103.520182,207.040365 C46.3473433,207.040365 5.68434189e-13,160.693021 5.68434189e-13,103.520182 C5.68434189e-13,46.3473433 46.3473433,2.99849034e-12 103.520182,2.99849034e-12 C160.693021,2.99849034e-12 207.040365,46.3473433 207.040365,103.520182" id="path-3"></path>
              <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-4">
                  <feMorphology radius="4" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                  <feOffset dx="0" dy="1" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                  <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                  <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
                  <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.287307518 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
              </filter>
              <linearGradient x1="50%" y1="100%" x2="50%" y2="23.3797034%" id="linearGradient-5">
                  <stop stop-color="#3494E6" offset="0%"></stop>
                  <stop stop-color="#EC6EAD" offset="100%"></stop>
              </linearGradient>
              <path d="M92.5358002,94.5106905 L92.5358002,69.1215045 L63.6394563,47.9666561 L63.6394563,164.258446 L64.6182035,164.258446 L92.5358002,143.213058 L92.5358002,118.23084 L92.5358002,94.5106905 Z M108.382182,134.851037 L137.238444,168.008165 L137.461226,110.635041 L108.382182,134.851037 Z M109.314322,43.2748303 L137.278526,65.6281291 L137.278526,97.8337942 L136.511375,97.8337942 L109.314322,76.7958907 L109.314322,43.2748303 Z" id="path-6"></path>
              <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-7">
                  <feGaussianBlur stdDeviation="0.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur>
                  <feOffset dx="0" dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                  <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
                  <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.10583673 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
              </filter>
          </defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Group" transform="translate(-211.000000, -6.000000)">
                  <g id="Page-1" transform="translate(322.372601, 115.191517) rotate(-12.000000) translate(-322.372601, -115.191517) translate(216.872601, 10.691517)">
                      <g id="Group-2" transform="translate(0.000000, -0.000000)">
                          <g id="Fill-1">
                              <use fill="black" fill-opacity="1" filter="url(#filter-4)" ></use>
                              <use stroke="url(#linearGradient-2)" stroke-width="8" fill="url(#linearGradient-1)" fill-rule="evenodd"></use>
                          </g>
                          <g id="Combined-Shape">
                              <use fill="url(#linearGradient-5)" fill-rule="evenodd"></use>
                              <use fill="black" fill-opacity="1" filter="url(#filter-7)" ></use>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
      </svg>
    )
  }
}
