// import { getCommonVideos } from "@/lib/videos"
import { getYoutubeVideoById } from "@/lib/videos"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
  ) {
    const slug = params.slug // 'a', 'b', or 'c'
    const {searchParams} = request.nextUrl
    const sort = searchParams.get("sort")
    console.log("sort", sort)
    console.log("===> route: ", slug, process.env.YOUTUBE_API_KEY)

    const videoArray = await getYoutubeVideoById(slug, true);
	const video = videoArray[0];


    return NextResponse.json({message: video, slug, sort}, {status: 201})
  }