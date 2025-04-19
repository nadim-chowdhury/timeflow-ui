"use client";

import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import Link from "next/link";
import { TimeAwareGreeting } from "@repo/ui/TimeAwareGreeting";
import { WeatherMoodHero } from "@repo/ui/WeatherMoodHero";
import { ScrollProgressTracker } from "@repo/ui/ScrollProgressTracker";
import { ActiveDeviceBanner } from "@repo/ui/ActiveDeviceBanner";
import { VoiceAssistantHint } from "@repo/ui/VoiceAssistantHint";
import { IdleContextSwap } from "@repo/ui/IdleContextSwap";
import { AmbientFocusBackground } from "@repo/ui/AmbientFocusBackground";
import { DynamicCTA } from "@repo/ui/DynamicCTA";
import { ProductivityTimer } from "@repo/ui/ProductivityTimer";
import { MultisenseLoader } from "@repo/ui/MultisenseLoader";
import { LastVisitMemory } from "@repo/ui/LastVisitMemory";
import { InteractiveAvatar } from "@repo/ui/InteractiveAvatar";
import { MicroFeedbackButtons } from "@repo/ui/MicroFeedbackButtons";
import { PredictiveInput } from "@repo/ui/PredictiveInput";
import { LocalEventsWidget } from "@repo/ui/LocalEventsWidget";
import { SmartThemeSwitcher } from "@repo/ui/SmartThemeSwitcher";
import { ConversationAvatar } from "@repo/ui/ConversationAvatar";
import { AIImageEnhancer } from "@repo/ui/AIImageEnhancer";
import { AutoSummarizerCard } from "@repo/ui/AutoSummarizerCard";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = ({ srcLight, srcDark, ...rest }: Props) => {
  return (
    <>
      <Image {...rest} src={srcLight} className="block dark:hidden" />
      <Image {...rest} src={srcDark} className="hidden dark:block" />
    </>
  );
};

export default function Home() {
  const exampleArticle = `
React is a JavaScript library for building user interfaces. Developed by Facebook, it introduces a component-based approach where UI elements are built as reusable units...
`;

  return (
    <main className="min-h-screen px-6 py-12 bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-zinc-900 dark:to-zinc-800 transition-colors">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <div className="flex justify-center">
          <ThemeImage
            srcLight="/timeflow-logo-light.svg"
            srcDark="/timeflow-logo-dark.svg"
            alt="TimeFlow Logo"
            width={220}
            height={50}
            priority
          />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Adaptive UI Components for the Future
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          TimeFlow UI is a real-time, context-aware component library designed
          for dynamic user experiences. It adapts to your user&apos;s time,
          device, and focus — automatically.
        </p>

        <div className="flex justify-center">
          <TimeAwareGreeting className="text-2xl font-medium" />
        </div>

        <div>
          <WeatherMoodHero />
          <div className="py-10 text-center">
            <p className="text-xl font-semibold">
              Enjoy personalized UI vibes ☁️
            </p>
          </div>
        </div>

        <div className="relative">
          <ScrollProgressTracker
            milestones={["Intro", "Core", "Features", "Pricing"]}
            motivate
          />
        </div>

        <ActiveDeviceBanner />

        <VoiceAssistantHint />

        <IdleContextSwap>
          <main className="min-h-screen p-8 bg-white dark:bg-black transition-colors duration-500">
            <h1 className="text-4xl font-bold">Productivity Dashboard</h1>
            {/* your interactive app */}
          </main>
        </IdleContextSwap>

        <AmbientFocusBackground>
          <main className="p-12 text-center text-black dark:text-white">
            <h1 className="text-4xl font-bold">Welcome to Flow Mode</h1>
            <p className="mt-4 text-lg">
              This is your calm productivity space 🌱
            </p>
          </main>
        </AmbientFocusBackground>

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-200">
          <LocalEventsWidget />
        </div>

        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-100">
          <h1 className="text-3xl font-bold mb-4">Welcome to Chill Beans ☕</h1>
          <DynamicCTA />
        </div>

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-indigo-200">
          <ProductivityTimer />
        </div>

        <MultisenseLoader />
        <div className="p-10 space-y-10">
          <h1 className="text-3xl font-bold">Adaptive Loading Demo</h1>
          <p>
            Scroll or stay idle to see it change mood. Network speed is also
            detected.
          </p>
          <div className="h-[200vh]"></div>
        </div>

        <LastVisitMemory currentSection="Dashboard Overview" />

        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold">Good day!</h1>
          <InteractiveAvatar />
        </div>

        <div className="my-10">
          <h2 className="text-lg font-semibold mb-3">Was this helpful?</h2>
          <MicroFeedbackButtons />
        </div>

        <div className="p-6 max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-4">🧠 AI Command Bar</h2>
          <PredictiveInput
            onSelect={(val) => {
              alert(`You selected: "${val}"`);
            }}
          />
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">🎨 Smart Theme</h3>
          <SmartThemeSwitcher />
        </div>

        <ConversationAvatar />

        <div className="min-h-screen bg-gray-50 dark:bg-black p-10">
          <AIImageEnhancer />
        </div>

        <AutoSummarizerCard content={exampleArticle} />

        <div className="p-6 space-y-4">
          <p>
            This is your{" "}
            <ContextualTooltipAI
              targetText="Access Token"
              context="API authentication token"
              mode="click"
            />
            .
          </p>
          <p>
            Choose a{" "}
            <ContextualTooltipAI
              targetText="Pricing Plan"
              context="subscription tier for SaaS platform"
              mode="hover"
            />{" "}
            that fits your needs.
          </p>
        </div>

        <div className="p-10 min-h-screen bg-gray-50 dark:bg-black">
          <FormFillerAI />
        </div>

        <AdaptiveHeroText />

        <SmartModalResponder />

        {/* <VoiceCommandHandler /> */}

        <AIAssistedOnboarding />

        <Smart404 />

        <AIContentBlock type="hero" />
        <AIContentBlock type="testimonial" />

        <AIKeyboardNavigator />

        <UXSentimentTracker />

        <AIFormValidator />

        <PersonaShifterProvider email="design@studio.com">
          <SmartGreeting />
          <CTA />
        </PersonaShifterProvider>

        <SmartPlaylistBuilder />

        <div className="flex justify-center gap-4">
          <Link href="/docs">
            <Button appName="docs">Explore Docs</Button>
          </Link>
          <a
            href="https://vercel.com/new/clone?template-url=https%3A%2F%2Fgithub.com%2Fyourhandle%2Ftimeflow-ui"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" appName="docs">
              Deploy on Vercel
            </Button>
          </a>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 pt-10">
          Edit{" "}
          <code className="bg-gray-200 dark:bg-zinc-700 px-2 py-1 rounded">
            apps/docs/app/page.tsx
          </code>{" "}
          to customize this page.
        </div>
      </div>
    </main>
  );
}
