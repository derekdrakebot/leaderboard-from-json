import contributorsData from "@/data/contributors.json"

export async function GET() {
  return Response.json(contributorsData)
}
