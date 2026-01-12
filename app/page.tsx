"use client"

import { useMemo, useState, useEffect } from "react"
import Image from "next/image"

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

type SortField = "username" | "openPRs" | "mergedPRs" | "issues"

export default function LeaderboardPage() {
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [loading, setLoading] = useState(true)

  // Load contributors data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/contributors")
        const data = await response.json()
        const contributorsList = Object.entries(data).map(([username, info]: [string, any]) => ({
          username,
          ...info,
        }))
        setContributors(contributorsList)
      } catch (error) {
        console.error("Failed to load contributors:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const sortedContributors = useMemo(() => {
    const sorted = [...contributors].sort((a, b) => {
      // Primary sort: by merged PRs (descending)
      if (a.mergedPRsNumber !== b.mergedPRsNumber) {
        return b.mergedPRsNumber - a.mergedPRsNumber
      }
      // Secondary sort: by open PRs (descending)
      if (a.openPRsNumber !== b.openPRsNumber) {
        return b.openPRsNumber - a.openPRsNumber
      }
      // Tertiary sort: by issues (descending)
      if (a.issuesNumber !== b.issuesNumber) {
        return b.issuesNumber - a.issuesNumber
      }
      // Quaternary sort: by username (ascending)
      return a.username.localeCompare(b.username)
    })

    return sorted
  }, [contributors])

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-muted-foreground">Loading contributors...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 border-b border-border pb-8">
          <h1 className="text-5xl font-light text-foreground">Contributors</h1>
          <div className="text-sm text-muted-foreground">
            Last Updated: <span className="font-medium">just now</span>
          </div>
        </div>

        {/* Contributor Count */}
        <div className="mb-6 text-sm text-muted-foreground">
          Total Contributors: <span className="font-medium text-foreground">{sortedContributors.length}</span>
        </div>

        {/* Table */}
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
                    <a
                      href={contributor.home}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:underline text-foreground font-medium"
                    >
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
                    <a
                      href={contributor.openPRsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
                    >
                      {contributor.openPRsNumber}
                    </a>
                  </td>
                  <td className="py-4 px-4">
                    <a
                      href={contributor.mergedPRsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
                    >
                      {contributor.mergedPRsNumber}
                    </a>
                  </td>
                  <td className="py-4 px-4">
                    <a
                      href={contributor.issuesLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
                    >
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
