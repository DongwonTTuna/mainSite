import PageSP from '@views/pages/top/PageSP'
import PagePC from '@views/pages/top/PagePC'
import checkDevice from '@lib/app/check-device'
import LayoutSP from '@views/common/layout/with-nav/LayoutSP'
import LayoutPC from '@views/common/layout/with-nav/LayoutPC'

export default async function Home() {
  const isMobile = await checkDevice()

  return (
    <>
      {isMobile ? (
        <LayoutSP>
          <PageSP />
        </LayoutSP>
      ) : (
        <LayoutPC>
          <PagePC />
        </LayoutPC>
      )}
    </>
  )
}
