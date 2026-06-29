import Image from 'next/image'

export const metadata = { title: 'Who We Are | Gone Offline' }

const paragraphs = [
  {
    text: 'After being stuck in one of the worst lockdowns in the world, we now make the most of our free time, whether it\'s packing up the Raptor and driving 4 hours to escape the city or simply finding new experiences to try and supporting local businesses.',
    image: '/images/about/zoe-and-les-on-the-road.jpg',
    imageAlt: 'Zoe and Les on the road',
    imageLeft: false,
  },
  {
    text: 'The Raptor is Les\' baby and it has gotten us to some incredible destinations in Australia! If he\'s not exploring the outdoors, then he\'s being an Italian chef at home cooking up delicious pasta recipes, following the F1 or watching his favourite ghost hunters and fishing YouTube channels.',
    image: '/images/about/Les.jpg',
    imageAlt: 'Les',
    imageLeft: true,
  },
  {
    text: 'Zoe is a true Pisces and constantly looking for the next escape from reality. She hates sitting still and is probably picturing her life in a different city or across the world at any given moment. She\'s the type to cry over mountain views, tiny cat paws and movies like Past Lives or 500 Days of Summer.',
    image: '/images/about/Zoe.jpg',
    imageAlt: 'Zoe',
    imageLeft: false,
  },
]

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Page header */}
      <header className="max-w-4xl mx-auto px-4 md:px-6 mb-20">
        <h1 className="font-display text-5xl md:text-6xl font-light italic">
          Who we are
        </h1>
      </header>

      {/* Alternating text / image blocks */}
      <div className="space-y-24 md:space-y-32">
        {paragraphs.map((block, i) => (
          <div
            key={i}
            className={`max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 md:gap-20 items-center ${
              block.imageLeft ? '' : 'md:[&>*:first-child]:order-last'
            }`}
          >
            <div className="relative aspect-[4/5] bg-ink/5 overflow-hidden">
              <Image
                src={block.image}
                alt={block.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="font-body text-lg md:text-xl text-ink/70 leading-relaxed">
              {block.text}
            </p>
          </div>
        ))}
      </div>

      {/* Closing travel highlights */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 mt-24 md:mt-32 border-t border-ink/8 pt-16">
        <p className="font-body text-lg md:text-xl text-ink/70 leading-relaxed">
          Our top travel moments are spending a week on a motorbike riding through the Ha Giang Loop
          in northern Vietnam, hiking the incredible Italian Dolomites and a five day snowboarding
          stint in Banff!
        </p>
      </div>
    </div>
  )
}
