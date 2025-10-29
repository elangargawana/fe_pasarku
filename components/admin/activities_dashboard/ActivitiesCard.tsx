// Backwards-compatible re-export: some imports reference `ActivitiesCard` while the
// component file was renamed to `ActivitiesCardDashboard`. Keep a thin re-export
// so both import paths work without touching many files or the dev server cache.

export { default } from "./ActivitiesCardDashboard";
