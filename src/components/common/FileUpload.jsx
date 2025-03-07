// File Upload
<div>
<div id="hs-file-upload-to-destroy" data-hs-file-upload='{
  "url": "/upload",
  "extensions": {
    "default": {
      "class": "shrink-0 size-5"
    },
    "xls": {
      "class": "shrink-0 size-5"
    },
    "zip": {
      "class": "shrink-0 size-5"
    },
    "csv": {
      "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4\"/><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/><path d=\"m5 12-3 3 3 3\"/><path d=\"m9 18 3-3-3-3\"/></svg>",
      "class": "shrink-0 size-5"
    }
  }
}'>
  <template data-hs-file-upload-preview="">
    <div className="p-3 bg-white border border-solid border-gray-300 rounded-xl">
      <div className="mb-1 flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <span className="size-10 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg" data-hs-file-upload-file-icon="">
            <img className="rounded-lg hidden" data-dz-thumbnail="" />
          </span>
          <div>
            <p className="text-sm font-medium text-gray-800">
              <span className="truncate inline-block max-w-75 align-bottom" data-hs-file-upload-file-name=""></span>.<span data-hs-file-upload-file-ext=""></span>
            </p>
            <p className="text-xs text-gray-500" data-hs-file-upload-file-size=""></p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800" data-hs-file-upload-remove="">
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" x2="10" y1="11" y2="17"></line>
              <line x1="14" x2="14" y1="11" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-x-3 whitespace-nowrap">
        <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" data-hs-file-upload-progress-bar="">
          <div className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition-all duration-500 hs-file-upload-complete:bg-green-500" style="width: 0" data-hs-file-upload-progress-bar-pane=""></div>
        </div>
        <div className="w-10 text-end">
          <span className="text-sm text-gray-800">
            <span data-hs-file-upload-progress-bar-value="">0</span>%
          </span>
        </div>
      </div>
    </div>
  </template>

  <div className="cursor-pointer p-12 flex justify-center bg-white border border-dashed border-gray-300 rounded-xl" data-hs-file-upload-trigger="">
    <div className="text-center">
      <span className="inline-flex justify-center items-center size-16 bg-gray-100 text-gray-800 rounded-full">
        <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" x2="12" y1="3" y2="15"></line>
        </svg>
      </span>

      <div className="mt-4 flex flex-wrap justify-center text-sm/6 text-gray-600">
        <span className="pe-1 font-medium text-gray-800">
          Drop your file here or
        </span>
        <span className="bg-white font-semibold text-blue-600 hover:text-blue-700 rounded-lg decoration-2 hover:underline focus-within:outline-hidden focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2">browse</span>
      </div>

      <p className="mt-1 text-xs text-gray-400">
        Pick a file up to 2MB.
      </p>
    </div>
  </div>

  <div className="mt-4 space-y-2 empty:mt-0" data-hs-file-upload-previews=""></div>
</div>

<div className="flex flex-wrap gap-2 mt-4">
  <button type="button" id="hs-destroy-file-upload" className="py-1 px-2 inline-flex items-center gap-x-1 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"></path>
      <path d="m6 6 12 12"></path>
    </svg>
    Destroy file upload
  </button>
  <button type="button" id="hs-auto-init-file-upload" className="py-1 px-2 inline-flex items-center gap-x-1 text-sm rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none" disabled="">
    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
      <path d="M3 3v5h5"></path>
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
      <path d="M16 16h5v5"></path>
    </svg>
    Reinitialize file upload
  </button>
</div>
</div>

