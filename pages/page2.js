import './styles.css'
import Image from 'next/image'
const Resume = () => {
    return(
    <main className="font-mono flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
            <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-4 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <Image
                    src="/logo.png"
                    alt="logo-adobe-express"
                    className="dark:invert"
                    width={90}
                    height={24}
                    priority
                />
            </div>
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              <a
                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Software Engineering & Design</p>

                {/* By{' '} */}
                {/* <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  className="dark:invert"
                  width={100}
                  height={24}
                  priority
                /> */}
              </a>
            </div>
        </div>

        <div className="pt-12 pb-5 lg:pt-0 md:pb-0 lg:pt-0 relative flex place-items-center before:absolute before:h-[500px] before:w-[500px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
  <div>
  <div className="font-family-roboto">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />


    <title>Brandon Bell - Resume</title>


    <meta name="description" content="Laura Cooper - Resume" />


    <link rel="preconnect" href="" />
    <link
      rel="preconnect"
      href=""
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href=""
    />

    <link href="styles.css" rel="stylesheet" />
  </div>

  <div>
    <main class="bg-white-100 dark:bg-black text-black-600 dark:text-white-600 min-h-screen">
      <div class="py-12 lg:pt-20 px-6 mx-auto max-w-7xl">

        <h1><span class="font-bold text-black-700 dark:text-white-700">Brandon</span> Bell</h1>

        <div class="border-black-300 dark:invert my-12 lg:my-20 py-3 border-t-2 border-b-2">

          <h2 class = "dark:invert">Professional Title</h2>
        </div>

        <div class="grid-4">
          <div>
            <h3>Contact</h3>
            <div class="flex items-center gap-4">
 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 shrink-0"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>

    
              <p class="mb-0">
                <a
                  href="mailto:support@resumewind.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  support@resumewind.com
                </a>
              </p>
            </div>
            <div class="flex items-center gap-4 mt-3">
 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 shrink-0"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                />
              </svg>

          
              <p class="mb-0">
                <a
                  href="https://github.com/username"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/username
                </a>
              </p>
            </div>
            <div class="dark:invert flex items-center gap-4 mt-3">
     
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 shrink-0"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                />
              </svg>

  
              <p class="mb-0">
                <a
                  href="https://resumewind.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  resumewind.com
                </a>
              </p>
            </div>
          </div>
          <div class="grid-right">

            <h3>Profile</h3>
            <p class="mb-0 lg:mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              porttitor erat at neque cursus, at vulputate lacus dictum. Proin
              diam ex, hendrerit eget elementum eu, dictum et arcu. Fusce
              placerat lectus vitae lectus tincidunt finibus. Morbi eleifend
              ornare ex. Ut posuere imperdiet porta. Fusce nec tellus neque.
              Nullam vitae felis sit amet lorem mattis faucibus.
            </p>
          </div>
        </div>

        <hr class="border-black-300 dark:invert lg:my-20 border-t-2" />
        <div class="grid-4">
          <div class="order-last lg:order-first">
            <hr class="lg:hidden mb-12 border-t-2" />

 
            <h3>Skills</h3>


            <h4>Programming Languages</h4>
            <ul>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>Python</li>
              <li>PHP</li>
            </ul>

   
            <h4 class="mt-8">Libraries &amp; Frameworks</h4>
            <ul>
              <li>React.js</li>
              <li>Vue.js</li>
              <li>Next.js</li>
              <li>Gatsby.js</li>
            </ul>

            <hr class="border-black-300 dark:invert left-hr" />


            <h3>Education</h3>

  
            <h4>Enter Your Degree</h4>
            <p class="mb-1">Name Of University</p>
            <p>2004 - 2008</p>

            <hr class="border-black-300 dark:invert left-hr" />

  
            <h3>References</h3>

     
            <h4>Reference Name 1</h4>
            <p class="mb-1">Reference Title 1</p>
            <p>Contact Information 1</p>

   
            <h4 class="mt-8">Reference Name 2</h4>
            <p class="mb-1">Reference Title 2</p>
            <p>Contact Information 2</p>
          </div>

     
          <div class="grid-right">
            <h3>Work Experience</h3>

    
            <h4 class="title-dot">Your Job Title Goes Here</h4>
            <p>Company Name | 2020 - 2022</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a
              imperdiet urna. Praesent eu posuere magna, in suscipit quam. Here
              is an example of an
              <a href="https://resumewind.com/" target="_blank" rel="noreferrer"
                >external link</a
              >.
            </p>
            <p>
              Mauris ullamcorper neque in ultrices mollis. Sed justo eros,
              mollis sed odio id, finibus gravida enim. Aenean pharetra ante
              elit, sit amet accumsan felis suscipit vitae. Vestibulum ante
              ipsum primis.
            </p>
            <ul>
              <li>Cras in erat bibendum, rhoncus nisl ac, luctus tortor</li>
              <li>Vivamus volutpat nunc non quam dapibus</li>
              <li>Nulla molestie odio odio, ut congue dui</li>
            </ul>

    
            <h4 class="mt-16 title-dot">Your Job Title Goes Here</h4>
            <p>Company Name | 2020 - 2022</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a
              imperdiet urna. Praesent eu posuere magna, in suscipit quam. Here
              is an example of an
              <a href="https://resumewind.com/" target="_blank" rel="noreferrer"
                >external link</a
              >.
            </p>
            <p>
              Mauris ullamcorper neque in ultrices mollis. Sed justo eros,
              mollis sed odio id, finibus gravida enim. Aenean pharetra ante
              elit, sit amet accumsan felis suscipit vitae. Vestibulum ante
              ipsum primis.
            </p>
            <ul>
              <li>Cras in erat bibendum, rhoncus nisl ac, luctus tortor</li>
              <li>Vivamus volutpat nunc non quam dapibus</li>
              <li>Nulla molestie odio odio, ut congue dui</li>
            </ul>

            <h4 class="mt-16 title-dot">Your Job Title Goes Here</h4>
            <p>Company Name | 2020 - 2022</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a
              imperdiet urna. Praesent eu posuere magna, in suscipit quam. Here
              is an example of an
              <a href="https://resumewind.com/" target="_blank" rel="noreferrer"
                >external link</a
              >.
            </p>
            <p>
              Mauris ullamcorper neque in ultrices mollis. Sed justo eros,
              mollis sed odio id, finibus gravida enim. Aenean pharetra ante
              elit, sit amet accumsan felis suscipit vitae. Vestibulum ante
              ipsum primis.
            </p>
            <ul>
              <li>Cras in erat bibendum, rhoncus nisl ac, luctus tortor</li>
              <li>Vivamus volutpat nunc non quam dapibus</li>
              <li>Nulla molestie odio odio, ut congue dui</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
  </div>


      {/* <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      /> */}
    </div>

    <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">




    </div>
  </main>
  );
}

export default Resume;