'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from 'lucide-react'

export function AltTextGenerator() {
  const [imageUrl, setImageUrl] = useState("")
  const [altText, setAltText] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function generateAltText(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setAltText("")

    try {
      const response = await fetch(
        `/api/generate-alt-text?imageUrl=${encodeURIComponent(imageUrl)}`
      )

      if (!response.ok) {
        throw new Error("Failed to generate alt text")
      }

      const data = await response.json()
      setAltText(data)
    } catch (err) {
      setError("Failed to generate alt text. Please check the image URL and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={generateAltText} className="flex gap-2">
        <Input
          type="url"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          className="flex-1 h-29"
          style={{ height: "3rem" }}
        />
        <Button type="submit" disabled={loading} style={{ height: "3rem", backgroundColor: "#7f2bff", width: "10rem" }}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {altText && (
        <div className="relative rounded-lg border p-4 bg-black">
          <button
            type="button"
            className="absolute top-2 right-2"
            onClick={() => {
              navigator.clipboard.writeText(altText);
              const alertElement = document.createElement("div")
              alertElement.classList.add("fixed", "bottom-4", "right-4", "bg-black", "p-2", "rounded", "text-white")
              alertElement.innerText = "Copied alt text to clipboard"
              document.body.appendChild(alertElement)
              setTimeout(() => {
                alertElement.remove()
              }, 2000);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </button>
          <pre className="font-mono text-white">{altText}</pre>
        </div>
      )}
    </div>
  )
}

