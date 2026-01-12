"use client"

import { useMemo, useState, useEffect } from "react"
import Image from "next/image"
// Import data directly instead of fetching from an API
import rawData from "../data/contributors.json" 

interface Contributor {
  username: string
  home: string
  avatarUrl: string
  openPRsNumber: number
  openPRsLink: string
  mergedPRsNumber: number
  mergedPRsLink: string
  issuesNumber: number
  issuesLink: string
}

export default function LeaderboardPage() {
  // Initialize directly with data - no loading state needed!
  const [contributors, setContributors] = useState<Contributor[]>([])

  useEffect(() => {
    // Process the imported JSON directly
    const contributorsList = Object.entries(rawData).map(([username, info]: [string, any]) => ({
      username,
      ...info,
    }))
    setContributors(contributorsList)
  }, [])

  const sortedContributors = useMemo(() => {
    return [...contributors].sort((a, b) => {
      if (a.mergedPRsNumber !== b.mergedPRsNumber) return b.mergedPRsNumber - a.mergedPRsNumber
      if (a.openPRsNumber !== b.openPRsNumber) return b.openPRsNumber - a.openPRsNumber
      if (a.issuesNumber !== b.issuesNumber) return b.issuesNumber - a.issuesNumber
      return a.username.localeCompare(b.username)
    })
  }, [contributors])

  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8 border-b border-border pb-8">
          <h1 className="text-5xl font-light text-foreground">Contributors</h1>
          <div className="text-sm text-muted-foreground">
            Total Contributors: <span className="font-medium text-foreground">{sortedContributors.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-semibold text-foreground">Username</th>
                <th className="text-left py-4 px-4 font-semibold text-blue-600">Open PRs</th>
                <th className="text-left py-4 px-4 font-semibold text-blue-600">Merged PRs</th>
                <th className="text-left py-4 px-4 font-semibold text-blue-600">Issues</th>
              </tr>
            </thead>
            <tbody>
              {sortedContributors.map((contributor) => (
                <tr key={contributor.username} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4">
                    <a href={contributor.home} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:underline text-foreground font-medium">
                      <div className="relative w-8 h-8 flex-shrink-0">
                        <Image
                          src={contributor.avatarUrl || "/placeholder.svg"}
                          alt={contributor.username}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      {contributor.username}
                    </a>
                  </td>
                  <td className="py-4 px-4">
                    <a href={contributor.openPRsLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors">
                      {contributor.openPRsNumber}
                    </a>
                  </td>
                  <td className="py-4 px-4">
                    <a href={contributor.mergedPRsLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors">
                      {contributor.mergedPRsNumber}
                    </a>
                  </td>
                  <td className="py-4 px-4">
                    <a href={contributor.issuesLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors">
                      {contributor.issuesNumber}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}