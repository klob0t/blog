import MainPage from "@/app/components/mainPage"
import BlogPostsList from "@/app/components/postsList/page"

export default async function Home() {
  return (
    <MainPage blogListComponent={<BlogPostsList />} />
  )
}