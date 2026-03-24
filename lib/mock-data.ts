// ─── Homepage ─────────────────────────────────────────────────────────────────

export const mockUser = {
  name: 'Alex',
  progressPercent: 35,
  progressLabel: '整体办理进度',
  progressNote:
    '你已经完成了 DS-160 的基础信息填写。目前伦敦领事馆的预约时间平均等待 14 天，建议尽快完成表格提交以开启预约。',
  nextMilestone: '预约面签 Slot',
}

export const mockStages = [
  {
    id: 'ds160',
    number: '01',
    title: '填写 DS-160',
    description:
      'VISA 申请的核心表格，需要准确填写你的个人及旅行背景信息。',
    status: '进行中' as const,
    buttonLabel: '继续填写',
    buttonIcon: 'pen',
    href: '/ds160/step-1',
  },
  {
    id: 'appointment',
    number: '02',
    title: '预约 / 抢 Slot',
    description:
      '锁定领事馆的面签席位。我们将协助你监控最新的 Slot 释放情况。',
    status: '可开始' as const,
    buttonLabel: '待开启',
    buttonIcon: 'lock',
    href: '/appointment/step-1',
  },
  {
    id: 'interview',
    number: '03',
    title: '线下面签',
    description:
      '携带完整材料前往大使馆，进行指纹采集及官员面谈环节。',
    status: '可开始' as const,
    buttonLabel: '待开启',
    buttonIcon: 'lock',
    href: '/interview/checklist',
  },
]

export const mockMaterials = [
  { id: 'passport', sublabel: 'PASSPORT', label: '护照', done: false },
  { id: 'id', sublabel: 'ID CARD', label: '身份证', done: false },
  { id: 'photo', sublabel: '证件照片', label: '≤240KB · 不带眼镜', done: false },
]

// ─── DS-160 Step 1 ─────────────────────────────────────────────────────────────

export const ds160Step1 = {
  stepNumber: '01',
  title: '个人信息 1 (Personal Information 1)',
  subtitle:
    '这是 DS-160 表格的第一部分。请确保所有信息与你的护照原件完全一致。一旦提交，部分核心信息将无法修改。',
  browserUrl: 'ceac.state.gov/genniv/',
  hotspots: [
    { id: 1, x: '42%', y: '32%', label: '1' },
    { id: 2, x: '48%', y: '58%', label: '2' },
    { id: 3, x: '36%', y: '74%', label: '3' },
  ],
  infoPanels: [
    {
      number: 1,
      title: 'Surnames (姓)',
      body: '填写护照上的姓。如果护照上有加注名，请在之后的部分填写。',
    },
    {
      number: 2,
      title: 'Given Names (名)',
      body: '填写护照上的名。中间不要加空格，除非护照上明确有空格。',
    },
    {
      number: 3,
      title: 'Full Name in Native Alphabet',
      body: '请使用中文（全角汉字）填写你的姓名全称。不要加空格。',
    },
  ],
  warning: {
    title: '常见错误警示：姓名拼写与顺序',
    body: '绝大多数被拒签或要求重填表的案例，都是因为"姓"与"名"的位置填反了。请严格按照护照底部机器读取栏（MRZ）的顺序核对。',
    examples: [
      { label: '错误示例', value: 'San Zhang', correct: false },
      { label: '正确示例', value: 'Zhang San', correct: true },
    ],
  },
  prevHref: '/',
  nextHref: '/ds160/step-1',
  officialUrl: 'https://ceac.state.gov/genniv/',
  stepKey: 'ds160_step1',
}

// ─── Appointment Step 1 ────────────────────────────────────────────────────────

