import CSS from './_css/pc_page.module.css'
import MainTitlePC from './_component/MainTitlePC'
import DongwonTTunaImage from '@views/pages/top/_component/DongwonTTunaImage'

export default function PagePC() {
  return (
    <div className={CSS.dongwonttuna__detail}>
      <MainTitlePC />
      <DongwonTTunaImage isMobile={false} className={CSS.main__image} />
    </div>
  )
}
