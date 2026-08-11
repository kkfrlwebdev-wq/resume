export const skillGroups = [
  {
    id: 'javascript',
    labelKey: 'home.skillGroups.javascript',
    skills: ['JavaScript', 'Vue.js', 'Node.js'],
  },
  {
    id: 'markup',
    labelKey: 'home.skillGroups.markup',
    skills: ['HTML5', 'EJS'],
  },
  {
    id: 'styles',
    labelKey: 'home.skillGroups.styles',
    skills: ['CSS3', 'SCSS', 'Less'],
  },
  {
    id: 'workflow',
    labelKey: 'home.skillGroups.workflow',
    skills: ['Git'],
  },
  {
    id: 'databases',
    labelKey: 'home.skillGroups.databases',
    skills: ['MongoDB', 'SQL'],
  },
]

export const skills = [
  { id: 'javascript', name: 'JavaScript', shortName: 'JS', group: 'javascript', x: 2, landY: 0, delay: 0.08, duration: 1.35, rotation: -7 },
  { id: 'vue', name: 'Vue.js', shortName: 'Vue', group: 'javascript', x: 20, landY: 3, delay: 0.24, duration: 1.45, rotation: 5 },
  { id: 'node', name: 'Node.js', shortName: 'Node', group: 'javascript', x: 38, landY: 0, delay: 0.4, duration: 1.3, rotation: -4 },
  { id: 'html', name: 'HTML5', shortName: 'HTML', group: 'markup', x: 56, landY: 4, delay: 0.56, duration: 1.5, rotation: 7 },
  { id: 'ejs', name: 'EJS', shortName: 'EJS', group: 'markup', x: 74, landY: 0, delay: 0.72, duration: 1.38, rotation: -6 },
  { id: 'css', name: 'CSS3', shortName: 'CSS', group: 'styles', x: 11, landY: 66, delay: 0.96, duration: 1.42, rotation: 6 },
  { id: 'scss', name: 'SCSS', shortName: 'SCSS', group: 'styles', x: 31, landY: 69, delay: 1.12, duration: 1.34, rotation: -5 },
  { id: 'less', name: 'Less', shortName: 'Less', group: 'styles', x: 51, landY: 66, delay: 1.28, duration: 1.48, rotation: 4 },
  { id: 'git', name: 'Git', shortName: 'Git', group: 'workflow', x: 71, landY: 69, delay: 1.44, duration: 1.4, rotation: -7 },
  { id: 'mongodb', name: 'MongoDB', shortName: 'Mongo', group: 'database', x: 31, landY: 132, delay: 1.6, duration: 1.46, rotation: 5 },
  { id: 'sql', name: 'SQL', shortName: 'SQL', group: 'database', x: 51, landY: 132, delay: 1.76, duration: 1.36, rotation: -5 },
]
