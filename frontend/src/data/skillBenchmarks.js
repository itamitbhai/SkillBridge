// Demo student's skill levels vs. the industry benchmark for their target
// role — drives the Skill Profile bars, Skill Gap Analysis and dashboard
// widgets so every page stays consistent.

export const skillBenchmarks = [
  { skill: 'React', current: 85, target: 80 },
  { skill: 'JavaScript', current: 78, target: 90 },
  { skill: 'Node.js', current: 60, target: 80 },
  { skill: 'MongoDB', current: 68, target: 72 },
  { skill: 'System Design', current: 40, target: 75 },
  { skill: 'Communication', current: 65, target: 85 },
  { skill: 'Problem Solving', current: 80, target: 82 },
  { skill: 'Cloud/AWS', current: 45, target: 70 },
]

export const skillGaps = skillBenchmarks
  .filter((s) => s.current < s.target)
  .map((s) => ({ skill: s.skill, current: s.current, target: s.target, priority: s.target - s.current >= 20 ? 'High' : 'Medium' }))
  .sort((a, b) => (b.target - b.current) - (a.target - a.current))
