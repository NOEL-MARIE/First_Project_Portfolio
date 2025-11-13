export default function ContactSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 bg-neutral-950">
      <h2 className="mb-6 text-4xl font-bold">Contact</h2>
      <form className="flex flex-col w-full max-w-md gap-4">
        <input type="text" placeholder="Ton nom" className="p-3 border rounded bg-neutral-800 border-neutral-700 focus:outline-none" />
        <input type="email" placeholder="Ton email" className="p-3 border rounded bg-neutral-800 border-neutral-700 focus:outline-none" />
        <textarea placeholder="Ton message..." className="p-3 rounded bg-neutral-800 border border-neutral-700 focus:outline-none min-h-[150px]" />
        <button className="py-3 font-semibold transition rounded bg-HoverEffect hover:bg-white hover:text-black">
          Envoyer
        </button>
      </form>
    </div>
  )
}
