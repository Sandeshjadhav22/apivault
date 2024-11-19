import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

const Work = () => {
  return (
    <div> 
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How It Works
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Sign Up</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Create your account and set up your secure vault.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Store Your Keys</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Add your API keys to your vault using our simple interface.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Access Anywhere</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Retrieve your keys securely from any machine or environment.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Secure Your API Keys?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Join thousands of developers who trust APIKeyVault for their
                API key management.
              </p>
            </div>
            <Button className="inline-flex items-center">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      </div>
  )
}

export default Work