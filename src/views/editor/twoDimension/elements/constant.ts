import { align, fontStyle, verticalAlign } from '../../type'

export const FONT_STYLE: { value: fontStyle; label: string }[] = [
  { value: 'weight', label: require('../../../../assets/images/editor_bold_icn_dark.png') },
  { value: 'italic', label: require('../../../../assets/images/editor_italics_icn_dark.png') },
  { value: 'underscore', label: require('../../../../assets/images/editor_underline_icn_dark.png') }
]
export const POSITION_ALIGN: { value: align; label: string }[] = [
  { value: 'left', label: require('../../../../assets/images/editor_titleleft_btn_dark.png') },
  { value: 'center', label: require('../../../../assets/images/editor_titlecentral_btn_dark.png') },
  { value: 'right', label: require('../../../../assets/images/editor_titleright_btn_dark.png') }
]
export const FONT_ALIGN: { value: align; label: string }[] = [
  { value: 'left', label: require('../../../../assets/images/editor_leftalign_btn_dark.png') },
  { value: 'center', label: require('../../../../assets/images/editor_centralalign_btn_dark.png') },
  { value: 'right', label: require('../../../../assets/images/editor_rightalign_btn_dark.png') },
  { value: 'justify', label: require('../../../../assets/images/editor_bothalign_btn_dark.png') }
]
export const FONT_VERTICAL_ALIGN: { value: verticalAlign; label: string }[] = [
  { value: 'top', label: require('../../../../assets/images/editor_bottomalign_btn_dark.png') },
  { value: 'center', label: require('../../../../assets/images/editor_verticalalign_btn_dark.png') },
  { value: 'bottom', label: require('../../../../assets/images/editor_topalign_btn_dark.png') }
]
