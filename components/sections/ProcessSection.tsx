export function ProcessSection() {
  return (
    <section
      id="process"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--background-secondary)]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Implementation Process
          </h2>
          <p className="text-lg text-gray-400">
            Three steps. Each step reduces a specific risk to your business.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Step 1 */}
          <div className="border border-zinc-800 rounded-lg p-4 sm:p-6 md:p-8 bg-zinc-950">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--primary)] text-[var(--background)] flex items-center justify-center text-lg sm:text-xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                  Audit and fixed-scope plan
                </h3>
                
                <div className="space-y-4 text-gray-400">
                  <div>
                    <p className="font-medium text-white mb-1">What happens:</p>
                    <p>We document your current workflow, identify automation opportunities, and write a specification with defined deliverables and timeline.</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-white mb-1">What you get:</p>
                    <p>Written plan with scope, timeline, and cost. No surprises.</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-white mb-1">Risk reduced:</p>
                    <p>Scope creep and budget overruns.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="border border-zinc-800 rounded-lg p-4 sm:p-6 md:p-8 bg-zinc-950">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--primary)] text-[var(--background)] flex items-center justify-center text-lg sm:text-xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                  Build with weekly checkpoints
                </h3>
                
                <div className="space-y-4 text-gray-400">
                  <div>
                    <p className="font-medium text-white mb-1">What happens:</p>
                    <p>We build the system in stages. You review progress every week and confirm each stage before we proceed.</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-white mb-1">What you get:</p>
                    <p>Visibility into development. Authority to stop or redirect if something is wrong.</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-white mb-1">Risk reduced:</p>
                    <p>Building the wrong thing. Discovering problems too late.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="border border-zinc-800 rounded-lg p-4 sm:p-6 md:p-8 bg-zinc-950">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--primary)] text-[var(--background)] flex items-center justify-center text-lg sm:text-xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                  Deploy with support period
                </h3>
                
                <div className="space-y-4 text-gray-400">
                  <div>
                    <p className="font-medium text-white mb-1">What happens:</p>
                    <p>We deploy to production, train your team, and provide 30 days of monitoring and fixes.</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-white mb-1">What you get:</p>
                    <p>Working system with trained team. Direct access to developers if issues appear.</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-white mb-1">Risk reduced:</p>
                    <p>System failure after launch. Team unable to operate the system.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
