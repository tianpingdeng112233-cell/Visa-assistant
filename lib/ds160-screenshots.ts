/**
 * Maps each DS-160 app step (1-12) to the corresponding screenshot file(s).
 * Screenshots are stored at: public/screesnshots/ds160/
 * (Note: "screesnshots" is the actual folder name with typo)
 */
export const ds160Screenshots: Record<number, string[]> = {
  // Step 1: Personal Information 1 (name, DOB, sex, marital status)
  1: ['/screesnshots/ds160/step-03.png'],

  // Step 2: Personal Information 2 (nationality, residency)
  // Uses Getting Started + Application Info as context pages
  2: [
    '/screesnshots/ds160/step-01.png',
    '/screesnshots/ds160/step-02-01.png',
    '/screesnshots/ds160/step-02-02.png',
  ],

  // Step 3: Travel Information (purpose, dates, address in US, paying party)
  3: [
    '/screesnshots/ds160/step-04-01.png',
    '/screesnshots/ds160/step-04-02.png',
    '/screesnshots/ds160/step-05.png',
    '/screesnshots/ds160/step-06.png',
  ],

  // Step 4: Travel Companions + Previous U.S. Travel
  4: [
    '/screesnshots/ds160/step-07-01.png',
    '/screesnshots/ds160/step-07-02.png',
  ],

  // Step 5: Address, Phone & Social Media
  5: [
    '/screesnshots/ds160/step-08.png',
    '/screesnshots/ds160/step-09.png',
  ],

  // Step 6: Passport Information
  6: ['/screesnshots/ds160/step-10.png'],

  // Step 7: U.S. Point of Contact (empty + filled examples)
  7: [
    '/screesnshots/ds160/step-11.png',
    '/screesnshots/ds160/step-12.png',
  ],

  // Step 8: Family Information: Relatives (parents)
  8: ['/screesnshots/ds160/step-13.png'],

  // Step 9: Present Work / Education / Training
  9: ['/screesnshots/ds160/step-14.png'],

  // Step 10: Previous Work / Education / Training
  10: ['/screesnshots/ds160/step-15.png'],

  // Step 11: Additional Work / Education / Training
  11: ['/screesnshots/ds160/step-16.png'],

  // Step 12: Security & Background (Parts 1-5) + Photo + Sign & Submit
  12: [
    '/screesnshots/ds160/step-17.png',
    '/screesnshots/ds160/step-18.png',
    '/screesnshots/ds160/step-19.png',
    '/screesnshots/ds160/step-20.png',
    '/screesnshots/ds160/step-21.png',
    '/screesnshots/ds160/step-22.png',
    '/screesnshots/ds160/step-23.png',
    '/screesnshots/ds160/step-24.png',
    '/screesnshots/ds160/step-25.png',
  ],
}
