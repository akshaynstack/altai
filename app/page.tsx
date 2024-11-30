import { AltTextGenerator } from "@/components/alt-text-generator"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col mx-auto w-full">
      <main className="flex-1">
        <section className="py-8 md:py-12 lg:py-24 w-full">
          <div className="px-4">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                Alt Text Generator
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Enter an image URL below to see our AI in action.
              </p>
            </div>
            <div className="mx-auto max-w-[58rem] pt-8">
              <AltTextGenerator />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}