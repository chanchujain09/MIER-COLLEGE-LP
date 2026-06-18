/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Program {
  id: string;
  name: string;
  level: 'Undergraduate' | 'Postgraduate' | 'Diploma';
  duration: string;
  eligibility: string;
  intake: number;
  description: string;
  prospects: string[];
  iconName: string;
  tags: string[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  programId: string;
  state: string;
  highestQualification: string;
  yearOfPassing: string;
  score: string;
  message: string;
  date: string;
  status: 'Pending Review' | 'Pre-Screened' | 'Assigned to Counselor' | 'Offer Issued';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Admissions' | 'Programs' | 'Scholarships' | 'Campus';
}

export interface Review {
  id: string;
  name: string;
  role: string;
  batch: string;
  text: string;
  rating: number;
  image: string;
}

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  stat: string;
  iconName: string;
}
