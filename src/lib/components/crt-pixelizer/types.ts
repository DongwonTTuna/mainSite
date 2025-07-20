export interface CRTPixelizerProps {
  /**
   * Size of each pixel block (1-20)
   * @default 4
   */
  pixelSize?: number

  /**
   * Opacity of the pixel grid lines (0-1)
   * @default 0.3
   */
  gridOpacity?: number

  /**
   * Intensity of scanline effect (0-1)
   * @default 0.5
   */
  scanlineIntensity?: number

  /**
   * Amount of color separation/bleeding in pixels (0-5)
   * @default 2
   */
  colorBleedAmount?: number

  /**
   * Enable CRT screen curvature effect
   * @default true
   */
  enableCurvature?: boolean

  /**
   * Enable all animations (scanlines, flicker)
   * @default true
   */
  enableAnimation?: boolean

  /**
   * Intensity of screen flicker (0-1)
   * @default 0.03
   */
  flickerIntensity?: number

  /**
   * Speed of scanline animation in seconds
   * @default 8
   */
  scanlineSpeed?: number
}