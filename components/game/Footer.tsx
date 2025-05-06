interface FooterProps {
  version: string
}

export function Footer({ version }: FooterProps) {
  return (
    <footer className="mt-8 text-center text-xs text-zinc-500">
      <p>
        Data provided by Riot Games via Data Dragon API. This app is not endorsed by Riot Games and does not reflect the
        views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends.
      </p>
      <p className="mt-2">Version: {version || "Loading..."}</p>
    </footer>
  )
}
