// Chat Bubbles 
<div>
    {/* Chat Bubble */}
<ul className="space-y-5">
  {/* Chat */}
  <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
    <img className="inline-block size-9 rounded-full" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80" alt="Avatar" />

    {/* Card */}
    <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
      <h2 className="font-medium text-gray-800">
        How can we help?
      </h2>
      <div className="space-y-1.5">
        <p className="mb-1.5 text-sm text-gray-800">
          You can ask questions like:
        </p>
        <ul className="list-disc list-outside space-y-1.5 ps-3.5">
          <li className="text-sm text-gray-800">
            What's Preline UI?
          </li>

          <li className="text-sm text-gray-800">
            How many Starter Pages & Examples are there?
          </li>

          <li className="text-sm text-gray-800">
            Is there a PRO version?
          </li>
        </ul>
      </div>
    </div>
    {/* End Card */}
  </li>
  {/* End Chat */}

  {/* Chat */}
  <li className="flex ms-auto gap-x-2 sm:gap-x-4">
    <div className="grow text-end space-y-3">
      {/* Card */}
      <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-2xs">
        <p className="text-sm text-white">
          what's preline ui?
        </p>
      </div>
      {/* End Card */}
    </div>

    <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600">
      <span className="text-sm font-medium text-white">AZ</span>
    </span>
  </li>
  {/* End Chat */}

  {/* Chat Bubble */}
  <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
    <img className="inline-block size-9 rounded-full" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80" alt="Avatar" />

    {/* Card */}
    <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
      <p className="text-sm text-gray-800">
        Preline UI is an open-source set of prebuilt UI components based on the utility-first Tailwind CSS framework.
      </p>
      <div className="space-y-1.5">
        <p className="text-sm text-gray-800">
          Here're some links to get started
        </p>
        <ul>
          <li>
            <a className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium" href="../docs/index.html">
              Installation Guide
            </a>
          </li>
          <li>
            <a className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium" href="../docs/frameworks.html">
              Framework Guides
            </a>
          </li>
        </ul>
      </div>
    </div>
    {/* End Card */}
  </li>
  {/* End Chat Bubble */}
</ul>
{/* End Chat Bubble */}
</div>