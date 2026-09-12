type Kind = 'target' | 'play' | 'asset' | 'person' | 'work' | 'team';
const drawings: Record<Kind, React.ReactNode> = {
  target: <><circle cx="35" cy="38" r="23"/><circle cx="35" cy="38" r="14"/><circle cx="35" cy="38" r="4" fill="currentColor" stroke="none"/><path d="m35 38 27-27m-1 1-10 1 1 10m9-11 2-7 8 8-7 2"/></>,
  play: <><rect x="9" y="15" width="62" height="48" rx="5"/><path d="m33 29 18 10-18 11Z" fill="currentColor" stroke="none"/><path d="M18 56h31m7 0h6"/><circle cx="67" cy="12" r="7" fill="var(--uj-gold)" stroke="none"/></>,
  asset: <><rect x="20" y="24" width="46" height="39" rx="4"/><path d="m39 34 14 9-14 8Z"/><path d="M12 53V18a4 4 0 0 1 4-4h40M6 44V10a4 4 0 0 1 4-4h34"/><path d="m65 59 7 7m0-11v11H61"/></>,
  person: <><circle cx="39" cy="24" r="13"/><path d="M13 68v-9a26 26 0 0 1 52 0v9M30 36l9 12 9-12M39 48v20"/><path d="m60 14 4-7m1 15 8-2"/></>,
  work: <><rect x="8" y="24" width="63" height="40" rx="5"/><path d="M27 24V13h25v11M8 39c19 11 44 11 63 0"/><rect x="34" y="39" width="12" height="14" rx="2" fill="var(--uj-blue)"/><path d="m53 10 5-6m7 13 8-2"/></>,
  team: <><circle cx="40" cy="19" r="10"/><circle cx="16" cy="31" r="8"/><circle cx="64" cy="31" r="8"/><path d="M25 54v-9a15 15 0 0 1 30 0v9M4 63V51a12 12 0 0 1 21-8m30 0a12 12 0 0 1 21 8v12M16 57l13 10h22l13-10"/><path d="M33 45h14"/></>,
};
export default function ConceptIcon({kind}:{kind:Kind}) {
  return <svg className="uj-concept-icon" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{drawings[kind]}</svg>;
}
