export interface DS160Hotspot {
  id: number
  x: string
  y: string
}

export interface DS160InfoPanel {
  number: number
  title: string
  body: string
  tip?: string
}

export interface DS160Warning {
  title: string
  body: string
  examples?: { label: string; value: string; correct: boolean }[]
}

export interface DS160FormField {
  id: string
  label: string
  value?: string
  type?: 'text' | 'dropdown' | 'radio' | 'date'
  hotspotId?: number
  highlighted?: boolean
  subLabel?: string
}

export interface DS160Step {
  id: number
  sectionLabel: string
  chineseTitle: string
  subtitle: string
  hotspots: DS160Hotspot[]
  infoPanels: DS160InfoPanel[]
  warning?: DS160Warning
  formFields: DS160FormField[]
  officialUrl: string
}

export const ds160Steps: DS160Step[] = [
  // ─── Step 1: Personal Information 1 ──────────────────────────────
  {
    id: 1,
    sectionLabel: 'Personal Information 1',
    chineseTitle: '个人信息（第一部分）',
    subtitle:
      '请按照护照信息准确填写您的姓名。所有内容必须使用英文大写字母，与护照机器读取栏（MRZ）完全一致。',
    hotspots: [
      { id: 1, x: '60%', y: '20%' },
      { id: 2, x: '60%', y: '36%' },
      { id: 3, x: '60%', y: '52%' },
      { id: 4, x: '60%', y: '72%' },
    ],
    formFields: [
      { id: 'surnames', label: 'Surnames', value: '你的姓', highlighted: true, hotspotId: 1, subLabel: '(e.g., WANG)' },
      { id: 'given', label: 'Given Names', value: '你的名', highlighted: true, hotspotId: 2, subLabel: '(e.g., XIAOMING)' },
      { id: 'native', label: 'Full Name in Native Alphabet', value: '你的中文全名', highlighted: true, hotspotId: 3 },
      { id: 'telecode', label: 'Telecode Surnames / Given Names', value: '4位电码 / 4位电码', highlighted: true, hotspotId: 4 },
      { id: 'sex', label: 'Sex', value: '你的性别', type: 'dropdown' },
      { id: 'marital', label: 'Marital Status', value: '婚姻状态', type: 'dropdown' },
    ],
    infoPanels: [
      {
        number: 1,
        title: 'Surnames（姓氏）',
        body: '填写护照上的姓氏，全部使用大写拼音。如护照上只有一个名字，请将其填入 Surname 栏。',
        tip: '例：ZHANG、WANG、LI',
      },
      {
        number: 2,
        title: 'Given Names（名字）',
        body: '填写护照上的名字，使用全大写拼音。多个汉字的名字拼音中间不留空格——这是最常见的错误！',
        tip: '例：XIAOMING（不是 XIAO MING）',
      },
      {
        number: 3,
        title: 'Full Name in Native Alphabet',
        body: '此处直接输入中文姓名全称（如：张小明）。系统支持中文字符输入，与身份证保持一致。',
      },
      {
        number: 4,
        title: 'Telecode Names（姓名电码）',
        body: '选择 Yes，然后填写中文姓名对应的四位电码。姓和名分别填写，名字有两个汉字中间加空格（如 1234 5678）。',
        tip: '电码查询网址：apps.chasedream.com/chinese-commercial-code/default.aspx',
      },
    ],
    warning: {
      title: '常见错误：Given Names 不能有空格',
      body: '大多数被拒或要求重填的案例是因为"姓"与"名"填反，或在 Given Names 中加了空格。请严格按护照 MRZ 栏的顺序核对。',
      examples: [
        { label: '错误', value: 'XIAO MING', correct: false },
        { label: '正确', value: 'XIAOMING', correct: true },
      ],
    },
    officialUrl: 'https://ceac.state.gov/genniv/',
  },

  // ─── Step 2: Personal Information 2 ──────────────────────────────
  {
    id: 2,
    sectionLabel: 'Personal Information 2',
    chineseTitle: '个人信息（第二部分）',
    subtitle:
      '填写国籍、居留身份及证件号码。英区留学生持有学生签证，需特别注意"永久居留"问题的回答。',
    hotspots: [
      { id: 1, x: '60%', y: '18%' },
      { id: 2, x: '60%', y: '38%' },
      { id: 3, x: '60%', y: '56%' },
      { id: 4, x: '60%', y: '74%' },
    ],
    formFields: [
      { id: 'nationality', label: 'Country/Region of Origin (Nationality)', value: '你的国籍', type: 'dropdown', highlighted: true, hotspotId: 1 },
      { id: 'other_nat', label: '是否持有其他国籍？', value: 'No', type: 'radio', hotspotId: 2 },
      { id: 'perm_res', label: '是否为其他国家永久居民？', value: 'No', type: 'radio', hotspotId: 3 },
      { id: 'national_id', label: 'National Identification Number', value: '你的身份证号', highlighted: true, hotspotId: 4 },
      { id: 'ssn', label: 'U.S. Social Security Number', value: 'Does Not Apply' },
      { id: 'tax_id', label: 'U.S. Taxpayer ID Number', value: 'Does Not Apply' },
    ],
    infoPanels: [
      {
        number: 1,
        title: 'Country/Region of Origin（国籍）',
        body: '选择 China（中国）。这是你护照所属国家，不是你的居住地（英国）。',
      },
      {
        number: 2,
        title: '是否持有其他国籍？',
        body: '大多数情况选 No。如你同时持有英国护照或其他国家国籍，选 Yes 并如实填写。',
      },
      {
        number: 3,
        title: '是否为其他国家永久居民？',
        body: '持英国学生签证（Tier 4 / Student Visa）或 BRP 的同学选 No——学生签证不属于永久居留。只有持有英国永居（ILR）才选 Yes。',
      },
      {
        number: 4,
        title: 'National ID Number（身份证号）',
        body: '填写中国身份证号（18位数字）。U.S. Social Security Number 和 U.S. Taxpayer ID Number 均选 Does Not Apply。',
      },
    ],
    warning: {
      title: '注意：BRP 不等于永久居留',
      body: '持英国学生签证的留学生，"是否为其他国家永久居民"应选 No。只有持有 Indefinite Leave to Remain（ILR）或英国国籍才算永居。选错会导致后续材料矛盾。',
    },
    officialUrl: 'https://ceac.state.gov/genniv/',
  },

  // ─── Step 3: Travel Information ───────────────────────────────────
  {
    id: 3,
    sectionLabel: 'Travel Information',
    chineseTitle: '旅行信息',
    subtitle:
      '填写此次赴美旅行的目的、计划行程和住宿地址。建议认真规划一个合理的行程，签证官会参考此信息。',
    hotspots: [
      { id: 1, x: '60%', y: '16%' },
      { id: 2, x: '60%', y: '36%' },
      { id: 3, x: '60%', y: '58%' },
      { id: 4, x: '60%', y: '78%' },
    ],
    formFields: [
      { id: 'purpose', label: 'Purpose of Trip', value: 'TEMP. BUSINESS OR PLEASURE VISITOR (B)', type: 'dropdown', highlighted: true, hotspotId: 1 },
      { id: 'specify', label: 'Specify', value: 'BUSINESS OR TOURISM (TEMPORARY VISITOR)', type: 'dropdown', highlighted: true },
      { id: 'specific_plans', label: '是否有详细旅行计划？', value: 'Yes（建议选Yes）', type: 'radio', hotspotId: 2 },
      { id: 'arrival', label: 'Date of Arrival in U.S.', value: '到达日期', type: 'date', hotspotId: 3 },
      { id: 'departure', label: 'Date of Departure from U.S.', value: '离开日期', type: 'date' },
      { id: 'arrival_city', label: 'Arrival City', value: '到达城市（如 NEW YORK）', highlighted: true },
      { id: 'address', label: 'Address Where You Will Stay', value: '酒店地址', highlighted: true, hotspotId: 4 },
      { id: 'payer', label: 'Person/Entity Paying for Trip', value: 'SELF（自己付钱）', type: 'dropdown' },
    ],
    infoPanels: [
      {
        number: 1,
        title: 'Purpose of Trip（旅行目的）',
        body: '旅游选 TEMP. BUSINESS OR PLEASURE VISITOR (B)，然后在 Specify 中选 BUSINESS OR TOURISM (TEMPORARY VISITOR)。',
      },
      {
        number: 2,
        title: '是否有详细旅行计划？（建议 Yes）',
        body: '建议选 Yes 并认真填写行程。到达/离开日期要与实际机票时间对应，如未购票可填预计时间。',
        tip: '可让 AI 帮你制定行程：告诉它你的出行时间和想去的城市，让它生成具体景点计划并翻译成英文。',
      },
      {
        number: 3,
        title: '到达和离开日期',
        body: '格式为 DD-MMM-YYYY（如 02-MAY-2026）。到达城市填第一站城市（如 NEW YORK），离开城市填最后出发城市。',
      },
      {
        number: 4,
        title: '在美住址 & 谁支付旅费？',
        body: '住址填预订酒店的英文地址（可在 Booking.com 或酒店官网找到）。旅费由自己支付选 SELF。',
      },
    ],
    warning: {
      title: '行程要合理，前后要一致',
      body: '旅行日期、到达/离开城市需要前后一致，且与你的资金证明、机票安排相符。面签时签证官可能会询问行程，提前熟悉你填写的内容。',
    },
    officialUrl: 'https://ceac.state.gov/genniv/',
  },

  // ─── Step 4: Travel Companions ────────────────────────────────────
  {
    id: 4,
    sectionLabel: 'Travel Companions & Previous U.S. Travel',
    chineseTitle: '旅伴信息 & 过往赴美记录',
    subtitle:
      '填写旅伴情况和过往赴美历史。即使旅伴已有美签，也需如实填写——信息不符比如实申报风险更大。',
    hotspots: [
      { id: 1, x: '60%', y: '18%' },
      { id: 2, x: '60%', y: '42%' },
      { id: 3, x: '60%', y: '62%' },
      { id: 4, x: '60%', y: '80%' },
    ],
    formFields: [
      { id: 'companion', label: '是否有同行者？', value: '按实际情况填', type: 'radio', hotspotId: 1 },
      { id: 'group', label: '是否为团体旅行？', value: 'No（个人旅行）', type: 'radio' },
      { id: 'companion_name', label: '旅伴姓名（如有）', value: '旅伴的姓 / 旅伴的名' },
      { id: 'been_us', label: '是否曾去过美国？', value: '如实填写', type: 'radio', hotspotId: 2 },
      { id: 'had_visa', label: '是否曾持有美签？', value: '如实填写', type: 'radio', hotspotId: 3 },
      { id: 'refused', label: '是否曾被拒签或拒绝入境？', value: '如实填写', type: 'radio', hotspotId: 4 },
      { id: 'petition', label: '是否有人代你向移民局递交申请？', value: 'No', type: 'radio' },
    ],
    infoPanels: [
      {
        number: 1,
        title: '是否有旅伴？',
        body: '如有同行者选 Yes，填写对方姓名和关系。是否为团体旅行根据实际选择，一般个人出行选 No。',
        tip: '即使旅伴已有美签不需要陪你面签，DS-160 中也建议如实填写有旅伴这一事实。',
      },
      {
        number: 2,
        title: '是否曾去过美国？',
        body: '如实填写。如曾去过，需填写大概日期、停留时长。从未去过选 No 即可。',
      },
      {
        number: 3,
        title: '是否曾持有美签？',
        body: '如曾持有，选 Yes 并填写签证号（护照上的 Visa Number）、发签日期和签证类型。从未有过选 No。',
      },
      {
        number: 4,
        title: '是否曾被拒签？',
        body: '如实填写。曾被拒签不代表这次一定被拒，但必须如实申报——海关系统有完整记录，隐瞒风险极大。',
      },
    ],
    warning: {
      title: '旅伴问题：如实填写最安全',
      body: '面签时签证官可能会问及旅伴情况。如 DS-160 填写与实际不符（如填了无旅伴但实际有），将构成材料虚假，直接导致拒签。',
    },
    officialUrl: 'https://ceac.state.gov/genniv/',
  },

  // ─── Step 5: Address, Phone & Social Media ─────────────────────────
  {
    id: 5,
    sectionLabel: 'Address, Phone & Social Media',
    chineseTitle: '联系方式与社交媒体',
    subtitle:
      '填写家庭地址、联系电话、邮箱以及社交媒体账号。社交媒体务必如实填写，美国政府系统有能力核查。',
    hotspots: [
      { id: 1, x: '60%', y: '18%' },
      { id: 2, x: '60%', y: '42%' },
      { id: 3, x: '60%', y: '62%' },
      { id: 4, x: '60%', y: '80%' },
    ],
    formFields: [
      { id: 'street', label: 'Street Address (Line 1)', value: '家庭街道地址（英文）', highlighted: true, hotspotId: 1 },
      { id: 'city', label: 'City', value: '城市' },
      { id: 'state', label: 'State/Province', value: '省份' },
      { id: 'postal', label: 'Postal Zone/ZIP Code', value: '邮编' },
      { id: 'country', label: 'Country/Region', value: 'China', type: 'dropdown' },
      { id: 'phone', label: 'Primary Phone Number', value: '+86 手机号码', highlighted: true, hotspotId: 2 },
      { id: 'email', label: 'Email Address', value: '你的邮箱地址', highlighted: true },
      { id: 'social1', label: 'Social Media Provider / Identifier', value: 'SINA WEIBO / 微博用户名', highlighted: true, hotspotId: 3 },
      { id: 'social2', label: 'Additional Social Media', value: 'WECHAT / 微信号', hotspotId: 4 },
      { id: 'social3', label: 'Additional Social Media', value: 'REDNOTE / 小红书数字ID' },
    ],
    infoPanels: [
      {
        number: 1,
        title: '家庭住址（Home Address）',
        body: '填写中国家庭住址的英文版本，包括街道、城市、省份和邮编，Country 选 China。可用百度地图查询英文地址。',
      },
      {
        number: 2,
        title: '电话与邮箱',
        body: '主要电话填中国手机号，需要加国际区号（+86）。次要电话和工作电话选 Does Not Apply。邮箱填常用邮箱，确保能正常收信。',
      },
      {
        number: 3,
        title: '社交媒体（重要！务必如实填写）',
        body: '必须填写过去5年使用过的社交平台。建议填写：SINA WEIBO（新浪微博用户名）、WECHAT（微信号）、REDNOTE（小红书数字 ID，因中文字符可能显示异常）。',
      },
      {
        number: 4,
        title: '填写建议：2-3 个平台即可',
        body: '下方还有"其他平台"问题，可继续补充。共填写 2-3 个平台。小红书建议填数字 ID（号码），而不是中文昵称。',
      },
    ],
    warning: {
      title: '社交媒体必须如实填写，不可遗漏',
      body: '美国政府有能力核查申请人的社交媒体历史。小红书建议填数字 ID（个人主页中的数字号码），因为中文字符在系统中可能无法正常显示，但数字 ID 是通用的。',
    },
    officialUrl: 'https://ceac.state.gov/genniv/',
  },

  // ─── Step 6: Passport Information ─────────────────────────────────
  {
    id: 6,
    sectionLabel: 'Passport Information',
    chineseTitle: '护照信息',
    subtitle:
      '此页所有信息必须与护照原件完全一致，包括日期格式。请拿着护照逐项对照填写，切勿凭记忆填写。',
    hotspots: [
      { id: 1, x: '60%', y: '16%' },
      { id: 2, x: '60%', y: '36%' },
      { id: 3, x: '60%', y: '56%' },
      { id: 4, x: '60%', y: '76%' },
    ],
    formFields: [
      { id: 'type', label: 'Passport/Travel Document Type', value: 'REGULAR（普通护照）', type: 'dropdown', highlighted: true, hotspotId: 1 },
      { id: 'number', label: 'Passport/Travel Document Number', value: '护照号码（确保没错!!）', highlighted: true },
      { id: 'book_num', label: 'Passport Book Number', value: '护照内页右侧那列数字（没有则 Does Not Apply）', hotspotId: 2 },
      { id: 'issuer', label: 'Country/Authority that Issued', value: 'China', type: 'dropdown', hotspotId: 3 },
      { id: 'issue_city', label: 'Where Issued — City', value: '护照签发城市（以护照为准）' },
      { id: 'issue_state', label: 'Where Issued — State/Province', value: '省份（以护照为准）' },
      { id: 'issue_date', label: 'Issuance Date', value: '护照签发日期（DD-MMM-YYYY）', type: 'date', highlighted: true, hotspotId: 4 },
      { id: 'expiry_date', label: 'Expiration Date', value: '护照到期日期（DD-MMM-YYYY）', type: 'date', highlighted: true },
      { id: 'lost', label: '是否曾丢失或被盗护照？', value: 'No', type: 'radio' },
    ],
    infoPanels: [
      {
        number: 1,
        title: '护照类型与号码',
        body: '类型选 REGULAR（普通护照）。护照号码在护照右上角，通常以字母开头（如 E1234567）。务必核对无误，这是最关键的信息！',
      },
      {
        number: 2,
        title: 'Passport Book Number（护照薄号）',
        body: '这是护照内页右侧靠近装订处的一列数字，与护照号不同。部分护照有，部分没有。没有则勾选 Does Not Apply。',
      },
      {
        number: 3,
        title: '签发地点',
        body: '填写护照上标注的签发城市（City）和省份（State/Province），以护照上打印的内容为准，Country 选 China。',
      },
      {
        number: 4,
        title: '签发日期与到期日期（最容易出错！）',
        body: '格式为 DD-MMM-YYYY（如 16-DEC-2019）。发证日期和到期日期是不同的，曾有申请人因多填了一天而导致信息不符。',
      },
    ],
    warning: {
      title: '日期务必核对护照原件，差一天都不行',
      body: '签发日期（Issuance Date）和到期日期（Expiration Date）要完全按护照上的打印内容填，哪怕差一天也会造成信息不符，影响审查。',
      examples: [
        { label: '错误格式', value: '2019/12/16', correct: false },
        { label: '正确格式', value: '16-DEC-2019', correct: true },
      ],
    },
    officialUrl: 'https://ceac.state.gov/genniv/',
  },

  // ─── Step 7: U.S. Contact ─────────────────────────────────────────
  {
    id: 7,
    sectionLabel: 'U.S. Point of Contact',
    chineseTitle: '美国联系人信息',
    subtitle:
      '填写在美国的联系人或联系机构。如无认识的美国人，可填写你将要入住的酒店作为联系机构。',
    hotspots: [
      { id: 1, x: '60%', y: '22%' },
      { id: 2, x: '60%', y: '48%' },
      { id: 3, x: '60%', y: '72%' },
    ],
    formFields: [
      { id: 'contact_name', label: 'Contact Person — Surnames / Given Names', value: '（勾选 Do Not Know）', hotspotId: 1 },
      { id: 'org', label: 'Organization Name', value: 'HOTEL（填酒店）', highlighted: true, hotspotId: 2 },
      { id: 'relation', label: 'Relationship to You', value: 'OTHER', type: 'dropdown' },
      { id: 'us_street', label: 'U.S. Street Address', value: '酒店英文地址', highlighted: true, hotspotId: 3 },
      { id: 'us_city', label: 'City', value: '酒店所在城市' },
      { id: 'us_state', label: 'State', value: '州', type: 'dropdown' },
      { id: 'us_zip', label: 'ZIP Code', value: '酒店邮编' },
      { id: 'us_phone', label: 'Phone Number', value: '酒店电话' },
      { id: 'us_email', label: 'Email Address', value: '酒店邮箱' },
    ],
    infoPanels: [
      {
        number: 1,
        title: '没有美国认识的人怎么办？',
        body: '无须担心。Contact Person 姓名不填，勾选 Do Not Know；Organization Name 填 HOTEL；Relationship 选 OTHER。',
      },
      {
        number: 2,
        title: '填写酒店信息',
        body: '填写你将入住酒店的英文地址、城市、州和邮编。可通过谷歌或酒店官网获取准确的英文地址和联系信息。',
        tip: '例：8 Stone Street, New York, NY 10004 / Tel: 12124809100',
      },
      {
        number: 3,
        title: '酒店邮箱',
        body: '填写酒店的官方联系邮箱，通常在酒店官网"Contact Us"页面可以找到。',
      },
    ],
    officialUrl: 'https://ceac.state.gov/genniv/',
  },

  // ─── Step 8: Family Information ───────────────────────────────────
  {
    id: 8,
    sectionLabel: 'Family Information: Relatives',
    chineseTitle: '家庭成员信息',
    subtitle:
      '填写父母的基本信息。如父母均不在美国，相关题目选 No 即可。如实填写，无需过度紧张。',
    hotspots: [
      { id: 1, x: '60%', y: '20%' },
      { id: 2, x: '60%', y: '50%' },
      { id: 3, x: '60%', y: '78%' },
    ],
    formFields: [
      { id: 'father_sur', label: "Father's Surnames", value: '爸爸的姓（拼音大写）', highlighted: true, hotspotId: 1 },
      { id: 'father_giv', label: "Father's Given Names", value: '爸爸的名（拼音大写）' },
      { id: 'father_dob', label: "Father's Date of Birth", value: '爸爸的出生日期', type: 'date' },
      { id: 'father_us', label: '你爸爸在美国吗？', value: 'No', type: 'radio' },
      { id: 'mother_sur', label: "Mother's Surnames", value: '妈妈的姓（拼音大写）', highlighted: true, hotspotId: 2 },
      { id: 'mother_giv', label: "Mother's Given Names", value: '妈妈的名（拼音大写）' },
      { id: 'mother_dob', label: "Mother's Date of Birth", value: '妈妈的出生日期', type: 'date' },
      { id: 'mother_us', label: '你妈妈在美国吗？', value: 'No', type: 'radio' },
      { id: 'relatives_us', label: '不含父母，有其他直系亲属在美国吗？', value: '如实选择', type: 'radio', hotspotId: 3 },
      { id: 'other_rel', label: '有其他亲属在美国吗？', value: '如实选择', type: 'radio' },
    ],
    infoPanels: [
      {
        number: 1,
        title: '父亲信息',
        body: '填写父亲的姓（Surnames）、名（Given Names）的全大写拼音，以及出生日期（DD-MMM-YYYY 格式）。如父亲在美国，选 Yes 并填写所在州。',
      },
      {
        number: 2,
        title: '母亲信息',
        body: '与父亲信息填写方式相同，填写母亲的姓名拼音大写和出生日期。父母均不在美国则两题都选 No。',
      },
      {
        number: 3,
        title: '其他亲属在美国？',
        body: '"直系亲属在美国"（不含父母）和"其他亲属在美国"，按实际情况如实选择。有亲属不影响签证申请，如实填写即可。',
      },
    ],
    officialUrl: 'https://ceac.state.gov/genniv/',
  },

  // ─── Step 9: Present Work / Education ────────────────────────────
  {
    id: 9,
    sectionLabel: 'Present Work / Education / Training',
    chineseTitle: '当前工作 / 学习信息',
    subtitle:
      '填写你目前的职业或就读学校。所填内容需与你的在职证明、在读证明等官方材料完全一致。',
    hotspots: [
      { id: 1, x: '60%', y: '14%' },
      { id: 2, x: '60%', y: '34%' },
      { id: 3, x: '60%', y: '60%' },
      { id: 4, x: '60%', y: '80%' },
    ],
    formFields: [
      { id: 'occupation', label: 'Primary Occupation', value: '你的职业（学生选 STUDENT）', type: 'dropdown', highlighted: true, hotspotId: 1 },
      { id: 'employer', label: 'Present Employer or School Name', value: '学校/公司英文全称（与官方文件一致！）', highlighted: true, hotspotId: 2 },
      { id: 'work_street', label: 'Street Address', value: '学校/公司地址' },
      { id: 'work_city', label: 'City', value: '城市' },
      { id: 'work_state', label: 'State/Province', value: '省份' },
      { id: 'work_phone', label: 'Phone Number', value: '学校/公司联系电话（可官网查）', hotspotId: 3 },
      { id: 'start_date', label: 'Start Date', value: '入职/入学时间（与证明文件一致！）', type: 'date', highlighted: true },
      { id: 'income', label: 'Monthly Income (if employed)', value: '月收入（与收入证明一致）' },
      { id: 'duties', label: 'Briefly describe your duties', value: '岗位职责描述（英文，3-4句话）', highlighted: true, hotspotId: 4 },
    ],
    infoPanels: [
      {
        number: 1,
        title: 'Primary Occupation（职业类型）',
        body: '学生选 STUDENT；在职人员根据行业选择，金融行业可选 BUSINESS；无业或自由职业可选相应类型。',
      },
      {
        number: 2,
        title: '学校 / 公司名称与地址',
        body: '填写英文全称，与官方文件保持一致（如 UNIVERSITY OF LONDON）。地址可在学校或公司官网英文版查询。',
      },
      {
        number: 3,
        title: '入职 / 入学时间',
        body: '填写你开始在该单位工作或就读的日期（DD-MMM-YYYY），要与公司/学校能开出的证明文件上的时间完全一致。',
      },
      {
        number: 4,
        title: '岗位职责描述（Duties）',
        body: '用英文简要描述职位职责，建议包含：1. 核心职责；2. 使用的技能；3. 成就与影响力。不超过3-4句话。',
        tip: '可让 AI 根据你的实际工作内容生成英文描述，记得检查准确性再填写。',
      },
    ],
    warning: {
      title: '信息必须与证明材料一致',
      body: '学校名称、入学时间、月收入等信息必须与你届时提交的在读证明或在职证明完全一致，否则签证官会发现矛盾。矛盾信息是拒签的重要原因之一。',
    },
    officialUrl: 'https://ceac.state.gov/genniv/',
  },

  // ─── Step 10: Previous Work / Education ───────────────────────────
  {
    id: 10,
    sectionLabel: 'Previous Work / Education / Training',
    chineseTitle: '过往工作 / 教育经历',
    subtitle:
      '填写过去5年内的工作经历，以及高中及以上的所有就读学校。时间严格按毕业证上的时间填写。',
    hotspots: [
      { id: 1, x: '60%', y: '20%' },
      { id: 2, x: '60%', y: '48%' },
      { id: 3, x: '60%', y: '75%' },
    ],
    formFields: [
      { id: 'prev_employed', label: '过去5年是否曾受雇？', value: '如实选择', type: 'radio', hotspotId: 1 },
      { id: 'education', label: '是否曾就读高中及以上院校？', value: 'Yes（几乎所有人都是）', type: 'radio', hotspotId: 2 },
      { id: 'school_name', label: 'Name of Institution', value: '学校全称（英文）', highlighted: true },
      { id: 'school_street', label: 'Street Address', value: '学校地址' },
      { id: 'school_city', label: 'City', value: '城市' },
      { id: 'school_state', label: 'State/Province', value: '省份' },
      { id: 'course', label: 'Course of Study', value: '专业名称（英文）', highlighted: true, hotspotId: 3 },
      { id: 'from_date', label: 'Date of Attendance From', value: '入学时间', type: 'date' },
      { id: 'to_date', label: 'Date of Attendance To', value: '毕业时间', type: 'date' },
    ],
    infoPanels: [
      {
        number: 1,
        title: '过去5年是否曾受雇？',
        body: '如有工作经历（包括实习、兼职）选 Yes，填写雇主名称、地址、职位、起止日期和薪资。在校期间无工作经历的学生选 No。',
      },
      {
        number: 2,
        title: '高中及以上的学校（必须全部填写）',
        body: '包括高中、本科、研究生（如有）。本科生：填高中+本科；研究生：填高中+本科+研究生。每所都要填写。',
        tip: '时间严格按毕业证上的日期填写，不能早一天也不能晚一天。',
      },
      {
        number: 3,
        title: '教育机构地址',
        body: '填写学校注册地的英文地址，包括街道、城市、省份和国家。Course of Study 填专业英文名称（如 Computer Science）。',
      },
    ],
    warning: {
      title: '教育经历必须完整，不可遗漏',
      body: '所有高中及以上的就读经历必须全部填写，包括短期交换项目。遗漏学校经历会导致材料审查不通过。高中可填 Academic 或 Vocational。',
    },
    officialUrl: 'https://ceac.state.gov/genniv/',
  },

  // ─── Step 11: Additional Information ──────────────────────────────
  {
    id: 11,
    sectionLabel: 'Additional Work / Education / Training Information',
    chineseTitle: '附加信息（语言 & 旅行记录）',
    subtitle:
      '填写语言能力、过去5年访问过的国家/地区，以及所属组织情况。如实填写，无需紧张。',
    hotspots: [
      { id: 1, x: '60%', y: '18%' },
      { id: 2, x: '60%', y: '44%' },
      { id: 3, x: '60%', y: '72%' },
    ],
    formFields: [
      { id: 'clan', label: '是否属于某些宗族或部落？', value: 'No', type: 'radio' },
      { id: 'language', label: 'Languages You Speak', value: 'CHINESE（可加 ENGLISH）', highlighted: true, hotspotId: 1 },
      { id: 'traveled', label: '过去5年是否去过其他国家？', value: 'Yes（如实填写）', type: 'radio', hotspotId: 2 },
      { id: 'country1', label: 'Country/Region Visited', value: 'UNITED KINGDOM', type: 'dropdown' },
      { id: 'country2', label: 'Country/Region Visited', value: '其他访问过的国家', type: 'dropdown' },
      { id: 'org', label: '是否属于职业/社会/慈善组织？', value: 'No（一般）', type: 'radio', hotspotId: 3 },
      { id: 'special_skills', label: '是否有枪支/爆炸/核/生化等特殊技能？', value: 'No', type: 'radio' },
      { id: 'military', label: '是否有军队服役经历？', value: 'No（一般）', type: 'radio' },
      { id: 'paramilitary', label: '是否参与准军事/叛乱组织？', value: 'No', type: 'radio' },
    ],
    infoPanels: [
      {
        number: 1,
        title: '语言能力',
        body: '填写你能使用的语言。旅游签一般填 CHINESE（普通话）即可，有英语能力可补充填 ENGLISH。',
      },
      {
        number: 2,
        title: '过去5年去过的国家/地区',
        body: '如实填写所有访问过的国家和地区（包括英国、欧洲各国等）。去过俄罗斯如实填写——已有填写俄罗斯仍成功获签的案例。',
        tip: '英区留学生通常去过多个欧洲国家，务必全部列出，不能遗漏。',
      },
      {
        number: 3,
        title: '组织机构 & 特殊技能',
        body: '职业/社会组织、特殊技能（枪支/爆炸物等）、军队服役、准军事组织，正常情况全选 No，如实回答即可。',
      },
    ],
    warning: {
      title: '关于俄罗斯的争议',
      body: '如曾访问俄罗斯，建议如实填写（已有填了俄罗斯仍获签的案例）。面签时，签证官如果问起曾去过哪些国家，你可以选择性地提及欧洲几个国家，不必主动强调俄罗斯。',
    },
    officialUrl: 'https://ceac.state.gov/genniv/',
  },

  // ─── Step 12: Security and Background ─────────────────────────────
  {
    id: 12,
    sectionLabel: 'Security and Background (Part 1-5)',
    chineseTitle: '安全背景调查',
    subtitle:
      '共5个部分，包含健康状况和安全背景问题。正常申请人所有题目均选 No。提交前务必全面检查所有信息。',
    hotspots: [
      { id: 1, x: '60%', y: '22%' },
      { id: 2, x: '60%', y: '52%' },
      { id: 3, x: '60%', y: '78%' },
    ],
    formFields: [
      { id: 'disease', label: 'Part 1 — 是否有可能对公共卫生造成危险的传染性疾病？', value: 'No', type: 'radio', hotspotId: 1 },
      { id: 'disorder', label: 'Part 1 — 是否有精神/生理方面问题可能危及自己或他人？', value: 'No', type: 'radio' },
      { id: 'drug', label: 'Part 1 — 是否是药物滥用或上瘾者？', value: 'No', type: 'radio' },
      { id: 'crime', label: 'Part 2 — 是否有犯罪记录？', value: 'No', type: 'radio', hotspotId: 2 },
      { id: 'deport', label: 'Part 3 — 是否曾被驱逐出境或拒绝入境？', value: 'No', type: 'radio' },
      { id: 'terror', label: 'Part 4 — 是否涉及恐怖主义活动？', value: 'No', type: 'radio' },
      { id: 'confirm', label: 'Part 5 — 确认所有信息真实准确并签名', value: '（检查完毕后提交）', highlighted: true, hotspotId: 3 },
    ],
    infoPanels: [
      {
        number: 1,
        title: 'Part 1：健康状况',
        body: '包含是否有传染病、精神/生理疾病、药物滥用等问题。正常情况全选 No。',
      },
      {
        number: 2,
        title: 'Part 2-4：犯罪与安全记录',
        body: '是否有犯罪记录、是否曾被驱逐出境、是否涉及恐怖主义等。正常情况全选 No。不要因为担心被拒就填错，如实作答是法律义务。',
      },
      {
        number: 3,
        title: 'Part 5：确认提交',
        body: '完成所有问题后，系统会要求你确认并签名。提交前请仔细检查所有页面，特别是姓名、护照号、日期等关键信息。',
        tip: '提交成功后，打印确认页（带条形码的那一页），面签时必须携带！',
      },
    ],
    warning: {
      title: '提交前务必全面检查，提交后部分信息无法修改',
      body: '重点检查：护照号码、护照到期日期、姓名拼写（与护照 MRZ 一致）、出生日期。如有错误，部分情况需重新填写整份表格，工作量极大。',
    },
    officialUrl: 'https://ceac.state.gov/genniv/',
  },
]
