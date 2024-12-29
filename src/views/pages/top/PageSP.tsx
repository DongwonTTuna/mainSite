import CSS from './_css/sp_page.module.css'
import DongwonTTunaImage from '@views/pages/top/_component/DongwonTTunaImage'
import MainTitleSP from '@views/pages/top/_component/MainTitleSP'

export default function PageSP() {
  return (
    <div className={CSS.dongwonttuna__detail}>
      <MainTitleSP />
      <DongwonTTunaImage isMobile={true} className={CSS.main__image} />
    </div>
  )
}
