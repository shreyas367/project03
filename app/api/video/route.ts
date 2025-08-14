import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { transform } from "next/dist/build/swc/generated-native";
import { NextRequest, NextResponse } from "next/server";
import { describe } from "node:test";

export async function GET() {
  try {
    await connectToDatabase();
    const videos = await Video.find({})
      .sort({ createdAt: -1 })
      .lean();

    if(!videos || videos.length === 0){
        return NextResponse.json([],{status:200})

    }  

    return new Response(JSON.stringify(videos), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch videos" }), { status: 500 });
  }
}


export async function POST(request :NextRequest){

    try{
        const session=await getServerSession(authOptions);
        if(!session){
            return NextResponse.json(
                {
                    error:"unauthorized user from video route.ts"
                }
                ,
                {status:401}
            );

        }


        await connectToDatabase();
        const body:IVideo=await request.json()
        if(!body.title || !body.thumbnailUrl || !body.description){
            return NextResponse.json(
                {
                    error:"missing required field from video route.ts"
                }
                ,
                {status:400}
            );
        }
        const videoData={
            ...body,
            controls:body?.controls?? true,
            transformation:{
                height:1920,
                width:1080,
                quality:body.transformation?.quality ?? 100
            },
        };



        const newVideo= await Video.create(videoData)
        return NextResponse.json(newVideo)






    }
    catch(error){
        return NextResponse.json(
                {
                    error:"failed to  create new video(in video/route.ts)"
                }
                ,
                {status:500}
            );


    }

}

