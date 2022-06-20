import { align, fontStyle, fontType, verticalAlign } from '../../type'

export const FONT_FAMILY: { value: fontType; label: string }[] = [
  { value: 'microsoft YaHei', label: '微软雅黑' },
  { value: 'fangsong', label: '仿宋' },
  { value: 'SimSun', label: '宋体' },
  { value: 'SimHei', label: '黑体' },
  { value: 'Microsoft JhengHei', label: '微软正⿊体' },
  { value: 'NSimSun', label: '新宋体' },
  { value: 'PMingLiU', label: '新细明体' },
  { value: 'MingLiU', label: '细明体' },
  { value: 'DFKai-SB', label: '标楷体' },
  { value: 'KaiTi', label: '楷体' },
  { value: 'FangSong_GB2312', label: '仿宋_GB2312' },
  { value: 'KaiTi_GB2312', label: '楷体_GB2312' }
]
export const FONT_STYLE: { value: fontStyle; label: string }[] = [
  {
    value: 'weight',
    label: require('../../../../assets/images/editor_bold_icn_dark.png')
  },
  {
    value: 'italic',
    label: require('../../../../assets/images/editor_italics_icn_dark.png')
  },
  {
    value: 'underline',
    label: require('../../../../assets/images/editor_underline_icn_dark.png')
  }
]
export const POSITION_ALIGN: { value: align; label: string }[] = [
  {
    value: 'left',
    label: require('../../../../assets/images/editor_titleleft_btn_dark.png')
  },
  {
    value: 'center',
    label: require('../../../../assets/images/editor_titlecentral_btn_dark.png')
  },
  {
    value: 'right',
    label: require('../../../../assets/images/editor_titleright_btn_dark.png')
  }
]
export const FONT_ALIGN: { value: align; label: string }[] = [
  {
    value: 'left',
    label: require('../../../../assets/images/editor_leftalign_btn_dark.png')
  },
  {
    value: 'center',
    label: require('../../../../assets/images/editor_centralalign_btn_dark.png')
  },
  {
    value: 'right',
    label: require('../../../../assets/images/editor_rightalign_btn_dark.png')
  },
  {
    value: 'justify',
    label: require('../../../../assets/images/editor_bothalign_btn_dark.png')
  }
]
export const FONT_VERTICAL_ALIGN: { value: verticalAlign; label: string }[] = [
  {
    value: 'end',
    label: require('../../../../assets/images/editor_bottomalign_btn_dark.png')
  },
  {
    value: 'center',
    label: require('../../../../assets/images/editor_verticalalign_btn_dark.png')
  },
  {
    value: 'start',
    label: require('../../../../assets/images/editor_topalign_btn_dark.png')
  }
]
