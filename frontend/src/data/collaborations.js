export const collaborations = [
  {
    id: 'COL-001',
    rndChallengeId: 'RND-008',
    project: 'Explainable Fraud Detection for Digital Payments',
    institution: 'IIT Bombay',
    industry: 'Apex Digital',
    status: 'In Progress',
    startDate: '2026-04-01',
    targetEndDate: '2027-01-15',
    members: [
      { name: 'Dr. Ramesh Chandra', role: 'Principal Investigator', org: 'IIT Bombay' },
      { name: 'Ishaan Chopra', role: 'Industry Lead', org: 'Apex Digital' },
      { name: 'Priyanka Rao', role: 'Research Assistant', org: 'IIT Bombay' },
    ],
    milestones: [
      { title: 'Anonymised transaction dataset access finalised', due: '2026-05-15', status: 'Completed' },
      { title: 'Model v1 with explainability layer', due: '2026-07-01', status: 'Completed' },
      { title: 'Pilot deployment on 5% of live traffic', due: '2026-09-30', status: 'In Progress' },
      { title: 'Final validation & report', due: '2026-12-15', status: 'Pending' },
    ],
    documents: [
      { name: 'Data Sharing Agreement.pdf', uploadedBy: 'Apex Digital', date: '2026-04-05' },
      { name: 'Fraud Model v1 Spec.docx', uploadedBy: 'Dr. Ramesh Chandra', date: '2026-07-02' },
      { name: 'Pilot Progress Report - Aug.pdf', uploadedBy: 'Ishaan Chopra', date: '2026-08-20' },
    ],
    tasks: [
      { title: 'Validate 500 additional flagged transactions', assignee: 'Priyanka Rao', status: 'In Progress' },
      { title: 'Fraud analyst review of edge cases', assignee: 'Dr. Ramesh Chandra', status: 'Open' },
    ],
    deliverables: ['Validated fraud detection model', 'Pilot deployment report', 'Joint publication draft'],
  },
  {
    id: 'COL-002',
    rndChallengeId: 'RND-001',
    project: 'Real-Time Collaborative Code Editor',
    institution: 'NIT Durgapur',
    industry: 'InnovateX',
    status: 'Proposed',
    startDate: '2026-10-01',
    targetEndDate: '2027-08-01',
    members: [
      { name: 'Dr. Sourav Banerjee', role: 'Principal Investigator', org: 'NIT Durgapur' },
      { name: 'Ananya Iyer', role: 'Industry Lead', org: 'InnovateX' },
    ],
    milestones: [
      { title: 'Codebase access agreement finalised', due: '2026-10-15', status: 'Pending' },
      { title: 'CRDT sync engine architecture finalisation', due: '2026-12-01', status: 'Pending' },
      { title: 'Prototype v1 with 10 concurrent editors', due: '2027-04-01', status: 'Pending' },
    ],
    documents: [{ name: 'Collaboration Proposal.pdf', uploadedBy: 'Dr. Sourav Banerjee', date: '2026-08-28' }],
    tasks: [{ title: 'Finalise staging environment access scope', assignee: 'Ananya Iyer', status: 'Open' }],
    deliverables: ['Working CRDT sync prototype', 'Latency benchmark report'],
  },
  {
    id: 'COL-003',
    rndChallengeId: 'RND-011',
    project: 'Supply Chain Traceability via Distributed Ledger',
    institution: 'IIT Kharagpur',
    industry: 'DataStream Corp',
    status: 'Completed',
    startDate: '2025-10-01',
    targetEndDate: '2026-07-01',
    members: [
      { name: 'Dr. Prashant Tiwari', role: 'Principal Investigator', org: 'IIT Kharagpur' },
      { name: 'Divya Krishnan', role: 'Industry Lead', org: 'DataStream Corp' },
    ],
    milestones: [
      { title: 'Pilot dashboard build', due: '2026-02-01', status: 'Completed' },
      { title: 'Partner logistics onboarding', due: '2026-04-01', status: 'Completed' },
      { title: 'Final pilot evaluation', due: '2026-07-01', status: 'Completed' },
    ],
    documents: [
      { name: 'Traceability Framework.pdf', uploadedBy: 'Dr. Prashant Tiwari', date: '2026-01-20' },
      { name: 'Final Pilot Evaluation Report.pdf', uploadedBy: 'Divya Krishnan', date: '2026-07-05' },
    ],
    tasks: [],
    deliverables: ['Traceability dashboard', 'Final pilot evaluation report'],
  },
]

export const collaborationById = Object.fromEntries(collaborations.map((c) => [c.id, c]))
