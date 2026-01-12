import contributorsData from "@/data/contributors.json"

export const dynamic = 'force-static'

export async function GET() {
  return Response.json(contributorsData)
}