export const appointmentStep1 = {
  stepNumber: '02',
  title: '创建预约账户',
  subtitle:
    '在正式预约面签 Slot 之前，你需要在美国使馆指定的第三方预约系统中注册个人账户。请确保注册信息与 DS-160 表格完全一致。',
  systemNote: '预约系统：AIS-USVisa-Info',
  browserUrl: 'portal.ustraveldocs.com/?country=China&language=Chinese',
  hotspots: [
    { id: 1, x: '24%', y: '38%', label: '1' },
    { id: 2, x: '54%', y: '52%', label: '2' },
    { id: 3, x: '68%', y: '64%', label: '3' },
    { id: 4, x: '44%', y: '80%', label: '4' },
  ],
  infoPanels: [
    {
      number: 1,
      title: '选择申请入口',
      body: '点击 "Apply" 按钮，并选择 "I have completed a U.S. Nonimmigrant Visa Application (DS-160) form"。',
    },
    {
      number: 2,
      title: '电子邮箱注册',
      body: '建议使用你在英国常用的个人邮箱（如 Gmail/Outlook），此邮箱将作为唯一登录凭证和通知接收渠道。',
    },
    {
      number: 3,
      title: '密码设定',
      body: '包含大小写字母、数字及特殊符号。抢 Slot 时可能频繁登录，请务必妥善记录。',
    },
    {
      number: 4,
      title: '邮箱激活',
      body: '提交申请后，系统会发送激活邮件。点击邮件中的链接以正式激活账户，否则无法进行下一步。',
    },
  ],
  warning: {
    title: '常见问题（Common Errors）',
    body: '务必注意：不要重复创建账户。如果系统提示 "User already exists"，请尝试找回密码或联系使馆技术支持。频繁注册新账号可能导致 IP 被暂时锁定（Access Denied）。',
  },
  prevHref: '/ds160/step-1',
  nextHref: '/monitoring',
  officialUrl: 'https://portal.ustraveldocs.com/',
  stepKey: 'appointment_step1',
}

// ─── Monitoring ────────────────────────────────────────────────────────────────

export const monitoringData = {
  isLive: true,
  lastUpdated: '12 秒前',
  region: 'London',
  dateStart: '2026-06-01',
  dateEnd: '2026-08-31',
  telegram: {
    handle: '@uk_visa_bot',
    connected: true,
  },
  queue: [
    { code: 'LHR', label: 'London (Embassy)', waitDays: 215, status: 'online' as const },
    { code: 'BFS', label: 'Belfast (Consulate)', waitDays: 12, status: 'online' as const },
    { code: 'EDN', label: 'Edinburgh', waitDays: null, status: 'offline' as const },
  ],
  matches: [
    {
      id: 'm1',
      location: 'LONDON',
      date: '2024-07-15',
      note: 'AIS Member Only Slot',
      timeAgo: '2 mins ago',
      active: true,
    },
    {
      id: 'm2',
      location: 'BELFAST',
      date: '2024-06-22',
      note: '3 slots available',
      timeAgo: '15 mins ago',
      active: true,
    },
    {
      id: 'm3',
      location: 'LONDON',
      date: '2024-08-05',
      note: '',
      timeAgo: '1 hour ago',
      active: false,
    },
  ],
}

// ─── Interview Checklist ────────────────────────────────────────────────────────

export const interviewChecklist = {
  mandatory: [
    {
      id: 'passport',
      label: '护照原件 (Passport)',
      desc: '有效期需在六个月以上。如有旧护照请一并带上。',
      icon: 'file',
    },
    {
      id: 'ds160',
      label: 'DS-160 确认页',
      desc: '只需打印最后带有条形码的确认页，建议激光打印确保条码清晰。',
      icon: 'printer',
    },
    {
      id: 'appointment',
      label: '面签预约确认单',
      desc: '预约网站生成的 Appointment Confirmation。',
      icon: 'calendar',
    },
    {
      id: 'sevis',
      label: 'SEVIS (I-901) 缴费收据',
      desc: 'F1/J1 签证必备，在线支付后的 PDF 打印件。',
      icon: 'receipt',
    },
  ],
  supporting: [
    {
      id: 'enrollment',
      label: '在读证明 / 录取通知书',
      desc: '证明您目前在英国的正当学生身份。',
    },
    {
      id: 'bank',
      label: '最近 3 个月银行流水',
      desc: '建议余额能覆盖旅行开支，无需冻结。',
    },
    {
      id: 'brp',
      label: '英国签证 / BRP 复印件',
      desc: '确认您在英的合法长期居留身份。',
    },
    {
      id: 'cv',
      label: '个人简历 (CV/Resume)',
      desc: '特别是 STEM 专业的同学，建议备一份。',
    },
  ],
  tips: [
    '提前 30 分钟到达：伦敦使馆安检较慢，预留充足时间。',
    '严禁携带：大型背包、笔记本电脑、充电宝。尽量只带透明文件夹。',
    '保持自信：微笑面对签证官，诚实回答每一个关于旅行计划的问题。',
  ],
}
