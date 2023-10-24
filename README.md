# Threaded Chat

## Installation

+ Ensure `node` and `npm` are installed on your machine correctly
+ Clone the repo, `cd` into it
+ Run `npm install` and `npm run dev`
+ Visit the localhost specified in the output

## Assumptions

>> This assignment can be built assuming that you are messaging yourself.

Given the above, I did not implement the ability to create new conversations/channels, as that would typically require being able to specify additional recipients besides yourself. Instead, I provided hardcoded objects that are initialised at startup.

## Rationale

I realized this spec revolved around 3 hierarchical entities:

`conversations > messages > threads`

This seemed like a natural fit for an SPA with client-side routing and "nested routes", each with dynamic segments allowing for specification of individual conversation/message records to retrieve data for. I also prioritized getting out of my comfort zone, as I typically work with `Ember.js`. After experimenting with a framework (`NextJS`), I encountered a large number of bugs with new `App Router`, which made fulfilling my routing needs difficult. I decided it was too complex for my simple use case (a more classic 'SPA' vs a robust full-stack 'PESPA' solution), and instead moved on to:

+ Vite: Low overhead, high performance way to start a FE web app with a template and develop with high speed (hot reloading, etc). I used https://github.com/RoyRao2333/template-vite-react-ts-tailwind, which includes

  + TypeScript: JS with type declaration and subsequent safety. Cuts down on bugs and improves code comprehensibility, as you are able to quickly understand and define the shape of data objects that will be read/manipulated/returned by functions.

  + React: Library that splits app code into Components that can effectively manage state through a well defined API,also handling the re-rendering of dependent UI on an as-needed basis.

  + Tailwind.css: Collection of composable utility classes that allow for significant styling control within html syntax, typically eliminating the need for many stylesheets and the potential selector collisions that can result. This encourages development with a constrained, well-proven set of styling patterns that let you focus on business logic or complex custom CSS (when the need arises).

+ React Router: Library for routing using React components. Enables the "nested routes" concept mentioned earlier, where each URL segment corresponds to progressively smaller chunks of UI that exist in relation to their parent. This gives us the benefit of connecting URLs to specific states in our JS app, making browser transitions much more user friendly.

## Features that I would have liked to implement but didn’t get around to doing it

+ Creating new conversations with new participants: I likely would have modeled a `User` entity with various related attributes and UI logic for determining which is the currently viewing user.

+ Clearing user inputs on submission (quite sad about missing this one).

+ Empty state for when you arrive at the root route; currently the conversation detail area is just blank until you select a conversation on the left.

+ A11y, at minimum having accessible text for interactive elements. Did not have time to test the current SR experience.

+ Responsive design for the thread view; the rest of the page resizes decently, but when the thread view is open we get a horizontal scrollbar. Would likely hide the regular conversation detail section at a specific breakpoint whilst the thread is open.

+ More comprehensive styling: currently it communicates state and content reasonably well, but could be a lot prettier.

Thanks for reviewing this!