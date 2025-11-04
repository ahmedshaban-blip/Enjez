import React from "react";

export default function AddService() {
  return (
    <div title="Create Service">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Service Details */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
            <h3 className="text-lg font-bold mb-4">Service Details</h3>
            <div className="flex flex-col gap-6">
              <label>
                <p className="pb-2 font-medium">Service Name</p>
                <input
                  placeholder="e.g. Deep Tissue Massage"
                  className="form-input w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 h-12"
                />
              </label>

              <label>
                <p className="pb-2 font-medium">Service Description</p>
                <textarea
                  placeholder="Add a detailed description for the service..."
                  className="form-input w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 min-h-36"
                ></textarea>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label>
                  <p className="pb-2 font-medium">Price</p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="99.00"
                      className="pl-8 form-input w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 h-12"
                    />
                  </div>
                </label>

                <label>
                  <p className="pb-2 font-medium">Duration</p>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="60"
                      className="pr-16 form-input w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 h-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      minutes
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Providers */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
            <h3 className="text-lg font-bold mb-4">Link Service Providers</h3>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                placeholder="Search by provider name or email..."
                className="pl-10 form-input w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 h-12"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Jane Doe", "John Smith"].map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-2 rounded-full bg-primary/10 dark:bg-primary/20 py-1 pl-3 pr-2 text-primary"
                >
                  <span className="text-sm font-medium">{name}</span>
                  <button className="rounded-full hover:bg-black/10 dark:hover:bg-white/20 p-0.5">
                    <span className="material-symbols-outlined !text-base">
                      close
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Status */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
            <h3 className="text-lg font-bold mb-4">Status</h3>
            <div className="flex items-center justify-between">
              <p className="font-medium">Service Status</p>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 dark:bg-gray-700 
                  after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full 
                  after:border after:border-gray-300 after:bg-white after:transition-all 
                  peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white">
                </div>
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Set the service to active to make it available for booking.
            </p>
          </div>

          {/* Category */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
            <h3 className="text-lg font-bold mb-4">Category</h3>
            <select className="form-select w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 h-12">
              <option>Massage Therapy</option>
              <option>Skincare</option>
              <option>Hair Styling</option>
              <option>Wellness</option>
            </select>
          </div>

          {/* Media */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
            <h3 className="text-lg font-bold mb-4">Images / Media</h3>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 text-center">
              <span className="material-symbols-outlined text-4xl text-gray-400">upload_file</span>
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-semibold text-primary">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              <input type="file" className="hidden" />
            </div>

            <div className="mt-4 flex items-center gap-4 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <img
                className="h-12 w-12 rounded-md object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcnX8A_Z-qBySoyw0WgyCmcDhMtA3qQRjGiYgJO_6zgURI3LhelPQ9q-Jh5VEZfvUR97G8omakgl_F6bMY6ydCqntMdzNWTKV543jiTDfotC-krS_WqaQGI6Sqp4nzASfgSmrsOASrh1aCuWrKFftBUc85dnw6os9O62sqEhAPtDedTDYbRaPBbpOz74p7uzrQJuITPIftnRRv-ph8xc1RO-abYgw0ogKpp32WSCylrG94tym8HXRebICTJeUOrRC_XnAtRvqpHN30"
                alt="Uploaded service preview"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">massage-therapy.jpg</p>
                <p className="text-xs text-gray-500">2.1 MB</p>
                <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="h-1.5 rounded-full bg-primary" style={{ width: "100%" }}></div>
                </div>
              </div>
              <button className="text-gray-500 hover:text-red-500 transition-colors">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
