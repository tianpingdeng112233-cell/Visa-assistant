export interface AptFormField {
  id: string
  label: string
  value?: string
  type?: 'text' | 'dropdown' | 'radio' | 'date' | 'password' | 'checkbox'
  highlighted?: boolean
  hotspotId?: number
  subLabel?: string
}

export interface AptInfoPanel {
  number: number
  title: string
  body: string
  tip?: string
}

export interface AptWarning {
  title: string
  body: string
  actionLabel?: string
}

export interface AptStep {
  id: number
  sectionLabel: string
  chineseTitle: string
  subtitle: string
  systemNote?: string
  hotspots: { id: number; x: string; y: string }[]
  formFields: AptFormField[]
  infoPanels: AptInfoPanel[]
  warning?: AptWarning
  officialUrl: string
}

export const appointmentSteps: AptStep[] = [
  // ─── Step 1: 找到官方预约网站 ───────────────────────────────────────
  {
    id: 1,
    sectionLabel: 'Find the Official Website',
    chineseTitle: '找到官方预约网站',
    subtitle:
      '预约面签需要在美国国务院指定的第三方系统 AIS 上完成。不要相信任何第三方代理网站，全程使用官方链接。',
    systemNote: '网站：ais.usvisa-info.com',
    hotspots: [
      { id: 1, x: '50%', y: '28%' },
      { id: 2, x: '50%', y: '55%' },
      { id: 3, x: '50%', y: '78%' },
    ],
    formFields: [
      { id: 'search', label: '谷歌搜索', value: 'us visa', highlighted: true, hotspotId: 1 },
      { id: 'result', label: '点击搜索结果', value: 'U.S. Embassy & Consulates in the United Kingdom', hotspotId: 2 },
      { id: 'link', label: '点击页面中的链接', value: 'Step Two: https://ais.usvisa-info.com/en-gb', highlighted: true, hotspotId: 3 },
    ],
    infoPanels: [
      {
        number: 1,
        title: '谷歌搜索"us visa"',
        body: '在谷歌搜索"us visa"，点击第一条结果"U.S. Embassy & Consulates in the United Kingdom"（.gov 官方域名）。',
      },
      {
        number: 2,
        title: '点击"How to Apply"',
        body: '在搜索结果中找到"How to Apply"子链接并点击，进入申请流程页面。',
      },
      {
        number: 3,
        title: '找到 Step Two 中的预约链接',
        body: '页面中 Step Two 会显示预约网址：https://ais.usvisa-info.com/en-gb，点击进入即可。这是唯一官方预约入口。',
        tip: '直接收藏此链接：https://ais.usvisa-info.com/en-gb',
      },
    ],
    warning: {
      title: '警惕钓鱼网站和代理服务',
      body: '网上有大量仿冒官方预约网站的钓鱼页面和"代抢 Slot"骗局，务必确认网址为 ais.usvisa-info.com（美国国务院授权）。不要将账号密码提供给任何第三方。',
    },
    officialUrl: 'https://ais.usvisa-info.com/en-gb',
  },

  // ─── Step 2: 注册 / 登录账户 ───────────────────────────────────────
  {
    id: 2,
    sectionLabel: 'Create Account / Login',
    chineseTitle: '注册或登录预约账户',
    subtitle:
      '首次申请点击 Apply 注册新账户；已有账户或后续刷位时点击 Continue 登录。账户注册后需邮箱激活才可继续。',
    systemNote: '预约系统：AIS-USVisa-Info',
    hotspots: [
      { id: 1, x: '50%', y: '30%' },
      { id: 2, x: '50%', y: '52%' },
      { id: 3, x: '50%', y: '72%' },
    ],
    formFields: [
      { id: 'apply', label: 'Apply（第一次注册点这里）', value: '→ 一开始点这个注册', highlighted: true, hotspotId: 1 },
      { id: 'continue', label: 'Continue（有账号了点这里）', value: '→ 后续刷签时间slot也从这里登录', hotspotId: 2 },
      { id: 'condition', label: '选择申请条件', value: 'I have completed a DS-160 form（选这个）', highlighted: true, hotspotId: 3 },
    ],
    infoPanels: [
      {
        number: 1,
        title: 'Apply — 首次注册',
        body: '如果你是第一次申请，点击 Apply 按钮。选择条件时选择"I have completed the U.S. Nonimmigrant Visa Application (DS-160) form and I need to apply for a visa"。',
      },
      {
        number: 2,
        title: 'Continue — 已有账户',
        body: '如果你已经有账户（包括之前申请过、或需要改签时），点击 Continue 用已注册的邮箱密码登录即可。',
        tip: '抢 Slot 时也是从这里登录，所以务必记住你的账号密码。',
      },
      {
        number: 3,
        title: '填写注册信息',
        body: '输入名（Given Name）、姓（Surname）、邮箱（填两次）、密码（填两次）。如需短信提醒可勾选 SMS Terms，然后点击 Create Account。',
      },
    ],
    warning: {
      title: '不要重复创建账户！',
      body: '如果系统提示"User already exists"，说明你的邮箱已经注册过，请用 Continue 选择找回密码，而不是重新注册。频繁注册新账号可能导致 IP 被系统暂时锁定（Access Denied）。',
    },
    officialUrl: 'https://ais.usvisa-info.com/en-gb',
  },

  // ─── Step 3: 填写申请人信息 ─────────────────────────────────────────
  {
    id: 3,
    sectionLabel: 'Applicant Information',
    chineseTitle: '填写申请人信息',
    subtitle:
      '填写你的护照信息、DS-160 表格号码和签证类型。所有信息必须与 DS-160 表格完全一致，否则无法预约。',
    hotspots: [
      { id: 1, x: '60%', y: '18%' },
      { id: 2, x: '60%', y: '36%' },
      { id: 3, x: '60%', y: '56%' },
      { id: 4, x: '60%', y: '76%' },
    ],
    formFields: [
      { id: 'given', label: 'Given Name*', value: '名（与DS-160一致）', highlighted: true, hotspotId: 1 },
      { id: 'surname', label: 'Surname*', value: '姓（与DS-160一致）', highlighted: true },
      { id: 'passport_issuer', label: 'Country / Authority that issued Passport*', value: 'China（发你护照的国家）', type: 'dropdown', hotspotId: 2 },
      { id: 'country_birth', label: 'Country of Birth*', value: 'China（你出生的国家）', type: 'dropdown' },
      { id: 'perm_residence', label: 'Country of Permanent Residence*', value: 'China（英区留学生填China！）', type: 'dropdown', highlighted: true, hotspotId: 3 },
      { id: 'passport_num', label: 'Passport Number*', value: '护照号', highlighted: true },
      { id: 'ds160', label: 'DS-160 Number*', value: 'AA开头的DS-160表格号', highlighted: true, hotspotId: 4 },
      { id: 'visa_class', label: 'Visa Class*', value: 'B1/B2 Business & Tourism (Temporary visitor)', type: 'dropdown' },
      { id: 'dob', label: 'Date of Birth*', value: '出生日期', type: 'date' },
      { id: 'phone', label: 'Primary Phone*', value: '+44 英国手机号', highlighted: true },
    ],
    infoPanels: [
      {
        number: 1,
        title: '姓名与护照号（必须与DS-160一致）',
        body: '填写 DS-160 上的姓（Surname）和名（Given Name）拼音大写。护照号码从护照右上角复制，确保没有多填或漏填字母。',
      },
      {
        number: 2,
        title: 'Country of Permanent Residence（永久居留地）',
        body: '英区留学生注意：这里填 China，不是 United Kingdom！学生签证不是永久居留，BRP 不算永居，只有 ILR/英国国籍才选 UK。',
      },
      {
        number: 3,
        title: 'DS-160 Number（表格号）',
        body: 'DS-160 表格号在 DS-160 确认页右上角，以 AA 开头，格式为 AAxxxxxxxx。提交 DS-160 后才能获得此号码。',
        tip: '如果你还没提交 DS-160，请先完成 DS-160 再来预约。',
      },
      {
        number: 4,
        title: '电话号码',
        body: '填写英国手机号，格式为 +44 开头。系统会在这里发送短信提醒（如果你开启了 SMS）。',
      },
    ],
    warning: {
      title: 'Country of Permanent Residence 填 China，不是 UK',
      body: '这是英区留学生最常填错的一项。学生签证（Tier 4/Student Route）不属于永久居留。填 UK 会导致后续流程出现问题，务必选 China。',
    },
    officialUrl: 'https://ais.usvisa-info.com/en-gb',
  },

  // ─── Step 4: 确认声明 ───────────────────────────────────────────────
  {
    id: 4,
    sectionLabel: 'Check Statements & Confirm',
    chineseTitle: '确认申请人状态声明',
    subtitle:
      '系统会询问是否符合特定条件（如曾被驱逐、超期居留、有犯罪记录等）。正常申请人勾选"None of the above apply"，点击 Confirm。',
    hotspots: [
      { id: 1, x: '50%', y: '30%' },
      { id: 2, x: '50%', y: '62%' },
      { id: 3, x: '50%', y: '82%' },
    ],
    formFields: [
      { id: 'confirm_info', label: '确认信息页 — Does this visa type match your travel?', value: '核对姓名、护照号、DS-160号、签证类型无误后点 Yes', highlighted: true, hotspotId: 1 },
      { id: 'deported', label: '□  ...has been deported or removed from the United States', value: '你已被驱逐出美国（如实）' },
      { id: 'overstay', label: '□  ...has overstayed the period of admission', value: '你已超过入境美国的期限（如实）' },
      { id: 'arrested', label: '□  ...has been arrested, convicted or cautioned', value: '你曾因犯法被逮捕、定罪或警告（如实）' },
      { id: 'refused', label: '□  ...was refused a U.S. visa in the same visa class within 6 months', value: '6个月内申请同类型被拒（如实）' },
      { id: 'none', label: '☑  None of the above apply', value: '以上都不符合 → 选这个', highlighted: true, hotspotId: 2 },
      { id: 'confirm_btn', label: '点击 Confirm 确认', value: '→ 下一步', highlighted: true, hotspotId: 3 },
    ],
    infoPanels: [
      {
        number: 1,
        title: '先确认申请人信息无误',
        body: '系统会展示你填写的 Full Name、Date of Birth、Passport Number、DS-160 Number 和 Visa Class。确认无误后点击 Yes 继续。',
      },
      {
        number: 2,
        title: '勾选状态声明',
        body: '正常申请人以上四条均不符合，直接勾选"None of the above apply"（以上都不符合），然后点击 Confirm。',
      },
      {
        number: 3,
        title: '关于 ACRO 警告',
        body: '页面上方会有一条提示：曾在英国有过逮捕/定罪记录的申请人需带 ACRO Police Certificate。如无犯罪记录，忽略即可。',
      },
    ],
    officialUrl: 'https://ais.usvisa-info.com/en-gb',
  },

  // ─── Step 5: 是否添加同行人 + 快递取件地点 ─────────────────────────
  {
    id: 5,
    sectionLabel: 'Add Applicants & Courier Location',
    chineseTitle: '添加同行人 & 选择取件地点',
    subtitle:
      '如与朋友一起递签，可在此添加同行申请人。完成后选择护照返还的快递取件地点（伦敦/曼城/贝法斯特均可）。',
    hotspots: [
      { id: 1, x: '50%', y: '22%' },
      { id: 2, x: '50%', y: '56%' },
      { id: 3, x: '50%', y: '80%' },
    ],
    formFields: [
      { id: 'add_applicant', label: 'Do you want to add another applicant?', value: 'Yes（和朋友一起递签）/ No（一个人）', type: 'radio', hotspotId: 1 },
      { id: 'courier_loc', label: 'Document courier pick up location (no extra fee)', value: 'DXS Manchester / London / Belfast', type: 'dropdown', highlighted: true, hotspotId: 2 },
      { id: 'third_party', label: '授权第三方取件人姓名（可留空）', value: '留空即可', hotspotId: 3 },
    ],
    infoPanels: [
      {
        number: 1,
        title: '是否添加同行申请人？',
        body: '如果要和朋友/同行人一起去递签，选 Yes，然后为对方填写申请信息。一起约同一时间段的面签更方便。一个人递签选 No。',
      },
      {
        number: 2,
        title: '护照快递取件地点',
        body: '面签后护照会被快递到你选择的地点取件（免费）。可选择：伦敦（London）、曼彻斯特（Manchester）或贝法斯特（Belfast）。',
        tip: '如需邮寄到家，可选择 Premium Delivery（约20英镑/人）。选好后可以在后台改，不用担心选错。',
      },
      {
        number: 3,
        title: '第三方取件',
        body: '如果你不方便自己去取，可以让他人代取。在"Name of third party"填写代取人姓名，留空则只能本人取件。',
      },
    ],
    officialUrl: 'https://ais.usvisa-info.com/en-gb',
  },

  // ─── Step 6: 支付 MRV 签证费 ───────────────────────────────────────
  {
    id: 6,
    sectionLabel: 'MRV Fee Payment',
    chineseTitle: '支付 MRV 签证申请费',
    subtitle:
      '每人需支付 $185 USD 的 MRV 签证申请费（约 £150 GBP，汇率波动）。建议使用 VISA/Mastercard 信用卡，避免使用借记卡。',
    hotspots: [
      { id: 1, x: '50%', y: '25%' },
      { id: 2, x: '50%', y: '55%' },
      { id: 3, x: '50%', y: '78%' },
    ],
    formFields: [
      { id: 'fee_details', label: 'MRV Fee Details — 确认签证费', value: '$185.00 USD per person (B1/B2)', highlighted: true, hotspotId: 1 },
      { id: 'first_avail', label: '右侧可看到目前有空位的 Slot（仅供参考）', value: 'Belfast: 28 July 2025 / London: 13 May 2025' },
      { id: 'card_num', label: 'Card Number', value: '信用卡号', highlighted: true, hotspotId: 2 },
      { id: 'expiry', label: 'Expiry Date', value: 'MM / YY' },
      { id: 'holder', label: 'Card holder', value: '持卡人姓名' },
      { id: 'cvv', label: 'CVV', value: 'CVV 码' },
      { id: 'pay', label: '点击 Pay now 付款', value: '→ 付款吧', highlighted: true, hotspotId: 3 },
    ],
    infoPanels: [
      {
        number: 1,
        title: 'MRV 费用：$185 USD / 人',
        body: 'B1/B2 旅游签的 MRV 费为 $185 美元/人（约 £155 英镑，视汇率而定）。如与同行人一起，总费用翻倍。此费用不可退款、不可转让。',
      },
      {
        number: 2,
        title: '支付时注意事项',
        body: '支付时 DO NOT 关闭浏览器窗口、DO NOT 点击后退键、DO NOT 刷新页面，等待支付处理（最多30分钟）。支付成功后会跳转到确认页。',
        tip: '如支付后不确定是否成功，不要重复支付，先联系 Contact Us 确认状态。',
      },
      {
        number: 3,
        title: '右侧可查看当前最早可约时间',
        body: '支付页面右侧会显示"First Available Appointments"，可以看到各地点当前最早可约的时间，作为参考。这个信息是实时的，说明付款前就能大概知道等待时间。',
      },
    ],
    warning: {
      title: '支付过程中不要关闭或刷新页面',
      body: '3D Secure 验证可能需要等待，整个支付过程最多30分钟。中途关闭可能导致重复扣款，处理起来很麻烦。如真的出现问题，不要重新支付，先通过 Contact Us 确认。',
    },
    officialUrl: 'https://ais.usvisa-info.com/en-gb',
  },

  // ─── Step 7: 预约面签时间 ────────────────────────────────────────────
  {
    id: 7,
    sectionLabel: 'Schedule Appointment',
    chineseTitle: '预约面签时间',
    subtitle:
      '支付成功后即可选择面签地点和时间。目前 London 等待时间较长，可先随意约一个时间，后续通过 Slot 监测工具改签更早的时间。',
    hotspots: [
      { id: 1, x: '50%', y: '28%' },
      { id: 2, x: '50%', y: '52%' },
      { id: 3, x: '50%', y: '74%' },
    ],
    formFields: [
      { id: 'consular_loc', label: 'Consular Section Location*', value: 'London（选择递签地点，与DS-160一致）', type: 'dropdown', highlighted: true, hotspotId: 1 },
      { id: 'consular_addr', label: '使馆地址参考', value: 'US Embassy London, 33 Nine Elms Lane, London, SW11 7US' },
      { id: 'appt_date', label: 'Date of Appointment*', value: '选择面签日期', type: 'date', highlighted: true, hotspotId: 2 },
      { id: 'appt_time', label: 'Time of Appointment*', value: '选择面签时间', type: 'dropdown', hotspotId: 3 },
    ],
    infoPanels: [
      {
        number: 1,
        title: '选择领事馆地点',
        body: '选择 London——要与 DS-160 里填写的城市/地区保持一致。在英国的申请人通常选 London（US Embassy London）。',
      },
      {
        number: 2,
        title: '选择日期 & 时间',
        body: '目前系统只能预约到约3个月后，但有时会放出近期的名额（通常在早上或凌晨）。可以先随便约一个能约到的日期，后续用监测工具抢更早的。',
        tip: '注意：面签日期必须比 DS-160 里填写的行程到达日期早几天，确保符合实际。',
      },
      {
        number: 3,
        title: '预约成功后如何改签？',
        body: '预约成功后，在账户管理页面点击"Reschedule Appointment"可以修改时间，不会重新收费。这也是后续配合 Slot 监测工具刷时间的入口。',
      },
    ],
    warning: {
      title: '面签日期要比 DS-160 行程早几天',
      body: '注意面签日期应早于你在 DS-160 里填写的到美国旅行日期至少几天，这样逻辑上才合理。签证官会对比这两个日期，若面签在旅行后则会引起疑问。',
    },
    officialUrl: 'https://ais.usvisa-info.com/en-gb',
  },

  // ─── Step 8: 预约成功 + 使用 Slot 监测 ─────────────────────────────
  {
    id: 8,
    sectionLabel: 'Confirmation & Slot Monitoring',
    chineseTitle: '预约成功 & 开启 Slot 监测',
    subtitle:
      '恭喜！付款并选择时间后预约完成。你会收到确认邮件，账户状态变为"Attend Appointment"。如果想改签到更早的时间，现在可以开启 Slot 监测工具。',
    hotspots: [
      { id: 1, x: '50%', y: '24%' },
      { id: 2, x: '50%', y: '52%' },
      { id: 3, x: '50%', y: '76%' },
    ],
    formFields: [
      { id: 'status', label: '账户状态（预约成功后）', value: '✅ Current Status: Attend Appointment', highlighted: true, hotspotId: 1 },
      { id: 'consular', label: 'Consular Appointment', value: '你的面签时间和地点' },
      { id: 'delivery', label: 'Document Delivery Location', value: '护照取件地点' },
      { id: 'reschedule', label: 'Reschedule Appointment（改签入口）', value: '→ 改签时间和地点（抢Slot就点这里）', highlighted: true, hotspotId: 2 },
      { id: 'print', label: 'Print Instructions（打印确认函）', value: '→ 打印面签确认页', hotspotId: 3 },
      { id: 'premium', label: 'Request Premium Delivery（邮寄护照）', value: '→ 约21镑/人，可在此升级邮寄' },
    ],
    infoPanels: [
      {
        number: 1,
        title: '确认邮件 & 账户状态',
        body: '预约成功后会收到来自 donotreply@usvisa-info.com 的确认邮件，账户页面状态显示为"Attend Appointment"，并显示面签时间和快递地点。',
      },
      {
        number: 2,
        title: 'Reschedule Appointment — 改签入口',
        body: '账户管理页面（Actions 菜单）中的"Reschedule Appointment"是改签的入口。Slot 监测工具发现好时间后，你需要登录这里手动完成改签。',
        tip: '改签不收额外费用，但每次改签会取消原有预约，请确保新时间确实可用后再操作。',
      },
      {
        number: 3,
        title: '打印面签确认页',
        body: '点击"Print Instructions"或"Email Instructions"获取面签确认函，面签当天必须携带打印版。确认函上包含面签时间、地点和注意事项。',
      },
    ],
    officialUrl: 'https://ais.usvisa-info.com/en-gb',
  },
]
