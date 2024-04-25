export const staticPrimaryColor = '#787878' // A medium gray that reflects the brightness of #8C57FF
export const staticPrimaryDarkenColor = '#686868' // A slightly darker gray to reflect #7E4EE6

export const themes = {
  light: {
    dark: false,
    colors: {
      'primary': '#555555', // Mid-gray replacing the original primary color
      'on-primary': '#ffffff', // White text on primary color
      'primary-darken-1': '#444444', // Darker gray for primary-darken
      'secondary': '#6e6e6e', // Mid-light gray for secondary
      'secondary-darken-1': '#626262', // Darker shade of secondary
      'on-secondary': '#ffffff', // White text on secondary color
      'success': '#5e5e5e', // Success translated to a comparable gray
      'success-darken-1': '#505050', // Darker gray for success-darken
      'on-success': '#ffffff', // White on success
      'info': '#5b5b5b', // Info color as gray
      'info-darken-1': '#515151', // Darker shade for info
      'on-info': '#ffffff', // White text on info color
      'warning': '#717171', // Lighter gray for warning to reflect brightness
      'warning-darken-1': '#626262', // Darker gray for warning-darken
      'on-warning': '#ffffff', // White on warning
      'error': '#707070', // Gray equivalent for error
      'error-darken-1': '#616161', // Darker gray for error-darken
      'on-error': '#ffffff', // White on error
      'background': '#efefef', // Very light gray for background
      'on-background': '#2E263D', // Dark purple for text on background, providing contrast
      'surface': '#ffffff', // White for surfaces
      'on-surface': '#2E263D', // Dark text on light surface
      'grey-50': '#fafafa', // Lightest gray
      'grey-100': '#f5f5f5', 
      'grey-200': '#eeeeee',
      'grey-300': '#e0e0e0',
      'grey-400': '#bdbdbd',
      'grey-500': '#9e9e9e',
      'grey-600': '#757575',
      'grey-700': '#616161',
      'grey-800': '#424242',
      'grey-900': '#212121', // Darkest gray
      'perfect-scrollbar-thumb': '#dbdade', // Scrollbar thumb in light gray
      'skin-bordered-background': '#ffffff', // Bordered background in white
      'skin-bordered-surface': '#ffffff', // Bordered surface in white
      'expansion-panel-text-custom-bg': '#fafafa', // Custom background for expansion panels
      'track-bg': '#F0F2F8', // Track background in very light gray
      'chat-bg': '#F7F6FA', // Chat background in very light gray
    },
    
    variables: {
      'code-color': '#6e6e6e', // Gray for code highlighting
      'overlay-scrim-background': '#424242', // Dark gray as overlay scrim background
      'tooltip-background': '#333333', // Dark gray for tooltips for visibility
      'overlay-scrim-opacity': 0.5, // Maintaining original opacity for overlay scrim
      'hover-opacity': 0.04, // Hover effect opacity unchanged
      'focus-opacity': 0.1, // Focus effect opacity unchanged
      'selected-opacity': 0.08, // Selected item opacity unchanged
      'activated-opacity': 0.16, // Activated item opacity unchanged
      'pressed-opacity': 0.14, // Pressed item opacity unchanged
      'dragged-opacity': 0.1, // Dragged item opacity unchanged
      'disabled-opacity': 0.4, // Disabled item opacity unchanged
      'border-color': '#424242', // Border color in dark gray
      'border-opacity': 0.12, // Border opacity unchanged
      'table-header-color': '#e0e0e0', // Light gray for table headers
      'high-emphasis-opacity': 0.9, // High emphasis opacity unchanged
      'medium-emphasis-opacity': 0.7, // Medium emphasis opacity unchanged
    
      // 👉 shadows
      'shadow-key-umbra-color': '#424242', // Dark gray for key umbra shadows
      'shadow-xs-opacity': '0.16', // Extra small shadow opacity unchanged
      'shadow-sm-opacity': '0.18', // Small shadow opacity unchanged
      'shadow-md-opacity': '0.20', // Medium shadow opacity unchanged
      'shadow-lg-opacity': '0.22', // Large shadow opacity unchanged
      'shadow-xl-opacity': '0.24', // Extra large shadow opacity unchanged
    },
    
  },
  dark: {
    dark: true,
    colors: {
      'primary': staticPrimaryColor,
      'on-primary': '#fff',
      'primary-darken-1': '#7E4EE6',
      'secondary': '#8A8D93',
      'secondary-darken-1': '#7C7F84',
      'on-secondary': '#fff',
      'success': '#56CA00',
      'success-darken-1': '#4DB600',
      'on-success': '#fff',
      'info': '#16B1FF',
      'info-darken-1': '#149FE6',
      'on-info': '#fff',
      'warning': '#FFB400',
      'warning-darken-1': '#E6A200',
      'on-warning': '#fff',
      'error': '#FF4C51',
      'error-darken-1': '#E64449',
      'on-error': '#fff',
      'background': '#28243D',
      'on-background': '#E7E3FC',
      'surface': '#312d4b',
      'on-surface': '#E7E3FC',
      'grey-50': '#2A2E42',
      'grey-100': '#2F3349',
      'grey-200': '#4A5072',
      'grey-300': '#5E6692',
      'grey-400': '#7983BB',
      'grey-500': '#8692D0',
      'grey-600': '#AAB3DE',
      'grey-700': '#B6BEE3',
      'grey-800': '#CFD3EC',
      'grey-900': '#E7E9F6',
      'perfect-scrollbar-thumb': '#4a5072',
      'skin-bordered-background': '#312d4b',
      'skin-bordered-surface': '#312d4b',
      'expansion-panel-text-custom-bg': '#373350',
      'track-bg': '#474360',
      'chat-bg': '#373452',
    },
    variables: {
      'code-color': '#d400ff',
      'overlay-scrim-background': '#312D4B',
      'tooltip-background': '#F7F4FF',
      'overlay-scrim-opacity': 0.5,
      'hover-opacity': 0.04,
      'focus-opacity': 0.1,
      'selected-opacity': 0.08,
      'activated-opacity': 0.16,
      'pressed-opacity': 0.14,
      'disabled-opacity': 0.4,
      'dragged-opacity': 0.1,
      'border-color': '#E7E3FC',
      'border-opacity': 0.12,
      'table-header-color': '#3D3759',
      'high-emphasis-opacity': 0.9,
      'medium-emphasis-opacity': 0.7,

      // 👉 Shadows
      'shadow-key-umbra-color': '#131120',
      'shadow-xs-opacity': '0.20',
      'shadow-sm-opacity': '0.22',
      'shadow-md-opacity': '0.24',
      'shadow-lg-opacity': '0.26',
      'shadow-xl-opacity': '0.28',
    },
  },
}
export default themes
