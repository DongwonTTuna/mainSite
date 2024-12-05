import PageSP from '@pages/top/PageSP'
import PagePC from '@pages/top/PagePC'
import checkDevice from '@lib/app/check-device'

export default async function Home() {
  const isMobile = await checkDevice()

  return <>{isMobile ? <PageSP /> : <PagePC />}</>
}
