// import Image from 'next/image'
import styles from './page.module.css'
import Link from "next/link"

 export default function Home() {
  return (
    <section className={styles.homepage}>
      <div className="container px-4 sm:px-6 m-auto ml-4">
        <div className="grid gap-6 sm:grid-cols-[1fr,1fr] lg:grid-cols-[1fr,400px] xl:grid-cols-[1fr,600px]">
          {/* <img
            alt=""
            className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
            height="550"
            src="/placeholder.svg"
            width="550"
          /> */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter">
                Welcome to Sub<span style={{color:'#0367fd'}}>Hire</span>.
              </h1>
              <p className="max-w-[600px] text-gray-500 text-lg sm:text-xl md:text-2xl lg:text-xl dark:text-gray-400">
                The AI-powered platform helping you find and hire only the best subcontracters.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 min-[300px] md:min-[400px] gap-4">
              {/* <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 sm:px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Coming Soon 
              </Link> */}
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-6 sm:px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="sms:+16089091331"
              >
                Coming Soon
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
